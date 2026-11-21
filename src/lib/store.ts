"use client";
import { create } from "zustand";
import { S2C, type MovePawnEvent, type SpecialTileEvent } from "@/shared/events";
import type { PublicRoomState } from "@/shared/types";
import { hub, LOCAL, type ConnStatus as TConn } from "./transport";

export type ConnStatus = TConn;

interface GameStore {
  conn: ConnStatus;
  playerId: string | null;
  state: PublicRoomState | null;
  /** serverNow - clientNow; add to Date.now() to get server time */
  clockOffset: number;
  /** Positions currently DRAWN on the board (lag behind state while animating). */
  displayPos: Record<string, number>;
  dice: { value: number; rollId: number; sideId: string } | null;
  banner: (SpecialTileEvent & { key: number }) | null;
  reactions: { id: number; playerId: string; emoji: string; x: number }[];
  notice: string | null;
  setPlayer: (id: string | null) => void;
  applyState: (s: PublicRoomState) => void;
  setNotice: (n: string | null) => void;
  reset: () => void;
}

const animatingUntil: Record<string, number> = {};
const animTimers = new Set<ReturnType<typeof setTimeout>>();

export const useGame = create<GameStore>((set, get) => ({
  conn: "connecting",
  playerId: null,
  state: null,
  clockOffset: 0,
  displayPos: {},
  dice: null,
  banner: null,
  reactions: [],
  notice: null,
  setPlayer: (playerId) => set({ playerId }),
  setNotice: (notice) => set({ notice }),
  applyState: (s) => {
    const cur = get().state;
    if (cur && cur.code === s.code && s.version < cur.version) return; // stale
    const displayPos = { ...get().displayPos };
    const now = Date.now();
    for (const side of s.game?.sides ?? []) {
      if (!(side.id in displayPos) || (animatingUntil[side.id] ?? 0) <= now) displayPos[side.id] = side.position;
    }
    set({ state: s, displayPos, clockOffset: s.serverNow - now });
  },
  reset: () => {
    animTimers.forEach(clearTimeout);
    animTimers.clear();
    set({ state: null, playerId: null, displayPos: {}, dice: null, banner: null, notice: null });
  },
}));

function animateMove(e: MovePawnEvent) {
  const total = e.delayMs + e.path.length * e.stepMs;
  animatingUntil[e.sideId] = Date.now() + total + 50;
  e.path.forEach((tile, i) => {
    const t = setTimeout(() => {
      animTimers.delete(t);
      useGame.setState((st) => ({ displayPos: { ...st.displayPos, [e.sideId]: tile } }));
    }, e.delayMs + i * e.stepMs);
    animTimers.add(t);
  });
  // Final sync to the authoritative position once the animation is done.
  const t = setTimeout(() => {
    animTimers.delete(t);
    const side = useGame.getState().state?.game?.sides.find((s) => s.id === e.sideId);
    if (side) useGame.setState((st) => ({ displayPos: { ...st.displayPos, [e.sideId]: side.position } }));
  }, total + 60);
  animTimers.add(t);
}

let wired = false;
let bannerSeq = 0;

/** Registers server→client listeners once per tab (on the transport hub). */
export function wireSocketToStore() {
  if (wired) return;
  wired = true;
  const st = useGame.setState;
  hub.on(LOCAL.STATUS, (c: ConnStatus) => st({ conn: c }));
  hub.on(LOCAL.HOST_LOST, () => st({ notice: "err.hostGone", state: null }));
  hub.on(S2C.ROOM_STATE, (state: PublicRoomState) => useGame.getState().applyState(state));
  hub.on(S2C.DICE_ROLLED, (e: { value: number; rollId: number; sideId: string }) => st({ dice: { value: e.value, rollId: e.rollId, sideId: e.sideId } }));
  hub.on(S2C.MOVE_PAWN, animateMove);
  hub.on(S2C.SPECIAL_TILE, (e: SpecialTileEvent) => {
    const key = ++bannerSeq;
    st({ banner: { ...e, key } });
    setTimeout(() => {
      if (useGame.getState().banner?.key === key) st({ banner: null });
    }, 2200);
  });
  hub.on(S2C.REACTION, (e: { id: number; playerId: string; emoji: string }) => {
    const r = { ...e, x: 8 + Math.random() * 84 };
    st((s) => ({ reactions: [...s.reactions.slice(-14), r] }));
    setTimeout(() => st((s) => ({ reactions: s.reactions.filter((x) => x !== r) })), 2800);
  });
  hub.on(S2C.KICKED, (e: { reason: string }) => st({ notice: e.reason, state: null }));
  hub.on(S2C.SESSION_REPLACED, () => st({ notice: "room.replaced" }));
}

/** Server-synchronised "now". */
export const serverNow = () => Date.now() + useGame.getState().clockOffset;
