/** Fact tables for the second "nature" question pack (see ./nature2.ts). All names: [en, es, de]. */
import type { Difficulty } from "../../../../src/shared/types";

export type L = [string, string, string];
/** Hand-written question: difficulty, text, correct answer, three wrong answers. */
export type HQ = [Difficulty, L, L, L, L, L];

// ── wild animals of famous regions (each animal lives in only ONE of these regions) ──
export const REGIONS: Record<string, { l: L; in: L }> = {
  amazon: { l: ["The Amazon rainforest", "La selva amazónica", "Der Amazonas-Regenwald"], in: ["in the Amazon rainforest", "en la selva amazónica", "im Amazonas-Regenwald"] },
  sahara: { l: ["The Sahara", "El Sáhara", "Die Sahara"], in: ["in the Sahara", "en el Sáhara", "in der Sahara"] },
  arctic: { l: ["The Arctic", "El Ártico", "Die Arktis"], in: ["in the Arctic", "en el Ártico", "in der Arktis"] },
  antarctica: { l: ["Antarctica", "La Antártida", "Die Antarktis"], in: ["in and around Antarctica", "en la Antártida y sus mares", "in der Antarktis und ihren Gewässern"] },
  galapagos: { l: ["The Galápagos Islands", "Las islas Galápagos", "Die Galápagosinseln"], in: ["on the Galápagos Islands", "en las islas Galápagos", "auf den Galápagosinseln"] },
  madagascar: { l: ["The forests of Madagascar", "Los bosques de Madagascar", "Die Wälder Madagaskars"], in: ["in the forests of Madagascar", "en los bosques de Madagascar", "in den Wäldern Madagaskars"] },
  borneo: { l: ["The rainforests of Borneo", "Las selvas de Borneo", "Die Regenwälder Borneos"], in: ["in the rainforests of Borneo", "en las selvas de Borneo", "in den Regenwäldern Borneos"] },
  reef: { l: ["The Great Barrier Reef", "La Gran Barrera de Coral", "Das Great Barrier Reef"], in: ["on the Great Barrier Reef", "en la Gran Barrera de Coral", "am Great Barrier Reef"] },
  himalaya: { l: ["The Himalayas", "El Himalaya", "Der Himalaya"], in: ["in the Himalayas", "en el Himalaya", "im Himalaya"] },
};
/** animal, region, difficulty */
export const REGION_ANIMALS: [L, string, Difficulty][] = [
  [["Jaguar", "Jaguar", "Jaguar"], "amazon", "easy"], [["Capybara", "Capibara", "Capybara"], "amazon", "medium"],
  [["Piranha", "Piraña", "Piranha"], "amazon", "easy"], [["Toucan", "Tucán", "Tukan"], "amazon", "easy"],
  [["Scarlet macaw", "Guacamayo rojo", "Hellroter Ara"], "amazon", "medium"], [["Green anaconda", "Anaconda verde", "Große Anakonda"], "amazon", "easy"],
  [["Poison dart frog", "Rana punta de flecha", "Pfeilgiftfrosch"], "amazon", "medium"], [["Giant otter", "Nutria gigante", "Riesenotter"], "amazon", "hard"],
  [["Harpy eagle", "Águila harpía", "Harpyie"], "amazon", "hard"], [["Pink river dolphin", "Delfín rosado", "Rosa Flussdelfin"], "amazon", "medium"],
  [["Fennec fox", "Fénec", "Fennek"], "sahara", "medium"], [["Addax antelope", "Adax", "Mendesantilope"], "sahara", "hard"],
  [["Desert horned viper", "Víbora cornuda del desierto", "Wüstenhornviper"], "sahara", "medium"], [["Dorcas gazelle", "Gacela dorcas", "Dorkasgazelle"], "sahara", "hard"],
  [["Sand cat", "Gato de las arenas", "Sandkatze"], "sahara", "hard"],
  [["Polar bear", "Oso polar", "Eisbär"], "arctic", "easy"], [["Walrus", "Morsa", "Walross"], "arctic", "easy"], [["Narwhal", "Narval", "Narwal"], "arctic", "medium"],
  [["Beluga whale", "Beluga", "Weißwal (Beluga)"], "arctic", "medium"], [["Musk ox", "Buey almizclero", "Moschusochse"], "arctic", "medium"],
  [["Snowy owl", "Búho nival", "Schnee-Eule"], "arctic", "medium"], [["Reindeer", "Reno", "Rentier"], "arctic", "easy"],
  [["Emperor penguin", "Pingüino emperador", "Kaiserpinguin"], "antarctica", "easy"], [["Adélie penguin", "Pingüino de Adelia", "Adeliepinguin"], "antarctica", "medium"],
  [["Leopard seal", "Foca leopardo", "Seeleopard"], "antarctica", "medium"], [["Weddell seal", "Foca de Weddell", "Weddellrobbe"], "antarctica", "hard"],
  [["Marine iguana", "Iguana marina", "Meerechse"], "galapagos", "medium"], [["Blue-footed booby", "Piquero patiazul", "Blaufußtölpel"], "galapagos", "medium"],
  [["Flightless cormorant", "Cormorán no volador", "Stummelkormoran"], "galapagos", "hard"], [["Waved albatross", "Albatros ondulado", "Wellenalbatros"], "galapagos", "hard"],
  [["Ring-tailed lemur", "Lémur de cola anillada", "Katta"], "madagascar", "easy"], [["Aye-aye", "Aye-aye", "Fingertier"], "madagascar", "medium"],
  [["Fossa", "Fosa", "Fossa"], "madagascar", "hard"], [["Indri", "Indri", "Indri"], "madagascar", "hard"],
  [["Tomato frog", "Rana tomate", "Tomatenfrosch"], "madagascar", "hard"], [["Panther chameleon", "Camaleón pantera", "Pantherchamäleon"], "madagascar", "medium"],
  [["Orangutan", "Orangután", "Orang-Utan"], "borneo", "easy"], [["Proboscis monkey", "Mono narigudo", "Nasenaffe"], "borneo", "medium"],
  [["Rhinoceros hornbill", "Cálao rinoceronte", "Rhinozerosvogel"], "borneo", "hard"],
  [["Clownfish", "Pez payaso", "Clownfisch"], "reef", "easy"], [["Blue tang (like Dory)", "Pez cirujano azul (como Dory)", "Paletten-Doktorfisch (wie Dorie)"], "reef", "medium"],
  [["Giant clam", "Almeja gigante", "Riesenmuschel"], "reef", "medium"], [["Dugong", "Dugongo", "Dugong"], "reef", "hard"],
  [["Snow leopard", "Leopardo de las nieves", "Schneeleopard"], "himalaya", "easy"], [["Red panda", "Panda rojo", "Roter Panda"], "himalaya", "medium"],
  [["Yak", "Yak", "Yak"], "himalaya", "easy"],
];

// ── deep sea vs shallow / surface water ──
export const DEEP_SEA: L[] = [
  ["Giant squid", "Calamar gigante", "Riesenkalmar"], ["Vampire squid", "Calamar vampiro", "Vampirtintenfisch"], ["Gulper eel", "Anguila pelícano", "Pelikanaal"],
  ["Dumbo octopus", "Pulpo dumbo", "Dumbo-Oktopus"], ["Giant isopod", "Isópodo gigante", "Riesenassel"], ["Viperfish", "Pez víbora", "Vipernfisch"],
  ["Fangtooth", "Pez ogro", "Säbelzahnfisch"], ["Barreleye fish", "Pez de cabeza transparente", "Gespensterfisch"],
];
export const SHALLOW_SEA: L[] = [
  ["Clownfish", "Pez payaso", "Clownfisch"], ["Seahorse", "Caballito de mar", "Seepferdchen"], ["Manatee", "Manatí", "Seekuh"], ["Sea otter", "Nutria marina", "Seeotter"],
  ["Green sea turtle", "Tortuga verde", "Suppenschildkröte"], ["Parrotfish", "Pez loro", "Papageifisch"], ["Flying fish", "Pez volador", "Fliegender Fisch"],
  ["Dugong", "Dugongo", "Dugong"], ["Hermit crab", "Cangrejo ermitaño", "Einsiedlerkrebs"],
];

// ── body coverings ──
export const COVERS: Record<string, { l: L; rev: L }> = {
  fur: { l: ["Fur or hair", "Pelo", "Fell (Haare)"], rev: ["Which of these animals is covered with fur?", "¿Cuál de estos animales está cubierto de pelo?", "Welches dieser Tiere hat ein Fell?"] },
  feathers: { l: ["Feathers", "Plumas", "Federn"], rev: ["Which of these animals is covered with feathers?", "¿Cuál de estos animales está cubierto de plumas?", "Welches dieser Tiere ist mit Federn bedeckt?"] },
  scales: { l: ["Scales", "Escamas", "Schuppen"], rev: ["Which of these animals is covered with scales?", "¿Cuál de estos animales está cubierto de escamas?", "Welches dieser Tiere ist mit Schuppen bedeckt?"] },
  shell: { l: ["A hard shell", "Un caparazón duro", "Ein harter Panzer"], rev: ["Which of these animals is protected by a hard shell?", "¿Cuál de estos animales está protegido por un caparazón duro?", "Welches dieser Tiere wird durch einen harten Panzer geschützt?"] },
  skin: { l: ["Bare, moist skin", "Piel desnuda y húmeda", "Nackte, feuchte Haut"], rev: ["Which of these animals has bare, moist skin without hair, feathers or scales?", "¿Cuál de estos animales tiene la piel desnuda y húmeda, sin pelo, plumas ni escamas?", "Welches dieser Tiere hat nackte, feuchte Haut ohne Haare, Federn oder Schuppen?"] },
  spines: { l: ["Sharp spines", "Púas afiladas", "Spitze Stacheln"], rev: ["Which of these animals is covered with sharp spines?", "¿Cuál de estos animales está cubierto de púas afiladas?", "Welches dieser Tiere ist mit spitzen Stacheln bedeckt?"] },
};
/** animal, covering, coverings it partly has too (never offered as wrong answers) */
export const COVERED: { name: L; cover: string; not?: string[]; d: Difficulty }[] = [
  { name: ["Brown bear", "Oso pardo", "Braunbär"], cover: "fur", d: "easy" },
  { name: ["Sloth", "Perezoso", "Faultier"], cover: "fur", d: "easy" },
  { name: ["Seal", "Foca", "Robbe"], cover: "fur", d: "medium" },
  { name: ["Lion", "León", "Löwe"], cover: "fur", d: "easy" },
  { name: ["Penguin", "Pingüino", "Pinguin"], cover: "feathers", d: "medium" },
  { name: ["Kiwi (bird)", "Kiwi (ave)", "Kiwi (Vogel)"], cover: "feathers", d: "medium", not: ["fur"] },
  { name: ["Ostrich", "Avestruz", "Strauß"], cover: "feathers", d: "easy" },
  { name: ["Owl", "Búho", "Eule"], cover: "feathers", d: "easy" },
  { name: ["Python", "Pitón", "Python"], cover: "scales", d: "easy" },
  { name: ["Salmon", "Salmón", "Lachs"], cover: "scales", d: "easy" },
  { name: ["Pangolin", "Pangolín", "Schuppentier"], cover: "scales", d: "hard", not: ["fur", "shell"] },
  { name: ["Crocodile", "Cocodrilo", "Krokodil"], cover: "scales", d: "medium", not: ["shell"] },
  { name: ["Gecko", "Geco", "Gecko"], cover: "scales", d: "medium" },
  { name: ["Tortoise", "Tortuga terrestre", "Landschildkröte"], cover: "shell", d: "easy", not: ["scales"] },
  { name: ["Crab", "Cangrejo", "Krabbe"], cover: "shell", d: "easy", not: ["spines"] },
  { name: ["Armadillo", "Armadillo", "Gürteltier"], cover: "shell", d: "medium", not: ["scales", "fur"] },
  { name: ["Frog", "Rana", "Frosch"], cover: "skin", d: "easy" },
  { name: ["Axolotl", "Ajolote", "Axolotl"], cover: "skin", d: "medium" },
  { name: ["Fire salamander", "Salamandra común", "Feuersalamander"], cover: "skin", d: "medium" },
  { name: ["Earthworm", "Lombriz de tierra", "Regenwurm"], cover: "skin", d: "medium" },
  { name: ["Hedgehog", "Erizo", "Igel"], cover: "spines", d: "easy", not: ["fur"] },
  { name: ["Porcupine", "Puercoespín", "Stachelschwein"], cover: "spines", d: "easy", not: ["fur"] },
  { name: ["Sea urchin", "Erizo de mar", "Seeigel"], cover: "spines", d: "medium", not: ["shell"] },
];

// ── warm- and cold-blooded ──
export const WARM_BLOODED: L[] = [
  ["Penguin", "Pingüino", "Pinguin"], ["Polar bear", "Oso polar", "Eisbär"], ["Dolphin", "Delfín", "Delfin"], ["Bat", "Murciélago", "Fledermaus"],
  ["Eagle", "Águila", "Adler"], ["Blue whale", "Ballena azul", "Blauwal"], ["Owl", "Búho", "Eule"], ["Mouse", "Ratón", "Maus"],
  ["Ostrich", "Avestruz", "Strauß"], ["Kangaroo", "Canguro", "Känguru"], ["Platypus", "Ornitorrinco", "Schnabeltier"],
];
export const COLD_BLOODED: L[] = [
  ["Crocodile", "Cocodrilo", "Krokodil"], ["Frog", "Rana", "Frosch"], ["Python", "Pitón", "Python"], ["Goldfish", "Pez de colores", "Goldfisch"],
  ["Iguana", "Iguana", "Leguan"], ["Fire salamander", "Salamandra común", "Feuersalamander"], ["Toad", "Sapo", "Kröte"], ["Trout", "Trucha", "Forelle"],
  ["Gecko", "Geco", "Gecko"], ["Chameleon", "Camaleón", "Chamäleon"], ["Tortoise", "Tortuga terrestre", "Landschildkröte"],
];

// ── antlers vs horns ──
export const ANTLERED: L[] = [
  ["Red deer", "Ciervo común", "Rothirsch"], ["Moose", "Alce", "Elch"], ["Reindeer", "Reno", "Rentier"], ["Roe deer", "Corzo", "Reh"],
  ["Fallow deer", "Gamo", "Damhirsch"], ["Wapiti (elk)", "Wapití", "Wapiti"],
];
export const HORNED: L[] = [
  ["Goat", "Cabra", "Ziege"], ["Rhinoceros", "Rinoceronte", "Nashorn"], ["Bison", "Bisonte", "Bison"], ["Ibex", "Íbice", "Steinbock"],
  ["Cow", "Vaca", "Kuh"], ["Ram (male sheep)", "Carnero", "Widder"], ["Gazelle", "Gacela", "Gazelle"], ["Water buffalo", "Búfalo de agua", "Wasserbüffel"],
  ["Musk ox", "Buey almizclero", "Moschusochse"], ["Yak", "Yak", "Yak"],
];
export const NO_HEADGEAR: L[] = [["Horse", "Caballo", "Pferd"], ["Zebra", "Cebra", "Zebra"], ["Camel", "Camello", "Kamel"], ["Donkey", "Burro", "Esel"]];

// ── social insects with a queen ──
export const QUEEN_COLONY: L[] = [
  ["Honeybee", "Abeja melífera", "Honigbiene"], ["Ant", "Hormiga", "Ameise"], ["Termite", "Termita", "Termite"],
  ["Naked mole-rat", "Rata topo desnuda", "Nacktmull"], ["Bumblebee", "Abejorro", "Hummel"], ["Common wasp", "Avispa común", "Gemeine Wespe"],
];
export const SOLITARY: L[] = [
  ["Butterfly", "Mariposa", "Schmetterling"], ["Ladybird", "Mariquita", "Marienkäfer"], ["Grasshopper", "Saltamontes", "Heuschrecke"],
  ["Dragonfly", "Libélula", "Libelle"], ["Garden spider", "Araña de jardín", "Gartenkreuzspinne"], ["Mosquito", "Mosquito", "Stechmücke"],
  ["Housefly", "Mosca doméstica", "Stubenfliege"], ["Garden snail", "Caracol de jardín", "Weinbergschnecke"], ["Earthworm", "Lombriz de tierra", "Regenwurm"],
];

