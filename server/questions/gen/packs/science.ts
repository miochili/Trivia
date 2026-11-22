import type { L, PackApi } from "../generate";
import type { Difficulty } from "../../../../src/shared/types";
import { PLANETS } from "../data/science";
import {
  ACIDIC, ACRONYMS, ALKALINE, ALLOYS, ASTRO, BODY_NUMBERS, BONES, BRANCHES, CELL_PARTS, CODE, COLOURS, COMPONENTS, COMPOSITIONS,
  CONDUCTORS, EM, EQUATIONS, FORMULAS, FOSSIL, GAS_FACTS, GASES, GATES, INSTRUMENTS, INSULATORS, LAWS, LIGHT_COLOURS, MAGNETIC, MOHS,
  MOONS, NEUTRAL, NON_MAGNETIC, NUCLEAR, OTHER_UNITS, PHASES, PLANET_DE_ACC, PLANET_FACTS, POLYGONS, PREFIXES, RENEWABLE,
  SEMICONDUCTORS, STATES, UNIT_PEOPLE, VITAMIN_KEYS, VITAMINS, type Fact,
} from "./science-data";

type D = Difficulty;
type Rng = () => number;
const SCI = "science" as const;

// ── number formatting: en 12,345.6 · es 12 345,6 · de 12.345,6 (4-digit numbers unseparated) ──
const fmt = (n: number, k: number): string => {
  const x = Number(n.toPrecision(12));
  const [i0, f] = Math.abs(x).toString().split(".");
  const i = i0.length > 4 ? i0.replace(/\B(?=(\d{3})+(?!\d))/g, [",", " ", "."][k]) : i0;
  return (x < 0 ? "−" : "") + (f ? `${i}${k === 0 ? "." : ","}${f}` : i);
};
const num = (n: number, unit = ""): L => [0, 1, 2].map((k) => (unit ? `${fmt(n, k)} ${unit}` : fmt(n, k))) as L;
const SUP: Record<string, string> = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
const pow10 = (e: number) => `10${String(e).split("").map((c) => SUP[c]).join("")}`;
const sciL = (m: number, e: number, unit = ""): L => num(m).map((s) => `${s} × ${pow10(e)}${unit ? ` ${unit}` : ""}`) as L;
const clean = (x: number) => Number(x.toPrecision(10));

