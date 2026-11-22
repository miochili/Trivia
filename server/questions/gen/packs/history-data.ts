/**
 * Fact tables for the "history" question pack (packs/history.ts).
 * Only well-established facts; anything contested was left out on purpose.
 * L = [English, Spanish, German].
 */
import type { L } from "../generate";

type D = "easy" | "medium" | "hard";

/** Places that are not (or no longer) in the country table. */
export const PLACES: Record<string, { name: L; en: string; esDe: string; deVon: string; deIn: string }> = {
  ussr: { name: ["Soviet Union", "Unión Soviética", "Sowjetunion"], en: "the Soviet Union", esDe: "de la Unión Soviética", deVon: "von der Sowjetunion", deIn: "in der Sowjetunion" },
  ottoman: { name: ["Ottoman Empire", "Imperio otomano", "Osmanisches Reich"], en: "the Ottoman Empire", esDe: "del Imperio otomano", deVon: "vom Osmanischen Reich", deIn: "im Osmanischen Reich" },
  austria_hungary: { name: ["Austria-Hungary", "Austria-Hungría", "Österreich-Ungarn"], en: "Austria-Hungary", esDe: "de Austria-Hungría", deVon: "von Österreich-Ungarn", deIn: "in Österreich-Ungarn" },
  england: { name: ["England", "Inglaterra", "England"], en: "England", esDe: "de Inglaterra", deVon: "von England", deIn: "in England" },
  korea: { name: ["Korea", "Corea", "Korea"], en: "Korea", esDe: "de Corea", deVon: "von Korea", deIn: "in Korea" },
  tunisia: { name: ["Tunisia", "Túnez", "Tunesien"], en: "Tunisia", esDe: "de Túnez", deVon: "von Tunesien", deIn: "in Tunesien" },
  guatemala: { name: ["Guatemala", "Guatemala", "Guatemala"], en: "Guatemala", esDe: "de Guatemala", deVon: "von Guatemala", deIn: "in Guatemala" },
  luxembourg: { name: ["Luxembourg", "Luxemburgo", "Luxemburg"], en: "Luxembourg", esDe: "de Luxemburgo", deVon: "von Luxemburg", deIn: "in Luxemburg" },
  georgia: { name: ["Georgia", "Georgia", "Georgien"], en: "Georgia", esDe: "de Georgia", deVon: "von Georgien", deIn: "in Georgien" },
  armenia: { name: ["Armenia", "Armenia", "Armenien"], en: "Armenia", esDe: "de Armenia", deVon: "von Armenien", deIn: "in Armenien" },
  azerbaijan: { name: ["Azerbaijan", "Azerbaiyán", "Aserbaidschan"], en: "Azerbaijan", esDe: "de Azerbaiyán", deVon: "von Aserbaidschan", deIn: "in Aserbaidschan" },
  moldova: { name: ["Moldova", "Moldavia", "Moldau"], en: "Moldova", esDe: "de Moldavia", deVon: "von Moldau", deIn: "in Moldau" },
  kyrgyzstan: { name: ["Kyrgyzstan", "Kirguistán", "Kirgisistan"], en: "Kyrgyzstan", esDe: "de Kirguistán", deVon: "von Kirgisistan", deIn: "in Kirgisistan" },
  tajikistan: { name: ["Tajikistan", "Tayikistán", "Tadschikistan"], en: "Tajikistan", esDe: "de Tayikistán", deVon: "von Tadschikistan", deIn: "in Tadschikistan" },
  turkmenistan: { name: ["Turkmenistan", "Turkmenistán", "Turkmenistan"], en: "Turkmenistan", esDe: "de Turkmenistán", deVon: "von Turkmenistan", deIn: "in Turkmenistan" },
  bosnia: { name: ["Bosnia and Herzegovina", "Bosnia y Herzegovina", "Bosnien und Herzegowina"], en: "Bosnia and Herzegovina", esDe: "de Bosnia y Herzegovina", deVon: "von Bosnien und Herzegowina", deIn: "in Bosnien und Herzegowina" },
  montenegro: { name: ["Montenegro", "Montenegro", "Montenegro"], en: "Montenegro", esDe: "de Montenegro", deVon: "von Montenegro", deIn: "in Montenegro" },
  north_macedonia: { name: ["North Macedonia", "Macedonia del Norte", "Nordmazedonien"], en: "North Macedonia", esDe: "de Macedonia del Norte", deVon: "von Nordmazedonien", deIn: "in Nordmazedonien" },
  bhutan: { name: ["Bhutan", "Bután", "Bhutan"], en: "Bhutan", esDe: "de Bután", deVon: "von Bhutan", deIn: "in Bhutan" },
  west_germany: { name: ["West Germany", "Alemania Occidental", "Westdeutschland"], en: "West Germany", esDe: "de Alemania Occidental", deVon: "von Westdeutschland", deIn: "in Westdeutschland" },
  british_india: { name: ["British India", "India británica", "Britisch-Indien"], en: "British India", esDe: "de la India británica", deVon: "von Britisch-Indien", deIn: "in Britisch-Indien" },
};

/** Former names: [old, modern, kind, difficulty, modern as Spanish/German subject override?] */
export const OLD_NAMES: { old: L; modern: L; kind: "country" | "city"; d: D; deVon?: string; es?: string }[] = [
  { old: ["Persia", "Persia", "Persien"], modern: ["Iran", "Irán", "Iran"], kind: "country", d: "easy", deVon: "vom Iran", es: "Irán" },
  { old: ["Siam", "Siam", "Siam"], modern: ["Thailand", "Tailandia", "Thailand"], kind: "country", d: "medium" },
  { old: ["Ceylon", "Ceilán", "Ceylon"], modern: ["Sri Lanka", "Sri Lanka", "Sri Lanka"], kind: "country", d: "medium" },
  { old: ["Burma", "Birmania", "Birma"], modern: ["Myanmar", "Myanmar", "Myanmar"], kind: "country", d: "medium" },
  { old: ["Abyssinia", "Abisinia", "Abessinien"], modern: ["Ethiopia", "Etiopía", "Äthiopien"], kind: "country", d: "medium" },
  { old: ["Gold Coast", "Costa de Oro", "Goldküste"], modern: ["Ghana", "Ghana", "Ghana"], kind: "country", d: "hard" },
  { old: ["Rhodesia", "Rodesia", "Rhodesien"], modern: ["Zimbabwe", "Zimbabue", "Simbabwe"], kind: "country", d: "hard" },
  { old: ["Zaire", "Zaire", "Zaire"], modern: ["DR Congo", "República Democrática del Congo", "Demokratische Republik Kongo"], kind: "country", d: "medium", deVon: "von der Demokratischen Republik Kongo", es: "la República Democrática del Congo" },
  { old: ["Upper Volta", "Alto Volta", "Obervolta"], modern: ["Burkina Faso", "Burkina Faso", "Burkina Faso"], kind: "country", d: "hard" },
  { old: ["Dahomey", "Dahomey", "Dahome"], modern: ["Benin", "Benín", "Benin"], kind: "country", d: "hard" },
  { old: ["Bechuanaland", "Bechuanalandia", "Betschuanaland"], modern: ["Botswana", "Botsuana", "Botswana"], kind: "country", d: "hard" },
  { old: ["Nyasaland", "Nyasalandia", "Njassaland"], modern: ["Malawi", "Malaui", "Malawi"], kind: "country", d: "hard" },
  { old: ["Basutoland", "Basutolandia", "Basutoland"], modern: ["Lesotho", "Lesoto", "Lesotho"], kind: "country", d: "hard" },
  { old: ["Swaziland", "Suazilandia", "Swasiland"], modern: ["Eswatini", "Esuatini", "Eswatini"], kind: "country", d: "medium" },
  { old: ["Kampuchea", "Kampuchea", "Kampuchea"], modern: ["Cambodia", "Camboya", "Kambodscha"], kind: "country", d: "hard" },
  { old: ["East Pakistan", "Pakistán Oriental", "Ostpakistan"], modern: ["Bangladesh", "Bangladés", "Bangladesch"], kind: "country", d: "medium" },
  { old: ["Dutch East Indies", "Indias Orientales Neerlandesas", "Niederländisch-Indien"], modern: ["Indonesia", "Indonesia", "Indonesien"], kind: "country", d: "medium" },
  { old: ["British Honduras", "Honduras Británica", "Britisch-Honduras"], modern: ["Belize", "Belice", "Belize"], kind: "country", d: "hard" },
  { old: ["Dutch Guiana", "Guayana Neerlandesa", "Niederländisch-Guayana"], modern: ["Suriname", "Surinam", "Suriname"], kind: "country", d: "hard" },
  { old: ["British Guiana", "Guayana Británica", "Britisch-Guayana"], modern: ["Guyana", "Guyana", "Guyana"], kind: "country", d: "hard" },
  { old: ["Constantinople", "Constantinopla", "Konstantinopel"], modern: ["Istanbul", "Estambul", "Istanbul"], kind: "city", d: "easy" },
  { old: ["Byzantium", "Bizancio", "Byzanz"], modern: ["Istanbul", "Estambul", "Istanbul"], kind: "city", d: "medium" },
  { old: ["Edo", "Edo", "Edo"], modern: ["Tokyo", "Tokio", "Tokio"], kind: "city", d: "medium" },
  { old: ["New Amsterdam", "Nueva Ámsterdam", "Nieuw Amsterdam"], modern: ["New York", "Nueva York", "New York"], kind: "city", d: "medium" },
  { old: ["Leningrad", "Leningrado", "Leningrad"], modern: ["Saint Petersburg", "San Petersburgo", "Sankt Petersburg"], kind: "city", d: "easy" },
  { old: ["Petrograd", "Petrogrado", "Petrograd"], modern: ["Saint Petersburg", "San Petersburgo", "Sankt Petersburg"], kind: "city", d: "medium" },
  { old: ["Stalingrad", "Stalingrado", "Stalingrad"], modern: ["Volgograd", "Volgogrado", "Wolgograd"], kind: "city", d: "medium" },
  { old: ["Madras", "Madrás", "Madras"], modern: ["Chennai", "Chennai", "Chennai"], kind: "city", d: "hard" },
  { old: ["Saigon", "Saigón", "Saigon"], modern: ["Ho Chi Minh City", "Ciudad Ho Chi Minh", "Ho-Chi-Minh-Stadt"], kind: "city", d: "medium" },
  { old: ["Batavia", "Batavia", "Batavia"], modern: ["Jakarta", "Yakarta", "Jakarta"], kind: "city", d: "hard" },
  { old: ["Christiania", "Christiania", "Christiania"], modern: ["Oslo", "Oslo", "Oslo"], kind: "city", d: "hard" },
  { old: ["Lutetia", "Lutecia", "Lutetia"], modern: ["Paris", "París", "Paris"], kind: "city", d: "medium" },
  { old: ["Londinium", "Londinium", "Londinium"], modern: ["London", "Londres", "London"], kind: "city", d: "easy" },
  { old: ["Eboracum", "Eboracum", "Eboracum"], modern: ["York", "York", "York"], kind: "city", d: "hard" },
  { old: ["Mediolanum", "Mediolanum", "Mediolanum"], modern: ["Milan", "Milán", "Mailand"], kind: "city", d: "hard" },
  { old: ["Hispalis", "Hispalis", "Hispalis"], modern: ["Seville", "Sevilla", "Sevilla"], kind: "city", d: "hard" },
  { old: ["Olisipo", "Olisipo", "Olisipo"], modern: ["Lisbon", "Lisboa", "Lissabon"], kind: "city", d: "hard" },
  { old: ["Salisbury", "Salisbury", "Salisbury"], modern: ["Harare", "Harare", "Harare"], kind: "city", d: "hard" },
  { old: ["Léopoldville", "Leopoldville", "Léopoldville"], modern: ["Kinshasa", "Kinsasa", "Kinshasa"], kind: "city", d: "hard" },
  { old: ["Königsberg", "Königsberg", "Königsberg"], modern: ["Kaliningrad", "Kaliningrado", "Kaliningrad"], kind: "city", d: "medium" },
  { old: ["Ciudad Trujillo", "Ciudad Trujillo", "Ciudad Trujillo"], modern: ["Santo Domingo", "Santo Domingo", "Santo Domingo"], kind: "city", d: "hard" },
];

