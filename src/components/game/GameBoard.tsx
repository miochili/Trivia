"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, type ReactNode } from "react";
import { CATEGORY_META, SPECIAL_META } from "@/shared/constants";
import type { PublicGameState, Tile } from "@/shared/types";
import { C, layoutRing, pawnOffset, polar, R_IN, R_MID, R_OUT, THICK, VB, type RingTile } from "@/lib/boardLayout";
import { useGame } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { AvatarInSvg } from "../ui/Avatar";

/**
 * The board: an old parchment chart with a carved wooden ring track. Pawns are
 * Framer Motion groups springing tile-to-tile from MOVE_PAWN steps, so a roll
 * reads as hops around the circle. `center` is rendered in the middle (dice etc.).
 */
export function GameBoard({ game, loopMode, center }: { game: PublicGameState; loopMode: boolean; center?: ReactNode }) {
  const displayPos = useGame((s) => s.displayPos);
  const banner = useGame((s) => s.banner);
  const reduce = useReducedMotion();
  const { t } = useT();
  const ring = useMemo(() => layoutRing(game.board.length), [game.board.length]);
  const tokenR = Math.min(25, ring[0].arc * 0.4);

  const byTile = new Map<number, string[]>();
  for (const s of game.sides) {
    const pos = displayPos[s.id] ?? s.position;
    byTile.set(pos, [...(byTile.get(pos) ?? []), s.id]);
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,calc(100dvh-7rem))]">
      <svg viewBox={`0 0 ${VB} ${VB}`} className="block h-full w-full drop-shadow-[0_12px_24px_rgb(0_0_0/.4)]" role="img" aria-label={t("board.label")}>
        <BoardDefs />
        <Chart />

        {/* carved walnut ring with brass inlay */}
        <circle cx={C} cy={C} r={R_MID} fill="none" stroke="url(#walnut)" strokeWidth={THICK + 14} />
        <circle cx={C} cy={C} r={R_OUT + 7} fill="none" stroke="#c9a24f" strokeWidth="1.5" opacity=".8" />
        <circle cx={C} cy={C} r={R_IN - 7} fill="none" stroke="#c9a24f" strokeWidth="1.5" opacity=".8" />

        <g>
          {game.board.map((tile) => (
            <TileShape key={tile.index} tile={tile} geo={ring[tile.index]} loopMode={loopMode} owners={game.sides.filter((s) => tile.hq && tile.category && s.trophies.includes(tile.category)).map((s) => s.color)} />
          ))}
        </g>
        <g>
          {game.board.map((tile) => (
            <TileIcon key={tile.index} tile={tile} geo={ring[tile.index]} loopMode={loopMode} />
          ))}
        </g>

        {game.sides.map((s) => {
          const pos = Math.min(displayPos[s.id] ?? s.position, ring.length - 1);
          const g = ring[pos];
          const group = byTile.get(pos) ?? [s.id];
          const { dx, dy } = pawnOffset(group.indexOf(s.id), group.length, g.angle, tokenR, g.thick);
          const active = game.currentSideId === s.id && game.phase !== "game_over";
          return (
            <motion.g
              key={s.id}
              initial={false}
              animate={{ x: g.cx + dx, y: g.cy + dy }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 30, mass: 0.7 }}
            >
              {active && !reduce && (
                <motion.circle
                  r={tokenR}
                  fill="none"
                  stroke="#f0d48a"
                  strokeWidth="4"
                  initial={{ r: tokenR, opacity: 0.9 }}
                  animate={{ r: [tokenR, tokenR + 14], opacity: [0.9, 0] }}
                  transition={{ repeat: Infinity, duration: 1.3 }}
                />
              )}
              <PawnToken r={tokenR} color={s.color} emblem={s.emblem} hopKey={reduce ? "s" : String(pos)} active={active} />
              <title>{t("board.pawnAt", { name: s.name, n: pos })}</title>
            </motion.g>
          );
        })}
      </svg>

      {/* centre of the map: dice, whose turn, roll button */}
      <div className="absolute inset-[24%] flex flex-col items-center justify-center text-center">{center}</div>

      <AnimatePresence>
        {banner && (
          <motion.div
            key={banner.key}
            initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="pointer-events-none absolute inset-0 grid place-items-center"
            role="status"
          >
            <div className="parchment max-w-[70%] px-7 py-5 text-center">
              <div className="text-5xl" aria-hidden>
                {SPECIAL_META[banner.type].icon}
              </div>
              <div className="mt-1 font-display text-3xl">{t(`special.${banner.type}`)}</div>
              <div className="mt-1 text-lg">{t(banner.detailKey, banner.params)}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────── drawing ─────────────────────────── */

function BoardDefs() {
  return (
    <defs>
      <radialGradient id="paper" cx="50%" cy="48%" r="62%">
        <stop offset="0%" stopColor="#f5ecd4" />
        <stop offset="75%" stopColor="#ecdcb6" />
        <stop offset="100%" stopColor="#dcc394" />
      </radialGradient>
      <linearGradient id="walnut" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6b4426" />
        <stop offset="50%" stopColor="#4a2c17" />
        <stop offset="100%" stopColor="#5e3b20" />
      </linearGradient>
      <radialGradient id="tileShade" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stopColor="#fff6dc" stopOpacity=".16" />
        <stop offset="100%" stopColor="#000" stopOpacity=".08" />
      </radialGradient>
      <filter id="tokenShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity=".5" />
      </filter>
    </defs>
  );
}

/** The chart under the track: a clean sheet with a faint compass rose. */
function Chart() {
  return (
    <g>
      <rect x="10" y="10" width={VB - 20} height={VB - 20} rx="28" fill="url(#paper)" />
      <rect x="26" y="26" width={VB - 52} height={VB - 52} rx="18" fill="none" stroke="#5b4026" strokeWidth="1.2" opacity=".25" />
      <g transform={`translate(${C} ${C})`} opacity=".1" fill="#4d3520">
        <circle r="270" fill="none" stroke="#4d3520" strokeWidth="2" />
        <path d="M0 -255 L20 0 L0 255 L-20 0 Z" />
        <path d="M-255 0 L0 -20 L255 0 L0 20 Z" opacity=".7" />
      </g>
    </g>
  );
}

function TileShape({ tile, geo, loopMode, owners }: { tile: Tile; geo: RingTile; loopMode: boolean; owners: string[] }) {
  const { t } = useT();
  let fill = "#7a5a3a";
  let stroke = "rgb(43 28 17 / .55)";
  let strokeW = 1.5;
  let title = "";
  if (tile.kind === "start") {
    fill = "#4c7535";
    title = t("board.start");
  } else if (tile.kind === "finish") {
    fill = loopMode ? "#4c7535" : "#c9a24f";
    title = t(loopMode ? "board.lapTitle" : "board.finishTitle");
  } else if (tile.kind === "special" && tile.special) {
    fill = "#3d2415";
    stroke = SPECIAL_META[tile.special].color;
    strokeW = 3;
    title = `${t(`special.${tile.special}`)}: ${t(`specialBlurb.${tile.special}`)}`;
  } else if (tile.category) {
    fill = CATEGORY_META[tile.category].color;
    title = `${tile.hq ? t("board.hqTitle", { cat: tile.category }) : t(`cat.${tile.category}`)} (${t("board.tile", { n: tile.index })})`;
  }
  const crest = polar(geo.rOut - 4, geo.angle);
  return (
    <g>
      <path d={geo.path} fill={fill} stroke={stroke} strokeWidth={strokeW} strokeLinejoin="round" />
      <path d={geo.path} fill="url(#tileShade)" />
      {tile.hq && (
        <>
          <path d={geo.path} fill="none" stroke="#e4c06c" strokeWidth="6" strokeLinejoin="round" />
          <circle cx={crest.x} cy={crest.y} r="15" fill="#e4c06c" stroke="#2b1c11" strokeWidth="2" />
        </>
      )}
      {owners.map((c, i) => {
        const p = polar(geo.rIn + 12, geo.angle + (i - (owners.length - 1) / 2) * (14 / geo.rIn));
        return <circle key={i} cx={p.x} cy={p.y} r="6" fill={c} stroke="#f7eed5" strokeWidth="2" />;
      })}
      <title>{title}</title>
    </g>
  );
}

function TileIcon({ tile, geo, loopMode }: { tile: Tile; geo: RingTile; loopMode: boolean }) {
  const { t } = useT();
  const size = Math.min(40, geo.arc * 0.68);
  const label = Math.min(24, geo.arc * 0.3);
  const crest = polar(geo.rOut - 4, geo.angle);
  let icon = "";
  let text: string | null = null;
  if (tile.kind === "start") [icon, text] = ["🚩", t("board.start")];
  else if (tile.kind === "finish") [icon, text] = loopMode ? ["↻", t("board.lap")] : ["👑", t("board.finish")];
  else if (tile.kind === "special" && tile.special) icon = SPECIAL_META[tile.special].icon;
  else if (tile.category) icon = CATEGORY_META[tile.category].icon;
  const inner = polar(geo.rMid - geo.thick * 0.18, geo.angle);
  const outer = polar(geo.rMid + geo.thick * 0.2, geo.angle);
  return (
    <g pointerEvents="none">
      <text x={text ? outer.x : geo.cx} y={(text ? outer.y : geo.cy) + size * 0.35} textAnchor="middle" fontSize={size}>
        {icon}
      </text>
      {text && (
        <text x={inner.x} y={inner.y + label * 0.35} textAnchor="middle" fontSize={label} fontFamily="var(--font-display)" fill={tile.kind === "finish" && !loopMode ? "#2b1c11" : "#f7eed5"}>
          {text}
        </text>
      )}
      {tile.hq && (
        <text x={crest.x} y={crest.y + 6} textAnchor="middle" fontSize="16">
          🏆
        </text>
      )}
    </g>
  );
}

function PawnToken({ r, color, emblem, hopKey, active }: { r: number; color: string; emblem: string; hopKey: string; active: boolean }) {
  return (
    <motion.g key={hopKey} initial={hopKey === "s" ? false : { y: -r * 0.8, scale: 1.08 }} animate={{ y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 650, damping: 17 }} filter="url(#tokenShadow)">
      <circle r={r} fill={color} stroke={active ? "#f0d48a" : "#2b1c11"} strokeWidth={active ? 4 : 2.5} />
      <circle r={r * 0.74} fill="#f3e6c6" stroke="#2b1c11" strokeOpacity=".35" strokeWidth="1.5" />
      <AvatarInSvg avatar={emblem} size={r * 1.45} />
    </motion.g>
  );
}
