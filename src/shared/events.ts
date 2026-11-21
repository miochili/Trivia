/**
 * Socket.io event protocol — single source of truth for both sides.
 *
 * Conventions
 *  - Client → Server events carry an ack callback `(res: Ack<...>) => void`.
 *    The server NEVER trusts client state: every request is validated (zod),
 *    authorised (host / active player), and checked against the current phase.
 *  - Server → Client events are either snapshots (ROOM_STATE) or one-shot
 *    "animation cues" (DICE_ROLLED, MOVE_PAWN, …). Clients render the snapshot
 *    as truth and use cues only to animate the transition to it.
 */
import type {
  Ack,
  AnswerReveal,
  ActiveQuestionView,
  CategoryId,
  GameSettings,
  OpenLobby,
  PublicRoomState,
  SpecialTileType,
  WinReason,
} from "./types";

// ─────────────── Client → Server ───────────────
export const C2S = {
  CREATE_ROOM: "CREATE_ROOM",
  JOIN_ROOM: "JOIN_ROOM",
  REJOIN_ROOM: "REJOIN_ROOM",
  LEAVE_ROOM: "LEAVE_ROOM",
  UPDATE_SETTINGS: "UPDATE_SETTINGS",
  CREATE_TEAM: "CREATE_TEAM",
  JOIN_TEAM: "JOIN_TEAM",
  MOVE_PLAYER: "MOVE_PLAYER",
  LIST_LOBBIES: "LIST_LOBBIES",
  RENAME_TEAM: "RENAME_TEAM",
  AUTO_BALANCE_TEAMS: "AUTO_BALANCE_TEAMS",
  SET_READY: "SET_READY",
  SET_AVATAR: "SET_AVATAR",
  REACT: "REACT",
  KICK_PLAYER: "KICK_PLAYER",
  START_GAME: "START_GAME",
  ROLL_DICE: "ROLL_DICE",
  SUBMIT_ANSWER: "SUBMIT_ANSWER",
  SUGGEST_ANSWER: "SUGGEST_ANSWER",
  RETURN_TO_LOBBY: "RETURN_TO_LOBBY",
} as const;

// ─────────────── Server → Client ───────────────
export const S2C = {
  ROOM_STATE: "ROOM_STATE",
  DICE_ROLLED: "DICE_ROLLED",
  MOVE_PAWN: "MOVE_PAWN",
  TURN_CHANGED: "TURN_CHANGED",
  TURN_SKIPPED: "TURN_SKIPPED",
  QUESTION: "QUESTION",
  ANSWER_RESULT: "ANSWER_RESULT",
  SPECIAL_TILE: "SPECIAL_TILE",
  GAME_OVER: "GAME_OVER",
  KICKED: "KICKED",
  SESSION_REPLACED: "SESSION_REPLACED",
  REACTION: "REACTION",
} as const;

export interface SessionInfo {
  roomCode: string;
  playerId: string;
  sessionToken: string;
}

// Payloads ---------------------------------------------------------------
export interface CreateRoomPayload {
  name: string;
  clientId: string;
  avatar?: string;
  settings?: Partial<GameSettings>;
}
export interface JoinRoomPayload {
  roomCode: string;
  name: string;
  clientId: string;
  avatar?: string;
}
export interface RejoinRoomPayload {
  roomCode: string;
  sessionToken: string;
}
export interface SubmitAnswerPayload {
  questionId: string;
  optionIndex: number;
}

export type MoveReason = "roll" | "bonus" | "pushback" | "swap";

export interface DiceRolledEvent {
  sideId: string;
  playerId: string | null;
  value: number;
  rollId: number;
  auto: boolean;
}
export interface MovePawnEvent {
  sideId: string;
  /** Tile indices to step through, in order (excludes the start tile). */
  path: number[];
  reason: MoveReason;
  /** Client should wait this long before starting the step animation. */
  delayMs: number;
  stepMs: number;
}
export interface TurnChangedEvent {
  sideId: string;
  activePlayerId: string | null;
  turnNumber: number;
}
export interface TurnSkippedEvent {
  sideId: string;
  reason: "lose_turn" | "no_connected_players";
}
export interface SpecialTileEvent {
  sideId: string;
  type: SpecialTileType;
  /** i18n key for the banner text (e.g. "banner.swap") + params */
  detailKey: string;
  params: Record<string, string | number>;
  swappedWithSideId?: string;
}
export interface ReactionEvent {
  id: number;
  playerId: string;
  emoji: string;
}

export interface GameOverEvent {
  winnerSideId: string;
  reason: WinReason;
  endedBySideId: string;
  endBonus: number;
  standings: { sideId: string; name: string; score: number; position: number; trophies: CategoryId[] }[];
}

