import type { PackApi } from "../generate";
import type { F, L } from "./media-data";
import {
  ARTIST_GENRE, CINEMA_FACTS2, CITIES, DIRECTORS, EXCLUSIVES, FESTIVALS, FILM_CITY, GAME_FACTS2, GAME_SETTINGS, GAME_TERMS, GENRE_CLASH2, HANDHELD,
  HOME_CONSOLES, INSTRUMENTS, MUSIC_GENRES, OSCAR_ACTING, OWNED, OWNERS, PLATFORMS, PLAYERS, POP_FACTS, SERIES_CHARS,
} from "./media2-data";

type Diff = "easy" | "medium" | "hard";
type Cat = "games" | "cinema" | "pop_culture";
const D: Record<F, Diff> = { e: "easy", m: "medium", h: "hard" };
const same3 = (s: string): L => [s, s, s];
const low = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** Second round for Video Games, Cinema & TV and Pop Culture. */
export default function pack(api: PackApi) {
  const { add, lookup, which, groupYesNo, byId, nameOf, deAus } = api;
  const country = (id: string) => byId.get(id)!;
  const cname = (id: string) => nameOf(country(id));
  const hand = (family: string, cat: Cat, rows: [F, L, L, L, L, L][]) =>
    rows.forEach(([f, q, right, w1, w2, w3]) => add(family, q[0], cat, D[f], q, right, [w1, w2, w3]));
  /** lookup "which country" + reverse "which of these is from <country>" */
  const countryPair = <T>(o: {
    family: string; cat: Cat; rows: T[]; name: (r: T) => L; id: (r: T) => string; fame: (r: T) => F;
    q: (n: L) => L; rev: (c: { enSubj: string; esSubj: string; esDe: string; deIn: string; aus: string }) => L;
  }) => {
    const rows = o.rows.filter((r) => byId.has(o.id(r)));
    lookup({ family: o.family, category: o.cat, rows, stem: (r) => o.name(r)[0], diff: (r) => D[o.fame(r)], text: (r) => o.q(o.name(r)),
      right: o.id, pool: [...new Set(rows.map(o.id))], label: cname });
    which({ family: `${o.family}-which`, category: o.cat, rows, per: 3, diff: "medium", key: o.id, label: o.name,
      text: (k) => { const c = country(k); return o.rev({ enSubj: c.enSubj, esSubj: c.esSubj, esDe: c.esDe, deIn: c.deIn, aus: deAus(c) }); } });
  };

  // ══ VIDEO GAMES ══════════════════════════════════════════════════
  const chars = Object.entries(SERIES_CHARS).flatMap(([s, cs]) => cs.map((c) => ({ s, c })));
  lookup({
    family: "vg.series-char", category: "games", rows: chars, stem: (r) => r.c[0], diff: () => "medium",
    text: ({ c }) => [`In which game series do you meet ${c[0]}?`, `¿En qué saga de videojuegos aparece ${c[1]}?`, `In welcher Spielreihe trifft man ${c[2]}?`],
    right: (r) => r.s, pool: Object.keys(SERIES_CHARS), label: same3,
  });
  which({
    family: "vg.series-char-which", category: "games", rows: chars, per: 3, diff: "medium", key: (r) => r.s, label: (r) => r.c,
    text: (s) => [`Which of these characters is from ${s}?`, `¿Cuál de estos personajes es de ${s}?`, `Welche dieser Figuren stammt aus ${s}?`],
  });
  lookup({
    family: "vg.exclusive", category: "games", rows: EXCLUSIVES, stem: (r) => r[0], diff: (r) => D[r[2]],
    text: ([g]) => [`${g} first came out only on the consoles of which company?`, `${g} salió primero solo para las consolas de qué empresa?`, `Für die Konsolen welcher Firma erschien ${g} zuerst exklusiv?`],
    right: (r) => r[1], pool: Object.keys(PLATFORMS), label: (k) => PLATFORMS[k],
  });
  which({
    family: "vg.exclusive-which", category: "games", rows: EXCLUSIVES, per: 4, diff: "medium", key: (r) => r[1], label: (r) => same3(r[0]),
    text: (k) => [`Which of these games first came out exclusively for ${PLATFORMS[k][0]}?`, `¿Cuál de estos juegos salió primero en exclusiva para ${PLATFORMS[k][1]}?`, `Welches dieser Spiele erschien zuerst exklusiv für ${PLATFORMS[k][2]}?`],
  });
  groupYesNo("vg.handheld", "games", 90, HANDHELD, HOME_CONSOLES, "easy",
    ["Which of these is a handheld (portable) console?", "¿Cuál de estas es una consola portátil?", "Welche dieser Konsolen ist ein Handheld (tragbar)?"]);
  groupYesNo("vg.home-console", "games", 90, HOME_CONSOLES, HANDHELD, "easy",
    ["Which of these is a home console (not portable)?", "¿Cuál de estas es una consola de sobremesa (no portátil)?", "Welche dieser Konsolen ist eine Heimkonsole (nicht tragbar)?"]);
  countryPair({
    family: "vg.setting", cat: "games", rows: GAME_SETTINGS, name: (r) => same3(r[0]), id: (r) => r[1], fame: (r) => r[2],
    q: (n) => [`In which country is the game ${n[0]} mainly set?`, `¿En qué país transcurre principalmente el juego ${n[1]}?`, `In welchem Land spielt das Spiel ${n[2]} hauptsächlich?`],
    rev: (c) => [`Which of these games is mainly set in ${c.enSubj}?`, `¿Cuál de estos juegos transcurre principalmente en ${c.esSubj}?`, `Welches dieser Spiele spielt hauptsächlich ${c.deIn}?`],
  });
  lookup({
    family: "vg.term", category: "games", rows: GAME_TERMS, stem: (r) => r[0][0], diff: (r) => D[r[2]],
    text: ([t]) => [`In gaming, what does “${t[0]}” mean?`, `En los videojuegos, ¿qué significa «${t[1]}»?`, `Was bedeutet beim Gaming „${t[2]}“?`],
    right: (r) => r[1], pool: GAME_TERMS.map((r) => r[1]), label: (l) => l,
  });
  lookup({
    family: "vg.term-rev", category: "games", rows: GAME_TERMS, stem: (r) => r[0][0], diff: (r) => D[r[2]],
    text: ([, m]) => [`Which gaming term means: ${low(m[0])}?`, `¿Qué término de videojuegos significa: ${low(m[1])}?`, `Welcher Gaming-Begriff bedeutet: ${m[2]}?`],
    right: (r) => r[0], pool: GAME_TERMS.map((r) => r[0]), label: (l) => l,
  });
  hand("vg.facts2", "games", GAME_FACTS2.slice(0, 12));
  hand("vg.nintendo-pokemon", "games", GAME_FACTS2.slice(12));

  // ══ CINEMA & TV ══════════════════════════════════════════════════
  const oscars = OSCAR_ACTING;
  lookup({
    family: "cine.oscar-winner", category: "cinema", rows: oscars, stem: (r) => `${r[0]}|${r[1][0]}`, diff: (r) => (r[3] >= 2010 ? "medium" : "hard"),
    text: ([, f, fem]) => fem
      ? [`Who won the Oscar for Best Actress for “${f[0]}”?`, `¿Quién ganó el Óscar a la mejor actriz por «${f[1]}»?`, `Wer gewann den Oscar als beste Hauptdarstellerin für „${f[2]}“?`]
      : [`Who won the Oscar for Best Actor for “${f[0]}”?`, `¿Quién ganó el Óscar al mejor actor por «${f[1]}»?`, `Wer gewann den Oscar als bester Hauptdarsteller für „${f[2]}“?`],
    right: (r) => r[0], pool: [...new Set(oscars.map((r) => r[0]))], label: same3,
    ok: (r, a) => oscars.find((x) => x[0] === a)![2] === r[2],
  });
  lookup({
    family: "cine.oscar-film", category: "cinema", rows: oscars, stem: (r) => `${r[0]}|${r[1][0]}`, diff: (r) => (r[3] >= 2010 ? "medium" : "hard"),
    text: ([n, , fem]) => fem
      ? [`For which film did ${n} win the Oscar for Best Actress?`, `¿Por qué película ganó ${n} el Óscar a la mejor actriz?`, `Für welchen Film gewann ${n} den Oscar als beste Hauptdarstellerin?`]
      : [`For which film did ${n} win the Oscar for Best Actor?`, `¿Por qué película ganó ${n} el Óscar al mejor actor?`, `Für welchen Film gewann ${n} den Oscar als bester Hauptdarsteller?`],
    right: (r) => r[1], pool: oscars.map((r) => r[1]), label: (l) => l,
    ok: (r, f) => !oscars.some((x) => x[0] === r[0] && x[1][0] === f[0]),
  });
  lookup({
    family: "cine.city", category: "cinema", rows: FILM_CITY, stem: (r) => r[0][0], diff: (r) => D[r[2]],
    text: ([t]) => [`In which city is the film “${t[0]}” mainly set?`, `¿En qué ciudad transcurre principalmente la película «${t[1]}»?`, `In welcher Stadt spielt der Film „${t[2]}“ hauptsächlich?`],
    right: (r) => r[1], pool: Object.keys(CITIES), label: (k) => CITIES[k],
  });
  which({
    family: "cine.city-which", category: "cinema", rows: FILM_CITY, per: 2, diff: "medium", key: (r) => r[1], label: (r) => r[0],
    text: (k) => [`Which of these films is mainly set in ${CITIES[k][0]}?`, `¿Cuál de estas películas transcurre principalmente en ${CITIES[k][1]}?`, `Welcher dieser Filme spielt hauptsächlich in ${CITIES[k][2]}?`],
  });
  countryPair({
    family: "cine.director-country", cat: "cinema", rows: DIRECTORS, name: (r) => same3(r[0]), id: (r) => r[1], fame: (r) => r[2],
    q: (n) => [`Which country is the film director ${n[0]} from?`, `¿De qué país es el director de cine ${n[1]}?`, `Aus welchem Land stammt der Filmregisseur ${n[2]}?`],
    rev: (c) => [`Which of these film directors comes from ${c.enSubj}?`, `¿Cuál de estos directores de cine es ${c.esDe}?`, `Welcher dieser Filmregisseure stammt ${c.aus}?`],
  });
  hand("cine.facts2", "cinema", CINEMA_FACTS2.slice(0, 11));
  hand("tv.facts", "cinema", CINEMA_FACTS2.slice(11));

  // ══ POP CULTURE ══════════════════════════════════════════════════
  const gclash = (a: string, b: string) => a === b || GENRE_CLASH2.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  lookup({
    family: "pop.music-genre", category: "pop_culture", rows: ARTIST_GENRE, stem: (r) => r[0], diff: (r) => D[r[2]],
    text: ([a]) => [`Which music genre is ${a} best known for?`, `¿Por qué género musical es más conocido ${a}?`, `Für welches Musikgenre ist ${a} vor allem bekannt?`],
    right: (r) => r[1], pool: Object.keys(MUSIC_GENRES), label: (k) => MUSIC_GENRES[k], ok: (r, k) => !gclash(r[1], k),
  });
  which({
    family: "pop.music-genre-which", category: "pop_culture", rows: ARTIST_GENRE, per: 3, diff: "medium", key: (r) => r[1], label: (r) => same3(r[0]),
    text: (k) => [`Which of these artists is best known for ${MUSIC_GENRES[k][0]}?`, `¿Cuál de estos artistas es conocido sobre todo por el género «${MUSIC_GENRES[k][1]}»?`, `Wer dieser Künstler ist vor allem für ${MUSIC_GENRES[k][2]} bekannt?`],
    ok: (_r, c, k) => !gclash(c[1], k),
  });
  lookup({
    family: "pop.instrument", category: "pop_culture", rows: PLAYERS, stem: (r) => r[0], diff: (r) => D[r[2]],
    text: ([p]) => [`Which instrument is ${p} famous for playing?`, `¿Qué instrumento hizo famoso a ${p}?`, `Für welches Instrument ist ${p} berühmt?`],
    right: (r) => r[1], pool: Object.keys(INSTRUMENTS), label: (k) => INSTRUMENTS[k],
  });
  which({
    family: "pop.instrument-which", category: "pop_culture", rows: PLAYERS, per: 3, diff: "medium", key: (r) => r[1], label: (r) => same3(r[0]),
    text: (k) => [`Who of these musicians is famous for playing the ${low(INSTRUMENTS[k][0])}?`, `¿Cuál de estos músicos es famoso por tocar este instrumento: ${low(INSTRUMENTS[k][1])}?`, `Wer dieser Musiker ist berühmt für dieses Instrument: ${INSTRUMENTS[k][2]}?`],
  });
  lookup({
    family: "pop.owner", category: "pop_culture", rows: OWNED, stem: (r) => r[0], diff: (r) => D[r[2]],
    text: ([b]) => [`Which company owns ${b}?`, `¿Qué empresa es dueña de ${b}?`, `Welcher Firma gehört ${b}?`],
    right: (r) => r[1], pool: Object.keys(OWNERS), label: (k) => OWNERS[k],
  });
  which({
    family: "pop.owner-which", category: "pop_culture", rows: OWNED, per: 3, diff: "medium", key: (r) => r[1], label: (r) => same3(r[0]),
    text: (k) => [`Which of these belongs to ${OWNERS[k][0]}?`, `¿Cuál de estos pertenece a ${OWNERS[k][1]}?`, `Was davon gehört zu ${OWNERS[k][2]}?`],
  });
  countryPair({
    family: "pop.festival", cat: "pop_culture", rows: FESTIVALS, name: (r) => same3(r[0]), id: (r) => r[1], fame: (r) => r[2],
    q: (n) => [`In which country does the music festival ${n[0]} take place?`, `¿En qué país se celebra el festival de música ${n[1]}?`, `In welchem Land findet das Musikfestival ${n[2]} statt?`],
    rev: (c) => [`Which of these music festivals takes place in ${c.enSubj}?`, `¿Cuál de estos festivales de música se celebra en ${c.esSubj}?`, `Welches dieser Musikfestivals findet ${c.deIn} statt?`],
  });
  hand("pop.music-facts", "pop_culture", POP_FACTS.slice(0, 10));
  hand("pop.internet", "pop_culture", POP_FACTS.slice(10, 17));
  hand("pop.toys-comics", "pop_culture", POP_FACTS.slice(17));
}
