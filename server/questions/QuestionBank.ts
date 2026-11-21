import type { Locale } from "../../src/shared/i18n";
import type { CategoryId, Difficulty, LocalizedQuestion } from "../../src/shared/types";
import { SEED_QUESTIONS } from "./seedQuestions";
import { generatedQuestions } from "./gen/generate";

/** Server-only question shape — includes the secret `correctIndex`. */
export interface StoredQuestion {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  text: string;
  options: string[];
  correctIndex: number;
  /** Kind of question (e.g. "capital", "pop-most"); hand-written ones are "classic". */
  family?: string;
  /** What it is about — never two questions with the same stem in one game. */
  stem?: string;
  /** Other languages; options align index-for-index with `options`. */
  translations?: Partial<Record<Locale, LocalizedQuestion>>;
}

/**
 * Source of questions. A game loads its pool once at start so the turn loop
 * stays synchronous and never waits on the database mid-turn.
 */
export interface QuestionBank {
  readonly kind: "memory" | "prisma";
  loadPool(categories: CategoryId[]): Promise<StoredQuestion[]>;
}

export class InMemoryQuestionBank implements QuestionBank {
  readonly kind = "memory" as const;
  private readonly all: StoredQuestion[];

  constructor(questions?: StoredQuestion[]) {
    this.all = questions ?? [...classicQuestions(), ...generatedQuestions()];
  }

  async loadPool(categories: CategoryId[]) {
    const set = new Set(categories);
    return this.all.filter((q) => set.has(q.category));
  }
}

/** The hand-written questions (seedQuestions.ts). */
export function classicQuestions(): StoredQuestion[] {
  return (Object.entries(SEED_QUESTIONS) as [CategoryId, (typeof SEED_QUESTIONS)[CategoryId]][]).flatMap(([category, rows]) =>
        rows.map(([difficulty, en, es, de], i) => ({
          id: `${category}-${i}`,
          category,
          difficulty,
          family: "classic",
          stem: `classic:${category}-${i}`,
          text: en[0],
          options: [...en[1]],
          correctIndex: 0,
          translations: { es: { text: es[0], options: [...es[1]] }, de: { text: de[0], options: [...de[1]] } },
        })),
      );
}

export class PrismaQuestionBank implements QuestionBank {
  readonly kind = "prisma" as const;
  constructor(
    private readonly prisma: import("../lib/prisma").PrismaClient,
    private readonly perCategoryLimit = 6000,
  ) {}

  async loadPool(categories: CategoryId[]) {
    const rows = await Promise.all(
      categories.map((categoryId) =>
        this.prisma.question.findMany({
          where: { categoryId, active: true },
          take: this.perCategoryLimit,
          orderBy: { timesAsked: "asc" }, // favour fresher questions
        }),
      ),
    );
    return rows.flat().map((q) => ({
      id: q.id,
      category: q.categoryId as CategoryId,
      difficulty: q.difficulty.toLowerCase() as Difficulty,
      text: q.text,
      options: q.options,
      correctIndex: q.correctIndex,
      family: q.family,
      stem: q.stem ?? undefined,
      translations: (q.translations ?? undefined) as StoredQuestion["translations"],
    }));
  }
}
