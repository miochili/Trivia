/**
 * Fact tables for the second "history" question pack (packs/history2.ts).
 * World history from all regions; only well-established facts — anything
 * contested was left out on purpose. L = [English, Spanish, German].
 */
import type { L } from "../generate";

type D = "easy" | "medium" | "hard";

/** Places that are not in the country table (for options and sentences). */
export const XPL: Record<string, { name: L; en: string; esSubj: string; esDe: string; deIn: string; deAus: string }> = {
  ussr: { name: ["Soviet Union", "Unión Soviética", "Sowjetunion"], en: "the Soviet Union", esSubj: "la Unión Soviética", esDe: "de la Unión Soviética", deIn: "in der Sowjetunion", deAus: "aus der Sowjetunion" },
  zambia: { name: ["Zambia", "Zambia", "Sambia"], en: "Zambia", esSubj: "Zambia", esDe: "de Zambia", deIn: "in Sambia", deAus: "aus Sambia" },
  tunisia: { name: ["Tunisia", "Túnez", "Tunesien"], en: "Tunisia", esSubj: "Túnez", esDe: "de Túnez", deIn: "in Tunesien", deAus: "aus Tunesien" },
  guatemala: { name: ["Guatemala", "Guatemala", "Guatemala"], en: "Guatemala", esSubj: "Guatemala", esDe: "de Guatemala", deIn: "in Guatemala", deAus: "aus Guatemala" },
  liberia: { name: ["Liberia", "Liberia", "Liberia"], en: "Liberia", esSubj: "Liberia", esDe: "de Liberia", deIn: "in Liberia", deAus: "aus Liberia" },
};

// ── 1–2 ancient civilisations and cities → river ──────────────────
/** river key → [label, en "the Nile", es "del Nilo", de "am Nil"] */
export const RIVERS2: Record<string, { label: L; en: string; es: string; de: string }> = {
  nile: { label: ["Nile", "Nilo", "Nil"], en: "the Nile", es: "del Nilo", de: "am Nil" },
  tigris: { label: ["Tigris", "Tigris", "Tigris"], en: "the Tigris", es: "del Tigris", de: "am Tigris" },
  euphrates: { label: ["Euphrates", "Éufrates", "Euphrat"], en: "the Euphrates", es: "del Éufrates", de: "am Euphrat" },
  indus: { label: ["Indus", "Indo", "Indus"], en: "the Indus", es: "del Indo", de: "am Indus" },
  yellow: { label: ["Yellow River", "Río Amarillo", "Gelber Fluss"], en: "the Yellow River", es: "del río Amarillo", de: "am Gelben Fluss" },
  yangtze: { label: ["Yangtze", "Yangtsé", "Jangtse"], en: "the Yangtze", es: "del Yangtsé", de: "am Jangtse" },
  tiber: { label: ["Tiber", "Tíber", "Tiber"], en: "the Tiber", es: "del Tíber", de: "am Tiber" },
  ganges: { label: ["Ganges", "Ganges", "Ganges"], en: "the Ganges", es: "del Ganges", de: "am Ganges" },
  niger: { label: ["Niger", "Níger", "Niger"], en: "the Niger", es: "del Níger", de: "am Niger" },
  dnieper: { label: ["Dnieper", "Dniéper", "Dnepr"], en: "the Dnieper", es: "del Dniéper", de: "am Dnepr" },
  danube: { label: ["Danube", "Danubio", "Donau"], en: "the Danube", es: "del Danubio", de: "an der Donau" },
  thames: { label: ["Thames", "Támesis", "Themse"], en: "the Thames", es: "del Támesis", de: "an der Themse" },
  seine: { label: ["Seine", "Sena", "Seine"], en: "the Seine", es: "del Sena", de: "an der Seine" },
  volga: { label: ["Volga", "Volga", "Wolga"], en: "the Volga", es: "del Volga", de: "an der Wolga" },
  amazon: { label: ["Amazon", "Amazonas", "Amazonas"], en: "the Amazon", es: "del Amazonas", de: "am Amazonas" },
  mississippi: { label: ["Mississippi", "Misisipi", "Mississippi"], en: "the Mississippi", es: "del Misisipi", de: "am Mississippi" },
};
/** [place in a sentence (en, es, de nominative), short label, river, civ? (true = civilisation, false = city), never-wrong rivers, difficulty] */
export const CIV_RIVERS: [L, L, string, boolean, string[], D][] = [
  [["the civilisation of ancient Egypt", "la civilización del antiguo Egipto", "die Hochkultur des alten Ägypten"], ["Ancient Egypt", "Antiguo Egipto", "Altes Ägypten"], "nile", true, [], "easy"],
  [["the Harappan civilisation", "la civilización harappa", "die Harappa-Kultur"], ["Harappan civilisation", "Civilización harappa", "Harappa-Kultur"], "indus", true, ["ganges"], "medium"],
  [["the Shang dynasty of early China", "la dinastía Shang de la antigua China", "die Shang-Dynastie des frühen China"], ["Shang dynasty", "Dinastía Shang", "Shang-Dynastie"], "yellow", true, ["yangtze"], "hard"],
  [["ancient Rome", "la antigua Roma", "das antike Rom"], ["Ancient Rome", "Antigua Roma", "Antikes Rom"], "tiber", false, [], "easy"],
  [["Babylon", "Babilonia", "Babylon"], ["Babylon", "Babilonia", "Babylon"], "euphrates", false, ["tigris"], "medium"],
  [["Nineveh, the Assyrian capital", "Nínive, la capital asiria", "Ninive, die Hauptstadt der Assyrer"], ["Nineveh", "Nínive", "Ninive"], "tigris", false, ["euphrates"], "hard"],
  [["Baghdad, the capital of the Abbasid caliphs", "Bagdad, la capital de los califas abasíes", "Bagdad, die Hauptstadt der Abbasiden-Kalifen"], ["Baghdad", "Bagdad", "Bagdad"], "tigris", false, ["euphrates"], "medium"],
  [["ancient Thebes (today's Luxor)", "la antigua Tebas (la actual Luxor)", "das antike Theben (das heutige Luxor)"], ["Thebes (Luxor)", "Tebas (Luxor)", "Theben (Luxor)"], "nile", false, [], "medium"],
  [["Meroë, the capital of the Kingdom of Kush", "Meroe, la capital del reino de Kush", "Meroe, die Hauptstadt des Reiches Kusch"], ["Meroë", "Meroe", "Meroe"], "nile", false, [], "hard"],
  [["Mohenjo-daro", "Mohenjo-Daro", "Mohenjo-Daro"], ["Mohenjo-daro", "Mohenjo-Daro", "Mohenjo-Daro"], "indus", false, ["ganges"], "medium"],
  [["Pataliputra, the capital of the Maurya Empire", "Pataliputra, la capital del Imperio maurya", "Pataliputra, die Hauptstadt des Maurya-Reiches"], ["Pataliputra", "Pataliputra", "Pataliputra"], "ganges", false, ["indus"], "hard"],
  [["Varanasi, one of the world's oldest cities", "Benarés, una de las ciudades más antiguas del mundo", "Varanasi, eine der ältesten Städte der Welt"], ["Varanasi", "Benarés", "Varanasi"], "ganges", false, ["indus"], "medium"],
  [["Gao, the capital of the Songhai Empire", "Gao, la capital del Imperio songhai", "Gao, die Hauptstadt des Songhai-Reiches"], ["Gao", "Gao", "Gao"], "niger", false, [], "hard"],
  [["Kyiv, the capital of Kievan Rus'", "Kiev, la capital de la Rus de Kiev", "Kiew, die Hauptstadt der Kiewer Rus"], ["Kyiv", "Kiev", "Kiew"], "dnieper", false, ["volga"], "medium"],
  [["Londinium (Roman London)", "Londinium (la Londres romana)", "Londinium (das römische London)"], ["Londinium", "Londinium", "Londinium"], "thames", false, [], "medium"],
  [["Lutetia (Roman Paris)", "Lutecia (el París romano)", "Lutetia (das römische Paris)"], ["Lutetia", "Lutecia", "Lutetia"], "seine", false, [], "medium"],
  [["Vindobona (Roman Vienna)", "Vindobona (la Viena romana)", "Vindobona (das römische Wien)"], ["Vindobona", "Vindobona", "Vindobona"], "danube", false, [], "hard"],
  [["Nanjing, the first capital of the Ming dynasty", "Nankín, la primera capital de la dinastía Ming", "Nanjing, die erste Hauptstadt der Ming-Dynastie"], ["Nanjing", "Nankín", "Nanjing"], "yangtze", false, ["yellow"], "hard"],
  [["Kaifeng, the capital of the Northern Song dynasty", "Kaifeng, la capital de la dinastía Song del Norte", "Kaifeng, die Hauptstadt der Nördlichen Song-Dynastie"], ["Kaifeng", "Kaifeng", "Kaifeng"], "yellow", false, ["yangtze"], "hard"],
];

// ── 3–4 rulers → realm ─────────────────────────────────────────────
/** realm key → label, en with article, es with article, de accusative with article */
export const REALMS: Record<string, { label: L; en: string; es: string; deAcc: string }> = {
  mali: { label: ["Mali Empire", "Imperio de Malí", "Mali-Reich"], en: "the Mali Empire", es: "el Imperio de Malí", deAcc: "das Mali-Reich" },
  maurya: { label: ["Maurya Empire", "Imperio maurya", "Maurya-Reich"], en: "the Maurya Empire", es: "el Imperio maurya", deAcc: "das Maurya-Reich" },
  mongol: { label: ["Mongol Empire", "Imperio mongol", "Mongolisches Reich"], en: "the Mongol Empire", es: "el Imperio mongol", deAcc: "das Mongolische Reich" },
  aztec: { label: ["Aztec Empire", "Imperio azteca", "Aztekenreich"], en: "the Aztec Empire", es: "el Imperio azteca", deAcc: "das Aztekenreich" },
  inca: { label: ["Inca Empire", "Imperio inca", "Inkareich"], en: "the Inca Empire", es: "el Imperio inca", deAcc: "das Inkareich" },
  ottoman: { label: ["Ottoman Empire", "Imperio otomano", "Osmanisches Reich"], en: "the Ottoman Empire", es: "el Imperio otomano", deAcc: "das Osmanische Reich" },
  mughal: { label: ["Mughal Empire", "Imperio mogol", "Mogulreich"], en: "the Mughal Empire", es: "el Imperio mogol", deAcc: "das Mogulreich" },
  zulu: { label: ["Zulu Kingdom", "Reino zulú", "Zulureich"], en: "the Zulu Kingdom", es: "el Reino zulú", deAcc: "das Zulureich" },
  hawaii: { label: ["Kingdom of Hawaii", "Reino de Hawái", "Königreich Hawaii"], en: "the Kingdom of Hawaii", es: "el Reino de Hawái", deAcc: "das Königreich Hawaii" },
  persia: { label: ["Persian (Achaemenid) Empire", "Imperio persa aqueménida", "Perserreich der Achämeniden"], en: "the Persian (Achaemenid) Empire", es: "el Imperio persa aqueménida", deAcc: "das Perserreich der Achämeniden" },
  babylon: { label: ["Babylonia", "Babilonia", "Babylonien"], en: "Babylonia", es: "Babilonia", deAcc: "Babylonien" },
  egypt: { label: ["Ancient Egypt", "Antiguo Egipto", "Altes Ägypten"], en: "ancient Egypt", es: "el antiguo Egipto", deAcc: "das alte Ägypten" },
  byzantine: { label: ["Byzantine Empire", "Imperio bizantino", "Byzantinisches Reich"], en: "the Byzantine Empire", es: "el Imperio bizantino", deAcc: "das Byzantinische Reich" },
  songhai: { label: ["Songhai Empire", "Imperio songhai", "Songhai-Reich"], en: "the Songhai Empire", es: "el Imperio songhai", deAcc: "das Songhai-Reich" },
  frankish: { label: ["Frankish Empire", "Imperio franco", "Frankenreich"], en: "the Frankish Empire", es: "el Imperio franco", deAcc: "das Frankenreich" },
  huns: { label: ["Hunnic Empire", "Imperio huno", "Hunnenreich"], en: "the Hunnic Empire", es: "el Imperio huno", deAcc: "das Hunnenreich" },
  macedon: { label: ["Kingdom of Macedon", "Reino de Macedonia", "Königreich Makedonien"], en: "the Kingdom of Macedon", es: "el Reino de Macedonia", deAcc: "das Königreich Makedonien" },
  abbasid: { label: ["Abbasid Caliphate", "Califato abasí", "Abbasiden-Kalifat"], en: "the Abbasid Caliphate", es: "el Califato abasí", deAcc: "das Abbasiden-Kalifat" },
  ethiopia: { label: ["Ethiopian Empire", "Imperio etíope", "Äthiopisches Kaiserreich"], en: "the Ethiopian Empire", es: "el Imperio etíope", deAcc: "das Äthiopische Kaiserreich" },
  timurid: { label: ["Timurid Empire", "Imperio timúrida", "Timuridenreich"], en: "the Timurid Empire", es: "el Imperio timúrida", deAcc: "das Timuridenreich" },
};
/** [ruler, realm key, other realms they also ruled (never wrong), difficulty] */
export const RULERS: [L, string, string[], D][] = [
  [["Mansa Musa", "Mansa Musa", "Mansa Musa"], "mali", [], "medium"],
  [["Sundiata Keita", "Sundiata Keita", "Sundiata Keita"], "mali", [], "hard"],
  [["Ashoka", "Asoka", "Ashoka"], "maurya", [], "medium"],
  [["Genghis Khan", "Gengis Kan", "Dschingis Khan"], "mongol", [], "easy"],
  [["Kublai Khan", "Kublai Kan", "Kublai Khan"], "mongol", [], "medium"],
  [["Ögedei Khan", "Ogodei Kan", "Ögedei Khan"], "mongol", [], "hard"],
  [["Moctezuma II", "Moctezuma II", "Moctezuma II."], "aztec", [], "easy"],
  [["Cuauhtémoc", "Cuauhtémoc", "Cuauhtémoc"], "aztec", [], "hard"],
  [["Atahualpa", "Atahualpa", "Atahualpa"], "inca", [], "easy"],
  [["Pachacuti", "Pachacútec", "Pachacútec"], "inca", [], "hard"],
  [["Huayna Capac", "Huayna Cápac", "Huayna Cápac"], "inca", [], "hard"],
  [["Suleiman the Magnificent", "Solimán el Magnífico", "Süleyman der Prächtige"], "ottoman", ["egypt", "babylon"], "easy"],
  [["Mehmed II", "Mehmed II", "Mehmed II."], "ottoman", [], "medium"],
  [["Akbar the Great", "Akbar el Grande", "Akbar der Große"], "mughal", [], "medium"],
  [["Babur", "Babur", "Babur"], "mughal", ["timurid"], "medium"],
  [["Shah Jahan", "Sha Jahan", "Shah Jahan"], "mughal", [], "medium"],
  [["Aurangzeb", "Aurangzeb", "Aurangzeb"], "mughal", [], "hard"],
  [["Shaka", "Shaka", "Shaka"], "zulu", [], "medium"],
  [["Cetshwayo", "Cetshwayo", "Cetshwayo"], "zulu", [], "hard"],
  [["Kamehameha I", "Kamehameha I", "Kamehameha I."], "hawaii", [], "medium"],
  [["Liliʻuokalani", "Liliuokalani", "Liliʻuokalani"], "hawaii", [], "hard"],
  [["Cyrus the Great", "Ciro el Grande", "Kyros der Große"], "persia", ["babylon"], "medium"],
  [["Darius I", "Darío I", "Dareios I."], "persia", ["egypt", "babylon"], "medium"],
  [["Xerxes I", "Jerjes I", "Xerxes I."], "persia", ["egypt", "babylon"], "medium"],
  [["Hammurabi", "Hammurabi", "Hammurabi"], "babylon", [], "medium"],
  [["Nebuchadnezzar II", "Nabucodonosor II", "Nebukadnezar II."], "babylon", [], "medium"],
  [["Hatshepsut", "Hatshepsut", "Hatschepsut"], "egypt", [], "medium"],
  [["Tutankhamun", "Tutankamón", "Tutanchamun"], "egypt", [], "easy"],
  [["Akhenaten", "Akenatón", "Echnaton"], "egypt", [], "medium"],
  [["Khufu", "Keops", "Cheops"], "egypt", [], "medium"],
  [["Justinian I", "Justiniano I", "Justinian I."], "byzantine", [], "medium"],
  [["Basil II", "Basilio II", "Basileios II."], "byzantine", [], "hard"],
  [["Sonni Ali", "Sonni Alí", "Sonni Ali"], "songhai", [], "hard"],
  [["Askia Muhammad", "Askia Mohamed", "Askia Mohammed"], "songhai", [], "hard"],
  [["Charlemagne", "Carlomagno", "Karl der Große"], "frankish", [], "easy"],
  [["Clovis I", "Clodoveo I", "Chlodwig I."], "frankish", [], "hard"],
  [["Attila", "Atila", "Attila"], "huns", [], "easy"],
  [["Alexander the Great", "Alejandro Magno", "Alexander der Große"], "macedon", ["egypt", "persia", "babylon"], "easy"],
  [["Harun al-Rashid", "Harún al-Rashid", "Harun ar-Raschid"], "abbasid", [], "medium"],
  [["Menelik II", "Menelik II", "Menelik II."], "ethiopia", [], "hard"],
  [["Tewodros II", "Teodoro II", "Theodor II."], "ethiopia", [], "hard"],
  [["Tamerlane", "Tamerlán", "Timur Lenk"], "timurid", [], "medium"],
];

