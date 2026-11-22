import type { Country, L, PackApi } from "../generate";
import type { Difficulty } from "../../../../src/shared/types";
import {
  AIRPORTS, AU_CAPITALS, AU_EXTRA, AU_STATES, BR_CAPITALS, BR_STATES, BRIDGES, CA_CAPITALS, CA_PROVINCES, CALLING, CALLING_SHARED, CITY,
  CITY_NICKNAMES, CONTINENT_PEAKS, COUNTRY_NICKNAMES, DE_CAPITALS, DE_CITIES, DE_GEN, DE_STATES, DRIVE_LEFT, EQUATOR, EQUATOR_NEAR,
  ES_CAPITALS, ES_CITIES, ES_REGIONS, FLAGS, FORMER_CAPITALS, HEMI_TRICKY, ISLAND_AREA, ISLAND_NATIONS, ISLAND_TRICKY, IT_CAPITALS,
  IT_CITIES, IT_REGIONS, LAKE_AREA, LAKES, LANDLOCKED, LANDLOCKED_TRICKY, MX_CAPITALS, MX_STATES, NEIGHBOUR_COUNT, NICK_CITY_DECOYS,
  NOT_VOLCANOES, OLD_CITY_DECOYS, OLD_CITY_NAMES, OLD_COUNTRY_NAMES, PEAK_HEIGHT, PEAK_POOL, PLACES, REGIONS, RIVER_LENGTH, SEAS,
  SOUTHERN, STRAIT_LINKS, STRAIT_SIDES, TLD, US_CAPITALS, US_CITIES, US_NICKNAMES, US_STATES, VOLCANOES, WATERFALLS, WATERS,
} from "./geography-data";