/** Currency used before the euro: [country id, option label, en text, es with article, de accusative with article] */
export const PRE_EURO: [string, L, string, string, string][] = [
  ["germany", ["Deutsche Mark", "Marco alemán", "D-Mark"], "the Deutsche Mark", "el marco alemán", "die D-Mark"],
  ["france", ["Franc", "Franco", "Franc"], "the franc", "el franco", "den Franc"],
  ["belgium", ["Franc", "Franco", "Franc"], "the franc", "el franco", "den Franc"],
  ["italy", ["Lira", "Lira", "Lira"], "the lira", "la lira", "die Lira"],
  ["malta", ["Lira", "Lira", "Lira"], "the lira", "la lira", "die Lira"],
  ["spain", ["Peseta", "Peseta", "Peseta"], "the peseta", "la peseta", "die Peseta"],
  ["portugal", ["Escudo", "Escudo", "Escudo"], "the escudo", "el escudo", "den Escudo"],
  ["greece", ["Drachma", "Dracma", "Drachme"], "the drachma", "la dracma", "die Drachme"],
  ["netherlands", ["Guilder", "Florín", "Gulden"], "the guilder", "el florín", "den Gulden"],
  ["austria", ["Schilling", "Chelín", "Schilling"], "the schilling", "el chelín", "den Schilling"],
  ["finland", ["Markka", "Marco finlandés", "Finnmark"], "the markka", "el marco finlandés", "die Finnmark"],
  ["slovenia", ["Tolar", "Tólar", "Tolar"], "the tolar", "el tólar", "den Tolar"],
  ["latvia", ["Lats", "Lats", "Lats"], "the lats", "el lats", "den Lats"],
  ["lithuania", ["Litas", "Litas", "Litas"], "the litas", "el litas", "den Litas"],
  ["croatia", ["Kuna", "Kuna", "Kuna"], "the kuna", "la kuna", "die Kuna"],
];

/** Independence: [country id, from key (country id or PLACES key), keys that must never be a wrong option] */
export const INDEPENDENCE: [string, string, string[]?][] = [
  ["brazil", "portugal"], ["mexico", "spain"], ["argentina", "spain"], ["chile", "spain"], ["peru", "spain"], ["colombia", "spain"],
  ["venezuela", "spain"], ["bolivia", "spain"], ["paraguay", "spain"], ["cuba", "spain", ["usa"]], ["netherlands", "spain"],
  ["usa", "uk"], ["india", "uk"], ["pakistan", "uk"], ["kenya", "uk"], ["ghana", "uk"], ["nigeria", "uk"], ["jamaica", "uk"],
  ["malaysia", "uk"], ["sri_lanka", "uk"], ["myanmar", "uk"], ["uganda", "uk"], ["ireland", "uk"], ["qatar", "uk"], ["jordan", "uk"],
  ["botswana", "uk"], ["fiji", "uk"], ["guyana", "uk"],
  ["vietnam", "france"], ["algeria", "france"], ["senegal", "france"], ["mali", "france"], ["madagascar", "france"], ["cambodia", "france"],
  ["laos", "france"], ["haiti", "france"], ["lebanon", "france"], ["syria", "france"],
  ["indonesia", "netherlands"], ["angola", "portugal"], ["mozambique", "portugal"], ["dr_congo", "belgium"], ["rwanda", "belgium"],
  ["finland", "russia", ["ussr", "sweden"]], ["norway", "sweden", ["denmark"]], ["belgium", "netherlands", ["spain", "austria"]], ["greece", "ottoman"],
  ["ukraine", "ussr", ["russia"]], ["belarus", "ussr", ["russia"]], ["kazakhstan", "ussr", ["russia"]], ["uzbekistan", "ussr", ["russia"]],
  ["bangladesh", "pakistan", ["uk"]], ["namibia", "south_africa", ["germany"]], ["iceland", "denmark", ["norway"]], ["png", "australia", ["uk", "germany"]],
];
/** Plausible "colonial power" wrong answers for independence questions. */
export const POWERS = ["uk", "france", "spain", "portugal", "netherlands", "belgium", "italy", "germany", "russia", "ottoman", "sweden", "denmark"];

/** Wars. label = option; en/es = in a sentence; deNom/deAcc/deZu = German cases. */
export const WARS: Record<string, { label: L; en: string; es: string; esPl?: boolean; deNom: string; deAcc: string; deZu: string; dePl?: boolean; span?: [number, number]; years?: number }> = {
  ww1: { label: ["World War I", "Primera Guerra Mundial", "Erster Weltkrieg"], en: "World War I", es: "la Primera Guerra Mundial", deNom: "der Erste Weltkrieg", deAcc: "den Ersten Weltkrieg", deZu: "zum Ersten Weltkrieg", span: [1914, 1918], years: 4.3 },
  ww2: { label: ["World War II", "Segunda Guerra Mundial", "Zweiter Weltkrieg"], en: "World War II", es: "la Segunda Guerra Mundial", deNom: "der Zweite Weltkrieg", deAcc: "den Zweiten Weltkrieg", deZu: "zum Zweiten Weltkrieg", span: [1939, 1945], years: 6 },
  napoleonic: { label: ["Napoleonic Wars", "Guerras napoleónicas", "Napoleonische Kriege"], en: "the Napoleonic Wars", es: "las guerras napoleónicas", esPl: true, deNom: "die Napoleonischen Kriege", deAcc: "die Napoleonischen Kriege", deZu: "zu den Napoleonischen Kriegen", dePl: true, span: [1803, 1815], years: 12 },
  uscivil: { label: ["American Civil War", "Guerra de Secesión", "Amerikanischer Bürgerkrieg"], en: "the American Civil War", es: "la guerra de Secesión", deNom: "der Amerikanische Bürgerkrieg", deAcc: "den Amerikanischen Bürgerkrieg", deZu: "zum Amerikanischen Bürgerkrieg", span: [1861, 1865], years: 4 },
  hundred: { label: ["Hundred Years' War", "Guerra de los Cien Años", "Hundertjähriger Krieg"], en: "the Hundred Years' War", es: "la guerra de los Cien Años", deNom: "der Hundertjährige Krieg", deAcc: "den Hundertjährigen Krieg", deZu: "zum Hundertjährigen Krieg", span: [1337, 1453], years: 116 },
  thirty: { label: ["Thirty Years' War", "Guerra de los Treinta Años", "Dreißigjähriger Krieg"], en: "the Thirty Years' War", es: "la guerra de los Treinta Años", deNom: "der Dreißigjährige Krieg", deAcc: "den Dreißigjährigen Krieg", deZu: "zum Dreißigjährigen Krieg", span: [1618, 1648], years: 30 },
  seven: { label: ["Seven Years' War", "Guerra de los Siete Años", "Siebenjähriger Krieg"], en: "the Seven Years' War", es: "la guerra de los Siete Años", deNom: "der Siebenjährige Krieg", deAcc: "den Siebenjährigen Krieg", deZu: "zum Siebenjährigen Krieg", span: [1756, 1763], years: 7 },
  amrev: { label: ["American Revolutionary War", "Guerra de Independencia de EE. UU.", "Amerikanischer Unabhängigkeitskrieg"], en: "the American Revolutionary War", es: "la guerra de Independencia de Estados Unidos", deNom: "der Amerikanische Unabhängigkeitskrieg", deAcc: "den Amerikanischen Unabhängigkeitskrieg", deZu: "zum Amerikanischen Unabhängigkeitskrieg", span: [1775, 1783], years: 8.4 },
  punic: { label: ["Punic Wars", "Guerras púnicas", "Punische Kriege"], en: "the Punic Wars", es: "las guerras púnicas", esPl: true, deNom: "die Punischen Kriege", deAcc: "die Punischen Kriege", deZu: "zu den Punischen Kriegen", dePl: true },
  persian: { label: ["Greco-Persian Wars", "Guerras médicas", "Perserkriege"], en: "the Greco-Persian Wars", es: "las guerras médicas", esPl: true, deNom: "die Perserkriege", deAcc: "die Perserkriege", deZu: "zu den Perserkriegen", dePl: true },
  roses: { label: ["Wars of the Roses", "Guerra de las Dos Rosas", "Rosenkriege"], en: "the Wars of the Roses", es: "la guerra de las Dos Rosas", deNom: "die Rosenkriege", deAcc: "die Rosenkriege", deZu: "zu den Rosenkriegen", dePl: true },
  crimean: { label: ["Crimean War", "Guerra de Crimea", "Krimkrieg"], en: "the Crimean War", es: "la guerra de Crimea", deNom: "der Krimkrieg", deAcc: "den Krimkrieg", deZu: "zum Krimkrieg", span: [1853, 1856], years: 2.4 },
  spcivil: { label: ["Spanish Civil War", "Guerra civil española", "Spanischer Bürgerkrieg"], en: "the Spanish Civil War", es: "la guerra civil española", deNom: "der Spanische Bürgerkrieg", deAcc: "den Spanischen Bürgerkrieg", deZu: "zum Spanischen Bürgerkrieg", span: [1936, 1939], years: 2.7 },
  korean: { label: ["Korean War", "Guerra de Corea", "Koreakrieg"], en: "the Korean War", es: "la guerra de Corea", deNom: "der Koreakrieg", deAcc: "den Koreakrieg", deZu: "zum Koreakrieg", span: [1950, 1953], years: 3.1 },
  vietnam: { label: ["Vietnam War", "Guerra de Vietnam", "Vietnamkrieg"], en: "the Vietnam War", es: "la guerra de Vietnam", deNom: "der Vietnamkrieg", deAcc: "den Vietnamkrieg", deZu: "zum Vietnamkrieg" },
  war1812: { label: ["War of 1812", "Guerra anglo-estadounidense de 1812", "Britisch-Amerikanischer Krieg"], en: "the War of 1812", es: "la guerra anglo-estadounidense de 1812", deNom: "der Britisch-Amerikanische Krieg", deAcc: "den Britisch-Amerikanischen Krieg", deZu: "zum Britisch-Amerikanischen Krieg", years: 2.7 },
  mexam: { label: ["Mexican–American War", "Guerra entre México y Estados Unidos", "Mexikanisch-Amerikanischer Krieg"], en: "the Mexican–American War", es: "la guerra entre México y Estados Unidos", deNom: "der Mexikanisch-Amerikanische Krieg", deAcc: "den Mexikanisch-Amerikanischen Krieg", deZu: "zum Mexikanisch-Amerikanischen Krieg", span: [1846, 1848], years: 1.75 },
  spsucc: { label: ["War of the Spanish Succession", "Guerra de Sucesión Española", "Spanischer Erbfolgekrieg"], en: "the War of the Spanish Succession", es: "la guerra de Sucesión Española", deNom: "der Spanische Erbfolgekrieg", deAcc: "den Spanischen Erbfolgekrieg", deZu: "zum Spanischen Erbfolgekrieg", span: [1701, 1714], years: 13 },
  francoprussian: { label: ["Franco-Prussian War", "Guerra franco-prusiana", "Deutsch-Französischer Krieg"], en: "the Franco-Prussian War", es: "la guerra franco-prusiana", deNom: "der Deutsch-Französische Krieg", deAcc: "den Deutsch-Französischen Krieg", deZu: "zum Deutsch-Französischen Krieg", span: [1870, 1871], years: 0.5 },
  russojap: { label: ["Russo-Japanese War", "Guerra ruso-japonesa", "Russisch-Japanischer Krieg"], en: "the Russo-Japanese War", es: "la guerra ruso-japonesa", deNom: "der Russisch-Japanische Krieg", deAcc: "den Russisch-Japanischen Krieg", deZu: "zum Russisch-Japanischen Krieg", span: [1904, 1905], years: 1.6 },
  opium: { label: ["First Opium War", "Primera guerra del Opio", "Erster Opiumkrieg"], en: "the First Opium War", es: "la primera guerra del Opio", deNom: "der Erste Opiumkrieg", deAcc: "den Ersten Opiumkrieg", deZu: "zum Ersten Opiumkrieg", span: [1839, 1842], years: 3 },
  bosnian: { label: ["Bosnian War", "Guerra de Bosnia", "Bosnienkrieg"], en: "the Bosnian War", es: "la guerra de Bosnia", deNom: "der Bosnienkrieg", deAcc: "den Bosnienkrieg", deZu: "zum Bosnienkrieg", span: [1992, 1995], years: 3.7 },
  greatnorthern: { label: ["Great Northern War", "Gran Guerra del Norte", "Großer Nordischer Krieg"], en: "the Great Northern War", es: "la Gran Guerra del Norte", deNom: "der Große Nordische Krieg", deAcc: "den Großen Nordischen Krieg", deZu: "zum Großen Nordischen Krieg", span: [1700, 1721], years: 21 },
  sinojap: { label: ["First Sino-Japanese War", "Primera guerra sino-japonesa", "Erster Japanisch-Chinesischer Krieg"], en: "the First Sino-Japanese War", es: "la primera guerra sino-japonesa", deNom: "der Erste Japanisch-Chinesische Krieg", deAcc: "den Ersten Japanisch-Chinesischen Krieg", deZu: "zum Ersten Japanisch-Chinesischen Krieg", span: [1894, 1895], years: 0.7 },
  boer: { label: ["Second Boer War", "Segunda guerra bóer", "Zweiter Burenkrieg"], en: "the Second Boer War", es: "la segunda guerra bóer", deNom: "der Zweite Burenkrieg", deAcc: "den Zweiten Burenkrieg", deZu: "zum Zweiten Burenkrieg", span: [1899, 1902], years: 2.6 },
  spanam: { label: ["Spanish–American War", "Guerra hispano-estadounidense", "Spanisch-Amerikanischer Krieg"], en: "the Spanish–American War", es: "la guerra hispano-estadounidense", deNom: "der Spanisch-Amerikanische Krieg", deAcc: "den Spanisch-Amerikanischen Krieg", deZu: "zum Spanisch-Amerikanischen Krieg" },
  iraniraq: { label: ["Iran–Iraq War", "Guerra Irán-Irak", "Iran-Irak-Krieg"], en: "the Iran–Iraq War", es: "la guerra Irán-Irak", deNom: "der Iran-Irak-Krieg", deAcc: "den Iran-Irak-Krieg", deZu: "zum Iran-Irak-Krieg", span: [1980, 1988], years: 7.9 },
};

