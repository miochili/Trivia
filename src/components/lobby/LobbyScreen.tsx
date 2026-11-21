"use client";
import { useState } from "react";
import { MIN_SIDES_TO_START } from "@/shared/constants";
import { C2S } from "@/shared/events";
import { useRoom } from "@/lib/useRoom";
import { clearSession } from "@/lib/session";
import { getTransport } from "@/lib/transport";
import { roomUrl } from "../App";
import { Button, CodeTiles, Flourish } from "../ui/primitives";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { PlayersPanel } from "./PlayersPanel";
import { SettingsPanel } from "./SettingsPanel";

export function LobbyScreen({ onLeave }: { onLeave: () => void }) {
  const { state, me, isHost, act, error, pending, t } = useRoom();
  const [copied, setCopied] = useState(false);
  const hosting = getTransport()?.kind === "host";
  const link = roomUrl(state.code);

  const present = state.players.filter((p) => p.connected);
  const waitingOn = present.filter((p) => !p.ready);
  const teamsWithPlayers = state.teams.filter((tm) => tm.memberIds.some((id) => present.some((p) => p.id === id)));
  const sideCount = state.settings.mode === "teams" ? teamsWithPlayers.length : present.length;
  const startProblem =
    sideCount < MIN_SIDES_TO_START
      ? t(state.settings.mode === "teams" ? "lobby.needTwoTeams" : "lobby.needTwoPlayers")
      : waitingOn.length
        ? t("lobby.waitingFor", { names: waitingOn.map((p) => p.name).join(", ") })
        : null;

  async function share() {
    try {
      if (navigator.share && matchMedia("(pointer: coarse)").matches) await navigator.share({ title: t("lobby.shareTitle"), url: link });
      else await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* share sheet dismissed */
    }
  }

  async function leave() {
    await act(C2S.LEAVE_ROOM);
    clearSession(state.code);
    onLeave();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-36 pt-5 md:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-vellum drop-shadow-[0_2px_0_rgb(0_0_0/.5)]">{t("app.title")}</h1>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="ghost" onClick={leave}>
            {t("lobby.leave")}
          </Button>
        </div>
      </header>

      <section className="parchment mt-5 flex flex-col items-center gap-4 p-5 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-lg italic text-ink-soft">{t("lobby.shareCode")}</p>
          <div className="mt-2">
            <CodeTiles code={state.code} size="lg" label={t("room.codeLabel", { code: state.code })} />
          </div>
          <p className="mt-2 break-all text-ink-soft">{link.replace(/^https?:\/\//, "")}</p>
        </div>
        <Button variant="brass" className="px-6 py-3 font-display text-lg" onClick={share}>
          {copied ? t("lobby.copied") : t("lobby.copyInvite")}
        </Button>
      </section>
      {hosting && <p className="mt-3 text-center text-brass-light">{t("room.hosting")}</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <PlayersPanel />
        <SettingsPanel />
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-brass-dark bg-wood-deep/95 px-4 py-3 shadow-[0_-8px_24px_rgb(0_0_0/.5)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <p className="text-lg text-vellum/85" role="status">
            {error ? <span className="text-[#f1a08f]">{error}</span> : isHost ? (startProblem ?? t("lobby.allReady")) : me?.ready ? t("lobby.youReady") : t("lobby.markReady")}
          </p>
          {isHost ? (
            <Button variant="brass" className="px-8 py-3 font-display text-xl" disabled={!!startProblem || pending === C2S.START_GAME} onClick={() => act(C2S.START_GAME)}>
              {pending === C2S.START_GAME ? t("lobby.starting") : t("lobby.start")}
            </Button>
          ) : (
            <Button variant={me?.ready ? "paper" : "brass"} className="px-8 py-3 font-display text-xl" onClick={() => act(C2S.SET_READY, { ready: !me?.ready })}>
              {me?.ready ? t("lobby.notReadyBtn") : t("lobby.readyBtn")}
            </Button>
          )}
        </div>
      </footer>
      <Flourish className="mx-auto mt-10 block text-brass/60" />
    </main>
  );
}