/** Extra question types for the "science" category. */
export default function pack(api: PackApi) {
  const { add, lookup, which, groupYesNo, rngFor, pick, sample, same, cap, low, capL } = api;

  /** numeric question: 3 wrong answers picked from `cands` (deduplicated, never equal to the answer) */
  const numQ = (family: string, stem: string, d: D, text: L, right: number, cands: number[], label: (n: number) => L, r: Rng, ok: (n: number) => boolean = () => true) => {
    const R = clean(right);
    const pool = [...new Set(cands.map(clean))].filter((x) => x !== R && Number.isFinite(x) && ok(x));
    const ws = sample(r, pool, 3);
    if (ws) add(family, stem, SCI, d, text, label(R), ws.map(label));
  };
  /** hand-written facts with a list of wrong answers; up to `variants` different option sets */
  const facts = (family: string, rows: Fact[], variants = 3) => {
    const r = rngFor(family);
    for (const [stem, q, right, wrong, d] of rows)
      for (let v = 0; v < variants; v++) add(family, stem, SCI, d, q, right, sample(r, wrong, 3)!);
  };
  const clashes = <T extends { id: string; clash?: string[] }>(a: T, b: T) => !!(a.clash?.includes(b.id) || b.clash?.includes(a.id));
  const planetL = (i: number): L => [PLANETS[i][0], PLANETS[i][1], PLANETS[i][2]];
  const combos = <T>(a: T[], k: number): T[][] =>
    k === 0 ? [[]] : a.flatMap((x, i) => combos(a.slice(i + 1), k - 1).map((c) => [x, ...c]));

  // ═══ chemistry ═══
  lookup({ family: "sci.formula", category: SCI, rows: FORMULAS, stem: (x) => x[0], diff: (x) => x[2],
    text: (x) => [`What is the chemical formula of ${x[1][0]}?`, `¿Cuál es la fórmula química de esta sustancia: ${x[1][1]}?`, `Was ist die chemische Formel von ${x[1][2]}?`],
    right: (x) => x[0], pool: FORMULAS.map((f) => f[0]), label: same });
  lookup({ family: "sci.formula-rev", category: SCI, rows: FORMULAS, stem: (x) => x[0], diff: (x) => x[2],
    text: (x) => [`Which substance has the chemical formula ${x[0]}?`, `¿Qué sustancia tiene la fórmula química ${x[0]}?`, `Welcher Stoff hat die chemische Formel ${x[0]}?`],
    right: (x) => capL(x[1]), pool: FORMULAS.map((f) => capL(f[1])), label: (l) => l });

  lookup({ family: "sci.alloy", category: SCI, rows: ALLOYS, stem: (x) => x.id, diff: (x) => x.d,
    text: (x) => [`What is ${x.en} mainly made of?`, `¿Qué elementos componen principalmente esta aleación: ${x.id === "invar" ? "Invar" : low(x.label[1])}?`, `Woraus besteht die Legierung „${x.label[2]}“ hauptsächlich?`],
    right: (x) => x.comp, pool: Object.keys(COMPOSITIONS), label: (k) => COMPOSITIONS[k], ok: (x, k) => !(x.clash ?? []).includes(k) });
  which({ family: "sci.alloy-rev", category: SCI, rows: ALLOYS, per: 4, diff: (k) => (["cu_sn", "cu_zn", "fe_c"].includes(k) ? "medium" : "hard"), key: (x) => x.comp, label: (x) => x.label,
    text: (k) => [`Which alloy is mainly made of ${low(COMPOSITIONS[k][0])}?`, `¿Qué aleación está formada principalmente por ${low(COMPOSITIONS[k][1])}?`, `Welche Legierung besteht hauptsächlich aus ${COMPOSITIONS[k][2]}?`],
    ok: (_, c, k) => !(c.clash ?? []).includes(k) });

  lookup({ family: "sci.gas", category: SCI, rows: GAS_FACTS, stem: (x) => x[0], diff: (x) => x[4], text: (x) => x[1],
    right: (x) => x[2], pool: Object.keys(GASES), label: (k) => GASES[k], ok: (x, k) => !x[3].includes(k) });

  groupYesNo("sci.acidic", SCI, 50, ACIDIC, [...ALKALINE, ...NEUTRAL], "easy",
    ["Which of these is acidic?", "¿Cuál de estas sustancias es ácida?", "Welcher dieser Stoffe ist sauer?"]);
  groupYesNo("sci.alkaline", SCI, 50, ALKALINE, [...ACIDIC, ...NEUTRAL], "medium",
    ["Which of these is alkaline (basic)?", "¿Cuál de estas sustancias es básica (alcalina)?", "Welcher dieser Stoffe ist basisch (alkalisch)?"]);

  // ═══ materials ═══
  {
    const r = rngFor("sci.mohs");
    const rows = MOHS;
    for (const max of [true, false]) {
      const seenSets = new Set<string>();
      for (let t = 0; seenSets.size < 60 && t < 2000; t++) {
        const set = sample(r, rows, 4)!;
        const s = [...set].sort((a, b) => (max ? b[3] - a[3] : a[3] - b[3]));
        const best = s[0];
        const d: D = best[3] === 10 || best[3] === 1 ? "easy" : Math.abs(best[3] - s[1][3]) === 1 ? "hard" : "medium";
        const text: L = max
          ? ["Which of these minerals is the hardest?", "¿Cuál de estos minerales es el más duro?", "Welches dieser Minerale ist am härtesten?"]
          : ["Which of these minerals is the softest?", "¿Cuál de estos minerales es el más blando?", "Welches dieser Minerale ist am weichsten?"];
        const key = s.map((x) => x[0]).sort().join("+");
        if (seenSets.has(key)) continue;
        seenSets.add(key);
        add("sci.mohs", `${max ? "max" : "min"}:${key}`, SCI, d, text, [best[0], best[1], best[2]], s.slice(1).map((x) => [x[0], x[1], x[2]] as L));
      }
    }
  }
  lookup({ family: "sci.mohs-value", category: SCI, rows: MOHS, stem: (x) => x[0], diff: (x) => (x[3] === 10 || x[3] === 1 ? "medium" : "hard"),
    text: (x) => [`On the Mohs scale, what hardness does ${low(x[0])} have?`, `En la escala de Mohs, ¿qué dureza tiene este mineral: ${low(x[1])}?`, `Welche Härte hat ${x[2]} auf der Mohs-Skala?`],
    right: (x) => x[3], pool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], label: (n) => same(String(n)) });

  groupYesNo("sci.conductor", SCI, 60, CONDUCTORS, INSULATORS, "easy",
    ["Which of these is a good electrical conductor?", "¿Cuál de estos materiales es un buen conductor eléctrico?", "Welcher dieser Stoffe leitet elektrischen Strom gut?"]);
  groupYesNo("sci.insulator", SCI, 60, INSULATORS, CONDUCTORS, "easy",
    ["Which of these is an electrical insulator?", "¿Cuál de estos materiales es un aislante eléctrico?", "Welcher dieser Stoffe ist ein elektrischer Isolator?"]);
  groupYesNo("sci.semiconductor", SCI, 50, SEMICONDUCTORS, [...CONDUCTORS, ...INSULATORS], "medium",
    ["Which of these materials is a semiconductor?", "¿Cuál de estos materiales es un semiconductor?", "Welcher dieser Stoffe ist ein Halbleiter?"]);
  groupYesNo("sci.magnetic", SCI, 50, MAGNETIC, NON_MAGNETIC, "medium",
    ["Which of these metals is attracted by a magnet?", "¿Cuál de estos metales es atraído por un imán?", "Welches dieser Metalle wird von einem Magneten angezogen?"]);

  groupYesNo("sci.renewable", SCI, 50, RENEWABLE, [...FOSSIL, NUCLEAR], "easy",
    ["Which of these is a renewable energy source?", "¿Cuál de estas es una fuente de energía renovable?", "Welche dieser Energiequellen ist erneuerbar?"]);
  groupYesNo("sci.non-renewable", SCI, 40, [...FOSSIL, NUCLEAR], RENEWABLE, "easy",
    ["Which of these energy sources is NOT renewable?", "¿Cuál de estas fuentes de energía NO es renovable?", "Welche dieser Energiequellen ist NICHT erneuerbar?"]);
  groupYesNo("sci.fossil", SCI, 30, FOSSIL, [...RENEWABLE, NUCLEAR], "easy",
    ["Which of these energy sources is a fossil fuel?", "¿Cuál de estas fuentes de energía es un combustible fósil?", "Welche dieser Energiequellen ist ein fossiler Brennstoff?"]);

  // ═══ physics ═══
  lookup({ family: "sci.instrument", category: SCI, rows: INSTRUMENTS, stem: (x) => x.id, diff: (x) => x.d,
    text: (x) => [`What does ${/^[aeiou]/.test(x.name[0]) ? "an" : "a"} ${x.name[0]} measure?`, `¿Qué mide un ${x.name[1]}?`, `Was misst ein ${x.name[2]}?`],
    right: (x) => x, pool: INSTRUMENTS, label: (x) => x.what, ok: clashFree });
  lookup({ family: "sci.instrument-rev", category: SCI, rows: INSTRUMENTS, stem: (x) => x.id, diff: (x) => x.d,
    text: (x) => [`Which instrument ${x.verb[0]}?`, `¿Qué instrumento ${x.verb[1]}?`, `Welches Gerät ${x.verb[2]}?`],
    right: (x) => x, pool: INSTRUMENTS, label: (x) => capL(x.name), ok: clashFree });
  function clashFree<T extends { id: string; clash?: string[] }>(a: T, b: T) { return !clashes(a, b); }

  lookup({ family: "sci.equation", category: SCI, rows: EQUATIONS, stem: (x) => x.id, diff: (x) => x.d,
    text: (x) => [`Which quantity is calculated with ${x.f[0]}?`, `¿Qué magnitud se calcula con ${x.f[1]}?`, `Welche Größe berechnet man mit ${x.f[2]}?`],
    right: (x) => x, pool: EQUATIONS, label: (x) => x.q, ok: clashFree });

  lookup({ family: "sci.law", category: SCI, rows: LAWS, variants: 4, stem: (x) => x.id, diff: (x) => x.d,
    text: (x) => {
      const s = x.says.map((t) => t.replace(/\.$/, ""));
      return [`Which law or principle states: “${s[0]}”?`, `¿Qué ley o principio dice: «${s[1]}»?`, `Welches Gesetz bzw. Prinzip besagt: „${s[2]}“?`];
    },
    right: (x) => x, pool: LAWS, label: (x) => x.label, ok: clashFree });

  // units named after people / unit symbols
  const persons = UNIT_PEOPLE.map((u) => u.who);
  lookup({ family: "sci.unit-person", category: SCI, rows: UNIT_PEOPLE, stem: (x) => x.who, diff: (x) => x.d,
    text: (x) => [`The SI unit of ${x.qty[0]} is named after which person?`, `¿En honor de quién se nombró la unidad del SI de esta magnitud: ${x.qty[1]}?`, `Nach wem ist die SI-Einheit der Größe „${x.qty[2]}“ benannt?`],
    right: (x) => x.who, pool: persons, label: same });
  lookup({ family: "sci.unit-person-rev", category: SCI, rows: UNIT_PEOPLE, stem: (x) => x.who, diff: (x) => x.d,
    text: (x) => [`Which quantity has an SI unit named after ${x.who}?`, `¿Qué magnitud tiene una unidad del SI con el nombre de ${x.who}?`, `Welche Größe hat eine SI-Einheit, die nach ${x.who} benannt ist?`],
    right: (x) => capL(x.qty), pool: UNIT_PEOPLE.map((u) => capL(u.qty)), label: (l) => l });
  const symRows = [...UNIT_PEOPLE.map((u) => ({ unit: u.unit, sym: u.sym, d: u.d })), ...OTHER_UNITS];
  lookup({ family: "sci.unit-symbol", category: SCI, rows: symRows, stem: (x) => x.sym, diff: (x) => x.d,
    text: (x) => [`Which unit has the symbol ${x.sym}?`, `¿Qué unidad tiene el símbolo ${x.sym}?`, `Welche Einheit hat das Einheitenzeichen ${x.sym}?`],
    right: (x) => x.unit, pool: symRows.map((x) => x.unit), label: (l) => l });

  // SI prefixes
  lookup({ family: "sci.prefix", category: SCI, rows: PREFIXES, stem: (x) => x.sym, diff: (x) => x.d,
    text: (x) => [`What factor does the SI prefix “${x.name[0]}” stand for?`, `¿Qué factor representa el prefijo del SI «${x.name[1]}»?`, `Für welchen Faktor steht das SI-Präfix „${x.name[2]}“?`],
    right: (x) => x.exp, pool: PREFIXES.map((p) => p.exp), label: (e) => same(pow10(e)) });
  lookup({ family: "sci.prefix-rev", category: SCI, rows: PREFIXES, stem: (x) => x.sym, diff: (x) => x.d,
    text: (x) => [`Which SI prefix stands for the factor ${pow10(x.exp)}?`, `¿Qué prefijo del SI representa el factor ${pow10(x.exp)}?`, `Welches SI-Präfix steht für den Faktor ${pow10(x.exp)}?`],
    right: (x) => capL(x.name), pool: PREFIXES.map((p) => capL(p.name)), label: (l) => l });
  lookup({ family: "sci.prefix-symbol", category: SCI, rows: PREFIXES, stem: (x) => x.sym, diff: (x) => (x.d === "easy" ? "medium" : "hard"),
    text: (x) => [`What is the symbol of the SI prefix “${x.name[0]}”?`, `¿Cuál es el símbolo del prefijo del SI «${x.name[1]}»?`, `Welches Zeichen hat das SI-Präfix „${x.name[2]}“?`],
    right: (x) => x.sym, pool: PREFIXES.map((p) => p.sym), label: same });
  {
    const r = rngFor("sci.prefix-convert");
    const E: Record<string, number> = { "": 0, k: 3, M: 6, G: 9, m: -3, "µ": -6, n: -9, p: -12 };
    const CONV: [string, string, string][] = [
      ["k", "", "V"], ["", "m", "V"], ["m", "", "V"], ["", "m", "A"], ["m", "", "A"], ["µ", "m", "A"], ["k", "", "W"], ["", "k", "W"], ["M", "k", "W"],
      ["k", "", "Ω"], ["M", "k", "Ω"], ["", "k", "Ω"], ["µ", "n", "F"], ["n", "µ", "F"], ["p", "n", "F"], ["k", "", "Hz"], ["M", "k", "Hz"], ["G", "M", "Hz"],
      ["k", "", "m"], ["", "m", "m"], ["m", "", "m"], ["k", "", "g"], ["", "k", "g"], ["m", "", "g"],
    ];
    const VALS = [0.5, 1.5, 2, 2.2, 2.5, 3, 3.3, 4.7, 5, 6.8, 12, 15, 25, 47, 68, 100, 150, 220, 250, 330, 470, 750];
    for (let i = 0; i < 260; i++) {
      const [from, to, u] = pick(r, CONV);
      const v = pick(r, VALS);
      const d = E[from] - E[to];
      const res = clean(v * 10 ** d);
      if (res < 0.001 || res > 1e6) continue;
      const simple = [from, to].every((p) => p === "" || p === "k" || p === "m");
      const diff: D = simple && Number.isInteger(res) && Number.isInteger(v) ? "easy" : simple ? "medium" : "hard";
      numQ("sci.prefix-convert", `${v}${from}${u}>${to}${u}`, diff,
        [`How much is ${fmt(v, 0)} ${from}${u} in ${to}${u}?`, `¿Cuánto son ${fmt(v, 1)} ${from}${u} en ${to}${u}?`, `Wie viel sind ${fmt(v, 2)} ${from}${u} in ${to}${u}?`],
        res, [res * 10, res / 10, res * 100, res / 100, v * 10 ** -d], (x) => num(x, `${to}${u}`), r, (x) => x >= 0.0001 && x <= 1e8);
    }
  }

  // temperatures
  {
    const r = rngFor("sci.temperature");
    for (let c = -40; c <= 100; c += 5) {
      const f = (c * 9) / 5 + 32;
      numQ("sci.temperature", `c2f:${c}`, "hard",
        [`What is ${fmt(c, 0)} °C in degrees Fahrenheit?`, `¿Cuántos grados Fahrenheit son ${fmt(c, 1)} °C?`, `Wie viel Grad Fahrenheit sind ${fmt(c, 2)} °C?`],
        f, [c + 32, (c * 9) / 5, f + 18, f - 18], (x) => num(x, "°F"), r);
    }
    for (const c of [-50, -20, -10, 0, 10, 20, 25, 30, 37, 40, 50, 60, 80, 100]) {
      const k = c + 273.15;
      numQ("sci.temperature", `c2k:${c}`, "medium",
        [`What is ${fmt(c, 0)} °C in kelvin?`, `¿Cuántos kelvin son ${fmt(c, 1)} °C?`, `Wie viel Kelvin sind ${fmt(c, 2)} °C?`],
        k, [c - 273.15, 273.15 - c, c + 373.15, c + 300], (x) => num(x, "K"), r, (x) => x !== c);
      numQ("sci.temperature", `k2c:${c}`, "medium",
        [`What is ${fmt(k, 0)} K in degrees Celsius?`, `¿Cuántos grados Celsius son ${fmt(k, 1)} K?`, `Wie viel Grad Celsius sind ${fmt(k, 2)} K?`],
        c, [k + 273.15, c + 100, c - 100, c + 32], (x) => num(x, "°C"), r);
    }
  }

  facts("sci.constant", [
    ["pi", ["What is π rounded to two decimal places?", "¿Cuánto vale π redondeado a dos decimales?", "Wie lautet π auf zwei Nachkommastellen gerundet?"], num(3.14), [3.41, 3.12, 2.72, 1.62].map((x) => num(x)), "easy"],
    ["e", ["What is Euler's number e to three decimal places?", "¿Cuánto vale el número e con tres decimales?", "Wie lautet die eulersche Zahl e auf drei Nachkommastellen?"], num(2.718), [3.142, 1.618, 1.414, 2.236].map((x) => num(x)), "hard"],
    ["light", ["Roughly how fast does light travel in a vacuum?", "¿A qué velocidad viaja aproximadamente la luz en el vacío?", "Wie schnell ist Licht im Vakuum ungefähr?"], num(300000, "km/s"), [30000, 3000000, 3000, 300].map((x) => num(x, "km/s")), "medium"],
    ["sound", ["Roughly how fast does sound travel in air at room temperature?", "¿A qué velocidad viaja aproximadamente el sonido en el aire a temperatura ambiente?", "Wie schnell breitet sich Schall in Luft bei Raumtemperatur ungefähr aus?"], num(343, "m/s"), [34, 1500, 3430, 120].map((x) => num(x, "m/s")), "medium"],
    ["g", ["What is the acceleration due to gravity at the Earth's surface, roughly?", "¿Cuánto vale aproximadamente la aceleración de la gravedad en la superficie terrestre?", "Wie groß ist die Fallbeschleunigung an der Erdoberfläche ungefähr?"], num(9.81, "m/s²"), [1.62, 98.1, 0.981, 3.71, 6.67].map((x) => num(x, "m/s²")), "medium"],
    ["abszero", ["What is absolute zero in degrees Celsius (rounded)?", "¿A cuántos grados Celsius está el cero absoluto (redondeado)?", "Bei wie viel Grad Celsius liegt der absolute Nullpunkt (gerundet)?"], num(-273, "°C"), [-100, -173, -373, -1000, 0].map((x) => num(x, "°C")), "medium"],
    ["boil", ["At what temperature does water boil at sea level?", "¿A qué temperatura hierve el agua al nivel del mar?", "Bei welcher Temperatur siedet Wasser auf Meereshöhe?"], num(100, "°C"), [80, 90, 110, 120, 150].map((x) => num(x, "°C")), "easy"],
    ["freeze", ["At what temperature does pure water freeze at normal pressure?", "¿A qué temperatura se congela el agua pura a presión normal?", "Bei welcher Temperatur gefriert reines Wasser bei Normaldruck?"], num(0, "°C"), [-4, 4, 10, -10, -20].map((x) => num(x, "°C")), "easy"],
    ["densest", ["At roughly what temperature is water at its densest?", "¿A qué temperatura aproximada alcanza el agua su máxima densidad?", "Bei etwa welcher Temperatur hat Wasser seine größte Dichte?"], num(4, "°C"), [0, -4, 20, 37, 100].map((x) => num(x, "°C")), "hard"],
    ["sun", ["Roughly how far is the Earth from the Sun?", "¿A qué distancia aproximada está la Tierra del Sol?", "Wie weit ist die Erde ungefähr von der Sonne entfernt?"], ["150 million km", "150 millones de km", "150 Millionen km"],
      [["15 million km", "15 millones de km", "15 Millionen km"], ["1.5 billion km", "1500 millones de km", "1,5 Milliarden km"], num(384000, "km"), ["1.5 million km", "1,5 millones de km", "1,5 Millionen km"]], "medium"],
    ["moon", ["Roughly how far is the Moon from the Earth?", "¿A qué distancia aproximada está la Luna de la Tierra?", "Wie weit ist der Mond ungefähr von der Erde entfernt?"], num(384000, "km"),
      [num(38400, "km"), num(3840000, "km"), num(84000, "km"), ["150 million km", "150 millones de km", "150 Millionen km"]], "medium"],
    ["pressure", ["What is normal air pressure at sea level, roughly?", "¿Cuál es, aproximadamente, la presión atmosférica normal al nivel del mar?", "Wie hoch ist der normale Luftdruck auf Meereshöhe ungefähr?"], num(1013, "hPa"), [101, 10130, 500, 2000].map((x) => num(x, "hPa")), "medium"],
    ["water-density", ["What is the density of water, roughly?", "¿Cuál es la densidad aproximada del agua?", "Wie groß ist die Dichte von Wasser ungefähr?"], num(1000, "kg/m³"), [100, 10000, 1, 7870].map((x) => num(x, "kg/m³")), "medium"],
    ["avogadro", ["What is the Avogadro constant (particles per mole), roughly?", "¿Cuál es aproximadamente el número de Avogadro (partículas por mol)?", "Wie groß ist die Avogadro-Konstante (Teilchen pro Mol) ungefähr?"], sciL(6.022, 23),
      [sciL(6.022, 20), sciL(3.14, 23), sciL(6.674, -11), sciL(1.602, -19)], "hard"],
    ["e-charge", ["What is the magnitude of the charge of one electron?", "¿Cuál es el valor absoluto de la carga de un electrón?", "Wie groß ist der Betrag der Ladung eines Elektrons?"], sciL(1.602, -19, "C"),
      [sciL(9.109, -31, "C"), sciL(1.602, 19, "C"), sciL(6.022, 23, "C"), sciL(1.602, -9, "C")], "hard"],
    ["hearing", ["Which frequency range can young people typically hear?", "¿Qué rango de frecuencias puede oír normalmente una persona joven?", "Welchen Frequenzbereich hören junge Menschen typischerweise?"], same("20 Hz – 20 kHz"),
      ["2 Hz – 2 kHz", "200 Hz – 200 kHz", "20 kHz – 20 MHz", "1 Hz – 1 kHz"].map(same), "medium"],
    ["visible", ["Which wavelength range does visible light cover, roughly?", "¿Qué rango de longitudes de onda abarca aproximadamente la luz visible?", "Welchen Wellenlängenbereich umfasst sichtbares Licht ungefähr?"], same("400–700 nm"),
      ["4–7 nm", "400–700 µm", "4–7 mm", "40–70 m"].map(same), "hard"],
  ]);

  // waves
  {
    const idx = EM.map((_, i) => i); // larger index = shorter wavelength = higher frequency
    const T: [string, L, boolean][] = [
      ["short", ["Which of these has the shortest wavelength?", "¿Cuál de estas radiaciones tiene la longitud de onda más corta?", "Welche dieser Strahlungsarten hat die kürzeste Wellenlänge?"], true],
      ["long", ["Which of these has the longest wavelength?", "¿Cuál de estas radiaciones tiene la longitud de onda más larga?", "Welche dieser Strahlungsarten hat die größte Wellenlänge?"], false],
      ["hif", ["Which of these has the highest frequency?", "¿Cuál de estas radiaciones tiene la frecuencia más alta?", "Welche dieser Strahlungsarten hat die höchste Frequenz?"], true],
      ["lof", ["Which of these has the lowest frequency?", "¿Cuál de estas radiaciones tiene la frecuencia más baja?", "Welche dieser Strahlungsarten hat die niedrigste Frequenz?"], false],
    ];
    for (const set of combos(idx, 4))
      for (const [k, text, hi] of T) {
        const best = hi ? Math.max(...set) : Math.min(...set);
        const d: D = best === 0 || best === 6 ? "medium" : "hard";
        add("sci.em-wave", `${k}:${set.join("")}`, SCI, d, text, EM[best], set.filter((x) => x !== best).map((i) => EM[i]));
      }
    for (const set of combos(LIGHT_COLOURS.map((_, i) => i), 4))
      for (const long of [true, false]) {
        const best = long ? Math.min(...set) : Math.max(...set);
        add("sci.light-colour", `${long}:${set.join("")}`, SCI, best === 0 || best === 5 ? "medium" : "hard",
          long ? ["Which colour of visible light has the longest wavelength?", "¿Qué color de la luz visible tiene la longitud de onda más larga?", "Welche Farbe des sichtbaren Lichts hat die größte Wellenlänge?"]
            : ["Which colour of visible light has the shortest wavelength?", "¿Qué color de la luz visible tiene la longitud de onda más corta?", "Welche Farbe des sichtbaren Lichts hat die kürzeste Wellenlänge?"],
          LIGHT_COLOURS[best], set.filter((x) => x !== best).map((i) => LIGHT_COLOURS[i]));
      }
  }

  // states of matter
  {
    const deAdj = ["festen", "flüssigen", "gasförmigen"];
    const direct = (p: (typeof PHASES)[number]) => p.from + p.to === 2 && p.from !== 1;
    lookup({ family: "sci.phase", category: SCI, rows: PHASES, variants: 4, stem: (x) => x.name[0], diff: (x) => x.d,
      text: (x) => [`What do we call the change from ${STATES[x.from][0]} ${direct(x) ? "directly " : ""}to ${STATES[x.to][0]}?`,
        `¿Cómo se llama el paso ${direct(x) ? "directo " : ""}de ${STATES[x.from][1]} a ${STATES[x.to][1]}?`,
        `Wie heißt der ${direct(x) ? "direkte " : ""}Übergang vom ${deAdj[x.from]} in den ${deAdj[x.to]} Zustand?`],
      right: (x) => x.name, pool: PHASES.map((p) => p.name), label: (l) => l });
    const arrow = (p: (typeof PHASES)[number]): L => [0, 1, 2].map((k) => `${cap(STATES[p.from][k])} → ${STATES[p.to][k]}`) as L;
    lookup({ family: "sci.phase-rev", category: SCI, rows: PHASES, variants: 4, stem: (x) => x.name[0], diff: (x) => x.d,
      text: (x) => [`What happens ${x.during[0]}?`, `¿Qué ocurre ${x.during[1]}?`, `Was passiert ${x.during[2]}?`],
      right: (x) => arrow(x), pool: PHASES.map(arrow), label: (l) => l });
  }

  // ═══ electronics ═══
  lookup({ family: "sci.component", category: SCI, rows: COMPONENTS, stem: (x) => x.id, diff: (x) => x.d,
    text: (x) => [`Which electronic component ${x.fn[0]}?`, `¿Qué componente electrónico ${x.fn[1]}?`, `Welches elektronische Bauteil ${x.fn[2]}?`],
    right: (x) => x, pool: COMPONENTS, label: (x) => x.name, ok: clashFree });
  lookup({ family: "sci.component-rev", category: SCI, rows: COMPONENTS, stem: (x) => x.id, diff: (x) => x.d,
    text: (x) => [`What does ${x.a[0]} do?`, `¿Para qué sirve ${x.a[1]}?`, `Wozu dient ${x.a[2]}?`],
    right: (x) => x, pool: COMPONENTS, label: (x) => x.job, ok: clashFree });

  {
    const tabled = GATES.filter((g) => g.table);
    for (const g of tabled) {
      const t = g.table!;
      const tbl = `00 → ${t[0]} · 01 → ${t[1]} · 10 → ${t[2]} · 11 → ${t[3]}`;
      for (const ws of combos(tabled.filter((o) => o !== g), 3))
        add("sci.gate-table", `${g.name}:${ws.map((w) => w.name).join("+")}`, SCI, g.name === "AND" || g.name === "OR" ? "medium" : "hard",
          [`A logic gate with inputs A and B behaves like this (AB → output): ${tbl}. Which gate is it?`,
            `Una puerta lógica con entradas A y B funciona así (AB → salida): ${tbl}. ¿Qué puerta es?`,
            `Ein Logikgatter mit den Eingängen A und B verhält sich so (AB → Ausgang): ${tbl}. Welches Gatter ist das?`],
          same(g.name), ws.map((w) => same(w.name)));
    }
  }
  lookup({ family: "sci.gate-desc", category: SCI, rows: GATES, variants: 5, stem: (x) => x.name, diff: (x) => x.d,
    text: (x) => [`Which logic gate ${x.desc[0]}?`, `¿Qué puerta lógica ${x.desc[1]}?`, `Welches Logikgatter ${x.desc[2]}?`],
    right: (x) => x.name, pool: GATES.map((g) => g.name), label: same });

  // resistor colour code
  lookup({ family: "sci.colour-digit", category: SCI, rows: COLOURS.map((c, i) => [c, i] as const), stem: (x) => x[0][0], diff: (x) => (x[1] <= 2 ? "medium" : "hard"),
    text: ([c]) => [`In the resistor colour code, which digit does ${c[0]} stand for?`, `En el código de colores de las resistencias, ¿qué cifra representa el ${c[1]}?`, `Für welche Ziffer steht ${c[2]} im Farbcode von Widerständen?`],
    right: (x) => x[1], pool: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], label: (n) => same(String(n)) });
  lookup({ family: "sci.colour-rev", category: SCI, rows: COLOURS.map((c, i) => [c, i] as const), stem: (x) => x[0][0], diff: (x) => (x[1] <= 2 ? "medium" : "hard"),
    text: ([, i]) => [`In the resistor colour code, which colour stands for the digit ${i}?`, `En el código de colores de las resistencias, ¿qué color representa la cifra ${i}?`, `Welche Farbe steht im Farbcode von Widerständen für die Ziffer ${i}?`],
    right: (x) => capL(x[0]), pool: COLOURS.map(capL), label: (l) => l });
  {
    const r = rngFor("sci.resistor-value");
    const ohm = (v: number): L => (v >= 1e6 ? num(v / 1e6, "MΩ") : v >= 1e3 ? num(v / 1e3, "kΩ") : num(v, "Ω"));
    for (const ab of [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82])
      for (let m = 0; m <= 4; m++) {
        const [c1, c2, c3] = [COLOURS[Math.floor(ab / 10)], COLOURS[ab % 10], COLOURS[m]];
        const v = ab * 10 ** m;
        numQ("sci.resistor-value", `${ab}e${m}`, "hard",
          [`A resistor has the colour bands ${c1[0]} – ${c2[0]} – ${c3[0]} – gold. What is its value?`,
            `Una resistencia tiene las bandas de color ${c1[1]}, ${c2[1]}, ${c3[1]} y dorado. ¿Cuál es su valor?`,
            `Ein Widerstand hat die Farbringe ${c1[2]} – ${c2[2]} – ${c3[2]} – Gold. Welchen Wert hat er?`],
          v, [-2, -1, 1, 2].map((k) => ab * 10 ** (m + k)), ohm, r, (x) => x >= 0.1);
      }
  }

  // Ohm's law, power, energy, series / parallel
  {
    const r = rngFor("sci.ohm");
    const V = (x: number) => num(x, "V"), A = (x: number) => num(x, "A"), O = (x: number) => num(x, "Ω");
    const pos = (x: number) => x > 0 && Number.isInteger(x);
    const Rs = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 25, 30, 40, 50, 60, 100];
    for (let i = 0; i < 40; i++) {
      const R = pick(r, Rs), I = 1 + Math.floor(r() * 6), U = R * I;
      numQ("sci.ohm", `U:${R}:${I}`, "medium",
        [`A current of ${I} A flows through a ${R} Ω resistor. What is the voltage across it?`,
          `Por una resistencia de ${R} Ω circula una corriente de ${I} A. ¿Qué tensión hay en ella?`,
          `Durch einen Widerstand von ${R} Ω fließt ein Strom von ${I} A. Wie groß ist die Spannung am Widerstand?`],
        U, [R + I, U * 2, U / 2, R * (I + 1), U + R, Math.abs(R - I), R / I], V, r, pos);
    }
    for (const U of [6, 9, 12, 24, 30, 48, 60, 120, 230])
      for (const I of [1, 2, 3, 4, 5, 6, 10]) {
        const R = U / I;
        if (!Number.isInteger(R) || R < 2 || r() < 0.4) continue;
        numQ("sci.ohm", `I:${U}:${R}`, "medium",
          [`A ${U} V source is connected to a ${R} Ω resistor. How much current flows?`,
            `Una fuente de ${U} V se conecta a una resistencia de ${R} Ω. ¿Qué corriente circula?`,
            `Eine Spannungsquelle mit ${U} V ist an einen Widerstand von ${R} Ω angeschlossen. Wie groß ist der Strom?`],
          I, [I * 2, I + 1, I - 1, I + 2, R / U, U - R, I * 10], A, r, pos);
        numQ("sci.ohm", `R:${U}:${I}`, "medium",
          [`At ${U} V, a current of ${I} A flows through a resistor. What is its resistance?`,
            `Con ${U} V circula una corriente de ${I} A por una resistencia. ¿Cuál es su valor?`,
            `Bei ${U} V fließt durch einen Widerstand ein Strom von ${I} A. Wie groß ist der Widerstand?`],
          R, [U * I, R * 2, R / 2, U + I, U - I, R + 1], O, r, pos);
      }
  }
  {
    const r = rngFor("sci.power");
    const pos = (x: number) => x > 0 && Number.isInteger(x);
    for (const U of [5, 6, 9, 12, 24, 48, 230])
      for (const I of [1, 2, 3, 4, 5, 8, 10]) {
        const P = U * I;
        if (r() < 0.45) numQ("sci.power", `P:${U}:${I}`, "medium",
          [`A device draws ${I} A at ${U} V. What is its power?`, `Un aparato consume ${I} A a ${U} V. ¿Qué potencia tiene?`, `Ein Gerät nimmt bei ${U} V einen Strom von ${I} A auf. Welche Leistung hat es?`],
          P, [U + I, P * 2, P / 2, P * 10, U * (I + 1)], (x) => num(x, "W"), r, pos);
        else numQ("sci.power", `I:${U}:${P}`, "medium",
          [`A ${fmt(P, 0)} W device runs on ${U} V. How much current does it draw?`, `Un aparato de ${fmt(P, 1)} W funciona a ${U} V. ¿Qué corriente consume?`, `Ein Gerät mit ${fmt(P, 2)} W läuft an ${U} V. Welchen Strom nimmt es auf?`],
          I, [I + 1, I - 1, I * 2, I * 10, I + 2], (x) => num(x, "A"), r, pos);
      }
  }
  {
    const r = rngFor("sci.kwh");
    for (const P of [100, 200, 250, 500, 1000, 1500, 2000, 2500, 3000])
      for (const t of [2, 3, 4, 5, 6, 8, 10]) {
        if (r() < 0.5) continue;
        const E = (P * t) / 1000;
        numQ("sci.kwh", `${P}:${t}`, "medium",
          [`A ${P} W device runs for ${t} hours. How much energy does it use?`, `Un aparato de ${P} W funciona durante ${t} horas. ¿Cuánta energía consume?`, `Ein Gerät mit ${P} W läuft ${t} Stunden lang. Wie viel Energie verbraucht es?`],
          E, [E * 10, E / 10, E * 100, P * t], (x) => num(x, "kWh"), r);
      }
  }
  {
    const r = rngFor("sci.series");
    const E = [10, 22, 33, 47, 68, 100, 150, 220, 330, 470, 680];
    for (let i = 0; i < 40; i++) {
      const [a, b] = sample(r, E, 2)!;
      const s = a + b;
      numQ("sci.series", `${Math.min(a, b)}+${Math.max(a, b)}`, "easy",
        [`Resistors of ${a} Ω and ${b} Ω are connected in series. What is the total resistance?`, `Se conectan en serie dos resistencias de ${a} Ω y ${b} Ω. ¿Cuál es la resistencia total?`, `Zwei Widerstände mit ${a} Ω und ${b} Ω werden in Reihe geschaltet. Wie groß ist der Gesamtwiderstand?`],
        s, [Math.abs(a - b), 2 * s, Math.max(a, b), s + Math.min(a, b), s * 10], (x) => num(x, "Ω"), r);
    }
    for (let i = 0; i < 20; i++) {
      const [a, b, c] = sample(r, E, 3)!;
      const s = a + b + c;
      numQ("sci.series", [a, b, c].sort((x, y) => x - y).join("+"), "medium",
        [`Resistors of ${a} Ω, ${b} Ω and ${c} Ω are connected in series. What is the total resistance?`, `Se conectan en serie tres resistencias de ${a} Ω, ${b} Ω y ${c} Ω. ¿Cuál es la resistencia total?`, `Drei Widerstände mit ${a} Ω, ${b} Ω und ${c} Ω werden in Reihe geschaltet. Wie groß ist der Gesamtwiderstand?`],
        s, [s - Math.min(a, b, c), 2 * s, Math.max(a, b, c), s + Math.min(a, b, c), s * 10], (x) => num(x, "Ω"), r);
    }
  }
  {
    const r = rngFor("sci.parallel");
    const L0 = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 90, 100, 120, 150, 180, 200, 300];
    for (const a of L0)
      for (const b of L0) {
        if (b < a) continue;
        const p = (a * b) / (a + b);
        if (!Number.isInteger(p)) continue;
        numQ("sci.parallel", `${a}|${b}`, a === b ? "medium" : "hard",
          [`Resistors of ${a} Ω and ${b} Ω are connected in parallel. What is the total resistance?`, `Se conectan en paralelo dos resistencias de ${a} Ω y ${b} Ω. ¿Cuál es la resistencia total?`, `Zwei Widerstände mit ${a} Ω und ${b} Ω werden parallel geschaltet. Wie groß ist der Gesamtwiderstand?`],
          p, [a + b, Math.min(a, b), p * 2, (a + b) / 2, p / 2, b - a], (x) => num(x, "Ω"), r, (x) => x > 0 && Number.isInteger(x));
      }
  }

  facts("sci.elec-value", [
    ["eu-volt", ["What is the standard voltage of a household socket in most of Europe?", "¿Cuál es la tensión estándar de un enchufe doméstico en la mayor parte de Europa?", "Welche Spannung liefert eine Haushaltssteckdose in den meisten Ländern Europas?"], num(230, "V"), [12, 110, 400, 1000].map((x) => num(x, "V")), "easy"],
    ["eu-hz", ["What is the frequency of the mains electricity in Europe?", "¿Cuál es la frecuencia de la red eléctrica en Europa?", "Welche Frequenz hat das Stromnetz in Europa?"], num(50, "Hz"), [10, 25, 60, 100].map((x) => num(x, "Hz")), "medium"],
    ["us-hz", ["What is the frequency of the mains electricity in the United States?", "¿Cuál es la frecuencia de la red eléctrica en Estados Unidos?", "Welche Frequenz hat das Stromnetz in den USA?"], num(60, "Hz"), [30, 50, 100, 120].map((x) => num(x, "Hz")), "medium"],
    ["us-volt", ["What is the standard voltage of a household socket in the United States?", "¿Cuál es la tensión estándar de un enchufe doméstico en Estados Unidos?", "Welche Spannung liefert eine normale Haushaltssteckdose in den USA?"], num(120, "V"), [12, 60, 230, 400].map((x) => num(x, "V")), "medium"],
    ["aa", ["What is the nominal voltage of a single AA alkaline battery?", "¿Cuál es la tensión nominal de una pila alcalina AA?", "Welche Nennspannung hat eine einzelne AA-Alkalibatterie?"], num(1.5, "V"), [3, 4.5, 9, 12].map((x) => num(x, "V")), "easy"],
    ["car", ["What is the voltage of a typical car battery?", "¿Qué tensión tiene la batería de un coche normal?", "Welche Spannung hat eine typische Autobatterie?"], num(12, "V"), [1.5, 3, 110, 230].map((x) => num(x, "V")), "easy"],
    ["usb", ["What voltage does a standard USB port supply (without fast charging)?", "¿Qué tensión suministra un puerto USB estándar (sin carga rápida)?", "Welche Spannung liefert ein normaler USB-Anschluss (ohne Schnellladen)?"], num(5, "V"), [1.5, 24, 110, 230].map((x) => num(x, "V")), "medium"],
    ["diode", ["Roughly what voltage drops across a conducting silicon diode?", "¿Qué tensión cae aproximadamente en un diodo de silicio cuando conduce?", "Wie viel Spannung fällt an einer leitenden Siliziumdiode ungefähr ab?"], num(0.7, "V"), [0.07, 7, 12, 70].map((x) => num(x, "V")), "hard"],
    ["kwh", ["How many megajoules is 1 kWh?", "¿A cuántos megajulios equivale 1 kWh?", "Wie viele Megajoule sind 1 kWh?"], num(3.6, "MJ"), [0.36, 36, 360, 1000].map((x) => num(x, "MJ")), "hard"],
  ]);

  // ═══ computing ═══
  {
    const r = rngFor("sci.bits");
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 24, 32])
      for (let v = 0; v < 2; v++)
        numQ("sci.bits", `${n}`, n <= 8 ? "medium" : "hard",
          [`How many different values can be represented with ${n} bit${n === 1 ? "" : "s"}?`, `¿Cuántos valores distintos se pueden representar con ${n} bit${n === 1 ? "" : "s"}?`, `Wie viele verschiedene Werte lassen sich mit ${n} Bit darstellen?`],
          2 ** n, [2 ** (n - 1), 2 ** (n + 1), n * n, 2 * n, 8 * n, 2 ** (n + 2), 10 * n], (x) => num(x), r, (x) => x >= 1);
  }
  {
    const r = rngFor("sci.binary");
    const flips = (n: number) => { const len = n.toString(2).length; return Array.from({ length: len - 1 }, (_, k) => n ^ (1 << k)); };
    const nums = [...Array.from({ length: 56 }, (_, i) => i + 8), ...Array.from({ length: 40 }, () => 64 + Math.floor(r() * 192))];
    for (const n of nums) {
      const b = n.toString(2);
      numQ("sci.bin2dec", `${n}`, n < 16 ? "medium" : "hard",
        [`What is the binary number ${b} in decimal?`, `¿Cuánto vale en decimal el número binario ${b}?`, `Welche Dezimalzahl entspricht der Binärzahl ${b}?`],
        n, flips(n), (x) => same(String(x)), r);
    }
    for (let n = 8; n < 64; n++)
      numQ("sci.dec2bin", `${n}`, n < 16 ? "medium" : "hard",
        [`How is the decimal number ${n} written in binary?`, `¿Cómo se escribe el número decimal ${n} en binario?`, `Wie lautet die Dezimalzahl ${n} im Binärsystem?`],
        n, flips(n), (x) => same(x.toString(2)), r);
    const hexes = [255, 16, 31, 128, 127, 100, ...Array.from({ length: 70 }, () => 17 + Math.floor(r() * 238))];
    for (const n of hexes) {
      const h = n.toString(16).toUpperCase();
      const sw = parseInt(h.split("").reverse().join(""), 16);
      numQ("sci.hex2dec", `${n}`, n === 255 || n === 16 ? "medium" : "hard",
        [`What is the hexadecimal number ${h} in decimal?`, `¿Cuánto vale en decimal el número hexadecimal ${h}?`, `Welche Dezimalzahl entspricht der Hexadezimalzahl ${h}?`],
        n, [sw, n + 16, n - 16, n + 1, n - 1, parseInt(h, 10) || 0], (x) => same(String(x)), r, (x) => x > 0);
    }
  }
  facts("sci.it-number", [
    ["byte", ["How many bits are in one byte?", "¿Cuántos bits tiene un byte?", "Wie viele Bit hat ein Byte?"], num(8), [4, 10, 16, 32].map((x) => num(x)), "easy"],
    ["hexdigit", ["How many bits does one hexadecimal digit represent?", "¿Cuántos bits representa una cifra hexadecimal?", "Wie viele Bit stellt eine Hexadezimalziffer dar?"], num(4), [2, 6, 8, 16].map((x) => num(x)), "medium"],
    ["ipv4", ["How many bits long is an IPv4 address?", "¿Cuántos bits tiene una dirección IPv4?", "Wie viele Bit hat eine IPv4-Adresse?"], num(32), [16, 48, 64, 128].map((x) => num(x)), "hard"],
    ["ipv6", ["How many bits long is an IPv6 address?", "¿Cuántos bits tiene una dirección IPv6?", "Wie viele Bit hat eine IPv6-Adresse?"], num(128), [32, 64, 256, 512].map((x) => num(x)), "hard"],
    ["hexbase", ["What is the base of the hexadecimal system?", "¿Cuál es la base del sistema hexadecimal?", "Welche Basis hat das Hexadezimalsystem?"], num(16), [6, 8, 12, 20, 32].map((x) => num(x)), "medium"],
    ["octbase", ["What is the base of the octal system?", "¿Cuál es la base del sistema octal?", "Welche Basis hat das Oktalsystem?"], num(8), [6, 10, 12, 16].map((x) => num(x)), "medium"],
    ["bindigits", ["How many different digits does the binary system use?", "¿Cuántas cifras distintas usa el sistema binario?", "Wie viele verschiedene Ziffern verwendet das Binärsystem?"], num(2), [1, 3, 8, 10].map((x) => num(x)), "easy"],
    ["ascii", ["How many bits per character did the original ASCII code use?", "¿Cuántos bits por carácter usaba el código ASCII original?", "Wie viele Bit pro Zeichen verwendete der ursprüngliche ASCII-Code?"], num(7), [5, 6, 12, 16].map((x) => num(x)), "hard"],
    ["bytemax", ["What is the largest number one byte can store (unsigned)?", "¿Cuál es el número más grande que cabe en un byte (sin signo)?", "Welches ist die größte Zahl, die ein Byte (ohne Vorzeichen) speichern kann?"], num(255), [100, 128, 512, 1024].map((x) => num(x)), "medium"],
    ["hexF", ["Which decimal value does the hexadecimal digit F stand for?", "¿Qué valor decimal representa la cifra hexadecimal F?", "Welchen Dezimalwert hat die Hexadezimalziffer F?"], num(15), [6, 10, 12, 16].map((x) => num(x)), "medium"],
    ["hexA", ["Which decimal value does the hexadecimal digit A stand for?", "¿Qué valor decimal representa la cifra hexadecimal A?", "Welchen Dezimalwert hat die Hexadezimalziffer A?"], num(10), [1, 11, 12, 16].map((x) => num(x)), "medium"],
  ]);
  {
    const units: L[] = ["Bit", "Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte", "Petabyte"].map(same);
    for (const set of combos(units.map((_, i) => i), 4))
      for (const big of [true, false]) {
        const best = big ? Math.max(...set) : Math.min(...set);
        add("sci.data-size", `${big}:${set.join("")}`, SCI, best === 6 || best === 0 ? "medium" : "easy",
          big ? ["Which of these units stands for the largest amount of data?", "¿Cuál de estas unidades representa la mayor cantidad de datos?", "Welche dieser Einheiten steht für die größte Datenmenge?"]
            : ["Which of these units stands for the smallest amount of data?", "¿Cuál de estas unidades representa la menor cantidad de datos?", "Welche dieser Einheiten steht für die kleinste Datenmenge?"],
          units[best], set.filter((x) => x !== best).map((i) => units[i]));
      }
  }
  for (const [ab, full, fake, d] of ACRONYMS)
    add("sci.acronym", ab, SCI, d, [`What does the abbreviation ${ab} stand for?`, `¿Qué significan las siglas inglesas ${ab}?`, `Wofür steht die englische Abkürzung ${ab}?`], same(full), fake.map(same));
  lookup({ family: "sci.code", category: SCI, rows: CODE, stem: (x) => x.label[0], diff: (x) => x.d,
    text: (x) => [`Who created ${x.what[0]}?`, `¿Quién creó ${x.what[1]}?`, `Wer hat ${x.what[2]} entwickelt?`],
    right: (x) => x.who, pool: [...new Set(CODE.map((c) => c.who))], label: same });
  which({ family: "sci.code-rev", category: SCI, rows: CODE, per: 4, diff: (k) => (k === "Guido van Rossum" || k === "Linus Torvalds" ? "medium" : "hard"), key: (x) => x.who, label: (x) => x.label,
    text: (k) => [`Which of these did ${k} create?`, `¿Cuál de estos creó ${k}?`, `Was davon hat ${k} entwickelt?`] });

  // ═══ space ═══
  const moonPlanets = [2, 3, 4, 5, 6, 7];
  lookup({ family: "sci.moon", category: SCI, rows: MOONS, stem: (x) => x[0][0], diff: (x) => x[2],
    text: (x) => [`Which planet does the moon ${x[0][0]} orbit?`, `¿Alrededor de qué planeta gira la luna ${x[0][1]}?`, `Um welchen Planeten kreist der Mond ${x[0][2]}?`],
    right: (x) => x[1], pool: moonPlanets, label: planetL });
  which({ family: "sci.moon-rev", category: SCI, rows: MOONS, per: 6, diff: "hard", key: (x) => String(x[1]), label: (x) => x[0],
    text: (k) => { const i = Number(k); return [`Which of these moons orbits ${PLANETS[i][0]}?`, `¿Cuál de estas lunas gira alrededor de ${PLANETS[i][1]}?`, `Welcher dieser Monde umkreist ${PLANET_DE_ACC[i]}?`]; } });
  groupYesNo("sci.no-moon", SCI, 40, [0, 1].map(planetL), [2, 3, 4, 5, 6, 7].map(planetL), "medium",
    ["Which of these planets has no moons?", "¿Cuál de estos planetas no tiene lunas?", "Welcher dieser Planeten hat keinen Mond?"]);
  groupYesNo("sci.dwarf-planet", SCI, 60,
    [["Pluto", "Plutón", "Pluto"], ["Ceres", "Ceres", "Ceres"], ["Eris", "Eris", "Eris"], ["Haumea", "Haumea", "Haumea"], ["Makemake", "Makemake", "Makemake"]],
    [...[0, 3, 7].map(planetL), ...MOONS.filter((m) => ["Titan", "Ganymede", "Europa", "Io", "Triton"].includes(m[0][0])).map((m) => m[0])], "medium",
    ["Which of these is a dwarf planet?", "¿Cuál de estos cuerpos celestes es un planeta enano?", "Welcher dieser Himmelskörper ist ein Zwergplanet?"]);
  lookup({ family: "sci.planet-fact", category: SCI, rows: PLANET_FACTS, stem: (x) => x[0][0], diff: (x) => x[2],
    text: (x) => [`Which planet ${x[0][0]}?`, `¿Qué planeta ${x[0][1]}?`, `Welcher Planet ${x[0][2]}?`],
    right: (x) => x[1], pool: [0, 1, 2, 3, 4, 5, 6, 7], label: planetL });
  facts("sci.astro", ASTRO);

  // ═══ human body & biology ═══
  {
    const r = rngFor("sci.body-number");
    for (const [stem, q, a, wrong, unit, d] of BODY_NUMBERS)
      for (let v = 0; v < 3; v++)
        numQ("sci.body-number", stem, d, q, a, wrong, (x) => (unit ? (num(x).map((s, k) => `${s} ${unit[k]}`) as L) : num(x)), r);
  }
  lookup({ family: "sci.bone", category: SCI, rows: BONES, stem: (x) => x.id, diff: (x) => x.d, text: (x) => x.q,
    right: (x) => x.label, pool: [...new Map(BONES.map((b) => [b.label[0], b.label])).values()], label: (l) => l });
  lookup({ family: "sci.vitamin", category: SCI, rows: VITAMINS, stem: (x) => x[0], diff: (x) => x[3], text: (x) => x[1],
    right: (x) => x[2], pool: VITAMIN_KEYS, label: (k) => [`Vitamin ${k}`, `Vitamina ${k}`, `Vitamin ${k}`] });
  lookup({ family: "sci.cell", category: SCI, rows: CELL_PARTS, stem: (x) => x.label[0], diff: (x) => x.d,
    text: (x) => [`Which part of a cell ${x.q[0]}?`, `¿Qué parte de la célula ${x.q[1]}?`, `Welcher Zellbestandteil ${x.q[2]}?`],
    right: (x) => x.label, pool: CELL_PARTS.map((c) => c.label), label: (l) => l });
  lookup({ family: "sci.branch", category: SCI, rows: BRANCHES, stem: (x) => x.name[0], diff: (x) => x.d,
    text: (x) => [`What does ${low(x.name[0])} study?`, `¿Qué estudia la ${low(x.name[1])}?`, `Womit beschäftigt sich die ${x.name[2]}?`],
    right: (x) => x, pool: BRANCHES, label: (x) => x.what, ok: (x, c) => !x.g || x.g !== c.g });
  lookup({ family: "sci.branch-rev", category: SCI, rows: BRANCHES, stem: (x) => x.name[0], diff: (x) => x.d,
    text: (x) => [`Which field studies ${x.ph[0]}?`, `¿Qué disciplina estudia ${x.ph[1]}?`, `Welches Fachgebiet beschäftigt sich ${x.ph[2]}?`],
    right: (x) => x, pool: BRANCHES, label: (x) => x.name, ok: (x, c) => !x.g || x.g !== c.g });

  // ═══ maths ═══
  {
    const r = rngFor("sci.polygon");
    for (let n = 5; n <= 12; n++) {
      const [en, es, de] = POLYGONS[n];
      const d: D = [5, 6, 8].includes(n) ? "easy" : [9, 11].includes(n) ? "hard" : "medium";
      for (let v = 0; v < 3; v++)
        numQ("sci.polygon", en, d, [`How many sides does ${/^[aeiou]/.test(en) ? "an" : "a"} ${en} have?`, `¿Cuántos lados tiene un ${es}?`, `Wie viele Seiten hat ein ${de}?`],
          n, [n - 3, n - 2, n - 1, n + 1, n + 2, n + 3].filter((x) => x >= 3), (x) => num(x), r);
    }
    const names = (n: number): L => capL([POLYGONS[n][0], POLYGONS[n][1], POLYGONS[n][2]]);
    lookup({ family: "sci.polygon-rev", category: SCI, rows: [5, 6, 7, 8, 9, 10, 11, 12], stem: String, diff: (n) => ([5, 6, 8].includes(n) ? "easy" : [9, 11].includes(n) ? "hard" : "medium"),
      text: (n) => [`What is a polygon with ${n} sides called?`, `¿Cómo se llama un polígono de ${n} lados?`, `Wie nennt man ein Vieleck mit ${n} Seiten?`],
      right: (n) => n, pool: [5, 6, 7, 8, 9, 10, 11, 12], label: names });
    const ra = rngFor("sci.angles");
    const deg = (x: number) => same(`${x}°`);
    for (let n = 3; n <= 12; n++) {
      const [en, es, , de] = POLYGONS[n];
      const s = (n - 2) * 180;
      for (let v = 0; v < 2; v++)
        numQ("sci.angles", `sum:${n}`, n <= 4 ? "easy" : "medium",
          [`What is the sum of the interior angles of ${/^[aeiou]/.test(en) ? "an" : "a"} ${en}?`, `¿Cuánto suman los ángulos interiores de un ${es}?`, `Wie groß ist die Summe der Innenwinkel eines ${de}s?`],
          s, [s - 180, s + 180, s - 360, s + 360, n * 180, 360], deg, ra, (x) => x > 0);
    }
    for (const n of [3, 5, 6, 8, 9, 10, 12]) {
      const [en, es, , de] = POLYGONS[n];
      const a = 180 - 360 / n;
      for (let v = 0; v < 2; v++)
        numQ("sci.angles", `each:${n}`, n === 3 || n === 6 ? "medium" : "hard",
          [`How big is each interior angle of a regular ${en}?`, `¿Cuánto mide cada ángulo interior de un ${es} regular?`, `Wie groß ist jeder Innenwinkel eines regelmäßigen ${de}s?`],
          a, [...[3, 4, 5, 6, 8, 9, 10, 12].filter((k) => k !== n).map((k) => 180 - 360 / k), 360 / n], deg, ra, (x) => Number.isInteger(x));
    }
  }
  {
    const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    const odd = [21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93, 99];
    groupYesNo("sci.prime", SCI, 150, primes.map((n) => same(String(n))), odd.map((n) => same(String(n))), "medium",
      ["Which of these numbers is a prime number?", "¿Cuál de estos números es primo?", "Welche dieser Zahlen ist eine Primzahl?"]);
    const r = rngFor("sci.square");
    for (let n = 4; n <= 25; n++) {
      const d: D = n <= 12 ? "easy" : "medium";
      numQ("sci.square", `sqrt:${n}`, d, [`What is the square root of ${n * n}?`, `¿Cuál es la raíz cuadrada de ${n * n}?`, `Was ist die Quadratwurzel aus ${n * n}?`],
        n, [n - 1, n + 1, n - 2, n + 2, 2 * n], (x) => num(x), r);
      numQ("sci.square", `sq:${n}`, d, [`What is ${n}²?`, `¿Cuánto es ${n}²?`, `Was ergibt ${n}²?`],
        n * n, [2 * n, (n - 1) ** 2, (n + 1) ** 2, n * n + n, n * n - n], (x) => num(x), r);
    }
  }
}
