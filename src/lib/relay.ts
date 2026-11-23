"use client";
/**
 * Fallback connection for p2p mode when a direct WebRTC link can't be made
 * (different networks, strict routers, mobile data). Messages go through a
 * free public MQTT broker — the same ones that carry the open-games list.
 *
 *   guest → host:  <root>/<CODE>/up/<guestId>
 *   host → guest:  <root>/<CODE>/down/<guestId>
 *
 * The host listens on every broker; a guest uses the first one that answers.
 */
import type { MqttClient } from "mqtt";

const ROOT = "trivia-quest-miochili/v1/relay";
const BROKERS = (process.env.NEXT_PUBLIC_LOBBY_BROKERS || "wss://broker.hivemq.com:8884/mqtt,wss://broker.emqx.io:8084/mqtt")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export type RelayMsg = { t: string; [k: string]: unknown };
export interface Link {
  send(w: object): void;
  isOpen(): boolean;
  close(): void;
  /** How long without any message before the link counts as dead. */
  deadAfterMs: number;
}

async function connectBroker(url: string, will?: { topic: string; payload: string }): Promise<MqttClient | null> {
  const mqtt = (await import("mqtt")).default;
  const client = mqtt.connect(url, {
    clientId: `tqr_${Math.random().toString(36).slice(2, 12)}`,
    clean: true,
    keepalive: 20,
    connectTimeout: 6000,
    reconnectPeriod: 2000,
    ...(will ? { will: { ...will, retain: false, qos: 0 as const } } : {}),
  });
  const ok = await new Promise<boolean>((resolve) => {
    const t = setTimeout(() => resolve(false), 7000);
    client.once("connect", () => {
      clearTimeout(t);
      resolve(true);
    });
    client.once("error", () => {
      clearTimeout(t);
      resolve(false);
    });
  });
  if (ok) return client;
  client.end(true);
  return null;
}

const parse = (buf: Uint8Array | string): RelayMsg | null => {
  try {
    const w = JSON.parse(typeof buf === "string" ? buf : new TextDecoder().decode(buf));
    return w && typeof w.t === "string" ? (w as RelayMsg) : null;
  } catch {
    return null;
  }
};

/** Guest: reach the host of `code` through a broker. Resolves once the host has answered. */
export async function joinRelay(code: string, onMsg: (w: RelayMsg) => void): Promise<Link> {
  const gid = Math.random().toString(36).slice(2, 12);
  const up = `${ROOT}/${code}/up/${gid}`;
  const down = `${ROOT}/${code}/down/${gid}`;
  for (const url of BROKERS) {
    const c = await connectBroker(url, { topic: up, payload: JSON.stringify({ t: "bye" }) });
    if (!c) continue;
    let alive = true;
    const welcomed = await new Promise<boolean>((resolve) => {
      let done = false;
      const finish = (v: boolean) => {
        if (done) return;
        done = true;
        clearTimeout(t);
        clearInterval(again);
        resolve(v);
      };
      const t = setTimeout(() => finish(false), 8000);
      const hello = () => c.publish(up, JSON.stringify({ t: "hello" }));
      const again = setInterval(hello, 2000);
      c.on("message", (_topic, buf) => {
        const w = parse(buf);
        if (!w) return;
        if (w.t === "welcome") finish(true);
        else if (alive) onMsg(w);
      });
      // (Re)subscribe on every (re)connect — sessions are clean.
      c.on("connect", () => c.subscribe(down));
      c.subscribe(down, () => hello());
    });
    if (welcomed) {
      return {
        send: (w) => c.publish(up, JSON.stringify(w)),
        isOpen: () => alive && c.connected,
        close: () => {
          if (!alive) return;
          alive = false;
          c.publish(up, JSON.stringify({ t: "bye" }), () => c.end());
        },
        deadAfterMs: 20_000,
      };
    }
    alive = false;
    c.end(true);
  }
  throw new Error("err.cantReachHost");
}

/** Host: accept relay guests for `code` on every broker. Returns a stop function. */
export async function hostRelay(
  code: string,
  h: {
    onOpen(gid: string, send: (w: object) => void): void;
    onMsg(gid: string, w: RelayMsg): void;
    onClose(gid: string): void;
  },
): Promise<() => void> {
  const clients = (await Promise.all(BROKERS.map((u) => connectBroker(u)))).filter((c): c is MqttClient => !!c);
  if (!clients.length) throw new Error("err.noResponse");
  const lastSeen = new Map<string, number>();
  const gone = (gid: string) => {
    if (lastSeen.delete(gid)) h.onClose(gid);
  };
  const pattern = `${ROOT}/${code}/up/+`;
  for (const c of clients) {
    c.subscribe(pattern);
    c.on("connect", () => c.subscribe(pattern));
    c.on("message", (topic, buf) => {
      const gid = topic.slice(topic.lastIndexOf("/") + 1);
      if (!/^[a-z0-9]{4,16}$/.test(gid)) return;
      const w = parse(buf);
      if (!w) return;
      if (w.t === "bye") return gone(gid);
      const send = (x: object) => c.publish(`${ROOT}/${code}/down/${gid}`, JSON.stringify(x));
      if (!lastSeen.has(gid)) h.onOpen(gid, send);
      lastSeen.set(gid, Date.now());
      if (w.t === "hello") send({ t: "welcome" });
      else h.onMsg(gid, w);
    });
  }
  const sweep = setInterval(() => {
    for (const [gid, ts] of lastSeen) if (Date.now() - ts > 25_000) gone(gid);
  }, 5000);
  return () => {
    clearInterval(sweep);
    for (const gid of [...lastSeen.keys()]) gone(gid);
    clients.forEach((c) => c.end(true));
  };
}
