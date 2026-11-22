/**
 * Fact tables for the "geo." question families (see ./geography.ts).
 * Everything here is stable, well-established general knowledge. Where a fact is
 * shared (a lake on a border, a region split between countries…) the other
 * countries are listed so they are never offered as a wrong answer.
 */
type L = [string, string, string];
const s = (x: string): L => [x, x, x];

// ── coasts ──────────────────────────────────────────────────────────
/** Landlocked countries (Kazakhstan left out: the Caspian makes it debatable). */
export const LANDLOCKED = ["austria", "slovakia", "hungary", "czechia", "serbia", "belarus", "nepal", "afghanistan", "uzbekistan", "mongolia",
  "laos", "mali", "zimbabwe", "uganda", "rwanda", "botswana", "ethiopia", "bolivia", "paraguay"];
/** Coastal, but only barely or debatably — never used in landlocked questions. */
export const LANDLOCKED_TRICKY = ["kazakhstan", "dr_congo", "iraq", "jordan", "slovenia"];

/** [key, label, in-text (en "the Baltic Sea", es "el mar Báltico", de accusative after "an"), coast countries, also-touching (never wrong options), gulf?] */
export const SEAS: [string, L, L, string[], string[], boolean?][] = [
  ["med", ["Mediterranean Sea", "Mar Mediterráneo", "Mittelmeer"], ["the Mediterranean Sea", "el mar Mediterráneo", "das Mittelmeer"],
    ["spain", "france", "italy", "malta", "slovenia", "croatia", "albania", "greece", "turkey", "syria", "lebanon", "egypt", "libya", "algeria", "morocco"], ["uk"]],
  ["baltic", ["Baltic Sea", "Mar Báltico", "Ostsee"], ["the Baltic Sea", "el mar Báltico", "die Ostsee"],
    ["germany", "poland", "russia", "lithuania", "latvia", "estonia", "finland", "sweden", "denmark"], []],
  ["north", ["North Sea", "Mar del Norte", "Nordsee"], ["the North Sea", "el mar del Norte", "die Nordsee"],
    ["uk", "norway", "denmark", "germany", "netherlands", "belgium"], ["france", "sweden"]],
  ["black", ["Black Sea", "Mar Negro", "Schwarzes Meer"], ["the Black Sea", "el mar Negro", "das Schwarze Meer"],
    ["turkey", "bulgaria", "romania", "ukraine", "russia"], []],
  ["red", ["Red Sea", "Mar Rojo", "Rotes Meer"], ["the Red Sea", "el mar Rojo", "das Rote Meer"],
    ["egypt", "sudan", "saudi_arabia"], ["jordan"]],
  ["caribbean", ["Caribbean Sea", "Mar Caribe", "Karibisches Meer"], ["the Caribbean Sea", "el mar Caribe", "das Karibische Meer"],
    ["cuba", "jamaica", "haiti", "dominican_rep", "honduras", "nicaragua", "costa_rica", "colombia", "venezuela", "mexico"], ["usa", "uk", "france", "netherlands", "guyana"]],
  ["caspian", ["Caspian Sea", "Mar Caspio", "Kaspisches Meer"], ["the Caspian Sea", "el mar Caspio", "das Kaspische Meer"],
    ["russia", "kazakhstan", "iran"], []],
  ["adriatic", ["Adriatic Sea", "Mar Adriático", "Adriatisches Meer"], ["the Adriatic Sea", "el mar Adriático", "die Adria"],
    ["italy", "slovenia", "croatia", "albania"], ["greece"]],
  ["aegean", ["Aegean Sea", "Mar Egeo", "Ägäisches Meer"], ["the Aegean Sea", "el mar Egeo", "die Ägäis"],
    ["greece", "turkey"], []],
  ["persian", ["Persian Gulf", "Golfo Pérsico", "Persischer Golf"], ["the Persian Gulf", "el golfo Pérsico", "den Persischen Golf"],
    ["iran", "iraq", "saudi_arabia", "uae", "qatar"], [], true],
  ["gulf_mexico", ["Gulf of Mexico", "Golfo de México", "Golf von Mexiko"], ["the Gulf of Mexico", "el golfo de México", "den Golf von Mexiko"],
    ["usa", "mexico", "cuba"], [], true],
];

/** Countries made up entirely of islands. */
export const ISLAND_NATIONS = ["japan", "iceland", "malta", "sri_lanka", "philippines", "indonesia", "singapore", "cuba", "jamaica", "madagascar", "new_zealand", "fiji", "ireland", "uk"];
/** Neither clearly island nor clearly mainland for a quiz — never used. */
export const ISLAND_TRICKY = ["australia", "haiti", "dominican_rep", "png", "denmark", "malaysia", "greece", "italy"];

// ── lines on the map ────────────────────────────────────────────────
export const EQUATOR = ["ecuador", "colombia", "brazil", "dr_congo", "uganda", "kenya", "somalia", "indonesia"];
/** Close to the equator without touching it — left out so no one feels cheated. */
export const EQUATOR_NEAR = ["tanzania", "peru", "venezuela", "rwanda", "malaysia", "singapore", "cameroon", "ethiopia", "guyana", "png", "sri_lanka",
  "philippines", "nigeria", "ghana", "angola", "thailand", "costa_rica", "somalia", "uganda", "kenya", "vietnam", "cambodia", "senegal", "mali"];
/** Entirely in the Southern Hemisphere. */
export const SOUTHERN = ["australia", "new_zealand", "argentina", "chile", "uruguay", "paraguay", "bolivia", "south_africa", "namibia", "botswana",
  "zimbabwe", "mozambique", "madagascar", "angola", "fiji"];
/** Straddle the equator or lie just beside it — never used in hemisphere questions. */
export const HEMI_TRICKY = [...EQUATOR, "peru", "tanzania", "rwanda", "png", "malaysia", "singapore", "venezuela", "guyana"];

// ── on the road / online / on the phone ─────────────────────────────
export const DRIVE_LEFT = ["uk", "ireland", "malta", "japan", "india", "australia", "new_zealand", "south_africa", "thailand", "indonesia", "malaysia",
  "singapore", "pakistan", "bangladesh", "nepal", "sri_lanka", "kenya", "tanzania", "uganda", "zimbabwe", "mozambique", "namibia", "botswana",
  "jamaica", "guyana", "fiji", "png"];

export const TLD: Record<string, string> = {
  germany: ".de", france: ".fr", italy: ".it", spain: ".es", portugal: ".pt", uk: ".uk", ireland: ".ie", netherlands: ".nl", belgium: ".be",
  austria: ".at", poland: ".pl", czechia: ".cz", slovakia: ".sk", hungary: ".hu", romania: ".ro", bulgaria: ".bg", greece: ".gr", croatia: ".hr",
  serbia: ".rs", slovenia: ".si", sweden: ".se", norway: ".no", denmark: ".dk", finland: ".fi", iceland: ".is", ukraine: ".ua", russia: ".ru",
  estonia: ".ee", latvia: ".lv", lithuania: ".lt", belarus: ".by", albania: ".al", malta: ".mt",
  china: ".cn", india: ".in", japan: ".jp", south_korea: ".kr", vietnam: ".vn", thailand: ".th", indonesia: ".id", philippines: ".ph",
  malaysia: ".my", singapore: ".sg", pakistan: ".pk", bangladesh: ".bd", nepal: ".np", iran: ".ir", iraq: ".iq", saudi_arabia: ".sa",
  uae: ".ae", qatar: ".qa", jordan: ".jo", lebanon: ".lb", turkey: ".tr", kazakhstan: ".kz", mongolia: ".mn", sri_lanka: ".lk", cambodia: ".kh",
  egypt: ".eg", nigeria: ".ng", ethiopia: ".et", kenya: ".ke", tanzania: ".tz", south_africa: ".za", morocco: ".ma", algeria: ".dz", ghana: ".gh",
  senegal: ".sn", dr_congo: ".cd", angola: ".ao", uganda: ".ug", madagascar: ".mg", libya: ".ly", zimbabwe: ".zw", cameroon: ".cm", namibia: ".na",
  rwanda: ".rw", usa: ".us", canada: ".ca", mexico: ".mx", cuba: ".cu", jamaica: ".jm", costa_rica: ".cr", dominican_rep: ".do",
  brazil: ".br", argentina: ".ar", chile: ".cl", colombia: ".co", peru: ".pe", venezuela: ".ve", ecuador: ".ec", bolivia: ".bo", paraguay: ".py",
  uruguay: ".uy", australia: ".au", new_zealand: ".nz", fiji: ".fj",
};

export const CALLING: Record<string, number> = {
  uk: 44, france: 33, germany: 49, italy: 39, spain: 34, portugal: 351, netherlands: 31, belgium: 32, austria: 43, poland: 48, sweden: 46,
  norway: 47, denmark: 45, finland: 358, ireland: 353, greece: 30, hungary: 36, czechia: 420, russia: 7, turkey: 90, china: 86, japan: 81,
  south_korea: 82, india: 91, pakistan: 92, indonesia: 62, philippines: 63, thailand: 66, vietnam: 84, malaysia: 60, singapore: 65,
  australia: 61, new_zealand: 64, brazil: 55, argentina: 54, mexico: 52, colombia: 57, chile: 56, peru: 51, venezuela: 58, egypt: 20,
  south_africa: 27, nigeria: 234, kenya: 254, morocco: 212, iran: 98, saudi_arabia: 966, uae: 971, romania: 40, ukraine: 380, iceland: 354,
  cuba: 53, usa: 1,
};
/** Countries sharing a calling code with one in CALLING (never offered as wrong answers for it). */
export const CALLING_SHARED: Record<number, string[]> = { 1: ["canada", "jamaica", "dominican_rep"], 7: ["kazakhstan"] };

// ── nicknames & flags ───────────────────────────────────────────────
/** [en, es, de, country, never-wrong countries] */
export const COUNTRY_NICKNAMES: [string, string, string, string, string[]?][] = [
  ["the Land of the Rising Sun", "el país del sol naciente", "das Land der aufgehenden Sonne", "japan"],
  ["the Land of Smiles", "la tierra de las sonrisas", "das Land des Lächelns", "thailand"],
  ["the Land of the Midnight Sun", "la tierra del sol de medianoche", "das Land der Mitternachtssonne", "norway", ["sweden", "finland", "iceland", "russia", "canada", "usa", "denmark"]],
  ["the Emerald Isle", "la isla esmeralda", "die Grüne Insel", "ireland", ["uk"]],
  ["the Land of a Thousand Lakes", "el país de los mil lagos", "das Land der tausend Seen", "finland"],
  ["the Land of Fire and Ice", "la tierra de fuego y hielo", "das Land aus Feuer und Eis", "iceland"],
  ["the Land of the Long White Cloud", "la tierra de la gran nube blanca", "das Land der langen weißen Wolke", "new_zealand"],
  ["the Rainbow Nation", "la nación arcoíris", "die Regenbogennation", "south_africa"],
  ["the Middle Kingdom", "el Imperio del Medio", "das Reich der Mitte", "china"],
  ["Down Under", "Down Under", "Down Under", "australia", ["new_zealand"]],
  ["the Land of the Morning Calm", "el país de la calma matutina", "das Land der Morgenstille", "south_korea", ["north_korea"]],
  ["the Land of a Thousand Hills", "el país de las mil colinas", "das Land der tausend Hügel", "rwanda"],
  ["the Pearl of Africa", "la perla de África", "die Perle Afrikas", "uganda"],
  ["the Pearl of the Antilles", "la perla de las Antillas", "die Perle der Antillen", "cuba"],
  ["the Land of the Pharaohs", "la tierra de los faraones", "das Land der Pharaonen", "egypt", ["sudan"]],
  ["the Boot", "la bota", "der Stiefel", "italy"],
  ["the Hexagon", "el Hexágono", "das Hexagon", "france"],
  ["the Giant of Africa", "el gigante de África", "der Riese Afrikas", "nigeria"],
  ["the Land of the Eternal Blue Sky", "la tierra del eterno cielo azul", "das Land des ewigen blauen Himmels", "mongolia"],
  ["the Pearl of the Indian Ocean", "la perla del océano Índico", "die Perle des Indischen Ozeans", "sri_lanka", ["madagascar"]],
];

