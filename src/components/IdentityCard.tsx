"use client";
import { AVATARS } from "@/shared/constants";
import { useT } from "@/lib/i18n";
import { Token } from "./ui/primitives";

/** Name + little character picker. Remembered between visits, so returning is one tap. */
export function IdentityCard({
  name,
  setName,
  avatar,
  setAvatar,
  taken = [],
  autoFocus,
  onEnter,
}: {
  name: string;
  setName: (s: string) => void;
  avatar: string;
  setAvatar: (a: string) => void;
  taken?: string[];
  autoFocus?: boolean;
  onEnter?: () => void;
}) {
  const { t } = useT();
  return (
    <div>
      <label htmlFor="name" className="font-display text-xl text-ink">
        {t("identity.title")}
      </label>
      <div className="mt-2 flex items-center gap-3">
        <Token emblem={avatar} size={52} />
        <input
          id="name"
          value={name}
          maxLength={20}
          autoFocus={autoFocus}
          autoComplete="nickname"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
          placeholder={t("home.namePlaceholder")}
          aria-label={t("home.name")}
          className="min-w-0 flex-1 border-b-2 border-ink/50 bg-transparent px-1 py-2 font-fell text-2xl text-ink outline-none placeholder:text-ink/35 focus:border-ink"
        />
      </div>
      <p className="mt-4 text-[15px] font-bold text-ink-soft">{t("identity.character")}</p>
      <div role="radiogroup" aria-label={t("identity.character")} className="mt-2 grid grid-cols-8 gap-1.5">
        {AVATARS.map((a) => {
          const isTaken = taken.includes(a) && a !== avatar;
          const on = a === avatar;
          return (
            <button
              key={a}
              role="radio"
              aria-checked={on}
              disabled={isTaken}
              onClick={() => setAvatar(a)}
              className={`grid aspect-square place-items-center rounded-full transition ${on ? "scale-110" : "enabled:hover:scale-105"} disabled:cursor-not-allowed`}
              title={isTaken ? t("lobby.taken") : undefined}
            >
              <Token emblem={a} size={34} active={on} dim={isTaken} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
