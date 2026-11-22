/** Fact tables for the "pop." question families (packs/pop_culture.ts). Only stable, well-established facts. */
type L = [string, string, string];

/** [hero en, es, de, secret identity, never offer as wrong (other identities of the same person)] */
export const ALTER_EGOS: [string, string, string, string, string[]?][] = [
  ["Batman", "Batman", "Batman", "Bruce Wayne"],
  ["Superman", "Superman", "Superman", "Clark Kent"],
  ["Spider-Man", "Spider-Man", "Spider-Man", "Peter Parker", ["Venom"]],
  ["Iron Man", "Iron Man", "Iron Man", "Tony Stark"],
  ["Wonder Woman", "Wonder Woman", "Wonder Woman", "Diana Prince"],
  ["Captain America", "Capitán América", "Captain America", "Steve Rogers"],
  ["Hulk", "Hulk", "Hulk", "Bruce Banner"],
  ["Black Panther", "Black Panther", "Black Panther", "T'Challa"],
  ["Black Widow", "Viuda Negra", "Black Widow", "Natasha Romanoff"],
  ["The Flash", "Flash", "Flash", "Barry Allen"],
  ["Aquaman", "Aquaman", "Aquaman", "Arthur Curry"],
  ["Green Lantern", "Linterna Verde", "Green Lantern", "Hal Jordan"],
  ["Catwoman", "Catwoman", "Catwoman", "Selina Kyle"],
  ["Wolverine", "Lobezno", "Wolverine", "Logan"],
  ["Hawkeye", "Ojo de Halcón", "Hawkeye", "Clint Barton"],
  ["Star-Lord", "Star-Lord", "Star-Lord", "Peter Quill"],
  ["Daredevil", "Daredevil", "Daredevil", "Matt Murdock"],
  ["Captain Marvel", "Capitana Marvel", "Captain Marvel", "Carol Danvers"],
  ["Scarlet Witch", "Bruja Escarlata", "Scarlet Witch", "Wanda Maximoff"],
  ["Venom", "Venom", "Venom", "Eddie Brock", ["Spider-Man"]],
  ["Green Goblin", "Duende Verde", "Grüner Kobold", "Norman Osborn"],
  ["Zorro", "Zorro", "Zorro", "Don Diego de la Vega"],
  ["Hannah Montana", "Hannah Montana", "Hannah Montana", "Miley Stewart"],
  ["Ladybug (Miraculous)", "Ladybug (Miraculous)", "Ladybug (Miraculous)", "Marinette Dupain-Cheng"],
  ["Mr. Incredible", "Mr. Increíble", "Mr. Incredible", "Bob Parr"],
];

export const MARVEL: L[] = [
  ["Spider-Man", "Spider-Man", "Spider-Man"], ["Iron Man", "Iron Man", "Iron Man"], ["Captain America", "Capitán América", "Captain America"],
  ["Hulk", "Hulk", "Hulk"], ["Thor", "Thor", "Thor"], ["Black Panther", "Black Panther", "Black Panther"], ["Wolverine", "Lobezno", "Wolverine"],
  ["Black Widow", "Viuda Negra", "Black Widow"], ["Doctor Strange", "Doctor Strange", "Doctor Strange"], ["Deadpool", "Deadpool", "Deadpool"],
  ["Ant-Man", "Ant-Man", "Ant-Man"], ["Hawkeye", "Ojo de Halcón", "Hawkeye"], ["Scarlet Witch", "Bruja Escarlata", "Scarlet Witch"],
  ["Daredevil", "Daredevil", "Daredevil"], ["Groot", "Groot", "Groot"], ["Thanos", "Thanos", "Thanos"], ["Loki", "Loki", "Loki"],
  ["Magneto", "Magneto", "Magneto"], ["Venom", "Venom", "Venom"], ["Green Goblin", "Duende Verde", "Grüner Kobold"],
];
export const DC: L[] = [
  ["Batman", "Batman", "Batman"], ["Superman", "Superman", "Superman"], ["Wonder Woman", "Wonder Woman", "Wonder Woman"],
  ["The Flash", "Flash", "Flash"], ["Aquaman", "Aquaman", "Aquaman"], ["Green Lantern", "Linterna Verde", "Green Lantern"],
  ["Robin", "Robin", "Robin"], ["Catwoman", "Catwoman", "Catwoman"], ["Harley Quinn", "Harley Quinn", "Harley Quinn"],
  ["The Joker", "Joker", "Joker"], ["Lex Luthor", "Lex Luthor", "Lex Luthor"], ["Supergirl", "Supergirl", "Supergirl"],
  ["Cyborg", "Cyborg", "Cyborg"], ["Green Arrow", "Flecha Verde", "Green Arrow"], ["The Riddler", "Enigma", "Riddler"], ["Darkseid", "Darkseid", "Darkseid"],
];

export const TEAMS: Record<string, L> = {
  avengers: ["The Avengers", "Los Vengadores", "Die Avengers"],
  justice: ["The Justice League", "La Liga de la Justicia", "Die Justice League"],
  ff: ["The Fantastic Four", "Los Cuatro Fantásticos", "Die Fantastischen Vier"],
  xmen: ["The X-Men", "Los X-Men", "Die X-Men"],
  guardians: ["The Guardians of the Galaxy", "Los Guardianes de la Galaxia", "Die Guardians of the Galaxy"],
  tmnt: ["The Teenage Mutant Ninja Turtles", "Las Tortugas Ninja", "Die Teenage Mutant Ninja Turtles"],
  titans: ["The Teen Titans", "Los Jóvenes Titanes", "Die Teen Titans"],
};
/** team → publisher; members are never asked against other teams of the same publisher (lots of crossovers in comics) */
export const TEAM_PUBLISHER: Record<string, string> = { avengers: "marvel", ff: "marvel", xmen: "marvel", guardians: "marvel", justice: "dc", titans: "dc", tmnt: "tmnt" };
/** [member en, es, de, team] */
export const TEAM_MEMBERS: [string, string, string, string][] = [
  ["Iron Man", "Iron Man", "Iron Man", "avengers"], ["Captain America", "Capitán América", "Captain America", "avengers"], ["Thor", "Thor", "Thor", "avengers"],
  ["Hulk", "Hulk", "Hulk", "avengers"], ["Black Widow", "Viuda Negra", "Black Widow", "avengers"], ["Hawkeye", "Ojo de Halcón", "Hawkeye", "avengers"],
  ["Superman", "Superman", "Superman", "justice"], ["Wonder Woman", "Wonder Woman", "Wonder Woman", "justice"], ["Aquaman", "Aquaman", "Aquaman", "justice"],
  ["The Flash", "Flash", "Flash", "justice"], ["Batman", "Batman", "Batman", "justice"], ["Green Lantern", "Linterna Verde", "Green Lantern", "justice"],
  ["Mister Fantastic", "Mister Fantástico", "Mister Fantastic", "ff"], ["The Thing", "La Cosa", "Das Ding", "ff"],
  ["The Invisible Woman", "La Mujer Invisible", "Die Unsichtbare", "ff"], ["The Human Torch", "La Antorcha Humana", "Die Fackel", "ff"],
  ["Cyclops", "Cíclope", "Cyclops", "xmen"], ["Storm", "Tormenta", "Storm", "xmen"], ["Professor X", "Profesor X", "Professor X", "xmen"],
  ["Jean Grey", "Jean Grey", "Jean Grey", "xmen"], ["Wolverine", "Lobezno", "Wolverine", "xmen"],
  ["Star-Lord", "Star-Lord", "Star-Lord", "guardians"], ["Gamora", "Gamora", "Gamora", "guardians"], ["Groot", "Groot", "Groot", "guardians"],
  ["Rocket", "Rocket", "Rocket", "guardians"], ["Drax", "Drax", "Drax", "guardians"],
  ["Leonardo", "Leonardo", "Leonardo", "tmnt"], ["Donatello", "Donatello", "Donatello", "tmnt"], ["Michelangelo", "Michelangelo", "Michelangelo", "tmnt"],
  ["Raphael", "Raphael", "Raphael", "tmnt"], ["Master Splinter", "Maestro Splinter", "Meister Splinter", "tmnt"],
  ["Starfire", "Starfire", "Starfire", "titans"], ["Raven", "Raven", "Raven", "titans"], ["Beast Boy", "Chico Bestia", "Beast Boy", "titans"],
];

/** Arch-enemies: hero/heroes as [en, es, de (nominative), de "von …" form] */
export const HEROES: Record<string, [string, string, string, string]> = {
  batman: ["Batman", "Batman", "Batman", "von Batman"],
  superman: ["Superman", "Superman", "Superman", "von Superman"],
  spiderman: ["Spider-Man", "Spider-Man", "Spider-Man", "von Spider-Man"],
  xmen: ["the X-Men", "los X-Men", "die X-Men", "von den X-Men"],
  avengers: ["the Avengers", "los Vengadores", "die Avengers", "von den Avengers"],
  mario: ["Mario", "Mario", "Mario", "von Mario"],
  sonic: ["Sonic", "Sonic", "Sonic", "von Sonic"],
  link: ["Link", "Link", "Link", "von Link"],
  tmnt: ["the Teenage Mutant Ninja Turtles", "las Tortugas Ninja", "die Teenage Mutant Ninja Turtles", "von den Teenage Mutant Ninja Turtles"],
  smurfs: ["the Smurfs", "los Pitufos", "die Schlümpfe", "von den Schlümpfen"],
  heman: ["He-Man", "He-Man", "He-Man", "von He-Man"],
  harry: ["Harry Potter", "Harry Potter", "Harry Potter", "von Harry Potter"],
  krabs: ["Mr. Krabs", "Don Cangrejo", "Mr. Krabs", "von Mr. Krabs"],
  perry: ["Perry the Platypus", "Perry el Ornitorrinco", "Perry das Schnabeltier", "von Perry dem Schnabeltier"],
  roadrunner: ["the Road Runner", "el Correcaminos", "der Road Runner", "vom Road Runner"],
  tweety: ["Tweety", "Piolín", "Tweety", "von Tweety"],
  sherlock: ["Sherlock Holmes", "Sherlock Holmes", "Sherlock Holmes", "von Sherlock Holmes"],
  buzz: ["Buzz Lightyear", "Buzz Lightyear", "Buzz Lightyear", "von Buzz Lightyear"],
  optimus: ["Optimus Prime", "Optimus Prime", "Optimus Prime", "von Optimus Prime"],
  powerpuff: ["the Powerpuff Girls", "las Supernenas", "die Powerpuff Girls", "von den Powerpuff Girls"],
  donkeykong: ["Donkey Kong", "Donkey Kong", "Donkey Kong", "von Donkey Kong"],
};
/** [villain en, es, de, hero key] */
export const NEMESES: [string, string, string, string][] = [
  ["Joker", "Joker", "Joker", "batman"], ["Lex Luthor", "Lex Luthor", "Lex Luthor", "superman"], ["Green Goblin", "Duende Verde", "Grüner Kobold", "spiderman"],
  ["Doctor Octopus", "Doctor Octopus", "Doctor Octopus", "spiderman"], ["Magneto", "Magneto", "Magneto", "xmen"], ["Thanos", "Thanos", "Thanos", "avengers"],
  ["Bowser", "Bowser", "Bowser", "mario"], ["Dr. Eggman", "Dr. Eggman", "Dr. Eggman", "sonic"], ["Ganon", "Ganon", "Ganon", "link"],
  ["Shredder", "Destructor", "Shredder", "tmnt"], ["Gargamel", "Gargamel", "Gargamel", "smurfs"], ["Skeletor", "Skeletor", "Skeletor", "heman"],
  ["Lord Voldemort", "Lord Voldemort", "Lord Voldemort", "harry"], ["Plankton", "Plankton", "Plankton", "krabs"],
  ["Dr. Doofenshmirtz", "Dr. Doofenshmirtz", "Dr. Doofenshmirtz", "perry"], ["Wile E. Coyote", "el Coyote", "Wile E. Coyote", "roadrunner"],
  ["Sylvester the cat", "el gato Silvestre", "Kater Sylvester", "tweety"], ["Professor Moriarty", "el profesor Moriarty", "Professor Moriarty", "sherlock"],
  ["Emperor Zurg", "el emperador Zurg", "Imperator Zurg", "buzz"], ["Megatron", "Megatron", "Megatron", "optimus"],
  ["Mojo Jojo", "Mojo Jojo", "Mojo Jojo", "powerpuff"], ["King K. Rool", "King K. Rool", "King K. Rool", "donkeykong"],
];

