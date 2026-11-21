/**
 * Ids, room codes and session tokens. Isomorphic: runs in Node (socket.io
 * server) and in the browser (peer-to-peer host) via the Web Crypto global.
 */
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";

function randomBytes(n: number): Uint8Array {
  const b = new Uint8Array(n);
  globalThis.crypto.getRandomValues(b);
  return b;
}

/** Unbiased secure integer in [0, max). */
export function secureInt(max: number): number {
  const limit = Math.floor(0x1_0000_0000 / max) * max;
  const buf = new Uint32Array(1);
  do globalThis.crypto.getRandomValues(buf);
  while (buf[0] >= limit);
  return buf[0] % max;
}

// Pronounceable, letters only — easy to read out loud in EN/ES/DE: e.g. "KOBALI".
const CONSONANTS = "BDFGKLMNPRSTVZ";
const VOWELS = "AEIOU";

export function makeRoomCode(): string {
  let s = "";
  for (let i = 0; i < 3; i++) s += CONSONANTS[secureInt(CONSONANTS.length)] + VOWELS[secureInt(VOWELS.length)];
  return s;
}

const b64url = (b: Uint8Array) => btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export function makeId(prefix: string): string {
  return `${prefix}_${b64url(randomBytes(6))}`;
}

/** Opaque reconnect secret handed to one client. Only its hash is stored. */
export function makeSessionToken(): string {
  return b64url(randomBytes(24));
}

export function hashToken(token: string): string {
  return bytesToHex(sha256(utf8ToBytes(token)));
}