// ── 5–6 ancient scripts → people ───────────────────────────────────
export const SCRIPT_PEOPLE: Record<string, L> = {
  egypt: ["The ancient Egyptians", "Los antiguos egipcios", "Die alten Ägypter"],
  sumer: ["The Sumerians", "Los sumerios", "Die Sumerer"],
  mycenae: ["The Mycenaean Greeks", "Los griegos micénicos", "Die mykenischen Griechen"],
  minoan: ["The Minoans of Crete", "Los minoicos de Creta", "Die Minoer auf Kreta"],
  norse: ["The Vikings", "Los vikingos", "Die Wikinger"],
  irish: ["The early medieval Irish", "Los irlandeses de la Alta Edad Media", "Die Iren des Frühmittelalters"],
  inca: ["The Incas", "Los incas", "Die Inka"],
  shang: ["The Chinese of the Shang dynasty", "Los chinos de la dinastía Shang", "Die Chinesen der Shang-Dynastie"],
  india: ["The people of ancient India", "Los pueblos de la antigua India", "Die Menschen im alten Indien"],
  korea: ["The Koreans", "Los coreanos", "Die Koreaner"],
  aztec: ["The Aztecs", "Los aztecas", "Die Azteken"],
};
/** [label, people key, difficulty] */
export const SCRIPTS: [L, string, D][] = [
  [["Hieroglyphs", "Jeroglíficos", "Hieroglyphen"], "egypt", "easy"],
  [["Hieratic script", "Escritura hierática", "Hieratische Schrift"], "egypt", "hard"],
  [["Cuneiform", "Escritura cuneiforme", "Keilschrift"], "sumer", "medium"],
  [["Linear B", "Lineal B", "Linear B"], "mycenae", "hard"],
  [["Linear A", "Lineal A", "Linear A"], "minoan", "hard"],
  [["Runes", "Runas", "Runen"], "norse", "easy"],
  [["Ogham", "Ogam", "Ogham"], "irish", "hard"],
  [["Quipu (knotted cords)", "Quipu (cuerdas con nudos)", "Quipu (Knotenschnüre)"], "inca", "medium"],
  [["Oracle bone script", "Escritura de huesos oraculares", "Orakelknochenschrift"], "shang", "hard"],
  [["Brahmi script", "Escritura brahmi", "Brahmi-Schrift"], "india", "hard"],
  [["Hangul", "Hangul", "Hangul"], "korea", "medium"],
];

// ── 7 inventions from China ────────────────────────────────────────
export const CHINA_FIRSTS: L[] = [
  ["Paper", "El papel", "Papier"], ["Gunpowder", "La pólvora", "Schießpulver"], ["The magnetic compass", "La brújula magnética", "Der Magnetkompass"],
  ["Porcelain", "La porcelana", "Porzellan"], ["Silk", "La seda", "Seide"], ["Woodblock printing", "La xilografía", "Der Holztafeldruck"],
  ["Paper money", "El papel moneda", "Papiergeld"], ["The seismoscope", "El sismoscopio", "Das Seismoskop"],
];
export const NOT_CHINA_FIRSTS: L[] = [
  ["The telephone", "El teléfono", "Das Telefon"], ["The light bulb", "La bombilla", "Die Glühbirne"], ["The telescope", "El telescopio", "Das Teleskop"],
  ["Papyrus", "El papiro", "Papyrus"], ["The aeroplane", "El avión", "Das Flugzeug"], ["The piano", "El piano", "Das Klavier"],
  ["The steam locomotive", "La locomotora de vapor", "Die Dampflokomotive"], ["Spectacles", "Las gafas", "Die Brille"], ["The bicycle", "La bicicleta", "Das Fahrrad"],
  ["Photography", "La fotografía", "Die Fotografie"], ["The radio", "La radio", "Das Radio"], ["The thermometer", "El termómetro", "Das Thermometer"],
];

// ── 8–9 trade routes ───────────────────────────────────────────────
/** label, en/es/de "the X" phrase (de dative after "zu"), clue (past-tense verb phrase, capitalised), difficulty */
export const ROUTES: { label: L; en: string; es: string; deZu: string; clue: L; d: D }[] = [
  { label: ["Silk Road", "Ruta de la Seda", "Seidenstraße"], en: "the Silk Road", es: "la Ruta de la Seda", deZu: "zur Seidenstraße",
    clue: ["Linked China with Central Asia, Persia and the Mediterranean", "Unía China con Asia central, Persia y el Mediterráneo", "Verband China mit Zentralasien, Persien und dem Mittelmeerraum"], d: "easy" },
  { label: ["Trans-Saharan trade route", "Ruta comercial transahariana", "Transsahara-Handelsroute"], en: "the trans-Saharan trade route", es: "la ruta comercial transahariana", deZu: "zur Transsahara-Handelsroute",
    clue: ["Carried gold and salt by camel caravan between West Africa and the Mediterranean coast", "Llevaba oro y sal en caravanas de camellos entre África occidental y la costa mediterránea", "Brachte Gold und Salz per Kamelkarawane zwischen Westafrika und der Mittelmeerküste"], d: "medium" },
  { label: ["Amber Road", "Ruta del Ámbar", "Bernsteinstraße"], en: "the Amber Road", es: "la Ruta del Ámbar", deZu: "zur Bernsteinstraße",
    clue: ["Carried fossilised tree resin from the Baltic coast to the Roman Empire", "Llevaba resina fósil desde la costa del Báltico hasta el Imperio romano", "Brachte versteinertes Baumharz von der Ostseeküste ins Römische Reich"], d: "medium" },
  { label: ["Incense Route", "Ruta del Incienso", "Weihrauchstraße"], en: "the Incense Route", es: "la Ruta del Incienso", deZu: "zur Weihrauchstraße",
    clue: ["Carried precious fragrant resins from southern Arabia to the Mediterranean", "Llevaba valiosas resinas aromáticas del sur de Arabia al Mediterráneo", "Brachte kostbare Duftharze aus Südarabien ans Mittelmeer"], d: "medium" },
  { label: ["Tea Horse Road", "Antigua Ruta del Té y los Caballos", "Tee-Pferde-Straße"], en: "the Tea Horse Road", es: "la Antigua Ruta del Té y los Caballos", deZu: "zur Tee-Pferde-Straße",
    clue: ["Linked Yunnan and Sichuan in China with Tibet over high mountain passes", "Unía Yunnan y Sichuan, en China, con el Tíbet a través de altos pasos de montaña", "Verband Yunnan und Sichuan in China über hohe Gebirgspässe mit Tibet"], d: "hard" },
  { label: ["Royal Road of Persia", "Camino Real persa", "Persische Königsstraße"], en: "the Royal Road of Persia", es: "el Camino Real persa", deZu: "zur Persischen Königsstraße",
    clue: ["Was built under King Darius I to link Sardis with Susa", "Se construyó bajo el rey Darío I para unir Sardes con Susa", "Wurde unter König Dareios I. angelegt, um Sardes mit Susa zu verbinden"], d: "hard" },
  { label: ["Appian Way", "Vía Apia", "Via Appia"], en: "the Appian Way", es: "la Vía Apia", deZu: "zur Via Appia",
    clue: ["Linked Rome with Brindisi in the south of Italy", "Unía Roma con Brindisi, en el sur de Italia", "Verband Rom mit Brindisi im Süden Italiens"], d: "medium" },
  { label: ["Grand Trunk Road", "Grand Trunk Road", "Grand Trunk Road"], en: "the Grand Trunk Road", es: "la Grand Trunk Road", deZu: "zur Grand Trunk Road",
    clue: ["Ran across northern India from Bengal to Afghanistan", "Atravesaba el norte de la India desde Bengala hasta Afganistán", "Führte quer durch Nordindien von Bengalen bis nach Afghanistan"], d: "hard" },
  { label: ["Manila galleon route", "Ruta del Galeón de Manila", "Route der Manila-Galeonen"], en: "the Manila galleon route", es: "la ruta del Galeón de Manila", deZu: "zur Route der Manila-Galeonen",
    clue: ["Crossed the Pacific Ocean between the Philippines and Mexico", "Cruzaba el océano Pacífico entre Filipinas y México", "Überquerte den Pazifik zwischen den Philippinen und Mexiko"], d: "medium" },
  { label: ["Route from the Varangians to the Greeks", "Ruta de los varegos a los griegos", "Weg von den Warägern zu den Griechen"], en: "the route from the Varangians to the Greeks", es: "la ruta de los varegos a los griegos", deZu: "zum Weg von den Warägern zu den Griechen",
    clue: ["Led from Scandinavia along the rivers of Eastern Europe to Constantinople", "Iba de Escandinavia a Constantinopla por los ríos de Europa oriental", "Führte von Skandinavien über die Flüsse Osteuropas nach Konstantinopel"], d: "hard" },
  { label: ["Maritime Spice Route", "Ruta marítima de las especias", "Maritime Gewürzroute"], en: "the Maritime Spice Route", es: "la ruta marítima de las especias", deZu: "zur maritimen Gewürzroute",
    clue: ["Brought cloves and nutmeg from the Moluccas to India, Arabia and Europe", "Llevaba clavo y nuez moscada de las Molucas a la India, Arabia y Europa", "Brachte Nelken und Muskatnuss von den Molukken nach Indien, Arabien und Europa"], d: "medium" },
];

