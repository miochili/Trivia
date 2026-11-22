/** Fact tables for the "nature" question pack (see ./nature.ts). All names: [en, es, de]. */
import type { Difficulty } from "../../../../src/shared/types";

export type L = [string, string, string];

// ── baby animals (only animals where every language has a real word) ──
/** id, animal (capitalised), "de …" (ES), German genitive, baby word, ids whose baby word would also fit */
export const BABIES: { id: string; animal: L; esDe: string; deGen: string; baby: L; not?: string[] }[] = [
  { id: "cat", animal: ["Cat", "Gato", "Katze"], esDe: "del gato", deGen: "der Katze", baby: ["Kitten", "Gatito", "Kätzchen"] },
  { id: "dog", animal: ["Dog", "Perro", "Hund"], esDe: "del perro", deGen: "des Hundes", baby: ["Puppy", "Cachorro", "Welpe"] },
  { id: "cow", animal: ["Cow", "Vaca", "Kuh"], esDe: "de la vaca", deGen: "der Kuh", baby: ["Calf", "Ternero", "Kalb"] },
  { id: "horse", animal: ["Horse", "Caballo", "Pferd"], esDe: "del caballo", deGen: "des Pferdes", baby: ["Foal", "Potro", "Fohlen"] },
  { id: "sheep", animal: ["Sheep", "Oveja", "Schaf"], esDe: "de la oveja", deGen: "des Schafes", baby: ["Lamb", "Cordero", "Lamm"] },
  { id: "pig", animal: ["Pig", "Cerdo", "Schwein"], esDe: "del cerdo", deGen: "des Schweins", baby: ["Piglet", "Lechón", "Ferkel"] },
  { id: "goat", animal: ["Goat", "Cabra", "Ziege"], esDe: "de la cabra", deGen: "der Ziege", baby: ["Kid", "Cabrito", "Zicklein"] },
  { id: "frog", animal: ["Frog", "Rana", "Frosch"], esDe: "de la rana", deGen: "des Frosches", baby: ["Tadpole", "Renacuajo", "Kaulquappe"] },
  { id: "chicken", animal: ["Chicken", "Gallina", "Huhn"], esDe: "de la gallina", deGen: "des Huhns", baby: ["Chick", "Pollito", "Küken"], not: ["duck"] },
  { id: "duck", animal: ["Duck", "Pato", "Ente"], esDe: "del pato", deGen: "der Ente", baby: ["Duckling", "Patito", "Entenküken"], not: ["chicken"] },
];

// ── yes/no groups ──
export const FLIGHTLESS: L[] = [
  ["Ostrich", "Avestruz", "Strauß"], ["Emu", "Emú", "Emu"], ["Kiwi", "Kiwi", "Kiwi"], ["Penguin", "Pingüino", "Pinguin"],
  ["Cassowary", "Casuario", "Kasuar"], ["Rhea", "Ñandú", "Nandu"], ["Kakapo", "Kakapo", "Kakapo"],
];
export const FLYING_BIRDS: L[] = [
  ["Eagle", "Águila", "Adler"], ["Sparrow", "Gorrión", "Spatz"], ["Swan", "Cisne", "Schwan"], ["Owl", "Búho", "Eule"],
  ["Parrot", "Loro", "Papagei"], ["Flamingo", "Flamenco", "Flamingo"], ["Pelican", "Pelícano", "Pelikan"], ["Hummingbird", "Colibrí", "Kolibri"],
  ["Albatross", "Albatros", "Albatros"], ["Stork", "Cigüeña", "Storch"], ["Seagull", "Gaviota", "Möwe"], ["Pigeon", "Paloma", "Taube"],
  ["Raven", "Cuervo", "Rabe"], ["Falcon", "Halcón", "Falke"], ["Woodpecker", "Pájaro carpintero", "Specht"],
];

export const MARSUPIALS: L[] = [
  ["Kangaroo", "Canguro", "Känguru"], ["Koala", "Koala", "Koala"], ["Wombat", "Wombat", "Wombat"],
  ["Opossum", "Zarigüeya", "Opossum"], ["Wallaby", "Ualabí", "Wallaby"],
];
export const PLACENTALS: L[] = [
  ["Raccoon", "Mapache", "Waschbär"], ["Rabbit", "Conejo", "Kaninchen"], ["Squirrel", "Ardilla", "Eichhörnchen"], ["Hedgehog", "Erizo", "Igel"],
  ["Giant panda", "Panda gigante", "Großer Panda"], ["Beaver", "Castor", "Biber"], ["Red fox", "Zorro rojo", "Rotfuchs"], ["Otter", "Nutria", "Otter"],
  ["Meerkat", "Suricata", "Erdmännchen"], ["Sloth", "Perezoso", "Faultier"], ["Badger", "Tejón", "Dachs"],
];

export const EGG_MAMMALS: L[] = [["Platypus", "Ornitorrinco", "Schnabeltier"], ["Echidna", "Equidna", "Ameisenigel"]];
export const LIVE_BIRTH_MAMMALS: L[] = [
  ["Dolphin", "Delfín", "Delfin"], ["Bat", "Murciélago", "Fledermaus"], ["Kangaroo", "Canguro", "Känguru"], ["Hedgehog", "Erizo", "Igel"],
  ["Mole", "Topo", "Maulwurf"], ["Beaver", "Castor", "Biber"], ["Armadillo", "Armadillo", "Gürteltier"], ["Sloth", "Perezoso", "Faultier"],
  ["Anteater", "Oso hormiguero", "Ameisenbär"], ["Koala", "Koala", "Koala"], ["Blue whale", "Ballena azul", "Blauwal"], ["Porcupine", "Puercoespín", "Stachelschwein"],
];

export const NOCTURNAL: L[] = [
  ["Barn owl", "Lechuza común", "Schleiereule"], ["Bat", "Murciélago", "Fledermaus"], ["Hedgehog", "Erizo", "Igel"], ["Badger", "Tejón", "Dachs"],
  ["Raccoon", "Mapache", "Waschbär"], ["Aye-aye", "Aye-aye", "Fingertier"], ["Kiwi", "Kiwi", "Kiwi"], ["Firefly", "Luciérnaga", "Glühwürmchen"],
  ["Tarsier", "Tarsero", "Koboldmaki"],
];
export const DIURNAL: L[] = [
  ["Eagle", "Águila", "Adler"], ["Honeybee", "Abeja melífera", "Honigbiene"], ["Butterfly", "Mariposa", "Schmetterling"], ["Red squirrel", "Ardilla roja", "Eichhörnchen"],
  ["Meerkat", "Suricata", "Erdmännchen"], ["Chimpanzee", "Chimpancé", "Schimpanse"], ["Gorilla", "Gorila", "Gorilla"], ["Pigeon", "Paloma", "Taube"],
  ["Hummingbird", "Colibrí", "Kolibri"], ["Peacock", "Pavo real", "Pfau"], ["Chicken", "Gallina", "Huhn"], ["Sparrow", "Gorrión", "Spatz"],
];