/** [en, es, de (accusative), country, never-wrong countries] */
export const FLAGS: [string, string, string, string, string[]?][] = [
  ["a maple leaf", "una hoja de arce", "ein Ahornblatt", "canada"],
  ["a single red disc on a white background", "un único círculo rojo sobre fondo blanco", "einen einzelnen roten Kreis auf weißem Grund", "japan", ["bangladesh"]],
  ["a red disc on a green background", "un círculo rojo sobre fondo verde", "einen roten Kreis auf grünem Grund", "bangladesh", ["japan"]],
  ["a cedar tree", "un cedro", "eine Zeder", "lebanon"],
  ["an AK-47 rifle", "un fusil AK-47", "ein Sturmgewehr AK-47", "mozambique"],
  ["an eagle eating a snake", "un águila devorando una serpiente", "einen Adler, der eine Schlange frisst", "mexico"],
  ["a black double-headed eagle", "un águila bicéfala negra", "einen schwarzen Doppeladler", "albania", ["serbia", "russia"]],
  ["a red and blue taegeuk with four black trigrams", "un taegeuk rojo y azul con cuatro trigramas negros", "ein rot-blaues Taegeuk mit vier schwarzen Trigrammen", "south_korea", ["north_korea", "mongolia"]],
  ["a lion holding a sword", "un león con una espada", "einen Löwen mit einem Schwert", "sri_lanka"],
  ["a temple with three towers", "un templo de tres torres", "einen Tempel mit drei Türmen", "cambodia"],
  ["a Maasai shield and two spears", "un escudo masái y dos lanzas", "einen Massai-Schild und zwei Speere", "kenya"],
  ["a blue globe full of stars", "un globo azul lleno de estrellas", "einen blauen Globus voller Sterne", "brazil"],
  ["a wheel with 24 spokes", "una rueda de 24 radios", "ein Rad mit 24 Speichen", "india"],
  ["a single yellow star on a red background", "una sola estrella amarilla sobre fondo rojo", "einen einzelnen gelben Stern auf rotem Grund", "vietnam", ["china"]],
  ["a black star", "una estrella negra", "einen schwarzen Stern", "ghana"],
  ["an armillary sphere", "una esfera armilar", "eine Armillarsphäre", "portugal"],
  ["a sword below Arabic writing", "una espada bajo una inscripción árabe", "ein Schwert unter arabischer Schrift", "saudi_arabia", ["iraq", "iran", "afghanistan"]],
  ["fifty white stars", "cincuenta estrellas blancas", "fünfzig weiße Sterne", "usa"],
  ["a golden eagle beneath a sun", "un águila dorada bajo un sol", "einen goldenen Adler unter einer Sonne", "kazakhstan"],
  ["a white crescent and star on red", "una media luna y una estrella blancas sobre fondo rojo", "einen weißen Halbmond mit Stern auf rotem Grund", "turkey", ["singapore", "pakistan", "algeria"]],
  ["a yellow diagonal cross", "una cruz diagonal amarilla", "ein gelbes Diagonalkreuz", "jamaica"],
  ["nine blue and white stripes", "nueve franjas azules y blancas", "neun blaue und weiße Streifen", "greece", ["uruguay"]],
];

// ── water ───────────────────────────────────────────────────────────
/** [en, es, de, country, shared with] — shared lakes get one row per country. */
export const LAKES: [string, string, string, string, string[]?][] = [
  ["Lake Baikal", "el lago Baikal", "der Baikalsee", "russia"],
  ["Loch Ness", "el lago Ness", "Loch Ness", "uk"],
  ["Lake Titicaca", "el lago Titicaca", "der Titicacasee", "peru", ["bolivia"]],
  ["Lake Titicaca", "el lago Titicaca", "der Titicacasee", "bolivia", ["peru"]],
  ["Lake Victoria", "el lago Victoria", "der Victoriasee", "uganda", ["kenya", "tanzania"]],
  ["Lake Victoria", "el lago Victoria", "der Victoriasee", "tanzania", ["kenya", "uganda"]],
  ["Lake Como", "el lago de Como", "der Comer See", "italy"],
  ["Lake Garda", "el lago de Garda", "der Gardasee", "italy"],
  ["Lake Balaton", "el lago Balaton", "der Plattensee", "hungary"],
  ["Lake Bled", "el lago Bled", "der Bleder See", "slovenia"],
  ["Lake Nasser", "el lago Nasser", "der Nassersee", "egypt", ["sudan"]],
  ["Lake Volta", "el lago Volta", "der Volta-Stausee", "ghana"],
  ["Lake Toba", "el lago Toba", "der Tobasee", "indonesia"],
  ["Lake Biwa", "el lago Biwa", "der Biwa-See", "japan"],
  ["Tonlé Sap", "el Tonlé Sap", "der Tonle Sap", "cambodia"],
  ["Inle Lake", "el lago Inle", "der Inle-See", "myanmar"],
  ["Lake Tahoe", "el lago Tahoe", "der Lake Tahoe", "usa"],
  ["the Great Salt Lake", "el Gran Lago Salado", "der Große Salzsee", "usa"],
  ["Lake Louise", "el lago Louise", "der Lake Louise", "canada"],
  ["Lake Winnipeg", "el lago Winnipeg", "der Winnipegsee", "canada"],
  ["Lake Superior", "el lago Superior", "der Obere See", "usa", ["canada"]],
  ["Lake Superior", "el lago Superior", "der Obere See", "canada", ["usa"]],
  ["Lake Maracaibo", "el lago de Maracaibo", "der Maracaibo-See", "venezuela"],
  ["Lake Taupō", "el lago Taupo", "der Lake Taupo", "new_zealand"],
  ["Lake Wakatipu", "el lago Wakatipu", "der Lake Wakatipu", "new_zealand"],
  ["Lake Eyre", "el lago Eyre", "der Eyresee", "australia"],
  ["Lake Vänern", "el lago Vänern", "der Vänern", "sweden"],
  ["Lake Ladoga", "el lago Ládoga", "der Ladogasee", "russia"],
  ["Lake Saimaa", "el lago Saimaa", "der Saimaa", "finland"],
  ["Lake Peipus", "el lago Peipus", "der Peipussee", "estonia", ["russia"]],
  ["Lake Neusiedl", "el lago Neusiedl", "der Neusiedler See", "austria", ["hungary"]],
  ["Lake Hallstatt", "el lago de Hallstatt", "der Hallstätter See", "austria"],
  ["the Königssee", "el lago Königssee", "der Königssee", "germany"],
  ["the Chiemsee", "el lago Chiemsee", "der Chiemsee", "germany"],
  ["Lake Kivu", "el lago Kivu", "der Kiwusee", "rwanda", ["dr_congo"]],
  ["Lake Turkana", "el lago Turkana", "der Turkana-See", "kenya", ["ethiopia"]],
  ["Lake Tanganyika", "el lago Tanganica", "der Tanganjikasee", "tanzania", ["dr_congo"]],
  ["Lake Van", "el lago Van", "der Vansee", "turkey"],
  ["Lake Urmia", "el lago Urmía", "der Urmiasee", "iran"],
  ["Lake Balkhash", "el lago Baljash", "der Balchaschsee", "kazakhstan"],
  ["Lake Khövsgöl", "el lago Khövsgöl", "der Chöwsgöl-See", "mongolia"],
  ["Lough Neagh", "el lago Neagh", "Lough Neagh", "uk", ["ireland"]],
  ["Windermere", "el lago Windermere", "der Windermere", "uk"],
  ["Lake Chapala", "el lago de Chapala", "der Chapalasee", "mexico"],
  ["Lake Llanquihue", "el lago Llanquihue", "der Llanquihue-See", "chile"],
  ["Lake Nahuel Huapi", "el lago Nahuel Huapi", "der Nahuel-Huapi-See", "argentina"],
];

/** Lake surface areas, thousand km² (Caspian left out: "lake or sea?"). */
export const LAKE_AREA: [string, string, string, number][] = [
  ["Lake Superior", "Lago Superior", "Oberer See", 82.1], ["Lake Victoria", "Lago Victoria", "Victoriasee", 68.9],
  ["Lake Huron", "Lago Hurón", "Huronsee", 59.6], ["Lake Michigan", "Lago Míchigan", "Michigansee", 58],
  ["Lake Tanganyika", "Lago Tanganica", "Tanganjikasee", 32.6], ["Lake Baikal", "Lago Baikal", "Baikalsee", 31.5],
  ["Great Bear Lake", "Gran Lago del Oso", "Großer Bärensee", 31.1], ["Lake Malawi", "Lago Malaui", "Malawisee", 29.6],
  ["Great Slave Lake", "Gran Lago del Esclavo", "Großer Sklavensee", 27.2], ["Lake Erie", "Lago Erie", "Eriesee", 25.7],
  ["Lake Winnipeg", "Lago Winnipeg", "Winnipegsee", 24.4], ["Lake Ontario", "Lago Ontario", "Ontariosee", 19],
  ["Lake Ladoga", "Lago Ládoga", "Ladogasee", 17.7], ["Lake Onega", "Lago Onega", "Onegasee", 9.7],
  ["Lake Titicaca", "Lago Titicaca", "Titicacasee", 8.4], ["Lake Nicaragua", "Lago de Nicaragua", "Nicaraguasee", 8.2],
  ["Lake Turkana", "Lago Turkana", "Turkana-See", 6.4], ["Lake Vänern", "Lago Vänern", "Vänern", 5.6],
  ["Lake Van", "Lago Van", "Vansee", 3.8], ["Lake Peipus", "Lago Peipus", "Peipussee", 3.6],
  ["Lake Toba", "Lago Toba", "Tobasee", 1.13], ["Lake Biwa", "Lago Biwa", "Biwa-See", 0.67],
  ["Lake Balaton", "Lago Balaton", "Plattensee", 0.59], ["Lake Tahoe", "Lago Tahoe", "Lake Tahoe", 0.49],
  ["Lake Garda", "Lago de Garda", "Gardasee", 0.37], ["Lake Como", "Lago de Como", "Comer See", 0.146],
  ["Chiemsee", "Lago Chiemsee", "Chiemsee", 0.08], ["Loch Ness", "Lago Ness", "Loch Ness", 0.056],
];

/** River lengths in km (systems with disputed lengths — Mississippi-Missouri, Ob-Irtysh… — left out). */
export const RIVER_LENGTH: [string, string, string, number][] = [
  ["Nile", "Nilo", "Nil", 6650], ["Amazon", "Amazonas", "Amazonas", 6400], ["Yangtze", "Yangtsé", "Jangtsekiang", 6300],
  ["Yellow River", "Río Amarillo", "Gelber Fluss", 5464], ["Paraná", "Paraná", "Paraná", 4880], ["Congo", "Congo", "Kongo", 4700],
  ["Lena", "Lena", "Lena", 4400], ["Mekong", "Mekong", "Mekong", 4350], ["Niger", "Níger", "Niger", 4180], ["Volga", "Volga", "Wolga", 3530],
  ["Yukon", "Yukón", "Yukon", 3190], ["Indus", "Indo", "Indus", 3180], ["Danube", "Danubio", "Donau", 2850], ["Euphrates", "Éufrates", "Euphrat", 2800],
  ["Zambezi", "Zambeze", "Sambesi", 2574], ["Ganges", "Ganges", "Ganges", 2525], ["Murray", "Murray", "Murray", 2508], ["Dnieper", "Dniéper", "Dnepr", 2200],
  ["Orinoco", "Orinoco", "Orinoco", 2140], ["Tigris", "Tigris", "Tigris", 1850], ["Limpopo", "Limpopo", "Limpopo", 1750], ["Rhine", "Rin", "Rhein", 1230],
  ["Elbe", "Elba", "Elbe", 1094], ["Vistula", "Vístula", "Weichsel", 1047], ["Loire", "Loira", "Loire", 1006], ["Tagus", "Tajo", "Tajo", 1007],
  ["Ebro", "Ebro", "Ebro", 930], ["Seine", "Sena", "Seine", 777], ["Po", "Po", "Po", 652], ["Hudson", "Hudson", "Hudson", 507],
  ["Tiber", "Tíber", "Tiber", 406], ["Thames", "Támesis", "Themse", 346],
];