/** Battles: [en, es, de (all with article, nominative), war key, difficulty] */
export const BATTLES: [string, string, string, string, D][] = [
  ["the Battle of the Somme", "la batalla del Somme", "die Schlacht an der Somme", "ww1", "easy"],
  ["the Battle of Verdun", "la batalla de Verdún", "die Schlacht um Verdun", "ww1", "easy"],
  ["the Gallipoli campaign", "la campaña de Galípoli", "die Schlacht von Gallipoli", "ww1", "medium"],
  ["the Battle of Jutland", "la batalla de Jutlandia", "die Skagerrakschlacht", "ww1", "hard"],
  ["the First Battle of the Marne", "la primera batalla del Marne", "die Erste Marneschlacht", "ww1", "medium"],
  ["the Battle of Passchendaele", "la batalla de Passchendaele", "die Schlacht von Passchendaele", "ww1", "medium"],
  ["the Battle of Stalingrad", "la batalla de Stalingrado", "die Schlacht von Stalingrad", "ww2", "easy"],
  ["the Battle of Midway", "la batalla de Midway", "die Schlacht um Midway", "ww2", "medium"],
  ["the Normandy landings", "el desembarco de Normandía", "die Landung in der Normandie", "ww2", "easy"],
  ["the Battle of the Bulge", "la batalla de las Ardenas", "die Ardennenoffensive", "ww2", "medium"],
  ["the Second Battle of El Alamein", "la segunda batalla de El Alamein", "die Zweite Schlacht von El Alamein", "ww2", "medium"],
  ["the Battle of Britain", "la batalla de Inglaterra", "die Luftschlacht um England", "ww2", "easy"],
  ["the Battle of Iwo Jima", "la batalla de Iwo Jima", "die Schlacht um Iwojima", "ww2", "medium"],
  ["the attack on Pearl Harbor", "el ataque a Pearl Harbor", "der Angriff auf Pearl Harbor", "ww2", "easy"],
  ["the Battle of Kursk", "la batalla de Kursk", "die Schlacht am Kursker Bogen", "ww2", "medium"],
  ["the Battle of Monte Cassino", "la batalla de Montecassino", "die Schlacht um Monte Cassino", "ww2", "medium"],
  ["the Battle of Austerlitz", "la batalla de Austerlitz", "die Schlacht bei Austerlitz", "napoleonic", "medium"],
  ["the Battle of Waterloo", "la batalla de Waterloo", "die Schlacht bei Waterloo", "napoleonic", "easy"],
  ["the Battle of Trafalgar", "la batalla de Trafalgar", "die Seeschlacht von Trafalgar", "napoleonic", "easy"],
  ["the Battle of Leipzig", "la batalla de Leipzig", "die Völkerschlacht bei Leipzig", "napoleonic", "medium"],
  ["the Battle of Borodino", "la batalla de Borodinó", "die Schlacht von Borodino", "napoleonic", "medium"],
  ["the Battle of Jena", "la batalla de Jena", "die Schlacht bei Jena und Auerstedt", "napoleonic", "medium"],
  ["the Battle of Bailén", "la batalla de Bailén", "die Schlacht bei Bailén", "napoleonic", "hard"],
  ["the Battle of Gettysburg", "la batalla de Gettysburg", "die Schlacht von Gettysburg", "uscivil", "easy"],
  ["the Battle of Antietam", "la batalla de Antietam", "die Schlacht am Antietam", "uscivil", "medium"],
  ["the First Battle of Bull Run", "la primera batalla de Bull Run", "die Erste Schlacht am Bull Run", "uscivil", "medium"],
  ["the Siege of Vicksburg", "el sitio de Vicksburg", "die Belagerung von Vicksburg", "uscivil", "medium"],
  ["the Battle of Crécy", "la batalla de Crécy", "die Schlacht von Crécy", "hundred", "medium"],
  ["the Battle of Agincourt", "la batalla de Azincourt", "die Schlacht von Azincourt", "hundred", "medium"],
  ["the Siege of Orléans", "el sitio de Orleans", "die Belagerung von Orléans", "hundred", "medium"],
  ["the Battle of Saratoga", "la batalla de Saratoga", "die Schlacht von Saratoga", "amrev", "medium"],
  ["the Siege of Yorktown (1781)", "el sitio de Yorktown (1781)", "die Belagerung von Yorktown (1781)", "amrev", "medium"],
  ["the Battle of Bunker Hill", "la batalla de Bunker Hill", "die Schlacht von Bunker Hill", "amrev", "medium"],
  ["the Battle of Cannae", "la batalla de Cannas", "die Schlacht von Cannae", "punic", "medium"],
  ["the Battle of Zama", "la batalla de Zama", "die Schlacht von Zama", "punic", "medium"],
  ["the Battle of Lake Trasimene", "la batalla del lago Trasimeno", "die Schlacht am Trasimenischen See", "punic", "hard"],
  ["the Battle of Thermopylae", "la batalla de las Termópilas", "die Schlacht bei den Thermopylen", "persian", "medium"],
  ["the Battle of Salamis", "la batalla de Salamina", "die Seeschlacht von Salamis", "persian", "medium"],
  ["the Battle of Plataea", "la batalla de Platea", "die Schlacht von Platää", "persian", "hard"],
  ["the Battle of Marathon", "la batalla de Maratón", "die Schlacht bei Marathon", "persian", "easy"],
  ["the Battle of Bosworth Field", "la batalla de Bosworth", "die Schlacht von Bosworth", "roses", "medium"],
  ["the Battle of Towton", "la batalla de Towton", "die Schlacht von Towton", "roses", "hard"],
  ["the Battle of Tewkesbury", "la batalla de Tewkesbury", "die Schlacht von Tewkesbury", "roses", "hard"],
  ["the Battle of Balaclava", "la batalla de Balaclava", "die Schlacht bei Balaklawa", "crimean", "medium"],
  ["the Battle of Inkerman", "la batalla de Inkerman", "die Schlacht von Inkerman", "crimean", "hard"],
  ["the Battle of the Alma", "la batalla del Almá", "die Schlacht an der Alma", "crimean", "hard"],
  ["the Battle of the Ebro", "la batalla del Ebro", "die Ebroschlacht", "spcivil", "medium"],
  ["the Battle of Jarama", "la batalla del Jarama", "die Schlacht am Jarama", "spcivil", "medium"],
  ["the Battle of Teruel", "la batalla de Teruel", "die Schlacht von Teruel", "spcivil", "medium"],
  ["the Battle of Brunete", "la batalla de Brunete", "die Schlacht von Brunete", "spcivil", "hard"],
  ["the Battle of Inchon", "la batalla de Inchon", "die Schlacht von Incheon", "korean", "medium"],
  ["the Battle of Chosin Reservoir", "la batalla del embalse de Chosin", "die Schlacht am Chosin-Stausee", "korean", "hard"],
  ["the Tet Offensive", "la ofensiva del Tet", "die Tet-Offensive", "vietnam", "medium"],
  ["the Battle of Khe Sanh", "la batalla de Khe Sanh", "die Schlacht um Khe Sanh", "vietnam", "hard"],
  ["the Battle of Ia Drang", "la batalla del valle de Ia Drang", "die Schlacht im Ia-Drang-Tal", "vietnam", "hard"],
  ["the Battle of White Mountain", "la batalla de la Montaña Blanca", "die Schlacht am Weißen Berg", "thirty", "hard"],
  ["the Battle of Breitenfeld (1631)", "la batalla de Breitenfeld (1631)", "die Schlacht bei Breitenfeld (1631)", "thirty", "hard"],
  ["the Battle of Rocroi", "la batalla de Rocroi", "die Schlacht bei Rocroi", "thirty", "hard"],
  ["the Battle of Nördlingen (1634)", "la batalla de Nördlingen (1634)", "die Schlacht bei Nördlingen (1634)", "thirty", "hard"],
  ["the Battle of Rossbach", "la batalla de Rossbach", "die Schlacht bei Roßbach", "seven", "hard"],
  ["the Battle of Leuthen", "la batalla de Leuthen", "die Schlacht bei Leuthen", "seven", "hard"],
  ["the Battle of the Plains of Abraham", "la batalla de las Llanuras de Abraham", "die Schlacht auf der Abraham-Ebene", "seven", "hard"],
];

/** Peace treaties: [label en, es, de (no article), en/es/de with article (nominative), war key, difficulty] */
export const TREATIES: { label: L; text: L; war: string; d: D }[] = [
  { label: ["Treaty of Versailles (1919)", "Tratado de Versalles (1919)", "Vertrag von Versailles (1919)"], text: ["the Treaty of Versailles (1919)", "el Tratado de Versalles (1919)", "der Vertrag von Versailles (1919)"], war: "ww1", d: "easy" },
  { label: ["Treaty of Saint-Germain", "Tratado de Saint-Germain-en-Laye", "Vertrag von Saint-Germain"], text: ["the Treaty of Saint-Germain (1919)", "el Tratado de Saint-Germain-en-Laye (1919)", "der Vertrag von Saint-Germain (1919)"], war: "ww1", d: "hard" },
  { label: ["Treaty of Trianon", "Tratado de Trianón", "Vertrag von Trianon"], text: ["the Treaty of Trianon (1920)", "el Tratado de Trianón (1920)", "der Vertrag von Trianon (1920)"], war: "ww1", d: "hard" },
  { label: ["Treaty of San Francisco (1951)", "Tratado de San Francisco (1951)", "Friedensvertrag von San Francisco (1951)"], text: ["the Treaty of San Francisco (1951)", "el Tratado de San Francisco (1951)", "der Friedensvertrag von San Francisco (1951)"], war: "ww2", d: "hard" },
  { label: ["Peace of Westphalia", "Paz de Westfalia", "Westfälischer Frieden"], text: ["the Peace of Westphalia", "la Paz de Westfalia", "der Westfälische Frieden"], war: "thirty", d: "medium" },
  { label: ["Treaty of Paris (1763)", "Tratado de París (1763)", "Frieden von Paris (1763)"], text: ["the Treaty of Paris of 1763", "el Tratado de París de 1763", "der Frieden von Paris von 1763"], war: "seven", d: "hard" },
  { label: ["Treaty of Paris (1783)", "Tratado de París (1783)", "Frieden von Paris (1783)"], text: ["the Treaty of Paris of 1783", "el Tratado de París de 1783", "der Frieden von Paris von 1783"], war: "amrev", d: "medium" },
  { label: ["Treaty of Paris (1856)", "Tratado de París (1856)", "Pariser Frieden (1856)"], text: ["the Treaty of Paris of 1856", "el Tratado de París de 1856", "der Pariser Frieden von 1856"], war: "crimean", d: "hard" },
  { label: ["Treaty of Paris (1898)", "Tratado de París (1898)", "Vertrag von Paris (1898)"], text: ["the Treaty of Paris of 1898", "el Tratado de París de 1898", "der Vertrag von Paris von 1898"], war: "spanam", d: "hard" },
  { label: ["Treaty of Ghent", "Tratado de Gante", "Frieden von Gent"], text: ["the Treaty of Ghent", "el Tratado de Gante", "der Frieden von Gent"], war: "war1812", d: "hard" },
  { label: ["Treaty of Guadalupe Hidalgo", "Tratado de Guadalupe Hidalgo", "Vertrag von Guadalupe Hidalgo"], text: ["the Treaty of Guadalupe Hidalgo", "el Tratado de Guadalupe Hidalgo", "der Vertrag von Guadalupe Hidalgo"], war: "mexam", d: "medium" },
  { label: ["Treaty of Utrecht", "Tratado de Utrecht", "Frieden von Utrecht"], text: ["the Treaty of Utrecht", "el Tratado de Utrecht", "der Frieden von Utrecht"], war: "spsucc", d: "medium" },
  { label: ["Treaty of Frankfurt (1871)", "Tratado de Fráncfort (1871)", "Frieden von Frankfurt (1871)"], text: ["the Treaty of Frankfurt of 1871", "el Tratado de Fráncfort de 1871", "der Frieden von Frankfurt von 1871"], war: "francoprussian", d: "hard" },
  { label: ["Treaty of Portsmouth", "Tratado de Portsmouth", "Vertrag von Portsmouth"], text: ["the Treaty of Portsmouth (1905)", "el Tratado de Portsmouth (1905)", "der Vertrag von Portsmouth (1905)"], war: "russojap", d: "hard" },
  { label: ["Treaty of Nanking", "Tratado de Nankín", "Vertrag von Nanking"], text: ["the Treaty of Nanking (1842)", "el Tratado de Nankín (1842)", "der Vertrag von Nanking (1842)"], war: "opium", d: "hard" },
  { label: ["Dayton Agreement", "Acuerdos de Dayton", "Dayton-Abkommen"], text: ["the Dayton Agreement", "los Acuerdos de Dayton", "das Dayton-Abkommen"], war: "bosnian", d: "medium" },
  { label: ["Treaty of Nystad", "Tratado de Nystad", "Frieden von Nystad"], text: ["the Treaty of Nystad (1721)", "el Tratado de Nystad (1721)", "der Frieden von Nystad (1721)"], war: "greatnorthern", d: "hard" },
  { label: ["Treaty of Shimonoseki", "Tratado de Shimonoseki", "Vertrag von Shimonoseki"], text: ["the Treaty of Shimonoseki (1895)", "el Tratado de Shimonoseki (1895)", "der Vertrag von Shimonoseki (1895)"], war: "sinojap", d: "hard" },
  { label: ["Treaty of Vereeniging", "Tratado de Vereeniging", "Frieden von Vereeniging"], text: ["the Treaty of Vereeniging (1902)", "el Tratado de Vereeniging (1902)", "der Frieden von Vereeniging (1902)"], war: "boer", d: "hard" },
];