/** True hibernators only (no bears, badgers, squirrels: those only rest in winter). */
export const HIBERNATORS: L[] = [
  ["Hedgehog", "Erizo", "Igel"], ["Dormouse", "Lirón", "Siebenschläfer"], ["Marmot", "Marmota", "Murmeltier"], ["Bat", "Murciélago", "Fledermaus"],
];
export const WINTER_ACTIVE: L[] = [
  ["Red fox", "Zorro rojo", "Rotfuchs"], ["Wolf", "Lobo", "Wolf"], ["Red deer", "Ciervo", "Rothirsch"], ["Hare", "Liebre", "Feldhase"],
  ["Reindeer", "Reno", "Rentier"], ["Moose", "Alce", "Elch"], ["Lynx", "Lince", "Luchs"], ["Wild boar", "Jabalí", "Wildschwein"],
  ["Woodpecker", "Pájaro carpintero", "Specht"], ["Raven", "Cuervo", "Rabe"],
];

export const VENOMOUS: L[] = [
  ["Rattlesnake", "Serpiente de cascabel", "Klapperschlange"], ["King cobra", "Cobra real", "Königskobra"], ["Black widow spider", "Viuda negra", "Schwarze Witwe"],
  ["Scorpion", "Escorpión", "Skorpion"], ["Box jellyfish", "Cubomedusa", "Würfelqualle"], ["Stonefish", "Pez piedra", "Steinfisch"],
  ["Taipan", "Taipán", "Taipan"], ["Black mamba", "Mamba negra", "Schwarze Mamba"], ["Gila monster", "Monstruo de Gila", "Gila-Krustenechse"],
];
export const HARMLESS: L[] = [
  ["Python", "Pitón", "Python"], ["Boa", "Boa", "Boa"], ["Anaconda", "Anaconda", "Anakonda"], ["Grass snake", "Culebra de collar", "Ringelnatter"],
  ["Tortoise", "Tortuga terrestre", "Landschildkröte"], ["Crocodile", "Cocodrilo", "Krokodil"], ["Gecko", "Geco", "Gecko"], ["Earthworm", "Lombriz de tierra", "Regenwurm"],
  ["Garden snail", "Caracol de jardín", "Weinbergschnecke"], ["Rabbit", "Conejo", "Kaninchen"], ["Goldfish", "Pez de colores", "Goldfisch"], ["Koala", "Koala", "Koala"],
];

export const COLOUR_CHANGERS: L[] = [
  ["Chameleon", "Camaleón", "Chamäleon"], ["Octopus", "Pulpo", "Krake"], ["Cuttlefish", "Sepia", "Sepia"], ["Squid", "Calamar", "Kalmar"],
];
export const NO_COLOUR_CHANGE: L[] = [
  ["Elephant", "Elefante", "Elefant"], ["Giraffe", "Jirafa", "Giraffe"], ["Zebra", "Cebra", "Zebra"], ["Crocodile", "Cocodrilo", "Krokodil"],
  ["Parrot", "Loro", "Papagei"], ["Shark", "Tiburón", "Hai"], ["Dolphin", "Delfín", "Delfin"], ["Hippopotamus", "Hipopótamo", "Flusspferd"],
  ["Penguin", "Pingüino", "Pinguin"], ["Horse", "Caballo", "Pferd"], ["Tiger", "Tigre", "Tiger"], ["Koala", "Koala", "Koala"],
];

export const LUNG_SEA: L[] = [
  ["Dolphin", "Delfín", "Delfin"], ["Blue whale", "Ballena azul", "Blauwal"], ["Seal", "Foca", "Robbe"], ["Sea turtle", "Tortuga marina", "Meeresschildkröte"],
  ["Manatee", "Manatí", "Seekuh"], ["Orca", "Orca", "Schwertwal"], ["Walrus", "Morsa", "Walross"], ["Sea otter", "Nutria marina", "Seeotter"], ["Penguin", "Pingüino", "Pinguin"],
];
export const GILL_SEA: L[] = [
  ["Shark", "Tiburón", "Hai"], ["Tuna", "Atún", "Thunfisch"], ["Salmon", "Salmón", "Lachs"], ["Seahorse", "Caballito de mar", "Seepferdchen"],
  ["Clownfish", "Pez payaso", "Clownfisch"], ["Stingray", "Raya", "Rochen"], ["Swordfish", "Pez espada", "Schwertfisch"], ["Cod", "Bacalao", "Kabeljau"],
  ["Octopus", "Pulpo", "Krake"], ["Crab", "Cangrejo", "Krabbe"], ["Lobster", "Bogavante", "Hummer"],
];

/** European birds that winter in Africa vs birds that stay all year. */
export const MIGRANTS: L[] = [
  ["Barn swallow", "Golondrina común", "Rauchschwalbe"], ["Cuckoo", "Cuco", "Kuckuck"], ["Common swift", "Vencejo común", "Mauersegler"],
  ["Nightingale", "Ruiseñor", "Nachtigall"], ["Bee-eater", "Abejaruco", "Bienenfresser"],
];
export const RESIDENTS: L[] = [
  ["House sparrow", "Gorrión común", "Haussperling"], ["Magpie", "Urraca", "Elster"], ["Tawny owl", "Cárabo", "Waldkauz"],
  ["Great spotted woodpecker", "Pico picapinos", "Buntspecht"], ["Pheasant", "Faisán", "Fasan"], ["City pigeon", "Paloma urbana", "Stadttaube"],
  ["Jay", "Arrendajo", "Eichelhäher"], ["Raven", "Cuervo", "Kolkrabe"],
];

export const EXTINCT: L[] = [
  ["Dodo", "Dodo", "Dodo"], ["Woolly mammoth", "Mamut lanudo", "Wollhaarmammut"], ["Sabre-toothed cat", "Tigre dientes de sable", "Säbelzahnkatze"],
  ["Thylacine (Tasmanian tiger)", "Tilacino (tigre de Tasmania)", "Beutelwolf"], ["Great auk", "Alca gigante", "Riesenalk"],
  ["Steller's sea cow", "Vaca marina de Steller", "Stellersche Seekuh"], ["Aurochs", "Uro", "Auerochse"], ["Passenger pigeon", "Paloma migratoria", "Wandertaube"],
];
export const ALIVE_ODD: L[] = [
  ["Okapi", "Okapi", "Okapi"], ["Axolotl", "Ajolote", "Axolotl"], ["Platypus", "Ornitorrinco", "Schnabeltier"], ["Coelacanth", "Celacanto", "Quastenflosser"],
  ["Komodo dragon", "Dragón de Komodo", "Komodowaran"], ["Aye-aye", "Aye-aye", "Fingertier"], ["Tapir", "Tapir", "Tapir"], ["Pangolin", "Pangolín", "Schuppentier"],
  ["Narwhal", "Narval", "Narwal"], ["Kakapo", "Kakapo", "Kakapo"], ["Snow leopard", "Leopardo de las nieves", "Schneeleopard"], ["Tuatara", "Tuátara", "Brückenechse"],
];

export const STRIPED: L[] = [
  ["Zebra", "Cebra", "Zebra"], ["Tiger", "Tigre", "Tiger"], ["Skunk", "Mofeta", "Stinktier"], ["Wasp", "Avispa", "Wespe"], ["Clownfish", "Pez payaso", "Clownfisch"],
];
export const SPOTTED: L[] = [
  ["Leopard", "Leopardo", "Leopard"], ["Cheetah", "Guepardo", "Gepard"], ["Jaguar", "Jaguar", "Jaguar"], ["Ladybird", "Mariquita", "Marienkäfer"],
  ["Dalmatian", "Dálmata", "Dalmatiner"], ["Giraffe", "Jirafa", "Giraffe"],
];
export const PLAIN: L[] = [
  ["Lion", "León", "Löwe"], ["Polar bear", "Oso polar", "Eisbär"], ["Elephant", "Elefante", "Elefant"], ["Flamingo", "Flamenco", "Flamingo"],
  ["Hippopotamus", "Hipopótamo", "Flusspferd"], ["Crow", "Corneja", "Krähe"],
];

