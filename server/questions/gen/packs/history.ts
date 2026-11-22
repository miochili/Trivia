import type { L, PackApi } from "../generate";
import {
  ASSASSINATED, AXIS, BATTLES, CENTRAL, COLONISED_ASIA, DYNASTIES, DYNASTY_PLACES, EMPERORS, EMPIRES, EU_FOUNDERS, EU_JOIN, EU_NOT_FOUNDERS, EU_YEARS,
  FEATS, FIRST_WOMEN, FORMER_CAPITALS, FOUNDER_DECOYS, FOUNDERS, GODS, GREEKS, INDEPENDENCE, MONARCHS, NEVER_COLONISED, NICKNAMES, NOT_ASSASSINATED,
  NOT_AXIS, NOT_CENTRAL, NOT_EMPERORS, NOT_USSR, NOT_WONDERS, NOT_YUGO, OLD_NAMES, PLACE_EVENTS, PLACES, POWERS, PRE_EURO, PRESIDENTS, ROMANS, RUIN_POOL,
  RUINS, SHIPS, SPACE, SPACE_POOL, TITLES, TREATIES, USSR_MEMBERS, WARS, WONDERS, YUGO_MEMBERS,
} from "./history-data";

/** Extra question types for the "history" category. */
export default function pack(api: PackApi) {
  const { add, lookup, which, groupYesNo, extremeOf, rngFor, sample, same, cap, low, capL, byId, COUNTRIES } = api;
  const H = "history" as const;

  // ── place helpers (countries from the table or historical states) ──
  const nameOf = (k: string): L => {
    const c = byId.get(k);
    if (c) return c.name;
    const p = PLACES[k];
    if (!p) throw new Error(`history pack: unknown place ${k}`);
    return p.name;
  };
  const G = (k: string) => {
    const c = byId.get(k);
    if (c) return { en: c.enSubj, esSubj: c.esSubj, esDe: c.esDe, deIn: c.deIn, deVon: c.deVon, deSubj: c.deSubj, dePl: c.dePl };
    const p = PLACES[k];
    if (!p) throw new Error(`history pack: unknown place ${k}`);
    return { en: p.en, esSubj: p.name[1], esDe: p.esDe, deIn: p.deIn, deVon: p.deVon, deSubj: p.name[2], dePl: false };
  };
  const ids = (keys: string[]) => keys.map(nameOf);
  const known = COUNTRIES.filter((c) => c.pop >= 5).map((c) => c.id);
  const stripArt = (l: L): L => capL([l[0].replace(/^the /, ""), l[1].replace(/^(el|la|los|las) /, ""), l[2].replace(/^(der|die|das) /, "")]);
  const uniq = (ls: L[]) => [...new Map(ls.map((l) => [l[0], l])).values()];

  // ── 1–2 former names ──
  for (const kind of ["country", "city"] as const) {
    const rows = OLD_NAMES.filter((x) => x.kind === kind);
    lookup({ family: "hist.old-name", category: H, rows, stem: (x) => x.old[0], diff: (x) => x.d,
      text: (x) => kind === "country"
        ? [`Which present-day country was once called ${x.old[0]}?`, `¿Qué país actual se llamaba antes ${x.old[1]}?`, `Welches heutige Land hieß früher ${x.old[2]}?`]
        : [`Which present-day city was once called ${x.old[0]}?`, `¿Qué ciudad actual se llamaba antes ${x.old[1]}?`, `Welche heutige Stadt hieß früher ${x.old[2]}?`],
      right: (x) => x.modern, pool: uniq(rows.map((x) => x.modern)), label: (l) => l });
    lookup({ family: "hist.old-name-rev", category: H, rows, stem: (x) => `${x.modern[0]}:${x.old[0]}`, diff: (x) => x.d,
      text: (x) => [`Which of these is a former name of ${x.modern[0] === "DR Congo" ? "the DR Congo" : x.modern[0]}?`, `¿Cuál de estos es un antiguo nombre de ${x.es ?? x.modern[1]}?`,
        `Welcher dieser Namen ist ein früherer Name ${x.deVon ?? `von ${x.modern[2]}`}?`],
      right: (x) => x, pool: rows, label: (x) => x.old, ok: (x, c) => c.modern[0] !== x.modern[0] });
  }

  // ── 3–4 currencies before the euro ──
  const EASY_EURO = new Set(["germany", "france", "italy", "spain"]);
  lookup({ family: "hist.euro-currency", category: H, rows: PRE_EURO, stem: (x) => x[0], diff: (x) => (EASY_EURO.has(x[0]) ? "easy" : ["portugal", "greece", "netherlands", "austria"].includes(x[0]) ? "medium" : "hard"),
    text: (x) => { const g = G(x[0]); return [`Which currency did ${g.en} use before the euro?`, `¿Qué moneda ${g.esSubj.startsWith("los ") ? "usaban" : "usaba"} ${g.esSubj} antes del euro?`, `Welche Währung ${g.dePl ? "hatten" : "hatte"} ${g.deSubj} vor dem Euro?`]; },
    right: (x) => x[1], pool: uniq(PRE_EURO.map((x) => x[1])), label: (l) => l });
  which({ family: "hist.euro-currency-rev", category: H, rows: PRE_EURO, per: 8, diff: (k) => (["Peseta", "Deutsche Mark", "Lira", "Franc"].includes(k) ? "easy" : "medium"),
    key: (x) => x[1][0], label: (x) => nameOf(x[0]),
    text: (k) => { const x = PRE_EURO.find((p) => p[1][0] === k)!; return [`Which country used ${x[2]} before the euro?`, `¿Qué país usaba ${x[3]} antes del euro?`, `Welches Land hatte vor dem Euro ${x[4]}?`]; } });

  // ── 5–6 independence ──
  const EASY_INDEP = new Set(["usa", "india", "brazil", "mexico", "argentina"]);
  lookup({ family: "hist.independence", category: H, rows: INDEPENDENCE, stem: (x) => x[0], diff: (x) => (EASY_INDEP.has(x[0]) ? "easy" : (byId.get(x[0])?.pop ?? 0) >= 25 ? "medium" : "hard"),
    text: (x) => { const g = G(x[0]); return [`Which country or empire did ${g.en} gain independence from?`, `¿De qué país o imperio ${/^(los|las) /.test(g.esSubj) ? "se independizaron" : "se independizó"} ${g.esSubj}?`, `Von welchem Land oder Reich ${g.dePl ? "wurden" : "wurde"} ${g.deSubj} unabhängig?`]; },
    right: (x) => x[1], pool: POWERS, label: nameOf, ok: (x, k) => k !== x[1] && !(x[2] ?? []).includes(k) });
  which({ family: "hist.independence-rev", category: H, rows: INDEPENDENCE, per: 10, diff: "medium", key: (x) => x[1], label: (x) => nameOf(x[0]),
    text: (k) => { const g = G(k); return [`Which of these countries gained independence from ${g.en}?`, `¿Cuál de estos países se independizó ${g.esDe}?`, `Welches dieser Länder wurde ${g.deVon} unabhängig?`]; },
    ok: (_, c, k) => !(c[2] ?? []).includes(k) });

  // ── 7–8 battles → war ──
  const battleWars = [...new Set(BATTLES.map((b) => b[3]))];
  lookup({ family: "hist.battle-war", category: H, rows: BATTLES, stem: (x) => x[0], diff: (x) => x[4],
    text: (x) => [`In which war did ${x[0]} take place?`, `¿En qué guerra tuvo lugar ${x[1]}?`, `In welchem Krieg fand ${x[2]} statt?`],
    right: (x) => x[3], pool: battleWars, label: (k) => WARS[k].label });
  which({ family: "hist.battle-war-rev", category: H, rows: BATTLES, per: 10, diff: (k) => (k === "ww1" || k === "ww2" || k === "napoleonic" ? "medium" : "hard"),
    key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => { const w = WARS[k]; return [`Which of these was part of ${w.en}?`, `¿Cuál de estos hechos bélicos formó parte de ${w.es}?`, `Was davon gehörte ${w.deZu}?`]; } });

  // ── 9–10 peace treaties ──
  lookup({ family: "hist.treaty-war", category: H, rows: TREATIES, stem: (x) => x.label[0], diff: (x) => x.d,
    text: (x) => [`Which war did ${x.text[0]} end?`, `¿Qué guerra terminó con ${x.text[1]}?`, `Welchen Krieg beendete ${x.text[2]}?`],
    right: (x) => x.war, pool: Object.keys(WARS), label: (k) => WARS[k].label });
  lookup({ family: "hist.treaty-rev", category: H, rows: TREATIES, stem: (x) => x.label[0], diff: (x) => x.d,
    text: (x) => { const w = WARS[x.war]; return [`Which peace agreement ended ${w.en}?`, `¿Qué acuerdo de paz puso fin a ${w.es}?`, `Welcher Friedensschluss beendete ${w.deAcc}?`]; },
    right: (x) => x, pool: TREATIES, label: (x) => x.label, ok: (x, c) => c.war !== x.war });

  // ── 11 war spans ──
  const rs = rngFor("hist.war-span");
  for (const [k, w] of Object.entries(WARS)) {
    if (!w.span) continue;
    const [s, e] = w.span;
    const d = e - s;
    const lab = (a: number, b: number) => same(`${a}–${b}`);
    for (let v = 0; v < 3; v++) {
      const seen = new Set<string>([`${s}-${e}`]);
      const wrong: L[] = [];
      for (let t = 0; wrong.length < 3 && t < 200; t++) {
        const spread = Math.max(6, Math.round(d * 0.5));
        const o = Math.round((rs() * 2 - 1) * spread);
        const nd = Math.max(1, d + Math.round((rs() * 2 - 1) * Math.max(2, d * 0.3)));
        const a = s + o, b = a + nd;
        if (b > 2024 || (Math.abs(a - s) < 2 && Math.abs(b - e) < 2) || seen.has(`${a}-${b}`)) continue;
        seen.add(`${a}-${b}`);
        wrong.push(lab(a, b));
      }
      if (wrong.length < 3) continue;
      add("hist.war-span", k, H, k === "ww1" || k === "ww2" ? "easy" : ["uscivil", "spcivil", "napoleonic", "korean", "hundred", "thirty"].includes(k) ? "medium" : "hard",
        [`When did ${w.en} take place?`, `¿Cuándo ${w.esPl ? "tuvieron" : "tuvo"} lugar ${w.es}?`, `Wann ${w.dePl ? "fanden" : "fand"} ${w.deNom} statt?`], lab(s, e), wrong);
    }
  }

  // ── 12–13 longest / shortest wars ──
  const warLen = Object.values(WARS).filter((w) => w.years).map((w) => [...w.label, w.years!] as [string, string, string, number]);
  extremeOf({ family: "hist.war-longest", category: H, n: 300, rows: warLen, max: true, minRatio: 1.5,
    text: ["Which of these wars lasted the longest?", "¿Cuál de estas guerras duró más tiempo?", "Welcher dieser Kriege dauerte am längsten?"] });
  extremeOf({ family: "hist.war-shortest", category: H, n: 300, rows: warLen, max: false, minRatio: 1.5,
    text: ["Which of these wars was the shortest?", "¿Cuál de estas guerras fue la más corta?", "Welcher dieser Kriege war am kürzesten?"] });

  // ── 14–15 empires and capitals ──
  lookup({ family: "hist.empire-capital", category: H, rows: EMPIRES, stem: (x) => x[0], diff: (x) => x[5],
    text: (x) => [`What was the capital of the ${x[0]}?`, `¿Cuál era la capital del ${x[1]}?`, `Was war die Hauptstadt ${x[3]}?`],
    right: (x) => x[4], pool: EMPIRES.map((x) => x[4]), label: (l) => l });
  lookup({ family: "hist.empire-capital-rev", category: H, rows: EMPIRES, stem: (x) => x[0], diff: (x) => x[5],
    text: (x) => [`Which of these had ${x[4][0]} as its capital?`, `¿Cuál de estos tuvo como capital ${x[4][1]}?`, `Welches dieser Reiche hatte ${x[4][2]} als Hauptstadt?`],
    right: (x) => x, pool: EMPIRES, label: (x) => [x[0], cap(x[1]), x[2]] });

  // ── 16–17 dynasties ──
  lookup({ family: "hist.dynasty-country", category: H, rows: DYNASTIES, stem: (x) => x[0], diff: (x) => x[5],
    text: (x) => [`In which country did ${x[0]} rule?`, `¿En qué país gobernó ${x[1]}?`, `In welchem Land herrschte ${x[2]}?`],
    right: (x) => x[3], pool: DYNASTY_PLACES, label: nameOf, ok: (x, k) => k !== x[3] && !x[4].includes(k) });
  which({ family: "hist.dynasty-rev", category: H, rows: DYNASTIES, per: 10, diff: "medium", key: (x) => x[3], label: (x) => stripArt([x[0], x[1], x[2]]),
    text: (k) => { const g = G(k); return [`Which of these dynasties or royal houses ruled ${g.en}?`, `¿Cuál de estas dinastías o casas reales gobernó ${g.esSubj}?`, `Welches dieser Herrscherhäuser regierte ${g.deIn}?`]; },
    ok: (_, c, k) => !c[4].includes(k) });

  // ── 18–19 nicknames ──
  lookup({ family: "hist.nickname", category: H, rows: NICKNAMES, stem: (x) => x[0][0], diff: (x) => x[3],
    text: (x) => [`Who was known as “${x[0][0]}”?`, `¿A quién se conocía como «${x[0][1]}»?`, `Wer war als „${x[0][2]}“ bekannt?`],
    right: (x) => x[1], pool: NICKNAMES.map((x) => x[1]), label: (l) => l });
  lookup({ family: "hist.nickname-rev", category: H, rows: NICKNAMES, stem: (x) => x[1][0], diff: (x) => x[3],
    text: (x) => { const t = x[2] ?? [x[1][0], `a ${x[1][1]}`, x[1][2]]; return [`Which nickname is ${t[0]} known by?`, `¿Con qué apodo se conocía ${t[1]}?`, `Unter welchem Beinamen ist ${t[2]} bekannt?`]; },
    right: (x) => x, pool: NICKNAMES, label: (x) => capL(x[0]), ok: (x, c) => c[1][0] !== x[1][0] });

  // ── 20–21 explorers & pioneers ──
  const clash = (a: (typeof FEATS)[number], b: (typeof FEATS)[number]) => a[2] !== "" && a[2] === b[2];
  lookup({ family: "hist.explorer-feat", category: H, rows: FEATS, stem: (x) => x[0][0], diff: (x) => x[3],
    text: (x) => [`What did ${x[0][0]} achieve?`, `¿Qué logró ${x[0][1]}?`, `Wofür ist ${x[0][2]} bekannt?`],
    right: (x) => x, pool: FEATS, label: (x) => x[1], ok: (x, c) => !clash(x, c) });
  lookup({ family: "hist.explorer-who", category: H, rows: FEATS, stem: (x) => x[0][0], diff: (x) => x[3],
    text: (x) => [`Who ${low(x[1][0])}?`, `¿Quién ${low(x[1][1])}?`, `Wer ${low(x[1][2])}?`],
    right: (x) => x, pool: FEATS, label: (x) => x[0], ok: (x, c) => !clash(x, c) });

  // ── 22–23 famous ships ──
  lookup({ family: "hist.ship", category: H, rows: SHIPS, stem: (x) => x[0][0], diff: (x) => x[2],
    text: (x) => [`What is the ship ${x[0][0]} famous for?`, `¿Por qué es famoso el barco «${x[0][1]}»?`, `Wofür ist das Schiff „${x[0][2]}“ bekannt?`],
    right: (x) => x, pool: SHIPS, label: (x) => x[1] });
  lookup({ family: "hist.ship-rev", category: H, rows: SHIPS, stem: (x) => x[0][0], diff: (x) => x[2],
    text: (x) => [`Which ship ${low(x[1][0])}?`, `¿Qué barco ${low(x[1][1])}?`, `Welches Schiff ${low(x[1][2])}?`],
    right: (x) => x, pool: SHIPS, label: (x) => x[0] });

  // ── 24 space race ──
  lookup({ family: "hist.space-first", category: H, rows: SPACE, stem: (x) => x[0][0], diff: (x) => x[2],
    text: (x) => [`Which country ${x[0][0]}?`, `¿Qué país ${x[0][1]}?`, `Welches Land ${x[0][2]}?`],
    right: (x) => x[1], pool: SPACE_POOL, label: nameOf });

  // ── 25–26 Seven Wonders ──
  groupYesNo("hist.ancient-wonder", H, 160, WONDERS, NOT_WONDERS, "medium",
    ["Which of these was one of the Seven Wonders of the Ancient World?", "¿Cuál de estas fue una de las siete maravillas del mundo antiguo?", "Was davon zählte zu den sieben Weltwundern der Antike?"]);
  groupYesNo("hist.not-wonder", H, 140, NOT_WONDERS, WONDERS, "medium",
    ["Which of these was NOT one of the Seven Wonders of the Ancient World?", "¿Cuál de estas NO fue una de las siete maravillas del mundo antiguo?", "Was davon zählte NICHT zu den sieben Weltwundern der Antike?"]);

  // ── 27–28 Greeks and Romans ──
  groupYesNo("hist.ancient-roman", H, 150, ROMANS, GREEKS, "medium",
    ["Which of these people was an ancient Roman?", "¿Cuál de estas personas era un romano de la Antigüedad?", "Wer von diesen war ein antiker Römer?"]);
  groupYesNo("hist.ancient-greek", H, 150, GREEKS, ROMANS, "medium",
    ["Which of these people was an ancient Greek?", "¿Cuál de estas personas era un griego de la Antigüedad?", "Wer von diesen war ein antiker Grieche?"]);

  // (Greek ↔ Roman gods live in the art pack: art.greek-to-roman / art.roman-to-greek)

  // ── 31–34 rulers in order ──
  extremeOf({ family: "hist.emperor-first", category: H, n: 220, rows: EMPERORS, max: false, minGap: 20, diff: "hard",
    text: ["Which of these Roman emperors reigned first?", "¿Cuál de estos emperadores romanos reinó primero?", "Welcher dieser römischen Kaiser regierte zuerst?"] });
  groupYesNo("hist.not-emperor", H, 150, NOT_EMPERORS, EMPERORS.map((e) => [e[0], e[1], e[2]] as L), "medium",
    ["Which of these was NOT a Roman emperor?", "¿Cuál de estos NO fue emperador romano?", "Wer von diesen war KEIN römischer Kaiser?"]);
  extremeOf({ family: "hist.president-first", category: H, n: 250, rows: PRESIDENTS.map(([n, y]) => [n, n, n, y] as [string, string, string, number]), max: false, minGap: 8, diff: "medium",
    text: ["Which of these became President of the United States first?", "¿Cuál de estos llegó primero a la presidencia de Estados Unidos?", "Wer von diesen wurde zuerst Präsident der USA?"] });
  extremeOf({ family: "hist.monarch-first", category: H, n: 220, rows: MONARCHS, max: false, minGap: 20, diff: "medium",
    text: ["Which of these English or British monarchs came to the throne first?", "¿Cuál de estos monarcas ingleses o británicos subió primero al trono?", "Welcher dieser englischen oder britischen Monarchen bestieg zuerst den Thron?"] });

  // ── 35–36 European Union ──
  lookup({ family: "hist.eu-year", category: H, rows: EU_JOIN, variants: 2, stem: (x) => x[0], diff: (x) => (["uk", "spain", "portugal"].includes(x[0]) ? "medium" : "hard"),
    text: (x) => { const g = G(x[0]); return [`In which year did ${g.en} join what is now the European Union?`, `¿En qué año entró ${g.esSubj} en lo que hoy es la Unión Europea?`, `In welchem Jahr trat ${g.deSubj} der heutigen Europäischen Union bei?`]; },
    right: (x) => x[1], pool: EU_YEARS, label: (y) => same(String(y)) });
  groupYesNo("hist.eu-founder", H, 120, ids(EU_FOUNDERS), ids(EU_NOT_FOUNDERS), "medium",
    ["Which of these countries was a founding member of the European Economic Community in 1957?", "¿Cuál de estos países fue miembro fundador de la Comunidad Económica Europea en 1957?", "Welches dieser Länder gründete 1957 die Europäische Wirtschaftsgemeinschaft mit?"]);

  // ── 37–38 events → present-day country ──
  lookup({ family: "hist.event-country", category: H, rows: PLACE_EVENTS, stem: (x) => x[0], diff: (x) => x[6],
    text: (x) => [`In which present-day country did ${x[0]} take place?`, `¿En qué país actual ${x[5] ? "tuvieron" : "tuvo"} lugar ${x[1]}?`, `In welchem heutigen Land ${x[5] ? "fanden" : "fand"} ${x[2]} statt?`],
    right: (x) => x[3], pool: known, label: nameOf, ok: (x, k) => k !== x[3] && !x[4].includes(k) });
  which({ family: "hist.event-country-rev", category: H, rows: PLACE_EVENTS, per: 10, diff: "medium", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => { const g = G(k); return [`Which of these took place in what is now ${g.en}?`, `¿Cuál de estos acontecimientos tuvo lugar en ${g.esSubj}?`, `Welches dieser Ereignisse fand ${g.deIn} statt?`]; },
    ok: (_, c, k) => !c[4].includes(k) });

  // ── 39 city founders ──
  lookup({ family: "hist.city-founder", category: H, rows: FOUNDERS, stem: (x) => x[0][0], diff: (x) => x[2],
    text: (x) => [`Who founded ${x[0][0]}?`, `¿Quién fundó ${x[0][1]}?`, `Wer gründete ${x[0][2]}?`],
    right: (x) => x[1], pool: [...FOUNDERS.map((x) => x[1]), ...FOUNDER_DECOYS], label: (l) => l });

  // ── 40 ruler titles ──
  lookup({ family: "hist.title-country", category: H, rows: TITLES, stem: (x) => x[0], diff: (x) => x[5],
    text: (x) => [`In which country's history did rulers bear the title “${x[0]}”?`, `¿En la historia de qué país hubo gobernantes con el título de «${x[1]}»?`, `In der Geschichte welches Landes trugen Herrscher den Titel „${x[2]}“?`],
    right: (x) => x[3], pool: known, label: nameOf, ok: (x, k) => k !== x[3] && !x[4].includes(k) });

  // ── 41 former capitals ──
  const rc = rngFor("hist.former-capital");
  for (const [k, until, right, wrongs, d] of FORMER_CAPITALS) {
    const g = G(k);
    const deGen = g.deVon.replace(/^von der /, "der ").replace(/^von den /, "der ");
    const text: L = until
      ? [`Which city was the capital of ${g.en} until ${until[0]}?`, `¿Qué ciudad fue la capital ${g.esDe} hasta ${until[1]}?`, `Welche Stadt war bis ${until[2]} die Hauptstadt ${deGen}?`]
      : [`What was the capital of ${g.en}?`, `¿Cuál era la capital ${g.esDe}?`, `Was war die Hauptstadt ${deGen}?`];
    for (let v = 0; v < 4; v++) {
      const ws = sample(rc, wrongs, 3);
      if (ws) add("hist.former-capital", k, H, d, text, right, ws);
    }
  }

  // ── 42–46 which state belonged where ──
  groupYesNo("hist.ussr-member", H, 150, ids(USSR_MEMBERS), ids(NOT_USSR), "medium",
    ["Which of these countries was part of the Soviet Union?", "¿Cuál de estos países formó parte de la Unión Soviética?", "Welches dieser Länder gehörte zur Sowjetunion?"]);
  groupYesNo("hist.yugoslavia-member", H, 120, ids(YUGO_MEMBERS), ids(NOT_YUGO), "medium",
    ["Which of these countries was part of Yugoslavia?", "¿Cuál de estos países formó parte de Yugoslavia?", "Welches dieser Länder gehörte zu Jugoslawien?"]);
  groupYesNo("hist.never-colony", H, 100, ids(NEVER_COLONISED), ids(COLONISED_ASIA), "medium",
    ["Which of these Asian countries was never colonised by a European power?", "¿Cuál de estos países asiáticos nunca fue colonizado por una potencia europea?", "Welches dieser asiatischen Länder war nie die Kolonie einer europäischen Macht?"]);
  groupYesNo("hist.axis", H, 150, ids(AXIS), ids(NOT_AXIS), "medium",
    ["Which of these countries was one of the Axis powers in World War II?", "¿Cuál de estos países formó parte de las potencias del Eje en la Segunda Guerra Mundial?", "Welches dieser Länder gehörte im Zweiten Weltkrieg zu den Achsenmächten?"]);
  groupYesNo("hist.central-powers", H, 120, ids(CENTRAL), ids(NOT_CENTRAL), "medium",
    ["Which of these was one of the Central Powers in World War I?", "¿Cuál de estos formó parte de las potencias centrales en la Primera Guerra Mundial?", "Welcher dieser Staaten gehörte im Ersten Weltkrieg zu den Mittelmächten?"]);

  // ── 47 first women in office ──
  lookup({ family: "hist.first-woman-leader", category: H, rows: FIRST_WOMEN, stem: (x) => x[0], diff: (x) => x[3],
    text: (x) => {
      const g = G(x[0]);
      if (x[1] === "chanc") return [`Who was the first woman to become chancellor of ${g.en}?`, `¿Quién fue la primera mujer canciller ${g.esDe}?`, `Wer wurde ${g.deIn} als erste Frau Bundeskanzlerin?`];
      if (x[1] === "pres") return [`Who was the first woman to become president of ${g.en}?`, `¿Quién fue la primera presidenta ${g.esDe}?`, `Wer wurde ${g.deIn} als erste Frau Staatspräsidentin?`];
      return [`Who was the first woman to become prime minister of ${g.en}?`, `¿Quién fue la primera mujer jefa de Gobierno ${g.esDe}?`, `Wer wurde ${g.deIn} als erste Frau Regierungschefin?`];
    },
    right: (x) => x[2], pool: FIRST_WOMEN.map((x) => x[2]), label: same });

  // ── 48 assassinations ──
  groupYesNo("hist.assassinated", H, 200, ASSASSINATED, NOT_ASSASSINATED, "easy",
    ["Which of these people was assassinated?", "¿Cuál de estas personas fue asesinada en un atentado?", "Welche dieser Personen fiel einem Attentat zum Opfer?"]);

  // ── 49–50 ancient sites → present-day country ──
  lookup({ family: "hist.ruins-country", category: H, rows: RUINS, stem: (x) => x[0], diff: (x) => x[5],
    text: (x) => [`In which present-day country ${x[4] ? "were" : "was"} ${x[0]}?`, `¿En qué país actual ${x[4] ? "se encontraban" : "se encontraba"} ${x[1]}?`, `In welchem heutigen Land ${x[4] ? "befanden" : "befand"} sich ${x[2]}?`],
    right: (x) => x[3], pool: RUIN_POOL, label: nameOf });
  which({ family: "hist.ruins-rev", category: H, rows: RUINS, per: 10, diff: "medium", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => { const g = G(k); return [`Which of these ancient sites is in present-day ${g.en}?`, `¿Cuál de estos lugares antiguos está en territorio ${g.esDe}?`, `Welche dieser antiken Stätten liegt heute ${g.deIn}?`]; } });
}
