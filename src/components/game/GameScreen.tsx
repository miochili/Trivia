"use client";
import { useEffect, useState } from "react";
import { CATEGORY_META } from "@/shared/constants";
import { C2S } from "@/shared/events";
import type { PublicGameState, PublicRoomState } from "@/shared/types";
import { errorText, useT } from "@/lib/i18n";
import { request } from "@/lib/transport";
import { serverNow, useGame } from "@/lib/store";
import { Button, CodeTiles, Token } from "../ui/primitives";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { Dice } from "./Dice";
import { GameBoard } from "./GameBoard";
import { GameOverModal } from "./GameOverModal";
import { TriviaModal } from "./TriviaModal";

export function GameScreen() {
  const room = useGame((s) => s.state)!;
  const game = room.game!;
  const { t } = useT();

  return (
    <main className="mx-auto max-w-[1440px] px-2 pb-10 pt-3 md:px-6">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-baseline gap-4">
          <h1 className="font-display text-3xl text-vellum drop-shadow-[0_2px_0_rgb(0_0_0/.5)]">{t("app.title")}</h1>
          <span className="font-fell text-lg italic text-brass-light">{t("game.turn", { n: game.turnNumber })}</span>
        </div>
        <div className="flex items-center gap-3">
          <CodeTiles code={room.code} size="sm" label={t("room.codeLabel", { code: room.code })} />
          <LanguageSwitcher />
        </div>
      </header>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_350px]">
        <div>
          <GameBoard game={game} loopMode={room.settings.winCondition === "trophies"} center={<BoardCenter room={room} game={game} />} />
          <Legend room={room} />
        </div>
        <aside className="flex flex-col gap-5">
          <Scoreboard room={room} game={game} />
          <Log game={game} />
        </aside>
      </div>

      <TriviaModal room={room} game={game} />
      <GameOverModal room={room} game={game} />
    </main>
  );
}

/** Middle of the map: the die, whose turn it is, and the roll button. */
function BoardCenter({ room, game }: { room: PublicRoomState; game: PublicGameState }) {
  const playerId = useGame((s) => s.playerId);
  const dice = useGame((s) => s.dice);
  const { t, locale } = useT();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [now, setNow] = useState(() => serverNow());

  useEffect(() => {
    const id = setInterval(() => setNow(serverNow()), 500);
    return () => clearInterval(id);
  }, []);

  const side = game.sides.find((s) => s.id === game.currentSideId)!;
  const active = room.players.find((p) => p.id === game.activePlayerId);
  const myTurn = game.activePlayerId === playerId && game.phase === "awaiting_roll";
  const autoIn = game.autoActionAt ? Math.max(0, Math.ceil((game.autoActionAt - now) / 1000)) : null;
  const team = side.memberIds.length > 1;

  let status: string;
  if (game.phase === "awaiting_roll") {
    if (myTurn) status = team ? t("game.yourTeamTurn", { side: side.name }) : t("game.yourTurn");
    else if (!active) status = game.autoActionAt ? t("game.offlineSkip", { side: side.name }) : t("game.paused");
    else status = t("game.waitingRoll", { name: active.name });
  } else if (game.phase === "moving") status = t("game.rolling", { side: side.name });
  else if (game.phase === "question") status = t("game.answering", { name: active?.name ?? side.name });
  else {
    const last = game.log[game.log.length - 1];
    status = last ? t(last.key, last.params) : "";
  }

  async function roll() {
    setBusy(true);
    setErr(null);
    const res = await request(C2S.ROLL_DICE);
    setBusy(false);
    if (!res.ok) setErr(errorText(locale, res));
  }

  return (
    <div className="flex w-full flex-col items-center gap-[min(1.2vw,10px)] text-ink" aria-live="polite">
      <div className="flex items-center gap-2">
        <Token emblem={side.emblem} color={side.color} size={30} />
        <span className="max-w-[12em] truncate font-display text-[clamp(15px,2.3vw,26px)] leading-none">{side.name}</span>
      </div>
      {team && active && (
        <p className="flex items-center gap-1.5 font-fell text-[clamp(12px,1.5vw,16px)] italic text-ink-soft">
          <Token emblem={active.avatar} size={18} /> {t("game.playsFor", { name: active.name, side: side.name })}
        </p>
      )}
      <div className="scale-[0.72] sm:scale-100">
        <Dice value={dice?.value ?? game.lastRoll} rollId={dice?.rollId ?? 0} size={72} />
      </div>
      <p className="max-w-[22em] font-fell text-[clamp(13px,1.7vw,19px)] leading-snug">{status}</p>
      {myTurn && (
        <Button variant="brass" className="px-6 py-2 font-display text-[clamp(16px,2.2vw,24px)]" onClick={roll} disabled={busy}>
          {t("game.roll")}
        </Button>
      )}
      {myTurn && autoIn !== null && autoIn <= 10 && <p className="text-xs text-ink-soft">{t("game.autoRoll", { n: autoIn })}</p>}
      {err && <p className="text-sm text-rust">{err}</p>}
    </div>
  );
}

