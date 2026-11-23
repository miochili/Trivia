/**
 * Fact tables for the "sport2." question families (see ./sports2.ts).
 * Only fixed history and long-standing rules — nothing that changes from season to season.
 */
type L = [string, string, string];

// ── nations / national teams ──
export const NAT: Record<string, L> = {
  england: ["England", "Inglaterra", "England"], scotland: ["Scotland", "Escocia", "Schottland"], wales: ["Wales", "Gales", "Wales"],
  ireland: ["Ireland", "Irlanda", "Irland"], spain: ["Spain", "España", "Spanien"], italy: ["Italy", "Italia", "Italien"], france: ["France", "Francia", "Frankreich"],
  germany: ["Germany", "Alemania", "Deutschland"], west_germany: ["West Germany", "Alemania Federal", "BR Deutschland"],
  netherlands: ["Netherlands", "Países Bajos", "Niederlande"], portugal: ["Portugal", "Portugal", "Portugal"], denmark: ["Denmark", "Dinamarca", "Dänemark"],
  greece: ["Greece", "Grecia", "Griechenland"], ussr: ["Soviet Union", "Unión Soviética", "Sowjetunion"], czechoslovakia: ["Czechoslovakia", "Checoslovaquia", "Tschechoslowakei"],
  yugoslavia: ["Yugoslavia", "Yugoslavia", "Jugoslawien"], belgium: ["Belgium", "Bélgica", "Belgien"], croatia: ["Croatia", "Croacia", "Kroatien"],
  sweden: ["Sweden", "Suecia", "Schweden"], poland: ["Poland", "Polonia", "Polen"], austria: ["Austria", "Austria", "Österreich"], turkey: ["Türkiye", "Turquía", "Türkei"],
  ukraine: ["Ukraine", "Ucrania", "Ukraine"], norway: ["Norway", "Noruega", "Norwegen"], hungary: ["Hungary", "Hungría", "Ungarn"], romania: ["Romania", "Rumanía", "Rumänien"],
  serbia: ["Serbia", "Serbia", "Serbien"], russia: ["Russia", "Rusia", "Russland"], czechia: ["Czech Republic", "Chequia", "Tschechien"], finland: ["Finland", "Finlandia", "Finnland"],
  brazil: ["Brazil", "Brasil", "Brasilien"], argentina: ["Argentina", "Argentina", "Argentinien"], uruguay: ["Uruguay", "Uruguay", "Uruguay"], chile: ["Chile", "Chile", "Chile"],
  colombia: ["Colombia", "Colombia", "Kolumbien"], paraguay: ["Paraguay", "Paraguay", "Paraguay"], peru: ["Peru", "Perú", "Peru"], bolivia: ["Bolivia", "Bolivia", "Bolivien"],
  ecuador: ["Ecuador", "Ecuador", "Ecuador"], venezuela: ["Venezuela", "Venezuela", "Venezuela"], mexico: ["Mexico", "México", "Mexiko"],
  usa: ["United States", "Estados Unidos", "Vereinigte Staaten"], canada: ["Canada", "Canadá", "Kanada"], costa_rica: ["Costa Rica", "Costa Rica", "Costa Rica"],
  jamaica: ["Jamaica", "Jamaica", "Jamaika"],
  egypt: ["Egypt", "Egipto", "Ägypten"], cameroon: ["Cameroon", "Camerún", "Kamerun"], ghana: ["Ghana", "Ghana", "Ghana"], nigeria: ["Nigeria", "Nigeria", "Nigeria"],
  ivory_coast: ["Ivory Coast", "Costa de Marfil", "Elfenbeinküste"], algeria: ["Algeria", "Argelia", "Algerien"], senegal: ["Senegal", "Senegal", "Senegal"],
  south_africa: ["South Africa", "Sudáfrica", "Südafrika"], zambia: ["Zambia", "Zambia", "Sambia"], tunisia: ["Tunisia", "Túnez", "Tunesien"], morocco: ["Morocco", "Marruecos", "Marokko"],
  mali: ["Mali", "Malí", "Mali"], burkina: ["Burkina Faso", "Burkina Faso", "Burkina Faso"], guinea: ["Guinea", "Guinea", "Guinea"], cape_verde: ["Cape Verde", "Cabo Verde", "Kap Verde"],
  angola: ["Angola", "Angola", "Angola"], uganda: ["Uganda", "Uganda", "Uganda"], kenya: ["Kenya", "Kenia", "Kenia"], gabon: ["Gabon", "Gabón", "Gabun"],
  japan: ["Japan", "Japón", "Japan"], saudi: ["Saudi Arabia", "Arabia Saudí", "Saudi-Arabien"], iran: ["Iran", "Irán", "Iran"], south_korea: ["South Korea", "Corea del Sur", "Südkorea"],
  north_korea: ["North Korea", "Corea del Norte", "Nordkorea"], qatar: ["Qatar", "Catar", "Katar"], australia: ["Australia", "Australia", "Australien"], iraq: ["Iraq", "Irak", "Irak"],
  kuwait: ["Kuwait", "Kuwait", "Kuwait"], china: ["China", "China", "China"], uae: ["United Arab Emirates", "Emiratos Árabes Unidos", "Vereinigte Arabische Emirate"],
  uzbekistan: ["Uzbekistan", "Uzbekistán", "Usbekistan"], jordan: ["Jordan", "Jordania", "Jordanien"], thailand: ["Thailand", "Tailandia", "Thailand"], oman: ["Oman", "Omán", "Oman"],
  syria: ["Syria", "Siria", "Syrien"], india: ["India", "India", "Indien"], vietnam: ["Vietnam", "Vietnam", "Vietnam"],
  new_zealand: ["New Zealand", "Nueva Zelanda", "Neuseeland"], fiji: ["Fiji", "Fiyi", "Fidschi"],
  west_indies: ["West Indies", "Indias Occidentales", "West Indies"], pakistan: ["Pakistan", "Pakistán", "Pakistan"], sri_lanka: ["Sri Lanka", "Sri Lanka", "Sri Lanka"],
  bangladesh: ["Bangladesh", "Bangladés", "Bangladesch"], zimbabwe: ["Zimbabwe", "Zimbabue", "Simbabwe"], afghanistan: ["Afghanistan", "Afganistán", "Afghanistan"],
};
/** Teams that only existed (or only competed) in some years: [from, to]. Never offered as a wrong answer outside that range. */
export const ERA: Record<string, [number, number]> = {
  west_germany: [0, 1990], ussr: [0, 1991], czechoslovakia: [0, 1993], yugoslavia: [0, 1991],
  germany: [1991, 9999], russia: [1992, 9999], czechia: [1994, 9999], croatia: [1992, 9999], serbia: [2007, 9999], ukraine: [1992, 9999],
  uzbekistan: [1992, 9999], south_africa: [1992, 9999],
};

/** Continental championships: winners by edition. [tournament key, year, winner key] */
export const CONTINENTAL: [string, number, string][] = [
  ["euro", 1960, "ussr"], ["euro", 1964, "spain"], ["euro", 1968, "italy"], ["euro", 1972, "west_germany"], ["euro", 1976, "czechoslovakia"],
  ["euro", 1980, "west_germany"], ["euro", 1984, "france"], ["euro", 1988, "netherlands"], ["euro", 1992, "denmark"], ["euro", 1996, "germany"],
  ["euro", 2000, "france"], ["euro", 2004, "greece"], ["euro", 2008, "spain"], ["euro", 2012, "spain"], ["euro", 2016, "portugal"], ["euro", 2020, "italy"], ["euro", 2024, "spain"],
  ["copa", 1975, "peru"], ["copa", 1979, "paraguay"], ["copa", 1983, "uruguay"], ["copa", 1987, "uruguay"], ["copa", 1989, "brazil"], ["copa", 1991, "argentina"],
  ["copa", 1993, "argentina"], ["copa", 1995, "uruguay"], ["copa", 1997, "brazil"], ["copa", 1999, "brazil"], ["copa", 2001, "colombia"], ["copa", 2004, "brazil"],
  ["copa", 2007, "brazil"], ["copa", 2011, "uruguay"], ["copa", 2015, "chile"], ["copa", 2019, "brazil"], ["copa", 2021, "argentina"], ["copa", 2024, "argentina"],
  ["afcon", 1978, "ghana"], ["afcon", 1980, "nigeria"], ["afcon", 1982, "ghana"], ["afcon", 1984, "cameroon"], ["afcon", 1986, "egypt"], ["afcon", 1988, "cameroon"],
  ["afcon", 1990, "algeria"], ["afcon", 1992, "ivory_coast"], ["afcon", 1994, "nigeria"], ["afcon", 1996, "south_africa"], ["afcon", 1998, "egypt"], ["afcon", 2000, "cameroon"],
  ["afcon", 2002, "cameroon"], ["afcon", 2004, "tunisia"], ["afcon", 2006, "egypt"], ["afcon", 2008, "egypt"], ["afcon", 2010, "egypt"], ["afcon", 2012, "zambia"],
  ["afcon", 2013, "nigeria"], ["afcon", 2015, "ivory_coast"], ["afcon", 2017, "cameroon"], ["afcon", 2019, "algeria"], ["afcon", 2021, "senegal"], ["afcon", 2023, "ivory_coast"],
  ["asia", 1976, "iran"], ["asia", 1980, "kuwait"], ["asia", 1984, "saudi"], ["asia", 1988, "saudi"], ["asia", 1992, "japan"], ["asia", 1996, "saudi"], ["asia", 2000, "japan"],
  ["asia", 2004, "japan"], ["asia", 2007, "iraq"], ["asia", 2011, "japan"], ["asia", 2015, "australia"], ["asia", 2019, "qatar"], ["asia", 2023, "qatar"],
];
/** Editions played in the following year: [tournament, year] → year played */
export const PLAYED_LATER: Record<string, number> = { "euro-2020": 2021, "afcon-2021": 2022, "afcon-2023": 2024, "asia-2023": 2024 };
/** Wrong-answer pools per tournament */
export const CONT_POOL: Record<string, string[]> = {
  euro: ["spain", "italy", "france", "germany", "west_germany", "netherlands", "portugal", "denmark", "greece", "england", "belgium", "croatia", "sweden", "ussr",
    "russia", "czechoslovakia", "czechia", "yugoslavia", "hungary", "turkey", "poland", "austria"],
  copa: ["brazil", "argentina", "uruguay", "chile", "colombia", "paraguay", "peru", "bolivia", "ecuador", "venezuela"],
  afcon: ["egypt", "cameroon", "ghana", "nigeria", "ivory_coast", "algeria", "senegal", "south_africa", "zambia", "tunisia", "morocco", "mali", "burkina", "guinea"],
  asia: ["japan", "saudi", "iran", "south_korea", "qatar", "australia", "iraq", "kuwait", "china", "uae", "uzbekistan", "north_korea", "jordan", "thailand"],
};

/** Men's European Championship hosts: [year, host key(s)] (2008 and 2020 left out on purpose) */
export const EURO_HOSTS: [number, string[]][] = [
  [1960, ["france"]], [1964, ["spain"]], [1968, ["italy"]], [1972, ["belgium"]], [1976, ["yugoslavia"]], [1980, ["italy"]], [1984, ["france"]],
  [1988, ["west_germany"]], [1992, ["sweden"]], [1996, ["england"]], [2000, ["belgium", "netherlands"]], [2004, ["portugal"]], [2012, ["poland", "ukraine"]],
  [2016, ["france"]], [2024, ["germany"]],
];
export const EURO_HOST_POOL = ["france", "spain", "italy", "belgium", "yugoslavia", "west_germany", "germany", "sweden", "england", "netherlands", "portugal", "poland",
  "ukraine", "denmark", "austria", "hungary", "greece", "czechoslovakia", "czechia", "ussr", "russia", "scotland", "turkey", "romania"];
/** Fake co-host pairs (wrong answers only) */
export const FAKE_PAIRS: string[][] = [["spain", "portugal"], ["denmark", "sweden"], ["austria", "hungary"], ["belgium", "france"], ["czechia", "poland"],
  ["scotland", "ireland"], ["norway", "sweden"], ["croatia", "serbia"], ["romania", "hungary"], ["greece", "turkey"]];

/** FIFA Women's World Cup: [year, winner, host key(s)] */
export const WOMENS_WC: [number, string, string[]][] = [
  [1991, "usa", ["china"]], [1995, "norway", ["sweden"]], [1999, "usa", ["usa"]], [2003, "germany", ["usa"]], [2007, "germany", ["china"]],
  [2011, "japan", ["germany"]], [2015, "usa", ["canada"]], [2019, "usa", ["france"]], [2023, "spain", ["australia", "new_zealand"]],
];
export const WOMENS_POOL = ["usa", "norway", "germany", "japan", "spain", "sweden", "brazil", "china", "england", "netherlands", "france", "canada", "australia"];
export const WOMENS_FAKE_PAIRS: string[][] = [["canada", "usa"], ["spain", "portugal"], ["norway", "sweden"], ["brazil", "argentina"], ["japan", "south_korea"]];