export const FLOWERLESS: L[] = [["Fern", "Helecho", "Farn"], ["Moss", "Musgo", "Moos"], ["Horsetail", "Cola de caballo", "Schachtelhalm"]];
export const FLOWERING: L[] = [
  ["Rose", "Rosa", "Rose"], ["Tulip", "Tulipán", "Tulpe"], ["Sunflower", "Girasol", "Sonnenblume"], ["Apple tree", "Manzano", "Apfelbaum"],
  ["Daisy", "Margarita", "Gänseblümchen"], ["Orchid", "Orquídea", "Orchidee"], ["Poppy", "Amapola", "Mohn"], ["Cherry tree", "Cerezo", "Kirschbaum"],
  ["Dandelion", "Diente de león", "Löwenzahn"], ["Cactus", "Cactus", "Kaktus"],
];

export const FUNGI: L[] = [
  ["Yeast", "Levadura", "Hefe"], ["Truffle", "Trufa", "Trüffel"], ["Mould", "Moho", "Schimmel"], ["Chanterelle", "Rebozuelo", "Pfifferling"],
  ["Button mushroom", "Champiñón", "Champignon"],
];
export const PLANTS: L[] = [
  ["Moss", "Musgo", "Moos"], ["Fern", "Helecho", "Farn"], ["Clover", "Trébol", "Klee"], ["Ivy", "Hiedra", "Efeu"], ["Cactus", "Cactus", "Kaktus"],
  ["Grass", "Hierba", "Gras"], ["Dandelion", "Diente de león", "Löwenzahn"], ["Sunflower", "Girasol", "Sonnenblume"], ["Bamboo", "Bambú", "Bambus"],
];

// ── what animals eat ──
/** food id → label, and the German dative form for "ernährt sich von …" */
export const FOODS: Record<string, { l: L; deDat: string }> = {
  eucalyptus: { l: ["Eucalyptus leaves", "Hojas de eucalipto", "Eukalyptusblätter"], deDat: "Eukalyptusblättern" },
  bamboo: { l: ["Bamboo", "Bambú", "Bambus"], deDat: "Bambus" },
  ants: { l: ["Ants and termites", "Hormigas y termitas", "Ameisen und Termiten"], deDat: "Ameisen und Termiten" },
  nectar: { l: ["Flower nectar", "Néctar de flores", "Blütennektar"], deDat: "Blütennektar" },
  plankton: { l: ["Plankton", "Plancton", "Plankton"], deDat: "Plankton" },
  krill: { l: ["Krill", "Kril", "Krill"], deDat: "Krill" },
  acacia: { l: ["Acacia leaves", "Hojas de acacia", "Akazienblätter"], deDat: "Akazienblättern" },
  mulberry: { l: ["Mulberry leaves", "Hojas de morera", "Maulbeerblätter"], deDat: "Maulbeerblättern" },
  fish: { l: ["Fish", "Peces", "Fisch"], deDat: "Fisch" },
  fruit: { l: ["Fruit", "Fruta", "Früchte"], deDat: "Früchten" },
  grass: { l: ["Grass", "Hierba", "Gras"], deDat: "Gras" },
  seals: { l: ["Seals", "Focas", "Robben"], deDat: "Robben" },
};
/** id, name, "the …" (EN), with article (ES), with article (DE), food, foods that must not be offered as wrong answers */
export const DIETS: { id: string; name: L; en: string; es: string; de: string; food: string; not?: string[] }[] = [
  { id: "koala", name: ["Koala", "Koala", "Koala"], en: "the koala", es: "el koala", de: "der Koala", food: "eucalyptus" },
  { id: "panda", name: ["Giant panda", "Panda gigante", "Großer Panda"], en: "the giant panda", es: "el panda gigante", de: "der Große Panda", food: "bamboo" },
  { id: "anteater", name: ["Giant anteater", "Oso hormiguero", "Großer Ameisenbär"], en: "the giant anteater", es: "el oso hormiguero", de: "der Große Ameisenbär", food: "ants" },
  { id: "aardvark", name: ["Aardvark", "Cerdo hormiguero", "Erdferkel"], en: "the aardvark", es: "el cerdo hormiguero", de: "das Erdferkel", food: "ants" },
  { id: "hummingbird", name: ["Hummingbird", "Colibrí", "Kolibri"], en: "the hummingbird", es: "el colibrí", de: "der Kolibri", food: "nectar", not: ["fruit"] },
  { id: "whaleshark", name: ["Whale shark", "Tiburón ballena", "Walhai"], en: "the whale shark", es: "el tiburón ballena", de: "der Walhai", food: "plankton", not: ["krill", "fish"] },
  { id: "bluewhale", name: ["Blue whale", "Ballena azul", "Blauwal"], en: "the blue whale", es: "la ballena azul", de: "der Blauwal", food: "krill", not: ["plankton", "fish"] },
  { id: "giraffe", name: ["Giraffe", "Jirafa", "Giraffe"], en: "the giraffe", es: "la jirafa", de: "die Giraffe", food: "acacia", not: ["grass", "mulberry", "fruit"] },
  { id: "silkworm", name: ["Silkworm", "Gusano de seda", "Seidenraupe"], en: "the silkworm", es: "el gusano de seda", de: "die Seidenraupe", food: "mulberry" },
  { id: "pelican", name: ["Pelican", "Pelícano", "Pelikan"], en: "the pelican", es: "el pelícano", de: "der Pelikan", food: "fish", not: ["krill", "plankton"] },
  { id: "flyingfox", name: ["Flying fox (fruit bat)", "Zorro volador", "Flughund"], en: "the flying fox (a fruit bat)", es: "el zorro volador", de: "der Flughund", food: "fruit", not: ["nectar"] },
  { id: "cow", name: ["Cow", "Vaca", "Kuh"], en: "the cow", es: "la vaca", de: "die Kuh", food: "grass", not: ["acacia", "mulberry"] },
  { id: "polarbear", name: ["Polar bear", "Oso polar", "Eisbär"], en: "the polar bear", es: "el oso polar", de: "der Eisbär", food: "seals", not: ["fish"] },
];