// ── animal breeds and where they come from ──
/** option label, EN / ES / DE subject for "Which country does … come from?", country id, countries never offered, difficulty */
export const BREEDS: { name: L; en: string; es: string; de: string; c: string; not?: string[]; d: Difficulty }[] = [
  { name: ["Chihuahua", "Chihuahua", "Chihuahua"], en: "the Chihuahua dog breed", es: "la raza de perro chihuahua", de: "die Hunderasse Chihuahua", c: "mexico", d: "easy" },
  { name: ["Shiba Inu", "Shiba inu", "Shiba Inu"], en: "the Shiba Inu dog breed", es: "la raza de perro shiba inu", de: "die Hunderasse Shiba Inu", c: "japan", d: "medium" },
  { name: ["Akita", "Akita inu", "Akita Inu"], en: "the Akita dog breed", es: "la raza de perro akita inu", de: "die Hunderasse Akita Inu", c: "japan", d: "medium" },
  { name: ["Siberian Husky", "Husky siberiano", "Siberian Husky"], en: "the Siberian Husky dog breed", es: "la raza de perro husky siberiano", de: "die Hunderasse Siberian Husky", c: "russia", d: "easy" },
  { name: ["Samoyed", "Samoyedo", "Samojede"], en: "the Samoyed dog breed", es: "la raza de perro samoyedo", de: "die Hunderasse Samojede", c: "russia", d: "hard" },
  { name: ["Borzoi", "Borzoi", "Barsoi"], en: "the Borzoi dog breed", es: "la raza de perro borzoi", de: "die Hunderasse Barsoi", c: "russia", d: "hard" },
  { name: ["Dalmatian", "Dálmata", "Dalmatiner"], en: "the Dalmatian dog breed", es: "la raza de perro dálmata", de: "die Hunderasse Dalmatiner", c: "croatia", d: "medium" },
  { name: ["Pug", "Carlino", "Mops"], en: "the pug dog breed", es: "la raza de perro carlino", de: "die Hunderasse Mops", c: "china", d: "medium" },
  { name: ["Shih Tzu", "Shih tzu", "Shih Tzu"], en: "the Shih Tzu dog breed", es: "la raza de perro shih tzu", de: "die Hunderasse Shih Tzu", c: "china", d: "medium" },
  { name: ["Chow Chow", "Chow chow", "Chow-Chow"], en: "the Chow Chow dog breed", es: "la raza de perro chow chow", de: "die Hunderasse Chow-Chow", c: "china", d: "medium" },
  { name: ["Pekingese", "Pequinés", "Pekinese"], en: "the Pekingese dog breed", es: "la raza de perro pequinés", de: "die Hunderasse Pekinese", c: "china", d: "easy" },
  { name: ["Shar Pei", "Shar pei", "Shar-Pei"], en: "the Shar Pei dog breed", es: "la raza de perro shar pei", de: "die Hunderasse Shar-Pei", c: "china", d: "medium" },
  { name: ["Dachshund", "Teckel", "Dackel"], en: "the dachshund dog breed", es: "la raza de perro teckel", de: "die Hunderasse Dackel", c: "germany", d: "easy" },
  { name: ["Rottweiler", "Rottweiler", "Rottweiler"], en: "the Rottweiler dog breed", es: "la raza de perro rottweiler", de: "die Hunderasse Rottweiler", c: "germany", d: "medium" },
  { name: ["Beagle", "Beagle", "Beagle"], en: "the beagle dog breed", es: "la raza de perro beagle", de: "die Hunderasse Beagle", c: "uk", d: "medium" },
  { name: ["Golden Retriever", "Golden retriever", "Golden Retriever"], en: "the Golden Retriever dog breed", es: "la raza de perro golden retriever", de: "die Hunderasse Golden Retriever", c: "uk", d: "medium" },
  { name: ["Border Collie", "Border collie", "Border Collie"], en: "the Border Collie dog breed", es: "la raza de perro border collie", de: "die Hunderasse Border Collie", c: "uk", d: "medium" },
  { name: ["Newfoundland dog", "Terranova", "Neufundländer"], en: "the Newfoundland dog breed", es: "la raza de perro terranova", de: "die Hunderasse Neufundländer", c: "canada", d: "medium" },
  { name: ["Alaskan Malamute", "Malamute de Alaska", "Alaskan Malamute"], en: "the Alaskan Malamute dog breed", es: "la raza de perro malamute de Alaska", de: "die Hunderasse Alaskan Malamute", c: "usa", d: "easy" },
  { name: ["Boston Terrier", "Boston terrier", "Boston Terrier"], en: "the Boston Terrier dog breed", es: "la raza de perro boston terrier", de: "die Hunderasse Boston Terrier", c: "usa", d: "easy" },
  { name: ["Xoloitzcuintli", "Xoloitzcuintle", "Xoloitzcuintle"], en: "the hairless Xoloitzcuintli dog breed", es: "la raza de perro sin pelo xoloitzcuintle", de: "die Nackthunderasse Xoloitzcuintle", c: "mexico", d: "hard" },
  { name: ["Vizsla", "Vizsla", "Vizsla"], en: "the Vizsla dog breed", es: "la raza de perro vizsla", de: "die Hunderasse Vizsla", c: "hungary", d: "hard" },
  { name: ["Puli", "Puli", "Puli"], en: "the Puli dog breed, with its corded coat", es: "la raza de perro puli, con su pelo en cordones", de: "die Hunderasse Puli mit ihrem Zottelfell", c: "hungary", d: "hard" },
  { name: ["Kangal", "Kangal", "Kangal"], en: "the Kangal shepherd dog breed", es: "la raza de perro pastor kangal", de: "die Hirtenhunderasse Kangal", c: "turkey", d: "hard" },
  { name: ["Siamese cat", "Gato siamés", "Siamkatze"], en: "the Siamese cat", es: "el gato siamés", de: "die Siamkatze", c: "thailand", d: "medium" },
  { name: ["Persian cat", "Gato persa", "Perserkatze"], en: "the Persian cat", es: "el gato persa", de: "die Perserkatze", c: "iran", d: "easy" },
  { name: ["Maine Coon cat", "Gato maine coon", "Maine-Coon-Katze"], en: "the Maine Coon cat breed", es: "la raza de gato maine coon", de: "die Katzenrasse Maine Coon", c: "usa", d: "medium" },
  { name: ["Sphynx cat", "Gato esfinge", "Sphynx-Katze"], en: "the hairless Sphynx cat breed", es: "la raza de gato sin pelo esfinge", de: "die haarlose Katzenrasse Sphynx", c: "canada", d: "hard" },
  { name: ["Ragdoll cat", "Gato ragdoll", "Ragdoll-Katze"], en: "the Ragdoll cat breed", es: "la raza de gato ragdoll", de: "die Katzenrasse Ragdoll", c: "usa", d: "hard" },
  { name: ["Scottish Fold cat", "Gato scottish fold", "Scottish-Fold-Katze"], en: "the Scottish Fold cat breed", es: "la raza de gato scottish fold", de: "die Katzenrasse Scottish Fold", c: "uk", d: "medium" },
  { name: ["Korat cat", "Gato korat", "Korat-Katze"], en: "the Korat cat breed", es: "la raza de gato korat", de: "die Katzenrasse Korat", c: "thailand", d: "hard" },
  { name: ["Chartreux cat", "Gato cartujo", "Kartäuserkatze"], en: "the Chartreux cat breed", es: "la raza de gato cartujo", de: "die Katzenrasse Kartäuser", c: "france", d: "hard" },
  { name: ["Devon Rex cat", "Gato devon rex", "Devon-Rex-Katze"], en: "the Devon Rex cat breed", es: "la raza de gato devon rex", de: "die Katzenrasse Devon Rex", c: "uk", d: "hard" },
  { name: ["Andalusian horse", "Caballo andaluz", "Andalusier"], en: "the Andalusian horse", es: "el caballo andaluz", de: "der Andalusier (Pferderasse)", c: "spain", d: "easy" },
  { name: ["Lipizzaner horse", "Caballo lipizano", "Lipizzaner"], en: "the Lipizzaner horse breed", es: "la raza de caballo lipizano", de: "die Pferderasse Lipizzaner", c: "slovenia", not: ["austria", "italy", "croatia", "hungary"], d: "hard" },
  { name: ["Friesian horse", "Caballo frisón", "Friese (Pferd)"], en: "the black Friesian horse breed", es: "la raza de caballo frisón, de pelaje negro", de: "die schwarze Pferderasse Friese", c: "netherlands", not: ["germany"], d: "medium" },
  { name: ["Shetland pony", "Poni de las Shetland", "Shetlandpony"], en: "the Shetland pony", es: "el poni de las Shetland", de: "das Shetlandpony", c: "uk", d: "easy" },
  { name: ["Fjord horse", "Caballo de los fiordos", "Fjordpferd"], en: "the Fjord horse breed", es: "la raza de caballo de los fiordos", de: "die Pferderasse Fjordpferd", c: "norway", d: "medium" },
  { name: ["Appaloosa horse", "Caballo appaloosa", "Appaloosa"], en: "the spotted Appaloosa horse breed", es: "la raza de caballo moteado appaloosa", de: "die gefleckte Pferderasse Appaloosa", c: "usa", d: "hard" },
  { name: ["Percheron horse", "Caballo percherón", "Percheron"], en: "the Percheron draught horse breed", es: "la raza de caballo de tiro percherón", de: "die Kaltblutrasse Percheron", c: "france", d: "medium" },
  { name: ["Lusitano horse", "Caballo lusitano", "Lusitano"], en: "the Lusitano horse breed", es: "la raza de caballo lusitano", de: "die Pferderasse Lusitano", c: "portugal", not: ["spain"], d: "hard" },
  { name: ["Clydesdale horse", "Caballo clydesdale", "Clydesdale"], en: "the Clydesdale draught horse breed", es: "la raza de caballo de tiro clydesdale", de: "die Kaltblutrasse Clydesdale", c: "uk", d: "medium" },
  { name: ["Connemara pony", "Poni de Connemara", "Connemara-Pony"], en: "the Connemara pony", es: "el poni de Connemara", de: "das Connemara-Pony", c: "ireland", d: "medium" },
  { name: ["Marwari horse", "Caballo marwari", "Marwari-Pferd"], en: "the Marwari horse breed, with its inward-curving ears", es: "la raza de caballo marwari, de orejas curvadas hacia dentro", de: "die Pferderasse Marwari mit ihren nach innen gebogenen Ohren", c: "india", d: "hard" },
  { name: ["Highland cattle", "Vaca de las Highlands", "Highland-Rind"], en: "the shaggy Highland cattle breed", es: "la raza bovina de pelo largo Highland", de: "die zottelige Rinderrasse Highland", c: "uk", d: "medium" },
  { name: ["Wagyu cattle", "Vaca wagyu", "Wagyu-Rind"], en: "the Wagyu cattle breed", es: "la raza bovina wagyu", de: "die Rinderrasse Wagyu", c: "japan", d: "easy" },
  { name: ["Merino sheep", "Oveja merina", "Merinoschaf"], en: "the Merino sheep breed", es: "la raza de oveja merina", de: "die Schafrasse Merino", c: "spain", not: ["australia", "new_zealand"], d: "medium" },
  { name: ["Angora goat", "Cabra de Angora", "Angoraziege"], en: "the Angora goat breed", es: "la raza de cabra de Angora", de: "die Ziegenrasse Angora", c: "turkey", d: "medium" },
];

// ── plants and the one country where they grow wild ──
/** plant, country id, countries never offered (it grows wild there too), difficulty */
export const PLANT_HOMES: [L, string, string[], Difficulty][] = [
  [["Giant sequoia", "Secuoya gigante", "Riesenmammutbaum"], "usa", [], "medium"],
  [["Coast redwood", "Secuoya roja", "Küstenmammutbaum"], "usa", [], "medium"],
  [["Joshua tree", "Árbol de Josué", "Josua-Palmlilie"], "usa", ["mexico"], "medium"],
  [["Venus flytrap", "Venus atrapamoscas", "Venusfliegenfalle"], "usa", [], "medium"],
  [["Saguaro cactus", "Saguaro", "Saguaro-Kaktus"], "usa", ["mexico"], "medium"],
  [["Sugar maple", "Arce azucarero", "Zuckerahorn"], "canada", ["usa"], "easy"],
  [["Eucalyptus", "Eucalipto", "Eukalyptus"], "australia", ["indonesia", "png", "philippines"], "easy"],
  [["Wollemi pine", "Pino de Wollemi", "Wollemie"], "australia", [], "hard"],
  [["Waratah", "Waratah", "Waratah"], "australia", [], "hard"],
  [["Banksia", "Banksia", "Banksie"], "australia", ["png", "indonesia"], "hard"],
  [["Kauri tree", "Kauri", "Kauri-Baum"], "new_zealand", ["australia"], "hard"],
  [["Silver fern", "Helecho plateado", "Silberfarn"], "new_zealand", [], "medium"],
  [["Pōhutukawa tree", "Pohutukawa", "Pohutukawa-Baum"], "new_zealand", [], "hard"],
  [["Ginkgo", "Ginkgo", "Ginkgo"], "china", [], "medium"],
  [["Dawn redwood", "Metasecuoya", "Urweltmammutbaum"], "china", [], "hard"],
  [["Monkey puzzle tree", "Araucaria (pehuén)", "Andentanne"], "chile", ["argentina"], "hard"],
  [["King protea", "Protea rey", "Königsprotea"], "south_africa", [], "medium"],
  [["Bird of paradise flower", "Ave del paraíso", "Paradiesvogelblume"], "south_africa", [], "hard"],
  [["Rooibos", "Rooibos", "Rooibos"], "south_africa", [], "medium"],
  [["Welwitschia", "Welwitschia", "Welwitschie"], "namibia", ["angola"], "hard"],
  [["Argan tree", "Argán", "Arganbaum"], "morocco", ["algeria"], "medium"],
  [["Titan arum (corpse flower)", "Aro gigante (flor cadáver)", "Titanenwurz"], "indonesia", [], "hard"],
  [["Dahlia", "Dalia", "Dahlie"], "mexico", [], "hard"],
  [["Poinsettia", "Flor de Pascua", "Weihnachtsstern"], "mexico", [], "medium"],
  [["Banyan tree", "Baniano", "Banyanbaum"], "india", ["pakistan", "bangladesh", "sri_lanka"], "medium"],
  [["Traveller's palm", "Árbol del viajero", "Baum der Reisenden"], "madagascar", [], "hard"],
  [["Grandidier's baobab", "Baobab de Grandidier", "Grandidiers Affenbrotbaum"], "madagascar", [], "medium"],
];

// ── carnivorous and poisonous plants ──
export const CARNIVOROUS: L[] = [
  ["Venus flytrap", "Venus atrapamoscas", "Venusfliegenfalle"], ["Pitcher plant", "Nepenthes (planta jarra)", "Kannenpflanze"], ["Sundew", "Drosera (rocío de sol)", "Sonnentau"],
  ["Bladderwort", "Utricularia", "Wasserschlauch"], ["Butterwort", "Grasilla", "Fettkraut"], ["Cobra lily", "Planta cobra", "Kobralilie"],
];
export const ORDINARY_PLANTS: L[] = [
  ["Sunflower", "Girasol", "Sonnenblume"], ["Tulip", "Tulipán", "Tulpe"], ["Rose", "Rosa", "Rose"], ["Daisy", "Margarita", "Gänseblümchen"],
  ["Cactus", "Cactus", "Kaktus"], ["Fern", "Helecho", "Farn"], ["Lavender", "Lavanda", "Lavendel"], ["Dandelion", "Diente de león", "Löwenzahn"],
  ["Bamboo", "Bambú", "Bambus"], ["Orchid", "Orquídea", "Orchidee"], ["Moss", "Musgo", "Moos"], ["Clover", "Trébol", "Klee"],
];
export const POISONOUS_PLANTS: L[] = [
  ["Foxglove", "Dedalera", "Roter Fingerhut"], ["Deadly nightshade", "Belladona", "Tollkirsche"], ["Oleander", "Adelfa", "Oleander"],
  ["Poison hemlock", "Cicuta", "Gefleckter Schierling"], ["Monkshood", "Acónito", "Blauer Eisenhut"], ["Lily of the valley", "Lirio de los valles", "Maiglöckchen"],
  ["Castor oil plant", "Ricino", "Rizinus"], ["Yew", "Tejo", "Eibe"],
];
export const EDIBLE_PLANTS: L[] = [
  ["Basil", "Albahaca", "Basilikum"], ["Mint", "Menta", "Minze"], ["Lettuce", "Lechuga", "Kopfsalat"], ["Strawberry plant", "Planta de fresa", "Erdbeerpflanze"],
  ["Rosemary", "Romero", "Rosmarin"], ["Chamomile", "Manzanilla", "Echte Kamille"], ["Parsley", "Perejil", "Petersilie"], ["Thyme", "Tomillo", "Thymian"],
  ["Sunflower", "Girasol", "Sonnenblume"],
];

