/** Fact tables for the "art" pack (art, literature, music, mythology, architecture, dance, theatre). */
import type { L } from "../generate";

// ── Greek / Roman gods ──────────────────────────────────────────────
/** dom = [en noun, es noun with article, de nominative], deGen = German genitive phrase; roman = Roman name */
export interface God { id: string; name: L; f: boolean; dom?: L; deGen?: string; roman?: L; d: "easy" | "medium" | "hard"; not?: string[] }
export const GODS: God[] = [
  { id: "zeus", name: ["Zeus", "Zeus", "Zeus"], f: false, dom: ["the sky and thunder", "el cielo y el trueno", "der Himmel und der Donner"], deGen: "des Himmels und des Donners", roman: ["Jupiter", "Júpiter", "Jupiter"], d: "easy" },
  { id: "hera", name: ["Hera", "Hera", "Hera"], f: true, dom: ["marriage", "el matrimonio", "die Ehe"], deGen: "der Ehe", roman: ["Juno", "Juno", "Juno"], d: "medium" },
  { id: "poseidon", name: ["Poseidon", "Poseidón", "Poseidon"], f: false, dom: ["the sea", "el mar", "das Meer"], deGen: "des Meeres", roman: ["Neptune", "Neptuno", "Neptun"], d: "easy" },
  { id: "hades", name: ["Hades", "Hades", "Hades"], f: false, dom: ["the underworld", "el inframundo", "die Unterwelt"], deGen: "der Unterwelt", roman: ["Pluto", "Plutón", "Pluto"], d: "easy" },
  { id: "athena", name: ["Athena", "Atenea", "Athene"], f: true, dom: ["wisdom", "la sabiduría", "die Weisheit"], deGen: "der Weisheit", roman: ["Minerva", "Minerva", "Minerva"], d: "medium", not: ["ares"] },
  { id: "ares", name: ["Ares", "Ares", "Ares"], f: false, dom: ["war", "la guerra", "der Krieg"], deGen: "des Krieges", roman: ["Mars", "Marte", "Mars"], d: "easy" },
  { id: "aphrodite", name: ["Aphrodite", "Afrodita", "Aphrodite"], f: true, dom: ["love and beauty", "el amor y la belleza", "die Liebe und die Schönheit"], deGen: "der Liebe und der Schönheit", roman: ["Venus", "Venus", "Venus"], d: "easy" },
  { id: "apollo", name: ["Apollo", "Apolo", "Apollon"], f: false, dom: ["music and poetry", "la música y la poesía", "die Musik und die Dichtkunst"], deGen: "der Musik und der Dichtkunst", d: "medium", not: ["artemis"] },
  { id: "artemis", name: ["Artemis", "Artemisa", "Artemis"], f: true, dom: ["the hunt", "la caza", "die Jagd"], deGen: "der Jagd", roman: ["Diana", "Diana", "Diana"], d: "medium" },
  { id: "hermes", name: ["Hermes", "Hermes", "Hermes"], f: false, dom: ["travellers, trade and thieves", "los viajeros, el comercio y los ladrones", "die Reisenden, der Handel und die Diebe"], deGen: "der Reisenden, des Handels und der Diebe", roman: ["Mercury", "Mercurio", "Merkur"], d: "medium" },
  { id: "hephaestus", name: ["Hephaestus", "Hefesto", "Hephaistos"], f: false, dom: ["fire and the forge", "el fuego y la forja", "das Feuer und die Schmiedekunst"], deGen: "des Feuers und der Schmiedekunst", roman: ["Vulcan", "Vulcano", "Vulcanus"], d: "medium" },
  { id: "dionysus", name: ["Dionysus", "Dioniso", "Dionysos"], f: false, dom: ["wine", "el vino", "der Wein"], deGen: "des Weines", roman: ["Bacchus", "Baco", "Bacchus"], d: "medium" },
  { id: "demeter", name: ["Demeter", "Deméter", "Demeter"], f: true, dom: ["agriculture and the harvest", "la agricultura y las cosechas", "die Landwirtschaft und die Ernte"], deGen: "der Landwirtschaft und der Ernte", roman: ["Ceres", "Ceres", "Ceres"], d: "hard" },
  { id: "hestia", name: ["Hestia", "Hestia", "Hestia"], f: true, dom: ["the hearth and home", "el hogar", "das Herdfeuer und das Heim"], deGen: "des Herdfeuers und des Heims", roman: ["Vesta", "Vesta", "Vesta"], d: "hard" },
  { id: "nike", name: ["Nike", "Niké", "Nike"], f: true, dom: ["victory", "la victoria", "der Sieg"], deGen: "des Sieges", roman: ["Victoria", "Victoria", "Victoria"], d: "medium" },
  { id: "eros", name: ["Eros", "Eros", "Eros"], f: false, roman: ["Cupid", "Cupido", "Amor"], d: "medium" },
  { id: "persephone", name: ["Persephone", "Perséfone", "Persephone"], f: true, roman: ["Proserpina", "Proserpina", "Proserpina"], d: "hard" },
];

/** Clue questions: [en, es, de, answer id, excluded wrong ids] */
export type Clue = [string, string, string, string, string[]?];

// ── Norse ───────────────────────────────────────────────────────────
export const NORSE_NAMES: Record<string, { n: L; f: boolean }> = {
  odin: { n: ["Odin", "Odín", "Odin"], f: false }, thor: { n: ["Thor", "Thor", "Thor"], f: false }, loki: { n: ["Loki", "Loki", "Loki"], f: false },
  heimdall: { n: ["Heimdall", "Heimdall", "Heimdall"], f: false }, tyr: { n: ["Tyr", "Tyr", "Tyr"], f: false }, baldr: { n: ["Baldur", "Balder", "Baldur"], f: false },
  freyr: { n: ["Freyr", "Frey", "Freyr"], f: false }, frigg: { n: ["Frigg", "Frigg", "Frigg"], f: true }, freyja: { n: ["Freyja", "Freyja", "Freya"], f: true },
  hel: { n: ["Hel", "Hela", "Hel"], f: true }, idun: { n: ["Idun", "Idun", "Idun"], f: true }, sif: { n: ["Sif", "Sif", "Sif"], f: true },
};
export const NORSE_CLUES: Clue[] = [
  ["In Norse mythology, which god gave up one of his eyes in exchange for wisdom?", "En la mitología nórdica, ¿qué dios entregó uno de sus ojos a cambio de sabiduría?", "Welcher Gott der nordischen Mythologie opferte ein Auge, um Weisheit zu erlangen?", "odin"],
  ["In Norse mythology, who is the father of the gods and ruler of Asgard?", "En la mitología nórdica, ¿quién es el padre de los dioses y señor de Asgard?", "Wer ist in der nordischen Mythologie der Göttervater und Herrscher über Asgard?", "odin"],
  ["Which Norse god wields the hammer Mjölnir?", "¿Qué dios nórdico empuña el martillo Mjölnir?", "Welcher nordische Gott schwingt den Hammer Mjölnir?", "thor"],
  ["Who is the god of thunder in Norse mythology?", "¿Quién es el dios del trueno en la mitología nórdica?", "Wer ist in der nordischen Mythologie der Donnergott?", "thor"],
  ["Which Norse god is a cunning trickster and shape-shifter?", "¿Qué dios nórdico es un embaucador astuto capaz de cambiar de forma?", "Welcher nordische Gott ist ein listiger Gestaltwandler und Unruhestifter?", "loki"],
  ["In Norse mythology, who is the father of the wolf Fenrir?", "En la mitología nórdica, ¿quién es el padre del lobo Fenrir?", "Wer ist in der nordischen Mythologie der Vater des Wolfes Fenrir?", "loki"],
  ["Which Norse god guards the rainbow bridge Bifröst?", "¿Qué dios nórdico vigila el puente arcoíris Bifröst?", "Welcher nordische Gott bewacht die Regenbogenbrücke Bifröst?", "heimdall"],
  ["Which Norse god lost his hand to the wolf Fenrir?", "¿Qué dios nórdico perdió una mano por el mordisco del lobo Fenrir?", "Welchem nordischen Gott biss der Wolf Fenrir die Hand ab?", "tyr"],
  ["Which Norse god was killed by a dart made of mistletoe?", "¿Qué dios nórdico murió alcanzado por un dardo de muérdago?", "Welcher nordische Gott wurde von einem Geschoss aus Mistelholz getötet?", "baldr"],
  ["Which Norse god is the brother of the goddess Freyja?", "¿Qué dios nórdico es el hermano de la diosa Freyja?", "Welcher nordische Gott ist der Bruder der Göttin Freya?", "freyr"],
  ["In Norse mythology, who is Odin's wife?", "En la mitología nórdica, ¿quién es la esposa de Odín?", "Wer ist in der nordischen Mythologie die Ehefrau Odins?", "frigg", ["freyja"]],
  ["Which Norse goddess of love rides in a chariot pulled by cats?", "¿Qué diosa nórdica del amor viaja en un carro tirado por gatos?", "Welche nordische Liebesgöttin fährt in einem von Katzen gezogenen Wagen?", "freyja", ["frigg"]],
  ["In Norse mythology, who rules the realm of the dead that bears her name?", "En la mitología nórdica, ¿quién gobierna el reino de los muertos que lleva su nombre?", "Wer herrscht in der nordischen Mythologie über das gleichnamige Totenreich?", "hel"],
  ["Which Norse goddess guards the apples that keep the gods young?", "¿Qué diosa nórdica custodia las manzanas que mantienen jóvenes a los dioses?", "Welche nordische Göttin hütet die Äpfel, die die Götter jung halten?", "idun"],
  ["Which Norse goddess, Thor's wife, is famous for her golden hair?", "¿Qué diosa nórdica, esposa de Thor, es famosa por su cabello dorado?", "Welche nordische Göttin, Thors Ehefrau, ist für ihr goldenes Haar berühmt?", "sif"],
];
/** [term en, es, de, meaning en, es, de, plural] */
export const NORSE_TERMS: [L, L, boolean, string?][] = [
  [["Yggdrasil", "Yggdrasil", "Yggdrasil"], ["The world tree", "El árbol del mundo", "Der Weltenbaum"], false],
  [["Valhalla", "el Valhalla", "Walhall"], ["The hall of warriors who died in battle", "La sala de los guerreros caídos en combate", "Die Halle der im Kampf gefallenen Krieger"], false, "Asgard"],
  [["Ragnarök", "el Ragnarök", "Ragnarök"], ["The end of the world in a final battle of the gods", "El fin del mundo en una batalla final de los dioses", "Der Weltuntergang in einer letzten Schlacht der Götter"], false],
  [["Mjölnir", "Mjölnir", "Mjölnir"], ["Thor's hammer", "El martillo de Thor", "Thors Hammer"], false],
  [["Sleipnir", "Sleipnir", "Sleipnir"], ["Odin's eight-legged horse", "El caballo de ocho patas de Odín", "Odins achtbeiniges Pferd"], false],
  [["Bifröst", "el Bifröst", "Bifröst"], ["The rainbow bridge to Asgard", "El puente arcoíris que lleva a Asgard", "Die Regenbogenbrücke nach Asgard"], false],
  [["Asgard", "Asgard", "Asgard"], ["The home of the gods", "El hogar de los dioses", "Die Heimat der Götter"], false, "Valhalla"],
  [["Midgard", "Midgard", "Midgard"], ["The world of humans", "El mundo de los humanos", "Die Welt der Menschen"], false],
  [["the Valkyries", "las valquirias", "die Walküren"], ["Female spirits who choose which warriors die in battle", "Espíritus femeninos que eligen qué guerreros mueren en combate", "Frauengestalten, die bestimmen, welche Krieger im Kampf fallen"], true],
  [["Fenrir", "Fenrir", "Fenrir"], ["A gigantic wolf", "Un lobo gigantesco", "Ein riesiger Wolf"], false],
  [["Jörmungandr", "Jörmungandr", "Jörmungandr"], ["The serpent that encircles the world", "La serpiente que rodea el mundo", "Die Schlange, die die ganze Welt umschlingt"], false],
  [["Huginn and Muninn", "Hugin y Munin", "Hugin und Munin"], ["Odin's two ravens", "Los dos cuervos de Odín", "Odins zwei Raben"], true],
];

// ── Egyptian ────────────────────────────────────────────────────────
export const EGYPT_NAMES: Record<string, { n: L; f: boolean }> = {
  ra: { n: ["Ra", "Ra", "Ra"], f: false }, anubis: { n: ["Anubis", "Anubis", "Anubis"], f: false }, osiris: { n: ["Osiris", "Osiris", "Osiris"], f: false },
  horus: { n: ["Horus", "Horus", "Horus"], f: false }, thoth: { n: ["Thoth", "Thot", "Thot"], f: false }, sobek: { n: ["Sobek", "Sobek", "Sobek"], f: false },
  set: { n: ["Set", "Set", "Seth"], f: false }, amun: { n: ["Amun", "Amón", "Amun"], f: false }, ptah: { n: ["Ptah", "Ptah", "Ptah"], f: false },
  isis: { n: ["Isis", "Isis", "Isis"], f: true }, bastet: { n: ["Bastet", "Bastet", "Bastet"], f: true }, sekhmet: { n: ["Sekhmet", "Sejmet", "Sachmet"], f: true },
  hathor: { n: ["Hathor", "Hathor", "Hathor"], f: true }, nut: { n: ["Nut", "Nut", "Nut"], f: true }, maat: { n: ["Maat", "Maat", "Maat"], f: true },
};
export const EGYPT_CLUES: Clue[] = [
  ["Which Egyptian god is usually shown with the head of a jackal?", "¿Qué dios egipcio se representa normalmente con cabeza de chacal?", "Welcher ägyptische Gott wird meist mit einem Schakalkopf dargestellt?", "anubis", ["set"]],
  ["Which Egyptian god is usually shown with the head of a falcon?", "¿Qué dios egipcio se representa normalmente con cabeza de halcón?", "Welcher ägyptische Gott wird meist mit einem Falkenkopf dargestellt?", "horus", ["ra"]],
  ["Which Egyptian god is usually shown with the head of an ibis?", "¿Qué dios egipcio se representa normalmente con cabeza de ibis?", "Welcher ägyptische Gott wird meist mit einem Ibiskopf dargestellt?", "thoth"],
  ["Which Egyptian god is shown with the head of a crocodile?", "¿Qué dios egipcio se representa con cabeza de cocodrilo?", "Welcher ägyptische Gott wird mit einem Krokodilkopf dargestellt?", "sobek"],
  ["Which Egyptian goddess is shown as a cat or with a cat's head?", "¿Qué diosa egipcia se representa como una gata o con cabeza de gato?", "Welche ägyptische Göttin wird als Katze oder mit Katzenkopf dargestellt?", "bastet", ["sekhmet"]],
  ["Which Egyptian goddess is shown with the head of a lioness?", "¿Qué diosa egipcia se representa con cabeza de leona?", "Welche ägyptische Göttin wird mit einem Löwinnenkopf dargestellt?", "sekhmet", ["bastet", "hathor"]],
  ["Who was the Egyptian sun god who sailed across the sky in a boat every day?", "¿Quién era el dios egipcio del sol, que cada día cruzaba el cielo en una barca?", "Wer war der ägyptische Sonnengott, der täglich in einer Barke über den Himmel fuhr?", "ra", ["amun", "horus"]],
  ["Which Egyptian god ruled the underworld after being killed by his brother Set?", "¿Qué dios egipcio reinó en el inframundo tras ser asesinado por su hermano Set?", "Welcher ägyptische Gott herrschte über die Unterwelt, nachdem ihn sein Bruder Seth getötet hatte?", "osiris", ["set", "anubis"]],
  ["Which Egyptian goddess of magic was the wife of Osiris and mother of Horus?", "¿Qué diosa egipcia de la magia era la esposa de Osiris y la madre de Horus?", "Welche ägyptische Göttin der Magie war die Frau des Osiris und die Mutter des Horus?", "isis", ["hathor"]],
  ["Which Egyptian god of chaos and storms murdered his brother Osiris?", "¿Qué dios egipcio del caos y las tormentas asesinó a su hermano Osiris?", "Welcher ägyptische Gott des Chaos und der Stürme ermordete seinen Bruder Osiris?", "set", ["osiris"]],
  ["Which Egyptian goddess embodies truth, justice and cosmic order?", "¿Qué diosa egipcia encarna la verdad, la justicia y el orden cósmico?", "Welche ägyptische Göttin verkörpert Wahrheit, Gerechtigkeit und Weltordnung?", "maat"],
  ["Which Egyptian goddess personifies the sky, arching over the earth?", "¿Qué diosa egipcia personifica el cielo, arqueada sobre la tierra?", "Welche ägyptische Göttin verkörpert den Himmel, der sich über die Erde wölbt?", "nut", ["hathor"]],
  ["Which Egyptian god was the protector of embalming and mummification?", "¿Qué dios egipcio era el protector del embalsamamiento y la momificación?", "Welcher ägyptische Gott war der Schutzgott der Einbalsamierung und Mumifizierung?", "anubis", ["osiris"]],
];

