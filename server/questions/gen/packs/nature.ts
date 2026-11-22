import type { PackApi } from "../generate";
import type { Difficulty } from "../../../../src/shared/types";
import {
  ALIVE_ODD, BABIES, CLOUD_FACTS, CLOUDS, COLOUR_CHANGERS, COLOURS, DIETS, DINOS, DIURNAL, EGG_MAMMALS, EXTINCT, FLIGHTLESS, FLOWERING,
  FLOWERLESS, FLYING_BIRDS, FOODS, FUNGI, GEMS, GILL_SEA, HABITAT_ANIMALS, HABITATS, HARMLESS, HIBERNATORS, LIFE_CYCLES, LIFESPANS,
  LIVE_BIRTH_MAMMALS, LUNG_SEA, MARSUPIALS, MIGRANTS, MOHS, NO_COLOUR_CHANGE, NOCTURNAL, NORTH_COUNTRIES, PERIODS, PLACENTALS, PLAIN,
  PLANT_JOBS, PLANT_PARTS, PLANTS, RESIDENTS, ROCK_TYPES, ROCKS, SEASON_MONTHS, SOUNDS, SOUTH_COUNTRIES, SPEEDS, SPOTTED, STORM_REGIONS,
  STORMS, STRIPED, SYMBOLS, TERMS, VENOMOUS, WINTER_ACTIVE, type L,
} from "./nature-data";

/** Hand-written question: difficulty, text, correct answer, three wrong answers. */
type HQ = [Difficulty, L, L, L, L, L];