/** Men's Rugby World Cup: [year, winner, host key(s) or null when shared by several countries] */
export const RUGBY_WC: [number, string, string[] | null][] = [
  [1987, "new_zealand", ["new_zealand", "australia"]], [1991, "australia", null], [1995, "south_africa", ["south_africa"]], [1999, "australia", null],
  [2003, "england", ["australia"]], [2007, "south_africa", ["france"]], [2011, "new_zealand", ["new_zealand"]], [2015, "new_zealand", ["england"]],
  [2019, "south_africa", ["japan"]], [2023, "south_africa", ["france"]],
];
export const RUGBY_POOL = ["new_zealand", "australia", "south_africa", "england", "france", "wales", "ireland", "scotland", "argentina", "fiji", "japan", "italy"];
export const RUGBY_FAKE_PAIRS: string[][] = [["england", "france"], ["ireland", "scotland"], ["south_africa", "argentina"], ["wales", "england"], ["japan", "fiji"]];

/** Men's Cricket World Cup winners: [format, year, winner] */
export const CRICKET_WC: ["odi" | "t20", number, string][] = [
  ["odi", 1975, "west_indies"], ["odi", 1979, "west_indies"], ["odi", 1983, "india"], ["odi", 1987, "australia"], ["odi", 1992, "pakistan"], ["odi", 1996, "sri_lanka"],
  ["odi", 1999, "australia"], ["odi", 2003, "australia"], ["odi", 2007, "australia"], ["odi", 2011, "india"], ["odi", 2015, "australia"], ["odi", 2019, "england"],
  ["odi", 2023, "australia"],
  ["t20", 2007, "india"], ["t20", 2009, "pakistan"], ["t20", 2010, "england"], ["t20", 2012, "west_indies"], ["t20", 2014, "sri_lanka"], ["t20", 2016, "west_indies"],
  ["t20", 2021, "australia"], ["t20", 2022, "england"], ["t20", 2024, "india"],
];
export const CRICKET_POOL = ["australia", "india", "england", "west_indies", "pakistan", "sri_lanka", "new_zealand", "south_africa", "bangladesh", "zimbabwe"];

/** "Which of these has won …?" — [tournament label en, es, de (used in the question), winners, never-winners] */
export const CUP_WON: [L, string[], string[]][] = [
  [["Which of these nations has won the men's Rugby World Cup?", "¿Cuál de estas selecciones ha ganado la Copa Mundial de Rugby masculina?", "Welche dieser Nationen hat die Rugby-Weltmeisterschaft der Männer gewonnen?"],
    ["new_zealand", "south_africa", "australia", "england"], ["france", "wales", "ireland", "scotland", "argentina", "fiji", "japan", "italy"]],
  [["Which of these teams has won the men's one-day Cricket World Cup?", "¿Cuál de estas selecciones ha ganado la Copa Mundial masculina de críquet (one-day)?", "Welche dieser Mannschaften hat den One-Day-Cricket-World-Cup der Männer gewonnen?"],
    ["australia", "india", "west_indies", "pakistan", "sri_lanka", "england"], ["new_zealand", "south_africa", "bangladesh", "zimbabwe", "ireland", "afghanistan", "netherlands", "kenya"]],
  [["Which of these countries has won the FIFA Women's World Cup?", "¿Cuál de estos países ha ganado el Mundial femenino de fútbol?", "Welches dieser Länder hat die Fußball-WM der Frauen gewonnen?"],
    ["usa", "norway", "germany", "japan", "spain"], ["brazil", "sweden", "china", "england", "netherlands", "france", "canada", "australia"]],
  [["Which of these countries has won the men's European Football Championship?", "¿Cuál de estos países ha ganado la Eurocopa masculina?", "Welches dieser Länder hat die Fußball-Europameisterschaft der Männer gewonnen?"],
    ["spain", "italy", "france", "germany", "netherlands", "denmark", "greece", "portugal"],
    ["england", "belgium", "croatia", "sweden", "poland", "austria", "turkey", "ukraine", "norway", "wales", "scotland", "hungary", "romania", "ireland"]],
  [["Which of these countries has won the Africa Cup of Nations?", "¿Cuál de estos países ha ganado la Copa Africana de Naciones?", "Welches dieser Länder hat den Afrika-Cup gewonnen?"],
    ["egypt", "cameroon", "ghana", "nigeria", "ivory_coast", "algeria", "senegal", "south_africa", "zambia", "tunisia", "morocco"],
    ["mali", "burkina", "guinea", "cape_verde", "angola", "uganda", "kenya", "gabon"]],
  [["Which of these countries has won the AFC Asian Cup?", "¿Cuál de estos países ha ganado la Copa Asiática?", "Welches dieser Länder hat die Fußball-Asienmeisterschaft gewonnen?"],
    ["japan", "saudi", "iran", "south_korea", "qatar", "australia", "iraq", "kuwait"],
    ["china", "uae", "uzbekistan", "north_korea", "jordan", "thailand", "oman", "syria", "india", "vietnam"]],
  [["Which of these countries has won the Copa América?", "¿Cuál de estos países ha ganado la Copa América?", "Welches dieser Länder hat die Copa América gewonnen?"],
    ["uruguay", "argentina", "brazil", "paraguay", "chile", "peru", "colombia", "bolivia"],
    ["ecuador", "venezuela", "mexico", "usa", "japan", "costa_rica", "jamaica", "qatar"]],
];

/** Head coaches of men's World Cup winners: [year, team key, coach, coaches never offered as wrong (also on that staff)] */
export const WC_COACHES: [number, string, string, string[]?][] = [
  [1930, "uruguay", "Alberto Suppici"], [1934, "italy", "Vittorio Pozzo"], [1938, "italy", "Vittorio Pozzo"], [1950, "uruguay", "Juan López"],
  [1954, "west_germany", "Sepp Herberger"], [1958, "brazil", "Vicente Feola"], [1962, "brazil", "Aymoré Moreira"], [1966, "england", "Alf Ramsey"],
  [1970, "brazil", "Mário Zagallo", ["Carlos Alberto Parreira"]], [1974, "west_germany", "Helmut Schön"], [1978, "argentina", "César Luis Menotti"],
  [1982, "italy", "Enzo Bearzot"], [1986, "argentina", "Carlos Bilardo"], [1990, "west_germany", "Franz Beckenbauer"],
  [1994, "brazil", "Carlos Alberto Parreira", ["Mário Zagallo"]], [1998, "france", "Aimé Jacquet"], [2002, "brazil", "Luiz Felipe Scolari"],
  [2006, "italy", "Marcello Lippi"], [2010, "spain", "Vicente del Bosque"], [2014, "germany", "Joachim Löw"], [2018, "france", "Didier Deschamps"],
  [2022, "argentina", "Lionel Scaloni"],
];
/** [es "de X", de "von X"] for the coach question */
export const TEAM_OF: Record<string, [string, string]> = {
  uruguay: ["de Uruguay", "von Uruguay"], italy: ["de Italia", "von Italien"], west_germany: ["de Alemania Federal", "der Bundesrepublik Deutschland"],
  brazil: ["de Brasil", "von Brasilien"], england: ["de Inglaterra", "von England"], argentina: ["de Argentina", "von Argentinien"], france: ["de Francia", "von Frankreich"],
  spain: ["de España", "von Spanien"], germany: ["de Alemania", "von Deutschland"],
};

// ── cities ──
export const TOWN: Record<string, L> = {
  montevideo: ["Montevideo", "Montevideo", "Montevideo"], rome: ["Rome", "Roma", "Rom"], paris: ["Paris", "París", "Paris"], rio: ["Rio de Janeiro", "Río de Janeiro", "Rio de Janeiro"],
  stockholm: ["Stockholm (Solna)", "Estocolmo (Solna)", "Stockholm (Solna)"], santiago: ["Santiago de Chile", "Santiago de Chile", "Santiago de Chile"],
  london: ["London", "Londres", "London"], mexicocity: ["Mexico City", "Ciudad de México", "Mexiko-Stadt"], munich: ["Munich", "Múnich", "München"],
  buenosaires: ["Buenos Aires", "Buenos Aires", "Buenos Aires"], madrid: ["Madrid", "Madrid", "Madrid"], pasadena: ["Pasadena (Los Angeles)", "Pasadena (Los Ángeles)", "Pasadena (Los Angeles)"],
  saintdenis: ["Saint-Denis (Paris)", "Saint-Denis (París)", "Saint-Denis (Paris)"], yokohama: ["Yokohama", "Yokohama", "Yokohama"], berlin: ["Berlin", "Berlín", "Berlin"],
  johannesburg: ["Johannesburg", "Johannesburgo", "Johannesburg"], moscow: ["Moscow", "Moscú", "Moskau"], lusail: ["Lusail", "Lusail", "Lusail"],
  // other venue cities (wrong answers)
  milan: ["Milan", "Milán", "Mailand"], turin: ["Turin", "Turín", "Turin"], naples: ["Naples", "Nápoles", "Neapel"], florence: ["Florence", "Florencia", "Florenz"],
  bologna: ["Bologna", "Bolonia", "Bologna"], genoa: ["Genoa", "Génova", "Genua"], bari: ["Bari", "Bari", "Bari"], marseille: ["Marseille", "Marsella", "Marseille"],
  bordeaux: ["Bordeaux", "Burdeos", "Bordeaux"], strasbourg: ["Strasbourg", "Estrasburgo", "Straßburg"], lyon: ["Lyon", "Lyon", "Lyon"], lens: ["Lens", "Lens", "Lens"],
  saopaulo: ["São Paulo", "São Paulo", "São Paulo"], belohorizonte: ["Belo Horizonte", "Belo Horizonte", "Belo Horizonte"], portoalegre: ["Porto Alegre", "Porto Alegre", "Porto Alegre"],
  recife: ["Recife", "Recife", "Recife"], brasilia: ["Brasília", "Brasilia", "Brasília"], salvador: ["Salvador da Bahia", "Salvador de Bahía", "Salvador da Bahia"],
  gothenburg: ["Gothenburg", "Gotemburgo", "Göteborg"], malmo: ["Malmö", "Malmö", "Malmö"], helsingborg: ["Helsingborg", "Helsingborg", "Helsingborg"],
  vinadelmar: ["Viña del Mar", "Viña del Mar", "Viña del Mar"], arica: ["Arica", "Arica", "Arica"], rancagua: ["Rancagua", "Rancagua", "Rancagua"],
  manchester: ["Manchester", "Mánchester", "Manchester"], liverpool: ["Liverpool", "Liverpool", "Liverpool"], birmingham: ["Birmingham", "Birmingham", "Birmingham"],
  sheffield: ["Sheffield", "Sheffield", "Sheffield"], guadalajara: ["Guadalajara", "Guadalajara", "Guadalajara"], puebla: ["Puebla", "Puebla", "Puebla"],
  leon: ["León", "León", "León"], monterrey: ["Monterrey", "Monterrey", "Monterrey"], toluca: ["Toluca", "Toluca", "Toluca"], hamburg: ["Hamburg", "Hamburgo", "Hamburg"],
  dortmund: ["Dortmund", "Dortmund", "Dortmund"], frankfurt: ["Frankfurt", "Fráncfort", "Frankfurt"], cordoba: ["Córdoba", "Córdoba", "Córdoba"],
  rosario: ["Rosario", "Rosario", "Rosario"], mendoza: ["Mendoza", "Mendoza", "Mendoza"], mardelplata: ["Mar del Plata", "Mar del Plata", "Mar del Plata"],
  barcelona: ["Barcelona", "Barcelona", "Barcelona"], seville: ["Seville", "Sevilla", "Sevilla"], valencia: ["Valencia", "Valencia", "Valencia"], bilbao: ["Bilbao", "Bilbao", "Bilbao"],
  newyork: ["New York", "Nueva York", "New York"], chicago: ["Chicago", "Chicago", "Chicago"], boston: ["Boston", "Boston", "Boston"], dallas: ["Dallas", "Dallas", "Dallas"],
  sanfrancisco: ["San Francisco", "San Francisco", "San Francisco"], seoul: ["Seoul", "Seúl", "Seoul"], busan: ["Busan", "Busan", "Busan"], osaka: ["Osaka", "Osaka", "Osaka"],
  saitama: ["Saitama", "Saitama", "Saitama"], capetown: ["Cape Town", "Ciudad del Cabo", "Kapstadt"], durban: ["Durban", "Durban", "Durban"], pretoria: ["Pretoria", "Pretoria", "Pretoria"],
  portelizabeth: ["Port Elizabeth", "Port Elizabeth", "Port Elizabeth"], stpetersburg: ["Saint Petersburg", "San Petersburgo", "Sankt Petersburg"], kazan: ["Kazan", "Kazán", "Kasan"],
  sochi: ["Sochi", "Sochi", "Sotschi"], alkhor: ["Al Khor", "Al Khor", "al-Chaur"], alrayyan: ["Al Rayyan", "Al Rayyan", "ar-Rayyan"], alwakrah: ["Al Wakrah", "Al Wakrah", "al-Wakra"],
  glasgow: ["Glasgow", "Glasgow", "Glasgow"], istanbul: ["Istanbul", "Estambul", "Istanbul"], belgrade: ["Belgrade", "Belgrado", "Belgrad"], athens: ["Athens", "Atenas", "Athen"],
  lisbon: ["Lisbon", "Lisboa", "Lissabon"], porto: ["Porto", "Oporto", "Porto"], cairo: ["Cairo", "El Cairo", "Kairo"], zagreb: ["Zagreb", "Zagreb", "Zagreb"],
  lima: ["Lima", "Lima", "Lima"], bogota: ["Bogotá", "Bogotá", "Bogotá"], amsterdam: ["Amsterdam", "Ámsterdam", "Amsterdam"],
};
/** Men's World Cup finals: [year, final city, other cities of that tournament or region (wrong answers)] — 1954 (Bern) left out */
export const WC_FINALS: [number, string, string[]][] = [
  [1930, "montevideo", ["buenosaires", "rio", "santiago", "saopaulo"]], [1934, "rome", ["milan", "turin", "naples", "florence", "bologna", "genoa"]],
  [1938, "paris", ["marseille", "bordeaux", "strasbourg", "lyon"]], [1950, "rio", ["saopaulo", "belohorizonte", "portoalegre", "recife"]],
  [1958, "stockholm", ["gothenburg", "malmo", "helsingborg"]], [1962, "santiago", ["vinadelmar", "arica", "rancagua"]],
  [1966, "london", ["manchester", "liverpool", "birmingham", "sheffield"]], [1970, "mexicocity", ["guadalajara", "puebla", "leon", "toluca"]],
  [1974, "munich", ["berlin", "hamburg", "dortmund", "frankfurt"]], [1978, "buenosaires", ["cordoba", "rosario", "mendoza", "mardelplata"]],
  [1982, "madrid", ["barcelona", "seville", "valencia", "bilbao"]], [1986, "mexicocity", ["guadalajara", "monterrey", "puebla", "toluca"]],
  [1990, "rome", ["milan", "naples", "turin", "bari", "florence"]], [1994, "pasadena", ["newyork", "chicago", "boston", "dallas", "sanfrancisco"]],
  [1998, "saintdenis", ["marseille", "lyon", "bordeaux", "lens"]], [2002, "yokohama", ["seoul", "busan", "osaka", "saitama"]],
  [2006, "berlin", ["munich", "dortmund", "hamburg", "frankfurt"]], [2010, "johannesburg", ["capetown", "durban", "pretoria", "portelizabeth"]],
  [2014, "rio", ["saopaulo", "brasilia", "belohorizonte", "salvador"]], [2018, "moscow", ["stpetersburg", "kazan", "sochi"]],
  [2022, "lusail", ["alkhor", "alrayyan", "alwakrah"]],
];