// ── Hindu deities ───────────────────────────────────────────────────
export const HINDU_NAMES: Record<string, { n: L; f: boolean }> = {
  ganesha: { n: ["Ganesha", "Ganesha", "Ganesha"], f: false }, hanuman: { n: ["Hanuman", "Hanumán", "Hanuman"], f: false }, shiva: { n: ["Shiva", "Shiva", "Shiva"], f: false },
  vishnu: { n: ["Vishnu", "Vishnú", "Vishnu"], f: false }, brahma: { n: ["Brahma", "Brahma", "Brahma"], f: false }, krishna: { n: ["Krishna", "Krishna", "Krishna"], f: false },
  rama: { n: ["Rama", "Rama", "Rama"], f: false }, lakshmi: { n: ["Lakshmi", "Lakshmi", "Lakshmi"], f: true }, saraswati: { n: ["Saraswati", "Sarasvati", "Saraswati"], f: true },
  durga: { n: ["Durga", "Durga", "Durga"], f: true }, parvati: { n: ["Parvati", "Parvati", "Parvati"], f: true },
};
export const HINDU_CLUES: Clue[] = [
  ["In Hinduism, which god has the head of an elephant?", "En el hinduismo, ¿qué dios tiene cabeza de elefante?", "Welcher Gott des Hinduismus hat den Kopf eines Elefanten?", "ganesha"],
  ["In Hinduism, which god takes the form of a monkey and is devoted to Rama?", "En el hinduismo, ¿qué dios tiene forma de mono y es devoto de Rama?", "Welcher Gott des Hinduismus hat die Gestalt eines Affen und ist Rama treu ergeben?", "hanuman", ["rama"]],
  ["In Hinduism, which god is known as the Destroyer in the great trinity (Trimurti)?", "En el hinduismo, ¿qué dios es el Destructor de la gran trinidad (Trimurti)?", "Welcher Gott ist in der hinduistischen Trimurti der Zerstörer?", "shiva"],
  ["In Hinduism, which god is known as the Preserver in the great trinity (Trimurti)?", "En el hinduismo, ¿qué dios es el Preservador de la gran trinidad (Trimurti)?", "Welcher Gott ist in der hinduistischen Trimurti der Erhalter?", "vishnu", ["krishna", "rama"]],
  ["In Hinduism, which god is known as the Creator in the great trinity (Trimurti)?", "En el hinduismo, ¿qué dios es el Creador de la gran trinidad (Trimurti)?", "Welcher Gott ist in der hinduistischen Trimurti der Schöpfer?", "brahma"],
  ["In Hinduism, which goddess is associated with wealth and good fortune?", "En el hinduismo, ¿qué diosa se asocia con la riqueza y la buena suerte?", "Welche Göttin des Hinduismus steht für Reichtum und Glück?", "lakshmi"],
  ["In Hinduism, which goddess is associated with knowledge, music and the arts?", "En el hinduismo, ¿qué diosa se asocia con el conocimiento, la música y las artes?", "Welche Göttin des Hinduismus steht für Wissen, Musik und Künste?", "saraswati"],
  ["In Hinduism, which flute-playing god is an avatar of Vishnu?", "En el hinduismo, ¿qué dios que toca la flauta es un avatar de Vishnú?", "Welcher flötenspielende Gott des Hinduismus ist ein Avatar Vishnus?", "krishna", ["vishnu", "rama"]],
  ["In Hinduism, which warrior goddess rides a lion or a tiger?", "En el hinduismo, ¿qué diosa guerrera monta un león o un tigre?", "Welche kriegerische Göttin des Hinduismus reitet auf einem Löwen oder Tiger?", "durga", ["parvati"]],
];

// ── mythological creatures ──────────────────────────────────────────
export const CREATURE_NAMES: Record<string, L> = {
  pegasus: ["Pegasus", "Pegaso", "Pegasus"], medusa: ["Medusa", "Medusa", "Medusa"], minotaur: ["The Minotaur", "El Minotauro", "Der Minotaurus"],
  centaur: ["A centaur", "Un centauro", "Ein Zentaur"], cerberus: ["Cerberus", "Cerbero", "Kerberos"], cyclops: ["A cyclops", "Un cíclope", "Ein Zyklop"],
  hydra: ["The Hydra", "La Hidra", "Die Hydra"], phoenix: ["The phoenix", "El fénix", "Der Phönix"], griffin: ["A griffin", "Un grifo", "Ein Greif"],
  sphinx: ["The Sphinx", "La Esfinge", "Die Sphinx"], unicorn: ["A unicorn", "Un unicornio", "Ein Einhorn"], kraken: ["The kraken", "El kraken", "Der Kraken"],
  chimera: ["The Chimera", "La Quimera", "Die Chimäre"], basilisk: ["A basilisk", "Un basilisco", "Ein Basilisk"], faun: ["A faun", "Un fauno", "Ein Faun"],
};
export const CREATURE_CLUES: Clue[] = [
  ["Which mythological creature is a winged horse?", "¿Qué criatura mitológica es un caballo alado?", "Welches Fabelwesen ist ein geflügeltes Pferd?", "pegasus"],
  ["Which mythological creature with snakes for hair turned people to stone with her gaze?", "¿Qué criatura mitológica con serpientes por cabello convertía en piedra a las personas con su mirada?", "Welches Fabelwesen mit Schlangenhaaren verwandelte Menschen mit seinem Blick in Stein?", "medusa", ["basilisk"]],
  ["Which mythological creature was half man, half bull and lived in a labyrinth?", "¿Qué criatura mitológica era mitad hombre, mitad toro y vivía en un laberinto?", "Welches Fabelwesen war halb Mensch, halb Stier und lebte in einem Labyrinth?", "minotaur"],
  ["Which mythological creature is half human, half horse?", "¿Qué criatura mitológica es mitad humano, mitad caballo?", "Welches Fabelwesen ist halb Mensch, halb Pferd?", "centaur"],
  ["Which mythological creature is a three-headed dog that guards the underworld?", "¿Qué criatura mitológica es un perro de tres cabezas que guarda el inframundo?", "Welches Fabelwesen ist ein dreiköpfiger Hund, der die Unterwelt bewacht?", "cerberus"],
  ["Which mythological creature is a giant with a single eye in the middle of its forehead?", "¿Qué criatura mitológica es un gigante con un solo ojo en medio de la frente?", "Welches Fabelwesen ist ein Riese mit nur einem Auge mitten auf der Stirn?", "cyclops"],
  ["Which mythological creature was a many-headed serpent that grew two new heads for every one cut off?", "¿Qué criatura mitológica era una serpiente de muchas cabezas a la que le salían dos por cada una que le cortaban?", "Welches Fabelwesen war eine vielköpfige Schlange, der für jeden abgeschlagenen Kopf zwei neue wuchsen?", "hydra"],
  ["Which mythological creature is a bird that is reborn from its own ashes?", "¿Qué criatura mitológica es un ave que renace de sus propias cenizas?", "Welches Fabelwesen ist ein Vogel, der aus seiner eigenen Asche wiederaufersteht?", "phoenix"],
  ["Which mythological creature has the body of a lion and the head and wings of an eagle?", "¿Qué criatura mitológica tiene cuerpo de león y cabeza y alas de águila?", "Welches Fabelwesen hat den Körper eines Löwen und Kopf und Flügel eines Adlers?", "griffin"],
  ["Which mythological creature with a lion's body and a human head asked travellers a riddle?", "¿Qué criatura mitológica con cuerpo de león y cabeza humana planteaba un enigma a los viajeros?", "Welches Fabelwesen mit Löwenkörper und Menschenkopf stellte Reisenden ein Rätsel?", "sphinx"],
  ["Which mythological creature is a horse with a single horn on its forehead?", "¿Qué criatura mitológica es un caballo con un solo cuerno en la frente?", "Welches Fabelwesen ist ein Pferd mit einem einzigen Horn auf der Stirn?", "unicorn"],
  ["Which mythological creature is a gigantic sea monster from Scandinavian legend, like a huge squid?", "¿Qué criatura mitológica es un monstruo marino gigantesco de las leyendas escandinavas, parecido a un enorme calamar?", "Welches Fabelwesen ist ein riesiges Seeungeheuer aus skandinavischen Sagen, ähnlich einem gewaltigen Tintenfisch?", "kraken"],
  ["Which fire-breathing mythological creature is part lion, part goat and part serpent?", "¿Qué criatura mitológica que escupe fuego es en parte león, en parte cabra y en parte serpiente?", "Welches feuerspeiende Fabelwesen ist teils Löwe, teils Ziege, teils Schlange?", "chimera"],
  ["Which mythological creature is a serpent king whose gaze can kill?", "¿Qué criatura mitológica es un rey de las serpientes cuya mirada puede matar?", "Welches Fabelwesen ist ein Schlangenkönig, dessen Blick töten kann?", "basilisk", ["medusa"]],
  ["Which mythological creature from Roman myth is half man, half goat?", "¿Qué criatura de la mitología romana es mitad hombre, mitad cabra?", "Welches Fabelwesen der römischen Mythologie ist halb Mensch, halb Ziegenbock?", "faun"],
];

// ── Greek heroes & figures: name, deed (for "who …?"), known-for option, female ──
export const HEROES: { id: string; n: L; deed: L; known: L; f?: boolean; not?: string[] }[] = [
  { id: "heracles", n: ["Heracles (Hercules)", "Heracles (Hércules)", "Herakles"], deed: ["had to perform twelve labours", "tuvo que realizar doce trabajos", "musste zwölf Arbeiten vollbringen"], known: ["Performing twelve labours", "Realizar doce trabajos", "Zwölf Arbeiten vollbringen"], not: ["atlas"] },
  { id: "theseus", n: ["Theseus", "Teseo", "Theseus"], deed: ["killed the Minotaur in the labyrinth on Crete", "mató al Minotauro en el laberinto de Creta", "tötete den Minotaurus im Labyrinth von Kreta"], known: ["Killing the Minotaur", "Matar al Minotauro", "Den Minotaurus töten"] },
  { id: "perseus", n: ["Perseus", "Perseo", "Perseus"], deed: ["cut off the head of Medusa", "le cortó la cabeza a Medusa", "schlug der Medusa den Kopf ab"], known: ["Beheading Medusa", "Decapitar a Medusa", "Medusa enthaupten"] },
  { id: "jason", n: ["Jason", "Jasón", "Jason"], deed: ["led the Argonauts in search of the Golden Fleece", "dirigió a los argonautas en busca del vellocino de oro", "führte die Argonauten auf der Suche nach dem Goldenen Vlies an"], known: ["Seeking the Golden Fleece", "Buscar el vellocino de oro", "Das Goldene Vlies suchen"] },
  { id: "odysseus", n: ["Odysseus (Ulysses)", "Odiseo (Ulises)", "Odysseus"], deed: ["took ten years to sail home to Ithaca after the Trojan War", "tardó diez años en volver a Ítaca tras la guerra de Troya", "brauchte nach dem Trojanischen Krieg zehn Jahre für die Heimreise nach Ithaka"], known: ["Taking ten years to sail home to Ithaca", "Tardar diez años en volver a Ítaca", "Zehn Jahre lang nach Ithaka heimirren"] },
  { id: "achilles", n: ["Achilles", "Aquiles", "Achilles"], deed: ["could only be wounded in his heel", "solo era vulnerable en el talón", "war nur an der Ferse verwundbar"], known: ["Being vulnerable only in his heel", "Ser vulnerable solo en el talón", "Nur an der Ferse verwundbar sein"] },
  { id: "icarus", n: ["Icarus", "Ícaro", "Ikarus"], deed: ["flew too close to the sun on wings of feathers and wax", "voló demasiado cerca del sol con alas de plumas y cera", "flog mit Flügeln aus Federn und Wachs zu nah an die Sonne"], known: ["Flying too close to the sun", "Volar demasiado cerca del sol", "Zu nah an die Sonne fliegen"] },
  { id: "prometheus", n: ["Prometheus", "Prometeo", "Prometheus"], deed: ["stole fire from the gods and gave it to humans", "robó el fuego a los dioses para dárselo a los humanos", "stahl den Göttern das Feuer und brachte es den Menschen"], known: ["Stealing fire from the gods", "Robar el fuego a los dioses", "Den Göttern das Feuer stehlen"] },
  { id: "pandora", n: ["Pandora", "Pandora", "Pandora"], f: true, deed: ["opened a jar (or box) that released all evils into the world", "abrió una vasija (o caja) que liberó todos los males del mundo", "öffnete ein Gefäß (oder eine Büchse), das alle Übel in die Welt entließ"], known: ["Releasing all evils into the world", "Liberar todos los males del mundo", "Alle Übel in die Welt lassen"] },
  { id: "narcissus", n: ["Narcissus", "Narciso", "Narziss"], deed: ["fell in love with his own reflection", "se enamoró de su propio reflejo", "verliebte sich in sein eigenes Spiegelbild"], known: ["Falling in love with his own reflection", "Enamorarse de su propio reflejo", "Sich in das eigene Spiegelbild verlieben"] },
  { id: "midas", n: ["King Midas", "El rey Midas", "König Midas"], deed: ["turned everything he touched into gold", "convertía en oro todo lo que tocaba", "verwandelte alles, was er berührte, in Gold"], known: ["Turning everything he touched into gold", "Convertir en oro todo lo que tocaba", "Alles, was er berührte, in Gold verwandeln"] },
  { id: "sisyphus", n: ["Sisyphus", "Sísifo", "Sisyphos"], deed: ["was condemned to roll a boulder up a hill forever", "fue condenado a empujar eternamente una roca cuesta arriba", "wurde verurteilt, auf ewig einen Felsblock einen Berg hinaufzurollen"], known: ["Rolling a boulder uphill forever", "Empujar eternamente una roca cuesta arriba", "Ewig einen Felsblock bergauf rollen"] },
  { id: "orpheus", n: ["Orpheus", "Orfeo", "Orpheus"], deed: ["went down to the underworld to bring back his wife Eurydice", "bajó al inframundo para rescatar a su esposa Eurídice", "stieg in die Unterwelt hinab, um seine Frau Eurydike zurückzuholen"], known: ["Trying to bring Eurydice back from the underworld", "Intentar rescatar a Eurídice del inframundo", "Eurydike aus der Unterwelt zurückholen wollen"] },
  { id: "atlas", n: ["Atlas", "Atlas", "Atlas"], deed: ["was condemned to hold up the sky on his shoulders", "fue condenado a sostener el cielo sobre sus hombros", "musste zur Strafe das Himmelsgewölbe auf seinen Schultern tragen"], known: ["Holding up the sky", "Sostener el cielo", "Das Himmelsgewölbe tragen"], not: ["heracles"] },
  { id: "oedipus", n: ["Oedipus", "Edipo", "Ödipus"], deed: ["solved the riddle of the Sphinx", "resolvió el enigma de la Esfinge", "löste das Rätsel der Sphinx"], known: ["Solving the riddle of the Sphinx", "Resolver el enigma de la Esfinge", "Das Rätsel der Sphinx lösen"] },
];