// ── habitats ──
export const HABITATS: Record<string, { l: L; enIn: string; esIn: string; deIn: string }> = {
  desert: { l: ["Desert", "Desierto", "Wüste"], enIn: "in the desert", esIn: "en el desierto", deIn: "in der Wüste" },
  rainforest: { l: ["Tropical rainforest", "Selva tropical", "Tropischer Regenwald"], enIn: "in the tropical rainforest", esIn: "en la selva tropical", deIn: "im tropischen Regenwald" },
  polar: { l: ["Polar regions", "Regiones polares", "Polargebiete"], enIn: "in the polar regions", esIn: "en las regiones polares", deIn: "in den Polargebieten" },
  ocean: { l: ["Ocean", "Océano", "Meer"], enIn: "in the ocean", esIn: "en el océano", deIn: "im Meer" },
  savanna: { l: ["Savanna", "Sabana", "Savanne"], enIn: "on the savanna", esIn: "en la sabana", deIn: "in der Savanne" },
};
/** name, habitat, habitats that must not be offered as wrong answers */
export const HABITAT_ANIMALS: [L, string, string[]?][] = [
  [["Dromedary camel", "Dromedario", "Dromedar"], "desert"], [["Fennec fox", "Fénec", "Fennek"], "desert"], [["Thorny devil", "Diablo espinoso", "Dornteufel"], "desert"],
  [["Orangutan", "Orangután", "Orang-Utan"], "rainforest"], [["Sloth", "Perezoso", "Faultier"], "rainforest"], [["Toucan", "Tucán", "Tukan"], "rainforest"],
  [["Poison dart frog", "Rana punta de flecha", "Pfeilgiftfrosch"], "rainforest"], [["Okapi", "Okapi", "Okapi"], "rainforest"],
  [["Polar bear", "Oso polar", "Eisbär"], "polar", ["ocean"]], [["Walrus", "Morsa", "Walross"], "polar", ["ocean"]],
  [["Emperor penguin", "Pingüino emperador", "Kaiserpinguin"], "polar", ["ocean"]], [["Arctic fox", "Zorro ártico", "Polarfuchs"], "polar"],
  [["Octopus", "Pulpo", "Krake"], "ocean", ["polar"]], [["Jellyfish", "Medusa", "Qualle"], "ocean", ["polar"]], [["Clownfish", "Pez payaso", "Clownfisch"], "ocean"],
  [["Blue whale", "Ballena azul", "Blauwal"], "ocean", ["polar"]], [["Swordfish", "Pez espada", "Schwertfisch"], "ocean"],
  [["Zebra", "Cebra", "Zebra"], "savanna"], [["Giraffe", "Jirafa", "Giraffe"], "savanna"], [["Wildebeest", "Ñu", "Gnu"], "savanna"],
  [["Lion", "León", "Löwe"], "savanna", ["desert"]], [["Warthog", "Facóquero", "Warzenschwein"], "savanna"],
];

// ── comparisons (only asked when the gap is big) ──
/** Top running speed in km/h (approximate). */
export const SPEEDS: [string, string, string, number][] = [
  ["Cheetah", "Guepardo", "Gepard", 110], ["Pronghorn", "Berrendo", "Gabelbock", 88], ["Lion", "León", "Löwe", 80], ["Racehorse", "Caballo de carreras", "Rennpferd", 70],
  ["Greyhound", "Galgo", "Windhund", 70], ["Ostrich", "Avestruz", "Strauß", 70], ["Zebra", "Cebra", "Zebra", 64], ["Giraffe", "Jirafa", "Giraffe", 55],
  ["Grizzly bear", "Oso grizzly", "Grizzlybär", 56], ["House cat", "Gato doméstico", "Hauskatze", 48], ["African elephant", "Elefante africano", "Afrikanischer Elefant", 40],
  ["Human", "Ser humano", "Mensch", 37], ["Hippopotamus", "Hipopótamo", "Flusspferd", 30], ["Domestic pig", "Cerdo doméstico", "Hausschwein", 17],
  ["Chicken", "Gallina", "Huhn", 14], ["House mouse", "Ratón doméstico", "Hausmaus", 13], ["Giant tortoise", "Tortuga gigante", "Riesenschildkröte", 0.3],
  ["Three-toed sloth", "Perezoso de tres dedos", "Dreifingerfaultier", 0.25], ["Garden snail", "Caracol de jardín", "Weinbergschnecke", 0.05],
];
/** Lifespan in years (long-lived species: known maximum; others: typical). Only compared at ≥2× gaps. */
export const LIFESPANS: [string, string, string, number][] = [
  ["Greenland shark", "Tiburón de Groenlandia", "Grönlandhai", 400], ["Bowhead whale", "Ballena boreal", "Grönlandwal", 200],
  ["Giant tortoise", "Tortuga gigante", "Riesenschildkröte", 150], ["Elephant", "Elefante", "Elefant", 65], ["Horse", "Caballo", "Pferd", 28],
  ["House cat", "Gato doméstico", "Hauskatze", 15], ["Dog", "Perro", "Hund", 12], ["Rabbit", "Conejo", "Kaninchen", 9],
  ["Guinea pig", "Cobaya", "Meerschweinchen", 6], ["Hamster", "Hámster", "Hamster", 2.5], ["House mouse", "Ratón doméstico", "Hausmaus", 1.5],
  ["Housefly", "Mosca doméstica", "Stubenfliege", 0.08],
];
/** Mohs hardness */
export const MOHS: [string, string, string, number][] = [
  ["Talc", "Talco", "Talk", 1], ["Gypsum", "Yeso", "Gips", 2], ["Calcite", "Calcita", "Calcit", 3], ["Fluorite", "Fluorita", "Fluorit", 4],
  ["Apatite", "Apatito", "Apatit", 5], ["Orthoclase (feldspar)", "Ortoclasa (feldespato)", "Orthoklas (Feldspat)", 6], ["Quartz", "Cuarzo", "Quarz", 7],
  ["Topaz", "Topacio", "Topas", 8], ["Corundum", "Corindón", "Korund", 9], ["Diamond", "Diamante", "Diamant", 10],
];

// ── dinosaurs ──
export const PERIODS: Record<string, { l: L; enIn: string; esIn: string; deIn: string }> = {
  T: { l: ["Triassic", "Triásico", "Trias"], enIn: "the Triassic", esIn: "el Triásico", deIn: "in der Trias" },
  J: { l: ["Jurassic", "Jurásico", "Jura"], enIn: "the Jurassic", esIn: "el Jurásico", deIn: "im Jura" },
  K: { l: ["Cretaceous", "Cretácico", "Kreidezeit"], enIn: "the Cretaceous", esIn: "el Cretácico", deIn: "in der Kreidezeit" },
  P: { l: ["Permian", "Pérmico", "Perm"], enIn: "the Permian", esIn: "el Pérmico", deIn: "im Perm" },
};
/** name, diet (plant/meat; "" = not asked), period, famous? */
export const DINOS: [L, "plant" | "meat" | "", "T" | "J" | "K", boolean][] = [
  [["Tyrannosaurus rex", "Tiranosaurio rex", "Tyrannosaurus rex"], "meat", "K", true],
  [["Velociraptor", "Velociraptor", "Velociraptor"], "meat", "K", true],
  [["Spinosaurus", "Espinosaurio", "Spinosaurus"], "meat", "K", false],
  [["Allosaurus", "Alosaurio", "Allosaurus"], "meat", "J", false],
  [["Giganotosaurus", "Giganotosaurio", "Giganotosaurus"], "meat", "K", false],
  [["Carnotaurus", "Carnotauro", "Carnotaurus"], "meat", "K", false],
  [["Coelophysis", "Celofisis", "Coelophysis"], "meat", "T", false],
  [["Triceratops", "Triceratops", "Triceratops"], "plant", "K", true],
  [["Stegosaurus", "Estegosaurio", "Stegosaurus"], "plant", "J", true],
  [["Brachiosaurus", "Braquiosaurio", "Brachiosaurus"], "plant", "J", true],
  [["Diplodocus", "Diplodocus", "Diplodocus"], "plant", "J", true],
  [["Ankylosaurus", "Anquilosaurio", "Ankylosaurus"], "plant", "K", false],
  [["Iguanodon", "Iguanodonte", "Iguanodon"], "plant", "K", false],
  [["Parasaurolophus", "Parasaurolofo", "Parasaurolophus"], "plant", "K", false],
  [["Plateosaurus", "Plateosaurio", "Plateosaurus"], "", "T", false],
];

