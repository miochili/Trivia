import { describe, expect, it } from "vitest";
import { InMemoryQuestionBank } from "../server/questions/QuestionBank";
import { CATEGORY_META } from "../src/shared/constants";
import type { CategoryId } from "../src/shared/types";

const bank = new InMemoryQuestionBank();
const cats = Object.keys(CATEGORY_META) as CategoryId[];

describe("question bank", async () => {
  const all = await bank.loadPool(cats);

  it("has a lot of questions in every category", () => {
    expect(all.length).toBeGreaterThanOrEqual(20000);
    for (const c of cats) expect(all.filter((q) => q.category === c).length).toBeGreaterThan(1000);
  });

  it("has unique ids", () => {
    expect(new Set(all.map((q) => q.id)).size).toBe(all.length);
  });

  it("every question is well-formed in EN, ES and DE", () => {
    for (const q of all) {
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      const langs = [q, q.translations?.es, q.translations?.de];
      for (const l of langs) {
        expect(l, q.id).toBeTruthy();
        expect(l!.text.trim().length, q.id).toBeGreaterThan(5);
        expect(l!.options, q.id).toHaveLength(4);
        expect(new Set(l!.options).size, `${q.id} duplicate options: ${l!.options}`).toBe(4);
        for (const o of l!.options) expect(o.trim().length, q.id).toBeGreaterThan(0);
        expect(l!.text, q.id).not.toMatch(/undefined|null|NaN|\$\{/);
      }
    }
  });

  it("no longer has Switzerland-specific questions", () => {
    const swiss = all.filter((q) => /Swiss|Switzerland/i.test(q.text) || q.options.some((o) => /Swiss|Switzerland/i.test(o)));
    expect(swiss.map((q) => q.text)).toEqual([]);
  });

  it("offers many different kinds of question", () => {
    expect(new Set(all.map((q) => q.family)).size).toBeGreaterThan(40);
  });
});
