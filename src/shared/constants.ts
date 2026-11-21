import type { CategoryId, SpecialTileType, Difficulty } from "./types";

/**
 * Animation timings are shared so the server's turn loop waits exactly as long
 * as clients need to play the dice + pawn animations. The server is the clock.
 */
export const TIMING = {
  DICE_ANIM_MS: 1100,
  STEP_MS: 260,
  LAND_PAUSE_MS: 350,
  SPECIAL_REVEAL_MS: 1800,
  ANSWER_REVEAL_MS: 2600,
  SKIP_TURN_MS: 1600,
  /** How long the other sides get to steal a wrongly answered question. */
  STEAL_MS: 10_000,
  /** Grace for network latency on answer submission after the deadline. */
  ANSWER_GRACE_MS: 600,
  /** Active-but-idle player gets auto-rolled after this. */
  ROLL_IDLE_MS: 30_000,
  /** Active side with nobody connected is auto-rolled quickly. */
  DISCONNECTED_AUTOROLL_MS: 4000,
  /** Lobby players who drop are removed after this unless they rejoin. */
  LOBBY_DISCONNECT_GRACE_MS: 45_000,
  /** Rooms with nobody connected are garbage-collected after this. */
  EMPTY_ROOM_TTL_MS: 10 * 60_000,
} as const;

export const POINTS: Record<Difficulty, number> = { easy: 100, medium: 200, hard: 300 };
export const BONUS_MOVE_STEPS = 2;
/** From the 3rd correct answer in a row, each correct answer earns this bonus. */
export const STREAK_BONUS = 100;
export const STREAK_HOT = 3;
/** Quick emoji reactions players can throw onto the board. */
export const REACTIONS = ["👏", "😂", "😱", "🔥", "🤔", "🎉"] as const;
export const LAP_BONUS = 150;

/** Vintage pigment palette — ochre, verdigris, madder, sienna, plum, prussian. */
export const CATEGORY_META: Record<CategoryId, { name: string; color: string; icon: string }> = {
  history: { name: "History", color: "#b98a2e", icon: "🏛️" },
  science: { name: "Science", color: "#3e7d68", icon: "🔬" },
  pop_culture: { name: "Pop Culture", color: "#a8445a", icon: "🎭" },
  sports: { name: "Sports", color: "#b5612b", icon: "⚽" },
  art: { name: "Art", color: "#6c4c80", icon: "🎨" },
  geography: { name: "Geography", color: "#35577f", icon: "🧭" },
};

export const SPECIAL_META: Record<SpecialTileType, { name: string; icon: string; color: string; blurb: string }> = {
  roll_again: { name: "Roll Again", icon: "🎲", color: "#d9b25c", blurb: "Take another roll right away." },
  swap: { name: "Swap", icon: "🔀", color: "#9bb06a", blurb: "Swap places with the pawn just ahead (leaders swap with last place)." },
  lose_turn: { name: "Lose a Turn", icon: "⛓️", color: "#c4553f", blurb: "Your next turn is skipped." },
  double_points: { name: "Double Points", icon: "💰", color: "#e3c25d", blurb: "Your next question is worth double." },
};

/** Little characters players pick as their pawn. */
export const AVATARS = ["🧙", "🧝", "🤴", "👸", "🥷", "🤠", "🧛", "🧜", "🦊", "🐻", "🦉", "🐸", "🐱", "🐲", "🐢", "🦄"] as const;
export const DEFAULT_AVATAR = AVATARS[0];

/** Pawn colours — distinct, but painted rather than neon. */
export const PLAYER_COLORS = [
  "#b3402f", "#2f5f8a", "#3f7a45", "#c39a2e", "#6d4a86", "#c06a2a",
  "#2f7f80", "#a64a72", "#7a8a2e", "#4a4f9a", "#8a5a3a", "#3a3a3a",
];

/** Team banners: Latin animal names read the same in EN/ES/DE. */
export const TEAM_PRESETS = [
  { name: "Leo", color: "#b3402f", emblem: "🦁" },
  { name: "Aquila", color: "#2f5f8a", emblem: "🦅" },
  { name: "Lupus", color: "#3f7a45", emblem: "🐺" },
  { name: "Draco", color: "#c39a2e", emblem: "🐉" },
  { name: "Ursus", color: "#6d4a86", emblem: "🐻" },
  { name: "Vulpes", color: "#c06a2a", emblem: "🦊" },
];

export const MAX_TEAMS = 6;
export const MIN_SIDES_TO_START = 2;
export const ROOM_CODE_LENGTH = 6;