// ── music ───────────────────────────────────────────────────────────
export const INSTRUMENT_FAMILIES: Record<string, { pl: L; one: L }> = {
  string: { pl: ["String instruments", "Instrumentos de cuerda", "Saiteninstrumente"], one: ["a string instrument", "un instrumento de cuerda", "ein Saiteninstrument"] },
  woodwind: { pl: ["Woodwind instruments", "Instrumentos de viento madera", "Holzblasinstrumente"], one: ["a woodwind instrument", "un instrumento de viento madera", "ein Holzblasinstrument"] },
  brass: { pl: ["Brass instruments", "Instrumentos de viento metal", "Blechblasinstrumente"], one: ["a brass instrument", "un instrumento de viento metal", "ein Blechblasinstrument"] },
  percussion: { pl: ["Percussion instruments", "Instrumentos de percusión", "Schlaginstrumente"], one: ["a percussion instrument", "un instrumento de percusión", "ein Schlaginstrument"] },
};
/** [en, es, de (with article), family, metal-bodied woodwind?] */
export const INSTRUMENTS: [string, string, string, string, boolean?][] = [
  ["the violin", "el violín", "die Geige", "string"], ["the viola", "la viola", "die Bratsche", "string"], ["the cello", "el violonchelo", "das Cello", "string"],
  ["the double bass", "el contrabajo", "der Kontrabass", "string"], ["the harp", "el arpa", "die Harfe", "string"], ["the guitar", "la guitarra", "die Gitarre", "string"],
  ["the banjo", "el banjo", "das Banjo", "string"], ["the mandolin", "la mandolina", "die Mandoline", "string"], ["the ukulele", "el ukelele", "die Ukulele", "string"],
  ["the sitar", "el sitar", "die Sitar", "string"], ["the lute", "el laúd", "die Laute", "string"], ["the balalaika", "la balalaica", "die Balalaika", "string"],
  ["the flute", "la flauta travesera", "die Querflöte", "woodwind", true], ["the clarinet", "el clarinete", "die Klarinette", "woodwind"], ["the oboe", "el oboe", "die Oboe", "woodwind"],
  ["the bassoon", "el fagot", "das Fagott", "woodwind"], ["the saxophone", "el saxofón", "das Saxofon", "woodwind", true], ["the piccolo", "el flautín", "die Piccoloflöte", "woodwind", true],
  ["the recorder", "la flauta dulce", "die Blockflöte", "woodwind"],
  ["the trumpet", "la trompeta", "die Trompete", "brass"], ["the trombone", "el trombón", "die Posaune", "brass"], ["the French horn", "la trompa", "das Waldhorn", "brass"],
  ["the tuba", "la tuba", "die Tuba", "brass"], ["the cornet", "la corneta de pistones", "das Kornett", "brass"], ["the flugelhorn", "el fliscorno", "das Flügelhorn", "brass"],
  ["the euphonium", "el bombardino", "das Euphonium", "brass"], ["the sousaphone", "el sousáfono", "das Sousafon", "brass"],
  ["the snare drum", "la caja (redoblante)", "die kleine Trommel", "percussion"], ["the timpani", "los timbales", "die Pauken", "percussion"], ["the xylophone", "el xilófono", "das Xylofon", "percussion"],
  ["the cymbals", "los platillos", "die Becken", "percussion"], ["the triangle", "el triángulo", "der Triangel", "percussion"], ["the tambourine", "la pandereta", "das Tamburin", "percussion"],
  ["the castanets", "las castañuelas", "die Kastagnetten", "percussion"], ["the marimba", "la marimba", "die Marimba", "percussion"], ["the bongos", "los bongós", "die Bongos", "percussion"],
  ["the gong", "el gong", "der Gong", "percussion"],
];
/** [en, es, de, strings, difficulty] */
export const STRINGS: [string, string, string, number, "easy" | "medium" | "hard"][] = [
  ["a violin", "un violín", "eine Geige", 4, "easy"], ["a viola", "una viola", "eine Bratsche", 4, "medium"], ["a cello", "un violonchelo", "ein Cello", 4, "medium"],
  ["a double bass", "un contrabajo", "ein Kontrabass", 4, "medium"], ["a classical guitar", "una guitarra clásica", "eine klassische Gitarre", 6, "easy"],
  ["a ukulele", "un ukelele", "eine Ukulele", 4, "medium"], ["an electric bass guitar", "un bajo eléctrico", "ein E-Bass", 4, "medium"],
  ["a balalaika", "una balalaica", "eine Balalaika", 3, "hard"], ["a mandolin", "una mandolina", "eine Mandoline", 8, "hard"],
];
/** [term, meaning en, es, de, conflict group] */
export const MUSIC_TERMS: [string, string, string, string, string][] = [
  ["allegro", "Fast and lively", "Rápido y alegre", "Schnell und lebhaft", "fast"],
  ["presto", "Very fast", "Muy rápido", "Sehr schnell", "fast"],
  ["andante", "At a walking pace", "A paso tranquilo, como caminando", "In gehendem, ruhigem Tempo", "andante"],
  ["adagio", "Slowly and calmly", "Lento y pausado", "Langsam und ruhig", "slow"],
  ["forte", "Loud", "Fuerte", "Laut", "loud"],
  ["fortissimo", "Very loud", "Muy fuerte", "Sehr laut", "loud"],
  ["piano", "Soft (quiet)", "Suave (bajo de volumen)", "Leise", "soft"],
  ["pianissimo", "Very soft", "Muy suave", "Sehr leise", "soft"],
  ["crescendo", "Gradually getting louder", "Aumentando poco a poco el volumen", "Allmählich lauter werdend", "cresc"],
  ["diminuendo", "Gradually getting softer", "Disminuyendo poco a poco el volumen", "Allmählich leiser werdend", "dim"],
  ["accelerando", "Gradually getting faster", "Acelerando poco a poco", "Allmählich schneller werdend", "accel"],
  ["ritardando", "Gradually slowing down", "Retardando poco a poco", "Allmählich langsamer werdend", "rit"],
  ["staccato", "Short, detached notes", "Notas cortas y separadas", "Kurz abgesetzte Töne", "stacc"],
  ["legato", "Smoothly connected notes", "Notas ligadas, sin cortes", "Gebunden, fließend verbundene Töne", "leg"],
  ["a cappella", "Singing without instrumental accompaniment", "Canto sin acompañamiento instrumental", "Gesang ohne Instrumentalbegleitung", "acap"],
  ["pizzicato", "Plucking the strings instead of bowing", "Pulsar las cuerdas con los dedos en vez de usar el arco", "Die Saiten zupfen statt streichen", "pizz"],
  ["tutti", "Everyone plays together", "Todos tocan juntos", "Alle spielen zusammen", "tutti"],
  ["da capo", "Repeat from the beginning", "Repetir desde el principio", "Von Anfang an wiederholen", "dc"],
  ["vibrato", "A slight, rapid wavering of the pitch", "Una ligera y rápida oscilación de la altura del sonido", "Ein leichtes, schnelles Schwanken der Tonhöhe", "vib"],
];
/** voice types, highest = 6 */
export const VOICES: [string, string, string, number][] = [
  ["Soprano", "Soprano", "Sopran", 6], ["Mezzo-soprano", "Mezzosoprano", "Mezzosopran", 5], ["Alto", "Contralto", "Alt", 4],
  ["Tenor", "Tenor", "Tenor", 3], ["Baritone", "Barítono", "Bariton", 2], ["Bass", "Bajo", "Bass", 1],
];
export const LANGS: Record<string, L> = {
  italian: ["Italian", "Italiano", "Italienisch"], german: ["German", "Alemán", "Deutsch"], french: ["French", "Francés", "Französisch"],
  russian: ["Russian", "Ruso", "Russisch"], czech: ["Czech", "Checo", "Tschechisch"], english: ["English", "Inglés", "Englisch"],
  hungarian: ["Hungarian", "Húngaro", "Ungarisch"], spanish: ["Spanish", "Español", "Spanisch"],
};
/** operas: [en, es, de, original language, difficulty] */
export const OPERAS: [string, string, string, string, "easy" | "medium" | "hard"][] = [
  ["The Magic Flute", "La flauta mágica", "Die Zauberflöte", "german", "medium"],
  ["The Marriage of Figaro", "Las bodas de Fígaro", "Die Hochzeit des Figaro", "italian", "hard"],
  ["Don Giovanni", "Don Giovanni", "Don Giovanni", "italian", "medium"],
  ["Così fan tutte", "Così fan tutte", "Così fan tutte", "italian", "medium"],
  ["Fidelio", "Fidelio", "Fidelio", "german", "hard"],
  ["Carmen", "Carmen", "Carmen", "french", "medium"],
  ["Faust (Gounod)", "Fausto (Gounod)", "Faust (Gounod)", "french", "hard"],
  ["The Tales of Hoffmann", "Los cuentos de Hoffmann", "Hoffmanns Erzählungen", "french", "hard"],
  ["Samson and Delilah", "Sansón y Dalila", "Samson et Dalila", "french", "hard"],
  ["Pelléas and Mélisande", "Peleas y Melisande", "Pelléas et Mélisande", "french", "hard"],
  ["La traviata", "La traviata", "La traviata", "italian", "easy"],
  ["Aida", "Aida", "Aida", "italian", "easy"],
  ["Rigoletto", "Rigoletto", "Rigoletto", "italian", "easy"],
  ["Nabucco", "Nabucco", "Nabucco", "italian", "easy"],
  ["Madama Butterfly", "Madama Butterfly", "Madama Butterfly", "italian", "easy"],
  ["Tosca", "Tosca", "Tosca", "italian", "easy"],
  ["Turandot", "Turandot", "Turandot", "italian", "medium"],
  ["The Barber of Seville", "El barbero de Sevilla", "Der Barbier von Sevilla", "italian", "medium"],
  ["Cavalleria rusticana", "Cavalleria rusticana", "Cavalleria rusticana", "italian", "easy"],
  ["Lohengrin", "Lohengrin", "Lohengrin", "german", "medium"],
  ["Tristan and Isolde", "Tristán e Isolda", "Tristan und Isolde", "german", "medium"],
  ["The Ring of the Nibelung", "El anillo del nibelungo", "Der Ring des Nibelungen", "german", "easy"],
  ["Der Rosenkavalier", "El caballero de la rosa", "Der Rosenkavalier", "german", "medium"],
  ["Hansel and Gretel (Humperdinck)", "Hansel y Gretel (Humperdinck)", "Hänsel und Gretel (Humperdinck)", "german", "medium"],
  ["Eugene Onegin", "Eugenio Oneguin", "Eugen Onegin", "russian", "medium"],
  ["Boris Godunov", "Borís Godunov", "Boris Godunow", "russian", "medium"],
  ["Prince Igor", "El príncipe Ígor", "Fürst Igor", "russian", "medium"],
  ["The Bartered Bride", "La novia vendida", "Die verkaufte Braut", "czech", "hard"],
  ["Rusalka", "Rusalka", "Rusalka", "czech", "hard"],
  ["Porgy and Bess", "Porgy and Bess", "Porgy and Bess", "english", "medium"],
  ["Peter Grimes", "Peter Grimes", "Peter Grimes", "english", "hard"],
  ["Dido and Aeneas", "Dido y Eneas", "Dido and Aeneas", "english", "hard"],
  ["Bluebeard's Castle", "El castillo de Barbazul", "Herzog Blaubarts Burg", "hungarian", "hard"],
  ["Giulio Cesare (Handel)", "Giulio Cesare (Händel)", "Giulio Cesare (Händel)", "italian", "hard"],
];

/** People → country: [name (or [en, es, de]), country id, excluded wrong countries, flags: f = female, a = alive, e/h = easy/hard] */
export type PersonRow = [string | L, string, string[]?, string?];
export const COMPOSERS: PersonRow[] = [
  ["Wolfgang Amadeus Mozart", "austria", [], "e"], ["Joseph Haydn", "austria"], ["Franz Schubert", "austria"], ["Johann Strauss II", "austria"], ["Anton Bruckner", "austria", [], "h"],
  ["Johann Sebastian Bach", "germany", [], "e"], ["Ludwig van Beethoven", "germany", ["austria"], "e"], ["Johannes Brahms", "germany", ["austria"]], ["Richard Wagner", "germany"],
  ["Felix Mendelssohn", "germany"], ["Robert Schumann", "germany"], ["Carl Orff", "germany", ["austria"], "h"], ["Johann Pachelbel", "germany", [], "h"], ["Richard Strauss", "germany", ["austria"], "h"],
  ["Antonio Vivaldi", "italy", [], "e"], ["Giuseppe Verdi", "italy", [], "e"], ["Giacomo Puccini", "italy"], ["Gioachino Rossini", "italy"], ["Claudio Monteverdi", "italy", [], "h"],
  ["Ennio Morricone", "italy"], ["Niccolò Paganini", "italy"],
  ["Claude Debussy", "france"], ["Maurice Ravel", "france"], ["Camille Saint-Saëns", "france"], ["Georges Bizet", "france"], ["Hector Berlioz", "france", [], "h"], ["Erik Satie", "france", [], "h"],
  [["Pyotr Ilyich Tchaikovsky", "Piotr Ilich Chaikovski", "Pjotr Iljitsch Tschaikowski"], "russia", ["ukraine"], "e"],
  [["Sergei Rachmaninoff", "Serguéi Rajmáninov", "Sergei Rachmaninow"], "russia", ["usa"]],
  [["Modest Mussorgsky", "Modest Músorgski", "Modest Mussorgski"], "russia", [], "h"],
  [["Nikolai Rimsky-Korsakov", "Nikolái Rimski-Kórsakov", "Nikolai Rimski-Korsakow"], "russia", [], "h"],
  [["Dmitri Shostakovich", "Dmitri Shostakóvich", "Dmitri Schostakowitsch"], "russia"],
  [["Sergei Prokofiev", "Serguéi Prokófiev", "Sergei Prokofjew"], "russia", ["ukraine"]],
  ["Frédéric Chopin", "poland", ["france"], "e"], ["Krzysztof Penderecki", "poland", [], "h"],
  ["Antonín Dvořák", "czechia"], ["Bedřich Smetana", "czechia", [], "h"], ["Leoš Janáček", "czechia", [], "h"],
  ["Franz Liszt", "hungary", ["austria"]], ["Béla Bartók", "hungary", ["romania", "usa"]],
  ["Edvard Grieg", "norway"], ["Jean Sibelius", "finland"], ["Carl Nielsen", "denmark", [], "h"],
  ["Manuel de Falla", "spain"], ["Isaac Albéniz", "spain"], ["Joaquín Rodrigo", "spain"], ["Enrique Granados", "spain", [], "h"],
  ["Edward Elgar", "uk"], ["Gustav Holst", "uk"], ["Benjamin Britten", "uk"], ["Henry Purcell", "uk", [], "h"], ["Ralph Vaughan Williams", "uk", [], "h"],
  ["George Gershwin", "usa"], ["Leonard Bernstein", "usa"], ["Aaron Copland", "usa", [], "h"], ["John Williams", "usa", [], "a"],
  ["Astor Piazzolla", "argentina", ["uruguay", "usa"]], ["Heitor Villa-Lobos", "brazil", [], "h"],
];

/** musicals: [en, es, de, composer key, excluded composer keys] */
export const MUSICAL_COMPOSERS: Record<string, L> = {
  lloyd: ["Andrew Lloyd Webber", "Andrew Lloyd Webber", "Andrew Lloyd Webber"], bernstein: ["Leonard Bernstein", "Leonard Bernstein", "Leonard Bernstein"],
  schonberg: ["Claude-Michel Schönberg", "Claude-Michel Schönberg", "Claude-Michel Schönberg"], miranda: ["Lin-Manuel Miranda", "Lin-Manuel Miranda", "Lin-Manuel Miranda"],
  rodgers: ["Rodgers and Hammerstein", "Rodgers y Hammerstein", "Rodgers und Hammerstein"], kander: ["Kander and Ebb", "Kander y Ebb", "Kander und Ebb"],
  abba: ["Benny Andersson and Björn Ulvaeus (ABBA)", "Benny Andersson y Björn Ulvaeus (ABBA)", "Benny Andersson und Björn Ulvaeus (ABBA)"],
  schwartz: ["Stephen Schwartz", "Stephen Schwartz", "Stephen Schwartz"], sondheim: ["Stephen Sondheim", "Stephen Sondheim", "Stephen Sondheim"],
  larson: ["Jonathan Larson", "Jonathan Larson", "Jonathan Larson"], lerner: ["Lerner and Loewe", "Lerner y Loewe", "Lerner und Loewe"],
  bock: ["Jerry Bock", "Jerry Bock", "Jerry Bock"], pasek: ["Pasek and Paul", "Pasek y Paul", "Pasek und Paul"],
};
export const MUSICALS: [string, string, string, string, string[]?][] = [
  ["Cats", "Cats", "Cats", "lloyd"], ["The Phantom of the Opera", "El fantasma de la ópera", "Das Phantom der Oper", "lloyd"], ["Evita", "Evita", "Evita", "lloyd"],
  ["Jesus Christ Superstar", "Jesucristo Superstar", "Jesus Christ Superstar", "lloyd"], ["West Side Story", "West Side Story", "West Side Story", "bernstein", ["sondheim"]],
  ["Les Misérables", "Los miserables", "Les Misérables", "schonberg"], ["Miss Saigon", "Miss Saigon", "Miss Saigon", "schonberg"],
  ["Hamilton", "Hamilton", "Hamilton", "miranda"], ["In the Heights", "In the Heights", "In the Heights", "miranda"],
  ["The Sound of Music", "Sonrisas y lágrimas (The Sound of Music)", "The Sound of Music", "rodgers"], ["The King and I", "El rey y yo", "Der König und ich", "rodgers"],
  ["Oklahoma!", "Oklahoma!", "Oklahoma!", "rodgers"], ["Chicago", "Chicago", "Chicago", "kander"], ["Cabaret", "Cabaret", "Cabaret", "kander"],
  ["Mamma Mia!", "Mamma Mia!", "Mamma Mia!", "abba"], ["Wicked", "Wicked", "Wicked", "schwartz"], ["Sweeney Todd", "Sweeney Todd", "Sweeney Todd", "sondheim"],
  ["Into the Woods", "Into the Woods", "Into the Woods", "sondheim"], ["Rent", "Rent", "Rent", "larson"], ["My Fair Lady", "My Fair Lady", "My Fair Lady", "lerner"],
  ["Fiddler on the Roof", "El violinista en el tejado", "Anatevka (Fiddler on the Roof)", "bock"], ["Dear Evan Hansen", "Dear Evan Hansen", "Dear Evan Hansen", "pasek"],
];

/** music genres: [en, es, de, country, excluded] */
export const GENRES: [string, string, string, string, string[]?][] = [
  ["fado", "el fado", "der Fado", "portugal"], ["reggae", "el reggae", "der Reggae", "jamaica"], ["ska", "el ska", "der Ska", "jamaica"],
  ["bossa nova", "la bossa nova", "der Bossa Nova", "brazil"], ["sertanejo", "el sertanejo", "der Sertanejo", "brazil"],
  ["mariachi", "el mariachi", "der Mariachi", "mexico"], ["ranchera", "la ranchera", "die Ranchera", "mexico"],
  ["K-pop", "el K-pop", "der K-Pop", "south_korea"], ["J-pop", "el J-pop", "der J-Pop", "japan"], ["enka", "el enka", "der Enka", "japan"],
  ["Afrobeat", "el afrobeat", "der Afrobeat", "nigeria", ["ghana"]], ["highlife", "el highlife", "der Highlife", "ghana", ["nigeria"]],
  ["chanson", "la chanson", "das Chanson", "france"], ["Britpop", "el britpop", "der Britpop", "uk"],
  ["kwaito", "el kwaito", "der Kwaito", "south_africa"], ["raï", "el raï", "der Raï", "algeria", ["morocco"]],
  ["gamelan", "el gamelán", "die Gamelan-Musik", "indonesia"], ["vallenato", "el vallenato", "der Vallenato", "colombia", ["venezuela"]],
  ["son cubano", "el son cubano", "der Son Cubano", "cuba"], ["rebetiko", "el rebético", "der Rembetiko", "greece", ["turkey"]],
  ["blues", "el blues", "der Blues", "usa"], ["bluegrass", "el bluegrass", "der Bluegrass", "usa"], ["grunge", "el grunge", "der Grunge", "usa"],
  ["Neue Deutsche Welle", "la Neue Deutsche Welle", "die Neue Deutsche Welle", "germany", ["austria"]], ["krautrock", "el krautrock", "der Krautrock", "germany"],
  ["soukous", "el soukous", "der Soukous", "dr_congo"], ["mbalax", "el mbalax", "der Mbalax", "senegal"], ["gnawa", "la música gnawa", "die Gnawa-Musik", "morocco", ["algeria"]],
];

