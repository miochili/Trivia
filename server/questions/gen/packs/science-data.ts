/** Fact tables for the "sci." question families (see ./science.ts). L = [en, es, de]. */
import type { L } from "../generate";
import type { Difficulty } from "../../../../src/shared/types";

type D = Difficulty;

// ── chemistry ───────────────────────────────────────────────────────
/** [formula, name (lower-case en/es, de as noun), difficulty] */
export const FORMULAS: [string, L, D][] = [
  ["H₂O", ["water", "agua", "Wasser"], "easy"],
  ["CO₂", ["carbon dioxide", "dióxido de carbono", "Kohlenstoffdioxid"], "easy"],
  ["NaCl", ["table salt (sodium chloride)", "sal común (cloruro de sodio)", "Kochsalz (Natriumchlorid)"], "easy"],
  ["CO", ["carbon monoxide", "monóxido de carbono", "Kohlenstoffmonoxid"], "medium"],
  ["CH₄", ["methane", "metano", "Methan"], "medium"],
  ["NH₃", ["ammonia", "amoníaco", "Ammoniak"], "medium"],
  ["O₃", ["ozone", "ozono", "Ozon"], "medium"],
  ["HCl", ["hydrochloric acid", "ácido clorhídrico", "Salzsäure"], "medium"],
  ["H₂SO₄", ["sulfuric acid", "ácido sulfúrico", "Schwefelsäure"], "medium"],
  ["H₂O₂", ["hydrogen peroxide", "peróxido de hidrógeno (agua oxigenada)", "Wasserstoffperoxid"], "medium"],
  ["C₆H₁₂O₆", ["glucose", "glucosa", "Glucose (Traubenzucker)"], "hard"],
  ["NaOH", ["sodium hydroxide (caustic soda)", "hidróxido de sodio (sosa cáustica)", "Natriumhydroxid"], "hard"],
  ["CaCO₃", ["calcium carbonate", "carbonato de calcio", "Calciumcarbonat"], "hard"],
  ["N₂O", ["nitrous oxide (laughing gas)", "óxido nitroso (gas de la risa)", "Distickstoffmonoxid (Lachgas)"], "hard"],
  ["SO₂", ["sulfur dioxide", "dióxido de azufre", "Schwefeldioxid"], "hard"],
  ["C₂H₅OH", ["ethanol", "etanol", "Ethanol"], "hard"],
  ["NaHCO₃", ["baking soda (sodium bicarbonate)", "bicarbonato de sodio", "Natron (Natriumhydrogencarbonat)"], "hard"],
  ["HNO₃", ["nitric acid", "ácido nítrico", "Salpetersäure"], "hard"],
  ["SiO₂", ["silicon dioxide (quartz)", "dióxido de silicio (cuarzo)", "Siliciumdioxid (Quarz)"], "hard"],
  ["C₃H₈", ["propane", "propano", "Propan"], "hard"],
  ["CH₃COOH", ["acetic acid", "ácido acético", "Essigsäure"], "hard"],
  ["H₂S", ["hydrogen sulfide", "sulfuro de hidrógeno", "Schwefelwasserstoff"], "hard"],
];

/** Alloys: composition keys → label */
export const COMPOSITIONS: Record<string, L> = {
  cu_sn: ["Copper and tin", "Cobre y estaño", "Kupfer und Zinn"],
  cu_zn: ["Copper and zinc", "Cobre y zinc", "Kupfer und Zink"],
  fe_c: ["Iron and carbon", "Hierro y carbono", "Eisen und Kohlenstoff"],
  sn_pb: ["Tin and lead", "Estaño y plomo", "Zinn und Blei"],
  fe_cr: ["Iron and chromium", "Hierro y cromo", "Eisen und Chrom"],
  ni_cr: ["Nickel and chromium", "Níquel y cromo", "Nickel und Chrom"],
  cu_ni: ["Copper and nickel", "Cobre y níquel", "Kupfer und Nickel"],
  au_ag: ["Gold and silver", "Oro y plata", "Gold und Silber"],
  ag_cu: ["Silver and copper", "Plata y cobre", "Silber und Kupfer"],
  al_cu: ["Aluminium and copper", "Aluminio y cobre", "Aluminium und Kupfer"],
  fe_ni: ["Iron and nickel", "Hierro y níquel", "Eisen und Nickel"],
};
/** { label, phrase used in "What is <phrase> mainly made of?", composition, compositions never offered as wrong, difficulty } */
export const ALLOYS: { id: string; label: L; en: string; comp: string; clash?: string[]; d: D }[] = [
  { id: "bronze", label: ["Bronze", "Bronce", "Bronze"], en: "bronze", comp: "cu_sn", d: "easy" },
  { id: "brass", label: ["Brass", "Latón", "Messing"], en: "brass", comp: "cu_zn", d: "medium" },
  { id: "steel", label: ["Steel", "Acero", "Stahl"], en: "steel", comp: "fe_c", clash: ["fe_cr", "fe_ni"], d: "easy" },
  { id: "stainless", label: ["Stainless steel", "Acero inoxidable", "Edelstahl (rostfrei)"], en: "stainless steel", comp: "fe_cr", clash: ["fe_c", "fe_ni"], d: "medium" },
  { id: "solder", label: ["Soft solder (classic)", "Soldadura blanda clásica", "Klassisches Weichlot"], en: "classic soft solder for electronics", comp: "sn_pb", d: "medium" },
  { id: "nichrome", label: ["Nichrome", "Nicromo", "Nichrom"], en: "nichrome (heating wire)", comp: "ni_cr", d: "hard" },
  { id: "constantan", label: ["Constantan", "Constantán", "Konstantan"], en: "constantan", comp: "cu_ni", d: "hard" },
  { id: "electrum", label: ["Electrum", "Electro", "Elektrum"], en: "electrum", comp: "au_ag", d: "hard" },
  { id: "sterling", label: ["Sterling silver", "Plata de ley (925)", "Sterlingsilber"], en: "sterling silver", comp: "ag_cu", d: "hard" },
  { id: "duralumin", label: ["Duralumin", "Duraluminio", "Duraluminium"], en: "duralumin", comp: "al_cu", d: "hard" },
  { id: "invar", label: ["Invar", "Invar", "Invar"], en: "Invar", comp: "fe_ni", clash: ["fe_c", "fe_cr"], d: "hard" },
];

/** Measuring instruments: name (en lower-case, es lower-case, de noun), what they measure (label), rev phrase */
export const INSTRUMENTS: { id: string; name: L; what: L; verb: L; clash?: string[]; d: D }[] = [
  { id: "barometer", name: ["barometer", "barómetro", "Barometer"], what: ["Air pressure", "Presión atmosférica", "Luftdruck"], verb: ["measures air pressure", "mide la presión atmosférica", "misst den Luftdruck"], clash: ["altimeter"], d: "easy" },
  { id: "thermometer", name: ["thermometer", "termómetro", "Thermometer"], what: ["Temperature", "Temperatura", "Temperatur"], verb: ["measures temperature", "mide la temperatura", "misst die Temperatur"], clash: ["calorimeter"], d: "easy" },
  { id: "anemometer", name: ["anemometer", "anemómetro", "Anemometer"], what: ["Wind speed", "Velocidad del viento", "Windgeschwindigkeit"], verb: ["measures wind speed", "mide la velocidad del viento", "misst die Windgeschwindigkeit"], clash: ["speedometer"], d: "medium" },
  { id: "seismograph", name: ["seismograph", "sismógrafo", "Seismograf"], what: ["Earthquakes", "Terremotos", "Erdbeben"], verb: ["records earthquakes", "registra los terremotos", "zeichnet Erdbeben auf"], d: "medium" },
  { id: "hygrometer", name: ["hygrometer", "higrómetro", "Hygrometer"], what: ["Humidity", "Humedad del aire", "Luftfeuchtigkeit"], verb: ["measures humidity", "mide la humedad del aire", "misst die Luftfeuchtigkeit"], d: "medium" },
  { id: "ammeter", name: ["ammeter", "amperímetro", "Amperemeter"], what: ["Electric current", "Corriente eléctrica", "Stromstärke"], verb: ["measures electric current", "mide la corriente eléctrica", "misst die Stromstärke"], d: "medium" },
  { id: "voltmeter", name: ["voltmeter", "voltímetro", "Voltmeter"], what: ["Voltage", "Tensión eléctrica", "Spannung"], verb: ["measures voltage", "mide la tensión eléctrica", "misst die elektrische Spannung"], d: "easy" },
  { id: "ohmmeter", name: ["ohmmeter", "óhmetro", "Ohmmeter"], what: ["Electrical resistance", "Resistencia eléctrica", "Elektrischer Widerstand"], verb: ["measures electrical resistance", "mide la resistencia eléctrica", "misst den elektrischen Widerstand"], d: "medium" },
  { id: "wattmeter", name: ["wattmeter", "vatímetro", "Wattmeter"], what: ["Electrical power", "Potencia eléctrica", "Elektrische Leistung"], verb: ["measures electrical power", "mide la potencia eléctrica", "misst die elektrische Leistung"], d: "medium" },
  { id: "odometer", name: ["odometer", "odómetro", "Kilometerzähler"], what: ["Distance travelled", "Distancia recorrida", "Zurückgelegte Strecke"], verb: ["measures the distance travelled", "mide la distancia recorrida", "misst die zurückgelegte Strecke"], d: "medium" },
  { id: "speedometer", name: ["speedometer", "velocímetro", "Tachometer"], what: ["Speed", "Velocidad", "Geschwindigkeit"], verb: ["shows a vehicle's speed", "indica la velocidad de un vehículo", "zeigt die Geschwindigkeit eines Fahrzeugs an"], clash: ["anemometer"], d: "easy" },
  { id: "altimeter", name: ["altimeter", "altímetro", "Altimeter"], what: ["Altitude", "Altitud", "Flughöhe"], verb: ["measures altitude", "mide la altitud", "misst die Flughöhe"], clash: ["barometer"], d: "medium" },
  { id: "raingauge", name: ["rain gauge", "pluviómetro", "Pluviometer"], what: ["Rainfall", "Precipitación", "Niederschlagsmenge"], verb: ["measures rainfall", "mide la precipitación", "misst die Niederschlagsmenge"], d: "medium" },
  { id: "geiger", name: ["Geiger counter", "contador Geiger", "Geigerzähler"], what: ["Radioactivity", "Radiactividad", "Radioaktivität"], verb: ["detects radioactivity", "detecta la radiactividad", "weist Radioaktivität nach"], d: "easy" },
  { id: "calorimeter", name: ["calorimeter", "calorímetro", "Kalorimeter"], what: ["Amount of heat", "Cantidad de calor", "Wärmemenge"], verb: ["measures amounts of heat", "mide cantidades de calor", "misst Wärmemengen"], clash: ["thermometer"], d: "hard" },
  { id: "hydrometer", name: ["hydrometer", "densímetro", "Aräometer"], what: ["Density of liquids", "Densidad de líquidos", "Dichte von Flüssigkeiten"], verb: ["measures the density of liquids", "mide la densidad de los líquidos", "misst die Dichte von Flüssigkeiten"], d: "hard" },
];

