/**
 * Types shared by the realtime server and the Next.js client.
 * Everything in here is PUBLIC — it is safe to send to any client.
 * Secrets (correct answers, session tokens) never appear in these shapes.
 */

export const CATEGORY_IDS = ["history", "science", "pop_culture", "sports", "art", "geography"] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export type Difficulty = "easy" | "medium" | "hard";
export type GameMode = "ffa" | "teams";
export type WinCondition = "finish" | "trophies" | "either";
/** What happens after a correct answer. */
export type CorrectAnswerRule = "stay" | "bonus_move" | "roll_again";
export type SpecialTileType = "roll_again" | "swap" | "lose_turn" | "double_points";
export type TileKind = "start" | "finish" | "category" | "special";

export const BOARD_LENGTHS = [30, 45, 60] as const;
export const QUESTION_TIMERS = [15, 30, 45] as const;

export interface Tile {
  index: number;
  kind: TileKind;
  category?: CategoryId;
  special?: SpecialTileType;
  /** Category headquarters: answer correctly here to win that category's trophy. */
  hq?: boolean;
}

export interface GameSettings {
  mode: GameMode;
  boardLength: (typeof BOARD_LENGTHS)[number];
  questionTimerSec: (typeof QUESTION_TIMERS)[number];
  categories: CategoryId[];
  winCondition: WinCondition;
  correctAnswerRule: CorrectAnswerRule;
  maxPlayers: number;
}

export const DEFAULT_SETTINGS: GameSettings = {
  mode: "ffa",
  boardLength: 30,
  questionTimerSec: 30,
  categories: [...CATEGORY_IDS],
  winCondition: "either",
  correctAnswerRule: "stay",
  maxPlayers: 12,
};

export interface PublicPlayer {
  id: string;
  name: string;
  teamId: string | null;
  isHost: boolean;
  connected: boolean;
  ready: boolean;
  color: string;
  /** The little character on this player's pawn (emoji). */
  avatar: string;
}

export interface PublicTeam {
  id: string;
  name: string;
  color: string;
  /** Crest shown on the team's pawn and banner. */
  emblem: string;
  memberIds: string[];
}

/** A pawn on the board: one per player (FFA) or one per team (Team mode). */
export interface PublicSide {
  id: string;
  name: string;
  color: string;
  /** Player's character (FFA) or team crest (Team mode). */
  emblem: string;
  memberIds: string[];
  position: number;
  score: number;
  trophies: CategoryId[];
  skipNextTurn: boolean;
  doublePoints: boolean;
  correct: number;
  answered: number;
}

export type GamePhase =
  | "awaiting_roll" // active player may roll
  | "moving" // dice + pawn animation running
  | "question" // trivia card open, timer running
  | "resolving" // showing answer result / special tile effect
  | "game_over";

/** Question text + options in one language (options in the same shuffled order). */
export interface LocalizedQuestion {
  text: string;
  options: string[];
}

export interface PublicQuestion {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  /** English text (fallback). */
  text: string;
  /** Options in a per-ask shuffled order. The server maps the chosen index back. */
  options: string[];
  /** Same question in other languages, options in the SAME shuffled order. */
  i18n?: Partial<Record<"en" | "es" | "de", LocalizedQuestion>>;
}

export interface ActiveQuestionView {
  question: PublicQuestion;
  sideId: string;
  answererId: string | null;
  /** Server epoch ms when the answer window closes. */
  endsAt: number;
  hq: boolean;
  doublePoints: boolean;
  /** Team huddle: teammates' suggested option index, keyed by player id. */
  suggestions: Record<string, number>;
}

export interface AnswerReveal {
  questionId: string;
  sideId: string;
  answererId: string | null;
  chosenIndex: number | null;
  correctIndex: number;
  correct: boolean;
  timedOut: boolean;
  points: number;
  trophy: CategoryId | null;
}

export interface LogEntry {
  id: number;
  at: number;
  /** i18n message key + params — rendered in each viewer's own language. */
  key: string;
  params: Record<string, string | number>;
  sideId?: string;
  tone?: "good" | "bad" | "info" | "special";
}

export type WinReason = "finish" | "trophies";

export interface PublicGameState {
  board: Tile[];
  sides: PublicSide[];
  currentSideId: string;
  activePlayerId: string | null;
  phase: GamePhase;
  turnNumber: number;
  lastRoll: number | null;
  activeQuestion: ActiveQuestionView | null;
  lastReveal: AnswerReveal | null;
  winnerSideId: string | null;
  winReason: WinReason | null;
  /** Server epoch ms of an automatic action (idle auto-roll / skip), for UI hints. */
  autoActionAt: number | null;
  log: LogEntry[];
}

export type RoomStatus = "lobby" | "playing" | "finished";

export interface PublicRoomState {
  code: string;
  hostId: string;
  status: RoomStatus;
  settings: GameSettings;
  players: PublicPlayer[];
  teams: PublicTeam[];
  game: PublicGameState | null;
  /** Monotonic version — clients drop stale snapshots. */
  version: number;
  serverNow: number;
}

export type Ack<T = object> =
  | ({ ok: true } & T)
  | { ok: false; /** English message */ error: string; /** i18n key, e.g. "err.notYourTurn" */ code?: string; params?: Record<string, string | number> };
