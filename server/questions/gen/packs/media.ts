import type { PackApi } from "../generate";
import {
  CINEMA_FACTS, F, FILM_COUNTRY, FILM_YEARS, GAMES, GAME_FACTS, GENRES, GENRE_CLASH, L, NETWORKS, ROLES, SCORES, SERIES_NET, TOONS,
} from "./media-data";

type Diff = "easy" | "medium" | "hard";
const D: Record<F, Diff> = { e: "easy", m: "medium", h: "hard" };
const harder: Record<F, Diff> = { e: "medium", m: "hard", h: "hard" };
const same3 = (s: string): L => [s, s, s];
const capS = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const capL = (l: L): L => [capS(l[0]), capS(l[1]), capS(l[2])];
/** "a el Joker" → "al Joker" */
const esA = (s: string) => (s.startsWith("el ") ? `al ${s.slice(3)}` : `a ${s}`);
/** German accusative of a nominative character name. */
const deAcc = (s: string) => s.replace(/^der /, "den ");
const decade = (y: number) => Math.floor(y / 10) * 10;
const decL = (d: number): L => [`${d}s`, d >= 2000 ? `Década de ${d}` : `Años ${String(d).slice(2)}`, `${d}er-Jahre`];

/** Video Games and Cinema & TV: more question types. */
export default function pack(api: PackApi) {
  const { add, lookup, which, extremeOf, rngFor, sample, byId, nameOf, yearL, deAus } = api;
  const country = (id: string) => byId.get(id);

  // ══ VIDEO GAMES ══════════════════════════════════════════════════
  const G = GAMES.map(([title, hero, genre, year, from, fame]) => ({ title, hero, genre, year, from, fame }));
  const clash = (a: string, b: string) => a === b || GENRE_CLASH.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

  // genre
  const withGenre = G.filter((g) => g.genre);
  lookup({
    family: "vg.genre", category: "games", rows: withGenre, stem: (g) => g.title, diff: (g) => D[g.fame],
    text: (g) => [`What genre of video game is ${g.title}?`, `¿De qué género es el videojuego ${g.title}?`, `Zu welchem Genre gehört das Videospiel ${g.title}?`],
    right: (g) => g.genre!, pool: Object.keys(GENRES), label: (k) => GENRES[k], ok: (g, k) => !clash(g.genre!, k),
  });
  which({
    family: "vg.genre-which", category: "games", rows: withGenre, per: 4, diff: "medium", key: (g) => g.genre!, label: (g) => same3(g.title),
    text: (k) => [`Which of these video games belongs to the genre “${GENRES[k][0]}”?`, `¿Cuál de estos videojuegos pertenece al género «${GENRES[k][1]}»?`, `Welches dieser Videospiele gehört zum Genre „${GENRES[k][2]}“?`],
    ok: (_r, c, k) => !clash(c.genre!, k),
  });

  // release year / decade / which came first
  const dated = G.filter((g) => g.year);
  const yearsG = Array.from({ length: 2025 - 1970 }, (_, i) => 1970 + i);
  lookup({
    family: "vg.year", category: "games", rows: dated, variants: 2, stem: (g) => g.title, diff: (g) => harder[g.fame],
    text: (g) => [`In which year was ${g.title} first released?`, `¿En qué año salió ${g.title} por primera vez?`, `In welchem Jahr erschien ${g.title} zum ersten Mal?`],
    right: (g) => g.year!, pool: yearsG, label: yearL, ok: (g, y) => Math.abs(y - g.year!) <= 8,
  });
  const decsG = [1970, 1980, 1990, 2000, 2010, 2020];
  lookup({
    family: "vg.decade", category: "games", rows: dated, variants: 2, stem: (g) => g.title, diff: (g) => D[g.fame],
    text: (g) => [`In which decade did ${g.title} first come out?`, `¿En qué década salió ${g.title}?`, `In welchem Jahrzehnt erschien ${g.title}?`],
    right: (g) => decade(g.year!), pool: decsG, label: decL,
  });
  const gRows = dated.map((g) => [g.title, g.title, g.title, g.year!] as [string, string, string, number]);
  extremeOf({ family: "vg.first", category: "games", n: 220, rows: gRows, max: false, minGap: 3, diff: "medium",
    text: ["Which of these video games came out first?", "¿Cuál de estos videojuegos salió primero?", "Welches dieser Videospiele erschien zuerst?"] });
  extremeOf({ family: "vg.newest", category: "games", n: 220, rows: gRows, max: true, minGap: 3, diff: "medium",
    text: ["Which of these video games is the newest?", "¿Cuál de estos videojuegos es el más reciente?", "Welches dieser Videospiele ist das neueste?"] });

  // country of the developer
  const located = G.filter((g) => g.from && country(g.from));
  const devPool = [...new Set(located.map((g) => g.from!))];
  lookup({
    family: "vg.country", category: "games", rows: located, stem: (g) => g.title, diff: (g) => (g.from === "japan" || g.from === "usa" ? D[g.fame] : harder[g.fame]),
    text: (g) => [`In which country was ${g.title} developed?`, `¿En qué país se desarrolló ${g.title}?`, `In welchem Land wurde ${g.title} entwickelt?`],
    right: (g) => g.from!, pool: devPool, label: (id) => nameOf(country(id)!),
  });
  which({
    family: "vg.country-which", category: "games", rows: located, per: 3, diff: (k) => (k === "japan" || k === "usa" ? "medium" : "hard"),
    key: (g) => g.from!, label: (g) => same3(g.title),
    text: (k) => {
      const c = country(k)!;
      return [`Which of these video games was developed in ${c.enSubj}?`, `¿Cuál de estos videojuegos se desarrolló en ${c.esSubj}?`, `Welches dieser Videospiele wurde ${c.deIn} entwickelt?`];
    },
  });

  // main characters
  const heroes = G.filter((g) => g.hero);
  lookup({
    family: "vg.hero", category: "games", rows: heroes, stem: (g) => g.title, diff: (g) => D[g.fame],
    text: (g) => [`Who is the main character of ${g.title}?`, `¿Quién es el protagonista de ${g.title}?`, `Wer ist die Hauptfigur von ${g.title}?`],
    right: (g) => g.hero!, pool: [...new Set(heroes.map((g) => g.hero!))], label: same3,
  });
  lookup({
    family: "vg.hero-rev", category: "games", rows: heroes.filter((g) => g.hero !== g.title), stem: (g) => g.hero!, diff: (g) => D[g.fame],
    text: (g) => [`In which game is ${g.hero} the main character?`, `¿En qué videojuego es ${g.hero} el protagonista?`, `In welchem Videospiel ist ${g.hero} die Hauptfigur?`],
    right: (g) => g.title, pool: heroes.map((g) => g.title), label: same3, ok: (g, t) => heroes.find((h) => h.title === t)!.hero !== g.hero,
  });

  // hand-written
  const hand = (family: string, category: "games" | "cinema", rows: [F, L, L, L, L, L][]) =>
    rows.forEach(([f, q, right, w1, w2, w3]) => add(family, q[0], category, D[f], q, right, [w1, w2, w3]));
  hand("vg.facts", "games", GAME_FACTS.slice(0, 30));
  hand("vg.makers", "games", GAME_FACTS.slice(30));

  // ══ CINEMA & TV ══════════════════════════════════════════════════
  const charL = (c: L): L => capL(c);
  const roleLabel = (r: (typeof ROLES)[number]): L => {
    const c = charL(r[0]);
    return [`${c[0]} (${r[1][0]})`, `${c[1]} (${r[1][1]})`, `${c[2]} (${r[1][2]})`];
  };
  const actorsF = new Set(ROLES.filter((r) => r[3]).map((r) => r[2]));
  lookup({
    family: "cine.actor", category: "cinema", rows: ROLES, stem: (r) => `${r[0][0]}|${r[1][0]}`, diff: () => "medium",
    text: ([c, f]) => [`Who played ${c[0]} in “${f[0]}”?`, `¿Quién interpretó ${esA(c[1])} en «${f[1]}»?`, `Wer spielte ${deAcc(c[2])} in „${f[2]}“?`],
    right: (r) => r[2], pool: [...new Set(ROLES.map((r) => r[2]))], label: same3,
    ok: (r, a) => actorsF.has(a) === !!r[3],
  });
  const multi = ROLES.filter((r) => ROLES.filter((x) => x[2] === r[2]).length >= 2);
  which({
    family: "cine.actor-role", category: "cinema", rows: ROLES, per: 2, diff: "medium", key: (r) => r[2], label: roleLabel,
    text: (a) => [`Which of these roles did ${a} play?`, `¿Cuál de estos papeles interpretó ${a}?`, `Welche dieser Rollen spielte ${a}?`],
    ok: (right, c, a) => c[2] !== a && !!c[3] === !!right[3],
  });
  // extra round for actors with several famous roles
  which({
    family: "cine.actor-role2", category: "cinema", rows: multi.concat(ROLES.filter((r) => !multi.includes(r))), per: 2, diff: "hard", key: (r) => r[2], label: (r) => charL(r[0]),
    text: (a) => [`Which of these characters has ${a} played?`, `¿A cuál de estos personajes ha interpretado ${a}?`, `Welche dieser Figuren hat ${a} gespielt?`],
    ok: (right, c, a) => c[2] !== a && !!c[3] === !!right[3] && !ROLES.some((x) => x[2] === a && x[0][0] === c[0][0]),
  });

  // film years
  const years = Array.from({ length: 2025 - 1920 }, (_, i) => 1920 + i);
  lookup({
    family: "cine.year", category: "cinema", rows: FILM_YEARS, variants: 2, stem: (r) => r[0][0], diff: () => "hard",
    text: ([t]) => [`In which year did the film “${t[0]}” come out?`, `¿En qué año se estrenó la película «${t[1]}»?`, `In welchem Jahr kam der Film „${t[2]}“ heraus?`],
    right: (r) => r[1], pool: years, label: yearL, ok: (r, y) => Math.abs(y - r[1]) <= 8,
  });
  lookup({
    family: "cine.decade", category: "cinema", rows: FILM_YEARS, variants: 2, stem: (r) => r[0][0], diff: (r) => (r[1] < 1970 ? "hard" : "medium"),
    text: ([t]) => [`In which decade did the film “${t[0]}” come out?`, `¿En qué década se estrenó la película «${t[1]}»?`, `In welchem Jahrzehnt kam der Film „${t[2]}“ heraus?`],
    right: (r) => decade(r[1]), pool: [1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020], label: decL,
    ok: (r, d) => Math.abs(d - decade(r[1])) <= 30,
  });
  const fRows = FILM_YEARS.map(([t, y]) => [t[0], t[1], t[2], y] as [string, string, string, number]);
  extremeOf({ family: "cine.first", category: "cinema", n: 260, rows: fRows, max: false, minGap: 4, diff: "medium",
    text: ["Which of these films came out first?", "¿Cuál de estas películas se estrenó primero?", "Welcher dieser Filme kam zuerst heraus?"] });
  extremeOf({ family: "cine.newest", category: "cinema", n: 260, rows: fRows, max: true, minGap: 4, diff: "medium",
    text: ["Which of these films is the most recent?", "¿Cuál de estas películas es la más reciente?", "Welcher dieser Filme ist der neueste?"] });

  // composers
  lookup({
    family: "cine.composer", category: "cinema", rows: SCORES, stem: (r) => r[0][0], diff: (r) => (["John Williams", "Hans Zimmer"].includes(r[1]) ? "medium" : "hard"),
    text: ([t]) => [`Who composed the music for “${t[0]}”?`, `¿Quién compuso la música de «${t[1]}»?`, `Wer komponierte die Musik zu „${t[2]}“?`],
    right: (r) => r[1], pool: [...new Set(SCORES.map((r) => r[1]))], label: same3,
  });
  which({
    family: "cine.composer-which", category: "cinema", rows: SCORES, per: 3, diff: "hard", key: (r) => r[1], label: (r) => r[0],
    text: (c) => [`For which of these films did ${c} write the music?`, `¿Para cuál de estas películas compuso la música ${c}?`, `Zu welchem dieser Filme schrieb ${c} die Musik?`],
  });

  // country of production
  const fc = FILM_COUNTRY.filter((r) => country(r[1]));
  lookup({
    family: "cine.country", category: "cinema", rows: fc, stem: (r) => r[0][0], diff: (r) => D[r[2]],
    text: ([t]) => [`Which country is the film “${t[0]}” from?`, `¿De qué país es la película «${t[1]}»?`, `Aus welchem Land stammt der Film „${t[2]}“?`],
    right: (r) => r[1], pool: [...new Set(fc.map((r) => r[1]))], label: (id) => nameOf(country(id)!),
  });
  which({
    family: "cine.country-which", category: "cinema", rows: fc, per: 3, diff: "medium", key: (r) => r[1], label: (r) => r[0],
    text: (k) => {
      const c = country(k)!;
      return [`Which of these films comes from ${c.enSubj}?`, `¿Cuál de estas películas es ${c.esDe}?`, `Welcher dieser Filme stammt ${deAus(c)}?`];
    },
  });

  // animated characters
  lookup({
    family: "cine.toon", category: "cinema", rows: TOONS, stem: (r) => r[0][0], diff: (r) => D[r[2]],
    text: ([c]) => [`In which animated film is ${c[0]} a main character?`, `¿En qué película de animación es ${c[1]} protagonista?`, `In welchem Animationsfilm ist ${c[2]} eine Hauptfigur?`],
    right: (r) => r[1], pool: TOONS.map((r) => r[1]), label: (f) => f,
  });
  lookup({
    family: "cine.toon-rev", category: "cinema", rows: TOONS.filter((r) => r[0][0] !== r[1][0]), stem: (r) => r[1][0], diff: (r) => D[r[2]],
    text: ([, f]) => [`Which of these characters is a main character in “${f[0]}”?`, `¿Cuál de estos personajes es protagonista de «${f[1]}»?`, `Welche dieser Figuren ist eine Hauptfigur in „${f[2]}“?`],
    right: (r) => r[0], pool: TOONS.map((r) => r[0]), label: (c) => c,
  });

  // where a series first aired
  lookup({
    family: "tv.network", category: "cinema", rows: SERIES_NET, stem: (r) => r[0][0], diff: (r) => D[r[2]],
    text: ([s]) => [`On which network or streaming service did “${s[0]}” first air?`, `¿En qué cadena o plataforma se estrenó «${s[1]}»?`, `Auf welchem Sender oder Streamingdienst lief „${s[2]}“ zuerst?`],
    right: (r) => r[1], pool: Object.keys(NETWORKS), label: (k) => same3(NETWORKS[k].l),
  });
  which({
    family: "tv.network-which", category: "cinema", rows: SERIES_NET, per: 3, diff: "medium", key: (r) => r[1], label: (r) => r[0],
    text: (k) => [`Which of these series first aired on ${NETWORKS[k].l}?`, `¿Cuál de estas series se estrenó ${NETWORKS[k].es}?`, `Welche dieser Serien lief zuerst ${NETWORKS[k].de}?`],
  });

  hand("cine.facts", "cinema", CINEMA_FACTS.slice(0, 32));
  hand("cine.more", "cinema", CINEMA_FACTS.slice(32));
  void rngFor; void sample;
}