/** [en, es, de (with article, nominative), country, shared with] */
export const WATERFALLS: [string, string, string, string, string[]?][] = [
  ["Niagara Falls", "las cataratas del Niágara", "die Niagarafälle", "canada", ["usa"]],
  ["Niagara Falls", "las cataratas del Niágara", "die Niagarafälle", "usa", ["canada"]],
  ["Victoria Falls", "las cataratas Victoria", "die Victoriafälle", "zimbabwe"],
  ["Iguazú Falls", "las cataratas del Iguazú", "die Iguazú-Wasserfälle", "argentina", ["brazil"]],
  ["Iguazú Falls", "las cataratas del Iguazú", "die Iguazú-Wasserfälle", "brazil", ["argentina"]],
  ["Angel Falls", "el Salto Ángel", "den Salto Ángel", "venezuela"],
  ["Gullfoss", "Gullfoss", "den Gullfoss", "iceland"],
  ["Skógafoss", "Skógafoss", "den Skógafoss", "iceland"],
  ["Dettifoss", "Dettifoss", "den Dettifoss", "iceland"],
  ["Kaieteur Falls", "las cataratas Kaieteur", "die Kaieteurfälle", "guyana"],
  ["the Krimml Waterfalls", "las cataratas de Krimml", "die Krimmler Wasserfälle", "austria"],
  ["the Triberg Waterfalls", "las cascadas de Triberg", "die Triberger Wasserfälle", "germany"],
  ["the Seven Sisters waterfall", "la cascada de las Siete Hermanas", "den Wasserfall Sieben Schwestern", "norway"],
  ["Vøringsfossen", "Vøringsfossen", "den Vøringsfossen", "norway"],
  ["Sutherland Falls", "las cataratas Sutherland", "die Sutherland Falls", "new_zealand"],
  ["the Blue Nile Falls", "las cataratas del Nilo Azul", "die Wasserfälle des Blauen Nils", "ethiopia"],
  ["Murchison Falls", "las cataratas Murchison", "die Murchison Falls", "uganda"],
  ["Tugela Falls", "las cataratas Tugela", "die Tugela-Fälle", "south_africa"],
  ["Kegon Falls", "la cascada Kegon", "den Kegon-Wasserfall", "japan"],
  ["Huangguoshu Waterfall", "la cascada de Huangguoshu", "den Huangguoshu-Wasserfall", "china"],
  ["Gocta Falls", "la catarata de Gocta", "den Gocta-Wasserfall", "peru"],
  ["Yosemite Falls", "las cataratas de Yosemite", "die Yosemite Falls", "usa"],
  ["Montmorency Falls", "las cataratas Montmorency", "die Montmorency-Fälle", "canada"],
  ["Kuang Si Falls", "las cascadas de Kuang Si", "die Kuang-Si-Wasserfälle", "laos"],
  ["Erawan Falls", "las cascadas de Erawan", "die Erawan-Wasserfälle", "thailand"],
  ["the Marmore Falls", "la cascada de las Mármoles", "die Marmore-Wasserfälle", "italy"],
  ["Ouzoud Falls", "las cascadas de Ouzoud", "die Ouzoud-Wasserfälle", "morocco"],
];

/** Bodies of water used in strait questions. */
export const WATERS: Record<string, L> = {
  atlantic: ["Atlantic Ocean", "océano Atlántico", "Atlantik"], pacific: ["Pacific Ocean", "océano Pacífico", "Pazifik"],
  arctic: ["Arctic Ocean", "océano Ártico", "Arktischer Ozean"], med: ["Mediterranean Sea", "mar Mediterráneo", "Mittelmeer"],
  black: ["Black Sea", "mar Negro", "Schwarzes Meer"], marmara: ["Sea of Marmara", "mar de Mármara", "Marmarameer"],
  aegean: ["Aegean Sea", "mar Egeo", "Ägäis"], red: ["Red Sea", "mar Rojo", "Rotes Meer"], persian: ["Persian Gulf", "golfo Pérsico", "Persischer Golf"],
  oman: ["Gulf of Oman", "golfo de Omán", "Golf von Oman"], aden: ["Gulf of Aden", "golfo de Adén", "Golf von Aden"],
  north: ["North Sea", "mar del Norte", "Nordsee"], azov: ["Sea of Azov", "mar de Azov", "Asowsches Meer"],
  adriatic: ["Adriatic Sea", "mar Adriático", "Adria"], ionian: ["Ionian Sea", "mar Jónico", "Ionisches Meer"],
  tyrrhenian: ["Tyrrhenian Sea", "mar Tirreno", "Tyrrhenisches Meer"], channel: ["English Channel", "canal de la Mancha", "Ärmelkanal"],
};
/** [en, es, de, plural?, water a, water b] */
export const STRAIT_LINKS: [string, string, string, boolean, string, string][] = [
  ["the Strait of Gibraltar", "el estrecho de Gibraltar", "die Straße von Gibraltar", false, "atlantic", "med"],
  ["the Bosphorus", "el Bósforo", "der Bosporus", false, "black", "marmara"],
  ["the Dardanelles", "los Dardanelos", "die Dardanellen", true, "marmara", "aegean"],
  ["the Suez Canal", "el canal de Suez", "der Sueskanal", false, "med", "red"],
  ["the Panama Canal", "el canal de Panamá", "der Panamakanal", false, "atlantic", "pacific"],
  ["the Bering Strait", "el estrecho de Bering", "die Beringstraße", false, "pacific", "arctic"],
  ["the Strait of Hormuz", "el estrecho de Ormuz", "die Straße von Hormus", false, "persian", "oman"],
  ["the Bab-el-Mandeb strait", "el estrecho de Bab el-Mandeb", "die Meerenge Bab al-Mandab", false, "red", "aden"],
  ["the English Channel", "el canal de la Mancha", "der Ärmelkanal", false, "atlantic", "north"],
  ["the Strait of Magellan", "el estrecho de Magallanes", "die Magellanstraße", false, "atlantic", "pacific"],
  ["the Kerch Strait", "el estrecho de Kerch", "die Straße von Kertsch", false, "black", "azov"],
  ["the Strait of Otranto", "el canal de Otranto", "die Straße von Otranto", false, "adriatic", "ionian"],
  ["the Strait of Messina", "el estrecho de Mesina", "die Straße von Messina", false, "tyrrhenian", "ionian"],
  ["the Strait of Dover", "el estrecho de Dover", "die Straße von Dover", false, "channel", "north"],
];
/** [en, es, de (dative after "an": "der Straße…" / "dem Ärmelkanal"), side a, side b] — sides are country ids or an L for non-listed lands. */
export const STRAIT_SIDES: [string, string, string, string | L, string | L][] = [
  ["the Strait of Gibraltar", "el estrecho de Gibraltar", "der Straße von Gibraltar", "spain", "morocco"],
  ["the Bering Strait", "el estrecho de Bering", "der Beringstraße", "russia", "usa"],
  ["the English Channel", "el canal de la Mancha", "dem Ärmelkanal", ["England", "Inglaterra", "England"], "france"],
  ["the Palk Strait", "el estrecho de Palk", "der Palkstraße", "india", "sri_lanka"],
  ["the Korea Strait", "el estrecho de Corea", "der Koreastraße", "south_korea", "japan"],
  ["the Øresund", "el Øresund", "dem Öresund", "denmark", "sweden"],
  ["the Strait of Malacca", "el estrecho de Malaca", "der Straße von Malakka", "malaysia", "indonesia"],
  ["the Strait of Hormuz", "el estrecho de Ormuz", "der Straße von Hormus", "iran", ["Oman", "Omán", "Oman"]],
  ["the Straits of Florida", "el estrecho de Florida", "der Floridastraße", "usa", "cuba"],
  ["the Torres Strait", "el estrecho de Torres", "der Torres-Straße", "australia", "png"],
  ["the Strait of Otranto", "el canal de Otranto", "der Straße von Otranto", "italy", "albania"],
  ["the Strait of Sicily", "el canal de Sicilia", "der Straße von Sizilien", "italy", ["Tunisia", "Túnez", "Tunesien"]],
  ["the La Pérouse Strait", "el estrecho de La Pérouse", "der La-Pérouse-Straße", "russia", "japan"],
  ["the Strait of Juan de Fuca", "el estrecho de Juan de Fuca", "der Juan-de-Fuca-Straße", "usa", "canada"],
  ["the Singapore Strait", "el estrecho de Singapur", "der Singapurstraße", "singapore", "indonesia"],
];

// ── land ────────────────────────────────────────────────────────────
/** Island areas, thousand km². */
export const ISLAND_AREA: [string, string, string, number][] = [
  ["Greenland", "Groenlandia", "Grönland", 2130], ["New Guinea", "Nueva Guinea", "Neuguinea", 786], ["Borneo", "Borneo", "Borneo", 743],
  ["Madagascar", "Madagascar", "Madagaskar", 587], ["Baffin Island", "Isla de Baffin", "Baffininsel", 507], ["Sumatra", "Sumatra", "Sumatra", 450],
  ["Honshu", "Honshu", "Honshū", 228], ["Great Britain", "Gran Bretaña", "Großbritannien", 209], ["Sulawesi", "Célebes", "Sulawesi", 180],
  ["South Island (New Zealand)", "Isla Sur (Nueva Zelanda)", "Südinsel (Neuseeland)", 150], ["Java", "Java", "Java", 129],
  ["North Island (New Zealand)", "Isla Norte (Nueva Zelanda)", "Nordinsel (Neuseeland)", 114], ["Luzon", "Luzón", "Luzon", 110],
  ["Newfoundland", "Terranova", "Neufundland", 108], ["Cuba", "Cuba", "Kuba", 105], ["Iceland", "Islandia", "Island", 101], ["Mindanao", "Mindanao", "Mindanao", 97],
  ["Ireland", "Irlanda", "Irland", 84], ["Hokkaido", "Hokkaido", "Hokkaidō", 78], ["Hispaniola", "La Española", "Hispaniola", 76], ["Sakhalin", "Sajalín", "Sachalin", 72],
  ["Sri Lanka", "Sri Lanka", "Sri Lanka", 65], ["Taiwan", "Taiwán", "Taiwan", 36], ["Vancouver Island", "Isla de Vancouver", "Vancouver Island", 31.3],
  ["Sicily", "Sicilia", "Sizilien", 25.7], ["Sardinia", "Cerdeña", "Sardinien", 24.1], ["Jamaica", "Jamaica", "Jamaika", 11],
  ["Cyprus", "Chipre", "Zypern", 9.25], ["Corsica", "Córcega", "Korsika", 8.7], ["Crete", "Creta", "Kreta", 8.3], ["Bali", "Bali", "Bali", 5.8],
  ["Mallorca", "Mallorca", "Mallorca", 3.6], ["Gotland", "Gotland", "Gotland", 3], ["Tenerife", "Tenerife", "Teneriffa", 2.03],
  ["Rhodes", "Rodas", "Rhodos", 1.4], ["Ibiza", "Ibiza", "Ibiza", 0.57], ["Santorini", "Santorini", "Santorin", 0.076],
];

/** Mountain heights in metres. */
export const PEAK_HEIGHT: [string, string, string, number][] = [
  ["Mount Everest", "Everest", "Mount Everest", 8849], ["K2", "K2", "K2", 8611], ["Kangchenjunga", "Kanchenjunga", "Kangchendzönga", 8586],
  ["Annapurna", "Annapurna", "Annapurna", 8091], ["Aconcagua", "Aconcagua", "Aconcagua", 6961], ["Chimborazo", "Chimborazo", "Chimborazo", 6263],
  ["Denali", "Denali", "Denali", 6190], ["Kilimanjaro", "Kilimanjaro", "Kilimandscharo", 5895], ["Cotopaxi", "Cotopaxi", "Cotopaxi", 5897],
  ["Mount Elbrus", "Elbrus", "Elbrus", 5642], ["Pico de Orizaba", "Pico de Orizaba", "Pico de Orizaba", 5636], ["Popocatépetl", "Popocatépetl", "Popocatépetl", 5426],
  ["Mount Kenya", "Monte Kenia", "Mount Kenya", 5199], ["Mount Ararat", "Monte Ararat", "Ararat", 5137], ["Mont Blanc", "Mont Blanc", "Montblanc", 4806],
  ["Mount Whitney", "Monte Whitney", "Mount Whitney", 4421], ["Mount Rainier", "Monte Rainier", "Mount Rainier", 4392],
  ["Mount Kinabalu", "Monte Kinabalu", "Kinabalu", 4095], ["Grossglockner", "Grossglockner", "Großglockner", 3798], ["Mount Fuji", "Monte Fuji", "Fuji", 3776],
  ["Aoraki / Mount Cook", "Aoraki / monte Cook", "Aoraki / Mount Cook", 3724], ["Mount Teide", "Teide", "Teide", 3715], ["Mount Etna", "Etna", "Ätna", 3357],
  ["Zugspitze", "Zugspitze", "Zugspitze", 2962], ["Mount Olympus", "Monte Olimpo", "Olymp", 2918], ["Triglav", "Triglav", "Triglav", 2864],
  ["Galdhøpiggen", "Galdhøpiggen", "Galdhøpiggen", 2469], ["Mount Sinai", "Monte Sinaí", "Berg Sinai", 2285], ["Mount Kosciuszko", "Monte Kosciuszko", "Mount Kosciuszko", 2228],
  ["Ben Nevis", "Ben Nevis", "Ben Nevis", 1345], ["Vesuvius", "Vesubio", "Vesuv", 1281], ["Table Mountain", "Montaña de la Mesa", "Tafelberg", 1085],
  ["Sugarloaf Mountain", "Pan de Azúcar", "Zuckerhut", 396],
];