// ── 10–19 terms and their meanings ─────────────────────────────────
/** [term, meaning (capitalised noun phrase), difficulty] */
export type Term = [L, L, D];
export const JAPAN_TERMS: Term[] = [
  [["Samurai", "Samurái", "Samurai"], ["A member of Japan's hereditary warrior class", "Miembro de la clase guerrera hereditaria de Japón", "Angehöriger des erblichen Kriegerstandes Japans"], "easy"],
  [["Shogun", "Sogún", "Shogun"], ["A military ruler who held the real power in Japan", "Gobernante militar que tenía el poder real en Japón", "Militärherrscher, der in Japan die eigentliche Macht innehatte"], "easy"],
  [["Daimyo", "Daimio", "Daimyō"], ["A powerful feudal lord who ruled a domain", "Poderoso señor feudal que gobernaba un dominio", "Mächtiger Feudalfürst, der ein eigenes Gebiet beherrschte"], "medium"],
  [["Ronin", "Ronin", "Rōnin"], ["A samurai without a lord or master", "Samurái sin señor al que servir", "Samurai ohne Herrn"], "medium"],
  [["Bushido", "Bushidō", "Bushidō"], ["The code of honour of the samurai", "El código de honor de los samuráis", "Der Ehrenkodex der Samurai"], "medium"],
  [["Katana", "Katana", "Katana"], ["The long curved sword of the samurai", "La espada larga y curva de los samuráis", "Das lange, gebogene Schwert der Samurai"], "easy"],
  [["Wakizashi", "Wakizashi", "Wakizashi"], ["The short companion sword worn by samurai", "La espada corta que los samuráis llevaban como complemento", "Das kurze Begleitschwert der Samurai"], "hard"],
  [["Ninja", "Ninja", "Ninja"], ["A secret agent or spy trained in stealth", "Agente secreto o espía entrenado para actuar sin ser visto", "Im Verborgenen arbeitender Kundschafter oder Spion"], "easy"],
  [["Sakoku", "Sakoku", "Sakoku"], ["Japan's policy of closing the country to most foreigners", "La política de Japón de cerrar el país a casi todos los extranjeros", "Japans Politik der Abschließung gegenüber den meisten Ausländern"], "hard"],
  [["Bakufu", "Bakufu", "Bakufu"], ["The shogun's military government", "El gobierno militar del sogún", "Die Militärregierung des Shoguns"], "hard"],
  [["Tennō", "Tennō", "Tennō"], ["The title of the Emperor of Japan", "El título del emperador de Japón", "Der Titel des japanischen Kaisers"], "hard"],
  [["Kamikaze", "Kamikaze", "Kamikaze"], ["The “divine wind”: typhoons said to have stopped the Mongol invasions", "El «viento divino»: los tifones que, según la tradición, frenaron las invasiones mongolas", "Der „göttliche Wind“: Taifune, die der Überlieferung nach die Mongoleninvasionen stoppten"], "medium"],
];
export const MEDIEVAL_TERMS: Term[] = [
  [["Squire", "Escudero", "Knappe"], ["A young man who served a knight while training to become one", "Joven que servía a un caballero mientras se formaba para serlo", "Junger Mann, der einem Ritter diente und selbst zum Ritter ausgebildet wurde"], "medium"],
  [["Page", "Paje", "Page"], ["A boy sent to a noble household to begin training for knighthood", "Niño enviado a una casa noble para iniciar su formación como caballero", "Junge, der an einem Adelshof seine Ausbildung zum Ritter begann"], "hard"],
  [["Serf", "Siervo", "Leibeigener"], ["A peasant who was bound to the land of a lord", "Campesino atado a la tierra de un señor", "Bauer, der an das Land seines Grundherrn gebunden war"], "medium"],
  [["Vassal", "Vasallo", "Vasall"], ["Someone who received land from a lord in return for loyalty and service", "Persona que recibía tierras de un señor a cambio de lealtad y servicio", "Jemand, der von einem Herrn Land gegen Treue und Dienste erhielt"], "medium"],
  [["Fief", "Feudo", "Lehen"], ["Land granted by a lord in return for service", "Tierra concedida por un señor a cambio de servicios", "Land, das ein Herr gegen Dienste verlieh"], "medium"],
  [["Joust", "Justa", "Tjost"], ["A contest in which two mounted knights charged at each other with lances", "Combate en el que dos caballeros a caballo cargaban uno contra otro con lanzas", "Wettkampf, bei dem zwei berittene Ritter mit Lanzen aufeinander zuritten"], "easy"],
  [["Tithe", "Diezmo", "Zehnt"], ["A tenth of one's harvest or income, paid to the Church", "La décima parte de la cosecha o de los ingresos, que se pagaba a la Iglesia", "Der zehnte Teil der Ernte oder des Einkommens, der an die Kirche ging"], "medium"],
  [["Guild", "Gremio", "Zunft"], ["An association of craftsmen of the same trade in a town", "Asociación de artesanos de un mismo oficio en una ciudad", "Vereinigung der Handwerker eines Berufs in einer Stadt"], "medium"],
  [["Heraldry", "Heráldica", "Heraldik"], ["The system of coats of arms used to identify knights and noble families", "El sistema de escudos de armas que identificaba a caballeros y familias nobles", "Das System der Wappen, an denen man Ritter und Adelsfamilien erkannte"], "medium"],
  [["Troubadour", "Trovador", "Troubadour"], ["A poet and musician who sang about courtly love", "Poeta y músico que cantaba al amor cortés", "Dichter und Sänger, der von der höfischen Liebe sang"], "medium"],
  [["Scriptorium", "Scriptorium", "Skriptorium"], ["A room in a monastery where monks copied books by hand", "Sala de un monasterio donde los monjes copiaban libros a mano", "Raum in einem Kloster, in dem Mönche Bücher von Hand abschrieben"], "medium"],
];
export const CASTLE_PARTS: Term[] = [
  [["Moat", "Foso", "Burggraben"], ["A deep ditch, often filled with water, around the castle", "Zanja profunda, a menudo llena de agua, alrededor del castillo", "Tiefer, oft mit Wasser gefüllter Graben rund um die Burg"], "easy"],
  [["Keep", "Torre del homenaje", "Bergfried"], ["The main tower and strongest part of the castle", "La torre principal y la parte más fuerte del castillo", "Der Hauptturm und stärkste Teil der Burg"], "medium"],
  [["Portcullis", "Rastrillo", "Fallgatter"], ["A heavy grille that could be lowered to block the gate", "Pesada reja que se podía bajar para cerrar la entrada", "Schweres Gitter, das herabgelassen werden konnte, um das Tor zu versperren"], "medium"],
  [["Drawbridge", "Puente levadizo", "Zugbrücke"], ["A bridge that could be raised to keep attackers out", "Puente que se podía levantar para impedir el paso a los atacantes", "Brücke, die hochgezogen werden konnte, um Angreifer fernzuhalten"], "easy"],
  [["Battlements", "Almenas", "Zinnen"], ["The notched top of the wall that protected the defenders", "El remate dentado de la muralla que protegía a los defensores", "Der gezackte obere Mauerabschluss, der die Verteidiger schützte"], "medium"],
  [["Arrow slit", "Saetera", "Schießscharte"], ["A narrow opening in the wall for shooting arrows", "Abertura estrecha en el muro para disparar flechas", "Schmale Maueröffnung zum Abschießen von Pfeilen"], "medium"],
  [["Bailey", "Patio de armas", "Burghof"], ["The open courtyard enclosed by the castle walls", "El patio abierto rodeado por las murallas del castillo", "Der von den Burgmauern umschlossene offene Hof"], "hard"],
  [["Curtain wall", "Muralla", "Ringmauer"], ["The outer defensive wall linking the towers", "El muro defensivo exterior que unía las torres", "Die äußere Verteidigungsmauer zwischen den Türmen"], "hard"],
  [["Gatehouse", "Torre de entrada", "Torhaus"], ["The fortified building that protected the main entrance", "El edificio fortificado que protegía la entrada principal", "Das befestigte Gebäude, das den Haupteingang schützte"], "medium"],
  [["Murder holes", "Matacanes", "Pechnasen"], ["Openings above the entrance through which defenders dropped stones on attackers", "Aberturas sobre la entrada desde las que los defensores lanzaban piedras a los atacantes", "Öffnungen über dem Eingang, durch die Verteidiger Steine auf Angreifer warfen"], "hard"],
];
export const ROMAN_TERMS: Term[] = [
  [["Legion", "Legión", "Legion"], ["A large unit of the Roman army with around 5,000 soldiers", "Gran unidad del ejército romano de unos 5000 soldados", "Große Einheit des römischen Heeres mit rund 5000 Soldaten"], "easy"],
  [["Centurion", "Centurión", "Zenturio"], ["An officer who commanded a unit of about 80 soldiers", "Oficial que mandaba una unidad de unos 80 soldados", "Offizier, der eine Einheit von etwa 80 Soldaten befehligte"], "medium"],
  [["Gladiator", "Gladiador", "Gladiator"], ["A trained fighter who performed in the arena to entertain crowds", "Luchador entrenado que combatía en la arena para entretener al público", "Ausgebildeter Kämpfer, der in der Arena zur Unterhaltung des Publikums auftrat"], "easy"],
  [["Forum", "Foro", "Forum"], ["The central square used for markets, politics and the courts", "La plaza central donde se reunían el mercado, la política y los tribunales", "Der zentrale Platz für Markt, Politik und Gerichte"], "easy"],
  [["Toga", "Toga", "Toga"], ["A draped woollen garment worn by Roman citizens", "Prenda de lana drapeada que llevaban los ciudadanos romanos", "Ein drapiertes Wollgewand der römischen Bürger"], "easy"],
  [["Consul", "Cónsul", "Konsul"], ["One of the two highest officials of the Republic, elected each year", "Uno de los dos magistrados supremos de la República, elegidos cada año", "Einer der beiden jährlich gewählten höchsten Beamten der Republik"], "medium"],
  [["Senate", "Senado", "Senat"], ["The council of leading citizens that advised the magistrates", "El consejo de ciudadanos notables que asesoraba a los magistrados", "Der Rat der führenden Bürger, der die Beamten beriet"], "medium"],
  [["Aqueduct", "Acueducto", "Aquädukt"], ["A channel or bridge that carried water into towns", "Canal o puente que llevaba agua a las ciudades", "Kanal oder Brücke, die Wasser in die Städte leitete"], "easy"],
  [["Amphitheatre", "Anfiteatro", "Amphitheater"], ["An oval open-air arena for public shows", "Recinto ovalado al aire libre para espectáculos públicos", "Ovale Arena unter freiem Himmel für öffentliche Spiele"], "medium"],
  [["Tribune of the plebs", "Tribuno de la plebe", "Volkstribun"], ["An official elected to protect the rights of ordinary citizens", "Magistrado elegido para proteger los derechos de los ciudadanos comunes", "Beamter, der gewählt wurde, um die Rechte der einfachen Bürger zu schützen"], "hard"],
  [["Patrician", "Patricio", "Patrizier"], ["A member of one of Rome's old aristocratic families", "Miembro de una de las antiguas familias aristocráticas de Roma", "Angehöriger einer der alten Adelsfamilien Roms"], "medium"],
  [["Praetorian Guard", "Guardia pretoriana", "Prätorianergarde"], ["The emperor's personal bodyguard", "La guardia personal del emperador", "Die Leibwache des Kaisers"], "medium"],
  [["Pax Romana", "Pax Romana", "Pax Romana"], ["A long period of relative peace in the Roman Empire", "Un largo periodo de relativa paz en el Imperio romano", "Eine lange Zeit relativen Friedens im Römischen Reich"], "medium"],
  [["Thermae", "Termas", "Thermen"], ["Large public bath complexes", "Grandes complejos de baños públicos", "Große öffentliche Badeanlagen"], "medium"],
  [["Dictator", "Dictador", "Diktator"], ["An official given supreme power for a limited time in an emergency", "Magistrado al que se daba el poder supremo por un tiempo limitado en una emergencia", "Beamter, der in einer Notlage für begrenzte Zeit die höchste Macht erhielt"], "hard"],
];
export const EGYPT_TERMS: Term[] = [
  [["Pharaoh", "Faraón", "Pharao"], ["The title of the kings of ancient Egypt", "El título de los reyes del antiguo Egipto", "Der Titel der Könige im alten Ägypten"], "easy"],
  [["Vizier", "Visir", "Wesir"], ["The pharaoh's highest official", "El funcionario de mayor rango del faraón", "Der höchste Beamte des Pharaos"], "medium"],
  [["Scribe", "Escriba", "Schreiber"], ["A trained writer who kept records and wrote documents", "Persona instruida que llevaba registros y redactaba documentos", "Ausgebildeter Schriftkundiger, der Aufzeichnungen und Dokumente anfertigte"], "easy"],
  [["Papyrus", "Papiro", "Papyrus"], ["A writing material made from a reed growing along the Nile", "Material de escritura hecho de una planta que crecía junto al Nilo", "Schreibmaterial aus einer am Nil wachsenden Pflanze"], "easy"],
  [["Sarcophagus", "Sarcófago", "Sarkophag"], ["A large stone coffin", "Gran ataúd de piedra", "Großer Steinsarg"], "easy"],
  [["Obelisk", "Obelisco", "Obelisk"], ["A tall four-sided stone pillar with a pointed top", "Alto pilar de piedra de cuatro caras terminado en punta", "Hoher, vierkantiger Steinpfeiler mit spitzem Abschluss"], "easy"],
  [["Sphinx", "Esfinge", "Sphinx"], ["A statue with a lion's body and a human head", "Estatua con cuerpo de león y cabeza humana", "Statue mit Löwenkörper und Menschenkopf"], "easy"],
  [["Ankh", "Anj", "Anch"], ["A cross-shaped symbol with a loop, standing for life", "Símbolo en forma de cruz con un lazo, que representa la vida", "Kreuzförmiges Symbol mit Schleife, das für das Leben steht"], "medium"],
  [["Cartouche", "Cartucho", "Kartusche"], ["An oval frame around a royal name in hieroglyphs", "Marco ovalado que rodea un nombre real en jeroglíficos", "Ovaler Rahmen um einen Königsnamen in Hieroglyphen"], "hard"],
  [["Scarab", "Escarabajo sagrado", "Skarabäus"], ["A beetle-shaped amulet, a symbol of rebirth", "Amuleto con forma de escarabajo, símbolo del renacimiento", "Käferförmiges Amulett, ein Symbol der Wiedergeburt"], "medium"],
  [["Pylon", "Pilono", "Pylon"], ["The massive monumental gateway of a temple", "La enorme puerta monumental de un templo", "Das massive, monumentale Eingangstor eines Tempels"], "hard"],
  [["Mastaba", "Mastaba", "Mastaba"], ["A flat-topped tomb with sloping sides, older than the pyramids", "Tumba de techo plano y paredes inclinadas, anterior a las pirámides", "Flaches Grabbauwerk mit schrägen Wänden, älter als die Pyramiden"], "hard"],
  [["Nemes", "Nemes", "Nemes"], ["The striped royal headcloth worn by pharaohs", "El tocado real de tela a rayas que llevaban los faraones", "Das gestreifte königliche Kopftuch der Pharaonen"], "hard"],
];