/** Branches of science: name, label of what it studies, rev phrase ("studies <en>", "estudia <es>", "beschäftigt sich <de>") */
export const BRANCHES: { name: L; what: L; ph: L; g?: string; d: D }[] = [
  { name: ["Ornithology", "Ornitología", "Ornithologie"], what: ["Birds", "Aves", "Vögel"], ph: ["birds", "las aves", "mit Vögeln"], g: "animal", d: "medium" },
  { name: ["Entomology", "Entomología", "Entomologie"], what: ["Insects", "Insectos", "Insekten"], ph: ["insects", "los insectos", "mit Insekten"], g: "animal", d: "medium" },
  { name: ["Ichthyology", "Ictiología", "Ichthyologie"], what: ["Fish", "Peces", "Fische"], ph: ["fish", "los peces", "mit Fischen"], g: "animal", d: "hard" },
  { name: ["Herpetology", "Herpetología", "Herpetologie"], what: ["Reptiles and amphibians", "Reptiles y anfibios", "Reptilien und Amphibien"], ph: ["reptiles and amphibians", "los reptiles y los anfibios", "mit Reptilien und Amphibien"], g: "animal", d: "hard" },
  { name: ["Arachnology", "Aracnología", "Arachnologie"], what: ["Spiders and other arachnids", "Arañas y otros arácnidos", "Spinnen und andere Spinnentiere"], ph: ["spiders and other arachnids", "las arañas y otros arácnidos", "mit Spinnen und anderen Spinnentieren"], g: "animal", d: "hard" },
  { name: ["Zoology", "Zoología", "Zoologie"], what: ["Animals", "Animales", "Tiere"], ph: ["animals", "los animales", "mit Tieren"], g: "animal", d: "easy" },
  { name: ["Botany", "Botánica", "Botanik"], what: ["Plants", "Plantas", "Pflanzen"], ph: ["plants", "las plantas", "mit Pflanzen"], g: "plant", d: "easy" },
  { name: ["Mycology", "Micología", "Mykologie"], what: ["Fungi", "Hongos", "Pilze"], ph: ["fungi", "los hongos", "mit Pilzen"], g: "plant", d: "hard" },
  { name: ["Seismology", "Sismología", "Seismologie"], what: ["Earthquakes", "Terremotos", "Erdbeben"], ph: ["earthquakes", "los terremotos", "mit Erdbeben"], g: "earth", d: "medium" },
  { name: ["Volcanology", "Vulcanología", "Vulkanologie"], what: ["Volcanoes", "Volcanes", "Vulkane"], ph: ["volcanoes", "los volcanes", "mit Vulkanen"], g: "earth", d: "easy" },
  { name: ["Geology", "Geología", "Geologie"], what: ["Rocks and the Earth's structure", "Rocas y estructura de la Tierra", "Gesteine und Aufbau der Erde"], ph: ["rocks and the structure of the Earth", "las rocas y la estructura de la Tierra", "mit Gesteinen und dem Aufbau der Erde"], g: "earth", d: "easy" },
  { name: ["Glaciology", "Glaciología", "Glaziologie"], what: ["Glaciers", "Glaciares", "Gletscher"], ph: ["glaciers", "los glaciares", "mit Gletschern"], g: "earth", d: "medium" },
  { name: ["Paleontology", "Paleontología", "Paläontologie"], what: ["Fossils", "Fósiles", "Fossilien"], ph: ["fossils", "los fósiles", "mit Fossilien"], g: "earth", d: "medium" },
  { name: ["Meteorology", "Meteorología", "Meteorologie"], what: ["Weather", "Tiempo atmosférico", "Wetter"], ph: ["the weather", "el tiempo atmosférico", "mit dem Wetter"], d: "easy" },
  { name: ["Oceanography", "Oceanografía", "Ozeanografie"], what: ["Oceans", "Océanos", "Ozeane"], ph: ["the oceans", "los océanos", "mit den Ozeanen"], d: "easy" },
  { name: ["Astronomy", "Astronomía", "Astronomie"], what: ["Stars, planets and galaxies", "Estrellas, planetas y galaxias", "Sterne, Planeten und Galaxien"], ph: ["stars, planets and galaxies", "las estrellas, los planetas y las galaxias", "mit Sternen, Planeten und Galaxien"], d: "easy" },
  { name: ["Genetics", "Genética", "Genetik"], what: ["Heredity and genes", "Herencia y genes", "Vererbung und Gene"], ph: ["heredity and genes", "la herencia y los genes", "mit Vererbung und Genen"], g: "cell", d: "easy" },
  { name: ["Cytology", "Citología", "Zytologie"], what: ["Cells", "Células", "Zellen"], ph: ["cells", "las células", "mit Zellen"], g: "cell", d: "hard" },
  { name: ["Virology", "Virología", "Virologie"], what: ["Viruses", "Virus", "Viren"], ph: ["viruses", "los virus", "mit Viren"], d: "medium" },
  { name: ["Cardiology", "Cardiología", "Kardiologie"], what: ["Heart", "Corazón", "Herz"], ph: ["the heart", "el corazón", "mit dem Herzen"], d: "medium" },
  { name: ["Dermatology", "Dermatología", "Dermatologie"], what: ["Skin", "Piel", "Haut"], ph: ["the skin", "la piel", "mit der Haut"], d: "medium" },
  { name: ["Ophthalmology", "Oftalmología", "Ophthalmologie"], what: ["Eyes", "Ojos", "Augen"], ph: ["the eyes", "los ojos", "mit den Augen"], d: "hard" },
  { name: ["Neurology", "Neurología", "Neurologie"], what: ["Nervous system", "Sistema nervioso", "Nervensystem"], ph: ["the nervous system", "el sistema nervioso", "mit dem Nervensystem"], d: "medium" },
  { name: ["Hematology", "Hematología", "Hämatologie"], what: ["Blood", "Sangre", "Blut"], ph: ["blood", "la sangre", "mit dem Blut"], d: "hard" },
  { name: ["Oncology", "Oncología", "Onkologie"], what: ["Cancer", "Cáncer", "Krebs"], ph: ["cancer", "el cáncer", "mit Krebs"], d: "hard" },
  { name: ["Speleology", "Espeleología", "Speläologie"], what: ["Caves", "Cuevas", "Höhlen"], ph: ["caves", "las cuevas", "mit Höhlen"], g: "earth", d: "hard" },
  { name: ["Ecology", "Ecología", "Ökologie"], what: ["Living things and their environment", "Seres vivos y su entorno", "Lebewesen und ihre Umwelt"], ph: ["how living things interact with their environment", "la relación de los seres vivos con su entorno", "mit Lebewesen und ihrer Umwelt"], d: "medium" },
];

// ── units & electronics ─────────────────────────────────────────────
/** SI prefixes: [name en, es, de], symbol, power of ten, difficulty */
export const PREFIXES: { name: L; sym: string; exp: number; d: D }[] = [
  { name: ["peta", "peta", "Peta"], sym: "P", exp: 15, d: "hard" },
  { name: ["tera", "tera", "Tera"], sym: "T", exp: 12, d: "medium" },
  { name: ["giga", "giga", "Giga"], sym: "G", exp: 9, d: "medium" },
  { name: ["mega", "mega", "Mega"], sym: "M", exp: 6, d: "easy" },
  { name: ["kilo", "kilo", "Kilo"], sym: "k", exp: 3, d: "easy" },
  { name: ["hecto", "hecto", "Hekto"], sym: "h", exp: 2, d: "medium" },
  { name: ["deca", "deca", "Deka"], sym: "da", exp: 1, d: "hard" },
  { name: ["deci", "deci", "Dezi"], sym: "d", exp: -1, d: "medium" },
  { name: ["centi", "centi", "Zenti"], sym: "c", exp: -2, d: "easy" },
  { name: ["milli", "mili", "Milli"], sym: "m", exp: -3, d: "easy" },
  { name: ["micro", "micro", "Mikro"], sym: "µ", exp: -6, d: "medium" },
  { name: ["nano", "nano", "Nano"], sym: "n", exp: -9, d: "medium" },
  { name: ["pico", "pico", "Piko"], sym: "p", exp: -12, d: "hard" },
  { name: ["femto", "femto", "Femto"], sym: "f", exp: -15, d: "hard" },
];

