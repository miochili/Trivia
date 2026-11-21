import { AVATARS, MAX_TEAMS, MIN_SIDES_TO_START, PLAYER_COLORS, TEAM_PRESETS, TIMING } from "../../src/shared/constants";
import { S2C, type EngineEvent } from "../../src/shared/events";
import {
  DEFAULT_SETTINGS,
  type GameSettings,
  type OpenLobby,
  type PublicRoomState,
  type RoomStatus,
} from "../../src/shared/types";
import { GameEngine, GameError, type EngineSideInit } from "../game/GameEngine";
import { shuffle } from "../game/board";
import { hashToken, makeId, makeSessionToken } from "../lib/ids";
import type { GamePersistence } from "../persistence/GamePersistence";
import type { QuestionBank } from "../questions/QuestionBank";

export interface PlayerRecord {
  id: string;
  clientId: string;
  name: string;
  tokenHash: string;
  socketId: string | null;
  connected: boolean;
  ready: boolean;
  teamId: string | null;
  color: string;
  avatar: string;
  joinedAt: number;
  disconnectedAt: number | null;
}

interface TeamRecord {
  id: string;
  name: string;
  color: string;
  emblem: string;
}

export interface RoomDeps {
  /** Broadcast an event to every socket in this room. */
  broadcast: (event: string, payload: unknown) => void;
  persistence: GamePersistence;
  questionBank: QuestionBank;
}

/**
 * One lobby + (optionally) one running match. Holds the authoritative player
 * list, team setup and settings; delegates the match itself to GameEngine.
 */
export class Room {
  readonly players = new Map<string, PlayerRecord>();
  hostId = "";
  status: RoomStatus = "lobby";
  settings: GameSettings;
  teams: TeamRecord[] = [];
  engine: GameEngine | null = null;
  emptySince: number | null = null;
  private version = 0;
  private broadcastQueued = false;
  private starting = false;
  private lobbyRemovalTimers = new Map<string, ReturnType<typeof setTimeout>>();

  constructor(
    readonly code: string,
    private readonly deps: RoomDeps,
    settings?: Partial<GameSettings>,
  ) {
    this.settings = { ...DEFAULT_SETTINGS, ...settings };
    if (this.settings.mode === "teams") this.ensureDefaultTeams();
  }

  // ───────────────────────────── players ─────────────────────────────

  addPlayer(name: string, clientId: string, avatar?: string): { player: PlayerRecord; sessionToken: string } {
    const existing = [...this.players.values()].find((p) => p.clientId === clientId);
    if (existing) {
      // Same browser joining again (e.g. lost its session token): re-issue a session.
      // clientId is a private per-browser secret that is never broadcast.
      const sessionToken = makeSessionToken();
      existing.tokenHash = hashToken(sessionToken);
      if (this.status === "lobby") {
        existing.name = name;
        if (avatar) existing.avatar = this.freeAvatar(avatar, existing.id);
      }
      return { player: existing, sessionToken };
    }
    if (this.status !== "lobby") throw new GameError("err.alreadyStarted");
    if (this.players.size >= this.settings.maxPlayers) throw new GameError("err.roomFull");
    if ([...this.players.values()].some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      throw new GameError("err.nameTaken");
    }
    const sessionToken = makeSessionToken();
    const used = new Set([...this.players.values()].map((p) => p.color));
    const player: PlayerRecord = {
      id: makeId("p"),
      clientId,
      name,
      tokenHash: hashToken(sessionToken),
      socketId: null,
      connected: false,
      ready: false,
      teamId: null,
      color: PLAYER_COLORS.find((c) => !used.has(c)) ?? PLAYER_COLORS[this.players.size % PLAYER_COLORS.length],
      avatar: this.freeAvatar(avatar),
      joinedAt: Date.now(),
      disconnectedAt: null,
    };
    this.players.set(player.id, player);
    if (!this.hostId) this.hostId = player.id;
    if (this.settings.mode === "teams") player.teamId = this.smallestTeamId();
    void this.deps.persistence.playerJoined({
      code: this.code,
      clientId,
      name,
      tokenHash: player.tokenHash,
      isHost: this.hostId === player.id,
    });
    this.queueBroadcast();
    return { player, sessionToken };
  }

  findByToken(sessionToken: string): PlayerRecord | undefined {
    const h = hashToken(sessionToken);
    return [...this.players.values()].find((p) => p.tokenHash === h);
  }

  markConnected(playerId: string, socketId: string) {
    const p = this.mustGet(playerId);
    p.socketId = socketId;
    p.connected = true;
    p.disconnectedAt = null;
    this.emptySince = null;
    const t = this.lobbyRemovalTimers.get(playerId);
    if (t) clearTimeout(t);
    this.lobbyRemovalTimers.delete(playerId);
    if (!this.players.get(this.hostId)?.connected) this.hostId = playerId;
    this.engine?.handleConnectivityChange();
    this.queueBroadcast();
  }