// ── 20–21 historic documents → present-day country ─────────────────
/** [en, es, de (nominative, with article), country id, difficulty] */
export const DOCUMENTS: [string, string, string, string, D][] = [
  ["Magna Carta", "la Carta Magna", "die Magna Carta", "uk", "easy"],
  ["the Declaration of Independence of 1776", "la Declaración de Independencia de 1776", "die Unabhängigkeitserklärung von 1776", "usa", "easy"],
  ["the Declaration of the Rights of Man and of the Citizen", "la Declaración de los Derechos del Hombre y del Ciudadano", "die Erklärung der Menschen- und Bürgerrechte", "france", "medium"],
  ["the Napoleonic Code", "el Código Napoleónico", "der Code Napoléon", "france", "easy"],
  ["the Edict of Nantes", "el Edicto de Nantes", "das Edikt von Nantes", "france", "medium"],
  ["the Emancipation Proclamation", "la Proclamación de Emancipación", "die Emanzipationsproklamation", "usa", "medium"],
  ["the Mayflower Compact", "el Pacto del Mayflower", "der Mayflower-Vertrag", "usa", "medium"],
  ["the Bill of Rights of 1791", "la Carta de Derechos de 1791", "die Bill of Rights von 1791", "usa", "medium"],
  ["the Treaty of Waitangi", "el Tratado de Waitangi", "der Vertrag von Waitangi", "new_zealand", "medium"],
  ["the Domesday Book", "el Libro Domesday", "das Domesday Book", "uk", "hard"],
  ["the Declaration of Arbroath", "la Declaración de Arbroath", "die Erklärung von Arbroath", "uk", "hard"],
  ["the Freedom Charter of 1955", "la Carta de la Libertad de 1955", "die Freiheitscharta von 1955", "south_africa", "hard"],
  ["the Meiji Constitution", "la Constitución Meiji", "die Meiji-Verfassung", "japan", "medium"],
  ["the Seventeen-Article Constitution of Prince Shōtoku", "la Constitución de los Diecisiete Artículos del príncipe Shōtoku", "die Siebzehn-Artikel-Verfassung des Prinzen Shōtoku", "japan", "hard"],
  ["the Constitution of Cádiz", "la Constitución de Cádiz", "die Verfassung von Cádiz", "spain", "medium"],
  ["the Twelve Tables", "la Ley de las Doce Tablas", "das Zwölftafelgesetz", "italy", "hard"],
  ["the Golden Bull of 1222", "la Bula de Oro de 1222", "die Goldene Bulle von 1222", "hungary", "hard"],
];
export const DOC_POOL = ["uk", "usa", "france", "spain", "japan", "new_zealand", "south_africa", "italy", "hungary", "portugal", "netherlands", "russia", "china", "mexico", "brazil", "canada", "australia", "egypt", "greece", "sweden", "poland", "india"];

// ── 22–23 archaeologists and decipherers ───────────────────────────
/** [person, feat (past-tense verb phrase, capitalised), female?, difficulty] */
export const ARCHAEOLOGISTS: [L, L, boolean, D][] = [
  [["Howard Carter", "Howard Carter", "Howard Carter"], ["Discovered the tomb of Tutankhamun in 1922", "Descubrió la tumba de Tutankamón en 1922", "Entdeckte 1922 das Grab des Tutanchamun"], false, "easy"],
  [["Heinrich Schliemann", "Heinrich Schliemann", "Heinrich Schliemann"], ["Excavated the site of ancient Troy", "Excavó el yacimiento de la antigua Troya", "Grub die Stätte des antiken Troja aus"], false, "medium"],
  [["Hiram Bingham", "Hiram Bingham", "Hiram Bingham"], ["Made Machu Picchu known to the wider world in 1911", "Dio a conocer Machu Picchu al mundo en 1911", "Machte 1911 Machu Picchu weltweit bekannt"], false, "medium"],
  [["Arthur Evans", "Arthur Evans", "Arthur Evans"], ["Excavated the Minoan palace of Knossos on Crete", "Excavó el palacio minoico de Cnosos, en Creta", "Grub den minoischen Palast von Knossos auf Kreta aus"], false, "hard"],
  [["Jean-François Champollion", "Jean-François Champollion", "Jean-François Champollion"], ["Deciphered Egyptian hieroglyphs with the help of the Rosetta Stone", "Descifró los jeroglíficos egipcios con ayuda de la piedra de Rosetta", "Entzifferte mithilfe des Steins von Rosette die ägyptischen Hieroglyphen"], false, "medium"],
  [["Michael Ventris", "Michael Ventris", "Michael Ventris"], ["Deciphered the Linear B script", "Descifró la escritura lineal B", "Entzifferte die Linear-B-Schrift"], false, "hard"],
  [["Leonard Woolley", "Leonard Woolley", "Leonard Woolley"], ["Excavated the royal tombs of Ur in Mesopotamia", "Excavó las tumbas reales de Ur, en Mesopotamia", "Grub die Königsgräber von Ur in Mesopotamien aus"], false, "hard"],
  [["Mary Leakey", "Mary Leakey", "Mary Leakey"], ["Found the fossil footprints of Laetoli in Tanzania", "Halló las huellas fósiles de Laetoli, en Tanzania", "Fand die fossilen Fußspuren von Laetoli in Tansania"], true, "hard"],
  [["Donald Johanson", "Donald Johanson", "Donald Johanson"], ["Found the famous fossil skeleton “Lucy” in Ethiopia", "Halló en Etiopía el famoso esqueleto fósil «Lucy»", "Fand in Äthiopien das berühmte Fossilskelett „Lucy“"], false, "medium"],
  [["Basil Brown", "Basil Brown", "Basil Brown"], ["Uncovered the Anglo-Saxon ship burial at Sutton Hoo", "Desenterró el enterramiento en barco anglosajón de Sutton Hoo", "Legte das angelsächsische Schiffsgrab von Sutton Hoo frei"], false, "hard"],
  [["Henri Mouhot", "Henri Mouhot", "Henri Mouhot"], ["Made the temples of Angkor famous in Europe in the 1860s", "Hizo famosos en Europa los templos de Angkor en la década de 1860", "Machte in den 1860er-Jahren die Tempel von Angkor in Europa berühmt"], false, "hard"],
  [["Kathleen Kenyon", "Kathleen Kenyon", "Kathleen Kenyon"], ["Led famous excavations at ancient Jericho", "Dirigió famosas excavaciones en la antigua Jericó", "Leitete berühmte Ausgrabungen im antiken Jericho"], true, "hard"],
];

// ── 24–25 famous finds → present-day country ───────────────────────
/** [en, es, de (nominative), country id, plural [en, es, de], difficulty] */
export const FINDS: [string, string, string, string, [boolean, boolean, boolean], D][] = [
  ["the Rosetta Stone", "la piedra de Rosetta", "der Stein von Rosette", "egypt", [false, false, false], "easy"],
  ["the Terracotta Army", "los guerreros de terracota", "die Terrakotta-Armee", "china", [false, true, false], "easy"],
  ["the bust of Nefertiti", "el busto de Nefertiti", "die Büste der Nofretete", "egypt", [false, false, false], "medium"],
  ["the fossil skeleton known as “Lucy”", "el esqueleto fósil conocido como «Lucy»", "das als „Lucy“ bekannte Fossilskelett", "ethiopia", [false, false, false], "medium"],
  ["the cave paintings of Lascaux", "las pinturas rupestres de Lascaux", "die Höhlenmalereien von Lascaux", "france", [true, true, true], "medium"],
  ["the cave paintings of Altamira", "las pinturas rupestres de Altamira", "die Höhlenmalereien von Altamira", "spain", [true, true, true], "medium"],
  ["the Sutton Hoo ship burial", "el enterramiento en barco de Sutton Hoo", "das Schiffsgrab von Sutton Hoo", "uk", [false, false, false], "hard"],
  ["the Mask of Agamemnon", "la máscara de Agamenón", "die Goldmaske des Agamemnon", "greece", [false, false, false], "medium"],
  ["the Antikythera mechanism", "el mecanismo de Anticitera", "der Mechanismus von Antikythera", "greece", [false, false, false], "hard"],
  ["the Oseberg Viking ship", "el barco vikingo de Oseberg", "das Wikingerschiff von Oseberg", "norway", [false, false, false], "hard"],
  ["the Gundestrup cauldron", "el caldero de Gundestrup", "der Kessel von Gundestrup", "denmark", [false, false, false], "hard"],
  ["the Venus of Willendorf", "la Venus de Willendorf", "die Venus von Willendorf", "austria", [false, false, false], "hard"],
  ["the Laetoli footprints", "las huellas de Laetoli", "die Fußspuren von Laetoli", "tanzania", [true, true, true], "hard"],
  ["the Taung Child skull", "el cráneo del niño de Taung", "der Schädel des Kindes von Taung", "south_africa", [false, false, false], "hard"],
  ["the Lady of Elche", "la Dama de Elche", "die Dame von Elche", "spain", [false, false, false], "medium"],
  ["the Ishango bone", "el hueso de Ishango", "der Knochen von Ishango", "dr_congo", [false, false, false], "hard"],
  ["the Sanxingdui bronzes", "los bronces de Sanxingdui", "die Bronzen von Sanxingdui", "china", [true, true, true], "hard"],
  ["the gold treasure of the Varna necropolis", "el tesoro de oro de la necrópolis de Varna", "der Goldschatz der Nekropole von Varna", "bulgaria", [false, false, false], "hard"],
  ["the tomb of the Lord of Sipán", "la tumba del Señor de Sipán", "das Grab des Herrn von Sipán", "peru", [false, false, false], "medium"],
  ["the Olmec colossal heads", "las cabezas colosales olmecas", "die Kolossalköpfe der Olmeken", "mexico", [true, true, true], "medium"],
  ["the Lewis chessmen", "las piezas de ajedrez de Lewis", "die Lewis-Schachfiguren", "uk", [true, true, true], "hard"],
  ["the Uluburun shipwreck", "el pecio de Uluburun", "das Schiffswrack von Uluburun", "turkey", [false, false, false], "hard"],
];
export const FIND_POOL = ["egypt", "china", "ethiopia", "france", "spain", "uk", "greece", "norway", "denmark", "austria", "tanzania", "south_africa", "dr_congo", "bulgaria", "peru", "mexico", "turkey", "italy", "iraq", "iran", "india", "kenya", "portugal", "sweden"];