/** Electronic components. fn = "Which component <fn>?", job = short label for "What does <a> do?", a = "<a component>" */
export const COMPONENTS: { id: string; name: L; a: L; fn: L; job: L; clash?: string[]; d: D }[] = [
  { id: "resistor", name: ["Resistor", "Resistencia", "Widerstand"], a: ["a resistor", "una resistencia", "ein Widerstand"],
    fn: ["limits the current with a fixed value in ohms", "limita la corriente con un valor fijo en ohmios", "begrenzt den Strom mit einem festen Wert in Ohm"],
    job: ["Limits the current", "Limita la corriente", "Begrenzt den Strom"], clash: ["pot", "thermistor", "ldr", "fuse"], d: "medium" },
  { id: "pot", name: ["Potentiometer", "Potenciómetro", "Potentiometer"], a: ["a potentiometer", "un potenciómetro", "ein Potentiometer"],
    fn: ["has a resistance you can adjust by turning a knob", "permite ajustar su valor en ohmios girando un mando", "hat einen Widerstandswert, den man per Drehknopf einstellt"],
    job: ["Provides an adjustable resistance", "Ofrece un valor óhmico ajustable", "Bietet einen einstellbaren Widerstand"], clash: ["resistor", "thermistor", "ldr"], d: "hard" },
  { id: "thermistor", name: ["Thermistor", "Termistor", "Thermistor"], a: ["a thermistor", "un termistor", "ein Thermistor"],
    fn: ["changes its resistance strongly with temperature", "cambia mucho su valor en ohmios con la temperatura", "ändert seinen Widerstandswert stark mit der Temperatur"],
    job: ["Senses temperature", "Detecta la temperatura", "Erfasst die Temperatur"], clash: ["resistor", "pot", "ldr"], d: "hard" },
  { id: "ldr", name: ["LDR (photoresistor)", "Fotorresistencia (LDR)", "Fotowiderstand (LDR)"], a: ["an LDR (photoresistor)", "una fotorresistencia (LDR)", "ein Fotowiderstand (LDR)"],
    fn: ["changes its resistance with the amount of light falling on it", "cambia su valor en ohmios según la luz que recibe", "ändert seinen Widerstandswert je nach Lichteinfall"],
    job: ["Senses light", "Detecta la luz", "Erfasst Licht"], clash: ["resistor", "pot", "thermistor", "solar"], d: "hard" },
  { id: "capacitor", name: ["Capacitor", "Condensador", "Kondensator"], a: ["a capacitor", "un condensador", "ein Kondensator"],
    fn: ["stores energy in an electric field between two plates", "almacena energía en un campo eléctrico entre dos placas", "speichert Energie im elektrischen Feld zwischen zwei Platten"],
    job: ["Stores charge in an electric field", "Almacena carga en un campo eléctrico", "Speichert Ladung im elektrischen Feld"], clash: ["battery"], d: "medium" },
  { id: "inductor", name: ["Inductor (coil)", "Bobina", "Spule"], a: ["an inductor (coil)", "una bobina", "eine Spule"],
    fn: ["stores energy in a magnetic field", "almacena energía en un campo magnético", "speichert Energie in einem Magnetfeld"],
    job: ["Stores energy in a magnetic field", "Almacena energía en un campo magnético", "Speichert Energie im Magnetfeld"], clash: ["transformer", "relay"], d: "hard" },
  { id: "diode", name: ["Diode", "Diodo", "Diode"], a: ["a diode", "un diodo", "eine Diode"],
    fn: ["lets current flow in only one direction", "deja pasar la corriente en un solo sentido", "lässt Strom nur in eine Richtung durch"],
    job: ["Lets current pass one way only", "Deja pasar la corriente en un solo sentido", "Lässt Strom nur in eine Richtung durch"], clash: ["led"], d: "medium" },
  { id: "led", name: ["LED", "LED", "LED"], a: ["an LED", "un LED", "eine LED"],
    fn: ["lights up when current flows through it in the forward direction", "se ilumina cuando la corriente lo atraviesa en sentido directo", "leuchtet, wenn Strom in Durchlassrichtung hindurchfließt"],
    job: ["Gives off light", "Emite luz", "Gibt Licht ab"], clash: ["diode"], d: "easy" },
  { id: "transistor", name: ["Transistor", "Transistor", "Transistor"], a: ["a transistor", "un transistor", "ein Transistor"],
    fn: ["can amplify signals or act as an electronic switch", "puede amplificar señales o funcionar como interruptor electrónico", "kann Signale verstärken oder als elektronischer Schalter arbeiten"],
    job: ["Amplifies or switches signals", "Amplifica o conmuta señales", "Verstärkt oder schaltet Signale"], clash: ["relay", "switch"], d: "medium" },
  { id: "relay", name: ["Relay", "Relé", "Relais"], a: ["a relay", "un relé", "ein Relais"],
    fn: ["uses an electromagnet to open or close a separate circuit", "usa un electroimán para abrir o cerrar otro circuito", "öffnet oder schließt mit einem Elektromagneten einen anderen Stromkreis"],
    job: ["Switches a circuit with an electromagnet", "Conmuta un circuito con un electroimán", "Schaltet einen Stromkreis per Elektromagnet"], clash: ["transistor", "switch", "inductor"], d: "hard" },
  { id: "fuse", name: ["Fuse", "Fusible", "Sicherung"], a: ["a fuse", "un fusible", "eine Schmelzsicherung"],
    fn: ["melts and breaks the circuit if the current gets too high", "se funde y abre el circuito si la corriente es demasiado alta", "schmilzt durch und unterbricht den Stromkreis, wenn der Strom zu groß wird"],
    job: ["Breaks the circuit on overcurrent", "Corta el circuito si hay sobrecorriente", "Unterbricht den Stromkreis bei Überstrom"], clash: ["resistor", "switch"], d: "easy" },
  { id: "transformer", name: ["Transformer", "Transformador", "Transformator"], a: ["a transformer", "un transformador", "ein Transformator"],
    fn: ["changes an AC voltage into a higher or lower one", "convierte una tensión alterna en otra más alta o más baja", "wandelt eine Wechselspannung in eine höhere oder niedrigere um"],
    job: ["Steps AC voltage up or down", "Sube o baja la tensión alterna", "Setzt Wechselspannung herauf oder herab"], clash: ["inductor"], d: "medium" },
  { id: "battery", name: ["Battery", "Batería", "Batterie"], a: ["a battery", "una batería", "eine Batterie"],
    fn: ["supplies electrical energy from a chemical reaction", "suministra energía eléctrica a partir de una reacción química", "liefert elektrische Energie aus einer chemischen Reaktion"],
    job: ["Turns chemical energy into electricity", "Convierte energía química en electricidad", "Wandelt chemische Energie in Strom um"], clash: ["capacitor", "generator", "solar"], d: "easy" },
  { id: "switch", name: ["Switch", "Interruptor", "Schalter"], a: ["a switch", "un interruptor", "ein Schalter"],
    fn: ["lets you open or close a circuit by hand", "permite abrir o cerrar un circuito a mano", "öffnet oder schließt einen Stromkreis von Hand"],
    job: ["Opens or closes a circuit by hand", "Abre o cierra un circuito a mano", "Öffnet oder schließt einen Stromkreis von Hand"], clash: ["relay", "transistor", "fuse"], d: "easy" },
  { id: "speaker", name: ["Loudspeaker", "Altavoz", "Lautsprecher"], a: ["a loudspeaker", "un altavoz", "ein Lautsprecher"],
    fn: ["turns electrical signals into sound", "convierte señales eléctricas en sonido", "wandelt elektrische Signale in Schall um"],
    job: ["Turns electrical signals into sound", "Convierte señales eléctricas en sonido", "Wandelt elektrische Signale in Schall um"], clash: ["mic"], d: "easy" },
  { id: "mic", name: ["Microphone", "Micrófono", "Mikrofon"], a: ["a microphone", "un micrófono", "ein Mikrofon"],
    fn: ["turns sound into electrical signals", "convierte el sonido en señales eléctricas", "wandelt Schall in elektrische Signale um"],
    job: ["Turns sound into electrical signals", "Convierte el sonido en señales eléctricas", "Wandelt Schall in elektrische Signale um"], clash: ["speaker"], d: "easy" },
  { id: "motor", name: ["Electric motor", "Motor eléctrico", "Elektromotor"], a: ["an electric motor", "un motor eléctrico", "ein Elektromotor"],
    fn: ["turns electrical energy into motion", "convierte la energía eléctrica en movimiento", "wandelt elektrische Energie in Bewegung um"],
    job: ["Turns electricity into motion", "Convierte electricidad en movimiento", "Wandelt Strom in Bewegung um"], clash: ["generator"], d: "easy" },
  { id: "generator", name: ["Generator", "Generador", "Generator"], a: ["a generator", "un generador", "ein Generator"],
    fn: ["turns motion into electrical energy", "convierte el movimiento en energía eléctrica", "wandelt Bewegung in elektrische Energie um"],
    job: ["Turns motion into electricity", "Convierte movimiento en electricidad", "Wandelt Bewegung in Strom um"], clash: ["motor", "battery", "solar"], d: "medium" },
  { id: "solar", name: ["Solar cell", "Célula solar", "Solarzelle"], a: ["a solar cell", "una célula solar", "eine Solarzelle"],
    fn: ["turns light directly into electrical energy", "convierte la luz directamente en energía eléctrica", "wandelt Licht direkt in elektrische Energie um"],
    job: ["Turns light into electricity", "Convierte luz en electricidad", "Wandelt Licht in Strom um"], clash: ["ldr", "battery", "generator"], d: "easy" },
];

/** Logic gates: outputs for inputs 00, 01, 10, 11 (NOT has a single input) and a description ("Which logic gate <desc>?") */
export const GATES: { name: string; table?: [number, number, number, number]; desc: L; d: D }[] = [
  { name: "AND", table: [0, 0, 0, 1], desc: ["outputs 1 only when all of its inputs are 1", "da 1 solo cuando todas sus entradas son 1", "gibt nur dann 1 aus, wenn alle Eingänge 1 sind"], d: "medium" },
  { name: "OR", table: [0, 1, 1, 1], desc: ["outputs 1 when at least one input is 1", "da 1 cuando al menos una entrada es 1", "gibt 1 aus, sobald mindestens ein Eingang 1 ist"], d: "medium" },
  { name: "XOR", table: [0, 1, 1, 0], desc: ["outputs 1 only when its two inputs are different", "da 1 solo cuando sus dos entradas son distintas", "gibt nur dann 1 aus, wenn seine beiden Eingänge verschieden sind"], d: "hard" },
  { name: "NAND", table: [1, 1, 1, 0], desc: ["outputs 0 only when all of its inputs are 1", "da 0 solo cuando todas sus entradas son 1", "gibt nur dann 0 aus, wenn alle Eingänge 1 sind"], d: "hard" },
  { name: "NOR", table: [1, 0, 0, 0], desc: ["outputs 1 only when all of its inputs are 0", "da 1 solo cuando todas sus entradas son 0", "gibt nur dann 1 aus, wenn alle Eingänge 0 sind"], d: "hard" },
  { name: "XNOR", table: [1, 0, 0, 1], desc: ["outputs 1 only when its two inputs are equal", "da 1 solo cuando sus dos entradas son iguales", "gibt nur dann 1 aus, wenn seine beiden Eingänge gleich sind"], d: "hard" },
  { name: "NOT", desc: ["simply inverts its single input", "simplemente invierte su única entrada", "invertiert einfach seinen einzigen Eingang"], d: "easy" },
];

/** Resistor colour code */
export const COLOURS: L[] = [
  ["black", "negro", "Schwarz"], ["brown", "marrón", "Braun"], ["red", "rojo", "Rot"], ["orange", "naranja", "Orange"], ["yellow", "amarillo", "Gelb"],
  ["green", "verde", "Grün"], ["blue", "azul", "Blau"], ["violet", "violeta", "Violett"], ["grey", "gris", "Grau"], ["white", "blanco", "Weiß"],
];

/** Abbreviations: [abbr, expansion, 3 made-up expansions with the same initials, difficulty] */
export const ACRONYMS: [string, string, string[], D][] = [
  ["CPU", "Central Processing Unit", ["Computer Personal Unit", "Central Program Utility", "Core Power Unit"], "medium"],
  ["GPU", "Graphics Processing Unit", ["General Power Unit", "Graphic Program Utility", "Game Processing Unit"], "medium"],
  ["RAM", "Random Access Memory", ["Rapid Action Memory", "Read And Modify", "Random Allocation Module"], "medium"],
  ["ROM", "Read-Only Memory", ["Random Operating Memory", "Rapid Output Module", "Read-Once Machine"], "hard"],
  ["USB", "Universal Serial Bus", ["Unified System Board", "Universal Signal Box", "User Serial Bridge"], "easy"],
  ["LED", "Light-Emitting Diode", ["Low-Energy Device", "Light-Enhancing Display", "Linear Electric Diode"], "medium"],
  ["LCD", "Liquid Crystal Display", ["Light Contrast Diode", "Low-Cost Display", "Liquid Colour Device"], "medium"],
  ["HTML", "HyperText Markup Language", ["HighTech Modern Language", "HyperText Machine Language", "Home Tool Markup Language"], "medium"],
  ["HTTP", "HyperText Transfer Protocol", ["High Transfer Text Protocol", "HyperText Transmission Program", "Home Terminal Transfer Protocol"], "medium"],
  ["URL", "Uniform Resource Locator", ["Universal Routing Link", "User Resource Line", "Unified Remote Location"], "hard"],
  ["GPS", "Global Positioning System", ["General Purpose Satellite", "Global Path Service", "Geographic Position Sensor"], "easy"],
  ["NASA", "National Aeronautics and Space Administration", ["North American Space Agency", "National Astronomy and Science Association", "National Aerospace Systems Authority"], "medium"],
  ["LASER", "Light Amplification by Stimulated Emission of Radiation", ["Light Activated by Strong Electric Radiation", "Linear Amplified Source of Energetic Rays", "Light Absorption by Selected Electron Resonance"], "hard"],
  ["RADAR", "Radio Detection And Ranging", ["Radio Aircraft Direction And Recording", "Rapid Distance And Range", "Radiated Detection And Reflection"], "hard"],
  ["SONAR", "Sound Navigation And Ranging", ["Sonic Object Navigation And Recording", "Sound Oscillation Noise Analysis Radar", "Signal Over Noise Acoustic Ranging"], "hard"],
  ["PDF", "Portable Document Format", ["Printable Data File", "Public Document File", "Personal Data Format"], "medium"],
  ["AI", "Artificial Intelligence", ["Automated Information", "Advanced Interface", "Algorithmic Input"], "easy"],
  ["IP", "Internet Protocol", ["Internal Port", "Information Path", "Internet Provider"], "medium"],
  ["SSD", "Solid-State Drive", ["Super Speed Disk", "Static Storage Device", "System Storage Disk"], "medium"],
  ["HDD", "Hard Disk Drive", ["High-Density Disk", "Hard Data Device", "Hybrid Disk Drive"], "medium"],
  ["AC", "Alternating Current", ["Active Current", "Amplified Charge", "Automatic Circuit"], "easy"],
  ["DC", "Direct Current", ["Dual Current", "Digital Charge", "Dynamic Circuit"], "easy"],
  ["PCB", "Printed Circuit Board", ["Power Control Box", "Primary Circuit Breaker", "Programmed Chip Base"], "hard"],
  ["IC", "Integrated Circuit", ["Internal Chip", "Isolated Conductor", "Input Controller"], "medium"],
  ["RFID", "Radio-Frequency Identification", ["Remote Field Identity Detection", "Radio File ID", "Rapid Frequency Indicator Device"], "hard"],
  ["NFC", "Near-Field Communication", ["Network File Connection", "New Frequency Channel", "Near Fast Contact"], "hard"],
  ["SIM", "Subscriber Identity Module", ["Secure Internet Module", "System Information Memory", "Smart Interface Microchip"], "hard"],
  ["ISS", "International Space Station", ["Interstellar Space Ship", "International Satellite System", "Integrated Space Shuttle"], "easy"],
  ["ASCII", "American Standard Code for Information Interchange", ["Advanced System Code for Internet Information", "American Software Character Index", "Automatic Standard Code for Input Interfaces"], "hard"],
  ["BIOS", "Basic Input/Output System", ["Binary Integrated Operating Software", "Basic Internal Operating Setup", "Boot Instruction Operating System"], "hard"],
  ["LAN", "Local Area Network", ["Large Access Node", "Linked Application Network", "Long-range Area Network"], "medium"],
  ["WWW", "World Wide Web", ["World Web Workspace", "Wide World Wireless", "World Wide Wireless"], "easy"],
  ["SQL", "Structured Query Language", ["Simple Question Logic", "Standard Quick Language", "System Query List"], "hard"],
  ["PWM", "Pulse-Width Modulation", ["Power Wave Management", "Phase-Wave Multiplier", "Pulse Watt Meter"], "hard"],
  ["ADC", "Analog-to-Digital Converter", ["Automatic Data Controller", "Advanced Digital Circuit", "Amplified Direct Current"], "hard"],
  ["DAC", "Digital-to-Analog Converter", ["Direct Access Controller", "Digital Amplifier Circuit", "Dual Audio Channel"], "hard"],
];