/** Volcanoes vs. mountains that are clearly not volcanoes (debatable ones such as Mount Kenya, Aconcagua and Ben Nevis left out). */
export const VOLCANOES: L[] = [
  ["Mount Etna", "Etna", "Ätna"], ["Vesuvius", "Vesubio", "Vesuv"], ["Mount Fuji", "Monte Fuji", "Fuji"], ["Kilimanjaro", "Kilimanjaro", "Kilimandscharo"],
  ["Mount Teide", "Teide", "Teide"], ["Popocatépetl", "Popocatépetl", "Popocatépetl"], ["Cotopaxi", "Cotopaxi", "Cotopaxi"], ["Krakatoa", "Krakatoa", "Krakatau"],
  ["Mount Pinatubo", "Monte Pinatubo", "Pinatubo"], ["Mount St. Helens", "Monte Santa Helena", "Mount St. Helens"], ["Mauna Loa", "Mauna Loa", "Mauna Loa"],
  ["Stromboli", "Estrómboli", "Stromboli"], ["Hekla", "Hekla", "Hekla"], ["Eyjafjallajökull", "Eyjafjallajökull", "Eyjafjallajökull"],
  ["Mount Rainier", "Monte Rainier", "Mount Rainier"], ["Mount Elbrus", "Elbrus", "Elbrus"], ["Mount Ararat", "Monte Ararat", "Ararat"],
  ["Chimborazo", "Chimborazo", "Chimborazo"], ["Pico de Orizaba", "Pico de Orizaba", "Pico de Orizaba"], ["Mount Erebus", "Monte Erebus", "Mount Erebus"],
  ["Mount Merapi", "Monte Merapi", "Merapi"], ["Kīlauea", "Kilauea", "Kīlauea"],
];
export const NOT_VOLCANOES: L[] = [
  ["Mount Everest", "Everest", "Mount Everest"], ["K2", "K2", "K2"], ["Mont Blanc", "Mont Blanc", "Montblanc"], ["Zugspitze", "Zugspitze", "Zugspitze"],
  ["Table Mountain", "Montaña de la Mesa", "Tafelberg"], ["Uluru", "Uluru", "Uluru"], ["Mount Olympus", "Monte Olimpo", "Olymp"], ["Denali", "Denali", "Denali"],
  ["Mount Kosciuszko", "Monte Kosciuszko", "Mount Kosciuszko"], ["Annapurna", "Annapurna", "Annapurna"], ["Sugarloaf Mountain", "Pan de Azúcar", "Zuckerhut"],
  ["Grossglockner", "Grossglockner", "Großglockner"], ["Galdhøpiggen", "Galdhøpiggen", "Galdhøpiggen"], ["Aoraki / Mount Cook", "Aoraki / monte Cook", "Aoraki / Mount Cook"],
  ["Kangchenjunga", "Kanchenjunga", "Kangchendzönga"], ["Mount Whitney", "Monte Whitney", "Mount Whitney"], ["Mont Ventoux", "Mont Ventoux", "Mont Ventoux"],
  ["Mount Kinabalu", "Monte Kinabalu", "Kinabalu"], ["Triglav", "Triglav", "Triglav"], ["Mount Sinai", "Monte Sinaí", "Berg Sinai"],
];

/** Highest mountain per continent: [en "Africa", es "de África", de genitive "Afrikas", peak, never-wrong peaks]. */
export const CONTINENT_PEAKS: [string, string, string, L, L[]][] = [
  ["Africa", "de África", "Afrikas", ["Kilimanjaro", "Kilimanjaro", "Kilimandscharo"], []],
  ["Asia", "de Asia", "Asiens", ["Mount Everest", "Everest", "Mount Everest"], []],
  ["South America", "de América del Sur", "Südamerikas", ["Aconcagua", "Aconcagua", "Aconcagua"], []],
  ["North America", "de América del Norte", "Nordamerikas", ["Denali", "Denali", "Denali"], []],
  ["Europe", "de Europa", "Europas", ["Mount Elbrus", "Elbrus", "Elbrus"], [["Mont Blanc", "Mont Blanc", "Montblanc"]]],
  ["Antarctica", "de la Antártida", "der Antarktis", ["Mount Vinson", "Macizo Vinson", "Mount Vinson"], []],
  ["mainland Australia", "de Australia continental", "des australischen Festlands", ["Mount Kosciuszko", "Monte Kosciuszko", "Mount Kosciuszko"], []],
];
export const PEAK_POOL: L[] = [
  ["Mount Everest", "Everest", "Mount Everest"], ["K2", "K2", "K2"], ["Kilimanjaro", "Kilimanjaro", "Kilimandscharo"], ["Mount Kenya", "Monte Kenia", "Mount Kenya"],
  ["Aconcagua", "Aconcagua", "Aconcagua"], ["Chimborazo", "Chimborazo", "Chimborazo"], ["Denali", "Denali", "Denali"], ["Mount Whitney", "Monte Whitney", "Mount Whitney"],
  ["Mont Blanc", "Mont Blanc", "Montblanc"], ["Mount Elbrus", "Elbrus", "Elbrus"], ["Mount Vinson", "Macizo Vinson", "Mount Vinson"],
  ["Mount Kosciuszko", "Monte Kosciuszko", "Mount Kosciuszko"], ["Aoraki / Mount Cook", "Aoraki / monte Cook", "Aoraki / Mount Cook"],
  ["Mount Fuji", "Monte Fuji", "Fuji"], ["Zugspitze", "Zugspitze", "Zugspitze"], ["Cotopaxi", "Cotopaxi", "Cotopaxi"],
  ["Pico de Orizaba", "Pico de Orizaba", "Pico de Orizaba"], ["Table Mountain", "Montaña de la Mesa", "Tafelberg"], ["Mount Ararat", "Monte Ararat", "Ararat"],
];

/** Total number of land neighbours (only countries whose count is undisputed). */
export const NEIGHBOUR_COUNT: Record<string, number> = {
  china: 14, russia: 14, brazil: 10, germany: 9, dr_congo: 9, austria: 8, tanzania: 8, turkey: 8, hungary: 7, poland: 7, ukraine: 7, sudan: 7,
  mali: 7, saudi_arabia: 7, iran: 7, afghanistan: 6, iraq: 6, italy: 6, ethiopia: 6, south_africa: 6, mozambique: 6, libya: 6, cameroon: 6,
  peru: 5, bolivia: 5, argentina: 5, colombia: 5, kazakhstan: 5, kenya: 5, uganda: 5, laos: 5, myanmar: 5, belarus: 5, romania: 5, bulgaria: 5,
  croatia: 5, slovakia: 5, uzbekistan: 5, syria: 5, senegal: 5, czechia: 4, greece: 4, pakistan: 4, nigeria: 4, thailand: 4, belgium: 4,
  lithuania: 4, latvia: 4, slovenia: 4, rwanda: 4, zimbabwe: 4, botswana: 4, namibia: 4, angola: 4, mexico: 3, norway: 3, finland: 3,
  vietnam: 3, cambodia: 3, malaysia: 3, chile: 3, paraguay: 3, venezuela: 3, guyana: 3, ghana: 3, somalia: 3, honduras: 3, north_korea: 3,
  indonesia: 3, usa: 2, sweden: 2, mongolia: 2, uruguay: 2, ecuador: 2, nepal: 2, bangladesh: 2, estonia: 2, lebanon: 2, uae: 2,
  costa_rica: 2, nicaragua: 2, portugal: 1, ireland: 1, south_korea: 1, haiti: 1, dominican_rep: 1, qatar: 1, png: 1,
  japan: 0, iceland: 0, australia: 0, new_zealand: 0, sri_lanka: 0, philippines: 0, madagascar: 0, cuba: 0, jamaica: 0, malta: 0, fiji: 0,
};

/** [en, es, de, country, never-wrong countries] */
export const REGIONS: [string, string, string, string, string[]?][] = [
  ["Bavaria", "Baviera", "Bayern", "germany"], ["Saxony", "Sajonia", "Sachsen", "germany"], ["Westphalia", "Westfalia", "Westfalen", "germany"],
  ["the Black Forest", "la Selva Negra", "der Schwarzwald", "germany"],
  ["Andalusia", "Andalucía", "Andalusien", "spain"], ["Catalonia", "Cataluña", "Katalonien", "spain"], ["Castile", "Castilla", "Kastilien", "spain"],
  ["Extremadura", "Extremadura", "Extremadura", "spain"],
  ["Tuscany", "la Toscana", "die Toskana", "italy"], ["Lombardy", "Lombardía", "die Lombardei", "italy"], ["Piedmont", "el Piamonte", "das Piemont", "italy"],
  ["Apulia", "Apulia", "Apulien", "italy"], ["Calabria", "Calabria", "Kalabrien", "italy"],
  ["Provence", "la Provenza", "die Provence", "france"], ["Brittany", "la Bretaña", "die Bretagne", "france"], ["Normandy", "Normandía", "die Normandie", "france"],
  ["Alsace", "Alsacia", "das Elsass", "france"], ["Burgundy", "Borgoña", "Burgund", "france"], ["Champagne", "la Champaña", "die Champagne", "france"],
  ["Scotland", "Escocia", "Schottland", "uk"], ["Wales", "Gales", "Wales", "uk"], ["Cornwall", "Cornualles", "Cornwall", "uk"], ["Yorkshire", "Yorkshire", "Yorkshire", "uk"],
  ["the Scottish Highlands", "las Tierras Altas de Escocia", "die Schottischen Highlands", "uk"],
  ["Flanders", "Flandes", "Flandern", "belgium", ["france", "netherlands"]], ["Wallonia", "Valonia", "Wallonien", "belgium"],
  ["Transylvania", "Transilvania", "Siebenbürgen", "romania"], ["Bohemia", "Bohemia", "Böhmen", "czechia"], ["Moravia", "Moravia", "Mähren", "czechia"],
  ["Dalmatia", "Dalmacia", "Dalmatien", "croatia"], ["the Algarve", "el Algarve", "die Algarve", "portugal"], ["the Alentejo", "el Alentejo", "der Alentejo", "portugal"],
  ["the Peloponnese", "el Peloponeso", "die Peloponnes", "greece"], ["Carinthia", "Carintia", "Kärnten", "austria", ["slovenia"]],
  ["Styria", "Estiria", "die Steiermark", "austria", ["slovenia"]], ["Masuria", "Masuria", "Masuren", "poland"],
  ["Siberia", "Siberia", "Sibirien", "russia"], ["Anatolia", "Anatolia", "Anatolien", "turkey"], ["Cappadocia", "Capadocia", "Kappadokien", "turkey"],
  ["Texas", "Texas", "Texas", "usa"], ["California", "California", "Kalifornien", "usa"], ["Quebec", "Quebec", "Québec", "canada"],
  ["Ontario", "Ontario", "Ontario", "canada"], ["Queensland", "Queensland", "Queensland", "australia"], ["the Outback", "el Outback", "das Outback", "australia"],
  ["Bahia", "Bahía", "Bahia", "brazil"], ["Jalisco", "Jalisco", "Jalisco", "mexico"], ["Kerala", "Kerala", "Kerala", "india"],
  ["Rajasthan", "Rajastán", "Rajasthan", "india"], ["Goa", "Goa", "Goa", "india"], ["Sichuan", "Sichuan", "Sichuan", "china"],
  ["the Western Cape", "el Cabo Occidental", "das Westkap", "south_africa"], ["KwaZulu-Natal", "KwaZulu-Natal", "KwaZulu-Natal", "south_africa"],
];