  markDisconnected(playerId: string) {
    const p = this.players.get(playerId);
    if (!p) return;
    p.connected = false;
    p.socketId = null;
    p.disconnectedAt = Date.now();
    if (this.status === "lobby") {
      p.ready = false;
      // Lobby seats are released if the player doesn't come back soon.
      this.lobbyRemovalTimers.set(
        playerId,
        setTimeout(() => {
          this.lobbyRemovalTimers.delete(playerId);
          const cur = this.players.get(playerId);
          if (cur && !cur.connected && this.status === "lobby") this.removePlayer(playerId);
        }, TIMING.LOBBY_DISCONNECT_GRACE_MS),
      );
    }
    this.transferHostIfNeeded();
    if (!this.anyConnected()) this.emptySince = Date.now();
    this.engine?.handleConnectivityChange();
    this.queueBroadcast();
  }

  /** Explicit leave / kick. Mid-game the seat stays (as offline) so the pawn persists. */
  removePlayer(playerId: string) {
    if (this.status !== "lobby") {
      this.markDisconnected(playerId);
      return;
    }
    this.players.delete(playerId);
    const t = this.lobbyRemovalTimers.get(playerId);
    if (t) clearTimeout(t);
    this.lobbyRemovalTimers.delete(playerId);
    this.transferHostIfNeeded();
    if (!this.anyConnected()) this.emptySince = Date.now();
    this.queueBroadcast();
  }

  private transferHostIfNeeded() {
    const host = this.players.get(this.hostId);
    if (host?.connected) return;
    const next = [...this.players.values()].filter((p) => p.connected).sort((a, b) => a.joinedAt - b.joinedAt)[0];
    if (next) this.hostId = next.id;
    else if (!host) this.hostId = [...this.players.keys()][0] ?? "";
  }

  isConnected = (playerId: string) => !!this.players.get(playerId)?.connected;
  anyConnected = () => [...this.players.values()].some((p) => p.connected);

  // ───────────────────────────── lobby actions ─────────────────────────────

  updateSettings(byId: string, patch: Partial<GameSettings>) {
    this.requireHost(byId);
    this.requireLobby();
    const next = { ...this.settings, ...patch };
    if (next.maxPlayers < this.players.size) throw new GameError("err.tooManyPlayers");
    const modeChanged = next.mode !== this.settings.mode;
    this.settings = next;
    if (modeChanged) {
      if (next.mode === "teams") {
        this.ensureDefaultTeams();
        this.balanceIntoTeams([...this.players.values()]);
      } else {
        this.teams = [];
        for (const p of this.players.values()) p.teamId = null;
      }
    }
    for (const p of this.players.values()) if (p.id !== this.hostId) p.ready = false; // settings changed → re-ready
    this.queueBroadcast();
  }

  createTeam(byId: string, name: string): string {
    this.requireLobby();
    this.requireTeamsMode();
    if (this.teams.length >= MAX_TEAMS) throw new GameError("err.maxTeams", { n: MAX_TEAMS });
    if (this.teams.some((t) => t.name.toLowerCase() === name.toLowerCase())) throw new GameError("err.teamNameTaken");
    const usedColors = new Set(this.teams.map((t) => t.color));
    const preset = TEAM_PRESETS.find((t) => !usedColors.has(t.color)) ?? TEAM_PRESETS[this.teams.length % TEAM_PRESETS.length];
    const team = { id: makeId("t"), name, color: preset.color, emblem: preset.emblem };
    this.teams.push(team);
    this.mustGet(byId).teamId = team.id;
    this.queueBroadcast();
    return team.id;
  }

  joinTeam(byId: string, teamId: string | null) {
    this.requireLobby();
    this.requireTeamsMode();
    if (teamId && !this.teams.some((t) => t.id === teamId)) throw new GameError("err.teamNotFound");
    const p = this.mustGet(byId);
    p.teamId = teamId;
    p.ready = false;
    this.queueBroadcast();
  }

  /** Host puts any player on any team (or none) — "choose who's with who". */
  movePlayer(byId: string, targetId: string, teamId: string | null) {
    this.requireHost(byId);
    this.requireLobby();
    this.requireTeamsMode();
    if (teamId && !this.teams.some((t) => t.id === teamId)) throw new GameError("err.teamNotFound");
    const p = this.mustGet(targetId);
    p.teamId = teamId;
    if (p.id !== this.hostId) p.ready = false;
    this.queueBroadcast();
  }