/** Programming languages & software: phrase for "Who created …?", label, creator, difficulty */
export const CODE: { what: L; label: L; who: string; d: D }[] = [
  { what: ["the programming language Python", "el lenguaje de programación Python", "die Programmiersprache Python"], label: ["Python", "Python", "Python"], who: "Guido van Rossum", d: "medium" },
  { what: ["the programming language C", "el lenguaje de programación C", "die Programmiersprache C"], label: ["C", "C", "C"], who: "Dennis Ritchie", d: "hard" },
  { what: ["the programming language C++", "el lenguaje de programación C++", "die Programmiersprache C++"], label: ["C++", "C++", "C++"], who: "Bjarne Stroustrup", d: "hard" },
  { what: ["the programming language Java", "el lenguaje de programación Java", "die Programmiersprache Java"], label: ["Java", "Java", "Java"], who: "James Gosling", d: "hard" },
  { what: ["the programming language JavaScript", "el lenguaje de programación JavaScript", "die Programmiersprache JavaScript"], label: ["JavaScript", "JavaScript", "JavaScript"], who: "Brendan Eich", d: "hard" },
  { what: ["the programming language Ruby", "el lenguaje de programación Ruby", "die Programmiersprache Ruby"], label: ["Ruby", "Ruby", "Ruby"], who: "Yukihiro Matsumoto", d: "hard" },
  { what: ["the programming language PHP", "el lenguaje de programación PHP", "die Programmiersprache PHP"], label: ["PHP", "PHP", "PHP"], who: "Rasmus Lerdorf", d: "hard" },
  { what: ["the programming language Perl", "el lenguaje de programación Perl", "die Programmiersprache Perl"], label: ["Perl", "Perl", "Perl"], who: "Larry Wall", d: "hard" },
  { what: ["the programming language C#", "el lenguaje de programación C#", "die Programmiersprache C#"], label: ["C#", "C#", "C#"], who: "Anders Hejlsberg", d: "hard" },
  { what: ["the programming language TypeScript", "el lenguaje de programación TypeScript", "die Programmiersprache TypeScript"], label: ["TypeScript", "TypeScript", "TypeScript"], who: "Anders Hejlsberg", d: "hard" },
  { what: ["the programming language Swift", "el lenguaje de programación Swift", "die Programmiersprache Swift"], label: ["Swift", "Swift", "Swift"], who: "Chris Lattner", d: "hard" },
  { what: ["the programming language Lisp", "el lenguaje de programación Lisp", "die Programmiersprache Lisp"], label: ["Lisp", "Lisp", "Lisp"], who: "John McCarthy", d: "hard" },
  { what: ["the programming language Rust", "el lenguaje de programación Rust", "die Programmiersprache Rust"], label: ["Rust", "Rust", "Rust"], who: "Graydon Hoare", d: "hard" },
  { what: ["the programming language Fortran", "el lenguaje de programación Fortran", "die Programmiersprache Fortran"], label: ["Fortran", "Fortran", "Fortran"], who: "John Backus", d: "hard" },
  { what: ["the Linux kernel", "el núcleo Linux", "den Linux-Kernel"], label: ["Linux kernel", "Núcleo Linux", "Linux-Kernel"], who: "Linus Torvalds", d: "medium" },
  { what: ["the version control system Git", "el sistema de control de versiones Git", "die Versionsverwaltung Git"], label: ["Git", "Git", "Git"], who: "Linus Torvalds", d: "hard" },
];

// ── space ───────────────────────────────────────────────────────────
/** Moons: name, index into PLANETS, difficulty */
export const MOONS: [L, number, D][] = [
  [["Titan", "Titán", "Titan"], 5, "medium"],
  [["Enceladus", "Encélado", "Enceladus"], 5, "hard"],
  [["Mimas", "Mimas", "Mimas"], 5, "hard"],
  [["Rhea", "Rea", "Rhea"], 5, "hard"],
  [["Iapetus", "Jápeto", "Iapetus"], 5, "hard"],
  [["Europa", "Europa", "Europa"], 4, "medium"],
  [["Ganymede", "Ganímedes", "Ganymed"], 4, "medium"],
  [["Io", "Ío", "Io"], 4, "medium"],
  [["Callisto", "Calisto", "Kallisto"], 4, "hard"],
  [["Phobos", "Fobos", "Phobos"], 3, "medium"],
  [["Deimos", "Deimos", "Deimos"], 3, "hard"],
  [["Triton", "Tritón", "Triton"], 7, "hard"],
  [["Nereid", "Nereida", "Nereid"], 7, "hard"],
  [["Titania", "Titania", "Titania"], 6, "hard"],
  [["Oberon", "Oberón", "Oberon"], 6, "hard"],
  [["Miranda", "Miranda", "Miranda"], 6, "hard"],
  [["Ariel", "Ariel", "Ariel"], 6, "hard"],
  [["Umbriel", "Umbriel", "Umbriel"], 6, "hard"],
];
/** German accusative for "umkreist den …" */
export const PLANET_DE_ACC = ["den Merkur", "die Venus", "die Erde", "den Mars", "den Jupiter", "den Saturn", "den Uranus", "den Neptun"];

/** "Which planet <q>?" */
export const PLANET_FACTS: [L, number, D][] = [
  [["is known as the Red Planet", "es conocido como el planeta rojo", "wird der Rote Planet genannt"], 3, "easy"],
  [["has the Great Red Spot, a giant storm", "tiene la Gran Mancha Roja, una tormenta gigantesca", "hat den Großen Roten Fleck, einen riesigen Wirbelsturm"], 4, "medium"],
  [["is famous for its bright, wide rings", "es famoso por sus anillos brillantes y anchos", "ist für seine hellen, breiten Ringe berühmt"], 5, "easy"],
  [["spins on its side, with its axis tilted by about 98°", "gira «tumbado», con el eje inclinado unos 98°", "rotiert quasi liegend, mit einer Achsneigung von etwa 98°"], 6, "hard"],
  [["is the hottest planet in the Solar System", "es el planeta más caliente del sistema solar", "ist der heißeste Planet des Sonnensystems"], 1, "medium"],
  [["has the shortest year", "tiene el año más corto", "hat das kürzeste Jahr"], 0, "medium"],
  [["has Olympus Mons, the largest volcano in the Solar System", "tiene el monte Olimpo (Olympus Mons), el mayor volcán del sistema solar", "trägt den Olympus Mons, den größten Vulkan des Sonnensystems"], 3, "hard"],
  [["was discovered in 1846 thanks to mathematical predictions", "se descubrió en 1846 gracias a cálculos matemáticos", "wurde 1846 dank mathematischer Berechnungen entdeckt"], 7, "hard"],
  [["was the first planet discovered with a telescope (1781)", "fue el primer planeta descubierto con un telescopio (1781)", "wurde als erster Planet mit einem Teleskop entdeckt (1781)"], 6, "hard"],
  [["has a day that is longer than its year", "tiene un día más largo que su año", "hat einen Tag, der länger ist als sein Jahr"], 1, "hard"],
  [["has the highest average density", "tiene la mayor densidad media", "hat die größte mittlere Dichte"], 2, "hard"],
  [["has the lowest density and would float in water", "tiene la menor densidad y flotaría en el agua", "hat die geringste Dichte und würde in Wasser schwimmen"], 5, "medium"],
  [["has the strongest winds in the Solar System", "tiene los vientos más fuertes del sistema solar", "hat die stärksten Winde im Sonnensystem"], 7, "hard"],
  [["is named after the Roman god of war", "lleva el nombre del dios romano de la guerra", "ist nach dem römischen Kriegsgott benannt"], 3, "medium"],
  [["is named after the messenger of the Roman gods", "lleva el nombre del mensajero de los dioses romanos", "ist nach dem Götterboten der Römer benannt"], 0, "medium"],
  [["is named after the Roman goddess of love", "lleva el nombre de la diosa romana del amor", "ist nach der römischen Liebesgöttin benannt"], 1, "easy"],
  [["is named after the king of the Roman gods", "lleva el nombre del rey de los dioses romanos", "ist nach dem höchsten Gott der Römer benannt"], 4, "medium"],
  [["is named after the Roman god of the sea", "lleva el nombre del dios romano del mar", "ist nach dem römischen Meeresgott benannt"], 7, "medium"],
  [["is named after the Greek god of the sky", "lleva el nombre del dios griego del cielo", "ist nach dem griechischen Himmelsgott benannt"], 6, "hard"],
];

/** Hand-written questions: [stem, question, right, wrong options (≥3), difficulty] */
export type Fact = [string, L, L, L[], D];

