"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CATEGORY_META, POINTS } from "@/shared/constants";
import { C2S } from "@/shared/events";
import type { Ack, PublicGameState, PublicRoomState } from "@/shared/types";
import { errorText, localizeQuestion, useT } from "@/lib/i18n";
import { request } from "@/lib/transport";
import { serverNow, useGame } from "@/lib/store";
import { Token } from "../ui/primitives";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/**
 * The trivia card. Everyone sees it in their own language. The answerer picks;
 * teammates can tap options to suggest them (team huddle). The correct answer
 * stays on the host until the reveal.
 */
export function TriviaModal({ room, game }: { room: PublicRoomState; game: PublicGameState }) {
  const playerId = useGame((s) => s.playerId);
  const aq = game.activeQuestion;
  const reduce = useReducedMotion();
  const { t, locale } = useT();
  const [picked, setPicked] = useState<number | null>(null);
  const [failure, setFailure] = useState<Ack | null>(null);
  const reveal = aq && game.lastReveal?.questionId === aq.question.id ? game.lastReveal : null;
  const side = aq ? game.sides.find((s) => s.id === aq.sideId) : null;
  const open = !!aq && game.phase === "question" && !reveal;
  const canAnswer = open && aq!.answererId === playerId;
  const canSuggest = open && !canAnswer && !!side && side.memberIds.length > 1 && side.memberIds.includes(playerId ?? "");

  useEffect(() => {
    setPicked(null);
    setFailure(null);
  }, [aq?.question.id]);

  async function choose(i: number) {
    if (!aq) return;
    if (canSuggest) {
      const res = await request(C2S.SUGGEST_ANSWER, { questionId: aq.question.id, optionIndex: i });
      if (!res.ok) setFailure(res);
      return;
    }
    if (!canAnswer || picked !== null) return;
    setPicked(i);
    const res = await request(C2S.SUBMIT_ANSWER, { questionId: aq.question.id, optionIndex: i });
    if (!res.ok) {
      setFailure(res);
      setPicked(null);
    }
  }

  // Keyboard: A–D or 1–4
  useEffect(() => {
    if (!canAnswer && !canSuggest) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const k = e.key.toUpperCase();
      const idx = LETTERS.indexOf(k) >= 0 ? LETTERS.indexOf(k) : Number(k) - 1;
      if (aq && idx >= 0 && idx < aq.question.options.length) void choose(idx);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const answerer = aq?.answererId ? room.players.find((p) => p.id === aq.answererId) : null;
  const meta = aq ? CATEGORY_META[aq.question.category] : null;
  const lq = aq ? localizeQuestion(aq.question, locale) : null;
  const suggestionsFor = (i: number) => Object.entries(aq?.suggestions ?? {}).filter(([, idx]) => idx === i).map(([pid]) => room.players.find((p) => p.id === pid)).filter(Boolean);

  return (
    <AnimatePresence>
      {aq && meta && lq && (
        <motion.div key="backdrop" className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-wood-deep/75 p-3 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            key={aq.question.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby="q-text"
            initial={reduce ? { opacity: 0 } : { rotateX: -70, y: -40, scale: 0.85, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { rotateX: 0, y: 0, scale: 1, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { rotateX: 60, y: 30, scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 230, damping: 24 }}
            style={{ transformPerspective: 1200, transformOrigin: "top center" }}
            className="parchment relative w-full max-w-xl px-5 pb-6 pt-5 sm:px-7"
          >
            {/* wax seal with the category mark */}
            <div className="absolute -left-3 -top-4 grid h-16 w-16 place-items-center rounded-full text-3xl shadow-[0_4px_8px_rgb(0_0_0/.45)]" style={{ background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${meta.color} 60%, white), ${meta.color} 55%, color-mix(in srgb, ${meta.color} 60%, black))` }} aria-hidden>
              {meta.icon}
            </div>

            <div className="flex items-start gap-3 pl-12">
              <div className="min-w-0 flex-1">
                <p className="font-display text-2xl leading-none" style={{ color: `color-mix(in srgb, ${meta.color} 75%, black)` }}>
                  {t(`cat.${aq.question.category}`)}
                </p>
                <p className="mt-1 text-ink-soft">
                  {t("trivia.points", { diff: t(`diff.${aq.question.difficulty}`), n: POINTS[aq.question.difficulty] * (aq.doublePoints ? 2 : 1) })}
                  {aq.doublePoints && ` ${t("trivia.doubled")}`}
                  {aq.hq && ` — ${t("trivia.trophyTile")} 🏆`}
                </p>
              </div>
              <Hourglass endsAt={aq.endsAt} total={room.settings.questionTimerSec} stopped={!!reveal} />
            </div>

            <div className="ink-rule mt-3" />
            <p className="mt-3 flex items-center gap-2 text-ink-soft">
              {answerer && <Token emblem={answerer.avatar} color={answerer.color} size={22} />}
              {canAnswer
                ? t("trivia.yourQuestion")
                : side && side.memberIds.length > 1
                  ? t("trivia.answeringFor", { name: answerer?.name ?? side.name, side: side.name })
                  : t("trivia.answering", { name: answerer?.name ?? side?.name ?? "?" })}
            </p>
            <h2 id="q-text" className="mt-1 font-sans text-[1.55rem] font-bold leading-snug text-ink sm:text-[1.75rem]">
              {lq.text}
            </h2>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {lq.options.map((opt, i) => {
                const isCorrect = reveal?.correctIndex === i;
                const isChosen = (reveal ? reveal.chosenIndex : picked) === i;
                const st = reveal ? (isCorrect ? "correct" : isChosen ? "wrong" : "dim") : isChosen ? "picked" : "idle";
                const sugg = suggestionsFor(i);
                const mineSuggested = !!playerId && aq.suggestions[playerId] === i;
                return (
                  <li key={i}>
                    <motion.button
                      onClick={() => choose(i)}
                      disabled={!(canSuggest || (canAnswer && picked === null))}
                      animate={st === "wrong" && !reduce ? { x: [0, -8, 8, -5, 5, 0] } : st === "correct" && !reduce ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.45 }}
                      className={`relative flex w-full items-center gap-3 rounded-lg border-2 px-3 py-3 text-left text-lg font-bold transition disabled:cursor-default ${
                        st === "correct"
                          ? "border-moss bg-moss text-vellum"
                          : st === "wrong"
                            ? "border-rust bg-rust text-vellum"
                            : st === "picked"
                              ? "border-ink bg-ink text-vellum"
                              : st === "dim"
                                ? "border-ink/15 text-ink/40"
                                : mineSuggested
                                  ? "border-brass bg-brass-light/40"
                                  : "border-ink/35 bg-vellum/70 enabled:hover:border-ink enabled:hover:bg-vellum"
                      }`}
                    >
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-lg ${st === "idle" || st === "dim" ? "btn-brass" : "bg-white/25"}`}
                        aria-hidden
                      >
                        {LETTERS[i]}
                      </span>
                      <span className="min-w-0 flex-1">{opt}</span>
                      {sugg.length > 0 && !reveal && (
                        <span className="flex -space-x-1.5" title={t("trivia.suggested", { names: sugg.map((p) => p!.name).join(", ") })}>
                          {sugg.map((p) => (
                            <Token key={p!.id} emblem={p!.avatar} color={p!.color} size={22} />
                          ))}
                        </span>
                      )}
                    </motion.button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 min-h-7 text-center text-xl" role="status">
              {reveal ? (
                reveal.correct ? (
                  <span className="font-bold text-moss">
                    {reveal.trophy ? t("trivia.correctTrophy", { n: reveal.points, cat: reveal.trophy }) : t("trivia.correct", { n: reveal.points })}
                  </span>
                ) : (
                  <span className="font-bold text-rust">{t(reveal.timedOut ? "trivia.timeUp" : "trivia.wrong")}</span>
                )
              ) : failure ? (
                <span className="text-rust">{errorText(locale, failure)}</span>
              ) : canAnswer ? (
                <span className="italic text-ink-soft">{side && side.memberIds.length > 1 ? t("trivia.huddleAnswerer") : t("trivia.tapHint")}</span>
              ) : canSuggest ? (
                <span className="italic text-ink-soft">{t("trivia.huddleTeammate", { name: answerer?.name ?? "" })}</span>
              ) : picked !== null ? (
                <span className="italic text-ink-soft">{t("trivia.locked")}</span>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Brass hourglass: sand drains from the top bulb as the answer window closes. */
function Hourglass({ endsAt, total, stopped }: { endsAt: number; total: number; stopped: boolean }) {
  const [left, setLeft] = useState(() => Math.max(0, endsAt - serverNow()));
  const { t } = useT();
  useEffect(() => {
    if (stopped) return;
    let raf = 0;
    const tick = () => {
      setLeft(Math.max(0, endsAt - serverNow()));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [endsAt, stopped]);

  const frac = Math.min(1, left / (total * 1000));
  const secs = Math.ceil(left / 1000);
  const urgent = secs <= 5 && !stopped;
  const topY = 12 + (1 - frac) * 26; // sand surface in the upper bulb
  const botY = 70 - frac * 0 - (1 - frac) * 24; // pile height in the lower bulb
  return (
    <div className="flex shrink-0 flex-col items-center" role="timer" aria-label={t("trivia.secondsLeft", { n: secs })}>
      <svg viewBox="0 0 48 80" className="h-16 w-10">
        <defs>
          <clipPath id="hg-top">
            <path d="M10 8 H38 C38 24 27 30 24 40 C21 30 10 24 10 8 Z" />
          </clipPath>
          <clipPath id="hg-bot">
            <path d="M24 40 C27 50 38 56 38 72 H10 C10 56 21 50 24 40 Z" />
          </clipPath>
        </defs>
        <path d="M10 8 H38 C38 24 27 30 24 40 C27 50 38 56 38 72 H10 C10 56 21 50 24 40 C21 30 10 24 10 8 Z" fill="rgb(255 250 235 / .55)" stroke="#5c4630" strokeWidth="1.5" />
        <rect x="0" y={topY} width="48" height="40" fill="#c9a24f" clipPath="url(#hg-top)" />
        <rect x="0" y={botY} width="48" height="40" fill="#c9a24f" clipPath="url(#hg-bot)" />
        {!stopped && frac > 0 && <line x1="24" y1="40" x2="24" y2="71" stroke="#c9a24f" strokeWidth="1.5" strokeDasharray="2 2" />}
        <rect x="4" y="2" width="40" height="6" rx="2" fill="#8a6326" stroke="#2b1c11" strokeWidth="1" />
        <rect x="4" y="72" width="40" height="6" rx="2" fill="#8a6326" stroke="#2b1c11" strokeWidth="1" />
      </svg>
      <motion.span key={urgent ? secs : "calm"} initial={urgent ? { scale: 1.5 } : false} animate={{ scale: 1 }} className={`font-display text-xl leading-none ${urgent ? "text-rust" : "text-ink"}`}>
        {secs}
      </motion.span>
    </div>
  );
}
