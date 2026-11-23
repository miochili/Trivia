import type { L } from "../generate";
import type { Difficulty } from "../../../../src/shared/types";

type D = Difficulty;

/** Hand-written questions: [stem, question, right, wrong options (≥3), difficulty] */
export type Fact = [string, L, L, L[], D];

// ═══ space ═════════════════════════════════════════════════════════
/** National space agencies: [acronym/name, country id, difficulty] */
export const AGENCIES: [string, string, D][] = [
  ["NASA", "usa", "easy"],
  ["Roscosmos", "russia", "easy"],
  ["JAXA", "japan", "medium"],
  ["ISRO", "india", "medium"],
  ["CNSA", "china", "medium"],
  ["CNES", "france", "hard"],
  ["DLR", "germany", "hard"],
  ["ASI", "italy", "hard"],
  ["CSA", "canada", "hard"],
  ["AEB", "brazil", "hard"],
  ["CONAE", "argentina", "hard"],
];

/** Spacecraft and missions: id, name, description (noun phrase, lower case), difficulty */
export const MISSIONS: { id: string; name: L; desc: L; d: D }[] = [
  { id: "sojourner", name: ["Sojourner", "Sojourner", "Sojourner"], d: "hard",
    desc: ["the first rover to drive on Mars (1997)", "el primer rover que recorrió Marte (1997)", "der erste Rover, der auf dem Mars fuhr (1997)"] },
  { id: "lunokhod", name: ["Lunokhod 1", "Lunojod 1", "Lunochod 1"], d: "hard",
    desc: ["the first rover to drive on the Moon (1970)", "el primer rover que recorrió la Luna (1970)", "der erste Rover, der auf dem Mond fuhr (1970)"] },
  { id: "apollo11", name: ["Apollo 11", "Apolo 11", "Apollo 11"], d: "easy",
    desc: ["the first crewed landing on the Moon (1969)", "el primer alunizaje tripulado (1969)", "die erste bemannte Mondlandung (1969)"] },
  { id: "apollo13", name: ["Apollo 13", "Apolo 13", "Apollo 13"], d: "medium",
    desc: ["a Moon mission whose landing was called off after an oxygen tank exploded – the crew returned safely (1970)", "una misión lunar que tuvo que renunciar al alunizaje tras la explosión de un tanque de oxígeno; la tripulación volvió sana y salva (1970)", "eine Mondmission, deren Landung nach der Explosion eines Sauerstofftanks abgesagt wurde – die Crew kehrte sicher zurück (1970)"] },
  { id: "vostok1", name: ["Vostok 1", "Vostok 1", "Wostok 1"], d: "medium",
    desc: ["the flight on which Yuri Gagarin became the first human in space (1961)", "el vuelo en el que Yuri Gagarin se convirtió en el primer ser humano en el espacio (1961)", "der Flug, mit dem Juri Gagarin als erster Mensch ins All flog (1961)"] },
  { id: "voyager1", name: ["Voyager 1", "Voyager 1", "Voyager 1"], d: "medium",
    desc: ["the human-made object that has travelled farthest from Earth", "el objeto fabricado por el ser humano que más se ha alejado de la Tierra", "das von Menschen gebaute Objekt, das sich am weitesten von der Erde entfernt hat"] },
  { id: "newhorizons", name: ["New Horizons", "New Horizons", "New Horizons"], d: "medium",
    desc: ["the first spacecraft to fly past Pluto (2015)", "la primera sonda que sobrevoló Plutón (2015)", "die erste Raumsonde, die an Pluto vorbeiflog (2015)"] },
  { id: "rosetta", name: ["Rosetta", "Rosetta", "Rosetta"], d: "hard",
    desc: ["the first spacecraft to orbit a comet and set down a lander on it (2014)", "la primera sonda que orbitó un cometa y posó en él un módulo de aterrizaje (2014)", "die erste Raumsonde, die einen Kometen umkreiste und einen Lander auf ihm absetzte (2014)"] },
  { id: "cassini", name: ["Cassini–Huygens", "Cassini-Huygens", "Cassini-Huygens"], d: "hard",
    desc: ["a probe that explored Saturn for 13 years and dropped a lander onto its moon Titan", "una sonda que exploró Saturno durante 13 años y dejó caer un módulo de aterrizaje sobre su luna Titán", "eine Sonde, die 13 Jahre lang den Saturn erforschte und eine Landesonde auf seinem Mond Titan absetzte"] },
  { id: "ingenuity", name: ["Ingenuity", "Ingenuity", "Ingenuity"], d: "medium",
    desc: ["the first powered, controlled flight on another planet – a small helicopter on Mars (2021)", "el primer vuelo propulsado y controlado en otro planeta: un pequeño helicóptero en Marte (2021)", "der erste angetriebene, gesteuerte Flug auf einem anderen Planeten – ein kleiner Hubschrauber auf dem Mars (2021)"] },
  { id: "perseverance", name: ["Perseverance", "Perseverance", "Perseverance"], d: "hard",
    desc: ["a Mars rover that landed in Jezero Crater in 2021 and collects rock samples", "un rover que se posó en el cráter Jezero de Marte en 2021 y recoge muestras de roca", "ein Marsrover, der 2021 im Krater Jezero landete und Gesteinsproben sammelt"] },
  { id: "curiosity", name: ["Curiosity", "Curiosity", "Curiosity"], d: "hard",
    desc: ["a car-sized Mars rover that landed in Gale Crater in 2012", "un rover del tamaño de un coche que se posó en el cráter Gale de Marte en 2012", "ein autogroßer Marsrover, der 2012 im Gale-Krater landete"] },
  { id: "hubble", name: ["Hubble Space Telescope", "Telescopio espacial Hubble", "Hubble-Weltraumteleskop"], d: "easy",
    desc: ["a space telescope that astronauts visited and repaired several times in orbit", "un telescopio espacial que los astronautas visitaron y repararon varias veces en órbita", "ein Weltraumteleskop, das Astronauten mehrmals im Orbit besuchten und reparierten"] },
  { id: "webb", name: ["James Webb Space Telescope", "Telescopio espacial James Webb", "James-Webb-Weltraumteleskop"], d: "medium",
    desc: ["a huge infrared space telescope with a folding, gold-coated mirror", "un enorme telescopio espacial infrarrojo con un espejo plegable recubierto de oro", "ein riesiges Infrarot-Weltraumteleskop mit einem faltbaren, vergoldeten Spiegel"] },
  { id: "kepler", name: ["Kepler Space Telescope", "Telescopio espacial Kepler", "Kepler-Weltraumteleskop"], d: "medium",
    desc: ["a space telescope that discovered thousands of planets around other stars", "un telescopio espacial que descubrió miles de planetas alrededor de otras estrellas", "ein Weltraumteleskop, das Tausende Planeten bei anderen Sternen entdeckte"] },
  { id: "hayabusa", name: ["Hayabusa", "Hayabusa", "Hayabusa"], d: "hard",
    desc: ["the first mission to bring samples of an asteroid back to Earth (2010)", "la primera misión que trajo a la Tierra muestras de un asteroide (2010)", "die erste Mission, die Proben eines Asteroiden zur Erde brachte (2010)"] },
  { id: "parker", name: ["Parker Solar Probe", "Sonda solar Parker", "Parker Solar Probe"], d: "medium",
    desc: ["the spacecraft that has flown closer to the Sun than any other", "la nave que más se ha acercado al Sol", "die Raumsonde, die der Sonne näher gekommen ist als jede andere"] },
  { id: "skylab", name: ["Skylab", "Skylab", "Skylab"], d: "hard",
    desc: ["the first space station of the United States (1973)", "la primera estación espacial de Estados Unidos (1973)", "die erste Raumstation der USA (1973)"] },
  { id: "mir", name: ["Mir", "Mir", "Mir"], d: "medium",
    desc: ["a Soviet and later Russian space station in orbit from 1986 to 2001", "una estación espacial soviética y luego rusa, en órbita de 1986 a 2001", "eine sowjetische, später russische Raumstation, die von 1986 bis 2001 im Orbit war"] },
  { id: "iss", name: ["International Space Station (ISS)", "Estación Espacial Internacional (EEI)", "Internationale Raumstation (ISS)"], d: "easy",
    desc: ["a space station built by several space agencies and lived in without a break since 2000", "una estación espacial construida por varias agencias y habitada sin interrupción desde 2000", "eine von mehreren Raumfahrtagenturen gebaute Station, die seit 2000 ununterbrochen bewohnt ist"] },
  { id: "luna2", name: ["Luna 2", "Luna 2", "Lunik 2"], d: "hard",
    desc: ["the first spacecraft to reach the surface of the Moon – by crashing into it (1959)", "la primera nave que llegó a la superficie de la Luna, estrellándose contra ella (1959)", "die erste Sonde, die die Mondoberfläche erreichte – durch einen Aufprall (1959)"] },
  { id: "venera7", name: ["Venera 7", "Venera 7", "Venera 7"], d: "hard",
    desc: ["the first probe to send data from the surface of another planet – Venus (1970)", "la primera sonda que envió datos desde la superficie de otro planeta: Venus (1970)", "die erste Sonde, die Daten von der Oberfläche eines anderen Planeten sendete – der Venus (1970)"] },
  { id: "juno", name: ["Juno", "Juno", "Juno"], d: "hard",
    desc: ["a probe that has been orbiting Jupiter since 2016", "una sonda que orbita Júpiter desde 2016", "eine Sonde, die seit 2016 den Jupiter umkreist"] },
];

/** Astronauts: [name, female?, country id, difficulty] */
export const ASTRONAUTS: [string, boolean, string, D][] = [
  ["Neil Armstrong", false, "usa", "easy"],
  ["Sally Ride", true, "usa", "medium"],
  ["Chris Hadfield", false, "canada", "medium"],
  ["Thomas Pesquet", false, "france", "medium"],
  ["Claudie Haigneré", true, "france", "hard"],
  ["Samantha Cristoforetti", true, "italy", "medium"],
  ["Luca Parmitano", false, "italy", "hard"],
  ["Alexander Gerst", false, "germany", "medium"],
  ["Matthias Maurer", false, "germany", "hard"],
  ["Tim Peake", false, "uk", "medium"],
  ["Helen Sharman", true, "uk", "hard"],
  ["Pedro Duque", false, "spain", "medium"],
  ["Yang Liwei", false, "china", "medium"],
  ["Wang Yaping", true, "china", "hard"],
  ["Rakesh Sharma", false, "india", "hard"],
  ["Koichi Wakata", false, "japan", "hard"],
  ["Soichi Noguchi", false, "japan", "hard"],
  ["Marcos Pontes", false, "brazil", "hard"],
  ["André Kuipers", false, "netherlands", "hard"],
  ["Frank De Winne", false, "belgium", "hard"],
  ["Christer Fuglesang", false, "sweden", "hard"],
  ["Andreas Mogensen", false, "denmark", "hard"],
  ["Rodolfo Neri Vela", false, "mexico", "hard"],
  ["Arnaldo Tamayo Méndez", false, "cuba", "hard"],
  ["Franz Viehböck", false, "austria", "hard"],
  ["Hazzaa Al Mansoori", false, "uae", "hard"],
  ["Mirosław Hermaszewski", false, "poland", "hard"],
  ["Bertalan Farkas", false, "hungary", "hard"],
];

const URSA_MAJOR: L = ["Ursa Major (Great Bear)", "Osa Mayor", "Großer Bär"];
const URSA_MINOR: L = ["Ursa Minor (Little Bear)", "Osa Menor", "Kleiner Bär"];
const ORION: L = ["Orion", "Orión", "Orion"];
const CASSIOPEIA: L = ["Cassiopeia", "Casiopea", "Kassiopeia"];
const LEO: L = ["Leo", "Leo", "Löwe"];
const CYGNUS: L = ["Cygnus (Swan)", "Cisne", "Schwan"];
const LYRA: L = ["Lyra", "Lira", "Leier"];
const SCORPIUS: L = ["Scorpius", "Escorpio", "Skorpion"];
const TAURUS: L = ["Taurus", "Tauro", "Stier"];
const CANIS_MAJOR: L = ["Canis Major (Great Dog)", "Can Mayor", "Großer Hund"];
const CRUX: L = ["Southern Cross (Crux)", "Cruz del Sur", "Kreuz des Südens"];
const AQUILA: L = ["Aquila (Eagle)", "Águila", "Adler"];
const DRACO: L = ["Draco (Dragon)", "Dragón", "Drache"];
const CENTAURUS: L = ["Centaurus", "Centauro", "Zentaur"];

export const CONSTELLATIONS: Fact[] = [
  ["dipper", ["Which constellation does the Big Dipper (the Plough) belong to?", "¿De qué constelación forma parte el Carro, el famoso grupo de siete estrellas?", "Zu welchem Sternbild gehört der Große Wagen?"],
    URSA_MAJOR, [URSA_MINOR, CASSIOPEIA, ORION, LEO, CYGNUS], "easy"],
  ["polaris", ["Which constellation does Polaris, the North Star, belong to?", "¿De qué constelación forma parte la estrella Polar?", "Zu welchem Sternbild gehört der Polarstern?"],
    URSA_MINOR, [URSA_MAJOR, CASSIOPEIA, ORION, DRACO, LYRA], "medium"],
  ["sirius", ["Which constellation does Sirius, the brightest star in the night sky, belong to?", "¿De qué constelación forma parte Sirio, la estrella más brillante del cielo nocturno?", "Zu welchem Sternbild gehört Sirius, der hellste Stern am Nachthimmel?"],
    CANIS_MAJOR, [ORION, TAURUS, LYRA, URSA_MAJOR, SCORPIUS], "hard"],
  ["belt", ["Which constellation has three bright stars in a row known as its “belt”?", "¿Qué constelación tiene tres estrellas brillantes en fila conocidas como su «cinturón»?", "Welches Sternbild hat drei helle Sterne in einer Reihe, die man seinen „Gürtel“ nennt?"],
    ORION, [CASSIOPEIA, LEO, CYGNUS, SCORPIUS, URSA_MAJOR], "easy"],
  ["w-shape", ["Which constellation looks like a large letter W (or M)?", "¿Qué constelación parece una gran letra W (o M)?", "Welches Sternbild sieht aus wie ein großes W (oder M)?"],
    CASSIOPEIA, [ORION, CYGNUS, LEO, LYRA, TAURUS], "medium"],
  ["flags", ["Which constellation appears on the flags of Australia and New Zealand?", "¿Qué constelación aparece en las banderas de Australia y Nueva Zelanda?", "Welches Sternbild ist auf den Flaggen Australiens und Neuseelands zu sehen?"],
    CRUX, [ORION, CASSIOPEIA, URSA_MINOR, CENTAURUS, SCORPIUS], "medium"],
  ["vega", ["Which constellation does the bright star Vega belong to?", "¿De qué constelación forma parte la brillante estrella Vega?", "Zu welchem Sternbild gehört der helle Stern Wega?"],
    LYRA, [CYGNUS, AQUILA, ORION, TAURUS, LEO], "hard"],
  ["antares", ["The red star Antares is the “heart” of which constellation?", "La estrella roja Antares es el «corazón» de qué constelación?", "Der rote Stern Antares ist das „Herz“ welches Sternbilds?"],
    SCORPIUS, [LEO, TAURUS, ORION, LYRA, CYGNUS], "hard"],
  ["pleiades", ["Which constellation contains the star cluster of the Pleiades (the Seven Sisters)?", "¿En qué constelación se encuentra el cúmulo de las Pléyades (las Siete Hermanas)?", "In welchem Sternbild liegt der Sternhaufen der Plejaden (Siebengestirn)?"],
    TAURUS, [ORION, LEO, CASSIOPEIA, SCORPIUS, URSA_MINOR], "hard"],
  ["northern-cross", ["Which constellation is also known as the Northern Cross?", "¿Qué constelación se conoce también como la Cruz del Norte?", "Welches Sternbild wird auch Kreuz des Nordens genannt?"],
    CYGNUS, [CRUX, AQUILA, LYRA, ORION, CASSIOPEIA], "hard"],
  ["regulus", ["Which zodiac constellation does the star Regulus belong to?", "¿De qué constelación del zodiaco forma parte la estrella Régulo?", "Zu welchem Tierkreissternbild gehört der Stern Regulus?"],
    LEO, [TAURUS, SCORPIUS, ORION, LYRA, CYGNUS], "hard"],
  ["count", ["How many constellations are officially recognised by astronomers today?", "¿Cuántas constelaciones reconocen oficialmente hoy los astrónomos?", "Wie viele Sternbilder sind heute von Astronomen offiziell anerkannt?"],
    ["88", "88", "88"], [["12", "12", "12"], ["24", "24", "24"], ["150", "150", "150"], ["365", "365", "365"]], "hard"],
];

// ═══ Earth ═════════════════════════════════════════════════════════
const CRUST: L = ["Crust", "Corteza", "Erdkruste"];
const MANTLE: L = ["Mantle", "Manto", "Erdmantel"];
const OUTER_CORE: L = ["Outer core", "Núcleo externo", "Äußerer Erdkern"];
const INNER_CORE: L = ["Inner core", "Núcleo interno", "Innerer Erdkern"];
const EARTH4 = [CRUST, MANTLE, OUTER_CORE, INNER_CORE];
const without = (all: L[], x: L) => all.filter((y) => y !== x);
const TROPO: L = ["Troposphere", "Troposfera", "Troposphäre"];
const STRATO: L = ["Stratosphere", "Estratosfera", "Stratosphäre"];
const MESO: L = ["Mesosphere", "Mesosfera", "Mesosphäre"];
const THERMO: L = ["Thermosphere", "Termosfera", "Thermosphäre"];
const EXO: L = ["Exosphere", "Exosfera", "Exosphäre"];
const ATMO5 = [TROPO, STRATO, MESO, THERMO, EXO];

export const LAYERS: Fact[] = [
  ["liquid", ["Which layer of the Earth is made of liquid metal?", "¿Qué capa de la Tierra está formada por metal líquido?", "Welche Schicht der Erde besteht aus flüssigem Metall?"], OUTER_CORE, without(EARTH4, OUTER_CORE), "medium"],
  ["centre", ["Which layer is at the very centre of the Earth?", "¿Qué capa está en el centro mismo de la Tierra?", "Welche Schicht liegt im Mittelpunkt der Erde?"], INNER_CORE, without(EARTH4, INNER_CORE), "easy"],
  ["thickest", ["Which is the thickest layer of the Earth?", "¿Cuál es la capa más gruesa de la Tierra?", "Welche ist die dickste Schicht der Erde?"], MANTLE, without(EARTH4, MANTLE), "medium"],
  ["thinnest", ["Which is the thinnest layer of the Earth?", "¿Cuál es la capa más delgada de la Tierra?", "Welche ist die dünnste Schicht der Erde?"], CRUST, without(EARTH4, CRUST), "easy"],
  ["field", ["Moving liquid iron in which layer creates the Earth's magnetic field?", "¿El movimiento del hierro líquido de qué capa crea el campo magnético terrestre?", "Bewegtes flüssiges Eisen in welcher Schicht erzeugt das Magnetfeld der Erde?"], OUTER_CORE, without(EARTH4, OUTER_CORE), "hard"],
  ["below-crust", ["Which layer of the Earth lies directly beneath the crust?", "¿Qué capa de la Tierra está justo debajo de la corteza?", "Welche Schicht der Erde liegt direkt unter der Erdkruste?"], MANTLE, without(EARTH4, MANTLE), "medium"],
  ["solid-metal", ["Which layer of the Earth is a solid ball of iron and nickel, despite being extremely hot?", "¿Qué capa de la Tierra es una bola sólida de hierro y níquel, a pesar de estar muy caliente?", "Welche Schicht der Erde ist trotz enormer Hitze eine feste Kugel aus Eisen und Nickel?"], INNER_CORE, without(EARTH4, INNER_CORE), "medium"],
  ["weather", ["In which layer of the atmosphere does almost all our weather happen?", "¿En qué capa de la atmósfera ocurre casi todo el tiempo meteorológico?", "In welcher Schicht der Atmosphäre spielt sich fast das ganze Wetter ab?"], TROPO, without(ATMO5, TROPO), "medium"],
  ["ozone", ["Which layer of the atmosphere contains the ozone layer?", "¿Qué capa de la atmósfera contiene la capa de ozono?", "Welche Schicht der Atmosphäre enthält die Ozonschicht?"], STRATO, without(ATMO5, STRATO), "medium"],
  ["meteors", ["In which layer of the atmosphere do most meteors burn up?", "¿En qué capa de la atmósfera se queman la mayoría de los meteoros?", "In welcher Schicht der Atmosphäre verglühen die meisten Meteore?"], MESO, without(ATMO5, MESO), "hard"],
  ["iss", ["In which layer of the atmosphere does the International Space Station orbit?", "¿En qué capa de la atmósfera orbita la Estación Espacial Internacional?", "In welcher Schicht der Atmosphäre kreist die Internationale Raumstation?"], THERMO, without(ATMO5, THERMO), "hard"],
  ["outermost", ["Which is the outermost layer of the Earth's atmosphere?", "¿Cuál es la capa más externa de la atmósfera terrestre?", "Welche ist die äußerste Schicht der Erdatmosphäre?"], EXO, without(ATMO5, EXO), "hard"],
  ["lowest", ["Which is the lowest layer of the atmosphere, the one we live in?", "¿Cuál es la capa más baja de la atmósfera, en la que vivimos?", "Welche ist die unterste Schicht der Atmosphäre, in der wir leben?"], TROPO, without(ATMO5, TROPO), "medium"],
  ["everest", ["In which layer of the atmosphere is the summit of Mount Everest?", "¿En qué capa de la atmósfera se encuentra la cima del Everest?", "In welcher Schicht der Atmosphäre liegt der Gipfel des Mount Everest?"], TROPO, without(ATMO5, TROPO), "hard"],
];

