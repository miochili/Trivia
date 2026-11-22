import type { L, PackApi } from "../generate";
import type { Difficulty } from "../../../../src/shared/types";
import { PLANETS } from "../data/science";
import {
  ACIDIC,
  ACRONYMS,
  ALKALINE,
  ALLOYS,
  ASTRO,
  BODY_NUMBERS,
  BONES,
  BRANCHES,
  CELL_PARTS,
  COMPOSITIONS,
  CONDUCTORS,
  EM,
  FORMULAS,
  FOSSIL,
  GAS_FACTS,
  GASES,
  INSTRUMENTS,
  INSULATORS,
  LAWS,
  LIGHT_COLOURS,
  MAGNETIC,
  MOHS,
  MOONS,
  NEUTRAL,
  NON_MAGNETIC,
  NUCLEAR,
  PHASES,
  PLANET_DE_ACC,
  PLANET_FACTS,
  POLYGONS,
  PREFIXES,
  RENEWABLE,
  STATES,
  VITAMIN_KEYS,
  VITAMINS,
  type Fact,
} from "./science-data";

type D = Difficulty;
type Rng = () => number;
const SCI = "science" as const;

// ── number formatting: en 12,345.6 · es 12 345,6 · de 12.345,6 (4-digit numbers unseparated) ──
const fmt = (n: number, k: number): string => {
  const x = Number(n.toPrecision(12));
  const [i0, f] = Math.abs(x).toString().split(".");
  const i =
    i0.length > 4
      ? i0.replace(/\B(?=(\d{3})+(?!\d))/g, [",", " ", "."][k])
      : i0;
  return (x < 0 ? "−" : "") + (f ? `${i}${k === 0 ? "." : ","}${f}` : i);
};
const num = (n: number, unit = ""): L =>
  [0, 1, 2].map((k) => (unit ? `${fmt(n, k)} ${unit}` : fmt(n, k))) as L;
const SUP: Record<string, string> = {
  "-": "⁻",
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
};
const pow10 = (e: number) =>
  `10${String(e)
    .split("")
    .map((c) => SUP[c])
    .join("")}`;
const sciL = (m: number, e: number, unit = ""): L =>
  num(m).map((s) => `${s} × ${pow10(e)}${unit ? ` ${unit}` : ""}`) as L;
const clean = (x: number) => Number(x.toPrecision(10));

