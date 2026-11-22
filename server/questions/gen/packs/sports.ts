import type { PackApi, L } from "../generate";
import {
  AREA_POOL, AREAS, ATHLETE_NATION, ATHLETE_NICKNAMES, BALLON_DOR, BALLON_DOR_EARLY, CIRCUITS, CITY, EQUIP_POOL, EQUIPMENT, F1_CHAMPIONS,
  F1_NON_CHAMPIONS, FOOTBALL_NICKNAMES, MARTIAL_ARTS, MARTIAL_POOL, MOMENT_POOLS, MOMENTS, NEVER_WINTER_HOSTS, NICKNAME_EXTRAS, NO_BALLON_DOR,
  OLYMPIC_GOLDS, ORIGIN, RUGBY_NATIONS, RUGBY_NICKNAMES, SP, SPORT_ORIGINS, STADIUMS, SUMMER_SPORTS, TEAMS, TOUR_NON_WINNERS, TOUR_WINNERS,
  TROPHIES, VENUES, WC_TOP_SCORERS, WIMBLEDON_NON_WINNERS, WIMBLEDON_WINNERS, WINTER_OLYMPICS, WINTER_ONLY_SPORTS, WINTER_SPORTS,
} from "./sports-data";

type D = "easy" | "medium" | "hard";