export const VFILMS: Record<string, L> = {
  mermaid: ["The Little Mermaid", "La sirenita", "Arielle, die Meerjungfrau"],
  aladdin: ["Aladdin", "Aladdín", "Aladdin"],
  sleeping: ["Sleeping Beauty", "La bella durmiente", "Dornröschen"],
  dalmatians: ["101 Dalmatians", "101 dálmatas", "101 Dalmatiner"],
  peterpan: ["Peter Pan", "Peter Pan", "Peter Pan"],
  hercules: ["Hercules", "Hércules", "Hercules"],
  beauty: ["Beauty and the Beast", "La bella y la bestia", "Die Schöne und das Biest"],
  tangled: ["Tangled", "Enredados", "Rapunzel – Neu verföhnt"],
  frozen: ["Frozen", "Frozen: El reino del hielo", "Die Eiskönigin – Völlig unverfroren"],
  jungle: ["The Jungle Book", "El libro de la selva", "Das Dschungelbuch"],
  toystory3: ["Toy Story 3", "Toy Story 3", "Toy Story 3"],
  incredibles: ["The Incredibles", "Los increíbles", "Die Unglaublichen"],
  coco: ["Coco", "Coco", "Coco"],
  snowwhite: ["Snow White and the Seven Dwarfs", "Blancanieves y los siete enanitos", "Schneewittchen und die sieben Zwerge"],
  cinderella: ["Cinderella", "La Cenicienta", "Cinderella"],
  hunchback: ["The Hunchback of Notre Dame", "El jorobado de Notre Dame", "Der Glöckner von Notre Dame"],
  mulan: ["Mulan", "Mulán", "Mulan"],
  frog: ["The Princess and the Frog", "Tiana y el sapo", "Küss den Frosch"],
  ralph: ["Wreck-It Ralph", "¡Rompe Ralph!", "Ralph reicht's"],
  zootopia: ["Zootopia", "Zootrópolis", "Zoomania"],
  monsters: ["Monsters, Inc.", "Monstruos, S.A.", "Die Monster AG"],
  pocahontas: ["Pocahontas", "Pocahontas", "Pocahontas"],
  robinhood: ["Robin Hood (1973)", "Robin Hood (1973)", "Robin Hood (1973)"],
  ratatouille: ["Ratatouille", "Ratatouille", "Ratatouille"],
  up: ["Up", "Up", "Oben"],
};
/** Disney/Pixar villain [en, es, de, film key] */
export const VILLAINS: [string, string, string, string][] = [
  ["Ursula", "Úrsula", "Ursula", "mermaid"], ["Jafar", "Jafar", "Dschafar", "aladdin"], ["Maleficent", "Maléfica", "Malefiz", "sleeping"],
  ["Cruella de Vil", "Cruella de Vil", "Cruella De Vil", "dalmatians"], ["Captain Hook", "Capitán Garfio", "Käpt'n Hook", "peterpan"],
  ["Hades", "Hades", "Hades", "hercules"], ["Gaston", "Gastón", "Gaston", "beauty"], ["Mother Gothel", "Madre Gothel", "Mutter Gothel", "tangled"],
  ["Prince Hans", "Príncipe Hans", "Prinz Hans", "frozen"], ["Shere Khan", "Shere Khan", "Shir Khan", "jungle"], ["Lotso", "Lotso", "Lotso", "toystory3"],
  ["Syndrome", "Síndrome", "Syndrome", "incredibles"], ["Ernesto de la Cruz", "Ernesto de la Cruz", "Ernesto de la Cruz", "coco"],
  ["The Evil Queen", "La Reina Malvada", "Die böse Königin", "snowwhite"], ["Lady Tremaine", "Lady Tremaine", "Lady Tremaine", "cinderella"],
  ["Judge Claude Frollo", "Juez Claude Frollo", "Richter Claude Frollo", "hunchback"], ["Shan Yu", "Shan Yu", "Shan Yu", "mulan"],
  ["Dr. Facilier", "Dr. Facilier", "Dr. Facilier", "frog"], ["King Candy", "Rey Candy", "King Candy", "ralph"],
  ["Bellwether", "Bellwether", "Bellwether", "zootopia"], ["Randall", "Randall", "Randall", "monsters"], ["Governor Ratcliffe", "Gobernador Ratcliffe", "Gouverneur Ratcliffe", "pocahontas"],
  ["Prince John", "Príncipe Juan", "Prinz John", "robinhood"], ["Skinner", "Skinner", "Skinner", "ratatouille"], ["Charles Muntz", "Charles Muntz", "Charles Muntz", "up"],
];

/** [character, Hogwarts house] — names are the same in the ES/DE editions */
export const HOUSES: [string, string][] = [
  ["Harry Potter", "Gryffindor"], ["Hermione Granger", "Gryffindor"], ["Ron Weasley", "Gryffindor"], ["Neville Longbottom", "Gryffindor"],
  ["Ginny Weasley", "Gryffindor"], ["Minerva McGonagall", "Gryffindor"], ["Rubeus Hagrid", "Gryffindor"], ["Albus Dumbledore", "Gryffindor"],
  ["Sirius Black", "Gryffindor"], ["Remus Lupin", "Gryffindor"],
  ["Draco Malfoy", "Slytherin"], ["Severus Snape", "Slytherin"], ["Lord Voldemort", "Slytherin"], ["Bellatrix Lestrange", "Slytherin"],
  ["Horace Slughorn", "Slytherin"], ["Lucius Malfoy", "Slytherin"], ["Dolores Umbridge", "Slytherin"], ["Pansy Parkinson", "Slytherin"],
  ["Luna Lovegood", "Ravenclaw"], ["Cho Chang", "Ravenclaw"], ["Filius Flitwick", "Ravenclaw"], ["Gilderoy Lockhart", "Ravenclaw"],
  ["Sybill Trelawney", "Ravenclaw"], ["Padma Patil", "Ravenclaw"],
  ["Cedric Diggory", "Hufflepuff"], ["Nymphadora Tonks", "Hufflepuff"], ["Newt Scamander", "Hufflepuff"], ["Pomona Sprout", "Hufflepuff"],
  ["Ernie Macmillan", "Hufflepuff"], ["Hannah Abbott", "Hufflepuff"],
];

export const HP_KINDS: Record<string, L> = {
  owl: ["An owl", "Una lechuza", "Eine Eule"], cat: ["A cat", "Un gato", "Eine Katze"], rat: ["A rat", "Una rata", "Eine Ratte"],
  phoenix: ["A phoenix", "Un fénix", "Ein Phönix"], hippogriff: ["A hippogriff", "Un hipogrifo", "Ein Hippogreif"], snake: ["A snake", "Una serpiente", "Eine Schlange"],
  dog3: ["A three-headed dog", "Un perro de tres cabezas", "Ein dreiköpfiger Hund"], dragon: ["A dragon", "Un dragón", "Ein Drache"],
  spider: ["A giant spider", "Una araña gigante", "Eine Riesenspinne"], dog: ["A dog", "Un perro", "Ein Hund"],
  elf: ["A house-elf", "Un elfo doméstico", "Ein Hauself"], giant: ["A giant", "Un gigante", "Ein Riese"],
};
/** [name en, es, de, kind, kinds never offered as wrong] */
export const HP_CREATURES: [string, string, string, string, string[]?][] = [
  ["Hedwig", "Hedwig", "Hedwig", "owl"], ["Crookshanks", "Crookshanks", "Krummbein", "cat"], ["Scabbers", "Scabbers", "Krätze", "rat"],
  ["Fawkes", "Fawkes", "Fawkes", "phoenix"], ["Buckbeak", "Buckbeak", "Seidenschnabel", "hippogriff"], ["Nagini", "Nagini", "Nagini", "snake"],
  ["Fluffy", "Fluffy", "Fluffy", "dog3", ["dog"]], ["Norbert", "Norberto", "Norbert", "dragon"], ["Aragog", "Aragog", "Aragog", "spider"],
  ["Fang", "Fang", "Fang", "dog", ["dog3"]], ["Errol", "Errol", "Errol", "owl"], ["Dobby", "Dobby", "Dobby", "elf"], ["Kreacher", "Kreacher", "Kreacher", "elf"],
  ["Grawp", "Grawp", "Grawp", "giant"],
];
export const HP_BOOKS: L[] = [
  ["Harry Potter and the Philosopher's Stone", "Harry Potter y la piedra filosofal", "Harry Potter und der Stein der Weisen"],
  ["Harry Potter and the Chamber of Secrets", "Harry Potter y la cámara secreta", "Harry Potter und die Kammer des Schreckens"],
  ["Harry Potter and the Prisoner of Azkaban", "Harry Potter y el prisionero de Azkaban", "Harry Potter und der Gefangene von Askaban"],
  ["Harry Potter and the Goblet of Fire", "Harry Potter y el cáliz de fuego", "Harry Potter und der Feuerkelch"],
  ["Harry Potter and the Order of the Phoenix", "Harry Potter y la Orden del Fénix", "Harry Potter und der Orden des Phönix"],
  ["Harry Potter and the Half-Blood Prince", "Harry Potter y el misterio del príncipe", "Harry Potter und der Halbblutprinz"],
  ["Harry Potter and the Deathly Hallows", "Harry Potter y las Reliquias de la Muerte", "Harry Potter und die Heiligtümer des Todes"],
];

