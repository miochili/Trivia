"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, type ReactNode } from "react";
import { CATEGORY_META, SPECIAL_META } from "@/shared/constants";
import type { PublicGameState, Tile } from "@/shared/types";
import { C, layoutRing, pawnOffset, polar, R_IN, R_MID, R_OUT, THICK, VB, type RingTile } from "@/lib/boardLayout";
import { useGame } from "@/lib/store";
import { useT } from "@/lib/i18n";

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
      <svg viewBox={`0 0 ${VB} ${VB}`} className="block h-full w-full drop-shadow-[0_18px_30px_rgb(0_0_0/.55)]" role="img" aria-label={t("board.label")}>
        <BoardDefs />
        <Chart />

        {/* carved walnut ring with brass inlay */}
        <circle cx={C} cy={C} r={R_MID} fill="none" stroke="url(#walnut)" strokeWidth={THICK + 22} />
        <circle cx={C} cy={C} r={R_OUT + 11} fill="none" stroke="#c9a24f" strokeWidth="2.5" />
        <circle cx={C} cy={C} r={R_IN - 11} fill="none" stroke="#c9a24f" strokeWidth="2.5" />

        <g filter="url(#aged)">
          {game.board.map((tile) => (
            <TileShape key={tile.index} tile={tile} geo={ring[tile.index]} loopMode={loopMode} owners={game.sides.filter((s) => tile.hq && tile.category && s.trophies.includes(tile.category)).map((s) => s.color)} />
          ))}
        </g>
        <g filter="url(#vintage)">
          {game.board.map((tile) => (
            <TileIcon key={tile.index} tile={tile} geo={ring[tile.index]} loopMode={loopMode} />
          ))}
        </g>

        {game.sides.map((s) => {
          const pos = Math.min(displayPos[s.id] ?? s.position, ring.length - 1);
          const g = ring[pos];
          const group = byTile.get(pos) ?? [s.id];
          const { dx, dy } = pawnOffset(group.indexOf(s.id), group.length, g.angle, tokenR);
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
              <div className="mt-1 font-fell text-lg">{t(banner.detailKey, banner.params)}</div>
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
        <stop offset="0%" stopColor="#f4e7c6" />
        <stop offset="62%" stopColor="#ead7a8" />
        <stop offset="88%" stopColor="#d3b47a" />
        <stop offset="100%" stopColor="#9c7340" />
      </radialGradient>
      <linearGradient id="walnut" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6b4426" />
        <stop offset="50%" stopColor="#4a2c17" />
        <stop offset="100%" stopColor="#5e3b20" />
      </linearGradient>
      <radialGradient id="tileShade" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stopColor="#fff6dc" stopOpacity=".28" />
        <stop offset="100%" stopColor="#000" stopOpacity=".18" />
      </radialGradient>
      {/* rough, torn edge for the sheet */}
      <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="4" />
        <feDisplacementMap in="SourceGraphic" scale="14" />
      </filter>
      {/* speckles, foxing and wear on painted tiles */}
      <filter id="aged" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="9" result="n" />
        <feColorMatrix in="n" values="0 0 0 0 0.22  0 0 0 0 0.13  0 0 0 0 0.05  0 0 0 0.42 -0.06" result="spots" />
        <feComposite in="spots" in2="SourceGraphic" operator="in" result="sp" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="sp" />
        </feMerge>
      </filter>
      {/* paper grain over the whole chart */}
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="2" />
        <feColorMatrix values="0 0 0 0 0.4  0 0 0 0 0.26  0 0 0 0 0.1  0 0 0 0.22 0" />
      </filter>
      {/* faded, hand-tinted look for the emoji icons */}
      <filter id="vintage">
        <feColorMatrix type="matrix" values="0.62 0.32 0.06 0 0.02  0.2 0.68 0.12 0 0.01  0.16 0.26 0.5 0 0  0 0 0 1 0" />
      </filter>
      <filter id="tokenShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity=".5" />
      </filter>
    </defs>
  );
}

/** The sea chart under the track: torn sheet, rhumb lines, compass rose. */
function Chart() {
  const rays = Array.from({ length: 16 }, (_, i) => (i * Math.PI) / 8);
  return (
    <g>
      <rect x="14" y="14" width={VB - 28} height={VB - 28} rx="18" fill="url(#paper)" filter="url(#rough)" />
      <rect x="14" y="14" width={VB - 28} height={VB - 28} rx="18" filter="url(#grain)" opacity=".9" />
      <rect x="34" y="34" width={VB - 68} height={VB - 68} fill="none" stroke="#5b4026" strokeWidth="1.5" opacity=".45" />
      <rect x="42" y="42" width={VB - 84} height={VB - 84} fill="none" stroke="#5b4026" strokeWidth="0.8" opacity=".35" />
      {/* portolan rhumb lines */}
      <g stroke="#6a4a2a" strokeWidth="1" opacity=".28">
        {rays.map((a, i) => {
          const p = polar(700, a);
          return <line key={i} x1={C} y1={C} x2={p.x} y2={p.y} strokeDasharray={i % 2 ? "6 6" : undefined} />;
        })}
      </g>
      {/* corner roses */}
      {[
        [90, 90],
        [910, 90],
        [90, 910],
        [910, 910],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} opacity=".5">
          <circle r="34" fill="none" stroke="#6a4a2a" strokeWidth="1.2" />
          <path d="M0 -40 L6 0 L0 40 L-6 0 Z M-40 0 L0 -6 L40 0 L0 6 Z" fill="#6a4a2a" />
        </g>
      ))}
      {/* inner sea + compass rose */}
      <circle cx={C} cy={C} r={R_IN - 18} fill="#e9d6a6" opacity=".55" />
      <g transform={`translate(${C} ${C})`} opacity=".22" stroke="#4d3520" fill="none">
        {[60, 120, 200, 270].map((r) => (
          <circle key={r} r={r} strokeWidth={r === 270 ? 2 : 1} strokeDasharray={r === 200 ? "3 7" : undefined} />
        ))}
        <path d="M0 -280 L22 0 L0 280 L-22 0 Z" fill="#4d3520" />
        <path d="M-280 0 L0 -22 L280 0 L0 22 Z" fill="#4d3520" opacity=".7" />
        <path d="M-190 -190 L12 -12 L190 190 L-12 12 Z M190 -190 L12 12 L-190 190 L-12 -12 Z" fill="#4d3520" opacity=".45" />
      </g>
    </g>
  );
}

