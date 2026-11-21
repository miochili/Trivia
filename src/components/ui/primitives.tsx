"use client";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "brass" | "paper" | "ghost" | "danger";

const styles: Record<Variant, string> = {
  brass: "btn-brass",
  paper: "btn-paper",
  ghost: "text-vellum/85 hover:text-vellum hover:bg-white/10",
  danger: "text-rust hover:bg-rust/10",
};

export function Button({
  variant = "paper",
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-bold transition disabled:cursor-not-allowed disabled:opacity-45 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/** The room code as wooden letter tiles — letters only, easy to read aloud. */
export function CodeTiles({ code, size = "md", label }: { code: string; size?: "sm" | "md" | "lg"; label?: string }) {
  const dims = size === "lg" ? "h-14 w-12 text-4xl" : size === "sm" ? "h-8 w-7 text-xl" : "h-11 w-10 text-3xl";
  return (
    <span className="inline-flex gap-1" role="img" aria-label={label ?? code.split("").join(" ")}>
      {code.split("").map((ch, i) => (
        <span key={i} aria-hidden className={`letter-tile grid place-items-center font-display leading-none ${dims}`}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  disabled,
  label,
}: {
  value: T;
  options: { value: T; label: ReactNode }[];
  onChange: (v: T) => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1 rounded-lg border border-ink/25 bg-ink/[0.06] p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(o.value)}
            className={`relative flex-1 rounded-md px-3 py-1.5 text-[15px] font-bold transition disabled:cursor-not-allowed ${
              active ? "text-ink" : "text-ink/65 enabled:hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`seg-${label}`}
                className="absolute inset-0 rounded-md btn-brass"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Round wooden token with a character/crest painted on it. */
export function Token({ emblem, color, size = 36, active = false, dim = false }: { emblem: string; color?: string; size?: number; active?: boolean; dim?: boolean }) {
  return (
    <span
      className={`token shrink-0 ${dim ? "opacity-40" : ""}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.58,
        ["--ring" as string]: active ? "var(--color-brass-light)" : color ?? "rgb(43 28 17 / .6)",
        boxShadow: color
          ? `inset 0 -3px 0 rgb(100 65 25 / .35), 0 0 0 ${Math.max(2, size / 12)}px ${active ? "var(--color-brass-light)" : color}, 0 3px 6px rgb(0 0 0 / .35)`
          : undefined,
      }}
      aria-hidden
    >
      <span style={{ lineHeight: 1 }}>{emblem}</span>
    </span>
  );
}

/** A little decorative flourish used under headings. */
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 14" className={`h-3 w-40 ${className}`} aria-hidden>
      <path d="M2 7 H80 M120 7 H198" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
      <path d="M100 1 L106 7 L100 13 L94 7 Z" fill="currentColor" opacity=".75" />
      <circle cx="86" cy="7" r="2" fill="currentColor" opacity=".6" />
      <circle cx="114" cy="7" r="2" fill="currentColor" opacity=".6" />
    </svg>
  );
}
