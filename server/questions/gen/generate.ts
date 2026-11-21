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
        add("animal-is", `${cls}:${m[1]}`, "science", TRICKY.has(m[1]) ? "hard" : tricky ? "medium" : "easy",
          [`Which of these animals is ${/^[aeiou]/.test(cen) ? "an" : "a"} ${cen}?`, `¿Cuál de estos animales es ${ES_ART[cls]} ${ces}?`, `Welches dieser Tiere gehört zu den ${DE_GROUP[cls]}?`],
          animalL(m), ws.map(animalL));
      }
    }
    if (members.length >= 3) {
      for (const o of others) {
        for (let v = 0; v < 3; v++) {
          const ws = sample(ra, members, 3)!;
          add("animal-not", `${cls}:${o[1]}`, "science", TRICKY.has(o[1]) || ws.some((w) => TRICKY.has(w[1])) ? "hard" : "medium",
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
    cache = out;
  }
  return cache;
}