const PLATE_MOVES: L[] = [
  ["They slide past each other sideways", "Se deslizan lateralmente una junto a la otra", "Sie gleiten seitlich aneinander vorbei"],
  ["They move apart", "Se separan", "Sie bewegen sich auseinander"],
  ["They collide head-on and fold up mountains", "Chocan de frente y forman montañas", "Sie stoßen frontal zusammen und falten Gebirge auf"],
  ["One sinks beneath the other", "Una se hunde bajo la otra", "Eine taucht unter die andere ab"],
];
export const GEOLOGY: Fact[] = [
  ["pangaea", ["What was the name of the giant supercontinent that existed about 300 million years ago?", "¿Cómo se llamaba el gigantesco supercontinente que existía hace unos 300 millones de años?", "Wie hieß der riesige Superkontinent, der vor etwa 300 Millionen Jahren existierte?"],
    ["Pangaea", "Pangea", "Pangäa"], [["Atlantis", "Atlántida", "Atlantis"], ["Lemuria", "Lemuria", "Lemuria"], ["Panthalassa", "Pantalasa", "Panthalassa"], ["Avalon", "Avalon", "Avalon"]], "medium"],
  ["himalaya", ["Which mountain range formed when the Indian plate crashed into Asia?", "¿Qué cordillera se formó cuando la placa índica chocó contra Asia?", "Welches Gebirge entstand, als die Indische Platte mit Asien kollidierte?"],
    ["Himalayas", "Himalaya", "Himalaya"], [["Alps", "Alpes", "Alpen"], ["Andes", "Andes", "Anden"], ["Rocky Mountains", "Montañas Rocosas", "Rocky Mountains"], ["Ural Mountains", "Montes Urales", "Ural"]], "medium"],
  ["atlantic", ["As the Americas drift away from Europe and Africa, which ocean is slowly getting wider?", "A medida que América se aleja de Europa y África, ¿qué océano se va ensanchando?", "Welcher Ozean wird langsam breiter, weil sich Amerika von Europa und Afrika entfernt?"],
    ["Atlantic Ocean", "Océano Atlántico", "Atlantischer Ozean"], [["Pacific Ocean", "Océano Pacífico", "Pazifischer Ozean"], ["Indian Ocean", "Océano Índico", "Indischer Ozean"], ["Arctic Ocean", "Océano Ártico", "Arktischer Ozean"]], "medium"],
  ["iceland", ["Iceland sits on top of which underwater mountain chain, where two plates move apart?", "Islandia se asienta sobre qué cordillera submarina donde dos placas se separan?", "Island liegt auf welchem unterseeischen Gebirge, an dem zwei Platten auseinanderdriften?"],
    ["Mid-Atlantic Ridge", "Dorsal mesoatlántica", "Mittelatlantischer Rücken"], [["Mariana Trench", "Fosa de las Marianas", "Marianengraben"], ["Great Rift Valley", "Gran Valle del Rift", "Großer Afrikanischer Grabenbruch"], ["San Andreas Fault", "Falla de San Andrés", "San-Andreas-Graben"]], "hard"],
  ["subduction", ["What is it called when one tectonic plate sinks beneath another?", "¿Cómo se llama el proceso en el que una placa tectónica se hunde bajo otra?", "Wie nennt man es, wenn eine Erdplatte unter eine andere abtaucht?"],
    ["Subduction", "Subducción", "Subduktion"], [["Erosion", "Erosión", "Erosion"], ["Sedimentation", "Sedimentación", "Sedimentation"], ["Weathering", "Meteorización", "Verwitterung"], ["Evaporation", "Evaporación", "Verdunstung"]], "hard"],
  ["epicentre", ["What is the point on the surface directly above the start of an earthquake called?", "¿Cómo se llama el punto de la superficie situado justo encima del origen de un terremoto?", "Wie heißt der Punkt an der Oberfläche direkt über dem Ursprung eines Erdbebens?"],
    ["Epicentre", "Epicentro", "Epizentrum"], [["Hypocentre", "Hipocentro", "Hypozentrum"], ["Crater", "Cráter", "Krater"], ["Magma chamber", "Cámara magmática", "Magmakammer"], ["Fault line", "Línea de falla", "Bruchlinie"]], "medium"],
  ["san-andreas", ["How do the two plates move at California's San Andreas Fault?", "¿Cómo se mueven las dos placas en la falla de San Andrés, en California?", "Wie bewegen sich die beiden Platten am San-Andreas-Graben in Kalifornien?"],
    PLATE_MOVES[0], PLATE_MOVES.slice(1), "hard"],
  ["drive", ["What mainly drives the slow movement of tectonic plates?", "¿Qué impulsa principalmente el lento movimiento de las placas tectónicas?", "Was treibt hauptsächlich die langsame Bewegung der Erdplatten an?"],
    ["Currents of hot rock in the mantle", "Corrientes de roca caliente en el manto", "Strömungen von heißem Gestein im Erdmantel"], [["The pull of the Moon", "La atracción de la Luna", "Die Anziehungskraft des Mondes"], ["Strong winds", "Los vientos fuertes", "Starke Winde"], ["Ocean tides", "Las mareas", "Die Gezeiten"], ["The Earth's magnetic field", "El campo magnético terrestre", "Das Magnetfeld der Erde"]], "hard"],
  ["speed", ["Roughly how fast do tectonic plates move?", "¿Aproximadamente a qué velocidad se mueven las placas tectónicas?", "Wie schnell bewegen sich Erdplatten ungefähr?"],
    ["A few centimetres per year", "Unos pocos centímetros al año", "Einige Zentimeter pro Jahr"], [["A few metres per day", "Unos pocos metros al día", "Einige Meter pro Tag"], ["A few kilometres per year", "Unos pocos kilómetros al año", "Einige Kilometer pro Jahr"], ["A few metres per hour", "Unos pocos metros por hora", "Einige Meter pro Stunde"]], "medium"],
  ["volcano-where", ["Where are most of the world's volcanoes found?", "¿Dónde se encuentran la mayoría de los volcanes del mundo?", "Wo befinden sich die meisten Vulkane der Welt?"],
    ["Along the edges of tectonic plates", "En los bordes de las placas tectónicas", "An den Rändern der Erdplatten"], [["Exactly on the equator", "Justo sobre el ecuador", "Genau am Äquator"], ["In the middle of the continents", "En el centro de los continentes", "In der Mitte der Kontinente"], ["Only near the poles", "Solo cerca de los polos", "Nur in der Nähe der Pole"]], "medium"],
];

/** Scales: name, what it measures (noun phrase, lower case), difficulty */
export const SCALES: { name: L; what: L; d: D }[] = [
  { name: ["Richter scale", "Escala de Richter", "Richterskala"], what: ["the strength (magnitude) of earthquakes", "la magnitud de los terremotos", "die Stärke (Magnitude) von Erdbeben"], d: "easy" },
  { name: ["Beaufort scale", "Escala de Beaufort", "Beaufortskala"], what: ["the force of the wind", "la fuerza del viento", "die Windstärke"], d: "medium" },
  { name: ["Mohs scale", "Escala de Mohs", "Mohs-Skala"], what: ["the hardness of minerals", "la dureza de los minerales", "die Härte von Mineralen"], d: "medium" },
  { name: ["pH scale", "Escala de pH", "pH-Skala"], what: ["how acidic or alkaline a substance is", "lo ácida o básica que es una sustancia", "wie sauer oder basisch ein Stoff ist"], d: "easy" },
  { name: ["Scoville scale", "Escala Scoville", "Scoville-Skala"], what: ["the heat (spiciness) of chilli peppers", "el picor de los chiles", "die Schärfe von Chilis"], d: "medium" },
  { name: ["Saffir–Simpson scale", "Escala de Saffir-Simpson", "Saffir-Simpson-Skala"], what: ["the strength of hurricanes", "la intensidad de los huracanes", "die Stärke von Hurrikanen"], d: "hard" },
  { name: ["Fujita scale", "Escala Fujita", "Fujita-Skala"], what: ["the strength of tornadoes", "la intensidad de los tornados", "die Stärke von Tornados"], d: "hard" },
  { name: ["Decibel scale", "Escala de decibelios", "Dezibel-Skala"], what: ["the loudness of sounds", "el nivel de intensidad de los sonidos", "die Lautstärke von Geräuschen"], d: "easy" },
  { name: ["UV index", "Índice UV", "UV-Index"], what: ["the strength of the Sun's ultraviolet radiation", "la intensidad de la radiación ultravioleta del Sol", "die Stärke der UV-Strahlung der Sonne"], d: "easy" },
  { name: ["Kelvin scale", "Escala Kelvin", "Kelvin-Skala"], what: ["temperature, starting from absolute zero", "la temperatura, a partir del cero absoluto", "die Temperatur, ab dem absoluten Nullpunkt"], d: "medium" },
];

export const CLIMATE: Fact[] = [
  ["climate", ["What do we call the average weather in a region over many years (usually 30)?", "¿Cómo se llama el tiempo medio de una región a lo largo de muchos años (normalmente 30)?", "Wie nennt man das durchschnittliche Wetter einer Region über viele Jahre (meist 30)?"],
    ["Climate", "Clima", "Klima"], [["Weather forecast", "Previsión meteorológica", "Wettervorhersage"], ["Season", "Estación", "Jahreszeit"], ["Atmosphere", "Atmósfera", "Atmosphäre"], ["Air pressure", "Presión atmosférica", "Luftdruck"]], "easy"],
  ["co2", ["Which gas from burning coal, oil and gas is the main cause of global warming?", "¿Qué gas procedente de quemar carbón, petróleo y gas es la principal causa del calentamiento global?", "Welches Gas aus der Verbrennung von Kohle, Öl und Gas ist die Hauptursache der Erderwärmung?"],
    ["Carbon dioxide", "Dióxido de carbono", "Kohlenstoffdioxid"], [["Oxygen", "Oxígeno", "Sauerstoff"], ["Nitrogen", "Nitrógeno", "Stickstoff"], ["Helium", "Helio", "Helium"], ["Argon", "Argón", "Argon"]], "easy"],
  ["cows", ["Which greenhouse gas do cows release in large amounts when they burp?", "¿Qué gas de efecto invernadero liberan las vacas en grandes cantidades al eructar?", "Welches Treibhausgas stoßen Kühe beim Rülpsen in großen Mengen aus?"],
    ["Methane", "Metano", "Methan"], [["Oxygen", "Oxígeno", "Sauerstoff"], ["Helium", "Helio", "Helium"], ["Hydrogen", "Hidrógeno", "Wasserstoff"], ["Neon", "Neón", "Neon"]], "medium"],
  ["greenhouse", ["What is the greenhouse effect?", "¿Qué es el efecto invernadero?", "Was ist der Treibhauseffekt?"],
    ["Gases in the air trapping heat and warming the Earth", "Gases del aire que retienen el calor y calientan la Tierra", "Gase in der Luft halten Wärme zurück und erwärmen die Erde"], [["Plants growing faster in glasshouses", "Plantas que crecen más rápido en invernaderos", "Pflanzen wachsen in Gewächshäusern schneller"], ["The Sun slowly getting hotter", "El Sol que se calienta poco a poco", "Die Sonne wird allmählich heißer"], ["Cold air flowing in through the ozone hole", "Aire frío que entra por el agujero de ozono", "Kalte Luft strömt durch das Ozonloch herein"]], "medium"],
  ["tropical", ["Which climate zone is found around the equator?", "¿Qué zona climática se encuentra alrededor del ecuador?", "Welche Klimazone liegt rund um den Äquator?"],
    ["Tropical", "Tropical", "Tropen"], [["Polar", "Polar", "Polarzone"], ["Temperate", "Templada", "Gemäßigte Zone"], ["Subarctic", "Subártica", "Subarktische Zone"]], "easy"],
  ["meteorologist", ["What does a meteorologist study?", "¿Qué estudia un meteorólogo?", "Womit beschäftigt sich ein Meteorologe?"],
    ["Weather and the atmosphere", "El tiempo y la atmósfera", "Mit Wetter und Atmosphäre"], [["Meteorites", "Los meteoritos", "Mit Meteoriten"], ["Earthquakes", "Los terremotos", "Mit Erdbeben"], ["Rocks and minerals", "Las rocas y los minerales", "Mit Gesteinen und Mineralen"], ["Ocean currents only", "Solo las corrientes oceánicas", "Nur mit Meeresströmungen"]], "easy"],
  ["el-nino", ["What is El Niño?", "¿Qué es El Niño?", "Was ist El Niño?"],
    ["A periodic warming of the Pacific Ocean that changes weather around the world", "Un calentamiento periódico del océano Pacífico que altera el tiempo en todo el mundo", "Eine regelmäßig wiederkehrende Erwärmung des Pazifiks, die das Wetter weltweit verändert"], [["A volcano in the Andes", "Un volcán de los Andes", "Ein Vulkan in den Anden"], ["A weather satellite", "Un satélite meteorológico", "Ein Wettersatellit"], ["A cold wind from the Arctic", "Un viento frío del Ártico", "Ein kalter Wind aus der Arktis"]], "medium"],
  ["sea-level", ["Which two things mainly make sea levels rise as the climate warms?", "¿Qué dos fenómenos hacen subir principalmente el nivel del mar al calentarse el clima?", "Welche zwei Dinge lassen den Meeresspiegel bei der Erwärmung vor allem steigen?"],
    ["Melting ice on land and warmer water expanding", "El hielo que se derrite en tierra y la dilatación del agua más caliente", "Schmelzendes Landeis und die Ausdehnung wärmeren Wassers"], [["More rain and more rivers", "Más lluvia y más ríos", "Mehr Regen und mehr Flüsse"], ["Melting icebergs and stronger tides", "Icebergs que se derriten y mareas más fuertes", "Schmelzende Eisberge und stärkere Gezeiten"], ["Earthquakes and volcanoes", "Terremotos y volcanes", "Erdbeben und Vulkane"]], "hard"],
  ["paris", ["Which 2015 agreement aims to keep global warming well below 2 °C?", "¿Qué acuerdo de 2015 busca mantener el calentamiento global muy por debajo de 2 °C?", "Welches Abkommen von 2015 soll die Erderwärmung deutlich unter 2 °C halten?"],
    ["Paris Agreement", "Acuerdo de París", "Pariser Klimaabkommen"], [["Kyoto Protocol", "Protocolo de Kioto", "Kyoto-Protokoll"], ["Montreal Protocol", "Protocolo de Montreal", "Montreal-Protokoll"], ["Treaty of Rome", "Tratado de Roma", "Römische Verträge"]], "medium"],
  ["montreal", ["Which 1987 agreement banned chemicals that damage the ozone layer?", "¿Qué acuerdo de 1987 prohibió las sustancias que dañan la capa de ozono?", "Welches Abkommen von 1987 verbot Stoffe, die die Ozonschicht schädigen?"],
    ["Montreal Protocol", "Protocolo de Montreal", "Montreal-Protokoll"], [["Kyoto Protocol", "Protocolo de Kioto", "Kyoto-Protokoll"], ["Paris Agreement", "Acuerdo de París", "Pariser Klimaabkommen"], ["Treaty of Rome", "Tratado de Roma", "Römische Verträge"]], "hard"],
];

// ═══ human body ════════════════════════════════════════════════════
/** Sense organs: label, ES with article, DE with article */
export const SENSE_ORGANS: Record<string, { label: L; es: string; de: string; en: string }> = {
  eye: { label: ["Eye", "Ojo", "Auge"], en: "the eyes", es: "los ojos", de: "die Augen" },
  ear: { label: ["Ear", "Oído", "Ohr"], en: "the ears", es: "los oídos", de: "die Ohren" },
  nose: { label: ["Nose", "Nariz", "Nase"], en: "the nose", es: "la nariz", de: "die Nase" },
  tongue: { label: ["Tongue", "Lengua", "Zunge"], en: "the tongue", es: "la lengua", de: "die Zunge" },
  skin: { label: ["Skin", "Piel", "Haut"], en: "the skin", es: "la piel", de: "die Haut" },
};
/** Senses: organ key → sense label, plus "with which organ do we …" verb */
export const SENSES: { organ: string; sense: L; verb: L }[] = [
  { organ: "eye", sense: ["Sight", "Vista", "Sehsinn"], verb: ["see", "vemos", "sehen"] },
  { organ: "ear", sense: ["Hearing", "Oído", "Hörsinn"], verb: ["hear", "oímos", "hören"] },
  { organ: "nose", sense: ["Smell", "Olfato", "Geruchssinn"], verb: ["smell", "olemos", "riechen"] },
  { organ: "tongue", sense: ["Taste", "Gusto", "Geschmackssinn"], verb: ["taste", "saboreamos", "schmecken"] },
  { organ: "skin", sense: ["Touch", "Tacto", "Tastsinn"], verb: ["feel touch", "sentimos el tacto", "tasten und fühlen"] },
];
/** Parts of sense organs: [label (EN/ES/DE, as used in a sentence), plural?, organ key, difficulty] */
export const SENSE_PARTS: [L, boolean, string, D][] = [
  [["the retina", "la retina", "die Netzhaut"], false, "eye", "medium"],
  [["the iris", "el iris", "die Iris (Regenbogenhaut)"], false, "eye", "easy"],
  [["the pupil", "la pupila", "die Pupille"], false, "eye", "easy"],
  [["the optic nerve", "el nervio óptico", "der Sehnerv"], false, "eye", "medium"],
  [["the eardrum", "el tímpano", "das Trommelfell"], false, "ear", "easy"],
  [["the cochlea", "la cóclea", "die Hörschnecke (Cochlea)"], false, "ear", "medium"],
  [["the semicircular canals", "los canales semicirculares", "die Bogengänge"], true, "ear", "hard"],
  [["the hammer, anvil and stirrup", "el martillo, el yunque y el estribo", "Hammer, Amboss und Steigbügel"], true, "ear", "medium"],
  [["the taste buds", "las papilas gustativas", "die Geschmacksknospen"], true, "tongue", "easy"],
  [["the epidermis", "la epidermis", "die Oberhaut (Epidermis)"], false, "skin", "medium"],
  [["the sweat glands", "las glándulas sudoríparas", "die Schweißdrüsen"], true, "skin", "medium"],
  [["the olfactory nerve", "el nervio olfativo", "der Riechnerv"], false, "nose", "hard"],
];

