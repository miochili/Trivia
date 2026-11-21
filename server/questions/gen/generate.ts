/**
 * Generates ~20,000 trivia questions in EN/ES/DE from the fact tables in ./data.
 *
 * Every question records:
 *  - family: the kind of question ("capital", "pop-most", "event-year"…) — the
 *    engine rotates families so a game never feels repetitive
 *  - stem:   what the question is about — the engine never asks two questions
 *    about the same thing in one game (e.g. two "capital of Japan" variants)
 *
 * Generation is deterministic (seeded RNG), so ids are stable across builds.
 */
import type { CategoryId, Difficulty } from "../../../src/shared/types";
import type { StoredQuestion } from "../QuestionBank";
import { COUNTRY_GRAMMAR, COUNTRY_ROWS, CONTINENTS, CURRENCIES, LANGUAGES, type Continent } from "./data/countries";
import { ANIMAL_CLASSES, ANIMALS, DISCOVERIES, ELEMENTS, PLANETS } from "./data/science";
import { EVENTS } from "./data/history";
import {
  ARTWORKS, ATHLETES, BOOKS, CHARACTERS, FIELDS, FILMS, FRANCHISES, LANDMARKS, MUSICIANS, PEOPLE, SPORTS,
  SUMMER_OLYMPICS, WORLD_CUP_HOSTS, WORLD_CUP_WINNERS,
} from "./data/culture";
import { CITIES, NEVER_WC_HOSTS } from "./data/cities";
import { CHEESES, DISHES, DRINKS, FRUITS, INGREDIENTS, MADE_FROM, VEGETABLES } from "./data/food";
import { DESERTS, ISLANDS, MOUNTAINS, NEIGHBOURS, RIVER_CITIES, RIVERS } from "./data/geo2";
import { ANCIENT_SITES, EXTRA_EVENTS, LEADERS } from "./data/hist2";
import { EXTRA_DISCOVERIES, ORGAN_JOBS, ORGANS, UNITS } from "./data/sci2";
import { BUILDINGS, EXTRA_BOOKS, WORKS } from "./data/art2";
import { ANIMATED, GAMES, SONGS, TV_SHOWS } from "./data/pop2";
import { CLUBS, EXTRA_ATHLETES, EXTRA_SPORTS, TEAM_SIZES, TERMS, TOURNAMENTS } from "./data/sport2";
import { ANIMAL_HOMES, ANIMAL_LEGS, ANIMAL_MASS, BROADLEAF, CARNIVORES, CONIFERS, HERBIVORES } from "./data/nature";

// extra rows feed the existing question families too
EVENTS.push(...EXTRA_EVENTS);
DISCOVERIES.push(...EXTRA_DISCOVERIES);
BOOKS.push(...EXTRA_BOOKS);
ATHLETES.push(...EXTRA_ATHLETES);
Object.assign(SPORTS, EXTRA_SPORTS);

type L = [string, string, string]; // en, es, de
const same = (s: string): L => [s, s, s];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const low = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const capL = (l: L): L => [cap(l[0]), cap(l[1]), cap(l[2])];

