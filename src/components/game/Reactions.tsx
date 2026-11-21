"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { REACTIONS } from "@/shared/constants";
import { C2S } from "@/shared/events";
import type { PublicRoomState } from "@/shared/types";
import { useT } from "@/lib/i18n";
import { useGame } from "@/lib/store";
import { request } from "@/lib/transport";
import { Token } from "../ui/primitives";

/** Emojis thrown by players drift up over everyone's screen (also over the question card). */
export function ReactionLayer({ room }: { room: PublicRoomState }) {
  const reactions = useGame((s) => s.reactions);
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none fixed inset-0 z-[45] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {reactions.map((r) => {
          const p = room.players.find((x) => x.id === r.playerId);
          return (
            <motion.div
              key={r.id}
              className="absolute bottom-16 flex flex-col items-center"
              style={{ left: `${r.x}%` }}
              initial={{ y: 0, opacity: 0, scale: 0.6 }}
              animate={reduce ? { opacity: [0, 1, 0] } : { y: -340, opacity: [0, 1, 1, 0], scale: [0.6, 1.25, 1, 0.9], x: [0, 14, -10, 6] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.6, ease: "easeOut" }}
            >
              <span className="text-5xl drop-shadow-[0_3px_4px_rgb(0_0_0/.45)]">{r.emoji}</span>
              {p && (
                <span className="mt-1 flex items-center gap-1 rounded-full bg-wood-deep/80 px-2 py-0.5 text-xs text-vellum">
                  <Token emblem={p.avatar} size={16} /> {p.name}
                </span>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/** Small floating bar — reachable even while a question card is open. */
export function ReactionBar() {
  const { t } = useT();
  return (
    <div role="toolbar" aria-label={t("game.react")} className="fixed bottom-3 left-1/2 z-[46] flex -translate-x-1/2 gap-0.5 rounded-full border border-brass/50 bg-wood-deep/90 px-1.5 py-1 shadow-[0_6px_18px_rgb(0_0_0/.45)] backdrop-blur">
      {REACTIONS.map((e) => (
        <button key={e} onClick={() => void request(C2S.REACT, { emoji: e })} className="grid h-10 w-10 place-items-center rounded-full text-2xl transition hover:scale-125 hover:bg-white/10 active:scale-95" aria-label={e}>
          {e}
        </button>
      ))}
    </div>
  );
}