// ── rocks & gems ──
export const ROCK_TYPES: Record<string, L> = {
  igneous: ["Which of these is an igneous rock (formed from cooled magma or lava)?", "¿Cuál de estas rocas es ígnea (formada al enfriarse el magma o la lava)?", "Welches dieser Gesteine ist ein magmatisches Gestein (aus abgekühltem Magma oder Lava)?"],
  sedimentary: ["Which of these is a sedimentary rock (formed from layers of deposited material)?", "¿Cuál de estas rocas es sedimentaria (formada por capas de material depositado)?", "Welches dieser Gesteine ist ein Sedimentgestein (aus abgelagerten Schichten entstanden)?"],
  metamorphic: ["Which of these is a metamorphic rock (changed by heat and pressure)?", "¿Cuál de estas rocas es metamórfica (transformada por el calor y la presión)?", "Welches dieser Gesteine ist ein metamorphes Gestein (durch Hitze und Druck umgewandelt)?"],
};
export const ROCKS: [L, string][] = [
  [["Granite", "Granito", "Granit"], "igneous"], [["Basalt", "Basalto", "Basalt"], "igneous"], [["Obsidian", "Obsidiana", "Obsidian"], "igneous"], [["Pumice", "Piedra pómez", "Bimsstein"], "igneous"],
  [["Sandstone", "Arenisca", "Sandstein"], "sedimentary"], [["Limestone", "Caliza", "Kalkstein"], "sedimentary"], [["Chalk", "Creta", "Kreide"], "sedimentary"], [["Conglomerate", "Conglomerado", "Konglomerat"], "sedimentary"],
  [["Marble", "Mármol", "Marmor"], "metamorphic"], [["Slate", "Pizarra", "Schiefer"], "metamorphic"], [["Gneiss", "Gneis", "Gneis"], "metamorphic"], [["Quartzite", "Cuarcita", "Quarzit"], "metamorphic"],
];

/** colour → option label, and the feminine Spanish / lowercase German adjective for "Which gem is usually …?" */
export const COLOURS: Record<string, { l: L; en: string; esF: string; de: string }> = {
  red: { l: ["Red", "Rojo", "Rot"], en: "red", esF: "roja", de: "rot" },
  blue: { l: ["Blue", "Azul", "Blau"], en: "blue", esF: "azul", de: "blau" },
  green: { l: ["Green", "Verde", "Grün"], en: "green", esF: "verde", de: "grün" },
  purple: { l: ["Purple", "Morado", "Violett"], en: "purple", esF: "morada", de: "violett" },
  yellow: { l: ["Yellow", "Amarillo", "Gelb"], en: "yellow", esF: "amarilla", de: "gelb" },
  black: { l: ["Black", "Negro", "Schwarz"], en: "black", esF: "negra", de: "schwarz" },
  white: { l: ["White", "Blanco", "Weiß"], en: "white", esF: "blanca", de: "weiß" },
};
/** name, EN with article, ES with article, DE with article, colour, used in "which gem is …" */
export const GEMS: { name: L; en: string; es: string; de: string; colour: string; rev: boolean }[] = [
  { name: ["Ruby", "Rubí", "Rubin"], en: "a ruby", es: "un rubí", de: "ein Rubin", colour: "red", rev: true },
  { name: ["Sapphire", "Zafiro", "Saphir"], en: "a sapphire", es: "un zafiro", de: "ein Saphir", colour: "blue", rev: true },
  { name: ["Emerald", "Esmeralda", "Smaragd"], en: "an emerald", es: "una esmeralda", de: "ein Smaragd", colour: "green", rev: true },
  { name: ["Amethyst", "Amatista", "Amethyst"], en: "an amethyst", es: "una amatista", de: "ein Amethyst", colour: "purple", rev: true },
  { name: ["Citrine", "Citrino", "Citrin"], en: "a citrine", es: "un citrino", de: "ein Citrin", colour: "yellow", rev: true },
  { name: ["Lapis lazuli", "Lapislázuli", "Lapislazuli"], en: "lapis lazuli", es: "el lapislázuli", de: "Lapislazuli", colour: "blue", rev: true },
  { name: ["Jade", "Jade", "Jade"], en: "jade", es: "el jade", de: "Jade", colour: "green", rev: true },
  { name: ["Jet", "Azabache", "Gagat"], en: "jet", es: "el azabache", de: "Gagat", colour: "black", rev: true },
  { name: ["Pearl", "Perla", "Perle"], en: "a pearl", es: "una perla", de: "eine Perle", colour: "white", rev: false },
];

// ── weather & sky ──
export const CLOUDS: Record<string, L> = {
  cumulus: ["Cumulus", "Cúmulo", "Cumulus"],
  cirrus: ["Cirrus", "Cirro", "Cirrus"],
  stratus: ["Stratus", "Estrato", "Stratus"],
  cumulonimbus: ["Cumulonimbus", "Cumulonimbo", "Cumulonimbus"],
  nimbostratus: ["Nimbostratus", "Nimboestrato", "Nimbostratus"],
  altocumulus: ["Altocumulus", "Altocúmulo", "Altocumulus"],
};
/** question, cloud, clouds that must not be offered as wrong answers */
export const CLOUD_FACTS: [L, string, string[]][] = [
  [["Which type of cloud brings thunderstorms with lightning?", "¿Qué tipo de nube trae tormentas con rayos?", "Welche Wolkenart bringt Gewitter mit Blitzen?"], "cumulonimbus", []],
  [["Which type of cloud can grow into a huge tower with an anvil-shaped top?", "¿Qué tipo de nube puede crecer como una torre enorme con la cima en forma de yunque?", "Welche Wolkenart kann zu einem riesigen Turm mit ambossförmiger Spitze wachsen?"], "cumulonimbus", []],
  [["Which type of cloud is thin and feathery, very high in the sky and made of ice crystals?", "¿Qué tipo de nube es fina y parecida a una pluma, está muy alta y se compone de cristales de hielo?", "Welche Wolkenart ist dünn und federartig, schwebt sehr hoch und besteht aus Eiskristallen?"], "cirrus", []],
  [["Which type of cloud looks like fluffy white cotton wool on a sunny day?", "¿Qué tipo de nube parece algodón blanco y esponjoso en un día soleado?", "Welche Wolkenart sieht an sonnigen Tagen aus wie weiße, flauschige Watte?"], "cumulus", ["cumulonimbus", "altocumulus"]],
  [["Which type of cloud forms a flat, grey, low layer across the whole sky, like fog that does not touch the ground?", "¿Qué tipo de nube forma una capa gris, plana y baja que cubre todo el cielo, como niebla que no toca el suelo?", "Welche Wolkenart bildet eine flache, graue, tiefe Schicht über den ganzen Himmel – wie Nebel, der den Boden nicht berührt?"], "stratus", ["nimbostratus"]],
  [["Which type of cloud is a thick, dark grey layer that brings hours of steady rain or snow?", "¿Qué tipo de nube es una capa gruesa y gris oscura que trae lluvia o nieve continua durante horas?", "Welche Wolkenart ist eine dicke, dunkelgraue Schicht, die stundenlang gleichmäßigen Regen oder Schnee bringt?"], "nimbostratus", ["stratus"]],
];