/** World Cup "firsts": [question en, es, de, answer key, wrong keys] */
export const WC_FIRSTS: [string, string, string, string, string[]][] = [
  ["The first men's World Cup in Asia (2002) was co-hosted by Japan and which other country?", "El primer Mundial masculino en Asia (2002) lo organizaron Japón y ¿qué otro país?",
    "Die erste Männer-WM in Asien (2002) richtete Japan zusammen mit welchem anderen Land aus?", "south_korea", ["china", "north_korea", "saudi", "qatar", "australia", "iran"]],
  ["Which country hosted the first men's World Cup in Africa, in 2010?", "¿Qué país organizó el primer Mundial masculino en África, en 2010?",
    "Welches Land richtete 2010 die erste Männer-WM in Afrika aus?", "south_africa", ["egypt", "morocco", "nigeria", "cameroon", "ghana", "senegal"]],
  ["Which country hosted the first men's World Cup in the Arab world, in 2022?", "¿Qué país organizó el primer Mundial masculino en el mundo árabe, en 2022?",
    "Welches Land richtete 2022 die erste Männer-WM in der arabischen Welt aus?", "qatar", ["saudi", "uae", "egypt", "morocco", "kuwait", "jordan"]],
  ["Which country has played at every men's World Cup?", "¿Qué país ha participado en todos los Mundiales masculinos?",
    "Welches Land hat an jeder Fußball-WM der Männer teilgenommen?", "brazil", ["germany", "italy", "argentina", "spain", "england", "france", "uruguay"]],
  ["Which country was the first to win the men's World Cup twice in a row (1934 and 1938)?", "¿Qué país fue el primero en ganar dos Mundiales masculinos seguidos (1934 y 1938)?",
    "Welches Land gewann als erstes zweimal in Folge die Männer-WM (1934 und 1938)?", "italy", ["uruguay", "france", "germany", "hungary", "england", "spain"]],
  ["Which country was the first to win the men's World Cup five times?", "¿Qué país fue el primero en ganar cinco Mundiales masculinos?",
    "Welches Land gewann als erstes fünfmal die Fußball-WM der Männer?", "brazil", ["germany", "italy", "argentina", "france", "uruguay"]],
  ["Which country became the first African team to reach a men's World Cup semi-final, in 2022?", "¿Qué país fue en 2022 la primera selección africana en llegar a unas semifinales de un Mundial masculino?",
    "Welches Land erreichte 2022 als erste afrikanische Mannschaft ein Halbfinale der Männer-WM?", "morocco", ["senegal", "cameroon", "ghana", "nigeria", "egypt", "tunisia", "algeria"]],
  ["Which country became the first African team to reach a men's World Cup quarter-final, in 1990?", "¿Qué país fue en 1990 la primera selección africana en llegar a unos cuartos de final de un Mundial masculino?",
    "Welches Land erreichte 1990 als erste afrikanische Mannschaft ein Viertelfinale der Männer-WM?", "cameroon", ["senegal", "morocco", "ghana", "nigeria", "egypt", "algeria"]],
  ["Which country became the first Asian team to reach a men's World Cup semi-final, in 2002?", "¿Qué país fue en 2002 la primera selección asiática en llegar a unas semifinales de un Mundial masculino?",
    "Welches Land erreichte 2002 als erste asiatische Mannschaft ein Halbfinale der Männer-WM?", "south_korea", ["japan", "saudi", "iran", "china", "north_korea", "qatar"]],
  ["Which country hosted and won the very first men's World Cup?", "¿Qué país organizó y ganó el primer Mundial masculino de la historia?",
    "Welches Land war Gastgeber und Sieger der allerersten Männer-WM?", "uruguay", ["argentina", "brazil", "italy", "france", "england", "chile"]],
  ["Which country was the first to win a men's World Cup held on another continent (in Sweden, 1958)?", "¿Qué país fue el primero en ganar un Mundial masculino disputado en otro continente (Suecia, 1958)?",
    "Welches Land gewann als erstes eine Männer-WM auf einem anderen Kontinent (Schweden 1958)?", "brazil", ["argentina", "uruguay", "chile", "mexico", "usa"]],
  ["Which country was the first to host the men's World Cup twice (1970 and 1986)?", "¿Qué país fue el primero en organizar dos veces el Mundial masculino (1970 y 1986)?",
    "Welches Land richtete als erstes zweimal die Männer-WM aus (1970 und 1986)?", "mexico", ["italy", "france", "brazil", "argentina", "spain", "usa"]],
  ["Which country lost the men's World Cup finals of 1974, 1978 and 2010?", "¿Qué país perdió las finales de los Mundiales masculinos de 1974, 1978 y 2010?",
    "Welches Land verlor die WM-Endspiele der Männer 1974, 1978 und 2010?", "netherlands", ["hungary", "czechoslovakia", "sweden", "croatia", "belgium", "england"]],
  ["Which European team was the first to win a men's World Cup held in South America (2014)?", "¿Qué selección europea fue la primera en ganar un Mundial masculino disputado en Sudamérica (2014)?",
    "Welche europäische Mannschaft gewann als erste eine Männer-WM in Südamerika (2014)?", "germany", ["spain", "italy", "france", "netherlands", "england", "portugal"]],
];

// ── derbies & rivalries ──
/** [name en, es, de (nominative), city key or null (city in the name / two cities), clubs en, es, de] */
export const DERBIES: [string, string, string, string | null, L][] = [
  ["The Derby della Madonnina", "El Derbi della Madonnina", "Das Derby della Madonnina", "milan", ["AC Milan vs Inter", "AC Milan contra Inter", "AC Mailand gegen Inter Mailand"]],
  ["The Derby della Capitale", "El Derbi della Capitale", "Das Derby della Capitale", "rome", ["AS Roma vs Lazio", "AS Roma contra Lazio", "AS Rom gegen Lazio Rom"]],
  ["The Superclásico", "El Superclásico", "Der Superclásico", "buenosaires", ["Boca Juniors vs River Plate", "Boca Juniors contra River Plate", "Boca Juniors gegen River Plate"]],
  ["The Old Firm", "El Old Firm", "Das Old Firm", "glasgow", ["Celtic vs Rangers", "Celtic contra Rangers", "Celtic gegen die Rangers"]],
  ["The Merseyside derby", "El derbi de Merseyside", "Das Merseyside-Derby", "liverpool", ["Liverpool vs Everton", "Liverpool contra Everton", "FC Liverpool gegen FC Everton"]],
  ["The Intercontinental Derby", "El Derbi Intercontinental", "Das Interkontinentale Derby", "istanbul", ["Galatasaray vs Fenerbahçe", "Galatasaray contra Fenerbahçe", "Galatasaray gegen Fenerbahçe"]],
  ["The Eternal Derby (Večiti derbi)", "El Derbi Eterno (Večiti derbi)", "Das Ewige Derby (Večiti derbi)", "belgrade", ["Red Star vs Partizan", "Estrella Roja contra Partizán", "Roter Stern gegen Partizan"]],
  ["The Derby della Mole", "El Derbi della Mole", "Das Derby della Mole", "turin", ["Juventus vs Torino", "Juventus contra Torino", "Juventus Turin gegen den FC Turin"]],
  ["The Derby della Lanterna", "El Derbi della Lanterna", "Das Derby della Lanterna", "genoa", ["Genoa vs Sampdoria", "Genoa contra Sampdoria", "CFC Genua gegen Sampdoria Genua"]],
  ["The Fla-Flu", "El Fla-Flu", "Der Fla-Flu", "rio", ["Flamengo vs Fluminense", "Flamengo contra Fluminense", "Flamengo gegen Fluminense"]],
  ["The Grenal", "El Grenal", "Der Grenal", "portoalegre", ["Grêmio vs Internacional", "Grêmio contra Internacional", "Grêmio gegen Internacional"]],
  ["The Soweto derby", "El derbi de Soweto", "Das Soweto-Derby", "johannesburg", ["Kaizer Chiefs vs Orlando Pirates", "Kaizer Chiefs contra Orlando Pirates", "Kaizer Chiefs gegen Orlando Pirates"]],
  ["El Gran Derbi", "El Gran Derbi", "Der Gran Derbi", "seville", ["Real Betis vs Sevilla FC", "Real Betis contra Sevilla FC", "Betis Sevilla gegen den FC Sevilla"]],
  ["The Uruguayan Clásico", "El Clásico del fútbol uruguayo", "Der uruguayische Clásico", "montevideo", ["Peñarol vs Nacional", "Peñarol contra Nacional", "Peñarol gegen Nacional"]],
  ["The North London derby", "El derbi del norte de Londres", "Das Nordlondon-Derby", null, ["Arsenal vs Tottenham Hotspur", "Arsenal contra Tottenham Hotspur", "FC Arsenal gegen Tottenham Hotspur"]],
  ["The Lisbon derby", "El derbi lisboeta", "Das Lissabonner Derby", null, ["Benfica vs Sporting CP", "Benfica contra Sporting de Lisboa", "Benfica gegen Sporting"]],
  ["El Clásico", "El Clásico", "Der Clásico", null, ["Real Madrid vs FC Barcelona", "Real Madrid contra FC Barcelona", "Real Madrid gegen den FC Barcelona"]],
  ["The Derby d'Italia", "El Derbi de Italia", "Das Derby d'Italia", null, ["Inter vs Juventus", "Inter contra Juventus", "Inter Mailand gegen Juventus Turin"]],
  ["Le Classique", "Le Classique", "Le Classique", null, ["Paris Saint-Germain vs Olympique de Marseille", "París Saint-Germain contra Olympique de Marsella", "Paris Saint-Germain gegen Olympique Marseille"]],
  ["De Klassieker", "De Klassieker", "De Klassieker", null, ["Ajax vs Feyenoord", "Ajax contra Feyenoord", "Ajax Amsterdam gegen Feyenoord Rotterdam"]],
  ["The Revierderby", "El Revierderby", "Das Revierderby", null, ["Borussia Dortmund vs Schalke 04", "Borussia Dortmund contra Schalke 04", "Borussia Dortmund gegen Schalke 04"]],
  ["The Tyne–Wear derby", "El derbi Tyne-Wear", "Das Tyne-Wear-Derby", null, ["Newcastle United vs Sunderland", "Newcastle United contra Sunderland", "Newcastle United gegen den AFC Sunderland"]],
  ["The Derby of the Eternal Enemies (Greece)", "El Derbi de los Eternos Enemigos (Grecia)", "Das Derby der ewigen Feinde (Griechenland)", null, ["Olympiacos vs Panathinaikos", "Olympiacos contra Panathinaikos", "Olympiakos Piräus gegen Panathinaikos Athen"]],
  ["The Basque derby", "El derbi vasco", "Das baskische Derby", null, ["Athletic Club vs Real Sociedad", "Athletic Club contra Real Sociedad", "Athletic Bilbao gegen Real Sociedad"]],
  ["The Clásico of Mexican football", "El Clásico del fútbol mexicano", "Der Clásico des mexikanischen Fußballs", null, ["Club América vs Guadalajara (Chivas)", "Club América contra Guadalajara (Chivas)", "Club América gegen Guadalajara (Chivas)"]],
];

