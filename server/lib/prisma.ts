import type { PrismaClient } from "../../src/generated/prisma/client.ts";

let client: PrismaClient | null = null;

/**
 * Lazily-created Prisma client (Prisma 7 + node-postgres driver adapter).
 * Imported dynamically so the server runs fine in in-memory mode even when
 * `prisma generate` was never run (e.g. a zero-config free deploy).
 */
export async function getPrisma(): Promise<PrismaClient> {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  if (!client) {
    const [{ PrismaClient }, { PrismaPg }] = await Promise.all([
      import("../../src/generated/prisma/client.ts"),
      import("@prisma/adapter-pg"),
    ]);
    client = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
  }
  return client;
}

export type { PrismaClient };
