import type { PackApi } from "../generate";
import * as Sp from "./sports2-data";
import * as H from "./history2-data";

type L = [string, string, string];
type Diff = "easy" | "medium" | "hard";
const same3 = (s: string): L => [s, s, s];
const low = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** Sports and History: more types from the second-round fact tables. */
export default function pack(api: PackApi) {
  const { lookup, which, groupYesNo, extremeOf, byId, nameOf, CONTINENTS } = api;
  const has = (id: string) => byId.has(id);
  const cname = (id: string) => nameOf(byId.get(id)!);
  const cL = (ids: string[]) => ids.filter(has).map(cname);

  // ══ SPORTS ═══════════════════════════════════════════════════════
  {
    const rows = Sp.TRADITIONAL.filter((r) => has(r[3]));
    lookup({
      family: "sport2.traditional", category: "sports", rows, stem: (r) => r[0], diff: () => "medium",
      text: ([en, es, de]) => [`Which country does the traditional sport “${en}” come from?`, `¿De qué país procede el deporte tradicional «${es}»?`, `Aus welchem Land stammt die traditionelle Sportart „${de}“?`],
      right: (r) => r[3], pool: Sp.TRAD_POOL.filter(has), label: cname, ok: (r, c) => !(r[4] ?? []).includes(c),
    });
    const ev = Sp.EVENTS.filter((r) => has(r[3]));
    lookup({
      family: "sport2.event-host", category: "sports", rows: ev, stem: (r) => r[0], diff: (r) => r[4],
      text: ([en, es, de]) => [`In which country is ${en} held?`, `¿En qué país se celebra ${es}?`, `In welchem Land findet ${de} statt?`],
      right: (r) => r[3], pool: Sp.EVENT_POOL.filter(has), label: cname,
    });
  }
  const yn = (family: string, yes: L[], no: L[], d: Diff, text: L) => groupYesNo(family, "sports", Math.min(90, yes.length * 8), yes, no, d, text);
  yn("sport2.olympic-dropped", Sp.OLY_DROPPED, Sp.OLY_NEVER, "hard", ["Which of these sports was once in the Olympic Games but was later dropped?", "¿Cuál de estos deportes fue olímpico en el pasado pero luego se eliminó?", "Welche dieser Sportarten war früher olympisch, wurde aber gestrichen?"]);
  yn("sport2.never-olympic", Sp.OLY_NEVER, Sp.OLY_DROPPED, "hard", ["Which of these sports has never been part of the Olympic Games?", "¿Cuál de estos deportes nunca ha sido olímpico?", "Welche dieser Sportarten war nie olympisch?"]);
  yn("sport2.no-ball", Sp.NO_BALL, Sp.WITH_BALL, "easy", ["Which of these sports is played without a ball?", "¿Cuál de estos deportes se juega sin pelota?", "Welche dieser Sportarten wird ohne Ball gespielt?"]);
  yn("sport2.with-ball", Sp.WITH_BALL, Sp.NO_BALL, "easy", ["Which of these sports is played with a ball?", "¿Cuál de estos deportes se juega con pelota?", "Welche dieser Sportarten wird mit einem Ball gespielt?"]);
  yn("sport2.racket", Sp.RACKET, Sp.NO_RACKET, "easy", ["Which of these sports is played with a racket?", "¿Cuál de estos deportes se juega con raqueta?", "Welche dieser Sportarten spielt man mit einem Schläger (Racket)?"]);
  yn("sport2.no-racket", Sp.NO_RACKET, Sp.RACKET, "easy", ["Which of these sports is played without a racket?", "¿Cuál de estos deportes se juega sin raqueta?", "Welche dieser Sportarten spielt man ohne Racket?"]);
  yn("sport2.original-six", Sp.ORIGINAL_SIX.map(same3), Sp.NOT_ORIGINAL_SIX.map(same3), "hard", ["Which of these NHL teams is one of the “Original Six”?", "¿Cuál de estos equipos de la NHL es uno de los «Original Six»?", "Welches dieser NHL-Teams gehört zu den „Original Six“?"]);
  yn("sport2.motogp", Sp.MOTOGP_CHAMPIONS.map(same3), Sp.MOTOGP_NON_CHAMPIONS.map(same3), "hard", ["Which of these riders won a premier-class motorcycle world title (500cc or MotoGP)?", "¿Cuál de estos pilotos ganó un título mundial de la categoría reina (500 cc o MotoGP)?", "Wer dieser Fahrer gewann einen Weltmeistertitel in der Königsklasse (500 cm³ oder MotoGP)?"]);

  lookup({
    family: "sport2.position", category: "sports", rows: Sp.POSITIONS, stem: (r) => r[0], diff: () => "medium",
    text: ([en, es, de]) => [`In which sport is there a position called “${en}”?`, `¿En qué deporte existe la posición «${es}»?`, `In welcher Sportart gibt es die Position „${de}“?`],
    right: (r) => r[3], pool: Object.keys(Sp.POS_SPORT), label: (k) => Sp.POS_SPORT[k], ok: (r, k) => !(r[4] ?? []).includes(k),
  });
  which({
    family: "sport2.position-which", category: "sports", rows: Sp.POSITIONS, per: 3, diff: "medium", key: (r) => r[3], label: (r) => [r[0], r[1], r[2]],
    text: (k) => [`Which of these is a position in ${Sp.POS_SPORT[k][0].toLowerCase()}?`, `¿Cuál de estas es una posición del ${Sp.POS_SPORT[k][1].toLowerCase()}?`, `Welche dieser Positionen gibt es im ${Sp.POS_SPORT[k][2]}?`],
    ok: (_r, c, k) => !(c[4] ?? []).includes(k),
  });
  lookup({
    family: "sport2.terrain", category: "sports", rows: Sp.TERRAIN_ROWS, stem: (r) => r[0], diff: (r) => r[4],
    text: ([en, es, de]) => [`Where is ${en.toLowerCase()} done?`, `¿Dónde se practica este deporte: ${es.toLowerCase()}?`, `Wo betreibt man diese Sportart: ${de}?`],
    right: (r) => r[3], pool: Object.keys(Sp.TERRAIN), label: (k) => Sp.TERRAIN[k],
  });
  which({
    family: "sport2.terrain-which", category: "sports", rows: Sp.TERRAIN_ROWS, per: 4, diff: "easy", key: (r) => r[3], label: (r) => [r[0], r[1], r[2]],
    text: (k) => [`Which of these sports is done ${low(Sp.TERRAIN[k][0])}?`, `¿Cuál de estos deportes se practica ${low(Sp.TERRAIN[k][1])}?`, `Welche dieser Sportarten betreibt man ${low(Sp.TERRAIN[k][2])}?`],
  });
  lookup({
    family: "sport2.na-team", category: "sports", rows: Sp.NA_TEAMS, stem: (r) => r[0], diff: (r) => r[2],
    text: ([t]) => [`Which sport do the ${t} play?`, `¿A qué deporte juegan los ${t}?`, `Welche Sportart spielen die ${t}?`],
    right: (r) => r[1], pool: Object.keys(Sp.NA_SPORT), label: (k) => Sp.NA_SPORT[k],
  });
  which({
    family: "sport2.na-team-which", category: "sports", rows: Sp.NA_TEAMS, per: 4, diff: "medium", key: (r) => r[1], label: (r) => same3(r[0]),
    text: (k) => [`Which of these teams plays ${Sp.NA_SPORT[k][0].toLowerCase()}?`, `¿Cuál de estos equipos juega a este deporte: ${Sp.NA_SPORT[k][1].toLowerCase()}?`, `Welches dieser Teams spielt ${Sp.NA_SPORT[k][2]}?`],
  });
  lookup({
    family: "sport2.federation", category: "sports", rows: Sp.FEDERATIONS, stem: (r) => r[0], diff: (r) => r[4],
    text: ([a]) => [`Which sport does the international federation ${a} govern?`, `¿Qué deporte dirige la federación internacional ${a}?`, `Für welche Sportart ist der Weltverband ${a} zuständig?`],
    right: (r) => [r[1], r[2], r[3]] as L, pool: Sp.FEDERATIONS.map((r) => [r[1], r[2], r[3]] as L), label: (l) => l,
  });
  extremeOf({ family: "sport2.f1-titles", category: "sports", n: 60, rows: Sp.F1_TITLES.map(([n, v]) => [n, n, n, v]), max: true, minGap: 1, diff: "hard",
    text: ["Which of these Formula 1 drivers won the most world titles?", "¿Cuál de estos pilotos de Fórmula 1 ganó más títulos mundiales?", "Welcher dieser Formel-1-Fahrer gewann die meisten WM-Titel?"] });
  extremeOf({ family: "sport2.slam-titles", category: "sports", n: 60, rows: Sp.SLAM_TITLES.map(([n, v]) => [n, n, n, v]), max: true, minGap: 2, diff: "hard",
    text: ["Which of these tennis players won the most Grand Slam singles titles?", "¿Cuál de estos tenistas ganó más títulos de Grand Slam individuales?", "Wer dieser Tennisspieler gewann die meisten Grand-Slam-Einzeltitel?"] });

  // ══ HISTORY ══════════════════════════════════════════════════════
  lookup({
    family: "hist2.ruler-realm", category: "history", rows: H.RULERS, stem: (r) => r[0][0], diff: (r) => r[3],
    text: ([n]) => [`Which realm did ${n[0]} rule?`, `¿Qué reino o imperio gobernó ${n[1]}?`, `Über welches Reich herrschte ${n[2]}?`],
    right: (r) => r[1], pool: Object.keys(H.REALMS), label: (k) => H.REALMS[k].label, ok: (r, k) => !r[2].includes(k),
  });
  which({
    family: "hist2.ruler-which", category: "history", rows: H.RULERS, per: 2, diff: "medium", key: (r) => r[1], label: (r) => r[0],
    text: (k) => [`Which of these rulers ruled ${H.REALMS[k].en}?`, `¿Cuál de estos gobernantes gobernó ${H.REALMS[k].es}?`, `Welcher dieser Herrscher regierte ${H.REALMS[k].deAcc}?`],
    ok: (_r, c, k) => !c[2].includes(k),
  });
  lookup({
    family: "hist2.script", category: "history", rows: H.SCRIPTS, stem: (r) => r[0][0], diff: (r) => r[2],
    text: ([s]) => [`Who used the writing system “${s[0]}”?`, `¿Quién usaba el sistema de escritura «${s[1]}»?`, `Wer benutzte die Schrift „${s[2]}“?`],
    right: (r) => r[1], pool: Object.keys(H.SCRIPT_PEOPLE), label: (k) => H.SCRIPT_PEOPLE[k],
  });
  groupYesNo("hist2.china-first", "history", 60, H.CHINA_FIRSTS, H.NOT_CHINA_FIRSTS, "medium",
    ["Which of these was first invented in ancient China?", "¿Cuál de estos inventos surgió primero en la antigua China?", "Was davon wurde zuerst im alten China erfunden?"]);
  {
    const rows = H.INDEP_HEROES.filter((r) => has(r[1]));
    lookup({
      family: "hist2.indep-hero", category: "history", rows, stem: (r) => r[0][0], diff: (r) => r[2],
      text: ([n]) => [`${n[0]} is honoured as a hero of independence in which country?`, `¿En qué país se honra a ${n[1]} como héroe de la independencia?`, `In welchem Land wird ${n[2]} als Held der Unabhängigkeit verehrt?`],
      right: (r) => r[1], pool: [...new Set([...rows.map((r) => r[1]), ...H.INDEP_POOL.filter(has)])], label: cname,
    });
  }
  lookup({
    family: "hist2.sailor-crown", category: "history", rows: H.SAILORS, stem: (r) => r[0][0], diff: (r) => r[3],
    text: ([n]) => [`For which country's crown did ${n[0]} sail?`, `¿Para la corona de qué país navegó ${n[1]}?`, `Für die Krone welches Landes segelte ${n[2]}?`],
    right: (r) => r[1], pool: Object.keys(H.CROWNS), label: (k) => H.CROWNS[k].label, ok: (r, k) => !r[2].includes(k),
  });
  lookup({
    family: "hist2.builder", category: "history", rows: H.BUILT, stem: (r) => r[1][0], diff: (r) => r[3],
    text: ([b]) => [`Who had ${b[0]} built?`, `¿Quién mandó construir ${b[1]}?`, `Wer ließ ${b[2]} bauen?`],
    right: (r) => r[2], pool: Object.keys(H.BUILDERS), label: (k) => H.BUILDERS[k],
  });
  which({
    family: "hist2.builder-which", category: "history", rows: H.BUILT, per: 2, diff: "medium", key: (r) => r[2], label: (r) => r[1],
    text: (k) => [`Which of these did ${H.BUILDERS[k][0]} have built?`, `¿Cuál de estas obras mandó construir ${low(H.BUILDERS[k][1])}?`, `Was davon ließ ${H.BUILDERS[k][2]} bauen?`],
  });
  lookup({
    family: "hist2.coin", category: "history", rows: H.COINS, stem: (r) => r[0][0], diff: (r) => r[3],
    text: ([c]) => [`Who issued the coin called the “${c[0]}”?`, `¿Quién acuñaba la moneda llamada «${c[1]}»?`, `Wer prägte die Münze „${c[2]}“?`],
    right: (r) => r[1], pool: Object.keys(H.ISSUERS), label: (k) => H.ISSUERS[k], ok: (r, k) => !r[2].includes(k),
  });
  groupYesNo("hist2.nato-founder", "history", 60, cL(H.NATO_FOUNDERS), cL(H.NATO_LATER), "hard",
    ["Which of these countries was a founding member of NATO in 1949?", "¿Cuál de estos países fue miembro fundador de la OTAN en 1949?", "Welches dieser Länder war 1949 Gründungsmitglied der NATO?"]);
  groupYesNo("hist2.ww2-neutral", "history", 40, cL(H.WW2_NEUTRAL), cL(H.WW2_FOUGHT), "medium",
    ["Which of these countries stayed officially neutral in World War II?", "¿Cuál de estos países se mantuvo oficialmente neutral en la Segunda Guerra Mundial?", "Welches dieser Länder blieb im Zweiten Weltkrieg offiziell neutral?"]);
  lookup({
    family: "hist2.empire-continent", category: "history", rows: H.EMPIRE_CONTINENT, stem: (r) => r[0], diff: (r) => r[4],
    text: ([en, es, de]) => [`On which continent was ${en}?`, `¿En qué continente estaba ${es}?`, `Auf welchem Kontinent lag ${de}?`],
    right: (r) => r[3], pool: Object.keys(CONTINENTS) as (keyof typeof CONTINENTS)[], label: (k) => CONTINENTS[k],
  });
  lookup({
    family: "hist2.speech", category: "history", rows: H.SPEECHES, stem: (r) => r[1][0], diff: (r) => r[3],
    text: ([s]) => [`Who gave ${s[0]}?`, `¿Quién pronunció ${s[1]}?`, `Wer hielt ${s[2]}?`],
    right: (r) => r[2], pool: Object.keys(H.SPEAKERS), label: (k) => H.SPEAKERS[k],
  });
  {
    const rows = H.QUOTES.filter((q) => H.SPEAKERS[q[1]]);
    lookup({
      family: "hist2.quote", category: "history", rows, stem: (r) => r[0][0], diff: (r) => r[2],
      text: ([q]) => [`Who is famous for saying “${q[0]}”?`, `¿A quién se atribuye la frase «${q[1]}»?`, `Von wem stammt der berühmte Ausspruch „${q[2]}“?`],
      right: (r) => r[1], pool: [...new Set([...rows.map((r) => r[1]), ...H.QUOTE_DECOYS.filter((k) => H.SPEAKERS[k])])], label: (k) => H.SPEAKERS[k],
    });
  }
  lookup({
    family: "hist2.activist", category: "history", rows: H.ACTIVISTS, stem: (r) => r[0][0], diff: (r) => r[3],
    text: ([, d]) => [`Who ${low(d[0])}?`, `¿Quién ${low(d[1])}?`, `Wer ${low(d[2])}?`],
    right: (r) => r[0], pool: H.ACTIVISTS.map((r) => r[0]), label: (l) => l,
    ok: (r, p) => { const o = H.ACTIVISTS.find((x) => x[0][0] === p[0])!; return !r[2] || o[2] !== r[2]; },
  });
  lookup({
    family: "hist2.archaeologist", category: "history", rows: H.ARCHAEOLOGISTS, stem: (r) => r[0][0], diff: (r) => r[3],
    text: ([, d]) => [`Who ${low(d[0])}?`, `¿Quién ${low(d[1])}?`, `Wer ${low(d[2])}?`],
    right: (r) => r[0], pool: H.ARCHAEOLOGISTS.map((r) => r[0]), label: (l) => l,
  });
  lookup({
    family: "hist2.revolution-leader", category: "history", rows: H.REVOLUTIONS, stem: (r) => r[0], diff: (r) => r[5],
    text: ([en, es, , dat]) => [`Who led ${en}?`, `¿Quién encabezó ${es}?`, `Wer war die führende Figur bei ${dat}?`],
    right: (r) => r[4], pool: H.REVOLUTIONS.map((r) => r[4]), label: (l) => l,
  });
  {
    const rows = H.NOBEL_PEACE.filter((r) => has(r[1]));
    lookup({
      family: "hist2.nobel-peace-country", category: "history", rows, stem: (r) => r[0], diff: (r) => r[4],
      text: ([n, , f]) => f
        ? [`Which country is Nobel Peace Prize winner ${n} from?`, `¿De qué país es la premio Nobel de la Paz ${n}?`, `Aus welchem Land stammt die Friedensnobelpreisträgerin ${n}?`]
        : [`Which country is Nobel Peace Prize winner ${n} from?`, `¿De qué país es el premio Nobel de la Paz ${n}?`, `Aus welchem Land stammt der Friedensnobelpreisträger ${n}?`],
      right: (r) => r[1], pool: [...new Set([...rows.map((r) => r[1]), ...H.NOBEL_POOL.filter(has)])], label: cname, ok: (r, c) => !r[3].includes(c),
    });
  }
  groupYesNo("hist2.nobel-won", "history", 50, H.NOBEL_WON, H.NOBEL_NEVER, "hard",
    ["Which of these people won the Nobel Peace Prize?", "¿Cuál de estas personas ganó el Nobel de la Paz?", "Wer von diesen Menschen erhielt den Friedensnobelpreis?"]);
  groupYesNo("hist2.nobel-never", "history", 50, H.NOBEL_NEVER, H.NOBEL_WON, "hard",
    ["Which of these famous people never won the Nobel Peace Prize?", "¿Cuál de estas personas famosas nunca ganó el Nobel de la Paz?", "Wer von diesen berühmten Menschen erhielt nie den Friedensnobelpreis?"]);
  {
    const docs = H.DOCUMENTS.filter((r) => has(r[3]));
    lookup({
      family: "hist2.document", category: "history", rows: docs, stem: (r) => r[0], diff: (r) => r[4],
      text: ([en, es, de]) => [`Which present-day country does ${en} come from?`, `¿De qué país actual procede ${es}?`, `Aus welchem heutigen Land stammt ${de}?`],
      right: (r) => r[3], pool: [...new Set([...docs.map((r) => r[3]), ...H.DOC_POOL.filter(has)])], label: cname,
    });
    const finds = H.FINDS.filter((r) => has(r[3]));
    lookup({
      family: "hist2.find", category: "history", rows: finds, stem: (r) => r[0], diff: (r) => r[5],
      text: ([en, es, de, , pl]) => [`In which present-day country ${pl[0] ? "were" : "was"} ${en} found?`, `¿En qué país actual se ${pl[1] ? "hallaron" : "halló"} ${es}?`, `In welchem heutigen Land ${pl[2] ? "wurden" : "wurde"} ${de} gefunden?`],
      right: (r) => r[3], pool: [...new Set([...finds.map((r) => r[3]), ...H.FIND_POOL.filter(has)])], label: cname,
    });
  }
  lookup({
    family: "hist2.trade-route", category: "history", rows: H.ROUTES, stem: (r) => r.label[0], diff: (r) => r.d,
    text: (r) => [`Which historic trade route ${low(r.clue[0])}?`, `¿Qué ruta comercial histórica ${low(r.clue[1])}?`, `Welche historische Handelsroute ${low(r.clue[2])}?`],
    right: (r) => r.label, pool: H.ROUTES.map((r) => r.label), label: (l) => l,
  });
  lookup({
    family: "hist2.civ-river", category: "history", rows: H.CIV_RIVERS, stem: (r) => r[1][0], diff: (r) => r[5],
    text: ([c]) => [`Along which river did ${c[0]} develop?`, `¿Junto a qué río se desarrolló ${c[1]}?`, `An welchem Fluss entwickelte sich ${c[2]}?`],
    right: (r) => r[2], pool: Object.keys(H.RIVERS2), label: (k) => H.RIVERS2[k].label, ok: (r, k) => !r[4].includes(k),
  });
  {
    const rows = H.SUFFRAGE.filter(([id]) => has(id)).map(([id, y]) => [...cname(id), y] as [string, string, string, number]);
    extremeOf({ family: "hist2.suffrage", category: "history", n: 50, rows, max: false, minGap: 3, diff: "hard",
      text: ["Which of these countries gave women the right to vote first?", "¿Cuál de estos países concedió primero el voto a las mujeres?", "Welches dieser Länder führte zuerst das Frauenwahlrecht ein?"] });
  }
}
