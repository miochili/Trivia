"use client";
/**
 * Single-page shell. Rooms live at short links — <site>/KOBALI — which works on
 * the Node server (unknown path → this page) and on GitHub Pages (404.html →
 * this page). Navigation uses history.pushState, so it also works as a static export.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_AVATAR } from "@/shared/constants";
import { C2S, type SessionInfo } from "@/shared/events";
import type { Ack, PublicRoomState } from "@/shared/types";
import { errorText, useT } from "@/lib/i18n";
import { clearSession, getClientId, getSavedAvatar, getSavedName, loadSession, saveAvatar, saveName, saveSession } from "@/lib/session";
import { useGame, wireSocketToStore } from "@/lib/store";
import { getTransport, hub, joinAsGuest, LOCAL, MODE, request, setTransport, startHosting } from "@/lib/transport";
import { GameScreen } from "./game/GameScreen";
import { IdentityCard } from "./IdentityCard";
import { LobbyScreen } from "./lobby/LobbyScreen";
import { Button, CodeTiles, Token } from "./ui/primitives";
import { useOpenLobbies } from "@/lib/lobbies";
import { LanguageSwitcher } from "./ui/LanguageSwitcher";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const CODE_RE = /^[A-Za-z]{6}$/;
type JoinRes = SessionInfo & { state: PublicRoomState };

function codeFromUrl(): string | null {
  const q = new URLSearchParams(location.search).get("room");
  if (q && CODE_RE.test(q)) return q.toUpperCase();
  const last = location.pathname.slice(BASE_PATH.length).split("/").filter(Boolean).pop() ?? "";
  return CODE_RE.test(last) ? last.toUpperCase() : null;
}
export const roomUrl = (code: string) => `${location.origin}${BASE_PATH}/${code}`;

export function App() {
  const [code, setCode] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    wireSocketToStore();
    setCode(codeFromUrl());
    setReady(true);
    const onPop = () => setCode(codeFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go = useCallback((next: string | null) => {
    history.pushState(null, "", next ? `${BASE_PATH}/${next}` : `${BASE_PATH}/`);
    setCode(next);
  }, []);

  if (!ready) return null;
  return code ? <RoomView key={code} code={code} go={go} /> : <Home go={go} />;
}

/* ───────────────────────────── home ───────────────────────────── */

function useIdentity() {
  // Client-only (App renders after mount), so reading localStorage up front is safe.
  const [name, setName] = useState(() => getSavedName());
  const [avatar, setAvatar] = useState<string>(() => getSavedAvatar() || DEFAULT_AVATAR);
  const remember = () => {
    saveName(name.trim());
    saveAvatar(avatar);
  };
  return { name, setName, avatar, setAvatar, remember };
}

