import type { CategoryId, GameSettings, WinReason } from "../../src/shared/types";
import type { PrismaClient } from "../lib/prisma";

/**
 * Durable record-keeping. All calls are fire-and-forget from the game's point of
 * view: a database hiccup must never stall or crash a live match.
 */
export interface SideResult {
  sideId: string;
  name: string;
  color: string;
  position: number;
  score: number;
  trophies: CategoryId[];
  placement: number;
  memberClientIds: string[];
}

export interface GamePersistence {
  roomCreated(r: { code: string; settings: GameSettings; hostClientId: string; hostName: string }): Promise<void>;
  playerJoined(r: { code: string; clientId: string; name: string; tokenHash: string; isHost: boolean }): Promise<void>;
  gameStarted(r: { code: string; settings: GameSettings; sides: Omit<SideResult, "placement" | "position" | "score" | "trophies">[] }): Promise<void>;
  answerRecorded(r: { code: string; questionId: string; clientId: string | null; correct: boolean; timedOut: boolean; responseMs: number }): Promise<void>;
  gameEnded(r: { code: string; winnerSideId: string; reason: WinReason; turnCount: number; sides: SideResult[] }): Promise<void>;
  roomClosed(code: string): Promise<void>;
}

export class NoopPersistence implements GamePersistence {
  async roomCreated() {}
  async playerJoined() {}
  async gameStarted() {}
  async answerRecorded() {}
  async gameEnded() {}
  async roomClosed() {}
}

export class PrismaPersistence implements GamePersistence {
  /** room code → db ids for the current match */
  private rooms = new Map<string, { roomId: string; sideToTeam: Map<string, string>; userIds: Map<string, string> }>();

  constructor(private readonly prisma: PrismaClient) {}

  /** Per-room write queue: keeps DB writes in call order (room before players, etc.). */
  private queues = new Map<string, Promise<void>>();

  private safe(label: string, fn: () => Promise<unknown>, code: string): Promise<void> {
    const prev = this.queues.get(code) ?? Promise.resolve();
    const next = prev.then(async () => {
      try {
        await fn();
      } catch (err) {
        console.error(`[persistence] ${label} failed:`, (err as Error).message);
      }
    });
    this.queues.set(code, next);
    return next;
  }

  private async ensureUser(clientId: string, name: string) {
    const user = await this.prisma.user.upsert({
      where: { guestKey: clientId },
      update: { displayName: name },
      create: { guestKey: clientId, displayName: name },
    });
    return user.id;
  }

  roomCreated({ code, settings, hostClientId, hostName }: Parameters<GamePersistence["roomCreated"]>[0]) {
    return this.safe("roomCreated", async () => {
      const hostId = await this.ensureUser(hostClientId, hostName);
      // Codes are recycled after GC, so upsert & reset.
      const room = await this.prisma.room.upsert({
        where: { code },
        update: { status: "LOBBY", settings: settings as object, hostId, startedAt: null, endedAt: null, winnerTeamId: null },
        create: { code, settings: settings as object, hostId, mode: settings.mode === "teams" ? "TEAMS" : "FFA" },
      });
      this.rooms.set(code, { roomId: room.id, sideToTeam: new Map(), userIds: new Map([[hostClientId, hostId]]) });
    }, code);
  }

  playerJoined({ code, clientId, name, tokenHash, isHost }: Parameters<GamePersistence["playerJoined"]>[0]) {
    return this.safe("playerJoined", async () => {
      const ctx = this.rooms.get(code);
      if (!ctx) return;
      const userId = await this.ensureUser(clientId, name);
      ctx.userIds.set(clientId, userId);
      await this.prisma.roomPlayer.upsert({
        where: { roomId_userId: { roomId: ctx.roomId, userId } },
        update: { displayName: name, sessionTokenHash: tokenHash, leftAt: null },
        create: { roomId: ctx.roomId, userId, displayName: name, sessionTokenHash: tokenHash, isHost },
      });
    }, code);
  }

  gameStarted({ code, settings, sides }: Parameters<GamePersistence["gameStarted"]>[0]) {
    return this.safe("gameStarted", async () => {
      const ctx = this.rooms.get(code);
      if (!ctx) return;
      ctx.sideToTeam.clear();
      await this.prisma.room.update({
        where: { id: ctx.roomId },
        data: { status: "PLAYING", startedAt: new Date(), settings: settings as object, mode: settings.mode === "teams" ? "TEAMS" : "FFA" },
      });
      for (const side of sides) {
        const team = await this.prisma.team.create({ data: { roomId: ctx.roomId, name: side.name, color: side.color } });
        ctx.sideToTeam.set(side.sideId, team.id);
        const userIds = side.memberClientIds.map((c) => ctx.userIds.get(c)).filter(Boolean) as string[];
        await this.prisma.roomPlayer.updateMany({ where: { roomId: ctx.roomId, userId: { in: userIds } }, data: { teamId: team.id } });
      }
    }, code);
  }

  answerRecorded({ code, questionId, clientId, correct, timedOut, responseMs }: Parameters<GamePersistence["answerRecorded"]>[0]) {
    return this.safe("answerRecorded", async () => {
      const ctx = this.rooms.get(code);
      if (!ctx) return;
      const userId = clientId ? ctx.userIds.get(clientId) ?? null : null;
      await this.prisma.$transaction([
        this.prisma.answerLog.create({ data: { roomId: ctx.roomId, questionId, userId, correct, timedOut, responseMs } }),
        this.prisma.question.update({
          where: { id: questionId },
          data: { timesAsked: { increment: 1 }, timesCorrect: { increment: correct ? 1 : 0 } },
        }),
        ...(userId
          ? [this.prisma.user.update({ where: { id: userId }, data: { totalAnswers: { increment: 1 }, correctAnswers: { increment: correct ? 1 : 0 } } })]
          : []),
      ]);
    }, code);
  }

  gameEnded({ code, winnerSideId, reason, turnCount, sides }: Parameters<GamePersistence["gameEnded"]>[0]) {
    return this.safe("gameEnded", async () => {
      const ctx = this.rooms.get(code);
      if (!ctx) return;
      for (const s of sides) {
        const teamId = ctx.sideToTeam.get(s.sideId);
        if (!teamId) continue;
        await this.prisma.team.update({
          where: { id: teamId },
          data: { position: s.position, score: s.score, trophies: s.trophies, placement: s.placement },
        });
        const userIds = s.memberClientIds.map((c) => ctx.userIds.get(c)).filter(Boolean) as string[];
        await this.prisma.user.updateMany({
          where: { id: { in: userIds } },
          data: {
            gamesPlayed: { increment: 1 },
            gamesWon: { increment: s.sideId === winnerSideId ? 1 : 0 },
            trophiesWon: { increment: s.trophies.length },
          },
        });
      }
      await this.prisma.room.update({
        where: { id: ctx.roomId },
        data: { status: "FINISHED", endedAt: new Date(), winReason: reason, turnCount, winnerTeamId: ctx.sideToTeam.get(winnerSideId) ?? null },
      });
    }, code);
  }

  roomClosed(code: string) {
    return this.safe("roomClosed", async () => {
      const ctx = this.rooms.get(code);
      this.rooms.delete(code);
      this.queues.delete(code);
      if (!ctx) return;
      await this.prisma.room.updateMany({ where: { id: ctx.roomId, status: { in: ["LOBBY", "PLAYING"] } }, data: { status: "ABANDONED" } });
    }, code);
  }
}