/** Empires: [name en (no article), es (masculine, no article), de nominative, de genitive with article, capital L, difficulty] */
export const EMPIRES: [string, string, string, string, L, D][] = [
  ["Inca Empire", "Imperio inca", "Inkareich", "des Inkareiches", ["Cusco", "Cuzco", "Cusco"], "medium"],
  ["Aztec Empire", "Imperio azteca", "Aztekenreich", "des Aztekenreiches", ["Tenochtitlan", "Tenochtitlan", "Tenochtitlan"], "medium"],
  ["Byzantine Empire", "Imperio bizantino", "Byzantinisches Reich", "des Byzantinischen Reiches", ["Constantinople", "Constantinopla", "Konstantinopel"], "easy"],
  ["Mongol Empire", "Imperio mongol", "Mongolisches Reich", "des Mongolischen Reiches", ["Karakorum", "Karakórum", "Karakorum"], "hard"],
  ["Russian Empire", "Imperio ruso", "Russisches Kaiserreich", "des Russischen Kaiserreiches", ["Saint Petersburg", "San Petersburgo", "Sankt Petersburg"], "medium"],
  ["Hittite Empire", "Imperio hitita", "Hethiterreich", "des Hethiterreiches", ["Hattusa", "Hattusa", "Hattuša"], "hard"],
  ["Abbasid Caliphate", "califato abasí", "Abbasiden-Kalifat", "des Abbasiden-Kalifats", ["Baghdad", "Bagdad", "Bagdad"], "hard"],
  ["Umayyad Caliphate", "califato omeya", "Umayyaden-Kalifat", "des Umayyaden-Kalifats", ["Damascus", "Damasco", "Damaskus"], "hard"],
  ["Khmer Empire", "Imperio jemer", "Khmer-Reich", "des Khmer-Reiches", ["Angkor", "Angkor", "Angkor"], "medium"],
  ["Carolingian Empire", "Imperio carolingio", "Karolingerreich", "des Karolingerreiches", ["Aachen", "Aquisgrán", "Aachen"], "hard"],
  ["Austrian Empire", "Imperio austriaco", "Kaisertum Österreich", "des Kaisertums Österreich", ["Vienna", "Viena", "Wien"], "easy"],
  ["Qin Empire", "Imperio Qin", "Qin-Reich", "des Qin-Reiches", ["Xianyang", "Xianyang", "Xianyang"], "hard"],
  ["Songhai Empire", "Imperio songhai", "Songhai-Reich", "des Songhai-Reiches", ["Gao", "Gao", "Gao"], "hard"],
  ["Kingdom of Prussia", "reino de Prusia", "Königreich Preußen", "des Königreichs Preußen", ["Berlin", "Berlín", "Berlin"], "easy"],
];

/** Dynasties / royal houses: [en, es, de (with article, nominative singular), place key, never-wrong keys, difficulty] */
export const DYNASTIES: [string, string, string, string, string[], D][] = [
  ["the House of Romanov", "la dinastía Romanov", "das Haus Romanow", "russia", [], "easy"],
  ["the House of Tudor", "la dinastía Tudor", "das Haus Tudor", "england", ["uk"], "easy"],
  ["the House of Plantagenet", "la dinastía Plantagenet", "das Haus Plantagenet", "england", ["uk", "france"], "hard"],
  ["the House of Windsor", "la casa de Windsor", "das Haus Windsor", "uk", ["england", "canada", "australia", "new_zealand", "jamaica"], "easy"],
  ["the House of Valois", "la casa de Valois", "das Haus Valois", "france", [], "medium"],
  ["the House of Bourbon", "la casa de Borbón", "das Haus Bourbon", "france", ["spain", "italy", "luxembourg"], "medium"],
  ["the House of Hohenzollern", "la casa de Hohenzollern", "das Haus Hohenzollern", "germany", ["romania"], "medium"],
  ["the House of Savoy", "la casa de Saboya", "das Haus Savoyen", "italy", ["france", "spain"], "medium"],
  ["the House of Orange-Nassau", "la casa de Orange-Nassau", "das Haus Oranien-Nassau", "netherlands", ["uk", "england", "luxembourg"], "medium"],
  ["the House of Braganza", "la casa de Braganza", "das Haus Braganza", "portugal", ["brazil"], "hard"],
  ["the House of Bernadotte", "la casa de Bernadotte", "das Haus Bernadotte", "sweden", ["norway", "france"], "hard"],
  ["the House of Trastámara", "la casa de Trastámara", "das Haus Trastámara", "spain", ["italy"], "hard"],
  ["the Ming dynasty", "la dinastía Ming", "die Ming-Dynastie", "china", [], "easy"],
  ["the Qing dynasty", "la dinastía Qing", "die Qing-Dynastie", "china", ["mongolia"], "medium"],
  ["the Tang dynasty", "la dinastía Tang", "die Tang-Dynastie", "china", [], "medium"],
  ["the Tokugawa shogunate", "el shogunato Tokugawa", "das Tokugawa-Shogunat", "japan", [], "easy"],
  ["the Joseon dynasty", "la dinastía Joseon", "die Joseon-Dynastie", "korea", ["south_korea", "north_korea"], "hard"],
  ["the Mughal dynasty", "la dinastía mogol", "die Mogul-Dynastie", "india", ["pakistan", "bangladesh", "afghanistan"], "medium"],
  ["the Ptolemaic dynasty", "la dinastía ptolemaica", "die Dynastie der Ptolemäer", "egypt", ["greece"], "medium"],
  ["the Pahlavi dynasty", "la dinastía Pahlaví", "die Pahlavi-Dynastie", "iran", [], "hard"],
  ["the Chakri dynasty", "la dinastía Chakri", "die Chakri-Dynastie", "thailand", [], "hard"],
  ["the Nguyễn dynasty", "la dinastía Nguyễn", "die Nguyễn-Dynastie", "vietnam", [], "hard"],
  ["the Jagiellonian dynasty", "la dinastía Jagellón", "die Jagiellonen-Dynastie", "poland", ["lithuania", "hungary", "czechia"], "hard"],
  ["the Medici family", "la familia Médici", "die Familie Medici", "italy", ["france"], "medium"],
  ["the Solomonic dynasty", "la dinastía salomónica", "die Salomonische Dynastie", "ethiopia", [], "hard"],
];
export const DYNASTY_PLACES = ["russia", "england", "uk", "france", "germany", "italy", "netherlands", "portugal", "sweden", "spain", "china", "japan", "korea", "india", "egypt", "iran", "thailand", "vietnam", "poland", "ethiopia", "austria", "denmark", "greece", "turkey"];

/** Nicknames: [nickname L, person label L, person in a sentence L (en object, es after "a", de nominative)?, difficulty] */
export const NICKNAMES: [L, L, L | null, D][] = [
  [["the Iron Lady", "la Dama de Hierro", "die Eiserne Lady"], ["Margaret Thatcher", "Margaret Thatcher", "Margaret Thatcher"], null, "easy"],
  [["the Sun King", "el Rey Sol", "der Sonnenkönig"], ["Louis XIV", "Luis XIV", "Ludwig XIV."], null, "easy"],
  [["the Lionheart", "Corazón de León", "Löwenherz"], ["Richard I of England", "Ricardo I de Inglaterra", "Richard I. von England"], null, "medium"],
  [["the Iron Chancellor", "el Canciller de Hierro", "der Eiserne Kanzler"], ["Otto von Bismarck", "Otto von Bismarck", "Otto von Bismarck"], null, "easy"],
  [["the Maid of Orléans", "la Doncella de Orleans", "die Jungfrau von Orléans"], ["Joan of Arc", "Juana de Arco", "Jeanne d'Arc"], null, "easy"],
  [["the Virgin Queen", "la Reina Virgen", "die jungfräuliche Königin"], ["Elizabeth I of England", "Isabel I de Inglaterra", "Elisabeth I. von England"], null, "medium"],
  [["Il Duce", "Il Duce", "Il Duce"], ["Benito Mussolini", "Benito Mussolini", "Benito Mussolini"], null, "easy"],
  [["the Desert Fox", "el Zorro del Desierto", "der Wüstenfuchs"], ["Erwin Rommel", "Erwin Rommel", "Erwin Rommel"], null, "medium"],
  [["Bloody Mary", "María la Sanguinaria", "die blutige Maria"], ["Mary I of England", "María I de Inglaterra", "Maria I. von England"], null, "medium"],
  [["the Red Baron", "el Barón Rojo", "der Rote Baron"], ["Manfred von Richthofen", "Manfred von Richthofen", "Manfred von Richthofen"], null, "medium"],
  [["the Liberator", "el Libertador", "der Befreier (El Libertador)"], ["Simón Bolívar", "Simón Bolívar", "Simón Bolívar"], null, "medium"],
  [["Honest Abe", "el Honesto Abe", "der ehrliche Abe"], ["Abraham Lincoln", "Abraham Lincoln", "Abraham Lincoln"], null, "medium"],
  [["the Iron Duke", "el Duque de Hierro", "der Eiserne Herzog"], ["Duke of Wellington", "Duque de Wellington", "Herzog von Wellington"], ["the Duke of Wellington", "al duque de Wellington", "der Herzog von Wellington"], "hard"],
  [["the Little Corporal", "el Pequeño Cabo", "der kleine Korporal"], ["Napoleon Bonaparte", "Napoleón Bonaparte", "Napoleon Bonaparte"], null, "hard"],
  [["the Scourge of God", "el Azote de Dios", "die Geißel Gottes"], ["Attila the Hun", "Atila", "Attila"], null, "medium"],
  [["the Lady with the Lamp", "la Dama de la Lámpara", "die Lady mit der Lampe"], ["Florence Nightingale", "Florence Nightingale", "Florence Nightingale"], null, "medium"],
  [["Sisi", "Sissi", "Sisi"], ["Empress Elisabeth of Austria", "Emperatriz Isabel de Austria", "Kaiserin Elisabeth von Österreich"], ["Empress Elisabeth of Austria", "a la emperatriz Isabel de Austria", "Kaiserin Elisabeth von Österreich"], "easy"],
  [["Old Fritz", "el Viejo Fritz", "der Alte Fritz"], ["Frederick the Great", "Federico el Grande", "Friedrich der Große"], null, "hard"],
];