// ── biomes: what kind of landscape is this place? ──
export const BIOMES: Record<string, { l: L; a: L }> = {
  desert: { l: ["Desert", "Desierto", "Wüste"], a: ["a desert", "un desierto", "eine Wüste"] },
  rainforest: { l: ["Tropical rainforest", "Selva tropical", "Tropischer Regenwald"], a: ["a tropical rainforest", "una selva tropical", "ein tropischer Regenwald"] },
  savanna: { l: ["Savanna", "Sabana", "Savanne"], a: ["a savanna", "una sabana", "eine Savanne"] },
  grassland: { l: ["Temperate grassland", "Pradera templada", "Gemäßigtes Grasland"], a: ["a temperate grassland", "una pradera templada", "ein gemäßigtes Grasland"] },
  wetland: { l: ["Wetland", "Humedal", "Feuchtgebiet"], a: ["a wetland", "un humedal", "ein Feuchtgebiet"] },
  tundra: { l: ["Tundra", "Tundra", "Tundra"], a: ["tundra", "tundra", "Tundra"] },
  taiga: { l: ["Coniferous forest (taiga)", "Bosque de coníferas (taiga)", "Nadelwald (Taiga)"], a: ["a coniferous forest", "un bosque de coníferas", "ein Nadelwald"] },
};
/** label, EN / ES / DE with article (+ location), biome, biomes never offered, difficulty */
export const BIOME_PLACES: { l: L; en: string; es: string; de: string; b: string; not?: string[]; d: Difficulty }[] = [
  { l: ["The Serengeti", "El Serengeti", "Die Serengeti"], en: "the Serengeti in Tanzania", es: "el Serengeti, en Tanzania", de: "die Serengeti in Tansania", b: "savanna", not: ["grassland"], d: "easy" },
  { l: ["The Masai Mara", "La Masái Mara", "Die Masai Mara"], en: "the Masai Mara in Kenya", es: "la Masái Mara, en Kenia", de: "die Masai Mara in Kenia", b: "savanna", not: ["grassland"], d: "medium" },
  { l: ["The Amazon basin", "La cuenca del Amazonas", "Das Amazonasbecken"], en: "the Amazon basin in South America", es: "la cuenca del Amazonas, en Sudamérica", de: "das Amazonasbecken in Südamerika", b: "rainforest", not: ["wetland"], d: "easy" },
  { l: ["The Congo Basin", "La cuenca del Congo", "Das Kongobecken"], en: "the Congo Basin in Central Africa", es: "la cuenca del Congo, en África central", de: "das Kongobecken in Zentralafrika", b: "rainforest", not: ["wetland"], d: "medium" },
  { l: ["The Daintree", "El Daintree", "Der Daintree"], en: "the Daintree in north-eastern Australia", es: "el Daintree, en el noreste de Australia", de: "der Daintree im Nordosten Australiens", b: "rainforest", d: "hard" },
  { l: ["The Sahara", "El Sáhara", "Die Sahara"], en: "the Sahara in North Africa", es: "el Sáhara, en el norte de África", de: "die Sahara in Nordafrika", b: "desert", d: "easy" },
  { l: ["The Atacama", "El Atacama", "Die Atacama"], en: "the Atacama in Chile", es: "el Atacama, en Chile", de: "die Atacama in Chile", b: "desert", d: "medium" },
  { l: ["The Gobi", "El Gobi", "Die Gobi"], en: "the Gobi in Mongolia and China", es: "el Gobi, entre Mongolia y China", de: "die Gobi in der Mongolei und in China", b: "desert", not: ["grassland"], d: "easy" },
  { l: ["The Namib", "El Namib", "Die Namib"], en: "the Namib in south-western Africa", es: "el Namib, en el suroeste de África", de: "die Namib im Südwesten Afrikas", b: "desert", d: "medium" },
  { l: ["The Mojave", "El Mojave", "Die Mojave"], en: "the Mojave in the United States", es: "el Mojave, en Estados Unidos", de: "die Mojave in den USA", b: "desert", d: "medium" },
  { l: ["The Pampas", "La Pampa", "Die Pampa"], en: "the Pampas in Argentina", es: "la Pampa argentina", de: "die Pampa in Argentinien", b: "grassland", not: ["savanna"], d: "medium" },
  { l: ["The Great Plains", "Las Grandes Llanuras", "Die Great Plains"], en: "the Great Plains of North America", es: "las Grandes Llanuras de Norteamérica", de: "die Great Plains in Nordamerika", b: "grassland", not: ["savanna"], d: "medium" },
  { l: ["The Highveld", "El Highveld", "Das Highveld"], en: "the Highveld in South Africa", es: "el Highveld, en Sudáfrica", de: "das Highveld in Südafrika", b: "grassland", not: ["savanna"], d: "hard" },
  { l: ["The Everglades", "Los Everglades", "Die Everglades"], en: "the Everglades in Florida", es: "los Everglades, en Florida", de: "die Everglades in Florida", b: "wetland", d: "medium" },
  { l: ["The Pantanal", "El Pantanal", "Das Pantanal"], en: "the Pantanal in Brazil", es: "el Pantanal, en Brasil", de: "das Pantanal in Brasilien", b: "wetland", not: ["rainforest", "savanna"], d: "medium" },
  { l: ["The Okavango Delta", "El delta del Okavango", "Das Okavangodelta"], en: "the Okavango Delta in Botswana", es: "el delta del Okavango, en Botsuana", de: "das Okavangodelta in Botswana", b: "wetland", not: ["savanna"], d: "medium" },
  { l: ["The Sundarbans", "Los Sundarbans", "Die Sundarbans"], en: "the Sundarbans mangroves of India and Bangladesh", es: "los manglares de los Sundarbans, entre la India y Bangladés", de: "die Mangrovenwälder der Sundarbans in Indien und Bangladesch", b: "wetland", not: ["rainforest"], d: "hard" },
  { l: ["The Yamal Peninsula", "La península de Yamal", "Die Jamal-Halbinsel"], en: "the Yamal Peninsula in northern Siberia", es: "la península de Yamal, en el norte de Siberia", de: "die Jamal-Halbinsel im Norden Sibiriens", b: "tundra", not: ["taiga"], d: "hard" },
];

// ── prehistoric reptiles ──
export const REAL_DINOS: L[] = [
  ["Tyrannosaurus rex", "Tiranosaurio rex", "Tyrannosaurus rex"], ["Velociraptor", "Velociraptor", "Velociraptor"], ["Triceratops", "Triceratops", "Triceratops"],
  ["Stegosaurus", "Estegosaurio", "Stegosaurus"], ["Brachiosaurus", "Braquiosaurio", "Brachiosaurus"], ["Diplodocus", "Diplodocus", "Diplodocus"],
  ["Ankylosaurus", "Anquilosaurio", "Ankylosaurus"], ["Iguanodon", "Iguanodonte", "Iguanodon"], ["Parasaurolophus", "Parasaurolofo", "Parasaurolophus"],
  ["Allosaurus", "Alosaurio", "Allosaurus"],
];
export const SPINOSAURUS: L = ["Spinosaurus", "Espinosaurio", "Spinosaurus"];
export const PTEROSAURS: L[] = [
  ["Pteranodon", "Pteranodon", "Pteranodon"], ["Quetzalcoatlus", "Quetzalcoatlus", "Quetzalcoatlus"],
  ["Pterodactylus", "Pterodáctilo", "Pterodactylus"], ["Rhamphorhynchus", "Ranforrinco", "Rhamphorhynchus"],
];
export const SEA_REPTILES: L[] = [
  ["Plesiosaurus", "Plesiosaurio", "Plesiosaurus"], ["Ichthyosaurus", "Ictiosaurio", "Ichthyosaurus"], ["Mosasaurus", "Mosasaurio", "Mosasaurus"],
  ["Elasmosaurus", "Elasmosaurio", "Elasmosaurus"], ["Liopleurodon", "Liopleurodon", "Liopleurodon"],
];
export const OTHER_PREHISTORIC: L[] = [
  ["Dimetrodon", "Dimetrodon", "Dimetrodon"], ["Megalodon (giant shark)", "Megalodón (tiburón gigante)", "Megalodon (Riesenhai)"],
  ["Woolly mammoth", "Mamut lanudo", "Wollhaarmammut"], ["Sabre-toothed cat", "Tigre dientes de sable", "Säbelzahnkatze"],
];

// ── roles in a food chain ──
export const ROLES: Record<string, L> = {
  producer: ["Producer (makes its own food)", "Productor (fabrica su propio alimento)", "Produzent (stellt seine Nahrung selbst her)"],
  herbivore: ["Primary consumer (plant-eater)", "Consumidor primario (herbívoro)", "Primärkonsument (Pflanzenfresser)"],
  predator: ["Predator (hunts other animals)", "Depredador (caza a otros animales)", "Räuber (jagt andere Tiere)"],
  decomposer: ["Decomposer (breaks down dead matter)", "Descomponedor (descompone la materia muerta)", "Destruent (zersetzt tote Stoffe)"],
};
export const ROLE_ROWS: [L, string, Difficulty][] = [
  [["Grass", "Hierba", "Gras"], "producer", "easy"], [["Oak tree", "Roble", "Eiche"], "producer", "easy"], [["Algae", "Algas", "Algen"], "producer", "medium"],
  [["Sunflower", "Girasol", "Sonnenblume"], "producer", "easy"], [["Kelp (seaweed)", "Kelp (alga marina)", "Seetang (Kelp)"], "producer", "medium"],
  [["Rabbit", "Conejo", "Kaninchen"], "herbivore", "easy"], [["Deer", "Ciervo", "Hirsch"], "herbivore", "easy"], [["Caterpillar", "Oruga", "Raupe"], "herbivore", "medium"],
  [["Grasshopper", "Saltamontes", "Heuschrecke"], "herbivore", "medium"], [["Zebra", "Cebra", "Zebra"], "herbivore", "easy"],
  [["Fox", "Zorro", "Fuchs"], "predator", "easy"], [["Owl", "Búho", "Eule"], "predator", "easy"], [["Great white shark", "Gran tiburón blanco", "Weißer Hai"], "predator", "easy"],
  [["Ladybird", "Mariquita", "Marienkäfer"], "predator", "hard"], [["Lion", "León", "Löwe"], "predator", "easy"],
  [["Mushroom", "Seta", "Pilz"], "decomposer", "medium"], [["Earthworm", "Lombriz de tierra", "Regenwurm"], "decomposer", "medium"],
  [["Woodlouse", "Cochinilla de la humedad", "Kellerassel"], "decomposer", "hard"], [["Soil bacteria", "Bacterias del suelo", "Bodenbakterien"], "decomposer", "medium"],
  [["Mould", "Moho", "Schimmelpilz"], "decomposer", "medium"],
];

// ── echolocation and bioluminescence ──
export const ECHOLOCATORS: L[] = [
  ["Bat", "Murciélago", "Fledermaus"], ["Dolphin", "Delfín", "Delfin"], ["Orca", "Orca", "Schwertwal"], ["Sperm whale", "Cachalote", "Pottwal"],
  ["Beluga whale", "Beluga", "Weißwal (Beluga)"],
];
export const NO_ECHO: L[] = [
  ["Owl", "Búho", "Eule"], ["Eagle", "Águila", "Adler"], ["Cat", "Gato", "Katze"], ["Dog", "Perro", "Hund"], ["Shark", "Tiburón", "Hai"],
  ["Snake", "Serpiente", "Schlange"], ["Frog", "Rana", "Frosch"], ["Horse", "Caballo", "Pferd"], ["Elephant", "Elefante", "Elefant"],
  ["Penguin", "Pingüino", "Pinguin"], ["Octopus", "Pulpo", "Krake"],
];
export const GLOWING: L[] = [
  ["Firefly", "Luciérnaga", "Glühwürmchen"], ["Vampire squid", "Calamar vampiro", "Vampirtintenfisch"], ["Lanternfish", "Pez linterna", "Laternenfisch"],
  ["Firefly squid", "Calamar luciérnaga", "Leuchtkalmar"], ["Sea sparkle plankton (Noctiluca)", "Noctiluca (plancton luminoso)", "Meeresleuchttierchen"],
];
export const NOT_GLOWING: L[] = [
  ["Butterfly", "Mariposa", "Schmetterling"], ["Ladybird", "Mariquita", "Marienkäfer"], ["Goldfish", "Pez de colores", "Goldfisch"], ["Honeybee", "Abeja melífera", "Honigbiene"],
  ["Dragonfly", "Libélula", "Libelle"], ["Clownfish", "Pez payaso", "Clownfisch"], ["Seahorse", "Caballito de mar", "Seepferdchen"], ["Frog", "Rana", "Frosch"],
  ["Garden snail", "Caracol de jardín", "Weinbergschnecke"], ["Grasshopper", "Saltamontes", "Heuschrecke"],
];

// ── animal homes ──
export const HOMES: Record<string, L> = {
  hive: ["A hive with wax combs", "Una colmena con panales de cera", "Ein Stock mit Waben aus Wachs"],
  web: ["A web of silk", "Una tela de seda", "Ein Netz aus Seide"],
  burrow: ["An underground burrow", "Una madriguera bajo tierra", "Ein unterirdischer Bau"],
  mound: ["A tall mound of earth", "Un alto montículo de tierra", "Ein hoher Hügel aus Erde"],
  anthill: ["A heap of pine needles and twigs", "Un montón de agujas de pino y ramitas", "Ein Haufen aus Kiefernnadeln und Zweigen"],
  lodge: ["A lodge of sticks and mud in a pond", "Un refugio de ramas y barro en un estanque", "Eine Burg aus Ästen und Schlamm im Teich"],
  nest: ["A big nest of sticks on a roof or tree", "Un gran nido de ramas en un tejado o árbol", "Ein großes Nest aus Ästen auf einem Dach oder Baum"],
  shell: ["An empty shell from another animal", "Una concha vacía de otro animal", "Ein leeres Schneckenhaus eines anderen Tieres"],
};
export const HOME_ROWS: [L, string, Difficulty][] = [
  [["Honeybee", "Abeja melífera", "Honigbiene"], "hive", "easy"], [["Garden spider", "Araña de jardín", "Gartenkreuzspinne"], "web", "easy"],
  [["Rabbit", "Conejo", "Kaninchen"], "burrow", "easy"], [["Prairie dog", "Perrito de las praderas", "Präriehund"], "burrow", "medium"],
  [["Termites", "Termitas", "Termiten"], "mound", "medium"], [["Red wood ants", "Hormigas rojas de los bosques", "Rote Waldameisen"], "anthill", "medium"],
  [["Beaver", "Castor", "Biber"], "lodge", "easy"], [["White stork", "Cigüeña blanca", "Weißstorch"], "nest", "easy"],
  [["Hermit crab", "Cangrejo ermitaño", "Einsiedlerkrebs"], "shell", "easy"],
];

