import type { PackApi, L, Country } from "../generate";
import type { Difficulty } from "../../../../src/shared/types";
import {
  ANIMALS, BLUE_CHEESES, BRANDS, BREADS, CAFFEINE, CEREALS, CHAINS, CHEESE_MILK, CITRUS, COCKTAILS, COFFEES, COOK_TERMS, CURED,
  DISH_WHAT, FERMENTED, FESTIVE, FISH, FROM_AFRICA, FROM_AMERICAS, FROM_ASIA, FROM_NEAR_EAST, JAPANESE, LEGUMES, MEATS, MILKS,
  MUSHROOMS, NO_CAFFEINE, NOT_BLUE_CHEESES, NOT_CEREALS, NOT_CITRUS, NOT_FERMENTED, NOT_MUSHROOMS, NOT_PASTA, NOT_STONE_FRUIT,
  NUTS_GRAINS, OCCASIONS, PARTS, PASTA, PASTA_MEANING, PLANT_PARTS, RED_GRAPES, SAUCES, SCIENCE, SHELLFISH, SPICE_PARTS, SPICES,
  SPIRITS, STONE_FRUIT, SWEETS, TOOLS, WHITE_GRAPES, WINE_COUNTRIES, WINE_REGIONS,
  type D, type Described, type Origin,
} from "./food-data";

const DF: Record<D, Difficulty> = { e: "easy", m: "medium", h: "hard" };
const clash = (a?: string[], b?: string[]) => !!a && !!b && a.some((t) => b.includes(t));
const an = (w: string) => (/^[aeiou]/i.test(w) ? "an" : "a");
/** German phrase after a colon: lower-case a leading article only (nouns stay capitalised). */
const deLow = (s: string) => s.replace(/^(Ein|Eine|Einen|Der|Die|Das)\b/, (m) => m.toLowerCase());