// ── cities ──────────────────────────────────────────────────────────
export const CITY: Record<string, L> = {
  nyc: ["New York", "Nueva York", "New York"], la: ["Los Angeles", "Los Ángeles", "Los Angeles"], nola: ["New Orleans", "Nueva Orleans", "New Orleans"],
  sf: ["San Francisco", "San Francisco", "San Francisco"], dc: ["Washington, D.C.", "Washington D. C.", "Washington, D.C."], chicago: s("Chicago"),
  vegas: s("Las Vegas"), detroit: s("Detroit"), philly: ["Philadelphia", "Filadelfia", "Philadelphia"], denver: s("Denver"), seattle: s("Seattle"),
  boston: s("Boston"), atlanta: s("Atlanta"), toronto: s("Toronto"), montreal: s("Montreal"), mexico_city: ["Mexico City", "Ciudad de México", "Mexiko-Stadt"],
  moscow: ["Moscow", "Moscú", "Moskau"], stpete: ["Saint Petersburg", "San Petersburgo", "Sankt Petersburg"], beijing: ["Beijing", "Pekín", "Peking"],
  shanghai: ["Shanghai", "Shanghái", "Shanghai"], tokyo: ["Tokyo", "Tokio", "Tokio"], osaka: s("Osaka"), seoul: ["Seoul", "Seúl", "Seoul"],
  london: ["London", "Londres", "London"], edinburgh: ["Edinburgh", "Edimburgo", "Edinburgh"], dublin: ["Dublin", "Dublín", "Dublin"],
  liverpool: s("Liverpool"), paris: ["Paris", "París", "Paris"], barcelona: s("Barcelona"), madrid: s("Madrid"), seville: ["Seville", "Sevilla", "Sevilla"],
  venice: ["Venice", "Venecia", "Venedig"], rome: ["Rome", "Roma", "Rom"], siena: s("Siena"), florence: ["Florence", "Florencia", "Florenz"],
  milan: ["Milan", "Milán", "Mailand"], prague: ["Prague", "Praga", "Prag"], berlin: ["Berlin", "Berlín", "Berlin"], munich: ["Munich", "Múnich", "München"],
  hamburg: ["Hamburg", "Hamburgo", "Hamburg"], dusseldorf: s("Düsseldorf"), cologne: ["Cologne", "Colonia", "Köln"], frankfurt: ["Frankfurt", "Fráncfort", "Frankfurt"],
  dresden: ["Dresden", "Dresde", "Dresden"], brussels: ["Brussels", "Bruselas", "Brüssel"], amsterdam: ["Amsterdam", "Ámsterdam", "Amsterdam"],
  copenhagen: ["Copenhagen", "Copenhague", "Kopenhagen"], stockholm: ["Stockholm", "Estocolmo", "Stockholm"], oslo: s("Oslo"), helsinki: s("Helsinki"),
  vienna: ["Vienna", "Viena", "Wien"], budapest: s("Budapest"), warsaw: ["Warsaw", "Varsovia", "Warschau"], athens: ["Athens", "Atenas", "Athen"],
  istanbul: ["Istanbul", "Estambul", "Istanbul"], marrakesh: ["Marrakesh", "Marrakech", "Marrakesch"], cairo: ["Cairo", "El Cairo", "Kairo"],
  lisbon: ["Lisbon", "Lisboa", "Lissabon"], buenos_aires: s("Buenos Aires"), sao_paulo: s("São Paulo"), rio: ["Rio de Janeiro", "Río de Janeiro", "Rio de Janeiro"],
  lima: s("Lima"), bogota: s("Bogotá"), singapore: ["Singapore", "Singapur", "Singapur"], bangkok: s("Bangkok"), delhi: ["Delhi", "Delhi", "Delhi"],
  mumbai: ["Mumbai", "Bombay", "Mumbai"], kolkata: ["Kolkata", "Calcuta", "Kalkutta"], jaipur: s("Jaipur"), sydney: ["Sydney", "Sídney", "Sydney"],
  melbourne: s("Melbourne"), johannesburg: ["Johannesburg", "Johannesburgo", "Johannesburg"], nairobi: s("Nairobi"), dubai: ["Dubai", "Dubái", "Dubai"],
};

/** [en, es, de (nominative, with article), city] — squares and streets */
export const PLACES: [string, string, string, string][] = [
  ["Times Square", "Times Square", "der Times Square", "nyc"], ["Fifth Avenue", "la Quinta Avenida", "die Fifth Avenue", "nyc"],
  ["Wall Street", "Wall Street", "die Wall Street", "nyc"], ["Broadway", "Broadway", "der Broadway", "nyc"],
  ["Hollywood Boulevard", "el bulevar de Hollywood", "der Hollywood Boulevard", "la"], ["Bourbon Street", "Bourbon Street", "die Bourbon Street", "nola"],
  ["Lombard Street", "Lombard Street", "die Lombard Street", "sf"], ["Pennsylvania Avenue", "la avenida Pensilvania", "die Pennsylvania Avenue", "dc"],
  ["Red Square", "la Plaza Roja", "der Rote Platz", "moscow"], ["Tiananmen Square", "la plaza de Tiananmén", "der Platz des Himmlischen Friedens", "beijing"],
  ["Nanjing Road", "la calle Nanjing", "die Nanjing Road", "shanghai"], ["the Shibuya Crossing", "el cruce de Shibuya", "die Shibuya-Kreuzung", "tokyo"],
  ["Trafalgar Square", "Trafalgar Square", "der Trafalgar Square", "london"], ["Piccadilly Circus", "Piccadilly Circus", "der Piccadilly Circus", "london"],
  ["Downing Street", "Downing Street", "die Downing Street", "london"], ["Abbey Road", "Abbey Road", "die Abbey Road", "london"],
  ["the Royal Mile", "la Royal Mile", "die Royal Mile", "edinburgh"], ["O'Connell Street", "O'Connell Street", "die O'Connell Street", "dublin"],
  ["the Champs-Élysées", "la avenida de los Campos Elíseos", "die Avenue des Champs-Élysées", "paris"],
  ["the Place de la Concorde", "la plaza de la Concordia", "die Place de la Concorde", "paris"],
  ["La Rambla", "La Rambla", "die Rambla", "barcelona"], ["Passeig de Gràcia", "el paseo de Gracia", "der Passeig de Gràcia", "barcelona"],
  ["the Puerta del Sol", "la Puerta del Sol", "die Puerta del Sol", "madrid"], ["the Paseo de la Castellana", "el paseo de la Castellana", "der Paseo de la Castellana", "madrid"],
  ["St Mark's Square", "la plaza de San Marcos", "der Markusplatz", "venice"], ["Piazza Navona", "la plaza Navona", "die Piazza Navona", "rome"],
  ["the Spanish Steps", "la escalinata de la plaza de España", "die Spanische Treppe", "rome"], ["the Piazza del Campo", "la plaza del Campo", "die Piazza del Campo", "siena"],
  ["the Piazza della Signoria", "la plaza de la Señoría", "die Piazza della Signoria", "florence"], ["Wenceslas Square", "la plaza de Wenceslao", "der Wenzelsplatz", "prague"],
  ["Alexanderplatz", "Alexanderplatz", "der Alexanderplatz", "berlin"], ["the Kurfürstendamm", "la Kurfürstendamm", "der Kurfürstendamm", "berlin"],
  ["Marienplatz", "Marienplatz", "der Marienplatz", "munich"], ["the Reeperbahn", "la Reeperbahn", "die Reeperbahn", "hamburg"],
  ["the Königsallee", "la Königsallee", "die Königsallee", "dusseldorf"], ["the Grand-Place", "la Grand Place", "der Grand-Place", "brussels"],
  ["Dam Square", "la plaza Dam", "der Dam", "amsterdam"], ["Nyhavn", "Nyhavn", "der Nyhavn", "copenhagen"],
  ["Nevsky Prospect", "la avenida Nevski", "der Newski-Prospekt", "stpete"], ["the Ringstrasse", "la Ringstrasse", "die Ringstraße", "vienna"],
  ["Syntagma Square", "la plaza Syntagma", "der Syntagma-Platz", "athens"], ["Taksim Square", "la plaza Taksim", "der Taksim-Platz", "istanbul"],
  ["Tahrir Square", "la plaza Tahrir", "der Tahrir-Platz", "cairo"], ["the Praça do Comércio", "la plaza del Comercio", "die Praça do Comércio", "lisbon"],
  ["the Plaza de Mayo", "la Plaza de Mayo", "die Plaza de Mayo", "buenos_aires"], ["the Avenida 9 de Julio", "la avenida 9 de Julio", "die Avenida 9 de Julio", "buenos_aires"],
  ["the Zócalo", "el Zócalo", "der Zócalo", "mexico_city"], ["Orchard Road", "Orchard Road", "die Orchard Road", "singapore"],
  ["Khao San Road", "la calle Khao San", "die Khao San Road", "bangkok"], ["Karl Johans gate", "la calle Karl Johan", "die Karl Johans gate", "oslo"],
];

/** [en, es, de (nominative, with article), city] */
export const BRIDGES: [string, string, string, string][] = [
  ["the Golden Gate Bridge", "el puente Golden Gate", "die Golden Gate Bridge", "sf"], ["the Brooklyn Bridge", "el puente de Brooklyn", "die Brooklyn Bridge", "nyc"],
  ["Tower Bridge", "el Tower Bridge", "die Tower Bridge", "london"], ["the Charles Bridge", "el puente de Carlos", "die Karlsbrücke", "prague"],
  ["the Ponte Vecchio", "el Ponte Vecchio", "der Ponte Vecchio", "florence"], ["the Rialto Bridge", "el puente de Rialto", "die Rialtobrücke", "venice"],
  ["the Bridge of Sighs", "el puente de los Suspiros", "die Seufzerbrücke", "venice"], ["the Chain Bridge", "el puente de las Cadenas", "die Kettenbrücke", "budapest"],
  ["the Pont Neuf", "el Pont Neuf", "der Pont Neuf", "paris"], ["the Pont Alexandre III", "el puente de Alejandro III", "die Pont Alexandre III", "paris"],
  ["the 25 de Abril Bridge", "el puente 25 de Abril", "die Brücke des 25. April", "lisbon"], ["the Galata Bridge", "el puente de Gálata", "die Galatabrücke", "istanbul"],
  ["the Hohenzollern Bridge", "el puente Hohenzollern", "die Hohenzollernbrücke", "cologne"], ["the Oberbaum Bridge", "el puente Oberbaum", "die Oberbaumbrücke", "berlin"],
  ["the Ponte Sant'Angelo", "el puente Sant'Angelo", "die Engelsbrücke", "rome"], ["the Ha'penny Bridge", "el puente Ha'penny", "die Ha'penny Bridge", "dublin"],
  ["the Jacques Cartier Bridge", "el puente Jacques Cartier", "die Jacques-Cartier-Brücke", "montreal"], ["the Triana Bridge", "el puente de Triana", "die Triana-Brücke", "seville"],
  ["the Harbour Bridge", "el Harbour Bridge", "die Harbour Bridge", "sydney"],
];

/** [en, es, de, city, never-wrong cities] */
export const CITY_NICKNAMES: [string, string, string, string, string[]?][] = [
  ["the Big Apple", "la Gran Manzana", "der Big Apple", "nyc"], ["the City of Light", "la Ciudad de la Luz", "die Stadt der Lichter", "paris"],
  ["the Eternal City", "la Ciudad Eterna", "die Ewige Stadt", "rome"], ["the Windy City", "la Ciudad de los Vientos", "die Windy City", "chicago"],
  ["the City of Angels", "la Ciudad de los Ángeles", "die Stadt der Engel", "la", ["bangkok"]], ["the Big Easy", "The Big Easy", "The Big Easy", "nola"],
  ["Sin City", "la Ciudad del Pecado", "die Stadt der Sünde", "vegas"], ["Motor City", "la Ciudad del Motor", "die Motor City", "detroit"],
  ["the City of Brotherly Love", "la Ciudad del Amor Fraternal", "die Stadt der brüderlichen Liebe", "philly"],
  ["the City of a Hundred Spires", "la ciudad de las cien torres", "die Stadt der hundert Türme", "prague"],
  ["the Pearl of the Danube", "la perla del Danubio", "die Perle der Donau", "budapest", ["vienna"]],
  ["the Marvellous City", "la Ciudad Maravillosa", "die Wunderbare Stadt", "rio"], ["the Red City", "la Ciudad Roja", "die Rote Stadt", "marrakesh", ["jaipur"]],
  ["the Pink City", "la Ciudad Rosa", "die Rosarote Stadt", "jaipur", ["marrakesh"]], ["the City of Joy", "la Ciudad de la Alegría", "die Stadt der Freude", "kolkata"],
  ["the Mile High City", "la Ciudad a una Milla de Altura", "die Mile High City", "denver"], ["the Athens of the North", "la Atenas del Norte", "das Athen des Nordens", "edinburgh", ["munich", "copenhagen", "helsinki", "stockholm"]],
  ["the Florence of the Elbe", "la Florencia del Elba", "Elbflorenz", "dresden"], ["Mainhattan", "Mainhattan", "Mainhattan", "frankfurt"],
  ["the City of Kings", "la Ciudad de los Reyes", "die Stadt der Könige", "lima"], ["the Paris of South America", "el París de Sudamérica", "das Paris Südamerikas", "buenos_aires"],
  ["the Gateway to the World", "la Puerta al Mundo", "das Tor zur Welt", "hamburg"], ["the Emerald City", "la Ciudad Esmeralda", "die Smaragdstadt", "seattle", ["dublin"]],
];
export const NICK_CITY_DECOYS = ["london", "berlin", "madrid", "lisbon", "toronto", "sydney", "tokyo", "moscow", "istanbul", "athens", "boston", "milan", "barcelona", "osaka", "bogota"];