/** Explorers / pioneers: [person L, feat L (past-tense verb phrase, capitalised), clash group?, difficulty] */
export const FEATS: [L, L, string, D][] = [
  [["Roald Amundsen", "Roald Amundsen", "Roald Amundsen"], ["Reached the South Pole first", "Fue el primero en llegar al Polo Sur", "Erreichte als Erster den Südpol"], "", "easy"],
  [["Edmund Hillary", "Edmund Hillary", "Edmund Hillary"], ["Made the first ascent of Mount Everest, with Tenzing Norgay", "Coronó por primera vez el Everest, junto a Tenzing Norgay", "Bestieg mit Tenzing Norgay als Erster den Mount Everest"], "", "easy"],
  [["Ferdinand Magellan", "Fernando de Magallanes", "Ferdinand Magellan"], ["Led the first expedition to sail around the world", "Dirigió la primera expedición que dio la vuelta al mundo", "Leitete die erste Expedition, die die Welt umsegelte"], "circ", "easy"],
  [["Juan Sebastián Elcano", "Juan Sebastián Elcano", "Juan Sebastián Elcano"], ["Completed the first voyage around the world", "Completó la primera vuelta al mundo", "Vollendete die erste Weltumsegelung"], "circ", "medium"],
  [["Vasco da Gama", "Vasco da Gama", "Vasco da Gama"], ["Opened the sea route from Europe to India", "Abrió la ruta marítima de Europa a la India", "Fand den Seeweg von Europa nach Indien"], "", "medium"],
  [["Bartolomeu Dias", "Bartolomé Díaz", "Bartolomeu Dias"], ["Was the first European to sail around the Cape of Good Hope", "Fue el primer europeo en doblar el cabo de Buena Esperanza", "Umsegelte als erster Europäer das Kap der Guten Hoffnung"], "", "hard"],
  [["Christopher Columbus", "Cristóbal Colón", "Christoph Kolumbus"], ["Reached the Americas in 1492", "Llegó a América en 1492", "Erreichte 1492 Amerika"], "", "easy"],
  [["Leif Erikson", "Leif Erikson", "Leif Eriksson"], ["Reached North America around the year 1000", "Llegó a Norteamérica hacia el año 1000", "Erreichte um das Jahr 1000 Nordamerika"], "", "medium"],
  [["James Cook", "James Cook", "James Cook"], ["Mapped the east coast of Australia", "Cartografió la costa este de Australia", "Kartierte die Ostküste Australiens"], "", "medium"],
  [["Abel Tasman", "Abel Tasman", "Abel Tasman"], ["Was the first European to reach New Zealand", "Fue el primer europeo en llegar a Nueva Zelanda", "Erreichte als erster Europäer Neuseeland"], "", "hard"],
  [["Vasco Núñez de Balboa", "Vasco Núñez de Balboa", "Vasco Núñez de Balboa"], ["Was the first European to see the Pacific from the Americas", "Fue el primer europeo en ver el océano Pacífico desde América", "Sah als erster Europäer von Amerika aus den Pazifik"], "", "hard"],
  [["Francisco de Orellana", "Francisco de Orellana", "Francisco de Orellana"], ["Was the first European to travel down the Amazon", "Fue el primer europeo en recorrer el Amazonas", "Befuhr als erster Europäer den Amazonas"], "", "hard"],
  [["David Livingstone", "David Livingstone", "David Livingstone"], ["Was the first European to see the Victoria Falls", "Fue el primer europeo en ver las cataratas Victoria", "Sah als erster Europäer die Victoriafälle"], "", "medium"],
  [["Hernán Cortés", "Hernán Cortés", "Hernán Cortés"], ["Conquered the Aztec Empire", "Conquistó el Imperio azteca", "Eroberte das Aztekenreich"], "", "easy"],
  [["Francisco Pizarro", "Francisco Pizarro", "Francisco Pizarro"], ["Conquered the Inca Empire", "Conquistó el Imperio inca", "Eroberte das Inkareich"], "", "easy"],
  [["Marco Polo", "Marco Polo", "Marco Polo"], ["Travelled to the court of Kublai Khan", "Viajó a la corte de Kublai Kan", "Reiste an den Hof von Kublai Khan"], "", "easy"],
  [["Neil Armstrong", "Neil Armstrong", "Neil Armstrong"], ["Was the first person to walk on the Moon", "Fue la primera persona en pisar la Luna", "Betrat als erster Mensch den Mond"], "", "easy"],
  [["Yuri Gagarin", "Yuri Gagarin", "Juri Gagarin"], ["Was the first human in space", "Fue el primer ser humano en el espacio", "Flog als erster Mensch ins All"], "", "easy"],
  [["Valentina Tereshkova", "Valentina Tereshkova", "Valentina Tereschkowa"], ["Was the first woman in space", "Fue la primera mujer en el espacio", "Flog als erste Frau ins All"], "", "medium"],
  [["Charles Lindbergh", "Charles Lindbergh", "Charles Lindbergh"], ["Made the first solo non-stop flight across the Atlantic", "Hizo el primer vuelo en solitario y sin escalas sobre el Atlántico", "Überflog als Erster allein und nonstop den Atlantik"], "atl", "medium"],
  [["Amelia Earhart", "Amelia Earhart", "Amelia Earhart"], ["Was the first woman to fly solo across the Atlantic", "Fue la primera mujer en cruzar sola el Atlántico en avión", "Überflog als erste Frau allein den Atlantik"], "atl", "medium"],
  [["Ernest Shackleton", "Ernest Shackleton", "Ernest Shackleton"], ["Led the Endurance expedition to Antarctica", "Dirigió la expedición del Endurance a la Antártida", "Leitete die Endurance-Expedition in die Antarktis"], "", "medium"],
  [["Zheng He", "Zheng He", "Zheng He"], ["Led huge Chinese treasure fleets across the Indian Ocean", "Dirigió enormes flotas chinas por el océano Índico", "Führte riesige chinesische Flotten über den Indischen Ozean"], "", "hard"],
];

/** Famous ships: [name, feat L (past-tense verb phrase), difficulty] */
export const SHIPS: [L, L, D][] = [
  [["Titanic", "Titanic", "Titanic"], ["Sank in 1912 after hitting an iceberg", "Se hundió en 1912 tras chocar con un iceberg", "Sank 1912 nach der Kollision mit einem Eisberg"], "easy"],
  [["Mayflower", "Mayflower", "Mayflower"], ["Carried the Pilgrims to North America in 1620", "Llevó a los Padres Peregrinos a Norteamérica en 1620", "Brachte 1620 die Pilgerväter nach Nordamerika"], "easy"],
  [["Santa María", "Santa María", "Santa María"], ["Was Columbus's flagship on his first voyage in 1492", "Fue la nave capitana de Colón en su primer viaje de 1492", "War 1492 das Flaggschiff von Kolumbus auf seiner ersten Reise"], "easy"],
  [["HMS Beagle", "HMS Beagle", "HMS Beagle"], ["Took Charles Darwin on his voyage around the world", "Llevó a Charles Darwin en su viaje alrededor del mundo", "Brachte Charles Darwin auf seine Reise um die Welt"], "medium"],
  [["HMS Bounty", "HMS Bounty", "HMS Bounty"], ["Was the scene of a famous mutiny in 1789", "Fue escenario de un famoso motín en 1789", "War 1789 Schauplatz einer berühmten Meuterei"], "medium"],
  [["Victoria", "Nao Victoria", "Victoria"], ["Was the first ship to sail around the world (1519–1522)", "Fue el primer barco en dar la vuelta al mundo (1519-1522)", "Umsegelte als erstes Schiff die Welt (1519–1522)"], "hard"],
  [["Golden Hind", "Golden Hind", "Golden Hind"], ["Carried Francis Drake around the world (1577–1580)", "Llevó a Francis Drake alrededor del mundo (1577-1580)", "Trug Francis Drake um die Welt (1577–1580)"], "hard"],
  [["HMS Victory", "HMS Victory", "HMS Victory"], ["Was Admiral Nelson's flagship at Trafalgar", "Fue el buque insignia del almirante Nelson en Trafalgar", "War Admiral Nelsons Flaggschiff bei Trafalgar"], "medium"],
  [["Endurance", "Endurance", "Endurance"], ["Was crushed by Antarctic ice on Shackleton's expedition", "Quedó aplastado por el hielo antártico en la expedición de Shackleton", "Wurde auf Shackletons Expedition vom antarktischen Eis zerdrückt"], "medium"],
  [["Lusitania", "Lusitania", "Lusitania"], ["Was sunk by a German submarine in 1915", "Fue hundido por un submarino alemán en 1915", "Wurde 1915 von einem deutschen U-Boot versenkt"], "medium"],
  [["Bismarck", "Bismarck", "Bismarck"], ["Was a German battleship sunk in 1941", "Fue un acorazado alemán hundido en 1941", "War ein deutsches Schlachtschiff, das 1941 versenkt wurde"], "medium"],
  [["Vasa", "Vasa", "Vasa"], ["Sank in Stockholm on its maiden voyage in 1628", "Se hundió en Estocolmo en su viaje inaugural en 1628", "Sank 1628 in Stockholm auf der Jungfernfahrt"], "hard"],
  [["Mary Rose", "Mary Rose", "Mary Rose"], ["Was Henry VIII's warship that sank in 1545", "Fue el buque de guerra de Enrique VIII que se hundió en 1545", "War das Kriegsschiff Heinrichs VIII., das 1545 sank"], "hard"],
  [["HMS Endeavour", "HMS Endeavour", "HMS Endeavour"], ["Carried James Cook on his first voyage to the Pacific", "Llevó a James Cook en su primer viaje al Pacífico", "Brachte James Cook auf seiner ersten Reise in den Pazifik"], "hard"],
  [["Fram", "Fram", "Fram"], ["Carried Amundsen's expedition to Antarctica", "Llevó la expedición de Amundsen a la Antártida", "Brachte Amundsens Expedition in die Antarktis"], "hard"],
  [["USS Arizona", "USS Arizona", "USS Arizona"], ["Was sunk in the attack on Pearl Harbor", "Fue hundido en el ataque a Pearl Harbor", "Wurde beim Angriff auf Pearl Harbor versenkt"], "medium"],
  [["Potemkin", "Potemkin", "Potemkin"], ["Was the scene of a sailors' mutiny in 1905", "Fue escenario de un motín de marineros en 1905", "War 1905 Schauplatz eines Matrosenaufstands"], "medium"],
  [["Cutty Sark", "Cutty Sark", "Cutty Sark"], ["Was one of the fastest tea clippers of the 19th century", "Fue uno de los clíperes de té más rápidos del siglo XIX", "War einer der schnellsten Teeklipper des 19. Jahrhunderts"], "hard"],
];

/** Space firsts: [after "Which country …" (en / es "¿Qué país …" / de "Welches Land …"), answer key, difficulty] */
export const SPACE: [L, string, D][] = [
  [["launched the first artificial satellite", "lanzó el primer satélite artificial", "startete den ersten künstlichen Satelliten"], "ussr", "easy"],
  [["sent the dog Laika into orbit", "envió a la perra Laika a la órbita terrestre", "schickte die Hündin Laika in die Erdumlaufbahn"], "ussr", "easy"],
  [["sent the first human into space", "envió al primer ser humano al espacio", "schickte den ersten Menschen ins All"], "ussr", "easy"],
  [["sent the first woman into space", "envió a la primera mujer al espacio", "schickte die erste Frau ins All"], "ussr", "medium"],
  [["carried out the first spacewalk", "realizó el primer paseo espacial", "führte den ersten Weltraumausstieg durch"], "ussr", "medium"],
  [["first landed people on the Moon", "llevó por primera vez personas a la Luna", "brachte als erstes Menschen auf den Mond"], "usa", "easy"],
  [["launched the first space station", "lanzó la primera estación espacial", "startete die erste Raumstation"], "ussr", "hard"],
  [["flew the first Space Shuttle in 1981", "hizo volar en 1981 el primer transbordador espacial", "ließ 1981 die erste Raumfähre fliegen"], "usa", "medium"],
  [["made the first soft landing of a probe on the Moon", "logró el primer aterrizaje suave de una sonda en la Luna", "landete als erstes eine Sonde sanft auf dem Mond"], "ussr", "hard"],
  [["first landed a probe on the far side of the Moon", "posó por primera vez una sonda en la cara oculta de la Luna", "landete als erstes eine Sonde auf der Rückseite des Mondes"], "china", "hard"],
  [["took the first photos of the far side of the Moon", "tomó las primeras fotos de la cara oculta de la Luna", "machte die ersten Fotos von der Rückseite des Mondes"], "ussr", "hard"],
  [["launched Voyager 1, the first probe to reach interstellar space", "lanzó la Voyager 1, la primera sonda en llegar al espacio interestelar", "startete Voyager 1, die erste Sonde im interstellaren Raum"], "usa", "medium"],
  [["made the first landing of a probe on Venus", "posó la primera sonda en Venus", "landete als erstes eine Sonde auf der Venus"], "ussr", "hard"],
  [["sent the first probe to fly past Jupiter", "envió la primera sonda que sobrevoló Júpiter", "schickte die erste Sonde an Jupiter vorbei"], "usa", "hard"],
  [["reached Mars orbit on its very first attempt", "llegó a la órbita de Marte en su primer intento", "erreichte schon beim ersten Versuch eine Umlaufbahn um den Mars"], "india", "hard"],
  [["first landed a probe near the Moon's south pole", "posó por primera vez una sonda cerca del polo sur de la Luna", "landete als erstes eine Sonde nahe dem Südpol des Mondes"], "india", "hard"],
];
export const SPACE_POOL = ["ussr", "usa", "china", "india", "japan", "uk", "france", "germany"];