/** traditional instruments → country: [en, es, de, country, excluded] */
export const FOLK_INSTRUMENTS: [string, string, string, string, string[]?][] = [
  ["didgeridoo", "didgeridoo", "Didgeridoo", "australia"], ["balalaika", "balalaica", "Balalaika", "russia", ["ukraine", "belarus"]],
  ["koto", "koto", "Koto", "japan"], ["shamisen", "shamisen", "Shamisen", "japan"], ["shakuhachi", "shakuhachi", "Shakuhachi", "japan"],
  ["erhu", "erhu", "Erhu", "china"], ["guzheng", "guzheng", "Guzheng", "china"], ["bouzouki", "buzuki", "Bouzouki", "greece"],
  ["castanets", "castañuelas", "Kastagnetten", "spain"], ["cajón", "cajón", "Cajón", "peru", ["cuba"]], ["mbira", "mbira", "Mbira", "zimbabwe"],
  ["sitar", "sitar", "Sitar", "india", ["pakistan", "bangladesh", "nepal"]], ["tabla", "tabla", "Tabla", "india", ["pakistan", "bangladesh", "nepal"]],
  ["kantele", "kantele", "Kantele", "finland", ["estonia", "latvia", "lithuania", "russia"]], ["Hardanger fiddle", "violín de Hardanger", "Hardangerfiedel", "norway"],
  ["uilleann pipes", "gaita irlandesa (uilleann)", "Uilleann Pipes", "ireland", ["uk"]], ["bodhrán", "bodhrán", "Bodhrán", "ireland", ["uk"]],
  ["gayageum", "gayageum", "Gayageum", "south_korea", ["north_korea"]], ["cuatro", "cuatro venezolano", "Cuatro", "venezuela", ["colombia"]],
];

/** dances → country: [en, es, de, country, excluded] */
export const DANCES: [string, string, string, string, string[]?][] = [
  ["tango", "tango", "Tango", "argentina", ["uruguay"]], ["flamenco", "flamenco", "Flamenco", "spain"], ["samba", "samba", "Samba", "brazil"],
  ["haka", "haka", "Haka", "new_zealand"], ["mambo", "mambo", "Mambo", "cuba"], ["cha-cha-cha", "chachachá", "Cha-Cha-Cha", "cuba"],
  ["rumba", "rumba", "Rumba", "cuba", ["spain"]], ["merengue", "merengue", "Merengue", "dominican_rep", ["haiti"]], ["bachata", "bachata", "Bachata", "dominican_rep"],
  ["cumbia", "cumbia", "Cumbia", "colombia"], ["lambada", "lambada", "Lambada", "brazil", ["bolivia"]], ["forró", "forró", "Forró", "brazil"],
  ["tarantella", "tarantela", "Tarantella", "italy"], ["sirtaki", "sirtaki", "Sirtaki", "greece"], ["csárdás", "czardas", "Csárdás", "hungary"],
  ["mazurka", "mazurca", "Mazurka", "poland"], ["polonaise", "polonesa", "Polonaise", "poland"], ["polka", "polca", "Polka", "czechia", ["poland", "slovakia"]],
  ["bharatanatyam", "bharatanatyam", "Bharatanatyam", "india"], ["kathak", "kathak", "Kathak", "india", ["pakistan"]], ["hopak", "hopak", "Hopak", "ukraine"],
  ["Charleston", "charlestón", "Charleston", "usa"], ["cancan", "cancán", "Cancan", "france"], ["kizomba", "kizomba", "Kizomba", "angola"],
  ["marinera", "marinera", "Marinera", "peru"], ["cueca", "cueca", "Cueca", "chile", ["bolivia", "argentina"]], ["jarabe tapatío", "jarabe tapatío", "Jarabe Tapatío", "mexico"],
  ["sardana", "sardana", "Sardana", "spain"], ["jota", "jota", "Jota", "spain"], ["Morris dance", "danza Morris", "Morris Dance", "uk"],
  ["tinikling", "tinikling", "Tinikling", "philippines"], ["kecak", "kecak", "Kecak", "indonesia"], ["gumboot dance", "danza gumboot", "Gumboot-Tanz", "south_africa"],
];

// ── visual art ──────────────────────────────────────────────────────
/** movements: label + group of movements that must never appear together */
export const MOVEMENTS: Record<string, { n: L; g?: string }> = {
  impressionism: { n: ["Impressionism", "Impresionismo", "Impressionismus"], g: "imp" },
  postimp: { n: ["Post-Impressionism", "Postimpresionismo", "Postimpressionismus"], g: "imp" },
  pointillism: { n: ["Pointillism", "Puntillismo", "Pointillismus"], g: "imp" },
  cubism: { n: ["Cubism", "Cubismo", "Kubismus"] },
  surrealism: { n: ["Surrealism", "Surrealismo", "Surrealismus"] },
  pop: { n: ["Pop Art", "Arte pop", "Pop-Art"] },
  expressionism: { n: ["Expressionism", "Expresionismo", "Expressionismus"], g: "exp" },
  abstractexp: { n: ["Abstract Expressionism", "Expresionismo abstracto", "Abstrakter Expressionismus"], g: "exp" },
  fauvism: { n: ["Fauvism", "Fauvismo", "Fauvismus"], g: "exp" },
  renaissance: { n: ["Renaissance", "Renacimiento", "Renaissance"] },
  baroque: { n: ["Baroque", "Barroco", "Barock"] },
  romanticism: { n: ["Romanticism", "Romanticismo", "Romantik"] },
  artnouveau: { n: ["Art Nouveau", "Art nouveau (modernismo)", "Jugendstil"] },
  destijl: { n: ["De Stijl", "De Stijl (neoplasticismo)", "De Stijl"] },
};
/** [artist, movement, excluded movements] */
export const ARTIST_MOVEMENT: [string, string, string[]?][] = [
  ["Claude Monet", "impressionism"], ["Pierre-Auguste Renoir", "impressionism"], ["Edgar Degas", "impressionism"], ["Camille Pissarro", "impressionism"],
  ["Alfred Sisley", "impressionism"], ["Berthe Morisot", "impressionism"],
  ["Vincent van Gogh", "postimp"], ["Paul Cézanne", "postimp", ["cubism"]], ["Paul Gauguin", "postimp"], ["Henri de Toulouse-Lautrec", "postimp", ["artnouveau"]],
  ["Georges Seurat", "pointillism"], ["Paul Signac", "pointillism"],
  ["Pablo Picasso", "cubism", ["surrealism"]], ["Georges Braque", "cubism", ["fauvism"]], ["Juan Gris", "cubism"], ["Fernand Léger", "cubism"],
  ["Salvador Dalí", "surrealism", ["cubism"]], ["René Magritte", "surrealism"], ["Max Ernst", "surrealism"], ["Joan Miró", "surrealism"], ["Yves Tanguy", "surrealism"],
  ["Andy Warhol", "pop"], ["Roy Lichtenstein", "pop"], ["Claes Oldenburg", "pop"], ["Richard Hamilton", "pop"],
  ["Edvard Munch", "expressionism"], ["Ernst Ludwig Kirchner", "expressionism"], ["Egon Schiele", "expressionism", ["artnouveau"]], ["Franz Marc", "expressionism"], ["Emil Nolde", "expressionism"],
  ["Jackson Pollock", "abstractexp"], ["Mark Rothko", "abstractexp"], ["Willem de Kooning", "abstractexp"],
  ["Henri Matisse", "fauvism"], ["André Derain", "fauvism"], ["Maurice de Vlaminck", "fauvism"],
  ["Leonardo da Vinci", "renaissance"], ["Michelangelo", "renaissance"], ["Raphael", "renaissance"], ["Sandro Botticelli", "renaissance"], ["Titian", "renaissance"], ["Albrecht Dürer", "renaissance"],
  ["Caravaggio", "baroque"], ["Rembrandt", "baroque"], ["Peter Paul Rubens", "baroque"], ["Diego Velázquez", "baroque"], ["Johannes Vermeer", "baroque"],
  ["Caspar David Friedrich", "romanticism"], ["Eugène Delacroix", "romanticism"], ["Théodore Géricault", "romanticism"], ["J. M. W. Turner", "romanticism", ["impressionism"]],
  ["Alphonse Mucha", "artnouveau"], ["Gustav Klimt", "artnouveau", ["expressionism"]], ["Aubrey Beardsley", "artnouveau"],
  ["Piet Mondrian", "destijl", ["cubism"]], ["Theo van Doesburg", "destijl"],
];

export const CITIES: Record<string, L> = {
  paris: ["Paris", "París", "Paris"], madrid: ["Madrid", "Madrid", "Madrid"], florence: ["Florence", "Florencia", "Florenz"], amsterdam: ["Amsterdam", "Ámsterdam", "Amsterdam"],
  stpete: ["St Petersburg", "San Petersburgo", "Sankt Petersburg"], moscow: ["Moscow", "Moscú", "Moskau"], newyork: ["New York", "Nueva York", "New York"],
  london: ["London", "Londres", "London"], berlin: ["Berlin", "Berlín", "Berlin"], vienna: ["Vienna", "Viena", "Wien"], munich: ["Munich", "Múnich", "München"],
  thehague: ["The Hague", "La Haya", "Den Haag"], athens: ["Athens", "Atenas", "Athen"], oslo: ["Oslo", "Oslo", "Oslo"], milan: ["Milan", "Milán", "Mailand"],
  losangeles: ["Los Angeles", "Los Ángeles", "Los Angeles"], istanbul: ["Istanbul", "Estambul", "Istanbul"], figueres: ["Figueres", "Figueres", "Figueres"],
  vatican: ["Vatican City", "Ciudad del Vaticano", "Vatikanstadt"], rome: ["Rome", "Roma", "Rom"], barcelona: ["Barcelona", "Barcelona", "Barcelona"],
  venice: ["Venice", "Venecia", "Venedig"], brussels: ["Brussels", "Bruselas", "Brüssel"], lisbon: ["Lisbon", "Lisboa", "Lissabon"], prague: ["Prague", "Praga", "Prag"],
};
/** museums: name [en, es, de], German "im/in der …" form, city, difficulty, used in museum→city? */
export interface Museum { n: L; deIn: string; city: string; d: "easy" | "medium" | "hard"; noCity?: boolean; notCity?: string[] }
export const MUSEUMS: Record<string, Museum> = {
  louvre: { n: ["the Louvre", "el Museo del Louvre", "der Louvre"], deIn: "im Louvre", city: "paris", d: "easy" },
  orsay: { n: ["the Musée d'Orsay", "el Museo de Orsay", "das Musée d'Orsay"], deIn: "im Musée d'Orsay", city: "paris", d: "medium" },
  pompidou: { n: ["the Centre Pompidou", "el Centro Pompidou", "das Centre Pompidou"], deIn: "im Centre Pompidou", city: "paris", d: "medium" },
  prado: { n: ["the Prado Museum", "el Museo del Prado", "der Prado"], deIn: "im Prado", city: "madrid", d: "easy" },
  reina: { n: ["the Reina Sofía Museum", "el Museo Reina Sofía", "das Museo Reina Sofía"], deIn: "im Museo Reina Sofía", city: "madrid", d: "medium" },
  thyssen: { n: ["the Thyssen-Bornemisza Museum", "el Museo Thyssen-Bornemisza", "das Museo Thyssen-Bornemisza"], deIn: "im Museo Thyssen-Bornemisza", city: "madrid", d: "hard" },
  uffizi: { n: ["the Uffizi Gallery", "la Galería Uffizi", "die Uffizien"], deIn: "in den Uffizien", city: "florence", d: "medium" },
  accademia: { n: ["the Galleria dell'Accademia", "la Galería de la Academia", "die Galleria dell'Accademia"], deIn: "in der Galleria dell'Accademia", city: "florence", d: "hard", noCity: true },
  rijks: { n: ["the Rijksmuseum", "el Rijksmuseum", "das Rijksmuseum"], deIn: "im Rijksmuseum", city: "amsterdam", d: "medium" },
  vangogh: { n: ["the Van Gogh Museum", "el Museo Van Gogh", "das Van-Gogh-Museum"], deIn: "im Van-Gogh-Museum", city: "amsterdam", d: "medium" },
  hermitage: { n: ["the Hermitage Museum", "el Museo del Hermitage", "die Eremitage"], deIn: "in der Eremitage", city: "stpete", d: "medium", notCity: ["moscow"] },
  tretyakov: { n: ["the Tretyakov Gallery", "la Galería Tretiakov", "die Tretjakow-Galerie"], deIn: "in der Tretjakow-Galerie", city: "moscow", d: "hard", notCity: ["stpete"] },
  moma: { n: ["the Museum of Modern Art (MoMA)", "el Museo de Arte Moderno (MoMA)", "das Museum of Modern Art (MoMA)"], deIn: "im Museum of Modern Art (MoMA)", city: "newyork", d: "easy" },
  met: { n: ["the Metropolitan Museum of Art", "el Museo Metropolitano de Arte", "das Metropolitan Museum of Art"], deIn: "im Metropolitan Museum of Art", city: "newyork", d: "easy" },
  british: { n: ["the British Museum", "el Museo Británico", "das British Museum"], deIn: "im British Museum", city: "london", d: "easy" },
  tate: { n: ["Tate Modern", "la Tate Modern", "die Tate Modern"], deIn: "in der Tate Modern", city: "london", d: "medium" },
  natgal: { n: ["the National Gallery", "la National Gallery", "die National Gallery"], deIn: "in der National Gallery", city: "london", d: "medium", noCity: true },
  pergamon: { n: ["the Pergamon Museum", "el Museo de Pérgamo", "das Pergamonmuseum"], deIn: "im Pergamonmuseum", city: "berlin", d: "medium" },
  neues: { n: ["the Neues Museum", "el Neues Museum", "das Neue Museum"], deIn: "im Neuen Museum", city: "berlin", d: "hard" },
  khm: { n: ["the Kunsthistorisches Museum", "el Museo de Historia del Arte (Kunsthistorisches Museum)", "das Kunsthistorische Museum"], deIn: "im Kunsthistorischen Museum", city: "vienna", d: "hard" },
  belvedere: { n: ["the Belvedere palace museum", "el museo del palacio Belvedere", "das Belvedere"], deIn: "im Belvedere", city: "vienna", d: "hard" },
  albertina: { n: ["the Albertina", "la Albertina", "die Albertina"], deIn: "in der Albertina", city: "vienna", d: "hard" },
  altepinak: { n: ["the Alte Pinakothek", "la Alte Pinakothek", "die Alte Pinakothek"], deIn: "in der Alten Pinakothek", city: "munich", d: "hard" },
  mauritshuis: { n: ["the Mauritshuis", "el Mauritshuis", "das Mauritshuis"], deIn: "im Mauritshuis", city: "thehague", d: "hard", notCity: ["amsterdam"] },
  acropolis: { n: ["the Acropolis Museum", "el Museo de la Acrópolis", "das Akropolismuseum"], deIn: "im Akropolismuseum", city: "athens", d: "easy" },
  munch: { n: ["the Munch Museum", "el Museo Munch", "das Munch-Museum"], deIn: "im Munch-Museum", city: "oslo", d: "medium" },
  brera: { n: ["the Pinacoteca di Brera", "la Pinacoteca de Brera", "die Pinacoteca di Brera"], deIn: "in der Pinacoteca di Brera", city: "milan", d: "hard" },
  getty: { n: ["the Getty Center", "el Getty Center", "das Getty Center"], deIn: "im Getty Center", city: "losangeles", d: "hard" },
  topkapi: { n: ["the Topkapı Palace museum", "el museo del palacio de Topkapi", "das Topkapı-Palast-Museum"], deIn: "im Topkapı-Palast", city: "istanbul", d: "medium" },
  dali: { n: ["the Dalí Theatre-Museum", "el Teatro-Museo Dalí", "das Dalí-Theater-Museum"], deIn: "im Dalí-Theater-Museum", city: "figueres", d: "hard", notCity: ["barcelona", "madrid"] },
  vaticanm: { n: ["the Vatican Museums", "los Museos Vaticanos", "die Vatikanischen Museen"], deIn: "in den Vatikanischen Museen", city: "vatican", d: "easy", noCity: true },
};
/** works → museum: [en, es, de, museum, difficulty, isTitle (quoted in sentences)] */
export const WORK_MUSEUM: [string, string, string, string, "easy" | "medium" | "hard", boolean][] = [
  ["the Mona Lisa", "la Gioconda (Mona Lisa)", "die Mona Lisa", "louvre", "easy", false],
  ["the Venus de Milo", "la Venus de Milo", "die Venus von Milo", "louvre", "medium", false],
  ["the Winged Victory of Samothrace", "la Victoria alada de Samotracia", "die Nike von Samothrake", "louvre", "hard", false],
  ["Liberty Leading the People", "La Libertad guiando al pueblo", "Die Freiheit führt das Volk", "louvre", "hard", true],
  ["The Raft of the Medusa", "La balsa de la Medusa", "Das Floß der Medusa", "louvre", "hard", true],
  ["Guernica", "Guernica", "Guernica", "reina", "medium", true],
  ["Las Meninas", "Las meninas", "Las Meninas", "prado", "medium", true],
  ["The Garden of Earthly Delights", "El jardín de las delicias", "Der Garten der Lüste", "prado", "hard", true],
  ["The Third of May 1808", "El tres de mayo de 1808", "Der 3. Mai 1808", "prado", "hard", true],
  ["The Naked Maja", "La maja desnuda", "Die nackte Maja", "prado", "medium", true],
  ["The Night Watch", "La ronda de noche", "Die Nachtwache", "rijks", "medium", true],
  ["The Milkmaid (Vermeer)", "La lechera (Vermeer)", "Dienstmagd mit Milchkrug (Vermeer)", "rijks", "hard", true],
  ["Girl with a Pearl Earring", "La joven de la perla", "Das Mädchen mit dem Perlenohrring", "mauritshuis", "hard", true],
  ["The Birth of Venus", "El nacimiento de Venus", "Die Geburt der Venus", "uffizi", "medium", true],
  ["Primavera (Botticelli)", "La primavera (Botticelli)", "Primavera (Botticelli)", "uffizi", "hard", true],
  ["Michelangelo's David", "el David de Miguel Ángel", "Michelangelos David", "accademia", "medium", false],
  ["The Starry Night", "La noche estrellada", "Die Sternennacht", "moma", "medium", true],
  ["The Persistence of Memory", "La persistencia de la memoria", "Die Beständigkeit der Erinnerung", "moma", "hard", true],
  ["Les Demoiselles d'Avignon", "Las señoritas de Aviñón", "Les Demoiselles d'Avignon", "moma", "hard", true],
  ["The Kiss (Klimt)", "El beso (Klimt)", "Der Kuss (Klimt)", "belvedere", "hard", true],
  ["Hunters in the Snow (Bruegel)", "Cazadores en la nieve (Bruegel)", "Die Jäger im Schnee (Bruegel)", "khm", "hard", true],
  ["the Rosetta Stone", "la piedra de Rosetta", "der Stein von Rosette", "british", "medium", false],
  ["the Ishtar Gate", "la Puerta de Ishtar", "das Ischtar-Tor", "pergamon", "hard", false],
  ["the bust of Nefertiti", "el busto de Nefertiti", "die Büste der Nofretete", "neues", "hard", false],
  ["Olympia (Manet)", "Olympia (Manet)", "Olympia (Manet)", "orsay", "hard", true],
  ["Bal du moulin de la Galette (Renoir)", "Baile en el Moulin de la Galette (Renoir)", "Tanz im Moulin de la Galette (Renoir)", "orsay", "hard", true],
  ["Whistler's Mother", "La madre de Whistler", "Whistlers Mutter", "orsay", "hard", true],
  ["The Arnolfini Portrait", "El matrimonio Arnolfini", "Die Arnolfini-Hochzeit", "natgal", "hard", true],
  ["The Fighting Temeraire (Turner)", "El Temerario remolcado a dique seco (Turner)", "Die letzte Fahrt der Temeraire (Turner)", "natgal", "hard", true],
  ["The Potato Eaters", "Los comedores de patatas", "Die Kartoffelesser", "vangogh", "medium", true],
  ["The School of Athens", "La escuela de Atenas", "Die Schule von Athen", "vaticanm", "medium", true],
  ["Dürer's Self-Portrait of 1500", "el Autorretrato de 1500 de Durero", "Dürers Selbstbildnis im Pelzrock", "altepinak", "hard", false],
];