/** [short name, city, named after a person?] */
export const AIRPORTS: [string, string, boolean][] = [
  ["Heathrow", "london", false], ["Gatwick", "london", false], ["JFK", "nyc", true], ["Charles de Gaulle", "paris", true], ["Orly", "paris", false],
  ["Schiphol", "amsterdam", false], ["Barajas", "madrid", false], ["El Prat", "barcelona", false], ["Fiumicino", "rome", false], ["Malpensa", "milan", false],
  ["Linate", "milan", false], ["Narita", "tokyo", false], ["Haneda", "tokyo", false], ["Changi", "singapore", false], ["O'Hare", "chicago", true],
  ["Kastrup", "copenhagen", false], ["Arlanda", "stockholm", false], ["Gardermoen", "oslo", false], ["Vantaa", "helsinki", false], ["Ezeiza", "buenos_aires", false],
  ["Galeão", "rio", false], ["Guarulhos", "sao_paulo", false], ["Incheon", "seoul", false], ["Pudong", "shanghai", false], ["Suvarnabhumi", "bangkok", false],
  ["Logan", "boston", true], ["Dulles", "dc", true], ["Pearson", "toronto", true], ["Schwechat", "vienna", false], ["Kingsford Smith", "sydney", true],
  ["Tullamarine", "melbourne", false], ["Jomo Kenyatta", "nairobi", true], ["O. R. Tambo", "johannesburg", true], ["Benito Juárez", "mexico_city", true],
  ["Jorge Chávez", "lima", true], ["El Dorado", "bogota", false], ["Marco Polo", "venice", true], ["Václav Havel", "prague", true],
  ["Ferenc Liszt", "budapest", true], ["Chopin", "warsaw", true], ["Indira Gandhi", "delhi", true], ["Chhatrapati Shivaji Maharaj", "mumbai", true],
  ["Hartsfield–Jackson", "atlanta", true], ["Franz Josef Strauss", "munich", true], ["Humberto Delgado", "lisbon", true], ["Sabiha Gökçen", "istanbul", true],
  ["Kansai", "osaka", false], ["Sheremetyevo", "moscow", false], ["Domodedovo", "moscow", false], ["Pulkovo", "stpete", false], ["John Lennon", "liverpool", true],
];

/** [old en, es, de, modern city L] */
export const OLD_CITY_NAMES: [string, string, string, L][] = [
  ["Constantinople", "Constantinopla", "Konstantinopel", ["Istanbul", "Estambul", "Istanbul"]],
  ["Leningrad", "Leningrado", "Leningrad", ["Saint Petersburg", "San Petersburgo", "Sankt Petersburg"]],
  ["Stalingrad", "Stalingrado", "Stalingrad", ["Volgograd", "Volgogrado", "Wolgograd"]],
  ["Edo", "Edo", "Edo", ["Tokyo", "Tokio", "Tokio"]],
  ["New Amsterdam", "Nueva Ámsterdam", "Nieuw Amsterdam", ["New York", "Nueva York", "New York"]],
  ["Saigon", "Saigón", "Saigon", ["Ho Chi Minh City", "Ciudad Ho Chi Minh", "Ho-Chi-Minh-Stadt"]],
  ["Batavia", "Batavia", "Batavia", ["Jakarta", "Yakarta", "Jakarta"]],
  ["Madras", "Madrás", "Madras", ["Chennai", "Chennai", "Chennai"]],
  ["Christiania", "Christiania", "Christiania", ["Oslo", "Oslo", "Oslo"]],
  ["Königsberg", "Königsberg", "Königsberg", ["Kaliningrad", "Kaliningrado", "Kaliningrad"]],
  ["Léopoldville", "Leopoldville", "Léopoldville", ["Kinshasa", "Kinsasa", "Kinshasa"]],
  ["Salisbury (Rhodesia)", "Salisbury (Rodesia)", "Salisbury (Rhodesien)", ["Harare", "Harare", "Harare"]],
  ["Bytown", "Bytown", "Bytown", ["Ottawa", "Ottawa", "Ottawa"]],
];
/** Plausible modern cities used as extra wrong answers. */
export const OLD_CITY_DECOYS: L[] = [
  ["Moscow", "Moscú", "Moskau"], ["Ankara", "Ankara", "Ankara"], ["Hanoi", "Hanói", "Hanoi"], ["Kyoto", "Kioto", "Kyoto"], ["Osaka", "Osaka", "Osaka"],
  ["Boston", "Boston", "Boston"], ["Mumbai", "Bombay", "Mumbai"], ["Bergen", "Bergen", "Bergen"], ["Montreal", "Montreal", "Montreal"],
  ["Lusaka", "Lusaka", "Lusaka"], ["Surabaya", "Surabaya", "Surabaya"], ["Bangkok", "Bangkok", "Bangkok"],
];

/** [old en, es, de, country] */
export const OLD_COUNTRY_NAMES: [string, string, string, string, string[]?][] = [
  ["Siam", "Siam", "Siam", "thailand"], ["Persia", "Persia", "Persien", "iran"], ["Ceylon", "Ceilán", "Ceylon", "sri_lanka"],
  ["Abyssinia", "Abisinia", "Abessinien", "ethiopia"], ["Zaire", "Zaire", "Zaire", "dr_congo"], ["Rhodesia", "Rodesia", "Rhodesien", "zimbabwe"],
  ["the Gold Coast", "Costa de Oro", "Goldküste", "ghana"], ["Bechuanaland", "Bechuanalandia", "Betschuanaland", "botswana"],
  ["Kampuchea", "Kampuchea", "Kampuchea", "cambodia"], ["East Pakistan", "Pakistán Oriental", "Ostpakistan", "bangladesh", ["pakistan"]],
  ["the Dutch East Indies", "Indias Orientales Neerlandesas", "Niederländisch-Indien", "indonesia", ["netherlands"]],
  ["Upper Peru", "Alto Perú", "Oberperu", "bolivia", ["peru"]], ["Tanganyika", "Tanganica", "Tanganjika", "tanzania"],
  ["New Granada", "Nueva Granada", "Neugranada", "colombia"], ["New Holland", "Nueva Holanda", "Neuholland", "australia", ["netherlands"]],
];

/** [country, former capital L, wrong cities (never capitals) L[], custom text?] */
export const FORMER_CAPITALS: [string, L, L[], L?][] = [
  ["brazil", ["Rio de Janeiro", "Río de Janeiro", "Rio de Janeiro"], [["São Paulo", "São Paulo", "São Paulo"], ["Recife", "Recife", "Recife"], ["Belo Horizonte", "Belo Horizonte", "Belo Horizonte"]]],
  ["turkey", ["Istanbul", "Estambul", "Istanbul"], [["Izmir", "Esmirna", "Izmir"], ["Antalya", "Antalya", "Antalya"], ["Adana", "Adana", "Adana"]]],
  ["nigeria", ["Lagos", "Lagos", "Lagos"], [["Kano", "Kano", "Kano"], ["Ibadan", "Ibadán", "Ibadan"], ["Port Harcourt", "Port Harcourt", "Port Harcourt"]]],
  ["kazakhstan", ["Almaty", "Almaty", "Almaty"], [["Shymkent", "Shymkent", "Schymkent"], ["Karaganda", "Karagandá", "Qaraghandy"], ["Aktau", "Aktau", "Aqtau"]]],
  ["pakistan", ["Karachi", "Karachi", "Karatschi"], [["Lahore", "Lahore", "Lahore"], ["Peshawar", "Peshawar", "Peschawar"], ["Quetta", "Quetta", "Quetta"]]],
  ["australia", ["Melbourne", "Melbourne", "Melbourne"], [["Sydney", "Sídney", "Sydney"], ["Brisbane", "Brisbane", "Brisbane"], ["Perth", "Perth", "Perth"]]],
  ["japan", ["Kyoto", "Kioto", "Kyoto"], [["Nagoya", "Nagoya", "Nagoya"], ["Yokohama", "Yokohama", "Yokohama"], ["Sapporo", "Sapporo", "Sapporo"]]],
  ["russia", ["Saint Petersburg", "San Petersburgo", "Sankt Petersburg"], [["Novosibirsk", "Novosibirsk", "Nowosibirsk"], ["Kazan", "Kazán", "Kasan"], ["Yekaterinburg", "Ekaterimburgo", "Jekaterinburg"]]],
  ["tanzania", ["Dar es Salaam", "Dar es-Salam", "Daressalam"], [["Arusha", "Arusha", "Arusha"], ["Mwanza", "Mwanza", "Mwanza"], ["Mbeya", "Mbeya", "Mbeya"]]],
  ["usa", ["Philadelphia", "Filadelfia", "Philadelphia"], [["Boston", "Boston", "Boston"], ["Chicago", "Chicago", "Chicago"], ["Los Angeles", "Los Ángeles", "Los Angeles"]]],
  ["finland", ["Turku", "Turku", "Turku"], [["Tampere", "Tampere", "Tampere"], ["Oulu", "Oulu", "Oulu"], ["Espoo", "Espoo", "Espoo"]]],
  ["poland", ["Kraków", "Cracovia", "Krakau"], [["Gdańsk", "Gdansk", "Danzig"], ["Wrocław", "Breslavia", "Breslau"], ["Łódź", "Lodz", "Łódź"]]],
  ["new_zealand", ["Auckland", "Auckland", "Auckland"], [["Christchurch", "Christchurch", "Christchurch"], ["Dunedin", "Dunedin", "Dunedin"], ["Hamilton", "Hamilton", "Hamilton"]]],
  ["india", ["Kolkata (Calcutta)", "Calcuta", "Kalkutta"], [["Mumbai", "Bombay", "Mumbai"], ["Chennai", "Chennai", "Chennai"], ["Bangalore", "Bangalore", "Bangalore"]]],
  ["germany", ["Bonn", "Bonn", "Bonn"], [["Frankfurt", "Fráncfort", "Frankfurt"], ["Cologne", "Colonia", "Köln"], ["Hamburg", "Hamburgo", "Hamburg"], ["Munich", "Múnich", "München"]],
    ["Which city was the capital of West Germany?", "¿Qué ciudad fue la capital de la Alemania Occidental?", "Welche Stadt war die Hauptstadt der Bundesrepublik vor der Wiedervereinigung?"]],
  ["italy", ["Turin", "Turín", "Turin"], [["Milan", "Milán", "Mailand"], ["Venice", "Venecia", "Venedig"], ["Genoa", "Génova", "Genua"], ["Bologna", "Bolonia", "Bologna"]],
    ["Which city was the first capital of unified Italy (1861)?", "¿Qué ciudad fue la primera capital de la Italia unificada (1861)?", "Welche Stadt war die erste Hauptstadt des geeinten Italiens (1861)?"]],
];
/** German genitive for "die Hauptstadt …" in former-capital questions. */
export const DE_GEN: Record<string, string> = {
  brazil: "Brasiliens", turkey: "der Türkei", nigeria: "Nigerias", kazakhstan: "Kasachstans", pakistan: "Pakistans", australia: "Australiens",
  japan: "Japans", russia: "Russlands", tanzania: "Tansanias", usa: "der USA", finland: "Finnlands", poland: "Polens", new_zealand: "Neuseelands", india: "Indiens",
};