export const PTYPES: Record<string, L> = {
  electric: ["Electric", "Eléctrico", "Elektro"], fire: ["Fire", "Fuego", "Feuer"], water: ["Water", "Agua", "Wasser"], grass: ["Grass", "Planta", "Pflanze"],
  psychic: ["Psychic", "Psíquico", "Psycho"], ghost: ["Ghost", "Fantasma", "Geist"], fighting: ["Fighting", "Lucha", "Kampf"], bug: ["Bug", "Bicho", "Käfer"],
  ground: ["Ground", "Tierra", "Boden"], rock: ["Rock", "Roca", "Gestein"], normal: ["Normal", "Normal", "Normal"], poison: ["Poison", "Veneno", "Gift"],
  dragon: ["Dragon", "Dragón", "Drache"], ice: ["Ice", "Hielo", "Eis"],
};
/** [english/spanish name, german name, main type, other types (never offered as wrong)] */
export const POKEMON: [string, string, string, string[]?][] = [
  ["Pikachu", "Pikachu", "electric"], ["Raichu", "Raichu", "electric", ["psychic"]], ["Charmander", "Glumanda", "fire"], ["Charizard", "Glurak", "fire", ["flying", "dragon"]],
  ["Squirtle", "Schiggy", "water"], ["Blastoise", "Turtok", "water"], ["Bulbasaur", "Bisasam", "grass", ["poison"]], ["Psyduck", "Enton", "water"],
  ["Snorlax", "Relaxo", "normal"], ["Gengar", "Gengar", "ghost", ["poison"]], ["Gastly", "Nebulak", "ghost", ["poison"]], ["Mewtwo", "Mewtu", "psychic"],
  ["Mew", "Mew", "psychic"], ["Eevee", "Evoli", "normal"], ["Magikarp", "Karpador", "water"], ["Gyarados", "Garados", "water", ["flying"]],
  ["Onix", "Onix", "rock", ["ground"]], ["Geodude", "Kleinstein", "rock", ["ground"]], ["Vulpix", "Vulpix", "fire", ["ice"]], ["Growlithe", "Fukano", "fire", ["rock"]],
  ["Ponyta", "Ponita", "fire", ["psychic"]], ["Dragonite", "Dragoran", "dragon", ["flying"]], ["Dratini", "Dratini", "dragon"], ["Lapras", "Lapras", "water", ["ice"]],
  ["Abra", "Abra", "psychic"], ["Alakazam", "Simsala", "psychic"], ["Machop", "Machollo", "fighting"], ["Machamp", "Machomei", "fighting"],
  ["Hitmonlee", "Kicklee", "fighting"], ["Caterpie", "Raupy", "bug"], ["Butterfree", "Smettbo", "bug", ["flying"]], ["Scyther", "Sichlor", "bug", ["flying"]],
  ["Jolteon", "Blitza", "electric"], ["Flareon", "Flamara", "fire"], ["Vaporeon", "Aquana", "water"], ["Voltorb", "Voltobal", "electric"],
  ["Diglett", "Digda", "ground"], ["Cubone", "Tragosso", "ground"], ["Sandshrew", "Sandan", "ground", ["ice"]], ["Ekans", "Rettan", "poison"],
  ["Articuno", "Arktos", "ice", ["flying", "psychic"]], ["Zapdos", "Zapdos", "electric", ["flying", "fighting"]], ["Moltres", "Lavados", "fire", ["flying"]],
  ["Jynx", "Rossana", "ice", ["psychic"]], ["Oddish", "Myrapla", "grass", ["poison"]], ["Chikorita", "Endivie", "grass"], ["Cyndaquil", "Feurigel", "fire"],
  ["Totodile", "Karnimani", "water"], ["Treecko", "Geckarbor", "grass"], ["Torchic", "Flemmli", "fire"], ["Mudkip", "Hydropi", "water"], ["Piplup", "Plinfa", "water"],
];

/** [console, maker] */
export const CONSOLE_MAKERS: [string, string][] = [
  ["PlayStation", "Sony"], ["PlayStation Portable (PSP)", "Sony"], ["PlayStation Vita", "Sony"], ["Xbox", "Microsoft"], ["Xbox 360", "Microsoft"],
  ["Xbox Series X", "Microsoft"], ["Game Boy", "Nintendo"], ["Game Boy Advance", "Nintendo"], ["Wii", "Nintendo"], ["Wii U", "Nintendo"],
  ["GameCube", "Nintendo"], ["Virtual Boy", "Nintendo"], ["Mega Drive (Genesis)", "Sega"], ["Master System", "Sega"], ["Dreamcast", "Sega"],
  ["Game Gear", "Sega"], ["Saturn", "Sega"], ["Steam Deck", "Valve"], ["Neo Geo", "SNK"], ["Lynx", "Atari"], ["Jaguar", "Atari"],
];
/** [console, first release year anywhere] */
export const CONSOLE_YEARS: [string, number][] = [
  ["Atari 2600", 1977], ["NES (Nintendo Entertainment System)", 1983], ["Sega Master System", 1985], ["Sega Mega Drive (Genesis)", 1988], ["Game Boy", 1989],
  ["Super Nintendo (SNES)", 1990], ["PlayStation", 1994], ["Nintendo 64", 1996], ["Sega Dreamcast", 1998], ["PlayStation 2", 2000], ["Xbox", 2001],
  ["GameCube", 2001], ["Game Boy Advance", 2001], ["Nintendo DS", 2004], ["PlayStation Portable (PSP)", 2004], ["Xbox 360", 2005], ["Wii", 2006],
  ["PlayStation 3", 2006], ["Nintendo 3DS", 2011], ["Wii U", 2012], ["PlayStation 4", 2013], ["Xbox One", 2013], ["Nintendo Switch", 2017],
  ["PlayStation 5", 2020], ["Xbox Series X", 2020], ["Steam Deck", 2022], ["Nintendo Switch 2", 2025],
];

