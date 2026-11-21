/**
 * Single entrypoint: serves the Next.js app AND the Socket.io game server on one
 * port (simplest deploy; sockets share the page's origin, so no CORS).
 * Set SERVE_NEXT=false to run only the realtime server (e.g. Next on Vercel,
 * sockets on Fly/Render) and point NEXT_PUBLIC_SOCKET_URL at it.
 */
import "dotenv/config";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { parse } from "node:url";
import { attachRealtime, createDataLayer } from "./realtime";

const port = Number(process.env.PORT ?? 3000);
const dev = process.env.NODE_ENV !== "production";
const serveNext = process.env.SERVE_NEXT !== "false";

async function main() {
  let nextHandler: ((req: IncomingMessage, res: ServerResponse) => Promise<void>) | null = null;
  if (serveNext) {
    const { default: next } = await import("next");
    const app = next({ dev, port });
    await app.prepare();
    const handle = app.getRequestHandler();
    nextHandler = (req, res) => handle(req, res, parse(req.url ?? "/", true));
  }

  const httpServer = createServer((req, res) => {
    if (req.url === "/healthz") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true, rooms: realtime.manager.rooms.size }));
      return;
    }
    if (nextHandler) return void nextHandler(req, res);
    res.writeHead(404).end();
  });

  const corsOrigins = serveNext ? [] : (process.env.CORS_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const realtime = attachRealtime(httpServer, { corsOrigins, ...(await createDataLayer()) });

  httpServer.listen(port, () => {
    console.log(`▶ Trivia Quest ${serveNext ? "app + realtime" : "realtime"} server on http://localhost:${port}`);
    console.log(`  storage: ${realtime.storage === "prisma" ? "PostgreSQL (Prisma)" : "in-memory (no DATABASE_URL)"}`);
  });

  const shutdown = () => {
    realtime.manager.shutdown();
    realtime.io.close();
    httpServer.close(() => process.exit(0));
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