// ── hand-written questions ──
export const CLIMATE_Q: HQ[] = [
  ["hard", ["At which place was the coldest air temperature ever measured on Earth's surface (about −89 °C)?", "¿Dónde se midió la temperatura del aire más baja registrada en la superficie de la Tierra (unos −89 °C)?", "Wo wurde die tiefste jemals an der Erdoberfläche gemessene Lufttemperatur (etwa −89 °C) gemessen?"],
    ["Vostok Station, Antarctica", "La base Vostok, en la Antártida", "An der Station Wostok in der Antarktis"], ["Oymyakon, Russia", "Oimiakón, en Rusia", "In Oimjakon in Russland"], ["The summit of Mount Everest", "En la cima del Everest", "Auf dem Gipfel des Mount Everest"], ["The North Pole", "En el Polo Norte", "Am Nordpol"]],
  ["easy", ["Which continent is the coldest, windiest and driest on Earth?", "¿Cuál es el continente más frío, ventoso y seco de la Tierra?", "Welcher Kontinent ist der kälteste, windigste und trockenste der Erde?"],
    ["Antarctica", "La Antártida", "Die Antarktis"], ["Asia", "Asia", "Asien"], ["North America", "América del Norte", "Nordamerika"], ["Europe", "Europa", "Europa"]],
  ["medium", ["In which place was the officially recognised world record for the highest air temperature (56.7 °C) measured?", "¿En qué lugar se midió el récord mundial oficial de temperatura del aire más alta (56,7 °C)?", "Wo wurde der offiziell anerkannte Weltrekord für die höchste Lufttemperatur (56,7 °C) gemessen?"],
    ["Death Valley, USA", "El Valle de la Muerte (EE. UU.)", "Im Death Valley (USA)"], ["Dubai, United Arab Emirates", "Dubái (Emiratos Árabes Unidos)", "In Dubai (Vereinigte Arabische Emirate)"], ["Seville, Spain", "Sevilla (España)", "In Sevilla (Spanien)"], ["Cairo, Egypt", "El Cairo (Egipto)", "In Kairo (Ägypten)"]],
  ["medium", ["Which is the driest non-polar desert on Earth?", "¿Cuál es el desierto no polar más seco de la Tierra?", "Welches ist die trockenste Wüste außerhalb der Polargebiete?"],
    ["The Atacama Desert", "El desierto de Atacama", "Die Atacama-Wüste"], ["The Sahara", "El Sáhara", "Die Sahara"], ["The Gobi", "El Gobi", "Die Gobi"], ["The Kalahari", "El Kalahari", "Die Kalahari"]],
  ["medium", ["Mawsynram and Cherrapunji, two of the rainiest places on Earth, are in which country?", "Mawsynram y Cherrapunji, dos de los lugares más lluviosos de la Tierra, ¿en qué país están?", "In welchem Land liegen Mawsynram und Cherrapunji, zwei der regenreichsten Orte der Erde?"],
    ["India", "India", "Indien"], ["Brazil", "Brasil", "Brasilien"], ["Indonesia", "Indonesia", "Indonesien"], ["DR Congo", "República Democrática del Congo", "Demokratische Republik Kongo"]],
  ["easy", ["Which country has by far the most tornadoes every year?", "¿Qué país tiene, con mucha diferencia, más tornados cada año?", "Welches Land hat mit großem Abstand die meisten Tornados pro Jahr?"],
    ["United States", "Estados Unidos", "Vereinigte Staaten"], ["Japan", "Japón", "Japan"], ["Brazil", "Brasil", "Brasilien"], ["Egypt", "Egipto", "Ägypten"]],
  ["hard", ["Lake Maracaibo, where lightning flashes on more nights than almost anywhere else on Earth, is in which country?", "El lago de Maracaibo, donde caen rayos más noches que casi en ningún otro lugar de la Tierra, ¿en qué país está?", "In welchem Land liegt der Maracaibo-See, über dem es in mehr Nächten blitzt als fast irgendwo sonst auf der Erde?"],
    ["Venezuela", "Venezuela", "Venezuela"], ["Peru", "Perú", "Peru"], ["Mexico", "México", "Mexiko"], ["Kenya", "Kenia", "Kenia"]],
  ["medium", ["Oymyakon, often called the coldest permanently inhabited village on Earth, is in which country?", "Oimiakón, a menudo llamado el pueblo habitado más frío de la Tierra, ¿en qué país está?", "In welchem Land liegt Oimjakon, oft als kältestes dauerhaft bewohntes Dorf der Erde bezeichnet?"],
    ["Russia", "Rusia", "Russland"], ["Canada", "Canadá", "Kanada"], ["Norway", "Noruega", "Norwegen"], ["Mongolia", "Mongolia", "Mongolei"]],
  ["medium", ["What is the name of the warming of the Pacific Ocean that changes the weather around the world every few years?", "¿Cómo se llama el calentamiento del océano Pacífico que cada pocos años cambia el tiempo en todo el mundo?", "Wie heißt die Erwärmung des Pazifiks, die alle paar Jahre das Wetter auf der ganzen Welt verändert?"],
    ["El Niño", "El Niño", "El Niño"], ["The Gulf Stream", "La corriente del Golfo", "Der Golfstrom"], ["The jet stream", "La corriente en chorro", "Der Jetstream"], ["The mistral", "El mistral", "Der Mistral"]],
  ["medium", ["What is the Gulf Stream?", "¿Qué es la corriente del Golfo?", "Was ist der Golfstrom?"],
    ["A warm ocean current that brings mild weather to western Europe", "Una corriente oceánica cálida que da a Europa occidental un clima suave", "Eine warme Meeresströmung, die Westeuropa mildes Wetter bringt"], ["A cold wind from the Arctic", "Un viento frío del Ártico", "Ein kalter Wind aus der Arktis"], ["A river in Mexico", "Un río de México", "Ein Fluss in Mexiko"], ["A sandstorm in the desert", "Una tormenta de arena en el desierto", "Ein Sandsturm in der Wüste"]],
  ["hard", ["What is the hot, dry wind called that blows from the Sahara towards southern Europe?", "¿Cómo se llama el viento cálido y seco que sopla desde el Sáhara hacia el sur de Europa?", "Wie heißt der heiße, trockene Wind, der aus der Sahara nach Südeuropa weht?"],
    ["Sirocco", "Siroco", "Schirokko"], ["Mistral", "Mistral", "Mistral"], ["Chinook", "Chinook", "Chinook"], ["Monsoon", "Monzón", "Monsun"]],
  ["medium", ["Which of these is a cold desert with freezing winters?", "¿Cuál de estos es un desierto frío con inviernos helados?", "Welche dieser Wüsten ist eine kalte Wüste mit eisigen Wintern?"],
    ["The Gobi", "El Gobi", "Die Gobi"], ["The Sahara", "El Sáhara", "Die Sahara"], ["The Namib", "El Namib", "Die Namib"], ["The Arabian Desert", "El desierto arábigo", "Die Arabische Wüste"]],
];

export const FOSSIL_Q: HQ[] = [
  ["medium", ["About how long ago did the dinosaurs (apart from birds) die out?", "¿Hace cuánto tiempo aproximadamente se extinguieron los dinosaurios (salvo las aves)?", "Vor wie langer Zeit ungefähr starben die Dinosaurier (außer den Vögeln) aus?"],
    ["About 66 million years ago", "Hace unos 66 millones de años", "Vor etwa 66 Millionen Jahren"], ["About 6 million years ago", "Hace unos 6 millones de años", "Vor etwa 6 Millionen Jahren"], ["About 660 million years ago", "Hace unos 660 millones de años", "Vor etwa 660 Millionen Jahren"], ["About 2 billion years ago", "Hace unos 2000 millones de años", "Vor etwa 2 Milliarden Jahren"]],
  ["easy", ["What is the most widely accepted main cause of the dinosaurs' extinction?", "¿Cuál es la causa principal más aceptada de la extinción de los dinosaurios?", "Was gilt als wichtigste Ursache für das Aussterben der Dinosaurier?"],
    ["A huge asteroid hitting the Earth", "El impacto de un enorme asteroide", "Der Einschlag eines riesigen Asteroiden"], ["Being hunted by early humans", "La caza por parte de los primeros humanos", "Die Jagd durch frühe Menschen"], ["The Moon coming too close", "Que la Luna se acercó demasiado", "Der Mond kam der Erde zu nahe"], ["Eating poisonous flowers", "Comer flores venenosas", "Das Fressen giftiger Blumen"]],
  ["medium", ["Which animals alive today are the direct descendants of dinosaurs?", "¿Qué animales actuales descienden directamente de los dinosaurios?", "Welche heute lebenden Tiere sind direkte Nachfahren der Dinosaurier?"],
    ["Birds", "Las aves", "Die Vögel"], ["Lizards", "Los lagartos", "Die Eidechsen"], ["Sharks", "Los tiburones", "Die Haie"], ["Frogs", "Las ranas", "Die Frösche"]],
  ["easy", ["What does a palaeontologist study?", "¿Qué estudia un paleontólogo?", "Was erforscht ein Paläontologe?"],
    ["Fossils of ancient life", "Los fósiles de seres vivos antiguos", "Fossilien früherer Lebewesen"], ["Stars and planets", "Las estrellas y los planetas", "Sterne und Planeten"], ["Volcanoes", "Los volcanes", "Vulkane"], ["Ancient languages", "Las lenguas antiguas", "Alte Sprachen"]],
  ["medium", ["What is amber, in which insects millions of years old are sometimes found?", "¿Qué es el ámbar, en el que a veces aparecen insectos de hace millones de años?", "Was ist Bernstein, in dem man manchmal Millionen Jahre alte Insekten findet?"],
    ["Fossilised tree resin", "Resina de árbol fosilizada", "Versteinertes Baumharz"], ["Volcanic glass", "Vidrio volcánico", "Vulkanisches Glas"], ["Hardened honey", "Miel endurecida", "Gehärteter Honig"], ["Dinosaur eggshell", "Cáscara de huevo de dinosaurio", "Dinosaurier-Eierschale"]],
  ["medium", ["Ammonites, common fossils with spiral shells, were relatives of which animals living today?", "Los ammonites, fósiles frecuentes con concha en espiral, ¿de qué animales actuales eran parientes?", "Ammoniten, häufige Fossilien mit spiralförmiger Schale, waren mit welchen heutigen Tieren verwandt?"],
    ["Octopuses and squids", "Los pulpos y los calamares", "Kraken und Kalmare"], ["Crabs", "Los cangrejos", "Krabben"], ["Starfish", "Las estrellas de mar", "Seesterne"], ["Earthworms", "Las lombrices de tierra", "Regenwürmer"]],
  ["medium", ["Why is Archaeopteryx so famous?", "¿Por qué es tan famoso el arqueoptérix?", "Warum ist der Archaeopteryx so berühmt?"],
    ["It was an early bird-like dinosaur with feathers and teeth", "Era un dinosaurio parecido a un ave, con plumas y dientes", "Er war ein früher vogelähnlicher Dinosaurier mit Federn und Zähnen"], ["It was the largest flying reptile", "Era el reptil volador más grande", "Er war das größte Flugreptil"], ["It was the first fish to walk on land", "Fue el primer pez que caminó por tierra", "Er war der erste Fisch, der an Land ging"], ["It was a giant prehistoric crocodile", "Era un cocodrilo prehistórico gigante", "Er war ein urzeitliches Riesenkrokodil"]],
  ["easy", ["Which animals alive today are the closest relatives of the woolly mammoth?", "¿Qué animales actuales son los parientes más cercanos del mamut lanudo?", "Welche heutigen Tiere sind die nächsten Verwandten des Wollhaarmammuts?"],
    ["Elephants", "Los elefantes", "Elefanten"], ["Bears", "Los osos", "Bären"], ["Hippos", "Los hipopótamos", "Flusspferde"], ["Camels", "Los camellos", "Kamele"]],
  ["medium", ["When did woolly mammoths live?", "¿Cuándo vivieron los mamuts lanudos?", "Wann lebten Wollhaarmammuts?"],
    ["During the Ice Age, alongside early humans", "Durante la Edad de Hielo, junto a los primeros humanos", "In der Eiszeit, zusammen mit frühen Menschen"], ["At the same time as T. rex", "En la misma época que el T. rex", "Zur gleichen Zeit wie der T. rex"], ["Before the first dinosaurs", "Antes de los primeros dinosaurios", "Vor den ersten Dinosauriern"], ["Only in the last 500 years", "Solo en los últimos 500 años", "Nur in den letzten 500 Jahren"]],
  ["easy", ["Megalodon was a giant prehistoric…", "El megalodón fue un gigantesco… prehistórico.", "Der Megalodon war ein riesiger urzeitlicher…"],
    ["Shark", "Tiburón", "Hai"], ["Whale", "Ballena", "Wal"], ["Crocodile", "Cocodrilo", "Krokodil"], ["Squid", "Calamar", "Tintenfisch"]],
  ["medium", ["Where did trilobites, some of the most common fossils, live?", "¿Dónde vivían los trilobites, unos de los fósiles más comunes?", "Wo lebten Trilobiten, die zu den häufigsten Fossilien gehören?"],
    ["In the sea", "En el mar", "Im Meer"], ["In deserts", "En los desiertos", "In Wüsten"], ["In trees", "En los árboles", "Auf Bäumen"], ["In caves on land", "En cuevas en tierra firme", "In Höhlen an Land"]],
  ["hard", ["Which era of Earth's history is known as the “Age of Dinosaurs”?", "¿Qué era de la historia de la Tierra se conoce como la «era de los dinosaurios»?", "Welches Erdzeitalter nennt man das „Zeitalter der Dinosaurier“?"],
    ["The Mesozoic", "El Mesozoico", "Das Mesozoikum"], ["The Palaeozoic", "El Paleozoico", "Das Paläozoikum"], ["The Cenozoic", "El Cenozoico", "Das Känozoikum"], ["The Precambrian", "El Precámbrico", "Das Präkambrium"]],
  ["hard", ["Which pterosaur was one of the largest flying animals of all time, about as tall as a giraffe when standing?", "¿Qué pterosaurio fue uno de los mayores animales voladores de todos los tiempos, casi tan alto como una jirafa estando de pie?", "Welcher Flugsaurier war eines der größten fliegenden Tiere aller Zeiten und im Stehen etwa so hoch wie eine Giraffe?"],
    ["Quetzalcoatlus", "Quetzalcoatlus", "Quetzalcoatlus"], ["Velociraptor", "Velociraptor", "Velociraptor"], ["Stegosaurus", "Estegosaurio", "Stegosaurus"], ["Archaeopteryx", "Arqueoptérix", "Archaeopteryx"]],
];