/** [brand, country of origin] (not cars) */
export const BRANDS: [string, string][] = [
  ["IKEA", "sweden"], ["H&M", "sweden"], ["Spotify", "sweden"], ["Ericsson", "sweden"], ["Electrolux", "sweden"], ["Absolut Vodka", "sweden"],
  ["Carlsberg", "denmark"], ["Pandora", "denmark"], ["Bang & Olufsen", "denmark"], ["Nokia", "finland"], ["Supercell", "finland"], ["Rovio (Angry Birds)", "finland"],
  ["Samsung", "south_korea"], ["LG", "south_korea"], ["Zara", "spain"], ["Mango", "spain"], ["Chupa Chups", "spain"], ["Desigual", "spain"],
  ["Adidas", "germany"], ["Puma", "germany"], ["Siemens", "germany"], ["Bosch", "germany"], ["Haribo", "germany"], ["Nivea", "germany"],
  ["Philips", "netherlands"], ["Heineken", "netherlands"], ["Sony", "japan"], ["Nintendo", "japan"], ["Canon", "japan"], ["Panasonic", "japan"],
  ["Gucci", "italy"], ["Prada", "italy"], ["Ferrero", "italy"], ["Barilla", "italy"], ["Chanel", "france"], ["Louis Vuitton", "france"],
  ["L'Oréal", "france"], ["Danone", "france"], ["Lacoste", "france"], ["Michelin", "france"], ["Huawei", "china"], ["Lenovo", "china"],
  ["Xiaomi", "china"], ["Alibaba", "china"], ["Coca-Cola", "usa"], ["McDonald's", "usa"], ["Nike", "usa"], ["Apple", "usa"], ["Levi's", "usa"],
  ["Burberry", "uk"], ["Cadbury", "uk"], ["Red Bull", "austria"], ["Swarovski", "austria"], ["Havaianas", "brazil"], ["BlackBerry", "canada"],
];
/** [car brand, country of origin] */
export const CAR_BRANDS: [string, string][] = [
  ["Ferrari", "italy"], ["Lamborghini", "italy"], ["Fiat", "italy"], ["Alfa Romeo", "italy"], ["Maserati", "italy"],
  ["Toyota", "japan"], ["Honda", "japan"], ["Nissan", "japan"], ["Mazda", "japan"], ["Subaru", "japan"], ["Suzuki", "japan"],
  ["BMW", "germany"], ["Mercedes-Benz", "germany"], ["Audi", "germany"], ["Porsche", "germany"], ["Volkswagen", "germany"], ["Opel", "germany"],
  ["Peugeot", "france"], ["Renault", "france"], ["Citroën", "france"], ["Volvo", "sweden"], ["Saab", "sweden"], ["Koenigsegg", "sweden"],
  ["SEAT", "spain"], ["Cupra", "spain"], ["Škoda", "czechia"], ["Hyundai", "south_korea"], ["Kia", "south_korea"],
  ["Ford", "usa"], ["Chevrolet", "usa"], ["Tesla", "usa"], ["Jeep", "usa"], ["Cadillac", "usa"],
  ["Rolls-Royce", "uk"], ["Aston Martin", "uk"], ["Jaguar", "uk"], ["Land Rover", "uk"], ["Bentley", "uk"], ["McLaren", "uk"], ["Lotus", "uk"],
  ["Tata", "india"], ["BYD", "china"], ["Dacia", "romania"], ["Lada", "russia"],
];
/** [product en, es, de, company] */
export const PRODUCTS: [string, string, string, string][] = [
  ["iPhone", "iPhone", "iPhone", "Apple"], ["iPad", "iPad", "iPad", "Apple"], ["AirPods", "AirPods", "AirPods", "Apple"], ["Siri", "Siri", "Siri", "Apple"],
  ["PlayStation", "PlayStation", "PlayStation", "Sony"], ["Walkman", "Walkman", "Walkman", "Sony"], ["Xbox", "Xbox", "Xbox", "Microsoft"],
  ["Windows", "Windows", "Windows", "Microsoft"], ["Surface tablets", "Tabletas Surface", "Surface-Tablets", "Microsoft"], ["Kindle", "Kindle", "Kindle", "Amazon"],
  ["Alexa", "Alexa", "Alexa", "Amazon"], ["Galaxy smartphones", "Móviles Galaxy", "Galaxy-Smartphones", "Samsung"], ["Android", "Android", "Android", "Google"],
  ["Chrome", "Chrome", "Chrome", "Google"], ["Gmail", "Gmail", "Gmail", "Google"], ["Game Boy", "Game Boy", "Game Boy", "Nintendo"],
  ["Big Mac", "Big Mac", "Big Mac", "McDonald's"], ["Happy Meal", "Happy Meal", "Happy Meal", "McDonald's"], ["Whopper", "Whopper", "Whopper", "Burger King"],
  ["Fanta", "Fanta", "Fanta", "Coca-Cola"], ["Sprite", "Sprite", "Sprite", "Coca-Cola"], ["Air Jordan sneakers", "Zapatillas Air Jordan", "Air-Jordan-Sneaker", "Nike"],
  ["Stan Smith sneakers", "Zapatillas Stan Smith", "Stan-Smith-Sneaker", "Adidas"], ["Barbie", "Barbie", "Barbie", "Mattel"], ["Hot Wheels", "Hot Wheels", "Hot Wheels", "Mattel"],
  ["Photoshop", "Photoshop", "Photoshop", "Adobe"], ["Tamagotchi", "Tamagotchi", "Tamagotchi", "Bandai"], ["Nutella", "Nutella", "Nutella", "Ferrero"],
  ["Kinder Surprise", "Kinder Sorpresa", "Überraschungsei", "Ferrero"],
];
/** [model en, es, de, brand] */
export const CAR_MODELS: [string, string, string, string][] = [
  ["Golf", "Golf", "Golf", "Volkswagen"], ["Beetle", "Escarabajo", "Käfer", "Volkswagen"], ["Polo", "Polo", "Polo", "Volkswagen"],
  ["Mustang", "Mustang", "Mustang", "Ford"], ["Fiesta", "Fiesta", "Fiesta", "Ford"], ["Model T", "Modelo T", "Modell T", "Ford"],
  ["Corolla", "Corolla", "Corolla", "Toyota"], ["Prius", "Prius", "Prius", "Toyota"], ["Civic", "Civic", "Civic", "Honda"], ["911", "911", "911", "Porsche"],
  ["Clio", "Clio", "Clio", "Renault"], ["Twingo", "Twingo", "Twingo", "Renault"], ["Ibiza", "Ibiza", "Ibiza", "SEAT"], ["León", "León", "León", "SEAT"],
  ["Panda", "Panda", "Panda", "Fiat"], ["Model S", "Model S", "Model S", "Tesla"], ["Model 3", "Model 3", "Model 3", "Tesla"],
  ["Corvette", "Corvette", "Corvette", "Chevrolet"], ["Camaro", "Camaro", "Camaro", "Chevrolet"], ["Testarossa", "Testarossa", "Testarossa", "Ferrari"],
  ["Countach", "Countach", "Countach", "Lamborghini"], ["Qashqai", "Qashqai", "Qashqai", "Nissan"], ["2CV", "2CV", "2CV", "Citroën"],
  ["Octavia", "Octavia", "Octavia", "Škoda"], ["Astra", "Astra", "Astra", "Opel"], ["Corsa", "Corsa", "Corsa", "Opel"], ["Defender", "Defender", "Defender", "Land Rover"],
  ["Wrangler", "Wrangler", "Wrangler", "Jeep"], ["XC90", "XC90", "XC90", "Volvo"], ["Swift", "Swift", "Swift", "Suzuki"], ["Leaf", "Leaf", "Leaf", "Nissan"],
];
/** [company, a founder (co-founders are never in the pool)] */
export const FOUNDERS: [string, string][] = [
  ["Microsoft", "Bill Gates"], ["Apple", "Steve Jobs"], ["Amazon", "Jeff Bezos"], ["Facebook", "Mark Zuckerberg"], ["Google", "Larry Page"],
  ["SpaceX", "Elon Musk"], ["IKEA", "Ingvar Kamprad"], ["Zara", "Amancio Ortega"], ["Alibaba", "Jack Ma"], ["Spotify", "Daniel Ek"],
  ["Netflix", "Reed Hastings"], ["Oracle", "Larry Ellison"], ["Adidas", "Adolf Dassler"], ["Puma", "Rudolf Dassler"], ["LEGO", "Ole Kirk Christiansen"],
  ["Twitter", "Jack Dorsey"], ["Nintendo", "Fusajiro Yamauchi"], ["Sony", "Akio Morita"], ["Instagram", "Kevin Systrom"], ["Nvidia", "Jensen Huang"],
  ["WhatsApp", "Jan Koum"], ["Samsung", "Lee Byung-chul"],
];
/** [website/app, launch year] */
export const WEB_YEARS: [string, number][] = [
  ["Amazon", 1995], ["eBay", 1995], ["Google Search", 1998], ["Wikipedia", 2001], ["Skype", 2003], ["LinkedIn", 2003], ["Facebook", 2004], ["Gmail", 2004],
  ["YouTube", 2005], ["Reddit", 2005], ["Twitter", 2006], ["Spotify", 2008], ["WhatsApp", 2009], ["Instagram", 2010], ["Pinterest", 2010],
  ["Snapchat", 2011], ["Twitch", 2011], ["Telegram", 2013], ["Discord", 2015], ["TikTok", 2016], ["ChatGPT", 2022],
];

export const BEST_PICTURE: L[] = [
  ["Titanic", "Titanic", "Titanic"], ["The Godfather", "El padrino", "Der Pate"], ["Gladiator", "Gladiator", "Gladiator"], ["Forrest Gump", "Forrest Gump", "Forrest Gump"],
  ["Schindler's List", "La lista de Schindler", "Schindlers Liste"], ["The Silence of the Lambs", "El silencio de los corderos", "Das Schweigen der Lämmer"],
  ["Braveheart", "Braveheart", "Braveheart"],
  ["The Lord of the Rings: The Return of the King", "El Señor de los Anillos: El retorno del Rey", "Der Herr der Ringe: Die Rückkehr des Königs"],
  ["Slumdog Millionaire", "Slumdog Millionaire", "Slumdog Millionär"], ["Parasite", "Parásitos", "Parasite"], ["Oppenheimer", "Oppenheimer", "Oppenheimer"],
  ["The Sound of Music", "Sonrisas y lágrimas", "Meine Lieder – meine Träume"], ["Casablanca", "Casablanca", "Casablanca"], ["Ben-Hur (1959)", "Ben-Hur (1959)", "Ben Hur (1959)"],
  ["Rocky", "Rocky", "Rocky"], ["Everything Everywhere All at Once", "Todo a la vez en todas partes", "Everything Everywhere All at Once"],
  ["Gone with the Wind", "Lo que el viento se llevó", "Vom Winde verweht"], ["Rain Man", "Rain Man", "Rain Man"], ["Dances with Wolves", "Bailando con lobos", "Der mit dem Wolf tanzt"],
  ["American Beauty", "American Beauty", "American Beauty"], ["The Departed", "Infiltrados", "Departed – Unter Feinden"],
  ["The King's Speech", "El discurso del rey", "The King's Speech – Die Rede des Königs"], ["Amadeus", "Amadeus", "Amadeus"],
  ["One Flew Over the Cuckoo's Nest", "Alguien voló sobre el nido del cuco", "Einer flog über das Kuckucksnest"], ["Moonlight", "Moonlight", "Moonlight"],
  ["The Shape of Water", "La forma del agua", "Shape of Water – Das Flüstern des Wassers"], ["Green Book", "Green Book", "Green Book"],
  ["West Side Story (1961)", "West Side Story (1961)", "West Side Story (1961)"], ["My Fair Lady", "My Fair Lady", "My Fair Lady"], ["The Artist", "The Artist", "The Artist"],
];
export const NOT_BEST_PICTURE: L[] = [
  ["Star Wars (1977)", "La guerra de las galaxias (1977)", "Krieg der Sterne (1977)"], ["Jaws", "Tiburón", "Der weiße Hai"],
  ["E.T. the Extra-Terrestrial", "E.T., el extraterrestre", "E.T. – Der Außerirdische"], ["Pulp Fiction", "Pulp Fiction", "Pulp Fiction"],
  ["The Shawshank Redemption", "Cadena perpetua", "Die Verurteilten"], ["Avatar", "Avatar", "Avatar"], ["Jurassic Park", "Jurassic Park", "Jurassic Park"],
  ["Back to the Future", "Regreso al futuro", "Zurück in die Zukunft"], ["The Dark Knight", "El caballero oscuro", "The Dark Knight"], ["Inception", "Origen", "Inception"],
  ["The Matrix", "Matrix", "Matrix"], ["Psycho", "Psicosis", "Psycho"], ["Taxi Driver", "Taxi Driver", "Taxi Driver"],
  ["Raiders of the Lost Ark", "En busca del arca perdida", "Jäger des verlorenen Schatzes"], ["Citizen Kane", "Ciudadano Kane", "Citizen Kane"],
  ["2001: A Space Odyssey", "2001: Una odisea del espacio", "2001: Odyssee im Weltraum"], ["Barbie (2023)", "Barbie (2023)", "Barbie (2023)"], ["Top Gun", "Top Gun", "Top Gun"],
  ["Home Alone", "Solo en casa", "Kevin – Allein zu Haus"], ["Interstellar", "Interstellar", "Interstellar"], ["Mad Max: Fury Road", "Mad Max: Furia en la carretera", "Mad Max: Fury Road"],
  ["Black Panther", "Black Panther", "Black Panther"], ["Joker (2019)", "Joker (2019)", "Joker (2019)"], ["La La Land", "La La Land", "La La Land"],
  ["The Wizard of Oz", "El mago de Oz", "Der Zauberer von Oz"], ["Goodfellas", "Uno de los nuestros", "GoodFellas – Drei Jahrzehnte in der Mafia"],
  ["Saving Private Ryan", "Salvar al soldado Ryan", "Der Soldat James Ryan"], ["Toy Story", "Toy Story", "Toy Story"],
  ["Avengers: Endgame", "Vengadores: Endgame", "Avengers: Endgame"], ["Ghostbusters (1984)", "Cazafantasmas (1984)", "Ghostbusters – Die Geisterjäger (1984)"],
];

