"use client";
import { motion } from "framer-motion";
import { CATEGORY_META, SPECIAL_META } from "@/shared/constants";
import type { PublicGameState, Tile } from "@/shared/types";
import { useT } from "@/lib/i18n";
import { useGame } from "@/lib/store";
import { Token } from "../ui/primitives";

const WINDOW = 9;

function tileLook(tile: Tile, loopMode: boolean) {
  if (tile.kind === "start") return { bg: "#4c7535", icon: "🚩" };
  if (tile.kind === "finish") return { bg: loopMode ? "#4c7535" : "#c9a24f", icon: loopMode ? "↻" : "👑" };
  if (tile.kind === "special" && tile.special) return { bg: "#3d2415", icon: SPECIAL_META[tile.special].icon, ring: SPECIAL_META[tile.special].color };
  return { bg: CATEGORY_META[tile.category!].color, icon: CATEGORY_META[tile.category!].icon };
}

/**
 * Phone helper: a big, close-up view of the tiles around the pawn whose turn it
 * is (the ring is small on a phone). Numbers show where each die roll would land.
 */
export function TrackStrip({ game, loopMode }: { game: PublicGameState; loopMode: boolean }) {
  const displayPos = useGame((s) => s.displayPos);
  const { t } = useT();
  const side = game.sides.find((s) => s.id === game.currentSideId)!;
  const pos = displayPos[side.id] ?? side.position;
  const n = game.board.length;
  const indices = Array.from({ length: WINDOW }, (_, k) => {
    const i = pos - 1 + k;
    return loopMode ? (i + n) % n : i;
  }).filter((i) => i >= 0 && i < n);

  return (
    <div className="mt-3 grid gap-1" style={{ gridTemplateColumns: `repeat(${WINDOW}, minmax(0, 1fr))` }} aria-hidden>
      {indices.map((i, k) => {
        const tile = game.board[i];
        const look = tileLook(tile, loopMode);
        const ahead = loopMode ? (i - pos + n) % n : i - pos; // steps from the current pawn
        const here = game.sides.filter((s) => (displayPos[s.id] ?? s.position) === i);
        return (
          <div
            key={`${k}-${i}`}
            className="relative flex aspect-[3/4] flex-col items-center justify-between rounded-md py-1 text-vellum"
            style={{ background: look.bg, boxShadow: `inset 0 0 0 ${tile.hq ? 3 : 1.5}px ${tile.hq ? "#e4c06c" : look.ring ?? "rgb(43 28 17 / .5)"}` }}
            title={tile.category ? t(`cat.${tile.category}`) : undefined}
          >
            <span className="text-[10px] font-bold leading-none opacity-80">{ahead >= 1 && ahead <= 6 && game.phase === "awaiting_roll" ? `+${ahead}` : i}</span>
            <span className="text-lg leading-none">{look.icon}</span>
            <span className="flex h-5 -space-x-2">
              {here.map((s) => (
                <motion.span key={s.id} layoutId={`strip-${s.id}`} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
                  <Token emblem={s.emblem} color={s.color} size={20} active={s.id === side.id} />
                </motion.span>
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}