// ── 26–27 revolutions and their leaders ────────────────────────────
/** [en, es (with article), de nominative (with article), de dative ("mit der …"), leader, difficulty] */
export const REVOLUTIONS: [string, string, string, string, L, D][] = [
  ["the October Revolution of 1917", "la Revolución de Octubre de 1917", "die Oktoberrevolution von 1917", "der Oktoberrevolution von 1917", ["Vladimir Lenin", "Vladímir Lenin", "Wladimir Lenin"], "easy"],
  ["the Cuban Revolution", "la Revolución cubana", "die Kubanische Revolution", "der Kubanischen Revolution", ["Fidel Castro", "Fidel Castro", "Fidel Castro"], "easy"],
  ["the Haitian Revolution", "la Revolución haitiana", "die Haitianische Revolution", "der Haitianischen Revolution", ["Toussaint Louverture", "Toussaint Louverture", "Toussaint Louverture"], "medium"],
  ["the Chinese Communist Revolution of 1949", "la Revolución comunista china de 1949", "die chinesische kommunistische Revolution von 1949", "der chinesischen kommunistischen Revolution von 1949", ["Mao Zedong", "Mao Zedong", "Mao Zedong"], "easy"],
  ["the Iranian Revolution of 1979", "la Revolución iraní de 1979", "die Iranische Revolution von 1979", "der Iranischen Revolution von 1979", ["Ruhollah Khomeini", "Ruhollah Jomeini", "Ruhollah Chomeini"], "medium"],
  ["the Xinhai Revolution of 1911 in China", "la Revolución de Xinhai de 1911 en China", "die Xinhai-Revolution von 1911 in China", "der Xinhai-Revolution von 1911 in China", ["Sun Yat-sen", "Sun Yat-sen", "Sun Yat-sen"], "hard"],
  ["the Mexican Revolution", "la Revolución mexicana", "die Mexikanische Revolution", "der Mexikanischen Revolution", ["Emiliano Zapata", "Emiliano Zapata", "Emiliano Zapata"], "medium"],
  ["the Velvet Revolution", "la Revolución de Terciopelo", "die Samtene Revolution", "der Samtenen Revolution", ["Václav Havel", "Václav Havel", "Václav Havel"], "medium"],
  ["the People Power Revolution in the Philippines", "la Revolución del Poder Popular en Filipinas", "die People-Power-Revolution auf den Philippinen", "der People-Power-Revolution auf den Philippinen", ["Corazon Aquino", "Corazón Aquino", "Corazon Aquino"], "hard"],
  ["the American War of Independence", "la guerra de Independencia de Estados Unidos", "der Amerikanische Unabhängigkeitskrieg", "dem Amerikanischen Unabhängigkeitskrieg", ["George Washington", "George Washington", "George Washington"], "easy"],
  ["the French Revolution", "la Revolución francesa", "die Französische Revolution", "der Französischen Revolution", ["Maximilien Robespierre", "Maximilien Robespierre", "Maximilien de Robespierre"], "medium"],
  ["the Solidarity movement in Poland", "el movimiento Solidaridad en Polonia", "die Solidarność-Bewegung in Polen", "der Solidarność-Bewegung in Polen", ["Lech Wałęsa", "Lech Wałęsa", "Lech Wałęsa"], "medium"],
  ["the unification of Italy", "la unificación de Italia", "die Einigung Italiens", "der Einigung Italiens", ["Giuseppe Garibaldi", "Giuseppe Garibaldi", "Giuseppe Garibaldi"], "medium"],
  ["the Glorious Revolution of 1688", "la Revolución Gloriosa de 1688", "die Glorreiche Revolution von 1688", "der Glorreichen Revolution von 1688", ["William of Orange", "Guillermo de Orange", "Wilhelm von Oranien"], "hard"],
  ["the Hungarian Revolution of 1956", "la Revolución húngara de 1956", "der Ungarische Volksaufstand von 1956", "dem Ungarischen Volksaufstand von 1956", ["Imre Nagy", "Imre Nagy", "Imre Nagy"], "hard"],
  ["the Easter Rising of 1916 in Dublin", "el Alzamiento de Pascua de 1916 en Dublín", "der Osteraufstand von 1916 in Dublin", "dem Osteraufstand von 1916 in Dublin", ["Patrick Pearse", "Patrick Pearse", "Patrick Pearse"], "hard"],
  ["the wars of independence in northern South America", "las guerras de independencia del norte de Sudamérica", "die Unabhängigkeitskriege im Norden Südamerikas", "den Unabhängigkeitskriegen im Norden Südamerikas", ["Simón Bolívar", "Simón Bolívar", "Simón Bolívar"], "easy"],
];

// ── 28–29 activists and reformers ──────────────────────────────────
/** [person, deed (past-tense verb phrase, capitalised), clash group ("" = none), difficulty] */
export const ACTIVISTS: [L, L, string, D][] = [
  [["Rosa Parks", "Rosa Parks", "Rosa Parks"], ["Refused to give up her bus seat in Montgomery in 1955", "Se negó a ceder su asiento en un autobús de Montgomery en 1955", "Weigerte sich 1955 in Montgomery, ihren Sitzplatz im Bus freizugeben"], "", "easy"],
  [["Martin Luther King Jr.", "Martin Luther King Jr.", "Martin Luther King Jr."], ["Led the 1963 March on Washington for Jobs and Freedom", "Encabezó la Marcha sobre Washington por el Trabajo y la Libertad de 1963", "Führte 1963 den Marsch auf Washington für Arbeit und Freiheit an"], "", "easy"],
  [["Harriet Tubman", "Harriet Tubman", "Harriet Tubman"], ["Led many enslaved people to freedom on the Underground Railroad", "Condujo a muchas personas esclavizadas a la libertad por el Ferrocarril Subterráneo", "Führte viele versklavte Menschen über die Underground Railroad in die Freiheit"], "", "medium"],
  [["Frederick Douglass", "Frederick Douglass", "Frederick Douglass"], ["Escaped slavery and became a famous writer and speaker against it", "Escapó de la esclavitud y se convirtió en un famoso escritor y orador contra ella", "Floh aus der Sklaverei und wurde ein berühmter Schriftsteller und Redner gegen sie"], "", "medium"],
  [["William Wilberforce", "William Wilberforce", "William Wilberforce"], ["Led the campaign to abolish the slave trade in Britain", "Encabezó la campaña para abolir la trata de esclavos en Gran Bretaña", "Führte die Kampagne zur Abschaffung des Sklavenhandels in Großbritannien an"], "", "medium"],
  [["Emmeline Pankhurst", "Emmeline Pankhurst", "Emmeline Pankhurst"], ["Led the suffragettes' fight for women's votes in Britain", "Dirigió la lucha de las sufragistas por el voto femenino en Gran Bretaña", "Führte den Kampf der Suffragetten für das Frauenwahlrecht in Großbritannien an"], "vote", "medium"],
  [["Susan B. Anthony", "Susan B. Anthony", "Susan B. Anthony"], ["Campaigned for women's right to vote in the United States", "Luchó por el derecho al voto de las mujeres en Estados Unidos", "Kämpfte in den USA für das Frauenwahlrecht"], "vote", "hard"],
  [["Ruby Bridges", "Ruby Bridges", "Ruby Bridges"], ["Helped desegregate a New Orleans school at the age of six in 1960", "Ayudó en 1960, con seis años, a acabar con la segregación en una escuela de Nueva Orleans", "Half 1960 im Alter von sechs Jahren, die Rassentrennung an einer Schule in New Orleans zu überwinden"], "", "medium"],
  [["Nelson Mandela", "Nelson Mandela", "Nelson Mandela"], ["Spent 27 years in prison for fighting apartheid", "Pasó 27 años en prisión por luchar contra el apartheid", "Saß 27 Jahre im Gefängnis, weil er gegen die Apartheid kämpfte"], "apartheid", "easy"],
  [["Desmond Tutu", "Desmond Tutu", "Desmond Tutu"], ["Was an Anglican archbishop who campaigned against apartheid", "Fue un arzobispo anglicano que luchó contra el apartheid", "War ein anglikanischer Erzbischof, der gegen die Apartheid kämpfte"], "apartheid", "medium"],
  [["Mahatma Gandhi", "Mahatma Gandhi", "Mahatma Gandhi"], ["Led the Salt March against British rule in 1930", "Encabezó en 1930 la Marcha de la Sal contra el dominio británico", "Führte 1930 den Salzmarsch gegen die britische Herrschaft an"], "", "easy"],
  [["Wangari Maathai", "Wangari Maathai", "Wangari Maathai"], ["Founded the Green Belt Movement, which planted millions of trees in Kenya", "Fundó el Movimiento Cinturón Verde, que plantó millones de árboles en Kenia", "Gründete das Green Belt Movement, das in Kenia Millionen Bäume pflanzte"], "", "medium"],
  [["César Chávez", "César Chávez", "César Chávez"], ["Led a union that fought for the rights of farm workers in the US", "Dirigió un sindicato que luchaba por los derechos de los trabajadores agrícolas en EE. UU.", "Führte eine Gewerkschaft an, die für die Rechte der Landarbeiter in den USA kämpfte"], "", "hard"],
  [["Mother Teresa", "Madre Teresa", "Mutter Teresa"], ["Cared for the poorest of the poor in Kolkata", "Cuidó de los más pobres entre los pobres en Calcuta", "Kümmerte sich in Kalkutta um die Ärmsten der Armen"], "", "easy"],
  [["Florence Nightingale", "Florence Nightingale", "Florence Nightingale"], ["Laid the foundations of modern nursing during the Crimean War", "Sentó las bases de la enfermería moderna durante la guerra de Crimea", "Legte im Krimkrieg die Grundlagen der modernen Krankenpflege"], "", "medium"],
  [["Clara Barton", "Clara Barton", "Clara Barton"], ["Founded the American Red Cross", "Fundó la Cruz Roja estadounidense", "Gründete das Amerikanische Rote Kreuz"], "", "hard"],
  [["Rigoberta Menchú", "Rigoberta Menchú", "Rigoberta Menchú"], ["Fought for the rights of Indigenous peoples in Guatemala", "Luchó por los derechos de los pueblos indígenas en Guatemala", "Kämpfte in Guatemala für die Rechte der indigenen Völker"], "", "hard"],
  [["Jackie Robinson", "Jackie Robinson", "Jackie Robinson"], ["Became the first Black player in modern Major League Baseball in 1947", "Fue en 1947 el primer jugador negro de las Grandes Ligas de béisbol modernas", "Wurde 1947 der erste schwarze Spieler der modernen Major League Baseball"], "", "medium"],
  [["Elizabeth Fry", "Elizabeth Fry", "Elizabeth Fry"], ["Campaigned to improve conditions in British prisons", "Luchó por mejorar las condiciones de las cárceles británicas", "Setzte sich für bessere Bedingungen in britischen Gefängnissen ein"], "", "hard"],
];

// ── 30–31 Nobel Peace Prize ────────────────────────────────────────
/** [laureate, country id (or XPL key), female?, never-wrong countries, difficulty] */
export const NOBEL_PEACE: [string, string, boolean, string[], D][] = [
  ["Martin Luther King Jr.", "usa", false, [], "easy"], ["Nelson Mandela", "south_africa", false, [], "easy"], ["Desmond Tutu", "south_africa", false, [], "medium"],
  ["F. W. de Klerk", "south_africa", false, [], "medium"], ["Albert Luthuli", "south_africa", false, [], "hard"], ["Lech Wałęsa", "poland", false, [], "medium"],
  ["Kofi Annan", "ghana", false, [], "medium"], ["Wangari Maathai", "kenya", true, [], "medium"], ["Malala Yousafzai", "pakistan", true, [], "easy"],
  ["Rigoberta Menchú", "guatemala", true, [], "hard"], ["Óscar Arias", "costa_rica", false, [], "hard"], ["Kim Dae-jung", "south_korea", false, ["north_korea"], "medium"],
  ["Muhammad Yunus", "bangladesh", false, [], "medium"], ["Shirin Ebadi", "iran", true, [], "hard"], ["Narges Mohammadi", "iran", true, [], "hard"],
  ["Ellen Johnson Sirleaf", "liberia", true, [], "hard"], ["Leymah Gbowee", "liberia", true, [], "hard"], ["Juan Manuel Santos", "colombia", false, [], "medium"],
  ["Eisaku Satō", "japan", false, [], "hard"], ["Kailash Satyarthi", "india", false, [], "hard"], ["Denis Mukwege", "dr_congo", false, [], "hard"],
  ["Maria Ressa", "philippines", true, [], "hard"], ["Fridtjof Nansen", "norway", false, [], "hard"], ["Adolfo Pérez Esquivel", "argentina", false, [], "hard"],
  ["Alfonso García Robles", "mexico", false, [], "hard"], ["Lester B. Pearson", "canada", false, [], "medium"], ["Mikhail Gorbachev", "ussr", false, ["russia"], "medium"],
  ["Andrei Sakharov", "ussr", false, ["russia"], "medium"], ["Anwar Sadat", "egypt", false, [], "medium"], ["Nadia Murad", "iraq", true, [], "hard"],
  ["Dmitry Muratov", "russia", false, ["ussr"], "hard"], ["Ales Bialiatski", "belarus", false, ["ussr", "russia"], "hard"], ["Barack Obama", "usa", false, [], "easy"],
  ["Woodrow Wilson", "usa", false, [], "medium"], ["Jimmy Carter", "usa", false, [], "medium"], ["Austen Chamberlain", "uk", false, [], "hard"],
];
export const NOBEL_POOL = ["usa", "south_africa", "poland", "ghana", "kenya", "pakistan", "guatemala", "costa_rica", "south_korea", "bangladesh", "iran", "liberia", "colombia", "japan", "india", "dr_congo", "philippines", "norway", "argentina", "mexico", "canada", "ussr", "egypt", "iraq", "russia", "belarus", "uk", "nigeria", "brazil", "chile", "vietnam", "france", "indonesia"];
/** Famous people who never won the Nobel Peace Prize */
export const NOBEL_NEVER: L[] = [
  ["Mahatma Gandhi", "Mahatma Gandhi", "Mahatma Gandhi"], ["Eleanor Roosevelt", "Eleanor Roosevelt", "Eleanor Roosevelt"], ["Rosa Parks", "Rosa Parks", "Rosa Parks"],
  ["Václav Havel", "Václav Havel", "Václav Havel"], ["Emmeline Pankhurst", "Emmeline Pankhurst", "Emmeline Pankhurst"], ["Malcolm X", "Malcolm X", "Malcolm X"],
  ["John F. Kennedy", "John F. Kennedy", "John F. Kennedy"], ["Helen Keller", "Helen Keller", "Helen Keller"], ["Charles de Gaulle", "Charles de Gaulle", "Charles de Gaulle"],
  ["Jawaharlal Nehru", "Jawaharlal Nehru", "Jawaharlal Nehru"], ["Pope John Paul II", "Papa Juan Pablo II", "Papst Johannes Paul II."], ["Florence Nightingale", "Florence Nightingale", "Florence Nightingale"],
  ["Harriet Tubman", "Harriet Tubman", "Harriet Tubman"], ["Fidel Castro", "Fidel Castro", "Fidel Castro"],
];
export const NOBEL_WON: L[] = [
  ["Martin Luther King Jr.", "Martin Luther King Jr.", "Martin Luther King Jr."], ["Nelson Mandela", "Nelson Mandela", "Nelson Mandela"], ["Malala Yousafzai", "Malala Yousafzai", "Malala Yousafzai"],
  ["Desmond Tutu", "Desmond Tutu", "Desmond Tutu"], ["Lech Wałęsa", "Lech Wałęsa", "Lech Wałęsa"], ["Kofi Annan", "Kofi Annan", "Kofi Annan"],
  ["Wangari Maathai", "Wangari Maathai", "Wangari Maathai"], ["Barack Obama", "Barack Obama", "Barack Obama"], ["Jimmy Carter", "Jimmy Carter", "Jimmy Carter"],
  ["Mikhail Gorbachev", "Mijaíl Gorbachov", "Michail Gorbatschow"], ["Anwar Sadat", "Anwar el-Sadat", "Anwar as-Sadat"], ["Mother Teresa", "Madre Teresa", "Mutter Teresa"],
  ["Theodore Roosevelt", "Theodore Roosevelt", "Theodore Roosevelt"], ["Woodrow Wilson", "Woodrow Wilson", "Woodrow Wilson"], ["Muhammad Yunus", "Muhammad Yunus", "Muhammad Yunus"],
];