function TileShape({ tile, geo, loopMode, owners }: { tile: Tile; geo: RingTile; loopMode: boolean; owners: string[] }) {
  const { t } = useT();
  let fill = "#7a5a3a";
  let stroke = "#2b1c11";
  let strokeW = 2.5;
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
    strokeW = 4;
    title = `${t(`special.${tile.special}`)}: ${t(`specialBlurb.${tile.special}`)}`;
  } else if (tile.category) {
    fill = CATEGORY_META[tile.category].color;
    title = `${tile.hq ? t("board.hqTitle", { cat: tile.category }) : t(`cat.${tile.category}`)} (${t("board.tile", { n: tile.index })})`;
  }
  const crest = polar(R_OUT - 4, geo.angle);
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
        const p = polar(R_IN + 12, geo.angle + (i - (owners.length - 1) / 2) * (14 / R_IN));
        return <circle key={i} cx={p.x} cy={p.y} r="6" fill={c} stroke="#f7eed5" strokeWidth="2" />;
      })}
      <title>{title}</title>
    </g>
  );
}

function TileIcon({ tile, geo, loopMode }: { tile: Tile; geo: RingTile; loopMode: boolean }) {
  const { t } = useT();
  const size = Math.min(40, geo.arc * 0.52);
  const label = Math.min(24, geo.arc * 0.3);
  const crest = polar(R_OUT - 4, geo.angle);
  let icon = "";
  let text: string | null = null;
  if (tile.kind === "start") [icon, text] = ["🚩", t("board.start")];
  else if (tile.kind === "finish") [icon, text] = loopMode ? ["↻", t("board.lap")] : ["👑", t("board.finish")];
  else if (tile.kind === "special" && tile.special) icon = SPECIAL_META[tile.special].icon;
  else if (tile.category) icon = CATEGORY_META[tile.category].icon;
  const inner = polar(R_MID - THICK * 0.18, geo.angle);
  const outer = polar(R_MID + THICK * 0.2, geo.angle);
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
      <text y={r * 0.33} textAnchor="middle" fontSize={r * 0.95}>
        {emblem}
      </text>
    </motion.g>
  );
}
