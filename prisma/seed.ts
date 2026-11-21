/**
 * Seeds categories + the built-in question bank (hand-written + generated, ~22k).
 * Idempotent: question ids are stable, existing ones are skipped.
 *   npm run db:seed
 */
import "dotenv/config";
import { getPrisma } from "../server/lib/prisma";
import { classicQuestions } from "../server/questions/QuestionBank";
import { generatedQuestions } from "../server/questions/gen/generate";
import { CATEGORY_META } from "../src/shared/constants";
import type { CategoryId } from "../src/shared/types";

async function main() {
  const prisma = await getPrisma();
  for (const [id, meta] of Object.entries(CATEGORY_META) as [CategoryId, (typeof CATEGORY_META)[CategoryId]][]) {
    await prisma.category.upsert({
      where: { id },
      update: { name: meta.name, color: meta.color, icon: meta.icon },
      create: { id, name: meta.name, color: meta.color, icon: meta.icon },
    });
  }
  const all = [...classicQuestions(), ...generatedQuestions()];
  let created = 0;
  for (let i = 0; i < all.length; i += 1000) {
    const res = await prisma.question.createMany({
      skipDuplicates: true,
      data: all.slice(i, i + 1000).map((q) => ({
        id: q.id,
        categoryId: q.category,
        difficulty: q.difficulty.toUpperCase() as "EASY" | "MEDIUM" | "HARD",
        text: q.text,
        options: q.options,
        correctIndex: q.correctIndex,
        family: q.family ?? "classic",
        stem: q.stem ?? null,
        translations: (q.translations ?? undefined) as object | undefined,
      })),
    });
    created += res.count;
  }
  console.log(`Seeded ${Object.keys(CATEGORY_META).length} categories; ${created} new of ${all.length} questions.`);
}

main()
  .then(async () => (await getPrisma()).$disconnect())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
