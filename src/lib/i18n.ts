"use client";
import { useCallback, useEffect } from "react";
import { create } from "zustand";
import { DEFAULT_LOCALE, detectLocale, LOCALES, translate, type Locale, type Params } from "@/shared/i18n";
import type { Ack, LocalizedQuestion, PublicQuestion } from "@/shared/types";

interface LocaleStore {
  locale: Locale;
  ready: boolean;
  setLocale: (l: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: DEFAULT_LOCALE,
  ready: false,
  setLocale: (locale) => {
    try {
      localStorage.setItem("tq:lang", locale);
    } catch {}
    document.documentElement.lang = locale;
    set({ locale });
  },
}));

/** Pick the saved language, else the browser's, once per tab. */
export function useBootLocale() {
  useEffect(() => {
    if (useLocaleStore.getState().ready) return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("tq:lang");
    } catch {}
    const locale = saved && (LOCALES as readonly string[]).includes(saved) ? (saved as Locale) : detectLocale(navigator.languages ?? [navigator.language]);
    document.documentElement.lang = locale;
    useLocaleStore.setState({ locale, ready: true });
  }, []);
}

export function useT() {
  const locale = useLocaleStore((s) => s.locale);
  const t = useCallback((key: string, params?: Params) => translate(locale, key, params), [locale]);
  return { t, locale };
}

/** Localised error text for a failed ack. */
export function errorText(locale: Locale, res: Ack): string | null {
  if (res.ok) return null;
  return res.code ? translate(locale, res.code, res.params) : res.error;
}

/** The question in the viewer's language (falls back to English). */
export function localizeQuestion(q: PublicQuestion, locale: Locale): LocalizedQuestion {
  return q.i18n?.[locale] ?? { text: q.text, options: q.options };
}
