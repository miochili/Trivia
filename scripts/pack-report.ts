/**
 * Lists question types (families) for one category with counts and a sample in EN/ES/DE.
 *   npx tsx scripts/pack-report.ts food            # all families in "food"
 *   npx tsx scripts/pack-report.ts food food.      # only families starting with "food."
 */
import { generatedQuestions } from "../server/questions/gen/generate";

const [cat, prefix = ""] = process.argv.slice(2);
const qs = generatedQuestions().filter((q) => (!cat || q.category === cat) && (q.family ?? "").startsWith(prefix));
const fams = new Map<string, typeof qs>();
for (const q of qs) fams.set(q.family!, [...(fams.get(q.family!) ?? []), q]);
for (const [f, list] of fams) {
  const q = list[Math.floor(list.length / 2)];
  console.log(`\n[${f}] ×${list.length} (${q.difficulty})`);
  console.log(`  EN ${q.text} | ${q.options.join(" / ")}`);
  console.log(`  ES ${q.translations!.es!.text} | ${q.translations!.es!.options.join(" / ")}`);
  console.log(`  DE ${q.translations!.de!.text} | ${q.translations!.de!.options.join(" / ")}`);
}
console.log(`\n${fams.size} families, ${qs.length} questions${cat ? ` in ${cat}` : ""}${prefix ? ` (prefix ${prefix})` : ""}`);