const INCISORS: L = ["Incisors", "Incisivos", "Schneidezähne"];
const CANINES: L = ["Canines", "Caninos (colmillos)", "Eckzähne"];
const PREMOLARS: L = ["Premolars", "Premolares", "Vordere Backenzähne (Prämolaren)"];
const MOLARS: L = ["Molars", "Molares (muelas)", "Hintere Backenzähne (Molaren)"];
const TEETH4 = [INCISORS, CANINES, PREMOLARS, MOLARS];
const ENAMEL: L = ["Enamel", "Esmalte", "Zahnschmelz"];
const DENTINE: L = ["Dentine", "Dentina", "Zahnbein (Dentin)"];
const PULP: L = ["Pulp", "Pulpa", "Zahnmark (Pulpa)"];
const GUM: L = ["Gum", "Encía", "Zahnfleisch"];
const ROOT: L = ["Root", "Raíz", "Zahnwurzel"];
const n = (x: number): L => [String(x), String(x), String(x)];
export const TEETH: Fact[] = [
  ["incisors", ["Which teeth at the front of the mouth are used for biting and cutting food?", "¿Qué dientes de la parte delantera de la boca sirven para morder y cortar?", "Welche Zähne vorne im Mund dienen zum Abbeißen und Schneiden?"], INCISORS, without(TEETH4, INCISORS), "easy"],
  ["canines", ["Which pointed teeth are especially good for tearing food?", "¿Qué dientes puntiagudos sirven sobre todo para desgarrar la comida?", "Welche spitzen Zähne eignen sich besonders zum Reißen der Nahrung?"], CANINES, without(TEETH4, CANINES), "easy"],
  ["molars", ["Which large teeth at the very back of the mouth grind food?", "¿Qué dientes grandes del fondo de la boca trituran la comida?", "Welche großen Zähne ganz hinten im Mund zermahlen die Nahrung?"], MOLARS, without(TEETH4, MOLARS), "easy"],
  ["wisdom", ["Wisdom teeth are a kind of which teeth?", "¿Qué tipo de dientes son las muelas del juicio?", "Zu welcher Zahnart gehören die Weisheitszähne?"], MOLARS, without(TEETH4, MOLARS), "medium"],
  ["n-incisors", ["How many incisors does an adult normally have?", "¿Cuántos incisivos tiene normalmente una persona adulta?", "Wie viele Schneidezähne hat ein Erwachsener normalerweise?"], n(8), [n(2), n(4), n(6), n(12), n(16)], "medium"],
  ["n-canines", ["How many canine teeth does an adult normally have?", "¿Cuántos caninos tiene normalmente una persona adulta?", "Wie viele Eckzähne hat ein Erwachsener normalerweise?"], n(4), [n(2), n(6), n(8), n(10)], "medium"],
  ["enamel", ["What is the hard, white outer layer of a tooth's crown called?", "¿Cómo se llama la capa exterior dura y blanca de la corona de un diente?", "Wie heißt die harte, weiße äußere Schicht der Zahnkrone?"], ENAMEL, [DENTINE, PULP, GUM, ROOT], "easy"],
  ["hardest", ["What is the hardest substance in the human body?", "¿Cuál es la sustancia más dura del cuerpo humano?", "Was ist die härteste Substanz im menschlichen Körper?"], ENAMEL,
    [["Thigh bone", "Hueso del fémur", "Oberschenkelknochen"], ["Fingernails", "Uñas", "Fingernägel"], ["Cartilage", "Cartílago", "Knorpel"], ["Skull bone", "Hueso del cráneo", "Schädelknochen"]], "medium"],
  ["pulp", ["What is the soft centre of a tooth, with nerves and blood vessels, called?", "¿Cómo se llama el centro blando del diente, con nervios y vasos sanguíneos?", "Wie heißt das weiche Innere eines Zahns mit Nerven und Blutgefäßen?"], PULP, [ENAMEL, DENTINE, GUM, ROOT], "medium"],
  ["dentine", ["Which layer of a tooth lies directly beneath the enamel?", "¿Qué capa del diente está justo debajo del esmalte?", "Welche Schicht des Zahns liegt direkt unter dem Zahnschmelz?"], DENTINE, [PULP, GUM, ROOT], "hard"],
  ["fluoride", ["Which substance is added to most toothpastes to strengthen tooth enamel?", "¿Qué sustancia se añade a la mayoría de las pastas de dientes para fortalecer el esmalte?", "Welcher Stoff wird den meisten Zahnpasten zugesetzt, um den Zahnschmelz zu stärken?"],
    ["Fluoride", "Flúor (fluoruro)", "Fluorid"], [["Iron", "Hierro", "Eisen"], ["Iodine", "Yodo", "Jod"], ["Sulfur", "Azufre", "Schwefel"], ["Caffeine", "Cafeína", "Koffein"]], "medium"],
  ["sets", ["How many sets of teeth does a person normally grow in a lifetime?", "¿Cuántas denticiones tiene normalmente una persona a lo largo de su vida?", "Wie viele Gebisse bekommt ein Mensch normalerweise im Laufe seines Lebens?"], n(2), [n(1), n(3), n(4), n(5)], "easy"],
];

/** Blood: part, what it does ("Which part of the blood …?") and its job (answer phrase) */
export const BLOOD: { id: string; name: L; q: L; job: L; vessel?: boolean; d: D }[] = [
  { id: "rbc", name: ["Red blood cells", "Glóbulos rojos", "Rote Blutkörperchen"], d: "easy",
    q: ["Which part of the blood carries oxygen around the body?", "¿Qué componente de la sangre transporta el oxígeno por el cuerpo?", "Welcher Bestandteil des Blutes transportiert Sauerstoff durch den Körper?"],
    job: ["Carrying oxygen around the body", "Transportar oxígeno por el cuerpo", "Sauerstoff durch den Körper transportieren"] },
  { id: "wbc", name: ["White blood cells", "Glóbulos blancos", "Weiße Blutkörperchen"], d: "easy",
    q: ["Which part of the blood fights germs and infections?", "¿Qué componente de la sangre combate los microbios y las infecciones?", "Welcher Bestandteil des Blutes bekämpft Krankheitserreger?"],
    job: ["Fighting germs and infections", "Combatir microbios e infecciones", "Krankheitserreger bekämpfen"] },
  { id: "platelets", name: ["Platelets", "Plaquetas", "Blutplättchen"], d: "medium",
    q: ["Which part of the blood helps a cut stop bleeding by forming a clot?", "¿Qué componente de la sangre ayuda a detener el sangrado de un corte formando un coágulo?", "Welcher Bestandteil des Blutes hilft, die Blutung einer Wunde durch Gerinnung zu stoppen?"],
    job: ["Making blood clot to close wounds", "Hacer que la sangre coagule para cerrar heridas", "Blut gerinnen lassen, um Wunden zu verschließen"] },
  { id: "plasma", name: ["Plasma", "Plasma", "Blutplasma"], d: "medium",
    q: ["Which part of the blood is the yellowish liquid that carries nutrients and hormones?", "¿Qué componente de la sangre es el líquido amarillento que transporta nutrientes y hormonas?", "Welcher Bestandteil des Blutes ist die gelbliche Flüssigkeit, die Nährstoffe und Hormone transportiert?"],
    job: ["Being the liquid that carries nutrients and hormones", "Ser el líquido que transporta nutrientes y hormonas", "Als Flüssigkeit Nährstoffe und Hormone transportieren"] },
  { id: "arteries", name: ["Arteries", "Arterias", "Arterien"], vessel: true, d: "medium",
    q: ["Which blood vessels carry blood away from the heart?", "¿Qué vasos sanguíneos llevan la sangre desde el corazón hacia el cuerpo?", "Welche Blutgefäße führen das Blut vom Herzen weg?"],
    job: ["Carrying blood away from the heart", "Llevar la sangre desde el corazón hacia el cuerpo", "Blut vom Herzen wegführen"] },
  { id: "veins", name: ["Veins", "Venas", "Venen"], vessel: true, d: "medium",
    q: ["Which blood vessels carry blood back to the heart?", "¿Qué vasos sanguíneos devuelven la sangre al corazón?", "Welche Blutgefäße führen das Blut zum Herzen zurück?"],
    job: ["Carrying blood back to the heart", "Devolver la sangre al corazón", "Blut zum Herzen zurückführen"] },
  { id: "capillaries", name: ["Capillaries", "Capilares", "Kapillaren"], vessel: true, d: "medium",
    q: ["Which are the tiniest blood vessels, where oxygen passes into the body's tissues?", "¿Cuáles son los vasos sanguíneos más finos, donde el oxígeno pasa a los tejidos?", "Welche sind die feinsten Blutgefäße, in denen Sauerstoff ins Gewebe übertritt?"],
    job: ["Letting oxygen pass into the tissues through their very thin walls", "Dejar pasar el oxígeno a los tejidos a través de sus paredes finísimas", "Durch ihre hauchdünnen Wände Sauerstoff ans Gewebe abgeben"] },
];
const LYMPH: L = ["Lymph vessels", "Vasos linfáticos", "Lymphgefäße"];
export const BLOOD_FACTS: Fact[] = [
  ["valves", ["Which blood vessels have valves to stop the blood flowing backwards?", "¿Qué vasos sanguíneos tienen válvulas para que la sangre no retroceda?", "Welche Blutgefäße haben Klappen, damit das Blut nicht zurückfließt?"],
    ["Veins", "Venas", "Venen"], [["Arteries", "Arterias", "Arterien"], ["Capillaries", "Capilares", "Kapillaren"], ["The aorta", "La aorta", "Die Aorta"]], "hard"],
  ["red", ["What gives blood its red colour?", "¿Qué le da a la sangre su color rojo?", "Was gibt dem Blut seine rote Farbe?"],
    ["Haemoglobin", "Hemoglobina", "Hämoglobin"], [["Melanin", "Melanina", "Melanin"], ["Chlorophyll", "Clorofila", "Chlorophyll"], ["Keratin", "Queratina", "Keratin"], ["Carotene", "Caroteno", "Carotin"]], "medium"],
  ["iron", ["Which metal does haemoglobin need in order to carry oxygen?", "¿Qué metal necesita la hemoglobina para transportar oxígeno?", "Welches Metall braucht das Hämoglobin, um Sauerstoff zu transportieren?"],
    ["Iron", "Hierro", "Eisen"], [["Copper", "Cobre", "Kupfer"], ["Zinc", "Zinc", "Zink"], ["Calcium", "Calcio", "Calcium"], ["Magnesium", "Magnesio", "Magnesium"]], "medium"],
  ["marrow", ["In adults, where are new blood cells made?", "En los adultos, ¿dónde se fabrican las nuevas células de la sangre?", "Wo werden bei Erwachsenen neue Blutzellen gebildet?"],
    ["In the bone marrow", "En la médula ósea", "Im Knochenmark"], [["In the heart", "En el corazón", "Im Herzen"], ["In the kidneys", "En los riñones", "In den Nieren"], ["In the stomach", "En el estómago", "Im Magen"], ["In the brain", "En el cerebro", "Im Gehirn"]], "medium"],
  ["no-blood", ["Which of these vessels does NOT carry blood?", "¿Cuál de estos vasos NO transporta sangre?", "Welche dieser Gefäße transportieren KEIN Blut?"],
    LYMPH, [["Arteries", "Arterias", "Arterien"], ["Veins", "Venas", "Venen"], ["Capillaries", "Capilares", "Kapillaren"]], "hard"],
];

/** Diseases: [label, ES with article (for "¿Qué causa …?"), DE as used after "Was verursacht", cause key, difficulty] */
export const CAUSES: Record<string, L> = {
  virus: ["A virus", "Un virus", "Ein Virus"],
  bacterium: ["A bacterium", "Una bacteria", "Ein Bakterium"],
  parasite: ["A single-celled parasite", "Un parásito unicelular", "Ein einzelliger Parasit"],
  fungus: ["A fungus", "Un hongo", "Ein Pilz"],
};
export const DISEASES: [L, string, string, string, D][] = [
  [["Flu (influenza)", "Gripe", "Grippe"], "la gripe", "die Grippe", "virus", "easy"],
  [["Common cold", "Resfriado común", "Erkältung"], "el resfriado común", "eine gewöhnliche Erkältung", "virus", "easy"],
  [["Measles", "Sarampión", "Masern"], "el sarampión", "Masern", "virus", "medium"],
  [["Chickenpox", "Varicela", "Windpocken"], "la varicela", "Windpocken", "virus", "medium"],
  [["COVID-19", "COVID-19", "COVID-19"], "la COVID-19", "COVID-19", "virus", "easy"],
  [["Rabies", "Rabia", "Tollwut"], "la rabia", "Tollwut", "virus", "medium"],
  [["Polio", "Poliomielitis", "Kinderlähmung (Polio)"], "la poliomielitis", "Kinderlähmung (Polio)", "virus", "medium"],
  [["Smallpox", "Viruela", "Pocken"], "la viruela", "die Pocken", "virus", "medium"],
  [["Mumps", "Paperas", "Mumps"], "las paperas", "Mumps", "virus", "medium"],
  [["Rubella", "Rubéola", "Röteln"], "la rubéola", "Röteln", "virus", "hard"],
  [["AIDS (HIV)", "Sida (VIH)", "Aids (HIV)"], "el sida", "Aids", "virus", "medium"],
  [["Tuberculosis", "Tuberculosis", "Tuberkulose"], "la tuberculosis", "Tuberkulose", "bacterium", "medium"],
  [["Cholera", "Cólera", "Cholera"], "el cólera", "Cholera", "bacterium", "medium"],
  [["Tetanus", "Tétanos", "Tetanus (Wundstarrkrampf)"], "el tétanos", "Tetanus", "bacterium", "hard"],
  [["Plague (Black Death)", "Peste negra", "Pest"], "la peste negra", "die Pest", "bacterium", "medium"],
  [["Whooping cough", "Tos ferina", "Keuchhusten"], "la tos ferina", "Keuchhusten", "bacterium", "hard"],
  [["Leprosy", "Lepra", "Lepra"], "la lepra", "Lepra", "bacterium", "hard"],
  [["Diphtheria", "Difteria", "Diphtherie"], "la difteria", "Diphtherie", "bacterium", "hard"],
  [["Lyme disease", "Enfermedad de Lyme", "Lyme-Borreliose"], "la enfermedad de Lyme", "die Lyme-Borreliose", "bacterium", "hard"],
  [["Malaria", "Malaria", "Malaria"], "la malaria", "Malaria", "parasite", "medium"],
  [["Sleeping sickness", "Enfermedad del sueño", "Schlafkrankheit"], "la enfermedad del sueño", "die Schlafkrankheit", "parasite", "hard"],
];
/** How diseases spread: [disease label (EN/ES/DE for "How is … passed on"), ES subject, carrier key, difficulty] */
export const CARRIERS: Record<string, L> = {
  mosquito: ["Through mosquito bites", "Por picaduras de mosquito", "Durch Mückenstiche"],
  flea: ["Through flea bites", "Por picaduras de pulga", "Durch Flohbisse"],
  tick: ["Through tick bites", "Por picaduras de garrapata", "Durch Zeckenbisse"],
  tsetse: ["Through tsetse fly bites", "Por picaduras de la mosca tsetsé", "Durch Stiche der Tsetsefliege"],
  water: ["Through contaminated drinking water", "Por agua potable contaminada", "Durch verunreinigtes Trinkwasser"],
  lice: ["Through body lice", "Por piojos de la ropa", "Durch Kleiderläuse"],
  animal: ["Through bites from infected animals", "Por mordeduras de animales infectados", "Durch Bisse infizierter Tiere"],
};
export const SPREAD: [string, string, string, string, D][] = [
  ["malaria", "la malaria", "Malaria", "mosquito", "easy"],
  ["dengue fever", "el dengue", "Denguefieber", "mosquito", "medium"],
  ["yellow fever", "la fiebre amarilla", "Gelbfieber", "mosquito", "hard"],
  ["the plague (Black Death)", "la peste negra", "die Pest", "flea", "medium"],
  ["Lyme disease", "la enfermedad de Lyme", "die Lyme-Borreliose", "tick", "medium"],
  ["sleeping sickness", "la enfermedad del sueño", "die Schlafkrankheit", "tsetse", "hard"],
  ["cholera", "el cólera", "Cholera", "water", "medium"],
  ["epidemic typhus", "el tifus epidémico", "Fleckfieber", "lice", "hard"],
  ["rabies", "la rabia", "Tollwut", "animal", "easy"],
];

/** Medicine pioneers: [name, female?, achievement (3rd person, past), difficulty] */
export const MEDICINE: [L, boolean, L, D][] = [
  [["Hippocrates", "Hipócrates", "Hippokrates"], false, ["is seen as the father of medicine", "es considerado el padre de la medicina", "gilt als Vater der Medizin"], "easy"],
  [["René Laennec", "René Laennec", "René Laennec"], false, ["invented the stethoscope (1816)", "inventó el estetoscopio (1816)", "erfand das Stethoskop (1816)"], "hard"],
  [["Florence Nightingale", "Florence Nightingale", "Florence Nightingale"], true, ["founded modern nursing", "fundó la enfermería moderna", "begründete die moderne Krankenpflege"], "easy"],
  [["Ignaz Semmelweis", "Ignaz Semmelweis", "Ignaz Semmelweis"], false, ["showed that doctors washing their hands saved mothers' lives (1847)", "demostró que el lavado de manos de los médicos salvaba la vida de las madres (1847)", "zeigte, dass Händewaschen der Ärzte das Leben von Müttern rettete (1847)"], "medium"],
  [["Christiaan Barnard", "Christiaan Barnard", "Christiaan Barnard"], false, ["performed the first human heart transplant (1967)", "realizó el primer trasplante de corazón humano (1967)", "führte die erste Herztransplantation beim Menschen durch (1967)"], "medium"],
  [["Sigmund Freud", "Sigmund Freud", "Sigmund Freud"], false, ["founded psychoanalysis", "fundó el psicoanálisis", "begründete die Psychoanalyse"], "easy"],
  [["Paul Ehrlich", "Paul Ehrlich", "Paul Ehrlich"], false, ["developed Salvarsan, an early targeted drug against syphilis (1910)", "desarrolló el Salvarsán, uno de los primeros fármacos dirigidos contra la sífilis (1910)", "entwickelte Salvarsan, ein frühes gezieltes Medikament gegen Syphilis (1910)"], "hard"],
  [["Elizabeth Blackwell", "Elizabeth Blackwell", "Elizabeth Blackwell"], true, ["was the first woman to earn a medical degree in the United States (1849)", "fue la primera mujer que se licenció en Medicina en Estados Unidos (1849)", "war die erste Frau, die in den USA einen medizinischen Abschluss erwarb (1849)"], "hard"],
  [["Galen", "Galeno", "Galenos"], false, ["was a Greek doctor in ancient Rome whose ideas shaped medicine for over 1,000 years", "fue un médico griego de la antigua Roma cuyas ideas marcaron la medicina durante más de mil años", "war ein griechischer Arzt im antiken Rom, dessen Lehren die Medizin über 1000 Jahre prägten"], "hard"],
  [["Andreas Vesalius", "Andrés Vesalio", "Andreas Vesalius"], false, ["wrote a famous illustrated book on human anatomy (1543)", "escribió un famoso libro ilustrado sobre anatomía humana (1543)", "schrieb ein berühmtes illustriertes Werk über die Anatomie des Menschen (1543)"], "hard"],
  [["Ronald Ross", "Ronald Ross", "Ronald Ross"], false, ["showed that mosquitoes spread malaria (1897)", "demostró que los mosquitos transmiten la malaria (1897)", "wies nach, dass Mücken Malaria übertragen (1897)"], "hard"],
  [["Avicenna", "Avicena", "Avicenna"], false, ["wrote “The Canon of Medicine”, used as a textbook for centuries", "escribió el «Canon de medicina», usado como libro de texto durante siglos", "schrieb den „Kanon der Medizin“, der jahrhundertelang als Lehrbuch diente"], "hard"],
  [["Albert Sabin", "Albert Sabin", "Albert Sabin"], false, ["developed the oral polio vaccine, given on a sugar cube", "desarrolló la vacuna oral contra la polio, administrada en un terrón de azúcar", "entwickelte die Schluckimpfung gegen Polio, die auf einem Zuckerwürfel gegeben wurde"], "hard"],
  [["Virginia Apgar", "Virginia Apgar", "Virginia Apgar"], true, ["created a quick score for checking the health of newborn babies", "creó una prueba rápida para valorar la salud de los recién nacidos", "entwickelte einen schnellen Test zur Beurteilung der Gesundheit Neugeborener"], "hard"],
];

