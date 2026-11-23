"use client";
/**
 * Client ↔ game connection, in two flavours behind one interface:
 *
 *  server mode (default): socket.io to the Node server (`npm start`, Render, Docker).
 *  p2p mode (NEXT_PUBLIC_MODE=p2p): no server at all — the HOST's browser runs the
 *    exact same RoomManager/GameEngine code and guests connect to it over WebRTC
 *    data channels (PeerJS). This is what powers the static GitHub Pages site.
 *
 * Everything the server pushes is re-emitted on a tiny hub the zustand store listens to.
 */
import type { Ack } from "@/shared/types";

export type ConnStatus = "connecting" | "online" | "offline";
export const MODE: "server" | "p2p" = process.env.NEXT_PUBLIC_MODE === "p2p" ? "p2p" : "server";

// ── event hub ──────────────────────────────────────────────────────
type Fn = (payload: never) => void;
const listeners = new Map<string, Set<Fn>>();
export const hub = {
  on(event: string, fn: Fn) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event)!.add(fn);
    return () => listeners.get(event)?.delete(fn);
  },
  fire(event: string, payload?: unknown) {
    listeners.get(event)?.forEach((fn) => (fn as (p: unknown) => void)(payload));
  },
};
/** Pseudo-events the transports fire on the hub. */
export const LOCAL = { STATUS: "__status", RECONNECTED: "__reconnected", HOST_LOST: "__host_lost" } as const;

export interface Transport {
  request(event: string, payload: object, timeoutMs: number): Promise<Ack<Record<string, unknown>>>;
  close(): void;
  readonly kind: "server" | "host" | "guest";
}

let current: Transport | null = null;
export const getTransport = () => current;
export function setTransport(t: Transport | null) {
  if (current && current !== t) current.close();
  current = t;
}

const noResponse = { ok: false as const, error: "No response", code: "err.noResponse" };

/** Acked request over whichever transport is active. */
export async function request<T extends object = object>(event: string, payload: object = {}, timeoutMs = 9000): Promise<Ack<T>> {
  if (!current && MODE === "server") current = await createServerTransport();
  if (!current) return noResponse;
  return (await current.request(event, payload, timeoutMs)) as Ack<T>;
}

// ── server mode: socket.io ─────────────────────────────────────────
export async function createServerTransport(): Promise<Transport> {
  const { io } = await import("socket.io-client");
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || undefined, {
    transports: ["websocket", "polling"],
    reconnectionDelay: 500,
    reconnectionDelayMax: 4000,
  });
  let first = true;
  hub.fire(LOCAL.STATUS, "connecting");
  socket.on("connect", () => {
    hub.fire(LOCAL.STATUS, "online");
    if (!first) hub.fire(LOCAL.RECONNECTED);
    first = false;
  });
  socket.on("disconnect", () => hub.fire(LOCAL.STATUS, "offline"));
  socket.onAny((event: string, payload: unknown) => hub.fire(event, payload));
  return {
    kind: "server",
    request: (event, payload, timeoutMs) =>
      new Promise((resolve) =>
        socket.timeout(timeoutMs).emit(event, payload, (err: Error | null, res: Ack<Record<string, unknown>>) => resolve(err ? noResponse : res)),
      ),
    close: () => socket.close(),
  };
}

// ── p2p mode: PeerJS ───────────────────────────────────────────────
const peerId = (code: string) => `trivia-quest-${code.toLowerCase()}`;

async function peerOptions() {
  const host = process.env.NEXT_PUBLIC_PEER_HOST;
  return {
    ...(host
      ? {
          host,
          port: Number(process.env.NEXT_PUBLIC_PEER_PORT || 443),
          path: process.env.NEXT_PUBLIC_PEER_PATH || "/",
          secure: process.env.NEXT_PUBLIC_PEER_SECURE !== "false",
        }
      : {}),
    debug: 0,
    config: {
      iceServers: [
        { urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] },
        { urls: "stun:stun.cloudflare.com:3478" },
        // Free public relay for strict mobile networks (best effort).
        { urls: ["turn:openrelay.metered.ca:80", "turn:openrelay.metered.ca:443", "turn:openrelay.metered.ca:443?transport=tcp"], username: "openrelayproject", credential: "openrelayproject" },
      ],
    },
  };
}