// ── 32–33 heroes of independence ───────────────────────────────────
/** [person, country id (or XPL key), difficulty] */
export const INDEP_HEROES: [L, string, D][] = [
  [["Mahatma Gandhi", "Mahatma Gandhi", "Mahatma Gandhi"], "india", "easy"],
  [["Muhammad Ali Jinnah", "Muhammad Ali Jinnah", "Muhammad Ali Jinnah"], "pakistan", "medium"],
  [["Sheikh Mujibur Rahman", "Sheikh Mujibur Rahman", "Scheich Mujibur Rahman"], "bangladesh", "hard"],
  [["Patrice Lumumba", "Patrice Lumumba", "Patrice Lumumba"], "dr_congo", "hard"],
  [["Kenneth Kaunda", "Kenneth Kaunda", "Kenneth Kaunda"], "zambia", "hard"],
  [["Ahmed Ben Bella", "Ahmed Ben Bella", "Ahmed Ben Bella"], "algeria", "hard"],
  [["Habib Bourguiba", "Habib Burguiba", "Habib Bourguiba"], "tunisia", "hard"],
  [["Léopold Sédar Senghor", "Léopold Sédar Senghor", "Léopold Sédar Senghor"], "senegal", "hard"],
  [["Sam Nujoma", "Sam Nujoma", "Sam Nujoma"], "namibia", "hard"],
  [["Samora Machel", "Samora Machel", "Samora Machel"], "mozambique", "hard"],
  [["Agostinho Neto", "Agostinho Neto", "Agostinho Neto"], "angola", "hard"],
  [["Seretse Khama", "Seretse Khama", "Seretse Khama"], "botswana", "hard"],
  [["José Rizal", "José Rizal", "José Rizal"], "philippines", "medium"],
  [["Aung San", "Aung San", "Aung San"], "myanmar", "hard"],
  [["Tunku Abdul Rahman", "Tunku Abdul Rahman", "Tunku Abdul Rahman"], "malaysia", "hard"],
  [["Bernardo O'Higgins", "Bernardo O'Higgins", "Bernardo O'Higgins"], "chile", "medium"],
  [["Miguel Hidalgo", "Miguel Hidalgo", "Miguel Hidalgo"], "mexico", "medium"],
  [["José Martí", "José Martí", "José Martí"], "cuba", "medium"],
  [["Jean-Jacques Dessalines", "Jean-Jacques Dessalines", "Jean-Jacques Dessalines"], "haiti", "hard"],
  [["Juan Pablo Duarte", "Juan Pablo Duarte", "Juan Pablo Duarte"], "dominican_rep", "hard"],
  [["José Gervasio Artigas", "José Gervasio Artigas", "José Gervasio Artigas"], "uruguay", "hard"],
  [["Józef Piłsudski", "Józef Piłsudski", "Józef Piłsudski"], "poland", "medium"],
  [["Éamon de Valera", "Éamon de Valera", "Éamon de Valera"], "ireland", "medium"],
];
export const INDEP_POOL = ["india", "pakistan", "bangladesh", "dr_congo", "zambia", "algeria", "tunisia", "senegal", "namibia", "mozambique", "angola", "botswana", "philippines", "myanmar", "malaysia", "chile", "mexico", "cuba", "haiti", "dominican_rep", "uruguay", "poland", "ireland", "kenya", "ghana", "nigeria", "indonesia", "vietnam", "peru", "argentina", "colombia", "venezuela"];

// ── 34 calendars and timekeeping ───────────────────────────────────
/** [question, answer, wrong answers (≥ 4), difficulty] */
export const CALENDAR_FACTS: [L, L, L[], D][] = [
  [["Who introduced the Julian calendar?", "¿Quién introdujo el calendario juliano?", "Wer führte den julianischen Kalender ein?"],
    ["Julius Caesar", "Julio César", "Julius Caesar"],
    [["Augustus", "Augusto", "Augustus"], ["Nero", "Nerón", "Nero"], ["Constantine the Great", "Constantino el Grande", "Konstantin der Große"], ["Hadrian", "Adriano", "Hadrian"], ["Marcus Aurelius", "Marco Aurelio", "Mark Aurel"]], "medium"],
  [["Which pope gave his name to the calendar introduced in 1582?", "¿Qué papa dio nombre al calendario introducido en 1582?", "Nach welchem Papst ist der 1582 eingeführte Kalender benannt?"],
    ["Gregory XIII", "Gregorio XIII", "Gregor XIII."],
    [["Leo X", "León X", "Leo X."], ["Urban VIII", "Urbano VIII", "Urban VIII."], ["Pius IX", "Pío IX", "Pius IX."], ["Innocent III", "Inocencio III", "Innozenz III."], ["Sixtus IV", "Sixto IV", "Sixtus IV."]], "medium"],
  [["In which year was the Gregorian calendar introduced?", "¿En qué año se introdujo el calendario gregoriano?", "In welchem Jahr wurde der gregorianische Kalender eingeführt?"],
    ["1582", "1582", "1582"],
    [["1492", "1492", "1492"], ["1517", "1517", "1517"], ["1648", "1648", "1648"], ["1700", "1700", "1700"], ["1453", "1453", "1453"], ["1789", "1789", "1789"]], "hard"],
  [["The Islamic calendar counts its years from which event?", "¿Desde qué acontecimiento cuenta sus años el calendario islámico?", "Mit welchem Ereignis beginnt die Jahreszählung des islamischen Kalenders?"],
    ["The Hijra, Muhammad's migration to Medina", "La Hégira, la emigración de Mahoma a Medina", "Mit der Hidschra, Mohammeds Auswanderung nach Medina"],
    [["The founding of Baghdad", "La fundación de Bagdad", "Mit der Gründung Bagdads"], ["The fall of Rome", "La caída de Roma", "Mit dem Untergang Roms"], ["The founding of Cairo", "La fundación de El Cairo", "Mit der Gründung Kairos"], ["The building of the Great Pyramid", "La construcción de la Gran Pirámide", "Mit dem Bau der Großen Pyramide"]], "medium"],
  [["How many animal signs does the Chinese zodiac have?", "¿Cuántos signos animales tiene el zodiaco chino?", "Wie viele Tierzeichen hat der chinesische Tierkreis?"],
    ["12", "12", "12"],
    [["10", "10", "10"], ["8", "8", "8"], ["7", "7", "7"], ["13", "13", "13"], ["9", "9", "9"], ["15", "15", "15"]], "easy"],
  [["Which civilisation used the calendar known as the “Long Count”?", "¿Qué civilización usaba el calendario conocido como «Cuenta Larga»?", "Welche Kultur verwendete den Kalender, der als „Lange Zählung“ bekannt ist?"],
    ["The Maya", "Los mayas", "Die Maya"],
    [["The Romans", "Los romanos", "Die Römer"], ["The Vikings", "Los vikingos", "Die Wikinger"], ["The ancient Egyptians", "Los antiguos egipcios", "Die alten Ägypter"], ["The Celts", "Los celtas", "Die Kelten"], ["The ancient Greeks", "Los antiguos griegos", "Die alten Griechen"]], "medium"],
  [["Which month is named after Julius Caesar?", "¿Qué mes lleva el nombre de Julio César?", "Welcher Monat ist nach Julius Caesar benannt?"],
    ["July", "Julio", "Juli"],
    [["June", "Junio", "Juni"], ["March", "Marzo", "März"], ["September", "Septiembre", "September"], ["January", "Enero", "Januar"], ["May", "Mayo", "Mai"]], "easy"],
  [["Which month is named after the Roman emperor Augustus?", "¿Qué mes lleva el nombre del emperador romano Augusto?", "Welcher Monat ist nach dem römischen Kaiser Augustus benannt?"],
    ["August", "Agosto", "August"],
    [["June", "Junio", "Juni"], ["October", "Octubre", "Oktober"], ["March", "Marzo", "März"], ["April", "Abril", "April"], ["December", "Diciembre", "Dezember"]], "easy"],
  [["In the Roman calendar, which day were the Ides of March?", "En el calendario romano, ¿qué día eran los idus de marzo?", "Auf welches Datum fielen im römischen Kalender die Iden des März?"],
    ["15 March", "El 15 de marzo", "15. März"],
    [["1 March", "El 1 de marzo", "1. März"], ["10 March", "El 10 de marzo", "10. März"], ["31 March", "El 31 de marzo", "31. März"], ["5 March", "El 5 de marzo", "5. März"], ["21 March", "El 21 de marzo", "21. März"]], "medium"],
  [["Which revolution created a calendar with months called Brumaire and Thermidor?", "¿Qué revolución creó un calendario con meses llamados brumario y termidor?", "Welche Revolution schuf einen Kalender mit Monaten namens Brumaire und Thermidor?"],
    ["The French Revolution", "La Revolución francesa", "Die Französische Revolution"],
    [["The Russian Revolution", "La Revolución rusa", "Die Russische Revolution"], ["The American Revolution", "La Revolución estadounidense", "Die Amerikanische Revolution"], ["The Mexican Revolution", "La Revolución mexicana", "Die Mexikanische Revolution"], ["The Glorious Revolution", "La Revolución Gloriosa", "Die Glorreiche Revolution"], ["The Cuban Revolution", "La Revolución cubana", "Die Kubanische Revolution"]], "medium"],
  [["Which calendar was used in most of Europe before the Gregorian calendar?", "¿Qué calendario se usaba en la mayor parte de Europa antes del gregoriano?", "Welcher Kalender galt vor dem gregorianischen in den meisten Teilen Europas?"],
    ["The Julian calendar", "El calendario juliano", "Der julianische Kalender"],
    [["The Maya calendar", "El calendario maya", "Der Maya-Kalender"], ["The Chinese calendar", "El calendario chino", "Der chinesische Kalender"], ["The Islamic calendar", "El calendario islámico", "Der islamische Kalender"], ["The French Republican calendar", "El calendario republicano francés", "Der französische Revolutionskalender"]], "medium"],
  [["Which country only switched to the Gregorian calendar in 1918, after the October Revolution?", "¿Qué país no adoptó el calendario gregoriano hasta 1918, tras la Revolución de Octubre?", "Welches Land führte erst 1918, nach der Oktoberrevolution, den gregorianischen Kalender ein?"],
    ["Russia", "Rusia", "Russland"],
    [["France", "Francia", "Frankreich"], ["Spain", "España", "Spanien"], ["Italy", "Italia", "Italien"], ["Portugal", "Portugal", "Portugal"], ["Poland", "Polonia", "Polen"]], "hard"],
  [["Which ancient people had a 365-day calendar linked to the yearly flooding of the Nile?", "¿Qué pueblo antiguo tenía un calendario de 365 días ligado a la crecida anual del Nilo?", "Welches antike Volk hatte einen Kalender mit 365 Tagen, der an die jährliche Nilflut geknüpft war?"],
    ["The ancient Egyptians", "Los antiguos egipcios", "Die alten Ägypter"],
    [["The Babylonians", "Los babilonios", "Die Babylonier"], ["The Romans", "Los romanos", "Die Römer"], ["The Maya", "Los mayas", "Die Maya"], ["The Phoenicians", "Los fenicios", "Die Phönizier"], ["The ancient Greeks", "Los antiguos griegos", "Die alten Griechen"]], "easy"],
  [["In which year does the traditional Islamic calendar begin (year 1)?", "¿En qué año de nuestra era comienza el calendario islámico (año 1)?", "Mit welchem Jahr unserer Zeitrechnung beginnt der islamische Kalender (Jahr 1)?"],
    ["622", "622", "622"],
    [["476", "476", "476"], ["800", "800", "800"], ["570", "570", "570"], ["711", "711", "711"], ["1066", "1066", "1066"]], "hard"],
];