// ── states, provinces, regions ──────────────────────────────────────
export const US_STATES: Record<string, L> = {
  ca: ["California", "California", "Kalifornien"], tx: s("Texas"), fl: s("Florida"), ny: ["New York", "Nueva York", "New York"], il: s("Illinois"),
  pa: ["Pennsylvania", "Pensilvania", "Pennsylvania"], wa: s("Washington"), nv: s("Nevada"), az: s("Arizona"), ga: s("Georgia"), ma: s("Massachusetts"),
  co: s("Colorado"), mi: ["Michigan", "Míchigan", "Michigan"], oh: s("Ohio"), la: ["Louisiana", "Luisiana", "Louisiana"], or: ["Oregon", "Oregón", "Oregon"],
  ak: s("Alaska"), hi: ["Hawaii", "Hawái", "Hawaii"], ut: s("Utah"), tn: s("Tennessee"), mn: s("Minnesota"), mo: ["Missouri", "Misuri", "Missouri"],
  nj: ["New Jersey", "Nueva Jersey", "New Jersey"], va: s("Virginia"), ky: s("Kentucky"), wi: s("Wisconsin"), md: s("Maryland"),
  nc: ["North Carolina", "Carolina del Norte", "North Carolina"], sc: ["South Carolina", "Carolina del Sur", "South Carolina"], in: s("Indiana"),
  ia: s("Iowa"), vt: s("Vermont"), nm: ["New Mexico", "Nuevo México", "New Mexico"], mt: s("Montana"), id: s("Idaho"), de: s("Delaware"), ct: s("Connecticut"),
};
/** [state, capital, decoys (big non-capital cities of that state), famous?] */
export const US_CAPITALS: [string, L, L[], boolean?][] = [
  ["ca", s("Sacramento"), [["Los Angeles", "Los Ángeles", "Los Angeles"], s("San Francisco"), s("San Diego")], true],
  ["tx", s("Austin"), [s("Houston"), s("Dallas"), s("San Antonio")], true],
  ["fl", s("Tallahassee"), [s("Miami"), s("Orlando"), s("Tampa")], true],
  ["ny", s("Albany"), [["New York City", "Ciudad de Nueva York", "New York City"], ["Buffalo", "Búfalo", "Buffalo"]], true],
  ["il", s("Springfield"), [s("Chicago")], true],
  ["pa", s("Harrisburg"), [["Philadelphia", "Filadelfia", "Philadelphia"], s("Pittsburgh")]],
  ["wa", s("Olympia"), [s("Seattle"), s("Spokane")], true],
  ["nv", s("Carson City"), [s("Las Vegas"), s("Reno")], true],
  ["az", s("Phoenix"), [s("Tucson")], true],
  ["ga", s("Atlanta"), [s("Savannah")], true],
  ["ma", s("Boston"), [s("Worcester")], true],
  ["co", s("Denver"), [s("Colorado Springs")], true],
  ["mi", s("Lansing"), [s("Detroit")]],
  ["oh", s("Columbus"), [s("Cleveland"), s("Cincinnati")]],
  ["la", s("Baton Rouge"), [["New Orleans", "Nueva Orleans", "New Orleans"]]],
  ["or", s("Salem"), [s("Portland")]],
  ["ak", s("Juneau"), [s("Anchorage"), s("Fairbanks")]],
  ["hi", s("Honolulu"), [s("Hilo")], true],
  ["ut", s("Salt Lake City"), [s("Provo")], true],
  ["tn", s("Nashville"), [s("Memphis")]],
  ["mn", s("Saint Paul"), [["Minneapolis", "Mineápolis", "Minneapolis"]]],
  ["mo", s("Jefferson City"), [["St. Louis", "San Luis", "St. Louis"], s("Kansas City")]],
  ["nj", s("Trenton"), [s("Newark")]],
  ["va", s("Richmond"), [s("Virginia Beach")]],
  ["ky", s("Frankfort"), [s("Louisville")]],
  ["wi", s("Madison"), [s("Milwaukee")]],
  ["md", s("Annapolis"), [s("Baltimore")]],
  ["nc", s("Raleigh"), [s("Charlotte")]],
  ["sc", s("Columbia"), [s("Charleston")]],
  ["in", s("Indianapolis"), [s("Fort Wayne")]],
  ["ia", s("Des Moines"), [s("Cedar Rapids")]],
  ["vt", s("Montpelier"), [s("Burlington")]],
  ["nm", s("Santa Fe"), [s("Albuquerque")]],
  ["mt", s("Helena"), [s("Billings")]],
  ["id", s("Boise"), [s("Pocatello")]],
  ["de", s("Dover"), [s("Wilmington")]],
  ["ct", s("Hartford"), [s("Bridgeport")]],
];
/** [city, state] — big US cities that are not state capitals */
export const US_CITIES: [L, string][] = [
  [s("Las Vegas"), "nv"], [s("Miami"), "fl"], [s("Orlando"), "fl"], [s("Seattle"), "wa"], [s("Chicago"), "il"], [s("Detroit"), "mi"], [s("Houston"), "tx"],
  [s("Dallas"), "tx"], [s("San Antonio"), "tx"], [["New Orleans", "Nueva Orleans", "New Orleans"], "la"], [["Philadelphia", "Filadelfia", "Philadelphia"], "pa"],
  [s("Pittsburgh"), "pa"], [s("San Diego"), "ca"], [s("San Francisco"), "ca"], [["Los Angeles", "Los Ángeles", "Los Angeles"], "ca"], [s("Memphis"), "tn"],
  [s("Anchorage"), "ak"], [s("Baltimore"), "md"], [["Minneapolis", "Mineápolis", "Minneapolis"], "mn"], [["St. Louis", "San Luis", "St. Louis"], "mo"],
  [s("Cleveland"), "oh"], [s("Cincinnati"), "oh"], [s("Milwaukee"), "wi"], [s("Charlotte"), "nc"], [s("Albuquerque"), "nm"], [s("Tucson"), "az"],
  [s("Louisville"), "ky"], [s("Savannah"), "ga"], [s("Reno"), "nv"], [s("Tampa"), "fl"], [s("Newark"), "nj"], [s("Colorado Springs"), "co"],
];
/** [nickname, state] — official or long-established state nicknames */
export const US_NICKNAMES: [string, string][] = [
  ["Sunshine State", "fl"], ["Lone Star State", "tx"], ["Golden State", "ca"], ["Empire State", "ny"], ["Aloha State", "hi"], ["Last Frontier", "ak"],
  ["Garden State", "nj"], ["Grand Canyon State", "az"], ["Peach State", "ga"], ["Silver State", "nv"], ["Bluegrass State", "ky"], ["Evergreen State", "wa"],
  ["Show-Me State", "mo"], ["Keystone State", "pa"], ["Land of Lincoln", "il"], ["Volunteer State", "tn"], ["Badger State", "wi"], ["Buckeye State", "oh"],
  ["Bay State", "ma"], ["Centennial State", "co"], ["Beehive State", "ut"], ["Pelican State", "la"], ["Tar Heel State", "nc"], ["Hawkeye State", "ia"],
  ["Green Mountain State", "vt"], ["Land of Enchantment", "nm"], ["Treasure State", "mt"], ["Gem State", "id"], ["First State", "de"],
  ["Constitution State", "ct"], ["Beaver State", "or"], ["Hoosier State", "in"], ["Palmetto State", "sc"],
];

/** German states. */
export const DE_STATES: Record<string, L> = {
  by: ["Bavaria", "Baviera", "Bayern"], bw: ["Baden-Württemberg", "Baden-Wurtemberg", "Baden-Württemberg"], he: ["Hesse", "Hesse", "Hessen"],
  nw: ["North Rhine-Westphalia", "Renania del Norte-Westfalia", "Nordrhein-Westfalen"], ni: ["Lower Saxony", "Baja Sajonia", "Niedersachsen"],
  sn: ["Saxony", "Sajonia", "Sachsen"], rp: ["Rhineland-Palatinate", "Renania-Palatinado", "Rheinland-Pfalz"], sl: ["Saarland", "Sarre", "Saarland"],
  sh: s("Schleswig-Holstein"), th: ["Thuringia", "Turingia", "Thüringen"], st: ["Saxony-Anhalt", "Sajonia-Anhalt", "Sachsen-Anhalt"],
  bb: ["Brandenburg", "Brandeburgo", "Brandenburg"], mv: ["Mecklenburg-Western Pomerania", "Mecklemburgo-Pomerania Occidental", "Mecklenburg-Vorpommern"],
};
export const DE_CAPITALS: [string, L, L[], boolean?][] = [
  ["by", ["Munich", "Múnich", "München"], [["Nuremberg", "Núremberg", "Nürnberg"], ["Augsburg", "Augsburgo", "Augsburg"]], true],
  ["bw", s("Stuttgart"), [s("Karlsruhe"), s("Mannheim"), ["Freiburg", "Friburgo", "Freiburg"]], true],
  ["he", s("Wiesbaden"), [["Frankfurt", "Fráncfort", "Frankfurt am Main"], s("Kassel")]],
  ["nw", s("Düsseldorf"), [["Cologne", "Colonia", "Köln"], s("Dortmund")]],
  ["ni", ["Hanover", "Hannover", "Hannover"], [["Brunswick", "Brunswick", "Braunschweig"], s("Wolfsburg")], true],
  ["sn", ["Dresden", "Dresde", "Dresden"], [s("Leipzig"), s("Chemnitz")], true],
  ["rp", ["Mainz", "Maguncia", "Mainz"], [["Trier", "Tréveris", "Trier"], ["Koblenz", "Coblenza", "Koblenz"]]],
  ["sl", s("Saarbrücken"), [s("Saarlouis")]],
  ["sh", s("Kiel"), [s("Lübeck"), s("Flensburg")]],
  ["th", s("Erfurt"), [s("Jena"), s("Weimar")]],
  ["st", ["Magdeburg", "Magdeburgo", "Magdeburg"], [["Halle", "Halle", "Halle (Saale)"], s("Dessau")]],
  ["bb", s("Potsdam"), [s("Cottbus")]],
  ["mv", s("Schwerin"), [s("Rostock")]],
];
/** [city, state] — not state capitals */
export const DE_CITIES: [L, string][] = [
  [["Nuremberg", "Núremberg", "Nürnberg"], "by"], [["Augsburg", "Augsburgo", "Augsburg"], "by"], [["Regensburg", "Ratisbona", "Regensburg"], "by"],
  [["Würzburg", "Wurzburgo", "Würzburg"], "by"], [s("Heidelberg"), "bw"], [["Freiburg", "Friburgo", "Freiburg"], "bw"], [s("Karlsruhe"), "bw"],
  [s("Mannheim"), "bw"], [["Frankfurt", "Fráncfort", "Frankfurt am Main"], "he"], [s("Kassel"), "he"], [s("Darmstadt"), "he"], [["Cologne", "Colonia", "Köln"], "nw"],
  [s("Dortmund"), "nw"], [s("Essen"), "nw"], [s("Bonn"), "nw"], [s("Münster"), "nw"], [["Aachen", "Aquisgrán", "Aachen"], "nw"], [s("Leipzig"), "sn"],
  [s("Chemnitz"), "sn"], [["Göttingen", "Gotinga", "Göttingen"], "ni"], [s("Wolfsburg"), "ni"], [["Brunswick", "Brunswick", "Braunschweig"], "ni"],
  [s("Oldenburg"), "ni"], [["Trier", "Tréveris", "Trier"], "rp"], [["Koblenz", "Coblenza", "Koblenz"], "rp"], [s("Lübeck"), "sh"], [s("Flensburg"), "sh"],
  [s("Rostock"), "mv"], [s("Weimar"), "th"], [s("Jena"), "th"], [["Halle", "Halle", "Halle (Saale)"], "st"], [s("Cottbus"), "bb"],
];