// ── seeded randomness ───────────────────────────────────────────────
function rngFor(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
type Rng = () => number;
const pick = <T>(r: Rng, a: readonly T[]) => a[Math.floor(r() * a.length)];
function sample<T>(r: Rng, a: readonly T[], n: number, ok: (x: T) => boolean = () => true): T[] | null {
  const pool = a.filter(ok);
  if (pool.length < n) return null;
  const out: T[] = [];
  const used = new Set<number>();
  while (out.length < n) {
    const i = Math.floor(r() * pool.length);
    if (!used.has(i)) {
      used.add(i);
      out.push(pool[i]);
    }
  }
  return out;
}

// ── output ──────────────────────────────────────────────────────────
const out: StoredQuestion[] = [];
const seen = new Set<string>();

function add(family: string, stem: string, category: CategoryId, difficulty: Difficulty, text: L, correct: L, wrong: L[]) {
  const opts = [correct, ...wrong];
  // never two identical options in any language
  for (let k = 0; k < 3; k++) if (new Set(opts.map((o) => o[k])).size !== opts.length) return;
  const key = `${family}|${text[0]}|${opts.map((o) => o[0]).sort().join("|")}`;
  if (seen.has(key)) return;
  seen.add(key);
  out.push({
    id: `g-${family}-${out.length}`,
    category,
    difficulty,
    family,
    stem: `${family}:${stem}`,
    text: text[0],
    options: opts.map((o) => o[0]),
    correctIndex: 0,
    translations: {
      es: { text: text[1], options: opts.map((o) => o[1]) },
      de: { text: text[2], options: opts.map((o) => o[2]) },
    },
  });
}

// ── countries ───────────────────────────────────────────────────────
interface Country {
  id: string;
  name: L;
  capital: L | null;
  continent: Continent | "";
  currency: string;
  pop: number;
  area: number;
  lang: string;
  enSubj: string;
  esSubj: string;
  esDe: string;
  deSubj: string;
  deIn: string;
  deVon: string;
  dePl: boolean;
}
const EN_ARTICLE = new Set(["uk", "usa", "netherlands", "philippines", "uae", "czechia", "dominican_rep", "dr_congo"]);
const COUNTRIES: Country[] = COUNTRY_ROWS.map(([id, en, es, de, cen, ces, cde, continent, currency, pop, area, lang]) => {
  const g = COUNTRY_GRAMMAR[id] ?? {};
  const deIn = g.deIn ?? `in ${de}`;
  const deVon = deIn.replace(/^im /, "vom ").replace(/^in der /, "von der ").replace(/^in den /, "von den ").replace(/^auf den /, "von den ").replace(/^in /, "von ");
  return {
    id,
    name: [en, es, de],
    capital: cen ? [cen, ces || cen, cde || cen] : null,
    continent,
    currency,
    pop,
    area,
    lang,
    enSubj: EN_ARTICLE.has(id) ? `the ${en}` : en,
    esSubj: g.esSubj ?? es,
    esDe: g.esDe ?? `de ${es}`,
    deSubj: g.deSubj ?? de,
    deIn,
    deVon,
    dePl: !!g.dePl,
  };
});
const byId = new Map(COUNTRIES.map((c) => [c.id, c]));
const fame = (c: Country): Difficulty => (c.pop >= 60 ? "easy" : c.pop >= 15 ? "medium" : "hard");

function countries() {
  const r = rngFor("countries");
  const withCap = COUNTRIES.filter((c) => c.capital);
  for (const c of withCap) {
    for (let v = 0; v < 2; v++) {
      const sameCont = withCap.filter((o) => o.id !== c.id && o.continent === c.continent);
      const ws = sample(r, sameCont.length >= 3 ? sameCont : withCap.filter((o) => o.id !== c.id), 3);
      if (ws)
        add("capital", c.id, "geography", fame(c),
          [`What is the capital of ${c.enSubj}?`, `¿Cuál es la capital ${c.esDe}?`, `Was ist die Hauptstadt ${c.deVon}?`],
          c.capital!, ws.map((w) => w.capital!));
      const ws2 = sample(r, withCap, 3, (o) => o.id !== c.id && (o.continent === c.continent || r() < 0.3));
      if (ws2)
        add("capital-rev", c.id, "geography", fame(c),
          [`${c.capital![0]} is the capital of which country?`, `¿${c.capital![1]} es la capital de qué país?`, `${c.capital![2]} ist die Hauptstadt welches Landes?`],
          c.name, ws2.map((w) => w.name));
    }
  }
  const conts = Object.keys(CONTINENTS) as Continent[];
  for (const c of COUNTRIES.filter((c) => c.continent)) {
    const ws = sample(r, conts, 3, (k) => k !== c.continent)!;
    add("continent", c.id, "geography", c.pop >= 30 ? "easy" : "medium",
      [`On which continent is ${c.enSubj}?`, `¿En qué continente está ${c.esSubj}?`, `Auf welchem Kontinent ${c.dePl ? "liegen" : "liegt"} ${c.deSubj}?`],
      CONTINENTS[c.continent as Continent], ws.map((k) => CONTINENTS[k]));
  }
  const curKeys = Object.keys(CURRENCIES);
  for (const c of COUNTRIES.filter((c) => c.currency && CURRENCIES[c.currency])) {
    for (let v = 0; v < 2; v++) {
      const ws = sample(r, curKeys, 3, (k) => k !== c.currency)!;
      const d: Difficulty = ["USD", "GBP", "JPY"].includes(c.currency) || (c.currency === "EUR" && c.pop > 40) ? "easy" : c.pop >= 30 ? "medium" : "hard";
      add("currency", c.id, "geography", d,
        [`What is the currency of ${c.enSubj}?`, `¿Cuál es la moneda ${c.esDe}?`, `Welche Währung verwendet man ${c.deIn}?`],
        CURRENCIES[c.currency], ws.map((k) => CURRENCIES[k]));
    }
  }
  const langKeys = Object.keys(LANGUAGES);
  for (const c of COUNTRIES.filter((c) => c.lang)) {
    for (let v = 0; v < 2; v++) {
      const ws = sample(r, langKeys, 3, (k) => k !== c.lang)!;
      add("language", c.id, "geography", c.pop >= 60 ? "easy" : "medium",
        [`What is the main language of ${c.enSubj}?`, `¿Cuál es el idioma principal ${c.esDe}?`, `Was ist die Hauptsprache ${c.deIn}?`],
        LANGUAGES[c.lang], ws.map((k) => LANGUAGES[k]));
    }
  }

  // comparisons — only asked when the gap is big enough to be robust
  const compare = (family: string, n: number, metric: (c: Country) => number, wantMax: boolean, minRatio: number, text: L) => {
    const rr = rngFor(family);
    let made = 0;
    for (let tries = 0; made < n && tries < n * 40; tries++) {
      const set = sample(rr, COUNTRIES, 4)!;
      const sorted = [...set].sort((a, b) => (wantMax ? metric(b) - metric(a) : metric(a) - metric(b)));
      const [best, second] = sorted;
      const ratio = wantMax ? metric(best) / metric(second) : metric(second) / metric(best);
      if (ratio < minRatio) continue;
      const d: Difficulty = ratio >= 5 ? "easy" : ratio >= 2.2 ? "medium" : "hard";
      const before = out.length;
      add(family, sorted.map((s) => s.id).sort().join("+"), "geography", d, text, best.name, sorted.slice(1).map((s) => s.name));
      if (out.length > before) made++;
    }
  };
  compare("pop-most", 2600, (c) => c.pop, true, 1.6,
    ["Which of these countries has the most inhabitants?", "¿Cuál de estos países tiene más habitantes?", "Welches dieser Länder hat die meisten Einwohner?"]);
  compare("pop-fewest", 1500, (c) => c.pop, false, 1.6,
    ["Which of these countries has the fewest inhabitants?", "¿Cuál de estos países tiene menos habitantes?", "Welches dieser Länder hat die wenigsten Einwohner?"]);
  compare("area-largest", 2600, (c) => c.area, true, 1.4,
    ["Which of these countries is the largest by area?", "¿Cuál de estos países es el más grande en superficie?", "Welches dieser Länder ist flächenmäßig das größte?"]);
  compare("area-smallest", 1200, (c) => c.area, false, 1.4,
    ["Which of these countries is the smallest by area?", "¿Cuál de estos países es el más pequeño en superficie?", "Welches dieser Länder ist flächenmäßig das kleinste?"]);

  const rl = rngFor("landmarks");
  for (const [en, es, de, cid] of LANDMARKS) {
    const c = byId.get(cid)!;
    for (let v = 0; v < 3; v++) {
      const ws = sample(rl, COUNTRIES, 3, (o) => o.id !== cid && !LANDMARKS.some((l) => l[0] === en && l[3] === o.id))!;
      add("landmark", en, "geography", c.pop >= 60 ? "easy" : "medium",
        [`In which country can you find ${en}?`, `¿En qué país puedes ver ${es}?`, `${cap(de)} – in welchem Land ist das?`],
        c.name, ws.map((w) => w.name));
    }
  }
}

// ── science ─────────────────────────────────────────────────────────
const OBVIOUS_SYMBOL = (sym: string, name: string) => name.toLowerCase().startsWith(sym.toLowerCase());
function science() {
  const r = rngFor("science");
  for (const [z, sym, en, es, de] of ELEMENTS) {
    for (let v = 0; v < 2; v++) {
      const ws = sample(r, ELEMENTS, 3, (e) => e[0] !== z)!;
      const d: Difficulty = z <= 30 || [47, 79, 80, 82, 50, 92, 78].includes(z) ? (OBVIOUS_SYMBOL(sym, en) ? "easy" : "medium") : "hard";
      add("element-symbol", sym, "science", d,
        [`What is the chemical symbol for ${low(en)}?`, `¿Cuál es el símbolo químico de este elemento: ${low(es)}?`, `Was ist das chemische Symbol für ${de}?`],
        same(sym), ws.map((e) => same(e[1])));
      const ws2 = sample(r, ELEMENTS, 3, (e) => e[0] !== z)!;
      add("element-name", sym, "science", d,
        [`Which element has the chemical symbol ${sym}?`, `¿Qué elemento tiene el símbolo químico ${sym}?`, `Welches Element hat das chemische Symbol ${sym}?`],
        [en, es, de], ws2.map((e) => [e[2], e[3], e[4]] as L));
    }
  }
  const rz = rngFor("protons");
  for (let made = 0, tries = 0; made < 700 && tries < 20000; tries++) {
    const set = sample(rz, ELEMENTS, 4)!;
    const sorted = [...set].sort((a, b) => b[0] - a[0]);
    if (sorted[0][0] - sorted[1][0] < 4) continue;
    const before = out.length;
    add("protons", sorted.map((e) => e[1]).sort().join("+"), "science", sorted[0][0] >= sorted[1][0] * 2 ? "medium" : "hard",
      ["Which of these elements has the most protons in its nucleus?", "¿Cuál de estos elementos tiene más protones en su núcleo?", "Welches dieser Elemente hat die meisten Protonen im Kern?"],
      [sorted[0][2], sorted[0][3], sorted[0][4]], sorted.slice(1).map((e) => [e[2], e[3], e[4]] as L));
    if (out.length > before) made++;
  }

  // animals
  const ra = rngFor("animals");
  const TRICKY = new Set(["Dolphin", "Blue whale", "Bat", "Platypus", "Orca", "Walrus", "Manatee", "Penguin", "Ostrich", "Emu", "Kiwi", "Seahorse", "Eel", "Stingray", "Shark", "Axolotl", "Newt", "Salamander", "Spider", "Scorpion", "Tick", "Pangolin", "Turtle"]);
  const DE_GROUP: Record<string, string> = { mammal: "Säugetieren", bird: "Vögeln", reptile: "Reptilien", amphibian: "Amphibien", fish: "Fischen", insect: "Insekten", arachnid: "Spinnentieren" };
  const ES_ART: Record<string, string> = { mammal: "un", bird: "un", reptile: "un", amphibian: "un", fish: "un", insect: "un", arachnid: "un" };
  const animalL = (a: (typeof ANIMALS)[number]): L => [a[1], a[2], a[3]];
  for (const cls of Object.keys(ANIMAL_CLASSES)) {
    const [cen, ces] = ANIMAL_CLASSES[cls];
    const members = ANIMALS.filter((a) => a[0] === cls);
    const others = ANIMALS.filter((a) => a[0] !== cls);
    for (const m of members) {
      for (let v = 0; v < 8; v++) {
        const ws = sample(ra, others, 3)!;
        const tricky = TRICKY.has(m[1]) || ws.some((w) => TRICKY.has(w[1]));
        add("animal-is", `${cls}:${m[1]}`, "nature", TRICKY.has(m[1]) ? "hard" : tricky ? "medium" : "easy",
          [`Which of these animals is ${/^[aeiou]/.test(cen) ? "an" : "a"} ${cen}?`, `¿Cuál de estos animales es ${ES_ART[cls]} ${ces}?`, `Welches dieser Tiere gehört zu den ${DE_GROUP[cls]}?`],
          animalL(m), ws.map(animalL));
      }
    }
    if (members.length >= 3) {
      for (const o of others) {
        for (let v = 0; v < 3; v++) {
          const ws = sample(ra, members, 3)!;
          add("animal-not", `${cls}:${o[1]}`, "nature", TRICKY.has(o[1]) || ws.some((w) => TRICKY.has(w[1])) ? "hard" : "medium",
            [`Which of these animals is NOT ${/^[aeiou]/.test(cen) ? "an" : "a"} ${cen}?`, `¿Cuál de estos animales NO es ${ES_ART[cls]} ${ces}?`, `Welches dieser Tiere gehört NICHT zu den ${DE_GROUP[cls]}?`],
            animalL(o), ws.map(animalL));
        }
      }
    }
  }

  // planets
  const planetL = (i: number): L => [PLANETS[i][0], PLANETS[i][1], PLANETS[i][2]];
  const idx = PLANETS.map((_, i) => i);
  const combos: number[][] = [];
  for (let a = 0; a < 8; a++) for (let b = a + 1; b < 8; b++) for (let c = b + 1; c < 8; c++) for (let d = c + 1; d < 8; d++) combos.push([a, b, c, d]);
  for (const set of combos) {
    const near = Math.min(...set);
    const far = Math.max(...set);
    add("planet-near", set.join(""), "science", near <= 1 ? "easy" : "medium",
      ["Which of these planets is closest to the Sun?", "¿Cuál de estos planetas está más cerca del Sol?", "Welcher dieser Planeten ist der Sonne am nächsten?"],
      planetL(near), set.filter((x) => x !== near).map(planetL));
    add("planet-far", set.join(""), "science", far >= 6 ? "medium" : "hard",
      ["Which of these planets is farthest from the Sun?", "¿Cuál de estos planetas está más lejos del Sol?", "Welcher dieser Planeten ist am weitesten von der Sonne entfernt?"],
      planetL(far), set.filter((x) => x !== far).map(planetL));
    const sizes = [...set].sort((a, b) => PLANETS[b][3] - PLANETS[a][3]);
    if (PLANETS[sizes[0]][3] / PLANETS[sizes[1]][3] > 1.1)
      add("planet-big", set.join(""), "science", sizes[0] === 4 ? "easy" : "medium",
        ["Which of these planets is the largest?", "¿Cuál de estos planetas es el más grande?", "Welcher dieser Planeten ist der größte?"],
        planetL(sizes[0]), sizes.slice(1).map(planetL));
    const small = [...set].sort((a, b) => PLANETS[a][3] - PLANETS[b][3]);
    if (PLANETS[small[1]][3] / PLANETS[small[0]][3] > 1.1)
      add("planet-small", set.join(""), "science", "hard",
        ["Which of these planets is the smallest?", "¿Cuál de estos planetas es el más pequeño?", "Welcher dieser Planeten ist der kleinste?"],
        planetL(small[0]), small.slice(1).map(planetL));
  }
  void idx;

  const rd = rngFor("discoveries");
  for (const [en, es, de, person] of DISCOVERIES) {
    for (let v = 0; v < 3; v++) {
      const ws = sample(rd, DISCOVERIES, 3, (x) => x[3] !== person)!;
      add("discovery", en, "science", "medium",
        [`Who is famous for ${low(en)}?`, `¿Quién es famoso por ${low(es)}?`, `Wer ist bekannt für ${low(de)}?`],
        same(person), ws.map((w) => same(w[3])));
    }
  }
}

// ── history ─────────────────────────────────────────────────────────
const FAMOUS_YEARS = new Set([1492, 1789, 1914, 1918, 1939, 1945, 1969, 1989, 1776, 2001, 1912, 1990, 1961, 2007, 1998, 2004, 2020, 2005]);
const yearL = (y: number): L => (y < 0 ? [`${-y} BC`, `${-y} a. C.`, `${-y} v. Chr.`] : same(String(y)));
function history() {
  const r = rngFor("history");
  for (const [year, en, es, de, approx] of EVENTS) {
    if (approx) continue;
    for (let v = 0; v < 3; v++) {
      const spread = year < 1000 ? 120 : year < 1800 ? 40 : 15;
      const offs = new Set<number>();
      while (offs.size < 3) {
        const o = Math.round((r() * 2 - 1) * spread);
        if (Math.abs(o) >= 2 && ![...offs].some((x) => Math.abs(x - o) < 2) && (year + o > 0) === (year > 0)) offs.add(o);
      }
      add("event-year", en, "history", FAMOUS_YEARS.has(year) ? "medium" : "hard",
        [`In which year did this happen: ${en}?`, `¿En qué año fue ${es}?`, `In welchem Jahr war ${de}?`],
        yearL(year), [...offs].map((o) => yearL(year + o)));
    }
  }
  const order = (family: string, n: number, first: boolean) => {
    const ro = rngFor(family);
    for (let made = 0, tries = 0; made < n && tries < n * 30; tries++) {
      const set = sample(ro, EVENTS, 4)!;
      const sorted = [...set].sort((a, b) => (first ? a[0] - b[0] : b[0] - a[0]));
      const gaps = sorted.slice(1).map((e, i) => Math.abs(e[0] - sorted[i][0]));
      const minGap = set.some((e) => e[4]) ? 30 : 12;
      if (Math.min(...gaps) < minGap) continue;
      const d: Difficulty = gaps[0] >= 150 ? "easy" : gaps[0] >= 40 ? "medium" : "hard";
      const before = out.length;
      add(family, sorted.map((e) => e[1]).sort().join("+"), "history", d,
        first
          ? ["Which of these happened first?", "¿Cuál de estos acontecimientos ocurrió primero?", "Welches dieser Ereignisse geschah zuerst?"]
          : ["Which of these happened most recently?", "¿Cuál de estos acontecimientos es el más reciente?", "Welches dieser Ereignisse ist am jüngsten?"],
        capL([sorted[0][1], sorted[0][2], sorted[0][3]]), sorted.slice(1).map((e) => capL([e[1], e[2], e[3]])));
      if (out.length > before) made++;
    }
  };
  order("event-first", 2600, true);
  order("event-latest", 1600, false);
}

// ── people, culture, sports ─────────────────────────────────────────
const FIELD_CATEGORY: Record<string, CategoryId> = { painting: "art", music: "art", literature: "art", science: "science", exploration: "history", film: "pop_culture", philosophy: "history" };
/** Fields whose people overlap (Sartre wrote novels, Aristotle did science) — never used as each other's wrong answers. */
const OVERLAP = new Set(["literature|philosophy", "philosophy|literature", "science|philosophy", "philosophy|science", "science|exploration", "exploration|science"]);
function people() {
  const r = rngFor("people");
  const fieldKeys = Object.keys(FIELDS);
  for (const field of fieldKeys) {
    const f = FIELDS[field];
    const others = fieldKeys.filter((k) => k !== field && !OVERLAP.has(`${field}|${k}`)).flatMap((k) => PEOPLE[k]);
    for (const p of PEOPLE[field]) {
      for (let v = 0; v < 4; v++) {
        const ws = sample(r, others, 3)!;
        add("person-field", `${field}:${p}`, FIELD_CATEGORY[field], "medium",
          [`Which of these people became famous for ${f[0]}?`, `¿Cuál de estas personas destacó en ${f[1]}?`, `Welche dieser Personen wurde durch ${f[2]} berühmt?`],
          same(p), ws.map(same));
      }
      const wf = sample(r, fieldKeys, 3, (k) => k !== field && !OVERLAP.has(`${field}|${k}`))!;
      add("person-known", p, FIELD_CATEGORY[field], "medium",
        [`What is ${p} best known for?`, `¿En qué campo destacó ${p}?`, `Wodurch wurde ${p} berühmt?`],
        capL(f), wf.map((k) => capL(FIELDS[k])));
    }
  }

  const sportKeys = Object.keys(SPORTS);
  for (const [a, s] of ATHLETES) {
    for (let v = 0; v < 3; v++) {
      const ws = sample(r, sportKeys, 3, (k) => k !== s)!;
      add("athlete", a, "sports", "easy",
        [`Which sport is ${a} famous for?`, `¿Qué deporte practica o practicaba ${a}?`, `In welcher Sportart wurde ${a} bekannt?`],
        SPORTS[s], ws.map((k) => SPORTS[k]));
    }
  }

  const authors = [...new Set(BOOKS.map((b) => b[3]))];
  for (const [en, es, de, author] of BOOKS) {
    for (let v = 0; v < 3; v++) {
      const ws = sample(r, authors, 3, (x) => x !== author)!;
      add("book", en, "art", "medium",
        [`Who wrote "${en}"?`, `¿Quién escribió «${es}»?`, `Wer schrieb „${de}“?`], same(author), ws.map(same));
    }
  }
  const artists = [...new Set(ARTWORKS.map((a) => a[3]))];
  for (const [en, es, de, artist] of ARTWORKS) {
    for (let v = 0; v < 3; v++) {
      const ws = sample(r, artists, 3, (x) => x !== artist)!;
      add("artwork", en, "art", "medium",
        [`Which artist created "${en}"?`, `¿Qué artista creó «${es}»?`, `Welcher Künstler schuf „${de}“?`], same(artist), ws.map(same));
    }
  }
  const directors = [...new Set(FILMS.map((f) => f[3]))];
  for (const [en, es, de, dir] of FILMS) {
    for (let v = 0; v < 3; v++) {
      const ws = sample(r, directors, 3, (x) => x !== dir)!;
      add("film", en, "pop_culture", "medium",
        [`Who directed "${en}"?`, `¿Quién dirigió «${es}»?`, `Wer führte Regie bei „${de}“?`], same(dir), ws.map(same));
    }
  }
  const franchiseKeys = Object.keys(FRANCHISES);
  for (const [en, es, de, fr] of CHARACTERS) {
    for (let v = 0; v < 3; v++) {
      const ws = sample(r, franchiseKeys, 3, (k) => k !== fr)!;
      add("character", en, "pop_culture", "easy",
        [`In which franchise do you meet ${en}?`, `¿En qué saga o serie encuentras a ${es}?`, `In welcher Reihe oder Serie triffst du ${de}?`],
        FRANCHISES[fr], ws.map((k) => FRANCHISES[k]));
    }
  }
  for (const [artist, cid] of MUSICIANS) {
    const c = byId.get(cid)!;
    for (let v = 0; v < 3; v++) {
      const ws = sample(r, COUNTRIES, 3, (o) => o.id !== cid && (o.pop > 5 || r() < 0.2))!;
      add("musician", artist, "pop_culture", "medium",
        [`Which country does ${artist} come from?`, `¿De qué país es ${artist}?`, `Aus welchem Land stammt ${artist}?`], c.name, ws.map((w) => w.name));
    }
  }

  const cities = [...new Map(SUMMER_OLYMPICS.map((o) => [o[1], [o[1], o[2], o[3]] as L])).values()];
  for (const [year, en, es, de] of SUMMER_OLYMPICS) {
    for (let v = 0; v < 3; v++) {
      const ws = sample(r, cities, 3, (c) => c[0] !== en)!;
      const label = year === 2020 ? `2020 (2021)` : String(year);
      add("olympics", String(year), "sports", year >= 1988 ? "medium" : "hard",
        [`Which city hosted the Summer Olympics in ${label}?`, `¿Qué ciudad organizó los Juegos Olímpicos de verano de ${label}?`, `Welche Stadt richtete die Olympischen Sommerspiele ${label} aus?`],
        [en, es, de], ws);
    }
  }
  const nations = [...new Map([...WORLD_CUP_WINNERS, ...WORLD_CUP_HOSTS].map((o) => [o[1], [o[1], o[2], o[3]] as L])).values()];
  const germanish = (n: string) => n === "Germany" || n === "West Germany";
  for (const [list, family, q] of [
    [WORLD_CUP_WINNERS, "wc-winner", (y: number): L => [`Who won the ${y} FIFA World Cup?`, `¿Quién ganó el Mundial de fútbol de ${y}?`, `Wer gewann die Fußball-WM ${y}?`]],
    [WORLD_CUP_HOSTS, "wc-host", (y: number): L => [`Which country hosted the ${y} FIFA World Cup?`, `¿Qué país organizó el Mundial de fútbol de ${y}?`, `Welches Land war Gastgeber der Fußball-WM ${y}?`]],
  ] as const) {
    for (const [year, en, es, de] of list) {
      for (let v = 0; v < 3; v++) {
        const ws = sample(r, nations, 3, (n) => n[0] !== en && !(germanish(n[0]) && germanish(en)))!;
        add(family, String(year), "sports", year >= 1990 ? "medium" : "hard", q(year), [en, es, de], ws);
      }
    }
  }
}

/** "Which of these … ?" reverse questions — lots of fresh combinations for the smaller categories. */
function reverse() {
  const r = rngFor("reverse");
  const oneOf = <T>(family: string, category: CategoryId, difficulty: Difficulty, groups: Map<string, T[]>, label: (t: T) => L, text: (key: string) => L, perGroup: number) => {
    const keys = [...groups.keys()];
    for (const key of keys) {
      const mine = groups.get(key)!;
      const others = keys.filter((k) => k !== key).flatMap((k) => groups.get(k)!);
      for (let v = 0; v < perGroup; v++) {
        const right = pick(r, mine);
        const ws = sample(r, others, 3);
        if (ws) add(family, `${key}:${label(right)[0]}:${ws.map((w) => label(w)[0]).sort().join("+")}`, category, difficulty, text(key), label(right), ws.map(label));
      }
    }
  };
  const group = <T>(rows: T[], key: (t: T) => string) => {
    const m = new Map<string, T[]>();
    for (const row of rows) m.set(key(row), [...(m.get(key(row)) ?? []), row]);
    return m;
  };

  // sports
  oneOf("athlete-rev", "sports", "easy", group(ATHLETES, (a) => a[1]), (a) => same(a[0]),
    (k) => [`Which of these athletes is known for ${/\d/.test(SPORTS[k][0]) ? SPORTS[k][0] : low(SPORTS[k][0])}?`, `¿Cuál de estos deportistas destacó en: ${low(SPORTS[k][1])}?`, `Wer von diesen ist im Sport „${SPORTS[k][2]}“ bekannt geworden?`], 40);
  const winners = new Set(WORLD_CUP_WINNERS.map((w) => w[1]));
  const NON_WINNERS: L[] = [
    ["Netherlands", "Países Bajos", "Niederlande"], ["Portugal", "Portugal", "Portugal"], ["Mexico", "México", "Mexiko"], ["Belgium", "Bélgica", "Belgien"],
    ["Croatia", "Croacia", "Kroatien"], ["Sweden", "Suecia", "Schweden"], ["United States", "Estados Unidos", "Vereinigte Staaten"], ["Japan", "Japón", "Japan"],
    ["Colombia", "Colombia", "Kolumbien"], ["Denmark", "Dinamarca", "Dänemark"], ["Hungary", "Hungría", "Ungarn"], ["Chile", "Chile", "Chile"],
    ["Morocco", "Marruecos", "Marokko"], ["Nigeria", "Nigeria", "Nigeria"], ["South Korea", "Corea del Sur", "Südkorea"], ["Poland", "Polonia", "Polen"],
  ];
  const winnerL = [...new Map(WORLD_CUP_WINNERS.map((w) => [w[1], [w[1], w[2], w[3]] as L])).values()];
  for (const w of winnerL) {
    for (let v = 0; v < 25; v++) {
      const ws = sample(r, NON_WINNERS, 3)!;
      add("wc-won", `${w[0]}:${ws.map((x) => x[0]).sort().join("+")}`, "sports", "medium",
        ["Which of these countries has won the men's FIFA World Cup?", "¿Cuál de estos países ha ganado el Mundial masculino de fútbol?", "Welches dieser Länder hat die Fußball-WM der Männer gewonnen?"], w, ws);
    }
  }
  void winners;
  const hostedOnce = SUMMER_OLYMPICS.filter((o) => SUMMER_OLYMPICS.filter((x) => x[1] === o[1]).length === 1);
  for (const [year, en, es, de] of hostedOnce) {
    for (let v = 0; v < 3; v++) {
      const offs = new Set<number>();
      while (offs.size < 3) {
        const o = 4 * Math.round((r() * 2 - 1) * 6);
        if (o !== 0 && year + o >= 1896 && year + o <= 2024) offs.add(o);
      }
      add("olympics-year", en, "sports", "hard",
        [`In which year did ${en} host the Summer Olympics?`, `¿En qué año organizó ${es} los Juegos Olímpicos de verano?`, `In welchem Jahr richtete ${de} die Olympischen Sommerspiele aus?`],
        same(String(year)), [...offs].map((o) => same(String(year + o))));
    }
  }

  // pop culture
  oneOf("character-rev", "pop_culture", "easy", group(CHARACTERS, (c) => c[3]), (c) => [c[0], c[1], c[2]],
    (k) => [`Which of these characters is from ${FRANCHISES[k][0]}?`, `¿Cuál de estos personajes es de «${FRANCHISES[k][1]}»?`, `Welche dieser Figuren stammt aus „${FRANCHISES[k][2]}“?`], 25);
  oneOf("musician-rev", "pop_culture", "medium", group(MUSICIANS, (m) => m[1]), (m) => same(m[0]),
    (k) => { const c = byId.get(k)!; return [`Which of these artists comes from ${c.enSubj}?`, `¿Cuál de estos artistas es ${c.esDe}?`, `Wer von diesen kommt aus ${c.deIn.replace(/^in /, "").replace(/^im /, "dem ").replace(/^in der /, "der ").replace(/^in den /, "den ").replace(/^auf den /, "den ")}?`]; }, 20);
  oneOf("film-rev", "pop_culture", "medium", group(FILMS, (f) => f[3]), (f) => [f[0], f[1], f[2]],
    (k) => [`Which of these films did ${k} direct?`, `¿Cuál de estas películas dirigió ${k}?`, `Bei welchem dieser Filme führte ${k} Regie?`], 20);

  // art
  oneOf("book-rev", "art", "medium", group(BOOKS, (b) => b[3]), (b) => [b[0], b[1], b[2]],
    (k) => [`Which of these books did ${k} write?`, `¿Cuál de estos libros escribió ${k}?`, `Welches dieser Bücher schrieb ${k}?`], 15);
  oneOf("artwork-rev", "art", "medium", group(ARTWORKS, (a) => a[3]), (a) => [a[0], a[1], a[2]],
    (k) => [`Which of these works is by ${k}?`, `¿Cuál de estas obras es de ${k}?`, `Welches dieser Werke stammt von ${k}?`], 15);
  oneOf("person-field-more", "art", "medium", new Map(["painting", "music", "literature"].map((f) => [f, PEOPLE[f]])), (p) => same(p),
    (k) => [`Which of these people became famous for ${FIELDS[k][0]}?`, `¿Cuál de estas personas destacó en ${FIELDS[k][1]}?`, `Welche dieser Personen wurde durch ${FIELDS[k][2]} berühmt?`], 150);
}

// ── more kinds of question ──────────────────────────────────────────
const ROMAN = (n: number) => {
  const map: [number, string][] = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let out = "";
  for (const [v, r] of [[20, "XX"] as [number, string], ...map]) while (n >= v) { out += r; n -= v; }
  return out;
};
const enOrd = (n: number) => `${n}${n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th"}`;
/** century: positive = AD, negative = BC */
const centuryL = (c: number): L =>
  c > 0 ? [`the ${enOrd(c)} century`, `el siglo ${ROMAN(c)}`, `das ${c}. Jahrhundert`] : [`the ${enOrd(-c)} century BC`, `el siglo ${ROMAN(-c)} a. C.`, `das ${-c}. Jahrhundert v. Chr.`];
const centuryOf = (year: number): number | null => {
  const y = Math.abs(year);
  if (y % 100 === 0 || y % 100 === 1) return null; // too close to the boundary to be fair
  return Math.sign(year) * Math.ceil(y / 100);
};
const popL = (m: number): L => {
  if (m >= 1000) {
    const b = (m / 1000).toFixed(1).replace(/\.0$/, "");
    return [`${b} billion`, `${b.replace(".", ",")} mil millones`, `${b.replace(".", ",")} Milliarden`];
  }
  return m === 1 ? ["1 million", "1 millón", "1 Million"] : [`${m} million`, `${m} millones`, `${m} Millionen`];
};
const roundPop = (m: number) => (m >= 1000 ? Math.round(m / 100) * 100 : m >= 100 ? Math.round(m / 10) * 10 : Math.max(1, Math.round(m)));

const NOBLE = ["He", "Ne", "Ar", "Kr", "Xe", "Rn"];
const GASES = ["H", "He", "N", "O", "F", "Ne", "Cl", "Ar", "Kr", "Xe", "Rn"];
const ALKALI = ["Li", "Na", "K", "Rb", "Cs"];
const HALOGENS = ["F", "Cl", "Br", "I"];
const METALLOIDS = ["B", "Si", "Ge", "As", "Sb", "Te", "Po"];
const NONMETALS = ["H", "He", "C", "N", "O", "F", "Ne", "P", "S", "Cl", "Ar", "Se", "Br", "Kr", "I", "Xe", "Rn"];

function more() {
  const r = rngFor("more");
  const elL = (e: (typeof ELEMENTS)[number]): L => [e[2], e[3], e[4]];
  const bySym = (syms: string[]) => ELEMENTS.filter((e) => syms.includes(e[1]));

  // atomic numbers
  for (const e of ELEMENTS) {
    const d: Difficulty = e[0] <= 10 ? "medium" : "hard";
    for (let v = 0; v < 2; v++) {
      const offs = new Set<number>();
      while (offs.size < 3) {
        const o = Math.round((r() * 2 - 1) * Math.max(6, e[0] * 0.3));
        if (o !== 0 && e[0] + o > 0) offs.add(o);
      }
      add("atomic-number", e[1], "science", d,
        [`What is the atomic number of ${low(e[2])}?`, `¿Cuál es el número atómico de este elemento: ${low(e[3])}?`, `Welche Ordnungszahl hat ${e[4]}?`],
        same(String(e[0])), [...offs].map((o) => same(String(e[0] + o))));
      const ws = sample(r, ELEMENTS, 3, (x) => x[0] !== e[0])!;
      add("atomic-number-rev", e[1], "science", d,
        [`Which element has the atomic number ${e[0]}?`, `¿Qué elemento tiene el número atómico ${e[0]}?`, `Welches Element hat die Ordnungszahl ${e[0]}?`],
        elL(e), ws.map(elL));
    }
  }

  // element groups
  const metals = ELEMENTS.filter((e) => !NONMETALS.includes(e[1]) && !METALLOIDS.includes(e[1]));
  const nonmetals = bySym(NONMETALS);
  const groupQ = (family: string, n: number, yes: (typeof ELEMENTS)[number][], no: (typeof ELEMENTS)[number][], d: Difficulty, text: L) => {
    for (let i = 0; i < n; i++) {
      const right = pick(r, yes);
      const ws = sample(r, no, 3)!;
      add(family, `${right[1]}:${ws.map((w) => w[1]).sort().join("+")}`, "science", d, text, elL(right), ws.map(elL));
    }
  };
  groupQ("noble-gas", 200, bySym(NOBLE), ELEMENTS.filter((e) => !NOBLE.includes(e[1])), "medium",
    ["Which of these elements is a noble gas?", "¿Cuál de estos elementos es un gas noble?", "Welches dieser Elemente ist ein Edelgas?"]);
  groupQ("gas-room", 250, bySym(GASES), ELEMENTS.filter((e) => !GASES.includes(e[1])), "medium",
    ["Which of these elements is a gas at room temperature?", "¿Cuál de estos elementos es un gas a temperatura ambiente?", "Welches dieser Elemente ist bei Raumtemperatur gasförmig?"]);
  groupQ("alkali-metal", 150, bySym(ALKALI), ELEMENTS.filter((e) => !ALKALI.includes(e[1])), "hard",
    ["Which of these elements is an alkali metal?", "¿Cuál de estos elementos es un metal alcalino?", "Welches dieser Elemente ist ein Alkalimetall?"]);
  groupQ("halogen", 150, bySym(HALOGENS), ELEMENTS.filter((e) => !HALOGENS.includes(e[1])), "hard",
    ["Which of these elements is a halogen?", "¿Cuál de estos elementos es un halógeno?", "Welches dieser Elemente ist ein Halogen?"]);
  groupQ("is-metal", 300, metals, nonmetals, "easy",
    ["Which of these elements is a metal?", "¿Cuál de estos elementos es un metal?", "Welches dieser Elemente ist ein Metall?"]);
  groupQ("not-metal", 300, nonmetals, metals, "medium",
    ["Which of these elements is NOT a metal?", "¿Cuál de estos elementos NO es un metal?", "Welches dieser Elemente ist KEIN Metall?"]);
  for (let made = 0, tries = 0; made < 500 && tries < 20000; tries++) {
    const set = sample(r, ELEMENTS, 4)!;
    const sorted = [...set].sort((a, b) => a[0] - b[0]);
    if (sorted[1][0] - sorted[0][0] < 4) continue;
    const before = out.length;
    add("protons-fewest", sorted.map((e) => e[1]).sort().join("+"), "science", sorted[1][0] >= sorted[0][0] * 2 ? "medium" : "hard",
      ["Which of these elements has the fewest protons in its nucleus?", "¿Cuál de estos elementos tiene menos protones en su núcleo?", "Welches dieser Elemente hat die wenigsten Protonen im Kern?"],
      elL(sorted[0]), sorted.slice(1).map(elL));
    if (out.length > before) made++;
  }

  // planets by position
  const ORD: L[] = [["first", "primero", "erste"], ["second", "segundo", "zweite"], ["third", "tercero", "dritte"], ["fourth", "cuarto", "vierte"],
    ["fifth", "quinto", "fünfte"], ["sixth", "sexto", "sechste"], ["seventh", "séptimo", "siebte"], ["eighth", "octavo", "achte"]];
  PLANETS.forEach((pl, i) => {
    for (let v = 0; v < 4; v++) {
      const ws = sample(r, PLANETS, 3, (x) => x[0] !== pl[0])!;
      add("planet-order", pl[0], "science", i === 2 ? "easy" : "medium",
        [`Counting from the Sun, which planet is the ${ORD[i][0]}?`, `Contando desde el Sol, ¿qué planeta es el ${ORD[i][1]}?`, `Von der Sonne aus gezählt: Welcher Planet ist der ${ORD[i][2]}?`],
        [pl[0], pl[1], pl[2]], ws.map((w) => [w[0], w[1], w[2]] as L));
    }
  });

  // discoveries the other way round
  for (const [, , , person] of DISCOVERIES) {
    const mine = DISCOVERIES.filter((d) => d[3] === person);
    for (let v = 0; v < 4; v++) {
      const right = pick(r, mine);
      const ws = sample(r, DISCOVERIES, 3, (d) => d[3] !== person)!;
      add("discovery-rev", person, "science", "medium",
        [`What is ${person} famous for?`, `¿Por qué se conoce a ${person}?`, `Wofür ist ${person} bekannt?`],
        capL([right[0], right[1], right[2]]), ws.map((w) => capL([w[0], w[1], w[2]])));
    }
  }

  // centuries
  const exact = EVENTS.filter((e) => !e[4] && centuryOf(e[0]) !== null);
  for (const [year, en, es, de] of exact) {
    const c = centuryOf(year)!;
    for (let v = 0; v < 2; v++) {
      const offs = new Set<number>();
      for (let t = 0; offs.size < 3 && t < 50; t++) {
        const o = Math.round((r() * 2 - 1) * 3);
        const cc = c + o;
        if (o !== 0 && Math.sign(cc) === Math.sign(c) && cc !== 0 && cc <= 21) offs.add(o);
      }
      if (offs.size < 3) continue;
      add("event-century", en, "history", c >= 19 ? "medium" : "hard",
        [`In which century did this happen: ${en}?`, `¿En qué siglo fue ${es}?`, `In welchem Jahrhundert war ${de}?`],
        capL(centuryL(c)), [...offs].map((o) => capL(centuryL(c + o))));
    }
  }
  const byCentury = new Map<number, (typeof EVENTS)[number][]>();
  for (const e of exact) byCentury.set(centuryOf(e[0])!, [...(byCentury.get(centuryOf(e[0])!) ?? []), e]);
  for (const [c, evs] of byCentury) {
    const others = exact.filter((e) => centuryOf(e[0]) !== c);
    const cl = centuryL(c);
    for (let v = 0; v < Math.min(120, evs.length * 12); v++) {
      const right = pick(r, evs);
      const ws = sample(r, others, 3)!;
      add("event-in-century", `${right[1]}:${ws.map((w) => w[1]).sort().join("+")}`, "history", "medium",
        [`Which of these happened in ${cl[0]}?`, `¿Cuál de estos acontecimientos ocurrió en ${cl[1]}?`, `Welches dieser Ereignisse fand im ${cl[2].replace(/^das /, "")} statt?`],
        capL([right[1], right[2], right[3]]), ws.map((w) => capL([w[1], w[2], w[3]])));
    }
  }

  // countries, the other way round
  const conts = Object.keys(CONTINENTS) as Continent[];
  const placed = COUNTRIES.filter((c) => c.continent);
  for (const k of conts) {
    const inK = placed.filter((c) => c.continent === k);
    const outK = placed.filter((c) => c.continent !== k);
    const [en, es, de] = CONTINENTS[k];
    for (let v = 0; v < 320; v++) {
      const right = pick(r, inK);
      const ws = sample(r, outK, 3)!;
      add("continent-which", `${right.id}:${ws.map((w) => w.id).sort().join("+")}`, "geography", right.pop >= 30 ? "easy" : "medium",
        [`Which of these countries is in ${en}?`, `¿Cuál de estos países está en ${es}?`, `Welches dieser Länder liegt in ${de}?`],
        right.name, ws.map((w) => w.name));
    }
  }
  const curOwners = new Map<string, Country[]>();
  for (const c of COUNTRIES) if (c.currency && CURRENCIES[c.currency]) curOwners.set(c.currency, [...(curOwners.get(c.currency) ?? []), c]);
  for (const [cur, owners] of curOwners) {
    if (owners.length !== 1) continue; // the euro & dollar are shared
    const c = owners[0];
    const [en, es, de] = CURRENCIES[cur];
    for (let v = 0; v < 3; v++) {
      const ws = sample(r, COUNTRIES, 3, (o) => o.id !== c.id && (o.continent === c.continent || r() < 0.3))!;
      add("currency-rev", cur, "geography", c.pop >= 60 ? "medium" : "hard",
        [`Which country uses the ${/^(Pound|Euro|Dollar)/.test(en) ? low(en) : en}?`, `¿Qué país usa como moneda el ${low(es)}?`, `Welches Land hat diese Währung: ${de}?`],
        c.name, ws.map((w) => w.name));
    }
  }
  for (const c of COUNTRIES.filter((c) => c.lang)) {
    const [en, es, de] = LANGUAGES[c.lang];
    for (let v = 0; v < 6; v++) {
      const ws = sample(r, COUNTRIES, 3, (o) => !!o.lang && o.lang !== c.lang)!;
      add("language-rev", `${c.id}:${ws.map((w) => w.id).sort().join("+")}`, "geography", c.pop >= 40 ? "easy" : "medium",
        [`In which of these countries is ${en} the main language?`, `¿En cuál de estos países el idioma principal es el ${low(es)}?`, `In welchem dieser Länder ist ${de} die Hauptsprache?`],
        c.name, ws.map((w) => w.name));
    }
  }
  const landmarkCountries = [...new Set(LANDMARKS.map((l) => l[3]))];
  for (const cid of landmarkCountries) {
    const c = byId.get(cid)!;
    const mine = LANDMARKS.filter((l) => l[3] === cid);
    const others = LANDMARKS.filter((l) => l[3] !== cid);
    for (let v = 0; v < 10; v++) {
      const right = pick(r, mine);
      const ws = sample(r, others, 3)!;
      add("landmark-rev", `${right[0]}:${ws.map((w) => w[0]).sort().join("+")}`, "geography", c.pop >= 60 ? "easy" : "medium",
        [`Which of these can you visit in ${c.enSubj}?`, `¿Cuál de estos lugares puedes visitar en ${c.esSubj}?`, `Was davon kannst du ${c.deIn} besuchen?`],
        capL([right[0], right[1], right[2]]), ws.map((w) => capL([w[0], w[1], w[2]])));
    }
  }

  // population, roughly
  for (const c of COUNTRIES.filter((c) => c.pop >= 1.5)) {
    const right = roundPop(c.pop);
    for (let v = 0; v < 2; v++) {
      const vals = new Set<number>();
      for (let t = 0; vals.size < 3 && t < 40; t++) {
        const f = pick(r, [0.1, 0.25, 3, 6, 15]);
        const x = roundPop(c.pop * f);
        if (x !== right && x >= 1 && x <= 1500 && (x / right >= 2.5 || right / x >= 2.5) && ![...vals].some((y) => y / x < 1.8 && x / y < 1.8)) vals.add(x);
      }
      if (vals.size < 3) continue;
      add("population", c.id, "geography", c.pop >= 100 ? "medium" : "hard",
        [`About how many people live in ${c.enSubj}?`, `¿Cuántas personas viven aproximadamente en ${c.esSubj}?`, `Wie viele Menschen leben ungefähr ${c.deIn}?`],
        popL(right), [...vals].map(popL));
    }
  }

  // cities
  const ANGLO = ["usa", "canada", "australia", "new_zealand", "uk", "ireland"];
  const LATIN = COUNTRIES.filter((c) => (c.continent === "SA" || c.continent === "NA") && !["usa", "canada", "jamaica", "haiti", "guyana"].includes(c.id)).map((c) => c.id);
  const SPECIAL: Record<string, string[]> = { Lagos: ["portugal"], Bergen: ["netherlands"], "Medellín": ["spain"] };
  const cityL = (x: (typeof CITIES)[number]): L => [x[0], x[1], x[2]];
  for (const city of CITIES) {
    const c = byId.get(city[3])!;
    const banned = new Set([...ANGLO, ...LATIN, "spain", "portugal", ...(SPECIAL[city[0]] ?? [])]);
    for (let v = 0; v < 3; v++) {
      const ws = sample(r, COUNTRIES, 3, (o) => o.id !== c.id && !banned.has(o.id) && (o.continent === c.continent || r() < 0.4));
      if (!ws) continue;
      add("city-country", city[0], "geography", c.pop >= 60 || ["Sydney", "New York", "Rio de Janeiro", "Barcelona", "Munich", "Istanbul"].includes(city[0]) ? "easy" : "medium",
        [`In which country is the city of ${city[0]}?`, `¿En qué país está la ciudad de ${city[1]}?`, `In welchem Land liegt die Stadt ${city[2]}?`],
        c.name, ws.map((w) => w.name));
    }
  }
  const capitals = COUNTRIES.filter((c) => c.capital).map((c) => ({ ...c, cap: c.capital! }));
  for (let v = 0; v < 450; v++) {
    const right = pick(r, capitals);
    const ws = sample(r, CITIES, 3)!;
    add("capital-which", `${right.id}:${ws.map((w) => w[0]).sort().join("+")}`, "geography", right.pop >= 30 ? "medium" : "hard",
      ["Which of these cities is the capital of its country?", "¿Cuál de estas ciudades es la capital de su país?", "Welche dieser Städte ist die Hauptstadt ihres Landes?"],
      right.cap, ws.map(cityL));
  }
  for (let v = 0; v < 450; v++) {
    const right = pick(r, CITIES);
    const ws = sample(r, capitals, 3)!;
    add("capital-not", `${right[0]}:${ws.map((w) => w.id).sort().join("+")}`, "geography", "medium",
      ["Which of these cities is NOT the capital of its country?", "¿Cuál de estas ciudades NO es la capital de su país?", "Welche dieser Städte ist NICHT die Hauptstadt ihres Landes?"],
      cityL(right), ws.map((w) => w.cap));
  }

  // hosts
  const hostCities = [...new Map(SUMMER_OLYMPICS.map((o) => [o[1], [o[1], o[2], o[3]] as L])).values()];
  const hostNames = new Set(hostCities.map((h) => h[0]));
  const WINTER_ONLY = new Set(["Vancouver", "Oslo", "Sapporo", "Turin", "Sochi", "Dakar", "Buenos Aires", "Singapore", "Nanjing"]); // winter or youth hosts
  const nonHosts: L[] = [...CITIES.map(cityL), ...capitals.map((c) => c.cap)].filter((x) => !hostNames.has(x[0]) && !WINTER_ONLY.has(x[0]));
  for (const h of hostCities) {
    for (let v = 0; v < 22; v++) {
      const ws = sample(r, nonHosts, 3)!;
      add("olympics-hosted", `${h[0]}:${ws.map((w) => w[0]).sort().join("+")}`, "sports", "medium",
        ["Which of these cities has hosted the Summer Olympics?", "¿Cuál de estas ciudades ha organizado unos Juegos Olímpicos de verano?", "Welche dieser Städte war schon Gastgeber Olympischer Sommerspiele?"],
        h, ws);
    }
  }
  const wcHosts = [...new Map(WORLD_CUP_HOSTS.map((o) => [o[1], [o[1], o[2], o[3]] as L])).values()];
  for (const h of wcHosts) {
    for (let v = 0; v < 25; v++) {
      const ws = sample(r, NEVER_WC_HOSTS, 3)!;
      add("wc-hosted", `${h[0]}:${ws.map((w) => w[0]).sort().join("+")}`, "sports", "medium",
        ["Which of these countries has hosted the men's FIFA World Cup?", "¿Cuál de estos países ha organizado el Mundial masculino de fútbol?", "Welches dieser Länder war schon Gastgeber der Fußball-WM der Männer?"],
        h, ws);
    }
  }
}

// ── generic builders ────────────────────────────────────────────────
/** One question per row (× variants): the answer comes from `right`, wrong answers from `pool`. */
function lookup<T, A>(o: {
  family: string; category: CategoryId; rows: T[]; variants?: number;
  stem: (r: T) => string; diff: (r: T) => Difficulty; text: (r: T) => L;
  right: (r: T) => A; pool: A[]; label: (a: A) => L; ok?: (r: T, a: A) => boolean;
}) {
  const r = rngFor(o.family);
  for (const row of o.rows) {
    const right = o.right(row);
    const rl = o.label(right);
    for (let v = 0; v < (o.variants ?? 3); v++) {
      const ws = sample(r, o.pool, 3, (a) => o.label(a)[0] !== rl[0] && (!o.ok || o.ok(row, a)));
      if (ws) add(o.family, o.stem(row), o.category, o.diff(row), o.text(row), rl, ws.map(o.label));
    }
  }
}
/** "Which of these belongs to <group>?" — one right row from the group, three rows from other groups. */
function which<T>(o: {
  family: string; category: CategoryId; rows: T[]; per: number; diff: Difficulty | ((key: string) => Difficulty);
  key: (r: T) => string; label: (r: T) => L; text: (key: string) => L; ok?: (right: T, cand: T, key: string) => boolean;
}) {
  const r = rngFor(o.family);
  const keys = [...new Set(o.rows.map(o.key))];
  for (const k of keys) {
    const mine = o.rows.filter((x) => o.key(x) === k);
    const others = o.rows.filter((x) => o.key(x) !== k);
    for (let v = 0; v < o.per; v++) {
      const right = pick(r, mine);
      const ws = sample(r, others, 3, (c) => o.label(c)[0] !== o.label(right)[0] && (!o.ok || o.ok(right, c, k)));
      if (!ws) continue;
      add(o.family, `${k}:${o.label(right)[0]}:${ws.map((w) => o.label(w)[0]).sort().join("+")}`, o.category,
        typeof o.diff === "function" ? o.diff(k) : o.diff, o.text(k), o.label(right), ws.map(o.label));
    }
  }
}
const deAus = (c: Country) => c.deIn.replace(/^in der /, "aus der ").replace(/^in den /, "aus den ").replace(/^auf den /, "von den ").replace(/^im /, "aus dem ").replace(/^in /, "aus ");
const deZu = (c: Country) => c.deIn.replace(/^in der /, "zur ").replace(/^in den /, "zu den ").replace(/^auf den /, "zu den ").replace(/^im /, "zum ").replace(/^in /, "zu ");
const deAcc = (c: Country) => c.deSubj.replace(/^der /, "den ");
const esA = (c: Country) => `a ${c.esSubj}`.replace(/^a el /, "al ");
const nameOf = (c: Country) => c.name;
const known = COUNTRIES.filter((c) => c.pop >= 3);
const contL = (k: Continent) => CONTINENTS[k];
const contKeys = Object.keys(CONTINENTS) as Continent[];
const groupYesNo = (family: string, category: CategoryId, n: number, yes: L[], no: L[], d: Difficulty, text: L) => {
  const r = rngFor(family);
  for (let i = 0; i < n; i++) {
    const right = pick(r, yes);
    const ws = sample(r, no, 3)!;
    add(family, `${right[0]}:${ws.map((w) => w[0]).sort().join("+")}`, category, d, text, right, ws);
  }
};

function extra() {
  // ── geography ──
  const riverEs = (es: string) => (es.startsWith("Río ") ? `el ${low(es)}` : `el río ${es}`);
  const riverDe = (de: string) => (de === "Gelber Fluss" ? "der Gelbe Fluss" : de.endsWith("Strom") ? `der ${de}` : `der Fluss ${de}`);
  const BIG_RIVERS = new Set(["Nile", "Amazon", "Mississippi", "Danube", "Rhine", "Thames", "Seine", "Ganges", "Yangtze", "Volga"]);
  lookup({ family: "river-continent", category: "geography", rows: RIVERS, variants: 2, stem: (x) => x[0], diff: (x) => (BIG_RIVERS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which continent does the ${x[0]} flow through?`, `¿Por qué continente fluye ${riverEs(x[1])}?`, `Durch welchen Kontinent fließt ${riverDe(x[2])}?`],
    right: (x) => x[3], pool: contKeys, label: contL });
  which({ family: "river-which", category: "geography", rows: RIVERS, per: 25, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => [`Which of these rivers flows in ${CONTINENTS[k as Continent][0]}?`, `¿Cuál de estos ríos está en ${CONTINENTS[k as Continent][1]}?`, `Welcher dieser Flüsse fließt in ${CONTINENTS[k as Continent][2]}?`] });
  const riverPool = [...new Map([...RIVER_CITIES.map((c) => [c[3], [c[3], c[4], c[5]] as L] as const), ...RIVERS.map((x) => [x[0], [x[0], x[1], x[2]] as L] as const)]).values()];
  lookup({ family: "river-city", category: "geography", rows: RIVER_CITIES, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`Which river flows through ${x[0]}?`, `¿Qué río pasa por ${x[1]}?`, `Welcher Fluss fließt durch ${x[2]}?`],
    right: (x) => [x[3], x[4], x[5]] as L, pool: riverPool, label: (l) => l });
  which({ family: "river-city-rev", category: "geography", rows: RIVER_CITIES, per: 12, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const x = RIVER_CITIES.find((c) => c[3] === k)!; return [`Which of these cities lies on the ${x[3]}?`, `¿Cuál de estas ciudades está a orillas del ${x[4]}?`, `Welche dieser Städte liegt am Fluss ${x[5]}?`]; } });
  const FAMOUS_PEAKS = new Set(["Mount Everest", "Mount Fuji", "Kilimanjaro", "Vesuvius", "Mount Etna", "Mont Blanc", "Table Mountain", "Sugarloaf Mountain", "Uluru"]);
  lookup({ family: "mountain-country", category: "geography", rows: MOUNTAINS, stem: (x) => x[0], diff: (x) => (FAMOUS_PEAKS.has(x[0]) ? "medium" : "hard"),
    text: (x) => [`In which country is ${x[0]}?`, `¿En qué país está ${x[1]}?`, `In welchem Land liegt ${x[2]}?`],
    right: (x) => byId.get(x[3])!, pool: known, label: nameOf, ok: (x, c) => c.id !== x[3] && !(x[4] ?? []).includes(c.id) });
  which({ family: "mountain-rev", category: "geography", rows: MOUNTAINS, per: 8, diff: "hard", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => { const c = byId.get(k)!; return [`Which of these mountains is in ${c.enSubj}?`, `¿Cuál de estas montañas está en ${c.esSubj}?`, `Welcher dieser Berge liegt ${c.deIn}?`]; },
    ok: (_, cand, k) => !(cand[4] ?? []).includes(k) });
  const FAMOUS_ISLANDS = new Set(["Sicily", "Crete", "Mallorca", "Hawaii", "Bali", "Tasmania", "Corsica", "Sardinia", "Ibiza", "Tenerife"]);
  lookup({ family: "island-country", category: "geography", rows: ISLANDS, stem: (x) => x[0], diff: (x) => (FAMOUS_ISLANDS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which country ${x[4] ? "do" : "does"} ${x[0]} belong to?`, `¿A qué país pertenece${x[4] ? "n" : ""} ${x[1]}?`, `Zu welchem Land gehör${x[4] ? "en" : "t"} ${x[2]}?`],
    right: (x) => byId.get(x[3])!, pool: known, label: nameOf, ok: (x, c) => c.id !== x[3] });
  which({ family: "island-rev", category: "geography", rows: ISLANDS, per: 10, diff: "medium", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => { const c = byId.get(k)!; return [`Which of these islands belongs to ${c.enSubj}?`, `¿Cuál de estas islas pertenece ${esA(c)}?`, `Welche dieser Inseln gehört ${deZu(c)}?`]; } });
  const rb = rngFor("borders");
  for (const [xid, nbs] of Object.entries(NEIGHBOURS)) {
    const x = byId.get(xid);
    if (!x) throw new Error(`unknown country ${xid}`);
    const near = (o: Country) => o.id !== xid && !nbs.includes(o.id) && (o.continent === x.continent || rb() < 0.25);
    for (let v = 0; v < Math.min(nbs.length * 2, 10); v++) {
      const right = byId.get(pick(rb, nbs))!;
      const ws = sample(rb, COUNTRIES, 3, near);
      if (ws) add("border", `${xid}:${right.id}`, "geography", "medium",
        [`Which of these countries borders ${x.enSubj}?`, `¿Cuál de estos países tiene frontera con ${x.esSubj}?`, `Welches dieser Länder grenzt an ${deAcc(x)}?`], right.name, ws.map(nameOf));
    }
    if (nbs.length >= 3) {
      for (let v = 0; v < 8; v++) {
        const right = sample(rb, COUNTRIES, 1, (o) => near(o) && o.continent === x.continent)?.[0];
        const ws = sample(rb, nbs, 3);
        if (right && ws) add("border-not", `${xid}:${right.id}`, "geography", "hard",
          [`Which of these countries does NOT border ${x.enSubj}?`, `¿Cuál de estos países NO tiene frontera con ${x.esSubj}?`, `Welches dieser Länder grenzt NICHT an ${deAcc(x)}?`],
          right.name, ws.map((id) => byId.get(id)!.name));
      }
    }
  }
  lookup({ family: "desert-continent", category: "geography", rows: DESERTS, variants: 2, stem: (x) => x[0], diff: (x) => (x[0] === "the Sahara" || x[0] === "the Gobi" ? "easy" : "medium"),
    text: (x) => [`On which continent is ${x[0]}?`, `¿En qué continente está ${x[1]}?`, `Auf welchem Kontinent liegt ${x[2]}?`], right: (x) => x[3], pool: contKeys, label: contL });
  which({ family: "desert-rev", category: "geography", rows: DESERTS, per: 12, diff: "medium", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => [`Which of these deserts is in ${CONTINENTS[k as Continent][0]}?`, `¿Cuál de estos desiertos está en ${CONTINENTS[k as Continent][1]}?`, `Welche dieser Wüsten liegt in ${CONTINENTS[k as Continent][2]}?`] });

  // ── history ──
  const FAMOUS_LEADERS = new Set(["George Washington", "Abraham Lincoln", "Winston Churchill", "Napoleon Bonaparte", "Nelson Mandela", "Angela Merkel", "Mao Zedong", "Cleopatra", "John F. Kennedy", "Queen Victoria"]);
  lookup({ family: "leader-country", category: "history", rows: LEADERS, stem: (x) => x[0], diff: (x) => (FAMOUS_LEADERS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which country did ${x[0]} lead?`, `¿Qué país dirigió ${x[0]}?`, `An der Spitze welches Landes stand ${x[0]}?`],
    right: (x) => byId.get(x[1])!, pool: COUNTRIES.filter((c) => c.pop >= 5), label: nameOf, ok: (x, c) => c.id !== x[1] });
  which({ family: "leader-rev", category: "history", rows: LEADERS, per: 10, diff: "medium", key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => { const c = byId.get(k)!; return [`Which of these people led ${c.enSubj}?`, `¿Quién de estas personas dirigió ${c.esSubj}?`, `Wer davon regierte ${c.deIn}?`]; } });
  const civPool = [...new Map(ANCIENT_SITES.map((x) => [x[3], [x[3], x[4], x[5]] as L])).values()];
  lookup({ family: "ancient-builders", category: "history", rows: ANCIENT_SITES, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`Which civilisation built ${x[0]}?`, `¿Qué civilización construyó ${x[1]}?`, `Welche Kultur erbaute ${x[2]}?`],
    right: (x) => [x[3], x[4], x[5]] as L, pool: civPool, label: (l) => l });
  which({ family: "ancient-rev", category: "history", rows: ANCIENT_SITES, per: 8, diff: "medium", key: (x) => x[3],
    label: (x) => capL([x[0], x[1], x[2].replace(/^den /, "der ")]),
    text: (k) => { const x = ANCIENT_SITES.find((s) => s[3] === k)!; return [`Which of these did ${low(x[3])} build?`, `¿Cuál de estas obras construyeron ${low(x[4])}?`, `Was davon erbauten ${low(x[5])}?`]; } });

  // ── science ──
  const BASIC_UNITS = new Set(["force", "energy", "power", "electric current", "voltage", "electrical resistance", "frequency", "pressure", "mass", "length", "time"]);
  const unitL = (x: (typeof UNITS)[number]): L => [x[3], x[4], x[5]];
  lookup({ family: "si-unit", category: "science", rows: UNITS, stem: (x) => x[0], diff: (x) => (BASIC_UNITS.has(x[0]) ? "medium" : "hard"),
    text: (x) => [`What is the SI unit of ${x[0]}?`, `¿Qué unidad del SI se usa para esta magnitud: ${x[1]}?`, `Welche SI-Einheit gehört zur Größe „${x[2]}“?`],
    right: unitL, pool: UNITS.map(unitL), label: (l) => l });
  lookup({ family: "si-unit-rev", category: "science", rows: UNITS, stem: (x) => x[3], diff: (x) => (BASIC_UNITS.has(x[0]) ? "medium" : "hard"),
    text: (x) => [`The ${low(x[3])} is the SI unit of which quantity?`, `La unidad del SI «${low(x[4])}», ¿qué magnitud mide?`, `Die SI-Einheit „${x[5]}“ – welche Größe misst man damit?`],
    right: (x) => capL([x[0], x[1], x[2]]), pool: UNITS.map((x) => capL([x[0], x[1], x[2]])), label: (l) => l });
  const organDiff: Record<string, Difficulty> = { heart: "easy", lungs: "easy", brain: "easy", stomach: "easy", skin: "medium", kidneys: "medium", spleen: "hard", thyroid: "hard", gallbladder: "hard" };
  lookup({ family: "organ", category: "science", rows: ORGAN_JOBS, stem: (x) => x[3], diff: (x) => organDiff[x[3]] ?? "medium",
    text: (x) => [`Which organ ${x[0]}?`, `¿Qué órgano ${x[1]}?`, `Welches Organ ${x[2]}?`],
    right: (x) => x[3], pool: Object.keys(ORGANS), label: (k) => ORGANS[k], ok: (x, k) => !(x[4] ?? []).includes(k) });

  // ── art ──
  const composers = [...new Set([...WORKS.map((w) => w[3]), ...PEOPLE.music])];
  lookup({ family: "music-work", category: "art", rows: WORKS, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`Who composed “${x[0]}”?`, `¿Quién compuso «${x[1]}»?`, `Wer komponierte „${x[2]}“?`],
    right: (x) => x[3], pool: composers, label: same, ok: (x, c) => !(x[4] ?? []).includes(c) });
  which({ family: "music-work-rev", category: "art", rows: WORKS, per: 8, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => [`Which of these works did ${k} compose?`, `¿Cuál de estas obras compuso ${k}?`, `Welches dieser Werke komponierte ${k}?`], ok: (_, c, k) => !(c[4] ?? []).includes(k) });
  lookup({ family: "building-architect", category: "art", rows: BUILDINGS, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`Who designed ${x[0]}?`, `¿Quién diseñó ${x[1]}?`, `Wer entwarf ${x[2]}?`],
    right: (x) => x[3], pool: [...new Set(BUILDINGS.map((b) => b[3]))], label: same });
  which({ family: "building-rev", category: "art", rows: BUILDINGS, per: 6, diff: "medium", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2].replace(/^den /, "der ")]),
    text: (k) => [`Which of these buildings did ${k} design?`, `¿Cuál de estos edificios diseñó ${k}?`, `Welches dieser Gebäude entwarf ${k}?`] });

  // ── pop culture ──
  lookup({ family: "game-studio", category: "pop_culture", rows: GAMES, stem: (x) => x[0], diff: (x) => (["Nintendo", "Mojang", "Epic Games"].includes(x[1]) ? "easy" : "medium"),
    text: (x) => [`Which studio developed the video game “${x[0]}”?`, `¿Qué estudio desarrolló el videojuego «${x[0]}»?`, `Welches Studio hat das Videospiel „${x[0]}“ entwickelt?`],
    right: (x) => x[1], pool: [...new Set(GAMES.map((g) => g[1]))], label: same });
  which({ family: "game-rev", category: "pop_culture", rows: GAMES, per: 10, diff: "medium", key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => [`Which of these games was made by ${k}?`, `¿Cuál de estos videojuegos es de ${k}?`, `Welches dieser Spiele stammt von ${k}?`] });
  const pixarDisney = (a: string, b: string) => [a, b].sort().join() === ["Pixar", "Walt Disney Animation Studios"].sort().join();
  lookup({ family: "animated-studio", category: "pop_culture", rows: ANIMATED, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`Which studio made the animated film “${x[0]}”?`, `¿Qué estudio hizo la película de animación «${x[1]}»?`, `Welches Studio hat den Animationsfilm „${x[2]}“ produziert?`],
    right: (x) => x[3], pool: [...new Set(ANIMATED.map((a) => a[3]))], label: same, ok: (x, s) => !pixarDisney(x[3], s) });
  which({ family: "animated-rev", category: "pop_culture", rows: ANIMATED, per: 10, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => [`Which of these animated films is by ${k}?`, `¿Cuál de estas películas de animación es de ${k}?`, `Welcher dieser Animationsfilme stammt von ${k}?`], ok: (_, c, k) => !pixarDisney(c[3], k) });
  const artists = [...new Set([...SONGS.map((x) => x[1]), ...MUSICIANS.map((m) => m[0])])];
  lookup({ family: "song-artist", category: "pop_culture", rows: SONGS, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`Which artist is known for the song “${x[0]}”?`, `¿Qué artista es conocido por la canción «${x[0]}»?`, `Von wem stammt der Song „${x[0]}“?`],
    right: (x) => x[1], pool: artists, label: same, ok: (x, a) => !(x[2] ?? []).includes(a) });
  which({ family: "song-rev", category: "pop_culture", rows: SONGS, per: 8, diff: "medium", key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => [`Which of these songs is by ${k}?`, `¿Cuál de estas canciones es de ${k}?`, `Welcher dieser Songs stammt von ${k}?`],
    ok: (right, c) => !(c[2] ?? []).includes(right[1]) && !(right[2] ?? []).includes(c[1]) });
  lookup({ family: "tv-country", category: "pop_culture", rows: TV_SHOWS, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`Which country does the TV series “${x[0]}” come from?`, `¿De qué país es la serie «${x[1]}»?`, `Aus welchem Land stammt die Serie „${x[2]}“?`],
    right: (x) => byId.get(x[3])!, pool: COUNTRIES.filter((c) => c.pop >= 5), label: nameOf, ok: (x, c) => c.id !== x[3] });
  which({ family: "tv-rev", category: "pop_culture", rows: TV_SHOWS, per: 8, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const c = byId.get(k)!; return [`Which of these TV series comes from ${c.enSubj}?`, `¿Cuál de estas series es ${c.esDe}?`, `Welche dieser Serien stammt ${deAus(c)}?`]; } });

  // ── sports ──
  const sportKeys = Object.keys(SPORTS);
  const sportIn = (k: string) => (/\d/.test(SPORTS[k][0]) ? SPORTS[k][0] : low(SPORTS[k][0]));
  lookup({ family: "sport-term", category: "sports", rows: TERMS, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`In which sport do you hear the term “${x[0]}”?`, `¿En qué deporte se usa el término «${x[1]}»?`, `In welcher Sportart gibt es den Begriff „${x[2]}“?`],
    right: (x) => x[3], pool: sportKeys, label: (k) => SPORTS[k], ok: (x, k) => !(x[4] ?? []).includes(k) });
  which({ family: "sport-term-rev", category: "sports", rows: TERMS, per: 8, diff: "medium", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => [`Which of these terms is used in ${sportIn(k)}?`, `¿Cuál de estos términos se usa en este deporte: ${low(SPORTS[k][1])}?`, `Welcher dieser Begriffe gehört zur Sportart „${SPORTS[k][2]}“?`],
    ok: (_, c, k) => !(c[4] ?? []).includes(k) });
  const BIG_CLUBS = new Set(["Real Madrid", "FC Barcelona", "Manchester United", "Bayern Munich", "Juventus", "Paris Saint-Germain", "Liverpool FC", "AC Milan", "Ajax", "Boca Juniors"]);
  lookup({ family: "club-country", category: "sports", rows: CLUBS, stem: (x) => x[0], diff: (x) => (BIG_CLUBS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which country is the football club ${x[0]} from?`, `¿De qué país es el club de fútbol ${x[1]}?`, `Aus welchem Land kommt der Fußballverein ${x[2]}?`],
    right: (x) => byId.get(x[3])!, pool: known, label: nameOf, ok: (x, c) => c.id !== x[3] });
  which({ family: "club-rev", category: "sports", rows: CLUBS, per: 10, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const c = byId.get(k)!; return [`Which of these football clubs is from ${c.enSubj}?`, `¿Cuál de estos clubes de fútbol es ${c.esDe}?`, `Welcher dieser Fußballvereine kommt ${deAus(c)}?`]; } });
  lookup({ family: "tournament-sport", category: "sports", rows: TOURNAMENTS, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`Which sport is ${x[0]} part of?`, `¿A qué deporte pertenece ${x[1]}?`, `Zu welcher Sportart gehört ${x[2]}?`],
    right: (x) => x[3], pool: sportKeys, label: (k) => SPORTS[k] });
  which({ family: "tournament-rev", category: "sports", rows: TOURNAMENTS, per: 6, diff: "medium", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => [`Which of these competitions belongs to ${sportIn(k)}?`, `¿Cuál de estas competiciones es de este deporte: ${low(SPORTS[k][1])}?`, `Welcher dieser Wettbewerbe gehört zur Sportart „${SPORTS[k][2]}“?`] });
  const rt = rngFor("team-size");
  for (const [en, es, de, n] of TEAM_SIZES) {
    for (let v = 0; v < 3; v++) {
      const vals = new Set<number>();
      while (vals.size < 3) {
        const x = n + Math.round((rt() * 2 - 1) * 4);
        if (x !== n && x >= 1 && x <= 16) vals.add(x);
      }
      add("team-size", en, "sports", n === 11 || n === 5 ? "medium" : "hard",
        [`${en}: how many players does each team have in play at the same time?`, `${es}: ¿cuántos jugadores tiene cada equipo en juego a la vez?`, `${de}: Wie viele Spieler hat jede Mannschaft gleichzeitig im Spiel?`],
        same(String(n)), [...vals].map((x) => same(String(x))));
    }
  }

  // ── food & drink ──
  const FAMOUS_DISHES = new Set(["Paella", "Sushi", "Pizza Margherita", "Tacos", "Fish and chips", "Croissant", "Lasagne", "Tiramisu", "Kimchi", "Guacamole", "Döner kebab"]);
  const foodPool = COUNTRIES.filter((c) => c.pop >= 5);
  for (const [rows, fam, en, es, de] of [
    [DISHES, "dish", "the dish", "el plato", "das Gericht"],
    [CHEESES, "cheese", "the cheese", "el queso", "der Käse"],
    [DRINKS, "drink", "", "", ""],
  ] as const) {
    lookup({ family: `${fam}-country`, category: "food", rows: rows as unknown as [string, string, string, string, string[]?][], stem: (x) => x[0], diff: (x) => (FAMOUS_DISHES.has(x[0]) ? "easy" : "medium"),
      text: (x) => fam === "drink"
        ? [`Which country does ${x[0]} come from?`, `¿De qué país procede ${low(x[1])}?`, `Aus welchem Land stammt ${x[2]}?`]
        : [`Which country does ${en} ${x[0]} come from?`, `¿De qué país es ${es} ${x[1]}?`, `Aus welchem Land stammt ${de} ${x[2]}?`],
      right: (x) => byId.get(x[3])!, pool: foodPool, label: nameOf, ok: (x, c) => c.id !== x[3] && !(x[4] ?? []).includes(c.id) });
    const word: Record<string, L> = { dish: ["dishes", "platos", "Gerichte"], cheese: ["cheeses", "quesos", "Käsesorten"], drink: ["drinks", "bebidas", "Getränke"] };
    which({ family: `${fam}-rev`, category: "food", rows: rows as unknown as [string, string, string, string, string[]?][], per: 18, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
      text: (k) => { const c = byId.get(k)!; const w = word[fam]; return [`Which of these ${w[0]} comes from ${c.enSubj}?`, `¿Cuál de ${fam === "drink" ? "estas" : "estos"} ${w[1]} es ${c.esDe}?`, `Welche${fam === "dish" ? "s" : fam === "cheese" ? "" : "s"} dieser ${w[2]} stammt ${deAus(c)}?`]; },
      ok: (_, c, k) => !(c[4] ?? []).includes(k) });
  }
  lookup({ family: "made-from", category: "food", rows: MADE_FROM, stem: (x) => x[0], diff: () => "easy",
    text: (x) => [`What is the main ingredient of ${x[0]}?`, `¿Cuál es el ingrediente principal de este alimento: ${x[1]}?`, `Was ist die Hauptzutat von ${x[2]}?`],
    right: (x) => x[3], pool: Object.keys(INGREDIENTS), label: (k) => INGREDIENTS[k], ok: (x, k) => !(x[4] ?? []).includes(k) });
  which({ family: "made-from-rev", category: "food", rows: MADE_FROM, per: 22, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => [`Which of these is made mainly from ${low(INGREDIENTS[k][0])}?`, `¿Cuál de estos se elabora principalmente con ${low(INGREDIENTS[k][1])}?`, `Was davon wird hauptsächlich aus ${INGREDIENTS[k][2]} hergestellt?`],
    ok: (_, c, k) => !(c[4] ?? []).includes(k) });
  groupYesNo("is-fruit", "food", 700, FRUITS, VEGETABLES, "easy",
    ["Which of these is a fruit?", "¿Cuál de estos alimentos es una fruta?", "Was davon ist Obst?"]);
  groupYesNo("is-vegetable", "food", 700, VEGETABLES, FRUITS, "easy",
    ["Which of these is a vegetable?", "¿Cuál de estos alimentos es una verdura?", "Was davon ist Gemüse?"]);

  // ── nature & animals ──
  lookup({ family: "animal-home", category: "nature", rows: ANIMAL_HOMES, variants: 2, stem: (x) => x[0], diff: () => "easy",
    text: (x) => [`Which continent is the ${x[0]} originally native to?`, `¿De qué continente es originario este animal: ${x[1]}?`, `Auf welchem Kontinent ist dieses Tier ursprünglich heimisch: ${x[2]}?`],
    right: (x) => x[3], pool: contKeys, label: contL });
  which({ family: "animal-home-rev", category: "nature", rows: ANIMAL_HOMES, per: 40, diff: "easy", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => { const c = CONTINENTS[k as Continent]; return [`Which of these animals is originally native to ${c[0]}?`, `¿Cuál de estos animales es originario de ${c[1]}?`, `Welches dieser Tiere ist ursprünglich in ${c[2]} heimisch?`]; } });
  const extreme = (family: string, n: number, rows: [string, string, string, number][], max: boolean, ratio: number, text: L) => {
    const r = rngFor(family);
    for (let made = 0, tries = 0; made < n && tries < n * 30; tries++) {
      const set = sample(r, rows, 4)!;
      const sorted = [...set].sort((a, b) => (max ? b[3] - a[3] : a[3] - b[3]));
      const ok = ratio > 0 ? (max ? sorted[0][3] / sorted[1][3] : sorted[1][3] / sorted[0][3]) >= ratio : sorted[0][3] !== sorted[1][3];
      if (!ok) continue;
      const before = out.length;
      add(family, sorted.map((x) => x[0]).sort().join("+"), "nature", ratio > 0 && (max ? sorted[0][3] / sorted[1][3] : sorted[1][3] / sorted[0][3]) >= 10 ? "easy" : "medium",
        text, [sorted[0][0], sorted[0][1], sorted[0][2]], sorted.slice(1).map((x) => [x[0], x[1], x[2]] as L));
      if (out.length > before) made++;
    }
  };
  extreme("heaviest", 900, ANIMAL_MASS, true, 3, ["Which of these animals is the heaviest as an adult?", "¿Cuál de estos animales es el más pesado de adulto?", "Welches dieser Tiere ist ausgewachsen am schwersten?"]);
  extreme("lightest", 700, ANIMAL_MASS, false, 3, ["Which of these animals is the lightest as an adult?", "¿Cuál de estos animales es el más ligero de adulto?", "Welches dieser Tiere ist ausgewachsen am leichtesten?"]);
  extreme("most-legs", 350, ANIMAL_LEGS, true, 0, ["Which of these animals has the most legs?", "¿Cuál de estos animales tiene más patas?", "Welches dieser Tiere hat die meisten Beine?"]);
  extreme("fewest-legs", 250, ANIMAL_LEGS, false, 0, ["Which of these animals has the fewest legs?", "¿Cuál de estos animales tiene menos patas?", "Welches dieser Tiere hat die wenigsten Beine?"]);
  groupYesNo("herbivore", "nature", 300, HERBIVORES, CARNIVORES, "easy",
    ["Which of these animals is a herbivore (eats only plants)?", "¿Cuál de estos animales es herbívoro (solo come plantas)?", "Welches dieser Tiere ist ein Pflanzenfresser?"]);
  groupYesNo("carnivore", "nature", 300, CARNIVORES, HERBIVORES, "easy",
    ["Which of these animals is a carnivore (eats meat)?", "¿Cuál de estos animales es carnívoro (come carne)?", "Welches dieser Tiere ist ein Fleischfresser?"]);
  groupYesNo("conifer", "nature", 200, CONIFERS, BROADLEAF, "medium",
    ["Which of these trees is a conifer?", "¿Cuál de estos árboles es una conífera?", "Welcher dieser Bäume ist ein Nadelbaum?"]);
  groupYesNo("broadleaf", "nature", 200, BROADLEAF, CONIFERS, "medium",
    ["Which of these trees is a broadleaf tree?", "¿Cuál de estos árboles es de hoja ancha?", "Welcher dieser Bäume ist ein Laubbaum?"]);
}

let cache: StoredQuestion[] | null = null;

/** All generated questions (built once, deterministic). */
export function generatedQuestions(): StoredQuestion[] {
  if (!cache) {
    countries();
    science();
    history();
    people();
    reverse();
    more();
    extra();
    cache = out;
  }
  return cache;
}
