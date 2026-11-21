"use client";
import { LOCALES, LOCALE_META } from "@/shared/i18n";
import { useBootLocale, useLocaleStore, useT } from "@/lib/i18n";

/** EN / ES / DE toggle. Each player chooses their own language. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  useBootLocale();
  const { t, locale } = useT();
  const setLocale = useLocaleStore((s) => s.setLocale);
  return (
    <div role="radiogroup" aria-label={t("lang.label")} className={`inline-flex rounded-lg border border-brass/40 bg-black/30 p-0.5 ${className}`}>
      {LOCALES.map((l) => (
        <button
          key={l}
          role="radio"
          aria-checked={l === locale}
          title={LOCALE_META[l].label}
          lang={l}
          onClick={() => setLocale(l)}
          className={`rounded-md px-2.5 py-1 font-display text-[15px] transition ${l === locale ? "btn-brass" : "text-vellum/70 hover:text-vellum"}`}
        >
          {LOCALE_META[l].short}
        </button>
      ))}
    </div>
  );
}