/** Spanish autonomous communities: [en (text form), es (text form, with article if any), de] */
export const ES_REGIONS: Record<string, L> = {
  an: ["Andalusia", "Andalucía", "Andalusien"], ct: ["Catalonia", "Cataluña", "Katalonien"], ga: ["Galicia", "Galicia", "Galicien"],
  pv: ["the Basque Country", "el País Vasco", "Baskenland"], ar: ["Aragon", "Aragón", "Aragonien"], as: ["Asturias", "Asturias", "Asturien"],
  cb: ["Cantabria", "Cantabria", "Kantabrien"], nc: ["Navarre", "Navarra", "Navarra"], ex: ["Extremadura", "Extremadura", "Extremadura"],
  cm: ["Castilla–La Mancha", "Castilla-La Mancha", "Kastilien-La Mancha"], ri: s("La Rioja"), ib: ["the Balearic Islands", "las Islas Baleares", "Balearische Inseln"],
  cl: ["Castile and León", "Castilla y León", "Kastilien und León"], vc: ["the Valencian Community", "la Comunidad Valenciana", "Valencianische Gemeinschaft"],
};
export const ES_CAPITALS: [string, L, L[]][] = [
  ["an", ["Seville", "Sevilla", "Sevilla"], [["Málaga", "Málaga", "Málaga"], ["Granada", "Granada", "Granada"], ["Córdoba", "Córdoba", "Córdoba"]]],
  ["ct", s("Barcelona"), [["Girona", "Gerona", "Girona"], ["Tarragona", "Tarragona", "Tarragona"]]],
  ["ga", s("Santiago de Compostela"), [["A Coruña", "La Coruña", "A Coruña"], s("Vigo")]],
  ["pv", s("Vitoria-Gasteiz"), [s("Bilbao"), ["San Sebastián", "San Sebastián", "San Sebastián"]]],
  ["ar", ["Zaragoza", "Zaragoza", "Saragossa"], [s("Huesca"), s("Teruel")]],
  ["as", s("Oviedo"), [s("Gijón")]],
  ["cb", s("Santander"), [s("Torrelavega")]],
  ["nc", s("Pamplona"), [s("Tudela")]],
  ["ex", s("Mérida"), [s("Badajoz"), s("Cáceres")]],
  ["cm", s("Toledo"), [s("Albacete"), s("Cuenca")]],
  ["ri", s("Logroño"), []],
  ["ib", s("Palma"), [s("Ibiza")]],
];
export const ES_CITIES: [L, string][] = [
  [s("Málaga"), "an"], [s("Granada"), "an"], [s("Córdoba"), "an"], [s("Cádiz"), "an"], [s("Marbella"), "an"], [s("Bilbao"), "pv"], [s("San Sebastián"), "pv"],
  [s("Alicante"), "vc"], [["Girona", "Gerona", "Girona"], "ct"], [s("Tarragona"), "ct"], [["A Coruña", "La Coruña", "A Coruña"], "ga"], [s("Vigo"), "ga"],
  [s("Gijón"), "as"], [s("Salamanca"), "cl"], [s("Burgos"), "cl"], [s("León"), "cl"], [s("Segovia"), "cl"], [s("Cuenca"), "cm"], [s("Badajoz"), "ex"],
  [s("Cáceres"), "ex"], [s("Huesca"), "ar"], [s("Teruel"), "ar"], [s("Benidorm"), "vc"], [s("Almería"), "an"], [s("Jerez de la Frontera"), "an"],
];

/** Italian regions: [en, es (text form, with article if any), de] */
export const IT_REGIONS: Record<string, L> = {
  lom: ["Lombardy", "Lombardía", "Lombardei"], laz: ["Lazio", "el Lacio", "Latium"], cam: ["Campania", "Campania", "Kampanien"],
  tos: ["Tuscany", "la Toscana", "Toskana"], ven: ["Veneto", "el Véneto", "Venetien"], pie: ["Piedmont", "el Piamonte", "Piemont"],
  lig: ["Liguria", "Liguria", "Ligurien"], emr: ["Emilia-Romagna", "Emilia-Romaña", "Emilia-Romagna"], sic: ["Sicily", "Sicilia", "Sizilien"],
  sar: ["Sardinia", "Cerdeña", "Sardinien"], pug: ["Apulia", "Apulia", "Apulien"], cal: ["Calabria", "Calabria", "Kalabrien"],
  umb: ["Umbria", "Umbría", "Umbrien"], mar: ["Marche", "las Marcas", "Marken"], abr: ["Abruzzo", "los Abruzos", "Abruzzen"],
  fvg: ["Friuli-Venezia Giulia", "Friuli-Venecia Julia", "Friaul-Julisch Venetien"], bas: ["Basilicata", "Basilicata", "Basilikata"],
};
export const IT_CAPITALS: [string, L, L[], boolean?][] = [
  ["lom", ["Milan", "Milán", "Mailand"], [["Bergamo", "Bérgamo", "Bergamo"], s("Brescia")], true],
  ["laz", ["Rome", "Roma", "Rom"], [], true],
  ["cam", ["Naples", "Nápoles", "Neapel"], [s("Salerno")], true],
  ["tos", ["Florence", "Florencia", "Florenz"], [s("Pisa"), s("Siena")], true],
  ["ven", ["Venice", "Venecia", "Venedig"], [s("Verona"), s("Padua")], true],
  ["pie", ["Turin", "Turín", "Turin"], [s("Asti")], true],
  ["lig", ["Genoa", "Génova", "Genua"], [s("Sanremo")]],
  ["emr", ["Bologna", "Bolonia", "Bologna"], [s("Parma"), ["Modena", "Módena", "Modena"]]],
  ["sic", s("Palermo"), [s("Catania"), ["Syracuse", "Siracusa", "Syrakus"]]],
  ["sar", s("Cagliari"), [s("Sassari")]],
  ["pug", s("Bari"), [s("Lecce")]],
  ["cal", s("Catanzaro"), [s("Reggio Calabria")]],
  ["umb", s("Perugia"), [["Assisi", "Asís", "Assisi"]]],
  ["mar", s("Ancona"), [s("Urbino")]],
  ["abr", s("L'Aquila"), [s("Pescara")]],
  ["fvg", ["Trieste", "Trieste", "Triest"], [s("Udine")]],
  ["bas", s("Potenza"), [s("Matera")]],
];
export const IT_CITIES: [L, string][] = [
  [s("Pisa"), "tos"], [s("Siena"), "tos"], [["Lucca", "Lucca", "Lucca"], "tos"], [s("Verona"), "ven"], [s("Padua"), "ven"], [s("Parma"), "emr"],
  [["Modena", "Módena", "Modena"], "emr"], [s("Rimini"), "emr"], [["Bergamo", "Bérgamo", "Bergamo"], "lom"], [s("Como"), "lom"], [s("Brescia"), "lom"],
  [s("Catania"), "sic"], [["Syracuse", "Siracusa", "Syrakus"], "sic"], [s("Taormina"), "sic"], [s("Lecce"), "pug"], [s("Sorrento"), "cam"], [["Amalfi", "Amalfi", "Amalfi"], "cam"],
  [["Assisi", "Asís", "Assisi"], "umb"], [s("Matera"), "bas"], [s("Pescara"), "abr"], [s("Sanremo"), "lig"], [s("Portofino"), "lig"], [s("Udine"), "fvg"], [s("Urbino"), "mar"],
];

export const AU_STATES: Record<string, L> = {
  nsw: ["New South Wales", "Nueva Gales del Sur", "New South Wales"], vic: s("Victoria"), qld: s("Queensland"),
  wa: ["Western Australia", "Australia Occidental", "Western Australia"], sa: ["South Australia", "Australia Meridional", "South Australia"],
  tas: ["Tasmania", "Tasmania", "Tasmanien"],
};
export const AU_CAPITALS: [string, L, L[], boolean?][] = [
  ["nsw", ["Sydney", "Sídney", "Sydney"], [s("Newcastle"), s("Canberra")], true], ["vic", s("Melbourne"), [s("Geelong")], true],
  ["qld", s("Brisbane"), [s("Gold Coast"), s("Cairns")], true], ["wa", s("Perth"), [s("Fremantle")], true],
  ["sa", ["Adelaide", "Adelaida", "Adelaide"], [], true], ["tas", s("Hobart"), [s("Launceston")]],
];
export const AU_EXTRA: L[] = [s("Darwin"), s("Canberra"), s("Alice Springs")];

export const CA_PROVINCES: Record<string, L> = {
  on: s("Ontario"), bc: ["British Columbia", "Columbia Británica", "British Columbia"], ab: s("Alberta"), mb: s("Manitoba"), sk: s("Saskatchewan"),
  ns: ["Nova Scotia", "Nueva Escocia", "Nova Scotia"], nb: ["New Brunswick", "Nuevo Brunswick", "New Brunswick"],
  nl: ["Newfoundland and Labrador", "Terranova y Labrador", "Neufundland und Labrador"], pe: ["Prince Edward Island", "Isla del Príncipe Eduardo", "Prince Edward Island"],
};
export const CA_CAPITALS: [string, L, L[], boolean?][] = [
  ["on", s("Toronto"), [s("Ottawa")], true], ["bc", s("Victoria"), [s("Vancouver")], true], ["ab", s("Edmonton"), [s("Calgary")], true],
  ["mb", s("Winnipeg"), []], ["sk", s("Regina"), [s("Saskatoon")]], ["ns", s("Halifax"), []], ["nb", s("Fredericton"), [s("Moncton"), s("Saint John")]],
  ["nl", s("St. John's"), []], ["pe", s("Charlottetown"), []],
];

export const BR_STATES: Record<string, L> = {
  ba: ["Bahia", "Bahía", "Bahia"], pe: s("Pernambuco"), ce: s("Ceará"), am: s("Amazonas"), pa: s("Pará"), mg: s("Minas Gerais"),
  rs: s("Rio Grande do Sul"), pr: s("Paraná"), sc: s("Santa Catarina"), go: s("Goiás"), es: s("Espírito Santo"), rn: s("Rio Grande do Norte"),
  pb: s("Paraíba"), al: s("Alagoas"), mt: s("Mato Grosso"), ms: s("Mato Grosso do Sul"),
};
export const BR_CAPITALS: [string, L, L[], boolean?][] = [
  ["ba", s("Salvador"), [s("Feira de Santana"), s("Porto Seguro")], true], ["pe", s("Recife"), [s("Caruaru")]], ["ce", s("Fortaleza"), [s("Juazeiro do Norte")]],
  ["am", s("Manaus"), [s("Parintins")], true], ["pa", s("Belém"), [s("Santarém")]], ["mg", s("Belo Horizonte"), [s("Uberlândia"), s("Juiz de Fora")]],
  ["rs", s("Porto Alegre"), [s("Caxias do Sul"), s("Pelotas")]], ["pr", s("Curitiba"), [s("Londrina"), s("Foz do Iguaçu")]],
  ["sc", s("Florianópolis"), [s("Joinville"), s("Blumenau")]], ["go", s("Goiânia"), [s("Anápolis")]], ["es", s("Vitória"), [s("Vila Velha")]],
  ["rn", s("Natal"), [s("Mossoró")]], ["pb", s("João Pessoa"), [s("Campina Grande")]], ["al", s("Maceió"), [s("Arapiraca")]],
  ["mt", s("Cuiabá"), [s("Rondonópolis")]], ["ms", s("Campo Grande"), [s("Dourados")]],
];

export const MX_STATES: Record<string, L> = {
  jal: s("Jalisco"), nl: s("Nuevo León"), yuc: s("Yucatán"), bc: s("Baja California"), bcs: s("Baja California Sur"), qr: s("Quintana Roo"),
  gro: s("Guerrero"), son: s("Sonora"), sin: s("Sinaloa"), tam: s("Tamaulipas"), coa: s("Coahuila"), mic: ["Michoacán", "Michoacán", "Michoacán"],
  mor: s("Morelos"), chp: s("Chiapas"),
};
export const MX_CAPITALS: [string, L, L[], boolean?][] = [
  ["jal", s("Guadalajara"), [s("Puerto Vallarta")], true], ["nl", s("Monterrey"), [], true], ["yuc", s("Mérida"), [s("Valladolid")], true],
  ["bc", s("Mexicali"), [s("Tijuana"), s("Ensenada")]], ["bcs", s("La Paz"), [s("Cabo San Lucas")]], ["qr", s("Chetumal"), [s("Cancún"), s("Playa del Carmen")]],
  ["gro", s("Chilpancingo"), [s("Acapulco")]], ["son", s("Hermosillo"), [s("Nogales")]], ["sin", s("Culiacán"), [s("Mazatlán")]],
  ["tam", s("Ciudad Victoria"), [s("Tampico"), s("Reynosa")]], ["coa", s("Saltillo"), [s("Torreón")]], ["mic", s("Morelia"), [s("Uruapan")]],
  ["mor", s("Cuernavaca"), []], ["chp", s("Tuxtla Gutiérrez"), [s("Tapachula")]],
];
