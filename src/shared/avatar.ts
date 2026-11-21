/**
 * Player characters are either one of the preset emoji (AVATARS) or a
 * self-made face encoded as "x:CEMH" — one base-36 digit each for
 * Colour, Eyes, Mouth and Hat. Tiny, URL-safe and easy to validate.
 */
import { AVATARS } from "./constants";

export const FACE_COLORS = [
  "#e8574a", "#f29a3a", "#f2cd4a", "#8fc65a", "#3fae8c", "#3fa3d9",
  "#5b6fd6", "#9a63d0", "#e070b0", "#a5714b", "#f0d6b8", "#7d7d7d",
] as const;
export const EYES_COUNT = 8;
export const MOUTH_COUNT = 8;
export const HAT_COUNT = 9; // 0 = none

export interface Face {
  color: number;
  eyes: number;
  mouth: number;
  hat: number;
}

const FACE_RE = /^x:[0-9a-z]{4}$/;

export function parseFace(code: string): Face | null {
  if (!FACE_RE.test(code)) return null;
  const [color, eyes, mouth, hat] = code.slice(2).split("").map((c) => parseInt(c, 36));
  if (color >= FACE_COLORS.length || eyes >= EYES_COUNT || mouth >= MOUTH_COUNT || hat >= HAT_COUNT) return null;
  return { color, eyes, mouth, hat };
}

export const encodeFace = (f: Face) => `x:${[f.color, f.eyes, f.mouth, f.hat].map((n) => n.toString(36)).join("")}`;

export const isCustomAvatar = (a: string) => a.startsWith("x:");

export function isValidAvatar(a: string): boolean {
  return (AVATARS as readonly string[]).includes(a) || parseFace(a) !== null;
}

export function randomFace(rand: () => number = Math.random): Face {
  const pick = (n: number) => Math.floor(rand() * n);
  return { color: pick(FACE_COLORS.length), eyes: pick(EYES_COUNT), mouth: pick(MOUTH_COUNT), hat: pick(HAT_COUNT) };
}