  /** Entry for the "Open games" list, or null when not joinable / private. */
  toOpenLobby(): OpenLobby | null {
    const host = this.players.get(this.hostId);
    if (this.status !== "lobby" || !this.settings.isPublic || !host?.connected) return null;
    if (this.players.size >= this.settings.maxPlayers) return null;
    return { code: this.code, host: host.name, hostAvatar: host.avatar, players: this.players.size, max: this.settings.maxPlayers, mode: this.settings.mode, ts: Date.now() };
  }

  renameTeam(byId: string, teamId: string, name: string) {
    this.requireLobby();
    const team = this.teams.find((t) => t.id === teamId);
    if (!team) throw new GameError("err.teamNotFound");
    const p = this.mustGet(byId);
    if (p.teamId !== teamId && byId !== this.hostId) throw new GameError("err.renameTeam");
    if (this.teams.some((t) => t.id !== teamId && t.name.toLowerCase() === name.toLowerCase())) throw new GameError("err.teamNameTaken");
    team.name = name;
    this.queueBroadcast();
  }

  autoBalance(byId: string, teamCount?: number) {
    this.requireHost(byId);
    this.requireLobby();
    this.requireTeamsMode();
    const want = teamCount ?? Math.max(2, this.teams.length);
    while (this.teams.length < want) {
      const preset = TEAM_PRESETS.find((t) => !this.teams.some((x) => x.color === t.color))!;
      this.teams.push({ id: makeId("t"), name: preset.name, color: preset.color, emblem: preset.emblem });
    }
    if (this.teams.length > want) this.teams = this.teams.slice(0, want);
    this.balanceIntoTeams(shuffle([...this.players.values()]), true);
    this.queueBroadcast();
  }

  /** Requested character if nobody else has it, else the first free one. */
  private freeAvatar(wanted?: string, selfId?: string): string {
    const taken = new Set([...this.players.values()].filter((p) => p.id !== selfId).map((p) => p.avatar));
    if (wanted && !taken.has(wanted)) return wanted;
    return AVATARS.find((a) => !taken.has(a)) ?? wanted ?? AVATARS[0];
  }

  setAvatar(byId: string, avatar: string) {
    this.requireLobby();
    const p = this.mustGet(byId);
    if ([...this.players.values()].some((o) => o.id !== byId && o.avatar === avatar)) throw new GameError("err.avatarTaken");
    p.avatar = avatar;
    this.queueBroadcast();
  }

  private lastReaction = new Map<string, number>();
  private reactionSeq = 0;

  /** Emoji reaction thrown onto everyone's board (lightly throttled per player). */
  react(byId: string, emoji: string) {
    this.mustGet(byId);
    const now = Date.now();
    if (now - (this.lastReaction.get(byId) ?? 0) < 400) throw new GameError("err.slowDown");
    this.lastReaction.set(byId, now);
    this.deps.broadcast(S2C.REACTION, { id: ++this.reactionSeq, playerId: byId, emoji });
  }

  setReady(byId: string, ready: boolean) {
    this.requireLobby();
    this.mustGet(byId).ready = ready;
    this.queueBroadcast();
  }

  kick(byId: string, targetId: string): PlayerRecord {
    this.requireHost(byId);
    this.requireLobby();
    if (byId === targetId) throw new GameError("err.kickSelf");
    const target = this.mustGet(targetId);
    this.removePlayer(targetId);
    return target;
  }

  // ───────────────────────────── match lifecycle ─────────────────────────────