/** works → year created (approximate start year), for century questions */
export const WORK_YEARS: [string, string, string, number][] = [
  ["Mona Lisa", "La Gioconda", "Mona Lisa", 1503], ["The Last Supper", "La última cena", "Das Abendmahl", 1495], ["The Birth of Venus", "El nacimiento de Venus", "Die Geburt der Venus", 1485],
  ["The Creation of Adam", "La creación de Adán", "Die Erschaffung Adams", 1512], ["The School of Athens", "La escuela de Atenas", "Die Schule von Athen", 1510],
  ["Las Meninas", "Las meninas", "Las Meninas", 1656], ["The Night Watch", "La ronda de noche", "Die Nachtwache", 1642], ["Girl with a Pearl Earring", "La joven de la perla", "Das Mädchen mit dem Perlenohrring", 1665],
  ["The Starry Night", "La noche estrellada", "Die Sternennacht", 1889], ["Sunflowers (Van Gogh)", "Los girasoles (Van Gogh)", "Sonnenblumen (Van Gogh)", 1888], ["The Scream", "El grito", "Der Schrei", 1893],
  ["Impression, Sunrise", "Impresión, sol naciente", "Impression, Sonnenaufgang", 1872], ["Liberty Leading the People", "La Libertad guiando al pueblo", "Die Freiheit führt das Volk", 1830],
  ["Wanderer above the Sea of Fog", "El caminante sobre el mar de nubes", "Der Wanderer über dem Nebelmeer", 1818], ["The Great Wave off Kanagawa", "La gran ola de Kanagawa", "Die große Welle vor Kanagawa", 1831],
  ["Guernica", "Guernica", "Guernica", 1937], ["The Persistence of Memory", "La persistencia de la memoria", "Die Beständigkeit der Erinnerung", 1931], ["The Kiss (Klimt)", "El beso (Klimt)", "Der Kuss (Klimt)", 1908],
  ["American Gothic", "Gótico americano", "American Gothic", 1930], ["Nighthawks", "Halcones de la noche", "Nighthawks", 1942], ["Campbell's Soup Cans", "Latas de sopa Campbell", "Campbell's Soup Cans", 1962],
  ["Les Demoiselles d'Avignon", "Las señoritas de Aviñón", "Les Demoiselles d'Avignon", 1907], ["The Arnolfini Portrait", "El matrimonio Arnolfini", "Die Arnolfini-Hochzeit", 1434],
  ["Hunters in the Snow", "Cazadores en la nieve", "Die Jäger im Schnee", 1565], ["The Raft of the Medusa", "La balsa de la Medusa", "Das Floß der Medusa", 1818],
  ["The Milkmaid (Vermeer)", "La lechera (Vermeer)", "Dienstmagd mit Milchkrug (Vermeer)", 1658], ["Luncheon on the Grass", "Almuerzo sobre la hierba", "Das Frühstück im Grünen", 1863],
  ["The Son of Man", "El hijo del hombre", "Der Sohn des Mannes", 1964], ["Primavera (Botticelli)", "La primavera (Botticelli)", "Primavera (Botticelli)", 1480],
  ["Michelangelo's David", "El David de Miguel Ángel", "Michelangelos David", 1502], ["The Ghent Altarpiece", "El políptico de Gante", "Der Genter Altar", 1432],
];

/** art techniques: [term en, es, de, description en, es, de, excluded term (en)] */
export const TECHNIQUES: [L, L, string?][] = [
  [["Fresco", "Fresco", "Fresko"], ["Painting on wet plaster", "Pintura sobre yeso húmedo", "Malerei auf feuchtem Putz"]],
  [["Watercolour", "Acuarela", "Aquarell"], ["Transparent paint thinned with water, usually on paper", "Pintura transparente diluida en agua, normalmente sobre papel", "Durchscheinende, mit Wasser verdünnte Farbe, meist auf Papier"]],
  [["Mosaic", "Mosaico", "Mosaik"], ["A picture made of small pieces of stone or glass set into a floor or wall", "Una imagen hecha con pequeñas piezas de piedra o vidrio incrustadas en un suelo o una pared", "Ein Bild aus kleinen Stein- oder Glasstücken, die in Boden oder Wand eingesetzt sind"], "Stained glass"],
  [["Tempera", "Temple", "Tempera"], ["Paint that uses egg yolk as its binder", "Pintura que usa yema de huevo como aglutinante", "Farbe mit Eigelb als Bindemittel"]],
  [["Oil painting", "Óleo", "Ölmalerei"], ["Pigments bound with oil, such as linseed oil", "Pigmentos aglutinados con aceite, como el de linaza", "Pigmente, die mit Öl wie Leinöl gebunden sind"]],
  [["Sfumato", "Sfumato", "Sfumato"], ["Soft, smoky transitions without sharp outlines", "Transiciones suaves y difuminadas, sin contornos nítidos", "Weiche, rauchige Übergänge ohne scharfe Umrisse"]],
  [["Chiaroscuro", "Claroscuro", "Chiaroscuro (Helldunkel)"], ["Strong contrast between light and dark", "Fuerte contraste entre luz y sombra", "Starker Kontrast zwischen Licht und Schatten"]],
  [["Collage", "Collage", "Collage"], ["Gluing pieces of paper and other materials onto a surface", "Pegar trozos de papel y otros materiales sobre una superficie", "Aufkleben von Papierstücken und anderen Materialien auf eine Fläche"]],
  [["Etching", "Aguafuerte", "Radierung"], ["A print made from a metal plate bitten with acid", "Un grabado hecho con una plancha de metal atacada con ácido", "Ein Druck von einer mit Säure geätzten Metallplatte"]],
  [["Woodcut", "Xilografía", "Holzschnitt"], ["A print made from a carved block of wood", "Un grabado hecho con un bloque de madera tallado", "Ein Druck von einem geschnitzten Holzblock"]],
  [["Trompe-l'œil", "Trampantojo", "Trompe-l'œil"], ["Painting so realistic that it tricks the eye into seeing real objects", "Pintura tan realista que engaña al ojo y parece real", "So realistische Malerei, dass das Auge sie für echt hält"]],
  [["Impasto", "Empaste", "Impasto"], ["Paint applied so thickly that the brushstrokes stand out", "Pintura aplicada en capas tan gruesas que las pinceladas sobresalen", "So dick aufgetragene Farbe, dass die Pinselstriche hervortreten"]],
  [["Pointillism", "Puntillismo", "Pointillismus"], ["Painting with many small dots of pure colour", "Pintar con muchos puntitos de color puro", "Malen mit vielen kleinen Punkten reiner Farbe"]],
  [["Stained glass", "Vidriera", "Glasmalerei (Bleiglasfenster)"], ["Coloured glass held together by lead strips, as in church windows", "Vidrio de colores unido con tiras de plomo, como en las ventanas de las iglesias", "Farbiges Glas, das mit Bleiruten verbunden ist, etwa in Kirchenfenstern"], "Mosaic"],
];

export const COLOURS: Record<string, L> = {
  red: ["red", "rojo", "Rot"], yellow: ["yellow", "amarillo", "Gelb"], blue: ["blue", "azul", "Blau"], green: ["green", "verde", "Grün"],
  orange: ["orange", "naranja", "Orange"], purple: ["purple", "morado", "Lila"], pink: ["pink", "rosa", "Rosa"], grey: ["grey", "gris", "Grau"],
  brown: ["brown", "marrón", "Braun"], black: ["black", "negro", "Schwarz"], white: ["white", "blanco", "Weiß"], turquoise: ["turquoise", "turquesa", "Türkis"],
};
/** paint mixing: [a, b, result] */
export const MIXES: [string, string, string][] = [["blue", "yellow", "green"], ["red", "yellow", "orange"], ["red", "blue", "purple"], ["red", "white", "pink"], ["black", "white", "grey"]];
/** complementary colours (traditional RYB wheel): [colour, complement, excluded (RGB complements)] */
export const COMPLEMENTS: [string, string, string[]][] = [
  ["red", "green", ["turquoise"]], ["green", "red", ["purple", "pink"]], ["blue", "orange", ["yellow"]], ["orange", "blue", ["turquoise"]],
  ["yellow", "purple", ["blue"]], ["purple", "yellow", ["green"]],
];

// ── architecture ────────────────────────────────────────────────────
/** style label (option) + "example of …" phrase [en, es, de accusative after "für"] */
export const STYLES: Record<string, { n: L; ex: L }> = {
  gothic: { n: ["Gothic", "Gótico", "Gotik"], ex: ["Gothic architecture", "la arquitectura gótica", "die Gotik"] },
  romanesque: { n: ["Romanesque", "Románico", "Romanik"], ex: ["Romanesque architecture", "la arquitectura románica", "die Romanik"] },
  renaissance: { n: ["Renaissance", "Renacentista", "Renaissance"], ex: ["Renaissance architecture", "la arquitectura renacentista", "die Architektur der Renaissance"] },
  baroque: { n: ["Baroque", "Barroco", "Barock"], ex: ["Baroque architecture", "la arquitectura barroca", "den Barock"] },
  neoclassical: { n: ["Neoclassical", "Neoclásico", "Klassizismus"], ex: ["Neoclassical architecture", "la arquitectura neoclásica", "den Klassizismus"] },
  artdeco: { n: ["Art Deco", "Art déco", "Art déco"], ex: ["Art Deco", "el art déco", "das Art déco"] },
  brutalism: { n: ["Brutalist", "Brutalista", "Brutalismus"], ex: ["Brutalism", "el brutalismo", "den Brutalismus"] },
  decon: { n: ["Deconstructivist", "Deconstructivista", "Dekonstruktivismus"], ex: ["Deconstructivism", "el deconstructivismo", "den Dekonstruktivismus"] },
  hightech: { n: ["High-tech", "High-tech", "High-Tech-Architektur"], ex: ["High-tech architecture", "la arquitectura high-tech", "die High-Tech-Architektur"] },
  byzantine: { n: ["Byzantine", "Bizantino", "Byzantinischer Stil"], ex: ["Byzantine architecture", "la arquitectura bizantina", "die byzantinische Architektur"] },
  mughal: { n: ["Mughal", "Mogol", "Mogul-Architektur"], ex: ["Mughal architecture", "la arquitectura mogol", "die Mogul-Architektur"] },
  moorish: { n: ["Moorish", "Andalusí (hispanomusulmán)", "Maurischer Stil"], ex: ["Moorish architecture", "el arte andalusí (hispanomusulmán)", "die maurische Architektur"] },
  modernisme: { n: ["Catalan Modernisme", "Modernismo catalán", "Katalanischer Modernisme"], ex: ["Catalan Modernisme", "el modernismo catalán", "den katalanischen Modernisme"] },
};
/** [en, es, de, style, excluded styles, difficulty] */
export const BUILDING_STYLES: [string, string, string, string, string[], "easy" | "medium" | "hard"][] = [
  ["Notre-Dame Cathedral in Paris", "la catedral de Notre Dame de París", "die Kathedrale Notre-Dame de Paris", "gothic", [], "easy"],
  ["Cologne Cathedral", "la catedral de Colonia", "der Kölner Dom", "gothic", [], "easy"],
  ["Chartres Cathedral", "la catedral de Chartres", "die Kathedrale von Chartres", "gothic", ["romanesque"], "medium"],
  ["Milan Cathedral", "la catedral de Milán", "der Mailänder Dom", "gothic", [], "medium"],
  ["Westminster Abbey", "la abadía de Westminster", "die Westminster Abbey", "gothic", [], "medium"],
  ["the Sainte-Chapelle in Paris", "la Sainte-Chapelle de París", "die Sainte-Chapelle in Paris", "gothic", [], "hard"],
  ["Speyer Cathedral", "la catedral de Espira", "der Dom zu Speyer", "romanesque", [], "hard"],
  ["Pisa Cathedral", "la catedral de Pisa", "der Dom von Pisa", "romanesque", ["gothic"], "medium"],
  ["the Leaning Tower of Pisa", "la torre inclinada de Pisa", "der Schiefe Turm von Pisa", "romanesque", ["gothic"], "medium"],
  ["the Basilica of Saint-Sernin in Toulouse", "la basílica de Saint-Sernin de Toulouse", "die Basilika Saint-Sernin in Toulouse", "romanesque", [], "hard"],
  ["the Château de Chambord", "el castillo de Chambord", "Schloss Chambord", "renaissance", ["gothic", "baroque"], "medium"],
  ["the Villa Rotonda near Vicenza", "la Villa Rotonda de Vicenza", "die Villa Rotonda bei Vicenza", "renaissance", ["neoclassical"], "hard"],
  ["the Palazzo Medici Riccardi in Florence", "el palacio Medici Riccardi de Florencia", "der Palazzo Medici Riccardi in Florenz", "renaissance", [], "hard"],
  ["the Monastery of El Escorial", "el monasterio de El Escorial", "das Kloster El Escorial", "renaissance", ["baroque", "neoclassical"], "medium"],
  ["Schönbrunn Palace", "el palacio de Schönbrunn", "Schloss Schönbrunn", "baroque", [], "medium"],
  ["the Zwinger in Dresden", "el Zwinger de Dresde", "der Dresdner Zwinger", "baroque", [], "medium"],
  ["the Trevi Fountain", "la Fontana de Trevi", "der Trevi-Brunnen", "baroque", [], "easy"],
  ["the Karlskirche in Vienna", "la iglesia de San Carlos Borromeo de Viena", "die Karlskirche in Wien", "baroque", [], "hard"],
  ["Melk Abbey", "la abadía de Melk", "das Stift Melk", "baroque", [], "hard"],
  ["the Würzburg Residence", "la Residencia de Wurzburgo", "die Würzburger Residenz", "baroque", [], "hard"],
  ["the Brandenburg Gate", "la Puerta de Brandeburgo", "das Brandenburger Tor", "neoclassical", ["renaissance", "baroque"], "medium"],
  ["the United States Capitol", "el Capitolio de los Estados Unidos", "das Kapitol in Washington", "neoclassical", ["renaissance", "baroque"], "medium"],
  ["the Panthéon in Paris", "el Panteón de París", "das Panthéon in Paris", "neoclassical", ["renaissance", "baroque"], "medium"],
  ["the Altes Museum in Berlin", "el Altes Museum de Berlín", "das Alte Museum in Berlin", "neoclassical", ["renaissance"], "hard"],
  ["the Chrysler Building", "el edificio Chrysler", "das Chrysler Building", "artdeco", [], "easy"],
  ["the Empire State Building", "el Empire State Building", "das Empire State Building", "artdeco", [], "easy"],
  ["the Rockefeller Center", "el Rockefeller Center", "das Rockefeller Center", "artdeco", [], "medium"],
  ["the Barbican Estate in London", "el Barbican de Londres", "das Barbican Estate in London", "brutalism", [], "hard"],
  ["Trellick Tower in London", "la Trellick Tower de Londres", "der Trellick Tower in London", "brutalism", [], "hard"],
  ["Habitat 67 in Montreal", "el Habitat 67 de Montreal", "das Habitat 67 in Montreal", "brutalism", [], "hard"],
  ["the Guggenheim Museum Bilbao", "el Museo Guggenheim Bilbao", "das Guggenheim-Museum Bilbao", "decon", [], "medium"],
  ["the Dancing House in Prague", "la Casa Danzante de Praga", "das Tanzende Haus in Prag", "decon", [], "medium"],
  ["the Walt Disney Concert Hall", "el Walt Disney Concert Hall", "die Walt Disney Concert Hall", "decon", [], "hard"],
  ["the Jewish Museum Berlin", "el Museo Judío de Berlín", "das Jüdische Museum Berlin", "decon", [], "hard"],
  ["the Centre Pompidou", "el Centro Pompidou", "das Centre Pompidou", "hightech", [], "medium"],
  ["the Lloyd's building in London", "el edificio Lloyd's de Londres", "das Lloyd's Building in London", "hightech", [], "hard"],
  ["the HSBC Building in Hong Kong", "el edificio del HSBC de Hong Kong", "das HSBC-Gebäude in Hongkong", "hightech", [], "hard"],
  ["Hagia Sophia", "Santa Sofía", "die Hagia Sophia", "byzantine", [], "medium"],
  ["St Mark's Basilica in Venice", "la basílica de San Marcos de Venecia", "der Markusdom in Venedig", "byzantine", ["gothic", "romanesque"], "medium"],
  ["the Basilica of San Vitale in Ravenna", "la basílica de San Vital de Rávena", "die Basilika San Vitale in Ravenna", "byzantine", ["romanesque"], "hard"],
  ["the Taj Mahal", "el Taj Mahal", "der Taj Mahal", "mughal", [], "easy"],
  ["Humayun's Tomb in Delhi", "la tumba de Humayun de Delhi", "das Humayun-Mausoleum in Delhi", "mughal", [], "hard"],
  ["the Red Fort in Delhi", "el Fuerte Rojo de Delhi", "das Rote Fort in Delhi", "mughal", [], "medium"],
  ["the Alhambra in Granada", "la Alhambra de Granada", "die Alhambra in Granada", "moorish", ["renaissance"], "easy"],
  ["the Great Mosque of Córdoba", "la Mezquita de Córdoba", "die Mezquita von Córdoba", "moorish", ["renaissance", "gothic", "baroque"], "medium"],
  ["Casa Batlló in Barcelona", "la Casa Batlló de Barcelona", "die Casa Batlló in Barcelona", "modernisme", [], "medium"],
  ["Casa Milà (La Pedrera) in Barcelona", "la Casa Milà (La Pedrera) de Barcelona", "die Casa Milà (La Pedrera) in Barcelona", "modernisme", [], "medium"],
  ["the Palau de la Música Catalana", "el Palau de la Música Catalana", "der Palau de la Música Catalana", "modernisme", [], "hard"],
  ["the Sagrada Família", "la Sagrada Familia", "die Sagrada Família", "modernisme", ["gothic"], "easy"],
];