export const EVOLUTION_Q: HQ[] = [
  ["easy", ["On which islands did Charles Darwin study finches, tortoises and iguanas?", "¿En qué islas estudió Charles Darwin pinzones, tortugas e iguanas?", "Auf welchen Inseln untersuchte Charles Darwin Finken, Riesenschildkröten und Leguane?"],
    ["The Galápagos Islands", "Las islas Galápagos", "Die Galápagosinseln"], ["The Canary Islands", "Las islas Canarias", "Die Kanarischen Inseln"], ["Hawaii", "Hawái", "Hawaii"], ["The British Isles", "Las islas británicas", "Die Britischen Inseln"]],
  ["medium", ["Why did Darwin's finches on different islands have differently shaped beaks?", "¿Por qué los pinzones de Darwin de distintas islas tenían picos de formas diferentes?", "Warum hatten Darwinfinken auf verschiedenen Inseln unterschiedlich geformte Schnäbel?"],
    ["They had adapted to different foods", "Se habían adaptado a alimentos distintos", "Sie hatten sich an unterschiedliche Nahrung angepasst"], ["Because of the colour of their feathers", "Por el color de sus plumas", "Wegen der Farbe ihrer Federn"], ["Because of the weather on the day they hatched", "Por el tiempo que hacía el día en que nacieron", "Wegen des Wetters an ihrem Schlüpftag"], ["Because they sang different songs", "Porque cantaban canciones distintas", "Weil sie verschiedene Lieder sangen"]],
  ["medium", ["What is Darwin's idea called that living things best suited to their surroundings survive and have more young?", "¿Cómo se llama la idea de Darwin de que los seres vivos mejor adaptados a su entorno sobreviven y tienen más crías?", "Wie heißt Darwins Idee, dass die an ihre Umwelt am besten angepassten Lebewesen überleben und mehr Nachwuchs haben?"],
    ["Natural selection", "Selección natural", "Natürliche Selektion"], ["Photosynthesis", "Fotosíntesis", "Fotosynthese"], ["Plate tectonics", "Tectónica de placas", "Plattentektonik"], ["Hibernation", "Hibernación", "Winterschlaf"]],
  ["hard", ["The peppered moth is a famous example of evolution. Which form became more common in sooty industrial cities?", "La polilla moteada es un ejemplo famoso de evolución. ¿Qué forma se volvió más común en las ciudades industriales llenas de hollín?", "Der Birkenspanner ist ein berühmtes Beispiel für Evolution. Welche Form wurde in rußigen Industriestädten häufiger?"],
    ["The dark form", "La forma oscura", "Die dunkle Form"], ["The pale form", "La forma clara", "Die helle Form"], ["The striped form", "La forma con rayas", "Die gestreifte Form"], ["The red form", "La forma roja", "Die rote Form"]],
  ["easy", ["What do we call a feature that helps a living thing survive in its habitat, such as a camel's wide feet for walking on sand?", "¿Cómo se llama un rasgo que ayuda a un ser vivo a sobrevivir en su hábitat, como las anchas patas del camello para caminar por la arena?", "Wie nennt man ein Merkmal, das einem Lebewesen hilft, in seinem Lebensraum zu überleben – etwa die breiten Füße des Kamels für den Sand?"],
    ["An adaptation", "Una adaptación", "Eine Anpassung"], ["A migration", "Una migración", "Eine Wanderung"], ["A mutation of the weather", "Una mutación del clima", "Eine Wetterveränderung"], ["A pollination", "Una polinización", "Eine Bestäubung"]],
  ["medium", ["The ancestors of whales once lived where?", "¿Dónde vivían en su día los antepasados de las ballenas?", "Wo lebten die Vorfahren der Wale einst?"],
    ["On land, as four-legged mammals", "En tierra, como mamíferos de cuatro patas", "An Land, als vierbeinige Säugetiere"], ["In the air, as birds", "En el aire, como aves", "In der Luft, als Vögel"], ["Underground, as worms", "Bajo tierra, como gusanos", "Unter der Erde, als Würmer"], ["In trees, as monkeys", "En los árboles, como monos", "Auf Bäumen, als Affen"]],
  ["easy", ["Which animals are the closest living relatives of humans?", "¿Cuáles son los parientes vivos más cercanos de los seres humanos?", "Welche Tiere sind die nächsten lebenden Verwandten des Menschen?"],
    ["Chimpanzees and bonobos", "Los chimpancés y los bonobos", "Schimpansen und Bonobos"], ["Lemurs", "Los lémures", "Lemuren"], ["Dolphins", "Los delfines", "Delfine"], ["Pigs", "Los cerdos", "Schweine"]],
  ["medium", ["Why did the coelacanth cause a sensation in 1938?", "¿Por qué causó sensación el celacanto en 1938?", "Warum sorgte der Quastenflosser 1938 für eine Sensation?"],
    ["A fish thought extinct for millions of years was found alive", "Se encontró viva una especie de pez que se creía extinta desde hacía millones de años", "Ein seit Jahrmillionen für ausgestorben gehaltener Fisch wurde lebend gefunden"], ["It was the first fish seen flying", "Fue el primer pez visto volando", "Er war der erste fliegende Fisch, den man beobachtete"], ["It was the largest fish ever caught", "Fue el pez más grande jamás pescado", "Er war der größte je gefangene Fisch"], ["It could live on land for years", "Podía vivir años en tierra firme", "Er konnte jahrelang an Land leben"]],
  ["medium", ["What does the term “living fossil” mean?", "¿Qué significa la expresión «fósil viviente»?", "Was bedeutet der Begriff „lebendes Fossil“?"],
    ["A species that has changed very little over millions of years", "Una especie que apenas ha cambiado en millones de años", "Eine Art, die sich über Jahrmillionen kaum verändert hat"], ["A fossil that can move", "Un fósil que se puede mover", "Ein Fossil, das sich bewegen kann"], ["An animal that has turned to stone", "Un animal convertido en piedra", "Ein zu Stein gewordenes Tier"], ["A dinosaur kept in a zoo", "Un dinosaurio que vive en un zoo", "Ein Dinosaurier im Zoo"]],
  ["easy", ["Which scientific theory explains that living things change over many generations and share common ancestors?", "¿Qué teoría científica explica que los seres vivos cambian a lo largo de muchas generaciones y tienen antepasados comunes?", "Welche wissenschaftliche Theorie erklärt, dass sich Lebewesen über viele Generationen verändern und gemeinsame Vorfahren haben?"],
    ["The theory of evolution", "La teoría de la evolución", "Die Evolutionstheorie"], ["The theory of relativity", "La teoría de la relatividad", "Die Relativitätstheorie"], ["The Big Bang theory", "La teoría del Big Bang", "Die Urknalltheorie"], ["The theory of gravity", "La teoría de la gravedad", "Die Gravitationstheorie"]],
];

export const ENV_Q: HQ[] = [
  ["easy", ["Which animal is the logo of the conservation organisation WWF?", "¿Qué animal es el logotipo de la organización ecologista WWF?", "Welches Tier ist das Logo der Naturschutzorganisation WWF?"],
    ["Giant panda", "Panda gigante", "Großer Panda"], ["Polar bear", "Oso polar", "Eisbär"], ["Tiger", "Tigre", "Tiger"], ["Elephant", "Elefante", "Elefant"]],
  ["medium", ["Above which continent did scientists discover the “ozone hole” in the 1980s?", "¿Sobre qué continente descubrieron los científicos el «agujero de la capa de ozono» en los años ochenta?", "Über welchem Kontinent entdeckten Forscher in den 1980er-Jahren das „Ozonloch“?"],
    ["Antarctica", "La Antártida", "Antarktika"], ["Africa", "África", "Afrika"], ["Europe", "Europa", "Europa"], ["Asia", "Asia", "Asien"]],
  ["easy", ["Which gas, released by burning coal, oil and natural gas, is the main cause of global warming?", "¿Qué gas, liberado al quemar carbón, petróleo y gas natural, es la principal causa del calentamiento global?", "Welches Gas, das beim Verbrennen von Kohle, Öl und Erdgas entsteht, ist die Hauptursache der Erderwärmung?"],
    ["Carbon dioxide", "Dióxido de carbono", "Kohlenstoffdioxid"], ["Oxygen", "Oxígeno", "Sauerstoff"], ["Helium", "Helio", "Helium"], ["Nitrogen", "Nitrógeno", "Stickstoff"]],
  ["medium", ["What mainly causes “coral bleaching”, when corals turn white?", "¿Qué causa principalmente el «blanqueamiento» de los corales?", "Was verursacht hauptsächlich die „Korallenbleiche“?"],
    ["Sea water that is too warm", "El agua del mar demasiado caliente", "Zu warmes Meerwasser"], ["Too many fish", "Demasiados peces", "Zu viele Fische"], ["Bright moonlight", "La luz intensa de la luna", "Helles Mondlicht"], ["Sharks biting the coral", "Los tiburones que muerden el coral", "Haie, die an den Korallen nagen"]],
  ["easy", ["What does “deforestation” mean?", "¿Qué significa «deforestación»?", "Was bedeutet „Entwaldung“?"],
    ["Cutting down forests on a large scale", "Talar bosques a gran escala", "Das großflächige Abholzen von Wäldern"], ["Planting new trees", "Plantar árboles nuevos", "Das Pflanzen neuer Bäume"], ["Leaves falling in autumn", "La caída de las hojas en otoño", "Der Laubfall im Herbst"], ["Turning deserts into forests", "Convertir desiertos en bosques", "Das Verwandeln von Wüsten in Wälder"]],
  ["easy", ["Which motto is about producing less rubbish?", "¿Qué lema trata de producir menos basura?", "Bei welchem Motto geht es darum, weniger Müll zu erzeugen?"],
    ["Reduce, reuse, recycle", "Reducir, reutilizar, reciclar", "Vermeiden, wiederverwenden, recyceln"], ["Faster, higher, stronger", "Más rápido, más alto, más fuerte", "Schneller, höher, stärker"], ["Liberty, equality, fraternity", "Libertad, igualdad, fraternidad", "Freiheit, Gleichheit, Brüderlichkeit"], ["I came, I saw, I conquered", "Llegué, vi, vencí", "Ich kam, sah und siegte"]],
  ["medium", ["On which date is Earth Day celebrated every year?", "¿Qué día se celebra cada año el Día de la Tierra?", "An welchem Datum wird jedes Jahr der Tag der Erde gefeiert?"],
    ["22 April", "El 22 de abril", "Am 22. April"], ["1 January", "El 1 de enero", "Am 1. Januar"], ["14 February", "El 14 de febrero", "Am 14. Februar"], ["31 October", "El 31 de octubre", "Am 31. Oktober"]],
  ["easy", ["The “Great Pacific Garbage Patch” is a huge area of floating…", "La «gran mancha de basura del Pacífico» es una enorme zona de… flotantes.", "Der „Große Pazifische Müllstrudel“ ist ein riesiges Gebiet mit treibendem…"],
    ["Plastic waste", "Residuos de plástico", "Plastikmüll"], ["Seaweed", "Algas", "Seetang"], ["Ice", "Bloques de hielo", "Eis"], ["Tree trunks", "Troncos de árbol", "Baumstämmen"]],
  ["easy", ["What does “biodegradable” mean?", "¿Qué significa «biodegradable»?", "Was bedeutet „biologisch abbaubar“?"],
    ["It can be broken down naturally by living things such as bacteria", "Lo pueden descomponer de forma natural seres vivos como las bacterias", "Es kann von Lebewesen wie Bakterien auf natürliche Weise zersetzt werden"], ["It can be burnt without smoke", "Se puede quemar sin humo", "Es lässt sich rauchfrei verbrennen"], ["It is made of metal", "Está hecho de metal", "Es besteht aus Metall"], ["It lasts forever", "Dura para siempre", "Es hält ewig"]],
  ["easy", ["What does it mean when an animal species is “endangered”?", "¿Qué significa que una especie animal esté «en peligro de extinción»?", "Was bedeutet es, wenn eine Tierart „vom Aussterben bedroht“ ist?"],
    ["It is at risk of dying out", "Corre el riesgo de desaparecer", "Sie könnte bald ganz verschwinden"], ["It is dangerous to humans", "Es peligrosa para las personas", "Sie ist für Menschen gefährlich"], ["It lives only in zoos", "Solo vive en zoológicos", "Sie lebt nur noch in Zoos"], ["It has just been discovered", "Se acaba de descubrir", "Sie wurde gerade erst entdeckt"]],
  ["medium", ["What mainly causes acid rain?", "¿Qué causa principalmente la lluvia ácida?", "Was verursacht hauptsächlich sauren Regen?"],
    ["Air pollution from burning fuels such as coal", "La contaminación del aire al quemar combustibles como el carbón", "Luftverschmutzung durch das Verbrennen von Brennstoffen wie Kohle"], ["Pollen from lemon trees", "El polen de los limoneros", "Pollen von Zitronenbäumen"], ["Salt from the sea", "La sal del mar", "Salz aus dem Meer"], ["Melting glaciers", "El deshielo de los glaciares", "Schmelzende Gletscher"]],
  ["medium", ["Which international agreement of 2015 aims to limit global warming?", "¿Qué acuerdo internacional de 2015 tiene como objetivo limitar el calentamiento global?", "Welches internationale Abkommen von 2015 soll die Erderwärmung begrenzen?"],
    ["The Paris Agreement", "El Acuerdo de París", "Das Übereinkommen von Paris"], ["The Treaty of Versailles", "El Tratado de Versalles", "Der Vertrag von Versailles"], ["The Geneva Conventions", "Los Convenios de Ginebra", "Die Genfer Konventionen"], ["The Schengen Agreement", "El Acuerdo de Schengen", "Das Schengener Abkommen"]],
  ["hard", ["Which organisation publishes the “Red List” of threatened species?", "¿Qué organización publica la «Lista Roja» de especies amenazadas?", "Welche Organisation veröffentlicht die „Rote Liste“ bedrohter Arten?"],
    ["IUCN", "UICN", "IUCN"], ["UNESCO", "UNESCO", "UNESCO"], ["NASA", "NASA", "NASA"], ["FIFA", "FIFA", "FIFA"]],
];

export const SLEEP_Q: HQ[] = [
  ["medium", ["Which sea mammal can sleep with one half of its brain at a time, so it can keep coming up to breathe?", "¿Qué mamífero marino puede dormir con una sola mitad del cerebro a la vez para seguir subiendo a respirar?", "Welches Meeressäugetier kann mit jeweils einer Gehirnhälfte schlafen, damit es weiter zum Atmen auftauchen kann?"],
    ["Dolphin", "Delfín", "Delfin"], ["Shark", "Tiburón", "Hai"], ["Octopus", "Pulpo", "Krake"], ["Jellyfish", "Medusa", "Qualle"]],
  ["medium", ["About how many hours a day can a koala sleep?", "¿Cuántas horas al día puede dormir un koala?", "Wie viele Stunden am Tag kann ein Koala ungefähr schlafen?"],
    ["Up to about 20 hours", "Hasta unas 20 horas", "Bis zu etwa 20 Stunden"], ["About 2 hours", "Unas 2 horas", "Etwa 2 Stunden"], ["About 8 hours", "Unas 8 horas", "Etwa 8 Stunden"], ["It never sleeps", "Nunca duerme", "Er schläft nie"]],
  ["easy", ["Which animals often hold paws while sleeping on the water so they do not drift apart?", "¿Qué animales se dan a menudo la mano mientras duermen en el agua para no separarse?", "Welche Tiere halten sich beim Schlafen im Wasser oft an den Pfoten, damit sie nicht auseinandertreiben?"],
    ["Sea otters", "Las nutrias marinas", "Seeotter"], ["Penguins", "Los pingüinos", "Pinguine"], ["Dolphins", "Los delfines", "Delfine"], ["Crocodiles", "Los cocodrilos", "Krokodile"]],
  ["easy", ["How do bats usually sleep?", "¿Cómo duermen normalmente los murciélagos?", "Wie schlafen Fledermäuse normalerweise?"],
    ["Hanging upside down", "Colgados boca abajo", "Kopfüber hängend"], ["Standing on one leg", "De pie sobre una pata", "Auf einem Bein stehend"], ["Floating in water", "Flotando en el agua", "Im Wasser treibend"], ["Buried in sand", "Enterrados en la arena", "Im Sand vergraben"]],
  ["easy", ["Which wading bird is famous for resting and sleeping on one leg?", "¿Qué ave zancuda es famosa por descansar y dormir sobre una sola pata?", "Welcher Watvogel ist dafür bekannt, auf einem Bein zu ruhen und zu schlafen?"],
    ["Flamingo", "Flamenco", "Flamingo"], ["Parrot", "Loro", "Papagei"], ["Peacock", "Pavo real", "Pfau"], ["Ostrich", "Avestruz", "Strauß"]],
  ["hard", ["Which bird can stay in the air for up to ten months without landing, even sleeping while flying?", "¿Qué ave puede pasar hasta diez meses en el aire sin posarse, durmiendo incluso mientras vuela?", "Welcher Vogel kann bis zu zehn Monate ohne Landung in der Luft bleiben und schläft sogar im Flug?"],
    ["Common swift", "Vencejo común", "Mauersegler"], ["Pigeon", "Paloma", "Taube"], ["Woodpecker", "Pájaro carpintero", "Specht"], ["Owl", "Búho", "Eule"]],
  ["hard", ["Which reef fish wraps itself in a “sleeping bag” of mucus at night?", "¿Qué pez de arrecife se envuelve por la noche en un «saco de dormir» de mucosidad?", "Welcher Rifffisch hüllt sich nachts in einen „Schlafsack“ aus Schleim?"],
    ["Parrotfish", "Pez loro", "Papageifisch"], ["Shark", "Tiburón", "Hai"], ["Seahorse", "Caballito de mar", "Seepferdchen"], ["Pufferfish", "Pez globo", "Kugelfisch"]],
  ["medium", ["How can horses doze without falling over?", "¿Cómo pueden dormitar los caballos sin caerse?", "Wie können Pferde dösen, ohne umzufallen?"],
    ["Standing up, by locking their legs", "De pie, bloqueando las patas", "Im Stehen, indem sie ihre Beine feststellen"], ["Hanging from branches", "Colgados de las ramas", "An Ästen hängend"], ["Floating in rivers", "Flotando en los ríos", "In Flüssen treibend"], ["Leaning on each other's heads", "Apoyándose en la cabeza de otro caballo", "Indem sie sich an den Kopf eines anderen lehnen"]],
  ["hard", ["Which whales have been seen sleeping upright in groups, floating like logs in the water?", "¿Qué cetáceos han sido vistos durmiendo en grupo en posición vertical, flotando como troncos?", "Welche Wale wurden dabei beobachtet, wie sie in Gruppen senkrecht im Wasser schlafen, wie treibende Baumstämme?"],
    ["Sperm whales", "Los cachalotes", "Pottwale"], ["Manta rays", "Las mantarrayas", "Mantarochen"], ["Swordfish", "Los peces espada", "Schwertfische"], ["Octopuses", "Los pulpos", "Kraken"]],
  ["easy", ["Which great ape builds a new sleeping nest high in the trees almost every night?", "¿Qué gran simio construye casi cada noche un nuevo nido para dormir en lo alto de los árboles?", "Welcher Menschenaffe baut sich fast jede Nacht ein neues Schlafnest hoch oben in den Bäumen?"],
    ["Orangutan", "Orangután", "Orang-Utan"], ["Kangaroo", "Canguro", "Känguru"], ["Zebra", "Cebra", "Zebra"], ["Giraffe", "Jirafa", "Giraffe"]],
  ["easy", ["Why do many desert animals sleep during the hot day and come out at night?", "¿Por qué muchos animales del desierto duermen durante el día caluroso y salen de noche?", "Warum schlafen viele Wüstentiere am heißen Tag und kommen nachts heraus?"],
    ["To avoid the heat and save water", "Para evitar el calor y ahorrar agua", "Um der Hitze auszuweichen und Wasser zu sparen"], ["Because they are blind in daylight", "Porque de día están ciegos", "Weil sie bei Tageslicht blind sind"], ["Because the sand sings during the day", "Porque la arena canta de día", "Weil der Sand tagsüber singt"], ["Because the Moon gives them food", "Porque la Luna les da comida", "Weil der Mond ihnen Nahrung gibt"]],
  ["hard", ["What is “aestivation”?", "¿Qué es la «estivación»?", "Was ist die „Sommerruhe“ (Ästivation)?"],
    ["A summer rest some animals use to survive heat and drought", "Un letargo de verano para sobrevivir al calor y la sequía", "Eine Ruhephase, mit der manche Tiere Hitze und Dürre überstehen"], ["A bird's long journey south", "El largo viaje de un ave hacia el sur", "Die lange Reise eines Vogels nach Süden"], ["Changing skin colour", "El cambio de color de la piel", "Das Wechseln der Hautfarbe"], ["Building a nest in spring", "La construcción de un nido en primavera", "Das Bauen eines Nests im Frühling"]],
];

