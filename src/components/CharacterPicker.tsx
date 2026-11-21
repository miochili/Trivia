"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EYES_COUNT, FACE_COLORS, HAT_COUNT, MOUTH_COUNT, encodeFace, isCustomAvatar, parseFace, randomFace, type Face } from "@/shared/avatar";
import { AVATARS } from "@/shared/constants";
import { useT } from "@/lib/i18n";
import { FaceSvg } from "./ui/Avatar";
import { Button, Token } from "./ui/primitives";

/**
 * Pick a ready-made character or make your own face (colour, eyes, mouth, hat)
 * — like skribbl.io / Kahoot. Self-made faces are stored as a tiny code.
 */
export function CharacterPicker({
  value,
  onChange,
  taken = [],
  size = 34,
}: {
  value: string;
  onChange: (avatar: string) => void;
  taken?: string[];
  size?: number;
}) {
  const { t } = useT();
  const [making, setMaking] = useState(false);
  const custom = isCustomAvatar(value);
  return (
    <div>
      <div role="radiogroup" aria-label={t("identity.character")} className="grid grid-cols-6 gap-1.5 sm:grid-cols-9">
        {/* the "make your own" slot comes first so it's easy to find */}
        <button
          role="radio"
          aria-checked={custom}
          onClick={() => {
            if (!custom) onChange(encodeFace(randomFace()));
            setMaking(true);
          }}
          className={`relative grid aspect-square place-items-center rounded-full transition ${custom ? "scale-110" : "hover:scale-105"}`}
          title={t("identity.makeOwn")}
          aria-label={t("identity.makeOwn")}
        >
          {custom ? (
            <Token emblem={value} size={size} active />
          ) : (
            <span className="grid place-items-center rounded-full border-2 border-dashed border-ink/45 text-xl font-bold text-ink-soft" style={{ width: size, height: size }}>
              ✎
            </span>
          )}
        </button>
        {AVATARS.map((a) => {
          const isTaken = taken.includes(a) && a !== value;
          const on = a === value;
          return (
            <button
              key={a}
              role="radio"
              aria-checked={on}
              disabled={isTaken}
              onClick={() => {
                onChange(a);
                setMaking(false);
              }}
              className={`grid aspect-square place-items-center rounded-full transition ${on ? "scale-110" : "enabled:hover:scale-105"} disabled:cursor-not-allowed`}
              title={isTaken ? t("lobby.taken") : undefined}
            >
              <Token emblem={a} size={size} active={on} dim={isTaken} />
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {making && custom && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <FaceMaker face={parseFace(value)!} onChange={(f) => onChange(encodeFace(f))} onDone={() => setMaking(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaceMaker({ face, onChange, onDone }: { face: Face; onChange: (f: Face) => void; onDone: () => void }) {
  const { t } = useT();
  const cycle = (key: "eyes" | "mouth" | "hat", n: number, dir: number) => onChange({ ...face, [key]: (face[key] + dir + n) % n });
  const Row = ({ label, k, n }: { label: string; k: "eyes" | "mouth" | "hat"; n: number }) => (
    <div className="flex items-center gap-1.5">
      <button onClick={() => cycle(k, n, -1)} className="btn-paper grid h-10 w-10 shrink-0 place-items-center rounded-full" aria-label={`${label} ◀`}>
        ◀
      </button>
      <span className="min-w-0 flex-1 text-center text-[15px] font-bold text-ink-soft">{label}</span>
      <button onClick={() => cycle(k, n, 1)} className="btn-paper grid h-10 w-10 shrink-0 place-items-center rounded-full" aria-label={`${label} ▶`}>
        ▶
      </button>
    </div>
  );
  return (
    <div className="mt-4 rounded-xl border border-ink/20 bg-vellum/70 p-4">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
        <motion.div key={`${face.color}${face.eyes}${face.mouth}${face.hat}`} initial={{ scale: 0.85, rotate: -6 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
          <FaceSvg face={face} size={96} />
        </motion.div>
        <div className="flex w-full flex-1 flex-col gap-2">
          <Row label={t("maker.eyes")} k="eyes" n={EYES_COUNT} />
          <Row label={t("maker.mouth")} k="mouth" n={MOUTH_COUNT} />
          <Row label={t("maker.hat")} k="hat" n={HAT_COUNT} />
        </div>
      </div>
      <p className="mt-3 text-[15px] font-bold text-ink-soft">{t("maker.color")}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {FACE_COLORS.map((c, i) => (
          <button
            key={c}
            onClick={() => onChange({ ...face, color: i })}
            aria-label={`${t("maker.color")} ${i + 1}`}
            aria-pressed={face.color === i}
            className={`h-8 w-8 rounded-full border-2 transition ${face.color === i ? "scale-110 border-ink" : "border-ink/25 hover:scale-105"}`}
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Button className="flex-1 whitespace-nowrap px-2" onClick={() => onChange(randomFace())}>
          🎲 {t("maker.random")}
        </Button>
        <Button variant="brass" className="flex-1" onClick={onDone}>
          {t("maker.done")}
        </Button>
      </div>
    </div>
  );
}
