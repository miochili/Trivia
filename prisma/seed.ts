/**
 * Seeds categories + the built-in question bank. Idempotent (upserts).
 *   npm run db:seed
 */
import "dotenv/config";
import { getPrisma } from "../server/lib/prisma";
import { SEED_QUESTIONS } from "../server/questions/seedQuestions";
import { CATEGORY_META } from "../src/shared/constants";
import type { CategoryId } from "../src/shared/types";

async function main() {
  const prisma = await getPrisma();
  let count = 0;
  for (const [id, meta] of Object.entries(CATEGORY_META) as [CategoryId, (typeof CATEGORY_META)[CategoryId]][]) {
    await prisma.category.upsert({
      where: { id },
      update: { name: meta.name, color: meta.color, icon: meta.icon },
      create: { id, name: meta.name, color: meta.color, icon: meta.icon },
    });
    for (const [difficulty, [text, options], es, de] of SEED_QUESTIONS[id]) {
      const translations = { es: { text: es[0], options: es[1] }, de: { text: de[0], options: de[1] } };
      const diff = difficulty.toUpperCase() as "EASY" | "MEDIUM" | "HARD";
      await prisma.question.upsert({
        where: { categoryId_text: { categoryId: id, text } },
        update: { options, correctIndex: 0, difficulty: diff, translations },
        create: { categoryId: id, text, options, correctIndex: 0, difficulty: diff, translations },
      });
      count++;
    }
  }
  console.log(`Seeded ${Object.keys(CATEGORY_META).length} categories and ${count} questions.`);
}

main()
  .then(async () => (await getPrisma()).$disconnect())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