/** Trophies and contests between two fixed sides: [name en, es, de, sides en/es/de, set key] */
export const CONTESTS: [string, string, string, L, string][] = [
  ["The Ashes (cricket)", "The Ashes (críquet)", "The Ashes (Cricket)", ["England vs Australia", "Inglaterra contra Australia", "England gegen Australien"], "aus+eng"],
  ["The Bledisloe Cup (rugby union)", "La Copa Bledisloe (rugby)", "Der Bledisloe Cup (Rugby Union)", ["New Zealand vs Australia", "Nueva Zelanda contra Australia", "Neuseeland gegen Australien"], "aus+nzl"],
  ["The Calcutta Cup (rugby union)", "La Copa Calcuta (rugby)", "Der Calcutta Cup (Rugby Union)", ["England vs Scotland", "Inglaterra contra Escocia", "England gegen Schottland"], "eng+sco"],
  ["The Ryder Cup (golf)", "La Ryder Cup (golf)", "Der Ryder Cup (Golf)", ["Europe vs United States", "Europa contra Estados Unidos", "Europa gegen die USA"], "eur+usa"],
  ["The Solheim Cup (women's golf)", "La Solheim Cup (golf femenino)", "Der Solheim Cup (Damengolf)", ["Europe vs United States", "Europa contra Estados Unidos", "Europa gegen die USA"], "eur+usa"],
  ["The Presidents Cup (golf)", "La Presidents Cup (golf)", "Der Presidents Cup (Golf)", ["United States vs an International team (without Europe)", "Estados Unidos contra un equipo internacional (sin Europa)", "USA gegen ein internationales Team (ohne Europa)"], "int+usa"],
  ["The Border–Gavaskar Trophy (cricket)", "El Trofeo Border-Gavaskar (críquet)", "Die Border-Gavaskar Trophy (Cricket)", ["India vs Australia", "India contra Australia", "Indien gegen Australien"], "aus+ind"],
  ["State of Origin (rugby league)", "El State of Origin (rugby a 13)", "State of Origin (Rugby League)", ["Queensland vs New South Wales", "Queensland contra Nueva Gales del Sur", "Queensland gegen New South Wales"], "nsw+qld"],
  ["The Boat Race (rowing)", "The Boat Race (remo)", "Das Boat Race (Rudern)", ["Oxford vs Cambridge", "Oxford contra Cambridge", "Oxford gegen Cambridge"], "cam+oxf"],
  ["The Walker Cup (amateur golf)", "La Walker Cup (golf amateur)", "Der Walker Cup (Amateurgolf)", ["United States vs Great Britain & Ireland", "Estados Unidos contra Gran Bretaña e Irlanda", "USA gegen Großbritannien & Irland"], "gbi+usa"],
  ["The Laver Cup (tennis)", "La Laver Cup (tenis)", "Der Laver Cup (Tennis)", ["Team Europe vs Team World", "Equipo Europa contra Equipo Mundo", "Team Europa gegen Team Welt"], "eur+wld"],
  ["The Giuseppe Garibaldi Trophy (rugby union)", "El Trofeo Giuseppe Garibaldi (rugby)", "Die Giuseppe-Garibaldi-Trophäe (Rugby Union)", ["France vs Italy", "Francia contra Italia", "Frankreich gegen Italien"], "fra+ita"],
  ["The Millennium Trophy (rugby union)", "El Trofeo del Milenio (rugby)", "Die Millennium Trophy (Rugby Union)", ["England vs Ireland", "Inglaterra contra Irlanda", "England gegen Irland"], "eng+irl"],
  ["The Centenary Quaich (rugby union)", "El Centenary Quaich (rugby)", "Der Centenary Quaich (Rugby Union)", ["Scotland vs Ireland", "Escocia contra Irlanda", "Schottland gegen Irland"], "irl+sco"],
  ["The Frank Worrell Trophy (cricket)", "El Trofeo Frank Worrell (críquet)", "Die Frank Worrell Trophy (Cricket)", ["Australia vs West Indies", "Australia contra Indias Occidentales", "Australien gegen die West Indies"], "aus+wi"],
  ["The Basil D'Oliveira Trophy (cricket)", "El Trofeo Basil D'Oliveira (críquet)", "Die Basil D'Oliveira Trophy (Cricket)", ["England vs South Africa", "Inglaterra contra Sudáfrica", "England gegen Südafrika"], "eng+rsa"],
  ["The Superclásico de las Américas (football)", "El Superclásico de las Américas (fútbol)", "Der Superclásico de las Américas (Fußball)", ["Brazil vs Argentina", "Brasil contra Argentina", "Brasilien gegen Argentinien"], "arg+bra"],
];

// ── leagues ──
/** Top men's football leagues: [league, nation key, nation keys never offered as wrong, difficulty] */
export const LEAGUES: [string, string, string[], "easy" | "medium" | "hard"][] = [
  ["La Liga", "spain", [], "easy"], ["Serie A", "italy", ["brazil", "ecuador"], "easy"],
  ["Premier League", "england", ["wales", "scotland", "egypt", "ukraine", "russia"], "easy"],
  ["Ligue 1", "france", ["algeria", "ivory_coast", "senegal", "tunisia", "cameroon"], "easy"], ["Bundesliga", "germany", ["austria"], "easy"],
  ["Eredivisie", "netherlands", [], "medium"], ["Primeira Liga", "portugal", ["brazil"], "medium"], ["Liga MX", "mexico", [], "easy"],
  ["Brasileirão", "brazil", ["portugal"], "medium"], ["J1 League", "japan", [], "medium"], ["K League 1", "south_korea", ["north_korea"], "medium"],
  ["Süper Lig", "turkey", [], "medium"], ["Allsvenskan", "sweden", ["norway", "denmark", "finland"], "hard"], ["Eliteserien", "norway", ["sweden", "denmark"], "hard"],
  ["Ekstraklasa", "poland", [], "hard"], ["Major League Soccer (MLS)", "usa", ["canada"], "easy"], ["A-League", "australia", ["new_zealand"], "medium"],
  ["Botola Pro", "morocco", [], "hard"], ["Veikkausliiga", "finland", ["sweden"], "hard"], ["Liga I", "romania", ["peru"], "hard"],
];
export const LEAGUE_POOL = ["spain", "italy", "england", "france", "germany", "netherlands", "portugal", "mexico", "brazil", "japan", "south_korea", "turkey", "sweden",
  "norway", "poland", "usa", "australia", "morocco", "finland", "romania", "belgium", "scotland", "argentina", "greece", "denmark", "austria", "croatia", "egypt", "chile"];
/** [en "in X", es "de X", de "in X"] */
export const NAT_IN: Record<string, [string, string, string]> = {
  spain: ["Spain", "de España", "in Spanien"], italy: ["Italy", "de Italia", "in Italien"], england: ["England", "de Inglaterra", "in England"],
  france: ["France", "de Francia", "in Frankreich"], germany: ["Germany", "de Alemania", "in Deutschland"], netherlands: ["the Netherlands", "de los Países Bajos", "in den Niederlanden"],
  portugal: ["Portugal", "de Portugal", "in Portugal"], mexico: ["Mexico", "de México", "in Mexiko"], brazil: ["Brazil", "de Brasil", "in Brasilien"],
  japan: ["Japan", "de Japón", "in Japan"], south_korea: ["South Korea", "de Corea del Sur", "in Südkorea"], turkey: ["Türkiye", "de Turquía", "in der Türkei"],
  sweden: ["Sweden", "de Suecia", "in Schweden"], norway: ["Norway", "de Noruega", "in Norwegen"], poland: ["Poland", "de Polonia", "in Polen"],
  usa: ["the United States", "de Estados Unidos", "in den USA"], australia: ["Australia", "de Australia", "in Australien"], morocco: ["Morocco", "de Marruecos", "in Marokko"],
  finland: ["Finland", "de Finlandia", "in Finnland"], romania: ["Romania", "de Rumanía", "in Rumänien"],
};

/** Famous coaches → club: [coach, club key, club keys never offered as wrong (also coached there), difficulty] */
export const CLUB: Record<string, L> = {
  manutd: ["Manchester United", "Manchester United", "Manchester United"], arsenal: ["Arsenal", "Arsenal", "FC Arsenal"], liverpool: ["Liverpool", "Liverpool", "FC Liverpool"],
  forest: ["Nottingham Forest", "Nottingham Forest", "Nottingham Forest"], milan: ["AC Milan", "AC Milan", "AC Mailand"], inter: ["Inter Milan", "Inter de Milán", "Inter Mailand"],
  ajax: ["Ajax", "Ajax", "Ajax Amsterdam"], juventus: ["Juventus", "Juventus", "Juventus Turin"], realmadrid: ["Real Madrid", "Real Madrid", "Real Madrid"],
  benfica: ["Benfica", "Benfica", "Benfica Lissabon"], tottenham: ["Tottenham Hotspur", "Tottenham Hotspur", "Tottenham Hotspur"], celtic: ["Celtic", "Celtic", "Celtic Glasgow"],
  bayern: ["Bayern Munich", "Bayern de Múnich", "FC Bayern München"], kyiv: ["Dynamo Kyiv", "Dinamo de Kiev", "Dynamo Kiew"], saopaulo: ["São Paulo FC", "São Paulo FC", "FC São Paulo"],
  boca: ["Boca Juniors", "Boca Juniors", "Boca Juniors"], barcelona: ["FC Barcelona", "FC Barcelona", "FC Barcelona"], chelsea: ["Chelsea", "Chelsea", "FC Chelsea"],
  porto: ["FC Porto", "FC Oporto", "FC Porto"], river: ["River Plate", "River Plate", "River Plate"],
};
export const COACHES: [string, string, string[], "easy" | "medium" | "hard"][] = [
  ["Sir Alex Ferguson", "manutd", [], "easy"], ["Sir Matt Busby", "manutd", [], "hard"], ["Arsène Wenger", "arsenal", [], "easy"], ["Herbert Chapman", "arsenal", [], "hard"],
  ["Bill Shankly", "liverpool", [], "medium"], ["Bob Paisley", "liverpool", [], "hard"], ["Brian Clough", "forest", [], "medium"], ["Arrigo Sacchi", "milan", [], "medium"],
  ["Nereo Rocco", "milan", [], "hard"], ["Helenio Herrera", "inter", ["barcelona"], "hard"], ["Rinus Michels", "ajax", ["barcelona"], "hard"],
  ["Giovanni Trapattoni", "juventus", ["inter", "bayern", "benfica", "milan"], "hard"], ["Miguel Muñoz", "realmadrid", [], "hard"],
  ["Béla Guttmann", "benfica", ["milan", "porto", "saopaulo"], "hard"], ["Bill Nicholson", "tottenham", [], "hard"], ["Jock Stein", "celtic", [], "medium"],
  ["Valeriy Lobanovskyi", "kyiv", [], "medium"], ["Telê Santana", "saopaulo", [], "hard"], ["Carlos Bianchi", "boca", [], "hard"],
  ["Zinedine Zidane", "realmadrid", [], "easy"],
];