/** Body records */
export const BODY: Fact[] = [
  ["smallest-muscle", ["Where in the body is the smallest muscle?", "¿En qué parte del cuerpo está el músculo más pequeño?", "Wo im Körper befindet sich der kleinste Muskel?"],
    ["In the middle ear", "En el oído medio", "Im Mittelohr"], [["In the eyelid", "En el párpado", "Im Augenlid"], ["In the little finger", "En el dedo meñique", "Im kleinen Finger"], ["In the tongue", "En la lengua", "In der Zunge"], ["In the nose", "En la nariz", "In der Nase"]], "hard"],
  ["largest-cell", ["Which human cell is the largest – just big enough to see with the naked eye?", "¿Cuál es la célula humana más grande, apenas visible a simple vista?", "Welche menschliche Zelle ist die größte – gerade noch mit bloßem Auge sichtbar?"],
    ["The egg cell", "El óvulo", "Die Eizelle"], [["The red blood cell", "El glóbulo rojo", "Das rote Blutkörperchen"], ["The skin cell", "La célula de la piel", "Die Hautzelle"], ["The platelet", "La plaqueta", "Das Blutplättchen"], ["The white blood cell", "El glóbulo blanco", "Das weiße Blutkörperchen"]], "medium"],
  ["longest-cell", ["Which human cells can be the longest, reaching up to about one metre?", "¿Qué células humanas pueden ser las más largas, de hasta un metro aproximadamente?", "Welche menschlichen Zellen können am längsten sein – bis zu etwa einem Meter?"],
    ["Nerve cells", "Las neuronas", "Nervenzellen"], [["Red blood cells", "Los glóbulos rojos", "Rote Blutkörperchen"], ["Skin cells", "Las células de la piel", "Hautzellen"], ["Egg cells", "Los óvulos", "Eizellen"], ["Fat cells", "Las células de grasa", "Fettzellen"]], "medium"],
  ["aorta", ["Which is the largest artery in the human body?", "¿Cuál es la arteria más grande del cuerpo humano?", "Welche ist die größte Arterie des menschlichen Körpers?"],
    ["The aorta", "La aorta", "Die Aorta"], [["The carotid artery", "La arteria carótida", "Die Halsschlagader"], ["The femoral artery", "La arteria femoral", "Die Oberschenkelarterie"], ["The coronary artery", "La arteria coronaria", "Die Herzkranzarterie"]], "medium"],
  ["regrow", ["Which organ can grow back to its full size even after part of it has been removed?", "¿Qué órgano puede volver a crecer hasta su tamaño completo aunque se le extirpe una parte?", "Welches Organ kann wieder zu voller Größe nachwachsen, selbst wenn ein Teil entfernt wurde?"],
    ["The liver", "El hígado", "Die Leber"], [["The heart", "El corazón", "Das Herz"], ["The brain", "El cerebro", "Das Gehirn"], ["The kidneys", "Los riñones", "Die Nieren"], ["The lungs", "Los pulmones", "Die Lunge"]], "medium"],
  ["hyoid", ["Which bone in the neck is the only bone not connected to any other bone?", "¿Qué hueso del cuello es el único que no está unido a ningún otro hueso?", "Welcher Knochen im Hals ist als einziger mit keinem anderen Knochen verbunden?"],
    ["Hyoid bone", "Hueso hioides", "Zungenbein"], [["Atlas", "Atlas", "Atlas"], ["Collarbone", "Clavícula", "Schlüsselbein"], ["Coccyx", "Cóccix", "Steißbein"], ["Breastbone", "Esternón", "Brustbein"]], "hard"],
  ["water", ["Roughly how much of an adult's body is water?", "¿Aproximadamente qué parte del cuerpo de un adulto es agua?", "Wie viel vom Körper eines Erwachsenen besteht ungefähr aus Wasser?"],
    ["About 60%", "Alrededor del 60 %", "Etwa 60 %"], [["About 10%", "Alrededor del 10 %", "Etwa 10 %"], ["About 30%", "Alrededor del 30 %", "Etwa 30 %"], ["About 95%", "Alrededor del 95 %", "Etwa 95 %"]], "medium"],
  ["heartbeat", ["Roughly how often does an adult's heart beat per minute at rest?", "¿Aproximadamente cuántas veces late por minuto en reposo el corazón de un adulto?", "Wie oft schlägt das Herz eines Erwachsenen in Ruhe ungefähr pro Minute?"],
    ["About 70 times", "Unas 70 veces", "Etwa 70-mal"], [["About 10 times", "Unas 10 veces", "Etwa 10-mal"], ["About 20 times", "Unas 20 veces", "Etwa 20-mal"], ["About 200 times", "Unas 200 veces", "Etwa 200-mal"], ["About 500 times", "Unas 500 veces", "Etwa 500-mal"]], "easy"],
  ["brain-energy", ["Which organ uses about a fifth of all the energy your body needs at rest?", "¿Qué órgano consume alrededor de una quinta parte de la energía que necesita el cuerpo en reposo?", "Welches Organ verbraucht in Ruhe etwa ein Fünftel der gesamten Körperenergie?"],
    ["The brain", "El cerebro", "Das Gehirn"], [["The stomach", "El estómago", "Der Magen"], ["The skin", "La piel", "Die Haut"], ["The kidneys", "Los riñones", "Die Nieren"], ["The spleen", "El bazo", "Die Milz"]], "medium"],
  ["vena-cava", ["Which is the largest vein in the human body?", "¿Cuál es la vena más grande del cuerpo humano?", "Welche ist die größte Vene des menschlichen Körpers?"],
    ["The vena cava", "La vena cava", "Die Hohlvene"], [["The jugular vein", "La vena yugular", "Die Drosselvene"], ["The aorta", "La aorta", "Die Aorta"], ["A vein in the arm", "Una vena del brazo", "Eine Armvene"]], "hard"],
];

// ═══ chemistry & physics in everyday life ══════════════════════════
const O2: L = ["Oxygen", "Oxígeno", "Sauerstoff"];
const N2: L = ["Nitrogen", "Nitrógeno", "Stickstoff"];
const CO2: L = ["Carbon dioxide", "Dióxido de carbono", "Kohlenstoffdioxid"];
const H2: L = ["Hydrogen", "Hidrógeno", "Wasserstoff"];
const HE: L = ["Helium", "Helio", "Helium"];
const AR: L = ["Argon", "Argón", "Argon"];
const CL: L = ["Chlorine", "Cloro", "Chlor"];
export const CHEM: Fact[] = [
  ["rust", ["Rust forms when iron reacts with water and which gas?", "El óxido se forma cuando el hierro reacciona con el agua y con qué gas?", "Rost entsteht, wenn Eisen mit Wasser und welchem Gas reagiert?"], O2, [N2, HE, H2, AR], "easy"],
  ["soda-vinegar", ["Which gas fizzes out when you mix baking soda with vinegar?", "¿Qué gas burbujea al mezclar bicarbonato con vinagre?", "Welches Gas sprudelt heraus, wenn man Natron mit Essig mischt?"], CO2, [O2, H2, N2, HE, CL], "medium"],
  ["dry-ice", ["What is “dry ice”?", "¿Qué es el «hielo seco»?", "Was ist „Trockeneis“?"],
    ["Frozen carbon dioxide", "Dióxido de carbono congelado", "Gefrorenes Kohlenstoffdioxid"], [["Frozen nitrogen", "Nitrógeno congelado", "Gefrorener Stickstoff"], ["Ice made from distilled water", "Hielo de agua destilada", "Eis aus destilliertem Wasser"], ["Ice mixed with salt", "Hielo mezclado con sal", "Mit Salz gemischtes Eis"], ["Frozen helium", "Helio congelado", "Gefrorenes Helium"]], "medium"],
  ["glass", ["What is the main raw material for making ordinary glass?", "¿Cuál es la principal materia prima para fabricar vidrio común?", "Was ist der wichtigste Rohstoff für gewöhnliches Glas?"],
    ["Sand", "Arena", "Sand"], [["Clay", "Arcilla", "Ton"], ["Salt", "Sal", "Salz"], ["Iron ore", "Mineral de hierro", "Eisenerz"], ["Coal", "Carbón", "Kohle"]], "easy"],
  ["pencil", ["What is the “lead” in an ordinary pencil actually made of?", "¿De qué está hecha realmente la mina de un lápiz normal?", "Woraus besteht die Mine eines gewöhnlichen Bleistifts eigentlich?"],
    ["Graphite mixed with clay", "Grafito mezclado con arcilla", "Graphit mit Ton"], [["Lead", "Plomo", "Blei"], ["Tin", "Estaño", "Zinn"], ["Pressed ash", "Ceniza prensada", "Gepresste Asche"], ["Coal dust and wax", "Polvo de carbón y cera", "Kohlenstaub und Wachs"]], "easy"],
  ["catalyst", ["What do we call a substance that speeds up a chemical reaction without being used up?", "¿Cómo se llama una sustancia que acelera una reacción química sin consumirse?", "Wie nennt man einen Stoff, der eine chemische Reaktion beschleunigt, ohne verbraucht zu werden?"],
    ["Catalyst", "Catalizador", "Katalysator"], [["Solvent", "Disolvente", "Lösungsmittel"], ["Indicator", "Indicador", "Indikator"], ["Inhibitor", "Inhibidor", "Inhibitor"], ["Polymer", "Polímero", "Polymer"]], "medium"],
  ["fire", ["A fire needs fuel, heat and what else?", "Un fuego necesita combustible, calor y ¿qué más?", "Ein Feuer braucht Brennstoff, Hitze und was noch?"], O2, [N2, CO2, H2, HE], "easy"],
  ["patina", ["Why do old copper roofs and the Statue of Liberty look green?", "¿Por qué los tejados de cobre antiguos y la Estatua de la Libertad se ven verdes?", "Warum sind alte Kupferdächer und die Freiheitsstatue grün?"],
    ["The copper reacts with the air and forms a green layer (patina)", "El cobre reacciona con el aire y forma una capa verde (pátina)", "Das Kupfer reagiert mit der Luft und bildet eine grüne Schicht (Patina)"], [["They were painted green", "Se pintaron de verde", "Sie wurden grün angestrichen"], ["Moss grows on them", "Les crece musgo", "Auf ihnen wächst Moos"], ["Sunlight bleaches the copper", "La luz del sol destiñe el cobre", "Das Sonnenlicht bleicht das Kupfer aus"]], "medium"],
  ["mercury", ["Which metal is a liquid at room temperature?", "¿Qué metal es líquido a temperatura ambiente?", "Welches Metall ist bei Raumtemperatur flüssig?"],
    ["Mercury", "Mercurio", "Quecksilber"], [["Lead", "Plomo", "Blei"], ["Tin", "Estaño", "Zinn"], ["Aluminium", "Aluminio", "Aluminium"], ["Silver", "Plata", "Silber"]], "easy"],
  ["cabbage", ["Red cabbage juice changes colour to show whether a liquid is…", "El jugo de col lombarda cambia de color para mostrar si un líquido es…", "Rotkohlsaft zeigt durch seine Farbe an, ob eine Flüssigkeit …"],
    ["Acidic or alkaline", "Ácido o básico", "sauer oder basisch ist"], [["Hot or cold", "Caliente o frío", "heiß oder kalt ist"], ["Magnetic or not", "Magnético o no", "magnetisch ist oder nicht"], ["Radioactive or not", "Radiactivo o no", "radioaktiv ist oder nicht"], ["Fresh or frozen", "Fresco o congelado", "frisch oder gefroren ist"]], "medium"],
  ["oil", ["Why does oil float on water?", "¿Por qué el aceite flota sobre el agua?", "Warum schwimmt Öl auf Wasser?"],
    ["Oil is less dense than water", "El aceite es menos denso que el agua", "Öl hat eine geringere Dichte als Wasser"], [["Oil is denser than water", "El aceite es más denso que el agua", "Öl hat eine größere Dichte als Wasser"], ["Oil is warmer than water", "El aceite está más caliente que el agua", "Öl ist wärmer als Wasser"], ["Oil is magnetic", "El aceite es magnético", "Öl ist magnetisch"]], "easy"],
  ["road-salt", ["Why is salt spread on icy roads in winter?", "¿Por qué se echa sal en las carreteras heladas en invierno?", "Warum streut man im Winter Salz auf vereiste Straßen?"],
    ["Salt lowers the freezing point of water", "La sal baja el punto de congelación del agua", "Salz senkt den Gefrierpunkt des Wassers"], [["Salt makes the ice heavier", "La sal hace el hielo más pesado", "Salz macht das Eis schwerer"], ["Salt reflects the sunlight", "La sal refleja la luz del sol", "Salz reflektiert das Sonnenlicht"], ["Salt soaks up the cold", "La sal absorbe el frío", "Salz saugt die Kälte auf"]], "easy"],
  ["apple", ["Why does a cut apple turn brown?", "¿Por qué una manzana cortada se pone marrón?", "Warum wird ein angeschnittener Apfel braun?"],
    ["Substances in it react with oxygen in the air", "Sus sustancias reaccionan con el oxígeno del aire", "Stoffe darin reagieren mit dem Sauerstoff der Luft"], [["It soaks up dust from the air", "Absorbe el polvo del aire", "Er saugt Staub aus der Luft auf"], ["Light bleaches its colour", "La luz destiñe su color", "Licht bleicht seine Farbe aus"], ["It loses all its sugar at once", "Pierde todo su azúcar de golpe", "Er verliert schlagartig seinen ganzen Zucker"]], "medium"],
  ["candle", ["Burning a candle produces water vapour and which gas?", "Al arder una vela se producen vapor de agua y ¿qué gas?", "Beim Brennen einer Kerze entstehen Wasserdampf und welches Gas?"], CO2, [O2, HE, H2, CL], "medium"],
  ["limescale", ["What is the white limescale in a kettle mostly made of?", "¿De qué está hecha principalmente la cal blanca de un hervidor?", "Woraus besteht der weiße Kalk im Wasserkocher hauptsächlich?"],
    ["Calcium carbonate", "Carbonato de calcio", "Calciumcarbonat"], [["Sodium chloride (salt)", "Cloruro de sodio (sal)", "Natriumchlorid (Salz)"], ["Rust (iron oxide)", "Óxido de hierro", "Rost (Eisenoxid)"], ["Sugar", "Azúcar", "Zucker"], ["Sulfur", "Azufre", "Schwefel"]], "medium"],
];

/** Separating mixtures: id, task, method key, extra keys that also work and must not be offered */
export const METHODS: Record<string, L> = {
  filter: ["Filtering", "Filtrar", "Filtrieren"],
  evaporate: ["Evaporating the water", "Evaporar el agua", "Eindampfen"],
  distil: ["Distilling", "Destilar", "Destillieren"],
  magnet: ["Using a magnet", "Usar un imán", "Einen Magneten benutzen"],
  chroma: ["Chromatography", "Cromatografía", "Chromatografie"],
  sieve: ["Sieving", "Tamizar", "Sieben"],
  centrifuge: ["Spinning in a centrifuge", "Centrifugar", "Zentrifugieren"],
  dissolve: ["Dissolving", "Disolver", "Auflösen"],
};
export const SEPARATE: [string, L, string, string[], D][] = [
  ["sand-water", ["sand from water", "la arena del agua", "Sand von Wasser"], "filter", ["sieve", "centrifuge", "evaporate", "distil"], "easy"],
  ["salt-water", ["salt from salty water", "la sal del agua salada", "Salz aus Salzwasser"], "evaporate", ["distil", "centrifuge"], "medium"],
  ["fresh-water", ["drinkable water from seawater", "agua potable del agua de mar", "Trinkwasser aus Meerwasser"], "distil", ["evaporate", "centrifuge"], "medium"],
  ["iron-sand", ["iron filings from sand", "las limaduras de hierro de la arena", "Eisenspäne von Sand"], "magnet", ["sieve"], "easy"],
  ["ink", ["the different colours in ink", "los distintos colores de una tinta", "die verschiedenen Farbstoffe einer Tinte"], "chroma", [], "medium"],
  ["gravel", ["small stones from sand", "las piedrecitas de la arena", "kleine Steine von Sand"], "sieve", ["magnet"], "easy"],
  ["cream", ["cream from milk in a dairy", "la nata de la leche en una central lechera", "Rahm von Milch in einer Molkerei"], "centrifuge", ["filter", "sieve"], "hard"],
  ["brandy", ["alcohol from wine", "el alcohol del vino", "Alkohol aus Wein"], "distil", ["evaporate", "centrifuge"], "medium"],
];

/** Chemical vs physical changes */
export const CHEM_CHANGES: L[] = [
  ["Burning wood", "Quemar madera", "Holz verbrennen"],
  ["An iron nail rusting", "Oxidarse un clavo de hierro", "Ein Eisennagel rostet"],
  ["Baking a cake", "Hornear un bizcocho", "Einen Kuchen backen"],
  ["Frying an egg", "Freír un huevo", "Ein Ei braten"],
  ["Milk going sour", "Agriarse la leche", "Milch wird sauer"],
  ["Fireworks exploding", "Estallar fuegos artificiales", "Feuerwerk explodiert"],
  ["Toasting bread", "Tostar pan", "Brot toasten"],
  ["Fruit rotting", "Pudrirse la fruta", "Obst verfault"],
  ["Lighting a match", "Encender una cerilla", "Ein Streichholz anzünden"],
  ["Digesting food", "Digerir la comida", "Nahrung verdauen"],
];
export const PHYS_CHANGES: L[] = [
  ["Melting ice", "Derretir hielo", "Eis schmelzen"],
  ["Boiling water", "Hervir agua", "Wasser zum Sieden bringen"],
  ["Dissolving sugar in tea", "Disolver azúcar en el té", "Zucker in Tee auflösen"],
  ["Cutting paper", "Cortar papel", "Papier schneiden"],
  ["Breaking a glass", "Romper un vaso", "Ein Glas zerbrechen"],
  ["Freezing water", "Congelar agua", "Wasser einfrieren"],
  ["Crushing a can", "Aplastar una lata", "Eine Dose zerdrücken"],
  ["Mixing sand and salt", "Mezclar arena y sal", "Sand und Salz mischen"],
  ["Stretching a rubber band", "Estirar una goma elástica", "Ein Gummiband dehnen"],
  ["Sharpening a pencil", "Sacar punta a un lápiz", "Einen Bleistift spitzen"],
  ["Steam misting up a mirror", "Empañarse un espejo con vapor", "Ein Spiegel beschlägt durch Dampf"],
];

/** Melting points in °C (textbook values; only compared with a big gap) */
export const MELTING: [string, string, string, number][] = [
  ["Ice", "Hielo", "Eis", 0],
  ["Mercury", "Mercurio", "Quecksilber", -39],
  ["Tin", "Estaño", "Zinn", 232],
  ["Lead", "Plomo", "Blei", 327],
  ["Zinc", "Zinc", "Zink", 420],
  ["Aluminium", "Aluminio", "Aluminium", 660],
  ["Table salt", "Sal común", "Kochsalz", 801],
  ["Silver", "Plata", "Silber", 962],
  ["Gold", "Oro", "Gold", 1064],
  ["Iron", "Hierro", "Eisen", 1538],
  ["Platinum", "Platino", "Platin", 1768],
  ["Tungsten", "Wolframio", "Wolfram", 3422],
];

