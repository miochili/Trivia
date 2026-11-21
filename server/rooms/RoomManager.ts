import { TIMING } from "../../src/shared/constants";
import { S2C } from "../../src/shared/events";
import type { GameSettings } from "../../src/shared/types";
import { GameError } from "../game/GameEngine";
import { makeRoomCode } from "../lib/ids";
import type { GamePersistence } from "../persistence/GamePersistence";
import type { QuestionBank } from "../questions/QuestionBank";
import { Room, type PlayerRecord } from "./Room";

/**
 * One client connection, whatever carries it: a socket.io socket (server
 * mode), a WebRTC data channel (peer-to-peer mode) or an in-tab loopback
 * (the P2P host's own player).
 */
export interface Conn {
  readonly id: string;
  send(event: string, payload?: unknown): void;
}

export interface ManagerDeps {
  persistence: GamePersistence;
  questionBank: QuestionBank;
}

/**
 * Registry of live rooms + the connection ↔ (room, player) binding.
 * A player is identified by their session token, NOT by connection, so a new
 * connection (page refresh, network blip, phone sleep) can reclaim the seat.
 */
export class RoomManager {
  readonly rooms = new Map<string, Room>();
  private readonly conns = new Map<string, Conn>();
  private readonly byConn = new Map<string, { code: string; playerId: string }>();
  private readonly members = new Map<string, Set<string>>(); // room code → conn ids
  private gcTimer: ReturnType<typeof setInterval>;

  constructor(readonly deps: ManagerDeps) {
    this.gcTimer = setInterval(() => this.collectGarbage(), 60_000);
    (this.gcTimer as { unref?: () => void }).unref?.();
  }

  // ── connections ───────────────────────────────────────────────
  addConn(conn: Conn) {
    this.conns.set(conn.id, conn);
  }

  removeConn(connId: string) {
    this.unbind(connId, false);
    this.conns.delete(connId);
  }

  broadcast(code: string, event: string, payload: unknown) {
    for (const id of this.members.get(code) ?? []) this.conns.get(id)?.send(event, payload);
  }

  // ── rooms ─────────────────────────────────────────────────────
  createRoom(settings?: Partial<GameSettings>, fixedCode?: string): Room {
    let code = fixedCode ?? makeRoomCode();
    while (!fixedCode && this.rooms.has(code)) code = makeRoomCode();
    if (this.rooms.has(code)) throw new GameError("err.generic");
    const room = new Room(
      code,
      {
        broadcast: (event, payload) => this.broadcast(code, event, payload),
        persistence: this.deps.persistence,
        questionBank: this.deps.questionBank,
      },
      settings,
    );
    this.rooms.set(code, room);
    this.members.set(code, new Set());
    return room;
  }

  getRoom(code: string): Room {
    const room = this.rooms.get(code.toUpperCase());
    if (!room) throw new GameError("err.roomNotFound");
    return room;
  }

  /** Attach a connection to a seat, evicting any older connection holding it. */
  bind(connId: string, room: Room, player: PlayerRecord) {
    const current = this.byConn.get(connId);
    if (current?.code === room.code && current.playerId === player.id) {
      room.markConnected(player.id, connId); // idempotent rebind
      return;
    }
    this.unbind(connId, false);
    if (player.socketId && player.socketId !== connId) {
      const old = player.socketId;
      this.conns.get(old)?.send(S2C.SESSION_REPLACED);
      this.byConn.delete(old);
      this.members.get(room.code)?.delete(old);
    }
    this.byConn.set(connId, { code: room.code, playerId: player.id });
    this.members.get(room.code)?.add(connId);
    room.markConnected(player.id, connId);
  }

  /** Detach the connection. `leave=true` means the player intentionally left. */
  unbind(connId: string, leave: boolean) {
    const b = this.byConn.get(connId);
    if (!b) return;
    this.byConn.delete(connId);
    this.members.get(b.code)?.delete(connId);
    const room = this.rooms.get(b.code);
    if (!room) return;
    const p = room.players.get(b.playerId);
    if (!p || p.socketId !== connId) return; // seat already moved to a newer connection
    if (leave) room.removePlayer(b.playerId);
    else room.markDisconnected(b.playerId);
  }

  context(connId: string): { room: Room; playerId: string } {
    const b = this.byConn.get(connId);
    const room = b && this.rooms.get(b.code);
    if (!b || !room || !room.players.has(b.playerId)) throw new GameError("err.notInRoom");
    return { room, playerId: b.playerId };
  }

  kickConn(player: PlayerRecord, code: string) {
    if (!player.socketId) return;
    const id = player.socketId;
    this.conns.get(id)?.send(S2C.KICKED, { reason: "room.kicked" });
    this.byConn.delete(id);
    this.members.get(code)?.delete(id);
  }

  private collectGarbage() {
    const now = Date.now();
    for (const [code, room] of this.rooms) {
      if (room.emptySince && now - room.emptySince > TIMING.EMPTY_ROOM_TTL_MS) {
        room.dispose();
        this.rooms.delete(code);
        this.members.delete(code);
        void this.deps.persistence.roomClosed(code);
      }
    }
  }

  shutdown() {
    clearInterval(this.gcTimer);
    for (const room of this.rooms.values()) room.dispose();
  }
}
