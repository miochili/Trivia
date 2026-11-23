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
      const t = setTimeout(() => {
        attempt = 99; // signalling server not answering — don't keep waiting
        resolve(false);
      }, 8000);
      candidate.once("open", () => {
        clearTimeout(t);
        resolve(true);
      });
      candidate.once("error", (err: { type?: string }) => {
        clearTimeout(t);
        resolve(false);
        // A taken code just means "try another"; anything else = signalling server unreachable.
        if (err.type !== "unavailable-id") attempt = 99;
      });
    });
    if (ok) peer = candidate;
    else candidate.destroy();
  }
  // No signalling server? Host through the relay only (guests fall back to it automatically).
  if (!peer) code = makeRoomCode();
  const hostPeer = peer;

  const questionBank = new InMemoryQuestionBank();
  // Build the question list in the background while everyone is still in the lobby.
  setTimeout(() => questionBank.warmUp(), 1500);
  const manager = new RoomManager({ questionBank, persistence: new NoopPersistence() });
  const LOCAL_ID = "host-local";
  const dispatch = createDispatcher(manager, { fixedRoomCode: code, canCreateRoom: (c) => c.id === LOCAL_ID });
  manager.addConn({ id: LOCAL_ID, send: (e, p) => queueMicrotask(() => hub.fire(e, p)) });

  // Guests
  hostPeer?.on("connection", (dc) => {
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
  // Guests that can't reach us directly come in through the relay instead.
  let stopRelay: (() => void) | null = null;
  let hostClosed = false;
  const relayGuests = new Map<string, { conn: { id: string; send: (e: string, p?: unknown) => void }; send: (w: object) => void }>();
  const relayReady = import("./relay")
    .then(({ hostRelay }) =>
      hostRelay(code, {
        onOpen(gid, send) {
          const conn = { id: `relay:${gid}`, send: (e: string, p?: unknown) => send({ t: "evt", e, p }) };
          relayGuests.set(gid, { conn, send });
          manager.addConn(conn);
        },
        onMsg(gid, w) {
          const g = relayGuests.get(gid);
          if (!g) return;
          if (w.t === "ping") g.send({ t: "pong" });
          else if (w.t === "req" && typeof w.e === "string" && w.e !== "CREATE_ROOM" && typeof w.id === "number") {
            void dispatch(g.conn, w.e, w.p).then((r) => g.send({ t: "ack", id: w.id, r }));
          }
        },
        onClose(gid) {
          if (relayGuests.delete(gid)) manager.removeConn(`relay:${gid}`);
        },
      }),
    )
    .then((stop) => {
      stopRelay = stop;
      if (hostClosed) stop();
      return true;
    })
    .catch(() => false);
  if (!hostPeer && !(await relayReady)) {
    manager.shutdown();
    throw new Error("err.noResponse");
  }

  hostPeer?.on("disconnected", () => {
    // Lost the signalling server only — existing data channels keep working.
    setTimeout(() => !hostPeer.destroyed && hostPeer.reconnect(), 1000);
  });

  hub.fire(LOCAL.STATUS, "online");
  const transport: Transport = {
    kind: "host",
    request: (event, payload) => dispatch({ id: LOCAL_ID, send: () => {} }, event, payload),
    close: () => {
      hostClosed = true;
      stopRelay?.();
      manager.shutdown();
      hostPeer?.destroy();
    },
  };
  return { transport, code };
}

/**
 * Join someone's room. Tries a direct WebRTC link first; if that can't be made
 * (different networks, strict routers, mobile data) it falls back to the relay.
 * Reconnects automatically, switching route if needed.
 */
export async function joinAsGuest(code: string): Promise<Transport> {
  const { Peer } = await import("peerjs");
  const opts = await peerOptions();
  type Link = import("./relay").Link;
  let peer: InstanceType<typeof Peer> | null = null;
  let link: Link | null = null;
  let seq = 0;
  let everConnected = false;
  let closed = false;
  let lastSeen = Date.now();
  let lostSince: number | null = null;
  /** Once the direct route has failed, stick to the relay. */
  let useRelay = false;
  const pending = new Map<number, (r: Ack<Record<string, unknown>>) => void>();
  const waiters: (() => void)[] = [];

  const setStatus = (s: ConnStatus) => hub.fire(LOCAL.STATUS, s);

  const onWire = (w: Wire) => {
    lastSeen = Date.now();
    if (w.t === "ack") {
      pending.get(w.id)?.(w.r);
      pending.delete(w.id);
    } else if (w.t === "evt") hub.fire(w.e, w.p);
  };

  const dropPeer = () => {
    peer?.destroy();
    peer = null;
  };

  /** Direct WebRTC data channel. */
  const viaPeer = () =>
    new Promise<Link>((resolve, reject) => {
      let done = false;
      const fail = () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        peer?.off("error", onErr);
        reject(new Error("err.cantReachHost"));
      };
      const onErr = () => fail();
      const timer = setTimeout(fail, 8_000);
      const start = () => {
        if (done || !peer) return;
        const c = peer.connect(peerId(code), { reliable: true, serialization: "json" });
        const l: Link = { send: (w) => c.open && c.send(w), isOpen: () => c.open, close: () => c.close(), deadAfterMs: DEAD_AFTER_MS };
        c.on("open", () => {
          if (done) return c.close();
          done = true;
          clearTimeout(timer);
          peer?.off("error", onErr);
          resolve(l);
        });
        c.on("data", (raw) => link === l && onWire(raw as Wire));
        c.on("close", () => (link === l ? lost() : fail()));
        c.on("error", () => (link === l ? lost() : fail()));
      };
      if (!peer || peer.destroyed) {
        peer = new Peer(opts);
        peer.once("open", start);
        peer.on("disconnected", () => peer && !peer.destroyed && peer.reconnect());
      } else start();
      peer.on("error", onErr);
    });

  /** Through the public relay. */
  const viaRelay = async () => {
    const { joinRelay } = await import("./relay");
    let me: Link | null = null;
    me = await joinRelay(code, (w) => link === me && onWire(w as Wire));
    return me;
  };

  /** One attempt: direct first (unless it already failed before), then the relay. */
  const connectOnce = async (): Promise<Link> => {
    setStatus("connecting");
    if (!useRelay) {
      try {
        return await viaPeer();
      } catch {
        dropPeer();
      }
    }
    const l = await viaRelay();
    useRelay = true;
    return l;
  };

  const opened = (l: Link) => {
    if (closed) return l.close();
    link = l;
    lastSeen = Date.now();
    lostSince = null;
    setStatus("online");
    if (everConnected) hub.fire(LOCAL.RECONNECTED);
    everConnected = true;
    waiters.splice(0).forEach((w) => w());
  };

  let retrying = false;
  const lost = () => {
    if (closed || retrying) return;
    setStatus("offline");
    const old = link;
    link = null;
    old?.close();
    lostSince ??= Date.now();
    if (Date.now() - lostSince > 120_000) {
      hub.fire(LOCAL.HOST_LOST);
      return;
    }
    retrying = true;
    setTimeout(() => {
      connectOnce()
        .then((l) => {
          retrying = false;
          opened(l);
        })
        .catch(() => {
          retrying = false;
          lost();
        });
    }, 1500);
  };

  const hb = setInterval(() => {
    if (closed) return clearInterval(hb);
    if (!link) return;
    if (link.isOpen()) link.send({ t: "ping" } satisfies Wire);
    if (Date.now() - lastSeen > link.deadAfterMs) lost();
  }, HEARTBEAT_MS);

  // First connection: a few attempts before giving up, so a hiccup doesn't force a new lobby.
  for (let attempt = 1; ; attempt++) {
    try {
      opened(await connectOnce());
      break;
    } catch (e) {
      if (closed || attempt >= 3) {
        clearInterval(hb);
        dropPeer();
        throw e;
      }
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }

  return {
    kind: "guest",
    async request(event, payload, timeoutMs) {
      if (!link?.isOpen()) {
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
        link!.send({ t: "req", id, e: event, p: payload } satisfies Wire);
      });
    },
    close() {
      closed = true;
      clearInterval(hb);
      link?.close();
      dropPeer();
    },
  };
}