const REPEL: L = ["They push each other away", "Se repelen", "Sie stoßen sich ab"];
const ATTRACT: L = ["They pull towards each other", "Se atraen", "Sie ziehen sich an"];
const NOTHING: L = ["Nothing happens", "No pasa nada", "Nichts passiert"];
const LOSE: L = ["They lose their magnetism", "Pierden su magnetismo", "Sie verlieren ihren Magnetismus"];
const HOT: L = ["They get hot", "Se calientan", "Sie werden heiß"];
export const MAGNETS: Fact[] = [
  ["like", ["What happens when you hold the north poles of two magnets together?", "¿Qué ocurre al acercar los polos norte de dos imanes?", "Was passiert, wenn man die Nordpole zweier Magnete aneinanderhält?"], REPEL, [ATTRACT, NOTHING, LOSE, HOT], "easy"],
  ["unlike", ["What happens when you hold the north pole of one magnet near the south pole of another?", "¿Qué ocurre al acercar el polo norte de un imán al polo sur de otro?", "Was passiert, wenn man den Nordpol eines Magneten an den Südpol eines anderen hält?"], ATTRACT, [REPEL, NOTHING, LOSE, HOT], "easy"],
  ["compass", ["Which way does the marked end of a compass needle point?", "¿Hacia dónde apunta el extremo marcado de la aguja de una brújula?", "Wohin zeigt das markierte Ende einer Kompassnadel?"],
    ["North", "Al norte", "Nach Norden"], [["East", "Al este", "Nach Osten"], ["West", "Al oeste", "Nach Westen"], ["Towards the Sun", "Hacia el Sol", "Zur Sonne"], ["Straight down", "Hacia abajo", "Senkrecht nach unten"]], "easy"],
  ["compass-china", ["Where was the magnetic compass first used for navigation?", "¿Dónde se usó por primera vez la brújula magnética para navegar?", "Wo wurde der Magnetkompass zuerst zur Navigation verwendet?"],
    ["China", "China", "China"], [["Ancient Egypt", "Antiguo Egipto", "Altes Ägypten"], ["Ancient Greece", "Antigua Grecia", "Antikes Griechenland"], ["The Inca Empire", "Imperio inca", "Inkareich"], ["Ancient Rome", "Antigua Roma", "Antikes Rom"]], "medium"],
  ["cut", ["What happens if you break a bar magnet in half?", "¿Qué ocurre si partes un imán de barra por la mitad?", "Was passiert, wenn man einen Stabmagneten in der Mitte durchbricht?"],
    ["You get two magnets, each with a north and a south pole", "Obtienes dos imanes, cada uno con un polo norte y un polo sur", "Man erhält zwei Magnete mit je einem Nord- und einem Südpol"], [["One half has only a north pole, the other only a south pole", "Una mitad tiene solo polo norte y la otra solo polo sur", "Eine Hälfte hat nur einen Nordpol, die andere nur einen Südpol"], ["Both halves stop being magnetic", "Las dos mitades dejan de ser magnéticas", "Beide Hälften sind nicht mehr magnetisch"], ["Both halves become twice as strong", "Las dos mitades se vuelven el doble de fuertes", "Beide Hälften werden doppelt so stark"]], "medium"],
  ["electromagnet", ["What do we call a magnet made by passing an electric current through a coil of wire?", "¿Cómo se llama un imán que se crea haciendo pasar corriente por una bobina de cable?", "Wie nennt man einen Magneten, der entsteht, wenn Strom durch eine Drahtspule fließt?"],
    ["Electromagnet", "Electroimán", "Elektromagnet"], [["Permanent magnet", "Imán permanente", "Dauermagnet"], ["Horseshoe magnet", "Imán de herradura", "Hufeisenmagnet"], ["Lodestone", "Piedra imán", "Magneteisenstein"], ["Compass", "Brújula", "Kompass"]], "easy"],
  ["lodestone", ["What is the name of the naturally magnetic rock used in the first compasses?", "¿Cómo se llama la roca magnética natural que se usó en las primeras brújulas?", "Wie heißt das natürlich magnetische Gestein, das in den ersten Kompassen verwendet wurde?"],
    ["Lodestone (magnetite)", "Piedra imán (magnetita)", "Magneteisenstein (Magnetit)"], [["Granite", "Granito", "Granit"], ["Marble", "Mármol", "Marmor"], ["Quartz", "Cuarzo", "Quarz"], ["Limestone", "Caliza", "Kalkstein"]], "medium"],
  ["strongest", ["Where is a bar magnet's pull strongest?", "¿Dónde es más fuerte la atracción de un imán de barra?", "Wo ist die Anziehungskraft eines Stabmagneten am stärksten?"],
    ["At its two ends (the poles)", "En sus dos extremos (los polos)", "An den beiden Enden (den Polen)"], [["Exactly in the middle", "Justo en el centro", "Genau in der Mitte"], ["Equally strong everywhere", "Igual de fuerte en todas partes", "Überall gleich stark"], ["Only along one long side", "Solo en uno de sus lados largos", "Nur an einer Längsseite"]], "medium"],
  ["shield", ["What does the Earth's magnetic field protect us from?", "¿De qué nos protege el campo magnético terrestre?", "Wovor schützt uns das Magnetfeld der Erde?"],
    ["Charged particles from the Sun (the solar wind)", "De las partículas cargadas del Sol (el viento solar)", "Vor geladenen Teilchen der Sonne (dem Sonnenwind)"], [["Meteorites", "De los meteoritos", "Vor Meteoriten"], ["Earthquakes", "De los terremotos", "Vor Erdbeben"], ["The Moon's gravity", "De la gravedad de la Luna", "Vor der Schwerkraft des Mondes"], ["Heavy rain", "De las lluvias fuertes", "Vor starkem Regen"]], "medium"],
  ["jupiter", ["Which planet has the strongest magnetic field?", "¿Qué planeta tiene el campo magnético más fuerte?", "Welcher Planet hat das stärkste Magnetfeld?"],
    ["Jupiter", "Júpiter", "Jupiter"], [["Earth", "Tierra", "Erde"], ["Mars", "Marte", "Mars"], ["Venus", "Venus", "Venus"], ["Mercury", "Mercurio", "Merkur"]], "hard"],
];

const REFRACTION: L = ["Refraction", "Refracción", "Brechung"];
const REFLECTION: L = ["Reflection", "Reflexión", "Reflexion"];
const ABSORPTION: L = ["Absorption", "Absorción", "Absorption"];
const EMISSION: L = ["Emission", "Emisión", "Emission"];
const TRANSPARENT: L = ["Transparent", "Transparente", "Durchsichtig"];
const TRANSLUCENT: L = ["Translucent", "Translúcido", "Durchscheinend"];
const OPAQUE: L = ["Opaque", "Opaco", "Undurchsichtig"];
const SHINY: L = ["Reflective", "Reflectante", "Spiegelnd"];
const CONCAVE: L = ["A concave (diverging) lens", "Una lente cóncava (divergente)", "Eine konkave Linse (Zerstreuungslinse)"];
const CONVEX: L = ["A convex (converging) lens", "Una lente convexa (convergente)", "Eine konvexe Linse (Sammellinse)"];
const FLAT_GLASS: L = ["A flat pane of glass", "Un cristal plano", "Eine flache Glasscheibe"];
const COLOUR_FILTER: L = ["A coloured filter", "Un filtro de color", "Ein Farbfilter"];
export const LIGHT: Fact[] = [
  ["prism", ["What can you use to split white light into the colours of the rainbow?", "¿Qué puedes usar para descomponer la luz blanca en los colores del arcoíris?", "Womit kann man weißes Licht in die Regenbogenfarben zerlegen?"],
    ["A prism", "Un prisma", "Ein Prisma"], [["A flat mirror", "Un espejo plano", "Ein flacher Spiegel"], ["A magnet", "Un imán", "Ein Magnet"], ["A sheet of black paper", "Una hoja de papel negro", "Ein schwarzes Blatt Papier"], ["A metal plate", "Una placa de metal", "Eine Metallplatte"]], "easy"],
  ["refraction", ["What is it called when light bends as it passes from air into water?", "¿Cómo se llama el fenómeno por el que la luz se desvía al pasar del aire al agua?", "Wie nennt man es, wenn Licht beim Übergang von Luft in Wasser abknickt?"], REFRACTION, [REFLECTION, ABSORPTION, EMISSION], "medium"],
  ["reflection", ["What is it called when light bounces off a mirror?", "¿Cómo se llama el fenómeno por el que la luz rebota en un espejo?", "Wie nennt man es, wenn Licht von einem Spiegel zurückgeworfen wird?"], REFLECTION, [REFRACTION, ABSORPTION, EMISSION], "easy"],
  ["straw", ["Why does a straw in a glass of water look bent?", "¿Por qué una pajita en un vaso de agua parece doblada?", "Warum sieht ein Strohhalm in einem Glas Wasser geknickt aus?"],
    ["Light changes direction at the water's surface", "La luz cambia de dirección en la superficie del agua", "Das Licht ändert an der Wasseroberfläche seine Richtung"], [["The water really bends the straw", "El agua dobla de verdad la pajita", "Das Wasser verbiegt den Strohhalm wirklich"], ["The glass absorbs part of the straw's colour", "El vaso absorbe parte del color de la pajita", "Das Glas schluckt einen Teil der Farbe des Strohhalms"], ["Light travels faster in water than in air", "La luz viaja más rápido en el agua que en el aire", "Licht ist im Wasser schneller als in der Luft"]], "medium"],
  ["short-sight", ["Which kind of lens do glasses for short-sighted people use?", "¿Qué tipo de lente llevan las gafas para personas miopes?", "Welche Art von Linse haben Brillen für Kurzsichtige?"], CONCAVE, [CONVEX, FLAT_GLASS, COLOUR_FILTER], "hard"],
  ["long-sight", ["Which kind of lens do glasses for long-sighted people use?", "¿Qué tipo de lente llevan las gafas para personas hipermétropes?", "Welche Art von Linse haben Brillen für Weitsichtige?"], CONVEX, [CONCAVE, FLAT_GLASS, COLOUR_FILTER], "hard"],
  ["magnifier", ["What kind of lens is a magnifying glass?", "¿Qué tipo de lente es una lupa?", "Was für eine Linse ist eine Lupe?"], CONVEX, [CONCAVE, FLAT_GLASS, COLOUR_FILTER], "medium"],
  ["white", ["Why does a white T-shirt look white?", "¿Por qué una camiseta blanca se ve blanca?", "Warum sieht ein weißes T-Shirt weiß aus?"],
    ["It reflects all colours of light", "Refleja todos los colores de la luz", "Es reflektiert alle Farben des Lichts"], [["It absorbs all colours of light", "Absorbe todos los colores de la luz", "Es schluckt alle Farben des Lichts"], ["It gives off its own light", "Emite luz propia", "Es leuchtet von selbst"], ["It reflects only blue light", "Solo refleja la luz azul", "Es reflektiert nur blaues Licht"]], "medium"],
  ["black", ["Why do black clothes warm up faster in the sun?", "¿Por qué la ropa negra se calienta más rápido al sol?", "Warum erwärmt sich schwarze Kleidung in der Sonne schneller?"],
    ["They absorb more light", "Absorbe más luz", "Sie nimmt mehr Licht auf"], [["They reflect more light", "Refleja más luz", "Sie reflektiert mehr Licht"], ["They are heavier", "Pesa más", "Sie ist schwerer"], ["They let more light through", "Deja pasar más luz", "Sie lässt mehr Licht durch"]], "easy"],
  ["red-apple", ["Why does a red apple look red?", "¿Por qué una manzana roja se ve roja?", "Warum sieht ein roter Apfel rot aus?"],
    ["It reflects red light and absorbs the other colours", "Refleja la luz roja y absorbe los demás colores", "Er reflektiert rotes Licht und schluckt die anderen Farben"], [["It absorbs red light and reflects the others", "Absorbe la luz roja y refleja los demás colores", "Er schluckt rotes Licht und reflektiert die anderen Farben"], ["It glows with its own red light", "Brilla con luz roja propia", "Er leuchtet mit eigenem rotem Licht"], ["It reflects all colours equally", "Refleja todos los colores por igual", "Er reflektiert alle Farben gleich stark"]], "medium"],
  ["rgb", ["Which colour do you get when you shine red, green and blue light on the same spot?", "¿Qué color se obtiene al proyectar luz roja, verde y azul sobre el mismo punto?", "Welche Farbe entsteht, wenn rotes, grünes und blaues Licht auf dieselbe Stelle fallen?"],
    ["White", "Blanco", "Weiß"], [["Black", "Negro", "Schwarz"], ["Brown", "Marrón", "Braun"], ["Purple", "Morado", "Lila"]], "medium"],
  ["shadow", ["Why do shadows form?", "¿Por qué se forman las sombras?", "Warum entstehen Schatten?"],
    ["Light travels in straight lines and cannot pass through opaque objects", "La luz viaja en línea recta y no atraviesa los objetos opacos", "Licht breitet sich geradlinig aus und kann undurchsichtige Körper nicht durchdringen"], [["Objects give off darkness", "Los objetos emiten oscuridad", "Gegenstände strahlen Dunkelheit aus"], ["Light bends around every object", "La luz rodea todos los objetos", "Licht biegt sich um jeden Gegenstand herum"], ["The air behind objects turns dark", "El aire detrás de los objetos se oscurece", "Die Luft hinter Gegenständen wird dunkel"]], "easy"],
  ["transparent", ["What do we call a material, like clear window glass, that you can see straight through?", "¿Cómo se llama un material, como el cristal de una ventana, a través del cual se ve con claridad?", "Wie nennt man ein Material wie klares Fensterglas, durch das man klar hindurchsehen kann?"], TRANSPARENT, [TRANSLUCENT, OPAQUE, SHINY], "easy"],
  ["translucent", ["What do we call a material, like frosted glass, that lets light through but that you cannot see clearly through?", "¿Cómo se llama un material, como el cristal esmerilado, que deja pasar la luz pero no permite ver con claridad?", "Wie nennt man ein Material wie Milchglas, das Licht durchlässt, durch das man aber nicht klar sieht?"], TRANSLUCENT, [TRANSPARENT, OPAQUE, SHINY], "medium"],
  ["opaque", ["What do we call a material, like wood, that lets no light through at all?", "¿Cómo se llama un material, como la madera, que no deja pasar nada de luz?", "Wie nennt man ein Material wie Holz, das überhaupt kein Licht durchlässt?"], OPAQUE, [TRANSPARENT, TRANSLUCENT, SHINY], "easy"],
  ["periscope", ["Which device uses two mirrors to let you see over a wall or out of a submarine?", "¿Qué aparato usa dos espejos para ver por encima de un muro o desde un submarino?", "Welches Gerät nutzt zwei Spiegel, um über eine Mauer oder aus einem U-Boot zu sehen?"],
    ["Periscope", "Periscopio", "Periskop"], [["Telescope", "Telescopio", "Teleskop"], ["Microscope", "Microscopio", "Mikroskop"], ["Stethoscope", "Estetoscopio", "Stethoskop"], ["Kaleidoscope", "Caleidoscopio", "Kaleidoskop"]], "easy"],
];

const ECHO_WRONG: L[] = [
  ["Sound that the wind has made louder", "Un sonido que el viento ha hecho más fuerte", "Schall, den der Wind lauter gemacht hat"],
  ["A sound that only animals can hear", "Un sonido que solo oyen los animales", "Ein Geräusch, das nur Tiere hören"],
  ["Sound swallowed by soft walls", "Un sonido absorbido por paredes blandas", "Schall, der von weichen Wänden geschluckt wird"],
];
export const SOUND: Fact[] = [
  ["vacuum", ["Why can't sound travel through empty space?", "¿Por qué el sonido no puede viajar por el espacio vacío?", "Warum kann sich Schall nicht im leeren Weltraum ausbreiten?"],
    ["There is no air or other matter to carry the vibrations", "No hay aire ni otra materia que transmita las vibraciones", "Es gibt keine Luft oder andere Materie, die die Schwingungen weiterträgt"], [["It is far too cold", "Hace demasiado frío", "Es ist viel zu kalt"], ["Sunlight drowns it out", "La luz del sol lo tapa", "Das Sonnenlicht übertönt ihn"], ["It is too dark", "Está demasiado oscuro", "Es ist zu dunkel"]], "easy"],
  ["echo", ["What is an echo?", "¿Qué es un eco?", "Was ist ein Echo?"],
    ["Sound reflected back from a surface", "Un sonido reflejado por una superficie", "Schall, der von einer Fläche zurückgeworfen wird"], ECHO_WRONG, "easy"],
  ["decibel", ["In which unit is the loudness of sound usually measured?", "¿En qué unidad se suele medir el nivel de un sonido?", "In welcher Einheit misst man meist die Lautstärke?"],
    ["Decibels (dB)", "Decibelios (dB)", "Dezibel (dB)"], [["Hertz (Hz)", "Hercios (Hz)", "Hertz (Hz)"], ["Lumens (lm)", "Lúmenes (lm)", "Lumen (lm)"], ["Newtons (N)", "Newtons (N)", "Newton (N)"], ["Kelvin (K)", "Kelvin (K)", "Kelvin (K)"]], "easy"],
  ["pitch", ["What decides how high or low a note sounds (its pitch)?", "¿Qué determina lo agudo o grave que suena una nota (su tono)?", "Was bestimmt, wie hoch oder tief ein Ton klingt?"],
    ["How fast the source vibrates (frequency)", "La rapidez con que vibra la fuente (frecuencia)", "Wie schnell die Quelle schwingt (Frequenz)"], [["How loud it is", "Lo fuerte que suena", "Wie laut er ist"], ["How far away you are", "Lo lejos que estás", "Wie weit man entfernt ist"], ["The colour of the instrument", "El color del instrumento", "Die Farbe des Instruments"]], "medium"],
  ["water", ["Does sound travel faster in water or in air?", "¿El sonido viaja más rápido en el agua o en el aire?", "Breitet sich Schall im Wasser oder in der Luft schneller aus?"],
    ["In water – about four times faster", "En el agua, unas cuatro veces más rápido", "Im Wasser – etwa viermal so schnell"], [["In air – about four times faster", "En el aire, unas cuatro veces más rápido", "In der Luft – etwa viermal so schnell"], ["Equally fast in both", "Igual de rápido en ambos", "In beiden gleich schnell"], ["Sound cannot travel through water", "El sonido no puede viajar por el agua", "Im Wasser kann sich Schall nicht ausbreiten"]], "medium"],
  ["steel", ["In which of these does sound travel fastest?", "¿En cuál de estos medios viaja más rápido el sonido?", "In welchem dieser Stoffe breitet sich Schall am schnellsten aus?"],
    ["Steel", "Acero", "Stahl"], [["Water", "Agua", "Wasser"], ["Air", "Aire", "Luft"], ["Helium gas", "Gas helio", "Heliumgas"]], "medium"],
  ["bats", ["How do bats find their way in the dark?", "¿Cómo se orientan los murciélagos en la oscuridad?", "Wie finden sich Fledermäuse im Dunkeln zurecht?"],
    ["They listen for echoes of their own high-pitched calls", "Escuchan los ecos de sus propios chillidos agudos", "Sie horchen auf die Echos ihrer eigenen hohen Rufe"], [["They see infrared light", "Ven la luz infrarroja", "Sie sehen Infrarotlicht"], ["They smell the walls", "Huelen las paredes", "Sie riechen die Wände"], ["Their eyes glow in the dark", "Sus ojos brillan en la oscuridad", "Ihre Augen leuchten im Dunkeln"]], "easy"],
  ["dolphins", ["Which of these animals uses ultrasound (echolocation) to hunt?", "¿Cuál de estos animales usa ultrasonidos (ecolocalización) para cazar?", "Welches dieser Tiere jagt mit Ultraschall (Echoortung)?"],
    ["Dolphin", "Delfín", "Delfin"], [["Cow", "Vaca", "Kuh"], ["Giraffe", "Jirafa", "Giraffe"], ["Horse", "Caballo", "Pferd"], ["Eagle", "Águila", "Adler"]], "easy"],
  ["elephants", ["Which large animal talks to others with very deep sounds (infrasound) that humans cannot hear?", "¿Qué animal grande se comunica con sonidos muy graves (infrasonidos) que los humanos no oímos?", "Welches große Tier verständigt sich mit sehr tiefen Tönen (Infraschall), die Menschen nicht hören?"],
    ["Elephant", "Elefante", "Elefant"], [["Bat", "Murciélago", "Fledermaus"], ["Mouse", "Ratón", "Maus"], ["Parrot", "Loro", "Papagei"], ["Cat", "Gato", "Katze"]], "medium"],
  ["dog-whistle", ["Why can a dog hear a dog whistle when people can't?", "¿Por qué un perro oye un silbato para perros y las personas no?", "Warum hört ein Hund eine Hundepfeife, Menschen aber nicht?"],
    ["Its sound is too high-pitched for human ears", "Su sonido es demasiado agudo para el oído humano", "Ihr Ton ist zu hoch für menschliche Ohren"], [["Its sound is too low-pitched for human ears", "Su sonido es demasiado grave para el oído humano", "Ihr Ton ist zu tief für menschliche Ohren"], ["It makes no sound, only a smell", "No suena, solo desprende un olor", "Sie macht kein Geräusch, nur einen Geruch"], ["Dogs feel the light it gives off", "Los perros sienten la luz que emite", "Hunde spüren das Licht, das sie aussendet"]], "medium"],
  ["sonic-boom", ["What is the loud bang called when a plane flies faster than sound?", "¿Cómo se llama el fuerte estruendo de un avión que vuela más rápido que el sonido?", "Wie heißt der laute Knall, wenn ein Flugzeug schneller als der Schall fliegt?"],
    ["Sonic boom", "Estampido sónico", "Überschallknall"], [["Echo", "Eco", "Echo"], ["Doppler effect", "Efecto Doppler", "Dopplereffekt"], ["Thunderclap", "Trueno", "Donnerschlag"]], "medium"],
  ["doppler", ["What makes an ambulance siren sound higher as it comes towards you and lower as it moves away?", "¿Por qué la sirena de una ambulancia suena más aguda al acercarse y más grave al alejarse?", "Warum klingt ein Martinshorn beim Näherkommen höher und beim Wegfahren tiefer?"],
    ["The Doppler effect", "El efecto Doppler", "Der Dopplereffekt"], [["The echo effect", "El efecto eco", "Der Echoeffekt"], ["The greenhouse effect", "El efecto invernadero", "Der Treibhauseffekt"], ["A sonic boom", "Un estampido sónico", "Ein Überschallknall"]], "medium"],
  ["vibration", ["What produces every sound?", "¿Qué produce cualquier sonido?", "Wodurch entsteht jedes Geräusch?"],
    ["Vibrations", "Las vibraciones", "Durch Schwingungen"], [["Light", "La luz", "Durch Licht"], ["Magnetism", "El magnetismo", "Durch Magnetismus"], ["Electric sparks", "Las chispas eléctricas", "Durch elektrische Funken"]], "easy"],
];

