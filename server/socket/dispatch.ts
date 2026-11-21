/**
 * Transport-agnostic request handling. Every Client→Server event goes through
 * here, whether it arrived over socket.io, a WebRTC data channel or a loopback:
 *   rate-limit → validate (zod) → authorise & apply → ack
 */
import type { ZodType } from "zod";
import { C2S } from "../../src/shared/events";
import { schemas } from "../../src/shared/schemas";
import type { Ack } from "../../src/shared/types";
import { GameError } from "../game/GameEngine";
import { TokenBucket } from "../lib/rateLimit";
import type { Conn, RoomManager } from "../rooms/RoomManager";

type Result = Record<string, unknown> | void;
type Handler = { schema: ZodType<unknown>; run: (conn: Conn, data: never) => Result | Promise<Result> };

export interface DispatchOptions {
  /** P2P host: only its own player may create the (single) room. */
  canCreateRoom?: (conn: Conn) => boolean;
  /** P2P host: the one room code that exists. */
  fixedRoomCode?: string;
}

export function createDispatcher(manager: RoomManager, opts: DispatchOptions = {}) {
  const buckets = new Map<string, TokenBucket>();
  const ctx = (conn: Conn) => manager.context(conn.id);
  const playing = (conn: Conn) => {
    const c = ctx(conn);
    if (!c.room.engine || c.room.status !== "playing") throw new GameError("err.noGame");
    return { ...c, engine: c.room.engine };
  };
  const session = (code: string, playerId: string, sessionToken: string) => ({
    roomCode: code,
    playerId,
    sessionToken,
    state: manager.getRoom(code).toPublic(),
  });

  const h = <T>(schema: ZodType<T>, run: (conn: Conn, data: T) => Result | Promise<Result>): Handler => ({
    schema: schema as ZodType<unknown>,
    run: run as Handler["run"],
  });

  const handlers: Record<string, Handler> = {
    [C2S.CREATE_ROOM]: h(schemas.createRoom, (conn, { name, clientId, avatar, settings }) => {
      if (opts.canCreateRoom && !opts.canCreateRoom(conn)) throw new GameError("err.hostOnly");
      const room = manager.createRoom(settings, opts.fixedRoomCode);
      void manager.deps.persistence.roomCreated({ code: room.code, settings: room.settings, hostClientId: clientId, hostName: name });
      const { player, sessionToken } = room.addPlayer(name, clientId, avatar);
      manager.bind(conn.id, room, player);
      return session(room.code, player.id, sessionToken);
    }),
    [C2S.JOIN_ROOM]: h(schemas.joinRoom, (conn, { roomCode, name, clientId, avatar }) => {
      const room = manager.getRoom(roomCode);
      const { player, sessionToken } = room.addPlayer(name, clientId, avatar);
      manager.bind(conn.id, room, player);
      return session(room.code, player.id, sessionToken);
    }),
    [C2S.REJOIN_ROOM]: h(schemas.rejoinRoom, (conn, { roomCode, sessionToken }) => {
      const room = manager.getRoom(roomCode);
      const player = room.findByToken(sessionToken);
      if (!player) throw new GameError("err.seatExpired");
      manager.bind(conn.id, room, player);
      return session(room.code, player.id, sessionToken);
    }),
    [C2S.LEAVE_ROOM]: h(schemas.empty, (conn) => manager.unbind(conn.id, true)),

    [C2S.UPDATE_SETTINGS]: h(schemas.updateSettings, (conn, patch) => {
      const { room, playerId } = ctx(conn);
      room.updateSettings(playerId, patch);
    }),
    [C2S.CREATE_TEAM]: h(schemas.createTeam, (conn, { name }) => {
      const { room, playerId } = ctx(conn);
      return { teamId: room.createTeam(playerId, name) };
    }),
    [C2S.JOIN_TEAM]: h(schemas.joinTeam, (conn, { teamId }) => {
      const { room, playerId } = ctx(conn);
      room.joinTeam(playerId, teamId);
    }),
    [C2S.MOVE_PLAYER]: h(schemas.movePlayer, (conn, { playerId: target, teamId }) => {
      const { room, playerId } = ctx(conn);
      room.movePlayer(playerId, target, teamId);
    }),
    [C2S.LIST_LOBBIES]: h(schemas.empty, () => ({
      lobbies: [...manager.rooms.values()]
        .map((r) => r.toOpenLobby())
        .filter(Boolean)
        .slice(0, 30),
    })),
    [C2S.RENAME_TEAM]: h(schemas.renameTeam, (conn, { teamId, name }) => {
      const { room, playerId } = ctx(conn);
      room.renameTeam(playerId, teamId, name);
    }),
    [C2S.AUTO_BALANCE_TEAMS]: h(schemas.autoBalance, (conn, { teamCount }) => {
      const { room, playerId } = ctx(conn);
      room.autoBalance(playerId, teamCount);
    }),
    [C2S.SET_READY]: h(schemas.setReady, (conn, { ready }) => {
      const { room, playerId } = ctx(conn);
      room.setReady(playerId, ready);
    }),
    [C2S.SET_AVATAR]: h(schemas.setAvatar, (conn, { avatar }) => {
      const { room, playerId } = ctx(conn);
      room.setAvatar(playerId, avatar);
    }),
    [C2S.REACT]: h(schemas.react, (conn, { emoji }) => {
      const { room, playerId } = ctx(conn);
      room.react(playerId, emoji);
    }),
    [C2S.KICK_PLAYER]: h(schemas.kick, (conn, { playerId: target }) => {
      const { room, playerId } = ctx(conn);
      manager.kickConn(room.kick(playerId, target), room.code);
    }),
    [C2S.START_GAME]: h(schemas.empty, async (conn) => {
      const { room, playerId } = ctx(conn);
      await room.startGame(playerId);
    }),

    [C2S.ROLL_DICE]: h(schemas.empty, (conn) => {
      const { engine, playerId } = playing(conn);
      return { value: engine.roll(playerId) };
    }),
    [C2S.SUBMIT_ANSWER]: h(schemas.submitAnswer, (conn, { questionId, optionIndex }) => {
      const { engine, playerId } = playing(conn);
      engine.submitAnswer(playerId, questionId, optionIndex);
    }),
    [C2S.SUGGEST_ANSWER]: h(schemas.submitAnswer, (conn, { questionId, optionIndex }) => {
      const { engine, playerId } = playing(conn);
      engine.suggest(playerId, questionId, optionIndex);
    }),
    [C2S.RETURN_TO_LOBBY]: h(schemas.empty, (conn) => {
      const { room, playerId } = ctx(conn);
      room.returnToLobby(playerId);
    }),
  };

  return async function dispatch(conn: Conn, event: string, raw: unknown): Promise<Ack<Record<string, unknown>>> {
    const handler = handlers[event];
    if (!handler) return { ok: false, error: "Unknown event", code: "err.invalid" };
    let bucket = buckets.get(conn.id);
    if (!bucket) buckets.set(conn.id, (bucket = new TokenBucket()));
    if (!bucket.take()) return { ok: false, error: "Slow down a little", code: "err.slowDown" };
    const parsed = handler.schema.safeParse(raw ?? {});
    if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid request", code: "err.invalid" };
    try {
      const result = await handler.run(conn, parsed.data as never);
      return { ok: true, ...(result ?? {}) };
    } catch (err) {
      if (err instanceof GameError) return { ok: false, error: err.message, code: err.code, params: err.params };
      console.error(`[dispatch] ${event} failed`, err);
      return { ok: false, error: "Something went wrong", code: "err.generic" };
    }
  };
}

export type Dispatch = ReturnType<typeof createDispatcher>;

/** Forget per-connection state when a connection closes. */
export function forgetConn(manager: RoomManager, connId: string) {
  manager.removeConn(connId);
}
