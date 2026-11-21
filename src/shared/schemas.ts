/**
 * Runtime validation for every client → server payload.
 * Socket payloads are untrusted input; never read fields that weren't parsed here.
 */
import { z } from "zod";
import { BOARD_LENGTHS, CATEGORY_IDS, QUESTION_TIMERS } from "./types";
import { AVATARS } from "./constants";

const name = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(20, "Name must be 20 characters or fewer")
  .transform((s) => s.replace(/\s+/g, " "));

const roomCode = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z0-9]{6}$/, "Room codes are 6 letters/numbers");

const clientId = z.string().trim().min(8).max(64);
const avatar = z.enum(AVATARS);

export const settingsPatchSchema = z
  .object({
    mode: z.enum(["ffa", "teams"]),
    boardLength: z.union(BOARD_LENGTHS.map((n) => z.literal(n)) as [z.ZodLiteral<30>, z.ZodLiteral<45>, z.ZodLiteral<60>]),
    questionTimerSec: z.union(
      QUESTION_TIMERS.map((n) => z.literal(n)) as [z.ZodLiteral<15>, z.ZodLiteral<30>, z.ZodLiteral<45>],
    ),
    categories: z.array(z.enum(CATEGORY_IDS)).min(2, "Pick at least 2 categories").max(CATEGORY_IDS.length),
    winCondition: z.enum(["finish", "trophies", "either"]),
    correctAnswerRule: z.enum(["stay", "bonus_move", "roll_again"]),
    maxPlayers: z.number().int().min(2).max(16),
  })
  .partial()
  .strict();

export const schemas = {
  createRoom: z.object({ name, clientId, avatar: avatar.optional(), settings: settingsPatchSchema.optional() }),
  joinRoom: z.object({ roomCode, name, clientId, avatar: avatar.optional() }),
  setAvatar: z.object({ avatar }),
  rejoinRoom: z.object({ roomCode, sessionToken: z.string().min(20).max(128) }),
  empty: z.object({}).passthrough(),
  updateSettings: settingsPatchSchema,
  createTeam: z.object({ name: z.string().trim().min(1).max(24) }),
  joinTeam: z.object({ teamId: z.string().max(40).nullable() }),
  renameTeam: z.object({ teamId: z.string().max(40), name: z.string().trim().min(1).max(24) }),
  autoBalance: z.object({ teamCount: z.number().int().min(2).max(6).optional() }),
  setReady: z.object({ ready: z.boolean() }),
  kick: z.object({ playerId: z.string().max(40) }),
  submitAnswer: z.object({ questionId: z.string().max(64), optionIndex: z.number().int().min(0).max(5) }),
};
