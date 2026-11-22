import type { L, PackApi } from "../generate";
import {
  ALTER_EGOS, ANIMATED_YEARS, BAND_MEMBERS, BEST_PICTURE, BRANDS, CAR_BRANDS, CAR_MODELS, CHAT_ABBR, CITIES_L, CONSOLE_MAKERS, CONSOLE_YEARS, DC,
  EUROVISION, FOUNDERS, HEROES, HOUSES, HOW_MANY, HP_BOOKS, HP_CREATURES, HP_KINDS, MARVEL, NEMESES, NICKNAMES, NOT_BEST_PICTURE, PLACE_WORKS, PLACES,
  POKEMON, PRODUCTS, PTYPES, SETTINGS, SPECIES, SPECIES_CLOSE, STAGE_NAMES, STAR_WARS, TEAM_MEMBERS, TEAM_PUBLISHER, TEAMS, TECH_ABBR, THEME_PARKS,
  TOON_ANIMALS, TOON_WORKS, TOYS, VFILMS, VILLAINS, WEB_YEARS,
} from "./pop_culture-data";

const C = "pop_culture" as const;

/** Extra question types for the "pop_culture" category. */
export default function pack(api: PackApi) {
  const { add, lookup, which, groupYesNo, extremeOf, rngFor, sample, same, capL, byId, nameOf, deAus } = api;
  const l3 = (x: readonly [string, string, string, ...unknown[]]): L => [x[0], x[1], x[2]];
  /** quoted title in each language */
  const qt = (t: L): L => [`“${t[0]}”`, `«${t[1]}»`, `„${t[2]}“`];
  const country = (id: string) => {
    const c = byId.get(id);
    if (!c) throw new Error(`pop_culture: unknown country ${id}`);
    return c;
  };

  // ── superheroes ──
  const FAMOUS_HEROES = new Set(["Batman", "Superman", "Spider-Man", "Iron Man", "Hulk", "Captain America", "Wonder Woman"]);
  lookup({ family: "pop.alter-ego", category: C, rows: ALTER_EGOS, stem: (x) => x[0], diff: (x) => (FAMOUS_HEROES.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`What is the secret identity of this character: ${x[0]}?`, `¿Cuál es la identidad secreta de este personaje: ${x[1]}?`, `Wie lautet die geheime Identität dieser Figur: ${x[2]}?`],
    right: (x) => x[3], pool: ALTER_EGOS.map((a) => a[3]), label: same,
    ok: (x, a) => !(x[4] ?? []).includes(ALTER_EGOS.find((r) => r[3] === a)![0]) });
  lookup({ family: "pop.alter-ego-rev", category: C, rows: ALTER_EGOS, stem: (x) => x[3], diff: (x) => (FAMOUS_HEROES.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`${x[3]} is the secret identity of which character?`, `¿${x[3]} es la identidad secreta de qué personaje?`, `${x[3]} ist die geheime Identität welcher Figur?`],
    right: (x) => x, pool: ALTER_EGOS, label: l3, ok: (x, a) => !(x[4] ?? []).includes(a[0]) });
  groupYesNo("pop.marvel", C, 220, MARVEL, DC, "easy",
    ["Which of these characters comes from Marvel Comics?", "¿Cuál de estos personajes es de Marvel Comics?", "Welche dieser Figuren stammt von Marvel Comics?"]);
  groupYesNo("pop.dc", C, 220, DC, MARVEL, "easy",
    ["Which of these characters comes from DC Comics?", "¿Cuál de estos personajes es de DC Comics?", "Welche dieser Figuren stammt von DC Comics?"]);
  lookup({ family: "pop.hero-team", category: C, rows: TEAM_MEMBERS, stem: (x) => x[0], diff: (x) => (["avengers", "justice", "tmnt"].includes(x[3]) ? "easy" : "medium"),
    text: (x) => [`Which team does this character belong to: ${x[0]}?`, `¿A qué equipo pertenece este personaje: ${x[1]}?`, `Zu welchem Team gehört diese Figur: ${x[2]}?`],
    right: (x) => x[3], pool: Object.keys(TEAMS), label: (k) => TEAMS[k], ok: (x, k) => TEAM_PUBLISHER[k] !== TEAM_PUBLISHER[x[3]] });

  // ── villains ──
  const heroL = (k: string): L => capL([HEROES[k][0], HEROES[k][1], HEROES[k][2]]);
  lookup({ family: "pop.nemesis", category: C, rows: NEMESES, stem: (x) => x[0], diff: (x) => (["batman", "superman", "mario", "sonic", "harry"].includes(x[3]) ? "easy" : "medium"),
    text: (x) => [`Whose arch-enemy is this character: ${x[0]}?`, `¿De quién es archienemigo este personaje: ${x[1]}?`, `Wessen Erzfeind ist diese Figur: ${x[2]}?`],
    right: (x) => x[3], pool: Object.keys(HEROES), label: heroL });
  const esDe = (s: string) => `de ${s}`.replace(/^de el /, "del ");
  lookup({ family: "pop.nemesis-rev", category: C, rows: NEMESES, stem: (x) => x[3] + ":" + x[0], diff: (x) => (["batman", "superman", "mario", "sonic", "harry"].includes(x[3]) ? "easy" : "medium"),
    text: (x) => { const h = HEROES[x[3]]; return [`Who is the arch-enemy of ${h[0]}?`, `¿Quién es el archienemigo ${esDe(h[1])}?`, `Wer ist der Erzfeind ${h[3]}?`]; },
    right: (x) => x, pool: NEMESES, label: (v) => capL(l3(v)), ok: (x, v) => v[3] !== x[3] });
  lookup({ family: "pop.villain-film", category: C, rows: VILLAINS, stem: (x) => x[0], diff: (x) => (["Ursula", "Jafar", "Maleficent", "Cruella de Vil", "Captain Hook"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => [`In which film does this villain appear: ${x[0]}?`, `¿En qué película aparece este personaje malvado: ${x[1]}?`, `In welchem Film taucht dieser Bösewicht auf: ${x[2]}?`],
    right: (x) => x[3], pool: Object.keys(VFILMS), label: (k) => VFILMS[k] });
  which({ family: "pop.villain-of", category: C, rows: VILLAINS, per: 6, diff: "medium", key: (x) => x[3], label: l3,
    text: (k) => { const f = qt(VFILMS[k]); return [`Who is the villain in ${f[0]}?`, `¿Quién es el villano de ${f[1]}?`, `Wer ist der Bösewicht in ${f[2]}?`]; } });

  // ── Harry Potter ──
  const FAMOUS_HP = new Set(["Harry Potter", "Hermione Granger", "Ron Weasley", "Draco Malfoy", "Albus Dumbledore", "Severus Snape", "Lord Voldemort", "Rubeus Hagrid"]);
  lookup({ family: "pop.hogwarts-house", category: C, rows: HOUSES, stem: (x) => x[0], diff: (x) => (FAMOUS_HP.has(x[0]) ? "easy" : x[1] === "Gryffindor" || x[1] === "Slytherin" ? "medium" : "hard"),
    text: (x) => [`Which Hogwarts house does ${x[0]} belong to?`, `¿A qué casa de Hogwarts pertenece ${x[0]}?`, `Zu welchem Hogwarts-Haus gehört ${x[0]}?`],
    right: (x) => x[1], pool: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"], label: same });
  which({ family: "pop.hogwarts-house-rev", category: C, rows: HOUSES, per: 25, diff: (k) => (k === "Gryffindor" || k === "Slytherin" ? "medium" : "hard"),
    key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => [`Which of these characters belongs to ${k} house?`, `¿Cuál de estos personajes pertenece a la casa ${k}?`, `Welche dieser Figuren gehört zum Haus ${k}?`] });
  lookup({ family: "pop.hp-creature", category: C, rows: HP_CREATURES, stem: (x) => x[0], diff: (x) => (["Hedwig", "Fawkes", "Dobby", "Nagini", "Scabbers"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => [`In Harry Potter, what kind of creature is ${x[0]}?`, `En Harry Potter, ¿qué tipo de criatura es ${x[1]}?`, `Was für ein Wesen ist ${x[2]} in Harry Potter?`],
    right: (x) => x[3], pool: Object.keys(HP_KINDS), label: (k) => HP_KINDS[k], ok: (x, k) => !(x[4] ?? []).includes(k) });
  {
    for (let a = 0; a < 7; a++) for (let b = a + 1; b < 7; b++) for (let c = b + 1; c < 7; c++) for (let d = c + 1; d < 7; d++) {
      const set = [a, b, c, d];
      const gap = (i: number) => Math.min(...set.filter((x) => x !== i).map((x) => Math.abs(x - i)));
      add("pop.hp-order", `${set.join("")}:first`, C, gap(a) >= 2 ? "medium" : "hard",
        ["Which of these Harry Potter books comes first in the series?", "¿Cuál de estos libros de Harry Potter va primero en la saga?", "Welcher dieser Harry-Potter-Bände kommt in der Reihe zuerst?"],
        HP_BOOKS[a], set.slice(1).map((i) => HP_BOOKS[i]));
      add("pop.hp-order", `${set.join("")}:last`, C, gap(d) >= 2 ? "medium" : "hard",
        ["Which of these Harry Potter books comes last in the series?", "¿Cuál de estos libros de Harry Potter va último en la saga?", "Welcher dieser Harry-Potter-Bände kommt in der Reihe zuletzt?"],
        HP_BOOKS[d], set.slice(0, 3).map((i) => HP_BOOKS[i]));
    }
  }

  // ── Pokémon ──
  const STARTERS = new Set(["Pikachu", "Charmander", "Squirtle", "Bulbasaur", "Charizard", "Snorlax", "Psyduck", "Magikarp", "Eevee"]);
  const pokeL = (p: (typeof POKEMON)[number]): L => [p[0], p[0], p[1]];
  lookup({ family: "pop.pokemon-type", category: C, rows: POKEMON, stem: (x) => x[0], diff: (x) => (STARTERS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which type does the Pokémon ${x[0]} have?`, `¿De qué tipo es el Pokémon ${x[0]}?`, `Welchen Typ hat das Pokémon ${x[1]}?`],
    right: (x) => x[2], pool: Object.keys(PTYPES), label: (k) => PTYPES[k], ok: (x, k) => !(x[3] ?? []).includes(k) });
  which({ family: "pop.pokemon-type-rev", category: C, rows: POKEMON, per: 14, diff: "medium", key: (x) => x[2], label: pokeL,
    text: (k) => [`Which of these Pokémon is a ${PTYPES[k][0]}-type?`, `¿Cuál de estos Pokémon es de tipo ${PTYPES[k][1]}?`, `Welches dieser Pokémon ist vom Typ ${PTYPES[k][2]}?`],
    ok: (_, c, k) => !(c[3] ?? []).includes(k) });

  // ── games & consoles ──
  const makers = [...new Set(CONSOLE_MAKERS.map((c) => c[1]))];
  lookup({ family: "pop.console-maker", category: C, rows: CONSOLE_MAKERS, stem: (x) => x[0], diff: (x) => (["PlayStation", "Xbox", "Game Boy", "Wii"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which company made the game console ${x[0]}?`, `¿Qué empresa fabricó la consola ${x[0]}?`, `Welche Firma hat die Spielkonsole ${x[0]} herausgebracht?`],
    right: (x) => x[1], pool: makers, label: same });
  which({ family: "pop.console-rev", category: C, rows: CONSOLE_MAKERS, per: 12, diff: "medium", key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => [`Which of these game consoles was made by ${k}?`, `¿Cuál de estas consolas es de ${k}?`, `Welche dieser Spielkonsolen stammt von ${k}?`] });
  const consoleRows = CONSOLE_YEARS.map(([n, y]) => [n, n, n, y] as [string, string, string, number]);
  extremeOf({ family: "pop.console-first", category: C, n: 250, rows: consoleRows, max: false, minGap: 3, diff: "medium",
    text: ["Which of these game consoles came out first?", "¿Cuál de estas consolas salió primero?", "Welche dieser Spielkonsolen kam zuerst auf den Markt?"] });
  extremeOf({ family: "pop.console-first", category: C, n: 150, rows: consoleRows, max: true, minGap: 3, diff: "medium",
    text: ["Which of these game consoles came out most recently?", "¿Cuál de estas consolas es la más reciente?", "Welche dieser Spielkonsolen ist die neueste?"] });

  // ── brands & companies ──
  const brandPool = [...new Set(BRANDS.map((b) => b[1]))].map(country);
  const BIG_BRANDS = new Set(["IKEA", "LEGO", "Samsung", "Nokia", "Zara", "Adidas", "Sony", "Nintendo", "Coca-Cola", "McDonald's", "Apple", "Nike", "Haribo", "Spotify", "H&M"]);
  lookup({ family: "pop.brand-country", category: C, rows: BRANDS, stem: (x) => x[0], diff: (x) => (BIG_BRANDS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which country does the brand ${x[0]} come from?`, `¿De qué país es originaria la marca ${x[0]}?`, `Aus welchem Land stammt die Marke ${x[0]}?`],
    right: (x) => country(x[1]), pool: brandPool, label: nameOf, ok: (x, c) => c.id !== x[1] });
  which({ family: "pop.brand-rev", category: C, rows: BRANDS, per: 12, diff: "medium", key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => { const c = country(k); return [`Which of these brands comes from ${c.enSubj}?`, `¿Cuál de estas marcas es ${c.esDe}?`, `Welche dieser Marken stammt ${deAus(c)}?`]; } });
  const carPool = [...new Set(CAR_BRANDS.map((b) => b[1]))].map(country);
  const BIG_CARS = new Set(["Ferrari", "Toyota", "BMW", "Mercedes-Benz", "Volkswagen", "Porsche", "Ford", "Tesla", "Fiat", "Renault", "Peugeot", "Audi", "Lamborghini"]);
  lookup({ family: "pop.car-country", category: C, rows: CAR_BRANDS, stem: (x) => x[0], diff: (x) => (BIG_CARS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which country does the car brand ${x[0]} come from?`, `¿De qué país es originaria la marca de coches ${x[0]}?`, `Aus welchem Land stammt die Automarke ${x[0]}?`],
    right: (x) => country(x[1]), pool: carPool, label: nameOf, ok: (x, c) => c.id !== x[1] });
  which({ family: "pop.car-rev", category: C, rows: CAR_BRANDS, per: 12, diff: "medium", key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => { const c = country(k); return [`Which of these car brands comes from ${c.enSubj}?`, `¿Cuál de estas marcas de coches es ${c.esDe}?`, `Welche dieser Automarken stammt ${deAus(c)}?`]; } });
  lookup({ family: "pop.product-company", category: C, rows: PRODUCTS, stem: (x) => x[0], diff: (x) => (["iPhone", "PlayStation", "Xbox", "Windows", "Big Mac", "Game Boy"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which company is behind this product: ${x[0]}?`, `¿Qué empresa está detrás de este producto: ${x[1]}?`, `Welches Unternehmen steckt hinter diesem Produkt: ${x[2]}?`],
    right: (x) => x[3], pool: [...new Set(PRODUCTS.map((p) => p[3]))], label: same });
  lookup({ family: "pop.car-model", category: C, rows: CAR_MODELS, stem: (x) => x[0], diff: (x) => (["Golf", "Beetle", "Mustang", "911", "Model S"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which car maker builds or built this model: ${x[0]}?`, `¿Qué marca de coches fabrica o fabricó este modelo: ${x[1]}?`, `Welcher Autohersteller baut oder baute dieses Modell: ${x[2]}?`],
    right: (x) => x[3], pool: [...new Set(CAR_MODELS.map((m) => m[3]))], label: same });
  const HARD_FOUNDERS = new Set(["Nintendo", "Sony", "Samsung", "Oracle", "Nvidia", "WhatsApp", "Instagram", "LEGO", "Puma", "Adidas"]);
  lookup({ family: "pop.founder", category: C, rows: FOUNDERS, stem: (x) => x[0], diff: (x) => (HARD_FOUNDERS.has(x[0]) ? "hard" : ["Microsoft", "Amazon", "Facebook", "Apple"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => [`Who founded (or co-founded) ${x[0]}?`, `¿Quién fundó (o cofundó) ${x[0]}?`, `Wer hat ${x[0]} gegründet (oder mitgegründet)?`],
    right: (x) => x[1], pool: FOUNDERS.map((f) => f[1]), label: same });
  lookup({ family: "pop.founder-rev", category: C, rows: FOUNDERS, stem: (x) => x[1], diff: (x) => (HARD_FOUNDERS.has(x[0]) ? "hard" : ["Microsoft", "Amazon", "Facebook", "Apple"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which company did ${x[1]} found (or co-found)?`, `¿Qué empresa fundó (o cofundó) ${x[1]}?`, `Welches Unternehmen hat ${x[1]} gegründet (oder mitgegründet)?`],
    right: (x) => x[0], pool: FOUNDERS.map((f) => f[0]), label: same });
  const webRows = WEB_YEARS.map(([n, y]) => [n, n, n, y] as [string, string, string, number]);
  extremeOf({ family: "pop.web-first", category: C, n: 220, rows: webRows, max: false, minGap: 3, diff: "medium",
    text: ["Which of these websites or apps launched first?", "¿Cuál de estas webs o aplicaciones se lanzó primero?", "Welche dieser Websites oder Apps ging zuerst an den Start?"] });
  extremeOf({ family: "pop.web-first", category: C, n: 150, rows: webRows, max: true, minGap: 3, diff: "medium",
    text: ["Which of these websites or apps launched most recently?", "¿Cuál de estas webs o aplicaciones es la más reciente?", "Welche dieser Websites oder Apps ist am jüngsten?"] });

  // ── film, TV & music ──
  groupYesNo("pop.best-picture", C, 260, BEST_PICTURE, NOT_BEST_PICTURE, "medium",
    ["Which of these films won the Oscar for Best Picture?", "¿Cuál de estas películas ganó el Óscar a la mejor película?", "Welcher dieser Filme gewann den Oscar als bester Film?"]);
  const euro = api.COUNTRIES.filter((c) => c.continent === "EU" && c.id !== "belarus");
  lookup({ family: "pop.eurovision", category: C, rows: EUROVISION, stem: (x) => String(x[0]), diff: (x) => (x[0] >= 2010 || x[0] === 1974 ? "medium" : "hard"),
    text: (x) => [`Which country won the Eurovision Song Contest in ${x[0]}?`, `¿Qué país ganó el Festival de Eurovisión en ${x[0]}?`, `Welches Land gewann den Eurovision Song Contest ${x[0]}?`],
    right: (x) => country(x[1]), pool: euro, label: nameOf, ok: (x, c) => c.id !== x[1] });
  const bands = [...new Set(BAND_MEMBERS.map((b) => b[1]))];
  const FAMOUS_MEMBERS = new Set(["Freddie Mercury", "Mick Jagger", "Bono", "Paul McCartney", "John Lennon", "Ringo Starr", "Kurt Cobain", "Chris Martin", "Harry Styles", "Beyoncé"]);
  lookup({ family: "pop.band-member", category: C, rows: BAND_MEMBERS, stem: (x) => x[0], diff: (x) => (FAMOUS_MEMBERS.has(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which band is or was ${x[0]} a member of?`, `¿De qué grupo forma o formó parte ${x[0]}?`, `In welcher Band ist oder war ${x[0]} Mitglied?`],
    right: (x) => x[1], pool: bands, label: same, ok: (x, b) => !(x[2] ?? []).includes(b) });
  which({ family: "pop.band-member-rev", category: C, rows: BAND_MEMBERS, per: 4, diff: "medium", key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => [`Who of these is or was a member of ${k}?`, `¿Quién de estos es o fue miembro de ${k}?`, `Wer von diesen ist oder war Mitglied von ${k}?`],
    ok: (_, c, k) => !(c[2] ?? []).includes(k) });
  const NICK_EASY = new Set(["Michael Jackson", "Madonna", "Elvis Presley"]);
  lookup({ family: "pop.nickname", category: C, rows: NICKNAMES, stem: (x) => x[0], diff: (x) => (NICK_EASY.has(x[3]) ? "easy" : "medium"),
    text: (x) => [`Who is known by the nickname or alter ego “${x[0]}”?`, `¿Quién es conocido por el apodo o alter ego «${x[1]}»?`, `Wer ist unter dem Spitznamen oder Alter Ego „${x[2]}“ bekannt?`],
    right: (x) => x[3], pool: [...new Set(NICKNAMES.map((n) => n[3]))], label: same });
  const stageNames = STAGE_NAMES.map((s) => s[1]);
  const EASY_STAGE = new Set(["Lady Gaga", "Elton John", "Freddie Mercury", "Eminem", "Rihanna", "Bono"]);
  lookup({ family: "pop.stage-name", category: C, rows: STAGE_NAMES, stem: (x) => x[1], diff: (x) => (EASY_STAGE.has(x[1]) ? "medium" : "hard"),
    text: (x) => [`Which star was born with the name ${x[0]}?`, `¿Qué estrella nació con el nombre de ${x[0]}?`, `Welcher Star kam unter dem Namen ${x[0]} zur Welt?`],
    right: (x) => x[1], pool: stageNames, label: same });
  lookup({ family: "pop.real-name", category: C, rows: STAGE_NAMES, stem: (x) => x[1], diff: (x) => (EASY_STAGE.has(x[1]) ? "medium" : "hard"),
    text: (x) => [`What is the birth name of ${x[1]}?`, `¿Cuál es el nombre real de ${x[1]}?`, `Wie lautet der bürgerliche Name von ${x[1]}?`],
    right: (x) => x[0], pool: STAGE_NAMES.map((s) => s[0]), label: same });
  {
    const rows = STAR_WARS.map((s) => [s[0], s[1], s[2], s[3]] as [string, string, string, number]);
    extremeOf({ family: "pop.star-wars-order", category: C, n: 110, rows, max: false, minGap: 1, diff: "medium",
      text: ["Which of these Star Wars films came out first?", "¿Cuál de estas películas de Star Wars se estrenó primero?", "Welcher dieser Star-Wars-Filme kam zuerst ins Kino?"] });
    extremeOf({ family: "pop.star-wars-order", category: C, n: 110, rows, max: true, minGap: 1, diff: "medium",
      text: ["Which of these Star Wars films came out most recently?", "¿Cuál de estas películas de Star Wars se estrenó más tarde?", "Welcher dieser Star-Wars-Filme kam zuletzt ins Kino?"] });
  }
  extremeOf({ family: "pop.animated-first", category: C, n: 300, rows: ANIMATED_YEARS, max: false, minGap: 3, diff: "medium",
    text: ["Which of these Disney or Pixar animated films came out first?", "¿Cuál de estas películas de animación de Disney o Pixar se estrenó primero?", "Welcher dieser Disney- oder Pixar-Animationsfilme kam zuerst ins Kino?"] });
  extremeOf({ family: "pop.animated-first", category: C, n: 200, rows: ANIMATED_YEARS, max: true, minGap: 3, diff: "medium",
    text: ["Which of these Disney or Pixar animated films came out most recently?", "¿Cuál de estas películas de animación de Disney o Pixar es la más reciente?", "Welcher dieser Disney- oder Pixar-Animationsfilme ist der neueste?"] });
  const kind = (k: "f" | "s"): L => (k === "f" ? ["film", "la película", "der Film"] : ["series", "la serie", "die Serie"]);
  lookup({ family: "pop.setting", category: C, rows: SETTINGS, stem: (x) => x[0], diff: () => "medium",
    text: (x) => { const t = qt(l3(x)); const k = kind(x[3]); return [`In which city is the ${k[0]} ${t[0]} set?`, `¿En qué ciudad transcurre ${k[1]} ${t[1]}?`, `In welcher Stadt spielt ${k[2]} ${t[2]}?`]; },
    right: (x) => x[4], pool: Object.keys(CITIES_L), label: (k) => CITIES_L[k] });
  which({ family: "pop.setting-rev", category: C, rows: SETTINGS, per: 8, diff: "medium", key: (x) => x[4], label: l3,
    text: (k) => [`Which of these films or series is set in ${CITIES_L[k][0]}?`, `¿Cuál de estas películas o series transcurre en ${CITIES_L[k][1]}?`, `Welcher dieser Titel spielt in ${CITIES_L[k][2]}?`] });

  // ── fictional worlds & characters ──
  const close = (a: string, b: string) => SPECIES_CLOSE.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  const EASY_TOONS = new Set(["Timon", "Pumbaa", "Baloo", "Sebastian", "Remy", "Sven", "Abu", "Mushu", "Sid", "Manny", "Tom", "Jerry", "Snoopy", "Tails", "Yoshi", "Judy Hopps", "Nick Wilde"]);
  lookup({ family: "pop.toon-animal", category: C, rows: TOON_ANIMALS, stem: (x) => x[0] + ":" + x[3], diff: (x) => (EASY_TOONS.has(x[0]) ? "easy" : "medium"),
    text: (x) => { const w = qt(TOON_WORKS[x[3]]); return [`In ${w[0]}, what kind of animal is ${x[0]}?`, `En ${w[1]}, ¿qué animal es ${x[1]}?`, `Was für ein Tier ist ${x[2]} in ${w[2]}?`]; },
    right: (x) => x[4], pool: Object.keys(SPECIES), label: (k) => SPECIES[k], ok: (x, k) => !close(x[4], k) });
  lookup({ family: "pop.fictional-place", category: C, rows: PLACES, stem: (x) => x[0], diff: (x) => (["Gotham City", "Springfield", "Bikini Bottom", "Arendelle", "Neverland", "Hogsmeade", "Diagon Alley", "The Mushroom Kingdom"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which story is this fictional place from: ${x[0]}?`, `¿De qué historia es este lugar ficticio: ${x[1]}?`, `Aus welcher Geschichte stammt dieser fiktive Ort: ${x[2]}?`],
    right: (x) => x[3], pool: Object.keys(PLACE_WORKS), label: (k) => PLACE_WORKS[k] });
  {
    const r = rngFor("pop.how-many");
    for (const [en, es, de, n, alts] of HOW_MANY) {
      for (let v = 0; v < 3; v++) {
        const ws = sample(r, alts, 3);
        if (ws) add("pop.how-many", en, C, "medium", [en, es, de], same(String(n)), ws.map((w) => same(String(w))));
      }
    }
  }

  // ── toys, parks, internet ──
  const toyPool = [...new Set(TOYS.map((t) => t[3]))].map(country);
  lookup({ family: "pop.toy-country", category: C, rows: TOYS, stem: (x) => x[0], diff: (x) => (["LEGO bricks", "Playmobil", "Tamagotchi", "Barbie", "Monopoly", "Pokémon cards"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => [`Which country does this toy or game originally come from: ${x[0]}?`, `¿De qué país procede originalmente este juguete o juego: ${x[1]}?`, `Aus welchem Land stammt dieses Spielzeug oder Spiel ursprünglich: ${x[2]}?`],
    right: (x) => country(x[3]), pool: toyPool, label: nameOf, ok: (x, c) => c.id !== x[3] });
  which({ family: "pop.toy-rev", category: C, rows: TOYS, per: 12, diff: "medium", key: (x) => x[3], label: l3,
    text: (k) => { const c = country(k); return [`Which of these toys or games originally comes from ${c.enSubj}?`, `¿Cuál de estos juguetes o juegos procede originalmente ${c.esDe}?`, `Welches dieser Spielzeuge oder Spiele stammt ursprünglich ${deAus(c)}?`]; } });
  const parkPool = [...new Set(THEME_PARKS.map((p) => p[1]))].map(country);
  lookup({ family: "pop.theme-park", category: C, rows: THEME_PARKS, stem: (x) => x[0], diff: (x) => (["Disneyland Paris", "Europa-Park", "PortAventura", "Walt Disney World", "Legoland Billund"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => [`In which country is the theme park ${x[0]}?`, `¿En qué país está el parque de atracciones ${x[0]}?`, `In welchem Land liegt der Freizeitpark ${x[0]}?`],
    right: (x) => country(x[1]), pool: parkPool, label: nameOf, ok: (x, c) => c.id !== x[1] });
  which({ family: "pop.theme-park-rev", category: C, rows: THEME_PARKS, per: 8, diff: "medium", key: (x) => x[1], label: (x) => same(x[0]),
    text: (k) => { const c = country(k); return [`Which of these theme parks is in ${c.enSubj}?`, `¿Cuál de estos parques de atracciones está en ${c.esSubj}?`, `Welcher dieser Freizeitparks liegt ${c.deIn}?`]; } });
  lookup({ family: "pop.chat-abbr", category: C, rows: CHAT_ABBR, stem: (x) => x[0], diff: (x) => (["LOL", "OMG", "BTW", "ASAP", "DIY", "FAQ", "BFF"].includes(x[0]) ? "easy" : "medium"),
    text: (x) => [`What does the chat abbreviation ${x[0]} stand for?`, `¿Qué significa la abreviatura inglesa de chat ${x[0]}?`, `Wofür steht die englische Chat-Abkürzung ${x[0]}?`],
    right: (x) => x[1], pool: CHAT_ABBR.map((a) => a[1]), label: same });
  lookup({ family: "pop.tech-abbr", category: C, rows: TECH_ABBR, stem: (x) => x[0], diff: (x) => (["WWW", "PC", "VR", "AI", "USB", "GPS"].includes(x[0]) ? "easy" : x[0].length >= 4 ? "hard" : "medium"),
    text: (x) => [`What does the abbreviation ${x[0]} stand for?`, `¿Qué significan las siglas inglesas ${x[0]}?`, `Wofür steht die englische Abkürzung ${x[0]}?`],
    right: (x) => x[1], pool: TECH_ABBR.map((a) => a[1]), label: same });
}