export const STORMS: Record<string, L> = {
  hurricane: ["Hurricane", "Huracán", "Hurrikan"],
  typhoon: ["Typhoon", "Tifón", "Taifun"],
  cyclone: ["Cyclone", "Ciclón", "Zyklon"],
  tornado: ["Tornado", "Tornado", "Tornado"],
  monsoon: ["Monsoon", "Monzón", "Monsun"],
};
/** region (EN after "hits", ES after "a", DE "in …"), local storm name */
export const STORM_REGIONS: [string, string, string, string][] = [
  ["the Caribbean", "al Caribe", "in der Karibik", "hurricane"], ["Florida", "a Florida", "in Florida", "hurricane"],
  ["the Gulf of Mexico", "al golfo de México", "im Golf von Mexiko", "hurricane"], ["Cuba", "a Cuba", "auf Kuba", "hurricane"],
  ["Puerto Rico", "a Puerto Rico", "auf Puerto Rico", "hurricane"],
  ["Japan", "a Japón", "in Japan", "typhoon"], ["the Philippines", "a Filipinas", "auf den Philippinen", "typhoon"], ["Taiwan", "a Taiwán", "in Taiwan", "typhoon"],
  ["Hong Kong", "a Hong Kong", "in Hongkong", "typhoon"], ["South Korea", "a Corea del Sur", "in Südkorea", "typhoon"], ["Vietnam", "a Vietnam", "in Vietnam", "typhoon"],
  ["India", "a la India", "in Indien", "cyclone"], ["Bangladesh", "a Bangladés", "in Bangladesch", "cyclone"], ["Madagascar", "a Madagascar", "auf Madagaskar", "cyclone"],
  ["Mozambique", "a Mozambique", "in Mosambik", "cyclone"], ["northern Australia", "al norte de Australia", "im Norden Australiens", "cyclone"], ["Fiji", "a Fiyi", "auf Fidschi", "cyclone"],
];

export const SEASON_MONTHS: Record<string, L> = {
  djf: ["December to February", "De diciembre a febrero", "Dezember bis Februar"],
  mam: ["March to May", "De marzo a mayo", "März bis Mai"],
  jja: ["June to August", "De junio a agosto", "Juni bis August"],
  son: ["September to November", "De septiembre a noviembre", "September bis November"],
};
export const SOUTH_COUNTRIES = ["australia", "argentina", "chile", "south_africa", "new_zealand", "uruguay"];
export const NORTH_COUNTRIES = ["usa", "canada", "japan", "uk", "france", "germany", "italy", "spain", "russia", "china", "south_korea", "norway", "sweden", "poland"];

// ── plants ──
export const PLANT_PARTS: Record<string, L> = {
  roots: ["Roots", "Raíces", "Wurzeln"],
  leaves: ["Leaves", "Hojas", "Blätter"],
  flower: ["Flower", "Flor", "Blüte"],
  stem: ["Stem", "Tallo", "Stängel"],
  seed: ["Seed", "Semilla", "Samen"],
  fruit: ["Fruit", "Fruto", "Frucht"],
};
export const PLANT_JOBS: [L, string, string[]][] = [
  [["Which part of a plant takes in water and minerals from the soil?", "¿Qué parte de la planta absorbe el agua y los minerales del suelo?", "Welcher Teil der Pflanze nimmt Wasser und Mineralstoffe aus dem Boden auf?"], "roots", []],
  [["Which part of a plant anchors it firmly in the ground?", "¿Qué parte de la planta la sujeta firmemente al suelo?", "Welcher Teil der Pflanze verankert sie fest im Boden?"], "roots", []],
  [["In most plants, which part uses sunlight to make food (photosynthesis)?", "En la mayoría de las plantas, ¿qué parte usa la luz del sol para fabricar alimento (fotosíntesis)?", "Welcher Teil stellt bei den meisten Pflanzen mit Sonnenlicht Nahrung her (Fotosynthese)?"], "leaves", ["stem"]],
  [["Which part of a plant attracts bees and butterflies with its colours and scent?", "¿Qué parte de la planta atrae a abejas y mariposas con sus colores y su aroma?", "Welcher Teil der Pflanze lockt mit Farben und Duft Bienen und Schmetterlinge an?"], "flower", []],
  [["Which part of a plant carries water from the roots up to the leaves?", "¿Qué parte de la planta lleva el agua desde las raíces hasta las hojas?", "Welcher Teil der Pflanze leitet das Wasser von den Wurzeln hinauf zu den Blättern?"], "stem", []],
  [["Which part of a plant protects the seeds and is often sweet and juicy?", "¿Qué parte de la planta protege las semillas y a menudo es dulce y jugosa?", "Welcher Teil der Pflanze schützt die Samen und ist oft süß und saftig?"], "fruit", ["flower", "seed"]],
  [["Which part of a plant contains a tiny baby plant and a food store for it?", "¿Qué parte de la planta contiene una diminuta planta embrionaria y una reserva de alimento?", "Welcher Teil der Pflanze enthält eine winzige Keimpflanze und einen Nahrungsvorrat dafür?"], "seed", ["fruit"]],
  [["In flowering plants, which part develops into the fruit?", "En las plantas con flores, ¿qué parte se convierte en el fruto?", "Welcher Teil entwickelt sich bei Blütenpflanzen zur Frucht?"], "flower", ["seed"]],
];

// ── life cycles ──
export interface Stage { l: L; en: string; esArt: string; deAcc: string; deDat: string }
export const LIFE_CYCLES: { en: string; es: string; deGen: string; stages: Stage[]; diff: Difficulty }[] = [
  {
    en: "a butterfly", es: "la mariposa", deGen: "des Schmetterlings", diff: "easy", stages: [
      { l: ["Egg", "Huevo", "Ei"], en: "the egg", esArt: "el huevo", deAcc: "das Ei", deDat: "dem Ei" },
      { l: ["Caterpillar", "Oruga", "Raupe"], en: "the caterpillar", esArt: "la oruga", deAcc: "die Raupe", deDat: "der Raupe" },
      { l: ["Pupa (chrysalis)", "Crisálida", "Puppe"], en: "the pupa", esArt: "la crisálida", deAcc: "die Puppe", deDat: "der Puppe" },
      { l: ["Butterfly", "Mariposa", "Schmetterling"], en: "the butterfly", esArt: "la mariposa", deAcc: "den Schmetterling", deDat: "dem Schmetterling" },
    ],
  },
  {
    en: "a frog", es: "la rana", deGen: "des Frosches", diff: "easy", stages: [
      { l: ["Frogspawn (eggs)", "Huevos", "Laich"], en: "the frogspawn", esArt: "los huevos", deAcc: "den Laich", deDat: "dem Laich" },
      { l: ["Tadpole", "Renacuajo", "Kaulquappe"], en: "the tadpole", esArt: "el renacuajo", deAcc: "die Kaulquappe", deDat: "der Kaulquappe" },
      { l: ["Froglet", "Rana joven", "Jungfrosch"], en: "the froglet", esArt: "la rana joven", deAcc: "den Jungfrosch", deDat: "dem Jungfrosch" },
      { l: ["Adult frog", "Rana adulta", "Ausgewachsener Frosch"], en: "the adult frog", esArt: "la rana adulta", deAcc: "den ausgewachsenen Frosch", deDat: "dem ausgewachsenen Frosch" },
    ],
  },
  {
    en: "a ladybird", es: "la mariquita", deGen: "des Marienkäfers", diff: "medium", stages: [
      { l: ["Egg", "Huevo", "Ei"], en: "the egg", esArt: "el huevo", deAcc: "das Ei", deDat: "dem Ei" },
      { l: ["Larva", "Larva", "Larve"], en: "the larva", esArt: "la larva", deAcc: "die Larve", deDat: "der Larve" },
      { l: ["Pupa", "Pupa", "Puppe"], en: "the pupa", esArt: "la pupa", deAcc: "die Puppe", deDat: "der Puppe" },
      { l: ["Adult ladybird", "Mariquita adulta", "Ausgewachsener Marienkäfer"], en: "the adult ladybird", esArt: "la mariquita adulta", deAcc: "den ausgewachsenen Marienkäfer", deDat: "dem ausgewachsenen Marienkäfer" },
    ],
  },
];