// ── 35–36 famous speeches ──────────────────────────────────────────
export const SPEAKERS: Record<string, L> = {
  mlk: ["Martin Luther King Jr.", "Martin Luther King Jr.", "Martin Luther King Jr."], lincoln: ["Abraham Lincoln", "Abraham Lincoln", "Abraham Lincoln"],
  nehru: ["Jawaharlal Nehru", "Jawaharlal Nehru", "Jawaharlal Nehru"], gandhi: ["Mahatma Gandhi", "Mahatma Gandhi", "Mahatma Gandhi"],
  mandela: ["Nelson Mandela", "Nelson Mandela", "Nelson Mandela"], truth: ["Sojourner Truth", "Sojourner Truth", "Sojourner Truth"],
  churchill: ["Winston Churchill", "Winston Churchill", "Winston Churchill"], macmillan: ["Harold Macmillan", "Harold Macmillan", "Harold Macmillan"],
  degaulle: ["Charles de Gaulle", "Charles de Gaulle", "Charles de Gaulle"], fdr: ["Franklin D. Roosevelt", "Franklin D. Roosevelt", "Franklin D. Roosevelt"],
  malcolm: ["Malcolm X", "Malcolm X", "Malcolm X"], jfk: ["John F. Kennedy", "John F. Kennedy", "John F. Kennedy"],
  reagan: ["Ronald Reagan", "Ronald Reagan", "Ronald Reagan"], washington: ["George Washington", "George Washington", "George Washington"],
  douglass: ["Frederick Douglass", "Frederick Douglass", "Frederick Douglass"], pankhurst: ["Emmeline Pankhurst", "Emmeline Pankhurst", "Emmeline Pankhurst"],
  caesar: ["Julius Caesar", "Julio César", "Julius Caesar"], armstrong: ["Neil Armstrong", "Neil Armstrong", "Neil Armstrong"],
  stanley: ["Henry Morton Stanley", "Henry Morton Stanley", "Henry Morton Stanley"], henry: ["Patrick Henry", "Patrick Henry", "Patrick Henry"],
  bell: ["Alexander Graham Bell", "Alexander Graham Bell", "Alexander Graham Bell"], archimedes: ["Archimedes", "Arquímedes", "Archimedes"],
  marx: ["Karl Marx and Friedrich Engels", "Karl Marx y Friedrich Engels", "Karl Marx und Friedrich Engels"], macarthur: ["Douglas MacArthur", "Douglas MacArthur", "Douglas MacArthur"],
  galileo: ["Galileo Galilei", "Galileo Galilei", "Galileo Galilei"], napoleon: ["Napoleon Bonaparte", "Napoleón Bonaparte", "Napoleon Bonaparte"],
};
/** [speech in a sentence (en, es, de accusative), label, speaker, difficulty] */
export const SPEECHES: [L, L, string, D][] = [
  [["the “I Have a Dream” speech", "el discurso «I Have a Dream» («Tengo un sueño»)", "die Rede „I Have a Dream“"], ["“I Have a Dream”", "«I Have a Dream»", "„I Have a Dream“"], "mlk", "easy"],
  [["the Gettysburg Address", "el discurso de Gettysburg", "die Gettysburg-Rede"], ["The Gettysburg Address", "El discurso de Gettysburg", "Die Gettysburg-Rede"], "lincoln", "easy"],
  [["the “Tryst with Destiny” speech on India's independence", "el discurso «Tryst with Destiny» («Cita con el destino») sobre la independencia de la India", "die Rede „Tryst with Destiny“ zur Unabhängigkeit Indiens"], ["“Tryst with Destiny”", "«Cita con el destino»", "„Tryst with Destiny“"], "nehru", "medium"],
  [["the “Quit India” speech of 1942", "el discurso «Quit India» («Abandonad la India») de 1942", "die „Quit India“-Rede von 1942"], ["“Quit India”", "«Abandonad la India»", "„Quit India“"], "gandhi", "medium"],
  [["the “I Am Prepared to Die” speech at the Rivonia Trial", "el discurso «Estoy dispuesto a morir» en el juicio de Rivonia", "die Rede „Ich bin bereit zu sterben“ im Rivonia-Prozess"], ["“I Am Prepared to Die”", "«Estoy dispuesto a morir»", "„Ich bin bereit zu sterben“"], "mandela", "medium"],
  [["the “Ain't I a Woman?” speech", "el discurso «¿Acaso no soy una mujer?»", "die Rede „Bin ich etwa keine Frau?“"], ["“Ain't I a Woman?”", "«¿Acaso no soy una mujer?»", "„Bin ich etwa keine Frau?“"], "truth", "hard"],
  [["the “Iron Curtain” speech of 1946", "el discurso del «telón de acero» de 1946", "die Rede vom „Eisernen Vorhang“ von 1946"], ["The “Iron Curtain” speech", "El discurso del «telón de acero»", "Die Rede vom „Eisernen Vorhang“"], "churchill", "medium"],
  [["the “Wind of Change” speech of 1960", "el discurso del «viento de cambio» de 1960", "die „Wind of Change“-Rede von 1960"], ["The “Wind of Change” speech", "El discurso del «viento de cambio»", "Die „Wind of Change“-Rede"], "macmillan", "hard"],
  [["the Appeal of 18 June 1940", "el Llamamiento del 18 de junio de 1940", "den Appell vom 18. Juni 1940"], ["The Appeal of 18 June", "El Llamamiento del 18 de junio", "Der Appell vom 18. Juni"], "degaulle", "medium"],
  [["the “Day of Infamy” speech after Pearl Harbor", "el discurso del «día de la infamia» tras Pearl Harbor", "die „Day of Infamy“-Rede nach Pearl Harbor"], ["The “Day of Infamy” speech", "El discurso del «día de la infamia»", "Die „Day of Infamy“-Rede"], "fdr", "medium"],
  [["the “Four Freedoms” speech", "el discurso de las «cuatro libertades»", "die Rede über die „Vier Freiheiten“"], ["The “Four Freedoms” speech", "El discurso de las «cuatro libertades»", "Die Rede über die „Vier Freiheiten“"], "fdr", "hard"],
  [["the speech “The Ballot or the Bullet”", "el discurso «El voto o la bala»", "die Rede „The Ballot or the Bullet“"], ["“The Ballot or the Bullet”", "«El voto o la bala»", "„The Ballot or the Bullet“"], "malcolm", "hard"],
  [["the speech “What to the Slave Is the Fourth of July?”", "el discurso «¿Qué es para el esclavo el 4 de julio?»", "die Rede „Was ist für den Sklaven der 4. Juli?“"], ["“What to the Slave Is the Fourth of July?”", "«¿Qué es para el esclavo el 4 de julio?»", "„Was ist für den Sklaven der 4. Juli?“"], "douglass", "hard"],
  [["the “Freedom or Death” speech of 1913", "el discurso «Libertad o muerte» de 1913", "die Rede „Freiheit oder Tod“ von 1913"], ["“Freedom or Death”", "«Libertad o muerte»", "„Freiheit oder Tod“"], "pankhurst", "hard"],
];
/** [quote, speaker, difficulty] */
export const QUOTES: [L, string, D][] = [
  [["Veni, vidi, vici", "Veni, vidi, vici", "Veni, vidi, vici"], "caesar", "easy"],
  [["Alea iacta est (The die is cast)", "Alea iacta est (La suerte está echada)", "Alea iacta est (Der Würfel ist gefallen)"], "caesar", "medium"],
  [["That's one small step for man, one giant leap for mankind", "Es un pequeño paso para el hombre, pero un gran salto para la humanidad", "Das ist ein kleiner Schritt für einen Menschen, aber ein riesiger Sprung für die Menschheit"], "armstrong", "easy"],
  [["Dr Livingstone, I presume?", "¿El doctor Livingstone, supongo?", "Dr. Livingstone, nehme ich an?"], "stanley", "medium"],
  [["The only thing we have to fear is fear itself", "Lo único que debemos temer es al miedo mismo", "Das Einzige, was wir zu fürchten haben, ist die Furcht selbst"], "fdr", "medium"],
  [["Ask not what your country can do for you – ask what you can do for your country", "No preguntes qué puede hacer tu país por ti; pregunta qué puedes hacer tú por tu país", "Frag nicht, was dein Land für dich tun kann – frag, was du für dein Land tun kannst"], "jfk", "medium"],
  [["Ich bin ein Berliner", "Ich bin ein Berliner", "Ich bin ein Berliner"], "jfk", "easy"],
  [["Mr Gorbachev, tear down this wall!", "Señor Gorbachov, ¡derribe este muro!", "Mr. Gorbatschow, reißen Sie diese Mauer nieder!"], "reagan", "easy"],
  [["I have nothing to offer but blood, toil, tears and sweat", "No tengo nada que ofrecer más que sangre, esfuerzo, lágrimas y sudor", "Ich habe nichts zu bieten außer Blut, Mühsal, Tränen und Schweiß"], "churchill", "medium"],
  [["We shall fight on the beaches", "Lucharemos en las playas", "Wir werden an den Stränden kämpfen"], "churchill", "medium"],
  [["Give me liberty, or give me death!", "¡Dadme la libertad o dadme la muerte!", "Gebt mir Freiheit oder gebt mir den Tod!"], "henry", "hard"],
  [["Mr Watson, come here, I want to see you", "Señor Watson, venga aquí, quiero verle", "Mr. Watson, kommen Sie her, ich möchte Sie sehen"], "bell", "medium"],
  [["Eureka!", "¡Eureka!", "Heureka!"], "archimedes", "easy"],
  [["Workers of the world, unite!", "¡Proletarios de todos los países, uníos!", "Proletarier aller Länder, vereinigt euch!"], "marx", "medium"],
  [["I shall return", "Volveré", "Ich werde zurückkehren"], "macarthur", "hard"],
];
/** Extra wrong answers for the quote questions */
export const QUOTE_DECOYS = ["galileo", "napoleon", "lincoln", "gandhi", "mlk", "churchill", "washington"];

// ── 37–38 explorers and the crowns they sailed for ─────────────────
export const CROWNS: Record<string, { label: L; en: string; es: string; de: string }> = {
  spain: { label: ["Spain", "España", "Spanien"], en: "Spain", es: "de España", de: "für Spanien" },
  portugal: { label: ["Portugal", "Portugal", "Portugal"], en: "Portugal", es: "de Portugal", de: "für Portugal" },
  england: { label: ["England", "Inglaterra", "England"], en: "England", es: "de Inglaterra", de: "für England" },
  france: { label: ["France", "Francia", "Frankreich"], en: "France", es: "de Francia", de: "für Frankreich" },
  netherlands: { label: ["Netherlands", "Países Bajos", "Niederlande"], en: "the Netherlands", es: "de los Países Bajos", de: "für die Niederlande" },
  russia: { label: ["Russia", "Rusia", "Russland"], en: "Russia", es: "de Rusia", de: "für Russland" },
  china: { label: ["China", "China", "China"], en: "China", es: "de China", de: "für China" },
};
/** [explorer, crown, never-wrong crowns, difficulty] */
export const SAILORS: [L, string, string[], D][] = [
  [["Christopher Columbus", "Cristóbal Colón", "Christoph Kolumbus"], "spain", [], "easy"],
  [["Ferdinand Magellan", "Fernando de Magallanes", "Ferdinand Magellan"], "spain", ["portugal"], "medium"],
  [["Juan Sebastián Elcano", "Juan Sebastián Elcano", "Juan Sebastián Elcano"], "spain", [], "medium"],
  [["Hernando de Soto", "Hernando de Soto", "Hernando de Soto"], "spain", [], "medium"],
  [["Vasco da Gama", "Vasco da Gama", "Vasco da Gama"], "portugal", [], "easy"],
  [["Pedro Álvares Cabral", "Pedro Álvares Cabral", "Pedro Álvares Cabral"], "portugal", [], "medium"],
  [["Bartolomeu Dias", "Bartolomé Díaz", "Bartolomeu Dias"], "portugal", [], "medium"],
  [["John Cabot", "Juan Caboto", "John Cabot"], "england", [], "hard"],
  [["Francis Drake", "Francis Drake", "Francis Drake"], "england", [], "easy"],
  [["Martin Frobisher", "Martin Frobisher", "Martin Frobisher"], "england", [], "hard"],
  [["Jacques Cartier", "Jacques Cartier", "Jacques Cartier"], "france", [], "medium"],
  [["Samuel de Champlain", "Samuel de Champlain", "Samuel de Champlain"], "france", [], "medium"],
  [["Giovanni da Verrazzano", "Giovanni da Verrazzano", "Giovanni da Verrazzano"], "france", [], "hard"],
  [["René-Robert Cavelier de La Salle", "René-Robert Cavelier de La Salle", "René-Robert Cavelier de La Salle"], "france", [], "hard"],
  [["Abel Tasman", "Abel Tasman", "Abel Tasman"], "netherlands", [], "medium"],
  [["Willem Barentsz", "Willem Barentsz", "Willem Barentsz"], "netherlands", [], "hard"],
  [["Vitus Bering", "Vitus Bering", "Vitus Bering"], "russia", [], "hard"],
  [["Zheng He", "Zheng He", "Zheng He"], "china", [], "medium"],
];

// ── 39–40 women's suffrage ─────────────────────────────────────────
/** [country id, year women won the vote in national elections] — only well-documented dates */
export const SUFFRAGE: [string, number][] = [
  ["new_zealand", 1893], ["finland", 1906], ["norway", 1913], ["denmark", 1915], ["russia", 1917], ["poland", 1918], ["austria", 1918],
  ["netherlands", 1919], ["usa", 1920], ["spain", 1931], ["thailand", 1932], ["brazil", 1932], ["turkey", 1934], ["philippines", 1937],
  ["france", 1944], ["italy", 1945], ["japan", 1945], ["argentina", 1947], ["chile", 1949], ["greece", 1952], ["mexico", 1953],
  ["colombia", 1954], ["peru", 1955], ["egypt", 1956], ["iran", 1963], 
];