  async startGame(byId: string) {
    this.requireHost(byId);
    this.requireLobby();
    if (this.starting) throw new GameError("err.alreadyStarting");

    const present = [...this.players.values()].filter((p) => p.connected);
    const notReady = present.filter((p) => p.id !== this.hostId && !p.ready);
    if (notReady.length) throw new GameError("err.notReady", { names: notReady.map((p) => p.name).join(", ") });

    let sides: EngineSideInit[];
    if (this.settings.mode === "teams") {
      // Anyone still unassigned is dropped into the smallest team.
      for (const p of present) if (!p.teamId) p.teamId = this.smallestTeamId();
      sides = this.teams
        .map((t) => ({ id: t.id, name: t.name, color: t.color, emblem: t.emblem, memberIds: present.filter((p) => p.teamId === t.id).map((p) => p.id) }))
        .filter((s) => s.memberIds.length > 0);
      if (sides.length < MIN_SIDES_TO_START) throw new GameError("err.needTwoTeams");
    } else {
      sides = present.map((p) => ({ id: p.id, name: p.name, color: p.color, emblem: p.avatar, memberIds: [p.id] }));
      if (sides.length < MIN_SIDES_TO_START) throw new GameError("err.needTwoPlayers");
    }

    this.starting = true;
    try {
      // Offline lobby ghosts don't get a pawn.
      for (const p of [...this.players.values()]) if (!p.connected) this.players.delete(p.id);
      const pool = await this.deps.questionBank.loadPool(this.settings.categories);
      if (!pool.length) throw new GameError("err.noQuestions");
      this.engine?.dispose();
      this.engine = new GameEngine({
        roomCode: this.code,
        settings: { ...this.settings },
        sides,
        pool,
        isConnected: this.isConnected,
        clientIdOf: (id) => this.players.get(id)?.clientId ?? null,
        nameOf: (id) => this.players.get(id)?.name ?? "Someone",
        emit: (e: EngineEvent) => this.deps.broadcast(e.type, e.payload),
        onChange: () => this.onEngineChange(),
        persistence: this.deps.persistence,
      });
      this.status = "playing";
      void this.deps.persistence.gameStarted({
        code: this.code,
        settings: this.settings,
        sides: sides.map((s) => ({
          sideId: s.id,
          name: s.name,
          color: s.color,
          memberClientIds: s.memberIds.map((m) => this.players.get(m)!.clientId),
        })),
      });
      this.engine.start();
      this.queueBroadcast();
    } finally {
      this.starting = false;
    }
  }

  returnToLobby(byId: string) {
    this.requireHost(byId);
    if (this.status === "lobby") return;
    if (this.engine && !this.engine.isOver) throw new GameError("err.stillRunning");
    this.engine?.dispose();
    this.engine = null;
    this.status = "lobby";
    for (const p of this.players.values()) p.ready = p.id === this.hostId;
    this.queueBroadcast();
  }

  private onEngineChange() {
    if (this.engine?.isOver) this.status = "finished";
    this.queueBroadcast();
  }

  // ───────────────────────────── snapshots ─────────────────────────────

  toPublic(): PublicRoomState {
    return {
      code: this.code,
      hostId: this.hostId,
      status: this.status,
      settings: this.settings,
      players: [...this.players.values()].map((p) => ({
        id: p.id,
        name: p.name,
        teamId: p.teamId,
        isHost: p.id === this.hostId,
        connected: p.connected,
        ready: p.ready || p.id === this.hostId,
        color: p.color,
        avatar: p.avatar,
      })),
      teams: this.teams.map((t) => ({
        ...t,
        memberIds: [...this.players.values()].filter((p) => p.teamId === t.id).map((p) => p.id),
      })),
      game: this.engine?.getPublicState() ?? null,
      version: this.version,
      serverNow: Date.now(),
    };
  }

  /**
   * Coalesce many mutations in one tick into one snapshot. Engine cue events are
   * emitted synchronously, so they always reach clients BEFORE the snapshot.
   */
  queueBroadcast() {
    if (this.broadcastQueued) return;
    this.broadcastQueued = true;
    queueMicrotask(() => {
      this.broadcastQueued = false;
      this.version++;
      this.deps.broadcast(S2C.ROOM_STATE, this.toPublic());
    });
  }

  dispose() {
    this.engine?.dispose();
    for (const t of this.lobbyRemovalTimers.values()) clearTimeout(t);
    this.lobbyRemovalTimers.clear();
  }

  // ───────────────────────────── internals ─────────────────────────────

  private ensureDefaultTeams() {
    if (this.teams.length) return;
    this.teams = TEAM_PRESETS.slice(0, 2).map((t) => ({ id: makeId("t"), name: t.name, color: t.color, emblem: t.emblem }));
  }

  private balanceIntoTeams(players: PlayerRecord[], reassignAll = false) {
    for (const p of players) {
      if (!reassignAll && p.teamId && this.teams.some((t) => t.id === p.teamId)) continue;
      p.teamId = null;
    }
    for (const p of players) if (!p.teamId) p.teamId = this.smallestTeamId();
  }

  private smallestTeamId(): string | null {
    if (!this.teams.length) return null;
    const counts = this.teams.map((t) => ({ id: t.id, n: [...this.players.values()].filter((p) => p.teamId === t.id).length }));
    counts.sort((a, b) => a.n - b.n);
    return counts[0].id;
  }

  private mustGet(id: string) {
    const p = this.players.get(id);
    if (!p) throw new GameError("err.playerNotFound");
    return p;
  }

  private requireHost(id: string) {
    if (id !== this.hostId) throw new GameError("err.hostOnly");
  }

  private requireLobby() {
    if (this.status !== "lobby") throw new GameError("err.lobbyOnly");
  }

  private requireTeamsMode() {
    if (this.settings.mode !== "teams") throw new GameError("err.teamsModeOnly");
  }
}