// ── national symbols ──
export const SYMBOLS: { subj: L; name: L; country: string; not?: string[] }[] = [
  { subj: ["The bald eagle", "el águila calva", "Der Weißkopfseeadler"], name: ["Bald eagle", "Águila calva", "Weißkopfseeadler"], country: "usa" },
  { subj: ["The kangaroo", "el canguro", "Das Känguru"], name: ["Kangaroo", "Canguro", "Känguru"], country: "australia" },
  { subj: ["The kiwi bird", "el kiwi (el ave)", "Der Kiwi (der Vogel)"], name: ["Kiwi (bird)", "Kiwi (ave)", "Kiwi (Vogel)"], country: "new_zealand" },
  { subj: ["The giant panda", "el panda gigante", "Der Große Panda"], name: ["Giant panda", "Panda gigante", "Großer Panda"], country: "china" },
  { subj: ["The Bengal tiger", "el tigre de Bengala", "Der Bengalische Tiger"], name: ["Bengal tiger", "Tigre de Bengala", "Bengalischer Tiger"], country: "india" },
  { subj: ["The lotus flower", "la flor de loto", "Die Lotosblume"], name: ["Lotus flower", "Flor de loto", "Lotosblume"], country: "india" },
  { subj: ["The beaver", "el castor", "Der Biber"], name: ["Beaver", "Castor", "Biber"], country: "canada" },
  { subj: ["The maple leaf", "la hoja de arce", "Das Ahornblatt"], name: ["Maple leaf", "Hoja de arce", "Ahornblatt"], country: "canada" },
  { subj: ["The rooster", "el gallo", "Der Hahn"], name: ["Rooster", "Gallo", "Hahn"], country: "france" },
  { subj: ["The springbok", "el springbok", "Der Springbock"], name: ["Springbok", "Springbok", "Springbock"], country: "south_africa" },
  { subj: ["The elephant", "el elefante", "Der Elefant"], name: ["Elephant", "Elefante", "Elefant"], country: "thailand", not: ["india"] },
  { subj: ["The cherry blossom", "la flor del cerezo", "Die Kirschblüte"], name: ["Cherry blossom", "Flor del cerezo", "Kirschblüte"], country: "japan" },
  { subj: ["The tulip", "el tulipán", "Die Tulpe"], name: ["Tulip", "Tulipán", "Tulpe"], country: "netherlands" },
  { subj: ["The shamrock", "el trébol", "Das Kleeblatt"], name: ["Shamrock", "Trébol", "Kleeblatt"], country: "ireland" },
  { subj: ["The cedar tree", "el cedro", "Die Zeder"], name: ["Cedar tree", "Cedro", "Zeder"], country: "lebanon" },
  { subj: ["The golden eagle", "el águila real", "Der Steinadler"], name: ["Golden eagle", "Águila real", "Steinadler"], country: "mexico" },
];

// ── animal sounds ──
/** id, animal, ES/DE with article for "what sound does … make", sound noun, verb (3rd person) */
export const SOUNDS: { id: string; animal: L; en: string; es: string; de: string; sound: L; verb: L; not?: string[] }[] = [
  { id: "dog", animal: ["Dog", "Perro", "Hund"], en: "a dog", es: "el perro", de: "ein Hund", sound: ["Barking", "Ladrido", "Bellen"], verb: ["barks", "ladra", "bellt"], not: ["wolf"] },
  { id: "cat", animal: ["Cat", "Gato", "Katze"], en: "a cat", es: "el gato", de: "eine Katze", sound: ["Meowing", "Maullido", "Miauen"], verb: ["meows", "maúlla", "miaut"], not: ["snake"] },
  { id: "cow", animal: ["Cow", "Vaca", "Kuh"], en: "a cow", es: "la vaca", de: "eine Kuh", sound: ["Mooing", "Mugido", "Muhen"], verb: ["moos", "muge", "muht"], not: ["lion"] },
  { id: "horse", animal: ["Horse", "Caballo", "Pferd"], en: "a horse", es: "el caballo", de: "ein Pferd", sound: ["Neighing", "Relincho", "Wiehern"], verb: ["neighs", "relincha", "wiehert"] },
  { id: "sheep", animal: ["Sheep", "Oveja", "Schaf"], en: "a sheep", es: "la oveja", de: "ein Schaf", sound: ["Bleating", "Balido", "Blöken"], verb: ["bleats", "bala", "blökt"] },
  { id: "donkey", animal: ["Donkey", "Burro", "Esel"], en: "a donkey", es: "el burro", de: "ein Esel", sound: ["Braying", "Rebuzno", "Iahen"], verb: ["brays", "rebuzna", "iaht"] },
  { id: "lion", animal: ["Lion", "León", "Löwe"], en: "a lion", es: "el león", de: "ein Löwe", sound: ["Roaring", "Rugido", "Brüllen"], verb: ["roars", "ruge", "brüllt"], not: ["cow", "elephant"] },
  { id: "elephant", animal: ["Elephant", "Elefante", "Elefant"], en: "an elephant", es: "el elefante", de: "ein Elefant", sound: ["Trumpeting", "Barrito", "Trompeten"], verb: ["trumpets", "barrita", "trompetet"], not: ["lion"] },
  { id: "wolf", animal: ["Wolf", "Lobo", "Wolf"], en: "a wolf", es: "el lobo", de: "ein Wolf", sound: ["Howling", "Aullido", "Heulen"], verb: ["howls", "aúlla", "heult"], not: ["dog"] },
  { id: "snake", animal: ["Snake", "Serpiente", "Schlange"], en: "a snake", es: "la serpiente", de: "eine Schlange", sound: ["Hissing", "Siseo", "Zischen"], verb: ["hisses", "sisea", "zischt"], not: ["cat"] },
  { id: "bee", animal: ["Bee", "Abeja", "Biene"], en: "a bee", es: "la abeja", de: "eine Biene", sound: ["Buzzing", "Zumbido", "Summen"], verb: ["buzzes", "zumba", "summt"] },
  { id: "frog", animal: ["Frog", "Rana", "Frosch"], en: "a frog", es: "la rana", de: "ein Frosch", sound: ["Croaking", "Croar", "Quaken"], verb: ["croaks", "croa", "quakt"] },
];