/** [contest year, winning country id] — ties, Switzerland and countries outside our country list are left out */
export const EUROVISION: [number, string][] = [
  [1957, "netherlands"], [1958, "france"], [1959, "netherlands"], [1960, "france"], [1962, "france"], [1963, "denmark"], [1964, "italy"],
  [1966, "austria"], [1967, "uk"], [1968, "spain"], [1970, "ireland"], [1974, "sweden"], [1975, "netherlands"], [1976, "uk"], [1977, "france"],
  [1980, "ireland"], [1981, "uk"], [1984, "sweden"], [1985, "norway"], [1986, "belgium"], [1987, "ireland"], [1990, "italy"], [1991, "sweden"],
  [1992, "ireland"], [1993, "ireland"], [1994, "ireland"], [1995, "norway"], [1996, "ireland"], [1997, "uk"], [1999, "sweden"], [2000, "denmark"],
  [2001, "estonia"], [2002, "latvia"], [2003, "turkey"], [2004, "ukraine"], [2005, "greece"], [2006, "finland"], [2007, "serbia"], [2008, "russia"],
  [2009, "norway"], [2010, "germany"], [2012, "sweden"], [2013, "denmark"], [2014, "austria"], [2015, "sweden"], [2016, "ukraine"], [2017, "portugal"],
  [2019, "netherlands"], [2021, "italy"], [2022, "ukraine"], [2023, "sweden"], [2025, "austria"],
];

/** [musician, band, bands never offered as wrong] */
export const BAND_MEMBERS: [string, string, string[]?][] = [
  ["Freddie Mercury", "Queen"], ["Brian May", "Queen"], ["Mick Jagger", "The Rolling Stones"], ["Keith Richards", "The Rolling Stones"],
  ["Bono", "U2"], ["The Edge", "U2"], ["Chris Martin", "Coldplay"], ["Kurt Cobain", "Nirvana", ["Foo Fighters"]], ["Dave Grohl", "Foo Fighters", ["Nirvana"]],
  ["Paul McCartney", "The Beatles"], ["Ringo Starr", "The Beatles"], ["John Lennon", "The Beatles"], ["Jim Morrison", "The Doors"],
  ["Axl Rose", "Guns N' Roses", ["AC/DC"]], ["Slash", "Guns N' Roses"], ["Robert Plant", "Led Zeppelin"], ["Jimmy Page", "Led Zeppelin"],
  ["Liam Gallagher", "Oasis"], ["Noel Gallagher", "Oasis"], ["Thom Yorke", "Radiohead"], ["Anthony Kiedis", "Red Hot Chili Peppers"],
  ["Adam Levine", "Maroon 5"], ["Angus Young", "AC/DC"], ["James Hetfield", "Metallica"], ["Sting", "The Police"], ["Billie Joe Armstrong", "Green Day"],
  ["Chester Bennington", "Linkin Park"], ["Till Lindemann", "Rammstein"], ["Gwen Stefani", "No Doubt"], ["Beyoncé", "Destiny's Child"],
  ["Harry Styles", "One Direction"], ["Justin Timberlake", "NSYNC"], ["Ozzy Osbourne", "Black Sabbath"], ["Damiano David", "Måneskin"],
  ["Agnetha Fältskog", "ABBA"], ["Björn Ulvaeus", "ABBA"], ["Jungkook", "BTS"], ["Geri Halliwell", "Spice Girls"], ["Victoria Beckham", "Spice Girls"],
  ["Roger Waters", "Pink Floyd"], ["David Gilmour", "Pink Floyd"], ["Bruce Dickinson", "Iron Maiden"], ["Debbie Harry", "Blondie"],
  ["Brandon Flowers", "The Killers"], ["Alex Turner", "Arctic Monkeys"], ["Dave Gahan", "Depeche Mode"], ["Robbie Williams", "Take That"],
  ["Phil Collins", "Genesis"], ["Mark Knopfler", "Dire Straits"], ["Morten Harket", "a-ha"], ["Bill Kaulitz", "Tokio Hotel"], ["Klaus Meine", "Scorpions"],
];

/** [toy/game en, es, de, country of origin] */
export const TOYS: [string, string, string, string][] = [
  ["Rubik's Cube", "Cubo de Rubik", "Zauberwürfel (Rubik's Cube)", "hungary"], ["LEGO bricks", "Piezas de LEGO", "LEGO-Steine", "denmark"],
  ["Monopoly", "Monopoly", "Monopoly", "usa"], ["Playmobil", "Playmobil", "Playmobil", "germany"], ["Tamagotchi", "Tamagotchi", "Tamagotchi", "japan"],
  ["Barbie", "Barbie", "Barbie", "usa"], ["Scrabble", "Scrabble", "Scrabble", "usa"], ["Jenga", "Jenga", "Jenga", "uk"], ["Cluedo", "Cluedo", "Cluedo", "uk"],
  ["UNO", "UNO", "UNO", "usa"], ["Twister", "Twister", "Twister", "usa"], ["Play-Doh", "Play-Doh", "Play-Doh", "usa"], ["Hello Kitty", "Hello Kitty", "Hello Kitty", "japan"],
  ["Sylvanian Families", "Sylvanian Families", "Sylvanian Families", "japan"], ["Meccano", "Meccano", "Meccano", "uk"],
  ["Trivial Pursuit", "Trivial Pursuit", "Trivial Pursuit", "canada"], ["Pictionary", "Pictionary", "Pictionary", "usa"],
  ["Catan", "Catan", "Die Siedler von Catan", "germany"], ["Carcassonne", "Carcassonne", "Carcassonne", "germany"],
  ["Schleich animal figures", "Figuras de animales Schleich", "Schleich-Tierfiguren", "germany"], ["Matryoshka dolls", "Matrioskas", "Matroschkas", "russia"],
  ["Beyblade", "Beyblade", "Beyblade", "japan"], ["Pokémon cards", "Cartas Pokémon", "Pokémon-Karten", "japan"], ["Hot Wheels", "Hot Wheels", "Hot Wheels", "usa"],
  ["Nerf", "Nerf", "Nerf", "usa"], ["Furby", "Furby", "Furby", "usa"], ["Snakes and Ladders", "Serpientes y escaleras", "Leiterspiel (Snakes and Ladders)", "india"],
  ["Mahjong", "Mahjong", "Mahjong", "china"], ["Go (board game)", "Go (juego de mesa)", "Go (Brettspiel)", "china"],
];

/** [abbreviation, meaning] */
export const CHAT_ABBR: [string, string][] = [
  ["LOL", "Laughing out loud"], ["BRB", "Be right back"], ["OMG", "Oh my God"], ["BTW", "By the way"], ["FYI", "For your information"],
  ["IMO", "In my opinion"], ["TBH", "To be honest"], ["IDK", "I don't know"], ["AFK", "Away from keyboard"], ["IRL", "In real life"],
  ["FOMO", "Fear of missing out"], ["GOAT", "Greatest of all time"], ["POV", "Point of view"], ["YOLO", "You only live once"],
  ["BFF", "Best friends forever"], ["ASAP", "As soon as possible"], ["DIY", "Do it yourself"], ["FAQ", "Frequently asked questions"],
  ["DM", "Direct message"], ["GG", "Good game"], ["TL;DR", "Too long; didn't read"], ["ROFL", "Rolling on the floor laughing"],
  ["ICYMI", "In case you missed it"], ["NVM", "Never mind"], ["TBA", "To be announced"], ["AKA", "Also known as"], ["ETA", "Estimated time of arrival"],
];
export const TECH_ABBR: [string, string][] = [
  ["USB", "Universal Serial Bus"], ["PDF", "Portable Document Format"], ["GIF", "Graphics Interchange Format"], ["URL", "Uniform Resource Locator"],
  ["HTML", "HyperText Markup Language"], ["WWW", "World Wide Web"], ["CPU", "Central Processing Unit"], ["GPU", "Graphics Processing Unit"],
  ["RAM", "Random Access Memory"], ["GPS", "Global Positioning System"], ["SMS", "Short Message Service"], ["VR", "Virtual reality"],
  ["AR", "Augmented reality"], ["AI", "Artificial intelligence"], ["DLC", "Downloadable content"], ["NPC", "Non-player character"],
  ["RPG", "Role-playing game"], ["HDMI", "High-Definition Multimedia Interface"], ["LED", "Light-emitting diode"], ["PC", "Personal computer"],
  ["SIM (card)", "Subscriber Identity Module"], ["QR (code)", "Quick Response"], ["SSD", "Solid-state drive"], ["HTTP", "Hypertext Transfer Protocol"],
  ["JPEG", "Joint Photographic Experts Group"], ["MMORPG", "Massively multiplayer online role-playing game"],
];