export const PARENT_Q: HQ[] = [
  ["medium", ["In seahorses, who carries the eggs in a pouch until the babies are born?", "En los caballitos de mar, ¿quién lleva los huevos en una bolsa hasta que nacen las crías?", "Wer trägt bei Seepferdchen die Eier in einer Bruttasche, bis die Jungen schlüpfen?"],
    ["The father", "El padre", "Der Vater"], ["The mother", "La madre", "Die Mutter"], ["An older brother or sister", "Un hermano mayor", "Ein älteres Geschwistertier"], ["Nobody – the eggs float freely", "Nadie: los huevos flotan libres", "Niemand – die Eier treiben frei"]],
  ["medium", ["In emperor penguins, who keeps the egg warm on its feet through the Antarctic winter?", "En los pingüinos emperador, ¿quién mantiene caliente el huevo sobre sus patas durante el invierno antártico?", "Wer hält beim Kaiserpinguin das Ei während des antarktischen Winters auf den Füßen warm?"],
    ["The father", "El padre", "Der Vater"], ["The mother", "La madre", "Die Mutter"], ["A seal", "Una foca", "Eine Robbe"], ["Nobody – it lies on the ice", "Nadie: el huevo queda sobre el hielo", "Niemand – es liegt auf dem Eis"]],
  ["medium", ["Which bird lays its eggs in other birds' nests and lets them raise its chicks?", "¿Qué ave pone sus huevos en nidos ajenos y deja que otras aves críen a sus polluelos?", "Welcher Vogel legt seine Eier in fremde Nester und lässt andere Vögel seine Jungen aufziehen?"],
    ["Cuckoo", "Cuco", "Kuckuck"], ["Swan", "Cisne", "Schwan"], ["Eagle", "Águila", "Adler"], ["Penguin", "Pingüino", "Pinguin"]],
  ["medium", ["How does a mother crocodile often carry her newly hatched babies to the water?", "¿Cómo lleva a menudo la madre cocodrilo a sus crías recién nacidas hasta el agua?", "Wie trägt eine Krokodilmutter ihre frisch geschlüpften Jungen oft ins Wasser?"],
    ["Gently in her mouth", "Con cuidado en la boca", "Vorsichtig im Maul"], ["In a pouch on her belly", "En una bolsa en la tripa", "In einem Beutel am Bauch"], ["Tied to her tail", "Atadas a la cola", "An den Schwanz gebunden"], ["Wrapped in leaves", "Envueltas en hojas", "In Blätter gewickelt"]],
  ["easy", ["Where do sea turtles lay their eggs?", "¿Dónde ponen sus huevos las tortugas marinas?", "Wo legen Meeresschildkröten ihre Eier ab?"],
    ["In holes dug in sandy beaches", "En hoyos que cavan en playas de arena", "In Gruben, die sie in Sandstrände graben"], ["Floating on the open sea", "Flotando en mar abierto", "Treibend auf dem offenen Meer"], ["Inside coral reefs", "Dentro de los arrecifes de coral", "In Korallenriffen"], ["In seabirds' nests", "En nidos de aves marinas", "In Nestern von Seevögeln"]],
  ["medium", ["About how long is an elephant pregnant before her baby is born?", "¿Cuánto dura aproximadamente el embarazo de una elefanta?", "Wie lange ist eine Elefantenkuh ungefähr trächtig?"],
    ["About 22 months", "Unos 22 meses", "Etwa 22 Monate"], ["About 9 months", "Unos 9 meses", "Etwa 9 Monate"], ["About 3 months", "Unos 3 meses", "Etwa 3 Monate"], ["About 5 years", "Unos 5 años", "Etwa 5 Jahre"]],
  ["easy", ["What do all baby mammals drink from their mothers?", "¿Qué beben de su madre todas las crías de mamífero?", "Was trinken alle Säugetierjungen bei ihrer Mutter?"],
    ["Milk", "Leche", "Milch"], ["Nectar", "Néctar", "Nektar"], ["Honey", "Miel", "Honig"], ["Tree sap", "Savia", "Baumsaft"]],
  ["medium", ["What is remarkable about the egg of the kiwi bird?", "¿Qué tiene de especial el huevo del kiwi (el ave)?", "Was ist am Ei des Kiwis (des Vogels) bemerkenswert?"],
    ["It is huge compared with the mother's body", "Es enorme en comparación con el cuerpo de la madre", "Es ist im Verhältnis zum Körper der Mutter riesig"], ["It is laid in water", "Se pone en el agua", "Es wird ins Wasser gelegt"], ["It is laid while flying", "Se pone en pleno vuelo", "Es wird im Flug gelegt"], ["It is bright blue and glows", "Es azul brillante y brilla en la oscuridad", "Es ist leuchtend blau und glüht"]],
  ["easy", ["How does a mother cat usually carry her kittens?", "¿Cómo lleva normalmente una gata a sus gatitos?", "Wie trägt eine Katzenmutter ihre Kätzchen normalerweise?"],
    ["By the scruff of the neck in her mouth", "Por la piel del cuello, con la boca", "Am Nackenfell im Maul"], ["On her back", "Sobre el lomo", "Auf dem Rücken"], ["In a pouch", "En una bolsa", "In einem Beutel"], ["By the tail", "Por la cola", "Am Schwanz"]],
  ["hard", ["Which colourful frogs carry their tadpoles on their backs to small pools of water?", "¿Qué ranas de colores llevan a sus renacuajos a la espalda hasta pequeñas charcas?", "Welche bunten Frösche tragen ihre Kaulquappen auf dem Rücken zu kleinen Wasserstellen?"],
    ["Poison dart frogs", "Las ranas punta de flecha", "Pfeilgiftfrösche"], ["Bullfrogs", "Las ranas toro", "Ochsenfrösche"], ["Cane toads", "Los sapos de caña", "Aga-Kröten"], ["Common frogs", "Las ranas comunes", "Grasfrösche"]],
  ["medium", ["About how many eggs can a honeybee queen lay in a single day in summer?", "¿Cuántos huevos puede poner aproximadamente una abeja reina en un solo día de verano?", "Wie viele Eier kann eine Bienenkönigin im Sommer ungefähr an einem einzigen Tag legen?"],
    ["Over 1,000", "Más de 1000", "Über 1000"], ["About 2", "Unos 2", "Etwa 2"], ["About 20", "Unos 20", "Etwa 20"], ["About a million", "Alrededor de un millón", "Etwa eine Million"]],
];

export const JOURNEY_Q: HQ[] = [
  ["medium", ["Which bird has the longest yearly migration of any animal, flying from the Arctic to Antarctica and back?", "¿Qué ave realiza la migración anual más larga de todos los animales, del Ártico a la Antártida y vuelta?", "Welcher Vogel unternimmt die längste jährliche Wanderung aller Tiere – von der Arktis in die Antarktis und zurück?"],
    ["Arctic tern", "Charrán ártico", "Küstenseeschwalbe"], ["Barn swallow", "Golondrina común", "Rauchschwalbe"], ["White stork", "Cigüeña blanca", "Weißstorch"], ["Mute swan", "Cisne vulgar", "Höckerschwan"]],
  ["medium", ["Monarch butterflies from eastern North America fly thousands of kilometres to spend the winter in the forests of which country?", "Las mariposas monarca del este de Norteamérica vuelan miles de kilómetros para pasar el invierno en los bosques de ¿qué país?", "In den Wäldern welches Landes überwintern die Monarchfalter aus dem Osten Nordamerikas nach einem Flug über Tausende Kilometer?"],
    ["Mexico", "México", "Mexiko"], ["Brazil", "Brasil", "Brasilien"], ["Canada", "Canadá", "Kanada"], ["Argentina", "Argentina", "Argentinien"]],
  ["easy", ["Which animals make up most of the “Great Migration” between the Serengeti and the Masai Mara?", "¿Qué animales forman la mayor parte de la «Gran Migración» entre el Serengeti y la Masái Mara?", "Welche Tiere machen den größten Teil der „Großen Tierwanderung“ zwischen Serengeti und Masai Mara aus?"],
    ["Wildebeest", "Ñus", "Gnus"], ["Elephants", "Elefantes", "Elefanten"], ["Giraffes", "Jirafas", "Giraffen"], ["Rhinos", "Rinocerontes", "Nashörner"]],
  ["easy", ["What do salmon famously do when it is time to lay their eggs?", "¿Qué hacen los salmones, de forma famosa, cuando llega el momento de poner sus huevos?", "Was tun Lachse bekanntlich, wenn es Zeit zum Laichen ist?"],
    ["Swim upriver to the stream where they hatched", "Remontan el río hasta el arroyo donde nacieron", "Sie schwimmen flussaufwärts zu dem Bach, in dem sie geschlüpft sind"], ["Bury their eggs on sandy beaches", "Entierran los huevos en playas de arena", "Sie vergraben ihre Eier an Sandstränden"], ["Swim to the deepest part of the ocean", "Nadan a la parte más profunda del océano", "Sie schwimmen in den tiefsten Teil des Ozeans"], ["Lay their eggs in trees", "Ponen los huevos en los árboles", "Sie legen ihre Eier auf Bäume"]],
  ["hard", ["European eels cross the Atlantic to breed in which sea?", "Las anguilas europeas cruzan el Atlántico para reproducirse en ¿qué mar?", "In welchem Meer laichen die Europäischen Aale, nachdem sie den Atlantik überquert haben?"],
    ["The Sargasso Sea", "El mar de los Sargazos", "In der Sargassosee"], ["The Mediterranean Sea", "El mar Mediterráneo", "Im Mittelmeer"], ["The Black Sea", "El mar Negro", "Im Schwarzen Meer"], ["The Baltic Sea", "El mar Báltico", "In der Ostsee"]],
  ["hard", ["On which island do tens of millions of red crabs march from the forest to the sea every year?", "¿En qué isla decenas de millones de cangrejos rojos marchan cada año del bosque al mar?", "Auf welcher Insel wandern jedes Jahr zig Millionen Rote Landkrabben vom Wald zum Meer?"],
    ["Christmas Island", "La isla de Navidad", "Auf der Weihnachtsinsel"], ["Easter Island", "La isla de Pascua", "Auf der Osterinsel"], ["Iceland", "Islandia", "Auf Island"], ["Sicily", "Sicilia", "Auf Sizilien"]],
  ["hard", ["Grey whales make one of the longest migrations of any mammal along the coast of which continent?", "Las ballenas grises realizan una de las migraciones más largas de los mamíferos a lo largo de la costa de ¿qué continente?", "Entlang der Küste welches Kontinents unternehmen Grauwale eine der längsten Wanderungen aller Säugetiere?"],
    ["North America", "América del Norte", "Nordamerika"], ["Africa", "África", "Afrika"], ["Europe", "Europa", "Europa"], ["Australia", "Australia", "Australien"]],
  ["medium", ["Which animals migrate in huge herds across the Arctic tundra of Alaska and Canada?", "¿Qué animales migran en enormes manadas por la tundra ártica de Alaska y Canadá?", "Welche Tiere ziehen in riesigen Herden durch die arktische Tundra Alaskas und Kanadas?"],
    ["Caribou (reindeer)", "Caribúes (renos)", "Karibus (Rentiere)"], ["Moose", "Alces", "Elche"], ["Polar bears", "Osos polares", "Eisbären"], ["Wolverines", "Glotones", "Vielfraße"]],
  ["easy", ["How do many migrating birds find their way?", "¿Cómo se orientan muchas aves migratorias?", "Wie finden viele Zugvögel ihren Weg?"],
    ["Using the Sun, the stars and Earth's magnetic field", "Con el Sol, las estrellas y el campo magnético de la Tierra", "Mithilfe von Sonne, Sternen und Erdmagnetfeld"], ["By following ships", "Siguiendo a los barcos", "Indem sie Schiffen folgen"], ["Only by smell", "Solo por el olfato", "Nur über den Geruch"], ["By following aeroplanes", "Siguiendo a los aviones", "Indem sie Flugzeugen folgen"]],
  ["easy", ["What do we call it when animals travel long distances every year with the seasons?", "¿Cómo se llama el hecho de que los animales recorran grandes distancias cada año según las estaciones?", "Wie nennt man es, wenn Tiere jedes Jahr mit den Jahreszeiten weite Strecken zurücklegen?"],
    ["Migration", "Migración", "Tierwanderung (Migration)"], ["Hibernation", "Hibernación", "Winterschlaf"], ["Pollination", "Polinización", "Bestäubung"], ["Metamorphosis", "Metamorfosis", "Metamorphose"]],
  ["easy", ["Why do many birds in the northern hemisphere fly south in autumn?", "¿Por qué muchas aves del hemisferio norte vuelan hacia el sur en otoño?", "Warum fliegen viele Vögel der Nordhalbkugel im Herbst nach Süden?"],
    ["To find food and warmer weather", "Para encontrar comida y un clima más cálido", "Um Nahrung und wärmeres Wetter zu finden"], ["To lay eggs in the snow", "Para poner huevos en la nieve", "Um Eier in den Schnee zu legen"], ["To escape the long days", "Para escapar de los días largos", "Um den langen Tagen zu entkommen"], ["To shed their feathers", "Para perder las plumas", "Um ihre Federn abzuwerfen"]],
];