// ── vocabulary ──
/** term, group (only mixed within a group), question asking for the term, short definition, terms that must not be offered as wrong answers */
export const TERMS: { id: string; term: L; group: "eat" | "proc"; ask: L; def: L; not?: string[] }[] = [
  { id: "herbivore", group: "eat", term: ["Herbivore", "Herbívoro", "Pflanzenfresser"],
    ask: ["What do we call an animal that eats only plants?", "¿Cómo se llama un animal que solo come plantas?", "Wie nennt man ein Tier, das nur Pflanzen frisst?"],
    def: ["An animal that eats only plants", "Un animal que solo come plantas", "Ein Tier, das nur Pflanzen frisst"] },
  { id: "carnivore", group: "eat", term: ["Carnivore", "Carnívoro", "Fleischfresser"], not: ["predator", "scavenger"],
    ask: ["What do we call an animal that eats mainly meat?", "¿Cómo se llama un animal que se alimenta sobre todo de carne?", "Wie nennt man ein Tier, das sich vor allem von Fleisch ernährt?"],
    def: ["An animal that eats mainly meat", "Un animal que come sobre todo carne", "Ein Tier, das vor allem Fleisch frisst"] },
  { id: "omnivore", group: "eat", term: ["Omnivore", "Omnívoro", "Allesfresser"],
    ask: ["What do we call an animal that eats both plants and meat?", "¿Cómo se llama un animal que come tanto plantas como carne?", "Wie nennt man ein Tier, das sowohl Pflanzen als auch Fleisch frisst?"],
    def: ["An animal that eats both plants and meat", "Un animal que come plantas y carne", "Ein Tier, das Pflanzen und Fleisch frisst"] },
  { id: "scavenger", group: "eat", term: ["Scavenger", "Carroñero", "Aasfresser"], not: ["carnivore"],
    ask: ["What do we call an animal, like the vulture, that feeds on dead animals it did not kill?", "¿Cómo se llama un animal que, como el buitre, se alimenta de animales muertos que no ha cazado?", "Wie nennt man ein Tier, das sich wie der Geier von toten Tieren ernährt, die es nicht selbst erlegt hat?"],
    def: ["An animal that feeds on dead animals it finds", "Un animal que se alimenta de animales muertos que encuentra", "Ein Tier, das sich von gefundenen toten Tieren ernährt"] },
  { id: "predator", group: "eat", term: ["Predator", "Depredador", "Raubtier"], not: ["carnivore"],
    ask: ["What do we call an animal that hunts and kills other animals for food?", "¿Cómo se llama un animal que caza y mata a otros animales para comérselos?", "Wie nennt man ein Tier, das andere Tiere jagt und erlegt, um sie zu fressen?"],
    def: ["An animal that hunts other animals", "Un animal que caza a otros animales", "Ein Tier, das andere Tiere jagt"] },
  { id: "prey", group: "eat", term: ["Prey", "Presa", "Beutetier"],
    ask: ["What do we call an animal that is hunted and eaten by other animals?", "¿Cómo se llama un animal que es cazado y comido por otros animales?", "Wie nennt man ein Tier, das von anderen Tieren gejagt und gefressen wird?"],
    def: ["An animal that is hunted by other animals", "Un animal que es cazado por otros", "Ein Tier, das von anderen gejagt wird"] },
  { id: "hibernation", group: "proc", term: ["Hibernation", "Hibernación", "Winterschlaf"],
    ask: ["What is the long, deep sleep of hedgehogs and marmots during the cold months called?", "¿Cómo se llama el sueño largo y profundo de erizos y marmotas durante los meses fríos?", "Wie nennt man den langen, tiefen Schlaf von Igeln und Murmeltieren in den kalten Monaten?"],
    def: ["A long, deep sleep through the winter", "Un sueño largo y profundo durante el invierno", "Ein langer, tiefer Schlaf während des Winters"] },
  { id: "camouflage", group: "proc", term: ["Camouflage", "Camuflaje", "Tarnung"],
    ask: ["What is it called when an animal's colours help it blend into its surroundings?", "¿Cómo se llama cuando los colores de un animal le ayudan a confundirse con su entorno?", "Wie nennt man es, wenn die Farben eines Tieres es mit seiner Umgebung verschmelzen lassen?"],
    def: ["Blending in with the surroundings", "Confundirse con el entorno", "Mit der Umgebung verschmelzen"] },
  { id: "metamorphosis", group: "proc", term: ["Metamorphosis", "Metamorfosis", "Metamorphose"],
    ask: ["What is it called when a caterpillar turns into a butterfly?", "¿Cómo se llama el proceso en el que una oruga se convierte en mariposa?", "Wie nennt man es, wenn aus einer Raupe ein Schmetterling wird?"],
    def: ["A complete change of body shape, e.g. caterpillar to butterfly", "Un cambio completo de forma, p. ej. de oruga a mariposa", "Ein völliger Umbau des Körpers, z. B. von der Raupe zum Schmetterling"] },
  { id: "pollination", group: "proc", term: ["Pollination", "Polinización", "Bestäubung"],
    ask: ["What is it called when bees carry pollen from one flower to another?", "¿Cómo se llama cuando las abejas llevan polen de una flor a otra?", "Wie nennt man es, wenn Bienen Pollen von einer Blüte zur nächsten tragen?"],
    def: ["Carrying pollen from flower to flower", "Llevar polen de una flor a otra", "Das Übertragen von Pollen von Blüte zu Blüte"] },
  { id: "extinction", group: "proc", term: ["Extinction", "Extinción", "Aussterben"],
    ask: ["What is it called when the last animal of a species dies and the species is gone forever?", "¿Cómo se llama cuando muere el último ejemplar de una especie y esta desaparece para siempre?", "Wie nennt man es, wenn das letzte Tier einer Art stirbt und die Art für immer verschwindet?"],
    def: ["A species disappearing forever", "La desaparición para siempre de una especie", "Das endgültige Verschwinden einer Art"] },
  { id: "photosynthesis", group: "proc", term: ["Photosynthesis", "Fotosíntesis", "Fotosynthese"],
    ask: ["What is the process called in which plants use sunlight to make their own food?", "¿Cómo se llama el proceso en el que las plantas usan la luz del sol para fabricar su alimento?", "Wie heißt der Vorgang, bei dem Pflanzen mit Sonnenlicht ihre eigene Nahrung herstellen?"],
    def: ["Plants making food from sunlight", "Las plantas fabrican alimento con la luz del sol", "Pflanzen stellen mit Sonnenlicht Nahrung her"] },
  { id: "germination", group: "proc", term: ["Germination", "Germinación", "Keimung"],
    ask: ["What is it called when a seed starts to sprout?", "¿Cómo se llama cuando una semilla empieza a brotar?", "Wie nennt man es, wenn ein Samen zu sprießen beginnt?"],
    def: ["A seed starting to sprout", "Una semilla empieza a brotar", "Ein Samen beginnt zu sprießen"] },
  { id: "habitat", group: "proc", term: ["Habitat", "Hábitat", "Lebensraum"],
    ask: ["What do we call the natural home and surroundings of an animal or plant?", "¿Cómo se llama el lugar natural donde vive un animal o una planta?", "Wie nennt man die natürliche Umgebung, in der ein Tier oder eine Pflanze lebt?"],
    def: ["The natural home of a living thing", "El lugar natural donde vive un ser vivo", "Die natürliche Umgebung, in der ein Lebewesen lebt"] },
  { id: "foodchain", group: "proc", term: ["Food chain", "Cadena alimentaria", "Nahrungskette"],
    ask: ["What do we call a series like grass → rabbit → fox, showing who eats whom?", "¿Cómo se llama una serie como hierba → conejo → zorro, que muestra quién se come a quién?", "Wie nennt man eine Reihe wie Gras → Hase → Fuchs, die zeigt, wer wen frisst?"],
    def: ["A series showing who eats whom", "Una serie que muestra quién se come a quién", "Eine Reihe, die zeigt, wer wen frisst"] },
];
