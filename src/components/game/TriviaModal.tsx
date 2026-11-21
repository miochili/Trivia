"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { CATEGORY_META, POINTS, TIMING } from "@/shared/constants";
import { C2S } from "@/shared/events";
import type { Ack, PublicGameState, PublicRoomState } from "@/shared/types";
import { errorText, localizeQuestion, useT } from "@/lib/i18n";
import { request } from "@/lib/transport";
import { serverNow, useGame } from "@/lib/store";
import { Token } from "../ui/primitives";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/**
 * The trivia card. Everyone sees it in their own language.
 *  - solo / captain: the answerer picks (captain mode: teammates can suggest)
 *  - vote: every teammate taps an answer, the majority wins
 *  - steal: after a wrong answer, other sides race to tap the right one
 * The correct answer stays on the host/server until the reveal.
 */
export function TriviaModal({ room, game }: { room: PublicRoomState; game: PublicGameState }) {
  const playerId = useGame((s) => s.playerId) ?? "";
  const aq = game.activeQuestion;
  const reduce = useReducedMotion();
  const { t, locale } = useT();
  const [picked, setPicked] = useState<number | null>(null);
  const [failure, setFailure] = useState<Ack | null>(null);
  const reveal = aq && game.lastReveal?.questionId === aq.question.id ? game.lastReveal : null;
  const side = aq ? game.sides.find((s) => s.id === aq.sideId) : null;
  const mySide = game.sides.find((s) => s.memberIds.includes(playerId));
  const myTurnTeam = !!side && side.memberIds.includes(playerId);
  const mode = aq?.answerMode ?? "solo";
  const open = !!aq && game.phase === "question" && !reveal;
  const steal = game.phase === "steal" && aq?.steal ? aq.steal : null;

  const canVote = open && mode === "vote" && myTurnTeam;
  const canAnswer = open && mode !== "vote" && aq!.answererId === playerId;
  const canSuggest = open && mode === "captain" && myTurnTeam && !canAnswer;
  const stealTried = !!steal && !!mySide && mySide.id in steal.attempts;
  const canSteal = !!steal && !!mySide && !myTurnTeam && !stealTried;
  const missedByThieves = new Set(Object.values(steal?.attempts ?? {}).map((a) => a.index));

  useEffect(() => {
    setPicked(null);
    setFailure(null);
  }, [aq?.question.id, game.phase]);

  async function choose(i: number) {
    if (!aq) return;
    setFailure(null);
    if (canSuggest) {
      const res = await request(C2S.SUGGEST_ANSWER, { questionId: aq.question.id, optionIndex: i });
      if (!res.ok) setFailure(res);
      return;
    }
    if (!(canVote || canSteal || (canAnswer && picked === null))) return;
    const prev = picked;
    setPicked(i);
    const res = await request(C2S.SUBMIT_ANSWER, { questionId: aq.question.id, optionIndex: i });
    if (!res.ok) {
      setFailure(res);
      setPicked(prev);
    }
  }

  // Keyboard: A–D or 1–4
  useEffect(() => {
    if (!canAnswer && !canSuggest && !canVote && !canSteal) return;
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
  const player = (id: string) => room.players.find((p) => p.id === id);
  const picksFor = (i: number) => Object.entries(aq?.suggestions ?? {}).filter(([, idx]) => idx === i).map(([pid]) => player(pid)).filter(Boolean);
  const stealPoints = aq ? Math.round(POINTS[aq.question.difficulty] / 2) : 0;
  const notVoted = side ? room.players.filter((p) => side.memberIds.includes(p.id) && p.connected && !(p.id in (aq?.suggestions ?? {}))) : [];

  let status: React.ReactNode = null;
  if (reveal) {
    status = reveal.stolenBy ? (
      <span className="font-bold text-brass-dark">⚡ {t("trivia.stolen", { side: game.sides.find((s) => s.id === reveal.stolenBy!.sideId)?.name ?? "", n: reveal.stolenBy.points })}</span>
    ) : reveal.correct ? (
      <span className="font-bold text-moss">
        {reveal.trophy ? t("trivia.correctTrophy", { n: reveal.points, cat: reveal.trophy }) : t("trivia.correct", { n: reveal.points })}
        {reveal.streakBonus > 0 && <span className="mt-1 block text-[#b5612b]">{t("trivia.streak", { n: reveal.streakBonus })}</span>}
      </span>
    ) : (
      <span className="font-bold text-rust">
        {t(reveal.timedOut ? "trivia.timeUp" : "trivia.wrong")}
        {room.settings.steals && <span className="mt-1 block text-base font-normal text-ink-soft">{t("trivia.noSteal")}</span>}
      </span>
    );
  } else if (steal) {
    status = canSteal ? (
      <span className="font-bold text-brass-dark">{t("trivia.stealYou", { n: stealPoints })}</span>
    ) : myTurnTeam ? (
      <span className="text-ink-soft">{t("trivia.stealWatching")}</span>
    ) : stealTried ? (
      <span className="text-ink-soft">{t("trivia.stealTried")}</span>
    ) : (
      <span className="text-ink-soft">{t("trivia.stealFor", { side: side?.name ?? "" })}</span>
    );
  } else if (failure) status = <span className="text-rust">{errorText(locale, failure)}</span>;
  else if (canVote)
    status = (
      <span className="text-ink-soft">
        {playerId in (aq?.suggestions ?? {}) ? t("trivia.voteIn") : t("trivia.voteHint")}
        {notVoted.length > 0 && <span className="block text-base">{t("trivia.voteWaiting", { names: notVoted.map((p) => p.name).join(", ") })}</span>}
      </span>
    );
  else if (canAnswer) status = <span className="text-ink-soft">{mode === "captain" ? t("trivia.huddleAnswerer") : t("trivia.tapHint")}</span>;
  else if (canSuggest) status = <span className="text-ink-soft">{t("trivia.huddleTeammate", { name: answerer?.name ?? "" })}</span>;
  else if (picked !== null) status = <span className="text-ink-soft">{t("trivia.locked")}</span>;

  return (
    <AnimatePresence>
      {aq && meta && lq && (
        <motion.div key="backdrop" className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-wood-deep/75 p-3 pb-20 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
            className={`parchment relative w-full max-w-xl px-5 pb-6 pt-5 sm:px-7 ${steal ? "ring-4 ring-brass-light" : ""}`}
          >
            {/* wax seal with the category mark */}
            <div className="absolute -left-3 -top-4 grid h-16 w-16 place-items-center rounded-full text-3xl shadow-[0_4px_8px_rgb(0_0_0/.45)]" style={{ background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${meta.color} 60%, white), ${meta.color} 55%, color-mix(in srgb, ${meta.color} 60%, black))` }} aria-hidden>
              {meta.icon}
            </div>

            <AnimatePresence>
              {steal && (
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={{ scale: 1, rotate: -6 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 16 }}
                  className="btn-brass absolute -right-3 -top-4 rounded-md px-3 py-1 font-display text-2xl"
                >
                  ⚡ {t("trivia.stealTitle")}
                </motion.div>
              )}
            </AnimatePresence>

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
              {steal ? (
                <Hourglass key="steal" endsAt={steal.endsAt} total={TIMING.STEAL_MS / 1000} stopped={!!reveal} />
              ) : (
                <Hourglass key="q" endsAt={aq.endsAt} total={room.settings.questionTimerSec} stopped={!!reveal} />
              )}
            </div>

            <div className="ink-rule mt-3" />
            <p className="mt-3 flex items-center gap-2 text-ink-soft">
              {mode === "vote" ? <Token emblem={side?.emblem ?? ""} color={side?.color} size={22} /> : answerer && <Token emblem={answerer.avatar} color={answerer.color} size={22} />}
              {canAnswer
                ? t("trivia.yourQuestion")
                : mode === "vote"
                  ? t("trivia.answering", { name: side?.name ?? "" })
                  : side && side.memberIds.length > 1
                    ? t("trivia.answeringFor", { name: answerer?.name ?? side.name, side: side.name })
                    : t("trivia.answering", { name: answerer?.name ?? side?.name ?? "?" })}
            </p>
            <h2 id="q-text" className="mt-1 text-[1.55rem] font-bold leading-snug text-ink sm:text-[1.75rem]">
              {lq.text}
            </h2>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {lq.options.map((opt, i) => {
                const knownWrong = !!steal && (i === steal.wrongIndex || missedByThieves.has(i));
                const isCorrect = reveal?.correctIndex === i;
                const isChosen = reveal ? reveal.chosenIndex === i : picked === i;
                const st = reveal ? (isCorrect ? "correct" : isChosen ? "wrong" : "dim") : knownWrong ? "wrong" : isChosen ? "picked" : "idle";
                const picks = picksFor(i);
                const thieves = Object.entries(steal?.attempts ?? {}).filter(([, a]) => a.index === i).map(([sid]) => game.sides.find((s) => s.id === sid)).filter(Boolean);
                const enabled = canSteal ? !knownWrong : canVote || canSuggest || (canAnswer && picked === null);
                return (
                  <li key={i}>
                    <motion.button
                      onClick={() => choose(i)}
                      disabled={!enabled}
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
                                : "border-ink/35 bg-vellum/70 enabled:hover:border-ink enabled:hover:bg-vellum"
                      }`}
                    >
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-lg ${st === "idle" || st === "dim" ? "btn-brass" : "bg-white/25"}`} aria-hidden>
                        {LETTERS[i]}
                      </span>
                      <span className="min-w-0 flex-1">{opt}</span>
                      {(picks.length > 0 || thieves.length > 0) && (
                        <span className="flex -space-x-1.5" title={picks.length ? t("trivia.votedBy", { names: picks.map((p) => p!.name).join(", ") }) : undefined}>
                          {picks.map((p) => (
                            <Token key={p!.id} emblem={p!.avatar} color={p!.color} size={24} />
                          ))}
                          {thieves.map((sd) => (
                            <Token key={sd!.id} emblem={sd!.emblem} color={sd!.color} size={24} />
                          ))}
                        </span>
                      )}
                    </motion.button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 min-h-7 text-center text-xl" role="status">
              {status}
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
