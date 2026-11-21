"use client";
/**
 * "Open games" list.
 *  - server mode: ask the Node server (LIST_LOBBIES), refreshed every few seconds
 *  - p2p mode (GitHub Pages): there is no server, so hosts announce their lobby
 *    on a free public MQTT relay as a retained message, and the start page
 *    subscribes to all announcements. A "last will" clears the entry if the
 *    host's tab disappears; stale entries are also dropped by timestamp.
 * Everything here is best-effort: if the relay is unreachable you can still
 * join with a code.
 */
import { useEffect, useRef, useState } from "react";
import { isValidAvatar } from "@/shared/avatar";
import { C2S } from "@/shared/events";
import type { OpenLobby, PublicRoomState } from "@/shared/types";
import { getTransport, MODE, request } from "./transport";

const TOPIC_ROOT = "trivia-quest-miochili/v1/lobbies";
const STALE_MS = 75_000;
const ANNOUNCE_EVERY_MS = 15_000;
const BROKERS = (process.env.NEXT_PUBLIC_LOBBY_BROKERS || "wss://broker.hivemq.com:8884/mqtt,wss://broker.emqx.io:8084/mqtt")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export type LobbyListStatus = "loading" | "ok" | "unavailable";

type MqttClient = import("mqtt").MqttClient;

/** Connect to the first relay that answers. */
async function connectRelay(will?: { topic: string }): Promise<MqttClient | null> {
  const mqtt = (await import("mqtt")).default;
  for (const url of BROKERS) {
    const client = mqtt.connect(url, {
      clientId: `tq_${Math.random().toString(36).slice(2, 12)}`,
      clean: true,
      keepalive: 30,
      connectTimeout: 6000,
      reconnectPeriod: 4000,
      ...(will ? { will: { topic: will.topic, payload: "", retain: true, qos: 0 as const } } : {}),
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
  }
  return null;
}

function parseLobby(code: string, raw: string): OpenLobby | null {
  try {
    const l = JSON.parse(raw) as OpenLobby;
    if (l.code !== code || !/^[A-Z]{6}$/.test(code)) return null;
    if (typeof l.host !== "string" || l.host.length > 20 || !isValidAvatar(l.hostAvatar)) return null;
    if (![l.players, l.max, l.ts].every((n) => Number.isFinite(n)) || l.players >= l.max) return null;
    if (l.mode !== "ffa" && l.mode !== "teams") return null;
    return { code, host: l.host, hostAvatar: l.hostAvatar, players: l.players, max: l.max, mode: l.mode, ts: l.ts };
  } catch {
    return null;
  }
}

/** Live list of joinable games for the start page. */
export function useOpenLobbies(): { lobbies: OpenLobby[]; status: LobbyListStatus } {
  const [lobbies, setLobbies] = useState<OpenLobby[]>([]);
  const [status, setStatus] = useState<LobbyListStatus>("loading");

  useEffect(() => {
    let alive = true;
    if (MODE === "server") {
      const load = async () => {
        const res = await request<{ lobbies: OpenLobby[] }>(C2S.LIST_LOBBIES, {}, 5000);
        if (!alive) return;
        if (res.ok) {
          setLobbies(res.lobbies);
          setStatus("ok");
        } else setStatus("unavailable");
      };
      void load();
      const id = setInterval(load, 4000);
      return () => {
        alive = false;
        clearInterval(id);
      };
    }

    let client: MqttClient | null = null;
    const seen = new Map<string, OpenLobby>();
    const publish = () => {
      const now = Date.now();
      for (const [k, l] of seen) if (now - l.ts > STALE_MS) seen.delete(k);
      setLobbies([...seen.values()].sort((a, b) => b.ts - a.ts));
    };
    void connectRelay().then((c) => {
      if (!alive) return c?.end(true);
      if (!c) return setStatus("unavailable");
      client = c;
      setStatus("ok");
      c.subscribe(`${TOPIC_ROOT}/+`);
      c.on("message", (topic, payload) => {
        const code = topic.split("/").pop() ?? "";
        const raw = payload.toString();
        const l = raw ? parseLobby(code, raw) : null;
        if (l) seen.set(code, l);
        else seen.delete(code);
        publish();
      });
    });
    const tick = setInterval(publish, 5000);
    return () => {
      alive = false;
      clearInterval(tick);
      client?.end(true);
    };
  }, []);

  return { lobbies, status };
}

/**
 * P2P host: announce this room while it waits for players and is public.
 * Clears the announcement when the game starts, goes private, or the host leaves.
 */
export function useAnnounceLobby(state: PublicRoomState, isHost: boolean) {
  const clientRef = useRef<MqttClient | null>(null);
  const hosting = MODE === "p2p" && isHost && getTransport()?.kind === "host";
  const topic = `${TOPIC_ROOT}/${state.code}`;
  const host = state.players.find((p) => p.id === state.hostId);
  const entry: OpenLobby | null =
    hosting && state.status === "lobby" && state.settings.isPublic && host && state.players.length < state.settings.maxPlayers
      ? { code: state.code, host: host.name, hostAvatar: host.avatar, players: state.players.length, max: state.settings.maxPlayers, mode: state.settings.mode, ts: 0 }
      : null;
  const payloadKey = entry ? JSON.stringify({ ...entry, ts: 0 }) : "";

  // one relay connection per hosted room
  useEffect(() => {
    if (!hosting) return;
    let alive = true;
    void connectRelay({ topic }).then((c) => {
      if (!alive) return c?.end(true);
      clientRef.current = c;
    });
    return () => {
      alive = false;
      const c = clientRef.current;
      clientRef.current = null;
      if (c) c.publish(topic, "", { retain: true }, () => c.end());
    };
  }, [hosting, topic]);

  // (re)announce on changes and every 15 s; clear when not joinable
  useEffect(() => {
    if (!hosting) return;
    const send = () => {
      const c = clientRef.current;
      if (!c?.connected) return;
      if (payloadKey) c.publish(topic, JSON.stringify({ ...JSON.parse(payloadKey), ts: Date.now() }), { retain: true });
      else c.publish(topic, "", { retain: true });
    };
    send();
    const first = setTimeout(send, 1500); // in case the relay connected just after mount
    const id = setInterval(send, ANNOUNCE_EVERY_MS);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [hosting, topic, payloadKey]);
}
