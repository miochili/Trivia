import type { Continent } from "./countries";

/** Wild animals native to only one continent: [en, es, de, continent] */
export const ANIMAL_HOMES: [string, string, string, Continent][] = [
  ["kangaroo", "canguro", "Känguru", "OC"], ["koala", "koala", "Koala", "OC"], ["platypus", "ornitorrinco", "Schnabeltier", "OC"],
  ["emu", "emú", "Emu", "OC"], ["kiwi (the bird)", "kiwi (el ave)", "Kiwi (der Vogel)", "OC"], ["wombat", "wombat", "Wombat", "OC"],
  ["Tasmanian devil", "demonio de Tasmania", "Beutelteufel", "OC"],
  ["giant panda", "panda gigante", "Großer Panda", "AS"], ["red panda", "panda rojo", "Roter Panda", "AS"], ["orangutan", "orangután", "Orang-Utan", "AS"],
  ["Komodo dragon", "dragón de Komodo", "Komodowaran", "AS"], ["snow leopard", "leopardo de las nieves", "Schneeleopard", "AS"],
  ["tiger", "tigre", "Tiger", "AS"], ["yak", "yak", "Yak", "AS"], ["king cobra", "cobra real", "Königskobra", "AS"],
  ["giraffe", "jirafa", "Giraffe", "AF"], ["zebra", "cebra", "Zebra", "AF"], ["hippopotamus", "hipopótamo", "Flusspferd", "AF"],
  ["gorilla", "gorila", "Gorilla", "AF"], ["chimpanzee", "chimpancé", "Schimpanse", "AF"], ["lemur", "lémur", "Lemur", "AF"],
  ["ostrich", "avestruz", "Strauß", "AF"], ["meerkat", "suricata", "Erdmännchen", "AF"], ["okapi", "okapi", "Okapi", "AF"],
  ["llama", "llama", "Lama", "SA"], ["alpaca", "alpaca", "Alpaka", "SA"], ["Andean condor", "cóndor andino", "Andenkondor", "SA"],
  ["piranha", "piraña", "Piranha", "SA"], ["green anaconda", "anaconda verde", "Große Anakonda", "SA"], ["Galápagos tortoise", "tortuga de Galápagos", "Galápagos-Riesenschildkröte", "SA"],
  ["American bison", "bisonte americano", "Amerikanischer Bison", "NA"], ["bald eagle", "águila calva", "Weißkopfseeadler", "NA"],
  ["raccoon", "mapache", "Waschbär", "NA"], ["prairie dog", "perrito de las praderas", "Präriehund", "NA"], ["American alligator", "aligátor americano", "Mississippi-Alligator", "NA"],
  ["European bison", "bisonte europeo", "Wisent", "EU"], ["Iberian lynx", "lince ibérico", "Pardelluchs", "EU"], ["Alpine ibex", "íbice de los Alpes", "Alpensteinbock", "EU"],
];

/** Typical adult mass in kg: [en, es, de, kg] — only compared when the gap is at least 3× */
export const ANIMAL_MASS: [string, string, string, number][] = [
  ["Blue whale", "Ballena azul", "Blauwal", 140000], ["Orca", "Orca", "Schwertwal", 5000], ["African elephant", "Elefante africano", "Afrikanischer Elefant", 6000],
  ["White rhinoceros", "Rinoceronte blanco", "Breitmaulnashorn", 2300], ["Hippopotamus", "Hipopótamo", "Flusspferd", 1500], ["Giraffe", "Jirafa", "Giraffe", 1000],
  ["Great white shark", "Gran tiburón blanco", "Weißer Hai", 1100], ["Saltwater crocodile", "Cocodrilo marino", "Leistenkrokodil", 500],
  ["Polar bear", "Oso polar", "Eisbär", 450], ["Moose", "Alce", "Elch", 450], ["Cow", "Vaca", "Kuh", 700], ["Horse", "Caballo", "Pferd", 500],
  ["Brown bear", "Oso pardo", "Braunbär", 300], ["Tiger", "Tigre", "Tiger", 200], ["Lion", "León", "Löwe", 190], ["Gorilla", "Gorila", "Gorilla", 160],
  ["Ostrich", "Avestruz", "Strauß", 110], ["Giant panda", "Panda gigante", "Großer Panda", 100], ["Red kangaroo", "Canguro rojo", "Rotes Riesenkänguru", 60],
  ["Sheep", "Oveja", "Schaf", 70], ["Chimpanzee", "Chimpancé", "Schimpanse", 50], ["Wolf", "Lobo", "Wolf", 40], ["Emperor penguin", "Pingüino emperador", "Kaiserpinguin", 30],
  ["Beaver", "Castor", "Biber", 20], ["Koala", "Koala", "Koala", 9], ["Red fox", "Zorro rojo", "Rotfuchs", 6], ["Golden eagle", "Águila real", "Steinadler", 5],
  ["House cat", "Gato doméstico", "Hauskatze", 4], ["Rabbit", "Conejo", "Kaninchen", 2], ["Chicken", "Gallina", "Huhn", 2.5], ["Hedgehog", "Erizo", "Igel", 0.8],
  ["Squirrel", "Ardilla", "Eichhörnchen", 0.4], ["Rat", "Rata", "Ratte", 0.3], ["Hamster", "Hámster", "Hamster", 0.12], ["Sparrow", "Gorrión", "Spatz", 0.03],
  ["Mouse", "Ratón", "Maus", 0.02], ["Hummingbird", "Colibrí", "Kolibri", 0.004], ["Honeybee", "Abeja melífera", "Honigbiene", 0.0001], ["Ant", "Hormiga", "Ameise", 0.000005],
];

