import { describe, expect, it, vi } from "vitest";
import { DEFAULT_SETTINGS } from "../src/shared/types";
import { LOCALES, translate } from "../src/shared/i18n";
import { SEED_QUESTIONS } from "../server/questions/seedQuestions";
import { InMemoryQuestionBank } from "../server/questions/QuestionBank";
import { GameEngine } from "../server/game/GameEngine";
import { NoopPersistence } from "../server/persistence/GamePersistence";
import { TIMING } from "../src/shared/constants";

describe("i18n", () => {
  it("every seed question has 4 options in EN/ES/DE with the same numeric answers", () => {
    let n = 0;
    for (const rows of Object.values(SEED_QUESTIONS)) {
      for (const [, en, es, de] of rows) {
        for (const q of [en, es, de]) {
          expect(q[0].length).toBeGreaterThan(5);
          expect(q[1]).toHaveLength(4);
          expect(new Set(q[1]).size).toBe(4);
        }
        // pure-number answers must match across languages (alignment guard)
        if (/^\d+$/.test(en[1][0])) expect([es[1][0], de[1][0]]).toEqual([en[1][0], en[1][0]]);
        n++;
      }
    }
    expect(n).toBeGreaterThanOrEqual(80);
  });

  it("translates keys with params, including category ids", () => {
    expect(translate("de", "log.correctTrophy", { who: "Ana", n: 200, cat: "science" })).toBe("Ana liegt richtig! +200 und der Wissenschaft-Pokal 🏆");
    expect(translate("es", "trivia.correctTrophy", { n: 300, cat: "history" })).toContain("Historia");
    expect(translate("en", "nope.missing")).toBe("nope.missing");
    for (const l of LOCALES) expect(translate(l, "err.notYourTurn")).not.toBe("err.notYourTurn");
  });

  it("server sends every language with options shuffled in the same order", async () => {
    vi.useFakeTimers();
    const pool = await new InMemoryQuestionBank().loadPool(["science"]);
    const engine = new GameEngine({
      roomCode: "T",
      settings: { ...DEFAULT_SETTINGS, categories: ["science"] },
      sides: [
        { id: "A", name: "A", color: "#f00", emblem: "🦊", memberIds: ["a"] },
        { id: "B", name: "B", color: "#00f", emblem: "🐻", memberIds: ["b"] },
      ],
      pool,
      board: [{ index: 0, kind: "start" }, { index: 1, kind: "category", category: "science" }, { index: 2, kind: "finish" }],
      fixedOrder: true,
      rollDie: () => 1,
      isConnected: () => true,
      clientIdOf: () => null,
      nameOf: (x) => x,
      emit: () => {},
      onChange: () => {},
      persistence: new NoopPersistence(),
    });
    engine.start();
    engine.roll("a");
    vi.advanceTimersByTime(TIMING.DICE_ANIM_MS + TIMING.STEP_MS + TIMING.LAND_PAUSE_MS + 1);
    const q = engine.getPublicState().activeQuestion!.question;
    const stored = pool.find((p) => q.id.endsWith(p.id))!;
    for (const loc of ["es", "de"] as const) {
      const tr = stored.translations![loc]!;
      expect(q.i18n![loc]!.text).toBe(tr.text);
      // the option at each shuffled index is the translation of the EN option at that index
      q.options.forEach((enOpt, i) => {
        const orig = stored.options.indexOf(enOpt);
        expect(q.i18n![loc]!.options[i]).toBe(tr.options[orig]);
      });
    }
    engine.dispose();
    vi.useRealTimers();
  });
});