// ── traditional sports ──
/** [sport en, es, de (with short gloss in brackets), country id, country ids never offered as wrong] */
export const TRADITIONAL: [string, string, string, string, string[]?][] = [
  ["Buzkashi (a horseback game played with a goat carcass)", "Buzkashi (juego a caballo con el cuerpo de una cabra)", "Buzkaschi (Reiterspiel mit einem Ziegenkadaver)", "afghanistan", ["kazakhstan", "uzbekistan", "pakistan"]],
  ["Pato (a ball game on horseback)", "Pato (juego de pelota a caballo)", "Pato (Ballspiel zu Pferd)", "argentina", ["uruguay"]],
  ["Charrería (an equestrian tradition similar to rodeo)", "Charrería (tradición ecuestre parecida al rodeo)", "Charrería (Reittradition ähnlich dem Rodeo)", "mexico"],
  ["Tejo (throwing metal discs at small gunpowder targets)", "Tejo (lanzar discos de metal contra mechas de pólvora)", "Tejo (Metallscheiben auf kleine Schießpulverziele werfen)", "colombia"],
  ["Calcio storico (historic football)", "Calcio storico (fútbol histórico)", "Calcio storico (historischer Fußball)", "italy"],
  ["Yağlı güreş (oil wrestling)", "Yağlı güreş (lucha en aceite)", "Yağlı güreş (Ölringen)", "turkey", ["greece"]],
  ["Glíma (a traditional style of wrestling)", "Glíma (estilo tradicional de lucha)", "Glíma (traditioneller Ringkampfstil)", "iceland", ["norway", "sweden"]],
  ["Bökh (traditional wrestling)", "Bökh (lucha tradicional)", "Bökh (traditionelles Ringen)", "mongolia", ["china", "kazakhstan"]],
  ["Kho kho (a team game of tag)", "Kho kho (juego de persecución por equipos)", "Kho-Kho (Fangspiel für Mannschaften)", "india", ["pakistan", "bangladesh", "nepal", "sri_lanka"]],
  ["Camogie (the women's version of hurling)", "Camogie (versión femenina del hurling)", "Camogie (Frauenvariante des Hurling)", "ireland", ["uk"]],
  ["Shinty (a stick-and-ball game)", "Shinty (juego de palo y pelota)", "Shinty (Stock-und-Ball-Spiel)", "uk", ["ireland"]],
  ["Fierljeppen (pole vaulting over canals)", "Fierljeppen (saltar canales con pértiga)", "Fierljeppen (Kanalspringen mit dem Stab)", "netherlands", ["belgium"]],
  ["Lucha libre (masked professional wrestling)", "Lucha libre (lucha profesional con máscaras)", "Lucha libre (Wrestling mit Masken)", "mexico"],
  ["Varzesh-e pahlavani (traditional zurkhaneh athletics)", "Varzesh-e pahlavani (deporte tradicional del zurjané)", "Varzesh-e Pahlavani (traditioneller Zurchaneh-Kraftsport)", "iran", ["afghanistan", "iraq"]],
  ["Cuju (an ancient ball-kicking game)", "Cuju (antiguo juego de patear la pelota)", "Cuju (antikes Ballspiel mit dem Fuß)", "china"],
  ["Kemari (an ancient courtly ball game)", "Kemari (antiguo juego cortesano de pelota)", "Kemari (altes höfisches Ballspiel)", "japan"],
  ["Chinlone (a game with a woven cane ball)", "Chinlone (juego con una pelota de caña trenzada)", "Chinlone (Spiel mit einem geflochtenen Rattanball)", "myanmar", ["thailand", "malaysia", "laos"]],
  ["Pesäpallo (a variant of baseball)", "Pesäpallo (variante del béisbol)", "Pesäpallo (eine Baseball-Variante)", "finland"],
  ["Kubb (throwing wooden batons at wooden blocks)", "Kubb (lanzar palos de madera contra bloques de madera)", "Kubb (Wikingerschach)", "sweden", ["norway", "denmark"]],
  ["Lapta (a bat-and-ball game)", "Lapta (juego de bate y pelota)", "Lapta (Schlagballspiel)", "russia", ["ukraine", "belarus"]],
  ["Ssireum (traditional wrestling)", "Ssireum (lucha tradicional)", "Ssireum (traditionelles Ringen)", "south_korea", ["north_korea"]],
  ["Yabusame (archery on horseback)", "Yabusame (tiro con arco a caballo)", "Yabusame (Bogenschießen zu Pferd)", "japan"],
  ["Kurash (traditional wrestling)", "Kurash (lucha tradicional)", "Kurasch (traditionelles Ringen)", "uzbekistan", ["kazakhstan", "turkey"]],
  ["Palín (a traditional stick-and-ball game)", "Palín o chueca (juego tradicional de palos y bola)", "Palín (traditionelles Stock-und-Ball-Spiel)", "chile", ["argentina"]],
];
export const TRAD_POOL = ["afghanistan", "argentina", "mexico", "colombia", "italy", "turkey", "iceland", "mongolia", "india", "ireland", "uk", "netherlands", "iran",
  "china", "japan", "myanmar", "finland", "sweden", "russia", "south_korea", "uzbekistan", "chile", "spain", "france", "brazil", "peru", "greece", "thailand",
  "indonesia", "philippines", "vietnam", "kazakhstan", "pakistan", "egypt", "nigeria", "portugal", "poland", "hungary", "new_zealand", "australia", "canada"];

/** Famous events → host country: [event en, es, de (nominative with article), country id, difficulty] */
export const EVENTS: [string, string, string, string, "easy" | "medium" | "hard"][] = [
  ["the Kentucky Derby", "el Derby de Kentucky", "das Kentucky Derby", "usa", "easy"],
  ["the Melbourne Cup (horse racing)", "la Melbourne Cup (hípica)", "der Melbourne Cup (Pferderennen)", "australia", "easy"],
  ["the Grand National (horse racing)", "el Grand National (hípica)", "das Grand National (Pferderennen)", "uk", "medium"],
  ["the Prix de l'Arc de Triomphe (horse racing)", "el Premio del Arco de Triunfo (hípica)", "der Prix de l'Arc de Triomphe (Pferderennen)", "france", "easy"],
  ["the Epsom Derby", "el Derby de Epsom", "das Epsom Derby", "uk", "medium"],
  ["the Palio di Siena", "el Palio de Siena", "der Palio di Siena", "italy", "medium"],
  ["the Cheltenham Gold Cup", "la Cheltenham Gold Cup", "der Cheltenham Gold Cup", "uk", "hard"],
  ["the Velká pardubická steeplechase", "la Velká pardubická (carrera de obstáculos)", "die Velká pardubická (Hindernisrennen)", "czechia", "hard"],
  ["Paris–Roubaix (cycling)", "la París-Roubaix (ciclismo)", "Paris–Roubaix (Radrennen)", "france", "easy"],
  ["the Tour of Flanders (cycling)", "el Tour de Flandes (ciclismo)", "die Flandern-Rundfahrt (Radrennen)", "belgium", "medium"],
  ["Milan–San Remo (cycling)", "la Milán-San Remo (ciclismo)", "Mailand–Sanremo (Radrennen)", "italy", "easy"],
  ["Liège–Bastogne–Liège (cycling)", "la Lieja-Bastoña-Lieja (ciclismo)", "Lüttich–Bastogne–Lüttich (Radrennen)", "belgium", "medium"],
  ["the Amstel Gold Race (cycling)", "la Amstel Gold Race (ciclismo)", "das Amstel Gold Race (Radrennen)", "netherlands", "hard"],
  ["the Tour Down Under (cycling)", "el Tour Down Under (ciclismo)", "die Tour Down Under (Radrennen)", "australia", "medium"],
  ["the Comrades Marathon", "el maratón Comrades", "der Comrades Marathon", "south_africa", "hard"],
  ["the Vasaloppet cross-country ski race", "la Vasaloppet (carrera de esquí de fondo)", "der Wasalauf (Vasaloppet)", "sweden", "medium"],
  ["the Holmenkollen Ski Festival", "el festival de esquí de Holmenkollen", "das Holmenkollen-Skifestival", "norway", "medium"],
  ["the Iditarod sled dog race", "la Iditarod (carrera de trineos tirados por perros)", "das Iditarod (Schlittenhunderennen)", "usa", "medium"],
  ["the Calgary Stampede rodeo", "el rodeo Calgary Stampede", "die Calgary Stampede (Rodeo)", "canada", "easy"],
  ["the Sydney to Hobart Yacht Race", "la regata Sídney-Hobart", "die Regatta Sydney–Hobart", "australia", "easy"],
  ["the Henley Royal Regatta (rowing)", "la Henley Royal Regatta (remo)", "die Henley Royal Regatta (Rudern)", "uk", "medium"],
  ["the Naadam festival (wrestling, archery and horse racing)", "el festival Naadam (lucha, tiro con arco y carreras de caballos)", "das Naadam-Fest (Ringen, Bogenschießen und Pferderennen)", "mongolia", "medium"],
  ["the Hakone Ekiden relay race", "el Hakone Ekiden (carrera de relevos)", "der Hakone-Ekiden (Staffellauf)", "japan", "hard"],
  ["the Bathurst 1000 touring car race", "la Bathurst 1000 (carrera de turismos)", "das Bathurst 1000 (Tourenwagenrennen)", "australia", "hard"],
  ["the Mille Miglia (classic car race)", "la Mille Miglia (carrera de coches clásicos)", "die Mille Miglia (Oldtimerrennen)", "italy", "medium"],
  ["the Hahnenkamm downhill race", "el descenso del Hahnenkamm", "das Hahnenkammrennen", "austria", "medium"],
  ["the Masters golf tournament", "el Masters de golf", "das Masters (Golfturnier)", "usa", "medium"],
  ["the Bislett Games (athletics)", "los Bislett Games (atletismo)", "die Bislett Games (Leichtathletik)", "norway", "hard"],
  ["the Golden Gala (athletics)", "la Golden Gala (atletismo)", "die Golden Gala (Leichtathletik)", "italy", "hard"],
  ["the Memorial Van Damme (athletics)", "el Memorial Van Damme (atletismo)", "das Memorial Van Damme (Leichtathletik)", "belgium", "hard"],
];
export const EVENT_POOL = ["usa", "uk", "france", "italy", "spain", "australia", "japan", "canada", "belgium", "netherlands", "sweden", "norway", "austria", "south_africa",
  "germany", "czechia", "mongolia", "new_zealand", "ireland", "brazil", "argentina", "portugal", "finland", "denmark", "mexico", "china", "south_korea", "poland", "kenya"];