/** "How many …?" [question en, es, de, answer, plausible wrong numbers] */
export const HOW_MANY: [string, string, string, number, number[]][] = [
  ["How many squares does a chessboard have?", "¿Cuántas casillas tiene un tablero de ajedrez?", "Wie viele Felder hat ein Schachbrett?", 64, [36, 49, 72, 81, 100]],
  ["How many pieces does each player have at the start of a game of chess?", "¿Cuántas piezas tiene cada jugador al empezar una partida de ajedrez?", "Wie viele Figuren hat jeder Spieler zu Beginn einer Schachpartie?", 16, [12, 14, 18, 20]],
  ["How many pawns does each player start with in chess?", "¿Con cuántos peones empieza cada jugador en el ajedrez?", "Mit wie vielen Bauern beginnt jeder Spieler beim Schach?", 8, [6, 7, 10, 12]],
  ["How many cards are in a standard deck of playing cards (without jokers)?", "¿Cuántas cartas tiene una baraja francesa estándar (sin comodines)?", "Wie viele Karten hat ein Standard-Pokerblatt (ohne Joker)?", 52, [40, 48, 50, 56, 64]],
  ["How many card colours are there in UNO (not counting wild cards)?", "¿Cuántos colores de cartas hay en el UNO (sin contar los comodines)?", "Wie viele Kartenfarben gibt es bei UNO (ohne Joker)?", 4, [3, 5, 6]],
  ["How many dots are there in total on a standard six-sided die?", "¿Cuántos puntos hay en total en un dado normal de seis caras?", "Wie viele Augen hat ein normaler sechsseitiger Würfel insgesamt?", 21, [18, 20, 24, 36]],
  ["How many small squares are on each face of a classic Rubik's Cube?", "¿Cuántos cuadrados pequeños tiene cada cara de un cubo de Rubik clásico?", "Wie viele kleine Felder hat jede Seite eines klassischen Zauberwürfels?", 9, [4, 6, 12, 16]],
  ["How many tiles are in a standard double-six domino set?", "¿Cuántas fichas tiene un juego de dominó estándar (doble seis)?", "Wie viele Steine hat ein Standard-Dominospiel (Doppel-Sechs)?", 28, [21, 24, 32, 36]],
  ["How many spaces are there around a classic Monopoly board?", "¿Cuántas casillas hay alrededor de un tablero clásico de Monopoly?", "Wie viele Felder gibt es rund um ein klassisches Monopoly-Spielbrett?", 40, [32, 36, 44, 48]],
  ["How many columns does a Connect Four grid have?", "¿Cuántas columnas tiene el tablero del Conecta 4?", "Wie viele Spalten hat das Gitter von „Vier gewinnt“?", 7, [5, 6, 8, 9]],
  ["How many squares make up each piece in Tetris?", "¿Cuántos cuadrados forman cada pieza del Tetris?", "Aus wie vielen Quadraten besteht jedes Teil bei Tetris?", 4, [3, 5, 6]],
  ["How many ghosts chase Pac-Man in the original arcade game?", "¿Cuántos fantasmas persiguen a Pac-Man en el juego arcade original?", "Wie viele Geister jagen Pac-Man im originalen Arcade-Spiel?", 4, [2, 3, 5, 6]],
  ["How many letter tiles does each player hold in Scrabble?", "¿Cuántas fichas con letras tiene cada jugador en el Scrabble?", "Wie viele Buchstabensteine hat jeder Spieler beim Scrabble auf der Bank?", 7, [5, 6, 8, 9]],
  ["How many Infinity Stones are there in the Marvel films?", "¿Cuántas Gemas del Infinito hay en las películas de Marvel?", "Wie viele Infinity-Steine gibt es in den Marvel-Filmen?", 6, [4, 5, 7, 8]],
  ["How many dwarfs live with Snow White in the Disney film?", "¿Cuántos enanitos viven con Blancanieves en la película de Disney?", "Wie viele Zwerge leben im Disney-Film mit Schneewittchen zusammen?", 7, [5, 6, 8, 9]],
  ["How many Teenage Mutant Ninja Turtles are there?", "¿Cuántas Tortugas Ninja hay?", "Wie viele Teenage Mutant Ninja Turtles gibt es?", 4, [3, 5, 6]],
  ["How many members did the Spice Girls have?", "¿Cuántas integrantes tenían las Spice Girls?", "Wie viele Mitglieder hatten die Spice Girls?", 5, [3, 4, 6]],
  ["How many books are in the main Harry Potter series?", "¿Cuántos libros tiene la saga principal de Harry Potter?", "Wie viele Bände hat die Harry-Potter-Hauptreihe?", 7, [5, 6, 8, 9]],
  ["How many houses are there at Hogwarts?", "¿Cuántas casas hay en Hogwarts?", "Wie viele Häuser gibt es in Hogwarts?", 4, [3, 5, 6]],
  ["How many squares does a tic-tac-toe grid have?", "¿Cuántas casillas tiene el tablero del tres en raya?", "Wie viele Felder hat das Spielfeld bei Tic-Tac-Toe?", 9, [6, 8, 12, 16]],
  ["How many starter Pokémon can you choose from in Pokémon Red and Blue?", "¿Entre cuántos Pokémon iniciales puedes elegir en Pokémon Rojo y Azul?", "Zwischen wie vielen Starter-Pokémon kannst du in Pokémon Rot und Blau wählen?", 3, [2, 4, 5, 6]],
];

export const SPECIES: Record<string, L> = {
  meerkat: ["Meerkat", "Suricata", "Erdmännchen"], warthog: ["Warthog", "Facóquero", "Warzenschwein"], hornbill: ["Hornbill", "Cálao", "Nashornvogel"],
  bear: ["Bear", "Oso", "Bär"], panther: ["Black panther", "Pantera negra", "Schwarzer Panther"], snake: ["Snake", "Serpiente", "Schlange"],
  crab: ["Crab", "Cangrejo", "Krabbe"], fish: ["Fish", "Pez", "Fisch"], turtle: ["Sea turtle", "Tortuga marina", "Meeresschildkröte"], shark: ["Shark", "Tiburón", "Hai"],
  rat: ["Rat", "Rata", "Ratte"], dog: ["Dog", "Perro", "Hund"], chameleon: ["Chameleon", "Camaleón", "Chamäleon"], horse: ["Horse", "Caballo", "Pferd"],
  reindeer: ["Reindeer", "Reno", "Rentier"], monkey: ["Monkey", "Mono", "Affe"], tiger: ["Tiger", "Tigre", "Tiger"], parrot: ["Parrot", "Loro", "Papagei"],
  raccoon: ["Raccoon", "Mapache", "Waschbär"], dragon: ["Dragon", "Dragón", "Drache"], rooster: ["Rooster", "Gallo", "Hahn"], pig: ["Pig", "Cerdo", "Schwein"],
  rabbit: ["Rabbit", "Conejo", "Kaninchen"], skunk: ["Skunk", "Mofeta", "Stinktier"], sloth: ["Sloth", "Perezoso", "Faultier"], mammoth: ["Mammoth", "Mamut", "Mammut"],
  sabre: ["Sabre-toothed tiger", "Tigre dientes de sable", "Säbelzahntiger"], squirrel: ["Squirrel", "Ardilla", "Eichhörnchen"], donkey: ["Donkey", "Burro", "Esel"],
  fox: ["Fox", "Zorro", "Fuchs"], echidna: ["Echidna", "Equidna", "Ameisenigel"], dinosaur: ["Dinosaur", "Dinosaurio", "Dinosaurier"], cat: ["Cat", "Gato", "Katze"],
  mouse: ["Mouse", "Ratón", "Maus"], canary: ["Canary", "Canario", "Kanarienvogel"], platypus: ["Platypus", "Ornitorrinco", "Schnabeltier"],
  redpanda: ["Red panda", "Panda rojo", "Roter Panda"], lemur: ["Lemur", "Lémur", "Lemur"], hippo: ["Hippo", "Hipopótamo", "Nilpferd"],
  giraffe: ["Giraffe", "Jirafa", "Giraffe"], zebra: ["Zebra", "Cebra", "Zebra"], lion: ["Lion", "León", "Löwe"],
};
/** species that are too close to each other to be fair wrong answers */
export const SPECIES_CLOSE: [string, string][] = [["pig", "warthog"], ["tiger", "sabre"], ["monkey", "lemur"], ["tiger", "panther"], ["rat", "mouse"], ["fish", "shark"], ["raccoon", "redpanda"], ["dinosaur", "dragon"]];
export const TOON_WORKS: Record<string, L> = {
  lionking: ["The Lion King", "El rey león", "Der König der Löwen"], jungle: ["The Jungle Book", "El libro de la selva", "Das Dschungelbuch"],
  mermaid: ["The Little Mermaid", "La sirenita", "Arielle, die Meerjungfrau"], nemo: ["Finding Nemo", "Buscando a Nemo", "Findet Nemo"],
  ratatouille: ["Ratatouille", "Ratatouille", "Ratatouille"], up: ["Up", "Up", "Oben"], tangled: ["Tangled", "Enredados", "Rapunzel – Neu verföhnt"],
  frozen: ["Frozen", "Frozen", "Die Eiskönigin"], aladdin: ["Aladdin", "Aladdín", "Aladdin"], pocahontas: ["Pocahontas", "Pocahontas", "Pocahontas"],
  mulan: ["Mulan", "Mulán", "Mulan"], moana: ["Moana", "Vaiana", "Vaiana"], bambi: ["Bambi", "Bambi", "Bambi"], iceage: ["Ice Age", "Ice Age", "Ice Age"],
  pooh: ["Winnie the Pooh", "Winnie the Pooh", "Winnie Puuh"], wallace: ["Wallace & Gromit", "Wallace y Gromit", "Wallace & Gromit"],
  sonic: ["Sonic the Hedgehog", "Sonic the Hedgehog", "Sonic the Hedgehog"], mario: ["Super Mario", "Super Mario", "Super Mario"],
  dk: ["Donkey Kong", "Donkey Kong", "Donkey Kong"], tomjerry: ["Tom and Jerry", "Tom y Jerry", "Tom und Jerry"], looney: ["Looney Tunes", "Looney Tunes", "Looney Tunes"],
  peanuts: ["Peanuts", "Peanuts", "Die Peanuts"], phineas: ["Phineas and Ferb", "Phineas y Ferb", "Phineas und Ferb"], kfp: ["Kung Fu Panda", "Kung Fu Panda", "Kung Fu Panda"],
  madagascar: ["Madagascar", "Madagascar", "Madagascar"], zootopia: ["Zootopia", "Zootrópolis", "Zoomania"], guardians: ["Guardians of the Galaxy", "Guardianes de la Galaxia", "Guardians of the Galaxy"],
};
/** [character en, es, de, work, species] */
export const TOON_ANIMALS: [string, string, string, string, string][] = [
  ["Timon", "Timón", "Timon", "lionking", "meerkat"], ["Pumbaa", "Pumba", "Pumbaa", "lionking", "warthog"], ["Zazu", "Zazú", "Zazu", "lionking", "hornbill"],
  ["Baloo", "Baloo", "Balu", "jungle", "bear"], ["Bagheera", "Bagheera", "Baghira", "jungle", "panther"], ["Kaa", "Kaa", "Kaa", "jungle", "snake"],
  ["Sebastian", "Sebastián", "Sebastian", "mermaid", "crab"], ["Flounder", "Flounder", "Fabius", "mermaid", "fish"],
  ["Crush", "Crush", "Crush", "nemo", "turtle"], ["Bruce", "Bruce", "Bruce", "nemo", "shark"], ["Remy", "Remy", "Rémy", "ratatouille", "rat"],
  ["Dug", "Dug", "Dug", "up", "dog"], ["Pascal", "Pascal", "Pascal", "tangled", "chameleon"], ["Maximus", "Maximus", "Maximus", "tangled", "horse"],
  ["Sven", "Sven", "Sven", "frozen", "reindeer"], ["Abu", "Abu", "Abu", "aladdin", "monkey"], ["Rajah", "Rajah", "Radscha", "aladdin", "tiger"],
  ["Iago", "Iago", "Jago", "aladdin", "parrot"], ["Meeko", "Meeko", "Meeko", "pocahontas", "raccoon"], ["Mushu", "Mushu", "Mushu", "mulan", "dragon"],
  ["Heihei", "Heihei", "Heihei", "moana", "rooster"], ["Pua", "Pua", "Pua", "moana", "pig"], ["Thumper", "Tambor", "Klopfer", "bambi", "rabbit"],
  ["Flower", "Flor", "Blume", "bambi", "skunk"], ["Sid", "Sid", "Sid", "iceage", "sloth"], ["Manny", "Manny", "Manni", "iceage", "mammoth"],
  ["Diego", "Diego", "Diego", "iceage", "sabre"], ["Eeyore", "Ígor", "I-Aah", "pooh", "donkey"], ["Piglet", "Piglet", "Ferkel", "pooh", "pig"],
  ["Tigger", "Tigger", "Tigger", "pooh", "tiger"], ["Gromit", "Gromit", "Gromit", "wallace", "dog"], ["Tails", "Tails", "Tails", "sonic", "fox"],
  ["Knuckles", "Knuckles", "Knuckles", "sonic", "echidna"], ["Yoshi", "Yoshi", "Yoshi", "mario", "dinosaur"], ["Diddy Kong", "Diddy Kong", "Diddy Kong", "dk", "monkey"],
  ["Tom", "Tom", "Tom", "tomjerry", "cat"], ["Jerry", "Jerry", "Jerry", "tomjerry", "mouse"], ["Tweety", "Piolín", "Tweety", "looney", "canary"],
  ["Snoopy", "Snoopy", "Snoopy", "peanuts", "dog"], ["Perry", "Perry", "Perry", "phineas", "platypus"], ["Master Shifu", "Maestro Shifu", "Meister Shifu", "kfp", "redpanda"],
  ["King Julien", "Rey Julien", "King Julien", "madagascar", "lemur"], ["Gloria", "Gloria", "Gloria", "madagascar", "hippo"], ["Melman", "Melman", "Melman", "madagascar", "giraffe"],
  ["Marty", "Marty", "Marty", "madagascar", "zebra"], ["Alex", "Alex", "Alex", "madagascar", "lion"], ["Judy Hopps", "Judy Hopps", "Judy Hopps", "zootopia", "rabbit"],
  ["Nick Wilde", "Nick Wilde", "Nick Wilde", "zootopia", "fox"], ["Rocket", "Rocket", "Rocket", "guardians", "raccoon"],
];