/** sculptures: [en, es, de, sculptor, excluded sculptors] */
export const SCULPTURES: [string, string, string, string, string[]?][] = [
  ["The Thinker", "El pensador", "Der Denker", "Auguste Rodin"], ["The Burghers of Calais", "Los burgueses de Calais", "Die Bürger von Calais", "Auguste Rodin"],
  ["The Gates of Hell", "La puerta del infierno", "Das Höllentor", "Auguste Rodin"],
  ["The Pietà in St Peter's Basilica", "La Piedad del Vaticano", "Die Pietà im Petersdom", "Michelangelo"],
  ["The marble David in Florence's Galleria dell'Accademia", "El David de mármol de la Galería de la Academia de Florencia", "Der marmorne David in der Galleria dell'Accademia in Florenz", "Michelangelo", ["Gian Lorenzo Bernini", "Donatello"]],
  ["The Ecstasy of Saint Teresa", "El éxtasis de santa Teresa", "Die Verzückung der heiligen Teresa", "Gian Lorenzo Bernini"],
  ["Apollo and Daphne", "Apolo y Dafne", "Apollo und Daphne", "Gian Lorenzo Bernini"],
  ["Balloon Dog", "Balloon Dog (perro globo)", "Balloon Dog", "Jeff Koons"], ["Puppy, the flower-covered dog at the Guggenheim Bilbao", "Puppy, el perro de flores del Guggenheim Bilbao", "Puppy, der Blumenhund vor dem Guggenheim Bilbao", "Jeff Koons"],
  ["Maman, the giant spider", "Mamá (Maman), la araña gigante", "Maman, die Riesenspinne", "Louise Bourgeois"],
  ["Little Dancer Aged Fourteen", "La pequeña bailarina de catorce años", "Die kleine vierzehnjährige Tänzerin", "Edgar Degas"],
  ["Cloud Gate (“The Bean”) in Chicago", "Cloud Gate («la judía») de Chicago", "Cloud Gate („The Bean“) in Chicago", "Anish Kapoor"],
  ["The Angel of the North", "El Ángel del Norte", "Angel of the North", "Antony Gormley"],
  ["The Statue of Liberty", "La Estatua de la Libertad", "Die Freiheitsstatue", "Frédéric Auguste Bartholdi"],
  ["Perseus with the Head of Medusa (Florence)", "Perseo con la cabeza de Medusa (Florencia)", "Perseus mit dem Haupt der Medusa (Florenz)", "Benvenuto Cellini", ["Antonio Canova"]],
  ["Bird in Space", "Pájaro en el espacio", "Vogel im Raum", "Constantin Brâncuși"],
  ["Fountain (the urinal, 1917)", "La fuente (el urinario, 1917)", "Fountain (das Urinal, 1917)", "Marcel Duchamp"],
  ["Psyche Revived by Cupid's Kiss", "Psique reanimada por el beso del Amor", "Amor und Psyche", "Antonio Canova"],
  ["The Discus Thrower (Discobolus)", "El discóbolo", "Der Diskuswerfer", "Myron"],
  ["The Little Mermaid statue in Copenhagen", "La estatua de la Sirenita de Copenhague", "Die Statue der Kleinen Meerjungfrau in Kopenhagen", "Edvard Eriksen"],
];

// ── literature ──────────────────────────────────────────────────────
/** flags: f = female, a = alive, e = easy, h = hard (combine, e.g. "fa") */
export const WRITERS: PersonRow[] = [
  ["William Shakespeare", "uk", [], "e"], ["Jane Austen", "uk", [], "f"], ["Charles Dickens", "uk", [], "e"], ["George Orwell", "uk", ["india"]],
  ["J. R. R. Tolkien", "uk", ["south_africa"]], ["Agatha Christie", "uk", [], "fe"], ["Virginia Woolf", "uk", [], "f"], ["Mary Shelley", "uk", [], "f"],
  ["Arthur Conan Doyle", "uk"], ["J. K. Rowling", "uk", [], "fae"], ["Lewis Carroll", "uk"], ["Roald Dahl", "uk", ["norway"]], ["Daniel Defoe", "uk", [], "h"],
  ["Oscar Wilde", "ireland", ["uk"]], ["James Joyce", "ireland", ["uk", "france"]], ["Jonathan Swift", "ireland", ["uk"], "h"], ["Bram Stoker", "ireland", ["uk"], "h"],
  ["Samuel Beckett", "ireland", ["uk", "france"], "h"],
  ["Mark Twain", "usa", [], "e"], ["Ernest Hemingway", "usa", [], "e"], ["Edgar Allan Poe", "usa"], ["Herman Melville", "usa"], ["F. Scott Fitzgerald", "usa"],
  ["Harper Lee", "usa", [], "f"], ["Toni Morrison", "usa", [], "f"], ["John Steinbeck", "usa"], ["Stephen King", "usa", [], "ae"], ["Emily Dickinson", "usa", [], "fh"],
  ["Victor Hugo", "france", [], "e"], ["Jules Verne", "france", [], "e"], ["Gustave Flaubert", "france"], ["Antoine de Saint-Exupéry", "france"], ["Alexandre Dumas", "france"],
  ["Molière", "france"], ["Albert Camus", "france", ["algeria"]], ["Marcel Proust", "france"], ["Émile Zola", "france"], ["Honoré de Balzac", "france", [], "h"],
  ["Johann Wolfgang von Goethe", "germany", [], "e"], ["Friedrich Schiller", "germany"], ["Thomas Mann", "germany", ["usa"]], ["Michael Ende", "germany"],
  ["Patrick Süskind", "germany", [], "a"], ["Günter Grass", "germany", ["poland"]], ["Erich Kästner", "germany", [], "h"], ["Bertolt Brecht", "germany"],
  ["Miguel de Cervantes", "spain", [], "e"], ["Federico García Lorca", "spain"], ["Carlos Ruiz Zafón", "spain"], ["Lope de Vega", "spain", [], "h"], ["Benito Pérez Galdós", "spain", [], "h"],
  ["Dante Alighieri", "italy", [], "e"], ["Umberto Eco", "italy"], ["Giovanni Boccaccio", "italy", [], "h"], ["Carlo Collodi", "italy", [], "h"],
  [["Leo Tolstoy", "León Tolstói", "Leo Tolstoi"], "russia", [], "e"], [["Fyodor Dostoevsky", "Fiódor Dostoyevski", "Fjodor Dostojewski"], "russia", [], "e"],
  [["Anton Chekhov", "Antón Chéjov", "Anton Tschechow"], "russia"], [["Alexander Pushkin", "Aleksandr Pushkin", "Alexander Puschkin"], "russia"],
  [["Boris Pasternak", "Borís Pasternak", "Boris Pasternak"], "russia", [], "h"],
  ["Gabriel García Márquez", "colombia", ["mexico"], "e"], ["Jorge Luis Borges", "argentina"], ["Pablo Neruda", "chile"], ["Isabel Allende", "chile", ["peru", "usa"], "fa"],
  ["Gabriela Mistral", "chile", [], "fh"], ["Octavio Paz", "mexico"], ["Juan Rulfo", "mexico", [], "h"], ["Mario Vargas Llosa", "peru", ["spain"]],
  ["Paulo Coelho", "brazil", [], "a"], ["Jorge Amado", "brazil", [], "h"], ["José Saramago", "portugal"], ["Fernando Pessoa", "portugal", ["south_africa"], "h"],
  ["Haruki Murakami", "japan", [], "a"], ["Yukio Mishima", "japan", [], "h"], ["Yasunari Kawabata", "japan", [], "h"],
  ["Astrid Lindgren", "sweden", [], "f"], ["Selma Lagerlöf", "sweden", [], "fh"], ["Stieg Larsson", "sweden"],
  ["Henrik Ibsen", "norway"], ["Knut Hamsun", "norway", [], "h"], ["Jo Nesbø", "norway", [], "a"],
  ["Hans Christian Andersen", "denmark", [], "e"], ["Karen Blixen", "denmark", ["kenya"], "fh"], ["Tove Jansson", "finland", ["sweden"], "f"],
  ["Jaroslav Hašek", "czechia", ["austria"], "h"], ["Henryk Sienkiewicz", "poland", [], "h"], ["Wisława Szymborska", "poland", [], "fh"],
  ["Rabindranath Tagore", "india", ["bangladesh"]], ["Chinua Achebe", "nigeria"], ["Wole Soyinka", "nigeria", [], "ah"], ["Naguib Mahfouz", "egypt"],
  ["Orhan Pamuk", "turkey", [], "a"], ["Margaret Atwood", "canada", [], "fa"], ["Alice Munro", "canada", [], "fh"], ["Nikos Kazantzakis", "greece", [], "h"],
  ["Stefan Zweig", "austria", ["uk", "brazil", "germany"]], ["Arthur Schnitzler", "austria", ["germany"], "h"], ["Georges Simenon", "belgium", ["france"]],
];

/** Shakespeare plays → setting: [play en, es, de, place en, es, de, excluded places (en)] */
export const SHAKESPEARE: [L, L, string[]?, string?][] = [
  [["Romeo and Juliet", "Romeo y Julieta", "Romeo und Julia"], ["Verona", "Verona", "Verona"], [], "easy"],
  [["Hamlet", "Hamlet", "Hamlet"], ["Denmark", "Dinamarca", "Dänemark"], [], "easy"],
  [["Macbeth", "Macbeth", "Macbeth"], ["Scotland", "Escocia", "Schottland"], [], "easy"],
  [["Julius Caesar", "Julio César", "Julius Caesar"], ["Rome", "Roma", "Rom"], [], "easy"],
  [["A Midsummer Night's Dream", "El sueño de una noche de verano", "Ein Sommernachtstraum"], ["Athens", "Atenas", "Athen"], [], "medium"],
  [["The Taming of the Shrew", "La fierecilla domada", "Der Widerspenstigen Zähmung"], ["Padua", "Padua", "Padua"], ["Verona"], "hard"],
  [["Much Ado About Nothing", "Mucho ruido y pocas nueces", "Viel Lärm um nichts"], ["Messina", "Mesina", "Messina"], [], "hard"],
  [["Measure for Measure", "Medida por medida", "Maß für Maß"], ["Vienna", "Viena", "Wien"], [], "hard"],
  [["The Comedy of Errors", "La comedia de las equivocaciones", "Die Komödie der Irrungen"], ["Ephesus", "Éfeso", "Ephesos"], [], "hard"],
  [["Twelfth Night", "Noche de reyes", "Was ihr wollt"], ["Illyria", "Iliria", "Illyrien"], [], "hard"],
  [["Troilus and Cressida", "Troilo y Crésida", "Troilus und Cressida"], ["Troy", "Troya", "Troja"], [], "hard"],
];
/** extra places / plays used only as wrong answers */
export const SHAKESPEARE_EXTRA_PLACES: L[] = [["Venice", "Venecia", "Venedig"], ["Florence", "Florencia", "Florenz"], ["Paris", "París", "Paris"], ["Naples", "Nápoles", "Neapel"]];
export const SHAKESPEARE_EXTRA_PLAYS: L[] = [["Othello", "Otelo", "Othello"], ["The Tempest", "La tempestad", "Der Sturm"], ["Richard III", "Ricardo III", "Richard III."], ["Henry V", "Enrique V", "Heinrich V."]];

/** tales: source labels; "from" = phrase after "comes from" */
export const TALE_SOURCES: Record<string, { n: L; from: L }> = {
  grimm: { n: ["The Brothers Grimm", "Los hermanos Grimm", "Die Brüder Grimm"], from: ["the Brothers Grimm", "de los hermanos Grimm", "von den Brüdern Grimm"] },
  andersen: { n: ["Hans Christian Andersen", "Hans Christian Andersen", "Hans Christian Andersen"], from: ["Hans Christian Andersen", "de Hans Christian Andersen", "von Hans Christian Andersen"] },
  perrault: { n: ["Charles Perrault", "Charles Perrault", "Charles Perrault"], from: ["Charles Perrault", "de Charles Perrault", "von Charles Perrault"] },
  aesop: { n: ["Aesop", "Esopo", "Äsop"], from: ["Aesop", "de Esopo", "von Äsop"] },
  wilde: { n: ["Oscar Wilde", "Oscar Wilde", "Oscar Wilde"], from: ["Oscar Wilde", "de Oscar Wilde", "von Oscar Wilde"] },
  nights: { n: ["One Thousand and One Nights", "Las mil y una noches", "Tausendundeine Nacht"], from: ["One Thousand and One Nights", "de Las mil y una noches", "aus Tausendundeiner Nacht"] },
  hauff: { n: ["Wilhelm Hauff", "Wilhelm Hauff", "Wilhelm Hauff"], from: ["Wilhelm Hauff", "de Wilhelm Hauff", "von Wilhelm Hauff"] },
};
/** [en, es, de, source, excluded sources] */
export const TALES: [string, string, string, string, string[]?][] = [
  ["Hansel and Gretel", "Hansel y Gretel", "Hänsel und Gretel", "grimm"], ["Snow White", "Blancanieves", "Schneewittchen", "grimm"],
  ["Rapunzel", "Rapunzel", "Rapunzel", "grimm"], ["Rumpelstiltskin", "Rumpelstiltskin", "Rumpelstilzchen", "grimm"],
  ["The Frog Prince", "El príncipe rana", "Der Froschkönig", "grimm"], ["Town Musicians of Bremen", "Los músicos de Bremen", "Die Bremer Stadtmusikanten", "grimm"],
  ["Mother Holle", "Madre Nieve (Doña Holle)", "Frau Holle", "grimm"], ["The Wolf and the Seven Young Goats", "El lobo y los siete cabritillos", "Der Wolf und die sieben jungen Geißlein", "grimm"],
  ["The Golden Goose", "La oca de oro", "Die goldene Gans", "grimm"],
  ["The Ugly Duckling", "El patito feo", "Das hässliche Entlein", "andersen"], ["The Emperor's New Clothes", "El traje nuevo del emperador", "Des Kaisers neue Kleider", "andersen"],
  ["The Snow Queen", "La reina de las nieves", "Die Schneekönigin", "andersen"], ["The Princess and the Pea", "La princesa y el guisante", "Die Prinzessin auf der Erbse", "andersen"],
  ["Thumbelina", "Pulgarcita", "Däumelinchen", "andersen"], ["The Little Match Girl", "La pequeña cerillera", "Das Mädchen mit den Schwefelhölzern", "andersen"],
  ["The Steadfast Tin Soldier", "El soldadito de plomo", "Der standhafte Zinnsoldat", "andersen"],
  ["Puss in Boots", "El gato con botas", "Der gestiefelte Kater", "perrault", ["grimm"]], ["Bluebeard", "Barba Azul", "Blaubart", "perrault", ["grimm"]],
  ["The Tortoise and the Hare", "La liebre y la tortuga", "Der Hase und die Schildkröte", "aesop"], ["The Fox and the Grapes", "La zorra y las uvas", "Der Fuchs und die Trauben", "aesop"],
  ["The Boy Who Cried Wolf", "El pastorcito mentiroso", "Der Hirtenjunge und der Wolf", "aesop"], ["The Lion and the Mouse", "El león y el ratón", "Der Löwe und die Maus", "aesop"],
  ["The Town Mouse and the Country Mouse", "El ratón de campo y el ratón de ciudad", "Die Stadtmaus und die Feldmaus", "aesop"],
  ["The Happy Prince", "El príncipe feliz", "Der glückliche Prinz", "wilde"], ["The Selfish Giant", "El gigante egoísta", "Der selbstsüchtige Riese", "wilde"],
  ["The Nightingale and the Rose", "El ruiseñor y la rosa", "Die Nachtigall und die Rose", "wilde"],
  ["Aladdin and the Magic Lamp", "Aladino y la lámpara maravillosa", "Aladin und die Wunderlampe", "nights"], ["Ali Baba and the Forty Thieves", "Alí Babá y los cuarenta ladrones", "Ali Baba und die vierzig Räuber", "nights"],
  ["Sinbad the Sailor", "Simbad el marino", "Sindbad der Seefahrer", "nights"],
  ["Little Muck", "El pequeño Muck", "Der kleine Muck", "hauff"], ["Dwarf Nose", "El enano Narigudo", "Zwerg Nase", "hauff"], ["Caliph Stork", "El califa cigüeña", "Kalif Storch", "hauff"],
];