/** Typed maps used by socket.io's generics on both server and client. */
export interface ClientToServerEvents {
  [C2S.CREATE_ROOM]: (p: CreateRoomPayload, ack: (r: Ack<SessionInfo & { state: PublicRoomState }>) => void) => void;
  [C2S.JOIN_ROOM]: (p: JoinRoomPayload, ack: (r: Ack<SessionInfo & { state: PublicRoomState }>) => void) => void;
  [C2S.REJOIN_ROOM]: (p: RejoinRoomPayload, ack: (r: Ack<SessionInfo & { state: PublicRoomState }>) => void) => void;
  [C2S.LEAVE_ROOM]: (p: Record<string, never>, ack: (r: Ack) => void) => void;
  [C2S.UPDATE_SETTINGS]: (p: Partial<GameSettings>, ack: (r: Ack) => void) => void;
  [C2S.CREATE_TEAM]: (p: { name: string }, ack: (r: Ack<{ teamId: string }>) => void) => void;
  [C2S.JOIN_TEAM]: (p: { teamId: string | null }, ack: (r: Ack) => void) => void;
  [C2S.MOVE_PLAYER]: (p: { playerId: string; teamId: string | null }, ack: (r: Ack) => void) => void;
  [C2S.LIST_LOBBIES]: (p: Record<string, never>, ack: (r: Ack<{ lobbies: OpenLobby[] }>) => void) => void;
  [C2S.RENAME_TEAM]: (p: { teamId: string; name: string }, ack: (r: Ack) => void) => void;
  [C2S.AUTO_BALANCE_TEAMS]: (p: { teamCount?: number }, ack: (r: Ack) => void) => void;
  [C2S.SET_READY]: (p: { ready: boolean }, ack: (r: Ack) => void) => void;
  [C2S.SET_AVATAR]: (p: { avatar: string }, ack: (r: Ack) => void) => void;
  [C2S.REACT]: (p: { emoji: string }, ack: (r: Ack) => void) => void;
  [C2S.KICK_PLAYER]: (p: { playerId: string }, ack: (r: Ack) => void) => void;
  [C2S.START_GAME]: (p: Record<string, never>, ack: (r: Ack) => void) => void;
  [C2S.ROLL_DICE]: (p: Record<string, never>, ack: (r: Ack<{ value: number }>) => void) => void;
  [C2S.SUBMIT_ANSWER]: (p: SubmitAnswerPayload, ack: (r: Ack) => void) => void;
  [C2S.SUGGEST_ANSWER]: (p: SubmitAnswerPayload, ack: (r: Ack) => void) => void;
  [C2S.RETURN_TO_LOBBY]: (p: Record<string, never>, ack: (r: Ack) => void) => void;
}

export interface ServerToClientEvents {
  [S2C.ROOM_STATE]: (s: PublicRoomState) => void;
  [S2C.DICE_ROLLED]: (e: DiceRolledEvent) => void;
  [S2C.MOVE_PAWN]: (e: MovePawnEvent) => void;
  [S2C.TURN_CHANGED]: (e: TurnChangedEvent) => void;
  [S2C.TURN_SKIPPED]: (e: TurnSkippedEvent) => void;
  [S2C.QUESTION]: (e: ActiveQuestionView & { serverNow: number }) => void;
  [S2C.ANSWER_RESULT]: (e: AnswerReveal) => void;
  [S2C.SPECIAL_TILE]: (e: SpecialTileEvent) => void;
  [S2C.GAME_OVER]: (e: GameOverEvent) => void;
  [S2C.KICKED]: (e: { reason: string }) => void;
  [S2C.SESSION_REPLACED]: () => void;
  [S2C.REACTION]: (e: ReactionEvent) => void;
}

/** Union of server→client cue events that the engine emits (ROOM_STATE is sent by the room). */
export type EngineEvent =
  | { type: typeof S2C.DICE_ROLLED; payload: DiceRolledEvent }
  | { type: typeof S2C.MOVE_PAWN; payload: MovePawnEvent }
  | { type: typeof S2C.TURN_CHANGED; payload: TurnChangedEvent }
  | { type: typeof S2C.TURN_SKIPPED; payload: TurnSkippedEvent }
  | { type: typeof S2C.QUESTION; payload: ActiveQuestionView & { serverNow: number } }
  | { type: typeof S2C.ANSWER_RESULT; payload: AnswerReveal }
  | { type: typeof S2C.SPECIAL_TILE; payload: SpecialTileEvent }
  | { type: typeof S2C.GAME_OVER; payload: GameOverEvent };
