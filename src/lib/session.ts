"use client";
import type { SessionInfo } from "@/shared/events";

/** localStorage can throw (private mode, embedded contexts) — never let it break the app. */
function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

export function getClientId(): string {
  return safe(() => {
    let id = localStorage.getItem("tq:clientId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("tq:clientId", id);
    }
    return id;
  }, "anon-" + Math.random().toString(36).slice(2, 12));
}

export const getSavedName = () => safe(() => localStorage.getItem("tq:name") ?? "", "");
export const saveName = (n: string) => safe(() => localStorage.setItem("tq:name", n), undefined);

export type StoredSession = SessionInfo & { role?: "host" | "guest" | "server" };

export const getSavedAvatar = () => safe(() => localStorage.getItem("tq:avatar") ?? "", "");
export const saveAvatar = (a: string) => safe(() => localStorage.setItem("tq:avatar", a), undefined);

export function saveSession(s: StoredSession) {
  safe(() => localStorage.setItem(`tq:session:${s.roomCode}`, JSON.stringify(s)), undefined);
}
export function loadSession(code: string): StoredSession | null {
  return safe(() => {
    const raw = localStorage.getItem(`tq:session:${code.toUpperCase()}`);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  }, null);
}
export function clearSession(code: string) {
  safe(() => localStorage.removeItem(`tq:session:${code.toUpperCase()}`), undefined);
}