/** Extra question types for the "food" category. */
export default function pack(api: PackApi) {
  const { add, lookup, which, groupYesNo, rngFor, sample, byId, nameOf, deAus, cap, low, capL, COUNTRIES } = api;
  const country = (id: string): Country => {
    const c = byId.get(id);
    if (!c) throw new Error(`food pack: unknown country ${id}`);
    return c;
  };
  const foodPool = COUNTRIES.filter((c) => c.pop >= 5);
  /** Wrong answers come from the countries the table itself uses, so they are plausible. */
  const tablePool = (rows: Origin[]) => [...new Set(rows.map((x) => x[3]))].map(country);

  // ── "which country is X from?" + "which of these is from <country>?" ──
  const origin = (fam: string, rows: Origin[], pool: Country[], text: (x: Origin) => L, rev: (c: Country) => L, per: number) => {
    for (const x of rows) { country(x[3]); for (const id of x[5] ?? []) country(id); }
    lookup({ family: `food.${fam}`, category: "food", rows, stem: (x) => x[0], diff: (x) => DF[x[4]], text,
      right: (x) => country(x[3]), pool, label: nameOf, ok: (x, c) => c.id !== x[3] && !(x[5] ?? []).includes(c.id) });
    which({ family: `food.${fam}-rev`, category: "food", rows, per, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
      text: (k) => rev(country(k)), ok: (_, c, k) => !(c[5] ?? []).includes(k) });
  };

  origin("bread-country", BREADS, tablePool(BREADS),
    (x) => [`${x[0]} – which country does this bread come from?`, `${x[1]}: ¿de qué país es este pan?`, `${x[2]} – aus welchem Land stammt dieses Brot oder Gebäck?`],
    (c) => [`Which of these breads comes from ${c.enSubj}?`, `¿Cuál de estos panes es ${c.esDe}?`, `Was davon ist ein Brot oder Gebäck ${deAus(c)}?`], 10);
  origin("sweet-country", SWEETS, tablePool(SWEETS),
    (x) => [`${x[0]} – which country does this sweet treat come from?`, `${x[1]}: ¿de qué país es este dulce?`, `${x[2]} – aus welchem Land stammt diese Süßspeise?`],
    (c) => [`Which of these sweet treats comes from ${c.enSubj}?`, `¿Cuál de estos dulces es ${c.esDe}?`, `Welche dieser Süßspeisen stammt ${deAus(c)}?`], 12);
  origin("sauce-country", SAUCES, tablePool(SAUCES),
    (x) => [`${x[0]} – which country does this sauce come from?`, `${x[1]}: ¿de qué país es esta salsa?`, `${x[2]} – aus welchem Land stammt diese Soße?`],
    (c) => [`Which of these sauces comes from ${c.enSubj}?`, `¿Cuál de estas salsas es ${c.esDe}?`, `Welche dieser Soßen stammt ${deAus(c)}?`], 10);
  origin("cured-meat-country", CURED, tablePool(CURED),
    (x) => [`${x[0]} – which country does this sausage or cured meat come from?`, `${x[1]}: ¿de qué país es este embutido o fiambre?`, `${x[2]} – aus welchem Land stammt diese Wurst- bzw. Fleischspezialität?`],
    (c) => [`Which of these sausages and cured meats comes from ${c.enSubj}?`, `¿Cuál de estos embutidos o fiambres es ${c.esDe}?`, `Welche dieser Wurst- und Fleischspezialitäten stammt ${deAus(c)}?`], 12);
  origin("wine-region", WINE_REGIONS, WINE_COUNTRIES.map(country),
    (x) => [`In which country is the ${x[0]} wine region?`, `¿En qué país está esta región vinícola: ${x[1]}?`, `In welchem Land liegt das Weinbaugebiet ${x[2]}?`],
    (c) => [`Which of these wine regions is in ${c.enSubj}?`, `¿Cuál de estas regiones vinícolas está en ${c.esSubj}?`, `Welches dieser Weinbaugebiete liegt ${c.deIn}?`], 12);
  origin("brand-country", BRANDS, tablePool(BRANDS),
    (x) => [`Which country does the brand ${x[0]} originally come from?`, `¿De qué país es originalmente la marca ${x[1]}?`, `Aus welchem Land stammt die Marke ${x[2]} ursprünglich?`],
    (c) => [`Which of these food or drink brands originally comes from ${c.enSubj}?`, `¿Cuál de estas marcas de alimentación o bebidas es originalmente ${c.esDe}?`, `Welche dieser Lebensmittel- oder Getränkemarken stammt ursprünglich ${deAus(c)}?`], 12);
  origin("chain-country", CHAINS, tablePool(CHAINS),
    (x) => [`Which country does the restaurant or café chain ${x[0]} originally come from?`, `¿De qué país es originalmente la cadena de restaurantes o cafeterías ${x[1]}?`, `Aus welchem Land stammt die Restaurant- oder Cafékette ${x[2]} ursprünglich?`],
    (c) => [`Which of these restaurant or café chains originally comes from ${c.enSubj}?`, `¿Cuál de estas cadenas de restaurantes o cafeterías es originalmente ${c.esDe}?`, `Welche dieser Restaurant- oder Caféketten stammt ursprünglich ${deAus(c)}?`], 10);

  // ── "what is X?" + "which X is <description>?" ──
  const describe = (fam: string, rows: Described[], variants: number, per: number, text: (x: Described) => L, rev: (x: Described) => L) => {
    lookup({ family: `food.${fam}`, category: "food", rows, variants, stem: (x) => x[0], diff: (x) => DF[x[4]], text,
      right: (x) => x, pool: rows, label: (x) => x[3], ok: (x, a) => a !== x && !clash(x[5], a[5]) });
    which({ family: `food.${fam}-rev`, category: "food", rows, per, key: (x) => x[0], label: (x) => capL([x[0], x[1], x[2]]),
      diff: (k) => DF[rows.find((x) => x[0] === k)![4]], text: (k) => rev(rows.find((x) => x[0] === k)!), ok: (r, c) => !clash(r[5], c[5]) });
  };
  describe("coffee-drink", COFFEES, 3, 3,
    (x) => [`What is ${an(x[0])} ${x[0]}?`, `¿Qué es un ${x[1]}?`, `Was ist ein ${x[2]}?`],
    (x) => [`Which coffee drink is this: ${low(x[3][0])}?`, `¿Qué bebida de café es esta: ${low(x[3][1])}?`, `Welches Kaffeegetränk ist das: ${deLow(x[3][2])}?`]);
  describe("cooking-term", COOK_TERMS, 3, 3,
    (x) => [`In cooking, what does "${low(x[0])}" mean?`, `En la cocina, ¿qué significa «${low(x[1])}»?`, `Was bedeutet „${x[2]}“ in der Küche?`],
    (x) => [`Which cooking term means: ${low(x[3][0])}?`, `¿Qué término culinario significa: ${low(x[3][1])}?`, `Welcher Küchenbegriff passt zu dieser Beschreibung: „${x[3][2]}“?`]);
  describe("japanese-term", JAPANESE, 3, 3,
    (x) => [`In Japanese cuisine, what is "${x[0]}"?`, `Cocina japonesa: ¿qué es «${x[1]}»?`, `Was ist „${x[2]}“ in der japanischen Küche?`],
    (x) => [`What is the Japanese name for this: ${low(x[3][0])}?`, `¿Cómo se llama en japonés esto: ${low(x[3][1])}?`, `Wie heißt das auf Japanisch: ${deLow(x[3][2])}?`]);
  describe("dish-what", DISH_WHAT, 3, 3,
    (x) => [`${x[0]}: what kind of dish is this?`, `${x[1]}: ¿qué tipo de plato es?`, `${x[2]} – was für eine Speise ist das?`],
    (x) => [`Which dish is this: ${low(x[3][0])}?`, `¿Qué plato es este: ${low(x[3][1])}?`, `Welche Speise ist das: ${deLow(x[3][2])}?`]);

  // ── kitchen tools ──
  lookup({ family: "food.kitchen-tool", category: "food", rows: TOOLS, stem: (x) => x[1], diff: (x) => DF[x[5]],
    text: (x) => [`What is ${x[0]} mainly used for?`, `¿Para qué se usa principalmente este utensilio de cocina: ${low(x[2])}?`, `Wofür benutzt man dieses Küchenutensil: ${x[3]}?`],
    right: (x) => x, pool: TOOLS, label: (x) => x[4], ok: (x, a) => a !== x && !clash(x[6], a[6]) });
  which({ family: "food.kitchen-tool-rev", category: "food", rows: TOOLS, per: 3, diff: "easy", key: (x) => x[1], label: (x) => [x[1], x[2], x[3]],
    text: (k) => { const x = TOOLS.find((t) => t[1] === k)!; return [`Which kitchen tool is mainly used for ${low(x[4][0])}?`, `¿Qué utensilio de cocina se usa principalmente para ${low(x[4][1])}?`, `Welches Küchenutensil benutzt man vor allem hierfür: ${x[4][2]}?`]; },
    ok: (r, c) => !clash(r[6], c[6]) });

  // ── pasta ──
  groupYesNo("food.is-pasta", "food", 250, PASTA, NOT_PASTA, "easy",
    ["Which of these is a type of pasta?", "¿Cuál de estos es un tipo de pasta?", "Was davon ist eine Pastasorte?"]);
  lookup({ family: "food.pasta-meaning", category: "food", rows: PASTA_MEANING, stem: (x) => x[0], diff: (x) => DF[x[2]],
    text: (x) => [`The pasta name "${x[0]}" is Italian for what?`, `¿Qué significa en italiano el nombre de la pasta «${x[0]}»?`, `Was bedeutet der italienische Pastaname „${x[0]}“?`],
    right: (x) => x[1], pool: PASTA_MEANING.map((x) => x[1]), label: (l) => l });
  lookup({ family: "food.pasta-meaning-rev", category: "food", rows: PASTA_MEANING, stem: (x) => x[0], diff: (x) => DF[x[2]],
    text: (x) => [`Which pasta's Italian name means "${low(x[1][0])}"?`, `¿Qué pasta tiene un nombre que en italiano significa «${low(x[1][1])}»?`, `Welche Pastasorte heißt übersetzt „${x[1][2]}“?`],
    right: (x) => x[0], pool: PASTA_MEANING.map((x) => x[0]), label: api.same });

  // ── which part of the plant ──
  const partKeys = Object.keys(PARTS);
  lookup({ family: "food.plant-part", category: "food", rows: PLANT_PARTS, stem: (x) => x[0], diff: (x) => DF[x[4]],
    text: (x) => [`${x[0]}: which part of the plant do we mainly eat?`, `${x[1]}: ¿qué parte de la planta comemos principalmente?`, `${x[2]}: Welchen Teil der Pflanze essen wir hauptsächlich?`],
    right: (x) => x[3], pool: partKeys, label: (k) => PARTS[k].label, ok: (x, k) => !(x[5] ?? []).includes(k) });
  which({ family: "food.plant-part-rev", category: "food", rows: PLANT_PARTS, per: 14, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const o = PARTS[k].obj; return [`Of which of these plants do we mainly eat ${o[0]}?`, `¿De cuál de estas plantas comemos principalmente ${o[1]}?`, `Von welcher dieser Pflanzen essen wir hauptsächlich ${o[2]}?`]; },
    ok: (_, c, k) => !(c[5] ?? []).includes(k) });
  const spiceKeys = Object.keys(SPICE_PARTS);
  lookup({ family: "food.spice-part", category: "food", rows: SPICES, variants: 2, stem: (x) => x[0], diff: (x) => DF[x[4]],
    text: (x) => [`${x[0]}: which part of the plant does this spice or herb come from?`, `${x[1]}: ¿de qué parte de la planta se obtiene esta especia o hierba?`, `${x[2]}: Aus welchem Teil der Pflanze wird dieses Gewürz gewonnen?`],
    right: (x) => x[3], pool: spiceKeys, label: (k) => SPICE_PARTS[k], ok: (x, k) => !(x[5] ?? []).includes(k) });
  which({ family: "food.spice-part-rev", category: "food", rows: SPICES, per: 8, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const p = SPICE_PARTS[k]; return [`Which of these spices or herbs is made from this part of the plant: ${low(p[0])}?`, `¿Cuál de estas especias o hierbas se obtiene de esta parte de la planta: ${low(p[1])}?`, `Pflanzenteil „${p[2]}“: Welches dieser Gewürze wird daraus gewonnen?`]; },
    ok: (_, c, k) => !(c[5] ?? []).includes(k) });

  // ── "which of these is a …?" ──
  const yes = (fam: string, n: number, y: L[], no: L[], d: Difficulty, text: L) => groupYesNo(`food.${fam}`, "food", n, y, no, d, text);
  yes("fermented", 220, FERMENTED, NOT_FERMENTED, "medium",
    ["Which of these is made by fermentation?", "¿Cuál de estos alimentos o bebidas se obtiene por fermentación?", "Was davon wird durch Fermentation (Gärung) hergestellt?"]);
  yes("is-shellfish", 200, SHELLFISH, FISH, "easy",
    ["Which of these is shellfish rather than fish?", "¿Cuál de estos es un marisco y no un pescado?", "Was davon zählt zu den Meeresfrüchten und nicht zu den Fischen?"]);
  yes("is-mushroom", 150, MUSHROOMS, NOT_MUSHROOMS, "medium",
    ["Which of these is a mushroom?", "¿Cuál de estos es una seta?", "Was davon ist ein Pilz?"]);
  yes("is-legume", 180, LEGUMES, NUTS_GRAINS, "medium",
    ["Which of these is a legume?", "¿Cuál de estos alimentos es una legumbre?", "Was davon ist eine Hülsenfrucht?"]);
  yes("is-cereal", 180, CEREALS, NOT_CEREALS, "medium",
    ["Which of these is a cereal grain?", "¿Cuál de estos es un cereal?", "Was davon ist eine Getreideart?"]);
  yes("is-citrus", 180, CITRUS, NOT_CITRUS, "easy",
    ["Which of these fruits is a citrus fruit?", "¿Cuál de estas frutas es un cítrico?", "Welche dieser Früchte ist eine Zitrusfrucht?"]);
  yes("stone-fruit", 180, STONE_FRUIT, NOT_STONE_FRUIT, "easy",
    ["Which of these fruits has a single large stone (pit) inside?", "¿Cuál de estas frutas tiene un único hueso grande dentro?", "Welche dieser Früchte hat einen einzigen großen Kern (Stein) im Inneren?"]);
  yes("blue-cheese", 150, BLUE_CHEESES, NOT_BLUE_CHEESES, "medium",
    ["Which of these is a blue cheese?", "¿Cuál de estos es un queso azul?", "Welcher dieser Käse ist ein Blauschimmelkäse?"]);
  yes("from-americas", 220, FROM_AMERICAS, [...FROM_ASIA, ...FROM_AFRICA, ...FROM_NEAR_EAST], "medium",
    ["Which of these foods originally comes from the Americas?", "¿Cuál de estos alimentos es originario de América?", "Welches dieser Lebensmittel stammt ursprünglich aus Amerika?"]);
  yes("from-asia", 200, FROM_ASIA, [...FROM_AMERICAS, ...FROM_AFRICA], "medium",
    ["Which of these foods originally comes from Asia?", "¿Cuál de estos alimentos es originario de Asia?", "Welches dieser Lebensmittel stammt ursprünglich aus Asien?"]);
  yes("caffeine", 160, CAFFEINE, NO_CAFFEINE, "easy",
    ["Which of these drinks contains caffeine?", "¿Cuál de estas bebidas contiene cafeína?", "Welches dieser Getränke enthält Koffein?"]);
  yes("red-grape", 150, RED_GRAPES, WHITE_GRAPES, "hard",
    ["Which of these grape varieties is used mainly to make red wine?", "¿Cuál de estas variedades de uva se usa sobre todo para hacer vino tinto?", "Welche dieser Rebsorten wird vor allem für Rotwein verwendet?"]);
  yes("white-grape", 150, WHITE_GRAPES, RED_GRAPES, "hard",
    ["Which of these grape varieties is used mainly to make white wine?", "¿Cuál de estas variedades de uva se usa sobre todo para hacer vino blanco?", "Welche dieser Rebsorten wird vor allem für Weißwein verwendet?"]);

  // ── animals and milk ──
  lookup({ family: "food.meat-animal", category: "food", rows: MEATS, variants: 2, stem: (x) => x[0], diff: (x) => DF[x[4]],
    text: (x) => [`${x[0]}: which animal does the meat come from?`, `${x[1]}: ¿de qué animal es la carne?`, `${x[2]}: Von welchem Tier stammt das Fleisch?`],
    right: (x) => x[3], pool: Object.keys(ANIMALS), label: (k) => ANIMALS[k] });
  lookup({ family: "food.cheese-milk", category: "food", rows: CHEESE_MILK, variants: 1, stem: (x) => x[0], diff: (x) => DF[x[4]],
    text: (x) => [`What kind of milk is ${x[0]} traditionally made from?`, `¿Con qué leche se elabora tradicionalmente este queso: ${x[1]}?`, `Aus welcher Milch wird ${x[2]} traditionell hergestellt?`],
    right: (x) => x[3], pool: Object.keys(MILKS), label: (k) => MILKS[k] });
  which({ family: "food.cheese-milk-rev", category: "food", rows: CHEESE_MILK, per: 12, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const m = MILKS[k]; return [`Which of these cheeses is traditionally made from ${low(m[0])}?`, `¿Cuál de estos quesos se elabora tradicionalmente con ${low(m[1])}?`, `Welcher dieser Käse wird traditionell aus ${m[2]} hergestellt?`]; } });

  // ── cocktails ──
  lookup({ family: "food.cocktail-spirit", category: "food", rows: COCKTAILS, variants: 2, stem: (x) => x[0], diff: (x) => DF[x[4]],
    text: (x) => [`What is the main spirit in ${an(x[0])} ${x[0]}?`, `¿Qué destilado es la base de este cóctel: ${x[1]}?`, `Welche Spirituose ist die Basis dieses Cocktails: ${x[2]}?`],
    right: (x) => x[3], pool: Object.keys(SPIRITS), label: (k) => SPIRITS[k].label, ok: (x, k) => !(x[5] ?? []).includes(k) });
  which({ family: "food.cocktail-rev", category: "food", rows: COCKTAILS, per: 10, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const w = SPIRITS[k].with; return [`Which of these cocktails is made with ${w[0]}?`, `¿Cuál de estos cócteles se prepara con ${w[1]}?`, `Welcher dieser Cocktails wird mit ${w[2]} gemixt?`]; },
    ok: (_, c, k) => !(c[5] ?? []).includes(k) });

  // ── festive foods ──
  const occKeys = Object.keys(OCCASIONS);
  lookup({ family: "food.festive", category: "food", rows: FESTIVE, stem: (x) => x[0], diff: (x) => DF[x[4]],
    text: (x) => [`${x[0]}: when is this traditionally eaten?`, `${x[1]}: ¿en qué fiesta se come tradicionalmente?`, `${x[2]} – zu welchem Anlass isst man das traditionell?`],
    right: (x) => x[3], pool: occKeys, label: (k) => OCCASIONS[k].label, ok: (x, k) => !(x[5] ?? []).includes(k) });
  which({ family: "food.festive-rev", category: "food", rows: FESTIVE, per: 10, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const a = OCCASIONS[k].at; return [`Which of these is traditionally eaten ${a[0]}?`, `¿Cuál de estos se come tradicionalmente ${a[1]}?`, `Was davon isst man traditionell ${a[2]}?`]; },
    ok: (_, c, k) => !(c[5] ?? []).includes(k) });

  // ── food science (hand-written facts, wrong answers rotated) ──
  const rs = rngFor("food.science");
  for (const [d, text, right, wrongs] of SCIENCE) {
    for (let v = 0; v < 3; v++) {
      const ws = sample(rs, wrongs, 3);
      if (ws) add("food.science", text[0], "food", DF[d], text, right, ws);
    }
  }
  void cap;
}