export const PLACE_WORKS: Record<string, L> = {
  batman: ["Batman", "Batman", "Batman"], superman: ["Superman", "Superman", "Superman"], simpsons: ["The Simpsons", "Los Simpson", "Die Simpsons"],
  spongebob: ["SpongeBob SquarePants", "Bob Esponja", "SpongeBob Schwammkopf"], frozen: ["Frozen", "Frozen", "Die Eiskönigin"], aladdin: ["Aladdin", "Aladdín", "Aladdin"],
  peterpan: ["Peter Pan", "Peter Pan", "Peter Pan"], lotr: ["The Lord of the Rings", "El Señor de los Anillos", "Der Herr der Ringe"],
  hp: ["Harry Potter", "Harry Potter", "Harry Potter"], got: ["Game of Thrones", "Juego de tronos", "Game of Thrones"], mario: ["Super Mario", "Super Mario", "Super Mario"],
  zelda: ["The Legend of Zelda", "The Legend of Zelda", "The Legend of Zelda"], blackpanther: ["Black Panther", "Black Panther", "Black Panther"],
  starwars: ["Star Wars", "Star Wars", "Star Wars"], avatar: ["Avatar", "Avatar", "Avatar"], cars: ["Cars", "Cars", "Cars"],
  monsters: ["Monsters, Inc.", "Monstruos, S.A.", "Die Monster AG"], stranger: ["Stranger Things", "Stranger Things", "Stranger Things"],
  bttf: ["Back to the Future", "Regreso al futuro", "Zurück in die Zukunft"], shrek: ["Shrek", "Shrek", "Shrek"], pooh: ["Winnie the Pooh", "Winnie the Pooh", "Winnie Puuh"],
  donald: ["Donald Duck", "El Pato Donald", "Donald Duck"], lionking: ["The Lion King", "El rey león", "Der König der Löwen"],
  jurassic: ["Jurassic Park", "Jurassic Park", "Jurassic Park"], thomas: ["Thomas & Friends", "Thomas y sus amigos", "Thomas & seine Freunde"],
  pokemon: ["Pokémon", "Pokémon", "Pokémon"], gta: ["Grand Theft Auto", "Grand Theft Auto", "Grand Theft Auto"], oz: ["The Wizard of Oz", "El mago de Oz", "Der Zauberer von Oz"],
};
/** [place en, es, de, work] */
export const PLACES: [string, string, string, string][] = [
  ["Gotham City", "Gotham City", "Gotham City", "batman"], ["Metropolis", "Metrópolis", "Metropolis", "superman"], ["Krypton", "Krypton", "Krypton", "superman"],
  ["Springfield", "Springfield", "Springfield", "simpsons"], ["Bikini Bottom", "Fondo de Bikini", "Bikini Bottom", "spongebob"], ["Arendelle", "Arendelle", "Arendelle", "frozen"],
  ["Agrabah", "Agrabah", "Agrabah", "aladdin"], ["Neverland", "El País de Nunca Jamás", "Nimmerland", "peterpan"], ["Middle-earth", "La Tierra Media", "Mittelerde", "lotr"],
  ["Mordor", "Mordor", "Mordor", "lotr"], ["The Shire", "La Comarca", "Das Auenland", "lotr"], ["Diagon Alley", "El callejón Diagon", "Die Winkelgasse", "hp"],
  ["Hogsmeade", "Hogsmeade", "Hogsmeade", "hp"], ["Westeros", "Poniente", "Westeros", "got"], ["Winterfell", "Invernalia", "Winterfell", "got"],
  ["King's Landing", "Desembarco del Rey", "Königsmund", "got"], ["The Mushroom Kingdom", "El Reino Champiñón", "Das Pilz-Königreich", "mario"],
  ["Hyrule", "Hyrule", "Hyrule", "zelda"], ["Wakanda", "Wakanda", "Wakanda", "blackpanther"], ["Tatooine", "Tatooine", "Tatooine", "starwars"],
  ["Pandora", "Pandora", "Pandora", "avatar"], ["Radiator Springs", "Radiator Springs", "Radiator Springs", "cars"], ["Monstropolis", "Monstruópolis", "Monstropolis", "monsters"],
  ["Hawkins", "Hawkins", "Hawkins", "stranger"], ["Hill Valley", "Hill Valley", "Hill Valley", "bttf"], ["Far Far Away", "Muy Muy Lejano", "Weit Weit Weg", "shrek"],
  ["The Hundred Acre Wood", "El Bosque de los Cien Acres", "Der Hundertmorgenwald", "pooh"], ["Duckburg", "Patolandia", "Entenhausen", "donald"],
  ["Pride Rock", "La Roca del Rey", "Der Königsfelsen", "lionking"], ["Isla Nublar", "Isla Nublar", "Isla Nublar", "jurassic"], ["The Island of Sodor", "La isla de Sodor", "Die Insel Sodor", "thomas"],
  ["The Kanto region", "La región de Kanto", "Die Kanto-Region", "pokemon"], ["Los Santos", "Los Santos", "Los Santos", "gta"], ["The Emerald City", "La Ciudad Esmeralda", "Die Smaragdstadt", "oz"],
];

/** [theme park, country] */
export const THEME_PARKS: [string, string][] = [
  ["Disneyland Paris", "france"], ["Parc Astérix", "france"], ["Puy du Fou", "france"], ["Futuroscope", "france"], ["Europa-Park", "germany"],
  ["Phantasialand", "germany"], ["Heide Park", "germany"], ["PortAventura", "spain"], ["Terra Mítica", "spain"], ["Efteling", "netherlands"],
  ["Toverland", "netherlands"], ["Tivoli Gardens", "denmark"], ["Legoland Billund", "denmark"], ["Bakken", "denmark"], ["Gardaland", "italy"],
  ["Mirabilandia", "italy"], ["Walt Disney World", "usa"], ["Cedar Point", "usa"], ["Dollywood", "usa"], ["Knott's Berry Farm", "usa"],
  ["Liseberg", "sweden"], ["Gröna Lund", "sweden"], ["Alton Towers", "uk"], ["Thorpe Park", "uk"], ["Blackpool Pleasure Beach", "uk"],
  ["Plopsaland", "belgium"], ["Prater", "austria"], ["Everland", "south_korea"], ["Lotte World", "south_korea"], ["Beto Carrero World", "brazil"],
  ["Ferrari World", "uae"], ["Dreamworld", "australia"], ["Energylandia", "poland"], ["Linnanmäki", "finland"], ["Särkänniemi", "finland"],
];

