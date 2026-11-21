"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TIMING } from "@/shared/constants";

/** Which cube rotation brings each face to the front. */
const FACE_ROT: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: -90, y: 0 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: 90, y: 0 },
  6: { x: 0, y: 180 },
};

/** Pip cells (0-8 in a 3×3 grid) for each face. */
const PIPS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

/**
 * CSS 3D die. A new `rollId` spins it at least two full turns on both axes and
 * lands on `value` — timed to match the server's DICE_ANIM_MS.
 */
export function Dice({ value, rollId, size = 76 }: { value: number | null; rollId: number; size?: number }) {
  const reduce = useReducedMotion();
  const spins = useRef(0);
  const [rot, setRot] = useState({ x: -18, y: 24 });
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    if (!value || !rollId) return;
    spins.current += 1;
    const base = spins.current * 720;
    const f = FACE_ROT[value];
    setRolling(true);
    setRot({ x: base + f.x, y: base + f.y });
    const t = setTimeout(() => setRolling(false), TIMING.DICE_ANIM_MS);
    return () => clearTimeout(t);
  }, [rollId, value]);

  const half = size / 2;
  const faces: { n: number; transform: string }[] = [
    { n: 1, transform: `translateZ(${half}px)` },
    { n: 6, transform: `rotateY(180deg) translateZ(${half}px)` },
    { n: 3, transform: `rotateY(90deg) translateZ(${half}px)` },
    { n: 4, transform: `rotateY(-90deg) translateZ(${half}px)` },
    { n: 2, transform: `rotateX(90deg) translateZ(${half}px)` },
    { n: 5, transform: `rotateX(-90deg) translateZ(${half}px)` },
  ];

  return (
    <div className="die-scene" style={{ width: size, height: size }} aria-live="polite" aria-label={value ? `Dice shows ${value}` : "Dice"}>
      <motion.div
        className="die-cube"
        style={{ width: size, height: size }}
        animate={{ rotateX: rot.x, rotateY: rot.y, y: rolling && !reduce ? [0, -36, 0, -10, 0] : 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : {
                rotateX: { duration: (TIMING.DICE_ANIM_MS / 1000) * 0.92, ease: [0.2, 0.7, 0.2, 1] },
                rotateY: { duration: (TIMING.DICE_ANIM_MS / 1000) * 0.92, ease: [0.2, 0.7, 0.2, 1] },
                y: { duration: TIMING.DICE_ANIM_MS / 1000, times: [0, 0.3, 0.6, 0.8, 1] },
              }
        }
      >
        {faces.map((f) => (
          <div key={f.n} className="die-face" style={{ transform: f.transform }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i}>{PIPS[f.n].includes(i) && <span className="die-pip block" />}</span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