/** Simple machines */
export const MACHINES: Record<string, { name: L; ofEn: string; ofEs: string; ofDe: string }> = {
  lever: { name: ["Lever", "Palanca", "Hebel"], ofEn: "a lever", ofEs: "una palanca", ofDe: "einen Hebel" },
  pulley: { name: ["Pulley", "Polea", "Rolle (Seilrolle)"], ofEn: "a pulley", ofEs: "una polea", ofDe: "eine Rolle" },
  wedge: { name: ["Wedge", "Cuña", "Keil"], ofEn: "a wedge", ofEs: "una cuña", ofDe: "einen Keil" },
  screw: { name: ["Screw", "Tornillo", "Schraube"], ofEn: "a screw", ofEs: "un tornillo", ofDe: "eine Schraube" },
  wheel: { name: ["Wheel and axle", "Rueda y eje", "Rad und Achse (Wellrad)"], ofEn: "a wheel and axle", ofEs: "una rueda y eje", ofDe: "ein Wellrad (Rad und Achse)" },
  ramp: { name: ["Inclined plane", "Plano inclinado", "Schiefe Ebene"], ofEn: "an inclined plane", ofEs: "un plano inclinado", ofDe: "eine schiefe Ebene" },
};
/** Examples: [EN, ES, DE (each with article), machine key, difficulty] */
export const MACHINE_EXAMPLES: [string, string, string, string, D][] = [
  ["A seesaw", "Un balancín", "Eine Wippe", "lever", "easy"],
  ["A crowbar", "Una pata de cabra", "Ein Brecheisen", "lever", "medium"],
  ["A bottle opener", "Un abrebotellas", "Ein Flaschenöffner", "lever", "medium"],
  ["An axe blade", "La hoja de un hacha", "Die Klinge einer Axt", "wedge", "easy"],
  ["A knife blade", "La hoja de un cuchillo", "Eine Messerklinge", "wedge", "medium"],
  ["A chisel", "Un cincel", "Ein Meißel", "wedge", "medium"],
  ["The wheel at the top of a flagpole for raising the flag", "La rueda en lo alto de un mástil para izar la bandera", "Das Rad oben am Fahnenmast zum Hissen der Flagge", "pulley", "medium"],
  ["A rope running over a wheel to lift a bucket from a well", "Una cuerda que pasa por una rueda para subir un cubo de un pozo", "Ein Seil über einem Rad, um einen Eimer aus dem Brunnen zu ziehen", "pulley", "medium"],
  ["The lid of a jam jar", "La tapa de un tarro de mermelada", "Der Deckel eines Marmeladenglases", "screw", "medium"],
  ["A piano stool raised by turning the seat", "Un taburete de piano que sube al girar el asiento", "Ein Klavierhocker, den man durch Drehen des Sitzes höher stellt", "screw", "hard"],
  ["A doorknob", "El pomo de una puerta", "Ein Türknauf", "wheel", "medium"],
  ["A rolling pin", "Un rodillo de cocina", "Ein Nudelholz", "wheel", "hard"],
  ["A ramp", "Una rampa", "Eine Rampe", "ramp", "easy"],
  ["A playground slide", "Un tobogán", "Eine Rutsche", "ramp", "easy"],
  ["A zigzag mountain road", "Una carretera de montaña en zigzag", "Eine Serpentinenstraße", "ramp", "medium"],
];

/** Energy */
export const FORMS: Record<string, L> = {
  light: ["Light", "Luz", "Licht"],
  elec: ["electrical energy", "energía eléctrica", "elektrische Energie"],
  heat: ["heat", "calor", "Wärme"],
  move: ["kinetic energy (movement)", "energía cinética (movimiento)", "Bewegungsenergie"],
  chem: ["chemical energy", "energía química", "chemische Energie"],
  sound: ["sound", "sonido", "Schall"],
};
/** [stem, "in …" phrase EN/ES/DE, from, to, conversions never offered, difficulty] */
export const CONVERSIONS: [string, L, string, string, string[], D][] = [
  ["solar", ["in a solar panel", "en un panel solar", "in einer Solarzelle"], "light", "elec", [], "easy"],
  ["wind", ["in a wind turbine", "en un aerogenerador", "in einer Windkraftanlage"], "move", "elec", [], "easy"],
  ["kettle", ["in an electric kettle", "en un hervidor eléctrico", "in einem Wasserkocher"], "elec", "heat", [], "easy"],
  ["motor", ["in an electric motor", "en un motor eléctrico", "in einem Elektromotor"], "elec", "move", ["elec>heat"], "easy"],
  ["dynamo", ["in a bicycle dynamo", "en una dinamo de bicicleta", "in einem Fahrraddynamo"], "move", "elec", [], "medium"],
  ["engine", ["in a petrol engine", "en un motor de gasolina", "in einem Benzinmotor"], "chem", "move", [], "medium"],
  ["speaker", ["in a loudspeaker", "en un altavoz", "in einem Lautsprecher"], "elec", "sound", ["elec>move", "elec>heat"], "medium"],
  ["mic", ["in a microphone", "en un micrófono", "in einem Mikrofon"], "sound", "elec", [], "medium"],
  ["photo", ["during photosynthesis", "durante la fotosíntesis", "bei der Fotosynthese"], "light", "chem", [], "medium"],
  ["charge", ["in a rechargeable battery while it is charging", "en una batería recargable mientras se carga", "in einem Akku beim Aufladen"], "elec", "chem", [], "hard"],
  ["battery", ["in a battery powering a torch", "en una pila que alimenta una linterna", "in einer Batterie, die eine Taschenlampe betreibt"], "chem", "elec", ["elec>light"], "medium"],
  ["lamp", ["in an LED lamp", "en una lámpara LED", "in einer LED-Lampe"], "elec", "light", ["elec>heat"], "easy"],
];
export const STORES: Record<string, L> = {
  chem: ["Chemical energy", "Energía química", "Chemische Energie"],
  elastic: ["Elastic (strain) energy", "Energía elástica", "Spannenergie"],
  grav: ["Gravitational potential energy", "Energía potencial gravitatoria", "Lageenergie"],
  kinetic: ["Kinetic energy", "Energía cinética", "Bewegungsenergie"],
  thermal: ["Thermal energy", "Energía térmica", "Wärmeenergie"],
  nuclear: ["Nuclear energy", "Energía nuclear", "Kernenergie"],
};
/** [stem, thing (EN/ES/DE: dative after "in"), store key, keys never offered, difficulty] */
export const ENERGY_STORES: [string, L, string, string[], D][] = [
  ["food", ["food", "los alimentos", "Nahrungsmitteln"], "chem", [], "easy"],
  ["battery", ["a battery", "una pila", "einer Batterie"], "chem", [], "easy"],
  ["petrol", ["petrol", "la gasolina", "Benzin"], "chem", [], "easy"],
  ["band", ["a stretched rubber band", "una goma elástica estirada", "einem gespannten Gummiband"], "elastic", ["chem"], "medium"],
  ["bow", ["a drawn bow", "un arco tensado", "einem gespannten Bogen"], "elastic", ["chem", "grav"], "medium"],
  ["spring", ["a squashed spring", "un muelle comprimido", "einer zusammengedrückten Feder"], "elastic", ["chem"], "medium"],
  ["dam", ["water held high up behind a dam", "el agua retenida en lo alto de una presa", "Wasser, das hoch hinter einer Staumauer aufgestaut ist"], "grav", ["chem", "kinetic"], "medium"],
  ["shelf", ["a book on a high shelf", "un libro en un estante alto", "einem Buch auf einem hohen Regal"], "grav", ["chem"], "medium"],
  ["ball", ["a rolling bowling ball", "una bola de bolos rodando", "einer rollenden Bowlingkugel"], "kinetic", ["chem"], "easy"],
  ["tea", ["a hot cup of tea", "una taza de té caliente", "einer heißen Tasse Tee"], "thermal", ["chem"], "easy"],
  ["uranium", ["uranium fuel in a power station", "el combustible de uranio de una central", "Uranbrennstoff in einem Kraftwerk"], "nuclear", ["chem"], "medium"],
];

/** Waves and radiation in everyday use */
export const WAVES: Record<string, L> = {
  radio: ["Radio waves", "Ondas de radio", "Radiowellen"],
  micro: ["Microwaves", "Microondas", "Mikrowellen"],
  ir: ["Infrared", "Infrarrojos", "Infrarotstrahlung"],
  visible: ["Visible light", "Luz visible", "Sichtbares Licht"],
  uv: ["Ultraviolet (UV)", "Ultravioleta (UV)", "UV-Strahlung"],
  xray: ["X-rays", "Rayos X", "Röntgenstrahlen"],
  gamma: ["Gamma rays", "Rayos gamma", "Gammastrahlen"],
};
/** [stem, question, wave key, keys never offered, difficulty] */
export const WAVE_USES: [string, L, string, string[], D][] = [
  ["oven", ["Which waves heat the food in a microwave oven?", "¿Qué ondas calientan la comida en un horno microondas?", "Welche Wellen erhitzen das Essen in einem Mikrowellenherd?"], "micro", [], "easy"],
  ["remote", ["What does a TV remote control usually send to the TV?", "¿Qué envía normalmente el mando a distancia al televisor?", "Was sendet eine Fernbedienung normalerweise an den Fernseher?"], "ir", [], "medium"],
  ["bones", ["Which radiation is used to take pictures of broken bones?", "¿Qué radiación se usa para hacer imágenes de huesos rotos?", "Mit welcher Strahlung macht man Bilder von gebrochenen Knochen?"], "xray", [], "easy"],
  ["sunbed", ["Which radiation from the Sun or a sunbed tans the skin?", "¿Qué radiación del Sol o de una cama solar broncea la piel?", "Welche Strahlung der Sonne oder eines Solariums bräunt die Haut?"], "uv", [], "easy"],
  ["thermal", ["What does a thermal camera detect to show warm bodies in the dark?", "¿Qué detecta una cámara térmica para mostrar cuerpos calientes en la oscuridad?", "Was erfasst eine Wärmebildkamera, um warme Körper im Dunkeln zu zeigen?"], "ir", [], "medium"],
  ["banknote", ["Under which kind of lamp do hidden security marks on banknotes glow?", "¿Bajo qué tipo de lámpara brillan las marcas de seguridad ocultas de los billetes?", "Unter welcher Art von Lampe leuchten versteckte Sicherheitsmerkmale auf Geldscheinen?"], "uv", [], "medium"],
  ["sterilise", ["Which very penetrating radiation from radioactive sources is used to sterilise sealed medical equipment?", "¿Qué radiación muy penetrante de fuentes radiactivas se usa para esterilizar material médico ya envasado?", "Welche sehr durchdringende Strahlung radioaktiver Quellen nutzt man, um verpacktes medizinisches Material zu sterilisieren?"], "gamma", ["xray", "uv"], "hard"],
  ["phone", ["What do mobile phones use to send calls to a phone mast?", "¿Qué usan los teléfonos móviles para enviar las llamadas a una antena?", "Womit übertragen Handys Gespräche zum Sendemast?"], "radio", ["micro"], "medium"],
  ["satellite-tv", ["Which waves does a satellite TV dish receive from space?", "¿Qué ondas recibe del espacio una antena parabólica de televisión?", "Welche Wellen empfängt eine Satellitenschüssel aus dem All?"], "micro", ["radio"], "hard"],
  ["photosynthesis", ["Which part of sunlight do plants mainly use for photosynthesis?", "¿Qué parte de la luz solar usan principalmente las plantas para la fotosíntesis?", "Welchen Teil des Sonnenlichts nutzen Pflanzen vor allem für die Fotosynthese?"], "visible", ["uv", "ir"], "medium"],
  ["airport", ["Which radiation do airport scanners use to look inside suitcases?", "¿Qué radiación usan los escáneres de los aeropuertos para ver el interior de las maletas?", "Mit welcher Strahlung durchleuchten Scanner am Flughafen Koffer?"], "xray", ["gamma"], "medium"],
  ["black-light", ["What makes white clothes glow under a “black light” at a party?", "¿Qué hace que la ropa blanca brille bajo una «luz negra» en una fiesta?", "Was lässt weiße Kleidung unter „Schwarzlicht“ auf einer Party leuchten?"], "uv", [], "medium"],
];

// ═══ people ════════════════════════════════════════════════════════
/** Scientists and inventors: [name, country id of birthplace (present-day borders), difficulty] */
export const BORN: [string, string, D][] = [
  ["Albert Einstein", "germany", "medium"], ["Marie Curie", "poland", "medium"], ["Isaac Newton", "uk", "easy"],
  ["Charles Darwin", "uk", "easy"], ["Galileo Galilei", "italy", "easy"], ["Nicolaus Copernicus", "poland", "medium"],
  ["Johannes Kepler", "germany", "medium"], ["Dmitri Mendeleev", "russia", "easy"], ["Nikola Tesla", "croatia", "hard"],
  ["Louis Pasteur", "france", "easy"], ["Gregor Mendel", "czechia", "hard"], ["Alfred Nobel", "sweden", "medium"],
  ["Carl Linnaeus", "sweden", "medium"], ["Niels Bohr", "denmark", "medium"], ["Alexander Fleming", "uk", "medium"],
  ["Wilhelm Röntgen", "germany", "medium"], ["Antoine Lavoisier", "france", "medium"], ["Alessandro Volta", "italy", "medium"],
  ["Guglielmo Marconi", "italy", "medium"], ["Christiaan Huygens", "netherlands", "hard"], ["Michael Faraday", "uk", "medium"],
  ["Thomas Edison", "usa", "easy"], ["Alexander Graham Bell", "uk", "hard"], ["Max Planck", "germany", "medium"],
  ["Erwin Schrödinger", "austria", "hard"], ["Lise Meitner", "austria", "hard"], ["Ernest Rutherford", "new_zealand", "hard"],
  ["Frederick Banting", "canada", "hard"], ["Santiago Ramón y Cajal", "spain", "medium"], ["Aristotle", "greece", "easy"],
  ["René Descartes", "france", "medium"], ["Blaise Pascal", "france", "medium"], ["Enrico Fermi", "italy", "medium"],
  ["Anders Celsius", "sweden", "medium"], ["Hans Christian Ørsted", "denmark", "hard"], ["Heinrich Hertz", "germany", "medium"],
  ["C. V. Raman", "india", "hard"], ["Hideki Yukawa", "japan", "hard"], ["Edwin Hubble", "usa", "medium"],
  ["Stephen Hawking", "uk", "easy"], ["Carl Sagan", "usa", "medium"], ["Robert Koch", "germany", "medium"],
  ["Amedeo Avogadro", "italy", "medium"], ["Ivan Pavlov", "russia", "medium"], ["Mikhail Lomonosov", "russia", "hard"],
  ["Isaac Peral", "spain", "hard"], ["Severo Ochoa", "spain", "hard"], ["Margarita Salas", "spain", "hard"],
  ["Christiaan Barnard", "south_africa", "hard"], ["Srinivasa Ramanujan", "india", "hard"], ["Abdus Salam", "pakistan", "hard"],
  ["Ahmed Zewail", "egypt", "hard"], ["Tu Youyou", "china", "hard"], ["Bernardo Houssay", "argentina", "hard"],
  ["Mario Molina", "mexico", "hard"], ["Hideyo Noguchi", "japan", "hard"], ["Wangari Maathai", "kenya", "hard"],
];