/** Extra question types for the "geography" category (families "geo.*"). */
export default function pack(api: PackApi) {
  const { add, lookup, which, extremeOf, rngFor, pick, sample, same, cap, COUNTRIES, nameOf, deZu, esA, CONTINENTS } = api;
  const G = "geography" as const;

  const C = (id: string): Country => {
    const c = api.byId.get(id);
    if (!c) throw new Error(`geography pack: unknown country ${id}`);
    return c;
  };
  /** Option label without a leading article: "the Champs-Élysées" → "Champs-Élysées", "der Rote Platz" → "Rote Platz". */
  const strip = (l: L): L => [cap(l[0].replace(/^the /, "")), cap(l[1].replace(/^(el|la|los|las) /, "")), cap(l[2].replace(/^(der|die|das|den) /, ""))];
  const esDe = (x: string) => `de ${x}`.replace(/^de el /, "del ");
  const known = COUNTRIES.filter((c) => c.pop >= 3);
  /** Wrong countries: mostly from the same continent as the right one. */
  const nearFor = (seed: string) => {
    const r = rngFor(`${seed}:near`);
    return (right: Country, cand: Country) => cand.continent === right.continent || r() < 0.3;
  };

  /** "Which of these countries is <yes>?" — right from `yes`, 3 wrong from `no`, usually same continent. */
  const yesNo = (family: string, seed: string, n: number, yes: Country[], no: Country[], diff: (c: Country) => Difficulty, text: L) => {
    const r = rngFor(`${family}:${seed}`);
    for (let i = 0; i < n; i++) {
      const right = pick(r, yes);
      const near = no.filter((o) => o.continent === right.continent);
      const ws = sample(r, near.length >= 3 && r() < 0.6 ? near : no, 3);
      if (ws) add(family, `${seed}:${right.id}`, G, diff(right), text, right.name, ws.map(nameOf));
    }
  };
  const yesNoL = (family: string, seed: string, n: number, yes: L[], no: L[], diff: Difficulty, text: L) => {
    const r = rngFor(`${family}:${seed}`);
    for (let i = 0; i < n; i++) {
      const right = pick(r, yes);
      const ws = sample(r, no, 3);
      if (ws) add(family, `${seed}:${right[0]}`, G, diff, text, right, ws);
    }
  };
  const without = (ids: string[]) => COUNTRIES.filter((c) => !ids.includes(c.id));
  const medHard = (c: Country): Difficulty => (c.pop >= 30 ? "medium" : "hard");

  // ── geo.landlocked ──
  {
    const yes = LANDLOCKED.map(C);
    const no = without([...LANDLOCKED, ...LANDLOCKED_TRICKY]);
    yesNo("geo.landlocked", "ll", 160, yes, no, () => "medium",
      ["Which of these countries is landlocked (has no sea coast)?", "¿Cuál de estos países no tiene salida al mar?", "Welches dieser Länder hat keinen Zugang zum Meer?"]);
    yesNo("geo.landlocked", "coast", 100, no, yes, () => "medium",
      ["Which of these countries has a sea coast?", "¿Cuál de estos países tiene salida al mar?", "Welches dieser Länder hat Zugang zum Meer?"]);
  }

  // ── geo.sea-coast / geo.country-sea ──
  {
    const r = rngFor("geo.sea-coast");
    const near = nearFor("geo.sea-coast");
    for (const [key, , t, yes, also] of SEAS) {
      const no = without([...yes, ...also]);
      const d: Difficulty = ["med", "baltic", "caribbean", "black"].includes(key) ? "medium" : "hard";
      for (let i = 0; i < 25; i++) {
        const right = C(pick(r, yes));
        const ws = sample(r, no, 3, (o) => near(right, o));
        if (ws) add("geo.sea-coast", `${key}:${right.id}`, G, d,
          [`Which of these countries has a coastline on ${t[0]}?`, `¿Cuál de estos países tiene costa en ${t[1]}?`, `Welches dieser Länder grenzt an ${t[2]}?`],
          right.name, ws.map(nameOf));
      }
    }
    const rs = rngFor("geo.country-sea");
    const seas = SEAS.filter((x) => !x[5]);
    const coastal = [...new Set(seas.flatMap((x) => x[3]))];
    for (const id of coastal) {
      const c = C(id);
      const mine = seas.filter((x) => x[3].includes(id));
      const others = seas.filter((x) => !x[3].includes(id) && !x[4].includes(id));
      const esPl = ["netherlands", "uae"].includes(id);
      for (let v = 0; v < 3; v++) {
        const right = pick(rs, mine);
        const ws = sample(rs, others, 3);
        if (ws) add("geo.country-sea", id, G, c.pop >= 40 ? "medium" : "hard",
          [`Which of these seas does ${c.enSubj} have a coastline on?`, `¿En cuál de estos mares ${esPl ? "tienen" : "tiene"} costa ${c.esSubj}?`, `An welches dieser Meere ${c.dePl ? "grenzen" : "grenzt"} ${c.deSubj}?`],
          right[1], ws.map((w) => w[1]));
      }
    }
  }

  // ── geo.island-nation ──
  yesNo("geo.island-nation", "isl", 160, ISLAND_NATIONS.map(C), without([...ISLAND_NATIONS, ...ISLAND_TRICKY]), (c) => (c.pop >= 60 ? "easy" : "medium"),
    ["Which of these countries is made up entirely of islands?", "¿Cuál de estos países está formado solo por islas?", "Welches dieser Länder besteht nur aus Inseln?"]);

  // ── geo.equator ──
  yesNo("geo.equator", "eq", 140, EQUATOR.map(C), without([...EQUATOR, ...EQUATOR_NEAR]), (c) => (["ecuador", "brazil", "indonesia", "kenya"].includes(c.id) ? "medium" : "hard"),
    ["Which of these countries does the equator pass through?", "¿Por cuál de estos países pasa el ecuador?", "Durch welches dieser Länder verläuft der Äquator?"]);

  // ── geo.hemisphere ──
  {
    const south = SOUTHERN.map(C);
    const north = without([...SOUTHERN, ...HEMI_TRICKY]);
    yesNo("geo.hemisphere", "s", 140, south, north, () => "easy",
      ["Which of these countries lies entirely in the Southern Hemisphere?", "¿Cuál de estos países está totalmente en el hemisferio sur?", "Welches dieser Länder liegt vollständig auf der Südhalbkugel?"]);
    yesNo("geo.hemisphere", "n", 80, north, south, () => "easy",
      ["Which of these countries lies entirely in the Northern Hemisphere?", "¿Cuál de estos países está totalmente en el hemisferio norte?", "Welches dieser Länder liegt vollständig auf der Nordhalbkugel?"]);
  }

  // ── geo.drive-left ──
  {
    const left = DRIVE_LEFT.map(C);
    const right = without(DRIVE_LEFT);
    yesNo("geo.drive-left", "l", 160, left, right, (c) => (["uk", "japan", "australia", "ireland", "india"].includes(c.id) ? "easy" : medHard(c)),
      ["In which of these countries do people drive on the left?", "¿En cuál de estos países se circula por la izquierda?", "In welchem dieser Länder herrscht Linksverkehr?"]);
    yesNo("geo.drive-left", "r", 80, right, left, () => "medium",
      ["In which of these countries do people drive on the right?", "¿En cuál de estos países se circula por la derecha?", "In welchem dieser Länder herrscht Rechtsverkehr?"]);
  }

  // ── geo.tld / geo.tld-rev ──
  {
    const rows = Object.entries(TLD).map(([id, tld]) => [C(id), tld] as const);
    const obvious = (c: Country, tld: string) => c.name[0].toLowerCase().startsWith(tld.slice(1));
    const d = (c: Country, tld: string): Difficulty => (obvious(c, tld) ? (c.pop >= 15 ? "easy" : "medium") : c.pop >= 40 ? "medium" : "hard");
    lookup({ family: "geo.tld", category: G, rows, variants: 2, stem: (x) => x[0].id, diff: (x) => d(x[0], x[1]),
      text: ([c]) => [`Which internet country domain belongs to ${c.enSubj}?`, `¿Qué dominio de internet corresponde ${esA(c)}?`, `Welche Internet-Länderendung gehört ${deZu(c)}?`],
      right: (x) => x[1], pool: rows.map((x) => x[1]), label: same });
    const near = nearFor("geo.tld-rev");
    lookup({ family: "geo.tld-rev", category: G, rows, variants: 2, stem: (x) => x[0].id, diff: (x) => d(x[0], x[1]),
      text: ([, t]) => [`Which country has the internet domain ${t}?`, `¿Qué país tiene el dominio de internet ${t}?`, `Welches Land hat die Internet-Endung ${t}?`],
      right: (x) => x[0], pool: rows.map((x) => x[0]), label: nameOf, ok: (x, c) => near(x[0], c) });
  }

  // ── geo.calling-code / geo.calling-code-rev ──
  {
    const rows = Object.entries(CALLING).map(([id, n]) => [C(id), n] as const);
    const FAMOUS = new Set([1, 44, 49, 33, 34, 39]);
    const d = (n: number): Difficulty => (FAMOUS.has(n) ? "medium" : "hard");
    lookup({ family: "geo.calling-code", category: G, rows, variants: 2, stem: (x) => x[0].id, diff: (x) => d(x[1]),
      text: ([c]) => [`Which international dialling code belongs to ${c.enSubj}?`, `¿Cuál es el prefijo telefónico internacional ${c.esDe}?`, `Welche internationale Telefonvorwahl gehört ${deZu(c)}?`],
      right: (x) => x[1], pool: rows.map((x) => x[1]), label: (n) => same(`+${n}`) });
    const near = nearFor("geo.calling-code-rev");
    lookup({ family: "geo.calling-code-rev", category: G, rows, variants: 2, stem: (x) => x[0].id, diff: (x) => d(x[1]),
      text: ([, n]) => [`The international dialling code +${n} belongs to which country?`, `¿A qué país corresponde el prefijo telefónico +${n}?`, `Zu welchem Land gehört die Telefonvorwahl +${n}?`],
      right: (x) => x[0], pool: rows.map((x) => x[0]), label: nameOf,
      ok: (x, c) => !(CALLING_SHARED[x[1]] ?? []).includes(c.id) && near(x[0], c) });
  }

  // ── geo.nickname / geo.nickname-rev ──
  {
    const near = nearFor("geo.nickname");
    lookup({ family: "geo.nickname", category: G, rows: COUNTRY_NICKNAMES, stem: (x) => x[3], diff: (x) => (C(x[3]).pop >= 60 ? "easy" : "medium"),
      text: (x) => [`Which country is known as “${x[0]}”?`, `¿Qué país es conocido como «${x[1]}»?`, `Welches Land ist als „${x[2]}“ bekannt?`],
      right: (x) => C(x[3]), pool: known, label: nameOf, ok: (x, c) => !(x[4] ?? []).includes(c.id) && near(C(x[3]), c) });
    lookup({ family: "geo.nickname-rev", category: G, rows: COUNTRY_NICKNAMES, stem: (x) => x[3], diff: (x) => (C(x[3]).pop >= 60 ? "easy" : "medium"),
      text: (x) => { const c = C(x[3]); return [`Which nickname belongs to ${c.enSubj}?`, `¿Qué apodo tiene ${c.esSubj}?`, `Welcher Beiname gehört ${deZu(c)}?`]; },
      right: (x) => x, pool: COUNTRY_NICKNAMES, label: (x) => strip([x[0], x[1], x[2]]), ok: (x, o) => o[3] !== x[3] && !(o[4] ?? []).includes(x[3]) });
  }

  // ── geo.flag / geo.flag-rev ──
  {
    const EASY_FLAGS = new Set(["canada", "japan", "usa", "brazil", "mexico", "south_korea", "turkey", "india"]);
    const near = nearFor("geo.flag");
    lookup({ family: "geo.flag", category: G, rows: FLAGS, stem: (x) => x[3], diff: (x) => (EASY_FLAGS.has(x[3]) ? "medium" : "hard"),
      text: (x) => [`Which country's flag shows ${x[0]}?`, `¿Qué país tiene ${x[1]} en su bandera?`, `Welches Land hat ${x[2]} auf seiner Flagge?`],
      right: (x) => C(x[3]), pool: COUNTRIES, label: nameOf, ok: (x, c) => !(x[4] ?? []).includes(c.id) && near(C(x[3]), c) });
    lookup({ family: "geo.flag-rev", category: G, rows: FLAGS, stem: (x) => x[3], diff: (x) => (EASY_FLAGS.has(x[3]) ? "medium" : "hard"),
      text: (x) => { const c = C(x[3]); return [`What does the flag of ${c.enSubj} show?`, `¿Qué muestra la bandera ${c.esDe}?`, `Was zeigt die Flagge ${c.deVon}?`]; },
      right: (x) => x, pool: FLAGS, label: (x) => [cap(x[0]), cap(x[1]), cap(x[2])], ok: (x, o) => o[3] !== x[3] && !(o[4] ?? []).includes(x[3]) && !(x[4] ?? []).includes(o[3]) });
  }

  // ── geo.lake-country / geo.lake-rev ──
  {
    const FAMOUS = new Set(["Lake Baikal", "Loch Ness", "Lake Titicaca", "Lake Victoria", "Lake Como", "Lake Garda", "Lake Balaton", "Lake Superior", "Lake Tahoe"]);
    const near = nearFor("geo.lake-country");
    lookup({ family: "geo.lake-country", category: G, rows: LAKES, stem: (x) => x[0], diff: (x) => (FAMOUS.has(x[0]) ? "medium" : "hard"),
      text: (x) => [`In which country is ${x[0]}?`, `¿En qué país está ${x[1]}?`, `In welchem Land liegt ${x[2]}?`],
      right: (x) => C(x[3]), pool: known, label: nameOf, ok: (x, c) => !(x[4] ?? []).includes(c.id) && near(C(x[3]), c) });
    which({ family: "geo.lake-rev", category: G, rows: LAKES, per: 6, diff: "hard", key: (x) => x[3], label: (x) => strip([x[0], x[1], x[2]]),
      text: (k) => { const c = C(k); return [`Which of these lakes is in ${c.enSubj}?`, `¿Cuál de estos lagos está en ${c.esSubj}?`, `Welcher dieser Seen liegt ${c.deIn}?`]; },
      ok: (_, cand, k) => !(cand[4] ?? []).includes(k) });
  }

  // ── comparisons: geo.lake-largest, geo.river-longest, geo.island-largest, geo.peak-highest, geo.most-neighbours ──
  extremeOf({ family: "geo.lake-largest", category: G, n: 160, rows: LAKE_AREA, max: true, minRatio: 1.3,
    text: ["Which of these lakes has the largest surface area?", "¿Cuál de estos lagos tiene la mayor superficie?", "Welcher dieser Seen hat die größte Fläche?"] });
  extremeOf({ family: "geo.river-longest", category: G, n: 200, rows: RIVER_LENGTH, max: true, minRatio: 1.2,
    text: ["Which of these rivers is the longest?", "¿Cuál de estos ríos es el más largo?", "Welcher dieser Flüsse ist der längste?"] });
  extremeOf({ family: "geo.island-largest", category: G, n: 180, rows: ISLAND_AREA, max: true, minRatio: 1.25,
    text: ["Which of these islands is the largest?", "¿Cuál de estas islas es la más grande?", "Welche dieser Inseln ist die größte?"] });
  extremeOf({ family: "geo.island-largest", category: G, n: 60, rows: ISLAND_AREA, max: false, minRatio: 1.25,
    text: ["Which of these islands is the smallest?", "¿Cuál de estas islas es la más pequeña?", "Welche dieser Inseln ist die kleinste?"] });
  extremeOf({ family: "geo.peak-highest", category: G, n: 200, rows: PEAK_HEIGHT, max: true, minRatio: 1.1,
    text: ["Which of these mountains is the highest?", "¿Cuál de estas montañas es la más alta?", "Welcher dieser Berge ist der höchste?"] });
  extremeOf({ family: "geo.most-neighbours", category: G, n: 200, minGap: 2, max: true,
    rows: Object.entries(NEIGHBOUR_COUNT).map(([id, n]) => { const c = C(id); return [c.name[0], c.name[1], c.name[2], n] as [string, string, string, number]; }),
    text: ["Which of these countries shares a land border with the most other countries?", "¿Cuál de estos países tiene frontera terrestre con más países?", "Welches dieser Länder hat an Land die meisten Nachbarstaaten?"] });

  // ── geo.waterfall ──
  {
    const FAMOUS = new Set(["Niagara Falls", "Victoria Falls", "Iguazú Falls", "Angel Falls"]);
    const near = nearFor("geo.waterfall");
    lookup({ family: "geo.waterfall", category: G, rows: WATERFALLS, stem: (x) => x[0], diff: (x) => (FAMOUS.has(x[0]) ? "medium" : "hard"),
      text: (x) => [`Which country is home to ${x[0]}?`, `¿En qué país puedes ver ${x[1]}?`, `In welchem Land kann man ${x[2]} sehen?`],
      right: (x) => C(x[3]), pool: known, label: nameOf, ok: (x, c) => !(x[4] ?? []).includes(c.id) && near(C(x[3]), c) });
  }

  // ── geo.strait-connects / geo.strait-sides ──
  {
    const pair = (a: L, b: L): L => {
      const y = /^(i|hi)[^aeou]/i.test(b[1]) ? "e" : "y";
      return [cap(`${a[0]} and ${b[0]}`), cap(`${a[1]} ${y} ${b[1]}`), cap(`${a[2]} und ${b[2]}`)];
    };
    const links = STRAIT_LINKS.map((x) => [x, pair(WATERS[x[4]], WATERS[x[5]])] as const);
    const FAMOUS = new Set(["the Strait of Gibraltar", "the Suez Canal", "the Panama Canal", "the Bosphorus", "the Bering Strait"]);
    lookup({ family: "geo.strait-connects", category: G, rows: links, stem: ([x]) => x[0], diff: ([x]) => (FAMOUS.has(x[0]) ? "medium" : "hard"),
      text: ([x]) => [`Which two bodies of water ${x[3] ? "do" : "does"} ${x[0]} connect?`, `¿Qué dos masas de agua ${x[3] ? "unen" : "une"} ${x[1]}?`, `Welche zwei Gewässer ${x[3] ? "verbinden" : "verbindet"} ${x[2]}?`],
      right: ([, p]) => p, pool: [...new Map(links.map(([, p]) => [p[0], p])).values()], label: (p) => p });
    const side = (x: string | L) => (typeof x === "string" ? { en: C(x).enSubj, es: C(x).name[1], de: C(x).deSubj } : { en: x[0], es: x[1], de: x[2] });
    const sides = STRAIT_SIDES.map((x) => {
      const a = side(x[3]); const b = side(x[4]);
      return [x, pair([a.en, a.es, a.de], [b.en, b.es, b.de])] as const;
    });
    lookup({ family: "geo.strait-sides", category: G, rows: sides, stem: ([x]) => x[0], diff: ([x]) => (["the Strait of Gibraltar", "the English Channel", "the Bering Strait"].includes(x[0]) ? "medium" : "hard"),
      text: ([x]) => [`Which two countries face each other across ${x[0]}?`, `¿Qué dos países separa ${x[1]}?`, `Welche zwei Länder liegen sich an ${x[2]} gegenüber?`.replace("an dem ", "am ")],
      right: ([, p]) => p, pool: sides.map(([, p]) => p), label: (p) => p });
  }

  // ── geo.is-volcano ──
  yesNoL("geo.is-volcano", "yes", 160, VOLCANOES, NOT_VOLCANOES, "medium",
    ["Which of these mountains is a volcano?", "¿Cuál de estas montañas es un volcán?", "Welcher dieser Berge ist ein Vulkan?"]);
  yesNoL("geo.is-volcano", "no", 100, NOT_VOLCANOES, VOLCANOES, "hard",
    ["Which of these mountains is NOT a volcano?", "¿Cuál de estas montañas NO es un volcán?", "Welcher dieser Berge ist KEIN Vulkan?"]);

  // ── geo.continent-peak ──
  {
    const r = rngFor("geo.continent-peak");
    for (const [en, es, de, peak, excl] of CONTINENT_PEAKS) {
      for (let v = 0; v < 4; v++) {
        const ws = sample(r, PEAK_POOL, 3, (p) => p[0] !== peak[0] && !excl.some((e) => e[0] === p[0]));
        if (ws) add("geo.continent-peak", en, G, ["Asia", "Africa"].includes(en) ? "easy" : "medium",
          [`What is the highest mountain in ${en}?`, `¿Cuál es la montaña más alta ${es}?`, `Was ist der höchste Berg ${de}?`], peak, ws);
      }
    }
    const CONTS: Record<string, L> = { Africa: CONTINENTS.AF, Asia: CONTINENTS.AS, "South America": CONTINENTS.SA, "North America": CONTINENTS.NA, Europe: CONTINENTS.EU, Antarctica: ["Antarctica", "Antártida", "Antarktis"] };
    for (const [en, , , peak] of CONTINENT_PEAKS) {
      if (!CONTS[en] || en === "Europe") continue; // Elbrus: Europe/Asia boundary is debated
      for (let v = 0; v < 3; v++) {
        const ws = sample(r, Object.keys(CONTS), 3, (k) => k !== en);
        if (ws) add("geo.continent-peak", en, G, ["Asia", "Africa"].includes(en) ? "easy" : "medium",
          [`${peak[0]} is the highest mountain of which continent?`, `${peak[1]}: ¿de qué continente es la montaña más alta?`, `${peak[2]} – der höchste Berg welches Kontinents?`],
          CONTS[en], ws.map((k) => CONTS[k]));
      }
    }
  }

  // ── geo.region-country / geo.region-rev ──
  {
    const BIG = new Set(["germany", "france", "italy", "spain", "uk", "usa"]);
    const HARD = new Set(["Masuria", "Carinthia", "Styria", "Moravia", "Dalmatia", "the Alentejo", "KwaZulu-Natal", "Jalisco", "Bahia", "Sichuan", "Kerala", "Wallonia", "Westphalia", "Extremadura"]);
    const near = nearFor("geo.region-country");
    lookup({ family: "geo.region-country", category: G, rows: REGIONS, stem: (x) => x[0], diff: (x) => (HARD.has(x[0]) ? "hard" : BIG.has(x[3]) ? "easy" : "medium"),
      text: (x) => [`Which country does ${x[0]} belong to?`, `¿A qué país pertenece ${x[1]}?`, `Zu welchem Land gehört ${x[2]}?`],
      right: (x) => C(x[3]), pool: known, label: nameOf, ok: (x, c) => !(x[4] ?? []).includes(c.id) && near(C(x[3]), c) });
    which({ family: "geo.region-rev", category: G, rows: REGIONS, per: 8, diff: "medium", key: (x) => x[3], label: (x) => strip([x[0], x[1], x[2]]),
      text: (k) => { const c = C(k); return [`Which of these regions is in ${c.enSubj}?`, `¿Cuál de estas regiones está en ${c.esSubj}?`, `Welche dieser Regionen liegt ${c.deIn}?`]; },
      ok: (_, cand, k) => !(cand[4] ?? []).includes(k) });
  }

  // ── geo.place-city / geo.place-rev / geo.bridge-city ──
  {
    const placeCities = [...new Set(PLACES.map((x) => x[3]))];
    const EASY = new Set(["Times Square", "Red Square", "the Champs-Élysées", "Hollywood Boulevard", "Wall Street", "Trafalgar Square", "St Mark's Square", "La Rambla"]);
    lookup({ family: "geo.place-city", category: G, rows: PLACES, stem: (x) => x[0], diff: (x) => (EASY.has(x[0]) ? "easy" : "medium"),
      text: (x) => [`In which city is ${x[0]}?`, `¿En qué ciudad está ${x[1]}?`, `In welcher Stadt befindet sich ${x[2]}?`],
      right: (x) => x[3], pool: placeCities, label: (k) => CITY[k] });
    which({ family: "geo.place-rev", category: G, rows: PLACES, per: 6, diff: "medium", key: (x) => x[3], label: (x) => strip([x[0], x[1], x[2]]),
      text: (k) => [`Which of these squares or streets is in ${CITY[k][0]}?`, `¿Cuál de estas plazas o calles está en ${CITY[k][1]}?`, `Welcher dieser Plätze bzw. welche dieser Straßen liegt in ${CITY[k][2]}?`] });
    const bridgeCities = [...new Set([...BRIDGES.map((x) => x[3]), "london", "paris", "amsterdam", "vienna", "madrid", "munich"])];
    lookup({ family: "geo.bridge-city", category: G, rows: BRIDGES, stem: (x) => x[0],
      diff: (x) => (["the Golden Gate Bridge", "Tower Bridge", "the Brooklyn Bridge"].includes(x[0]) ? "easy" : "medium"),
      text: (x) => [`In which city is ${x[0]}?`, `¿En qué ciudad está ${x[1]}?`, `In welcher Stadt befindet sich ${x[2]}?`],
      right: (x) => x[3], pool: bridgeCities, label: (k) => CITY[k] });
  }

  // ── geo.city-nickname / geo.city-nickname-rev ──
  {
    const pool = [...new Set([...CITY_NICKNAMES.map((x) => x[3]), ...NICK_CITY_DECOYS])];
    const EASY = new Set(["nyc", "paris", "rome", "chicago", "vegas"]);
    lookup({ family: "geo.city-nickname", category: G, rows: CITY_NICKNAMES, stem: (x) => x[3], diff: (x) => (EASY.has(x[3]) ? "easy" : "medium"),
      text: (x) => [`Which city is nicknamed “${x[0]}”?`, `¿Qué ciudad es conocida como «${x[1]}»?`, `Welche Stadt trägt den Beinamen „${x[2]}“?`],
      right: (x) => x[3], pool, label: (k) => CITY[k], ok: (x, k) => !(x[4] ?? []).includes(k) });
    lookup({ family: "geo.city-nickname-rev", category: G, rows: CITY_NICKNAMES, stem: (x) => x[3], diff: (x) => (EASY.has(x[3]) ? "easy" : "medium"),
      text: (x) => { const c = CITY[x[3]]; return [`Which nickname belongs to ${c[0]}?`, `¿Qué apodo tiene ${c[1]}?`, `Welchen Beinamen trägt ${c[2]}?`]; },
      right: (x) => x, pool: CITY_NICKNAMES, label: (x) => strip([x[0], x[1], x[2]]), ok: (x, o) => o[3] !== x[3] && !(o[4] ?? []).includes(x[3]) && !(x[4] ?? []).includes(o[3]) });
  }

  // ── geo.airport-city / geo.airport-rev ──
  {
    const EASY = new Set(["Heathrow", "JFK", "Charles de Gaulle"]);
    const MED = new Set(["Gatwick", "Orly", "Schiphol", "Narita", "Haneda", "Changi", "O'Hare", "Fiumicino", "Barajas", "El Prat", "Malpensa", "John Lennon"]);
    const d = (n: string): Difficulty => (EASY.has(n) ? "easy" : MED.has(n) ? "medium" : "hard");
    const cities = [...new Set(AIRPORTS.map((x) => x[1]))];
    lookup({ family: "geo.airport-city", category: G, rows: AIRPORTS, stem: (x) => x[0], diff: (x) => d(x[0]),
      text: ([n, , person]) => [`${n} Airport serves which city?`, `¿A qué ciudad pertenece el aeropuerto ${person ? "" : "de "}${n}?`, `Zu welcher Stadt gehört der Flughafen ${n}?`],
      right: (x) => x[1], pool: cities, label: (k) => CITY[k] });
    which({ family: "geo.airport-rev", category: G, rows: AIRPORTS, per: 5, diff: (k) => (["london", "paris", "nyc"].includes(k) ? "easy" : "medium"),
      key: (x) => x[1], label: (x) => same(x[0]),
      text: (k) => [`Which of these airports serves ${CITY[k][0]}?`, `¿Cuál de estos aeropuertos da servicio a ${CITY[k][1]}?`, `Welcher dieser Flughäfen gehört zu ${CITY[k][2]}?`] });
  }

  // ── geo.old-city-name / geo.old-country-name ──
  {
    const pool = [...OLD_CITY_NAMES.map((x) => x[3]), ...OLD_CITY_DECOYS];
    lookup({ family: "geo.old-city-name", category: G, rows: OLD_CITY_NAMES, stem: (x) => x[3][0],
      diff: (x) => (["Constantinople", "Leningrad", "New Amsterdam", "Saigon"].includes(x[0]) ? "medium" : "hard"),
      text: (x) => [`Which city was formerly called ${x[0]}?`, `¿Qué ciudad se llamaba antes ${x[1]}?`, `Welche Stadt hieß früher ${x[2]}?`],
      right: (x) => x[3], pool, label: (l) => l });
    const near = nearFor("geo.old-country-name");
    lookup({ family: "geo.old-country-name", category: G, rows: OLD_COUNTRY_NAMES, stem: (x) => x[3],
      diff: (x) => (["Siam", "Persia", "Ceylon"].includes(x[0]) ? "medium" : "hard"),
      text: (x) => [`Which country was formerly known as ${x[0]}?`, `¿Qué país se conocía antes como ${x[1]}?`, `Welches Land hieß früher ${x[2]}?`],
      right: (x) => C(x[3]), pool: known, label: nameOf, ok: (x, c) => !(x[4] ?? []).includes(c.id) && near(C(x[3]), c) });
  }

  // ── geo.former-capital ──
  {
    const r = rngFor("geo.former-capital");
    for (const [id, old, decoys, custom] of FORMER_CAPITALS) {
      const c = C(id);
      const now = c.capital!;
      const text: L = custom ?? [`Before ${now[0]}, which city was the capital of ${c.enSubj}?`, `Antes de ${now[1]}, ¿qué ciudad era la capital ${c.esDe}?`,
        `Welche Stadt war vor ${now[2]} die Hauptstadt ${DE_GEN[id]}?`];
      for (let v = 0; v < 3; v++) {
        const ws = sample(r, decoys, 3);
        if (ws) add("geo.former-capital", id, G, ["germany", "brazil", "turkey", "usa"].includes(id) ? "medium" : "hard", text, old, ws);
      }
    }
  }

  // ── capitals of states / provinces / regions (forward + reverse) ──
  type CapRow = [string, L, L[], boolean?];
  const subCapitals = (o: { fam: string; names: Record<string, L>; rows: CapRow[]; extra?: L[]; easy?: boolean;
    text: (n: L) => L; rev: (c: L) => L; label?: (n: L) => L }) => {
    const r = rngFor(o.fam);
    const label = o.label ?? ((n: L) => n);
    const allCaps = [...o.rows.map((x) => x[1]), ...(o.extra ?? [])];
    for (const [key, capital, decoys, famous] of o.rows) {
      const d: Difficulty = famous ? (o.easy ? "easy" : "medium") : "hard";
      for (let v = 0; v < 3; v++) {
        const k = Math.min(decoys.length, 1 + Math.floor(r() * 2));
        const ds = sample(r, decoys, k) ?? [];
        const rest = sample(r, allCaps, 3 - ds.length, (x) => x[0] !== capital[0] && !ds.some((y) => y[0] === x[0]));
        if (rest) add(o.fam, key, G, d, o.text(o.names[key]), capital, [...ds, ...rest]);
        const ws = sample(r, Object.keys(o.names), 3, (x) => x !== key);
        if (ws) add(`${o.fam}-rev`, key, G, d, o.rev(capital), label(o.names[key]), ws.map((x) => label(o.names[x])));
      }
    }
  };
  subCapitals({ fam: "geo.us-capital", names: US_STATES, rows: US_CAPITALS,
    text: (n) => [`What is the capital of the US state of ${n[0]}?`, `¿Cuál es la capital del estado de ${n[1]} (EE. UU.)?`, `Was ist die Hauptstadt des US-Bundesstaats ${n[2]}?`],
    rev: (c) => [`${c[0]} is the capital of which US state?`, `¿De qué estado de EE. UU. es capital ${c[1]}?`, `${c[2]} ist die Hauptstadt welches US-Bundesstaats?`] });
  subCapitals({ fam: "geo.de-capital", names: DE_STATES, rows: DE_CAPITALS,
    text: (n) => [`What is the capital of the German state of ${n[0]}?`, `¿Cuál es la capital del estado federado alemán de ${n[1]}?`, `Was ist die Landeshauptstadt des Bundeslandes ${n[2]}?`],
    rev: (c) => [`${c[0]} is the capital of which German state?`, `¿De qué estado federado alemán es capital ${c[1]}?`, `${c[2]} ist die Landeshauptstadt welches Bundeslandes?`] });
  subCapitals({ fam: "geo.es-capital", names: ES_REGIONS, rows: ES_CAPITALS.filter((x) => x[0] !== "vc").map((x) => [x[0], x[1], x[2], ["an", "ct", "ga", "pv"].includes(x[0])] as CapRow),
    text: (n) => [`What is the capital of the Spanish region of ${n[0]}?`, `¿Cuál es la capital ${esDe(n[1])} (España)?`, `Was ist die Hauptstadt der spanischen Region ${n[2]}?`],
    rev: (c) => [`${c[0]} is the capital of which Spanish region?`, `¿De qué comunidad autónoma es capital ${c[1]}?`, `${c[2]} ist die Hauptstadt welcher spanischen Region?`], label: strip });
  subCapitals({ fam: "geo.it-capital", names: IT_REGIONS, rows: IT_CAPITALS, easy: true,
    text: (n) => [`What is the capital of the Italian region of ${n[0]}?`, `¿Cuál es la capital ${esDe(n[1])} (Italia)?`, `Was ist die Hauptstadt der italienischen Region ${n[2]}?`],
    rev: (c) => [`${c[0]} is the capital of which Italian region?`, `¿De qué región italiana es capital ${c[1]}?`, `${c[2]} ist die Hauptstadt welcher italienischen Region?`], label: strip });
  subCapitals({ fam: "geo.au-capital", names: AU_STATES, rows: AU_CAPITALS, extra: AU_EXTRA,
    text: (n) => [`What is the capital of the Australian state of ${n[0]}?`, `¿Cuál es la capital del estado australiano de ${n[1]}?`, `Was ist die Hauptstadt des australischen Bundesstaats ${n[2]}?`],
    rev: (c) => [`${c[0]} is the capital of which Australian state?`, `¿De qué estado australiano es capital ${c[1]}?`, `${c[2]} ist die Hauptstadt welches australischen Bundesstaats?`] });
  subCapitals({ fam: "geo.ca-capital", names: CA_PROVINCES, rows: CA_CAPITALS, extra: [["Montreal", "Montreal", "Montreal"], ["Quebec City", "Ciudad de Quebec", "Québec (Stadt)"]],
    text: (n) => [`What is the capital of the Canadian province of ${n[0]}?`, `¿Cuál es la capital de la provincia canadiense de ${n[1]}?`, `Was ist die Hauptstadt der kanadischen Provinz ${n[2]}?`],
    rev: (c) => [`${c[0]} is the capital of which Canadian province?`, `¿De qué provincia canadiense es capital ${c[1]}?`, `${c[2]} ist die Hauptstadt welcher kanadischen Provinz?`] });
  subCapitals({ fam: "geo.br-capital", names: BR_STATES, rows: BR_CAPITALS,
    text: (n) => [`What is the capital of the Brazilian state of ${n[0]}?`, `¿Cuál es la capital del estado brasileño de ${n[1]}?`, `Was ist die Hauptstadt des brasilianischen Bundesstaats ${n[2]}?`],
    rev: (c) => [`${c[0]} is the capital of which Brazilian state?`, `¿De qué estado brasileño es capital ${c[1]}?`, `${c[2]} ist die Hauptstadt welches brasilianischen Bundesstaats?`] });
  subCapitals({ fam: "geo.mx-capital", names: MX_STATES, rows: MX_CAPITALS,
    text: (n) => [`What is the capital of the Mexican state of ${n[0]}?`, `¿Cuál es la capital del estado mexicano de ${n[1]}?`, `Was ist die Hauptstadt des mexikanischen Bundesstaats ${n[2]}?`],
    rev: (c) => [`${c[0]} is the capital of which Mexican state?`, `¿De qué estado mexicano es capital ${c[1]}?`, `${c[2]} ist die Hauptstadt welches mexikanischen Bundesstaats?`] });

  // ── which state / region is a city in ──
  const cityIn = (fam: string, rows: [L, string][], names: Record<string, L>, text: (c: L) => L, label: (n: L) => L = (n) => n) =>
    lookup({ family: fam, category: G, rows, stem: (x) => x[0][0], diff: () => "medium", text: (x) => text(x[0]),
      right: (x) => x[1], pool: Object.keys(names), label: (k) => label(names[k]) });
  cityIn("geo.us-city-state", US_CITIES, US_STATES,
    (c) => [`In which US state is ${c[0]}?`, `¿En qué estado de EE. UU. está ${c[1]}?`, `In welchem US-Bundesstaat liegt ${c[2]}?`]);
  which({ family: "geo.us-city-state-rev", category: G, rows: US_CITIES, per: 6, diff: "medium", key: (x) => x[1], label: (x) => x[0],
    text: (k) => [`Which of these cities is in the US state of ${US_STATES[k][0]}?`, `¿Cuál de estas ciudades está en el estado de ${US_STATES[k][1]} (EE. UU.)?`, `Welche dieser Städte liegt im US-Bundesstaat ${US_STATES[k][2]}?`] });
  cityIn("geo.de-city-state", DE_CITIES, DE_STATES,
    (c) => [`In which German state is ${c[0]}?`, `¿En qué estado federado alemán está ${c[1]}?`, `In welchem Bundesland liegt ${c[2]}?`]);
  cityIn("geo.es-city-region", ES_CITIES, ES_REGIONS,
    (c) => [`In which Spanish region is ${c[0]}?`, `¿En qué comunidad autónoma está ${c[1]}?`, `In welcher spanischen Region liegt ${c[2]}?`], strip);
  cityIn("geo.it-city-region", IT_CITIES, IT_REGIONS,
    (c) => [`In which Italian region is ${c[0]}?`, `¿En qué región italiana está ${c[1]}?`, `In welcher italienischen Region liegt ${c[2]}?`], strip);

  // ── geo.us-nickname ──
  {
    const EASY = new Set(["Sunshine State", "Lone Star State", "Golden State", "Empire State", "Aloha State", "Grand Canyon State"]);
    lookup({ family: "geo.us-nickname", category: G, rows: US_NICKNAMES, stem: (x) => x[1], diff: (x) => (EASY.has(x[0]) ? "medium" : "hard"),
      text: (x) => [`Which US state is nicknamed the “${x[0]}”?`, `¿Qué estado de EE. UU. tiene el apodo «${x[0]}»?`, `Welcher US-Bundesstaat trägt den Spitznamen „${x[0]}“?`],
      right: (x) => x[1], pool: Object.keys(US_STATES), label: (k) => US_STATES[k] });
  }
}
