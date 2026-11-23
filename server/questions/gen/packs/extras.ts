import type { PackApi } from "../generate";
import * as S from "./science2-data";
import * as N from "./nature2-data";
import * as Fd from "./food2-data";
import * as H from "./history2-data";
import * as Sp from "./sports2-data";
import * as A from "./art2-data";

type L = [string, string, string];
type Diff = "easy" | "medium" | "hard";
type Cat = "science" | "nature" | "food" | "history" | "sports" | "art";
const ED: Record<string, Diff> = { e: "easy", m: "medium", h: "hard", easy: "easy", medium: "medium", hard: "hard" };

/** Second round of question types for the classic categories (fact tables in *2-data.ts). */
export default function pack(api: PackApi) {
  const { add, lookup, which, groupYesNo, rngFor, sample, byId, nameOf, deAus } = api;
  const has = (id: string) => byId.has(id);
  const cname = (id: string) => nameOf(byId.get(id)!);

  // ── hand-written questions: right answer + a pool of wrong answers ──
  const facts = (family: string, cat: Cat, rows: { stem: string; q: L; right: L; wrong: L[]; d: Diff }[], variants = 2) => {
    const r = rngFor(family);
    for (const row of rows) {
      for (let v = 0; v < Math.min(variants, Math.max(1, row.wrong.length - 2)); v++) {
        const ws = sample(r, row.wrong, 3);
        if (ws) add(family, row.stem, cat, row.d, row.q, row.right, ws);
      }
    }
  };
  const sciFacts: [string, S.Fact[]][] = [
    ["constellations", S.CONSTELLATIONS], ["earth-layers", S.LAYERS], ["geology", S.GEOLOGY], ["climate", S.CLIMATE], ["teeth", S.TEETH],
    ["blood", S.BLOOD_FACTS], ["body", S.BODY], ["chemistry", S.CHEM], ["magnets", S.MAGNETS], ["light", S.LIGHT], ["sound", S.SOUND],
    ["nobel", S.NOBEL], ["scopes", S.SCOPES], ["units", S.IMPERIAL],
  ];
  for (const [name, rows] of sciFacts) facts(`sci2.${name}`, "science", rows.map(([stem, q, right, wrong, d]) => ({ stem, q, right, wrong, d })));

  const natQ: [string, N.HQ[]][] = [
    ["climate", N.CLIMATE_Q], ["fossils", N.FOSSIL_Q], ["evolution", N.EVOLUTION_Q], ["environment", N.ENV_Q], ["sleep", N.SLEEP_Q],
    ["parents", N.PARENT_Q], ["journeys", N.JOURNEY_Q], ["insects", N.INSECT_Q], ["reptiles", N.HERP_Q], ["ocean", N.OCEAN_Q],
    ["birds", N.BIRD_Q], ["plant-uses", N.PLANT_USE_Q],
  ];
  for (const [name, rows] of natQ) facts(`nat2.${name}`, "nature", rows.map(([d, q, right, ...wrong]) => ({ stem: q[0], q, right, wrong, d })), 1);

  facts("food2.brews", "food", Fd.BREW_FACTS.map(([d, q, right, wrong]) => ({ stem: q[0], q, right, wrong, d: ED[d] })));
  facts("food2.history", "food", Fd.HISTORY_FACTS.map(([d, q, right, wrong]) => ({ stem: q[0], q, right, wrong, d: ED[d] })));
  facts("hist2.calendar", "history", H.CALENDAR_FACTS.map(([q, right, wrong, d]) => ({ stem: q[0], q, right, wrong, d })));

  // ── sports: one of the big events ──
  {
    const r = rngFor("sport2.big-events");
    for (const [q, yes, no] of Sp.BIG_EVENTS)
      for (const right of yes) {
        const ws = sample(r, no, 3);
        if (ws) add("sport2.big-events", `${q[0]}|${right[0]}`, "sports", "medium", q, right, ws);
      }
  }

  // ── history: terms ↔ meanings ──
  const terms: [string, H.Term[], L][] = [
    ["japan", H.JAPAN_TERMS, ["in the history of Japan", "en la historia de Japón", "in der Geschichte Japans"]],
    ["medieval", H.MEDIEVAL_TERMS, ["in the Middle Ages", "en la Edad Media", "im Mittelalter"]],
    ["castle", H.CASTLE_PARTS, ["in a medieval castle", "en un castillo medieval", "bei einer mittelalterlichen Burg"]],
    ["rome", H.ROMAN_TERMS, ["in ancient Rome", "en la antigua Roma", "im alten Rom"]],
    ["egypt", H.EGYPT_TERMS, ["in ancient Egypt", "en el antiguo Egipto", "im alten Ägypten"]],
  ];
  for (const [name, rows, ctx] of terms) {
    lookup({
      family: `hist2.term-${name}`, category: "history", rows, stem: (t) => t[0][0], diff: (t) => t[2],
      text: ([t]) => [`What was “${t[0]}” ${ctx[0]}?`, `¿Qué era «${t[1]}» ${ctx[1]}?`, `Was war „${t[2]}“ ${ctx[2]}?`],
      right: (t) => t[1], pool: rows.map((t) => t[1]), label: (m) => m,
    });
    lookup({
      family: `hist2.term-${name}-rev`, category: "history", rows, stem: (t) => t[0][0], diff: (t) => t[2],
      text: ([, m]) => [`What was the name ${ctx[0]} for this: ${m[0].charAt(0).toLowerCase() + m[0].slice(1)}?`,
        `¿Cómo se llamaba ${ctx[1]} lo siguiente: ${m[1].charAt(0).toLowerCase() + m[1].slice(1)}?`,
        `Wie hieß ${ctx[2]} Folgendes: ${m[2]}?`],
      right: (t) => t[0], pool: rows.map((t) => t[0]), label: (m) => m,
    });
  }

  // ── science: who did it? ──
  const people = (family: string, rows: [string | L, L, Diff][]) => {
    const asL = (n: string | L): L => (typeof n === "string" ? [n, n, n] : n);
    lookup({
      family, category: "science", rows, stem: (p) => asL(p[0])[0], diff: (p) => p[2],
      text: ([, a]) => [`Who ${a[0]}?`, `¿Quién ${a[1]}?`, `Wer ${a[2]}?`],
      right: (p) => asL(p[0]), pool: rows.map((p) => asL(p[0])), label: (l) => l,
    });
  };
  people("sci2.women", S.WOMEN);
  people("sci2.experiments", S.EXPERIMENTS);
  people("sci2.mathematicians", S.MATHEMATICIANS);
  const born = S.BORN.filter((b) => has(b[1]));
  lookup({
    family: "sci2.born", category: "science", rows: born, stem: (b) => b[0], diff: (b) => b[2],
    text: ([n]) => [`In which present-day country was the scientist ${n} born?`, `¿En qué país actual nació el científico ${n}?`, `In welchem heutigen Land wurde der Wissenschaftler ${n} geboren?`],
    right: (b) => b[1], pool: [...new Set(born.map((b) => b[1]))], label: cname,
  });

  // ── nature: yes/no groups ──
  const yn = (family: string, yes: L[], no: L[], d: Diff, text: L) => groupYesNo(family, "nature", Math.min(120, yes.length * 6), yes, no, d, text);
  yn("nat2.warm-blooded", N.WARM_BLOODED, N.COLD_BLOODED, "medium", ["Which of these animals is warm-blooded?", "¿Cuál de estos animales es de sangre caliente?", "Welches dieser Tiere ist gleichwarm?"]);
  yn("nat2.cold-blooded", N.COLD_BLOODED, N.WARM_BLOODED, "medium", ["Which of these animals is cold-blooded?", "¿Cuál de estos animales es de sangre fría?", "Welches dieser Tiere ist wechselwarm?"]);
  yn("nat2.antlers", N.ANTLERED, [...N.HORNED, ...N.NO_HEADGEAR], "hard", ["Which of these animals has antlers (shed every year)?", "¿Cuál de estos animales tiene astas que muda cada año?", "Welches dieser Tiere hat ein Geweih, das jedes Jahr abgeworfen wird?"]);
  yn("nat2.horns", N.HORNED, [...N.ANTLERED, ...N.NO_HEADGEAR], "hard", ["Which of these animals has horns (kept for life)?", "¿Cuál de estos animales tiene cuernos que conserva toda la vida?", "Welches dieser Tiere hat Hörner, die es sein Leben lang behält?"]);
  yn("nat2.queen", N.QUEEN_COLONY, N.SOLITARY, "medium", ["Which of these insects lives in a colony with a queen?", "¿Cuál de estos insectos vive en una colonia con una reina?", "Welches dieser Insekten lebt in einem Staat mit einer Königin?"]);
  yn("nat2.carnivorous", N.CARNIVOROUS, N.ORDINARY_PLANTS, "medium", ["Which of these plants catches and digests insects?", "¿Cuál de estas plantas atrapa y digiere insectos?", "Welche dieser Pflanzen fängt und verdaut Insekten?"]);
  yn("nat2.poisonous", N.POISONOUS_PLANTS, N.EDIBLE_PLANTS, "medium", ["Which of these plants is poisonous?", "¿Cuál de estas plantas es venenosa?", "Welche dieser Pflanzen ist giftig?"]);
  yn("nat2.echo", N.ECHOLOCATORS, N.NO_ECHO, "medium", ["Which of these animals uses echolocation?", "¿Cuál de estos animales usa la ecolocalización?", "Welches dieser Tiere nutzt Echoortung?"]);
  yn("nat2.glow", N.GLOWING, N.NOT_GLOWING, "medium", ["Which of these living things can glow (bioluminescence)?", "¿Cuál de estos seres vivos puede brillar (bioluminiscencia)?", "Welches dieser Lebewesen kann leuchten (Biolumineszenz)?"]);
  yn("nat2.deep-sea", N.DEEP_SEA, N.SHALLOW_SEA, "hard", ["Which of these animals lives in the deep sea?", "¿Cuál de estos animales vive en las profundidades del mar?", "Welches dieser Tiere lebt in der Tiefsee?"]);

  // ── nature: animals of famous regions ──
  lookup({
    family: "nat2.region", category: "nature", rows: N.REGION_ANIMALS, stem: (a) => a[0][0], diff: (a) => a[2],
    text: ([a]) => [`Where does the ${a[0].toLowerCase()} live in the wild?`, `¿Dónde vive en libertad este animal: ${a[1].toLowerCase()}?`, `Wo lebt dieses Tier in freier Wildbahn: ${a[2]}?`],
    right: (a) => a[1], pool: Object.keys(N.REGIONS), label: (k) => N.REGIONS[k].l,
  });
  which({
    family: "nat2.region-which", category: "nature", rows: N.REGION_ANIMALS, per: 3, diff: "medium", key: (a) => a[1], label: (a) => a[0],
    text: (k) => [`Which of these animals lives ${N.REGIONS[k].in[0]}?`, `¿Cuál de estos animales vive ${N.REGIONS[k].in[1]}?`, `Welches dieser Tiere lebt ${N.REGIONS[k].in[2]}?`],
  });

  // ── food: where does it come from? ──
  type Kind = [string, Fd.Origin[], L];
  const kinds: Kind[] = [
    ["street", Fd.STREET, ["the street food", "la comida callejera", "das Streetfood"]],
    ["soup", Fd.SOUPS, ["the soup", "la sopa", "die Suppe"]],
    ["rice", Fd.RICE, ["the rice dish", "el plato de arroz", "das Reisgericht"]],
    ["dumplings", Fd.DUMPLINGS, ["the dumplings", "la especialidad de masa rellena", "die Teigtaschen"]],
    ["breakfast", Fd.BREAKFASTS, ["the breakfast", "el desayuno", "das Frühstück"]],
    ["sandwich", Fd.SANDWICHES, ["the sandwich", "el sándwich", "das Sandwich"]],
    ["chilli", Fd.CHILLIES, ["the chilli pepper", "el chile", "die Chilisorte"]],
    ["tradition", Fd.TRADITIONS, ["the food tradition", "la tradición culinaria", "die Esstradition"]],
    ["brew", Fd.BREWS, ["the tea or coffee drink", "la bebida de té o café", "das Tee- oder Kaffeegetränk"]],
    ["drink", Fd.SOFT_DRINKS, ["the traditional drink", "la bebida tradicional", "das traditionelle Getränk"]],
  ];
  const origin = (family: string, rows: Fd.Origin[], text: (r: Fd.Origin) => L) => {
    const ok = rows.filter((r) => has(r[3]));
    lookup({
      family, category: "food", rows: ok, stem: (r) => r[0], diff: (r) => ED[r[4]], text,
      right: (r) => r[3], pool: [...new Set(ok.map((r) => r[3]))], label: cname, ok: (r, c) => !(r[5] ?? []).includes(c),
    });
  };
  for (const [name, rows, k] of kinds)
    origin(`food2.${name}`, rows, (r) => [`Which country does ${k[0]} “${r[0]}” come from?`, `¿De qué país procede ${k[1]} «${r[1]}»?`, `Aus welchem Land stammt ${k[2]} „${r[2]}“?`]);
  origin("food2.national", Fd.NATIONAL, (r) => [`“${r[0]}” is often called the national dish of which country?`, `¿De qué país se considera «${r[1]}» el plato nacional?`, `„${r[2]}“ gilt als Nationalgericht welches Landes?`]);

  // ── art: country lookups ──
  const artCountry = (family: string, rows: [string, string, string, string, string[], Diff, boolean?][], text: (r: [string, string, string, string, string[], Diff, boolean?]) => L, d?: Diff) => {
    const ok = rows.filter((r) => has(r[3]));
    lookup({
      family, category: "art", rows: ok, stem: (r) => r[0], diff: (r) => d ?? r[5], text,
      right: (r) => r[3], pool: [...new Set(ok.map((r) => r[3]))], label: cname, ok: (r, c) => !r[4].includes(c),
    });
  };
  artCountry("art2.book-setting", A.BOOK_SETTINGS, (r) => [`In which country is the novel “${r[0]}” mainly set?`, `¿En qué país transcurre principalmente la novela «${r[1]}»?`, `In welchem Land spielt der Roman „${r[2]}“ hauptsächlich?`]);
  artCountry("art2.craft", A.ART_TRADITIONS, (r) => [`Which country is the art or craft tradition “${r[0]}” from?`, `¿De qué país es la tradición artística o artesanal «${r[1]}»?`, `Aus welchem Land stammt die Kunst- bzw. Handwerkstradition „${r[2]}“?`]);
  artCountry("art2.theatre", A.THEATRE_FORMS, (r) => [`Which country does the theatre or puppetry tradition “${r[0]}” come from?`, `¿De qué país procede la tradición teatral o de títeres «${r[1]}»?`, `Aus welchem Land stammt die Theater- bzw. Puppenspieltradition „${r[2]}“?`]);
  artCountry("art2.painting", A.PAINTINGS, (r) => r[6]
    ? [`Which country was the painter of “${r[0]}” from?`, `¿De qué país era la pintora de «${r[1]}»?`, `Aus welchem Land stammte die Malerin von „${r[2]}“?`]
    : [`Which country was the painter of “${r[0]}” from?`, `¿De qué país era el pintor de «${r[1]}»?`, `Aus welchem Land stammte der Maler von „${r[2]}“?`]);
  {
    const ok = A.FASHION.filter((f) => has(f[1]));
    lookup({
      family: "art2.fashion", category: "art", rows: ok, stem: (f) => f[0], diff: (f) => f[3],
      text: ([n, , , , fl]) => fl?.includes("f")
        ? [`Which country is fashion designer ${n} from?`, `¿De qué país es la diseñadora de moda ${n}?`, `Aus welchem Land stammt die Modedesignerin ${n}?`]
        : [`Which country is fashion designer ${n} from?`, `¿De qué país es el diseñador de moda ${n}?`, `Aus welchem Land stammt der Modedesigner ${n}?`],
      right: (f) => f[1], pool: [...new Set(ok.map((f) => f[1]))], label: cname, ok: (f, c) => !f[2].includes(c),
    });
    which({
      family: "art2.fashion-which", category: "art", rows: ok, per: 2, diff: "hard", key: (f) => f[1], label: (f) => [f[0], f[0], f[0]],
      ok: (_r, c, k) => !c[2].includes(k),
      text: (k) => {
        const c = byId.get(k)!;
        return [`Which of these fashion designers comes from ${c.enSubj}?`, `¿Cuál de estos diseñadores de moda es ${c.esDe}?`, `Wer dieser Modedesigner stammt ${deAus(c)}?`];
      },
    });
  }
}