export const ASTRO: Fact[] = [
  ["sirius", ["Which is the brightest star in the night sky?", "¿Cuál es la estrella más brillante del cielo nocturno?", "Welcher ist der hellste Stern am Nachthimmel?"],
    ["Sirius", "Sirio", "Sirius"], [["Polaris", "Polaris", "Polaris"], ["Betelgeuse", "Betelgeuse", "Beteigeuze"], ["Vega", "Vega", "Wega"], ["Rigel", "Rigel", "Rigel"]], "medium"],
  ["polaris", ["Which star lies almost exactly above Earth's North Pole?", "¿Qué estrella está casi justo encima del polo norte terrestre?", "Welcher Stern steht fast genau über dem Nordpol der Erde?"],
    ["Polaris", "Polaris", "Polaris"], [["Sirius", "Sirio", "Sirius"], ["Betelgeuse", "Betelgeuse", "Beteigeuze"], ["Vega", "Vega", "Wega"], ["Rigel", "Rigel", "Rigel"]], "medium"],
  ["proxima", ["Which star is the closest to the Sun?", "¿Cuál es la estrella más cercana al Sol?", "Welcher Stern ist der Sonne am nächsten?"],
    ["Proxima Centauri", "Próxima Centauri", "Proxima Centauri"], [["Sirius", "Sirio", "Sirius"], ["Polaris", "Polaris", "Polaris"], ["Betelgeuse", "Betelgeuse", "Beteigeuze"], ["Vega", "Vega", "Wega"]], "medium"],
  ["milkyway", ["In which galaxy is our Solar System?", "¿En qué galaxia se encuentra nuestro sistema solar?", "In welcher Galaxie liegt unser Sonnensystem?"],
    ["Milky Way", "Vía Láctea", "Milchstraße"], [["Andromeda Galaxy", "Galaxia de Andrómeda", "Andromedagalaxie"], ["Triangulum Galaxy", "Galaxia del Triángulo", "Dreiecksgalaxie"], ["Sombrero Galaxy", "Galaxia del Sombrero", "Sombrerogalaxie"], ["Whirlpool Galaxy", "Galaxia del Remolino", "Whirlpool-Galaxie"]], "easy"],
  ["andromeda", ["Which large spiral galaxy is the closest to the Milky Way?", "¿Qué gran galaxia espiral es la más cercana a la Vía Láctea?", "Welche große Spiralgalaxie ist der Milchstraße am nächsten?"],
    ["Andromeda Galaxy", "Galaxia de Andrómeda", "Andromedagalaxie"], [["Sombrero Galaxy", "Galaxia del Sombrero", "Sombrerogalaxie"], ["Whirlpool Galaxy", "Galaxia del Remolino", "Whirlpool-Galaxie"], ["Pinwheel Galaxy", "Galaxia del Molinete", "Feuerradgalaxie"]], "medium"],
  ["sun-h", ["Which element is the Sun mainly made of?", "¿De qué elemento está compuesto principalmente el Sol?", "Aus welchem Element besteht die Sonne hauptsächlich?"],
    ["Hydrogen", "Hidrógeno", "Wasserstoff"], [["Oxygen", "Oxígeno", "Sauerstoff"], ["Iron", "Hierro", "Eisen"], ["Carbon", "Carbono", "Kohlenstoff"], ["Nitrogen", "Nitrógeno", "Stickstoff"]], "medium"],
  ["sun-fusion", ["Which process produces the Sun's energy?", "¿Qué proceso produce la energía del Sol?", "Welcher Vorgang erzeugt die Energie der Sonne?"],
    ["Nuclear fusion", "Fusión nuclear", "Kernfusion"], [["Nuclear fission", "Fisión nuclear", "Kernspaltung"], ["Combustion", "Combustión", "Verbrennung"], ["Radioactive decay", "Desintegración radiactiva", "Radioaktiver Zerfall"]], "medium"],
  ["sun-type", ["What type of star is the Sun?", "¿Qué tipo de estrella es el Sol?", "Was für ein Stern ist die Sonne?"],
    ["Yellow dwarf", "Enana amarilla", "Gelber Zwerg"], [["Red giant", "Gigante roja", "Roter Riese"], ["White dwarf", "Enana blanca", "Weißer Zwerg"], ["Neutron star", "Estrella de neutrones", "Neutronenstern"], ["Blue supergiant", "Supergigante azul", "Blauer Überriese"]], "medium"],
  ["halley", ["Which comet comes back roughly every 76 years?", "¿Qué cometa regresa aproximadamente cada 76 años?", "Welcher Komet kehrt etwa alle 76 Jahre zurück?"],
    ["Halley's Comet", "Cometa Halley", "Halleyscher Komet"], [["Hale–Bopp", "Hale-Bopp", "Hale-Bopp"], ["Shoemaker–Levy 9", "Shoemaker-Levy 9", "Shoemaker-Levy 9"], ["Encke's Comet", "Cometa Encke", "Enckescher Komet"]], "medium"],
  ["belt", ["Between which two planets is the main asteroid belt?", "¿Entre qué dos planetas está el cinturón principal de asteroides?", "Zwischen welchen beiden Planeten liegt der Asteroidengürtel?"],
    ["Mars and Jupiter", "Marte y Júpiter", "Mars und Jupiter"], [["Earth and Mars", "Tierra y Marte", "Erde und Mars"], ["Jupiter and Saturn", "Júpiter y Saturno", "Jupiter und Saturn"], ["Venus and Earth", "Venus y Tierra", "Venus und Erde"], ["Uranus and Neptune", "Urano y Neptuno", "Uranus und Neptun"]], "medium"],
  ["lightyear", ["What does a light-year measure?", "¿Qué mide un año luz?", "Was misst man in Lichtjahren?"],
    ["Distance", "Distancia", "Entfernung"], [["Time", "Tiempo", "Zeit"], ["Speed", "Velocidad", "Geschwindigkeit"], ["Brightness", "Brillo", "Helligkeit"], ["Mass", "Masa", "Masse"]], "easy"],
  ["sputnik", ["What was the first artificial satellite in orbit (1957)?", "¿Cuál fue el primer satélite artificial en órbita (1957)?", "Was war der erste künstliche Satellit im Orbit (1957)?"],
    ["Sputnik 1", "Sputnik 1", "Sputnik 1"], [["Explorer 1", "Explorer 1", "Explorer 1"], ["Telstar 1", "Telstar 1", "Telstar 1"], ["Vanguard 1", "Vanguard 1", "Vanguard 1"]], "medium"],
  ["hubble", ["Which space telescope was launched in 1990?", "¿Qué telescopio espacial se lanzó en 1990?", "Welches Weltraumteleskop wurde 1990 gestartet?"],
    ["Hubble", "Hubble", "Hubble"], [["James Webb", "James Webb", "James Webb"], ["Kepler", "Kepler", "Kepler"], ["Spitzer", "Spitzer", "Spitzer"]], "medium"],
  ["webb", ["Which space telescope was launched in December 2021?", "¿Qué telescopio espacial se lanzó en diciembre de 2021?", "Welches Weltraumteleskop wurde im Dezember 2021 gestartet?"],
    ["James Webb", "James Webb", "James Webb"], [["Hubble", "Hubble", "Hubble"], ["Kepler", "Kepler", "Kepler"], ["Spitzer", "Spitzer", "Spitzer"]], "medium"],
  ["betelgeuse", ["In which constellation is the red supergiant Betelgeuse?", "¿En qué constelación está la supergigante roja Betelgeuse?", "In welchem Sternbild steht der Rote Überriese Beteigeuze?"],
    ["Orion", "Orión", "Orion"], [["Ursa Major", "Osa Mayor", "Großer Bär"], ["Cassiopeia", "Casiopea", "Kassiopeia"], ["Leo", "Leo", "Löwe"], ["Scorpius", "Escorpio", "Skorpion"]], "hard"],
  ["charon", ["Charon is the largest moon of which dwarf planet?", "Caronte es la luna más grande de qué planeta enano?", "Charon ist der größte Mond welches Zwergplaneten?"],
    ["Pluto", "Plutón", "Pluto"], [["Ceres", "Ceres", "Ceres"], ["Eris", "Eris", "Eris"], ["Haumea", "Haumea", "Haumea"], ["Makemake", "Makemake", "Makemake"]], "hard"],
  ["year", ["How long does the Earth take to orbit the Sun once?", "¿Cuánto tarda la Tierra en dar una vuelta al Sol?", "Wie lange braucht die Erde für einen Umlauf um die Sonne?"],
    ["About 365 days", "Unos 365 días", "Etwa 365 Tage"], [["About 24 hours", "Unas 24 horas", "Etwa 24 Stunden"], ["About 30 days", "Unos 30 días", "Etwa 30 Tage"], ["About 687 days", "Unos 687 días", "Etwa 687 Tage"]], "easy"],
  ["sunlight", ["Roughly how long does sunlight take to reach the Earth?", "¿Cuánto tarda aproximadamente la luz del Sol en llegar a la Tierra?", "Wie lange braucht das Sonnenlicht ungefähr bis zur Erde?"],
    ["About 8 minutes", "Unos 8 minutos", "Etwa 8 Minuten"], [["About 8 seconds", "Unos 8 segundos", "Etwa 8 Sekunden"], ["About 8 hours", "Unas 8 horas", "Etwa 8 Stunden"], ["About 1 second", "Alrededor de 1 segundo", "Etwa 1 Sekunde"], ["About 3 days", "Unos 3 días", "Etwa 3 Tage"]], "medium"],
];

// ── physics constants & everyday values (labels built in science.ts) ─
/** [stem, question, value label, wrong labels, difficulty] — numbers formatted per language in science.ts via n() */
export const N = (en: string, es: string, de: string): L => [en, es, de];

// ── body ────────────────────────────────────────────────────────────
/** [stem, question, answer, wrong numbers, unit (optional), difficulty] */
export const BODY_NUMBERS: [string, L, number, number[], L | null, D][] = [
  ["bones", ["How many bones does an adult human skeleton have?", "¿Cuántos huesos tiene el esqueleto de una persona adulta?", "Wie viele Knochen hat das Skelett eines erwachsenen Menschen?"], 206, [106, 156, 256, 306, 412], null, "medium"],
  ["teeth", ["How many teeth are in a full adult set (with wisdom teeth)?", "¿Cuántos dientes tiene una dentadura adulta completa (con las muelas del juicio)?", "Wie viele Zähne hat ein vollständiges Erwachsenengebiss (mit Weisheitszähnen)?"], 32, [20, 24, 36, 40, 44], null, "medium"],
  ["milk-teeth", ["How many milk teeth does a child have?", "¿Cuántos dientes de leche tiene un niño?", "Wie viele Milchzähne hat ein Kind?"], 20, [12, 16, 24, 28, 32], null, "medium"],
  ["heart", ["How many chambers does the human heart have in total?", "¿Cuántas cavidades tiene en total el corazón humano?", "Aus wie vielen Hohlräumen (Kammern und Vorhöfen) besteht das menschliche Herz?"], 4, [2, 3, 5, 6, 8], null, "easy"],
  ["chromosomes", ["How many chromosomes does a normal human body cell contain?", "¿Cuántos cromosomas tiene una célula normal del cuerpo humano?", "Wie viele Chromosomen enthält eine normale menschliche Körperzelle?"], 46, [24, 32, 48, 64, 92], null, "medium"],
  ["chromosome-pairs", ["How many pairs of chromosomes do humans have?", "¿Cuántos pares de cromosomas tiene el ser humano?", "Wie viele Chromosomenpaare hat der Mensch?"], 23, [12, 19, 21, 32, 48], null, "medium"],
  ["ribs", ["How many pairs of ribs does a human normally have?", "¿Cuántos pares de costillas tiene normalmente una persona?", "Wie viele Rippenpaare hat ein Mensch normalerweise?"], 12, [7, 9, 10, 14, 16], null, "medium"],
  ["neck", ["How many vertebrae are in the human neck?", "¿Cuántas vértebras tiene el cuello humano?", "Wie viele Halswirbel hat der Mensch?"], 7, [3, 5, 9, 12, 14], null, "hard"],
  ["ossicles", ["How many tiny bones (ossicles) are in each middle ear?", "¿Cuántos huesecillos hay en cada oído medio?", "Wie viele Gehörknöchelchen hat jedes Mittelohr?"], 3, [1, 2, 5, 6, 8], null, "hard"],
  ["hand", ["How many bones are in one human hand (including the wrist)?", "¿Cuántos huesos tiene una mano humana (incluida la muñeca)?", "Wie viele Knochen hat eine menschliche Hand (mit Handwurzel)?"], 27, [12, 15, 19, 35, 42], null, "hard"],
  ["blood", ["Roughly how much blood does an adult have?", "¿Aproximadamente cuánta sangre tiene una persona adulta?", "Wie viel Blut hat ein Erwachsener ungefähr?"], 5, [1, 2, 10, 15, 20], ["litres", "litros", "Liter"], "medium"],
  ["temp", ["What is the normal human body temperature, roughly?", "¿Cuál es, aproximadamente, la temperatura normal del cuerpo humano?", "Wie hoch ist die normale Körpertemperatur des Menschen ungefähr?"], 37, [31, 33, 40, 42, 45], ["°C", "°C", "°C"], "easy"],
  ["lung-lobes", ["How many lobes does the right lung have?", "¿Cuántos lóbulos tiene el pulmón derecho?", "Wie viele Lappen hat der rechte Lungenflügel?"], 3, [1, 2, 5, 6], null, "hard"],
];