type Wire =
  | { t: "req"; id: number; e: string; p: unknown }
  | { t: "ack"; id: number; r: Ack<Record<string, unknown>> }
  | { t: "evt"; e: string; p: unknown }
  | { t: "ping" }
  | { t: "pong" };

const HEARTBEAT_MS = 2500;
const DEAD_AFTER_MS = 9000;

/**
 * Host a room: claim the peer id for a fresh code, then run the real game
 * server (RoomManager + dispatcher) right here in this tab.
 */
export async function startHosting(): Promise<{ transport: Transport; code: string }> {
  const [{ Peer }, { RoomManager }, { createDispatcher }, { InMemoryQuestionBank }, { NoopPersistence }, { makeRoomCode }] = await Promise.all([
    import("peerjs"),
    import("../../server/rooms/RoomManager"),
    import("../../server/socket/dispatch"),
    import("../../server/questions/QuestionBank"),
    import("../../server/persistence/GamePersistence"),
    import("../../server/lib/ids"),
  ]);
  const opts = await peerOptions();

  // Claim a free code on the signalling server.
  let peer: InstanceType<typeof Peer> | null = null;
  let code = "";
  for (let attempt = 0; attempt < 5 && !peer; attempt++) {
    code = makeRoomCode();
    const candidate = new Peer(peerId(code), opts);
    const ok = await new Promise<boolean>((resolve) => {
      candidate.once("open", () => resolve(true));
      candidate.once("error", (err: { type?: string }) => {
        candidate.destroy();
        if (err.type === "unavailable-id") resolve(false);
        else resolve(false);
      });
    });
    if (ok) peer = candidate;
  }
  if (!peer) throw new Error("err.noResponse");
  const hostPeer = peer;

  const questionBank = new InMemoryQuestionBank();
  // Build the question list in the background while everyone is still in the lobby.
  setTimeout(() => questionBank.warmUp(), 1500);
  const manager = new RoomManager({ questionBank, persistence: new NoopPersistence() });
  const LOCAL_ID = "host-local";
  const dispatch = createDispatcher(manager, { fixedRoomCode: code, canCreateRoom: (c) => c.id === LOCAL_ID });
  manager.addConn({ id: LOCAL_ID, send: (e, p) => queueMicrotask(() => hub.fire(e, p)) });

  // Guests
  hostPeer.on("connection", (dc) => {
    const id = `${dc.peer}:${dc.connectionId}`;
    let lastSeen = Date.now();
    const send = (w: Wire) => {
      if (dc.open) dc.send(w);
    };
    const conn = { id, send: (e: string, p?: unknown) => send({ t: "evt", e, p }) };
    const timer = setInterval(() => {
      if (Date.now() - lastSeen > DEAD_AFTER_MS) close();
    }, HEARTBEAT_MS);
    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      clearInterval(timer);
      manager.removeConn(id);
      dc.close();
    };
    dc.on("open", () => manager.addConn(conn));
    dc.on("data", (raw) => {
      lastSeen = Date.now();
      const w = raw as Wire;
      if (w?.t === "ping") send({ t: "pong" });
      else if (w?.t === "req" && typeof w.e === "string" && w.e !== "CREATE_ROOM") {
        void dispatch(conn, w.e, w.p).then((r) => send({ t: "ack", id: w.id, r }));
      }
    });
    dc.on("close", close);
    dc.on("error", close);
  });
  hostPeer.on("disconnected", () => {
    // Lost the signalling server only — existing data channels keep working.
    setTimeout(() => !hostPeer.destroyed && hostPeer.reconnect(), 1000);
  });

  hub.fire(LOCAL.STATUS, "online");
  const transport: Transport = {
    kind: "host",
    request: (event, payload) => dispatch({ id: LOCAL_ID, send: () => {} }, event, payload),
    close: () => {
      manager.shutdown();
      hostPeer.destroy();
    },
  };
  return { transport, code };
}

