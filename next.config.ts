import type { NextConfig } from "next";

/**
 * Two deploy shapes from one codebase:
 *  - default: served by our Node server (server/index.ts) with socket.io
 *  - NEXT_PUBLIC_MODE=p2p: fully static export (GitHub Pages); the host's browser runs the game
 */
const p2p = process.env.NEXT_PUBLIC_MODE === "p2p";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(p2p
    ? {
        output: "export",
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