export const CITIES_L: Record<string, L> = {
  new_york: ["New York", "Nueva York", "New York"], paris: ["Paris", "París", "Paris"], london: ["London", "Londres", "London"],
  los_angeles: ["Los Angeles", "Los Ángeles", "Los Angeles"], san_francisco: ["San Francisco", "San Francisco", "San Francisco"],
  las_vegas: ["Las Vegas", "Las Vegas", "Las Vegas"], miami: ["Miami", "Miami", "Miami"], chicago: ["Chicago", "Chicago", "Chicago"],
  boston: ["Boston", "Boston", "Boston"], seattle: ["Seattle", "Seattle", "Seattle"], madrid: ["Madrid", "Madrid", "Madrid"], rome: ["Rome", "Roma", "Rom"],
  tokyo: ["Tokyo", "Tokio", "Tokio"], mumbai: ["Mumbai", "Bombay", "Mumbai"], philadelphia: ["Philadelphia", "Filadelfia", "Philadelphia"],
  toronto: ["Toronto", "Toronto", "Toronto"], baltimore: ["Baltimore", "Baltimore", "Baltimore"], albuquerque: ["Albuquerque", "Albuquerque", "Albuquerque"],
  pasadena: ["Pasadena", "Pasadena", "Pasadena"], birmingham: ["Birmingham", "Birmingham", "Birmingham"], berlin: ["Berlin", "Berlín", "Berlin"],
  vienna: ["Vienna", "Viena", "Wien"],
};
/** [title en, es, de, "f"ilm or "s"eries, city] */
export const SETTINGS: [string, string, string, "f" | "s", string][] = [
  ["Friends", "Friends", "Friends", "s", "new_york"],
  ["Gossip Girl", "Gossip Girl", "Gossip Girl", "s", "new_york"], ["Ghostbusters (1984)", "Cazafantasmas (1984)", "Ghostbusters – Die Geisterjäger (1984)", "f", "new_york"],
  ["Taxi Driver", "Taxi Driver", "Taxi Driver", "f", "new_york"], ["The Devil Wears Prada", "El diablo viste de Prada", "Der Teufel trägt Prada", "f", "new_york"],
  ["Breaking Bad", "Breaking Bad", "Breaking Bad", "s", "albuquerque"], ["The Big Bang Theory", "The Big Bang Theory", "The Big Bang Theory", "s", "pasadena"],
  ["Grey's Anatomy", "Anatomía de Grey", "Grey's Anatomy", "s", "seattle"], ["Frasier", "Frasier", "Frasier", "s", "seattle"],
  ["Money Heist", "La casa de papel", "Haus des Geldes", "s", "madrid"], ["Peaky Blinders", "Peaky Blinders", "Peaky Blinders", "s", "birmingham"],
  ["Sherlock (BBC)", "Sherlock (BBC)", "Sherlock (BBC)", "s", "london"], ["Notting Hill", "Notting Hill", "Notting Hill", "f", "london"],
  ["Paddington", "Paddington", "Paddington", "f", "london"], ["Mary Poppins", "Mary Poppins", "Mary Poppins", "f", "london"],
  ["Ratatouille", "Ratatouille", "Ratatouille", "f", "paris"], ["Amélie", "Amélie", "Die fabelhafte Welt der Amélie", "f", "paris"],
  ["The Aristocats", "Los aristogatos", "Aristocats", "f", "paris"], ["Lupin", "Lupin", "Lupin", "s", "paris"], ["Rocky", "Rocky", "Rocky", "f", "philadelphia"],
  ["Slumdog Millionaire", "Slumdog Millionaire", "Slumdog Millionär", "f", "mumbai"],
  ["Lost in Translation", "Lost in Translation", "Lost in Translation – Zwischen den Welten", "f", "tokyo"], ["Turning Red", "Red", "Rot", "f", "toronto"],
  ["Inside Out", "Del revés", "Alles steht Kopf", "f", "san_francisco"], ["Mrs. Doubtfire", "Señora Doubtfire, papá de por vida", "Mrs. Doubtfire – Das stachelige Kindermädchen", "f", "san_francisco"],
  ["Cheers", "Cheers", "Cheers", "s", "boston"], ["Dexter", "Dexter", "Dexter", "s", "miami"], ["The Wire", "The Wire", "The Wire", "s", "baltimore"],
  ["The Bear", "The Bear", "The Bear", "s", "chicago"], ["The Blues Brothers", "Granujas a todo ritmo", "Blues Brothers", "f", "chicago"],
  ["Ocean's Eleven (2001)", "Ocean's Eleven (2001)", "Ocean's Eleven (2001)", "f", "las_vegas"], ["La La Land", "La La Land", "La La Land", "f", "los_angeles"],
  ["The Fresh Prince of Bel-Air", "El príncipe de Bel-Air", "Der Prinz von Bel-Air", "s", "los_angeles"], ["La Dolce Vita", "La dolce vita", "Das süße Leben", "f", "rome"],
  ["Good Bye, Lenin!", "Good Bye, Lenin!", "Good Bye, Lenin!", "f", "berlin"], ["Run Lola Run", "Corre, Lola, corre", "Lola rennt", "f", "berlin"],
  ["The Third Man", "El tercer hombre", "Der dritte Mann", "f", "vienna"],
];

/** [nickname en, es, de, artist] */
export const NICKNAMES: [string, string, string, string][] = [
  ["King of Pop", "Rey del Pop", "King of Pop", "Michael Jackson"], ["Queen of Pop", "Reina del Pop", "Queen of Pop", "Madonna"],
  ["King of Rock and Roll", "Rey del Rock and Roll", "King of Rock ’n’ Roll", "Elvis Presley"], ["The Boss", "The Boss", "The Boss", "Bruce Springsteen"],
  ["Queen of Soul", "Reina del Soul", "Queen of Soul", "Aretha Franklin"], ["Godfather of Soul", "Padrino del Soul", "Godfather of Soul", "James Brown"],
  ["Queen of Salsa", "Reina de la Salsa", "Königin des Salsa", "Celia Cruz"], ["Queen of Disco", "Reina de la Música Disco", "Queen of Disco", "Donna Summer"],
  ["Ol' Blue Eyes", "Ol' Blue Eyes", "Ol' Blue Eyes", "Frank Sinatra"], ["The Man in Black", "El Hombre de Negro", "The Man in Black", "Johnny Cash"],
  ["Slim Shady", "Slim Shady", "Slim Shady", "Eminem"], ["Ziggy Stardust", "Ziggy Stardust", "Ziggy Stardust", "David Bowie"],
  ["Sasha Fierce", "Sasha Fierce", "Sasha Fierce", "Beyoncé"], ["Mother Monster", "Mother Monster", "Mother Monster", "Lady Gaga"],
  ["Satchmo", "Satchmo", "Satchmo", "Louis Armstrong"], ["The Piano Man", "The Piano Man", "The Piano Man", "Billy Joel"],
];
/** [birth name, stage name] */
export const STAGE_NAMES: [string, string][] = [
  ["Stefani Germanotta", "Lady Gaga"], ["Peter Gene Hernandez", "Bruno Mars"], ["Reginald Dwight", "Elton John"], ["Farrokh Bulsara", "Freddie Mercury"],
  ["Gordon Sumner", "Sting"], ["Paul Hewson", "Bono"], ["Marshall Mathers", "Eminem"], ["Robyn Fenty", "Rihanna"], ["Katheryn Hudson", "Katy Perry"],
  ["Calvin Broadus", "Snoop Dogg"], ["Aubrey Graham", "Drake"], ["David Jones", "David Bowie"], ["Robert Zimmerman", "Bob Dylan"],
  ["Shawn Carter", "Jay-Z"], ["Curtis Jackson", "50 Cent"], ["Richard Starkey", "Ringo Starr"], ["Norma Jeane Mortenson", "Marilyn Monroe"],
  ["Ella Yelich-O'Connor", "Lorde"], ["Paul Van Haver", "Stromae"], ["Abel Tesfaye", "The Weeknd"], ["Onika Maraj", "Nicki Minaj"],
  ["Carolina Giraldo Navarro", "Karol G"],
];

/** Star Wars saga films [en, es, de, release year] */
export const STAR_WARS: [string, string, string, number][] = [
  ["Star Wars: A New Hope", "Star Wars: Una nueva esperanza", "Star Wars: Eine neue Hoffnung", 1977],
  ["Star Wars: The Empire Strikes Back", "Star Wars: El Imperio contraataca", "Star Wars: Das Imperium schlägt zurück", 1980],
  ["Star Wars: Return of the Jedi", "Star Wars: El retorno del Jedi", "Star Wars: Die Rückkehr der Jedi-Ritter", 1983],
  ["Star Wars: The Phantom Menace", "Star Wars: La amenaza fantasma", "Star Wars: Die dunkle Bedrohung", 1999],
  ["Star Wars: Attack of the Clones", "Star Wars: El ataque de los clones", "Star Wars: Angriff der Klonkrieger", 2002],
  ["Star Wars: Revenge of the Sith", "Star Wars: La venganza de los Sith", "Star Wars: Die Rache der Sith", 2005],
  ["Star Wars: The Force Awakens", "Star Wars: El despertar de la Fuerza", "Star Wars: Das Erwachen der Macht", 2015],
  ["Star Wars: The Last Jedi", "Star Wars: Los últimos Jedi", "Star Wars: Die letzten Jedi", 2017],
  ["Star Wars: The Rise of Skywalker", "Star Wars: El ascenso de Skywalker", "Star Wars: Der Aufstieg Skywalkers", 2019],
];
/** Disney & Pixar animated films [en, es, de, year] */
export const ANIMATED_YEARS: [string, string, string, number][] = [
  ["Snow White and the Seven Dwarfs", "Blancanieves y los siete enanitos", "Schneewittchen und die sieben Zwerge", 1937], ["Pinocchio", "Pinocho", "Pinocchio", 1940],
  ["Dumbo", "Dumbo", "Dumbo", 1941], ["Bambi", "Bambi", "Bambi", 1942], ["Cinderella", "La Cenicienta", "Cinderella", 1950], ["Peter Pan", "Peter Pan", "Peter Pan", 1953],
  ["Lady and the Tramp", "La dama y el vagabundo", "Susi und Strolch", 1955], ["Sleeping Beauty", "La bella durmiente", "Dornröschen", 1959],
  ["101 Dalmatians", "101 dálmatas", "101 Dalmatiner", 1961], ["The Jungle Book", "El libro de la selva", "Das Dschungelbuch", 1967],
  ["The Aristocats", "Los aristogatos", "Aristocats", 1970], ["Robin Hood", "Robin Hood", "Robin Hood", 1973],
  ["The Little Mermaid", "La sirenita", "Arielle, die Meerjungfrau", 1989], ["Beauty and the Beast", "La bella y la bestia", "Die Schöne und das Biest", 1991],
  ["Aladdin", "Aladdín", "Aladdin", 1992], ["The Lion King", "El rey león", "Der König der Löwen", 1994], ["Toy Story", "Toy Story", "Toy Story", 1995],
  ["Mulan", "Mulán", "Mulan", 1998], ["Monsters, Inc.", "Monstruos, S.A.", "Die Monster AG", 2001], ["Finding Nemo", "Buscando a Nemo", "Findet Nemo", 2003],
  ["The Incredibles", "Los increíbles", "Die Unglaublichen", 2004], ["Cars", "Cars", "Cars", 2006], ["Ratatouille", "Ratatouille", "Ratatouille", 2007],
  ["WALL-E", "WALL-E", "WALL·E", 2008], ["Up", "Up", "Oben", 2009], ["Tangled", "Enredados", "Rapunzel – Neu verföhnt", 2010],
  ["Frozen", "Frozen: El reino del hielo", "Die Eiskönigin – Völlig unverfroren", 2013], ["Inside Out", "Del revés", "Alles steht Kopf", 2015],
  ["Coco", "Coco", "Coco", 2017], ["Encanto", "Encanto", "Encanto", 2021],
];