/** comics: [title en, es, de, creator, country ("" = skip country question), excluded creators, excluded countries] */
export const COMICS: [L, L, string, string[]?, string[]?][] = [
  [["Tintin", "Tintín", "Tim und Struppi (Tintin)"], ["Hergé", "Hergé", "Hergé"], "belgium"],
  [["Asterix", "Astérix", "Asterix"], ["René Goscinny and Albert Uderzo", "René Goscinny y Albert Uderzo", "René Goscinny und Albert Uderzo"], "france"],
  [["Peanuts", "Peanuts (Carlitos y Snoopy)", "Die Peanuts"], ["Charles M. Schulz", "Charles M. Schulz", "Charles M. Schulz"], "usa"],
  [["Mafalda", "Mafalda", "Mafalda"], ["Quino", "Quino", "Quino"], "argentina"],
  [["Mort & Phil (Mortadelo y Filemón)", "Mortadelo y Filemón", "Clever & Smart (Mortadelo y Filemón)"], ["Francisco Ibáñez", "Francisco Ibáñez", "Francisco Ibáñez"], "spain"],
  [["The Smurfs", "Los pitufos", "Die Schlümpfe"], ["Peyo", "Peyo", "Peyo"], "belgium"],
  [["Lucky Luke", "Lucky Luke", "Lucky Luke"], ["Morris", "Morris", "Morris"], "belgium", ["René Goscinny and Albert Uderzo"], ["france"]],
  [["Garfield", "Garfield", "Garfield"], ["Jim Davis", "Jim Davis", "Jim Davis"], "usa"],
  [["Calvin and Hobbes", "Calvin y Hobbes", "Calvin und Hobbes"], ["Bill Watterson", "Bill Watterson", "Bill Watterson"], "usa"],
  [["Superman", "Superman", "Superman"], ["Jerry Siegel and Joe Shuster", "Jerry Siegel y Joe Shuster", "Jerry Siegel und Joe Shuster"], "usa"],
  [["Spider-Man", "Spider-Man", "Spider-Man"], ["Stan Lee and Steve Ditko", "Stan Lee y Steve Ditko", "Stan Lee und Steve Ditko"], "usa"],
  [["Dragon Ball", "Dragon Ball", "Dragon Ball"], ["Akira Toriyama", "Akira Toriyama", "Akira Toriyama"], "japan"],
  [["One Piece", "One Piece", "One Piece"], ["Eiichiro Oda", "Eiichiro Oda", "Eiichiro Oda"], "japan"],
  [["Naruto", "Naruto", "Naruto"], ["Masashi Kishimoto", "Masashi Kishimoto", "Masashi Kishimoto"], "japan"],
  [["Astro Boy", "Astro Boy", "Astro Boy"], ["Osamu Tezuka", "Osamu Tezuka", "Osamu Tezuka"], "japan"],
  [["Corto Maltese", "Corto Maltés", "Corto Maltese"], ["Hugo Pratt", "Hugo Pratt", "Hugo Pratt"], "italy"],
  [["Maus", "Maus", "Maus"], ["Art Spiegelman", "Art Spiegelman", "Art Spiegelman"], "usa"],
  [["Gaston (Gomer Goof)", "Tomás el Gafe (Gaston)", "Gaston"], ["André Franquin", "André Franquin", "André Franquin"], "belgium"],
  [["Hägar the Horrible", "Olafo el Amargado", "Hägar der Schreckliche"], ["Dik Browne", "Dik Browne", "Dik Browne"], "usa"],
  [["Popeye", "Popeye", "Popeye"], ["E. C. Segar", "E. C. Segar", "E. C. Segar"], "usa"],
  [["Condorito", "Condorito", "Condorito"], ["Pepo", "Pepo", "Pepo"], "chile"],
  [["Diabolik", "Diabolik", "Diabolik"], ["Angela and Luciana Giussani", "Angela y Luciana Giussani", "Angela und Luciana Giussani"], "italy"],
  [["Watchmen", "Watchmen", "Watchmen"], ["Alan Moore and Dave Gibbons", "Alan Moore y Dave Gibbons", "Alan Moore und Dave Gibbons"], "uk", [], ["usa"]],
  [["Persepolis", "Persépolis", "Persepolis"], ["Marjane Satrapi", "Marjane Satrapi", "Marjane Satrapi"], ""],
  [["Blake and Mortimer", "Blake y Mortimer", "Blake und Mortimer"], ["Edgar P. Jacobs", "Edgar P. Jacobs", "Edgar P. Jacobs"], "belgium"],
  [["Akira", "Akira", "Akira"], ["Katsuhiro Otomo", "Katsuhiro Otomo", "Katsuhiro Otomo"], "japan"],
  [["Fix and Foxi", "Fix y Foxi", "Fix und Foxi"], ["Rolf Kauka", "Rolf Kauka", "Rolf Kauka"], "germany"],
  [["Zipi and Zape", "Zipi y Zape", "Zipi und Zape"], ["Josep Escobar", "Josep Escobar", "Josep Escobar"], "spain"],
];

/** detectives: [en phrase, es phrase (with "a"), de phrase (accusative), name label, author] */
export const DETECTIVES: [string, string, string, L, string][] = [
  ["the detective Sherlock Holmes", "al detective Sherlock Holmes", "den Detektiv Sherlock Holmes", ["Sherlock Holmes", "Sherlock Holmes", "Sherlock Holmes"], "Arthur Conan Doyle"],
  ["the detective Hercule Poirot", "al detective Hercule Poirot", "den Detektiv Hercule Poirot", ["Hercule Poirot", "Hercule Poirot", "Hercule Poirot"], "Agatha Christie"],
  ["the amateur sleuth Miss Marple", "a la detective aficionada Miss Marple", "die Hobbydetektivin Miss Marple", ["Miss Marple", "Miss Marple", "Miss Marple"], "Agatha Christie"],
  ["Inspector Maigret", "al comisario Maigret", "den Kommissar Maigret", ["Inspector Maigret", "El comisario Maigret", "Kommissar Maigret"], "Georges Simenon"],
  ["the private eye Philip Marlowe", "al detective privado Philip Marlowe", "den Privatdetektiv Philip Marlowe", ["Philip Marlowe", "Philip Marlowe", "Philip Marlowe"], "Raymond Chandler"],
  ["the private eye Sam Spade", "al detective privado Sam Spade", "den Privatdetektiv Sam Spade", ["Sam Spade", "Sam Spade", "Sam Spade"], "Dashiell Hammett"],
  ["the detective C. Auguste Dupin", "al detective C. Auguste Dupin", "den Detektiv C. Auguste Dupin", ["C. Auguste Dupin", "C. Auguste Dupin", "C. Auguste Dupin"], "Edgar Allan Poe"],
  ["the priest-detective Father Brown", "al sacerdote detective padre Brown", "den Priester und Detektiv Pater Brown", ["Father Brown", "El padre Brown", "Pater Brown"], "G. K. Chesterton"],
  ["Inspector Kurt Wallander", "al inspector Kurt Wallander", "den Kommissar Kurt Wallander", ["Kurt Wallander", "Kurt Wallander", "Kurt Wallander"], "Henning Mankell"],
  ["Inspector Salvo Montalbano", "al comisario Salvo Montalbano", "den Commissario Salvo Montalbano", ["Salvo Montalbano", "Salvo Montalbano", "Salvo Montalbano"], "Andrea Camilleri"],
  ["the detective Pepe Carvalho", "al detective Pepe Carvalho", "den Detektiv Pepe Carvalho", ["Pepe Carvalho", "Pepe Carvalho", "Pepe Carvalho"], "Manuel Vázquez Montalbán"],
  ["the detective Lord Peter Wimsey", "al detective lord Peter Wimsey", "den Detektiv Lord Peter Wimsey", ["Lord Peter Wimsey", "Lord Peter Wimsey", "Lord Peter Wimsey"], "Dorothy L. Sayers"],
  ["the detective Nero Wolfe", "al detective Nero Wolfe", "den Detektiv Nero Wolfe", ["Nero Wolfe", "Nero Wolfe", "Nero Wolfe"], "Rex Stout"],
  ["the detective Harry Hole", "al detective Harry Hole", "den Ermittler Harry Hole", ["Harry Hole", "Harry Hole", "Harry Hole"], "Jo Nesbø"],
  ["Inspector Morse", "al inspector Morse", "Inspector Morse", ["Inspector Morse", "El inspector Morse", "Inspector Morse"], "Colin Dexter"],
  ["the hacker Lisbeth Salander", "a la hacker Lisbeth Salander", "die Hackerin Lisbeth Salander", ["Lisbeth Salander", "Lisbeth Salander", "Lisbeth Salander"], "Stieg Larsson"],
  ["the gentleman thief Arsène Lupin", "al ladrón de guante blanco Arsène Lupin", "den Gentleman-Dieb Arsène Lupin", ["Arsène Lupin", "Arsène Lupin", "Arsène Lupin"], "Maurice Leblanc"],
  ["the spy James Bond", "al espía James Bond", "den Geheimagenten James Bond", ["James Bond", "James Bond", "James Bond"], "Ian Fleming"],
  ["the symbologist Robert Langdon", "al simbólogo Robert Langdon", "den Symbologen Robert Langdon", ["Robert Langdon", "Robert Langdon", "Robert Langdon"], "Dan Brown"],
  ["the lawyer Perry Mason", "al abogado Perry Mason", "den Anwalt Perry Mason", ["Perry Mason", "Perry Mason", "Perry Mason"], "Erle Stanley Gardner"],
];

export const CHAR_BOOKS: Record<string, L> = {
  moby: ["Moby-Dick", "Moby Dick", "Moby-Dick"], pride: ["Pride and Prejudice", "Orgullo y prejuicio", "Stolz und Vorurteil"], miserables: ["Les Misérables", "Los miserables", "Die Elenden"],
  wuthering: ["Wuthering Heights", "Cumbres borrascosas", "Sturmhöhe"], metamorphosis: ["The Metamorphosis", "La metamorfosis", "Die Verwandlung"], y1984: ["Nineteen Eighty-Four", "1984", "1984"],
  catcher: ["The Catcher in the Rye", "El guardián entre el centeno", "Der Fänger im Roggen"], mockingbird: ["To Kill a Mockingbird", "Matar a un ruiseñor", "Wer die Nachtigall stört"],
  quixote: ["Don Quixote", "Don Quijote de la Mancha", "Don Quijote"], crime: ["Crime and Punishment", "Crimen y castigo", "Schuld und Sühne"],
  eighty: ["Around the World in Eighty Days", "La vuelta al mundo en ochenta días", "In 80 Tagen um die Welt"], leagues: ["Twenty Thousand Leagues Under the Seas", "Veinte mil leguas de viaje submarino", "20.000 Meilen unter dem Meer"],
  treasure: ["Treasure Island", "La isla del tesoro", "Die Schatzinsel"], carol: ["A Christmas Carol", "Canción de Navidad", "Eine Weihnachtsgeschichte"],
  monte: ["The Count of Monte Cristo", "El conde de Montecristo", "Der Graf von Monte Christo"], musketeers: ["The Three Musketeers", "Los tres mosqueteros", "Die drei Musketiere"],
  hunchback: ["The Hunchback of Notre-Dame", "Nuestra Señora de París", "Der Glöckner von Notre-Dame"], jungle: ["The Jungle Book", "El libro de la selva", "Das Dschungelbuch"],
  neverending: ["The Neverending Story", "La historia interminable", "Die unendliche Geschichte"], perfume: ["Perfume", "El perfume", "Das Parfum"],
  magicmountain: ["The Magic Mountain", "La montaña mágica", "Der Zauberberg"], solitude: ["One Hundred Years of Solitude", "Cien años de soledad", "Hundert Jahre Einsamkeit"],
  trial: ["The Trial", "El proceso", "Der Process"], eyre: ["Jane Eyre", "Jane Eyre", "Jane Eyre"], grapes: ["The Grapes of Wrath", "Las uvas de la ira", "Früchte des Zorns"],
  mice: ["Of Mice and Men", "De ratones y hombres", "Von Mäusen und Menschen"], f451: ["Fahrenheit 451", "Fahrenheit 451", "Fahrenheit 451"],
  stranger: ["The Stranger", "El extranjero", "Der Fremde"], tindrum: ["The Tin Drum", "El tambor de hojalata", "Die Blechtrommel"],
  western: ["All Quiet on the Western Front", "Sin novedad en el frente", "Im Westen nichts Neues"], flies: ["Lord of the Flies", "El señor de las moscas", "Herr der Fliegen"],
  chocolate: ["Charlie and the Chocolate Factory", "Charlie y la fábrica de chocolate", "Charlie und die Schokoladenfabrik"], alice: ["Alice's Adventures in Wonderland", "Alicia en el país de las maravillas", "Alice im Wunderland"],
  hobbit: ["The Hobbit", "El hobbit", "Der Hobbit"], gatsby: ["The Great Gatsby", "El gran Gatsby", "Der große Gatsby"], animalfarm: ["Animal Farm", "Rebelión en la granja", "Farm der Tiere"],
  karenina: ["Anna Karenina", "Ana Karénina", "Anna Karenina"], warpeace: ["War and Peace", "Guerra y paz", "Krieg und Frieden"], gone: ["Gone with the Wind", "Lo que el viento se llevó", "Vom Winde verweht"],
  dracula: ["Dracula", "Drácula", "Dracula"], expectations: ["Great Expectations", "Grandes esperanzas", "Große Erwartungen"], scarlet: ["The Scarlet Letter", "La letra escarlata", "Der scharlachrote Buchstabe"],
  littlewomen: ["Little Women", "Mujercitas", "Little Women (Betty und ihre Schwestern)"],
};
/** [en, es, de (as used mid-sentence), book key, plural] */
export const CHARACTERS: [string, string, string, string, boolean?][] = [
  ["Captain Ahab", "el capitán Ahab", "Kapitän Ahab", "moby"], ["Elizabeth Bennet", "Elizabeth Bennet", "Elizabeth Bennet", "pride"], ["Mr Darcy", "el señor Darcy", "Mr. Darcy", "pride"],
  ["Jean Valjean", "Jean Valjean", "Jean Valjean", "miserables"], ["Heathcliff", "Heathcliff", "Heathcliff", "wuthering"], ["Gregor Samsa", "Gregor Samsa", "Gregor Samsa", "metamorphosis"],
  ["Winston Smith", "Winston Smith", "Winston Smith", "y1984"], ["Holden Caulfield", "Holden Caulfield", "Holden Caulfield", "catcher"], ["Atticus Finch", "Atticus Finch", "Atticus Finch", "mockingbird"],
  ["Sancho Panza", "Sancho Panza", "Sancho Panza", "quixote"], ["Rodion Raskolnikov", "Rodión Raskólnikov", "Rodion Raskolnikow", "crime"], ["Phileas Fogg", "Phileas Fogg", "Phileas Fogg", "eighty"],
  ["Captain Nemo", "el capitán Nemo", "Kapitän Nemo", "leagues"], ["Long John Silver", "Long John Silver", "Long John Silver", "treasure"], ["Ebenezer Scrooge", "Ebenezer Scrooge", "Ebenezer Scrooge", "carol"],
  ["Edmond Dantès", "Edmundo Dantès", "Edmond Dantès", "monte"], ["d'Artagnan", "D'Artagnan", "d'Artagnan", "musketeers"], ["Quasimodo", "Quasimodo", "Quasimodo", "hunchback"],
  ["Mowgli", "Mowgli", "Mogli", "jungle"], ["Shere Khan", "Shere Khan", "Shir Khan", "jungle"], ["Bastian Balthazar Bux", "Bastian Baltasar Bux", "Bastian Balthasar Bux", "neverending"],
  ["Jean-Baptiste Grenouille", "Jean-Baptiste Grenouille", "Jean-Baptiste Grenouille", "perfume"], ["Hans Castorp", "Hans Castorp", "Hans Castorp", "magicmountain"],
  ["Colonel Aureliano Buendía", "el coronel Aureliano Buendía", "Oberst Aureliano Buendía", "solitude"], ["Josef K.", "Josef K.", "Josef K.", "trial"],
  ["Mr Rochester", "el señor Rochester", "Mr. Rochester", "eyre"], ["Tom Joad", "Tom Joad", "Tom Joad", "grapes"], ["Lennie and George", "Lennie y George", "Lennie und George", "mice", true],
  ["Guy Montag", "Guy Montag", "Guy Montag", "f451"], ["Meursault", "Meursault", "Meursault", "stranger"], ["Oskar Matzerath", "Oskar Matzerath", "Oskar Matzerath", "tindrum"],
  ["Paul Bäumer", "Paul Bäumer", "Paul Bäumer", "western"], ["Ralph and Piggy", "Ralph y Piggy", "Ralph und Piggy", "flies", true], ["Willy Wonka", "Willy Wonka", "Willy Wonka", "chocolate"],
  ["the White Rabbit", "el Conejo Blanco", "das weiße Kaninchen", "alice"], ["the Cheshire Cat", "el gato de Cheshire", "die Grinsekatze", "alice"], ["the dragon Smaug", "el dragón Smaug", "der Drache Smaug", "hobbit"],
  ["Daisy Buchanan", "Daisy Buchanan", "Daisy Buchanan", "gatsby"], ["Napoleon the pig", "el cerdo Napoleón", "das Schwein Napoleon", "animalfarm"], ["Count Vronsky", "el conde Vronski", "Graf Wronski", "karenina"],
  ["Pierre Bezukhov", "Pierre Bezújov", "Pierre Besuchow", "warpeace"], ["Scarlett O'Hara and Rhett Butler", "Scarlett O'Hara y Rhett Butler", "Scarlett O'Hara und Rhett Butler", "gone", true],
  ["Jonathan Harker", "Jonathan Harker", "Jonathan Harker", "dracula"], ["Pip and Miss Havisham", "Pip y la señorita Havisham", "Pip und Miss Havisham", "expectations", true],
  ["Hester Prynne", "Hester Prynne", "Hester Prynne", "scarlet"], ["Jo March and her sisters", "Jo March y sus hermanas", "Jo March und ihre Schwestern", "littlewomen", true],
];