/** Bones: label, question, difficulty */
export const BONES: { id: string; label: L; q: L; d: D }[] = [
  { id: "femur", label: ["Femur", "Fémur", "Femur"], q: ["What is the medical name for the thigh bone?", "¿Cómo se llama el hueso del muslo?", "Wie lautet der Fachbegriff für den Oberschenkelknochen?"], d: "easy" },
  { id: "femur2", label: ["Femur", "Fémur", "Femur"], q: ["Which is the longest bone in the human body?", "¿Cuál es el hueso más largo del cuerpo humano?", "Welcher ist der längste Knochen des menschlichen Körpers?"], d: "medium" },
  { id: "patella", label: ["Patella", "Rótula", "Patella"], q: ["What is the medical name for the kneecap?", "¿Qué hueso cubre la parte delantera de la rodilla?", "Wie lautet der Fachbegriff für die Kniescheibe?"], d: "medium" },
  { id: "clavicle", label: ["Clavicle", "Clavícula", "Clavicula"], q: ["What is the medical name for the collarbone?", "¿Qué hueso une el esternón con el hombro?", "Wie lautet der Fachbegriff für das Schlüsselbein?"], d: "medium" },
  { id: "scapula", label: ["Scapula", "Escápula", "Scapula"], q: ["What is the medical name for the shoulder blade?", "¿Cómo se llama el hueso plano y triangular de la parte alta de la espalda?", "Wie lautet der Fachbegriff für das Schulterblatt?"], d: "medium" },
  { id: "sternum", label: ["Sternum", "Esternón", "Sternum"], q: ["What is the medical name for the breastbone?", "¿Qué hueso plano está en el centro del pecho y une las costillas?", "Wie lautet der Fachbegriff für das Brustbein?"], d: "medium" },
  { id: "tibia", label: ["Tibia", "Tibia", "Tibia"], q: ["What is the medical name for the shinbone?", "¿Cómo se llama el hueso de la espinilla?", "Wie lautet der Fachbegriff für das Schienbein?"], d: "medium" },
  { id: "fibula", label: ["Fibula", "Peroné", "Fibula"], q: ["What is the medical name for the calf bone?", "¿Cómo se llama el hueso delgado de la parte externa de la pierna?", "Wie lautet der Fachbegriff für das Wadenbein?"], d: "hard" },
  { id: "mandible", label: ["Mandible", "Mandíbula", "Mandibula"], q: ["What is the medical name for the lower jawbone?", "¿Cómo se llama el hueso móvil de la cara en el que están los dientes inferiores?", "Wie lautet der Fachbegriff für den Unterkiefer?"], d: "medium" },
  { id: "humerus", label: ["Humerus", "Húmero", "Humerus"], q: ["What is the medical name for the upper arm bone?", "¿Cómo se llama el hueso del brazo, entre el hombro y el codo?", "Wie lautet der Fachbegriff für den Oberarmknochen?"], d: "medium" },
  { id: "ulna", label: ["Ulna", "Cúbito", "Ulna"], q: ["Which forearm bone is on the little-finger side?", "¿Qué hueso del antebrazo está del lado del meñique?", "Wie lautet der Fachbegriff für die Elle?"], d: "hard" },
  { id: "radius", label: ["Radius", "Radio", "Radius"], q: ["Which forearm bone is on the thumb side?", "¿Qué hueso del antebrazo está del lado del pulgar?", "Wie lautet der Fachbegriff für die Speiche?"], d: "hard" },
  { id: "stapes", label: ["Stapes", "Estribo", "Stapes"], q: ["Which is the smallest bone in the human body?", "¿Cuál es el hueso más pequeño del cuerpo humano?", "Welcher ist der kleinste Knochen des menschlichen Körpers?"], d: "hard" },
];

/** Vitamins: [stem, question, vitamin key, difficulty] */
export const VITAMIN_KEYS = ["A", "B1", "B3", "B12", "C", "D", "E", "K"];
export const VITAMINS: [string, L, string, D][] = [
  ["scurvy", ["A lack of which vitamin causes scurvy?", "¿La falta de qué vitamina provoca el escorbuto?", "Ein Mangel an welchem Vitamin verursacht Skorbut?"], "C", "medium"],
  ["rickets", ["A lack of which vitamin causes rickets?", "¿La falta de qué vitamina provoca el raquitismo?", "Ein Mangel an welchem Vitamin verursacht Rachitis?"], "D", "medium"],
  ["night", ["A lack of which vitamin causes night blindness?", "¿La falta de qué vitamina provoca ceguera nocturna?", "Ein Mangel an welchem Vitamin verursacht Nachtblindheit?"], "A", "medium"],
  ["beriberi", ["A lack of which vitamin causes beriberi?", "¿La falta de qué vitamina provoca el beriberi?", "Ein Mangel an welchem Vitamin verursacht Beriberi?"], "B1", "hard"],
  ["pellagra", ["A lack of which vitamin causes pellagra?", "¿La falta de qué vitamina provoca la pelagra?", "Ein Mangel an welchem Vitamin verursacht Pellagra?"], "B3", "hard"],
  ["pernicious", ["A lack of which vitamin causes pernicious anaemia?", "¿La falta de qué vitamina provoca la anemia perniciosa?", "Ein Mangel an welchem Vitamin verursacht die perniziöse Anämie?"], "B12", "hard"],
  ["sunlight", ["Which vitamin does your skin make when it is exposed to sunlight?", "¿Qué vitamina produce la piel cuando recibe la luz del sol?", "Welches Vitamin bildet die Haut im Sonnenlicht?"], "D", "easy"],
  ["clotting", ["Which vitamin is needed for blood clotting?", "¿Qué vitamina es necesaria para la coagulación de la sangre?", "Welches Vitamin wird für die Blutgerinnung benötigt?"], "K", "hard"],
  ["citrus", ["Which vitamin are citrus fruits especially famous for?", "¿Por qué vitamina son especialmente famosos los cítricos?", "Für welches Vitamin sind Zitrusfrüchte besonders bekannt?"], "C", "easy"],
  ["carrot", ["The body turns the beta-carotene in carrots into which vitamin?", "¿En qué vitamina transforma el cuerpo el betacaroteno de las zanahorias?", "In welches Vitamin wandelt der Körper das Betacarotin aus Karotten um?"], "A", "medium"],
  ["animal", ["Which vitamin is found naturally almost only in animal foods?", "¿Qué vitamina se encuentra de forma natural casi solo en alimentos de origen animal?", "Welches Vitamin kommt natürlicherweise fast nur in tierischen Lebensmitteln vor?"], "B12", "hard"],
];

/** Cell parts: label, "Which part of a cell <d>?", difficulty */
export const CELL_PARTS: { label: L; q: L; d: D }[] = [
  { label: ["Nucleus", "Núcleo", "Zellkern"], q: ["contains most of the DNA and controls the cell", "contiene la mayor parte del ADN y controla la célula", "enthält den Großteil der DNA und steuert die Zelle"], d: "easy" },
  { label: ["Mitochondria", "Mitocondrias", "Mitochondrien"], q: ["is known as the “powerhouse” of the cell", "se conoce como la «central energética» de la célula", "gilt als „Kraftwerk“ der Zelle"], d: "medium" },
  { label: ["Ribosomes", "Ribosomas", "Ribosomen"], q: ["builds proteins", "fabrica las proteínas", "stellt Proteine her"], d: "hard" },
  { label: ["Chloroplasts", "Cloroplastos", "Chloroplasten"], q: ["carries out photosynthesis in plant cells", "realiza la fotosíntesis en las células vegetales", "betreibt in Pflanzenzellen die Fotosynthese"], d: "medium" },
  { label: ["Cell membrane", "Membrana celular", "Zellmembran"], q: ["controls what enters and leaves the cell", "controla lo que entra y sale de la célula", "kontrolliert, was in die Zelle hinein- und aus ihr herausgelangt"], d: "medium" },
  { label: ["Cell wall", "Pared celular", "Zellwand"], q: ["gives plant cells a rigid outer layer made of cellulose", "da a las células vegetales una capa exterior rígida de celulosa", "gibt Pflanzenzellen eine feste Hülle aus Cellulose"], d: "medium" },
  { label: ["Vacuole", "Vacuola", "Vakuole"], q: ["is a large sac that stores water in plant cells", "es un gran saco que almacena agua en las células vegetales", "ist ein großer Speicherraum für Wasser in Pflanzenzellen"], d: "hard" },
  { label: ["Golgi apparatus", "Aparato de Golgi", "Golgi-Apparat"], q: ["modifies, packages and ships proteins", "modifica, empaqueta y distribuye proteínas", "verändert, verpackt und verschickt Proteine"], d: "hard" },
  { label: ["Lysosome", "Lisosoma", "Lysosom"], q: ["breaks down waste and worn-out parts with enzymes", "descompone con enzimas los desechos y las partes desgastadas", "baut mit Enzymen Abfallstoffe und alte Zellteile ab"], d: "hard" },
  { label: ["Cytoplasm", "Citoplasma", "Zytoplasma"], q: ["is the jelly-like fluid that fills the cell", "es el líquido gelatinoso que llena la célula", "ist die gallertartige Flüssigkeit, die die Zelle ausfüllt"], d: "medium" },
];

/** Gases: label by key */
export const GASES: Record<string, L> = {
  n2: ["Nitrogen", "Nitrógeno", "Stickstoff"], o2: ["Oxygen", "Oxígeno", "Sauerstoff"], co2: ["Carbon dioxide", "Dióxido de carbono", "Kohlenstoffdioxid"],
  he: ["Helium", "Helio", "Helium"], h2: ["Hydrogen", "Hidrógeno", "Wasserstoff"], ne: ["Neon", "Neón", "Neon"], ar: ["Argon", "Argón", "Argon"],
  ch4: ["Methane", "Metano", "Methan"], o3: ["Ozone", "Ozono", "Ozon"], co: ["Carbon monoxide", "Monóxido de carbono", "Kohlenstoffmonoxid"],
  cl2: ["Chlorine", "Cloro", "Chlor"], h2s: ["Hydrogen sulfide", "Sulfuro de hidrógeno", "Schwefelwasserstoff"],
};
/** [stem, question, gas key, keys never offered as wrong, difficulty] */
export const GAS_FACTS: [string, L, string, string[], D][] = [
  ["air78", ["Which gas makes up about 78% of the air?", "¿Qué gas forma alrededor del 78 % del aire?", "Welches Gas macht etwa 78 % der Luft aus?"], "n2", [], "medium"],
  ["air21", ["Which gas makes up about 21% of the air?", "¿Qué gas forma alrededor del 21 % del aire?", "Welches Gas macht etwa 21 % der Luft aus?"], "o2", [], "medium"],
  ["air3", ["Which gas is the third most common in dry air (almost 1%)?", "¿Cuál es el tercer gas más abundante del aire seco (casi un 1 %)?", "Welches Gas ist mit knapp 1 % das dritthäufigste in trockener Luft?"], "ar", ["co2"], "hard"],
  ["breathe", ["Which gas do we breathe out more of than we breathe in?", "¿De qué gas exhalamos más de lo que inhalamos?", "Von welchem Gas atmen wir mehr aus als ein?"], "co2", [], "easy"],
  ["balloon", ["Which gas is used to make party balloons float?", "¿Qué gas se usa para que los globos de fiesta floten?", "Mit welchem Gas füllt man Partyballons, damit sie schweben?"], "he", ["h2"], "easy"],
  ["lightest", ["Which is the lightest of all gases?", "¿Cuál es el gas más ligero de todos?", "Welches ist das leichteste aller Gase?"], "h2", [], "medium"],
  ["neon", ["Which gas glows red-orange in classic illuminated signs?", "¿Qué gas brilla en rojo anaranjado en los letreros luminosos clásicos?", "Welches Gas leuchtet in klassischen Leuchtreklamen rotorange?"], "ne", [], "medium"],
  ["natgas", ["Which gas is the main component of natural gas?", "¿Cuál es el componente principal del gas natural?", "Welches Gas ist der Hauptbestandteil von Erdgas?"], "ch4", [], "medium"],
  ["ozone", ["Which gas forms a layer high in the atmosphere that blocks UV radiation?", "¿Qué gas forma una capa en lo alto de la atmósfera que bloquea la radiación UV?", "Welches Gas bildet hoch in der Atmosphäre eine Schicht, die UV-Strahlung abschirmt?"], "o3", [], "medium"],
  ["co", ["Which colourless, odourless and very poisonous gas forms when fuel burns without enough air?", "¿Qué gas incoloro, inodoro y muy tóxico se forma cuando un combustible arde con poco aire?", "Welches farb- und geruchlose, sehr giftige Gas entsteht, wenn Brennstoff mit zu wenig Luft verbrennt?"], "co", ["co2"], "medium"],
  ["eggs", ["Which gas smells of rotten eggs?", "¿Qué gas huele a huevos podridos?", "Welches Gas riecht nach faulen Eiern?"], "h2s", [], "medium"],
  ["chlorine", ["Which yellow-green, poisonous gas is used to disinfect drinking water?", "¿Qué gas amarillo verdoso y tóxico se usa para desinfectar el agua potable?", "Welches gelbgrüne, giftige Gas wird zur Desinfektion von Trinkwasser verwendet?"], "cl2", ["o3"], "hard"],
  ["fizz", ["Which gas makes the bubbles in sparkling water?", "¿Qué gas forma las burbujas del agua con gas?", "Welches Gas sorgt für die Bläschen im Sprudelwasser?"], "co2", [], "easy"],
];