/** [en, es, de, number of legs] */
export const ANIMAL_LEGS: [string, string, string, number][] = [
  ["Spider", "Araña", "Spinne", 8], ["Scorpion", "Escorpión", "Skorpion", 8], ["Tick", "Garrapata", "Zecke", 8],
  ["Crab", "Cangrejo", "Krabbe", 10], ["Lobster", "Bogavante", "Hummer", 10], ["Shrimp", "Gamba", "Garnele", 10],
  ["Ant", "Hormiga", "Ameise", 6], ["Bee", "Abeja", "Biene", 6], ["Butterfly", "Mariposa", "Schmetterling", 6], ["Beetle", "Escarabajo", "Käfer", 6],
  ["Grasshopper", "Saltamontes", "Heuschrecke", 6], ["Ladybird", "Mariquita", "Marienkäfer", 6],
  ["Ostrich", "Avestruz", "Strauß", 2], ["Penguin", "Pingüino", "Pinguin", 2], ["Chicken", "Gallina", "Huhn", 2],
  ["Dog", "Perro", "Hund", 4], ["Horse", "Caballo", "Pferd", 4], ["Frog", "Rana", "Frosch", 4], ["Lizard", "Lagarto", "Eidechse", 4], ["Elephant", "Elefante", "Elefant", 4],
  ["Snake", "Serpiente", "Schlange", 0], ["Earthworm", "Lombriz de tierra", "Regenwurm", 0],
];

export const HERBIVORES: [string, string, string][] = [
  ["Cow", "Vaca", "Kuh"], ["Horse", "Caballo", "Pferd"], ["Giraffe", "Jirafa", "Giraffe"], ["Elephant", "Elefante", "Elefant"], ["Zebra", "Cebra", "Zebra"],
  ["Rabbit", "Conejo", "Kaninchen"], ["Koala", "Koala", "Koala"], ["Hippopotamus", "Hipopótamo", "Flusspferd"], ["Sheep", "Oveja", "Schaf"], ["Goat", "Cabra", "Ziege"],
  ["Bison", "Bisonte", "Bison"], ["Kangaroo", "Canguro", "Känguru"], ["Deer", "Ciervo", "Hirsch"], ["Camel", "Camello", "Kamel"], ["Manatee", "Manatí", "Seekuh"],
];
export const CARNIVORES: [string, string, string][] = [
  ["Lion", "León", "Löwe"], ["Tiger", "Tigre", "Tiger"], ["Wolf", "Lobo", "Wolf"], ["Shark", "Tiburón", "Hai"], ["Eagle", "Águila", "Adler"],
  ["Crocodile", "Cocodrilo", "Krokodil"], ["Polar bear", "Oso polar", "Eisbär"], ["Cheetah", "Guepardo", "Gepard"], ["Leopard", "Leopardo", "Leopard"],
  ["Orca", "Orca", "Schwertwal"], ["Owl", "Búho", "Eule"], ["Snake", "Serpiente", "Schlange"], ["Falcon", "Halcón", "Falke"], ["Seal", "Foca", "Robbe"],
  ["Lynx", "Lince", "Luchs"], ["Komodo dragon", "Dragón de Komodo", "Komodowaran"],
];

export const CONIFERS: [string, string, string][] = [
  ["Pine", "Pino", "Kiefer"], ["Spruce", "Pícea", "Fichte"], ["Fir", "Abeto", "Tanne"], ["Cedar", "Cedro", "Zeder"], ["Cypress", "Ciprés", "Zypresse"],
  ["Yew", "Tejo", "Eibe"], ["Sequoia", "Secuoya", "Mammutbaum"], ["Juniper", "Enebro", "Wacholder"],
];
export const BROADLEAF: [string, string, string][] = [
  ["Oak", "Roble", "Eiche"], ["Beech", "Haya", "Buche"], ["Maple", "Arce", "Ahorn"], ["Birch", "Abedul", "Birke"], ["Willow", "Sauce", "Weide"],
  ["Chestnut", "Castaño", "Kastanie"], ["Ash", "Fresno", "Esche"], ["Elm", "Olmo", "Ulme"], ["Poplar", "Álamo", "Pappel"], ["Linden", "Tilo", "Linde"],
];