export const INSECT_Q: HQ[] = [
  ["easy", ["How many main body parts does an insect have?", "¿Cuántas partes principales tiene el cuerpo de un insecto?", "Aus wie vielen Hauptteilen besteht der Körper eines Insekts?"],
    ["3", "3", "3"], ["2", "2", "2"], ["4", "4", "4"], ["8", "8", "8"]],
  ["medium", ["Which mosquitoes bite people and animals to drink blood?", "¿Qué mosquitos pican a personas y animales para chupar sangre?", "Welche Stechmücken stechen Menschen und Tiere, um Blut zu saugen?"],
    ["Only the females", "Solo las hembras", "Nur die Weibchen"], ["Only the males", "Solo los machos", "Nur die Männchen"], ["Both males and females", "Machos y hembras", "Männchen und Weibchen"], ["Only the larvae", "Solo las larvas", "Nur die Larven"]],
  ["easy", ["What do honeybees make honey from?", "¿A partir de qué fabrican la miel las abejas?", "Woraus stellen Honigbienen Honig her?"],
    ["Flower nectar", "Néctar de las flores", "Blütennektar"], ["Leaves", "Hojas", "Blättern"], ["Rainwater", "Agua de lluvia", "Regenwasser"], ["Tree bark", "Corteza de árbol", "Baumrinde"]],
  ["medium", ["Dragonflies are ancient insects. When did their earliest relatives first appear?", "Las libélulas son insectos muy antiguos. ¿Cuándo aparecieron sus primeros parientes?", "Libellen sind uralte Insekten. Wann tauchten ihre ersten Verwandten auf?"],
    ["Before the dinosaurs", "Antes que los dinosaurios", "Vor den Dinosauriern"], ["After the dinosaurs died out", "Después de que se extinguieran los dinosaurios", "Nach dem Aussterben der Dinosaurier"], ["About 10,000 years ago", "Hace unos 10 000 años", "Vor etwa 10.000 Jahren"], ["At the same time as the first humans", "A la vez que los primeros humanos", "Zur gleichen Zeit wie die ersten Menschen"]],
  ["hard", ["Some North American cicadas live underground for how many years before they all come out together?", "Algunas cigarras de Norteamérica viven bajo tierra ¿cuántos años antes de salir todas a la vez?", "Wie viele Jahre leben manche nordamerikanischen Zikaden unter der Erde, bevor sie alle gemeinsam herauskommen?"],
    ["17", "17", "17"], ["1", "1", "1"], ["3", "3", "3"], ["50", "50", "50"]],
  ["medium", ["What do ladybirds mostly eat, which makes gardeners love them?", "¿Qué comen sobre todo las mariquitas, lo que las hace tan queridas por los jardineros?", "Was fressen Marienkäfer vor allem, weshalb Gärtner sie so mögen?"],
    ["Aphids", "Pulgones", "Blattläuse"], ["Rose petals", "Pétalos de rosa", "Rosenblätter"], ["Tomatoes", "Tomates", "Tomaten"], ["Wood", "Madera", "Holz"]],
  ["easy", ["What is a stick insect's best defence?", "¿Cuál es la mejor defensa del insecto palo?", "Was ist die beste Verteidigung einer Stabschrecke?"],
    ["Looking just like a twig", "Parecerse a una ramita", "Sie sieht aus wie ein Zweig"], ["A painful sting", "Una picadura dolorosa", "Ein schmerzhafter Stich"], ["Running very fast", "Correr muy deprisa", "Sehr schnelles Laufen"], ["A loud roar", "Un fuerte rugido", "Ein lautes Brüllen"]],
  ["easy", ["Which beetle rolls balls of animal dung and pushes them along the ground?", "¿Qué escarabajo hace bolas con excrementos de animales y las empuja por el suelo?", "Welcher Käfer formt Kugeln aus Tierkot und rollt sie über den Boden?"],
    ["Dung beetle", "Escarabajo pelotero", "Pillendreher"], ["Ladybird", "Mariquita", "Marienkäfer"], ["Stag beetle", "Ciervo volante", "Hirschkäfer"], ["Firefly", "Luciérnaga", "Glühwürmchen"]],
  ["medium", ["Which butterfly tastes bad to birds because its caterpillars eat poisonous milkweed?", "¿Qué mariposa resulta desagradable para las aves porque sus orugas comen algodoncillo venenoso?", "Welcher Schmetterling schmeckt Vögeln schlecht, weil seine Raupen giftige Seidenpflanzen fressen?"],
    ["Monarch butterfly", "Mariposa monarca", "Monarchfalter"], ["Cabbage white", "Mariposa de la col", "Kohlweißling"], ["Peacock butterfly", "Pavo real diurno", "Tagpfauenauge"], ["Brimstone", "Limonera", "Zitronenfalter"]],
  ["medium", ["How do insects breathe?", "¿Cómo respiran los insectos?", "Wie atmen Insekten?"],
    ["Through tiny holes along their body", "Por pequeños orificios a lo largo del cuerpo", "Durch winzige Öffnungen am Körper"], ["Through lungs like ours", "Con pulmones como los nuestros", "Mit Lungen wie wir"], ["Through gills", "Por branquias", "Mit Kiemen"], ["They do not need air", "No necesitan aire", "Sie brauchen keine Luft"]],
  ["medium", ["How many wings do most adult insects have?", "¿Cuántas alas tienen la mayoría de los insectos adultos?", "Wie viele Flügel haben die meisten erwachsenen Insekten?"],
    ["4", "4", "4"], ["1", "1", "1"], ["6", "6", "6"], ["8", "8", "8"]],
  ["easy", ["What does the silkworm make to wrap itself in before it turns into a moth?", "¿Qué fabrica el gusano de seda para envolverse antes de convertirse en polilla?", "Was stellt die Seidenraupe her, um sich einzuhüllen, bevor sie zum Falter wird?"],
    ["A cocoon of silk thread", "Un capullo de hilo de seda", "Einen Kokon aus Seidenfaden"], ["A nest of wax", "Un nido de cera", "Ein Nest aus Wachs"], ["A paper house", "Una casa de papel", "Ein Haus aus Papier"], ["A shell of sand", "Una concha de arena", "Eine Hülle aus Sand"]],
  ["easy", ["What do honeybees use beeswax for?", "¿Para qué usan la cera las abejas?", "Wofür verwenden Honigbienen Bienenwachs?"],
    ["To build the honeycomb cells", "Para construir las celdas del panal", "Zum Bau der Wabenzellen"], ["To polish their wings", "Para pulir sus alas", "Zum Polieren ihrer Flügel"], ["To catch flies", "Para atrapar moscas", "Zum Fangen von Fliegen"], ["To light the hive", "Para iluminar la colmena", "Zum Beleuchten des Stocks"]],
];

export const HERP_Q: HQ[] = [
  ["medium", ["Why can geckos run up walls and even across ceilings?", "¿Por qué los gecos pueden subir por las paredes e incluso andar por el techo?", "Warum können Geckos Wände hinauflaufen und sogar an der Decke entlanglaufen?"],
    ["Millions of tiny hairs on their toes", "Millones de pelillos diminutos en los dedos", "Millionen winziger Härchen an ihren Zehen"], ["Sticky glue from their mouth", "Un pegamento que sale de su boca", "Klebstoff aus ihrem Maul"], ["Suction cups on their tail", "Ventosas en la cola", "Saugnäpfe am Schwanz"], ["Magnets in their feet", "Imanes en las patas", "Magnete in den Füßen"]],
  ["easy", ["What do snakes do from time to time as they grow?", "¿Qué hacen las serpientes de vez en cuando a medida que crecen?", "Was tun Schlangen von Zeit zu Zeit, während sie wachsen?"],
    ["Shed their whole skin", "Mudan toda la piel", "Sie häuten sich vollständig"], ["Grow new legs", "Les crecen patas nuevas", "Ihnen wachsen neue Beine"], ["Change into lizards", "Se convierten en lagartos", "Sie verwandeln sich in Eidechsen"], ["Lose all their teeth", "Pierden todos los dientes", "Sie verlieren alle Zähne"]],
  ["medium", ["In many turtles and crocodiles, what decides whether the babies become male or female?", "En muchas tortugas y cocodrilos, ¿qué decide si las crías serán machos o hembras?", "Was entscheidet bei vielen Schildkröten und Krokodilen, ob die Jungen männlich oder weiblich werden?"],
    ["The temperature of the nest", "La temperatura del nido", "Die Temperatur des Nests"], ["The phase of the Moon", "La fase de la Luna", "Die Mondphase"], ["The colour of the egg", "El color del huevo", "Die Farbe des Eis"], ["The number of eggs", "El número de huevos", "Die Anzahl der Eier"]],
  ["medium", ["Which amphibian from Mexico can regrow lost legs and even parts of its heart?", "¿Qué anfibio de México puede regenerar patas perdidas e incluso partes de su corazón?", "Welche Amphibie aus Mexiko kann verlorene Beine und sogar Teile ihres Herzens nachwachsen lassen?"],
    ["Axolotl", "Ajolote", "Axolotl"], ["Cane toad", "Sapo de caña", "Aga-Kröte"], ["Bullfrog", "Rana toro", "Ochsenfrosch"], ["Fire salamander", "Salamandra común", "Feuersalamander"]],
  ["medium", ["How do frogs mainly take in water?", "¿Cómo absorben principalmente el agua las ranas?", "Wie nehmen Frösche hauptsächlich Wasser auf?"],
    ["Through their skin", "A través de la piel", "Über ihre Haut"], ["By lapping it with their tongue", "Lamiéndola con la lengua", "Indem sie es mit der Zunge auflecken"], ["Through their nose", "Por la nariz", "Durch die Nase"], ["They never need water", "Nunca necesitan agua", "Sie brauchen nie Wasser"]],
  ["easy", ["What do the bright colours of a poison dart frog warn other animals about?", "¿De qué advierten a otros animales los colores vivos de la rana punta de flecha?", "Wovor warnen die leuchtenden Farben eines Pfeilgiftfroschs andere Tiere?"],
    ["That it is poisonous", "De que es venenosa", "Dass er giftig ist"], ["That it is about to jump", "De que va a saltar", "Dass er gleich springt"], ["That it is very fast", "De que es muy rápida", "Dass er sehr schnell ist"], ["That it is still a baby", "De que todavía es una cría", "Dass er noch ein Jungtier ist"]],
  ["medium", ["What is special about a chameleon's eyes?", "¿Qué tienen de especial los ojos del camaleón?", "Was ist das Besondere an den Augen eines Chamäleons?"],
    ["Each eye can move on its own", "Cada ojo se mueve por separado", "Jedes Auge kann sich unabhängig bewegen"], ["They glow in the dark", "Brillan en la oscuridad", "Sie leuchten im Dunkeln"], ["It has four of them", "Tiene cuatro", "Es hat vier davon"], ["They are on its tail", "Están en la cola", "Sie sitzen am Schwanz"]],
  ["medium", ["How can snakes swallow animals bigger than their own head?", "¿Cómo pueden las serpientes tragarse animales más grandes que su cabeza?", "Wie können Schlangen Tiere verschlucken, die größer als ihr Kopf sind?"],
    ["Their jaws are loosely joined and stretch very wide", "Sus mandíbulas están unidas de forma flexible y se abren muchísimo", "Ihre Kiefer sind locker verbunden und lassen sich sehr weit dehnen"], ["They chew them first", "Primero los mastican", "Sie kauen sie vorher"], ["They cut them up with their tail", "Los cortan con la cola", "Sie zerteilen sie mit dem Schwanz"], ["They shrink them with their breath", "Los encogen con su aliento", "Sie schrumpfen sie mit ihrem Atem"]],
  ["easy", ["What is the main difference between a tortoise and a sea turtle?", "¿Cuál es la principal diferencia entre una tortuga terrestre y una tortuga marina?", "Was ist der Hauptunterschied zwischen einer Landschildkröte und einer Meeresschildkröte?"],
    ["Tortoises live on land, sea turtles in the sea", "La terrestre vive en tierra y la marina, en el mar", "Landschildkröten leben an Land, Meeresschildkröten im Meer"], ["Tortoises can fly", "La terrestre puede volar", "Landschildkröten können fliegen"], ["Sea turtles have no shell", "La marina no tiene caparazón", "Meeresschildkröten haben keinen Panzer"], ["Tortoises are amphibians", "La terrestre es un anfibio", "Landschildkröten sind Amphibien"]],
  ["hard", ["Which reptile from New Zealand has a hidden “third eye” on top of its head?", "¿Qué reptil de Nueva Zelanda tiene un «tercer ojo» oculto en lo alto de la cabeza?", "Welches Reptil aus Neuseeland hat ein verborgenes „drittes Auge“ oben auf dem Kopf?"],
    ["Tuatara", "Tuátara", "Brückenechse"], ["Komodo dragon", "Dragón de Komodo", "Komodowaran"], ["Iguana", "Iguana", "Leguan"], ["Chameleon", "Camaleón", "Chamäleon"]],
  ["medium", ["Which lizard can run across the surface of water on its back legs?", "¿Qué lagarto puede correr sobre la superficie del agua con las patas traseras?", "Welche Echse kann auf den Hinterbeinen über die Wasseroberfläche laufen?"],
    ["Basilisk", "Basilisco", "Basilisk"], ["Komodo dragon", "Dragón de Komodo", "Komodowaran"], ["Chameleon", "Camaleón", "Chamäleon"], ["Thorny devil", "Diablo espinoso", "Dornteufel"]],
  ["medium", ["What do toads usually have that most frogs do not?", "¿Qué suelen tener los sapos que la mayoría de las ranas no tiene?", "Was haben Kröten meist, was die meisten Frösche nicht haben?"],
    ["Dry, bumpy skin", "Piel seca y rugosa", "Trockene, warzige Haut"], ["Feathers", "Plumas", "Federn"], ["A hard shell", "Un caparazón duro", "Einen harten Panzer"], ["Gills as adults", "Branquias de adultos", "Kiemen als Erwachsene"]],
];

export const OCEAN_Q: HQ[] = [
  ["medium", ["What is the deepest known place in the oceans?", "¿Cuál es el lugar más profundo conocido de los océanos?", "Welches ist die tiefste bekannte Stelle der Ozeane?"],
    ["The Mariana Trench", "La fosa de las Marianas", "Der Marianengraben"], ["The Bermuda Triangle", "El triángulo de las Bermudas", "Das Bermudadreieck"], ["The Red Sea", "El mar Rojo", "Das Rote Meer"], ["The North Sea", "El mar del Norte", "Die Nordsee"]],
  ["medium", ["How many hearts does an octopus have?", "¿Cuántos corazones tiene un pulpo?", "Wie viele Herzen hat ein Krake?"],
    ["3", "3", "3"], ["1", "1", "1"], ["2", "2", "2"], ["8", "8", "8"]],
  ["hard", ["What colour is an octopus's blood?", "¿De qué color es la sangre de un pulpo?", "Welche Farbe hat das Blut eines Kraken?"],
    ["Blue", "Azul", "Blau"], ["Red", "Roja", "Rot"], ["Green", "Verde", "Grün"], ["Black", "Negra", "Schwarz"]],
  ["medium", ["The narwhal's long “tusk” is actually a…", "El largo «cuerno» del narval es en realidad un…", "Der lange „Stoßzahn“ des Narwals ist eigentlich ein…"],
    ["Tooth", "Diente", "Zahn"], ["Horn", "Cuerno", "Horn"], ["Nose", "Hocico", "Nasenfortsatz"], ["Fin", "Aleta", "Flossenstrahl"]],
  ["medium", ["The orca (killer whale) is actually the largest member of which family?", "La orca es en realidad el miembro más grande de ¿qué familia?", "Der Schwertwal (Orca) ist eigentlich das größte Mitglied welcher Familie?"],
    ["Dolphins", "Los delfines", "Delfine"], ["Sharks", "Los tiburones", "Haie"], ["Seals", "Las focas", "Robben"], ["Baleen whales", "Las ballenas barbadas", "Bartenwale"]],
  ["medium", ["Which whales are famous for their long, complex “songs”?", "¿Qué ballenas son famosas por sus largos y complejos «cantos»?", "Welche Wale sind für ihre langen, komplexen „Gesänge“ berühmt?"],
    ["Humpback whales", "Las ballenas jorobadas", "Buckelwale"], ["Sperm whales", "Los cachalotes", "Pottwale"], ["Narwhals", "Los narvales", "Narwale"], ["Pilot whales", "Los calderones", "Grindwale"]],
  ["easy", ["What happens when a shark loses a tooth?", "¿Qué ocurre cuando un tiburón pierde un diente?", "Was passiert, wenn ein Hai einen Zahn verliert?"],
    ["A new tooth moves forward to replace it", "Un diente nuevo avanza para sustituirlo", "Ein neuer Zahn rückt nach und ersetzt ihn"], ["It can no longer eat", "Ya no puede comer", "Er kann nicht mehr fressen"], ["It grows back after ten years", "Le vuelve a crecer a los diez años", "Er wächst nach zehn Jahren nach"], ["The shark swallows it to grow", "El tiburón se lo traga para crecer", "Der Hai verschluckt ihn, um zu wachsen"]],
  ["medium", ["Which of these do jellyfish NOT have?", "¿Cuál de estas cosas NO tienen las medusas?", "Was davon haben Quallen NICHT?"],
    ["A brain", "Cerebro", "Ein Gehirn"], ["Tentacles", "Tentáculos", "Tentakel"], ["A mouth", "Boca", "Einen Mund"], ["Stinging cells", "Células urticantes", "Nesselzellen"]],
  ["easy", ["Which sea mammal uses a stone as a tool to crack open shellfish?", "¿Qué mamífero marino usa una piedra como herramienta para abrir el marisco?", "Welches Meeressäugetier benutzt einen Stein als Werkzeug, um Muscheln zu knacken?"],
    ["Sea otter", "Nutria marina", "Seeotter"], ["Walrus", "Morsa", "Walross"], ["Manatee", "Manatí", "Seekuh"], ["Seal", "Foca", "Robbe"]],
  ["easy", ["What is the largest animal that has ever lived on Earth, bigger than any dinosaur?", "¿Cuál es el animal más grande que ha existido jamás en la Tierra, mayor que cualquier dinosaurio?", "Welches ist das größte Tier, das je auf der Erde gelebt hat – größer als jeder Dinosaurier?"],
    ["Blue whale", "Ballena azul", "Blauwal"], ["Megalodon", "Megalodón", "Megalodon"], ["African elephant", "Elefante africano", "Afrikanischer Elefant"], ["Whale shark", "Tiburón ballena", "Walhai"]],
  ["easy", ["About how much of the Earth's surface is covered by oceans?", "¿Qué parte de la superficie terrestre cubren aproximadamente los océanos?", "Wie viel der Erdoberfläche ist ungefähr von Ozeanen bedeckt?"],
    ["About 70 %", "Alrededor del 70 %", "Etwa 70 %"], ["About 30 %", "Alrededor del 30 %", "Etwa 30 %"], ["About 50 %", "Alrededor del 50 %", "Etwa 50 %"], ["About 95 %", "Alrededor del 95 %", "Etwa 95 %"]],
  ["medium", ["Why is sea water salty?", "¿Por qué es salada el agua del mar?", "Warum ist Meerwasser salzig?"],
    ["Rivers carry dissolved salts from rocks into the sea", "Los ríos llevan al mar sales disueltas de las rocas", "Flüsse tragen gelöste Salze aus Gestein ins Meer"], ["Fish produce salt", "Los peces producen sal", "Fische produzieren Salz"], ["Salt falls with the rain from space", "La sal cae del espacio con la lluvia", "Salz fällt mit dem Regen aus dem All"], ["Ships have spilled it over centuries", "Los barcos la han derramado durante siglos", "Schiffe haben es über Jahrhunderte verschüttet"]],
  ["easy", ["What are the tiny plants and animals that drift in the sea called?", "¿Cómo se llaman las diminutas plantas y animales que flotan a la deriva en el mar?", "Wie heißen die winzigen Pflanzen und Tiere, die im Meer treiben?"],
    ["Plankton", "Plancton", "Plankton"], ["Coral", "Coral", "Korallen"], ["Sponges", "Esponjas", "Schwämme"], ["Anemones", "Anémonas", "Anemonen"]],
  ["medium", ["Which shark is the largest predatory fish in the sea?", "¿Qué tiburón es el pez depredador más grande del mar?", "Welcher Hai ist der größte Raubfisch im Meer?"],
    ["Great white shark", "Gran tiburón blanco", "Weißer Hai"], ["Hammerhead shark", "Tiburón martillo", "Hammerhai"], ["Tiger shark", "Tiburón tigre", "Tigerhai"], ["Bull shark", "Tiburón toro", "Bullenhai"]],
];