/** Extra question types for the "sports" category. */
export default function pack(api: PackApi) {
  const { add, lookup, which, groupYesNo, extremeOf, rngFor, sample, same, low, capL, byId, nameOf, deAus, yearL } = api;
  const C = "sports" as const;
  const uniq = (ls: L[]) => [...new Map(ls.map((l) => [l[0], l])).values()];
  const num = (n: number, dec = 0) => n.toFixed(dec);
  const numL = (n: number, dec: number, unit: L): L => [`${num(n, dec)} ${unit[0]}`, `${num(n, dec).replace(".", ",")} ${unit[1]}`, `${num(n, dec).replace(".", ",")} ${unit[2]}`];
  const teamL = (k: string): L => [TEAMS[k][0], TEAMS[k][1], TEAMS[k][2]];
  const sportEn = (k: string) => (k === "amfootball" || k === "f1" ? SP[k][0] : low(SP[k][0]));
  /** n fixed-text questions with numeric answers: 3 wrong values sampled from cands. */
  const numeric = (family: string, rows: [L, number, number[], D][], label: (n: number) => L, variants = 3) => {
    const r = rngFor(family);
    for (const [text, n, cands, d] of rows) {
      for (let v = 0; v < variants; v++) {
        const ws = sample(r, cands, 3, (x) => x !== n);
        if (ws) add(family, text[0], C, d, text, label(n), ws.map(label));
      }
    }
  };
  /** fixed-text question whose wrong answers are sampled from a list */
  const choice = (family: string, stem: string, d: D, text: L, right: L, wrongs: L[], variants: number) => {
    const r = rngFor(`${family}:${stem}`);
    for (let v = 0; v < variants; v++) {
      const ws = sample(r, wrongs, 3, (w) => w[0] !== right[0]);
      if (ws) add(family, stem, C, d, text, right, ws);
    }
  };

  // ── Winter Olympics ──
  const winterCities = uniq(WINTER_OLYMPICS.map((w) => [w[1], w[2], w[3]] as L));
  const cortina = (s: string) => s.includes("Cortina");
  lookup({ family: "sport.winter-host", category: C, rows: WINTER_OLYMPICS, stem: (x) => String(x[0]), diff: (x) => (x[0] >= 1988 ? "medium" : "hard"),
    text: (x) => x[0] === 2026
      ? ["Which cities hosted the 2026 Winter Olympics?", "¿Qué ciudades organizaron los Juegos Olímpicos de invierno de 2026?", "Welche Städte richteten die Olympischen Winterspiele 2026 aus?"]
      : [`Which city hosted the ${x[0]} Winter Olympics?`, `¿Qué ciudad organizó los Juegos Olímpicos de invierno de ${x[0]}?`, `Welche Stadt richtete die Olympischen Winterspiele ${x[0]} aus?`],
    right: (x) => [x[1], x[2], x[3]] as L, pool: winterCities, label: (l) => l, ok: (x, l) => !(cortina(x[1]) && cortina(l[0])) });
  const winterYears = WINTER_OLYMPICS.map((w) => w[0]);
  const onceHosts = WINTER_OLYMPICS.filter((w) => !cortina(w[1]) && WINTER_OLYMPICS.filter((o) => o[1] === w[1]).length === 1);
  lookup({ family: "sport.winter-year", category: C, rows: onceHosts, stem: (x) => x[1], diff: () => "hard",
    text: (x) => [`In which year did ${x[1]} host the Winter Olympics?`, `¿En qué año organizó ${x[2]} los Juegos Olímpicos de invierno?`, `In welchem Jahr richtete ${x[3]} die Olympischen Winterspiele aus?`],
    right: (x) => x[0], pool: winterYears, label: yearL, ok: (x, y) => Math.abs(x[0] - y) <= 24 });
  groupYesNo("sport.winter-hosted", C, 90, winterCities.filter((c) => !c[0].startsWith("Milan")), NEVER_WINTER_HOSTS, "medium",
    ["Which of these places has hosted the Winter Olympics?", "¿Cuál de estos lugares ha organizado unos Juegos Olímpicos de invierno?", "Welcher dieser Orte war schon Gastgeber Olympischer Winterspiele?"]);
  groupYesNo("sport.winter-sport", C, 90, WINTER_SPORTS, SUMMER_SPORTS, "easy",
    ["Which of these sports is part of the Winter Olympics?", "¿Cuál de estos deportes forma parte de los Juegos Olímpicos de invierno?", "Welche dieser Sportarten gehört zu den Olympischen Winterspielen?"]);
  groupYesNo("sport.summer-sport", C, 90, SUMMER_SPORTS, WINTER_ONLY_SPORTS, "easy",
    ["Which of these sports is part of the Summer Olympics?", "¿Cuál de estos deportes forma parte de los Juegos Olímpicos de verano?", "Welche dieser Sportarten gehört zu den Olympischen Sommerspielen?"]);

  // ── athletes → country ──
  const dMap: Record<string, D> = { e: "easy", m: "medium", h: "hard" };
  const nationPool = [...new Set([...ATHLETE_NATION.map((a) => a[1]), "ireland", "turkey", "chile", "peru", "iran"])].map((id) => byId.get(id)!).filter(Boolean);
  lookup({ family: "sport.athlete-country", category: C, rows: ATHLETE_NATION, stem: (x) => x[0], diff: (x) => dMap[x[2]],
    text: (x) => [`Which country does ${x[0]} come from?`, `¿De qué país es ${x[0]}?`, `Aus welchem Land stammt ${x[0]}?`],
    right: (x) => byId.get(x[1])!, pool: nationPool, label: nameOf, ok: (x, c) => c.id !== x[1] && !(x[3] ?? []).includes(c.id) });
  which({ family: "sport.athlete-country-rev", category: C, rows: ATHLETE_NATION, per: 5, diff: "medium", key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => { const c = byId.get(k)!; return [`Which of these sports stars comes from ${c.enSubj}?`, `¿Cuál de estas estrellas del deporte es ${c.esDe}?`, `Welcher dieser Sportstars stammt ${deAus(c)}?`]; },
    ok: (_, cand, k) => !(cand[3] ?? []).includes(k) });

  // ── stadiums ──
  const cityKeys = Object.keys(CITY);
  const BIG_STADIUMS = new Set(["Camp Nou", "Santiago Bernabéu", "Wembley Stadium", "Old Trafford", "Anfield", "Allianz Arena", "Maracanã", "San Siro"]);
  lookup({ family: "sport.stadium-city", category: C, rows: STADIUMS, stem: (x) => x[0], diff: (x) => (BIG_STADIUMS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`${x[0]}: in which city is this sports venue?`, `${x[1]}: ¿en qué ciudad está este recinto deportivo?`, `${x[2]}: In welcher Stadt befindet sich diese Sportstätte?`],
    right: (x) => x[3], pool: cityKeys, label: (k) => CITY[k] });
  which({ family: "sport.stadium-city-rev", category: C, rows: STADIUMS, per: 4, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => [`Which of these sports venues is in ${CITY[k][0]}?`, `¿Cuál de estos recintos deportivos está en ${CITY[k][1]}?`, `Welche dieser Sportstätten liegt in ${CITY[k][2]}?`] });
  const withClub = STADIUMS.filter((s) => s[4]);
  lookup({ family: "sport.stadium-club", category: C, rows: withClub, stem: (x) => x[0], diff: (x) => (BIG_STADIUMS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`${x[0]}: which football club plays its home games here?`, `${x[1]}: ¿qué club de fútbol juega aquí como local?`, `${x[2]}: Welcher Fußballverein trägt hier seine Heimspiele aus?`],
    right: (x) => x[4]!, pool: withClub.map((s) => s[4]!), label: (l) => l });

  // ── nicknames of national teams ──
  const nickTeams = [...new Set([...FOOTBALL_NICKNAMES.map((n) => n[3]), "chile", "portugal"])];
  const EASY_NICKS = new Set(["La Roja", "Les Bleus", "Azzurri", "Oranje", "Seleção", "Albiceleste", "Die Mannschaft", "Three Lions"]);
  lookup({ family: "sport.team-nickname", category: C, rows: FOOTBALL_NICKNAMES, stem: (x) => x[0], diff: (x) => (EASY_NICKS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which national football team is nicknamed “${x[0]}”?`, `¿Qué selección nacional de fútbol es conocida como «${x[1]}»?`, `Welche Fußballnationalmannschaft trägt den Spitznamen „${x[2]}“?`],
    right: (x) => x[3], pool: nickTeams, label: teamL, ok: (x, k) => !(x[4] ?? []).includes(k) });
  lookup({ family: "sport.team-nickname-rev", category: C, rows: FOOTBALL_NICKNAMES, stem: (x) => x[3], diff: (x) => (EASY_NICKS.has(x[0]) ? "easy" : "medium"),
    text: (x) => { const t = TEAMS[x[3]]; return [`What is the nickname of the ${t[3]} national football team?`, `¿Cómo se apoda la selección de fútbol ${t[4]}?`, `Welchen Spitznamen trägt die Fußballnationalmannschaft ${t[5]}?`]; },
    right: (x) => x, pool: FOOTBALL_NICKNAMES, label: (x) => [x[0], x[1], x[2]], ok: (x, c) => !(c[4] ?? []).includes(x[3]) });
  lookup({ family: "sport.rugby-nickname", category: C, rows: RUGBY_NICKNAMES, variants: 4, stem: (x) => x[0], diff: (x) => (x[0] === "All Blacks" ? "easy" : "medium"),
    text: (x) => [`Which national rugby union team is nicknamed “${x[0]}”?`, `¿Qué selección nacional de rugby es conocida como «${x[1]}»?`, `Welche Rugby-Nationalmannschaft trägt den Spitznamen „${x[2]}“?`],
    right: (x) => x[3], pool: RUGBY_NATIONS, label: teamL });

  // ── cycling jerseys ──
  const COL: Record<string, L> = {
    yellow: ["Yellow", "Amarillo", "Gelb"], pink: ["Pink", "Rosa", "Rosa"], red: ["Red", "Rojo", "Rot"], green: ["Green", "Verde", "Grün"],
    white: ["White", "Blanco", "Weiß"], blue: ["Blue", "Azul", "Blau"], orange: ["Orange", "Naranja", "Orange"], black: ["Black", "Negro", "Schwarz"],
  };
  for (const [en, es, de, col, d] of [
    ["the Tour de France", "el Tour de Francia", "bei der Tour de France", "yellow", "easy"],
    ["the Giro d'Italia", "el Giro de Italia", "beim Giro d'Italia", "pink", "medium"],
    ["the Vuelta a España", "la Vuelta a España", "bei der Vuelta a España", "red", "hard"],
  ] as const) {
    choice("sport.cycling-jersey", en, d, [`What colour is the overall leader's jersey in ${en}?`, `¿De qué color es el maillot del líder de la general en ${es}?`, `Welche Farbe hat das Trikot des Gesamtführenden ${de}?`],
      COL[col], Object.values(COL), 5);
  }
  const MEANING: L[] = [
    ["The overall leader", "El líder de la general", "Der Gesamtführende"],
    ["The leader of the points classification (best sprinter)", "El líder de la clasificación por puntos (mejor esprínter)", "Der Führende der Punktewertung (bester Sprinter)"],
    ["The best climber (King of the Mountains)", "El mejor escalador (rey de la montaña)", "Der beste Bergfahrer (Bergkönig)"],
    ["The best young rider", "El mejor joven", "Der beste Nachwuchsfahrer"],
  ];
  ([["yellow", "amarillo", "Gelbe", 0], ["green", "verde", "Grüne", 1], ["polka-dot", "de lunares", "Gepunktete", 2], ["white", "blanco", "Weiße", 3]] as const).forEach(([en, es, de, i]) => {
    add("sport.cycling-jersey", `tdf-${en}`, C, i === 0 ? "easy" : "medium",
      [`In the Tour de France, who wears the ${en} jersey?`, `En el Tour de Francia, ¿quién lleva el maillot ${es}?`, `Wer trägt bei der Tour de France das ${de} Trikot?`],
      MEANING[i], MEANING.filter((_, j) => j !== i));
  });

  // ── tennis Grand Slams ──
  const SLAMS = [
    { en: "the Australian Open", es: "el Open de Australia", de: "die Australian Open", pl: true, label: ["Australian Open", "Open de Australia", "Australian Open"] as L, city: ["Melbourne", "Melbourne", "Melbourne"] as L, surf: 2, month: 0 },
    { en: "the French Open (Roland Garros)", es: "Roland Garros", de: "die French Open (Roland Garros)", pl: true, label: ["French Open (Roland Garros)", "Roland Garros", "French Open (Roland Garros)"] as L, city: CITY.paris, surf: 1, month: 1 },
    { en: "Wimbledon", es: "Wimbledon", de: "das Turnier von Wimbledon", pl: false, label: ["Wimbledon", "Wimbledon", "Wimbledon"] as L, city: CITY.london, surf: 0, month: 2 },
    { en: "the US Open", es: "el US Open", de: "die US Open", pl: true, label: ["US Open", "US Open", "US Open"] as L, city: CITY.newyork, surf: 2, month: 3 },
  ];
  const tennisCities: L[] = [...SLAMS.map((s) => s.city), ["Sydney", "Sídney", "Sydney"], CITY.madrid, CITY.rome, ["Miami", "Miami", "Miami"], CITY.berlin,
    ["Toronto", "Toronto", "Toronto"], CITY.losangeles, CITY.manchester, CITY.lyon, ["Brisbane", "Brisbane", "Brisbane"], CITY.chicago, CITY.barcelona, CITY.vienna];
  for (const s of SLAMS) {
    choice("sport.slam-city", s.en, s.month === 2 ? "easy" : "medium",
      [`In which city is ${s.en} played?`, `¿En qué ciudad se disputa ${s.es}?`, `In welcher Stadt ${s.pl ? "werden" : "wird"} ${s.de} ausgetragen?`], s.city, tennisCities, 6);
    add("sport.slam-city", `rev-${s.city[0]}`, C, "medium",
      [`Which Grand Slam tournament is played in ${s.city[0]}?`, `¿Qué torneo de Grand Slam se disputa en ${s.city[1]}?`, `Welches Grand-Slam-Turnier wird in ${s.city[2]} ausgetragen?`],
      s.label, SLAMS.filter((o) => o !== s).map((o) => o.label));
  }
  const SURF: L[] = [["Grass", "Césped", "Rasen"], ["Clay", "Tierra batida", "Sand"], ["Hard court", "Pista dura", "Hartplatz"], ["Carpet", "Moqueta", "Teppich"]];
  const MONTH: L[] = [["January", "Enero", "Januar"], ["May–June", "Mayo-junio", "Mai–Juni"], ["June–July", "Junio-julio", "Juni–Juli"], ["August–September", "Agosto-septiembre", "August–September"]];
  for (const s of SLAMS) {
    add("sport.slam-court", `surf-${s.en}`, C, s.surf === 2 ? "medium" : "easy",
      [`On which surface is ${s.en} played?`, `¿Sobre qué superficie se disputa ${s.es}?`, `Auf welchem Belag ${s.pl ? "werden" : "wird"} ${s.de} gespielt?`],
      SURF[s.surf], SURF.filter((_, i) => i !== s.surf));
    add("sport.slam-court", `month-${s.en}`, C, "hard",
      [`When is ${s.en} held each year?`, `¿Cuándo se disputa cada año ${s.es}?`, `Wann ${s.pl ? "finden" : "findet"} ${s.de} jedes Jahr statt?`],
      MONTH[s.month], MONTH.filter((_, i) => i !== s.month));
  }
  for (const [i, en, es, de] of [[0, "on grass", "sobre césped", "auf Rasen"], [1, "on clay", "sobre tierra batida", "auf Sand"]] as const) {
    const s = SLAMS.find((x) => x.surf === i)!;
    add("sport.slam-court", `rev-${en}`, C, "easy",
      [`Which Grand Slam tournament is played ${en}?`, `¿Qué torneo de Grand Slam se juega ${es}?`, `Welches Grand-Slam-Turnier wird ${de} gespielt?`], s.label, SLAMS.filter((o) => o !== s).map((o) => o.label));
  }

  // ── scoring ──
  numeric("sport.points", [
    [["In American football, how many points is a touchdown worth?", "En el fútbol americano, ¿cuántos puntos vale un touchdown?", "Wie viele Punkte bringt im American Football ein Touchdown?"], 6, [2, 3, 4, 5, 8], "medium"],
    [["In American football, how many points is a field goal worth?", "En el fútbol americano, ¿cuántos puntos vale un field goal?", "Wie viele Punkte bringt im American Football ein Field Goal?"], 3, [1, 2, 4, 5, 6], "medium"],
    [["In American football, how many points is a safety worth?", "En el fútbol americano, ¿cuántos puntos vale un safety?", "Wie viele Punkte bringt im American Football ein Safety?"], 2, [1, 3, 4, 5], "hard"],
    [["In rugby union, how many points is a try worth today?", "En el rugby a 15, ¿cuántos puntos vale hoy un ensayo?", "Wie viele Punkte bringt heute im Rugby Union ein Versuch (Try)?"], 5, [3, 4, 6, 7], "medium"],
    [["In rugby union, how many points is a successful conversion worth?", "En el rugby a 15, ¿cuántos puntos vale una conversión (transformación)?", "Wie viele Punkte bringt im Rugby Union eine erfolgreiche Erhöhung (Conversion)?"], 2, [1, 3, 4, 5], "hard"],
    [["In rugby union, how many points is a successful penalty kick at goal worth?", "En el rugby a 15, ¿cuántos puntos vale un golpe de castigo convertido a palos?", "Wie viele Punkte bringt im Rugby Union ein verwandelter Straftritt?"], 3, [1, 2, 4, 5], "hard"],
    [["In rugby league, how many points is a try worth?", "En el rugby a 13, ¿cuántos puntos vale un ensayo?", "Wie viele Punkte bringt im Rugby League ein Versuch (Try)?"], 4, [2, 3, 5, 6], "hard"],
    [["In basketball, how many points is a successful free throw worth?", "En baloncesto, ¿cuántos puntos vale un tiro libre anotado?", "Wie viele Punkte bringt im Basketball ein verwandelter Freiwurf?"], 1, [2, 3, 4], "easy"],
    [["In basketball, how many points is a basket from inside the three-point line worth?", "En baloncesto, ¿cuántos puntos vale una canasta desde dentro de la línea de triple?", "Wie viele Punkte bringt im Basketball ein Korb von innerhalb der Dreipunktelinie?"], 2, [1, 3, 4], "easy"],
    [["In darts, what is the highest score possible with three darts?", "En los dardos, ¿cuál es la puntuación máxima posible con tres dardos?", "Was ist beim Darts die höchstmögliche Punktzahl mit drei Pfeilen?"], 180, [150, 171, 200, 240], "medium"],
    [["In darts, how many points is the bullseye (the inner bull) worth?", "En los dardos, ¿cuántos puntos vale el centro de la diana (bullseye)?", "Wie viele Punkte bringt beim Darts das Bullseye (der innere Kreis in der Mitte)?"], 50, [25, 60, 75, 100], "medium"],
    [["In snooker, what is the standard maximum break?", "En el snooker, ¿cuál es la tacada máxima habitual?", "Wie hoch ist beim Snooker das reguläre Maximum Break?"], 147, [100, 121, 150, 180, 200], "medium"],
    [["In ten-pin bowling, what is the score of a perfect game?", "En los bolos (bowling), ¿cuál es la puntuación de una partida perfecta?", "Welche Punktzahl hat beim Bowling ein perfektes Spiel?"], 300, [200, 250, 360, 400, 500], "medium"],
    [["In Olympic archery, how many points is the innermost ring of the target worth?", "En el tiro con arco olímpico, ¿cuántos puntos vale el anillo central de la diana?", "Wie viele Punkte bringt beim olympischen Bogenschießen der innerste Ring der Zielscheibe?"], 10, [5, 9, 12, 20, 100], "medium"],
    [["In football leagues today, how many points does a team usually get for a win?", "En las ligas de fútbol actuales, ¿cuántos puntos suele recibir un equipo por una victoria?", "Wie viele Punkte bekommt eine Mannschaft heute in Fußballligen normalerweise für einen Sieg?"], 3, [1, 2, 4, 5], "easy"],
    [["In table tennis today, how many points do you need to win a game (with a two-point lead)?", "En el tenis de mesa actual, ¿cuántos puntos se necesitan para ganar un juego (con dos de ventaja)?", "Wie viele Punkte braucht man heute im Tischtennis, um einen Satz zu gewinnen (mit zwei Punkten Vorsprung)?"], 11, [9, 10, 15, 25], "medium"],
    [["In badminton today, how many points do you need to win a game (with a two-point lead)?", "En el bádminton actual, ¿cuántos puntos se necesitan para ganar un juego (con dos de ventaja)?", "Wie viele Punkte braucht man heute im Badminton, um einen Satz zu gewinnen (mit zwei Punkten Vorsprung)?"], 21, [11, 18, 25, 30], "hard"],
    [["In indoor volleyball, how many points win a regular set (not the deciding fifth set), with a two-point lead?", "En el voleibol de pista, ¿cuántos puntos ganan un set normal (no el quinto decisivo), con dos de ventaja?", "Wie viele Punkte braucht man im Hallenvolleyball für einen normalen Satz (nicht den fünften Entscheidungssatz), mit zwei Punkten Vorsprung?"], 25, [18, 20, 30, 35], "hard"],
    [["In beach volleyball, how many points win one of the first two sets (with a two-point lead)?", "En el vóley playa, ¿cuántos puntos ganan uno de los dos primeros sets (con dos de ventaja)?", "Wie viele Punkte braucht man im Beachvolleyball für einen der ersten beiden Sätze (mit zwei Punkten Vorsprung)?"], 21, [11, 18, 25, 30], "hard"],
    [["In a game of tennis, which score comes after 15 and 30?", "En un juego de tenis, ¿qué puntuación viene después de 15 y 30?", "Welcher Spielstand folgt im Tennis auf 15 und 30?"], 40, [35, 45, 50], "easy"],
  ], (n) => same(String(n)));

  const BALLS: [string, string, string, number][] = [["red", "roja", "rote", 1], ["yellow", "amarilla", "gelbe", 2], ["green", "verde", "grüne", 3], ["brown", "marrón", "braune", 4],
    ["blue", "azul", "blaue", 5], ["pink", "rosa", "rosa", 6], ["black", "negra", "schwarze", 7]];
  numeric("sport.snooker-ball", BALLS.map(([en, es, de, n]) => [[`In snooker, how many points is the ${en} ball worth?`, `En el snooker, ¿cuántos puntos vale la bola ${es}?`, `Wie viele Punkte bringt beim Snooker die ${de} Kugel?`], n, [1, 2, 3, 4, 5, 6, 7], n === 1 || n === 7 ? "medium" : "hard"] as [L, number, number[], D]), (n) => same(String(n)), 4);
  const ballL = (b: (typeof BALLS)[number]): L => [`${api.cap(b[0])} ball`, `Bola ${b[1]}`, `${api.cap(b[2])} Kugel`];
  lookup({ family: "sport.snooker-ball-rev", category: C, rows: BALLS, variants: 4, stem: (x) => x[0], diff: (x) => (x[3] === 1 || x[3] === 7 ? "medium" : "hard"),
    text: (x) => { const p = x[3] === 1; return [`In snooker, which ball is worth ${x[3]} point${p ? "" : "s"}?`, `En el snooker, ¿qué bola vale ${x[3]} punto${p ? "" : "s"}?`, `Welche Kugel bringt beim Snooker ${x[3]} Punkt${p ? "" : "e"}?`]; },
    right: (x) => x, pool: BALLS, label: ballL });

  // ── match lengths & counts ──
  const minL = (n: number): L => [`${n} minutes`, `${n} minutos`, `${n} Minuten`];
  const reg = (en: string, es: string, de: string): L => [`${en}: how long is a match in regular playing time (without overtime)?`,
    `${es}: ¿cuánto dura un partido en tiempo reglamentario (sin prórroga)?`, `${de}: Wie lange dauert ein Spiel in der regulären Spielzeit (ohne Verlängerung)?`];
  numeric("sport.match-length", [
    [reg("Football (soccer)", "Fútbol", "Fußball"), 90, [60, 80, 100, 120], "easy"],
    [reg("Rugby union", "Rugby a 15", "Rugby Union"), 80, [60, 70, 90, 100], "hard"],
    [reg("Handball", "Balonmano", "Handball"), 60, [40, 50, 70, 80, 90], "medium"],
    [reg("Ice hockey", "Hockey sobre hielo", "Eishockey"), 60, [45, 48, 80, 90], "medium"],
    [reg("Basketball (NBA)", "Baloncesto (NBA)", "Basketball (NBA)"), 48, [32, 40, 50, 60], "hard"],
    [reg("Basketball (FIBA, international)", "Baloncesto (FIBA, internacional)", "Basketball (FIBA, international)"), 40, [30, 48, 50, 60], "hard"],
    [reg("Field hockey", "Hockey sobre hierba", "Feldhockey"), 60, [40, 70, 80, 90], "hard"],
    [reg("American football (NFL)", "Fútbol americano (NFL)", "American Football (NFL)"), 60, [40, 48, 80, 90], "hard"],
    [reg("Futsal", "Fútbol sala", "Futsal"), 40, [30, 50, 60, 90], "hard"],
    [reg("Water polo", "Waterpolo", "Wasserball"), 32, [24, 40, 48, 60], "hard"],
    [["How long is one round in professional boxing?", "¿Cuánto dura un asalto en el boxeo profesional?", "Wie lange dauert eine Runde im Profiboxen?"], 3, [1, 2, 4, 5], "medium"],
    [["In football, how long may the half-time break last at most?", "En el fútbol, ¿cuánto puede durar como máximo el descanso?", "Wie lange darf die Halbzeitpause im Fußball höchstens dauern?"], 15, [5, 10, 20, 30], "medium"],
    [["How long is one period of ice hockey (playing time)?", "¿Cuánto dura un periodo de hockey sobre hielo (tiempo de juego)?", "Wie lange dauert ein Drittel im Eishockey (Spielzeit)?"], 20, [12, 15, 25, 30], "medium"],
    [["How long is one quarter in the NBA?", "¿Cuánto dura un cuarto en la NBA?", "Wie lange dauert ein Viertel in der NBA?"], 12, [8, 10, 15, 20], "hard"],
    [["How long is one quarter in international (FIBA) basketball?", "¿Cuánto dura un cuarto en el baloncesto FIBA (internacional)?", "Wie lange dauert ein Viertel im internationalen Basketball (FIBA)?"], 10, [8, 12, 15, 20], "hard"],
  ], minL);
  numeric("sport.match-count", [
    [["How many periods does a regular ice hockey game have?", "¿Cuántos periodos tiene un partido normal de hockey sobre hielo?", "Aus wie vielen Spielabschnitten besteht ein reguläres Eishockeyspiel?"], 3, [2, 4, 5], "easy"],
    [["Into how many periods is a basketball game divided (without overtime)?", "¿En cuántos periodos se divide un partido de baloncesto (sin prórroga)?", "In wie viele Spielabschnitte ist ein Basketballspiel (ohne Verlängerung) unterteilt?"], 4, [2, 3, 5, 6], "easy"],
    [["How many innings does a regular baseball game have?", "¿Cuántas entradas (innings) tiene un partido normal de béisbol?", "Wie viele Innings hat ein reguläres Baseballspiel?"], 9, [6, 7, 8, 10, 12], "medium"],
    [["How many holes does a standard round of golf have?", "¿Cuántos hoyos tiene un recorrido estándar de golf?", "Wie viele Löcher hat eine Standardrunde Golf?"], 18, [12, 16, 20, 24], "easy"],
    [["How many rounds does a professional world-title boxing fight have at most today?", "¿Cuántos asaltos tiene como máximo hoy un combate profesional de boxeo por un título mundial?", "Wie viele Runden hat ein Profibox-WM-Kampf heute höchstens?"], 12, [8, 10, 14, 20], "medium"],
    [["How many ends does an Olympic curling game (men's or women's) have?", "¿Cuántos ends tiene un partido olímpico de curling (masculino o femenino)?", "Wie viele Ends hat ein olympisches Curlingspiel (Männer oder Frauen)?"], 10, [6, 9, 12, 15], "hard"],
    [["In a One Day International (ODI) cricket match, how many overs does each team get at most?", "En un partido de críquet One Day International (ODI), ¿cuántos overs tiene como máximo cada equipo?", "Wie viele Overs hat jede Mannschaft in einem One Day International (ODI) im Cricket höchstens?"], 50, [30, 40, 60, 100], "hard"],
    [["In cricket, how many legal balls make up an over?", "En el críquet, ¿cuántos lanzamientos válidos forman un over?", "Aus wie vielen regulären Würfen besteht im Cricket ein Over?"], 6, [4, 5, 10, 12], "hard"],
    [["How many sets must a man win to win a Grand Slam singles match?", "¿Cuántos sets debe ganar un hombre para ganar un partido individual de Grand Slam?", "Wie viele Sätze muss ein Mann gewinnen, um ein Grand-Slam-Einzel zu gewinnen?"], 3, [2, 4, 5], "medium"],
    [["In bowling, how many pins stand at the start of a frame?", "En los bolos (bowling), ¿cuántos bolos hay en pie al inicio de cada turno?", "Wie viele Pins stehen beim Bowling zu Beginn eines Durchgangs?"], 10, [8, 9, 12, 15], "easy"],
    [["How many frames does a game of bowling have?", "¿Cuántos turnos (frames) tiene una partida de bolos (bowling)?", "Wie viele Frames hat ein Bowlingspiel?"], 10, [8, 9, 12, 15], "hard"],
    [["In American football, how many downs does the offense get to gain 10 yards?", "En el fútbol americano, ¿cuántos downs (intentos) tiene el ataque para avanzar 10 yardas?", "Wie viele Versuche (Downs) hat die Offense im American Football, um 10 Yards zu erzielen?"], 4, [2, 3, 5, 6], "hard"],
    [["How many red balls are on the table at the start of a snooker frame?", "¿Cuántas bolas rojas hay en la mesa al inicio de un frame de snooker?", "Wie viele rote Kugeln liegen zu Beginn eines Snooker-Frames auf dem Tisch?"], 15, [10, 12, 16, 21], "hard"],
    [["In baseball, how many strikes make a strikeout?", "En el béisbol, ¿cuántos strikes suponen un ponche (strikeout)?", "Wie viele Strikes führen im Baseball zum Strikeout?"], 3, [2, 4, 5], "medium"],
    [["In baseball, how many balls give the batter a walk (base on balls)?", "En el béisbol, ¿cuántas bolas dan al bateador una base por bolas?", "Nach wie vielen Balls darf der Schlagmann im Baseball zur ersten Base gehen (Walk)?"], 4, [3, 5, 6], "hard"],
    [["In baseball, how many outs end a team's half-inning?", "En el béisbol, ¿cuántos outs ponen fin a la mitad de una entrada?", "Nach wie vielen Outs endet im Baseball ein halbes Inning?"], 3, [2, 4, 5], "medium"],
    [["How many numbered segments does a standard dartboard have?", "¿Cuántos sectores numerados tiene una diana de dardos estándar?", "Wie viele nummerierte Segmente hat eine Standard-Dartscheibe?"], 20, [12, 16, 24, 25], "medium"],
  ], (n) => same(String(n)));

  // ── chess ──
  const PIECE: Record<string, L> = { king: ["King", "Rey", "König"], queen: ["Queen", "Dama (reina)", "Dame"], rook: ["Rook", "Torre", "Turm"],
    bishop: ["Bishop", "Alfil", "Läufer"], knight: ["Knight", "Caballo", "Springer"], pawn: ["Pawn", "Peón", "Bauer"] };
  const PIECE_QS: [L, string, D, string[]?][] = [
    [["Which chess piece moves in an L-shape?", "¿Qué pieza de ajedrez se mueve en forma de L?", "Welche Schachfigur zieht in L-Form?"], "knight", "easy"],
    [["Which chess piece moves only diagonally?", "¿Qué pieza de ajedrez se mueve solo en diagonal?", "Welche Schachfigur zieht nur diagonal?"], "bishop", "easy"],
    [["Which chess piece always stays on squares of the same colour?", "¿Qué pieza de ajedrez permanece siempre en casillas del mismo color?", "Welche Schachfigur bleibt immer auf Feldern derselben Farbe?"], "bishop", "medium"],
    [["Which chess piece can be promoted when it reaches the far side of the board?", "¿Qué pieza de ajedrez puede coronar al llegar al otro extremo del tablero?", "Welche Schachfigur kann sich umwandeln, wenn sie die gegnerische Grundreihe erreicht?"], "pawn", "easy"],
    [["Which piece does the king castle with?", "¿Con qué pieza enroca el rey?", "Mit welcher Figur rochiert der König?"], "rook", "medium", ["king"]],
    [["Which chess piece can move any number of squares straight or diagonally?", "¿Qué pieza de ajedrez puede moverse cualquier número de casillas en línea recta o en diagonal?", "Welche Schachfigur darf beliebig weit gerade und diagonal ziehen?"], "queen", "easy"],
    [["Which chess piece has to be checkmated to win the game?", "¿A qué pieza hay que dar jaque mate para ganar la partida?", "Welche Figur muss schachmatt gesetzt werden, um die Partie zu gewinnen?"], "king", "easy"],
    [["Which chess piece can capture “en passant”?", "¿Qué pieza de ajedrez puede capturar «al paso»?", "Welche Schachfigur kann „en passant“ schlagen?"], "pawn", "hard"],
    [["Which chess piece can move any number of squares, but only along rows and columns?", "¿Qué pieza de ajedrez puede moverse cualquier número de casillas, pero solo por filas y columnas?", "Welche Schachfigur darf beliebig weit ziehen, aber nur entlang von Reihen und Linien?"], "rook", "medium"],
    [["Apart from castling, which chess piece can move only one square at a time, but in any direction?", "Salvo en el enroque, ¿qué pieza de ajedrez solo puede moverse una casilla cada vez, pero en cualquier dirección?", "Welche Schachfigur darf – außer bei der Rochade – nur ein Feld weit ziehen, aber in jede Richtung?"], "king", "medium"],
    [["Which chess piece can never move backwards?", "¿Qué pieza de ajedrez nunca puede retroceder?", "Welche Schachfigur kann niemals rückwärts ziehen?"], "pawn", "medium"],
  ];
  lookup({ family: "sport.chess-piece", category: C, rows: PIECE_QS, stem: (x) => x[0][0], diff: (x) => x[2], text: (x) => x[0],
    right: (x) => x[1], pool: Object.keys(PIECE), label: (k) => PIECE[k], ok: (x, k) => !(x[3] ?? []).includes(k) });
  numeric("sport.chess-numbers", [
    [["How many squares does a chessboard have?", "¿Cuántas casillas tiene un tablero de ajedrez?", "Wie viele Felder hat ein Schachbrett?"], 64, [36, 48, 81, 100], "easy"],
    [["How many pieces does each chess player have at the start of a game?", "¿Cuántas piezas tiene cada jugador de ajedrez al comienzo de la partida?", "Wie viele Figuren hat jeder Schachspieler zu Beginn einer Partie?"], 16, [12, 14, 18, 20], "easy"],
    [["How many pawns does each chess player start with?", "¿Con cuántos peones empieza cada jugador de ajedrez?", "Mit wie vielen Bauern beginnt jeder Schachspieler?"], 8, [6, 7, 10, 12], "easy"],
    [["How many knights does each chess player start with?", "¿Con cuántos caballos empieza cada jugador de ajedrez?", "Mit wie vielen Springern beginnt jeder Schachspieler?"], 2, [1, 3, 4], "easy"],
    [["How many pieces are on the chessboard in total at the start of a game?", "¿Cuántas piezas hay en total sobre el tablero al comienzo de una partida de ajedrez?", "Wie viele Figuren stehen zu Beginn einer Schachpartie insgesamt auf dem Brett?"], 32, [24, 28, 36, 40], "medium"],
    [["How many squares long is each side of a chessboard?", "¿Cuántas casillas tiene cada lado de un tablero de ajedrez?", "Wie viele Felder hat jede Seite eines Schachbretts?"], 8, [6, 7, 9, 10, 12], "easy"],
  ], (n) => same(String(n)));

  // ── distances & measurements ──
  const KM: L = ["km", "km", "km"], M: L = ["m", "m", "m"];
  const distRows: [L, number, number[], D, L, number][] = [
    [["How long is a marathon?", "¿Cuánto mide un maratón?", "Wie lang ist ein Marathon?"], 42.195, [35, 40, 45, 50], "easy", KM, 3],
    [["How long is a half marathon (rounded)?", "¿Cuánto mide una media maratón (redondeado)?", "Wie lang ist ein Halbmarathon (gerundet)?"], 21.1, [15, 20, 25, 30], "medium", KM, 1],
    [["How long is one lap of a standard outdoor athletics track (inside lane)?", "¿Cuánto mide una vuelta a una pista de atletismo estándar al aire libre (calle interior)?", "Wie lang ist eine Runde auf einer Standard-Leichtathletikbahn im Freien (Innenbahn)?"], 400, [200, 300, 500, 800], "easy", M, 0],
    [["How far do athletes swim in an Olympic-distance triathlon?", "¿Cuánto se nada en un triatlón de distancia olímpica?", "Wie weit schwimmt man bei einem Triathlon über die olympische Distanz?"], 1.5, [1, 2, 3.8, 5], "hard", KM, 1],
    [["How far do athletes cycle in an Olympic-distance triathlon?", "¿Cuánto se pedalea en un triatlón de distancia olímpica?", "Wie weit fährt man bei einem Triathlon über die olympische Distanz Rad?"], 40, [20, 60, 90, 180], "hard", KM, 0],
    [["How far do athletes run in an Olympic-distance triathlon?", "¿Cuánto se corre en un triatlón de distancia olímpica?", "Wie weit läuft man bei einem Triathlon über die olympische Distanz?"], 10, [5, 15, 21.1, 42.2], "hard", KM, 0],
    [["How far do athletes cycle in a full Ironman triathlon (rounded)?", "¿Cuánto se pedalea en un triatlón Ironman completo (redondeado)?", "Wie weit fährt man bei einem kompletten Ironman-Triathlon Rad (gerundet)?"], 180, [90, 120, 250, 300], "hard", KM, 0],
    [["How far do athletes swim in a full Ironman triathlon (rounded)?", "¿Cuánto se nada en un triatlón Ironman completo (redondeado)?", "Wie weit schwimmt man bei einem kompletten Ironman-Triathlon (gerundet)?"], 3.8, [1.5, 2, 5, 10], "hard", KM, 1],
    [["How long is the men's sprint hurdles race in athletics?", "¿Cuántos metros mide la carrera de vallas corta masculina en atletismo?", "Wie lang ist der Hürdensprint der Männer in der Leichtathletik?"], 110, [80, 120, 150, 200], "medium", M, 0],
    [["How long is the women's sprint hurdles race in athletics?", "¿Cuántos metros mide la carrera de vallas corta femenina en atletismo?", "Wie lang ist der Hürdensprint der Frauen in der Leichtathletik?"], 100, [110, 120, 150, 200], "medium", M, 0],
    [["How long is the Olympic steeplechase race?", "¿Cuántos metros mide la carrera de obstáculos olímpica?", "Wie lang ist das olympische Hindernisrennen (Steeplechase)?"], 3000, [800, 1500, 5000, 10000], "medium", M, 0],
    [["How long is an Olympic swimming pool?", "¿Cuánto mide de largo una piscina olímpica?", "Wie lang ist ein olympisches Schwimmbecken?"], 50, [40, 60, 75, 100], "easy", M, 0],
    [["In football, how far is the penalty spot from the goal line?", "En el fútbol, ¿a qué distancia de la línea de gol está el punto de penalti?", "Wie weit ist im Fußball der Elfmeterpunkt von der Torlinie entfernt?"], 11, [7, 9, 16, 20], "easy", M, 0],
    [["In handball, from what distance is a penalty throw taken?", "En el balonmano, ¿desde qué distancia se lanza un penalti?", "Aus welcher Entfernung wird im Handball ein Strafwurf ausgeführt?"], 7, [5, 9, 11, 12], "easy", M, 0],
    [["How high is a basketball hoop above the floor?", "¿A qué altura del suelo está el aro de baloncesto?", "Wie hoch hängt ein Basketballkorb über dem Boden?"], 3.05, [2.75, 2.9, 3.35, 3.5], "medium", M, 2],
    [["How wide is a full-size football goal?", "¿Cuánto mide de ancho una portería de fútbol reglamentaria?", "Wie breit ist ein reguläres Fußballtor?"], 7.32, [5.5, 6.4, 8.5, 10], "hard", M, 2],
    [["How high is a full-size football goal?", "¿Cuánto mide de alto una portería de fútbol reglamentaria?", "Wie hoch ist ein reguläres Fußballtor?"], 2.44, [2, 2.2, 2.75, 3.05], "hard", M, 2],
    [["What is the shortest sprint distance in outdoor athletics at the Olympics?", "¿Cuál es la distancia de velocidad más corta del atletismo olímpico al aire libre?", "Was ist die kürzeste Sprintstrecke der olympischen Leichtathletik im Freien?"], 100, [50, 60, 80, 150], "easy", M, 0],
    [["What is the longest individual pool swimming race at today's Olympics?", "¿Cuál es la prueba individual más larga de natación en piscina en los Juegos Olímpicos actuales?", "Was ist heute das längste olympische Einzelrennen im Schwimmbecken?"], 1500, [800, 1000, 2000, 3000], "medium", M, 0],
  ];
  const rd = rngFor("sport.distance");
  for (const [text, n, cands, d, unit, dec] of distRows) {
    const lab = (x: number) => numL(x, dec === 2 ? 2 : Number.isInteger(x) ? 0 : String(x).split(".")[1].length, unit);
    for (let v = 0; v < 3; v++) {
      const ws = sample(rd, cands, 3, (x) => x !== n);
      if (ws) add("sport.distance", text[0], C, d, text, numL(n, dec, unit), ws.map(lab));
    }
  }

  // ── multi-discipline sports ──
  numeric("sport.multisport", [
    [["How many events make up the decathlon?", "¿Cuántas pruebas forman el decatlón?", "Aus wie vielen Disziplinen besteht der Zehnkampf?"], 10, [5, 7, 8, 12], "easy"],
    [["How many events make up the heptathlon?", "¿Cuántas pruebas forman el heptatlón?", "Aus wie vielen Disziplinen besteht der Siebenkampf?"], 7, [5, 6, 8, 10], "easy"],
    [["How many disciplines make up the modern pentathlon?", "¿Cuántas disciplinas forman el pentatlón moderno?", "Aus wie vielen Disziplinen besteht der Moderne Fünfkampf?"], 5, [3, 4, 6, 7], "easy"],
  ], (n) => same(String(n)), 2);
  const CC: L = ["Cross-country skiing and shooting", "Esquí de fondo y tiro", "Skilanglauf und Schießen"];
  const NC: L = ["Cross-country skiing and ski jumping", "Esquí de fondo y salto de esquí", "Skilanglauf und Skispringen"];
  choice("sport.multisport", "biathlon", "easy", ["Which two disciplines are combined in biathlon?", "¿Qué dos disciplinas combina el biatlón?", "Welche zwei Disziplinen vereint der Biathlon?"], CC,
    [NC, ["Ski jumping and shooting", "Salto de esquí y tiro", "Skispringen und Schießen"], ["Alpine skiing and shooting", "Esquí alpino y tiro", "Ski alpin und Schießen"], ["Speed skating and shooting", "Patinaje de velocidad y tiro", "Eisschnelllauf und Schießen"]], 4);
  choice("sport.multisport", "nordic", "medium", ["Which two disciplines are combined in Nordic combined?", "¿Qué dos disciplinas combina la combinada nórdica?", "Welche zwei Disziplinen vereint die Nordische Kombination?"], NC,
    [CC, ["Alpine skiing and ski jumping", "Esquí alpino y salto de esquí", "Ski alpin und Skispringen"], ["Ski jumping and speed skating", "Salto de esquí y patinaje de velocidad", "Skispringen und Eisschnelllauf"], ["Alpine skiing and cross-country skiing", "Esquí alpino y esquí de fondo", "Ski alpin und Skilanglauf"]], 4);
  const TRI: L[] = [["Swim", "Natación", "Schwimmen"], ["Bike", "Ciclismo", "Radfahren"], ["Run", "Carrera", "Laufen"]];
  const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].map((p) => [0, 1, 2].map((k) => p.map((i) => TRI[i][k]).join(" – ")) as L);
  choice("sport.multisport", "triathlon", "easy", ["In which order are the three parts of a triathlon completed?", "¿En qué orden se disputan las tres partes de un triatlón?", "In welcher Reihenfolge werden die drei Teile eines Triathlons absolviert?"],
    perms[0], perms.slice(1), 6);
  choice("sport.multisport", "duathlon", "medium", ["Which two sports make up a duathlon?", "¿Qué dos disciplinas forman un duatlón?", "Aus welchen zwei Disziplinen besteht ein Duathlon?"],
    ["Running and cycling", "Carrera y ciclismo", "Laufen und Radfahren"],
    [["Swimming and cycling", "Natación y ciclismo", "Schwimmen und Radfahren"], ["Running and shooting", "Carrera y tiro", "Laufen und Schießen"], ["Cycling and rowing", "Ciclismo y remo", "Radfahren und Rudern"], ["Swimming and shooting", "Natación y tiro", "Schwimmen und Schießen"]], 4);

  // ── origins ──
  const martialPool = MARTIAL_POOL.map((id) => byId.get(id)!).filter(Boolean);
  const EASY_MARTIAL = new Set(["Karate", "Judo", "Kung fu", "Sumo", "Taekwondo", "Muay Thai"]);
  lookup({ family: "sport.martial-origin", category: C, rows: MARTIAL_ARTS, stem: (x) => x[0], diff: (x) => (EASY_MARTIAL.has(x[0]) ? "easy" : x[0] === "Capoeira" || x[0] === "Tai chi" ? "medium" : "hard"),
    text: (x) => [`Which country does the martial art ${x[0]} originally come from?`, `¿De qué país procede este arte marcial: ${low(x[1])}?`, `Aus welchem Land stammt die Kampfkunst ${x[2]}?`],
    right: (x) => byId.get(x[3])!, pool: martialPool, label: nameOf, ok: (x, c) => c.id !== x[3] && !(x[4] ?? []).includes(c.id) });
  which({ family: "sport.martial-rev", category: C, rows: MARTIAL_ARTS, per: 6, diff: "medium", key: (x) => x[3], label: (x) => [x[0], x[1], x[2]],
    text: (k) => { const c = byId.get(k)!; return [`Which of these martial arts comes from ${c.enSubj}?`, `¿Cuál de estas artes marciales procede ${c.esDe}?`, `Welche dieser Kampfkünste stammt ${deAus(c)}?`]; },
    ok: (_, cand, k) => !(cand[4] ?? []).includes(k) });
  const EASY_ORIGIN = new Set(["Modern football (soccer)", "Basketball", "Rugby", "Cricket", "Golf"]);
  lookup({ family: "sport.origin", category: C, rows: SPORT_ORIGINS, stem: (x) => x[0], diff: (x) => (EASY_ORIGIN.has(x[0]) ? "medium" : "hard"),
    text: (x) => [`${x[0]}: which country is considered the birthplace of this sport?`, `${x[1]}: ¿qué país se considera la cuna de este deporte?`, `${x[2]}: Welches Land gilt als Ursprungsland dieser Sportart?`],
    right: (x) => x[3], pool: Object.keys(ORIGIN), label: (k) => ORIGIN[k], ok: (x, k) => !(x[4] ?? []).includes(k) });

  // ── trophies ──
  const trophySports = [...new Set([...TROPHIES.map((t) => t[3]), "football", "tennis", "cycling", "athletics", "f1", "swimming", "volleyball", "handball", "cricket"])];
  const EASY_TROPHY = new Set(["the Webb Ellis Cup", "the Jules Rimet Trophy", "the Vince Lombardi Trophy", "the Larry O'Brien Trophy", "the Claret Jug"]);
  lookup({ family: "sport.trophy", category: C, rows: TROPHIES, stem: (x) => x[0], diff: (x) => (EASY_TROPHY.has(x[0]) ? "medium" : "hard"),
    text: (x) => [`In which sport is ${x[0]} awarded?`, `¿En qué deporte se entrega ${x[1]}?`, `${x[2]}: In welcher Sportart wird diese Trophäe vergeben?`],
    right: (x) => x[3], pool: trophySports, label: (k) => SP[k] });
  which({ family: "sport.trophy-rev", category: C, rows: TROPHIES, per: 5, diff: "hard", key: (x) => x[3], label: (x) => capL([x[0], x[1], x[2]]),
    text: (k) => [`Which of these trophies is awarded in ${sportEn(k)}?`, `¿Cuál de estos trofeos se entrega en este deporte: ${low(SP[k][1])}?`, `Welche dieser Trophäen wird in der Sportart „${SP[k][2]}“ vergeben?`] });

  // ── racing circuits ──
  const circuitPool = [...new Set([...CIRCUITS.map((c) => c[1]), "sweden", "poland", "argentina", "china", "south_korea", "india"])].map((id) => byId.get(id)!).filter(Boolean);
  const EASY_CIRCUIT = new Set(["Silverstone", "Monza", "Hockenheimring", "Nürburgring", "Interlagos", "Spa-Francorchamps", "Suzuka", "Indianapolis Motor Speedway", "Le Mans (Circuit de la Sarthe)"]);
  lookup({ family: "sport.circuit-country", category: C, rows: CIRCUITS, stem: (x) => x[0], diff: (x) => (EASY_CIRCUIT.has(x[0]) ? "medium" : "hard"),
    text: (x) => [`${x[0]}: in which country is this racing circuit?`, `${x[0]}: ¿en qué país está este circuito?`, `${x[0]}: In welchem Land liegt diese Rennstrecke?`],
    right: (x) => byId.get(x[1])!, pool: circuitPool, label: nameOf, ok: (x, c) => c.id !== x[1] });
  which({ family: "sport.circuit-rev", category: C, rows: CIRCUITS, per: 5, diff: "hard", key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => { const c = byId.get(k)!; return [`Which of these racing circuits is in ${c.enSubj}?`, `¿Cuál de estos circuitos está en ${c.esSubj}?`, `Welche dieser Rennstrecken liegt ${c.deIn}?`]; } });

  // ── award winners (fixed history) ──
  const bdNames = [...new Set(BALLON_DOR.map((b) => b[1]))];
  const bdYears = (n: string) => BALLON_DOR.filter((b) => b[1] === n).map((b) => b[0]);
  lookup({ family: "sport.ballon-dor", category: C, rows: BALLON_DOR, stem: (x) => String(x[0]), diff: (x) => (x[0] >= 2008 ? "medium" : "hard"),
    text: (x) => [`Who won the men's Ballon d'Or in ${x[0]}?`, `¿Quién ganó el Balón de Oro masculino en ${x[0]}?`, `Wer gewann ${x[0]} den Ballon d'Or der Männer?`],
    right: (x) => x[1], pool: bdNames, label: same, ok: (x, n) => bdYears(n).some((y) => Math.abs(y - x[0]) <= 15) });
  groupYesNo("sport.ballon-dor-won", C, 100, [...bdNames, ...BALLON_DOR_EARLY].map(same), NO_BALLON_DOR.map(same), "medium",
    ["Which of these footballers has won the Ballon d'Or?", "¿Cuál de estos futbolistas ha ganado el Balón de Oro?", "Welcher dieser Fußballer hat den Ballon d'Or gewonnen?"]);
  lookup({ family: "sport.wc-top-scorer", category: C, rows: WC_TOP_SCORERS, stem: (x) => String(x[0]), diff: (x) => (x[0] >= 1998 ? "medium" : "hard"),
    text: (x) => [`Who was the top scorer at the ${x[0]} men's FIFA World Cup?`, `¿Quién fue el máximo goleador del Mundial masculino de fútbol de ${x[0]}?`, `Wer wurde Torschützenkönig der Fußball-WM ${x[0]} der Männer?`],
    right: (x) => x[1], pool: WC_TOP_SCORERS.map((w) => w[1]), label: same });
  groupYesNo("sport.tour-won", C, 90, TOUR_WINNERS.map(same), TOUR_NON_WINNERS.map(same), "hard",
    ["Which of these cyclists has won the Tour de France?", "¿Cuál de estos ciclistas ha ganado el Tour de Francia?", "Welcher dieser Radprofis hat die Tour de France gewonnen?"]);
  groupYesNo("sport.wimbledon-won", C, 100, WIMBLEDON_WINNERS.map(same), WIMBLEDON_NON_WINNERS.map(same), "hard",
    ["Which of these players has won the Wimbledon singles title?", "¿Cuál de estos tenistas ha ganado el torneo individual de Wimbledon?", "Wer von diesen hat das Einzel in Wimbledon gewonnen?"]);
  groupYesNo("sport.f1-champion", C, 90, F1_CHAMPIONS.map(same), F1_NON_CHAMPIONS.map(same), "medium",
    ["Which of these drivers has been Formula 1 World Champion?", "¿Cuál de estos pilotos ha sido campeón del mundo de Fórmula 1?", "Welcher dieser Fahrer ist Formel-1-Weltmeister geworden?"]);
  extremeOf({ family: "sport.olympic-golds", category: C, n: 140, rows: OLYMPIC_GOLDS, max: true, minGap: 2,
    text: ["Which of these athletes won the most Olympic gold medals in their career?", "¿Cuál de estos deportistas ganó más medallas de oro olímpicas en su carrera?", "Wer von diesen hat in seiner Karriere die meisten olympischen Goldmedaillen gewonnen?"] });

  // ── famous moments & nicknames ──
  const rm = rngFor("sport.moment");
  for (const [en, es, de, ans, pool] of MOMENTS) {
    for (let v = 0; v < 3; v++) {
      const ws = sample(rm, MOMENT_POOLS[pool], 3, (n) => n !== ans);
      if (ws) add("sport.moment", en, C, "medium", [en, es, de], same(ans), ws.map(same));
    }
  }
  const nickPool = [...new Set([...ATHLETE_NICKNAMES.map((n) => n[3]), ...NICKNAME_EXTRAS])];
  const EASY_NICK = new Set(["Lionel Messi", "Muhammad Ali", "Michael Jordan", "Franz Beckenbauer", "Rafael Nadal", "Pelé", "Mike Tyson"]);
  lookup({ family: "sport.nickname", category: C, rows: ATHLETE_NICKNAMES, stem: (x) => x[3], diff: (x) => (EASY_NICK.has(x[3]) ? "medium" : "hard"),
    text: (x) => [`Which sports star is known by the nickname ${x[0]}?`, `¿A qué estrella del deporte se le conoce por el apodo ${x[1]}?`, `Welcher Sportstar ist unter dem Spitznamen ${x[2]} bekannt?`],
    right: (x) => x[3], pool: nickPool, label: same });

  // ── equipment, playing areas, venues ──
  lookup({ family: "sport.equipment", category: C, rows: EQUIPMENT, stem: (x) => x[0], diff: (x) => (x[3] === "hurling" || x[3] === "croquet" ? "hard" : "easy"),
    text: (x) => [`In which sport do you use ${x[0]}?`, `¿En qué deporte se utiliza esto: ${x[1]}?`, `In welcher Sportart benutzt man ${x[2]}?`],
    right: (x) => x[3], pool: EQUIP_POOL, label: (k) => SP[k], ok: (x, k) => !(x[4] ?? []).includes(k) });
  lookup({ family: "sport.area", category: C, rows: AREAS, stem: (x) => x[0], diff: (x) => (["ring", "green", "diamond"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => x[4]
      ? [`In which sport is the playing area called the “${x[0]}”?`, `¿En qué deporte se llama «${x[1]}» al área de juego?`, `In welcher Sportart heißt die Wettkampffläche „${x[2]}“?`]
      : [`In which sport is part of the playing area called the “${x[0]}”?`, `¿En qué deporte una parte del área de juego se llama «${x[1]}»?`, `In welcher Sportart heißt ein Teil der Spielfläche „${x[2]}“?`],
    right: (x) => x[3], pool: AREA_POOL, label: (k) => SP[k], ok: (x, k) => !(x[5] ?? []).includes(k) });
  const venuePool = ["cricket", "rugby", "baseball", "amfootball", "golf", "horse", "nascar", "motogp", "tennis", "snooker", "darts", "sailing", "athletics",
    "football", "basketball", "icehockey", "f1", "cycling", "boxing", "rowing"];
  lookup({ family: "sport.venue-sport", category: C, rows: VENUES, stem: (x) => x[0], diff: () => "medium",
    text: (x) => [`${x[0]}: which sport is this venue famous for?`, `${x[1]}: ¿por qué deporte es famoso este lugar?`, `${x[2]}: Für welche Sportart ist dieser Austragungsort berühmt?`],
    right: (x) => x[3], pool: venuePool, label: (k) => SP[k], ok: (x, k) => !(x[4] ?? []).includes(k) });

  // ── Olympic symbols & lore ──
  const r5 = rngFor("sport.olympic-rings");
  for (let v = 0; v < 4; v++) {
    const ws = sample(r5, [3, 4, 6, 7], 3)!;
    add("sport.olympic-rings", "count", C, "easy", ["How many rings does the Olympic symbol have?", "¿Cuántos anillos tiene el símbolo olímpico?", "Aus wie vielen Ringen besteht das olympische Symbol?"],
      same("5"), ws.map((n) => same(String(n))));
  }
  const RING: L[] = [["Blue", "Azul", "Blau"], ["Yellow", "Amarillo", "Gelb"], ["Black", "Negro", "Schwarz"], ["Green", "Verde", "Grün"], ["Red", "Rojo", "Rot"]];
  const NON_RING: L[] = [["Orange", "Naranja", "Orange"], ["Purple", "Morado", "Lila"], ["Pink", "Rosa", "Rosa"], ["Grey", "Gris", "Grau"], ["Brown", "Marrón", "Braun"]];
  for (let i = 0; i < 18; i++) {
    const right = api.pick(r5, NON_RING);
    const ws = sample(r5, RING, 3)!;
    add("sport.olympic-rings", `not:${right[0]}:${ws.map((w) => w[0]).sort().join("+")}`, C, "medium",
      ["Which colour is NOT one of the colours of the Olympic rings?", "¿Qué color NO es uno de los colores de los anillos olímpicos?", "Welche Farbe gehört NICHT zu den Farben der Olympischen Ringe?"], right, ws);
  }
  for (let i = 0; i < 12; i++) {
    const right = api.pick(r5, RING);
    const ws = sample(r5, NON_RING, 3)!;
    add("sport.olympic-rings", `is:${right[0]}:${ws.map((w) => w[0]).sort().join("+")}`, C, "easy",
      ["Which of these colours is one of the colours of the Olympic rings?", "¿Cuál de estos colores aparece en los anillos olímpicos?", "Welche dieser Farben kommt in den Olympischen Ringen vor?"], right, ws);
  }
  choice("sport.olympic-lore", "motto", "medium", ["What does the Olympic motto “Citius, Altius, Fortius” mean?", "¿Qué significa el lema olímpico «Citius, Altius, Fortius»?", "Was bedeutet das olympische Motto „Citius, Altius, Fortius“?"],
    ["Faster, higher, stronger", "Más rápido, más alto, más fuerte", "Schneller, höher, stärker"],
    [["Stronger, faster, braver", "Más fuerte, más rápido, más valiente", "Stärker, schneller, mutiger"], ["Higher, further, faster", "Más alto, más lejos, más rápido", "Höher, weiter, schneller"],
      ["Together, stronger, prouder", "Juntos, más fuertes, más orgullosos", "Gemeinsam, stärker, stolzer"], ["Bigger, better, bolder", "Más grande, mejor, más audaz", "Größer, besser, kühner"],
      ["Peace, unity, friendship", "Paz, unidad, amistad", "Frieden, Einheit, Freundschaft"]], 4);
  choice("sport.olympic-lore", "flame", "medium", ["At which ancient Greek site is the Olympic flame lit before each Games?", "¿En qué lugar de la antigua Grecia se enciende la llama olímpica antes de cada edición?", "An welcher antiken Stätte in Griechenland wird vor allen Spielen das olympische Feuer entzündet?"],
    ["Olympia", "Olimpia", "Olympia"], [["Athens", "Atenas", "Athen"], ["Delphi", "Delfos", "Delphi"], ["Sparta", "Esparta", "Sparta"], ["Corinth", "Corinto", "Korinth"], ["Marathon", "Maratón", "Marathon"]], 4);
  choice("sport.olympic-lore", "founder", "medium", ["Who is regarded as the founder of the modern Olympic Games?", "¿Quién es considerado el fundador de los Juegos Olímpicos modernos?", "Wer gilt als Begründer der modernen Olympischen Spiele?"],
    same("Pierre de Coubertin"), ["Jules Rimet", "William Webb Ellis", "James Naismith", "Henri Delaunay", "Gustave Eiffel"].map(same), 4);
  choice("sport.olympic-lore", "first", "medium", ["In which year were the first modern Olympic Games held?", "¿En qué año se celebraron los primeros Juegos Olímpicos modernos?", "In welchem Jahr fanden die ersten modernen Olympischen Spiele statt?"],
    yearL(1896), [1888, 1892, 1900, 1904, 1912].map(yearL), 4);
  choice("sport.olympic-lore", "same-year", "hard", ["In which year were the Summer and Winter Olympics last held in the same year?", "¿En qué año se celebraron por última vez los Juegos de verano y de invierno en el mismo año?", "In welchem Jahr fanden Olympische Sommer- und Winterspiele zuletzt im selben Jahr statt?"],
    yearL(1992), [1984, 1988, 1994, 1996, 2000].map(yearL), 4);
  add("sport.olympic-lore", "every", C, "easy", ["How often are the Summer Olympics normally held?", "¿Cada cuánto se celebran normalmente los Juegos Olímpicos de verano?", "Wie oft finden die Olympischen Sommerspiele normalerweise statt?"],
    ["Every 4 years", "Cada 4 años", "Alle 4 Jahre"], [["Every 2 years", "Cada 2 años", "Alle 2 Jahre"], ["Every 3 years", "Cada 3 años", "Alle 3 Jahre"], ["Every 5 years", "Cada 5 años", "Alle 5 Jahre"]]);

  // ── NBA teams ──
  const NBA: [string, L, D][] = [
    ["Lakers", CITY.losangeles, "easy"], ["Celtics", CITY.boston, "medium"], ["Bulls", CITY.chicago, "easy"], ["Knicks", CITY.newyork, "medium"],
    ["Heat", ["Miami", "Miami", "Miami"], "medium"], ["Spurs", ["San Antonio", "San Antonio", "San Antonio"], "hard"], ["Mavericks", ["Dallas", "Dallas", "Dallas"], "hard"],
    ["Rockets", ["Houston", "Houston", "Houston"], "hard"], ["Suns", ["Phoenix", "Phoenix", "Phoenix"], "hard"], ["Nuggets", ["Denver", "Denver", "Denver"], "hard"],
    ["76ers", ["Philadelphia", "Filadelfia", "Philadelphia"], "hard"], ["Raptors", ["Toronto", "Toronto", "Toronto"], "medium"], ["Bucks", ["Milwaukee", "Milwaukee", "Milwaukee"], "hard"],
    ["Pistons", ["Detroit", "Detroit", "Detroit"], "hard"], ["Cavaliers", ["Cleveland", "Cleveland", "Cleveland"], "hard"], ["Hawks", ["Atlanta", "Atlanta", "Atlanta"], "hard"],
    ["Trail Blazers", ["Portland", "Portland", "Portland"], "hard"], ["Thunder", ["Oklahoma City", "Oklahoma City", "Oklahoma City"], "hard"],
    ["Magic", ["Orlando", "Orlando", "Orlando"], "hard"], ["Grizzlies", ["Memphis", "Memphis", "Memphis"], "hard"], ["Pelicans", ["New Orleans", "Nueva Orleans", "New Orleans"], "hard"],
    ["Hornets", ["Charlotte", "Charlotte", "Charlotte"], "hard"], ["Kings", ["Sacramento", "Sacramento", "Sacramento"], "hard"], ["Pacers", ["Indianapolis", "Indianápolis", "Indianapolis"], "hard"],
    ["Jazz", ["Salt Lake City", "Salt Lake City", "Salt Lake City"], "hard"], ["Timberwolves", ["Minneapolis", "Mineápolis", "Minneapolis"], "hard"],
    ["Wizards", ["Washington, D.C.", "Washington D. C.", "Washington, D.C."], "hard"], ["Clippers", CITY.losangeles, "hard"],
  ];
  lookup({ family: "sport.nba-city", category: C, rows: NBA, stem: (x) => x[0], diff: (x) => x[2],
    text: (x) => [`Which city are the NBA's ${x[0]} from?`, `¿De qué ciudad son los ${x[0]} de la NBA?`, `Aus welcher Stadt stammt das NBA-Team ${x[0]}?`],
    right: (x) => x[1], pool: uniq(NBA.map((n) => n[1])), label: (l) => l });
}
