import type { CategoryId, SpecialTileType, Tile } from "../../src/shared/types";

const SPECIAL_ORDER: SpecialTileType[] = ["roll_again", "swap", "double_points", "lose_turn"];
const SPECIAL_EVERY = 6;

export function shuffle<T>(arr: readonly T[], rng: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Builds a linear board:  START · category/special tiles · FINISH
 *  - a special tile roughly every 6th square (never adjacent to start/finish)
 *  - one HQ ("trophy") tile per selected category, spread evenly along the path
 *  - remaining tiles cycle through categories so neighbours never repeat
 */
export function generateBoard(length: number, categories: CategoryId[], rng: () => number = Math.random): Tile[] {
  if (length < 12) throw new Error("Board too short");
  if (categories.length < 1) throw new Error("Need at least one category");
  const last = length - 1;
  const tiles: Tile[] = Array.from({ length }, (_, index) => ({ index, kind: "category" as const }));
  tiles[0] = { index: 0, kind: "start" };
  tiles[last] = { index: last, kind: "finish" };

  // Specials
  const specials = shuffle(SPECIAL_ORDER, rng);
  let s = 0;
  for (let i = SPECIAL_EVERY; i < last - 1; i += SPECIAL_EVERY) {
    tiles[i] = { index: i, kind: "special", special: specials[s++ % specials.length] };
  }

  // HQ tiles — evenly spaced between ~10% and ~92% of the track
  const hqCats = shuffle(categories, rng);
  const from = Math.max(2, Math.round(last * 0.1));
  const to = Math.round(last * 0.92);
  const span = to - from;
  hqCats.forEach((cat, k) => {
    let idx = Math.round(from + ((k + 0.5) * span) / hqCats.length);
    while (tiles[idx].kind !== "category" || tiles[idx].category) idx++;
    tiles[idx] = { index: idx, kind: "category", category: cat, hq: true };
  });

  // Fill remaining category tiles, avoiding identical neighbours where possible
  let cycle = shuffle(categories, rng);
  let c = 0;
  for (let i = 1; i < last; i++) {
    const t = tiles[i];
    if (t.kind !== "category" || t.category) continue;
    const prev = tiles[i - 1]?.category;
    const next = tiles[i + 1]?.category;
    let pick = cycle[c % cycle.length];
    for (let tries = 0; tries < cycle.length && categories.length > 2 && (pick === prev || pick === next); tries++) {
      c++;
      pick = cycle[c % cycle.length];
    }
    tiles[i] = { index: i, kind: "category", category: pick };
    c++;
    if (c % cycle.length === 0) cycle = shuffle(categories, rng);
  }
  return tiles;
}
