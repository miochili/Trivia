/**
 * Circular board geometry. Tiles are ring sectors around a parchment map,
 * starting at 12 o'clock and running clockwise, so Finish sits right beside
 * Start and the track reads as one loop.
 */
export const VB = 1000;
export const C = VB / 2;
export const R_OUT = 470;
export const R_IN = 322;
export const R_MID = (R_OUT + R_IN) / 2;
export const THICK = R_OUT - R_IN;

export interface RingTile {
  path: string;
  cx: number;
  cy: number;
  angle: number; // mid angle (radians)
  arc: number; // tile width along the mid circle
  rIn: number;
  rOut: number;
  rMid: number;
  thick: number;
}

const pt = (r: number, a: number) => `${(C + r * Math.cos(a)).toFixed(2)} ${(C + r * Math.sin(a)).toFixed(2)}`;

/** Up to 70 tiles: one ring. Longer boards: two rings (outer lap, then inner lap) so tiles stay big enough. */
export function layoutRing(n: number): RingTile[] {
  if (n <= 70) return lap(n, R_IN, R_OUT);
  const split = (R_IN + R_OUT) / 2;
  const outerR = [split + 4, R_OUT] as const;
  const innerR = [R_IN, split - 4] as const;
  const mid = (r: readonly [number, number]) => (r[0] + r[1]) / 2;
  const outerCount = Math.round((n * mid(outerR)) / (mid(outerR) + mid(innerR)));
  return [...lap(outerCount, ...outerR), ...lap(n - outerCount, ...innerR)];
}

function lap(count: number, rIn: number, rOut: number): RingTile[] {
  const rMid = (rIn + rOut) / 2;
  const step = (2 * Math.PI) / count;
  const gap = 5 / rMid; // ~5 units of wood between tiles
  return Array.from({ length: count }, (_, i) => {
    const a0 = -Math.PI / 2 + i * step + gap / 2;
    const a1 = a0 + step - gap;
    const am = (a0 + a1) / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const path = `M ${pt(rOut, a0)} A ${rOut} ${rOut} 0 ${large} 1 ${pt(rOut, a1)} L ${pt(rIn, a1)} A ${rIn} ${rIn} 0 ${large} 0 ${pt(rIn, a0)} Z`;
    return { path, cx: C + rMid * Math.cos(am), cy: C + rMid * Math.sin(am), angle: am, arc: (step - gap) * rMid, rIn, rOut, rMid, thick: rOut - rIn };
  });
}

export const polar = (r: number, a: number) => ({ x: C + r * Math.cos(a), y: C + r * Math.sin(a) });

/** Spread several pawns on one tile across the ring's depth. */
export function pawnOffset(slot: number, count: number, angle: number, tokenR: number, thick = THICK) {
  if (count <= 1) return { dx: 0, dy: 0 };
  const spacing = Math.max(tokenR * 0.6, Math.min(tokenR * 1.9, (thick - tokenR * 2) / (count - 1)));
  const radial = (slot - (count - 1) / 2) * spacing;
  const tangential = count >= 4 ? (slot % 2 ? 1 : -1) * tokenR * 0.45 : 0;
  return {
    dx: Math.cos(angle) * radial - Math.sin(angle) * tangential,
    dy: Math.sin(angle) * radial + Math.cos(angle) * tangential,
  };
}