/** Women in science: [name, achievement (3rd person past, lower case), difficulty] */
export const WOMEN: [string, L, D][] = [
  ["Marie Curie", ["was the first person to win two Nobel Prizes", "fue la primera persona en ganar dos premios Nobel", "gewann als erster Mensch zwei Nobelpreise"], "easy"],
  ["Lise Meitner", ["helped explain nuclear fission (1938–39)", "ayudó a explicar la fisión nuclear (1938-39)", "half, die Kernspaltung zu erklären (1938/39)"], "hard"],
  ["Jane Goodall", ["studied wild chimpanzees in Tanzania for decades", "estudió durante décadas a los chimpancés salvajes de Tanzania", "erforschte jahrzehntelang wilde Schimpansen in Tansania"], "easy"],
  ["Dian Fossey", ["studied mountain gorillas in Rwanda", "estudió a los gorilas de montaña en Ruanda", "erforschte Berggorillas in Ruanda"], "medium"],
  ["Rachel Carson", ["warned about the dangers of pesticides in her book “Silent Spring” (1962)", "advirtió de los peligros de los pesticidas en su libro «Primavera silenciosa» (1962)", "warnte in ihrem Buch „Der stumme Frühling“ (1962) vor Pestiziden"], "medium"],
  ["Mary Anning", ["found famous fossils of ichthyosaurs and plesiosaurs on the English coast", "encontró famosos fósiles de ictiosaurios y plesiosaurios en la costa inglesa", "fand berühmte Fossilien von Ichthyosauriern und Plesiosauriern an der englischen Küste"], "hard"],
  ["Caroline Herschel", ["discovered several comets in the 18th century", "descubrió varios cometas en el siglo XVIII", "entdeckte im 18. Jahrhundert mehrere Kometen"], "hard"],
  ["Hypatia", ["taught mathematics and astronomy in ancient Alexandria", "enseñó matemáticas y astronomía en la antigua Alejandría", "lehrte im antiken Alexandria Mathematik und Astronomie"], "medium"],
  ["Dorothy Hodgkin", ["used X-rays to work out the structures of penicillin and vitamin B12", "descifró con rayos X la estructura de la penicilina y de la vitamina B12", "entschlüsselte mit Röntgenstrahlen die Struktur von Penicillin und Vitamin B12"], "hard"],
  ["Katherine Johnson", ["calculated flight paths for NASA's first crewed space missions", "calculó las trayectorias de las primeras misiones tripuladas de la NASA", "berechnete Flugbahnen für die ersten bemannten Raumflüge der NASA"], "medium"],
  ["Jocelyn Bell Burnell", ["discovered the first pulsars (1967)", "descubrió los primeros púlsares (1967)", "entdeckte die ersten Pulsare (1967)"], "hard"],
  ["Tu Youyou", ["discovered artemisinin, a drug against malaria", "descubrió la artemisinina, un fármaco contra la malaria", "entdeckte Artemisinin, ein Mittel gegen Malaria"], "hard"],
  ["Vera Rubin", ["found evidence for dark matter from the way galaxies rotate", "halló pruebas de la materia oscura a partir de la rotación de las galaxias", "fand anhand der Rotation von Galaxien Hinweise auf Dunkle Materie"], "hard"],
  ["Cecilia Payne-Gaposchkin", ["showed that stars are made mostly of hydrogen and helium", "demostró que las estrellas están formadas sobre todo por hidrógeno y helio", "zeigte, dass Sterne hauptsächlich aus Wasserstoff und Helium bestehen"], "hard"],
  ["Barbara McClintock", ["discovered “jumping genes” in maize", "descubrió los «genes saltarines» en el maíz", "entdeckte „springende Gene“ im Mais"], "hard"],
  ["Marie Tharp", ["mapped the ocean floor, including the Mid-Atlantic Ridge", "cartografió el fondo oceánico, incluida la dorsal mesoatlántica", "kartierte den Meeresboden samt Mittelatlantischem Rücken"], "hard"],
  ["Emmy Noether", ["proved a famous theorem linking symmetry and conservation laws", "demostró un famoso teorema que une simetría y leyes de conservación", "bewies einen berühmten Satz über Symmetrien und Erhaltungssätze"], "hard"],
  ["Valentina Tereshkova", ["was the first woman in space (1963)", "fue la primera mujer en el espacio (1963)", "flog als erste Frau ins All (1963)"], "easy"],
  ["Mae Jemison", ["was the first African-American woman in space (1992)", "fue la primera mujer afroamericana en el espacio (1992)", "flog als erste Afroamerikanerin ins All (1992)"], "medium"],
  ["Irène Joliot-Curie", ["discovered artificial radioactivity with her husband Frédéric", "descubrió la radiactividad artificial junto a su marido Frédéric", "entdeckte mit ihrem Mann Frédéric die künstliche Radioaktivität"], "hard"],
];

/** Famous experiments: [name, achievement (3rd person past, lower case), difficulty] */
export const EXPERIMENTS: [L, L, D][] = [
  [["Galileo Galilei", "Galileo Galilei", "Galileo Galilei"], ["is said to have dropped balls from the Leaning Tower of Pisa to study falling objects", "dejó caer, según se cuenta, bolas desde la torre inclinada de Pisa para estudiar la caída de los cuerpos", "soll Kugeln vom Schiefen Turm von Pisa fallen gelassen haben, um den freien Fall zu untersuchen"], "easy"],
  [["Ivan Pavlov", "Iván Pávlov", "Iwan Pawlow"], ["trained dogs to drool at a signal that meant food was coming", "enseñó a perros a salivar ante una señal que anunciaba la comida", "brachte Hunden bei, bei einem Signal für Futter Speichel zu bilden"], "easy"],
  [["Benjamin Franklin", "Benjamin Franklin", "Benjamin Franklin"], ["flew a kite in a thunderstorm to show that lightning is electricity", "hizo volar una cometa en una tormenta para demostrar que el rayo es electricidad", "ließ bei Gewitter einen Drachen steigen, um zu zeigen, dass Blitze Elektrizität sind"], "easy"],
  [["Archimedes", "Arquímedes", "Archimedes"], ["is said to have shouted “Eureka!” in the bath", "gritó, según se cuenta, «¡Eureka!» en la bañera", "soll in der Badewanne „Heureka!“ gerufen haben"], "easy"],
  [["Erwin Schrödinger", "Erwin Schrödinger", "Erwin Schrödinger"], ["imagined a cat in a box that is both alive and dead at once", "imaginó un gato en una caja que está vivo y muerto a la vez", "stellte sich eine Katze in einer Kiste vor, die zugleich lebendig und tot ist"], "easy"],
  [["Louis Pasteur", "Louis Pasteur", "Louis Pasteur"], ["used swan-necked flasks to show that germs do not appear out of nothing", "usó matraces de cuello de cisne para demostrar que los microbios no surgen de la nada", "zeigte mit Schwanenhalskolben, dass Keime nicht aus dem Nichts entstehen"], "hard"],
  [["Eratosthenes", "Eratóstenes", "Eratosthenes"], ["estimated the Earth's circumference from shadows in Egypt", "calculó la circunferencia de la Tierra a partir de las sombras en Egipto", "bestimmte den Erdumfang anhand von Schatten in Ägypten"], "medium"],
  [["Isaac Newton", "Isaac Newton", "Isaac Newton"], ["split sunlight into its colours with a prism", "descompuso la luz del sol en sus colores con un prisma", "zerlegte Sonnenlicht mit einem Prisma in seine Farben"], "medium"],
  [["Léon Foucault", "Léon Foucault", "Léon Foucault"], ["used a giant pendulum in Paris to show that the Earth rotates (1851)", "usó un péndulo gigante en París para demostrar que la Tierra gira (1851)", "bewies mit einem riesigen Pendel in Paris die Erdrotation (1851)"], "medium"],
  [["Henry Cavendish", "Henry Cavendish", "Henry Cavendish"], ["“weighed the Earth” by measuring its density (1798)", "«pesó la Tierra» al medir su densidad (1798)", "„wog die Erde“, indem er ihre Dichte bestimmte (1798)"], "hard"],
  [["Robert Hooke", "Robert Hooke", "Robert Hooke"], ["named “cells” after looking at cork under a microscope (1665)", "dio nombre a las «células» tras observar corcho al microscopio (1665)", "prägte den Begriff „Zelle“, nachdem er Kork unter dem Mikroskop betrachtet hatte (1665)"], "medium"],
  [["Thomas Young", "Thomas Young", "Thomas Young"], ["showed with his double-slit experiment that light behaves like a wave", "demostró con su experimento de la doble rendija que la luz se comporta como una onda", "zeigte mit seinem Doppelspaltversuch, dass sich Licht wie eine Welle verhält"], "hard"],
  [["Otto von Guericke", "Otto von Guericke", "Otto von Guericke"], ["showed that horses could not pull apart two metal hemispheres held together by a vacuum", "demostró que unos caballos no podían separar dos semiesferas de metal unidas por el vacío", "zeigte, dass Pferde zwei durch Vakuum zusammengehaltene Metallhalbkugeln nicht trennen konnten"], "hard"],
  [["Evangelista Torricelli", "Evangelista Torricelli", "Evangelista Torricelli"], ["invented the mercury barometer (1643)", "inventó el barómetro de mercurio (1643)", "erfand das Quecksilberbarometer (1643)"], "hard"],
  [["Hans Christian Ørsted", "Hans Christian Ørsted", "Hans Christian Ørsted"], ["noticed that an electric current makes a compass needle move (1820)", "observó que una corriente eléctrica mueve la aguja de una brújula (1820)", "bemerkte, dass elektrischer Strom eine Kompassnadel ablenkt (1820)"], "hard"],
];

/** Mathematicians: [name, achievement (3rd person past, lower case), difficulty] */
export const MATHEMATICIANS: [L, L, D][] = [
  [["Pythagoras", "Pitágoras", "Pythagoras"], ["gave his name to the theorem a² + b² = c² for right-angled triangles", "dio nombre al teorema a² + b² = c² de los triángulos rectángulos", "gab dem Satz a² + b² = c² für rechtwinklige Dreiecke seinen Namen"], "easy"],
  [["Euclid", "Euclides", "Euklid"], ["wrote the “Elements”, the most famous geometry book of ancient times", "escribió los «Elementos», el libro de geometría más famoso de la Antigüedad", "schrieb die „Elemente“, das berühmteste Geometriebuch der Antike"], "medium"],
  [["Fibonacci", "Fibonacci", "Fibonacci"], ["made the sequence 1, 1, 2, 3, 5, 8, 13 … famous in Europe", "dio a conocer en Europa la sucesión 1, 1, 2, 3, 5, 8, 13…", "machte die Zahlenfolge 1, 1, 2, 3, 5, 8, 13 … in Europa bekannt"], "easy"],
  [["René Descartes", "René Descartes", "René Descartes"], ["invented the coordinate system with x and y axes", "inventó el sistema de coordenadas con ejes x e y", "erfand das Koordinatensystem mit x- und y-Achse"], "medium"],
  [["Blaise Pascal", "Blaise Pascal", "Blaise Pascal"], ["gave his name to a triangle of numbers in which each number is the sum of the two above it", "dio nombre a un triángulo de números en el que cada número es la suma de los dos de encima", "gab einem Zahlendreieck seinen Namen, in dem jede Zahl die Summe der beiden darüber ist"], "medium"],
  [["Pierre de Fermat", "Pierre de Fermat", "Pierre de Fermat"], ["left behind a famous “last theorem” that took more than 350 years to prove", "dejó un famoso «último teorema» que tardó más de 350 años en demostrarse", "hinterließ einen berühmten „letzten Satz“, dessen Beweis über 350 Jahre dauerte"], "medium"],
  [["Andrew Wiles", "Andrew Wiles", "Andrew Wiles"], ["finally proved Fermat's Last Theorem in the 1990s", "demostró por fin el último teorema de Fermat en los años noventa", "bewies in den 1990er-Jahren endlich den großen fermatschen Satz"], "hard"],
  [["Leonhard Euler", "Leonhard Euler", "Leonhard Euler"], ["gave his name to the famous formula e^(iπ) + 1 = 0", "dio nombre a la famosa fórmula e^(iπ) + 1 = 0", "gab der berühmten Formel e^(iπ) + 1 = 0 seinen Namen"], "hard"],
  [["Al-Khwarizmi", "Al-Juarismi", "al-Chwarizmi"], ["gave us the words “algorithm” and “algebra”", "nos legó las palabras «algoritmo» y «álgebra»", "schenkte uns die Wörter „Algorithmus“ und „Algebra“"], "medium"],
  [["John Napier", "John Napier", "John Napier"], ["invented logarithms", "inventó los logaritmos", "erfand die Logarithmen"], "hard"],
  [["Srinivasa Ramanujan", "Srinivasa Ramanujan", "Srinivasa Ramanujan"], ["was a self-taught Indian genius linked to the “taxicab number” 1729", "fue un genio indio autodidacta asociado al «número del taxi», 1729", "war ein indisches Genie und Autodidakt, bekannt für die „Taxi-Zahl“ 1729"], "hard"],
  [["John Nash", "John Nash", "John Nash"], ["developed ideas in game theory and inspired the film “A Beautiful Mind”", "desarrolló ideas de la teoría de juegos e inspiró la película «Una mente maravillosa»", "entwickelte Ideen der Spieltheorie und inspirierte den Film „A Beautiful Mind“"], "medium"],
  [["Carl Friedrich Gauss", "Carl Friedrich Gauss", "Carl Friedrich Gauß"], ["is said to have added up the numbers 1 to 100 in moments as a schoolboy", "sumó, según se cuenta, los números del 1 al 100 en un instante siendo escolar", "soll als Schüler die Zahlen von 1 bis 100 im Nu addiert haben"], "medium"],
  [["Archimedes", "Arquímedes", "Archimedes"], ["estimated π using polygons with 96 sides", "calculó π usando polígonos de 96 lados", "berechnete π mithilfe von Vielecken mit 96 Seiten"], "hard"],
  [["Brahmagupta", "Brahmagupta", "Brahmagupta"], ["wrote down the first rules for calculating with zero", "escribió las primeras reglas para calcular con el cero", "schrieb die ersten Rechenregeln für die Null auf"], "hard"],
  [["August Ferdinand Möbius", "August Ferdinand Möbius", "August Ferdinand Möbius"], ["gave his name to a twisted strip of paper with only one side", "dio nombre a una cinta de papel retorcida con una sola cara", "gab einem verdrehten Papierstreifen mit nur einer Seite seinen Namen"], "medium"],
  [["Bernhard Riemann", "Bernhard Riemann", "Bernhard Riemann"], ["posed a famous, still unsolved hypothesis about prime numbers", "planteó una famosa hipótesis sobre los números primos que sigue sin resolverse", "stellte eine berühmte, bis heute unbewiesene Vermutung über Primzahlen auf"], "hard"],
  [["Thales of Miletus", "Tales de Mileto", "Thales von Milet"], ["gave his name to a theorem about triangles drawn in a semicircle", "dio nombre a un teorema sobre los triángulos inscritos en una semicircunferencia", "gab einem Satz über Dreiecke im Halbkreis seinen Namen"], "hard"],
  [["Grigori Perelman", "Grigori Perelmán", "Grigori Perelman"], ["solved the Poincaré conjecture and turned down a million-dollar prize", "resolvió la conjetura de Poincaré y rechazó un premio de un millón de dólares", "bewies die Poincaré-Vermutung und lehnte ein Preisgeld von einer Million Dollar ab"], "hard"],
];

// ═══ Nobel Prizes ══════════════════════════════════════════════════
export const NOBEL_FIELDS: L[] = [
  ["Physics", "Física", "Physik"], ["Chemistry", "Química", "Chemie"], ["Physiology or Medicine", "Fisiología o Medicina", "Physiologie oder Medizin"],
  ["Literature", "Literatura", "Literatur"], ["Peace", "Paz", "Frieden"],
];
export const NOT_NOBEL_FIELDS: L[] = [
  ["Mathematics", "Matemáticas", "Mathematik"], ["Astronomy", "Astronomía", "Astronomie"], ["Geology", "Geología", "Geologie"],
  ["Engineering", "Ingeniería", "Ingenieurwesen"], ["Music", "Música", "Musik"], ["Architecture", "Arquitectura", "Architektur"],
  ["Computer science", "Informática", "Informatik"], ["Biology", "Biología", "Biologie"],
];
export const NOBEL: Fact[] = [
  ["oslo", ["In which city is the Nobel Peace Prize presented?", "¿En qué ciudad se entrega el Premio Nobel de la Paz?", "In welcher Stadt wird der Friedensnobelpreis verliehen?"],
    ["Oslo", "Oslo", "Oslo"], [["Stockholm", "Estocolmo", "Stockholm"], ["Copenhagen", "Copenhague", "Kopenhagen"], ["Helsinki", "Helsinki", "Helsinki"], ["Brussels", "Bruselas", "Brüssel"]], "medium"],
  ["stockholm", ["In which city are the Nobel Prizes in physics, chemistry, medicine and literature presented?", "¿En qué ciudad se entregan los premios Nobel de Física, Química, Medicina y Literatura?", "In welcher Stadt werden die Nobelpreise für Physik, Chemie, Medizin und Literatur verliehen?"],
    ["Stockholm", "Estocolmo", "Stockholm"], [["Oslo", "Oslo", "Oslo"], ["Copenhagen", "Copenhague", "Kopenhagen"], ["Helsinki", "Helsinki", "Helsinki"], ["Vienna", "Viena", "Wien"]], "medium"],
  ["date", ["On which day are the Nobel Prizes presented each year – the anniversary of Alfred Nobel's death?", "¿Qué día se entregan cada año los premios Nobel, aniversario de la muerte de Alfred Nobel?", "An welchem Tag werden die Nobelpreise jedes Jahr verliehen – dem Todestag Alfred Nobels?"],
    ["10 December", "10 de diciembre", "10. Dezember"], [["1 January", "1 de enero", "1. Januar"], ["21 March", "21 de marzo", "21. März"], ["4 July", "4 de julio", "4. Juli"], ["31 October", "31 de octubre", "31. Oktober"]], "hard"],
  ["einstein", ["What did Albert Einstein actually receive his Nobel Prize in Physics for?", "¿Por qué recibió realmente Albert Einstein el Premio Nobel de Física?", "Wofür erhielt Albert Einstein eigentlich den Nobelpreis für Physik?"],
    ["Explaining the photoelectric effect", "Por explicar el efecto fotoeléctrico", "Für die Erklärung des photoelektrischen Effekts"], [["The theory of relativity", "Por la teoría de la relatividad", "Für die Relativitätstheorie"], ["Discovering the electron", "Por descubrir el electrón", "Für die Entdeckung des Elektrons"], ["Building the first nuclear reactor", "Por construir el primer reactor nuclear", "Für den Bau des ersten Kernreaktors"]], "hard"],
  ["pauling", ["Who is the only person to have won two Nobel Prizes that were not shared with anyone?", "¿Quién es la única persona que ha ganado dos premios Nobel sin compartirlos con nadie?", "Wer ist der einzige Mensch, der zwei ungeteilte Nobelpreise gewonnen hat?"],
    ["Linus Pauling", "Linus Pauling", "Linus Pauling"], [["Albert Einstein", "Albert Einstein", "Albert Einstein"], ["Niels Bohr", "Niels Bohr", "Niels Bohr"], ["Max Planck", "Max Planck", "Max Planck"], ["Alexander Fleming", "Alexander Fleming", "Alexander Fleming"]], "hard"],
  ["fields", ["There is no Nobel Prize for mathematics. Which award is often called the “Nobel Prize of mathematics”?", "No existe un Nobel de Matemáticas. ¿Qué galardón se suele llamar el «Nobel de las matemáticas»?", "Es gibt keinen Mathematik-Nobelpreis. Welche Auszeichnung gilt oft als „Nobelpreis der Mathematik“?"],
    ["Fields Medal", "Medalla Fields", "Fields-Medaille"], [["Pulitzer Prize", "Premio Pulitzer", "Pulitzer-Preis"], ["Copley Medal", "Medalla Copley", "Copley-Medaille"], ["Grammy Award", "Premio Grammy", "Grammy"], ["Oscar", "Óscar", "Oscar"]], "medium"],
  ["curies", ["Which family has won the most Nobel Prizes?", "¿Qué familia ha ganado más premios Nobel?", "Welche Familie hat die meisten Nobelpreise gewonnen?"],
    ["The Curie family", "La familia Curie", "Die Familie Curie"], [["The Bohr family", "La familia Bohr", "Die Familie Bohr"], ["The Einstein family", "La familia Einstein", "Die Familie Einstein"], ["The Darwin family", "La familia Darwin", "Die Familie Darwin"], ["The Nobel family", "La familia Nobel", "Die Familie Nobel"]], "hard"],
  ["first-physics", ["Who received the very first Nobel Prize in Physics in 1901?", "¿Quién recibió el primer Premio Nobel de Física en 1901?", "Wer erhielt 1901 den allerersten Nobelpreis für Physik?"],
    ["Wilhelm Röntgen", "Wilhelm Röntgen", "Wilhelm Conrad Röntgen"], [["Albert Einstein", "Albert Einstein", "Albert Einstein"], ["Marie Curie", "Marie Curie", "Marie Curie"], ["Max Planck", "Max Planck", "Max Planck"], ["Thomas Edison", "Thomas Edison", "Thomas Edison"]], "medium"],
  ["will", ["What did Alfred Nobel use to fund the Nobel Prizes?", "¿Con qué financió Alfred Nobel los premios Nobel?", "Womit finanzierte Alfred Nobel die Nobelpreise?"],
    ["His fortune, left in his will", "Con su fortuna, legada en su testamento", "Mit seinem Vermögen, das er per Testament vermachte"], [["A tax on dynamite", "Con un impuesto sobre la dinamita", "Mit einer Steuer auf Dynamit"], ["Money from the Swedish king", "Con dinero del rey de Suecia", "Mit Geld vom schwedischen König"], ["Ticket sales for a lottery", "Con la venta de boletos de lotería", "Mit dem Verkauf von Lotterielosen"]], "medium"],
];

