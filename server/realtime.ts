import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { getPrisma } from "./lib/prisma";
import { NoopPersistence, PrismaPersistence, type GamePersistence } from "./persistence/GamePersistence";
import { InMemoryQuestionBank, PrismaQuestionBank, type QuestionBank } from "./questions/QuestionBank";
import { RoomManager } from "./rooms/RoomManager";
import { registerSocketHandlers } from "./socket/registerHandlers";

export interface RealtimeOptions {
  corsOrigins?: string[];
  questionBank: QuestionBank;
  persistence: GamePersistence;
}

/** Picks Prisma-backed storage when DATABASE_URL is set, otherwise in-memory. */
export async function createDataLayer(): Promise<{ questionBank: QuestionBank; persistence: GamePersistence }> {
  if (process.env.DATABASE_URL) {
    const prisma = await getPrisma();
    return { questionBank: new PrismaQuestionBank(prisma), persistence: new PrismaPersistence(prisma) };
  }
  return { questionBank: new InMemoryQuestionBank(), persistence: new NoopPersistence() };
}

/** Attaches the Socket.io game server to an existing HTTP server. */
export function attachRealtime(httpServer: HttpServer, opts: RealtimeOptions) {
  const io = new Server(httpServer, {
    cors: opts.corsOrigins?.length ? { origin: opts.corsOrigins, credentials: true } : undefined,
    pingInterval: 10_000,
    pingTimeout: 8_000,
    maxHttpBufferSize: 16 * 1024, // payloads are tiny; refuse anything big
  });
  const data = { questionBank: opts.questionBank, persistence: opts.persistence };
  const manager = new RoomManager(data);
  registerSocketHandlers(io, manager);
  return { io, manager, storage: data.questionBank.kind };
}