// ── 41 neutral in World War II (Switzerland deliberately left out) ──
export const WW2_NEUTRAL = ["sweden", "ireland", "spain", "portugal"];
export const WW2_FOUGHT = ["uk", "france", "poland", "norway", "netherlands", "belgium", "greece", "italy", "germany", "hungary", "finland", "romania", "bulgaria"];

// ── 42–43 who had it built ─────────────────────────────────────────
export const BUILDERS: Record<string, L> = {
  shahjahan: ["Shah Jahan", "Sha Jahan", "Shah Jahan"], yongle: ["The Yongle Emperor", "El emperador Yongle", "Kaiser Yongle"],
  louis14: ["Louis XIV", "Luis XIV", "Ludwig XIV."], ludwig2: ["Ludwig II of Bavaria", "Luis II de Baviera", "Ludwig II. von Bayern"],
  mehmed2: ["Mehmed II", "Mehmed II", "Mehmed II."], peter: ["Peter the Great", "Pedro el Grande", "Peter der Große"],
  philip2: ["Philip II of Spain", "Felipe II de España", "Philipp II. von Spanien"], william: ["William the Conqueror", "Guillermo el Conquistador", "Wilhelm der Eroberer"],
  francis1: ["Francis I of France", "Francisco I de Francia", "Franz I. von Frankreich"], justinian: ["Justinian I", "Justiniano I", "Justinian I."],
  frederick: ["Frederick the Great", "Federico el Grande", "Friedrich der Große"], khufu: ["Khufu", "Keops", "Cheops"],
  akbar: ["Akbar the Great", "Akbar el Grande", "Akbar der Große"], hideyoshi: ["Toyotomi Hideyoshi", "Toyotomi Hideyoshi", "Toyotomi Hideyoshi"],
  suryavarman: ["Suryavarman II", "Suryavarman II", "Suryavarman II."], elizabeth: ["Elizabeth of Russia", "Isabel I de Rusia", "Elisabeth von Russland"],
  qin: ["Qin Shi Huang", "Qin Shi Huang", "Qin Shi Huangdi"],
};
/** [building in a sentence (en, es, de accusative), label (en, es, de nominative), builder, difficulty] */
export const BUILT: [L, L, string, D][] = [
  [["the Taj Mahal", "el Taj Mahal", "das Taj Mahal"], ["Taj Mahal", "Taj Mahal", "Taj Mahal"], "shahjahan", "easy"],
  [["the Red Fort in Delhi", "el Fuerte Rojo de Delhi", "das Rote Fort in Delhi"], ["Red Fort in Delhi", "Fuerte Rojo de Delhi", "Rotes Fort in Delhi"], "shahjahan", "hard"],
  [["the Forbidden City in Beijing", "la Ciudad Prohibida de Pekín", "die Verbotene Stadt in Peking"], ["Forbidden City", "Ciudad Prohibida", "Verbotene Stadt"], "yongle", "hard"],
  [["the Palace of Versailles", "el palacio de Versalles", "das Schloss Versailles"], ["Palace of Versailles", "Palacio de Versalles", "Schloss Versailles"], "louis14", "easy"],
  [["Neuschwanstein Castle", "el castillo de Neuschwanstein", "Schloss Neuschwanstein"], ["Neuschwanstein Castle", "Castillo de Neuschwanstein", "Schloss Neuschwanstein"], "ludwig2", "medium"],
  [["the Topkapı Palace in Istanbul", "el palacio de Topkapı de Estambul", "den Topkapı-Palast in Istanbul"], ["Topkapı Palace", "Palacio de Topkapı", "Topkapı-Palast"], "mehmed2", "hard"],
  [["the Peterhof Palace", "el palacio de Peterhof", "Schloss Peterhof"], ["Peterhof Palace", "Palacio de Peterhof", "Schloss Peterhof"], "peter", "medium"],
  [["El Escorial", "El Escorial", "den Escorial"], ["El Escorial", "El Escorial", "Escorial"], "philip2", "medium"],
  [["the White Tower of the Tower of London", "la Torre Blanca de la Torre de Londres", "den White Tower des Tower of London"], ["White Tower (Tower of London)", "Torre Blanca (Torre de Londres)", "White Tower (Tower of London)"], "william", "medium"],
  [["the Château de Chambord", "el castillo de Chambord", "das Schloss Chambord"], ["Château de Chambord", "Castillo de Chambord", "Schloss Chambord"], "francis1", "hard"],
  [["the present Hagia Sophia in Constantinople", "la actual Santa Sofía de Constantinopla", "die heutige Hagia Sophia in Konstantinopel"], ["Hagia Sophia", "Santa Sofía", "Hagia Sophia"], "justinian", "medium"],
  [["Sanssouci Palace", "el palacio de Sanssouci", "Schloss Sanssouci"], ["Sanssouci Palace", "Palacio de Sanssouci", "Schloss Sanssouci"], "frederick", "medium"],
  [["the Great Pyramid of Giza", "la Gran Pirámide de Guiza", "die Große Pyramide von Gizeh"], ["Great Pyramid of Giza", "Gran Pirámide de Guiza", "Große Pyramide von Gizeh"], "khufu", "medium"],
  [["the city of Fatehpur Sikri", "la ciudad de Fatehpur Sikri", "die Stadt Fatehpur Sikri"], ["Fatehpur Sikri", "Fatehpur Sikri", "Fatehpur Sikri"], "akbar", "hard"],
  [["Osaka Castle", "el castillo de Osaka", "die Burg Osaka"], ["Osaka Castle", "Castillo de Osaka", "Burg Osaka"], "hideyoshi", "hard"],
  [["Angkor Wat", "Angkor Wat", "Angkor Wat"], ["Angkor Wat", "Angkor Wat", "Angkor Wat"], "suryavarman", "hard"],
  [["the Winter Palace in Saint Petersburg", "el Palacio de Invierno de San Petersburgo", "den Winterpalast in Sankt Petersburg"], ["Winter Palace", "Palacio de Invierno", "Winterpalast"], "elizabeth", "hard"],
  [["the tomb complex guarded by the Terracotta Army", "el complejo funerario custodiado por los guerreros de terracota", "die von der Terrakotta-Armee bewachte Grabanlage"], ["Tomb guarded by the Terracotta Army", "Tumba custodiada por los guerreros de terracota", "Grabanlage mit der Terrakotta-Armee"], "qin", "medium"],
];

// ── 44–45 historic coins ───────────────────────────────────────────
export const ISSUERS: Record<string, L> = {
  romans: ["The Romans", "Los romanos", "Die Römer"], greeks: ["The ancient Greeks", "Los antiguos griegos", "Die alten Griechen"],
  persians: ["The Persian Empire", "El Imperio persa", "Das Perserreich"], florence: ["The Republic of Florence", "La República de Florencia", "Die Republik Florenz"],
  venice: ["The Republic of Venice", "La República de Venecia", "Die Republik Venedig"], spain: ["The Spanish Empire", "El Imperio español", "Das Spanische Weltreich"],
  china: ["Imperial China", "La China imperial", "Das kaiserliche China"], france: ["The Kingdom of France", "El Reino de Francia", "Das Königreich Frankreich"],
  england: ["The Kingdom of England", "El Reino de Inglaterra", "Das Königreich England"], mughal: ["The Mughal Empire", "El Imperio mogol", "Das Mogulreich"],
};
/** [coin, issuer, never-wrong issuers, difficulty] */
export const COINS: [L, string, string[], D][] = [
  [["Denarius", "Denario", "Denar"], "romans", [], "easy"],
  [["Sestertius", "Sestercio", "Sesterz"], "romans", [], "medium"],
  [["Aureus", "Áureo", "Aureus"], "romans", [], "medium"],
  [["Drachma", "Dracma", "Drachme"], "greeks", [], "easy"],
  [["Tetradrachm", "Tetradracma", "Tetradrachme"], "greeks", [], "hard"],
  [["Daric", "Dárico", "Dareikos"], "persians", [], "hard"],
  [["Florin", "Florín", "Floren"], "florence", ["england"], "medium"],
  [["Ducat", "Ducado", "Dukat"], "venice", ["spain"], "medium"],
  [["Doubloon", "Doblón", "Dublone"], "spain", [], "medium"],
  [["Piece of eight", "Real de a ocho", "Achterstück"], "spain", [], "medium"],
  [["Cash coin with a square hole", "Moneda con agujero cuadrado", "Käsch-Münze mit quadratischem Loch"], "china", [], "medium"],
  [["Louis d'or", "Luis de oro", "Louis d'or"], "france", [], "medium"],
  [["Guinea", "Guinea", "Guinee"], "england", [], "hard"],
  [["Noble", "Noble", "Noble"], "england", [], "hard"],
  [["Mohur", "Mohur", "Mohur"], "mughal", [], "hard"],
];

// ── 46 NATO founding members ───────────────────────────────────────
export const NATO_FOUNDERS = ["usa", "canada", "uk", "france", "belgium", "netherlands", "norway", "denmark", "iceland", "italy", "portugal"];
export const NATO_LATER = ["greece", "turkey", "spain", "poland", "hungary", "sweden", "finland", "czechia", "romania", "bulgaria", "slovakia", "croatia", "albania"];

// ── 47–48 empires and civilisations → continent ────────────────────
/** [en, es, de (nominative, with article), continent, difficulty] */
export const EMPIRE_CONTINENT: [string, string, string, "AF" | "AS" | "EU" | "NA" | "SA" | "OC", D][] = [
  ["the Mali Empire", "el Imperio de Malí", "das Mali-Reich", "AF", "easy"],
  ["the Ghana Empire", "el Imperio de Ghana", "das Ghana-Reich", "AF", "medium"],
  ["the Songhai Empire", "el Imperio songhai", "das Songhai-Reich", "AF", "medium"],
  ["the Kingdom of Aksum", "el reino de Aksum", "das Reich von Aksum", "AF", "medium"],
  ["the Kingdom of Kush", "el reino de Kush", "das Reich Kusch", "AF", "medium"],
  ["the Kingdom of Benin", "el reino de Benín", "das Königreich Benin", "AF", "medium"],
  ["the Ashanti Empire", "el Imperio asante", "das Aschanti-Reich", "AF", "medium"],
  ["the Kingdom of Kongo", "el reino del Congo", "das Königreich Kongo", "AF", "easy"],
  ["the Kingdom of Zimbabwe", "el reino de Zimbabue", "das Königreich Simbabwe", "AF", "easy"],
  ["the Zulu Kingdom", "el Reino zulú", "das Zulureich", "AF", "easy"],
  ["ancient Carthage", "la antigua Cartago", "das antike Karthago", "AF", "medium"],
  ["the Khmer Empire", "el Imperio jemer", "das Khmer-Reich", "AS", "easy"],
  ["the Majapahit Empire", "el Imperio Majapahit", "das Majapahit-Reich", "AS", "hard"],
  ["the Srivijaya Empire", "el Imperio Srivijaya", "das Srivijaya-Reich", "AS", "hard"],
  ["the Gupta Empire", "el Imperio gupta", "das Gupta-Reich", "AS", "medium"],
  ["the Chola dynasty", "la dinastía Chola", "die Chola-Dynastie", "AS", "hard"],
  ["the Maurya Empire", "el Imperio maurya", "das Maurya-Reich", "AS", "medium"],
  ["the Mughal Empire", "el Imperio mogol", "das Mogulreich", "AS", "easy"],
  ["the Mongol Empire", "el Imperio mongol", "das Mongolische Reich", "AS", "easy"],
  ["the Hittite Empire", "el Imperio hitita", "das Hethiterreich", "AS", "medium"],
  ["the Assyrian Empire", "el Imperio asirio", "das Assyrische Reich", "AS", "medium"],
  ["the Kingdom of Macedon", "el Reino de Macedonia", "das Königreich Makedonien", "EU", "easy"],
  ["Kievan Rus'", "la Rus de Kiev", "die Kiewer Rus", "EU", "medium"],
  ["the Frankish Empire", "el Imperio franco", "das Frankenreich", "EU", "easy"],
  ["the Minoan civilisation", "la civilización minoica", "die minoische Kultur", "EU", "medium"],
  ["the Etruscan civilisation", "la civilización etrusca", "die etruskische Kultur", "EU", "medium"],
  ["the Polish–Lithuanian Commonwealth", "la Mancomunidad de Polonia-Lituania", "die Adelsrepublik Polen-Litauen", "EU", "medium"],
  ["the Aztec Empire", "el Imperio azteca", "das Aztekenreich", "NA", "easy"],
  ["the Maya civilisation", "la civilización maya", "die Maya-Kultur", "NA", "easy"],
  ["the Olmec civilisation", "la civilización olmeca", "die Kultur der Olmeken", "NA", "medium"],
  ["the Toltec civilisation", "la civilización tolteca", "die Kultur der Tolteken", "NA", "medium"],
  ["the Mississippian culture of Cahokia", "la cultura del Misisipi de Cahokia", "die Mississippi-Kultur von Cahokia", "NA", "hard"],
  ["the Inca Empire", "el Imperio inca", "das Inkareich", "SA", "easy"],
  ["the Tiwanaku civilisation", "la civilización tiahuanaco", "die Tiwanaku-Kultur", "SA", "hard"],
  ["the Chimú kingdom", "el reino chimú", "das Chimú-Reich", "SA", "hard"],
  ["the Wari Empire", "el Imperio wari", "das Wari-Reich", "SA", "hard"],
  ["the Moche civilisation", "la civilización mochica", "die Moche-Kultur", "SA", "hard"],
  ["the Tuʻi Tonga Empire", "el Imperio tu'i tonga", "das Tuʻi-Tonga-Reich", "OC", "hard"],
];