// ═══ inventions ════════════════════════════════════════════════════
/** [en, es, de, year] – only compared when years are far apart */
export const INVENTIONS: [string, string, string, number][] = [
  ["The Gutenberg printing press", "La imprenta de Gutenberg", "Der Buchdruck mit beweglichen Lettern", 1450],
  ["The telescope", "El telescopio", "Das Fernrohr", 1608],
  ["The pendulum clock", "El reloj de péndulo", "Die Pendeluhr", 1656],
  ["The steam engine", "La máquina de vapor", "Die Dampfmaschine", 1712],
  ["The hot-air balloon", "El globo aerostático", "Der Heißluftballon", 1783],
  ["The first vaccine (smallpox)", "La primera vacuna (viruela)", "Der erste Impfstoff (Pocken)", 1796],
  ["The electric battery", "La pila eléctrica", "Die elektrische Batterie", 1800],
  ["Photography", "La fotografía", "Die Fotografie", 1826],
  ["The electric telegraph", "El telégrafo eléctrico", "Der elektrische Telegraf", 1837],
  ["Dynamite", "La dinamita", "Das Dynamit", 1867],
  ["The telephone", "El teléfono", "Das Telefon", 1876],
  ["The light bulb", "La bombilla", "Die Glühbirne", 1879],
  ["The petrol car", "El automóvil de gasolina", "Das Benzinauto", 1886],
  ["Radio", "La radio", "Das Radio", 1895],
  ["The aeroplane", "El avión", "Das Motorflugzeug", 1903],
  ["Television", "La televisión", "Das Fernsehen", 1926],
  ["The ballpoint pen", "El bolígrafo", "Der Kugelschreiber", 1938],
  ["The microwave oven", "El horno microondas", "Der Mikrowellenherd", 1946],
  ["Velcro", "El velcro", "Der Klettverschluss", 1955],
  ["The laser", "El láser", "Der Laser", 1960],
  ["The handheld mobile phone", "El teléfono móvil", "Das Handy", 1973],
  ["The World Wide Web", "La World Wide Web", "Das World Wide Web", 1989],
];

// ═══ optics instruments ════════════════════════════════════════════
export const SCOPES: Fact[] = [
  ["reflector", ["Who built the first practical reflecting telescope, which uses a mirror instead of lenses (1668)?", "¿Quién construyó el primer telescopio reflector práctico, que usa un espejo en lugar de lentes (1668)?", "Wer baute 1668 das erste brauchbare Spiegelteleskop, das statt Linsen einen Spiegel nutzt?"],
    ["Isaac Newton", "Isaac Newton", "Isaac Newton"], [["Galileo Galilei", "Galileo Galilei", "Galileo Galilei"], ["Johannes Kepler", "Johannes Kepler", "Johannes Kepler"], ["Edwin Hubble", "Edwin Hubble", "Edwin Hubble"], ["Nicolaus Copernicus", "Nicolás Copérnico", "Nikolaus Kopernikus"]], "medium"],
  ["mirror", ["What does a reflecting telescope use to collect light?", "¿Qué usa un telescopio reflector para captar la luz?", "Womit sammelt ein Spiegelteleskop das Licht?"],
    ["A curved mirror", "Un espejo curvo", "Mit einem gewölbten Spiegel"], [["A prism", "Un prisma", "Mit einem Prisma"], ["A magnet", "Un imán", "Mit einem Magneten"], ["A radio antenna", "Una antena de radio", "Mit einer Radioantenne"]], "medium"],
  ["electron", ["What does an electron microscope use instead of light to see tiny things?", "¿Qué usa un microscopio electrónico en lugar de luz para ver cosas diminutas?", "Was nutzt ein Elektronenmikroskop statt Licht, um winzige Dinge zu sehen?"],
    ["A beam of electrons", "Un haz de electrones", "Einen Elektronenstrahl"], [["Sound waves", "Ondas sonoras", "Schallwellen"], ["Radio waves", "Ondas de radio", "Radiowellen"], ["Heat", "Calor", "Wärme"]], "easy"],
  ["eyepiece", ["What is the lens you look into on a microscope or telescope called?", "¿Cómo se llama la lente por la que se mira en un microscopio o un telescopio?", "Wie heißt die Linse, durch die man bei einem Mikroskop oder Teleskop schaut?"],
    ["Eyepiece", "Ocular", "Okular"], [["Objective", "Objetivo", "Objektiv"], ["Prism", "Prisma", "Prisma"], ["Filter", "Filtro", "Filter"]], "medium"],
  ["objective", ["On a microscope, what is the lens closest to the sample called?", "En un microscopio, ¿cómo se llama la lente más cercana a la muestra?", "Wie heißt beim Mikroskop die Linse, die der Probe am nächsten ist?"],
    ["Objective", "Objetivo", "Objektiv"], [["Eyepiece", "Ocular", "Okular"], ["Prism", "Prisma", "Prisma"], ["Filter", "Filtro", "Filter"]], "hard"],
  ["slide", ["On what do you put a sample to look at it under a light microscope?", "¿Sobre qué se coloca una muestra para verla al microscopio óptico?", "Worauf legt man eine Probe, um sie unter dem Lichtmikroskop zu betrachten?"],
    ["A glass slide", "Un portaobjetos de vidrio", "Auf einen Objektträger"], [["A test tube", "Un tubo de ensayo", "Auf ein Reagenzglas"], ["A funnel", "Un embudo", "Auf einen Trichter"], ["A coin", "Una moneda", "Auf eine Münze"]], "easy"],
  ["fast", ["Which country has FAST, the world's largest single-dish radio telescope (500 m across)?", "¿Qué país tiene el FAST, el mayor radiotelescopio de una sola antena del mundo (500 m)?", "Welches Land besitzt FAST, das größte Einzelschüssel-Radioteleskop der Welt (500 m)?"],
    ["China", "China", "China"], [["United States", "Estados Unidos", "USA"], ["Russia", "Rusia", "Russland"], ["Australia", "Australia", "Australien"], ["Chile", "Chile", "Chile"]], "hard"],
  ["mountains", ["Why are big observatories often built on high mountains?", "¿Por qué los grandes observatorios suelen construirse en montañas altas?", "Warum baut man große Sternwarten oft auf hohe Berge?"],
    ["The air is thinner, drier and calmer, so the view is sharper", "El aire es más fino, seco y estable, así que se ve con más nitidez", "Die Luft ist dünner, trockener und ruhiger, daher ist die Sicht schärfer"], [["They are much closer to the stars", "Están mucho más cerca de las estrellas", "Sie sind den Sternen viel näher"], ["It is warmer up there", "Allí arriba hace más calor", "Dort oben ist es wärmer"], ["Gravity is stronger there", "La gravedad es más fuerte allí", "Dort ist die Schwerkraft stärker"]], "medium"],
  ["space", ["Why do space telescopes like Hubble take such sharp pictures?", "¿Por qué los telescopios espaciales como el Hubble toman imágenes tan nítidas?", "Warum machen Weltraumteleskope wie Hubble so scharfe Bilder?"],
    ["They are above the blurring atmosphere", "Están por encima de la atmósfera, que distorsiona la imagen", "Sie befinden sich oberhalb der Atmosphäre, die das Bild verwischt"], [["They are much closer to the stars", "Están mucho más cerca de las estrellas", "Sie sind den Sternen viel näher"], ["Space is brighter than Earth", "El espacio es más luminoso que la Tierra", "Im All ist es heller als auf der Erde"], ["They use X-ray lenses", "Usan lentes de rayos X", "Sie nutzen Röntgenlinsen"]], "medium"],
  ["magnify", ["A microscope has a 10× eyepiece and a 40× objective. What is its total magnification?", "Un microscopio tiene un ocular de 10× y un objetivo de 40×. ¿Cuál es su aumento total?", "Ein Mikroskop hat ein 10×-Okular und ein 40×-Objektiv. Wie stark vergrößert es insgesamt?"],
    ["400×", "400×", "400×"], [["50×", "50×", "50×"], ["30×", "30×", "30×"], ["4000×", "4000×", "4000×"], ["140×", "140×", "140×"]], "medium"],
];

// ═══ maths & measurement ═══════════════════════════════════════════
/** Solids: name (with article: EN, ES, DE nominative), label, faces, edges, vertices, difficulty */
export const SOLIDS: { a: L; label: L; f: number; e: number; v: number; d: D }[] = [
  { a: ["a cube", "un cubo", "ein Würfel"], label: ["Cube", "Cubo", "Würfel"], f: 6, e: 12, v: 8, d: "easy" },
  { a: ["a tetrahedron (triangular pyramid)", "un tetraedro (pirámide triangular)", "ein Tetraeder (dreiseitige Pyramide)"], label: ["Tetrahedron", "Tetraedro", "Tetraeder"], f: 4, e: 6, v: 4, d: "medium" },
  { a: ["a square-based pyramid", "una pirámide de base cuadrada", "eine quadratische Pyramide"], label: ["Square-based pyramid", "Pirámide de base cuadrada", "Quadratische Pyramide"], f: 5, e: 8, v: 5, d: "medium" },
  { a: ["a triangular prism", "un prisma triangular", "ein dreiseitiges Prisma"], label: ["Triangular prism", "Prisma triangular", "Dreiseitiges Prisma"], f: 5, e: 9, v: 6, d: "medium" },
  { a: ["an octahedron", "un octaedro", "ein Oktaeder"], label: ["Octahedron", "Octaedro", "Oktaeder"], f: 8, e: 12, v: 6, d: "hard" },
  { a: ["a dodecahedron", "un dodecaedro", "ein Dodekaeder"], label: ["Dodecahedron", "Dodecaedro", "Dodekaeder"], f: 12, e: 30, v: 20, d: "hard" },
  { a: ["an icosahedron", "un icosaedro", "ein Ikosaeder"], label: ["Icosahedron", "Icosaedro", "Ikosaeder"], f: 20, e: 30, v: 12, d: "hard" },
  { a: ["a hexagonal prism", "un prisma hexagonal", "ein sechsseitiges Prisma"], label: ["Hexagonal prism", "Prisma hexagonal", "Sechsseitiges Prisma"], f: 8, e: 18, v: 12, d: "hard" },
  { a: ["a pentagonal prism", "un prisma pentagonal", "ein fünfseitiges Prisma"], label: ["Pentagonal prism", "Prisma pentagonal", "Fünfseitiges Prisma"], f: 7, e: 15, v: 10, d: "hard" },
];

/** Imperial units: [stem, unit (EN/ES/DE with "one"), right label, wrong labels, difficulty] */
export const IMPERIAL: Fact[] = [
  ["inch", ["one inch", "una pulgada", "ein Zoll (Inch)"], ["About 2.5 cm", "Unos 2,5 cm", "Etwa 2,5 cm"], [["About 1 mm", "Aproximadamente 1 mm", "Etwa 1 mm"], ["About 10 cm", "Unos 10 cm", "Etwa 10 cm"], ["About 25 cm", "Unos 25 cm", "Etwa 25 cm"], ["About 1 m", "Aproximadamente 1 m", "Etwa 1 m"]], "easy"],
  ["foot", ["one foot", "un pie", "ein Fuß"], ["About 30 cm", "Unos 30 cm", "Etwa 30 cm"], [["About 3 cm", "Unos 3 cm", "Etwa 3 cm"], ["About 1 m", "Aproximadamente 1 m", "Etwa 1 m"], ["About 3 m", "Unos 3 m", "Etwa 3 m"], ["About 60 cm", "Unos 60 cm", "Etwa 60 cm"]], "medium"],
  ["yard", ["one yard", "una yarda", "ein Yard"], ["About 91 cm", "Unos 91 cm", "Etwa 91 cm"], [["About 9 cm", "Unos 9 cm", "Etwa 9 cm"], ["About 30 cm", "Unos 30 cm", "Etwa 30 cm"], ["About 3 m", "Unos 3 m", "Etwa 3 m"], ["About 9 m", "Unos 9 m", "Etwa 9 m"]], "medium"],
  ["mile", ["one mile", "una milla", "eine Meile"], ["About 1.6 km", "Unos 1,6 km", "Etwa 1,6 km"], [["About 600 m", "Unos 600 m", "Etwa 600 m"], ["About 5 km", "Unos 5 km", "Etwa 5 km"], ["About 10 km", "Unos 10 km", "Etwa 10 km"], ["About 16 km", "Unos 16 km", "Etwa 16 km"]], "easy"],
  ["nautical", ["one nautical mile", "una milla náutica", "eine Seemeile"], ["About 1.85 km", "Unos 1,85 km", "Etwa 1,85 km"], [["About 185 m", "Unos 185 m", "Etwa 185 m"], ["About 8 km", "Unos 8 km", "Etwa 8 km"], ["About 18.5 km", "Unos 18,5 km", "Etwa 18,5 km"]], "hard"],
  ["pound", ["one pound (lb)", "una libra (lb)", "ein britisches bzw. US-Pfund (lb)"], ["About 454 g", "Unos 454 g", "Etwa 454 g"], [["About 45 g", "Unos 45 g", "Etwa 45 g"], ["About 100 g", "Unos 100 g", "Etwa 100 g"], ["About 2 kg", "Unos 2 kg", "Etwa 2 kg"], ["About 4.5 kg", "Unos 4,5 kg", "Etwa 4,5 kg"]], "medium"],
  ["ounce", ["one ounce (oz)", "una onza (oz)", "eine Unze (oz)"], ["About 28 g", "Unos 28 g", "Etwa 28 g"], [["About 2.8 g", "Unos 2,8 g", "Etwa 2,8 g"], ["About 280 g", "Unos 280 g", "Etwa 280 g"], ["About 1 kg", "Aproximadamente 1 kg", "Etwa 1 kg"], ["About 0.5 g", "Unos 0,5 g", "Etwa 0,5 g"]], "medium"],
  ["gallon", ["one US gallon", "un galón estadounidense", "eine US-Gallone"], ["About 3.8 litres", "Unos 3,8 litros", "Etwa 3,8 Liter"], [["About 0.4 litres", "Unos 0,4 litros", "Etwa 0,4 Liter"], ["About 38 litres", "Unos 38 litros", "Etwa 38 Liter"], ["About 100 litres", "Unos 100 litros", "Etwa 100 Liter"]], "medium"],
  ["pint", ["one British pint", "una pinta británica", "ein britisches Pint"], ["About 0.57 litres", "Unos 0,57 litros", "Etwa 0,57 Liter"], [["About 0.05 litres", "Unos 0,05 litros", "Etwa 0,05 Liter"], ["About 2 litres", "Unos 2 litros", "Etwa 2 Liter"], ["About 5 litres", "Unos 5 litros", "Etwa 5 Liter"]], "hard"],
];
/** [stem, question, answer, wrong numbers, difficulty] */
export const IMPERIAL_COUNT: [string, L, number, number[], D][] = [
  ["in-ft", ["How many inches are there in one foot?", "¿Cuántas pulgadas tiene un pie?", "Wie viele Zoll hat ein Fuß?"], 12, [8, 10, 16, 20, 100], "medium"],
  ["ft-yd", ["How many feet are there in one yard?", "¿Cuántos pies tiene una yarda?", "Wie viele Fuß hat ein Yard?"], 3, [2, 4, 5, 10, 12], "medium"],
  ["in-yd", ["How many inches are there in one yard?", "¿Cuántas pulgadas tiene una yarda?", "Wie viele Zoll hat ein Yard?"], 36, [12, 24, 30, 48, 100], "hard"],
  ["yd-mi", ["How many yards are there in one mile?", "¿Cuántas yardas tiene una milla?", "Wie viele Yards hat eine Meile?"], 1760, [1000, 1500, 2000, 5280], "hard"],
  ["ft-mi", ["How many feet are there in one mile?", "¿Cuántos pies tiene una milla?", "Wie viele Fuß hat eine Meile?"], 5280, [1000, 1760, 3000, 10000], "hard"],
  ["oz-lb", ["How many ounces are there in one pound?", "¿Cuántas onzas tiene una libra?", "Wie viele Unzen hat ein Pfund (lb)?"], 16, [8, 10, 12, 20, 100], "medium"],
  ["lb-st", ["How many pounds are there in one stone (a British unit of weight)?", "¿Cuántas libras tiene un stone (unidad de peso británica)?", "Wie viele Pfund (lb) hat ein Stone (britische Gewichtseinheit)?"], 14, [10, 12, 16, 20, 100], "hard"],
];

/** Time facts: [stem, question, answer, wrong numbers, difficulty] */
export const TIME: [string, L, number, number[], D][] = [
  ["s-h", ["How many seconds are there in one hour?", "¿Cuántos segundos tiene una hora?", "Wie viele Sekunden hat eine Stunde?"], 3600, [360, 600, 1000, 6000, 36000], "medium"],
  ["min-day", ["How many minutes are there in one day?", "¿Cuántos minutos tiene un día?", "Wie viele Minuten hat ein Tag?"], 1440, [240, 720, 1000, 2400, 3600], "medium"],
  ["h-week", ["How many hours are there in one week?", "¿Cuántas horas tiene una semana?", "Wie viele Stunden hat eine Woche?"], 168, [100, 144, 192, 240, 336], "medium"],
  ["s-day", ["How many seconds are there in one day?", "¿Cuántos segundos tiene un día?", "Wie viele Sekunden hat ein Tag?"], 86400, [8640, 24000, 36000, 864000], "hard"],
  ["leap-days", ["How many days does a leap year have?", "¿Cuántos días tiene un año bisiesto?", "Wie viele Tage hat ein Schaltjahr?"], 366, [360, 364, 365, 367], "easy"],
  ["feb", ["How many days does February have in a leap year?", "¿Cuántos días tiene febrero en un año bisiesto?", "Wie viele Tage hat der Februar in einem Schaltjahr?"], 29, [27, 28, 30, 31], "easy"],
  ["leap-every", ["Normally, every how many years is there a leap year?", "Normalmente, ¿cada cuántos años hay un año bisiesto?", "Alle wie viele Jahre gibt es normalerweise ein Schaltjahr?"], 4, [2, 3, 5, 10], "easy"],
  ["weeks", ["Roughly how many weeks are there in a year?", "¿Aproximadamente cuántas semanas tiene un año?", "Wie viele Wochen hat ein Jahr ungefähr?"], 52, [12, 48, 50, 56, 60], "easy"],
  ["millennium", ["How many years are there in a millennium?", "¿Cuántos años tiene un milenio?", "Wie viele Jahre hat ein Jahrtausend?"], 1000, [10, 100, 500, 10000], "easy"],
  ["decades", ["How many decades are there in a century?", "¿Cuántas décadas tiene un siglo?", "Wie viele Jahrzehnte hat ein Jahrhundert?"], 10, [5, 12, 20, 100], "easy"],
  ["months31", ["How many months of the year have 31 days?", "¿Cuántos meses del año tienen 31 días?", "Wie viele Monate des Jahres haben 31 Tage?"], 7, [4, 5, 6, 8, 9], "medium"],
  ["s-5min", ["How many seconds are there in five minutes?", "¿Cuántos segundos hay en cinco minutos?", "Wie viele Sekunden haben fünf Minuten?"], 300, [50, 100, 500, 3000], "easy"],
  ["h-year", ["Roughly how many hours are there in a (non-leap) year?", "¿Aproximadamente cuántas horas tiene un año (no bisiesto)?", "Wie viele Stunden hat ein (normales) Jahr ungefähr?"], 8760, [876, 2400, 36500, 87600], "hard"],
];
