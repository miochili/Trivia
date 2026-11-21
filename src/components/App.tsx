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
import { Button, CodeTiles, Flourish } from "./ui/primitives";
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
  const codeRef = useRef<HTMLInputElement>(null);

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

  function join() {
    setError(null);
    if (!id.name.trim()) return setError(t("home.needName"));
    if (joinCode.length !== 6) return setError(t("home.codeLength"));
    id.remember();
    sessionStorage.setItem("tq:autojoin", joinCode);
    go(joinCode);
  }

  return (
    <main className="relative mx-auto flex min-h-dvh max-w-5xl flex-col items-center justify-center gap-8 px-4 py-16 md:flex-row md:items-center md:gap-14">
      <LanguageSwitcher className="absolute right-4 top-4" />
      <section className="max-w-md text-center md:text-left">
        <CompassMark />
        <h1 className="mt-4 font-display text-6xl leading-[0.95] text-vellum drop-shadow-[0_3px_0_rgb(0_0_0/.5)] md:text-7xl">{t("app.title")}</h1>
        <Flourish className="mx-auto mt-3 text-brass-light md:mx-0" />
        <p className="mt-4 font-fell text-xl leading-relaxed text-vellum/85">{t("app.tagline")}</p>
      </section>

      <section className="parchment w-full max-w-sm p-6">
        <IdentityCard name={id.name} setName={id.setName} avatar={id.avatar} setAvatar={id.setAvatar} onEnter={create} />

        <Button variant="brass" className="mt-6 w-full py-3.5 font-display text-xl" disabled={!!busy} onClick={create}>
          {busy === "create" ? t("home.creating") : t("home.create")}
        </Button>

        <div className="my-5 flex items-center gap-3 font-fell italic text-ink-soft">
          <span className="ink-rule flex-1" />
          {t("home.orJoin")}
          <span className="ink-rule flex-1" />
        </div>

        <label className="block text-[15px] font-bold text-ink-soft" htmlFor="code">
          {t("home.code")}
        </label>
        <div className="relative mt-1.5" onClick={() => codeRef.current?.focus()}>
          <input
            id="code"
            ref={codeRef}
            value={joinCode}
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6))}
            onKeyDown={(e) => e.key === "Enter" && join()}
            className="absolute inset-0 opacity-0"
            aria-describedby="code-help"
          />
          <div className="flex justify-between gap-1.5" aria-hidden>
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={`grid h-12 flex-1 place-items-center rounded-md font-display text-3xl ${joinCode[i] ? "letter-tile" : "border-2 border-dashed border-ink/30 text-transparent"} ${
                  i === joinCode.length ? "ring-2 ring-brass" : ""
                }`}
              >
                {joinCode[i] ?? "·"}
              </span>
            ))}
          </div>
        </div>
        <p id="code-help" className="mt-1.5 text-sm text-ink-soft/80">
          {t("home.codeHelp")}
        </p>
        <Button className="mt-4 w-full font-display text-lg" disabled={!!busy || joinCode.length !== 6} onClick={join}>
          {t("home.join")}
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

function CompassMark() {
  return (
    <svg viewBox="0 0 100 100" className="mx-auto h-20 w-20 text-brass-light md:mx-0" aria-hidden>
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
          <p className="font-fell text-xl">{t(notice)}</p>
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
          <button onClick={leaveHome} className="mt-5 block w-full text-center font-fell text-ink-soft underline">
            {t("room.otherRoom")}
          </button>
        </div>
      </Centered>
    );
  }

  return (
    <Centered>
      <CodeTiles code={code} />
      <p className="mt-4 font-fell text-lg text-vellum/80">{t("room.connecting")}</p>
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
