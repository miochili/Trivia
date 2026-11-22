import type { Country, L, PackApi } from "../generate";
import * as D from "./art-data";

type Diff = "easy" | "medium" | "hard";
const strip = (s: string) => s.replace(/^(the|el|la|los|las|der|die|das) /, "");
const esDe = (s: string) => (s.startsWith("el ") ? `del ${s.slice(3)}` : `de ${s}`);
const deAccArt = (s: string) => s.replace(/^der /, "den ");
const nameL = (x: string | L): L => (typeof x === "string" ? [x, x, x] : x);
const flagDiff = (f = ""): Diff => (f.includes("e") ? "easy" : f.includes("h") ? "hard" : "medium");
const uniq = <T>(a: T[]) => [...new Set(a)];

/** Extra question types for the "art" category. */
export default function pack(api: PackApi) {
  const { lookup, which, extremeOf, add, rngFor, sample, same, low, capL, byId, nameOf, deAus } = api;
  const C = "art" as const;

  // ── clue tables (Norse, Egyptian, Hindu): same-gender wrong answers ──
  const clueFamily = (family: string, clues: D.Clue[], names: Record<string, { n: L; f: boolean }>, diff: (c: D.Clue) => Diff) =>
    lookup({ family, category: C, rows: clues, stem: (x) => x[3], diff, text: (x) => [x[0], x[1], x[2]],
      right: (x) => x[3], pool: Object.keys(names), label: (k) => names[k].n,
      ok: (x, k) => names[k].f === names[x[3]].f && !(x[4] ?? []).includes(k) });
  clueFamily("art.norse-god", D.NORSE_CLUES, D.NORSE_NAMES, (x) => (["thor", "odin", "loki"].includes(x[3]) ? "easy" : "medium"));
  clueFamily("art.egypt-god", D.EGYPT_CLUES, D.EGYPT_NAMES, (x) => (["ra", "anubis"].includes(x[3]) ? "medium" : "hard"));
  clueFamily("art.hindu-god", D.HINDU_CLUES, D.HINDU_NAMES, (x) => (x[3] === "ganesha" ? "medium" : "hard"));

  // ── Greek & Roman gods ──
  const domGods = D.GODS.filter((g) => g.dom);
  const romGods = D.GODS.filter((g) => g.roman);
  const god = (g: D.God): L => (g.f ? ["goddess", "diosa", "Göttin"] : ["god", "dios", "Gott"]);
  lookup({ family: "art.greek-god", category: C, rows: domGods, stem: (g) => g.id, diff: (g) => g.d,
    text: (g) => [`In Greek mythology, who was the ${god(g)[0]} of ${g.dom![0]}?`, `En la mitología griega, ¿quién era ${g.f ? "la diosa" : "el dios"} ${esDe(g.dom![1])}?`, `Wer war in der griechischen Mythologie ${g.f ? "die Göttin" : "der Gott"} ${g.deGen}?`],
    right: (g) => g, pool: domGods, label: (g) => g.name, ok: (g, o) => o.f === g.f });
  lookup({ family: "art.greek-domain", category: C, rows: domGods, stem: (g) => g.id, diff: (g) => g.d,
    text: (g) => [`In Greek mythology, what was ${g.name[0]} the ${god(g)[0]} of?`, `En la mitología griega, ¿de qué era ${god(g)[1]} ${g.name[1]}?`, `Was war in der griechischen Mythologie der Bereich ${g.f ? "der Göttin" : "des Gottes"} ${g.name[2]}?`],
    right: (g) => g, pool: domGods, label: (g) => capL(g.dom!), ok: (g, o) => !(g.not ?? []).includes(o.id) });
  lookup({ family: "art.greek-to-roman", category: C, rows: romGods, stem: (g) => g.id, diff: (g) => g.d,
    text: (g) => [`What did the Romans call the Greek ${god(g)[0]} ${g.name[0]}?`, `¿Cómo llamaban los romanos ${g.f ? "a la diosa griega" : "al dios griego"} ${g.name[1]}?`, `Wie nannten die Römer ${g.f ? "die griechische Göttin" : "den griechischen Gott"} ${g.name[2]}?`],
    right: (g) => g, pool: romGods, label: (g) => g.roman!, ok: (g, o) => o.f === g.f });
  lookup({ family: "art.roman-to-greek", category: C, rows: romGods, stem: (g) => g.id, diff: (g) => g.d,
    text: (g) => [`The Roman ${god(g)[0]} ${g.roman![0]} corresponds to which Greek ${god(g)[0]}?`, `¿Con qué ${g.f ? "diosa griega" : "dios griego"} se corresponde ${g.f ? "la diosa romana" : "el dios romano"} ${g.roman![1]}?`, `${g.f ? "Welcher griechischen Göttin entspricht die römische Göttin" : "Welchem griechischen Gott entspricht der römische Gott"} ${g.roman![2]}?`],
    right: (g) => g, pool: romGods, label: (g) => g.name, ok: (g, o) => o.f === g.f });

  // ── Norse terms, creatures, heroes ──
  lookup({ family: "art.norse-term", category: C, rows: D.NORSE_TERMS, stem: (x) => x[0][0], diff: (x) => (["Valhalla", "Ragnarök", "Mjölnir"].includes(x[0][0]) ? "medium" : "hard"),
    text: (x) => [`In Norse mythology, what ${x[2] ? "are" : "is"} ${x[0][0]}?`, `En la mitología nórdica, ¿qué ${x[2] ? "son" : "es"} ${x[0][1]}?`, `Was ${x[2] ? "sind" : "ist"} in der nordischen Mythologie ${x[0][2]}?`],
    right: (x) => x, pool: D.NORSE_TERMS, label: (x) => x[1], ok: (x, o) => o[0][0] !== x[3] && x[0][0] !== o[3] });
  lookup({ family: "art.myth-creature", category: C, rows: D.CREATURE_CLUES, stem: (x) => x[3], diff: (x) => (["pegasus", "medusa", "minotaur", "centaur", "unicorn", "phoenix", "cyclops"].includes(x[3]) ? "easy" : "medium"),
    text: (x) => [x[0], x[1], x[2]], right: (x) => x[3], pool: Object.keys(D.CREATURE_NAMES), label: (k) => D.CREATURE_NAMES[k], ok: (x, k) => !(x[4] ?? []).includes(k) });
  const heroDiff = (h: (typeof D.HEROES)[number]): Diff => (["heracles", "achilles", "icarus", "midas", "odysseus", "pandora"].includes(h.id) ? "easy" : "medium");
  lookup({ family: "art.myth-hero", category: C, rows: D.HEROES, stem: (h) => h.id, diff: heroDiff,
    text: (h) => [`Greek mythology: who ${h.deed[0]}?`, `Mitología griega: ¿quién ${h.deed[1]}?`, `Griechische Mythologie: Wer ${h.deed[2]}?`],
    right: (h) => h, pool: D.HEROES, label: (h) => h.n, ok: (h, o) => !(h.not ?? []).includes(o.id) });
  lookup({ family: "art.myth-hero-known", category: C, rows: D.HEROES, stem: (h) => h.id, diff: heroDiff,
    text: (h) => [`In Greek mythology, what is ${h.n[0]} known for?`, `En la mitología griega, ¿por qué es ${h.f ? "conocida" : "conocido"} ${h.n[1].replace(/^El /, "el ")}?`, `Wofür ist ${h.n[2]} in der griechischen Mythologie bekannt?`],
    right: (h) => h, pool: D.HEROES, label: (h) => h.known, ok: (h, o) => !(h.not ?? []).includes(o.id) });

  // ── instruments ──
  const famKeys = Object.keys(D.INSTRUMENT_FAMILIES);
  const instPl = (x: (typeof D.INSTRUMENTS)[number]) => /^the (timpani|cymbals|castanets|bongos)$/.test(x[0]);
  lookup({ family: "art.instrument-family", category: C, rows: D.INSTRUMENTS, variants: 1, stem: (x) => x[0], diff: (x) => (x[4] || ["the harp", "the lute", "the euphonium", "the cornet", "the flugelhorn", "the sousaphone", "the bassoon"].includes(x[0]) ? "medium" : "easy"),
    text: (x) => [`Which family of instruments ${instPl(x) ? "do" : "does"} ${x[0]} belong to?`, `¿A qué familia de instrumentos pertenece${instPl(x) ? "n" : ""} ${x[1]}?`, `Zu welcher Instrumentenfamilie ${instPl(x) ? "gehören" : "gehört"} ${x[2]}?`],
    right: (x) => x[3], pool: famKeys, label: (k) => D.INSTRUMENT_FAMILIES[k].pl });
  which({ family: "art.instrument-which", category: C, rows: D.INSTRUMENTS, per: 30, diff: "easy", key: (x) => x[3],
    label: (x) => capL([strip(x[0]), strip(x[1]), strip(x[2])]),
    text: (k) => { const o = D.INSTRUMENT_FAMILIES[k].one; return [`Which of these is ${o[0]}?`, `¿Cuál de estos es ${o[1]}?`, `Was davon ist ${o[2]}?`]; },
    ok: (_, cand, k) => !(k === "brass" && cand[4]) });
  const rs = rngFor("art.instrument-strings");
  for (const [en, es, de, n, d] of D.STRINGS) {
    for (let v = 0; v < 3; v++) {
      const ws = sample(rs, [3, 4, 5, 6, 7, 8, 10, 12], 3, (x) => x !== n);
      if (ws) add("art.instrument-strings", en, C, d,
        [`How many strings does ${en} normally have?`, `¿Cuántas cuerdas tiene normalmente ${es}?`, `Wie viele Saiten hat ${de} normalerweise?`],
        same(String(n)), ws.map((x) => same(String(x))));
    }
  }

  // ── music terms & voices ──
  const termDiff = (t: string): Diff => (["forte", "piano", "a cappella", "crescendo", "allegro"].includes(t) ? "medium" : "hard");
  lookup({ family: "art.music-term", category: C, rows: D.MUSIC_TERMS, stem: (x) => x[0], diff: (x) => termDiff(x[0]),
    text: (x) => [`What does the musical term “${x[0]}” mean?`, `¿Qué significa el término musical «${x[0]}»?`, `Was bedeutet der musikalische Begriff „${x[0]}“?`],
    right: (x) => x, pool: D.MUSIC_TERMS, label: (x) => [x[1], x[2], x[3]], ok: (x, o) => o[4] !== x[4] });
  lookup({ family: "art.music-term-rev", category: C, rows: D.MUSIC_TERMS, stem: (x) => x[0], diff: (x) => termDiff(x[0]),
    text: (x) => [`Which musical term means “${low(x[1])}”?`, `¿Qué término musical significa «${low(x[2])}»?`, `Welcher musikalische Begriff bedeutet „${x[3].startsWith("Gesang") ? x[3] : low(x[3])}“?`],
    right: (x) => x, pool: D.MUSIC_TERMS, label: (x) => same(x[0]), ok: (x, o) => o[4] !== x[4] });
  for (const max of [true, false])
    extremeOf({ family: "art.voice-range", category: C, n: 15, rows: D.VOICES, max, minGap: 1, diff: "medium",
      text: max ? ["Which of these singing voices is the highest?", "¿Cuál de estas voces es la más aguda?", "Welche dieser Stimmlagen ist die höchste?"]
        : ["Which of these singing voices is the lowest?", "¿Cuál de estas voces es la más grave?", "Welche dieser Stimmlagen ist die tiefste?"] });
  lookup({ family: "art.opera-language", category: C, rows: D.OPERAS, stem: (x) => x[0], diff: (x) => x[4],
    text: (x) => [`In which language was the opera “${x[0]}” originally written?`, `¿En qué idioma se escribió originalmente la ópera «${x[1]}»?`, `In welcher Sprache wurde die Oper „${x[2]}“ ursprünglich geschrieben?`],
    right: (x) => x[3], pool: Object.keys(D.LANGS), label: (k) => D.LANGS[k] });
  lookup({ family: "art.musical-composer", category: C, rows: D.MUSICALS, stem: (x) => x[0], diff: (x) => (["Cats", "The Phantom of the Opera", "Mamma Mia!", "Hamilton"].includes(x[0]) ? "medium" : "hard"),
    text: (x) => [`Who wrote the music for the musical “${x[0]}”?`, `¿Quién compuso la música del musical «${x[1]}»?`, `Wer komponierte die Musik zum Musical „${x[2]}“?`],
    right: (x) => x[3], pool: Object.keys(D.MUSICAL_COMPOSERS), label: (k) => D.MUSICAL_COMPOSERS[k], ok: (x, k) => !(x[4] ?? []).includes(k) });
  which({ family: "art.musical-rev", category: C, rows: D.MUSICALS, per: 8, diff: "hard", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const c = D.MUSICAL_COMPOSERS[k]; return [`Which of these musicals has music by ${c[0]}?`, `¿Cuál de estos musicales tiene música de ${c[1]}?`, `Welches dieser Musicals hat Musik von ${c[2]}?`]; },
    ok: (_, cand, k) => !(cand[4] ?? []).includes(k) });

  // ── people → country (writers, composers) ──
  const personCountry = (fam: string, rows: D.PersonRow[], who: { en: string; esM: string; esF: string; deM: string; deF: string; enPl: string; esPl: string; dePl: string }, per: number) => {
    const pool = uniq(rows.map((r) => r[1])).map((id) => byId.get(id)!);
    lookup({ family: fam, category: C, rows, stem: (r) => nameL(r[0])[0], diff: (r) => flagDiff(r[3]),
      text: (r) => {
        const n = nameL(r[0]); const a = (r[3] ?? "").includes("a"); const f = (r[3] ?? "").includes("f");
        return [`Which country ${a ? "is" : "was"} the ${who.en} ${n[0]} from?`, `¿De qué país ${a ? "es" : "era"} ${f ? who.esF : who.esM} ${n[1]}?`, `Aus welchem Land ${a ? "stammt" : "stammte"} ${f ? who.deF : who.deM} ${n[2]}?`];
      },
      right: (r) => byId.get(r[1])!, pool, label: nameOf, ok: (r, c) => !(r[2] ?? []).includes(c.id) });
    which({ family: `${fam}-rev`, category: C, rows, per, diff: "medium", key: (r) => r[1], label: (r) => nameL(r[0]),
      text: (k) => { const c = byId.get(k)!; return [`Which of these ${who.enPl} is from ${c.enSubj}?`, `¿Cuál de estos ${who.esPl} es ${c.esDe}?`, `Welcher dieser ${who.dePl} stammt ${deAus(c)}?`]; },
      ok: (_, cand, k) => !(cand[2] ?? []).includes(k) });
  };
  personCountry("art.writer-country", D.WRITERS, { en: "writer", esM: "el escritor", esF: "la escritora", deM: "der Schriftsteller", deF: "die Schriftstellerin", enPl: "writers", esPl: "escritores", dePl: "Schriftsteller" }, 10);
  personCountry("art.composer-country", D.COMPOSERS, { en: "composer", esM: "el compositor", esF: "la compositora", deM: "der Komponist", deF: "die Komponistin", enPl: "composers", esPl: "compositores", dePl: "Komponisten" }, 10);

  part2(api);
}