/** Join someone's room over WebRTC; reconnects automatically. */
export async function joinAsGuest(code: string): Promise<Transport> {
  const { Peer } = await import("peerjs");
  const opts = await peerOptions();
  let peer: InstanceType<typeof Peer> | null = null;
  let dc: ReturnType<InstanceType<typeof Peer>["connect"]> | null = null;
  let seq = 0;
  let everConnected = false;
  let closed = false;
  let lastSeen = Date.now();
  let lostSince: number | null = null;
  const pending = new Map<number, (r: Ack<Record<string, unknown>>) => void>();
  const waiters: (() => void)[] = [];

  const setStatus = (s: ConnStatus) => hub.fire(LOCAL.STATUS, s);

  const connect = () =>
    new Promise<void>((resolve, reject) => {
      if (closed) return reject(new Error("closed"));
      setStatus("connecting");
      const start = () => {
        const c = peer!.connect(peerId(code), { reliable: true, serialization: "json" });
        dc = c;
        const failTimer = setTimeout(() => c.open || fail(), 12000);
        c.on("open", () => {
          clearTimeout(failTimer);
          lastSeen = Date.now();
          lostSince = null;
          setStatus("online");
          if (everConnected) hub.fire(LOCAL.RECONNECTED);
          everConnected = true;
          waiters.splice(0).forEach((w) => w());
          resolve();
        });
        c.on("data", (raw) => {
          lastSeen = Date.now();
          const w = raw as Wire;
          if (w.t === "ack") {
            pending.get(w.id)?.(w.r);
            pending.delete(w.id);
          } else if (w.t === "evt") hub.fire(w.e, w.p);
        });
        c.on("close", () => dc === c && lost());
        c.on("error", () => dc === c && lost());
      };
      const fail = () => {
        if (!everConnected) reject(new Error("err.cantReachHost"));
        else lost();
      };
      if (!peer || peer.destroyed) {
        peer = new Peer(opts);
        peer.once("open", start);
        peer.on("error", (err: { type?: string }) => {
          if (err.type === "peer-unavailable") fail();
          else if (!everConnected) reject(new Error("err.cantReachHost"));
        });
        peer.on("disconnected", () => !peer!.destroyed && peer!.reconnect());
      } else start();
    });

  let retrying = false;
  const lost = () => {
    if (closed || retrying) return;
    setStatus("offline");
    lostSince ??= Date.now();
    if (Date.now() - lostSince > 120_000) {
      hub.fire(LOCAL.HOST_LOST);
      return;
    }
    retrying = true;
    dc = null;
    setTimeout(() => {
      retrying = false;
      connect().catch(() => {
        peer?.destroy();
        peer = null;
        lost();
      });
    }, 2000);
  };

  const hb = setInterval(() => {
    if (closed) return clearInterval(hb);
    if (dc?.open) {
      dc.send({ t: "ping" } satisfies Wire);
      if (Date.now() - lastSeen > DEAD_AFTER_MS) {
        dc.close();
        lost();
      }
    }
  }, HEARTBEAT_MS);

  // First connection: retry a few times with a fresh peer — a single hiccup on the signalling
  // server or a slow network shouldn't force everyone into a new lobby.
  for (let attempt = 1; ; attempt++) {
    try {
      await connect();
      break;
    } catch (e) {
      if (closed || attempt >= 4) throw e;
      (dc as { close(): void } | null)?.close();
      dc = null;
      (peer as { destroy(): void } | null)?.destroy();
      peer = null;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }

  return {
    kind: "guest",
    async request(event, payload, timeoutMs) {
      if (!dc?.open) {
        const ready = await Promise.race([
          new Promise<boolean>((r) => waiters.push(() => r(true))),
          new Promise<boolean>((r) => setTimeout(() => r(false), timeoutMs)),
        ]);
        if (!ready) return noResponse;
      }
      const id = ++seq;
      return new Promise((resolve) => {
        const t = setTimeout(() => {
          pending.delete(id);
          resolve(noResponse);
        }, timeoutMs);
        pending.set(id, (r) => {
          clearTimeout(t);
          resolve(r);
        });
        dc!.send({ t: "req", id, e: event, p: payload } satisfies Wire);
      });
    },
    close() {
      closed = true;
      clearInterval(hb);
      peer?.destroy();
    },
  };
}