export const WONDERS: L[] = [
  ["Great Pyramid of Giza", "Gran Pirámide de Guiza", "Cheops-Pyramide"],
  ["Hanging Gardens of Babylon", "Jardines colgantes de Babilonia", "Hängende Gärten von Babylon"],
  ["Statue of Zeus at Olympia", "Estatua de Zeus en Olimpia", "Zeusstatue von Olympia"],
  ["Temple of Artemis at Ephesus", "Templo de Artemisa en Éfeso", "Tempel der Artemis in Ephesos"],
  ["Mausoleum at Halicarnassus", "Mausoleo de Halicarnaso", "Mausoleum von Halikarnassos"],
  ["Colossus of Rhodes", "Coloso de Rodas", "Koloss von Rhodos"],
  ["Lighthouse of Alexandria", "Faro de Alejandría", "Leuchtturm von Alexandria"],
];
export const NOT_WONDERS: L[] = [
  ["Colosseum", "Coliseo", "Kolosseum"], ["Parthenon", "Partenón", "Parthenon"], ["Stonehenge", "Stonehenge", "Stonehenge"],
  ["Great Wall of China", "Gran Muralla China", "Chinesische Mauer"], ["Great Sphinx of Giza", "Gran Esfinge de Guiza", "Große Sphinx von Gizeh"],
  ["Pantheon in Rome", "Panteón de Roma", "Pantheon in Rom"], ["Hadrian's Wall", "Muro de Adriano", "Hadrianswall"],
  ["Terracotta Army", "Guerreros de terracota", "Terrakotta-Armee"], ["Temples of Abu Simbel", "Templos de Abu Simbel", "Tempel von Abu Simbel"],
  ["Temple of Karnak", "Templo de Karnak", "Karnak-Tempel"], ["Library of Alexandria", "Biblioteca de Alejandría", "Bibliothek von Alexandria"],
  ["Palace of Knossos", "Palacio de Cnosos", "Palast von Knossos"], ["Machu Picchu", "Machu Picchu", "Machu Picchu"], ["Petra", "Petra", "Petra"],
  ["Angkor Wat", "Angkor Wat", "Angkor Wat"], ["Chichén Itzá", "Chichén Itzá", "Chichén Itzá"],
];

export const ROMANS: L[] = [
  ["Julius Caesar", "Julio César", "Julius Caesar"], ["Augustus", "Augusto", "Augustus"], ["Cicero", "Cicerón", "Cicero"], ["Nero", "Nerón", "Nero"],
  ["Caligula", "Calígula", "Caligula"], ["Marcus Aurelius", "Marco Aurelio", "Mark Aurel"], ["Hadrian", "Adriano", "Hadrian"], ["Trajan", "Trajano", "Trajan"],
  ["Virgil", "Virgilio", "Vergil"], ["Ovid", "Ovidio", "Ovid"], ["Seneca", "Séneca", "Seneca"], ["Pompey", "Pompeyo", "Pompeius"],
  ["Mark Antony", "Marco Antonio", "Marcus Antonius"], ["Scipio Africanus", "Escipión el Africano", "Scipio Africanus"], ["Cato the Elder", "Catón el Viejo", "Cato der Ältere"],
  ["Pliny the Elder", "Plinio el Viejo", "Plinius der Ältere"], ["Tacitus", "Tácito", "Tacitus"], ["Horace", "Horacio", "Horaz"],
];
export const GREEKS: L[] = [
  ["Pericles", "Pericles", "Perikles"], ["Leonidas", "Leónidas", "Leonidas"], ["Socrates", "Sócrates", "Sokrates"], ["Plato", "Platón", "Platon"],
  ["Aristotle", "Aristóteles", "Aristoteles"], ["Homer", "Homero", "Homer"], ["Herodotus", "Heródoto", "Herodot"], ["Archimedes", "Arquímedes", "Archimedes"],
  ["Pythagoras", "Pitágoras", "Pythagoras"], ["Euclid", "Euclides", "Euklid"], ["Sophocles", "Sófocles", "Sophokles"], ["Themistocles", "Temístocles", "Themistokles"],
  ["Demosthenes", "Demóstenes", "Demosthenes"], ["Hippocrates", "Hipócrates", "Hippokrates"], ["Thucydides", "Tucídides", "Thukydides"], ["Solon", "Solón", "Solon"],
  ["Euripides", "Eurípides", "Euripides"], ["Epicurus", "Epicuro", "Epikur"],
];

/** Greek god, Roman counterpart, female? */
export const GODS: [L, L, boolean][] = [
  [["Zeus", "Zeus", "Zeus"], ["Jupiter", "Júpiter", "Jupiter"], false],
  [["Hera", "Hera", "Hera"], ["Juno", "Juno", "Juno"], true],
  [["Poseidon", "Poseidón", "Poseidon"], ["Neptune", "Neptuno", "Neptun"], false],
  [["Ares", "Ares", "Ares"], ["Mars", "Marte", "Mars"], false],
  [["Aphrodite", "Afrodita", "Aphrodite"], ["Venus", "Venus", "Venus"], true],
  [["Hermes", "Hermes", "Hermes"], ["Mercury", "Mercurio", "Merkur"], false],
  [["Athena", "Atenea", "Athene"], ["Minerva", "Minerva", "Minerva"], true],
  [["Artemis", "Artemisa", "Artemis"], ["Diana", "Diana", "Diana"], true],
  [["Hephaestus", "Hefesto", "Hephaistos"], ["Vulcan", "Vulcano", "Vulcanus"], false],
  [["Dionysus", "Dioniso", "Dionysos"], ["Bacchus", "Baco", "Bacchus"], false],
  [["Hades", "Hades", "Hades"], ["Pluto", "Plutón", "Pluto"], false],
  [["Demeter", "Deméter", "Demeter"], ["Ceres", "Ceres", "Ceres"], true],
  [["Hestia", "Hestia", "Hestia"], ["Vesta", "Vesta", "Vesta"], true],
  [["Eros", "Eros", "Eros"], ["Cupid", "Cupido", "Amor"], false],
  [["Cronus", "Crono", "Kronos"], ["Saturn", "Saturno", "Saturn"], false],
  [["Persephone", "Perséfone", "Persephone"], ["Proserpina", "Proserpina", "Proserpina"], true],
  [["Eos", "Eos", "Eos"], ["Aurora", "Aurora", "Aurora"], true],
];

/** Roman emperors with the year their reign began (negative = BC). */
export const EMPERORS: [string, string, string, number][] = [
  ["Augustus", "Augusto", "Augustus", -27], ["Tiberius", "Tiberio", "Tiberius", 14], ["Caligula", "Calígula", "Caligula", 37], ["Claudius", "Claudio", "Claudius", 41],
  ["Nero", "Nerón", "Nero", 54], ["Vespasian", "Vespasiano", "Vespasian", 69], ["Titus", "Tito", "Titus", 79], ["Domitian", "Domiciano", "Domitian", 81],
  ["Trajan", "Trajano", "Trajan", 98], ["Hadrian", "Adriano", "Hadrian", 117], ["Marcus Aurelius", "Marco Aurelio", "Mark Aurel", 161], ["Commodus", "Cómodo", "Commodus", 180],
  ["Septimius Severus", "Septimio Severo", "Septimius Severus", 193], ["Aurelian", "Aureliano", "Aurelian", 270], ["Diocletian", "Diocleciano", "Diokletian", 284],
  ["Constantine the Great", "Constantino el Grande", "Konstantin der Große", 306], ["Theodosius I", "Teodosio I", "Theodosius I.", 379],
];
/** Famous Romans who were NOT emperors. */
export const NOT_EMPERORS: L[] = [
  ["Julius Caesar", "Julio César", "Julius Caesar"], ["Cicero", "Cicerón", "Cicero"], ["Pompey", "Pompeyo", "Pompeius"], ["Mark Antony", "Marco Antonio", "Marcus Antonius"],
  ["Brutus", "Bruto", "Brutus"], ["Scipio Africanus", "Escipión el Africano", "Scipio Africanus"], ["Cato the Elder", "Catón el Viejo", "Cato der Ältere"],
  ["Spartacus", "Espartaco", "Spartacus"], ["Virgil", "Virgilio", "Vergil"], ["Seneca", "Séneca", "Seneca"],
];

/** US presidents with the year they first took office. */
export const PRESIDENTS: [string, number][] = [
  ["George Washington", 1789], ["John Adams", 1797], ["Thomas Jefferson", 1801], ["James Madison", 1809], ["James Monroe", 1817], ["Andrew Jackson", 1829],
  ["Abraham Lincoln", 1861], ["Ulysses S. Grant", 1869], ["Theodore Roosevelt", 1901], ["Woodrow Wilson", 1913], ["Franklin D. Roosevelt", 1933],
  ["Harry S. Truman", 1945], ["Dwight D. Eisenhower", 1953], ["John F. Kennedy", 1961], ["Richard Nixon", 1969], ["Jimmy Carter", 1977],
  ["Ronald Reagan", 1981], ["Bill Clinton", 1993], ["George W. Bush", 2001], ["Barack Obama", 2009],
];

/** English / British monarchs with the year they came to the throne. */
export const MONARCHS: [string, string, string, number][] = [
  ["William the Conqueror", "Guillermo el Conquistador", "Wilhelm der Eroberer", 1066], ["Richard the Lionheart", "Ricardo Corazón de León", "Richard Löwenherz", 1189],
  ["Edward I", "Eduardo I de Inglaterra", "Eduard I.", 1272], ["Henry V", "Enrique V de Inglaterra", "Heinrich V.", 1413], ["Henry VIII", "Enrique VIII", "Heinrich VIII.", 1509],
  ["Elizabeth I", "Isabel I de Inglaterra", "Elisabeth I.", 1558], ["Charles I", "Carlos I de Inglaterra", "Karl I.", 1625], ["Queen Anne", "Ana de Gran Bretaña", "Königin Anne", 1702],
  ["George III", "Jorge III", "Georg III.", 1760], ["Queen Victoria", "Reina Victoria", "Königin Victoria", 1837], ["Edward VII", "Eduardo VII", "Eduard VII.", 1901],
  ["George V", "Jorge V", "Georg V.", 1910], ["George VI", "Jorge VI", "Georg VI.", 1936], ["Elizabeth II", "Isabel II del Reino Unido", "Elisabeth II.", 1952],
  ["Charles III", "Carlos III del Reino Unido", "Charles III.", 2022],
];

/** Year a country joined the European Union or its forerunners (EEC/EC). */
export const EU_JOIN: [string, number][] = [
  ["uk", 1973], ["ireland", 1973], ["denmark", 1973], ["greece", 1981], ["spain", 1986], ["portugal", 1986], ["austria", 1995], ["sweden", 1995], ["finland", 1995],
  ["poland", 2004], ["czechia", 2004], ["hungary", 2004], ["slovakia", 2004], ["slovenia", 2004], ["estonia", 2004], ["latvia", 2004], ["lithuania", 2004], ["malta", 2004],
  ["romania", 2007], ["bulgaria", 2007], ["croatia", 2013],
];
export const EU_YEARS = [1958, 1973, 1981, 1986, 1995, 2004, 2007, 2013];
export const EU_FOUNDERS = ["germany", "france", "italy", "netherlands", "belgium", "luxembourg"];
export const EU_NOT_FOUNDERS = ["uk", "ireland", "denmark", "spain", "portugal", "greece", "austria", "sweden", "finland", "poland", "norway", "hungary", "czechia"];