/** Extra question types for the "science" category. */
export default function pack(api: PackApi) {
  const {
    add,
    lookup,
    which,
    groupYesNo,
    rngFor,
    pick,
    sample,
    same,
    cap,
    low,
    capL,
  } = api;

  /** numeric question: 3 wrong answers picked from `cands` (deduplicated, never equal to the answer) */
  const numQ = (
    family: string,
    stem: string,
    d: D,
    text: L,
    right: number,
    cands: number[],
    label: (n: number) => L,
    r: Rng,
    ok: (n: number) => boolean = () => true,
  ) => {
    const R = clean(right);
    const pool = [...new Set(cands.map(clean))].filter(
      (x) => x !== R && Number.isFinite(x) && ok(x),
    );
    const ws = sample(r, pool, 3);
    if (ws) add(family, stem, SCI, d, text, label(R), ws.map(label));
  };
  /** hand-written facts with a list of wrong answers; up to `variants` different option sets */
  const facts = (family: string, rows: Fact[], variants = 3) => {
    const r = rngFor(family);
    for (const [stem, q, right, wrong, d] of rows)
      for (let v = 0; v < variants; v++)
        add(family, stem, SCI, d, q, right, sample(r, wrong, 3)!);
  };
  const clashes = <T extends { id: string; clash?: string[] }>(a: T, b: T) =>
    !!(a.clash?.includes(b.id) || b.clash?.includes(a.id));
  const planetL = (i: number): L => [
    PLANETS[i][0],
    PLANETS[i][1],
    PLANETS[i][2],
  ];
  const combos = <T>(a: T[], k: number): T[][] =>
    k === 0
      ? [[]]
      : a.flatMap((x, i) =>
          combos(a.slice(i + 1), k - 1).map((c) => [x, ...c]),
        );

  // ═══ chemistry ═══
  lookup({
    family: "sci.formula",
    category: SCI,
    rows: FORMULAS,
    stem: (x) => x[0],
    diff: (x) => x[2],
    text: (x) => [
      `What is the chemical formula of ${x[1][0]}?`,
      `¿Cuál es la fórmula química de esta sustancia: ${x[1][1]}?`,
      `Was ist die chemische Formel von ${x[1][2]}?`,
    ],
    right: (x) => x[0],
    pool: FORMULAS.map((f) => f[0]),
    label: same,
  });
  lookup({
    family: "sci.formula-rev",
    category: SCI,
    rows: FORMULAS,
    stem: (x) => x[0],
    diff: (x) => x[2],
    text: (x) => [
      `Which substance has the chemical formula ${x[0]}?`,
      `¿Qué sustancia tiene la fórmula química ${x[0]}?`,
      `Welcher Stoff hat die chemische Formel ${x[0]}?`,
    ],
    right: (x) => capL(x[1]),
    pool: FORMULAS.map((f) => capL(f[1])),
    label: (l) => l,
  });

  lookup({
    family: "sci.alloy",
    category: SCI,
    rows: ALLOYS,
    stem: (x) => x.id,
    diff: (x) => x.d,
    text: (x) => [
      `What is ${x.en} mainly made of?`,
      `¿Qué elementos componen principalmente esta aleación: ${x.id === "invar" ? "Invar" : low(x.label[1])}?`,
      `Woraus besteht die Legierung „${x.label[2]}“ hauptsächlich?`,
    ],
    right: (x) => x.comp,
    pool: Object.keys(COMPOSITIONS),
    label: (k) => COMPOSITIONS[k],
    ok: (x, k) => !(x.clash ?? []).includes(k),
  });
  which({
    family: "sci.alloy-rev",
    category: SCI,
    rows: ALLOYS,
    per: 4,
    diff: (k) => (["cu_sn", "cu_zn", "fe_c"].includes(k) ? "medium" : "hard"),
    key: (x) => x.comp,
    label: (x) => x.label,
    text: (k) => [
      `Which alloy is mainly made of ${low(COMPOSITIONS[k][0])}?`,
      `¿Qué aleación está formada principalmente por ${low(COMPOSITIONS[k][1])}?`,
      `Welche Legierung besteht hauptsächlich aus ${COMPOSITIONS[k][2]}?`,
    ],
    ok: (_, c, k) => !(c.clash ?? []).includes(k),
  });

  lookup({
    family: "sci.gas",
    category: SCI,
    rows: GAS_FACTS,
    stem: (x) => x[0],
    diff: (x) => x[4],
    text: (x) => x[1],
    right: (x) => x[2],
    pool: Object.keys(GASES),
    label: (k) => GASES[k],
    ok: (x, k) => !x[3].includes(k),
  });

  groupYesNo("sci.acidic", SCI, 50, ACIDIC, [...ALKALINE, ...NEUTRAL], "easy", [
    "Which of these is acidic?",
    "¿Cuál de estas sustancias es ácida?",
    "Welcher dieser Stoffe ist sauer?",
  ]);
  groupYesNo(
    "sci.alkaline",
    SCI,
    50,
    ALKALINE,
    [...ACIDIC, ...NEUTRAL],
    "medium",
    [
      "Which of these is alkaline (basic)?",
      "¿Cuál de estas sustancias es básica (alcalina)?",
      "Welcher dieser Stoffe ist basisch (alkalisch)?",
    ],
  );

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
        const d: D =
          best[3] === 10 || best[3] === 1
            ? "easy"
            : Math.abs(best[3] - s[1][3]) === 1
              ? "hard"
              : "medium";
        const text: L = max
          ? [
              "Which of these minerals is the hardest?",
              "¿Cuál de estos minerales es el más duro?",
              "Welches dieser Minerale ist am härtesten?",
            ]
          : [
              "Which of these minerals is the softest?",
              "¿Cuál de estos minerales es el más blando?",
              "Welches dieser Minerale ist am weichsten?",
            ];
        const key = s
          .map((x) => x[0])
          .sort()
          .join("+");
        if (seenSets.has(key)) continue;
        seenSets.add(key);
        add(
          "sci.mohs",
          `${max ? "max" : "min"}:${key}`,
          SCI,
          d,
          text,
          [best[0], best[1], best[2]],
          s.slice(1).map((x) => [x[0], x[1], x[2]] as L),
        );
      }
    }
  }

  groupYesNo("sci.conductor", SCI, 60, CONDUCTORS, INSULATORS, "easy", [
    "Which of these is a good electrical conductor?",
    "¿Cuál de estos materiales es un buen conductor eléctrico?",
    "Welcher dieser Stoffe leitet elektrischen Strom gut?",
  ]);
  groupYesNo("sci.insulator", SCI, 60, INSULATORS, CONDUCTORS, "easy", [
    "Which of these is an electrical insulator?",
    "¿Cuál de estos materiales es un aislante eléctrico?",
    "Welcher dieser Stoffe ist ein elektrischer Isolator?",
  ]);
  groupYesNo("sci.magnetic", SCI, 50, MAGNETIC, NON_MAGNETIC, "medium", [
    "Which of these metals is attracted by a magnet?",
    "¿Cuál de estos metales es atraído por un imán?",
    "Welches dieser Metalle wird von einem Magneten angezogen?",
  ]);

  groupYesNo(
    "sci.renewable",
    SCI,
    50,
    RENEWABLE,
    [...FOSSIL, NUCLEAR],
    "easy",
    [
      "Which of these is a renewable energy source?",
      "¿Cuál de estas es una fuente de energía renovable?",
      "Welche dieser Energiequellen ist erneuerbar?",
    ],
  );
  groupYesNo(
    "sci.non-renewable",
    SCI,
    40,
    [...FOSSIL, NUCLEAR],
    RENEWABLE,
    "easy",
    [
      "Which of these energy sources is NOT renewable?",
      "¿Cuál de estas fuentes de energía NO es renovable?",
      "Welche dieser Energiequellen ist NICHT erneuerbar?",
    ],
  );
  groupYesNo("sci.fossil", SCI, 30, FOSSIL, [...RENEWABLE, NUCLEAR], "easy", [
    "Which of these energy sources is a fossil fuel?",
    "¿Cuál de estas fuentes de energía es un combustible fósil?",
    "Welche dieser Energiequellen ist ein fossiler Brennstoff?",
  ]);

  // ═══ physics ═══
  lookup({
    family: "sci.instrument",
    category: SCI,
    rows: INSTRUMENTS,
    stem: (x) => x.id,
    diff: (x) => x.d,
    text: (x) => [
      `What does ${/^[aeiou]/.test(x.name[0]) ? "an" : "a"} ${x.name[0]} measure?`,
      `¿Qué mide un ${x.name[1]}?`,
      `Was misst ein ${x.name[2]}?`,
    ],
    right: (x) => x,
    pool: INSTRUMENTS,
    label: (x) => x.what,
    ok: clashFree,
  });
  lookup({
    family: "sci.instrument-rev",
    category: SCI,
    rows: INSTRUMENTS,
    stem: (x) => x.id,
    diff: (x) => x.d,
    text: (x) => [
      `Which instrument ${x.verb[0]}?`,
      `¿Qué instrumento ${x.verb[1]}?`,
      `Welches Gerät ${x.verb[2]}?`,
    ],
    right: (x) => x,
    pool: INSTRUMENTS,
    label: (x) => capL(x.name),
    ok: clashFree,
  });
  function clashFree<T extends { id: string; clash?: string[] }>(a: T, b: T) {
    return !clashes(a, b);
  }

  lookup({
    family: "sci.law",
    category: SCI,
    rows: LAWS,
    variants: 4,
    stem: (x) => x.id,
    diff: (x) => x.d,
    text: (x) => {
      const s = x.says.map((t) => t.replace(/\.$/, ""));
      return [
        `Which law or principle states: “${s[0]}”?`,
        `¿Qué ley o principio dice: «${s[1]}»?`,
        `Welches Gesetz bzw. Prinzip besagt: „${s[2]}“?`,
      ];
    },
    right: (x) => x,
    pool: LAWS,
    label: (x) => x.label,
    ok: clashFree,
  });

  // SI prefixes
  lookup({
    family: "sci.prefix",
    category: SCI,
    rows: PREFIXES,
    stem: (x) => x.sym,
    diff: (x) => x.d,
    text: (x) => [
      `What factor does the SI prefix “${x.name[0]}” stand for?`,
      `¿Qué factor representa el prefijo del SI «${x.name[1]}»?`,
      `Für welchen Faktor steht das SI-Präfix „${x.name[2]}“?`,
    ],
    right: (x) => x.exp,
    pool: PREFIXES.map((p) => p.exp),
    label: (e) => same(pow10(e)),
  });
  lookup({
    family: "sci.prefix-rev",
    category: SCI,
    rows: PREFIXES,
    stem: (x) => x.sym,
    diff: (x) => x.d,
    text: (x) => [
      `Which SI prefix stands for the factor ${pow10(x.exp)}?`,
      `¿Qué prefijo del SI representa el factor ${pow10(x.exp)}?`,
      `Welches SI-Präfix steht für den Faktor ${pow10(x.exp)}?`,
    ],
    right: (x) => capL(x.name),
    pool: PREFIXES.map((p) => capL(p.name)),
    label: (l) => l,
  });
  // temperatures
  {
    const r = rngFor("sci.temperature");
    for (let c = -40; c <= 100; c += 5) {
      const f = (c * 9) / 5 + 32;
      numQ(
        "sci.temperature",
        `c2f:${c}`,
        "hard",
        [
          `What is ${fmt(c, 0)} °C in degrees Fahrenheit?`,
          `¿Cuántos grados Fahrenheit son ${fmt(c, 1)} °C?`,
          `Wie viel Grad Fahrenheit sind ${fmt(c, 2)} °C?`,
        ],
        f,
        [c + 32, (c * 9) / 5, f + 18, f - 18],
        (x) => num(x, "°F"),
        r,
      );
    }
    for (const c of [
      -50, -20, -10, 0, 10, 20, 25, 30, 37, 40, 50, 60, 80, 100,
    ]) {
      const k = c + 273.15;
      numQ(
        "sci.temperature",
        `c2k:${c}`,
        "medium",
        [
          `What is ${fmt(c, 0)} °C in kelvin?`,
          `¿Cuántos kelvin son ${fmt(c, 1)} °C?`,
          `Wie viel Kelvin sind ${fmt(c, 2)} °C?`,
        ],
        k,
        [c - 273.15, 273.15 - c, c + 373.15, c + 300],
        (x) => num(x, "K"),
        r,
        (x) => x !== c,
      );
      numQ(
        "sci.temperature",
        `k2c:${c}`,
        "medium",
        [
          `What is ${fmt(k, 0)} K in degrees Celsius?`,
          `¿Cuántos grados Celsius son ${fmt(k, 1)} K?`,
          `Wie viel Grad Celsius sind ${fmt(k, 2)} K?`,
        ],
        c,
        [k + 273.15, c + 100, c - 100, c + 32],
        (x) => num(x, "°C"),
        r,
      );
    }
  }

  facts("sci.constant", [
    [
      "pi",
      [
        "What is π rounded to two decimal places?",
        "¿Cuánto vale π redondeado a dos decimales?",
        "Wie lautet π auf zwei Nachkommastellen gerundet?",
      ],
      num(3.14),
      [3.41, 3.12, 2.72, 1.62].map((x) => num(x)),
      "easy",
    ],
    [
      "e",
      [
        "What is Euler's number e to three decimal places?",
        "¿Cuánto vale el número e con tres decimales?",
        "Wie lautet die eulersche Zahl e auf drei Nachkommastellen?",
      ],
      num(2.718),
      [3.142, 1.618, 1.414, 2.236].map((x) => num(x)),
      "hard",
    ],
    [
      "light",
      [
        "Roughly how fast does light travel in a vacuum?",
        "¿A qué velocidad viaja aproximadamente la luz en el vacío?",
        "Wie schnell ist Licht im Vakuum ungefähr?",
      ],
      num(300000, "km/s"),
      [30000, 3000000, 3000, 300].map((x) => num(x, "km/s")),
      "medium",
    ],
    [
      "sound",
      [
        "Roughly how fast does sound travel in air at room temperature?",
        "¿A qué velocidad viaja aproximadamente el sonido en el aire a temperatura ambiente?",
        "Wie schnell breitet sich Schall in Luft bei Raumtemperatur ungefähr aus?",
      ],
      num(343, "m/s"),
      [34, 1500, 3430, 120].map((x) => num(x, "m/s")),
      "medium",
    ],
    [
      "g",
      [
        "What is the acceleration due to gravity at the Earth's surface, roughly?",
        "¿Cuánto vale aproximadamente la aceleración de la gravedad en la superficie terrestre?",
        "Wie groß ist die Fallbeschleunigung an der Erdoberfläche ungefähr?",
      ],
      num(9.81, "m/s²"),
      [1.62, 98.1, 0.981, 3.71, 6.67].map((x) => num(x, "m/s²")),
      "medium",
    ],
    [
      "abszero",
      [
        "What is absolute zero in degrees Celsius (rounded)?",
        "¿A cuántos grados Celsius está el cero absoluto (redondeado)?",
        "Bei wie viel Grad Celsius liegt der absolute Nullpunkt (gerundet)?",
      ],
      num(-273, "°C"),
      [-100, -173, -373, -1000, 0].map((x) => num(x, "°C")),
      "medium",
    ],
    [
      "boil",
      [
        "At what temperature does water boil at sea level?",
        "¿A qué temperatura hierve el agua al nivel del mar?",
        "Bei welcher Temperatur siedet Wasser auf Meereshöhe?",
      ],
      num(100, "°C"),
      [80, 90, 110, 120, 150].map((x) => num(x, "°C")),
      "easy",
    ],
    [
      "freeze",
      [
        "At what temperature does pure water freeze at normal pressure?",
        "¿A qué temperatura se congela el agua pura a presión normal?",
        "Bei welcher Temperatur gefriert reines Wasser bei Normaldruck?",
      ],
      num(0, "°C"),
      [-4, 4, 10, -10, -20].map((x) => num(x, "°C")),
      "easy",
    ],
    [
      "densest",
      [
        "At roughly what temperature is water at its densest?",
        "¿A qué temperatura aproximada alcanza el agua su máxima densidad?",
        "Bei etwa welcher Temperatur hat Wasser seine größte Dichte?",
      ],
      num(4, "°C"),
      [0, -4, 20, 37, 100].map((x) => num(x, "°C")),
      "hard",
    ],
    [
      "sun",
      [
        "Roughly how far is the Earth from the Sun?",
        "¿A qué distancia aproximada está la Tierra del Sol?",
        "Wie weit ist die Erde ungefähr von der Sonne entfernt?",
      ],
      ["150 million km", "150 millones de km", "150 Millionen km"],
      [
        ["15 million km", "15 millones de km", "15 Millionen km"],
        ["1.5 billion km", "1500 millones de km", "1,5 Milliarden km"],
        num(384000, "km"),
        ["1.5 million km", "1,5 millones de km", "1,5 Millionen km"],
      ],
      "medium",
    ],
    [
      "moon",
      [
        "Roughly how far is the Moon from the Earth?",
        "¿A qué distancia aproximada está la Luna de la Tierra?",
        "Wie weit ist der Mond ungefähr von der Erde entfernt?",
      ],
      num(384000, "km"),
      [
        num(38400, "km"),
        num(3840000, "km"),
        num(84000, "km"),
        ["150 million km", "150 millones de km", "150 Millionen km"],
      ],
      "medium",
    ],
    [
      "pressure",
      [
        "What is normal air pressure at sea level, roughly?",
        "¿Cuál es, aproximadamente, la presión atmosférica normal al nivel del mar?",
        "Wie hoch ist der normale Luftdruck auf Meereshöhe ungefähr?",
      ],
      num(1013, "hPa"),
      [101, 10130, 500, 2000].map((x) => num(x, "hPa")),
      "medium",
    ],
    [
      "water-density",
      [
        "What is the density of water, roughly?",
        "¿Cuál es la densidad aproximada del agua?",
        "Wie groß ist die Dichte von Wasser ungefähr?",
      ],
      num(1000, "kg/m³"),
      [100, 10000, 1, 7870].map((x) => num(x, "kg/m³")),
      "medium",
    ],
    [
      "avogadro",
      [
        "What is the Avogadro constant (particles per mole), roughly?",
        "¿Cuál es aproximadamente el número de Avogadro (partículas por mol)?",
        "Wie groß ist die Avogadro-Konstante (Teilchen pro Mol) ungefähr?",
      ],
      sciL(6.022, 23),
      [sciL(6.022, 20), sciL(3.14, 23), sciL(6.674, -11), sciL(1.602, -19)],
      "hard",
    ],
    [
      "e-charge",
      [
        "What is the magnitude of the charge of one electron?",
        "¿Cuál es el valor absoluto de la carga de un electrón?",
        "Wie groß ist der Betrag der Ladung eines Elektrons?",
      ],
      sciL(1.602, -19, "C"),
      [
        sciL(9.109, -31, "C"),
        sciL(1.602, 19, "C"),
        sciL(6.022, 23, "C"),
        sciL(1.602, -9, "C"),
      ],
      "hard",
    ],
    [
      "hearing",
      [
        "Which frequency range can young people typically hear?",
        "¿Qué rango de frecuencias puede oír normalmente una persona joven?",
        "Welchen Frequenzbereich hören junge Menschen typischerweise?",
      ],
      same("20 Hz – 20 kHz"),
      [
        "2 Hz – 2 kHz",
        "200 Hz – 200 kHz",
        "20 kHz – 20 MHz",
        "1 Hz – 1 kHz",
      ].map(same),
      "medium",
    ],
    [
      "visible",
      [
        "Which wavelength range does visible light cover, roughly?",
        "¿Qué rango de longitudes de onda abarca aproximadamente la luz visible?",
        "Welchen Wellenlängenbereich umfasst sichtbares Licht ungefähr?",
      ],
      same("400–700 nm"),
      ["4–7 nm", "400–700 µm", "4–7 mm", "40–70 m"].map(same),
      "hard",
    ],
  ]);

  // waves
  {
    const idx = EM.map((_, i) => i); // larger index = shorter wavelength = higher frequency
    const T: [string, L, boolean][] = [
      [
        "short",
        [
          "Which of these has the shortest wavelength?",
          "¿Cuál de estas radiaciones tiene la longitud de onda más corta?",
          "Welche dieser Strahlungsarten hat die kürzeste Wellenlänge?",
        ],
        true,
      ],
      [
        "long",
        [
          "Which of these has the longest wavelength?",
          "¿Cuál de estas radiaciones tiene la longitud de onda más larga?",
          "Welche dieser Strahlungsarten hat die größte Wellenlänge?",
        ],
        false,
      ],
      [
        "hif",
        [
          "Which of these has the highest frequency?",
          "¿Cuál de estas radiaciones tiene la frecuencia más alta?",
          "Welche dieser Strahlungsarten hat die höchste Frequenz?",
        ],
        true,
      ],
      [
        "lof",
        [
          "Which of these has the lowest frequency?",
          "¿Cuál de estas radiaciones tiene la frecuencia más baja?",
          "Welche dieser Strahlungsarten hat die niedrigste Frequenz?",
        ],
        false,
      ],
    ];
    for (const set of combos(idx, 4))
      for (const [k, text, hi] of T) {
        const best = hi ? Math.max(...set) : Math.min(...set);
        const d: D = best === 0 || best === 6 ? "medium" : "hard";
        add(
          "sci.em-wave",
          `${k}:${set.join("")}`,
          SCI,
          d,
          text,
          EM[best],
          set.filter((x) => x !== best).map((i) => EM[i]),
        );
      }
    for (const set of combos(
      LIGHT_COLOURS.map((_, i) => i),
      4,
    ))
      for (const long of [true, false]) {
        const best = long ? Math.min(...set) : Math.max(...set);
        add(
          "sci.light-colour",
          `${long}:${set.join("")}`,
          SCI,
          best === 0 || best === 5 ? "medium" : "hard",
          long
            ? [
                "Which colour of visible light has the longest wavelength?",
                "¿Qué color de la luz visible tiene la longitud de onda más larga?",
                "Welche Farbe des sichtbaren Lichts hat die größte Wellenlänge?",
              ]
            : [
                "Which colour of visible light has the shortest wavelength?",
                "¿Qué color de la luz visible tiene la longitud de onda más corta?",
                "Welche Farbe des sichtbaren Lichts hat die kürzeste Wellenlänge?",
              ],
          LIGHT_COLOURS[best],
          set.filter((x) => x !== best).map((i) => LIGHT_COLOURS[i]),
        );
      }
  }

  // states of matter
  {
    const deAdj = ["festen", "flüssigen", "gasförmigen"];
    const direct = (p: (typeof PHASES)[number]) =>
      p.from + p.to === 2 && p.from !== 1;
    lookup({
      family: "sci.phase",
      category: SCI,
      rows: PHASES,
      variants: 4,
      stem: (x) => x.name[0],
      diff: (x) => x.d,
      text: (x) => [
        `What do we call the change from ${STATES[x.from][0]} ${direct(x) ? "directly " : ""}to ${STATES[x.to][0]}?`,
        `¿Cómo se llama el paso ${direct(x) ? "directo " : ""}de ${STATES[x.from][1]} a ${STATES[x.to][1]}?`,
        `Wie heißt der ${direct(x) ? "direkte " : ""}Übergang vom ${deAdj[x.from]} in den ${deAdj[x.to]} Zustand?`,
      ],
      right: (x) => x.name,
      pool: PHASES.map((p) => p.name),
      label: (l) => l,
    });
    const arrow = (p: (typeof PHASES)[number]): L =>
      [0, 1, 2].map(
        (k) => `${cap(STATES[p.from][k])} → ${STATES[p.to][k]}`,
      ) as L;
    lookup({
      family: "sci.phase-rev",
      category: SCI,
      rows: PHASES,
      variants: 4,
      stem: (x) => x.name[0],
      diff: (x) => x.d,
      text: (x) => [
        `What happens ${x.during[0]}?`,
        `¿Qué ocurre ${x.during[1]}?`,
        `Was passiert ${x.during[2]}?`,
      ],
      right: (x) => arrow(x),
      pool: PHASES.map(arrow),
      label: (l) => l,
    });
  }

  facts("sci.elec-value", [
    [
      "eu-volt",
      [
        "What is the standard voltage of a household socket in most of Europe?",
        "¿Cuál es la tensión estándar de un enchufe doméstico en la mayor parte de Europa?",
        "Welche Spannung liefert eine Haushaltssteckdose in den meisten Ländern Europas?",
      ],
      num(230, "V"),
      [12, 110, 400, 1000].map((x) => num(x, "V")),
      "easy",
    ],
    [
      "us-volt",
      [
        "What is the standard voltage of a household socket in the United States?",
        "¿Cuál es la tensión estándar de un enchufe doméstico en Estados Unidos?",
        "Welche Spannung liefert eine normale Haushaltssteckdose in den USA?",
      ],
      num(120, "V"),
      [12, 60, 230, 400].map((x) => num(x, "V")),
      "medium",
    ],
    [
      "aa",
      [
        "What is the nominal voltage of a single AA alkaline battery?",
        "¿Cuál es la tensión nominal de una pila alcalina AA?",
        "Welche Nennspannung hat eine einzelne AA-Alkalibatterie?",
      ],
      num(1.5, "V"),
      [3, 4.5, 9, 12].map((x) => num(x, "V")),
      "easy",
    ],
    [
      "car",
      [
        "What is the voltage of a typical car battery?",
        "¿Qué tensión tiene la batería de un coche normal?",
        "Welche Spannung hat eine typische Autobatterie?",
      ],
      num(12, "V"),
      [1.5, 3, 110, 230].map((x) => num(x, "V")),
      "easy",
    ],
  ]);

  // ═══ computing ═══
  {
    const units: L[] = [
      "Bit",
      "Byte",
      "Kilobyte",
      "Megabyte",
      "Gigabyte",
      "Terabyte",
      "Petabyte",
    ].map(same);
    for (const set of combos(
      units.map((_, i) => i),
      4,
    ))
      for (const big of [true, false]) {
        const best = big ? Math.max(...set) : Math.min(...set);
        add(
          "sci.data-size",
          `${big}:${set.join("")}`,
          SCI,
          best === 6 || best === 0 ? "medium" : "easy",
          big
            ? [
                "Which of these units stands for the largest amount of data?",
                "¿Cuál de estas unidades representa la mayor cantidad de datos?",
                "Welche dieser Einheiten steht für die größte Datenmenge?",
              ]
            : [
                "Which of these units stands for the smallest amount of data?",
                "¿Cuál de estas unidades representa la menor cantidad de datos?",
                "Welche dieser Einheiten steht für die kleinste Datenmenge?",
              ],
          units[best],
          set.filter((x) => x !== best).map((i) => units[i]),
        );
      }
  }
  for (const [ab, full, fake, d] of ACRONYMS)
    add(
      "sci.acronym",
      ab,
      SCI,
      d,
      [
        `What does the abbreviation ${ab} stand for?`,
        `¿Qué significan las siglas inglesas ${ab}?`,
        `Wofür steht die englische Abkürzung ${ab}?`,
      ],
      same(full),
      fake.map(same),
    );

  // ═══ space ═══
  const moonPlanets = [2, 3, 4, 5, 6, 7];
  lookup({
    family: "sci.moon",
    category: SCI,
    rows: MOONS,
    stem: (x) => x[0][0],
    diff: (x) => x[2],
    text: (x) => [
      `Which planet does the moon ${x[0][0]} orbit?`,
      `¿Alrededor de qué planeta gira la luna ${x[0][1]}?`,
      `Um welchen Planeten kreist der Mond ${x[0][2]}?`,
    ],
    right: (x) => x[1],
    pool: moonPlanets,
    label: planetL,
  });
  which({
    family: "sci.moon-rev",
    category: SCI,
    rows: MOONS,
    per: 6,
    diff: "hard",
    key: (x) => String(x[1]),
    label: (x) => x[0],
    text: (k) => {
      const i = Number(k);
      return [
        `Which of these moons orbits ${PLANETS[i][0]}?`,
        `¿Cuál de estas lunas gira alrededor de ${PLANETS[i][1]}?`,
        `Welcher dieser Monde umkreist ${PLANET_DE_ACC[i]}?`,
      ];
    },
  });
  groupYesNo(
    "sci.no-moon",
    SCI,
    40,
    [0, 1].map(planetL),
    [2, 3, 4, 5, 6, 7].map(planetL),
    "medium",
    [
      "Which of these planets has no moons?",
      "¿Cuál de estos planetas no tiene lunas?",
      "Welcher dieser Planeten hat keinen Mond?",
    ],
  );
  groupYesNo(
    "sci.dwarf-planet",
    SCI,
    60,
    [
      ["Pluto", "Plutón", "Pluto"],
      ["Ceres", "Ceres", "Ceres"],
      ["Eris", "Eris", "Eris"],
      ["Haumea", "Haumea", "Haumea"],
      ["Makemake", "Makemake", "Makemake"],
    ],
    [
      ...[0, 3, 7].map(planetL),
      ...MOONS.filter((m) =>
        ["Titan", "Ganymede", "Europa", "Io", "Triton"].includes(m[0][0]),
      ).map((m) => m[0]),
    ],
    "medium",
    [
      "Which of these is a dwarf planet?",
      "¿Cuál de estos cuerpos celestes es un planeta enano?",
      "Welcher dieser Himmelskörper ist ein Zwergplanet?",
    ],
  );
  lookup({
    family: "sci.planet-fact",
    category: SCI,
    rows: PLANET_FACTS,
    stem: (x) => x[0][0],
    diff: (x) => x[2],
    text: (x) => [
      `Which planet ${x[0][0]}?`,
      `¿Qué planeta ${x[0][1]}?`,
      `Welcher Planet ${x[0][2]}?`,
    ],
    right: (x) => x[1],
    pool: [0, 1, 2, 3, 4, 5, 6, 7],
    label: planetL,
  });
  facts("sci.astro", ASTRO);

  // ═══ human body & biology ═══
  {
    const r = rngFor("sci.body-number");
    for (const [stem, q, a, wrong, unit, d] of BODY_NUMBERS)
      for (let v = 0; v < 3; v++)
        numQ(
          "sci.body-number",
          stem,
          d,
          q,
          a,
          wrong,
          (x) =>
            unit ? (num(x).map((s, k) => `${s} ${unit[k]}`) as L) : num(x),
          r,
        );
  }
  lookup({
    family: "sci.bone",
    category: SCI,
    rows: BONES,
    stem: (x) => x.id,
    diff: (x) => x.d,
    text: (x) => x.q,
    right: (x) => x.label,
    pool: [...new Map(BONES.map((b) => [b.label[0], b.label])).values()],
    label: (l) => l,
  });
  lookup({
    family: "sci.vitamin",
    category: SCI,
    rows: VITAMINS,
    stem: (x) => x[0],
    diff: (x) => x[3],
    text: (x) => x[1],
    right: (x) => x[2],
    pool: VITAMIN_KEYS,
    label: (k) => [`Vitamin ${k}`, `Vitamina ${k}`, `Vitamin ${k}`],
  });
  lookup({
    family: "sci.cell",
    category: SCI,
    rows: CELL_PARTS,
    stem: (x) => x.label[0],
    diff: (x) => x.d,
    text: (x) => [
      `Which part of a cell ${x.q[0]}?`,
      `¿Qué parte de la célula ${x.q[1]}?`,
      `Welcher Zellbestandteil ${x.q[2]}?`,
    ],
    right: (x) => x.label,
    pool: CELL_PARTS.map((c) => c.label),
    label: (l) => l,
  });
  lookup({
    family: "sci.branch",
    category: SCI,
    rows: BRANCHES,
    stem: (x) => x.name[0],
    diff: (x) => x.d,
    text: (x) => [
      `What does ${low(x.name[0])} study?`,
      `¿Qué estudia la ${low(x.name[1])}?`,
      `Womit beschäftigt sich die ${x.name[2]}?`,
    ],
    right: (x) => x,
    pool: BRANCHES,
    label: (x) => x.what,
    ok: (x, c) => !x.g || x.g !== c.g,
  });
  lookup({
    family: "sci.branch-rev",
    category: SCI,
    rows: BRANCHES,
    stem: (x) => x.name[0],
    diff: (x) => x.d,
    text: (x) => [
      `Which field studies ${x.ph[0]}?`,
      `¿Qué disciplina estudia ${x.ph[1]}?`,
      `Welches Fachgebiet beschäftigt sich ${x.ph[2]}?`,
    ],
    right: (x) => x,
    pool: BRANCHES,
    label: (x) => x.name,
    ok: (x, c) => !x.g || x.g !== c.g,
  });

  // ═══ maths ═══
  {
    const r = rngFor("sci.polygon");
    for (let n = 5; n <= 12; n++) {
      const [en, es, de] = POLYGONS[n];
      const d: D = [5, 6, 8].includes(n)
        ? "easy"
        : [9, 11].includes(n)
          ? "hard"
          : "medium";
      for (let v = 0; v < 3; v++)
        numQ(
          "sci.polygon",
          en,
          d,
          [
            `How many sides does ${/^[aeiou]/.test(en) ? "an" : "a"} ${en} have?`,
            `¿Cuántos lados tiene un ${es}?`,
            `Wie viele Seiten hat ein ${de}?`,
          ],
          n,
          [n - 3, n - 2, n - 1, n + 1, n + 2, n + 3].filter((x) => x >= 3),
          (x) => num(x),
          r,
        );
    }
    const names = (n: number): L =>
      capL([POLYGONS[n][0], POLYGONS[n][1], POLYGONS[n][2]]);
    lookup({
      family: "sci.polygon-rev",
      category: SCI,
      rows: [5, 6, 7, 8, 9, 10, 11, 12],
      stem: String,
      diff: (n) =>
        [5, 6, 8].includes(n)
          ? "easy"
          : [9, 11].includes(n)
            ? "hard"
            : "medium",
      text: (n) => [
        `What is a polygon with ${n} sides called?`,
        `¿Cómo se llama un polígono de ${n} lados?`,
        `Wie nennt man ein Vieleck mit ${n} Seiten?`,
      ],
      right: (n) => n,
      pool: [5, 6, 7, 8, 9, 10, 11, 12],
      label: names,
    });
    const ra = rngFor("sci.angles");
    const deg = (x: number) => same(`${x}°`);
    for (let n = 3; n <= 12; n++) {
      const [en, es, , de] = POLYGONS[n];
      const s = (n - 2) * 180;
      for (let v = 0; v < 2; v++)
        numQ(
          "sci.angles",
          `sum:${n}`,
          n <= 4 ? "easy" : "medium",
          [
            `What is the sum of the interior angles of ${/^[aeiou]/.test(en) ? "an" : "a"} ${en}?`,
            `¿Cuánto suman los ángulos interiores de un ${es}?`,
            `Wie groß ist die Summe der Innenwinkel eines ${de}s?`,
          ],
          s,
          [s - 180, s + 180, s - 360, s + 360, n * 180, 360],
          deg,
          ra,
          (x) => x > 0,
        );
    }
    for (const n of [3, 5, 6, 8, 9, 10, 12]) {
      const [en, es, , de] = POLYGONS[n];
      const a = 180 - 360 / n;
      for (let v = 0; v < 2; v++)
        numQ(
          "sci.angles",
          `each:${n}`,
          n === 3 || n === 6 ? "medium" : "hard",
          [
            `How big is each interior angle of a regular ${en}?`,
            `¿Cuánto mide cada ángulo interior de un ${es} regular?`,
            `Wie groß ist jeder Innenwinkel eines regelmäßigen ${de}s?`,
          ],
          a,
          [
            ...[3, 4, 5, 6, 8, 9, 10, 12]
              .filter((k) => k !== n)
              .map((k) => 180 - 360 / k),
            360 / n,
          ],
          deg,
          ra,
          (x) => Number.isInteger(x),
        );
    }
  }
  {
    const primes = [
      11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79,
      83, 89, 97,
    ];
    const odd = [21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93, 99];
    groupYesNo(
      "sci.prime",
      SCI,
      150,
      primes.map((n) => same(String(n))),
      odd.map((n) => same(String(n))),
      "medium",
      [
        "Which of these numbers is a prime number?",
        "¿Cuál de estos números es primo?",
        "Welche dieser Zahlen ist eine Primzahl?",
      ],
    );
    const r = rngFor("sci.square");
    for (let n = 4; n <= 25; n++) {
      const d: D = n <= 12 ? "easy" : "medium";
      numQ(
        "sci.square",
        `sqrt:${n}`,
        d,
        [
          `What is the square root of ${n * n}?`,
          `¿Cuál es la raíz cuadrada de ${n * n}?`,
          `Was ist die Quadratwurzel aus ${n * n}?`,
        ],
        n,
        [n - 1, n + 1, n - 2, n + 2, 2 * n],
        (x) => num(x),
        r,
      );
      numQ(
        "sci.square",
        `sq:${n}`,
        d,
        [`What is ${n}²?`, `¿Cuánto es ${n}²?`, `Was ergibt ${n}²?`],
        n * n,
        [2 * n, (n - 1) ** 2, (n + 1) ** 2, n * n + n, n * n - n],
        (x) => num(x),
        r,
      );
    }
  }
}
