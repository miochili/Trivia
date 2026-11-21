"use client";
import { useEffect, useRef } from "react";
import { useGame } from "./store";

const buzz = (pattern: number | number[]) => {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* not supported (iOS) */
  }
};

/**
 * Phone comforts while in a room:
 *  - keep the screen awake (Screen Wake Lock), re-acquired when you come back to the tab
 *  - a short buzz when it's your turn / you can steal / an answer is revealed
 *  - the tab title flashes "🎲 Your turn!" if you're looking at another tab
 */
export function useDeviceNiceties(yourTurnLabel: string) {
  const state = useGame((s) => s.state);
  const playerId = useGame((s) => s.playerId);
  const prev = useRef<string>("");

  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    const nav = navigator as Navigator & { wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> } };
    const grab = async () => {
      try {
        if (document.visibilityState === "visible" && nav.wakeLock) lock = await nav.wakeLock.request("screen");
      } catch {
        /* denied or unsupported */
      }
    };
    void grab();
    document.addEventListener("visibilitychange", grab);
    return () => {
      document.removeEventListener("visibilitychange", grab);
      void lock?.release().catch(() => {});
    };
  }, []);

  const g = state?.game;
  const myTurn = !!g && g.phase === "awaiting_roll" && g.activePlayerId === playerId;
  const mySide = g?.sides.find((s) => s.memberIds.includes(playerId ?? ""));
  const canSteal = !!g && g.phase === "steal" && !!mySide && mySide.id !== g.currentSideId;
  const reveal = g?.lastReveal?.questionId ?? "";

  useEffect(() => {
    const key = `${myTurn}|${canSteal}|${reveal}`;
    if (key === prev.current) return;
    const was = prev.current;
    prev.current = key;
    if (!was) return;
    if (myTurn) buzz([60, 40, 60]);
    else if (canSteal) buzz([30, 30, 30, 30, 30]);
    else if (reveal && !was.endsWith(reveal)) buzz(g?.lastReveal?.correct ? 40 : [80, 50, 80]);
  }, [myTurn, canSteal, reveal, g?.lastReveal?.correct]);

  useEffect(() => {
    const base = "Trivia Quest";
    if (!myTurn || document.visibilityState === "visible") {
      document.title = base;
      return;
    }
    let on = false;
    const id = setInterval(() => {
      on = !on;
      document.title = on ? `🎲 ${yourTurnLabel}` : base;
    }, 1000);
    return () => {
      clearInterval(id);
      document.title = base;
    };
  }, [myTurn, yourTurnLabel]);
}
