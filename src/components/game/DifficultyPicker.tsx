"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CATEGORY_META, POINTS, TIMING } from "@/shared/constants";
import { C2S } from "@/shared/events";
import type { Difficulty, PublicGameState, PublicRoomState } from "@/shared/types";
import { errorText, useT } from "@/lib/i18n";
import { request } from "@/lib/transport";
import { serverNow, useGame } from "@/lib/store";

const LEVELS: Difficulty[] = ["easy", "medium", "hard"];

/**
 * After landing on a category tile: shows where the pawn landed and lets the
 * side on turn pick easy / medium / hard. Everyone else sees who is choosing.
 */
export function DifficultyPicker({ room, game }: { room: PublicRoomState; game: PublicGameState }) {
  const playerId = useGame((s) => s.playerId) ?? "";
  const { t, locale } = useT();
  const reduce = useReducedMotion();
  const choice = game.phase === "choosing" ? game.difficultyChoice : null;
  const side = game.sides.find((s) => s.id === game.currentSideId);
  const mine = !!side && side.memberIds.includes(playerId);
  const chooser = room.players.find((p) => p.id === game.activePlayerId);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    setErr(null);
    setBusy(false);
    if (!choice) return;
    const tick = () => setLeft(Math.max(0, Math.ceil((choice.endsAt - serverNow()) / 1000)));
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [choice?.endsAt]); // eslint-disable-line react-hooks/exhaustive-deps

  async function pick(d: Difficulty) {
    setBusy(true);
    setErr(null);
    const res = await request(C2S.CHOOSE_DIFFICULTY, { difficulty: d });
    if (!res.ok) {
      setErr(errorText(locale, res));
      setBusy(false);
    }
  }

  const meta = choice ? CATEGORY_META[choice.category] : null;
  const mult = side?.doublePoints ? 2 : 1;

  return (
    <AnimatePresence>
      {choice && meta && side && (
        <motion.div key="choose" className="fixed inset-0 z-40 grid place-items-center bg-wood-deep/70 p-3 pb-20 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="choose-cat"
            initial={reduce ? { opacity: 0 } : { y: 30, scale: 0.92, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: 0, scale: 1, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="parchment relative w-full max-w-md px-5 pb-5 pt-6 text-center"
          >
            <p className="text-lg text-ink-soft">{mine ? t("choose.youLanded") : t("choose.landed", { side: side.name })}</p>
            <div className="mx-auto mt-2 flex w-fit items-center gap-3 rounded-xl px-4 py-2 text-vellum shadow-[0_3px_0_rgb(0_0_0/.35)]" style={{ background: meta.color }}>
              <span className="text-3xl" aria-hidden>
                {meta.icon}
              </span>
              <span id="choose-cat" className="font-display text-3xl leading-none">
                {t(`cat.${choice.category}`)}
              </span>
            </div>
            {choice.hq && <p className="mt-2 font-bold text-brass-dark">{t("choose.trophy")}</p>}

            {mine ? (
              <>
                <h2 className="mt-4 font-display text-2xl">{t("choose.title")}</h2>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {LEVELS.map((d) => {
                    const blocked = choice.hq && d === "easy";
                    return (
                      <button
                        key={d}
                        onClick={() => pick(d)}
                        disabled={busy || blocked}
                        className={`flex flex-col items-center rounded-lg border-2 px-1 py-3 transition disabled:opacity-40 ${
                          d === "easy" ? "border-moss/60 enabled:hover:bg-moss/15" : d === "medium" ? "border-brass enabled:hover:bg-brass-light/30" : "border-rust/70 enabled:hover:bg-rust/15"
                        }`}
                      >
                        <span className="font-display text-xl leading-tight">{t(`diff.${d}`)}</span>
                        <span className="text-base font-bold text-ink-soft">{t("choose.pts", { n: POINTS[d] * mult })}</span>
                        <span className="mt-0.5 text-sm tracking-widest text-brass-dark" aria-hidden>
                          {d === "easy" ? "★" : d === "medium" ? "★★" : "★★★"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="mt-4 text-xl">{t("choose.waiting", { name: chooser?.name ?? side.name })}</p>
            )}
            <p className="mt-3 text-sm text-ink-soft">{t("choose.auto", { n: Math.min(left, TIMING.CHOOSE_MS / 1000) })}</p>
            {err && <p className="mt-1 text-rust">{err}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