/** Laws & principles: label, statement (quoted in the question), clash ids, difficulty */
export const LAWS: { id: string; label: L; says: L; clash?: string[]; d: D }[] = [
  { id: "ohm", label: ["Ohm's law", "Ley de Ohm", "Ohmsches Gesetz"], says: ["The current through a conductor is proportional to the voltage across it.", "La corriente que atraviesa un conductor es proporcional a la tensión aplicada.", "Der Strom durch einen Leiter ist proportional zur angelegten Spannung."], d: "medium" },
  { id: "archimedes", label: ["Archimedes' principle", "Principio de Arquímedes", "Archimedisches Prinzip"], says: ["A body in a fluid is pushed up by a force equal to the weight of the fluid it displaces.", "Un cuerpo sumergido en un fluido recibe un empuje igual al peso del fluido que desaloja.", "Ein Körper in einer Flüssigkeit erfährt einen Auftrieb, der so groß ist wie die Gewichtskraft der verdrängten Flüssigkeit."], d: "medium" },
  { id: "boyle", label: ["Boyle's law", "Ley de Boyle-Mariotte", "Gesetz von Boyle-Mariotte"], says: ["At constant temperature, the pressure of a gas is inversely proportional to its volume.", "A temperatura constante, la presión de un gas es inversamente proporcional a su volumen.", "Bei konstanter Temperatur ist der Druck eines Gases umgekehrt proportional zu seinem Volumen."], d: "hard" },
  { id: "hooke", label: ["Hooke's law", "Ley de Hooke", "Hookesches Gesetz"], says: ["The extension of a spring is proportional to the force pulling on it.", "El alargamiento de un muelle es proporcional a la fuerza que tira de él.", "Die Verlängerung einer Feder ist proportional zur Kraft, die an ihr zieht."], d: "medium" },
  { id: "newton1", label: ["Newton's first law", "Primera ley de Newton", "Erstes newtonsches Gesetz"], says: ["A body stays at rest or keeps moving in a straight line at constant speed unless a force acts on it.", "Un cuerpo permanece en reposo o en movimiento rectilíneo uniforme mientras no actúe ninguna fuerza sobre él.", "Ein Körper bleibt in Ruhe oder in gleichförmiger geradliniger Bewegung, solange keine Kraft auf ihn wirkt."], d: "medium" },
  { id: "newton2", label: ["Newton's second law", "Segunda ley de Newton", "Zweites newtonsches Gesetz"], says: ["Force equals mass times acceleration.", "La fuerza es igual a la masa por la aceleración.", "Kraft ist gleich Masse mal Beschleunigung."], d: "medium" },
  { id: "newton3", label: ["Newton's third law", "Tercera ley de Newton", "Drittes newtonsches Gesetz"], says: ["For every action there is an equal and opposite reaction.", "A toda acción se opone una reacción igual y de sentido contrario.", "Zu jeder Kraft gibt es eine gleich große, entgegengesetzt gerichtete Gegenkraft."], d: "easy" },
  { id: "gravity", label: ["Law of universal gravitation", "Ley de gravitación universal", "Gravitationsgesetz"], says: ["Every mass attracts every other mass.", "Toda masa atrae a cualquier otra masa.", "Jede Masse zieht jede andere Masse an."], clash: ["coulomb"], d: "medium" },
  { id: "coulomb", label: ["Coulomb's law", "Ley de Coulomb", "Coulombsches Gesetz"], says: ["The force between two electric charges falls with the square of their distance.", "La fuerza entre dos cargas eléctricas disminuye con el cuadrado de su distancia.", "Die Kraft zwischen zwei elektrischen Ladungen nimmt mit dem Quadrat ihres Abstands ab."], clash: ["gravity"], d: "hard" },
  { id: "kcl", label: ["Kirchhoff's current law", "Primera ley de Kirchhoff", "Erstes kirchhoffsches Gesetz"], says: ["The currents flowing into a junction add up to the currents flowing out of it.", "La suma de las corrientes que entran en un nudo es igual a la suma de las que salen.", "In einem Knotenpunkt ist die Summe der zufließenden Ströme gleich der Summe der abfließenden."], d: "hard" },
  { id: "kvl", label: ["Kirchhoff's voltage law", "Segunda ley de Kirchhoff", "Zweites kirchhoffsches Gesetz"], says: ["The voltages around any closed loop of a circuit add up to zero.", "La suma de las tensiones a lo largo de una malla cerrada es cero.", "In jeder geschlossenen Masche ist die Summe aller Spannungen null."], d: "hard" },
  { id: "lenz", label: ["Lenz's law", "Ley de Lenz", "Lenzsche Regel"], says: ["An induced current always flows so that it opposes the change that caused it.", "La corriente inducida siempre se opone al cambio que la produce.", "Ein induzierter Strom ist stets so gerichtet, dass er seiner Ursache entgegenwirkt."], d: "hard" },
  { id: "moore", label: ["Moore's law", "Ley de Moore", "Mooresches Gesetz"], says: ["The number of transistors on a chip doubles roughly every two years.", "El número de transistores de un chip se duplica aproximadamente cada dos años.", "Die Zahl der Transistoren auf einem Chip verdoppelt sich etwa alle zwei Jahre."], d: "medium" },
  { id: "energy", label: ["Conservation of energy", "Conservación de la energía", "Energieerhaltungssatz"], says: ["Energy cannot be created or destroyed, only converted from one form into another.", "La energía no se crea ni se destruye, solo se transforma.", "Energie kann weder erzeugt noch vernichtet, sondern nur umgewandelt werden."], d: "easy" },
  { id: "pascal", label: ["Pascal's principle", "Principio de Pascal", "Pascalsches Prinzip"], says: ["Pressure applied to an enclosed fluid spreads equally in all directions.", "La presión ejercida sobre un fluido encerrado se transmite por igual en todas las direcciones.", "Druck auf eine eingeschlossene Flüssigkeit breitet sich gleichmäßig in alle Richtungen aus."], d: "hard" },
];

/** Formulas → quantity. f = formula as written in each language */
export const EQUATIONS: { id: string; f: L; q: L; clash?: string[]; d: D }[] = [
  { id: "force", f: ["F = m · a", "F = m · a", "F = m · a"], q: ["Force", "Fuerza", "Kraft"], d: "easy" },
  { id: "energy", f: ["E = m · c²", "E = m · c²", "E = m · c²"], q: ["Energy", "Energía", "Energie"], clash: ["work", "ekin", "epot"], d: "easy" },
  { id: "voltage", f: ["V = I · R", "U = R · I", "U = R · I"], q: ["Voltage", "Tensión eléctrica", "Elektrische Spannung"], d: "medium" },
  { id: "power", f: ["P = V · I", "P = U · I", "P = U · I"], q: ["Electrical power", "Potencia eléctrica", "Elektrische Leistung"], d: "medium" },
  { id: "speed", f: ["v = d / t", "v = d / t", "v = s / t"], q: ["Speed", "Velocidad", "Geschwindigkeit"], d: "easy" },
  { id: "density", f: ["ρ = m / V", "ρ = m / V", "ρ = m / V"], q: ["Density", "Densidad", "Dichte"], d: "medium" },
  { id: "pressure", f: ["p = F / A", "p = F / A", "p = F / A"], q: ["Pressure", "Presión", "Druck"], d: "medium" },
  { id: "work", f: ["W = F · d", "W = F · d", "W = F · s"], q: ["Work", "Trabajo", "Arbeit"], clash: ["energy", "ekin", "epot"], d: "medium" },
  { id: "charge", f: ["Q = I · t", "Q = I · t", "Q = I · t"], q: ["Electric charge", "Carga eléctrica", "Elektrische Ladung"], d: "hard" },
  { id: "freq", f: ["f = 1 / T", "f = 1 / T", "f = 1 / T"], q: ["Frequency", "Frecuencia", "Frequenz"], d: "medium" },
  { id: "accel", f: ["a = Δv / Δt", "a = Δv / Δt", "a = Δv / Δt"], q: ["Acceleration", "Aceleración", "Beschleunigung"], d: "medium" },
  { id: "current", f: ["I = V / R", "I = U / R", "I = U / R"], q: ["Electric current", "Corriente eléctrica", "Elektrische Stromstärke"], d: "medium" },
  { id: "resistance", f: ["R = V / I", "R = U / I", "R = U / I"], q: ["Electrical resistance", "Resistencia eléctrica", "Elektrischer Widerstand"], d: "medium" },
  { id: "momentum", f: ["p = m · v", "p = m · v", "p = m · v"], q: ["Momentum", "Cantidad de movimiento", "Impuls"], d: "hard" },
  { id: "ekin", f: ["E = ½ · m · v²", "E = ½ · m · v²", "E = ½ · m · v²"], q: ["Kinetic energy", "Energía cinética", "Kinetische Energie"], clash: ["energy", "work", "epot"], d: "medium" },
  { id: "epot", f: ["E = m · g · h", "E = m · g · h", "E = m · g · h"], q: ["Potential energy", "Energía potencial", "Potenzielle Energie"], clash: ["energy", "work", "ekin"], d: "medium" },
];