/** Visual arts, architecture, literature, dance & theatre. */
function part2(api: PackApi) {
  const { lookup, which, groupYesNo, add, rngFor, sample, same, cap, low, capL, byId, nameOf, deAus, centuryL } = api;
  const C = "art" as const;
  const countryPool = (ids: string[]): Country[] => uniq(ids).filter(Boolean).map((id) => byId.get(id)!);

  // ── art movements ──
  const movKeys = Object.keys(D.MOVEMENTS);
  const clash = (a: string, b: string) => a === b || (!!D.MOVEMENTS[a].g && D.MOVEMENTS[a].g === D.MOVEMENTS[b].g);
  const FAMOUS_ARTISTS = new Set(["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Salvador Dalí", "Andy Warhol", "Leonardo da Vinci", "Michelangelo", "Rembrandt", "Edvard Munch", "Jackson Pollock"]);
  lookup({ family: "art.movement", category: C, rows: D.ARTIST_MOVEMENT, stem: (x) => x[0], diff: (x) => (FAMOUS_ARTISTS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which art movement or style is ${x[0]} most associated with?`, `¿Con qué movimiento o estilo artístico se asocia sobre todo a ${x[0]}?`, `Mit welcher Kunstrichtung oder Epoche verbindet man ${x[0]} vor allem?`],
    right: (x) => x[1], pool: movKeys, label: (k) => D.MOVEMENTS[k].n, ok: (x, k) => !clash(x[1], k) && !(x[2] ?? []).includes(k) });
  which({ family: "art.movement-rev", category: C, rows: D.ARTIST_MOVEMENT, per: 10, diff: "medium", key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => { const m = D.MOVEMENTS[k].n; return [`Which of these artists is associated with this movement: ${m[0]}?`, `¿Cuál de estos artistas pertenece a este movimiento: ${m[1]}?`, `Welcher dieser Künstler gehört zur Kunstrichtung „${m[2]}“?`]; },
    ok: (_, cand, k) => !clash(cand[1], k) && !(cand[2] ?? []).includes(k) });

  // ── museums ──
  const museums = Object.entries(D.MUSEUMS);
  const withCity = museums.filter(([, m]) => !m.noCity);
  lookup({ family: "art.museum-city", category: C, rows: withCity, stem: ([k]) => k, diff: ([, m]) => m.d,
    text: ([, m]) => [`In which city is ${m.n[0]}?`, `¿En qué ciudad está ${m.n[1]}?`, `In welcher Stadt befindet sich ${m.n[2]}?`],
    right: ([, m]) => m.city, pool: Object.keys(D.CITIES), label: (k) => D.CITIES[k], ok: ([, m], k) => !(m.notCity ?? []).includes(k) });
  which({ family: "art.museum-city-rev", category: C, rows: withCity, per: 8, diff: "medium", key: ([, m]) => m.city, label: ([, m]) => capL(m.n),
    text: (k) => { const c = D.CITIES[k]; return [`Which of these museums is in ${c[0]}?`, `¿Cuál de estos museos está en ${c[1]}?`, `Welches dieser Museen befindet sich in ${c[2]}?`]; },
    ok: (_, [, m], k) => !(m.notCity ?? []).includes(k) });
  const musLabel = (k: string): L => { const m = D.MUSEUMS[k]; const c = D.CITIES[m.city]; return [`${cap(m.n[0])}, ${c[0]}`, `${cap(m.n[1])}, ${c[1]}`, `${cap(m.n[2])}, ${c[2]}`]; };
  const workIn = (x: (typeof D.WORK_MUSEUM)[number]): L => (x[5] ? [`“${x[0]}”`, `«${x[1]}»`, `„${x[2]}“`] : [x[0], x[1], deAccArt(x[2])]);
  lookup({ family: "art.artwork-museum", category: C, rows: D.WORK_MUSEUM, stem: (x) => x[0], diff: (x) => x[4],
    text: (x) => { const w = workIn(x); return [`In which museum can you see ${w[0]}?`, `¿En qué museo se puede ver ${w[1]}?`, `In welchem Museum kann man ${w[2]} sehen?`]; },
    right: (x) => x[3], pool: uniq(D.WORK_MUSEUM.map((x) => x[3])), label: musLabel });
  which({ family: "art.museum-artwork-rev", category: C, rows: D.WORK_MUSEUM, per: 8, diff: "hard", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => { const m = D.MUSEUMS[k]; const c = D.CITIES[m.city]; return [`Which of these works can you see in ${m.n[0]} in ${c[0]}?`, `¿Cuál de estas obras se puede ver en ${m.n[1]} de ${c[1]}?`, `Welches dieser Werke kann man ${m.deIn} in ${c[2]} sehen?`]; } });

  // ── when was it made? ──
  const rc = rngFor("art.artwork-century");
  for (const [en, es, de, year] of D.WORK_YEARS) {
    const c = Math.ceil(year / 100);
    for (let v = 0; v < 3; v++) {
      const offs = new Set<number>();
      for (let t = 0; offs.size < 3 && t < 60; t++) {
        const o = Math.round((rc() * 2 - 1) * 3);
        if (o !== 0 && c + o >= 12 && c + o <= 21) offs.add(o);
      }
      if (offs.size < 3) continue;
      add("art.artwork-century", en, C, c >= 19 ? "medium" : "hard",
        [`In which century was “${en}” created?`, `¿En qué siglo se creó «${es}»?`, `In welchem Jahrhundert entstand „${de}“?`],
        capL(centuryL(c)), [...offs].map((o) => capL(centuryL(c + o))));
    }
  }

  // ── techniques & colours ──
  const techOk = (x: (typeof D.TECHNIQUES)[number], o: (typeof D.TECHNIQUES)[number]) => o[0][0] !== x[2] && x[0][0] !== o[2];
  const techDiff = (x: (typeof D.TECHNIQUES)[number]): Diff => (["Fresco", "Watercolour", "Mosaic", "Collage", "Oil painting", "Stained glass"].includes(x[0][0]) ? "easy" : "medium");
  lookup({ family: "art.technique", category: C, rows: D.TECHNIQUES, stem: (x) => x[0][0], diff: techDiff,
    text: (x) => [`What does the art term “${low(x[0][0])}” describe?`, `¿Qué describe el término artístico «${low(x[0][1])}»?`, `Was bezeichnet der Kunstbegriff „${x[0][2]}“?`],
    right: (x) => x, pool: D.TECHNIQUES, label: (x) => x[1], ok: techOk });
  lookup({ family: "art.technique-rev", category: C, rows: D.TECHNIQUES, stem: (x) => x[0][0], diff: techDiff,
    text: (x) => [`“${x[1][0]}” – which art term is this?`, `«${x[1][1]}»: ¿qué término artístico es este?`, `„${x[1][2]}“ – welcher Kunstbegriff ist das?`],
    right: (x) => x, pool: D.TECHNIQUES, label: (x) => x[0], ok: techOk });
  const col = D.COLOURS;
  const rm = rngFor("art.colour-mix");
  for (const [a, b, res] of D.MIXES) {
    for (const [p, q] of [[a, b], [b, a]]) {
      for (let v = 0; v < 3; v++) {
        const ws = sample(rm, Object.keys(col), 3, (k) => ![a, b, res, "turquoise"].includes(k));
        if (ws) add("art.colour-mix", res, C, "easy",
          [`In painting, which colour do you get by mixing ${col[p][0]} and ${col[q][0]}?`, `En pintura, ¿qué color se obtiene al mezclar ${col[p][1]} y ${col[q][1]}?`, `Welche Farbe entsteht beim Malen, wenn man ${col[p][2]} und ${col[q][2]} mischt?`],
          capL(col[res]), ws.map((k) => capL(col[k])));
      }
    }
  }
  const chroma = ["red", "yellow", "blue", "green", "orange", "purple", "pink", "turquoise", "brown"];
  lookup({ family: "art.colour-complement", category: C, rows: D.COMPLEMENTS, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`In traditional colour theory (the painter's colour wheel), what is the complementary colour of ${col[x[0]][0]}?`, `En la teoría tradicional del color (el círculo cromático del pintor), ¿cuál es el color complementario del ${col[x[0]][1]}?`, `Was ist in der klassischen Farbenlehre (Farbkreis der Maler) die Komplementärfarbe zu ${col[x[0]][2]}?`],
    right: (x) => x[1], pool: chroma, label: (k) => capL(col[k]), ok: (x, k) => k !== x[0] && !x[2].includes(k) });
  groupYesNo("art.primary-colour", C, 30, ["red", "yellow", "blue"].map((k) => capL(col[k])), ["orange", "purple", "pink", "brown", "grey"].map((k) => capL(col[k])), "easy",
    ["Which of these is one of the three primary colours in traditional painting?", "¿Cuál de estos es uno de los tres colores primarios de la pintura tradicional?", "Welche dieser Farben ist eine der drei Grundfarben der traditionellen Malerei?"]);

  // ── architecture & sculpture ──
  const styleKeys = Object.keys(D.STYLES);
  lookup({ family: "art.building-style", category: C, rows: D.BUILDING_STYLES, stem: (x) => x[0], diff: (x) => x[5],
    text: (x) => [`In which architectural style is ${x[0]} built?`, `¿A qué estilo arquitectónico pertenece ${x[1]}?`, `Welchem Baustil wird ${x[2]} zugeordnet?`],
    right: (x) => x[3], pool: styleKeys, label: (k) => D.STYLES[k].n, ok: (x, k) => !x[4].includes(k) });
  which({ family: "art.building-style-rev", category: C, rows: D.BUILDING_STYLES, per: 8, diff: "medium", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => { const e = D.STYLES[k].ex; return [`Which of these buildings is a typical example of ${e[0]}?`, `¿Cuál de estos edificios es un ejemplo típico ${esDe(e[1])}?`, `Welches dieser Bauwerke ist ein typisches Beispiel für ${e[2]}?`]; },
    ok: (_, cand, k) => !cand[4].includes(k) });
  lookup({ family: "art.sculpture", category: C, rows: D.SCULPTURES, stem: (x) => x[0], diff: (x) => (["The Thinker", "The Statue of Liberty", "The Pietà in St Peter's Basilica"].includes(x[0]) ? "medium" : "hard"),
    text: (x) => [`Who created this sculpture: ${x[0]}?`, `¿Quién creó esta escultura: ${x[1]}?`, `Wer schuf diese Skulptur: ${x[2]}?`],
    right: (x) => x[3], pool: uniq(D.SCULPTURES.map((x) => x[3])), label: same, ok: (x, s) => !(x[4] ?? []).includes(s) });

  // ── literature ──
  const places = [...D.SHAKESPEARE.map((x) => x[1]), ...D.SHAKESPEARE_EXTRA_PLACES];
  const plays = [...D.SHAKESPEARE.map((x) => x[0]), ...D.SHAKESPEARE_EXTRA_PLAYS];
  lookup({ family: "art.shakespeare-setting", category: C, rows: D.SHAKESPEARE, stem: (x) => x[0][0], diff: (x) => (x[3] ?? "medium") as Diff,
    text: (x) => [`Where is Shakespeare's play “${x[0][0]}” set?`, `¿Dónde transcurre la obra de Shakespeare «${x[0][1]}»?`, `Wo spielt Shakespeares Stück „${x[0][2]}“?`],
    right: (x) => x[1], pool: places, label: (l) => l, ok: (x, p) => !(x[2] ?? []).includes(p[0]) });
  lookup({ family: "art.shakespeare-setting-rev", category: C, rows: D.SHAKESPEARE, stem: (x) => x[1][0], diff: (x) => (x[3] ?? "medium") as Diff,
    text: (x) => [`Which Shakespeare play is set in ${x[1][0]}?`, `¿Qué obra de Shakespeare transcurre en ${x[1][1]}?`, `Welches Shakespeare-Stück spielt in ${x[1][2]}?`],
    right: (x) => x[0], pool: plays, label: (l) => l });
  const srcKeys = Object.keys(D.TALE_SOURCES);
  lookup({ family: "art.tale-source", category: C, rows: D.TALES, stem: (x) => x[0], diff: (x) => (x[3] === "hauff" || x[3] === "wilde" ? "hard" : "medium"),
    text: (x) => [`Which author or collection does the tale “${x[0]}” come from?`, `¿De qué autor o colección procede el cuento «${x[1]}»?`, `Von welchem Autor oder aus welcher Sammlung stammt „${x[2]}“?`],
    right: (x) => x[3], pool: srcKeys, label: (k) => D.TALE_SOURCES[k].n, ok: (x, k) => !(x[4] ?? []).includes(k) });
  which({ family: "art.tale-source-rev", category: C, rows: D.TALES, per: 10, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const f = D.TALE_SOURCES[k].from; return [`Which of these tales comes from ${f[0]}?`, `¿Cuál de estos cuentos es ${f[1]}?`, `Welche dieser Geschichten stammt ${f[2]}?`]; },
    ok: (_, cand, k) => !(cand[4] ?? []).includes(k) });
  const FAMOUS_COMICS = new Set(["Tintin", "Asterix", "Peanuts", "Garfield", "Superman", "Spider-Man", "Dragon Ball", "The Smurfs", "Mafalda"]);
  lookup({ family: "art.comic-creator", category: C, rows: D.COMICS, stem: (x) => x[0][0], diff: (x) => (FAMOUS_COMICS.has(x[0][0]) ? "medium" : "hard"),
    text: (x) => [`Who created the comic “${x[0][0]}”?`, `¿Quién creó el cómic «${x[0][1]}»?`, `Wer schuf den Comic „${x[0][2]}“?`],
    right: (x) => x[1], pool: D.COMICS.map((x) => x[1]), label: (l) => l, ok: (x, c) => !(x[3] ?? []).includes(c[0]) });
  const comicsC = D.COMICS.filter((x) => x[2]);
  lookup({ family: "art.comic-country", category: C, rows: comicsC, stem: (x) => x[0][0], diff: (x) => (FAMOUS_COMICS.has(x[0][0]) ? "easy" : "medium"),
    text: (x) => [`Which country does the comic “${x[0][0]}” come from?`, `¿De qué país es el cómic «${x[0][1]}»?`, `Aus welchem Land stammt der Comic „${x[0][2]}“?`],
    right: (x) => byId.get(x[2])!, pool: countryPool(comicsC.map((x) => x[2])), label: nameOf, ok: (x, c) => !(x[4] ?? []).includes(c.id) });
  const FAMOUS_DET = new Set(["Arthur Conan Doyle", "Agatha Christie", "Ian Fleming", "Dan Brown"]);
  lookup({ family: "art.detective-author", category: C, rows: D.DETECTIVES, stem: (x) => x[3][0], diff: (x) => (FAMOUS_DET.has(x[4]) ? "easy" : "hard"),
    text: (x) => [`Which author created ${x[0]}?`, `¿Quién creó ${x[1]}?`, `Wer erfand ${x[2]}?`],
    right: (x) => x[4], pool: uniq(D.DETECTIVES.map((x) => x[4])), label: same });
  which({ family: "art.detective-rev", category: C, rows: D.DETECTIVES, per: 8, diff: "medium", key: (x) => x[4], label: (x) => x[3],
    text: (k) => [`Which of these characters was created by ${k}?`, `¿Cuál de estos personajes creó ${k}?`, `Welche dieser Figuren stammt von ${k}?`] });
  lookup({ family: "art.character-book", category: C, rows: D.CHARACTERS, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`In which book ${x[4] ? "do" : "does"} ${x[0]} appear?`, `¿En qué libro aparece${x[4] ? "n" : ""} ${x[1]}?`, `In welchem Buch ${x[4] ? "kommen" : "kommt"} ${x[2]} vor?`],
    right: (x) => x[3], pool: Object.keys(D.CHAR_BOOKS), label: (k) => D.CHAR_BOOKS[k] });
  const playAuthors = uniq(D.PLAYS.map((x) => nameL(x[3])[0])).map((en) => nameL(D.PLAYS.find((x) => nameL(x[3])[0] === en)![3]));
  lookup({ family: "art.play-author", category: C, rows: D.PLAYS, stem: (x) => x[0], diff: (x) => x[4],
    text: (x) => [`Who wrote the play “${x[0]}”?`, `¿Quién escribió la obra de teatro «${x[1]}»?`, `Wer schrieb das Theaterstück „${x[2]}“?`],
    right: (x) => nameL(x[3]), pool: playAuthors, label: (l) => l });
  which({ family: "art.play-author-rev", category: C, rows: D.PLAYS, per: 6, diff: "hard", key: (x) => nameL(x[3])[0], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const a = playAuthors.find((l) => l[0] === k)!; return [`Which of these plays did ${a[0]} write?`, `¿Cuál de estas obras de teatro escribió ${a[1]}?`, `Welches dieser Theaterstücke schrieb ${a[2]}?`]; } });
  lookup({ family: "art.epic-origin", category: C, rows: D.EPICS, stem: (x) => x[0], diff: (x) => x[4],
    text: (x) => [`Which culture does the classic work “${x[0]}” come from?`, `¿De qué cultura procede la obra clásica «${x[1]}»?`, `Aus welchem Kulturkreis stammt das klassische Werk „${x[2]}“?`],
    right: (x) => x[3], pool: Object.keys(D.CULTURES), label: (k) => D.CULTURES[k] });
  groupYesNo("art.nobel-lit", C, 150, D.NOBEL_YES.map(same), D.NOBEL_NO.map(same), "hard",
    ["Which of these writers won the Nobel Prize in Literature?", "¿Cuál de estos escritores ganó el Premio Nobel de Literatura?", "Welcher dieser Schriftsteller erhielt den Literaturnobelpreis?"]);
  groupYesNo("art.nobel-lit-not", C, 100, D.NOBEL_NO.map(same), D.NOBEL_YES.map(same), "hard",
    ["Which of these writers never won the Nobel Prize in Literature?", "¿Cuál de estos escritores nunca ganó el Premio Nobel de Literatura?", "Welcher dieser Schriftsteller erhielt nie den Literaturnobelpreis?"]);

  // ── dance, music genres, folk instruments ──
  const placeFamily = (fam: string, rows: [string, string, string, string, string[]?][], text: (x: [string, string, string, string, string[]?]) => L, diff: (x: [string, string, string, string, string[]?]) => Diff) =>
    lookup({ family: fam, category: C, rows, stem: (x) => x[0], diff, text, right: (x) => byId.get(x[3])!, pool: countryPool(rows.map((x) => x[3])), label: nameOf, ok: (x, c) => !(x[4] ?? []).includes(c.id) });
  const FAMOUS_DANCES = new Set(["tango", "flamenco", "samba", "haka", "polka", "cancan", "tarantella", "sirtaki"]);
  placeFamily("art.dance-country", D.DANCES, (x) => [`Which country does this dance come from: ${x[0]}?`, `¿De qué país procede este baile: ${x[1]}?`, `Aus welchem Land stammt dieser Tanz: ${x[2]}?`], (x) => (FAMOUS_DANCES.has(x[0]) ? "easy" : "medium"));
  which({ family: "art.dance-country-rev", category: C, rows: D.DANCES, per: 8, diff: "medium", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => { const c = byId.get(k)!; return [`Which of these dances comes from ${c.enSubj}?`, `¿Cuál de estos bailes es originario ${c.esDe}?`, `Welcher dieser Tänze stammt ${deAus(c)}?`]; },
    ok: (_, cand, k) => !(cand[4] ?? []).includes(k) });
  placeFamily("art.genre-country", D.GENRES, (x) => [`Which country does the music genre ${x[0]} come from?`, `¿De qué país procede ${x[1]}?`, `Aus welchem Land stammt ${x[2]}?`], (x) => (["reggae", "fado", "K-pop", "bossa nova", "mariachi", "blues"].includes(x[0]) ? "easy" : "medium"));
  placeFamily("art.folk-instrument", D.FOLK_INSTRUMENTS, (x) => [`Which country is this traditional instrument most associated with: ${x[0]}?`, `¿Con qué país se asocia sobre todo este instrumento tradicional: ${x[1]}?`, `Mit welchem Land verbindet man dieses traditionelle Instrument vor allem: ${x[2]}?`], (x) => (["didgeridoo", "balalaika", "castanets", "sitar", "bouzouki"].includes(x[0]) ? "medium" : "hard"));

  // ── ballet & theatre terms ──
  lookup({ family: "art.ballet-term", category: C, rows: D.BALLET_TERMS, stem: (x) => x[0][0], diff: (x) => (["pirouette", "tutu", "pas de deux", "en pointe"].includes(x[0][0]) ? "medium" : "hard"),
    text: (x) => [`In ballet, what does “${x[0][0]}” mean?`, `En ballet, ¿qué significa «${x[0][1]}»?`, `Was bedeutet im Ballett „${x[0][2]}“?`],
    right: (x) => x, pool: D.BALLET_TERMS, label: (x) => x[1] });
  lookup({ family: "art.theatre-term", category: C, rows: D.THEATRE_TERMS, stem: (x) => x[0][0], diff: () => "medium",
    text: (x) => [`In the theatre, what is meant by “${x[0][0]}”?`, `En el teatro, ¿qué significa «${x[0][1]}»?`, `Was versteht man im Theater unter „${x[0][2]}“?`],
    right: (x) => x, pool: D.THEATRE_TERMS, label: (x) => x[1] });
  lookup({ family: "art.theatre-term-rev", category: C, rows: D.THEATRE_TERMS, stem: (x) => x[0][0], diff: () => "medium",
    text: (x) => [`“${x[1][0]}” – which theatre term is this?`, `«${x[1][1]}»: ¿qué término teatral es este?`, `„${x[1][2]}“ – welcher Theaterbegriff ist das?`],
    right: (x) => x, pool: D.THEATRE_TERMS, label: (x) => capL(x[0]) });
}