/** Extra question types for the "nature" category. */
export default function pack(api: PackApi) {
  const { add, lookup, which, groupYesNo, extremeOf, capL } = api;
  const C = "nature" as const;
  const hand = (family: string, qs: HQ[]) => qs.forEach(([d, t, c, w1, w2, w3], i) => add(family, String(i), C, d, t, c, [w1, w2, w3]));

  // ── baby animals ──
  const babyOf = (id: string) => BABIES.find((b) => b.id === id)!;
  lookup({ family: "nat.baby", category: C, rows: BABIES, stem: (x) => x.id, diff: (x) => (["frog", "goat", "pig"].includes(x.id) ? "medium" : "easy"),
    text: (x) => [`What is a baby ${api.low(x.animal[0])} called?`, `¿Cómo se llama la cría ${x.esDe}?`, `Wie nennt man das Jungtier ${x.deGen}?`],
    right: (x) => x.baby, pool: BABIES.map((b) => b.baby), label: (l) => l, ok: (x, a) => !(x.not ?? []).some((id) => babyOf(id).baby[0] === a[0]) });
  lookup({ family: "nat.baby-rev", category: C, rows: BABIES, stem: (x) => x.id, diff: (x) => (["goat", "pig"].includes(x.id) ? "medium" : "easy"),
    text: (x) => [`Which animal's baby is called a ${api.low(x.baby[0])}?`, `¿De qué animal es la cría que se llama «${api.low(x.baby[1])}»?`, `Bei welchem Tier heißt das Jungtier „${x.baby[2]}“?`],
    right: (x) => x.animal, pool: BABIES.map((b) => b.animal), label: (l) => l, ok: (x, a) => !(x.not ?? []).some((id) => babyOf(id).animal[0] === a[0]) });

  // ── birds that cannot / can fly ──
  groupYesNo("nat.flightless", C, 160, FLIGHTLESS, FLYING_BIRDS, "easy",
    ["Which of these birds cannot fly?", "¿Cuál de estas aves no puede volar?", "Welcher dieser Vögel kann nicht fliegen?"]);
  groupYesNo("nat.can-fly", C, 120, FLYING_BIRDS, FLIGHTLESS, "easy",
    ["Which of these birds can fly?", "¿Cuál de estas aves puede volar?", "Welcher dieser Vögel kann fliegen?"]);

  // ── mammal oddities ──
  groupYesNo("nat.marsupial", C, 140, MARSUPIALS, PLACENTALS, "medium",
    ["Which of these animals is a marsupial (carries its young in a pouch)?", "¿Cuál de estos animales es un marsupial (lleva a sus crías en una bolsa)?", "Welches dieser Tiere ist ein Beuteltier (trägt seine Jungen in einem Beutel)?"]);
  groupYesNo("nat.egg-mammal", C, 80, EGG_MAMMALS, LIVE_BIRTH_MAMMALS, "medium",
    ["Which of these mammals lays eggs?", "¿Cuál de estos mamíferos pone huevos?", "Welches dieser Säugetiere legt Eier?"]);

  // ── behaviour ──
  groupYesNo("nat.nocturnal", C, 160, NOCTURNAL, DIURNAL, "easy",
    ["Which of these animals is mainly active at night?", "¿Cuál de estos animales es sobre todo nocturno?", "Welches dieser Tiere ist vor allem nachts aktiv?"]);
  groupYesNo("nat.hibernate", C, 120, HIBERNATORS, WINTER_ACTIVE, "medium",
    ["Which of these animals hibernates (sleeps through the winter)?", "¿Cuál de estos animales hiberna durante el invierno?", "Welches dieser Tiere hält Winterschlaf?"]);
  groupYesNo("nat.migrate", C, 120, MIGRANTS, RESIDENTS, "medium",
    ["Which of these European birds flies to Africa for the winter?", "¿Cuál de estas aves europeas pasa el invierno en África?", "Welcher dieser europäischen Vögel fliegt im Winter nach Afrika?"]);
  groupYesNo("nat.venomous", C, 160, VENOMOUS, HARMLESS, "medium",
    ["Which of these animals is venomous?", "¿Cuál de estos animales es venenoso?", "Welches dieser Tiere ist giftig?"]);
  groupYesNo("nat.colour-change", C, 120, COLOUR_CHANGERS, NO_COLOUR_CHANGE, "medium",
    ["Which of these animals can quickly change the colour of its skin?", "¿Cuál de estos animales puede cambiar rápidamente el color de su piel?", "Welches dieser Tiere kann schnell die Farbe seiner Haut ändern?"]);
  groupYesNo("nat.lungs", C, 140, LUNG_SEA, GILL_SEA, "medium",
    ["Which of these sea animals breathes air with lungs?", "¿Cuál de estos animales marinos respira aire con pulmones?", "Welches dieser Meerestiere atmet mit Lungen Luft?"]);
  groupYesNo("nat.gills", C, 140, GILL_SEA, LUNG_SEA, "medium",
    ["Which of these water animals breathes with gills?", "¿Cuál de estos animales acuáticos respira por branquias?", "Welches dieser Wassertiere atmet mit Kiemen?"]);
  groupYesNo("nat.extinct", C, 160, EXTINCT, ALIVE_ODD, "medium",
    ["Which of these animals is extinct (no longer lives anywhere on Earth)?", "¿Cuál de estos animales está extinto (ya no vive en ninguna parte de la Tierra)?", "Welches dieser Tiere ist ausgestorben (lebt nirgends mehr auf der Erde)?"]);
  groupYesNo("nat.stripes", C, 120, STRIPED, [...SPOTTED, ...PLAIN], "easy",
    ["Which of these animals is famous for its stripes?", "¿Cuál de estos animales es famoso por sus rayas?", "Welches dieser Tiere ist für seine Streifen bekannt?"]);
  groupYesNo("nat.spots", C, 120, SPOTTED, [...STRIPED.filter((x) => x[0] !== "Skunk"), ...PLAIN], "easy",
    ["Which of these animals is famous for its spots?", "¿Cuál de estos animales es famoso por sus manchas?", "Welches dieser Tiere ist für seine Flecken bekannt?"]);

  // ── what animals eat ──
  const foodKeys = Object.keys(FOODS);
  lookup({ family: "nat.diet", category: C, rows: DIETS, stem: (x) => x.id, diff: (x) => (["koala", "panda", "hummingbird", "cow", "pelican"].includes(x.id) ? "easy" : "medium"),
    text: (x) => [`What does ${x.en} mainly eat?`, `¿De qué se alimenta principalmente ${x.es}?`, `Wovon ernährt sich ${x.de} hauptsächlich?`],
    right: (x) => x.food, pool: foodKeys, label: (k) => FOODS[k].l, ok: (x, k) => !(x.not ?? []).includes(k) });
  which({ family: "nat.diet-rev", category: C, rows: DIETS, per: 10, diff: (k) => (["bamboo", "eucalyptus", "nectar", "grass", "fish"].includes(k) ? "easy" : "medium"),
    key: (x) => x.food, label: (x) => x.name,
    text: (k) => [`Which of these animals feeds mainly on ${api.low(FOODS[k].l[0])}?`, `¿Cuál de estos animales se alimenta principalmente de ${api.low(FOODS[k].l[1])}?`, `Welches dieser Tiere ernährt sich hauptsächlich von ${FOODS[k].deDat}?`],
    ok: (_, cand, k) => !(cand.not ?? []).includes(k) });

  // ── habitats ──
  const habKeys = Object.keys(HABITATS);
  lookup({ family: "nat.habitat", category: C, rows: HABITAT_ANIMALS, stem: (x) => x[0][0], diff: (x) => (["Thorny devil", "Okapi", "Warthog", "Wildebeest", "Fennec fox"].includes(x[0][0]) ? "medium" : "easy"),
    text: (x) => [`Where does the ${api.low(x[0][0])} usually live?`, `¿Dónde vive normalmente este animal: ${api.low(x[0][1])}?`, `Wo lebt dieses Tier normalerweise: ${x[0][2]}?`],
    right: (x) => x[1], pool: habKeys, label: (k) => HABITATS[k].l, ok: (x, k) => !(x[2] ?? []).includes(k) });
  which({ family: "nat.habitat-rev", category: C, rows: HABITAT_ANIMALS, per: 25, diff: "easy", key: (x) => x[1], label: (x) => x[0],
    text: (k) => { const h = HABITATS[k]; return [`Which of these animals lives ${h.enIn}?`, `¿Cuál de estos animales vive ${h.esIn}?`, `Welches dieser Tiere lebt ${h.deIn}?`]; },
    ok: (_, cand, k) => !(cand[2] ?? []).includes(k) });

  // ── comparisons ──
  extremeOf({ family: "nat.fastest", category: C, n: 250, rows: SPEEDS, max: true, minRatio: 1.5,
    text: ["Which of these animals is the fastest on land?", "¿Cuál de estos animales es el más rápido en tierra?", "Welches dieser Tiere ist an Land am schnellsten?"] });
  extremeOf({ family: "nat.slowest", category: C, n: 200, rows: SPEEDS, max: false, minRatio: 1.5,
    text: ["Which of these animals is the slowest?", "¿Cuál de estos animales es el más lento?", "Welches dieser Tiere ist am langsamsten?"] });
  extremeOf({ family: "nat.longest-life", category: C, n: 150, rows: LIFESPANS, max: true, minRatio: 2,
    text: ["Which of these animals can live the longest?", "¿Cuál de estos animales puede vivir más años?", "Welches dieser Tiere kann am ältesten werden?"] });
  extremeOf({ family: "nat.shortest-life", category: C, n: 120, rows: LIFESPANS, max: false, minRatio: 2,
    text: ["Which of these animals usually has the shortest life?", "¿Cuál de estos animales suele vivir menos tiempo?", "Welches dieser Tiere hat normalerweise das kürzeste Leben?"] });
  extremeOf({ family: "nat.mohs-hardest", category: C, n: 120, rows: MOHS, max: true, diff: "medium",
    text: ["Which of these minerals is the hardest (Mohs scale)?", "¿Cuál de estos minerales es el más duro (escala de Mohs)?", "Welches dieser Minerale ist am härtesten (Mohs-Skala)?"] });
  extremeOf({ family: "nat.mohs-softest", category: C, n: 100, rows: MOHS, max: false, diff: "hard",
    text: ["Which of these minerals is the softest (Mohs scale)?", "¿Cuál de estos minerales es el más blando (escala de Mohs)?", "Welches dieser Minerale ist am weichsten (Mohs-Skala)?"] });

  // ── dinosaurs ──
  const dinoL = (d: (typeof DINOS)[number]) => d[0];
  groupYesNo("nat.dino-plant", C, 150, DINOS.filter((d) => d[1] === "plant").map(dinoL), DINOS.filter((d) => d[1] === "meat").map(dinoL), "medium",
    ["Which of these dinosaurs was a plant-eater?", "¿Cuál de estos dinosaurios era herbívoro?", "Welcher dieser Dinosaurier war ein Pflanzenfresser?"]);
  groupYesNo("nat.dino-meat", C, 150, DINOS.filter((d) => d[1] === "meat").map(dinoL), DINOS.filter((d) => d[1] === "plant").map(dinoL), "medium",
    ["Which of these dinosaurs was a meat-eater?", "¿Cuál de estos dinosaurios era carnívoro?", "Welcher dieser Dinosaurier war ein Fleischfresser?"]);
  lookup({ family: "nat.dino-period", category: C, rows: DINOS, variants: 1, stem: (x) => x[0][0], diff: (x) => (x[3] ? "medium" : "hard"),
    text: (x) => [`In which geological period did ${x[0][0]} live?`, `¿En qué periodo geológico vivió el ${x[0][1]}?`, `In welcher Periode der Erdgeschichte lebte der ${x[0][2]}?`],
    right: (x) => x[2], pool: Object.keys(PERIODS), label: (k) => PERIODS[k].l });
  which({ family: "nat.dino-period-rev", category: C, rows: DINOS, per: 20, diff: "hard", key: (x) => x[2], label: dinoL,
    text: (k) => { const p = PERIODS[k]; return [`Which of these dinosaurs lived in ${p.enIn} period?`, `¿Cuál de estos dinosaurios vivió en ${p.esIn}?`, `Welcher dieser Dinosaurier lebte ${p.deIn}?`]; } });

  // ── rocks & gems ──
  which({ family: "nat.rock-type", category: C, rows: ROCKS, per: 30, diff: "hard", key: (x) => x[1], label: (x) => x[0], text: (k) => ROCK_TYPES[k] });
  lookup({ family: "nat.gem-colour", category: C, rows: GEMS, variants: 3, stem: (x) => x.name[0], diff: (x) => (["Ruby", "Emerald", "Sapphire", "Pearl"].includes(x.name[0]) ? "easy" : "medium"),
    text: (x) => [`What colour is ${x.en} usually?`, `¿De qué color suele ser ${x.es}?`, `Welche Farbe hat ${x.de} normalerweise?`],
    right: (x) => x.colour, pool: Object.keys(COLOURS), label: (k) => COLOURS[k].l });
  which({ family: "nat.gem-colour-rev", category: C, rows: GEMS.filter((g) => g.rev), per: 12, diff: "medium", key: (x) => x.colour, label: (x) => x.name,
    text: (k) => { const c = COLOURS[k]; return [`Which of these gems is usually ${c.en}?`, `¿Cuál de estas gemas suele ser ${c.esF}?`, `Welcher dieser Schmucksteine ist normalerweise ${c.de}?`]; } });

  // ── weather ──
  const cloudKeys = Object.keys(CLOUDS);
  lookup({ family: "nat.cloud", category: C, rows: CLOUD_FACTS, variants: 4, stem: (x) => x[0][0], diff: (x) => (x[1] === "cumulonimbus" ? "medium" : "hard"),
    text: (x) => x[0], right: (x) => x[1], pool: cloudKeys, label: (k) => CLOUDS[k], ok: (x, k) => !x[2].includes(k) });
  for (const [en, es, de, key] of STORM_REGIONS) {
    const wrong = key === "cyclone" ? ["hurricane", "typhoon", "tornado"] : ["hurricane", "typhoon", "tornado", "monsoon"].filter((k) => k !== key);
    add("nat.storm-name", en, C, key === "hurricane" ? "medium" : "hard",
      [`What is a very strong tropical storm called when it hits ${en}?`, `¿Cómo se llama una tormenta tropical muy fuerte cuando llega ${es}?`, `Wie nennt man einen sehr starken tropischen Wirbelsturm ${de}?`],
      STORMS[key], wrong.map((k) => STORMS[k]));
  }

  // ── seasons ──
  for (const [ids, south] of [[SOUTH_COUNTRIES, true], [NORTH_COUNTRIES, false]] as const) {
    for (const id of ids) {
      const c = api.byId.get(id);
      if (!c) continue;
      for (const [season, months] of [["summer", south ? "djf" : "jja"], ["winter", south ? "jja" : "djf"]] as const) {
        const sl: L = season === "summer" ? ["summer", "verano", "Sommer"] : ["winter", "invierno", "Winter"];
        add("nat.season-months", `${id}:${season}`, C, south ? "medium" : "easy",
          [`In which months is it ${sl[0]} in ${c.enSubj}?`, `¿En qué meses es ${sl[1]} en ${c.esSubj}?`, `In welchen Monaten ist ${c.deIn} ${sl[2]}?`],
          SEASON_MONTHS[months], Object.keys(SEASON_MONTHS).filter((k) => k !== months).map((k) => SEASON_MONTHS[k]));
      }
    }
  }
  const southL = SOUTH_COUNTRIES.map((id) => api.byId.get(id)).filter((c) => c).map((c) => c!.name);
  const northL = NORTH_COUNTRIES.map((id) => api.byId.get(id)).filter((c) => c).map((c) => c!.name);
  groupYesNo("nat.summer-christmas", C, 120, southL, northL, "medium",
    ["In which of these countries is it summer at Christmas?", "¿En cuál de estos países es verano en Navidad?", "In welchem dieser Länder ist an Weihnachten Sommer?"]);

  // ── plants ──
  groupYesNo("nat.no-flowers", C, 100, FLOWERLESS, FLOWERING, "medium",
    ["Which of these plants never produces flowers?", "¿Cuál de estas plantas nunca da flores?", "Welche dieser Pflanzen bildet nie Blüten?"]);
  groupYesNo("nat.fungus", C, 120, FUNGI, PLANTS, "medium",
    ["Which of these is a fungus, not a plant?", "¿Cuál de estos es un hongo y no una planta?", "Was davon ist ein Pilz und keine Pflanze?"]);
  const partKeys = Object.keys(PLANT_PARTS);
  lookup({ family: "nat.plant-part", category: C, rows: PLANT_JOBS, variants: 3, stem: (x) => x[0][0], diff: (x) => (["roots", "flower"].includes(x[1]) ? "easy" : "medium"),
    text: (x) => x[0], right: (x) => x[1], pool: partKeys, label: (k) => PLANT_PARTS[k], ok: (x, k) => !x[2].includes(k) });

  // ── life cycles ──
  const esDe = (s: string) => `de ${s}`.replace(/^de el /, "del ");
  for (const lc of LIFE_CYCLES) {
    const st = lc.stages;
    const opts = (i: number): [L, L[]] => [st[i].l, st.filter((_, j) => j !== i).map((s) => s.l)];
    const pre: L = [`In the life cycle of ${lc.en}`, `En el ciclo de vida de ${lc.es}`, `Im Lebenszyklus ${lc.deGen}`];
    for (let i = 0; i < 3; i++) {
      const [c, w] = opts(i + 1);
      add("nat.life-cycle", `${lc.en}:after:${i}`, C, lc.diff,
        [`${pre[0]}, which stage comes right after ${st[i].en}?`, `${pre[1]}, ¿qué fase viene justo después ${esDe(st[i].esArt)}?`, `${pre[2]}: Welches Stadium folgt direkt auf ${st[i].deAcc}?`], c, w);
    }
    for (let i = 1; i < 4; i++) {
      const [c, w] = opts(i - 1);
      add("nat.life-cycle", `${lc.en}:before:${i}`, C, lc.diff,
        [`${pre[0]}, which stage comes right before ${st[i].en}?`, `${pre[1]}, ¿qué fase viene justo antes ${esDe(st[i].esArt)}?`, `${pre[2]}: Welches Stadium kommt direkt vor ${st[i].deDat}?`], c, w);
    }
    const [c, w] = opts(0);
    add("nat.life-cycle", `${lc.en}:first`, C, lc.diff,
      [`${pre[0]}, what is the very first stage?`, `${pre[1]}, ¿cuál es la primera fase?`, `${pre[2]}: Welches ist das allererste Stadium?`], c, w);
  }

  // ── national symbols ──
  const symCountries = [...new Set(SYMBOLS.map((s) => s.country))];
  lookup({ family: "nat.symbol", category: C, rows: SYMBOLS, variants: 3, stem: (x) => x.name[0], diff: (x) => (["usa", "australia", "canada", "china", "new_zealand"].includes(x.country) ? "easy" : "medium"),
    text: (x) => [`${x.subj[0]} is a national symbol of which country?`, `¿De qué país es símbolo nacional ${x.subj[1]}?`, `${x.subj[2]} ist ein Nationalsymbol welches Landes?`],
    right: (x) => x.country, pool: symCountries, label: (id) => api.byId.get(id)!.name, ok: (x, id) => id !== x.country && !(x.not ?? []).includes(id) });
  which({ family: "nat.symbol-rev", category: C, rows: SYMBOLS, per: 8, diff: "medium", key: (x) => x.country, label: (x) => x.name,
    text: (k) => { const c = api.byId.get(k)!; return [`Which of these is a national symbol of ${c.enSubj}?`, `¿Cuál de estos es un símbolo nacional ${c.esDe}?`, `Was davon ist ein Nationalsymbol ${c.deVon}?`]; },
    ok: (_, cand, k) => !(cand.not ?? []).includes(k) });

  // ── animal sounds ──
  const soundOf = (id: string) => SOUNDS.find((s) => s.id === id)!;
  lookup({ family: "nat.sound", category: C, rows: SOUNDS, variants: 3, stem: (x) => x.id, diff: (x) => (["donkey", "elephant", "sheep"].includes(x.id) ? "medium" : "easy"),
    text: (x) => [`What sound does ${x.en} make?`, `¿Qué sonido hace ${x.es}?`, `Welchen Laut gibt ${x.de} von sich?`],
    right: (x) => x.sound, pool: SOUNDS.map((s) => s.sound), label: (l) => l, ok: (x, a) => !(x.not ?? []).some((id) => soundOf(id).sound[0] === a[0]) });
  lookup({ family: "nat.sound-rev", category: C, rows: SOUNDS, variants: 3, stem: (x) => x.id, diff: (x) => (["donkey", "elephant", "sheep"].includes(x.id) ? "medium" : "easy"),
    text: (x) => [`Which of these animals ${x.verb[0]}?`, `¿Cuál de estos animales ${x.verb[1]}?`, `Welches dieser Tiere ${x.verb[2]}?`],
    right: (x) => x.animal, pool: SOUNDS.map((s) => s.animal), label: (l) => l, ok: (x, a) => !(x.not ?? []).some((id) => soundOf(id).animal[0] === a[0]) });

  // ── vocabulary ──
  const termOf = (id: string) => TERMS.find((t) => t.id === id)!;
  const termOk = (x: (typeof TERMS)[number], t: (typeof TERMS)[number]) => t.group === x.group && !(x.not ?? []).includes(t.id) && !(t.not ?? []).includes(x.id);
  lookup({ family: "nat.term", category: C, rows: TERMS, variants: 3, stem: (x) => x.id, diff: (x) => (x.group === "eat" && x.id !== "scavenger" ? "easy" : "medium"),
    text: (x) => x.ask, right: (x) => x, pool: TERMS, label: (t) => t.term, ok: termOk });
  lookup({ family: "nat.term-rev", category: C, rows: TERMS, variants: 3, stem: (x) => x.id, diff: (x) => (x.group === "eat" && x.id !== "scavenger" ? "easy" : "medium"),
    text: (x) => [`What does the word “${api.low(x.term[0])}” mean in biology?`, `¿Qué significa la palabra «${api.low(x.term[1])}» en biología?`, `Was bedeutet das Wort „${x.term[2]}“ in der Biologie?`],
    right: (x) => x, pool: TERMS, label: (t) => t.def, ok: termOk });
  void termOf;

  // ── hand-written: records ──
  hand("nat.record", [
    ["easy", ["What is the tallest animal in the world?", "¿Cuál es el animal más alto del mundo?", "Welches ist das höchste Tier der Welt?"],
      ["Giraffe", "Jirafa", "Giraffe"], ["African elephant", "Elefante africano", "Afrikanischer Elefant"], ["Ostrich", "Avestruz", "Strauß"], ["Moose", "Alce", "Elch"]],
    ["medium", ["What is the largest fish in the world?", "¿Cuál es el pez más grande del mundo?", "Welches ist der größte Fisch der Welt?"],
      ["Whale shark", "Tiburón ballena", "Walhai"], ["Great white shark", "Gran tiburón blanco", "Weißer Hai"], ["Blue whale", "Ballena azul", "Blauwal"], ["Bluefin tuna", "Atún rojo", "Roter Thun"]],
    ["medium", ["What is the largest living reptile?", "¿Cuál es el reptil vivo más grande?", "Welches ist das größte lebende Reptil?"],
      ["Saltwater crocodile", "Cocodrilo marino", "Leistenkrokodil"], ["Komodo dragon", "Dragón de Komodo", "Komodowaran"], ["Green anaconda", "Anaconda verde", "Große Anakonda"], ["Green iguana", "Iguana verde", "Grüner Leguan"]],
    ["easy", ["Which is the largest of the big cats?", "¿Cuál es el más grande de los grandes felinos?", "Welche ist die größte Großkatze?"],
      ["Tiger", "Tigre", "Tiger"], ["Leopard", "Leopardo", "Leopard"], ["Jaguar", "Jaguar", "Jaguar"], ["Cheetah", "Guepardo", "Gepard"]],
    ["hard", ["What is the smallest bird in the world?", "¿Cuál es el ave más pequeña del mundo?", "Welches ist der kleinste Vogel der Welt?"],
      ["Bee hummingbird", "Colibrí abeja", "Bienenelfe"], ["House sparrow", "Gorrión común", "Haussperling"], ["Wren", "Chochín", "Zaunkönig"], ["Robin", "Petirrojo", "Rotkehlchen"]],
    ["medium", ["Which bird is the fastest animal in the world when it dives for prey?", "¿Qué ave es el animal más rápido del mundo cuando se lanza en picado a por su presa?", "Welcher Vogel ist im Sturzflug auf Beute das schnellste Tier der Welt?"],
      ["Peregrine falcon", "Halcón peregrino", "Wanderfalke"], ["Ostrich", "Avestruz", "Strauß"], ["Swan", "Cisne", "Schwan"], ["Pigeon", "Paloma", "Taube"]],
    ["medium", ["What is the largest rodent in the world?", "¿Cuál es el roedor más grande del mundo?", "Welches ist das größte Nagetier der Welt?"],
      ["Capybara", "Capibara", "Capybara"], ["Beaver", "Castor", "Biber"], ["Porcupine", "Puercoespín", "Stachelschwein"], ["Rat", "Rata", "Ratte"]],
    ["easy", ["Which is the largest of the great apes?", "¿Cuál es el más grande de los grandes simios?", "Welcher ist der größte Menschenaffe?"],
      ["Gorilla", "Gorila", "Gorilla"], ["Chimpanzee", "Chimpancé", "Schimpanse"], ["Orangutan", "Orangután", "Orang-Utan"], ["Bonobo", "Bonobo", "Bonobo"]],
    ["medium", ["What is the largest penguin?", "¿Cuál es el pingüino más grande?", "Welches ist der größte Pinguin?"],
      ["Emperor penguin", "Pingüino emperador", "Kaiserpinguin"], ["King penguin", "Pingüino rey", "Königspinguin"], ["Adélie penguin", "Pingüino de Adelia", "Adeliepinguin"], ["Little penguin", "Pingüino azul", "Zwergpinguin"]],
    ["easy", ["What is the largest lizard in the world?", "¿Cuál es el lagarto más grande del mundo?", "Welches ist die größte Echse der Welt?"],
      ["Komodo dragon", "Dragón de Komodo", "Komodowaran"], ["Green iguana", "Iguana verde", "Grüner Leguan"], ["Chameleon", "Camaleón", "Chamäleon"], ["Gecko", "Geco", "Gecko"]],
    ["hard", ["Which plant has the largest single flower in the world?", "¿Qué planta tiene la flor individual más grande del mundo?", "Welche Pflanze hat die größte Einzelblüte der Welt?"],
      ["Rafflesia", "Rafflesia", "Rafflesia"], ["Sunflower", "Girasol", "Sonnenblume"], ["Lotus", "Loto", "Lotos"], ["Rose", "Rosa", "Rose"]],
    ["medium", ["What is the largest kind of deer?", "¿Cuál es la especie de ciervo más grande?", "Welches ist die größte Hirschart?"],
      ["Moose", "Alce", "Elch"], ["Reindeer", "Reno", "Rentier"], ["Red deer", "Ciervo común", "Rothirsch"], ["Roe deer", "Corzo", "Reh"]],
    ["easy", ["Which mammal is famous for being the slowest-moving?", "¿Qué mamífero es famoso por ser el que se mueve más despacio?", "Welches Säugetier ist dafür bekannt, sich am langsamsten zu bewegen?"],
      ["Sloth", "Perezoso", "Faultier"], ["Koala", "Koala", "Koala"], ["Hedgehog", "Erizo", "Igel"], ["Mole", "Topo", "Maulwurf"]],
    ["medium", ["Which of these plants is actually a giant grass?", "¿Cuál de estas plantas es en realidad una hierba gigante?", "Welche dieser Pflanzen ist eigentlich ein Riesengras?"],
      ["Bamboo", "Bambú", "Bambus"], ["Palm tree", "Palmera", "Palme"], ["Fern", "Helecho", "Farn"], ["Cactus", "Cactus", "Kaktus"]],
    ["hard", ["Which is the heaviest snake in the world?", "¿Cuál es la serpiente más pesada del mundo?", "Welche ist die schwerste Schlange der Welt?"],
      ["Green anaconda", "Anaconda verde", "Große Anakonda"], ["King cobra", "Cobra real", "Königskobra"], ["Grass snake", "Culebra de collar", "Ringelnatter"], ["Black mamba", "Mamba negra", "Schwarze Mamba"]],
    ["hard", ["What is the largest amphibian in the world?", "¿Cuál es el anfibio más grande del mundo?", "Welches ist die größte Amphibie der Welt?"],
      ["Chinese giant salamander", "Salamandra gigante china", "Chinesischer Riesensalamander"], ["Cane toad", "Sapo de caña", "Aga-Kröte"], ["Axolotl", "Ajolote", "Axolotl"], ["Bullfrog", "Rana toro", "Ochsenfrosch"]],
    ["medium", ["What is the largest marsupial alive today?", "¿Cuál es el marsupial vivo más grande?", "Welches ist das größte heute lebende Beuteltier?"],
      ["Red kangaroo", "Canguro rojo", "Rotes Riesenkänguru"], ["Koala", "Koala", "Koala"], ["Wombat", "Wombat", "Wombat"], ["Opossum", "Zarigüeya", "Opossum"]],
  ]);

  // ── hand-written: animal bodies ──
  hand("nat.body", [
    ["easy", ["An elephant's trunk is mainly its…", "La trompa del elefante es sobre todo su…", "Der Rüssel des Elefanten ist vor allem seine…"],
      ["Nose and upper lip", "Nariz y labio superior", "Nase mit Oberlippe"], ["Tongue", "Lengua", "Zunge"], ["Neck", "Cuello", "Halswirbelsäule"], ["Lower jaw", "Mandíbula inferior", "Unterlippe"]],
    ["hard", ["How many neck bones (vertebrae) does a giraffe have?", "¿Cuántas vértebras tiene el cuello de la jirafa?", "Wie viele Halswirbel hat eine Giraffe?"],
      ["7", "7", "7"], ["3", "3", "3"], ["14", "14", "14"], ["30", "30", "30"]],
    ["medium", ["What does a camel store in its hump?", "¿Qué almacena el camello en su joroba?", "Was speichert ein Kamel in seinem Höcker?"],
      ["Fat", "Grasa", "Fett"], ["Water", "Agua", "Wasser"], ["Milk", "Leche", "Milch"], ["Air", "Aire", "Luft"]],
    ["medium", ["What does a snake mainly use its forked tongue for?", "¿Para qué usa principalmente la serpiente su lengua bífida?", "Wofür benutzt eine Schlange vor allem ihre gespaltene Zunge?"],
      ["Smelling", "Para oler", "Zum Riechen"], ["Hearing", "Para oír", "Zum Hören"], ["Breathing", "Para respirar", "Zum Atmen"], ["Drinking", "Para beber", "Zum Trinken"]],
    ["hard", ["With which part of their body do butterflies taste?", "¿Con qué parte del cuerpo saborean las mariposas?", "Womit schmecken Schmetterlinge?"],
      ["Their feet", "Con las patas", "Mit den Füßen"], ["Their wings", "Con las alas", "Mit den Flügeln"], ["Their eyes", "Con los ojos", "Mit den Augen"], ["Their ears", "Con las orejas", "Mit den Ohren"]],
    ["medium", ["About how far can an owl turn its head?", "¿Aproximadamente cuánto puede girar la cabeza un búho?", "Wie weit kann eine Eule ihren Kopf ungefähr drehen?"],
      ["About 270 degrees", "Unos 270 grados", "Etwa 270 Grad"], ["About 45 degrees", "Unos 45 grados", "Etwa 45 Grad"], ["About 90 degrees", "Unos 90 grados", "Etwa 90 Grad"], ["Exactly 720 degrees", "Exactamente 720 grados", "Genau 720 Grad"]],
    ["medium", ["What is a shark's skeleton made of?", "¿De qué está hecho el esqueleto de un tiburón?", "Woraus besteht das Skelett eines Hais?"],
      ["Cartilage", "Cartílago", "Knorpel"], ["Bone", "Hueso", "Knochen"], ["Shell", "Concha", "Muschelschale"], ["Horn", "Cuerno", "Horn"]],
    ["easy", ["How does a whale breathe?", "¿Cómo respira una ballena?", "Wie atmet ein Wal?"],
      ["Through a blowhole on top of its head", "Por un orificio nasal en lo alto de la cabeza", "Durch ein Blasloch oben auf dem Kopf"], ["Through gills", "Por branquias", "Durch Kiemen"], ["Through its skin", "Por la piel", "Durch die Haut"], ["Through its tail", "Por la cola", "Durch die Schwanzflosse"]],
    ["easy", ["What amazing thing can many starfish (sea stars) do?", "¿Qué cosa asombrosa pueden hacer muchas estrellas de mar?", "Was Erstaunliches können viele Seesterne?"],
      ["Regrow a lost arm", "Regenerar un brazo perdido", "Einen verlorenen Arm nachwachsen lassen"], ["Fly short distances", "Volar distancias cortas", "Kurze Strecken fliegen"], ["Live on dry land for years", "Vivir años en tierra firme", "Jahrelang an Land leben"], ["Sing like a bird", "Cantar como un pájaro", "Wie ein Vogel singen"]],
    ["hard", ["Where are a cricket's ears?", "¿Dónde tiene los oídos un grillo?", "Wo hat eine Grille ihre Ohren?"],
      ["On its front legs", "En las patas delanteras", "An den Vorderbeinen"], ["On its head", "En la cabeza", "Am Kopf"], ["On its wings", "En las alas", "An den Flügeln"], ["It has no ears", "No tiene oídos", "Sie hat keine Ohren"]],
    ["medium", ["How many eyes do most spiders have?", "¿Cuántos ojos tienen la mayoría de las arañas?", "Wie viele Augen haben die meisten Spinnen?"],
      ["8", "8", "8"], ["2", "2", "2"], ["4", "4", "4"], ["12", "12", "12"]],
    ["hard", ["What colour is a polar bear's skin under its fur?", "¿De qué color es la piel del oso polar bajo su pelaje?", "Welche Farbe hat die Haut eines Eisbären unter dem Fell?"],
      ["Black", "Negra", "Schwarz"], ["White", "Blanca", "Weiß"], ["Pink", "Rosa", "Rosa"], ["Yellow", "Amarilla", "Gelb"]],
    ["medium", ["Why are flamingos pink?", "¿Por qué son rosas los flamencos?", "Warum sind Flamingos rosa?"],
      ["Because of the food they eat", "Por lo que comen", "Wegen ihrer Nahrung"], ["Because of the sunlight", "Por la luz del sol", "Wegen des Sonnenlichts"], ["Because they stand in mud", "Porque están en el barro", "Weil sie im Schlamm stehen"], ["Because they are cold", "Porque tienen frío", "Weil ihnen kalt ist"]],
    ["easy", ["Which of these animals has front teeth that never stop growing?", "¿Cuál de estos animales tiene dientes delanteros que nunca dejan de crecer?", "Bei welchem dieser Tiere hören die Vorderzähne nie auf zu wachsen?"],
      ["Rabbit", "Conejo", "Kaninchen"], ["Dog", "Perro", "Hund"], ["Cat", "Gato", "Katze"], ["Lion", "León", "Löwe"]],
    ["medium", ["How many chambers does a cow's stomach have?", "¿Cuántas cavidades tiene el estómago de una vaca?", "Aus wie vielen Kammern besteht der Magen einer Kuh?"],
      ["4", "4", "4"], ["1", "1", "1"], ["2", "2", "2"], ["7", "7", "7"]],
    ["medium", ["How do honeybees tell each other where to find flowers?", "¿Cómo se indican las abejas unas a otras dónde hay flores?", "Wie zeigen Honigbienen einander, wo es Blüten gibt?"],
      ["By dancing", "Bailando", "Durch Tanzen"], ["By singing", "Cantando", "Durch Singen"], ["By changing colour", "Cambiando de color", "Durch Farbwechsel"], ["By drawing in the sand", "Dibujando en la arena", "Durch Zeichnen im Sand"]],
  ]);

  // ── hand-written: sky ──
  hand("nat.sky", [
    ["easy", ["What is the Sun?", "¿Qué es el Sol?", "Was ist die Sonne?"],
      ["A star", "Una estrella", "Ein Stern"], ["A planet", "Un planeta", "Ein Planet"], ["A moon", "Una luna", "Ein Mond"], ["A comet", "Un cometa", "Ein Komet"]],
    ["easy", ["Where does moonlight come from?", "¿De dónde viene la luz de la Luna?", "Woher kommt das Mondlicht?"],
      ["Sunlight reflected by the Moon", "Luz del Sol reflejada por la Luna", "Vom Mond zurückgeworfenes Sonnenlicht"], ["Fire burning on the Moon", "Fuego que arde en la Luna", "Feuer, das auf dem Mond brennt"], ["Lights from cities on Earth", "Luces de las ciudades de la Tierra", "Lichter der Städte auf der Erde"], ["Glowing ice on the Moon", "Hielo brillante en la Luna", "Leuchtendes Eis auf dem Mond"]],
    ["medium", ["About how long is it from one full moon to the next?", "¿Cuánto tiempo pasa aproximadamente de una luna llena a la siguiente?", "Wie lange dauert es ungefähr von einem Vollmond zum nächsten?"],
      ["About 29.5 days", "Unos 29,5 días", "Etwa 29,5 Tage"], ["Exactly 7 days", "Exactamente 7 días", "Genau 7 Tage"], ["About 100 days", "Unos 100 días", "Etwa 100 Tage"], ["About one year", "Alrededor de un año", "Etwa ein Jahr"]],
    ["easy", ["What do we call the Moon when its lit side faces completely away from us and we cannot see it?", "¿Cómo se llama la fase en la que no vemos la Luna porque su cara iluminada no mira hacia nosotros?", "Wie heißt die Mondphase, in der wir den Mond nicht sehen, weil seine beleuchtete Seite von uns weg zeigt?"],
      ["New moon", "Luna nueva", "Neumond"], ["Full moon", "Luna llena", "Vollmond"], ["Half moon", "Media luna", "Halbmond"], ["Blue moon", "Luna azul", "Blauer Mond"]],
    ["medium", ["What mainly causes the tides in the sea?", "¿Qué causa principalmente las mareas del mar?", "Was verursacht hauptsächlich Ebbe und Flut?"],
      ["The pull of the Moon", "La atracción de la Luna", "Die Anziehungskraft des Mondes"], ["Strong winds", "Los vientos fuertes", "Starke Winde"], ["Underwater volcanoes", "Los volcanes submarinos", "Unterwasservulkane"], ["Heavy rain", "La lluvia intensa", "Starker Regen"]],
    ["easy", ["In which direction does the Sun rise?", "¿Por dónde sale el Sol?", "In welcher Himmelsrichtung geht die Sonne auf?"],
      ["East", "Por el este", "Im Osten"], ["West", "Por el oeste", "Im Westen"], ["North", "Por el norte", "Im Norden"], ["South", "Por el sur", "Im Süden"]],
    ["medium", ["When is the longest day of the year in the northern hemisphere?", "¿Cuándo es el día más largo del año en el hemisferio norte?", "Wann ist auf der Nordhalbkugel der längste Tag des Jahres?"],
      ["Around 21 June", "Hacia el 21 de junio", "Um den 21. Juni"], ["Around 21 March", "Hacia el 21 de marzo", "Um den 21. März"], ["Around 21 December", "Hacia el 21 de diciembre", "Um den 21. Dezember"], ["On 1 January", "El 1 de enero", "Am 1. Januar"]],
    ["medium", ["When is the shortest day of the year in the northern hemisphere?", "¿Cuándo es el día más corto del año en el hemisferio norte?", "Wann ist auf der Nordhalbkugel der kürzeste Tag des Jahres?"],
      ["Around 21 December", "Hacia el 21 de diciembre", "Um den 21. Dezember"], ["Around 21 June", "Hacia el 21 de junio", "Um den 21. Juni"], ["Around 23 September", "Hacia el 23 de septiembre", "Um den 23. September"], ["On 1 April", "El 1 de abril", "Am 1. April"]],
    ["easy", ["What is a “shooting star” really?", "¿Qué es en realidad una «estrella fugaz»?", "Was ist eine „Sternschnuppe“ in Wirklichkeit?"],
      ["A tiny space rock burning up in the air", "Una pequeña roca espacial que arde en el aire", "Ein winziger Gesteinsbrocken aus dem All, der in der Luft verglüht"], ["A star falling to Earth", "Una estrella que cae a la Tierra", "Ein Stern, der auf die Erde fällt"], ["A planet passing by", "Un planeta que pasa cerca", "Ein vorbeiziehender Planet"], ["A firework in space", "Un fuego artificial en el espacio", "Ein Feuerwerk im All"]],
    ["medium", ["What causes the northern lights (aurora)?", "¿Qué provoca la aurora boreal?", "Wodurch entstehen Polarlichter?"],
      ["Particles from the Sun hitting the upper air", "Partículas del Sol que chocan con la alta atmósfera", "Teilchen von der Sonne, die auf die obere Lufthülle treffen"], ["Moonlight shining on ice", "La luz de la Luna sobre el hielo", "Mondlicht, das auf Eis scheint"], ["Volcanic eruptions", "Erupciones volcánicas", "Vulkanausbrüche"], ["Lightning far away", "Rayos lejanos", "Weit entfernte Blitze"]],
    ["medium", ["Which star helps travellers find north at night?", "¿Qué estrella ayuda a los viajeros a encontrar el norte de noche?", "Welcher Stern hilft Reisenden nachts, Norden zu finden?"],
      ["Polaris (the North Star)", "La Estrella Polar", "Der Polarstern"], ["Sirius", "Sirio", "Sirius"], ["Betelgeuse", "Betelgeuse", "Beteigeuze"], ["The Sun", "El Sol", "Die Sonne"]],
    ["medium", ["Why is the sky blue on a sunny day?", "¿Por qué el cielo es azul en un día soleado?", "Warum ist der Himmel an sonnigen Tagen blau?"],
      ["The air scatters blue sunlight more than other colours", "El aire dispersa la luz azul del Sol más que otros colores", "Die Luft streut das blaue Sonnenlicht stärker als andere Farben"], ["It reflects the colour of the oceans", "Refleja el color de los océanos", "Er spiegelt die Farbe der Meere"], ["The air is full of blue dust", "El aire está lleno de polvo azul", "Die Luft ist voller blauem Staub"], ["Space behind it is blue", "El espacio detrás es azul", "Das Weltall dahinter ist blau"]],
    ["medium", ["What is special about the equinoxes (around 20 March and 22 September)?", "¿Qué tienen de especial los equinoccios (hacia el 20 de marzo y el 22 de septiembre)?", "Was ist das Besondere an den Tagundnachtgleichen (um den 20. März und den 22. September)?"],
      ["Day and night are about equally long", "El día y la noche duran más o menos lo mismo", "Tag und Nacht sind etwa gleich lang"], ["It is the longest day of the year", "Es el día más largo del año", "Es ist der längste Tag des Jahres"], ["There is always a full moon", "Siempre hay luna llena", "Es ist immer Vollmond"], ["The Sun does not set at all", "El Sol no se pone", "Die Sonne geht gar nicht unter"]],
  ]);

  // ── hand-written: weather ──
  hand("nat.weather", [
    ["medium", ["What causes thunder?", "¿Qué causa el trueno?", "Wodurch entsteht Donner?"],
      ["Lightning heating the air so fast that it bursts outwards", "El rayo calienta el aire tan rápido que este se expande de golpe", "Der Blitz erhitzt die Luft so schnell, dass sie sich explosionsartig ausdehnt"], ["Clouds bumping into each other", "Las nubes chocan entre sí", "Wolken, die zusammenstoßen"], ["Raindrops hitting the ground", "Las gotas de lluvia golpean el suelo", "Regentropfen, die auf den Boden prasseln"], ["Wind blowing through mountains", "El viento que sopla entre montañas", "Wind, der durch Berge pfeift"]],
    ["easy", ["Why do we see lightning before we hear thunder?", "¿Por qué vemos el rayo antes de oír el trueno?", "Warum sehen wir den Blitz, bevor wir den Donner hören?"],
      ["Light travels much faster than sound", "La luz viaja mucho más rápido que el sonido", "Licht ist viel schneller als Schall"], ["Thunder happens a few seconds later", "El trueno se produce unos segundos después", "Der Donner entsteht erst Sekunden später"], ["Our eyes work faster than our ears", "Los ojos funcionan más rápido que los oídos", "Unsere Augen arbeiten schneller als unsere Ohren"], ["Clouds hold back the sound", "Las nubes retienen el sonido", "Die Wolken halten den Schall zurück"]],
    ["easy", ["What do you need to see a rainbow?", "¿Qué hace falta para ver un arcoíris?", "Was braucht man, um einen Regenbogen zu sehen?"],
      ["Sunlight and raindrops", "Luz del sol y gotas de lluvia", "Sonnenlicht und Regentropfen"], ["Moonlight and snow", "Luz de luna y nieve", "Mondlicht und Schnee"], ["Strong wind and clouds", "Viento fuerte y nubes", "Starken Wind und Wolken"], ["Darkness and fog", "Oscuridad y niebla", "Dunkelheit und Nebel"]],
    ["easy", ["How many colours are traditionally named in a rainbow?", "¿Cuántos colores se nombran tradicionalmente en el arcoíris?", "Wie viele Farben zählt man beim Regenbogen traditionell auf?"],
      ["7", "7", "7"], ["5", "5", "5"], ["6", "6", "6"], ["9", "9", "9"]],
    ["easy", ["What is hail?", "¿Qué es el granizo?", "Was ist Hagel?"],
      ["Balls of ice that fall from storm clouds", "Bolas de hielo que caen de las nubes de tormenta", "Eisklumpen, die aus Gewitterwolken fallen"], ["Very heavy snow", "Nieve muy espesa", "Sehr dichter Schnee"], ["Frozen dew on the grass", "Rocío congelado sobre la hierba", "Gefrorener Tau auf dem Gras"], ["Rain mixed with sand", "Lluvia mezclada con arena", "Mit Sand vermischter Regen"]],
    ["medium", ["How many arms or points does a typical snowflake have?", "¿Cuántas puntas tiene un copo de nieve típico?", "Wie viele Arme hat eine typische Schneeflocke?"],
      ["6", "6", "6"], ["4", "4", "4"], ["5", "5", "5"], ["8", "8", "8"]],
    ["easy", ["What is the calm centre of a hurricane called?", "¿Cómo se llama el centro en calma de un huracán?", "Wie heißt das ruhige Zentrum eines Hurrikans?"],
      ["The eye", "El ojo", "Das Auge"], ["The heart", "El corazón", "Das Herz"], ["The mouth", "La boca", "Der Mund"], ["The nose", "La nariz", "Die Nase"]],
    ["easy", ["What is a tornado?", "¿Qué es un tornado?", "Was ist ein Tornado?"],
      ["A violently spinning column of air reaching down from a storm cloud", "Una columna de aire que gira con violencia y baja desde una nube de tormenta", "Eine heftig rotierende Luftsäule, die aus einer Gewitterwolke herabreicht"], ["A giant wave in the sea", "Una ola gigante en el mar", "Eine Riesenwelle im Meer"], ["A hot wind in the desert", "Un viento caliente del desierto", "Ein heißer Wüstenwind"], ["A kind of earthquake", "Un tipo de terremoto", "Eine Art Erdbeben"]],
    ["easy", ["What is fog?", "¿Qué es la niebla?", "Was ist Nebel?"],
      ["A cloud at ground level", "Una nube a ras de suelo", "Eine Wolke am Boden"], ["Smoke from chimneys", "Humo de las chimeneas", "Rauch aus Schornsteinen"], ["Frozen rain", "Lluvia congelada", "Gefrorener Regen"], ["Dust blown by the wind", "Polvo levantado por el viento", "Vom Wind aufgewirbelter Staub"]],
    ["medium", ["What is dew?", "¿Qué es el rocío?", "Was ist Tau?"],
      ["Water vapour from the air forming droplets on cool surfaces", "Vapor de agua del aire que forma gotitas en superficies frías", "Wasserdampf aus der Luft, der sich als Tröpfchen auf kühlen Flächen niederschlägt"], ["Rain that fell during the night", "Lluvia que cayó por la noche", "Regen, der in der Nacht gefallen ist"], ["Water spat out by snails", "Agua que escupen los caracoles", "Von Schnecken ausgespucktes Wasser"], ["Tiny pieces of falling ice", "Pequeños trozos de hielo que caen", "Winzige fallende Eisstückchen"]],
    ["medium", ["What is a monsoon?", "¿Qué es un monzón?", "Was ist ein Monsun?"],
      ["A seasonal wind that brings months of heavy rain", "Un viento estacional que trae meses de lluvias intensas", "Ein jahreszeitlicher Wind, der monatelang starken Regen bringt"], ["A type of tornado", "Un tipo de tornado", "Eine Art Tornado"], ["A winter snowstorm", "Una tormenta de nieve invernal", "Ein winterlicher Schneesturm"], ["A cloud of desert sand", "Una nube de arena del desierto", "Eine Wolke aus Wüstensand"]],
    ["easy", ["What is a drought?", "¿Qué es una sequía?", "Was ist eine Dürre?"],
      ["A long period with very little rain", "Un largo periodo con muy poca lluvia", "Eine lange Zeit mit sehr wenig Regen"], ["A sudden flood", "Una inundación repentina", "Eine plötzliche Überschwemmung"], ["A very cold winter", "Un invierno muy frío", "Ein sehr kalter Winter"], ["A strong thunderstorm", "Una fuerte tormenta eléctrica", "Ein starkes Gewitter"]],
    ["medium", ["What is wind?", "¿Qué es el viento?", "Was ist Wind?"],
      ["Air moving from high pressure to low pressure", "Aire que se mueve de las altas a las bajas presiones", "Luft, die vom Hochdruck zum Tiefdruck strömt"], ["Air pushed by waving trees", "Aire empujado por los árboles al moverse", "Luft, die von wackelnden Bäumen angeschoben wird"], ["Steam rising from the sea", "Vapor que sube del mar", "Dampf, der aus dem Meer aufsteigt"], ["Air escaping from space", "Aire que se escapa al espacio", "Luft, die ins Weltall entweicht"]],
  ]);

  // ── hand-written: Earth, landscapes and ecosystems ──
  hand("nat.earth", [
    ["medium", ["What usually causes a tsunami?", "¿Qué suele provocar un tsunami?", "Wodurch wird ein Tsunami meistens ausgelöst?"],
      ["An earthquake under the sea", "Un terremoto bajo el mar", "Ein Erdbeben unter dem Meer"], ["A very strong wind", "Un viento muy fuerte", "Ein sehr starker Wind"], ["A full moon", "La luna llena", "Der Vollmond"], ["Heavy rain", "Lluvias intensas", "Starker Regen"]],
    ["easy", ["What do we call molten rock once it flows out of a volcano?", "¿Cómo se llama la roca fundida cuando sale de un volcán?", "Wie nennt man geschmolzenes Gestein, wenn es aus einem Vulkan fließt?"],
      ["Lava", "Lava", "Lava"], ["Ash", "Ceniza", "Asche"], ["Steam", "Vapor", "Dampf"], ["Sand", "Arena", "Sand"]],
    ["medium", ["In a cave, what are the stone icicles that hang down from the ceiling called?", "En una cueva, ¿cómo se llaman los «carámbanos» de piedra que cuelgan del techo?", "Wie heißen die steinernen Zapfen, die in einer Höhle von der Decke hängen?"],
      ["Stalactites", "Estalactitas", "Stalaktiten"], ["Stalagmites", "Estalagmitas", "Stalagmiten"], ["Geysers", "Géiseres", "Geysire"], ["Fossils", "Fósiles", "Fossilien"]],
    ["medium", ["What is a geyser?", "¿Qué es un géiser?", "Was ist ein Geysir?"],
      ["A hot spring that shoots water and steam into the air", "Una fuente termal que lanza agua y vapor al aire", "Eine heiße Quelle, die Wasser und Dampf in die Luft schleudert"], ["A frozen waterfall", "Una cascada congelada", "Ein gefrorener Wasserfall"], ["A cave under the sea", "Una cueva bajo el mar", "Eine Höhle unter dem Meer"], ["A very deep lake", "Un lago muy profundo", "Ein sehr tiefer See"]],
    ["easy", ["What is a glacier?", "¿Qué es un glaciar?", "Was ist ein Gletscher?"],
      ["A huge mass of ice that moves slowly", "Una enorme masa de hielo que se mueve lentamente", "Eine riesige, langsam fließende Eismasse"], ["A frozen lake", "Un lago helado", "Ein zugefrorener See"], ["A snow-covered mountain", "Una montaña cubierta de nieve", "Ein schneebedeckter Berg"], ["A cold sea current", "Una corriente marina fría", "Eine kalte Meeresströmung"]],
    ["easy", ["Off the coast of which country is the Great Barrier Reef?", "¿Frente a la costa de qué país está la Gran Barrera de Coral?", "Vor der Küste welches Landes liegt das Great Barrier Reef?"],
      ["Australia", "Australia", "Australien"], ["Brazil", "Brasil", "Brasilien"], ["Mexico", "México", "Mexiko"], ["South Africa", "Sudáfrica", "Südafrika"]],
    ["medium", ["Who builds coral reefs?", "¿Quién construye los arrecifes de coral?", "Wer baut Korallenriffe?"],
      ["Tiny animals called corals", "Unos animales diminutos llamados corales", "Winzige Tiere, die Korallen"], ["Seaweed", "Las algas", "Seetang"], ["Waves piling up stones", "Las olas al amontonar piedras", "Wellen, die Steine aufschichten"], ["Fish building nests", "Peces que construyen nidos", "Fische, die Nester bauen"]],
    ["easy", ["What is the largest tropical rainforest on Earth?", "¿Cuál es la selva tropical más grande de la Tierra?", "Welches ist der größte tropische Regenwald der Erde?"],
      ["The Amazon rainforest", "La selva amazónica", "Der Amazonas-Regenwald"], ["The Congo rainforest", "La selva del Congo", "Der Kongo-Regenwald"], ["The Daintree rainforest", "La selva de Daintree", "Der Daintree-Regenwald"], ["The rainforest of Borneo", "La selva de Borneo", "Der Regenwald Borneos"]],
    ["easy", ["What is an avalanche?", "¿Qué es una avalancha?", "Was ist eine Lawine?"],
      ["A huge mass of snow sliding down a mountain", "Una gran masa de nieve que se desliza por una montaña", "Eine riesige Schneemasse, die einen Berg hinabrutscht"], ["A sudden summer storm", "Una tormenta repentina de verano", "Ein plötzliches Sommergewitter"], ["A river bursting its banks", "Un río que se desborda", "Ein Fluss, der über die Ufer tritt"], ["A burst of hot volcanic gas", "Una explosión de gas volcánico", "Ein Ausbruch heißer Vulkangase"]],
    ["medium", ["In which kind of rock are fossils most often found?", "¿En qué tipo de roca se encuentran fósiles con más frecuencia?", "In welcher Art von Gestein findet man am häufigsten Fossilien?"],
      ["Sedimentary rock", "Roca sedimentaria", "Sedimentgestein"], ["Igneous rock", "Roca ígnea", "Magmatisches Gestein"], ["Metamorphic rock", "Roca metamórfica", "Metamorphes Gestein"], ["Fresh lava", "Lava fresca", "Frische Lava"]],
    ["medium", ["The “Ring of Fire”, with many volcanoes and earthquakes, surrounds which ocean?", "El «Anillo de Fuego», con muchos volcanes y terremotos, rodea ¿qué océano?", "Der „Pazifische Feuerring“ mit vielen Vulkanen und Erdbeben umgibt welchen Ozean?"],
      ["Pacific Ocean", "Océano Pacífico", "Pazifischer Ozean"], ["Atlantic Ocean", "Océano Atlántico", "Atlantischer Ozean"], ["Indian Ocean", "Océano Índico", "Indischer Ozean"], ["Arctic Ocean", "Océano Ártico", "Arktischer Ozean"]],
    ["medium", ["What is the Earth's thin, rocky outer layer called?", "¿Cómo se llama la capa exterior, fina y rocosa, de la Tierra?", "Wie heißt die dünne, feste äußere Schicht der Erde?"],
      ["The crust", "La corteza", "Die Erdkruste"], ["The mantle", "El manto", "Der Erdmantel"], ["The outer core", "El núcleo externo", "Der äußere Erdkern"], ["The inner core", "El núcleo interno", "Der innere Erdkern"]],
    ["medium", ["What is the tundra?", "¿Qué es la tundra?", "Was ist die Tundra?"],
      ["A cold, treeless land where the ground is frozen most of the year", "Una tierra fría y sin árboles con el suelo helado casi todo el año", "Ein kaltes, baumloses Land, dessen Boden fast das ganze Jahr gefroren ist"], ["A hot, sandy desert", "Un desierto caliente y arenoso", "Eine heiße Sandwüste"], ["A tropical forest", "Un bosque tropical", "Ein tropischer Wald"], ["A salty lake", "Un lago salado", "Ein Salzsee"]],
    ["hard", ["What is the taiga?", "¿Qué es la taiga?", "Was ist die Taiga?"],
      ["A huge northern forest of conifers", "Un enorme bosque de coníferas del norte", "Ein riesiger nördlicher Nadelwald"], ["A grassy plain in Africa", "Una llanura de hierba en África", "Eine Grasebene in Afrika"], ["A coral island", "Una isla de coral", "Eine Koralleninsel"], ["A rocky desert in Asia", "Un desierto rocoso de Asia", "Eine Felswüste in Asien"]],
    ["hard", ["What are mangroves?", "¿Qué son los manglares?", "Was sind Mangroven?"],
      ["Trees that grow in salty water along tropical coasts", "Árboles que crecen en agua salada en costas tropicales", "Bäume, die an tropischen Küsten im Salzwasser wachsen"], ["Underwater volcanoes", "Volcanes submarinos", "Unterwasservulkane"], ["Desert cacti", "Cactus del desierto", "Wüstenkakteen"], ["Mountain lakes", "Lagos de montaña", "Bergseen"]],
  ]);
}