function Scoreboard({ room, game }: { room: PublicRoomState; game: PublicGameState }) {
  const playerId = useGame((s) => s.playerId);
  const { t } = useT();
  const last = game.board.length - 1;
  return (
    <section className="parchment p-4">
      <h2 className="font-display text-2xl">{t("game.scoreboard")}</h2>
      <div className="ink-rule mt-1.5" />
      <ol className="mt-3 flex flex-col gap-2.5">
        {game.sides.map((s) => {
          const current = s.id === game.currentSideId && game.phase !== "game_over";
          const mine = s.memberIds.includes(playerId ?? "");
          const members = room.players.filter((p) => s.memberIds.includes(p.id));
          return (
            <li key={s.id} className={`rounded-lg border-2 px-3 py-2.5 transition ${current ? "border-brass bg-brass-light/25" : "border-ink/15 bg-vellum/50"}`}>
              <div className="flex items-center gap-2.5">
                <Token emblem={s.emblem} color={s.color} size={34} active={current} />
                <span className="min-w-0 flex-1 truncate font-fell text-xl leading-tight">
                  {s.name}
                  {mine && <span className="text-base text-ink-soft"> {t("lobby.you")}</span>}
                </span>
                <span className="font-display text-xl tabular-nums">{t("game.points", { n: s.score })}</span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
                <span>{t("game.tilePos", { n: s.position, max: last })}</span>
                <span className="flex items-center gap-1" aria-label={t("game.trophies")}>
                  {room.settings.categories.map((c) => (
                    <span
                      key={c}
                      title={t(`cat.${c}`)}
                      className="grid h-[18px] w-[18px] place-items-center rounded-full border border-ink/30 text-[10px]"
                      style={{ background: s.trophies.includes(c) ? CATEGORY_META[c].color : "transparent" }}
                    >
                      {s.trophies.includes(c) ? "🏆" : ""}
                    </span>
                  ))}
                </span>
                {s.skipNextTurn && <span className="text-rust">⛓️ {t("game.skipsNext")}</span>}
                {s.doublePoints && <span className="font-bold text-brass-dark">💰 {t("game.double")}</span>}
              </div>
              {s.memberIds.length > 1 && (
                <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  {members.map((m) => {
                    const up = m.id === game.activePlayerId && current;
                    return (
                      <span key={m.id} className={`flex items-center gap-1 font-fell ${up ? "font-bold text-ink" : "text-ink-soft"} ${m.connected ? "" : "line-through opacity-60"}`}>
                        <Token emblem={m.avatar} size={20} active={up} dim={!m.connected} />
                        {m.name}
                      </span>
                    );
                  })}
                </div>
              )}
              {s.memberIds.length === 1 && !members[0]?.connected && <p className="mt-1 text-sm text-rust">{t("game.offline")}</p>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Log({ game }: { game: PublicGameState }) {
  const { t } = useT();
  const entries = game.log.slice(-8).reverse();
  const tone = { good: "text-moss", bad: "text-rust", special: "text-brass-dark", info: "text-ink" } as const;
  return (
    <section className="parchment p-4">
      <h2 className="font-display text-2xl">{t("game.log")}</h2>
      <div className="ink-rule mt-1.5" />
      <ul className="mt-2 space-y-1.5 font-fell text-[17px] leading-snug">
        {entries.map((e, i) => (
          <li key={e.id} className={`${tone[e.tone ?? "info"]} ${i > 3 ? "opacity-70" : ""}`}>
            {t(e.key, e.params)}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Legend({ room }: { room: PublicRoomState }) {
  const { t } = useT();
  return (
    <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1.5 font-fell text-[17px] text-vellum/90">
      {room.settings.categories.map((c) => (
        <li key={c} className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-sm border border-black/40" style={{ background: CATEGORY_META[c].color }} />
          {t(`cat.${c}`)}
        </li>
      ))}
      <li className="flex items-center gap-1.5">
        <span className="h-3.5 w-3.5 rounded-sm border-2 border-brass-light" />
        {t("game.trophies")} 🏆
      </li>
    </ul>
  );
}