/** plays: [en, es, de, author (string or L), difficulty] */
export const PLAYS: [string, string, string, string | L, "easy" | "medium" | "hard"][] = [
  ["Waiting for Godot", "Esperando a Godot", "Warten auf Godot", "Samuel Beckett", "medium"],
  ["Death of a Salesman", "La muerte de un viajante", "Tod eines Handlungsreisenden", "Arthur Miller", "medium"],
  ["The Crucible", "Las brujas de Salem (El crisol)", "Hexenjagd", "Arthur Miller", "hard"],
  ["A Streetcar Named Desire", "Un tranvía llamado Deseo", "Endstation Sehnsucht", "Tennessee Williams", "medium"],
  ["Cat on a Hot Tin Roof", "La gata sobre el tejado de zinc", "Die Katze auf dem heißen Blechdach", "Tennessee Williams", "medium"],
  ["The Importance of Being Earnest", "La importancia de llamarse Ernesto", "Bunbury oder Ernst sein ist alles", "Oscar Wilde", "medium"],
  ["Pygmalion", "Pigmalión", "Pygmalion", "George Bernard Shaw", "hard"],
  ["A Doll's House", "Casa de muñecas", "Nora oder Ein Puppenheim", "Henrik Ibsen", "medium"],
  ["Peer Gynt", "Peer Gynt", "Peer Gynt", "Henrik Ibsen", "hard"],
  ["The Seagull", "La gaviota", "Die Möwe", ["Anton Chekhov", "Antón Chéjov", "Anton Tschechow"], "hard"],
  ["The Cherry Orchard", "El jardín de los cerezos", "Der Kirschgarten", ["Anton Chekhov", "Antón Chéjov", "Anton Tschechow"], "hard"],
  ["Life Is a Dream", "La vida es sueño", "Das Leben ein Traum", "Pedro Calderón de la Barca", "medium"],
  ["The House of Bernarda Alba", "La casa de Bernarda Alba", "Bernarda Albas Haus", "Federico García Lorca", "medium"],
  ["Blood Wedding", "Bodas de sangre", "Bluthochzeit", "Federico García Lorca", "medium"],
  ["Fuenteovejuna", "Fuenteovejuna", "Fuenteovejuna", "Lope de Vega", "hard"],
  ["Don Juan Tenorio", "Don Juan Tenorio", "Don Juan Tenorio", "José Zorrilla", "hard"],
  ["Tartuffe", "Tartufo", "Tartuffe", "Molière", "medium"],
  ["The Miser", "El avaro", "Der Geizige", "Molière", "medium"],
  ["Cyrano de Bergerac", "Cyrano de Bergerac", "Cyrano de Bergerac", "Edmond Rostand", "hard"],
  ["Oedipus Rex", "Edipo rey", "König Ödipus", ["Sophocles", "Sófocles", "Sophokles"], "medium"],
  ["Medea (the Greek tragedy)", "Medea (la tragedia griega)", "Medea (die griechische Tragödie)", ["Euripides", "Eurípides", "Euripides"], "hard"],
  ["Lysistrata", "Lisístrata", "Lysistrata", ["Aristophanes", "Aristófanes", "Aristophanes"], "hard"],
  ["The Threepenny Opera", "La ópera de los tres centavos", "Die Dreigroschenoper", "Bertolt Brecht", "medium"],
  ["Mother Courage and Her Children", "Madre Coraje y sus hijos", "Mutter Courage und ihre Kinder", "Bertolt Brecht", "medium"],
  ["Woyzeck", "Woyzeck", "Woyzeck", "Georg Büchner", "hard"],
  ["Nathan the Wise", "Natán el sabio", "Nathan der Weise", "Gotthold Ephraim Lessing", "hard"],
  ["The Robbers", "Los bandidos", "Die Räuber", "Friedrich Schiller", "medium"],
  ["Who's Afraid of Virginia Woolf?", "¿Quién teme a Virginia Woolf?", "Wer hat Angst vor Virginia Woolf?", "Edward Albee", "hard"],
  ["Rhinoceros", "El rinoceronte", "Die Nashörner", "Eugène Ionesco", "hard"],
  ["The Mousetrap", "La ratonera", "Die Mausefalle", "Agatha Christie", "medium"],
  ["Six Characters in Search of an Author", "Seis personajes en busca de autor", "Sechs Personen suchen einen Autor", "Luigi Pirandello", "hard"],
  ["Our Town", "Nuestro pueblo", "Unsere kleine Stadt", "Thornton Wilder", "hard"],
];

export const CULTURES: Record<string, L> = {
  greece: ["Ancient Greece", "La antigua Grecia", "Das antike Griechenland"], rome: ["Ancient Rome", "La antigua Roma", "Das antike Rom"],
  mesopotamia: ["Ancient Mesopotamia", "La antigua Mesopotamia", "Das alte Mesopotamien"], india: ["Ancient India", "La antigua India", "Das alte Indien"],
  england: ["Anglo-Saxon England", "La Inglaterra anglosajona", "Das angelsächsische England"], france: ["Medieval France", "La Francia medieval", "Das mittelalterliche Frankreich"],
  spain: ["Medieval Castile (Spain)", "La Castilla medieval", "Das mittelalterliche Kastilien"], germany: ["Medieval Germany", "La Alemania medieval", "Das mittelalterliche Deutschland"],
  finland: ["Finland", "Finlandia", "Finnland"], persia: ["Persia (Iran)", "Persia (Irán)", "Persien (Iran)"], japan: ["Japan", "Japón", "Japan"], china: ["China", "China", "China"],
  maya: ["The Maya", "Los mayas", "Die Maya"], portugal: ["Portugal", "Portugal", "Portugal"], iceland: ["Medieval Iceland", "La Islandia medieval", "Das mittelalterliche Island"],
  mali: ["The Mali Empire", "El Imperio de Malí", "Das Malireich"], ireland: ["Early Ireland", "La Irlanda antigua", "Das frühe Irland"],
};
/** classic works: [en, es, de, culture, difficulty] */
export const EPICS: [string, string, string, string, "easy" | "medium" | "hard"][] = [
  ["The Iliad", "La Ilíada", "Die Ilias", "greece", "easy"], ["The Odyssey", "La Odisea", "Die Odyssee", "greece", "easy"],
  ["The Aeneid", "La Eneida", "Die Aeneis", "rome", "medium"], ["Metamorphoses (Ovid)", "Las metamorfosis (Ovidio)", "Metamorphosen (Ovid)", "rome", "medium"],
  ["The Epic of Gilgamesh", "La epopeya de Gilgamesh", "Das Gilgamesch-Epos", "mesopotamia", "medium"],
  ["The Mahabharata", "El Mahabharata", "Das Mahabharata", "india", "medium"], ["The Ramayana", "El Ramayana", "Das Ramayana", "india", "medium"],
  ["Beowulf", "Beowulf", "Beowulf", "england", "medium"], ["The Song of Roland", "El cantar de Roldán", "Das Rolandslied", "france", "hard"],
  ["The Poem of the Cid", "El cantar de mio Cid", "Der Cantar de mio Cid", "spain", "medium"], ["The Nibelungenlied", "El cantar de los nibelungos", "Das Nibelungenlied", "germany", "medium"],
  ["The Kalevala", "El Kalevala", "Das Kalevala", "finland", "hard"], ["The Shahnameh (Book of Kings)", "El Shahnameh (Libro de los reyes)", "Das Schahname (Buch der Könige)", "persia", "hard"],
  ["The Tale of Genji", "La historia de Genji", "Die Geschichte vom Prinzen Genji", "japan", "medium"], ["Journey to the West", "Viaje al Oeste", "Die Reise nach Westen", "china", "medium"],
  ["The Popol Vuh", "El Popol Vuh", "Das Popol Vuh", "maya", "hard"], ["The Lusiads", "Los lusíadas", "Die Lusiaden", "portugal", "hard"],
  ["The Poetic Edda", "La Edda poética", "Die Lieder-Edda", "iceland", "hard"], ["The Epic of Sundiata", "La epopeya de Sundiata", "Das Sundiata-Epos", "mali", "hard"],
  ["The Cattle Raid of Cooley (Táin Bó Cúailnge)", "El robo del ganado de Cooley (Táin Bó Cúailnge)", "Der Rinderraub von Cooley (Táin Bó Cúailnge)", "ireland", "hard"],
];

export const NOBEL_YES: string[] = [
  "Ernest Hemingway", "Gabriel García Márquez", "Thomas Mann", "Hermann Hesse", "Pablo Neruda", "Albert Camus", "Toni Morrison", "John Steinbeck", "William Faulkner",
  "Günter Grass", "Gabriela Mistral", "Octavio Paz", "Mario Vargas Llosa", "José Saramago", "Orhan Pamuk", "Rabindranath Tagore", "Samuel Beckett", "Doris Lessing",
  "Alice Munro", "Wisława Szymborska", "Naguib Mahfouz", "Yasunari Kawabata", "Rudyard Kipling", "George Bernard Shaw", "T. S. Eliot", "Selma Lagerlöf", "Heinrich Böll",
  "Kazuo Ishiguro", "Seamus Heaney", "Camilo José Cela", "Juan Ramón Jiménez", "Miguel Ángel Asturias", "Wole Soyinka", "Nadine Gordimer", "Harold Pinter", "Mo Yan",
  "Herta Müller", "Han Kang", "Annie Ernaux", "Jon Fosse",
];
export const NOBEL_NO: string[] = [
  "Leo Tolstoy", "James Joyce", "Jorge Luis Borges", "Marcel Proust", "Franz Kafka", "Virginia Woolf", "Mark Twain", "Henrik Ibsen", "Anton Chekhov", "Vladimir Nabokov",
  "Philip Roth", "Milan Kundera", "Chinua Achebe", "Graham Greene", "Federico García Lorca", "Italo Calvino", "Umberto Eco", "Astrid Lindgren", "J. R. R. Tolkien",
  "George Orwell", "Agatha Christie", "Arthur Miller", "Robert Frost", "Julio Cortázar", "Carlos Fuentes", "Benito Pérez Galdós", "Émile Zola", "Rainer Maria Rilke",
  "Bertolt Brecht", "Stefan Zweig", "F. Scott Fitzgerald", "Roald Dahl", "Antonio Machado",
];

// ── dance & theatre terms: [term L, meaning L] ──────────────────────
export const BALLET_TERMS: [L, L][] = [
  [["pirouette", "pirouette", "Pirouette"], ["A full turn on one leg", "Un giro completo sobre una sola pierna", "Eine ganze Drehung auf einem Bein"]],
  [["plié", "plié", "Plié"], ["Bending the knees", "Flexionar las rodillas", "Das Beugen der Knie"]],
  [["grand jeté", "grand jeté", "Grand jeté"], ["A big leap from one leg to the other", "Un gran salto de una pierna a la otra", "Ein großer Sprung von einem Bein auf das andere"]],
  [["pas de deux", "pas de deux", "Pas de deux"], ["A dance for two", "Un baile para dos", "Ein Tanz zu zweit"]],
  [["arabesque", "arabesque", "Arabesque"], ["Standing on one leg with the other stretched out behind", "Apoyarse en una pierna con la otra extendida hacia atrás", "Auf einem Bein stehen, das andere nach hinten gestreckt"]],
  [["tutu", "tutú", "Tutu"], ["The short, stiff skirt of a ballerina", "La falda corta y rígida de la bailarina", "Das kurze, abstehende Röckchen der Ballerina"]],
  [["en pointe", "en pointe (puntas)", "en pointe (Spitzentanz)"], ["Dancing on the tips of the toes", "Bailar sobre la punta de los pies", "Tanzen auf den Zehenspitzen"]],
  [["barre", "barre (barra)", "Barre (Ballettstange)"], ["The handrail used for warm-up exercises", "La barra en la que se hacen ejercicios de calentamiento", "Die Stange für Aufwärmübungen"]],
  [["corps de ballet", "cuerpo de baile", "Corps de ballet"], ["The group of dancers who are not soloists", "El grupo de bailarines que no son solistas", "Die Gruppe der Tänzer, die keine Solisten sind"]],
  [["prima ballerina", "primera bailarina", "Primaballerina"], ["The leading female dancer of a company", "La bailarina principal de una compañía", "Die erste Solotänzerin einer Kompanie"]],
  [["entrechat", "entrechat", "Entrechat"], ["A jump in which the legs cross rapidly several times", "Un salto en el que las piernas se cruzan rápidamente varias veces", "Ein Sprung, bei dem sich die Beine mehrmals schnell kreuzen"]],
  [["port de bras", "port de bras", "Port de bras"], ["The movement and positions of the arms", "El movimiento y las posiciones de los brazos", "Die Bewegung und Haltung der Arme"]],
];
export const THEATRE_TERMS: [L, L][] = [
  [["prompter", "apuntador", "Souffleur"], ["The person who whispers forgotten lines to the actors", "La persona que susurra el texto olvidado a los actores", "Die Person, die den Schauspielern vergessenen Text zuflüstert"]],
  [["dress rehearsal", "ensayo general", "Generalprobe"], ["The final rehearsal in full costume before the premiere", "El último ensayo con vestuario completo antes del estreno", "Die letzte Probe in vollem Kostüm vor der Premiere"]],
  [["encore", "bis", "Zugabe"], ["An extra piece performed at the audience's request", "Una pieza extra que se interpreta a petición del público", "Ein zusätzliches Stück auf Wunsch des Publikums"]],
  [["understudy", "suplente", "Zweitbesetzung"], ["An actor who learns a role to step in if needed", "Un actor que aprende un papel para sustituir al titular si hace falta", "Ein Schauspieler, der eine Rolle einstudiert, um bei Bedarf einzuspringen"]],
  [["premiere", "estreno", "Premiere"], ["The first public performance of a production", "La primera representación pública de una obra", "Die erste öffentliche Aufführung einer Inszenierung"]],
  [["intermission", "entreacto", "Pause"], ["The break between two acts", "La pausa entre dos actos", "Die Unterbrechung zwischen zwei Akten"]],
  [["libretto", "libreto", "Libretto"], ["The text of an opera or musical", "El texto de una ópera o un musical", "Der Text einer Oper oder eines Musicals"]],
  [["monologue", "monólogo", "Monolog"], ["A long speech by a single character", "Un discurso largo de un solo personaje", "Eine lange Rede einer einzelnen Figur"]],
  [["deus ex machina", "deus ex machina", "Deus ex machina"], ["An unexpected event that suddenly resolves the plot", "Un recurso inesperado que resuelve de golpe la trama", "Ein unerwartetes Ereignis, das die Handlung plötzlich auflöst"]],
  [["prologue", "prólogo", "Prolog"], ["An introduction before the main action begins", "Una introducción antes de que empiece la acción principal", "Eine Einleitung vor Beginn der eigentlichen Handlung"]],
  [["stage directions", "acotaciones", "Regieanweisungen"], ["Instructions in the script about movement, setting or tone", "Indicaciones del texto sobre movimientos, decorado o tono", "Hinweise im Text zu Bewegung, Bühnenbild oder Tonfall"]],
];
