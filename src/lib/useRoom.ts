"use client";
import { useCallback, useState } from "react";
import type { Ack } from "@/shared/types";
import { errorText, useT } from "./i18n";
import { request } from "./transport";
import { useGame } from "./store";

/** Convenience selectors + an action runner that surfaces (translated) server errors. */
export function useRoom() {
  const state = useGame((s) => s.state)!;
  const playerId = useGame((s) => s.playerId);
  const { t, locale } = useT();
  const me = state.players.find((p) => p.id === playerId) ?? null;
  const isHost = state.hostId === playerId;
  const [failure, setFailure] = useState<Ack | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  const act = useCallback(async <T extends object>(event: string, payload: object = {}) => {
    setPending(event);
    setFailure(null);
    const res = await request<T>(event, payload);
    setPending(null);
    if (!res.ok) setFailure(res);
    return res;
  }, []);

  return { state, me, playerId, isHost, act, error: failure ? errorText(locale, failure) : null, pending, t, locale };
}