// ── Olympics ──
/** Olympic Games labels: key → [season, year, en, es, de] */
export const GAMES: Record<string, ["s" | "w", number, string, string, string]> = {
  tokyo1964: ["s", 1964, "Tokyo 1964", "Tokio 1964", "Tokio 1964"], mexico1968: ["s", 1968, "Mexico City 1968", "Ciudad de México 1968", "Mexiko-Stadt 1968"],
  munich1972: ["s", 1972, "Munich 1972", "Múnich 1972", "München 1972"], montreal1976: ["s", 1976, "Montreal 1976", "Montreal 1976", "Montreal 1976"],
  moscow1980: ["s", 1980, "Moscow 1980", "Moscú 1980", "Moskau 1980"], la1984: ["s", 1984, "Los Angeles 1984", "Los Ángeles 1984", "Los Angeles 1984"],
  seoul1988: ["s", 1988, "Seoul 1988", "Seúl 1988", "Seoul 1988"], barcelona1992: ["s", 1992, "Barcelona 1992", "Barcelona 1992", "Barcelona 1992"],
  atlanta1996: ["s", 1996, "Atlanta 1996", "Atlanta 1996", "Atlanta 1996"], sydney2000: ["s", 2000, "Sydney 2000", "Sídney 2000", "Sydney 2000"],
  athens2004: ["s", 2004, "Athens 2004", "Atenas 2004", "Athen 2004"], beijing2008: ["s", 2008, "Beijing 2008", "Pekín 2008", "Peking 2008"],
  london2012: ["s", 2012, "London 2012", "Londres 2012", "London 2012"], rio2016: ["s", 2016, "Rio 2016", "Río 2016", "Rio 2016"],
  tokyo2020: ["s", 2020, "Tokyo 2020", "Tokio 2020", "Tokio 2020"], paris2024: ["s", 2024, "Paris 2024", "París 2024", "Paris 2024"],
  sarajevo1984: ["w", 1984, "Sarajevo 1984", "Sarajevo 1984", "Sarajevo 1984"], calgary1988: ["w", 1988, "Calgary 1988", "Calgary 1988", "Calgary 1988"],
  albertville1992: ["w", 1992, "Albertville 1992", "Albertville 1992", "Albertville 1992"], lillehammer1994: ["w", 1994, "Lillehammer 1994", "Lillehammer 1994", "Lillehammer 1994"],
  nagano1998: ["w", 1998, "Nagano 1998", "Nagano 1998", "Nagano 1998"], saltlake2002: ["w", 2002, "Salt Lake City 2002", "Salt Lake City 2002", "Salt Lake City 2002"],
  turin2006: ["w", 2006, "Turin 2006", "Turín 2006", "Turin 2006"], vancouver2010: ["w", 2010, "Vancouver 2010", "Vancouver 2010", "Vancouver 2010"],
  sochi2014: ["w", 2014, "Sochi 2014", "Sochi 2014", "Sotschi 2014"], pyeongchang2018: ["w", 2018, "PyeongChang 2018", "Pyeongchang 2018", "Pyeongchang 2018"],
  beijing2022: ["w", 2022, "Beijing 2022", "Pekín 2022", "Peking 2022"],
};
/** First Games with medals in: [en "in X", es "de X", de "im/in der X", games key, difficulty] */
export const OLY_DEBUTS: [string, string, string, string, "easy" | "medium" | "hard"][] = [
  ["surfing", "surf", "im Surfen", "tokyo2020", "medium"], ["skateboarding", "skateboarding", "im Skateboarding", "tokyo2020", "medium"],
  ["sport climbing", "escalada deportiva", "im Sportklettern", "tokyo2020", "medium"], ["karate", "kárate", "im Karate", "tokyo2020", "medium"],
  ["3x3 basketball", "baloncesto 3x3", "im 3x3-Basketball", "tokyo2020", "hard"], ["BMX freestyle", "BMX estilo libre", "im BMX Freestyle", "tokyo2020", "hard"],
  ["breaking (breakdance)", "breaking (breakdance)", "im Breaking (Breakdance)", "paris2024", "easy"], ["kitesurfing (kite foiling)", "kitesurf (kitefoil)", "im Kitesurfen (Kitefoil)", "paris2024", "hard"],
  ["BMX racing", "BMX de carreras", "im BMX-Racing", "beijing2008", "hard"], ["the women's 3000 m steeplechase", "3000 m obstáculos femeninos", "im 3000-m-Hindernislauf der Frauen", "beijing2008", "hard"],
  ["triathlon", "triatlón", "im Triathlon", "sydney2000", "medium"], ["taekwondo", "taekwondo", "im Taekwondo", "sydney2000", "hard"],
  ["trampoline", "trampolín", "im Trampolinturnen", "sydney2000", "hard"], ["the women's pole vault", "salto con pértiga femenino", "im Stabhochsprung der Frauen", "sydney2000", "hard"],
  ["women's weightlifting", "halterofilia femenina", "im Gewichtheben der Frauen", "sydney2000", "hard"], ["women's water polo", "waterpolo femenino", "im Wasserball der Frauen", "sydney2000", "hard"],
  ["women's wrestling", "lucha femenina", "im Ringen der Frauen", "athens2004", "hard"], ["beach volleyball", "vóley playa", "im Beachvolleyball", "atlanta1996", "medium"],
  ["mountain biking", "ciclismo de montaña", "im Mountainbiken", "atlanta1996", "hard"], ["women's football", "fútbol femenino", "im Frauenfußball", "atlanta1996", "medium"],
  ["softball", "sóftbol", "im Softball", "atlanta1996", "hard"], ["badminton", "bádminton", "im Badminton", "barcelona1992", "medium"],
  ["baseball", "béisbol", "im Baseball", "barcelona1992", "hard"], ["women's judo", "judo femenino", "im Judo der Frauen", "barcelona1992", "hard"],
  ["table tennis", "tenis de mesa", "im Tischtennis", "seoul1988", "medium"], ["rugby sevens", "rugby a siete", "im Siebener-Rugby", "rio2016", "medium"],
  ["women's boxing", "boxeo femenino", "im Frauenboxen", "london2012", "medium"], ["synchronised swimming", "natación sincronizada", "im Synchronschwimmen", "la1984", "hard"],
  ["rhythmic gymnastics", "gimnasia rítmica", "in der Rhythmischen Sportgymnastik", "la1984", "hard"], ["the women's marathon", "maratón femenino", "im Marathon der Frauen", "la1984", "hard"],
  ["women's basketball", "baloncesto femenino", "im Basketball der Frauen", "montreal1976", "hard"], ["women's handball", "balonmano femenino", "im Handball der Frauen", "montreal1976", "hard"],
  ["judo", "judo", "im Judo", "tokyo1964", "medium"], ["volleyball", "voleibol", "im Volleyball", "tokyo1964", "hard"],
  ["snowboarding", "snowboard", "im Snowboard", "nagano1998", "medium"], ["women's ice hockey", "hockey sobre hielo femenino", "im Eishockey der Frauen", "nagano1998", "hard"],
  ["short track speed skating", "patinaje de velocidad en pista corta", "im Shorttrack", "albertville1992", "hard"], ["freestyle moguls skiing", "esquí de baches (moguls)", "im Buckelpistenfahren", "albertville1992", "hard"],
  ["women's biathlon", "biatlón femenino", "im Biathlon der Frauen", "albertville1992", "hard"], ["freestyle aerials skiing", "saltos de esquí acrobático (aerials)", "im Skispringen der Freestyler (Aerials)", "lillehammer1994", "hard"],
  ["women's bobsleigh", "bobsleigh femenino", "im Bob der Frauen", "saltlake2002", "hard"], ["snowboard cross", "snowboard cross", "im Snowboardcross", "turin2006", "hard"],
  ["ski cross", "skicross", "im Skicross", "vancouver2010", "hard"], ["women's ski jumping", "salto de esquí femenino", "im Skispringen der Frauen", "sochi2014", "medium"],
  ["slopestyle", "slopestyle", "im Slopestyle", "sochi2014", "hard"], ["snowboard big air", "big air de snowboard", "im Big Air (Snowboard)", "pyeongchang2018", "hard"],
  ["mixed doubles curling", "curling dobles mixtos", "im Mixed-Doppel des Curlings", "pyeongchang2018", "hard"], ["women's monobob", "monobob femenino", "im Monobob der Frauen", "beijing2022", "hard"],
];
/** Former Olympic sports (no longer on the programme) vs. sports never on it */
export const OLY_DROPPED: L[] = [
  ["Tug of war", "Tira y afloja (soga-tira)", "Tauziehen"], ["Polo", "Polo", "Polo"], ["Croquet", "Croquet", "Krocket"], ["Jeu de paume", "Jeu de paume", "Jeu de Paume"],
  ["Rackets", "Rackets", "Rackets"], ["Roque", "Roque", "Roque"], ["Motorboat racing", "Motonáutica", "Motorbootsport"], ["Basque pelota", "Pelota vasca", "Baskische Pelota"],
  ["15-a-side rugby union", "Rugby a 15", "Rugby Union (15er-Rugby)"],
];
export const OLY_NEVER: L[] = [
  ["Darts", "Dardos", "Darts"], ["Snooker", "Snooker", "Snooker"], ["Formula 1 racing", "Fórmula 1", "Formel 1"], ["Sumo", "Sumo", "Sumo"], ["Kabaddi", "Kabaddi", "Kabaddi"],
  ["Netball", "Netball", "Netball"], ["Australian rules football", "Fútbol australiano", "Australian Football"], ["Chess", "Ajedrez", "Schach"],
  ["Ultimate frisbee", "Ultimate (frisbee)", "Ultimate Frisbee"], ["Arm wrestling", "Pulso (lucha de brazos)", "Armdrücken"], ["Bodybuilding", "Culturismo", "Bodybuilding"],
  ["Sepak takraw", "Sepak takraw", "Sepak Takraw"], ["Kickboxing", "Kickboxing", "Kickboxen"],
];

// ── where sports take place ──
export const TERRAIN: Record<string, L> = {
  ice: ["On ice", "Sobre hielo", "Auf Eis"], snow: ["On snow", "Sobre nieve", "Auf Schnee"], water: ["On or in water", "En el agua", "Im oder auf dem Wasser"],
  sand: ["On sand", "Sobre arena", "Auf Sand"], air: ["In the air", "En el aire", "In der Luft"],
};
export const TERRAIN_ROWS: [string, string, string, string, "easy" | "medium" | "hard"][] = [
  ["Curling", "Curling", "Curling", "ice", "easy"], ["Bandy", "Bandy", "Bandy", "ice", "hard"], ["Speed skating", "Patinaje de velocidad", "Eisschnelllauf", "ice", "easy"],
  ["Short track", "Short track", "Shorttrack", "ice", "medium"], ["Figure skating", "Patinaje artístico", "Eiskunstlauf", "ice", "easy"], ["Luge", "Luge", "Rodeln", "ice", "medium"],
  ["Skeleton", "Skeleton", "Skeleton", "ice", "medium"], ["Bobsleigh", "Bobsleigh", "Bobsport", "ice", "medium"],
  ["Slalom", "Eslalon", "Slalom", "snow", "easy"], ["Ski jumping", "Salto de esquí", "Skispringen", "snow", "easy"], ["Snowboarding", "Snowboard", "Snowboarden", "snow", "easy"],
  ["Cross-country skiing", "Esquí de fondo", "Skilanglauf", "snow", "easy"], ["Biathlon", "Biatlón", "Biathlon", "snow", "easy"], ["Nordic combined", "Combinada nórdica", "Nordische Kombination", "snow", "medium"],
  ["Ski mountaineering", "Esquí de montaña", "Skibergsteigen", "snow", "medium"], ["Telemark skiing", "Esquí telemark", "Telemarken", "snow", "medium"],
  ["Rowing", "Remo", "Rudern", "water", "easy"], ["Canoe slalom", "Piragüismo en eslalon", "Kanuslalom", "water", "easy"], ["Sailing", "Vela", "Segeln", "water", "easy"],
  ["Surfing", "Surf", "Surfen", "water", "easy"], ["Windsurfing", "Windsurf", "Windsurfen", "water", "easy"], ["Kitesurfing", "Kitesurf", "Kitesurfen", "water", "easy"],
  ["Wakeboarding", "Wakeboard", "Wakeboarden", "water", "medium"], ["Diving", "Saltos (de trampolín y plataforma)", "Wasserspringen", "water", "easy"],
  ["Artistic swimming", "Natación artística", "Synchronschwimmen", "water", "easy"], ["Dragon boat racing", "Barcos dragón", "Drachenbootrennen", "water", "medium"],
  ["Beach volleyball", "Vóley playa", "Beachvolleyball", "sand", "easy"], ["Beach soccer", "Fútbol playa", "Beachsoccer", "sand", "easy"],
  ["Beach handball", "Balonmano playa", "Beachhandball", "sand", "easy"], ["Sandboarding", "Sandboard", "Sandboarden", "sand", "medium"],
  ["Skydiving", "Paracaidismo", "Fallschirmspringen", "air", "easy"], ["Paragliding", "Parapente", "Gleitschirmfliegen", "air", "easy"],
  ["Hang gliding", "Ala delta", "Drachenfliegen", "air", "medium"], ["Gliding", "Vuelo sin motor (planeador)", "Segelfliegen", "air", "medium"],
  ["Wingsuit flying", "Vuelo con traje de alas (wingsuit)", "Wingsuit-Fliegen", "air", "medium"], ["Aerobatics", "Acrobacia aérea", "Kunstflug", "air", "medium"],
];
export const NO_BALL: L[] = [
  ["Badminton", "Bádminton", "Badminton"], ["Ice hockey", "Hockey sobre hielo", "Eishockey"], ["Curling", "Curling", "Curling"], ["Ultimate frisbee", "Ultimate (frisbee)", "Ultimate Frisbee"],
  ["Darts", "Dardos", "Darts"], ["Kabaddi", "Kabaddi", "Kabaddi"], ["Tug of war", "Tira y afloja (soga-tira)", "Tauziehen"], ["Fencing", "Esgrima", "Fechten"],
];
export const WITH_BALL: L[] = [
  ["Bandy", "Bandy", "Bandy"], ["Field hockey", "Hockey sobre hierba", "Feldhockey"], ["Lacrosse", "Lacrosse", "Lacrosse"], ["Hurling", "Hurling", "Hurling"],
  ["Polo", "Polo", "Polo"], ["Croquet", "Croquet", "Krocket"], ["Water polo", "Waterpolo", "Wasserball"], ["Sepak takraw", "Sepak takraw", "Sepak Takraw"],
  ["Handball", "Balonmano", "Handball"], ["Cricket", "Críquet", "Cricket"], ["Squash", "Squash", "Squash"], ["Table tennis", "Tenis de mesa", "Tischtennis"],
  ["Baseball", "Béisbol", "Baseball"], ["Netball", "Netball", "Netball"], ["Golf", "Golf", "Golf"], ["Snooker", "Snooker", "Snooker"], ["Ten-pin bowling", "Bolos (bowling)", "Bowling"],
];
export const RACKET: L[] = [["Tennis", "Tenis", "Tennis"], ["Badminton", "Bádminton", "Badminton"], ["Squash", "Squash", "Squash"], ["Racquetball", "Ráquetbol", "Racquetball"], ["Real tennis", "Real tennis (tenis real)", "Real Tennis"]];
export const NO_RACKET: L[] = [
  ["Golf", "Golf", "Golf"], ["Cricket", "Críquet", "Cricket"], ["Baseball", "Béisbol", "Baseball"], ["Field hockey", "Hockey sobre hierba", "Feldhockey"], ["Polo", "Polo", "Polo"],
  ["Croquet", "Croquet", "Krocket"], ["Hurling", "Hurling", "Hurling"], ["Ice hockey", "Hockey sobre hielo", "Eishockey"], ["Lacrosse", "Lacrosse", "Lacrosse"],
  ["Fencing", "Esgrima", "Fechten"], ["Curling", "Curling", "Curling"], ["Billiards", "Billar", "Billard"], ["Softball", "Sóftbol", "Softball"],
];