/** Events → present-day country: [en, es, de (nominative with article), country id, never-wrong ids, plural?, difficulty] */
export const PLACE_EVENTS: [string, string, string, string, string[], boolean, D][] = [
  ["the storming of the Bastille", "la toma de la Bastilla", "der Sturm auf die Bastille", "france", [], false, "easy"],
  ["the Gunpowder Plot", "la Conspiración de la Pólvora", "die Pulververschwörung", "uk", ["ireland"], false, "medium"],
  ["the Boston Tea Party", "el motín del té de Boston", "die Boston Tea Party", "usa", ["uk"], false, "easy"],
  ["the Dreyfus affair", "el caso Dreyfus", "die Dreyfus-Affäre", "france", [], false, "medium"],
  ["the Easter Rising", "el Alzamiento de Pascua", "der Osteraufstand", "ireland", ["uk"], false, "medium"],
  ["the Boxer Rebellion", "la rebelión de los bóxers", "der Boxeraufstand", "china", [], false, "medium"],
  ["the Taiping Rebellion", "la rebelión Taiping", "der Taiping-Aufstand", "china", [], false, "hard"],
  ["the October Revolution", "la Revolución de Octubre", "die Oktoberrevolution", "russia", [], false, "easy"],
  ["the Decembrist revolt", "la revuelta decembrista", "der Dekabristenaufstand", "russia", [], false, "hard"],
  ["the Carnation Revolution", "la Revolución de los Claveles", "die Nelkenrevolution", "portugal", [], false, "medium"],
  ["the Velvet Revolution", "la Revolución de Terciopelo", "die Samtene Revolution", "czechia", ["slovakia"], false, "medium"],
  ["the Orange Revolution", "la Revolución naranja", "die Orange Revolution", "ukraine", [], false, "medium"],
  ["the Cedar Revolution", "la Revolución de los Cedros", "die Zedernrevolution", "lebanon", [], false, "hard"],
  ["the Mau Mau uprising", "la rebelión del Mau Mau", "der Mau-Mau-Aufstand", "kenya", [], false, "hard"],
  ["the Sandinista Revolution", "la Revolución sandinista", "die Sandinistische Revolution", "nicaragua", [], false, "hard"],
  ["the Xinhai Revolution", "la Revolución de Xinhai", "die Xinhai-Revolution", "china", [], false, "hard"],
  ["the Cultural Revolution", "la Revolución Cultural", "die Kulturrevolution", "china", [], false, "easy"],
  ["the Glorious Revolution of 1688", "la Revolución Gloriosa de 1688", "die Glorreiche Revolution von 1688", "uk", ["netherlands", "spain"], false, "medium"],
  ["the Watergate scandal", "el escándalo Watergate", "die Watergate-Affäre", "usa", [], false, "easy"],
  ["the Night of the Long Knives", "la Noche de los Cuchillos Largos", "die Nacht der langen Messer", "germany", [], false, "medium"],
  ["Kristallnacht", "la Noche de los Cristales Rotos", "die Reichspogromnacht", "germany", ["austria"], false, "medium"],
  ["the Reichstag fire", "el incendio del Reichstag", "der Reichstagsbrand", "germany", [], false, "medium"],
  ["the Tiananmen Square protests of 1989", "las protestas de la plaza de Tiananmén de 1989", "die Proteste auf dem Tian’anmen-Platz 1989", "china", [], true, "easy"],
  ["the Peterloo Massacre", "la masacre de Peterloo", "das Massaker von Peterloo", "uk", [], false, "hard"],
  ["Gandhi's Salt March", "la Marcha de la Sal de Gandhi", "Gandhis Salzmarsch", "india", ["pakistan"], false, "easy"],
  ["the Meiji Restoration", "la Restauración Meiji", "die Meiji-Restauration", "japan", [], false, "medium"],
  ["the Sharpeville massacre", "la masacre de Sharpeville", "das Massaker von Sharpeville", "south_africa", [], false, "hard"],
  ["the Battle of the Alamo", "la batalla de El Álamo", "die Schlacht von Alamo", "usa", ["mexico"], false, "medium"],
  ["the Peasants' Revolt of 1381", "la revuelta de los campesinos de 1381", "der Bauernaufstand von 1381", "uk", [], false, "hard"],
  ["the Bay of Pigs invasion", "la invasión de bahía de Cochinos", "die Invasion in der Schweinebucht", "cuba", [], false, "medium"],
  ["the Chernobyl disaster", "el accidente de Chernóbil", "die Katastrophe von Tschernobyl", "ukraine", ["russia", "belarus"], false, "easy"],
  ["the Bhopal disaster", "la catástrofe de Bhopal", "die Katastrophe von Bhopal", "india", [], false, "medium"],
];

/** City founders: [city L, founder L, difficulty] */
export const FOUNDERS: [L, L, D][] = [
  [["Alexandria in Egypt", "Alejandría (Egipto)", "Alexandria in Ägypten"], ["Alexander the Great", "Alejandro Magno", "Alexander der Große"], "easy"],
  [["Constantinople", "Constantinopla", "Konstantinopel"], ["Constantine the Great", "Constantino el Grande", "Konstantin der Große"], "easy"],
  [["Saint Petersburg", "San Petersburgo", "Sankt Petersburg"], ["Peter the Great", "Pedro el Grande", "Peter der Große"], "easy"],
  [["Lima", "Lima", "Lima"], ["Francisco Pizarro", "Francisco Pizarro", "Francisco Pizarro"], "medium"],
  [["Santiago de Chile", "Santiago de Chile", "Santiago de Chile"], ["Pedro de Valdivia", "Pedro de Valdivia", "Pedro de Valdivia"], "hard"],
  [["Quebec City", "la ciudad de Quebec", "die Stadt Québec"], ["Samuel de Champlain", "Samuel de Champlain", "Samuel de Champlain"], "hard"],
  [["Bogotá", "Bogotá", "Bogotá"], ["Gonzalo Jiménez de Quesada", "Gonzalo Jiménez de Quesada", "Gonzalo Jiménez de Quesada"], "hard"],
  [["Cape Town", "Ciudad del Cabo", "Kapstadt"], ["Jan van Riebeeck", "Jan van Riebeeck", "Jan van Riebeeck"], "hard"],
  [["Philadelphia", "Filadelfia", "Philadelphia"], ["William Penn", "William Penn", "William Penn"], "medium"],
  [["Baghdad", "Bagdad", "Bagdad"], ["Caliph al-Mansur", "El califa al-Mansur", "Kalif al-Mansur"], "hard"],
  [["Quito", "Quito", "Quito"], ["Sebastián de Benalcázar", "Sebastián de Benalcázar", "Sebastián de Benalcázar"], "hard"],
  [["Sydney", "Sídney", "Sydney"], ["Arthur Phillip", "Arthur Phillip", "Arthur Phillip"], "hard"],
  [["modern Singapore", "el Singapur moderno", "das moderne Singapur"], ["Stamford Raffles", "Stamford Raffles", "Stamford Raffles"], "medium"],
  [["Salt Lake City", "Salt Lake City", "Salt Lake City"], ["Brigham Young", "Brigham Young", "Brigham Young"], "hard"],
];
export const FOUNDER_DECOYS: L[] = [
  ["Hernán Cortés", "Hernán Cortés", "Hernán Cortés"], ["Christopher Columbus", "Cristóbal Colón", "Christoph Kolumbus"], ["Jacques Cartier", "Jacques Cartier", "Jacques Cartier"],
  ["Henry Hudson", "Henry Hudson", "Henry Hudson"], ["James Cook", "James Cook", "James Cook"], ["Simón Bolívar", "Simón Bolívar", "Simón Bolívar"],
  ["Julius Caesar", "Julio César", "Julius Caesar"], ["Vasco da Gama", "Vasco da Gama", "Vasco da Gama"],
];

/** Historical ruler titles: [title en, es, de, country id, never-wrong ids, difficulty] */
export const TITLES: [string, string, string, string, string[], D][] = [
  ["Tsar", "zar", "Zar", "russia", ["bulgaria", "serbia"], "easy"],
  ["Shah", "sah", "Schah", "iran", ["afghanistan", "india", "pakistan"], "medium"],
  ["Pharaoh", "faraón", "Pharao", "egypt", ["sudan"], "easy"],
  ["Shogun", "sogún", "Shogun", "japan", [], "easy"],
  ["Doge", "dux", "Doge", "italy", ["croatia"], "hard"],
  ["Sapa Inca", "sapa inca", "Sapa Inka", "peru", ["bolivia", "ecuador", "chile", "argentina", "colombia"], "medium"],
  ["Negus", "negus", "Negus", "ethiopia", [], "hard"],
  ["Tlatoani", "tlatoani", "Tlatoani", "mexico", [], "hard"],
  ["Maharaja", "maharajá", "Maharadscha", "india", ["nepal", "pakistan", "bangladesh"], "medium"],
  ["Khedive", "jedive", "Khedive", "egypt", ["sudan"], "hard"],
  ["Stadtholder", "estatúder", "Statthalter (Stadhouder)", "netherlands", ["belgium"], "hard"],
  ["Mansa", "mansa", "Mansa", "mali", [], "hard"],
];

/** Former capitals: [country key, "until" L (null = no date), former capital, wrong cities, difficulty] */
export const FORMER_CAPITALS: [string, L | null, L, L[], D][] = [
  ["brazil", ["1960", "1960", "1960"], ["Rio de Janeiro", "Río de Janeiro", "Rio de Janeiro"], [["São Paulo", "São Paulo", "São Paulo"], ["Belo Horizonte", "Belo Horizonte", "Belo Horizonte"], ["Recife", "Recife", "Recife"], ["Porto Alegre", "Porto Alegre", "Porto Alegre"]], "medium"],
  ["japan", ["1868", "1868", "1868"], ["Kyoto", "Kioto", "Kyoto"], [["Yokohama", "Yokohama", "Yokohama"], ["Nagoya", "Nagoya", "Nagoya"], ["Sapporo", "Sapporo", "Sapporo"], ["Fukuoka", "Fukuoka", "Fukuoka"]], "medium"],
  ["turkey", ["1923", "1923", "1923"], ["Istanbul", "Estambul", "Istanbul"], [["İzmir", "Esmirna", "Izmir"], ["Antalya", "Antalya", "Antalya"], ["Adana", "Adana", "Adana"], ["Trabzon", "Trebisonda", "Trabzon"]], "medium"],
  ["russia", ["1918", "1918", "1918"], ["Saint Petersburg (Petrograd)", "San Petersburgo (Petrogrado)", "Sankt Petersburg (Petrograd)"], [["Novosibirsk", "Novosibirsk", "Nowosibirsk"], ["Kazan", "Kazán", "Kasan"], ["Yekaterinburg", "Ekaterimburgo", "Jekaterinburg"], ["Volgograd", "Volgogrado", "Wolgograd"]], "medium"],
  ["west_germany", null, ["Bonn", "Bonn", "Bonn"], [["Frankfurt", "Fráncfort", "Frankfurt am Main"], ["Munich", "Múnich", "München"], ["Hamburg", "Hamburgo", "Hamburg"], ["Cologne", "Colonia", "Köln"]], "easy"],
  ["australia", ["1927", "1927", "1927"], ["Melbourne", "Melbourne", "Melbourne"], [["Sydney", "Sídney", "Sydney"], ["Brisbane", "Brisbane", "Brisbane"], ["Perth", "Perth", "Perth"], ["Adelaide", "Adelaida", "Adelaide"]], "medium"],
  ["nigeria", ["1991", "1991", "1991"], ["Lagos", "Lagos", "Lagos"], [["Kano", "Kano", "Kano"], ["Ibadan", "Ibadán", "Ibadan"], ["Port Harcourt", "Port Harcourt", "Port Harcourt"], ["Benin City", "Benin City", "Benin City"]], "medium"],
  ["pakistan", ["1959", "1959", "1959"], ["Karachi", "Karachi", "Karatschi"], [["Lahore", "Lahore", "Lahore"], ["Peshawar", "Peshawar", "Peschawar"], ["Quetta", "Quetta", "Quetta"], ["Multan", "Multán", "Multan"]], "hard"],
  ["kazakhstan", ["1997", "1997", "1997"], ["Almaty", "Almaty", "Almaty"], [["Shymkent", "Shymkent", "Schymkent"], ["Karaganda", "Karagandá", "Karaganda"], ["Aktobe", "Aktobe", "Aqtöbe"], ["Pavlodar", "Pavlodar", "Pawlodar"]], "hard"],
  ["british_india", ["1911", "1911", "1911"], ["Calcutta", "Calcuta", "Kalkutta"], [["Bombay", "Bombay", "Bombay"], ["Madras", "Madrás", "Madras"], ["Bangalore", "Bangalore", "Bangalore"], ["Hyderabad", "Hyderabad", "Hyderabad"]], "hard"],
  ["finland", ["1812", "1812", "1812"], ["Turku", "Turku", "Turku"], [["Tampere", "Tampere", "Tampere"], ["Oulu", "Oulu", "Oulu"], ["Lahti", "Lahti", "Lahti"], ["Kuopio", "Kuopio", "Kuopio"]], "hard"],
  ["poland", ["the late 16th century", "finales del siglo XVI", "Ende des 16. Jahrhunderts"], ["Kraków", "Cracovia", "Krakau"], [["Gdańsk", "Gdansk", "Danzig"], ["Wrocław", "Breslavia", "Breslau"], ["Łódź", "Lodz", "Łódź"], ["Lublin", "Lublin", "Lublin"]], "medium"],
  ["new_zealand", ["1865", "1865", "1865"], ["Auckland", "Auckland", "Auckland"], [["Christchurch", "Christchurch", "Christchurch"], ["Dunedin", "Dunedin", "Dunedin"], ["Hamilton", "Hamilton", "Hamilton"], ["Napier", "Napier", "Napier"]], "hard"],
  ["usa", ["1800", "1800", "1800"], ["Philadelphia", "Filadelfia", "Philadelphia"], [["Boston", "Boston", "Boston"], ["Chicago", "Chicago", "Chicago"], ["Los Angeles", "Los Ángeles", "Los Angeles"], ["Atlanta", "Atlanta", "Atlanta"]], "medium"],
  ["italy", ["1871", "1871", "1871"], ["Florence", "Florencia", "Florenz"], [["Milan", "Milán", "Mailand"], ["Naples", "Nápoles", "Neapel"], ["Venice", "Venecia", "Venedig"], ["Bologna", "Bolonia", "Bologna"]], "hard"],
  ["morocco", ["1912", "1912", "1912"], ["Fez", "Fez", "Fès"], [["Casablanca", "Casablanca", "Casablanca"], ["Tangier", "Tánger", "Tanger"], ["Agadir", "Agadir", "Agadir"], ["Tetouan", "Tetuán", "Tétouan"]], "hard"],
];

