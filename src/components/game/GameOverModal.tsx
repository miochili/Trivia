"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { CATEGORY_META, FINISH_BONUS } from "@/shared/constants";
import { C2S } from "@/shared/events";
import { CATEGORY_IDS, type PublicGameState, type PublicRoomState } from "@/shared/types";
import { useT } from "@/lib/i18n";
import { request } from "@/lib/transport";
import { useGame } from "@/lib/store";
import { Button, Flourish, Token } from "../ui/primitives";

export function GameOverModal({ room, game }: { room: PublicRoomState; game: PublicGameState }) {
  const playerId = useGame((s) => s.playerId);
  const { t } = useT();
  const reduce = useReducedMotion();
  const over = game.phase === "game_over" && game.winnerSideId;
  const winner = game.sides.find((s) => s.id === game.winnerSideId);
  // same order the engine used: points, then board position, then trophies
  const standings = useMemo(() => {
    const rest = game.sides.filter((s) => s.id !== game.winnerSideId).sort((a, b) => b.score - a.score || b.position - a.position || b.trophies.length - a.trophies.length);
    return winner ? [winner, ...rest] : rest;
  }, [game, winner]);
  const endedBy = game.sides.find((s) => s.id === game.endedBySideId);

  return (
    <AnimatePresence>
      {over && winner && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-wood-deep/80 p-4 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {!reduce && <TileConfetti />}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="winner"
            initial={{ y: 40, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 20, delay: 0.2 }}
            className="parchment relative w-full max-w-md p-6 text-center"
          >
            <div className="mx-auto w-fit">
              <Token emblem={winner.emblem} color={winner.color} size={84} active />
            </div>
            <h2 id="winner" className="mt-3 font-display text-4xl">
              {t("over.wins", { side: winner.name })}
            </h2>
            <Flourish className="mx-auto mt-1 text-ink-soft" />
            <p className="mt-1 font-display text-2xl text-brass-dark">{t("over.pts", { n: winner.score })}</p>
            <p className="mt-2 text-ink-soft">
              {t("over.mostPoints")} {endedBy && t(game.winReason === "trophies" ? "over.endedTrophies" : "over.endedFinish", { side: endedBy.name, n: FINISH_BONUS })}
            </p>

            <h3 className="mt-6 text-left font-display text-xl">{t("over.standings")}</h3>
            <ol className="mt-2 space-y-1.5 text-left">
              {standings.map((s, i) => (
                <li key={s.id} className="flex items-center gap-3 rounded-lg border border-ink/15 bg-vellum/60 px-3 py-2">
                  <span className="w-5 font-display text-xl text-ink-soft">{i + 1}</span>
                  <Token emblem={s.emblem} color={s.color} size={28} />
                  <span className="min-w-0 flex-1 truncate text-xl">{s.name}</span>
                  <span className="text-xs">{s.trophies.length ? "🏆".repeat(s.trophies.length) : ""}</span>
                  <span className="font-display tabular-nums">{t("game.points", { n: s.score })}</span>
                </li>
              ))}
            </ol>

            {room.hostId === playerId ? (
              <Button variant="brass" className="mt-6 w-full py-3 font-display text-xl" onClick={() => request(C2S.RETURN_TO_LOBBY)}>
                {t("over.backToLobby")}
              </Button>
            ) : (
              <p className="mt-6 text-ink-soft">{t("over.waitingHost")}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** One celebratory moment: little category tiles tumbling down. */
function TileConfetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.2 + Math.random() * 1.6,
        rotate: (Math.random() - 0.5) * 720,
        color: CATEGORY_META[CATEGORY_IDS[i % CATEGORY_IDS.length]].color,
        size: 10 + Math.random() * 12,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-0 block rounded-[3px]"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, background: p.color }}
          initial={{ y: -40, rotate: 0, opacity: 1 }}
          animate={{ y: "110vh", rotate: p.rotate, opacity: [1, 1, 0.8] }}
          transition={{ delay: p.delay, duration: p.duration, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