// ── North American teams ──
export const NA_SPORT: Record<string, L> = {
  amfootball: ["American football", "Fútbol americano", "American Football"], baseball: ["Baseball", "Béisbol", "Baseball"], basketball: ["Basketball", "Baloncesto", "Basketball"],
  icehockey: ["Ice hockey", "Hockey sobre hielo", "Eishockey"], soccer: ["Football (soccer)", "Fútbol", "Fußball"],
};
/** [team, sport key, difficulty] */
export const NA_TEAMS: [string, string, "easy" | "medium" | "hard"][] = [
  ["Green Bay Packers", "amfootball", "easy"], ["Pittsburgh Steelers", "amfootball", "medium"], ["Dallas Cowboys", "amfootball", "easy"], ["San Francisco 49ers", "amfootball", "medium"],
  ["New England Patriots", "amfootball", "easy"], ["Chicago Bears", "amfootball", "medium"], ["Miami Dolphins", "amfootball", "medium"], ["Denver Broncos", "amfootball", "medium"],
  ["Seattle Seahawks", "amfootball", "medium"], ["Kansas City Chiefs", "amfootball", "medium"], ["Philadelphia Eagles", "amfootball", "medium"], ["Baltimore Ravens", "amfootball", "hard"],
  ["New Orleans Saints", "amfootball", "hard"], ["Buffalo Bills", "amfootball", "hard"], ["Minnesota Vikings", "amfootball", "hard"], ["New York Giants", "amfootball", "hard"],
  ["New York Yankees", "baseball", "easy"], ["Boston Red Sox", "baseball", "easy"], ["Chicago Cubs", "baseball", "medium"], ["Los Angeles Dodgers", "baseball", "medium"],
  ["San Francisco Giants", "baseball", "hard"], ["St. Louis Cardinals", "baseball", "hard"], ["Houston Astros", "baseball", "medium"], ["Atlanta Braves", "baseball", "hard"],
  ["Detroit Tigers", "baseball", "hard"], ["Seattle Mariners", "baseball", "hard"], ["Toronto Blue Jays", "baseball", "medium"], ["New York Mets", "baseball", "medium"],
  ["Baltimore Orioles", "baseball", "hard"], ["Philadelphia Phillies", "baseball", "hard"], ["Pittsburgh Pirates", "baseball", "hard"],
  ["Los Angeles Lakers", "basketball", "easy"], ["Boston Celtics", "basketball", "easy"], ["Chicago Bulls", "basketball", "easy"], ["Golden State Warriors", "basketball", "medium"],
  ["Miami Heat", "basketball", "medium"], ["San Antonio Spurs", "basketball", "medium"], ["New York Knicks", "basketball", "medium"], ["Toronto Raptors", "basketball", "medium"],
  ["Montreal Canadiens", "icehockey", "medium"], ["Toronto Maple Leafs", "icehockey", "medium"], ["Detroit Red Wings", "icehockey", "medium"], ["Boston Bruins", "icehockey", "medium"],
  ["Chicago Blackhawks", "icehockey", "hard"], ["New York Rangers", "icehockey", "hard"], ["Edmonton Oilers", "icehockey", "medium"], ["Pittsburgh Penguins", "icehockey", "medium"],
  ["Philadelphia Flyers", "icehockey", "hard"], ["Calgary Flames", "icehockey", "hard"], ["Vancouver Canucks", "icehockey", "hard"], ["Colorado Avalanche", "icehockey", "hard"],
];
export const ORIGINAL_SIX = ["Boston Bruins", "Chicago Blackhawks", "Detroit Red Wings", "Montreal Canadiens", "New York Rangers", "Toronto Maple Leafs"];
export const NOT_ORIGINAL_SIX = ["Pittsburgh Penguins", "Edmonton Oilers", "Philadelphia Flyers", "Los Angeles Kings", "Calgary Flames", "Vancouver Canucks", "Dallas Stars",
  "Colorado Avalanche", "Tampa Bay Lightning", "New York Islanders", "Washington Capitals", "St. Louis Blues", "Buffalo Sabres"];

// ── champions & records of retired stars ──
export const MOTOGP_CHAMPIONS = ["Giacomo Agostini", "Valentino Rossi", "Marc Márquez", "Jorge Lorenzo", "Casey Stoner", "Mick Doohan", "Wayne Rainey", "Kevin Schwantz",
  "Eddie Lawson", "Freddie Spencer", "Kenny Roberts", "Barry Sheene", "Nicky Hayden", "Wayne Gardner", "Àlex Crivillé", "Joan Mir", "Fabio Quartararo", "Francesco Bagnaia",
  "Jorge Martín", "Kenny Roberts Jr.", "Mike Hailwood", "Geoff Duke", "Phil Read"];
export const MOTOGP_NON_CHAMPIONS = ["Dani Pedrosa", "Max Biaggi", "Loris Capirossi", "Sete Gibernau", "Marco Simoncelli", "Andrea Dovizioso", "Colin Edwards", "Cal Crutchlow",
  "Carlos Checa", "Alex Barros", "Randy Mamola", "Troy Bayliss", "Carl Fogarty", "Toni Elías", "Marco Melandri"];
/** Retired F1 drivers' world titles */
export const F1_TITLES: [string, number][] = [
  ["Michael Schumacher", 7], ["Juan Manuel Fangio", 5], ["Alain Prost", 4], ["Sebastian Vettel", 4], ["Ayrton Senna", 3], ["Niki Lauda", 3], ["Jackie Stewart", 3],
  ["Nelson Piquet", 3], ["Jack Brabham", 3], ["Jim Clark", 2], ["Alberto Ascari", 2], ["Mika Häkkinen", 2], ["Emerson Fittipaldi", 2], ["Graham Hill", 2],
  ["James Hunt", 1], ["Nigel Mansell", 1], ["Damon Hill", 1], ["Jacques Villeneuve", 1], ["Nico Rosberg", 1], ["Kimi Räikkönen", 1], ["Jenson Button", 1],
  ["Jochen Rindt", 1], ["Jody Scheckter", 1], ["Alan Jones", 1], ["Mario Andretti", 1], ["Keke Rosberg", 1], ["John Surtees", 1], ["Denny Hulme", 1], ["Mike Hawthorn", 1],
];
/** Retired players' Grand Slam singles titles */
export const SLAM_TITLES: [string, number][] = [
  ["Rafael Nadal", 22], ["Roger Federer", 20], ["Pete Sampras", 14], ["Roy Emerson", 12], ["Björn Borg", 11], ["Rod Laver", 11], ["Bill Tilden", 10],
  ["Jimmy Connors", 8], ["Ivan Lendl", 8], ["Andre Agassi", 8], ["Ken Rosewall", 8], ["Fred Perry", 8], ["John McEnroe", 7], ["Mats Wilander", 7],
  ["Boris Becker", 6], ["Stefan Edberg", 6], ["Jim Courier", 4], ["Guillermo Vilas", 4], ["Andy Murray", 3], ["Gustavo Kuerten", 3], ["Arthur Ashe", 3],
  ["Lleyton Hewitt", 2], ["Marat Safin", 2], ["Patrick Rafter", 2], ["Yevgeny Kafelnikov", 2], ["Andy Roddick", 1], ["Juan Martín del Potro", 1], ["Goran Ivanišević", 1], ["Michael Chang", 1],
  ["Margaret Court", 24], ["Serena Williams", 23], ["Steffi Graf", 22], ["Helen Wills Moody", 19], ["Chris Evert", 18], ["Martina Navratilova", 18], ["Billie Jean King", 12],
  ["Monica Seles", 9], ["Justine Henin", 7], ["Evonne Goolagong", 7], ["Maria Sharapova", 5], ["Kim Clijsters", 4], ["Arantxa Sánchez Vicario", 4], ["Ashleigh Barty", 3],
  ["Lindsay Davenport", 3], ["Jennifer Capriati", 3], ["Li Na", 2], ["Amélie Mauresmo", 2], ["Mary Pierce", 2], ["Gabriela Sabatini", 1], ["Ana Ivanović", 1],
  ["Francesca Schiavone", 1], ["Marion Bartoli", 1],
];

// ── rules & terms ──
/** Boxing weight classes, light → heavy */
export const WEIGHT_CLASSES: [string, string, string, number][] = [
  ["Minimumweight (strawweight)", "Peso mínimo", "Minimumgewicht (Strohgewicht)", 1], ["Flyweight", "Peso mosca", "Fliegengewicht", 2], ["Bantamweight", "Peso gallo", "Bantamgewicht", 3],
  ["Featherweight", "Peso pluma", "Federgewicht", 4], ["Lightweight", "Peso ligero", "Leichtgewicht", 5], ["Welterweight", "Peso wélter", "Weltergewicht", 6],
  ["Middleweight", "Peso medio", "Mittelgewicht", 7], ["Light heavyweight", "Peso semipesado", "Halbschwergewicht", 8], ["Cruiserweight", "Peso crucero", "Cruisergewicht", 9],
  ["Heavyweight", "Peso pesado", "Schwergewicht", 10],
];
/** Golf scores on a hole: [name en, es, de, strokes relative to par, difficulty] */
export const GOLF_SCORES: [string, string, string, number, "easy" | "medium" | "hard"][] = [
  ["Condor", "Cóndor", "Condor", -4, "hard"], ["Albatross", "Albatros", "Albatros", -3, "medium"], ["Eagle", "Eagle (águila)", "Eagle", -2, "medium"],
  ["Birdie", "Birdie", "Birdie", -1, "easy"], ["Par", "Par", "Par", 0, "easy"], ["Bogey", "Bogey", "Bogey", 1, "easy"], ["Double bogey", "Doble bogey", "Doppelbogey", 2, "easy"],
  ["Triple bogey", "Triple bogey", "Triplebogey", 3, "medium"],
];
/** "Which of these is one of …?" groups: [question, yes, no] */
export const BIG_EVENTS: [L, L[], L[]][] = [
  [["Which of these is one of golf's four men's major championships?", "¿Cuál de estos es uno de los cuatro grandes (majors) del golf masculino?", "Welches dieser Turniere ist eines der vier Major-Turniere im Herrengolf?"],
    [["The Masters", "El Masters de Augusta", "Das Masters"], ["US Open (golf)", "US Open de golf", "US Open (Golf)"], ["The Open Championship", "The Open Championship (Abierto Británico)", "The Open Championship"], ["PGA Championship", "Campeonato de la PGA", "PGA Championship"]],
    [["Ryder Cup", "Ryder Cup", "Ryder Cup"], ["The Players Championship", "The Players Championship", "The Players Championship"], ["Presidents Cup", "Presidents Cup", "Presidents Cup"],
      ["Tour Championship", "Tour Championship", "Tour Championship"], ["Dubai Desert Classic", "Dubai Desert Classic", "Dubai Desert Classic"], ["Solheim Cup", "Solheim Cup", "Solheim Cup"],
      ["Scottish Open", "Abierto de Escocia", "Scottish Open"]]],
  [["Which of these tennis tournaments is a Grand Slam?", "¿Cuál de estos torneos de tenis es un Grand Slam?", "Welches dieser Tennisturniere ist ein Grand-Slam-Turnier?"],
    [["Australian Open", "Open de Australia", "Australian Open"], ["French Open (Roland Garros)", "Roland Garros", "French Open (Roland Garros)"], ["Wimbledon", "Wimbledon", "Wimbledon"], ["US Open", "US Open", "US Open"]],
    [["Indian Wells Masters", "Masters de Indian Wells", "Indian Wells Masters"], ["Miami Open", "Masters de Miami", "Miami Open"], ["Monte-Carlo Masters", "Masters de Montecarlo", "Monte-Carlo Masters"],
      ["Madrid Open", "Masters de Madrid", "Madrid Open"], ["Italian Open (Rome)", "Masters de Roma", "Italian Open (Rom)"], ["ATP Finals", "ATP Finals", "ATP Finals"],
      ["Davis Cup", "Copa Davis", "Davis Cup"], ["Queen's Club Championships", "Torneo de Queen's", "Queen's Club Championships"], ["Canadian Open", "Masters de Canadá", "Canadian Open"],
      ["Cincinnati Open", "Masters de Cincinnati", "Cincinnati Open"]]],
  [["Which of these races is one of cycling's three Grand Tours?", "¿Cuál de estas carreras es una de las tres grandes vueltas del ciclismo?", "Welches dieser Rennen ist eine der drei großen Landesrundfahrten (Grand Tours) im Radsport?"],
    [["Tour de France", "Tour de Francia", "Tour de France"], ["Giro d'Italia", "Giro de Italia", "Giro d'Italia"], ["Vuelta a España", "Vuelta a España", "Vuelta a España"]],
    [["Paris–Roubaix", "París-Roubaix", "Paris–Roubaix"], ["Tour of Flanders", "Tour de Flandes", "Flandern-Rundfahrt"], ["Milan–San Remo", "Milán-San Remo", "Mailand–Sanremo"],
      ["Liège–Bastogne–Liège", "Lieja-Bastoña-Lieja", "Lüttich–Bastogne–Lüttich"], ["Il Lombardia", "Giro de Lombardía", "Lombardei-Rundfahrt"], ["Critérium du Dauphiné", "Critérium del Dauphiné", "Critérium du Dauphiné"],
      ["Paris–Nice", "París-Niza", "Paris–Nizza"], ["Tirreno–Adriatico", "Tirreno-Adriático", "Tirreno–Adriatico"], ["Volta a Catalunya", "Volta a Cataluña", "Katalonien-Rundfahrt"]]],
  [["Which of these one-day races is one of cycling's five “Monuments”?", "¿Cuál de estas clásicas de un día es uno de los cinco «monumentos» del ciclismo?", "Welches dieser Eintagesrennen gehört zu den fünf „Monumenten“ des Radsports?"],
    [["Milan–San Remo", "Milán-San Remo", "Mailand–Sanremo"], ["Tour of Flanders", "Tour de Flandes", "Flandern-Rundfahrt"], ["Paris–Roubaix", "París-Roubaix", "Paris–Roubaix"],
      ["Liège–Bastogne–Liège", "Lieja-Bastoña-Lieja", "Lüttich–Bastogne–Lüttich"], ["Il Lombardia", "Giro de Lombardía", "Lombardei-Rundfahrt"]],
    [["Amstel Gold Race", "Amstel Gold Race", "Amstel Gold Race"], ["Gent–Wevelgem", "Gante-Wevelgem", "Gent–Wevelgem"], ["La Flèche Wallonne", "Flecha Valona", "Flèche Wallonne"],
      ["Strade Bianche", "Strade Bianche", "Strade Bianche"], ["Omloop Het Nieuwsblad", "Omloop Het Nieuwsblad", "Omloop Het Nieuwsblad"], ["Clásica de San Sebastián", "Clásica de San Sebastián", "Clásica San Sebastián"],
      ["Paris–Tours", "París-Tours", "Paris–Tours"]]],
  [["Which of these cities hosts one of the World Marathon Majors?", "¿Cuál de estas ciudades acoge uno de los World Marathon Majors?", "In welcher dieser Städte findet einer der World Marathon Majors statt?"],
    [["Tokyo", "Tokio", "Tokio"], ["Boston", "Boston", "Boston"], ["London", "Londres", "London"], ["Berlin", "Berlín", "Berlin"], ["Chicago", "Chicago", "Chicago"], ["New York", "Nueva York", "New York"]],
    [["Paris", "París", "Paris"], ["Rome", "Roma", "Rom"], ["Madrid", "Madrid", "Madrid"], ["Amsterdam", "Ámsterdam", "Amsterdam"], ["Barcelona", "Barcelona", "Barcelona"], ["Vienna", "Viena", "Wien"],
      ["Los Angeles", "Los Ángeles", "Los Angeles"], ["Honolulu", "Honolulu", "Honolulu"], ["Valencia", "Valencia", "Valencia"], ["Rotterdam", "Róterdam", "Rotterdam"], ["Athens", "Atenas", "Athen"]]],
  [["Which of these races is part of the American Triple Crown of horse racing?", "¿Cuál de estas carreras forma parte de la Triple Corona estadounidense de hípica?", "Welches dieser Rennen gehört zur amerikanischen Triple Crown im Galopprennsport?"],
    [["Kentucky Derby", "Derby de Kentucky", "Kentucky Derby"], ["Preakness Stakes", "Preakness Stakes", "Preakness Stakes"], ["Belmont Stakes", "Belmont Stakes", "Belmont Stakes"]],
    [["Breeders' Cup Classic", "Breeders' Cup Classic", "Breeders' Cup Classic"], ["Dubai World Cup", "Dubai World Cup", "Dubai World Cup"], ["Melbourne Cup", "Melbourne Cup", "Melbourne Cup"],
      ["Grand National", "Grand National", "Grand National"], ["Epsom Derby", "Derby de Epsom", "Epsom Derby"], ["Prix de l'Arc de Triomphe", "Premio del Arco de Triunfo", "Prix de l'Arc de Triomphe"],
      ["Pegasus World Cup", "Pegasus World Cup", "Pegasus World Cup"], ["Travers Stakes", "Travers Stakes", "Travers Stakes"]]],
  [["Which of these races is part of the “Triple Crown of Motorsport”?", "¿Cuál de estas carreras forma parte de la «Triple Corona del automovilismo»?", "Welches dieser Rennen gehört zur „Triple Crown des Motorsports“?"],
    [["Monaco Grand Prix", "Gran Premio de Mónaco", "Großer Preis von Monaco"], ["Indianapolis 500", "500 Millas de Indianápolis", "Indianapolis 500"], ["24 Hours of Le Mans", "24 Horas de Le Mans", "24 Stunden von Le Mans"]],
    [["Daytona 500", "500 Millas de Daytona", "Daytona 500"], ["Bathurst 1000", "Bathurst 1000", "Bathurst 1000"], ["British Grand Prix", "Gran Premio de Gran Bretaña", "Großer Preis von Großbritannien"],
      ["Dakar Rally", "Rally Dakar", "Rallye Dakar"], ["Italian Grand Prix", "Gran Premio de Italia", "Großer Preis von Italien"], ["Macau Grand Prix", "Gran Premio de Macao", "Großer Preis von Macau"],
      ["Pikes Peak hill climb", "Subida a Pikes Peak", "Pikes-Peak-Bergrennen"]]],
];

