"use client";
import { useT } from "@/lib/i18n";
import { Token } from "./ui/primitives";
import { CharacterPicker } from "./CharacterPicker";

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
          className="min-w-0 flex-1 border-b-2 border-ink/50 bg-transparent px-1 py-2 text-2xl text-ink outline-none placeholder:text-ink/35 focus:border-ink"
        />
      </div>
      <p className="mt-4 text-[15px] font-bold text-ink-soft">{t("identity.character")}</p>
      <div className="mt-2">
        <CharacterPicker value={avatar} onChange={setAvatar} taken={taken} />
      </div>
    </div>
  );
}
