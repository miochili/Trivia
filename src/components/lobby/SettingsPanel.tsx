"use client";
import { CATEGORY_META } from "@/shared/constants";
import { categoryName } from "@/shared/i18n";
import { C2S } from "@/shared/events";
import { CATEGORY_IDS, type CategoryId, type GameSettings } from "@/shared/types";
import { useRoom } from "@/lib/useRoom";
import { Segmented } from "../ui/primitives";

export function SettingsPanel() {
  const { state, isHost, act, t, locale } = useRoom();
  const s = state.settings;
  const set = (patch: Partial<GameSettings>) => act(C2S.UPDATE_SETTINGS, patch);

  const toggleCat = (c: CategoryId) => {
    const has = s.categories.includes(c);
    if (has && s.categories.length <= 2) return;
    set({ categories: has ? s.categories.filter((x) => x !== c) : [...s.categories, c] });
  };

  return (
    <section className="parchment p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-3xl">{t("settings.title")}</h2>
        {!isHost && <span className="text-ink-soft">{t("settings.hostOnly")}</span>}
      </div>

      <div className="ink-rule mt-2" />
      <div className="mt-4 space-y-5">
        <Field label={t("settings.playAs")}>
          <Segmented
            label={t("settings.playAs")}
            value={s.mode}
            disabled={!isHost}
            onChange={(mode) => set({ mode })}
            options={[
              { value: "ffa", label: t("settings.ffa") },
              { value: "teams", label: t("settings.teams") },
            ]}
          />
        </Field>

        {s.mode === "teams" && (
          <Field label={t("settings.teamAnswer")} hint={t(s.teamAnswer === "vote" ? "settings.voteHint" : "settings.captainHint")}>
            <Segmented
              label={t("settings.teamAnswer")}
              value={s.teamAnswer}
              disabled={!isHost}
              onChange={(teamAnswer) => set({ teamAnswer })}
              options={[
                { value: "vote", label: t("settings.vote") },
                { value: "captain", label: t("settings.captain") },
              ]}
            />
          </Field>
        )}

        <Field label={t("settings.steals")} hint={t("settings.stealsHint")}>
          <Segmented
            label={t("settings.steals")}
            value={s.steals ? "on" : "off"}
            disabled={!isHost}
            onChange={(v) => set({ steals: v === "on" })}
            options={[
              { value: "on", label: t("settings.on") },
              { value: "off", label: t("settings.off") },
            ]}
          />
        </Field>

        <Field label={t("settings.public")} hint={t("settings.publicHint")}>
          <Segmented
            label={t("settings.public")}
            value={s.isPublic ? "on" : "off"}
            disabled={!isHost}
            onChange={(v) => set({ isPublic: v === "on" })}
            options={[
              { value: "on", label: t("settings.on") },
              { value: "off", label: t("settings.off") },
            ]}
          />
        </Field>

        <Field label={t("settings.boardLength")} hint={t("settings.boardHint")}>
          <Segmented
            label={t("settings.boardLength")}
            value={s.boardLength}
            disabled={!isHost}
            onChange={(boardLength) => set({ boardLength })}
            options={[
              { value: 30, label: t("settings.tiles", { n: 30 }) },
              { value: 50, label: t("settings.tiles", { n: 50 }) },
              { value: 70, label: t("settings.tiles", { n: 70 }) },
            ]}
          />
        </Field>

        <Field label={t("settings.timer")}>
          <Segmented
            label={t("settings.timer")}
            value={s.questionTimerSec}
            disabled={!isHost}
            onChange={(questionTimerSec) => set({ questionTimerSec })}
            options={[
              { value: 15, label: t("settings.seconds", { n: 15 }) },
              { value: 30, label: t("settings.seconds", { n: 30 }) },
              { value: 45, label: t("settings.seconds", { n: 45 }) },
            ]}
          />
        </Field>

        <Field label={t("settings.win")} hint={t(s.winCondition === "trophies" ? "settings.winHintLoop" : "settings.winHint")}>
          <Segmented
            label={t("settings.win")}
            value={s.winCondition}
            disabled={!isHost}
            onChange={(winCondition) => set({ winCondition })}
            options={[
              { value: "either", label: t("settings.winEither") },
              { value: "finish", label: t("settings.winFinish") },
              { value: "trophies", label: t("settings.winTrophies") },
            ]}
          />
        </Field>

        <Field label={t("settings.correct")} hint={t("settings.correctHint")}>
          <Segmented
            label={t("settings.correct")}
            value={s.correctAnswerRule}
            disabled={!isHost}
            onChange={(correctAnswerRule) => set({ correctAnswerRule })}
            options={[
              { value: "stay", label: t("settings.stay") },
              { value: "bonus_move", label: t("settings.bonus") },
              { value: "roll_again", label: t("settings.rollAgain") },
            ]}
          />
        </Field>

        <Field label={t("settings.categories")} hint={t("settings.categoriesHint")}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORY_IDS.map((c) => {
              const on = s.categories.includes(c);
              const meta = CATEGORY_META[c];
              return (
                <button
                  key={c}
                  disabled={!isHost}
                  aria-pressed={on}
                  onClick={() => toggleCat(c)}
                  className={`flex items-center gap-2 rounded-md border-2 px-3 py-2 text-left font-bold transition disabled:cursor-not-allowed ${
                    on ? "border-ink/60 text-vellum" : "border-ink/20 bg-ink/[0.04] text-ink/45 line-through decoration-2"
                  }`}
                  style={on ? { background: meta.color, boxShadow: "inset 0 -3px 0 rgb(0 0 0 / .25)" } : undefined}
                >
                  <span aria-hidden>{meta.icon}</span>
                  {categoryName(locale, c)}
                </button>
              );
            })}
          </div>
        </Field>
      </div>
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-lg text-ink">{label}</p>
      {children}
      {hint && <p className="mt-1 text-sm italic text-ink-soft">{hint}</p>}
    </div>
  );
}