/** Player positions: [position en, es, de, sport key, sport keys never offered as wrong] */
export const POS_SPORT: Record<string, L> = {
  basketball: ["Basketball", "Baloncesto", "Basketball"], baseball: ["Baseball", "Béisbol", "Baseball"], cricket: ["Cricket", "Críquet", "Cricket"],
  rugby: ["Rugby union", "Rugby", "Rugby Union"], volleyball: ["Volleyball", "Voleibol", "Volleyball"], amfootball: ["American football", "Fútbol americano", "American Football"],
  netball: ["Netball", "Netball", "Netball"], rowing: ["Rowing", "Remo", "Rudern"], cycling: ["Road cycling", "Ciclismo en ruta", "Straßenradsport"],
  curling: ["Curling", "Curling", "Curling"], football: ["Football (soccer)", "Fútbol", "Fußball"], handball: ["Handball", "Balonmano", "Handball"],
  icehockey: ["Ice hockey", "Hockey sobre hielo", "Eishockey"],
};
export const POSITIONS: [string, string, string, string, string[]?][] = [
  ["point guard", "base (point guard)", "Point Guard (Aufbauspieler)", "basketball"], ["power forward", "ala-pívot", "Power Forward", "basketball"],
  ["shortstop", "campocorto (shortstop)", "Shortstop", "baseball"], ["catcher", "receptor (catcher)", "Catcher (Fänger)", "baseball"],
  ["designated hitter", "bateador designado", "Designated Hitter", "baseball"], ["wicketkeeper", "wicketkeeper (guardapalos)", "Wicketkeeper", "cricket"],
  ["hooker", "talonador (hooker)", "Hakler (Hooker)", "rugby"], ["fly-half", "apertura", "Verbinder (Fly-half)", "rugby"],
  ["scrum-half", "medio melé", "Gedrängehalb (Scrum-half)", "rugby"], ["number eight", "número ocho", "Nummer acht", "rugby"],
  ["prop", "pilier", "Pfeiler (Prop)", "rugby"], ["libero", "líbero", "Libero", "volleyball", ["football"]],
  ["outside hitter", "receptor-atacante", "Außenangreifer", "volleyball"], ["linebacker", "linebacker", "Linebacker", "amfootball"],
  ["wide receiver", "receptor abierto (wide receiver)", "Wide Receiver", "amfootball"], ["tight end", "ala cerrada (tight end)", "Tight End", "amfootball"],
  ["running back", "corredor (running back)", "Runningback", "amfootball"], ["goal shooter", "goal shooter", "Goal Shooter", "netball"],
  ["wing attack", "wing attack", "Wing Attack", "netball"], ["coxswain (cox)", "timonel", "Steuermann", "rowing"],
  ["domestique", "gregario", "Domestik (Wasserträger)", "cycling"], ["skip (team captain)", "skip (capitán)", "Skip", "curling"],
  ["centre-back", "defensa central", "Innenverteidiger", "football", ["handball"]], ["pivot (line player)", "pivote (de balonmano)", "Kreisläufer", "handball", ["basketball", "football"]],
  ["sweeper", "líbero (barredor)", "Ausputzer", "football", ["volleyball", "curling"]],
];

/** International federations: [acronym, sport label en, es, de, difficulty] */
export const FEDERATIONS: [string, string, string, string, "easy" | "medium" | "hard"][] = [
  ["FIFA", "Football (soccer)", "Fútbol", "Fußball", "easy"], ["FIBA", "Basketball", "Baloncesto", "Basketball", "medium"], ["FIVB", "Volleyball", "Voleibol", "Volleyball", "medium"],
  ["UCI", "Cycling", "Ciclismo", "Radsport", "medium"], ["FIS", "Skiing and snowboarding", "Esquí y snowboard", "Ski und Snowboard", "medium"],
  ["FEI", "Equestrian sport", "Hípica", "Pferdesport", "hard"], ["ITTF", "Table tennis", "Tenis de mesa", "Tischtennis", "medium"], ["IHF", "Handball", "Balonmano", "Handball", "hard"],
  ["IIHF", "Ice hockey", "Hockey sobre hielo", "Eishockey", "medium"], ["FIH", "Field hockey", "Hockey sobre hierba", "Feldhockey", "hard"], ["FIDE", "Chess", "Ajedrez", "Schach", "medium"],
  ["FIA", "Motor racing", "Automovilismo", "Automobilsport", "medium"], ["ICC", "Cricket", "Críquet", "Cricket", "medium"], ["BWF", "Badminton", "Bádminton", "Badminton", "hard"],
  ["FIG", "Gymnastics", "Gimnasia", "Turnen", "hard"], ["IJF", "Judo", "Judo", "Judo", "medium"], ["ISU", "Ice skating", "Patinaje sobre hielo", "Eislauf", "hard"],
  ["IBU", "Biathlon", "Biatlón", "Biathlon", "hard"], ["FIE", "Fencing", "Esgrima", "Fechten", "hard"], ["IWF", "Weightlifting", "Halterofilia", "Gewichtheben", "hard"],
  ["IFSC", "Sport climbing", "Escalada deportiva", "Sportklettern", "hard"], ["IBSF", "Bobsleigh and skeleton", "Bobsleigh y skeleton", "Bob und Skeleton", "hard"],
  ["FIL", "Luge", "Luge", "Rodeln", "hard"], ["FIM", "Motorcycle racing", "Motociclismo", "Motorradsport", "hard"], ["ISA", "Surfing", "Surf", "Wellenreiten (Surfen)", "hard"],
];

/** Approximate ball diameters in cm (only compared when clearly different) */
export const BALLS: [string, string, string, number][] = [
  ["A basketball", "Un balón de baloncesto", "Ein Basketball", 24.3], ["A football (soccer ball)", "Un balón de fútbol", "Ein Fußball", 22.0],
  ["A volleyball", "Un balón de voleibol", "Ein Volleyball", 21.0], ["A handball", "Un balón de balonmano", "Ein Handball", 18.8],
  ["A ten-pin bowling ball", "Una bola de bolos (bowling)", "Eine Bowlingkugel", 21.6], ["A softball", "Una pelota de sóftbol", "Ein Softball", 9.7],
  ["A croquet ball", "Una bola de croquet", "Eine Krocketkugel", 9.2], ["A baseball", "Una pelota de béisbol", "Ein Baseball", 7.4],
  ["A cricket ball", "Una pelota de críquet", "Ein Cricketball", 7.2], ["A tennis ball", "Una pelota de tenis", "Ein Tennisball", 6.7],
  ["A lacrosse ball", "Una pelota de lacrosse", "Ein Lacrosseball", 6.3], ["A pool (billiard) ball", "Una bola de billar americano", "Eine Poolbillardkugel", 5.7],
  ["A snooker ball", "Una bola de snooker", "Eine Snookerkugel", 5.25], ["A golf ball", "Una pelota de golf", "Ein Golfball", 4.27],
  ["A table tennis ball", "Una pelota de tenis de mesa", "Ein Tischtennisball", 4.0], ["A squash ball", "Una pelota de squash", "Ein Squashball", 4.0],
];

/** Motor-racing flags: [flag en, es, de, meaning en, es, de] */
export const FLAGS: [string, string, string, string, string, string][] = [
  ["chequered", "a cuadros", "schwarz-weiß karierte", "The race is over", "Fin de la carrera", "Das Rennen ist beendet"],
  ["yellow", "amarilla", "gelbe", "Danger ahead: slow down, no overtaking", "Peligro: reducir la velocidad, prohibido adelantar", "Gefahr: langsamer fahren, Überholverbot"],
  ["red", "roja", "rote", "The session is stopped", "La sesión se detiene", "Die Session wird unterbrochen"],
  ["blue", "azul", "blaue", "Let a faster car that is lapping you pass", "Dejar pasar a un coche más rápido que te dobla", "Einen schnelleren, überrundenden Wagen vorbeilassen"],
  ["black", "negra", "schwarze", "A driver must return to the pits (disqualified)", "Un piloto debe volver a boxes (descalificado)", "Ein Fahrer muss an die Box (disqualifiziert)"],
  ["green", "verde", "grüne", "The track is clear again", "La pista vuelve a estar despejada", "Die Strecke ist wieder frei"],
];