/** SI units named after people: unit label, quantity (lower-case en/es, de as noun), person, difficulty */
export const UNIT_PEOPLE: { unit: L; qty: L; who: string; sym: string; d: D }[] = [
  { unit: ["Volt", "Voltio", "Volt"], qty: ["voltage", "tensión eléctrica", "elektrische Spannung"], who: "Alessandro Volta", sym: "V", d: "medium" },
  { unit: ["Ampere", "Amperio", "Ampere"], qty: ["electric current", "corriente eléctrica", "elektrische Stromstärke"], who: "André-Marie Ampère", sym: "A", d: "medium" },
  { unit: ["Ohm", "Ohmio", "Ohm"], qty: ["electrical resistance", "resistencia eléctrica", "elektrischer Widerstand"], who: "Georg Simon Ohm", sym: "Ω", d: "medium" },
  { unit: ["Watt", "Vatio", "Watt"], qty: ["power", "potencia", "Leistung"], who: "James Watt", sym: "W", d: "medium" },
  { unit: ["Newton", "Newton", "Newton"], qty: ["force", "fuerza", "Kraft"], who: "Isaac Newton", sym: "N", d: "easy" },
  { unit: ["Joule", "Julio", "Joule"], qty: ["energy", "energía", "Energie"], who: "James Prescott Joule", sym: "J", d: "medium" },
  { unit: ["Hertz", "Hercio", "Hertz"], qty: ["frequency", "frecuencia", "Frequenz"], who: "Heinrich Hertz", sym: "Hz", d: "medium" },
  { unit: ["Pascal", "Pascal", "Pascal"], qty: ["pressure", "presión", "Druck"], who: "Blaise Pascal", sym: "Pa", d: "medium" },
  { unit: ["Kelvin", "Kelvin", "Kelvin"], qty: ["thermodynamic temperature", "temperatura termodinámica", "thermodynamische Temperatur"], who: "Lord Kelvin", sym: "K", d: "medium" },
  { unit: ["Coulomb", "Culombio", "Coulomb"], qty: ["electric charge", "carga eléctrica", "elektrische Ladung"], who: "Charles-Augustin de Coulomb", sym: "C", d: "hard" },
  { unit: ["Farad", "Faradio", "Farad"], qty: ["capacitance", "capacidad eléctrica", "elektrische Kapazität"], who: "Michael Faraday", sym: "F", d: "hard" },
  { unit: ["Tesla", "Tesla", "Tesla"], qty: ["magnetic flux density", "densidad de flujo magnético", "magnetische Flussdichte"], who: "Nikola Tesla", sym: "T", d: "hard" },
  { unit: ["Henry", "Henrio", "Henry"], qty: ["inductance", "inductancia", "Induktivität"], who: "Joseph Henry", sym: "H", d: "hard" },
  { unit: ["Weber", "Weber", "Weber"], qty: ["magnetic flux", "flujo magnético", "magnetischer Fluss"], who: "Wilhelm Weber", sym: "Wb", d: "hard" },
  { unit: ["Siemens", "Siemens", "Siemens"], qty: ["electrical conductance", "conductancia eléctrica", "elektrischer Leitwert"], who: "Werner von Siemens", sym: "S", d: "hard" },
  { unit: ["Becquerel", "Becquerel", "Becquerel"], qty: ["radioactivity", "actividad radiactiva", "Radioaktivität (Aktivität)"], who: "Henri Becquerel", sym: "Bq", d: "hard" },
  { unit: ["Sievert", "Sievert", "Sievert"], qty: ["equivalent radiation dose", "dosis equivalente de radiación", "Äquivalentdosis"], who: "Rolf Sievert", sym: "Sv", d: "hard" },
  { unit: ["Gray", "Gray", "Gray"], qty: ["absorbed radiation dose", "dosis de radiación absorbida", "Energiedosis"], who: "Louis Harold Gray", sym: "Gy", d: "hard" },
];
/** further SI units for the symbol question (not named after people) */
export const OTHER_UNITS: { unit: L; sym: string; d: D }[] = [
  { unit: ["Metre", "Metro", "Meter"], sym: "m", d: "easy" },
  { unit: ["Second", "Segundo", "Sekunde"], sym: "s", d: "easy" },
  { unit: ["Kilogram", "Kilogramo", "Kilogramm"], sym: "kg", d: "easy" },
  { unit: ["Mole", "Mol", "Mol"], sym: "mol", d: "medium" },
  { unit: ["Candela", "Candela", "Candela"], sym: "cd", d: "hard" },
  { unit: ["Lux", "Lux", "Lux"], sym: "lx", d: "hard" },
];

// ── materials ───────────────────────────────────────────────────────
export const MOHS: [string, string, string, number][] = [
  ["Talc", "Talco", "Talk", 1], ["Gypsum", "Yeso", "Gips", 2], ["Calcite", "Calcita", "Calcit", 3], ["Fluorite", "Fluorita", "Fluorit", 4],
  ["Apatite", "Apatito", "Apatit", 5], ["Orthoclase (feldspar)", "Ortoclasa (feldespato)", "Orthoklas (Feldspat)", 6], ["Quartz", "Cuarzo", "Quarz", 7],
  ["Topaz", "Topacio", "Topas", 8], ["Corundum", "Corindón", "Korund", 9], ["Diamond", "Diamante", "Diamant", 10],
];

export const ACIDIC: L[] = [
  ["Lemon juice", "Zumo de limón", "Zitronensaft"], ["Vinegar", "Vinagre", "Essig"], ["Cola", "Refresco de cola", "Cola"],
  ["Stomach acid", "Jugo gástrico", "Magensäure"], ["Orange juice", "Zumo de naranja", "Orangensaft"], ["Battery acid", "Ácido de batería", "Batteriesäure"],
];
export const ALKALINE: L[] = [
  ["Soapy water", "Agua jabonosa", "Seifenwasser"], ["Household bleach", "Lejía", "Chlorbleiche"], ["Baking soda solution", "Agua con bicarbonato", "Natronlösung"],
  ["Household ammonia", "Amoníaco doméstico", "Salmiakgeist"], ["Milk of magnesia", "Leche de magnesia", "Magnesiamilch"],
];
export const NEUTRAL: L[] = [["Pure water", "Agua pura", "Reines Wasser"]];

export const CONDUCTORS: L[] = [
  ["Copper", "Cobre", "Kupfer"], ["Silver", "Plata", "Silber"], ["Aluminium", "Aluminio", "Aluminium"], ["Gold", "Oro", "Gold"],
  ["Iron", "Hierro", "Eisen"], ["Graphite", "Grafito", "Graphit"], ["Salt water", "Agua salada", "Salzwasser"],
];
export const INSULATORS: L[] = [
  ["Rubber", "Goma", "Gummi"], ["Glass", "Vidrio", "Glas"], ["Dry wood", "Madera seca", "Trockenes Holz"], ["Plastic (PVC)", "Plástico (PVC)", "Kunststoff (PVC)"],
  ["Porcelain", "Porcelana", "Porzellan"], ["Dry air", "Aire seco", "Trockene Luft"], ["Paper", "Papel", "Papier"],
];
export const SEMICONDUCTORS: L[] = [
  ["Silicon", "Silicio", "Silizium"], ["Germanium", "Germanio", "Germanium"], ["Gallium arsenide", "Arseniuro de galio", "Galliumarsenid"], ["Silicon carbide", "Carburo de silicio", "Siliziumkarbid"],
];
export const MAGNETIC: L[] = [["Iron", "Hierro", "Eisen"], ["Nickel", "Níquel", "Nickel"], ["Cobalt", "Cobalto", "Cobalt"], ["Steel", "Acero", "Stahl"]];
export const NON_MAGNETIC: L[] = [
  ["Copper", "Cobre", "Kupfer"], ["Aluminium", "Aluminio", "Aluminium"], ["Gold", "Oro", "Gold"], ["Silver", "Plata", "Silber"],
  ["Lead", "Plomo", "Blei"], ["Zinc", "Zinc", "Zink"], ["Tin", "Estaño", "Zinn"], ["Brass", "Latón", "Messing"],
];

export const RENEWABLE: L[] = [
  ["Solar energy", "Energía solar", "Sonnenenergie"], ["Wind energy", "Energía eólica", "Windenergie"], ["Hydropower", "Energía hidráulica", "Wasserkraft"],
  ["Geothermal energy", "Energía geotérmica", "Erdwärme"], ["Tidal energy", "Energía mareomotriz", "Gezeitenenergie"], ["Biomass", "Biomasa", "Biomasse"],
];
export const FOSSIL: L[] = [["Coal", "Carbón", "Kohle"], ["Crude oil", "Petróleo", "Erdöl"], ["Natural gas", "Gas natural", "Erdgas"]];
export const NUCLEAR: L = ["Nuclear power (uranium)", "Energía nuclear (uranio)", "Kernenergie (Uran)"];

// ── waves ───────────────────────────────────────────────────────────
/** electromagnetic spectrum, longest wavelength first */
export const EM: L[] = [
  ["Radio waves", "Ondas de radio", "Radiowellen"], ["Microwaves", "Microondas", "Mikrowellen"], ["Infrared radiation", "Radiación infrarroja", "Infrarotstrahlung"],
  ["Visible light", "Luz visible", "Sichtbares Licht"], ["Ultraviolet radiation", "Radiación ultravioleta", "UV-Strahlung"], ["X-rays", "Rayos X", "Röntgenstrahlen"], ["Gamma rays", "Rayos gamma", "Gammastrahlen"],
];
/** visible colours, longest wavelength first */
export const LIGHT_COLOURS: L[] = [
  ["Red", "Rojo", "Rot"], ["Orange", "Naranja", "Orange"], ["Yellow", "Amarillo", "Gelb"], ["Green", "Verde", "Grün"], ["Blue", "Azul", "Blau"], ["Violet", "Violeta", "Violett"],
];

/** States of matter changes: name, during-phrase, from, to (0 solid, 1 liquid, 2 gas) */
export const STATES: L[] = [["solid", "sólido", "fest"], ["liquid", "líquido", "flüssig"], ["gas", "gas", "gasförmig"]];
export const PHASES: { name: L; during: L; from: number; to: number; d: D }[] = [
  { name: ["Melting", "Fusión", "Schmelzen"], during: ["during melting", "en la fusión", "beim Schmelzen"], from: 0, to: 1, d: "easy" },
  { name: ["Freezing", "Solidificación", "Erstarren"], during: ["during freezing", "en la solidificación", "beim Erstarren"], from: 1, to: 0, d: "easy" },
  { name: ["Evaporation", "Vaporización", "Verdampfen"], during: ["during evaporation", "en la vaporización", "beim Verdampfen"], from: 1, to: 2, d: "easy" },
  { name: ["Condensation", "Condensación", "Kondensieren"], during: ["during condensation", "en la condensación", "beim Kondensieren"], from: 2, to: 1, d: "medium" },
  { name: ["Sublimation", "Sublimación", "Sublimieren"], during: ["during sublimation", "en la sublimación", "beim Sublimieren"], from: 0, to: 2, d: "medium" },
  { name: ["Deposition", "Deposición", "Resublimieren"], during: ["during deposition", "en la deposición", "beim Resublimieren"], from: 2, to: 0, d: "hard" },
];

// ── maths ───────────────────────────────────────────────────────────
/** polygons by number of sides: [en, es, de (Greek-style name), de everyday name (genitive adds -s)] */
export const POLYGONS: Record<number, [string, string, string, string]> = {
  3: ["triangle", "triángulo", "Dreieck", "Dreieck"],
  4: ["quadrilateral", "cuadrilátero", "Viereck", "Viereck"],
  5: ["pentagon", "pentágono", "Pentagon", "Fünfeck"],
  6: ["hexagon", "hexágono", "Hexagon", "Sechseck"],
  7: ["heptagon", "heptágono", "Heptagon", "Siebeneck"],
  8: ["octagon", "octógono", "Oktogon", "Achteck"],
  9: ["nonagon", "eneágono", "Enneagon", "Neuneck"],
  10: ["decagon", "decágono", "Dekagon", "Zehneck"],
  11: ["hendecagon", "endecágono", "Hendekagon", "Elfeck"],
  12: ["dodecagon", "dodecágono", "Dodekagon", "Zwölfeck"],
};