export const BIRD_Q: HQ[] = [
  ["easy", ["Which bird can fly backwards?", "¿Qué ave puede volar hacia atrás?", "Welcher Vogel kann rückwärts fliegen?"],
    ["Hummingbird", "Colibrí", "Kolibri"], ["Swallow", "Golondrina", "Schwalbe"], ["Owl", "Búho", "Eule"], ["Eagle", "Águila", "Adler"]],
  ["medium", ["Which bird has the largest wingspan of any living bird (up to about 3.5 m)?", "¿Qué ave tiene la mayor envergadura de todas las aves vivas (hasta unos 3,5 m)?", "Welcher Vogel hat die größte Flügelspannweite aller lebenden Vögel (bis etwa 3,5 m)?"],
    ["Wandering albatross", "Albatros viajero", "Wanderalbatros"], ["Andean condor", "Cóndor andino", "Andenkondor"], ["Bald eagle", "Águila calva", "Weißkopfseeadler"], ["White stork", "Cigüeña blanca", "Weißstorch"]],
  ["easy", ["Which bird lays the largest eggs of any living bird?", "¿Qué ave pone los huevos más grandes de todas las aves actuales?", "Welcher Vogel legt die größten Eier aller heute lebenden Vögel?"],
    ["Ostrich", "Avestruz", "Strauß"], ["Emu", "Emú", "Emu"], ["Swan", "Cisne", "Schwan"], ["Eagle", "Águila", "Adler"]],
  ["medium", ["Why can owls fly almost silently?", "¿Por qué los búhos pueden volar casi en silencio?", "Warum können Eulen fast lautlos fliegen?"],
    ["Their soft feathers have fringed edges", "Sus plumas suaves tienen los bordes deshilachados", "Ihre weichen Federn haben ausgefranste Ränder"], ["They hold their breath", "Contienen la respiración", "Sie halten die Luft an"], ["They only fly in the rain", "Solo vuelan cuando llueve", "Sie fliegen nur bei Regen"], ["They have no feathers on their wings", "No tienen plumas en las alas", "Sie haben keine Federn an den Flügeln"]],
  ["hard", ["Which Australian bird can copy almost any sound, even camera shutters and chainsaws?", "¿Qué ave australiana puede imitar casi cualquier sonido, incluso cámaras de fotos y motosierras?", "Welcher australische Vogel kann fast jedes Geräusch nachahmen, sogar Kameraverschlüsse und Kettensägen?"],
    ["Lyrebird", "Ave lira", "Leierschwanz"], ["Kookaburra", "Cucaburra", "Kookaburra (Lachender Hans)"], ["Emu", "Emú", "Emu"], ["Cassowary", "Casuario", "Kasuar"]],
  ["medium", ["Which Australian bird is famous for its call that sounds like loud laughter?", "¿Qué ave australiana es famosa por un canto que suena como una carcajada?", "Welcher australische Vogel ist für seinen Ruf bekannt, der wie lautes Lachen klingt?"],
    ["Kookaburra", "Cucaburra", "Kookaburra (Lachender Hans)"], ["Emu", "Emú", "Emu"], ["Cassowary", "Casuario", "Kasuar"], ["Pelican", "Pelícano", "Pelikan"]],
  ["hard", ["Which mountain parrot from New Zealand is famous for being very curious and playful?", "¿Qué loro de montaña de Nueva Zelanda es famoso por ser muy curioso y juguetón?", "Welcher Bergpapagei aus Neuseeland ist dafür bekannt, sehr neugierig und verspielt zu sein?"],
    ["Kea", "Kea", "Kea"], ["Scarlet macaw", "Guacamayo rojo", "Hellroter Ara"], ["Budgerigar", "Periquito", "Wellensittich"], ["African grey parrot", "Loro gris africano", "Graupapagei"]],
  ["medium", ["How many toes do most birds have on each foot?", "¿Cuántos dedos tienen la mayoría de las aves en cada pata?", "Wie viele Zehen haben die meisten Vögel an jedem Fuß?"],
    ["4", "4", "4"], ["2", "2", "2"], ["5", "5", "5"], ["6", "6", "6"]],
  ["easy", ["Why do woodpeckers hammer at tree trunks?", "¿Por qué los pájaros carpinteros golpean los troncos de los árboles?", "Warum hämmern Spechte an Baumstämme?"],
    ["To find insects and make nest holes", "Para encontrar insectos y hacer huecos para el nido", "Um Insekten zu finden und Bruthöhlen zu bauen"], ["To eat the wood", "Para comerse la madera", "Um das Holz zu fressen"], ["To call the rain", "Para llamar a la lluvia", "Um den Regen herbeizurufen"], ["To scare away the wind", "Para espantar al viento", "Um den Wind zu vertreiben"]],
  ["hard", ["Which bird has a beak longer than the rest of its body?", "¿Qué ave tiene un pico más largo que el resto de su cuerpo?", "Welcher Vogel hat einen Schnabel, der länger ist als sein übriger Körper?"],
    ["Sword-billed hummingbird", "Colibrí pico espada", "Schwertschnabelkolibri"], ["Toucan", "Tucán", "Tukan"], ["Pelican", "Pelícano", "Pelikan"], ["White stork", "Cigüeña blanca", "Weißstorch"]],
  ["easy", ["What do penguins use their wings for?", "¿Para qué usan las alas los pingüinos?", "Wofür benutzen Pinguine ihre Flügel?"],
    ["Swimming underwater", "Para nadar bajo el agua", "Zum Schwimmen unter Wasser"], ["Flying long distances", "Para volar largas distancias", "Zum Fliegen über weite Strecken"], ["Digging burrows", "Para cavar madrigueras", "Zum Graben von Höhlen"], ["Climbing trees", "Para trepar a los árboles", "Zum Klettern auf Bäume"]],
  ["medium", ["How do flamingos feed?", "¿Cómo se alimentan los flamencos?", "Wie fressen Flamingos?"],
    ["With their head upside down, filtering water through their beak", "Con la cabeza boca abajo, filtrando el agua con el pico", "Mit dem Kopf nach unten, indem sie Wasser durch den Schnabel filtern"], ["By diving deep for fish", "Zambulléndose a gran profundidad para pescar", "Indem sie tief nach Fischen tauchen"], ["By picking fruit from trees", "Cogiendo fruta de los árboles", "Indem sie Früchte von Bäumen pflücken"], ["By catching insects in flight", "Cazando insectos al vuelo", "Indem sie Insekten im Flug fangen"]],
];

export const PLANT_USE_Q: HQ[] = [
  ["medium", ["Which country produces about half of the world's cork?", "¿Qué país produce aproximadamente la mitad del corcho del mundo?", "Welches Land produziert etwa die Hälfte des weltweiten Korks?"],
    ["Portugal", "Portugal", "Portugal"], ["Brazil", "Brasil", "Brasilien"], ["Canada", "Canadá", "Kanada"], ["Norway", "Noruega", "Norwegen"]],
  ["medium", ["Aspirin was first developed from a substance found in the bark of which tree?", "La aspirina se desarrolló a partir de una sustancia de la corteza de ¿qué árbol?", "Aspirin wurde ursprünglich aus einem Stoff aus der Rinde welches Baumes entwickelt?"],
    ["Willow", "Sauce", "Weide"], ["Oak", "Roble", "Eiche"], ["Pine", "Pino", "Kiefer"], ["Birch", "Abedul", "Birke"]],
  ["hard", ["Quinine, an old medicine against malaria, comes from the bark of which tree?", "La quinina, un antiguo medicamento contra la malaria, procede de la corteza de ¿qué árbol?", "Chinin, ein altes Mittel gegen Malaria, stammt aus der Rinde welches Baumes?"],
    ["Cinchona tree", "Quino", "Chinarindenbaum"], ["Eucalyptus", "Eucalipto", "Eukalyptus"], ["Cork oak", "Alcornoque", "Korkeiche"], ["Baobab", "Baobab", "Affenbrotbaum"]],
  ["easy", ["The ancient Egyptians made a kind of paper from which plant?", "¿Con qué planta fabricaban los antiguos egipcios una especie de papel?", "Aus welcher Pflanze stellten die alten Ägypter eine Art Papier her?"],
    ["Papyrus", "Papiro", "Papyrus"], ["Bamboo", "Bambú", "Bambus"], ["Cotton", "Algodón", "Baumwolle"], ["Lotus", "Loto", "Lotos"]],
  ["easy", ["Which plant's fluffy seed fibres are spun into thread for jeans and T-shirts?", "¿De qué planta se hilan las fibras esponjosas de sus semillas para hacer vaqueros y camisetas?", "Die flauschigen Samenfasern welcher Pflanze werden zu Garn für Jeans und T-Shirts gesponnen?"],
    ["Cotton", "Algodón", "Baumwolle"], ["Sunflower", "Girasol", "Sonnenblume"], ["Oak", "Roble", "Eiche"], ["Tulip", "Tulipán", "Tulpe"]],
  ["medium", ["Natural rubber is made from the milky sap of a tree that originally comes from which region?", "El caucho natural se fabrica con la savia lechosa de un árbol originario de ¿qué región?", "Naturkautschuk wird aus dem Milchsaft eines Baumes gewonnen, der ursprünglich aus welcher Region stammt?"],
    ["The Amazon rainforest", "La selva amazónica", "Dem Amazonas-Regenwald"], ["The Sahara", "El Sáhara", "Der Sahara"], ["Siberia", "Siberia", "Sibirien"], ["The Arctic", "El Ártico", "Der Arktis"]],
  ["medium", ["Which plant gives the blue dye traditionally used to colour jeans?", "¿Qué planta da el tinte azul que se usaba tradicionalmente para teñir los vaqueros?", "Welche Pflanze liefert den blauen Farbstoff, mit dem Jeans traditionell gefärbt werden?"],
    ["Indigo", "Añil (índigo)", "Indigo"], ["Saffron crocus", "Azafrán", "Safran-Krokus"], ["Henna", "Alheña (henna)", "Hennastrauch"], ["Beetroot", "Remolacha", "Rote Bete"]],
  ["medium", ["Which plant's leaves are used to make a reddish-brown dye for painting patterns on hands?", "¿Con las hojas de qué planta se hace un tinte marrón rojizo para pintar dibujos en las manos?", "Aus den Blättern welcher Pflanze macht man eine rotbraune Farbe, um Muster auf Hände zu malen?"],
    ["Henna", "Alheña (henna)", "Hennastrauch"], ["Indigo", "Añil (índigo)", "Indigo"], ["Lavender", "Lavanda", "Lavendel"], ["Mint", "Menta", "Minze"]],
  ["medium", ["Which sticky substance from pine trees was once used to make turpentine and to seal wooden ships?", "¿Qué sustancia pegajosa de los pinos se usaba para hacer trementina y calafatear barcos de madera?", "Welcher klebrige Stoff aus Kiefern wurde früher für Terpentin und zum Abdichten von Holzschiffen verwendet?"],
    ["Resin", "Resina", "Harz"], ["Honey", "Miel", "Honig"], ["Wax", "Cera", "Wachs"], ["Latex", "Látex", "Latex"]],
  ["easy", ["Which giant grass is so strong that it is used for building scaffolding in parts of Asia?", "¿Qué hierba gigante es tan resistente que se usa para montar andamios en partes de Asia?", "Welches Riesengras ist so stabil, dass man in Teilen Asiens Baugerüste daraus baut?"],
    ["Bamboo", "Bambú", "Bambus"], ["Sugar cane", "Caña de azúcar", "Zuckerrohr"], ["Papyrus", "Papiro", "Papyrus"], ["Rice", "Arroz", "Reis"]],
  ["medium", ["What are jute fibres mostly used for?", "¿Para qué se usan sobre todo las fibras de yute?", "Wofür werden Jutefasern vor allem verwendet?"],
    ["Sacks and ropes", "Sacos y cuerdas", "Säcke und Seile"], ["Glass bottles", "Botellas de vidrio", "Glasflaschen"], ["Candles", "Velas", "Kerzen"], ["Plastic toys", "Juguetes de plástico", "Plastikspielzeug"]],
  ["easy", ["Which fragrant purple-flowered plant, famous for its fields in Provence, is used in soaps and perfumes?", "¿Qué planta aromática de flores moradas, famosa por sus campos de la Provenza, se usa en jabones y perfumes?", "Welche duftende, violett blühende Pflanze, berühmt für ihre Felder in der Provence, wird für Seifen und Parfüms verwendet?"],
    ["Lavender", "Lavanda", "Lavendel"], ["Mint", "Menta", "Minze"], ["Sunflower", "Girasol", "Sonnenblume"], ["Tulip", "Tulipán", "Tulpe"]],
  ["hard", ["The strong fibre called sisal, used for ropes and doormats, comes from which kind of plant?", "La resistente fibra llamada sisal, usada para cuerdas y felpudos, procede de ¿qué tipo de planta?", "Aus welcher Pflanzenart stammt die feste Sisalfaser, aus der Seile und Fußmatten gemacht werden?"],
    ["An agave", "Un agave", "Eine Agave"], ["A rose", "Un rosal", "Eine Rose"], ["An oak", "Un roble", "Eine Eiche"], ["A tulip", "Un tulipán", "Eine Tulpe"]],
];
