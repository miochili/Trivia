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
}

const pt = (r: number, a: number) => `${(C + r * Math.cos(a)).toFixed(2)} ${(C + r * Math.sin(a)).toFixed(2)}`;

export function layoutRing(n: number): RingTile[] {
  const step = (2 * Math.PI) / n;
  const gap = 5 / R_MID; // ~5 units of wood between tiles
  return Array.from({ length: n }, (_, i) => {
    const a0 = -Math.PI / 2 + i * step + gap / 2;
    const a1 = a0 + step - gap;
    const am = (a0 + a1) / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const path = `M ${pt(R_OUT, a0)} A ${R_OUT} ${R_OUT} 0 ${large} 1 ${pt(R_OUT, a1)} L ${pt(R_IN, a1)} A ${R_IN} ${R_IN} 0 ${large} 0 ${pt(R_IN, a0)} Z`;
    return { path, cx: C + R_MID * Math.cos(am), cy: C + R_MID * Math.sin(am), angle: am, arc: (step - gap) * R_MID };
  });
}

export const polar = (r: number, a: number) => ({ x: C + r * Math.cos(a), y: C + r * Math.sin(a) });

/** Spread several pawns on one tile across the ring's depth. */
export function pawnOffset(slot: number, count: number, angle: number, tokenR: number) {
  if (count <= 1) return { dx: 0, dy: 0 };
  const spacing = Math.min(tokenR * 1.9, (THICK - tokenR * 2) / (count - 1));
  const radial = (slot - (count - 1) / 2) * spacing;
  const tangential = count >= 4 ? (slot % 2 ? 1 : -1) * tokenR * 0.45 : 0;
  return {
    dx: Math.cos(angle) * radial - Math.sin(angle) * tangential,
    dy: Math.sin(angle) * radial + Math.cos(angle) * tangential,
  };
}