function Home({ go }: { go: (c: string | null) => void }) {
  const { t, locale } = useT();
  const id = useIdentity();
  const [joinCode, setJoinCode] = useState("");
  const [busy, setBusy] = useState<"create" | "join" | null>(null);
  const [error, setError] = useState<string | null>(null);

  /** Accepts "kobali", "KOBALI" or a pasted invite link ".../KOBALI". */
  const onCode = (raw: string) => {
    const fromLink = raw.match(/([A-Za-z]{6})\/?(?:\?.*)?$/)?.[1];
    setJoinCode((raw.length > 6 && fromLink ? fromLink : raw).toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6));
  };

  async function create() {
    setError(null);
    if (!id.name.trim()) return setError(t("home.needName"));
    id.remember();
    setBusy("create");
    try {
      if (MODE === "p2p") {
        const { transport } = await startHosting();
        setTransport(transport);
      }
      const res = await request<JoinRes>(C2S.CREATE_ROOM, { name: id.name.trim(), clientId: getClientId(), avatar: id.avatar });
      if (!res.ok) return setError(errorText(locale, res));
      saveSession({ roomCode: res.roomCode, playerId: res.playerId, sessionToken: res.sessionToken, role: MODE === "p2p" ? "host" : "server" });
      useGame.getState().setPlayer(res.playerId);
      useGame.getState().applyState(res.state);
      go(res.roomCode);
    } catch (e) {
      setError(t((e as Error).message?.startsWith("err.") ? (e as Error).message : "err.noResponse"));
    } finally {
      setBusy(null);
    }
  }

  function join(code: string = joinCode) {
    setError(null);
    if (!id.name.trim()) {
      document.getElementById("name")?.focus();
      return setError(t("home.needName"));
    }
    if (code.length !== 6) return setError(t("home.codeLength"));
    id.remember();
    sessionStorage.setItem("tq:autojoin", code);
    go(code);
  }

  return (
    <main className="relative mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-16">
      <LanguageSwitcher className="absolute right-4 top-4" />
      <header className="text-center">
        <CompassMark />
        <h1 className="mt-3 font-display text-5xl text-vellum">{t("app.title")}</h1>
        <p className="mt-2 text-lg text-vellum/75">{t("app.tagline")}</p>
      </header>

      <section className="parchment mt-8 p-6">
        <IdentityCard name={id.name} setName={id.setName} avatar={id.avatar} setAvatar={id.setAvatar} onEnter={() => (joinCode.length === 6 ? join() : create())} />

        <div className="ink-rule my-6" />

        <OpenGames onJoin={join} />

        <h2 className="mt-6 font-display text-xl">{t("home.joinTitle")}</h2>
        <p className="mt-0.5 text-[15px] text-ink-soft">{t("home.joinHint")}</p>
        <div className="mt-3 flex gap-2">
          <input
            id="code"
            value={joinCode}
            onChange={(e) => onCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && join()}
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            placeholder="KOBALI"
            aria-label={t("home.code")}
            className="w-0 min-w-0 flex-1 rounded-lg border-2 border-ink/25 bg-vellum px-2 py-2.5 text-center font-display text-xl tracking-[0.2em] text-ink outline-none placeholder:text-ink/20 focus:border-brass sm:text-2xl"
          />
          <Button variant="brass" className="shrink-0 px-4 font-display text-lg" disabled={!!busy || joinCode.length !== 6} onClick={() => join()}>
            {t("home.join")}
          </Button>
        </div>

        <div className="my-6 flex items-center gap-3 text-ink-soft">
          <span className="ink-rule flex-1" />
          {t("home.or")}
          <span className="ink-rule flex-1" />
        </div>

        <h2 className="font-display text-xl">{t("home.createTitle")}</h2>
        <p className="mt-0.5 text-[15px] text-ink-soft">{t("home.createHint")}</p>
        <Button className="mt-3 w-full py-3 font-display text-lg" disabled={!!busy} onClick={create}>
          {busy === "create" ? t("home.creating") : t("home.create")}
        </Button>

        {error && (
          <p role="alert" className="mt-4 rounded-md border border-rust/40 bg-rust/10 px-3 py-2 text-[15px] text-rust">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}

/** Games waiting for players — tap to join, no code needed. */
function OpenGames({ onJoin }: { onJoin: (code: string) => void }) {
  const { t } = useT();
  const { lobbies, status } = useOpenLobbies();
  return (
    <section aria-live="polite">
      <h2 className="flex items-center gap-2 font-display text-xl">
        {t("lobbies.title")}
        {status === "ok" && <span className="h-2 w-2 animate-pulse rounded-full bg-moss" aria-hidden />}
      </h2>
      {status === "loading" && <p className="mt-1 text-[15px] text-ink-soft">{t("lobbies.loading")}</p>}
      {status === "unavailable" && <p className="mt-1 text-[15px] text-ink-soft">{t("lobbies.unavailable")}</p>}
      {status === "ok" && !lobbies.length && <p className="mt-1 text-[15px] text-ink-soft">{t("lobbies.none")}</p>}
      {lobbies.length > 0 && (
        <ul className="mt-2 flex max-h-64 flex-col gap-2 overflow-y-auto pr-1">
          {lobbies.map((l) => (
            <li key={l.code} className="flex items-center gap-3 rounded-lg border border-ink/20 bg-vellum/70 px-3 py-2">
              <Token emblem={l.hostAvatar} size={36} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold leading-tight">{t("lobbies.hostGame", { host: l.host })}</p>
                <p className="text-sm text-ink-soft">
                  {t("lobbies.players", { n: l.players, max: l.max })} · {t(l.mode === "teams" ? "settings.teams" : "settings.ffa")}
                </p>
              </div>
              <Button variant="brass" className="shrink-0 px-4 py-2 font-display" onClick={() => onJoin(l.code)}>
                {t("lobbies.join")}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function CompassMark() {
  return (
    <svg viewBox="0 0 100 100" className="mx-auto h-14 w-14 text-brass-light" aria-hidden>
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      <path d="M50 6 L57 50 L50 94 L43 50 Z" fill="currentColor" />
      <path d="M6 50 L50 43 L94 50 L50 57 Z" fill="currentColor" opacity=".55" />
      <circle cx="50" cy="50" r="5" fill="#2c190e" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/* ───────────────────────────── room ───────────────────────────── */

type Phase = "connecting" | "need_identity" | "in_room" | "closed";

function RoomView({ code, go }: { code: string; go: (c: string | null) => void }) {
  const { t, locale } = useT();
  const state = useGame((s) => s.state);
  const conn = useGame((s) => s.conn);
  const notice = useGame((s) => s.notice);
  const id = useIdentity();
  const [phase, setPhase] = useState<Phase>("connecting");
  const [failure, setFailure] = useState<Ack | string | null>(null);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const error = failure === null ? null : typeof failure === "string" ? t(failure) : errorText(locale, failure);
  const myPlayerId = useGame((s) => s.playerId);
  const myLang = state?.players.find((p) => p.id === myPlayerId)?.lang;
  // Tell the room which language I play in (mixed-language rooms show the question in both).
  useEffect(() => {
    if (phase === "in_room" && myLang && myLang !== locale) void request(C2S.SET_LANG, { lang: locale });
  }, [phase, myLang, locale]);

  const adopt = useCallback(
    (res: JoinRes, role: "host" | "guest" | "server") => {
      saveSession({ roomCode: res.roomCode, playerId: res.playerId, sessionToken: res.sessionToken, role });
      useGame.getState().setPlayer(res.playerId);
      useGame.getState().applyState(res.state);
      useGame.getState().setNotice(null);
      setPhase("in_room");
    },
    [],
  );

  /** Make sure we have a transport to this room (P2P guests connect to the host). */
  const ensureTransport = useCallback(async () => {
    if (MODE === "server") return true;
    const tr = getTransport();
    if (tr && (tr.kind === "host" || tr.kind === "guest")) return true;
    try {
      setTransport(await joinAsGuest(code));
      return true;
    } catch (e) {
      setFailure((e as Error).message?.startsWith("err.") ? (e as Error).message : "err.cantReachHost");
      return false;
    }
  }, [code]);

  const rejoin = useCallback(async () => {
    const saved = loadSession(code);
    if (!saved) return false;
    if (saved.role === "host" && getTransport()?.kind !== "host") {
      // The tab that hosted this room was closed or reloaded — the room is gone.
      clearSession(code);
      setFailure("err.hostGone");
      return false;
    }
    if (!(await ensureTransport())) return false;
    const res = await request<JoinRes>(C2S.REJOIN_ROOM, { roomCode: code, sessionToken: saved.sessionToken });
    if (res.ok) {
      adopt(res, saved.role ?? "server");
      return true;
    }
    clearSession(code);
    setFailure(res);
    return false;
  }, [code, adopt, ensureTransport]);

  const join = useCallback(async () => {
    if (busyRef.current) return;
    if (!id.name.trim()) return setFailure("room.needName");
    busyRef.current = true;
    setBusy(true);
    setFailure(null);
    id.remember();
    if (await ensureTransport()) {
      const res = await request<JoinRes>(C2S.JOIN_ROOM, { roomCode: code, name: id.name.trim(), clientId: getClientId(), avatar: id.avatar });
      if (res.ok) adopt(res, MODE === "p2p" ? "guest" : "server");
      else setFailure(res);
    }
    busyRef.current = false;
    setBusy(false);
  }, [code, id, adopt, ensureTransport]);

  // First load: rejoin if we have a seat, otherwise ask who you are.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await rejoin();
      if (cancelled || ok) return;
      const auto = sessionStorage.getItem("tq:autojoin");
      sessionStorage.removeItem("tq:autojoin");
      if (auto === code && getSavedName()) {
        await join();
        if (useGame.getState().state?.code === code) return;
      }
      setPhase((p) => (p === "in_room" ? p : "need_identity"));
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  // Every reconnect → reclaim the seat.
  useEffect(() => {
    const off = hub.on(LOCAL.RECONNECTED, () => void rejoin());
    return () => void off();
  }, [rejoin]);

  // Hosting in P2P: warn before closing the tab (it would end the game for everyone).
  useEffect(() => {
    if (getTransport()?.kind !== "host") return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [phase]);

  const leaveHome = () => {
    setTransport(null);
    useGame.getState().reset();
    go(null);
  };

  if (notice && (!state || notice === "err.hostGone")) {
    return (
      <Centered>
        <div className="parchment max-w-sm p-6 text-center">
          <p className="text-xl">{t(notice)}</p>
          <Button variant="brass" className="mt-5 font-display text-lg" onClick={leaveHome}>
            {t("room.back")}
          </Button>
        </div>
      </Centered>
    );
  }

  if (phase === "in_room" && state) {
    return (
      <>
        {conn !== "online" && (
          <div role="status" className="fixed inset-x-0 top-0 z-50 bg-brass-light py-1.5 text-center font-bold text-ink">
            {t("room.reconnecting")}
          </div>
        )}
        {notice && (
          <div role="status" className="fixed inset-x-0 top-0 z-50 bg-wax py-1.5 text-center font-bold text-vellum">
            {t(notice)}
          </div>
        )}
        {state.status === "lobby" ? <LobbyScreen onLeave={leaveHome} /> : <GameScreen />}
      </>
    );
  }

  if (phase === "need_identity" || failure) {
    const hostGone = failure === "err.hostGone";
    return (
      <Centered>
        <div className="parchment w-full max-w-sm p-6">
          <div className="text-center">
            <CodeTiles code={code} label={t("room.codeLabel", { code })} />
          </div>
          {!hostGone && (
            <>
              <div className="mt-5">
                <IdentityCard name={id.name} setName={id.setName} avatar={id.avatar} setAvatar={id.setAvatar} autoFocus={!id.name} onEnter={join} />
              </div>
              <Button variant="brass" className="mt-6 w-full py-3.5 font-display text-xl" disabled={busy} onClick={join}>
                {busy ? t("home.joining") : t("home.join")}
              </Button>
            </>
          )}
          {error && (
            <p role="alert" className="mt-4 rounded-md border border-rust/40 bg-rust/10 px-3 py-2 text-[15px] text-rust">
              {error}
            </p>
          )}
          <button onClick={leaveHome} className="mt-5 block w-full text-center text-ink-soft underline">
            {t("room.otherRoom")}
          </button>
        </div>
      </Centered>
    );
  }

  return (
    <Centered>
      <CodeTiles code={code} />
      <p className="mt-4 text-lg text-vellum/80">{t("room.connecting")}</p>
    </Centered>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-16">
      <LanguageSwitcher className="absolute right-4 top-4" />
      {children}
    </main>
  );
}