export const USSR_MEMBERS = ["ukraine", "belarus", "estonia", "latvia", "lithuania", "kazakhstan", "uzbekistan", "georgia", "armenia", "azerbaijan", "moldova", "kyrgyzstan", "tajikistan", "turkmenistan"];
export const NOT_USSR = ["poland", "czechia", "hungary", "romania", "bulgaria", "finland", "mongolia", "afghanistan", "albania", "serbia", "turkey", "iran", "slovakia", "croatia", "austria", "greece"];
export const YUGO_MEMBERS = ["serbia", "croatia", "slovenia", "bosnia", "montenegro", "north_macedonia"];
export const NOT_YUGO = ["albania", "bulgaria", "romania", "hungary", "greece", "slovakia", "czechia", "austria", "ukraine", "moldova", "poland"];
export const NEVER_COLONISED = ["thailand", "japan", "nepal", "bhutan"];
export const COLONISED_ASIA = ["india", "vietnam", "indonesia", "philippines", "malaysia", "myanmar", "sri_lanka", "cambodia", "laos", "singapore", "bangladesh", "pakistan"];
export const AXIS = ["germany", "italy", "japan", "hungary", "romania", "bulgaria"];
export const NOT_AXIS = ["uk", "usa", "france", "ussr", "china", "poland", "canada", "australia", "netherlands", "belgium", "norway", "greece", "brazil", "new_zealand", "south_africa", "mexico"];
export const CENTRAL = ["germany", "austria_hungary", "ottoman", "bulgaria"];
export const NOT_CENTRAL = ["france", "uk", "russia", "italy", "usa", "serbia", "belgium", "japan", "portugal", "romania", "greece", "brazil"];

/** First woman in an office: [country id, role, person] */
export const FIRST_WOMEN: [string, "pm" | "pres" | "chanc", string, D][] = [
  ["uk", "pm", "Margaret Thatcher", "easy"], ["germany", "chanc", "Angela Merkel", "easy"], ["india", "pm", "Indira Gandhi", "easy"],
  ["sri_lanka", "pm", "Sirimavo Bandaranaike", "hard"], ["pakistan", "pm", "Benazir Bhutto", "medium"], ["france", "pm", "Édith Cresson", "hard"],
  ["turkey", "pm", "Tansu Çiller", "hard"], ["thailand", "pm", "Yingluck Shinawatra", "hard"], ["philippines", "pres", "Corazon Aquino", "medium"],
  ["chile", "pres", "Michelle Bachelet", "medium"], ["brazil", "pres", "Dilma Rousseff", "medium"], ["iceland", "pres", "Vigdís Finnbogadóttir", "hard"],
  ["norway", "pm", "Gro Harlem Brundtland", "hard"], ["canada", "pm", "Kim Campbell", "hard"], ["australia", "pm", "Julia Gillard", "medium"],
  ["new_zealand", "pm", "Jenny Shipley", "hard"], ["argentina", "pres", "Isabel Perón", "medium"], ["italy", "pm", "Giorgia Meloni", "medium"],
  ["mexico", "pres", "Claudia Sheinbaum", "medium"], ["south_korea", "pres", "Park Geun-hye", "hard"], ["indonesia", "pres", "Megawati Sukarnoputri", "hard"],
  ["bangladesh", "pm", "Khaleda Zia", "hard"], ["denmark", "pm", "Helle Thorning-Schmidt", "hard"], ["portugal", "pm", "Maria de Lourdes Pintasilgo", "hard"],
  ["poland", "pm", "Hanna Suchocka", "hard"], ["finland", "pres", "Tarja Halonen", "hard"], ["ireland", "pres", "Mary Robinson", "hard"],
];

export const ASSASSINATED: L[] = [
  ["Julius Caesar", "Julio César", "Julius Caesar"], ["Abraham Lincoln", "Abraham Lincoln", "Abraham Lincoln"], ["John F. Kennedy", "John F. Kennedy", "John F. Kennedy"],
  ["Mahatma Gandhi", "Mahatma Gandhi", "Mahatma Gandhi"], ["Indira Gandhi", "Indira Gandhi", "Indira Gandhi"], ["Martin Luther King Jr.", "Martin Luther King Jr.", "Martin Luther King Jr."],
  ["Archduke Franz Ferdinand", "Archiduque Francisco Fernando", "Erzherzog Franz Ferdinand"], ["Yitzhak Rabin", "Isaac Rabin", "Jitzchak Rabin"], ["Anwar Sadat", "Anwar el-Sadat", "Anwar as-Sadat"],
  ["Olof Palme", "Olof Palme", "Olof Palme"], ["Benazir Bhutto", "Benazir Bhutto", "Benazir Bhutto"], ["Shinzo Abe", "Shinzo Abe", "Shinzō Abe"],
  ["Tsar Alexander II", "Zar Alejandro II", "Zar Alexander II."], ["William McKinley", "William McKinley", "William McKinley"], ["Patrice Lumumba", "Patrice Lumumba", "Patrice Lumumba"],
  ["Empress Elisabeth of Austria", "Emperatriz Isabel de Austria", "Kaiserin Elisabeth von Österreich"], ["Henry IV of France", "Enrique IV de Francia", "Heinrich IV. von Frankreich"],
  ["Malcolm X", "Malcolm X", "Malcolm X"], ["Rajiv Gandhi", "Rajiv Gandhi", "Rajiv Gandhi"], ["Robert F. Kennedy", "Robert F. Kennedy", "Robert F. Kennedy"],
];
export const NOT_ASSASSINATED: L[] = [
  ["George Washington", "George Washington", "George Washington"], ["Winston Churchill", "Winston Churchill", "Winston Churchill"], ["Napoleon Bonaparte", "Napoleón Bonaparte", "Napoleon Bonaparte"],
  ["Queen Victoria", "Reina Victoria", "Königin Victoria"], ["Margaret Thatcher", "Margaret Thatcher", "Margaret Thatcher"], ["Charles de Gaulle", "Charles de Gaulle", "Charles de Gaulle"],
  ["Nelson Mandela", "Nelson Mandela", "Nelson Mandela"], ["Otto von Bismarck", "Otto von Bismarck", "Otto von Bismarck"], ["Angela Merkel", "Angela Merkel", "Angela Merkel"],
  ["Mao Zedong", "Mao Zedong", "Mao Zedong"], ["Louis XIV", "Luis XIV", "Ludwig XIV."], ["Catherine the Great", "Catalina la Grande", "Katharina die Große"],
  ["Konrad Adenauer", "Konrad Adenauer", "Konrad Adenauer"], ["Jawaharlal Nehru", "Jawaharlal Nehru", "Jawaharlal Nehru"], ["Fidel Castro", "Fidel Castro", "Fidel Castro"],
  ["Franklin D. Roosevelt", "Franklin D. Roosevelt", "Franklin D. Roosevelt"], ["Peter the Great", "Pedro el Grande", "Peter der Große"], ["Elizabeth I of England", "Isabel I de Inglaterra", "Elisabeth I. von England"],
  ["Mustafa Kemal Atatürk", "Mustafa Kemal Atatürk", "Mustafa Kemal Atatürk"], ["Charlemagne", "Carlomagno", "Karl der Große"], ["Simón Bolívar", "Simón Bolívar", "Simón Bolívar"],
];

/** Ancient sites → present-day country: [en, es, de (with article where natural), place key, plural?, difficulty] */
export const RUINS: [string, string, string, string, boolean, D][] = [
  ["ancient Troy", "la antigua Troya", "das antike Troja", "turkey", false, "medium"],
  ["ancient Carthage", "la antigua Cartago", "das antike Karthago", "tunisia", false, "medium"],
  ["ancient Babylon", "la antigua Babilonia", "das antike Babylon", "iraq", false, "medium"],
  ["the Roman city of Pompeii", "la ciudad romana de Pompeya", "die römische Stadt Pompeji", "italy", false, "easy"],
  ["Persepolis", "Persépolis", "Persepolis", "iran", false, "medium"],
  ["ancient Ephesus", "la antigua Éfeso", "das antike Ephesos", "turkey", false, "hard"],
  ["Mohenjo-daro", "Mohenjo-Daro", "Mohenjo-Daro", "pakistan", false, "hard"],
  ["the palace of Knossos", "el palacio de Cnosos", "der Palast von Knossos", "greece", false, "medium"],
  ["ancient Palmyra", "la antigua Palmira", "das antike Palmyra", "syria", false, "medium"],
  ["Hattusa, the Hittite capital", "Hattusa, la capital hitita", "Hattuša, die Hauptstadt der Hethiter", "turkey", false, "hard"],
  ["the Maya city of Tikal", "la ciudad maya de Tikal", "die Maya-Stadt Tikal", "guatemala", false, "hard"],
  ["ancient Mycenae", "la antigua Micenas", "das antike Mykene", "greece", false, "medium"],
  ["the Oracle of Delphi", "el oráculo de Delfos", "das Orakel von Delphi", "greece", false, "easy"],
  ["Leptis Magna", "Leptis Magna", "Leptis Magna", "libya", false, "hard"],
  ["the temples of Bagan", "los templos de Bagan", "die Tempel von Bagan", "myanmar", true, "hard"],
  ["Ayutthaya, the old royal capital", "Ayutthaya, la antigua capital real", "Ayutthaya, die alte Königsstadt", "thailand", false, "hard"],
  ["the rock fortress of Sigiriya", "la fortaleza de roca de Sigiriya", "die Felsenfestung Sigiriya", "sri_lanka", false, "hard"],
  ["the Roman temples of Baalbek", "los templos romanos de Baalbek", "die römischen Tempel von Baalbek", "lebanon", true, "hard"],
  ["the stelae of Aksum", "las estelas de Aksum", "die Stelen von Aksum", "ethiopia", true, "hard"],
  ["the Roman city of Volubilis", "la ciudad romana de Volubilis", "die römische Stadt Volubilis", "morocco", false, "hard"],
  ["the Maya city of Copán", "la ciudad maya de Copán", "die Maya-Stadt Copán", "honduras", false, "hard"],
  ["the Temple of Karnak", "el templo de Karnak", "der Karnak-Tempel", "egypt", false, "easy"],
  ["Göbekli Tepe", "Göbekli Tepe", "Göbekli Tepe", "turkey", false, "hard"],
  ["the ziggurat of Ur", "el zigurat de Ur", "die Zikkurat von Ur", "iraq", false, "hard"],
  ["the Nazca Lines", "las líneas de Nazca", "die Nazca-Linien", "peru", true, "medium"],
  ["Tiwanaku", "Tiahuanaco", "Tiwanaku", "bolivia", false, "hard"],
  ["the Statue of Zeus at Olympia", "la estatua de Zeus en Olimpia", "die Zeusstatue von Olympia", "greece", false, "medium"],
  ["the Temple of Artemis at Ephesus", "el templo de Artemisa en Éfeso", "der Tempel der Artemis in Ephesos", "turkey", false, "hard"],
  ["the Mausoleum at Halicarnassus", "el mausoleo de Halicarnaso", "das Mausoleum von Halikarnassos", "turkey", false, "hard"],
  ["the Colossus of Rhodes", "el Coloso de Rodas", "der Koloss von Rhodos", "greece", false, "medium"],
  ["the Lighthouse of Alexandria", "el faro de Alejandría", "der Leuchtturm von Alexandria", "egypt", false, "easy"],
  ["the Hanging Gardens of Babylon", "los jardines colgantes de Babilonia", "die Hängenden Gärten von Babylon", "iraq", true, "medium"],
];
export const RUIN_POOL = ["turkey", "greece", "italy", "egypt", "iraq", "iran", "syria", "lebanon", "jordan", "libya", "tunisia", "morocco", "algeria", "pakistan", "india",
  "afghanistan", "myanmar", "thailand", "cambodia", "sri_lanka", "ethiopia", "sudan", "guatemala", "honduras", "mexico", "peru", "bolivia", "spain", "saudi_arabia"];
