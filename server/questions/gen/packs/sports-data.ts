/**
 * Fact tables for the "sport." question families (see ./sports.ts).
 * Only fixed history and long-standing rules — nothing that changes from season to season.
 */
type L = [string, string, string];

/** Sport labels used by the sport.* families. */
export const SP: Record<string, L> = {
  football: ["Football (soccer)", "Fútbol", "Fußball"],
  tennis: ["Tennis", "Tenis", "Tennis"],
  basketball: ["Basketball", "Baloncesto", "Basketball"],
  golf: ["Golf", "Golf", "Golf"],
  boxing: ["Boxing", "Boxeo", "Boxen"],
  swimming: ["Swimming", "Natación", "Schwimmen"],
  athletics: ["Athletics (track and field)", "Atletismo", "Leichtathletik"],
  f1: ["Formula 1", "Fórmula 1", "Formel 1"],
  icehockey: ["Ice hockey", "Hockey sobre hielo", "Eishockey"],
  gymnastics: ["Gymnastics", "Gimnasia", "Turnen"],
  baseball: ["Baseball", "Béisbol", "Baseball"],
  amfootball: ["American football", "Fútbol americano", "American Football"],
  cycling: ["Cycling", "Ciclismo", "Radsport"],
  skiing: ["Alpine skiing", "Esquí alpino", "Ski alpin"],
  rugby: ["Rugby", "Rugby", "Rugby"],
  cricket: ["Cricket", "Críquet", "Cricket"],
  volleyball: ["Volleyball", "Voleibol", "Volleyball"],
  handball: ["Handball", "Balonmano", "Handball"],
  badminton: ["Badminton", "Bádminton", "Badminton"],
  fencing: ["Fencing", "Esgrima", "Fechten"],
  judo: ["Judo", "Judo", "Judo"],
  horse: ["Horse racing", "Carreras de caballos", "Pferderennen"],
  sailing: ["Sailing", "Vela", "Segeln"],
  fieldhockey: ["Field hockey", "Hockey sobre hierba", "Feldhockey"],
  curling: ["Curling", "Curling", "Curling"],
  archery: ["Archery", "Tiro con arco", "Bogenschießen"],
  rowing: ["Rowing", "Remo", "Rudern"],
  darts: ["Darts", "Dardos", "Darts"],
  snooker: ["Snooker", "Snooker", "Snooker"],
  weightlifting: ["Weightlifting", "Halterofilia", "Gewichtheben"],
  hurling: ["Hurling", "Hurling", "Hurling"],
  climbing: ["Sport climbing", "Escalada deportiva", "Sportklettern"],
  bowling: ["Ten-pin bowling", "Bolos (bowling)", "Bowling"],
  biathlon: ["Biathlon", "Biatlón", "Biathlon"],
  croquet: ["Croquet", "Croquet", "Krocket"],
  polo: ["Polo", "Polo", "Polo"],
  surfing: ["Surfing", "Surf", "Surfen"],
  tabletennis: ["Table tennis", "Tenis de mesa", "Tischtennis"],
  sumo: ["Sumo", "Sumo", "Sumo"],
  mma: ["Mixed martial arts (MMA)", "Artes marciales mixtas (MMA)", "Mixed Martial Arts (MMA)"],
  wrestling: ["Wrestling", "Lucha", "Ringen"],
  nascar: ["Stock car racing (NASCAR)", "Carreras de stock cars (NASCAR)", "Stockcar-Rennen (NASCAR)"],
  motogp: ["Motorcycle racing (MotoGP)", "Motociclismo (MotoGP)", "Motorradrennen (MotoGP)"],
  squash: ["Squash", "Squash", "Squash"],
  waterpolo: ["Water polo", "Waterpolo", "Wasserball"],
};

// ── Winter Olympics (St. Moritz 1928/1948 deliberately left out) ──
/** [year, host en, es, de] */
export const WINTER_OLYMPICS: [number, string, string, string][] = [
  [1924, "Chamonix", "Chamonix", "Chamonix"], [1932, "Lake Placid", "Lake Placid", "Lake Placid"],
  [1936, "Garmisch-Partenkirchen", "Garmisch-Partenkirchen", "Garmisch-Partenkirchen"], [1952, "Oslo", "Oslo", "Oslo"],
  [1956, "Cortina d'Ampezzo", "Cortina d'Ampezzo", "Cortina d'Ampezzo"], [1960, "Squaw Valley", "Squaw Valley", "Squaw Valley"],
  [1964, "Innsbruck", "Innsbruck", "Innsbruck"], [1968, "Grenoble", "Grenoble", "Grenoble"], [1972, "Sapporo", "Sapporo", "Sapporo"],
  [1976, "Innsbruck", "Innsbruck", "Innsbruck"], [1980, "Lake Placid", "Lake Placid", "Lake Placid"], [1984, "Sarajevo", "Sarajevo", "Sarajevo"],
  [1988, "Calgary", "Calgary", "Calgary"], [1992, "Albertville", "Albertville", "Albertville"], [1994, "Lillehammer", "Lillehammer", "Lillehammer"],
  [1998, "Nagano", "Nagano", "Nagano"], [2002, "Salt Lake City", "Salt Lake City", "Salt Lake City"], [2006, "Turin", "Turín", "Turin"],
  [2010, "Vancouver", "Vancouver", "Vancouver"], [2014, "Sochi", "Sochi", "Sotschi"], [2018, "Pyeongchang", "Pyeongchang", "Pyeongchang"],
  [2022, "Beijing", "Pekín", "Peking"], [2026, "Milan and Cortina d'Ampezzo", "Milán y Cortina d'Ampezzo", "Mailand und Cortina d'Ampezzo"],
];
/** Cities that have never hosted the Winter Olympics (and were not venue towns of a Winter Games). */
export const NEVER_WINTER_HOSTS: L[] = [
  ["Kitzbühel", "Kitzbühel", "Kitzbühel"], ["Zakopane", "Zakopane", "Zakopane"], ["Åre", "Åre", "Åre"], ["Aspen", "Aspen", "Aspen"],
  ["Lahti", "Lahti", "Lahti"], ["Oberstdorf", "Oberstdorf", "Oberstdorf"], ["Schladming", "Schladming", "Schladming"],
  ["Madrid", "Madrid", "Madrid"], ["Vienna", "Viena", "Wien"], ["Prague", "Praga", "Prag"], ["Toronto", "Toronto", "Toronto"],
  ["Stockholm", "Estocolmo", "Stockholm"], ["Helsinki", "Helsinki", "Helsinki"], ["Munich", "Múnich", "München"],
  ["Moscow", "Moscú", "Moskau"], ["Budapest", "Budapest", "Budapest"], ["Warsaw", "Varsovia", "Warschau"], ["Barcelona", "Barcelona", "Barcelona"],
];

/** Winter / Summer Olympic sports (current programmes, stable ones only). */
export const WINTER_SPORTS: L[] = [
  ["Biathlon", "Biatlón", "Biathlon"], ["Curling", "Curling", "Curling"], ["Bobsleigh", "Bobsleigh", "Bobsport"], ["Luge", "Luge", "Rodeln"],
  ["Skeleton", "Skeleton", "Skeleton"], ["Ski jumping", "Salto de esquí", "Skispringen"], ["Speed skating", "Patinaje de velocidad", "Eisschnelllauf"],
  ["Short track speed skating", "Patinaje de velocidad en pista corta", "Shorttrack"], ["Figure skating", "Patinaje artístico", "Eiskunstlauf"],
  ["Ice hockey", "Hockey sobre hielo", "Eishockey"], ["Alpine skiing", "Esquí alpino", "Ski alpin"], ["Snowboarding", "Snowboard", "Snowboard"],
  ["Cross-country skiing", "Esquí de fondo", "Skilanglauf"], ["Nordic combined", "Combinada nórdica", "Nordische Kombination"],
  ["Freestyle skiing", "Esquí acrobático", "Freestyle-Skiing"],
];
/** Winter sports that were never part of the Summer Games (figure skating and ice hockey were, in 1908/1920). */
export const WINTER_ONLY_SPORTS = WINTER_SPORTS.filter((s) => s[0] !== "Figure skating" && s[0] !== "Ice hockey");
export const SUMMER_SPORTS: L[] = [
  ["Swimming", "Natación", "Schwimmen"], ["Athletics", "Atletismo", "Leichtathletik"], ["Rowing", "Remo", "Rudern"], ["Canoeing", "Piragüismo", "Kanusport"],
  ["Judo", "Judo", "Judo"], ["Fencing", "Esgrima", "Fechten"], ["Archery", "Tiro con arco", "Bogenschießen"], ["Artistic gymnastics", "Gimnasia artística", "Gerätturnen"],
  ["Handball", "Balonmano", "Handball"], ["Volleyball", "Voleibol", "Volleyball"], ["Basketball", "Baloncesto", "Basketball"],
  ["Weightlifting", "Halterofilia", "Gewichtheben"], ["Wrestling", "Lucha", "Ringen"], ["Track cycling", "Ciclismo en pista", "Bahnradsport"],
  ["Sailing", "Vela", "Segeln"], ["Table tennis", "Tenis de mesa", "Tischtennis"], ["Badminton", "Bádminton", "Badminton"],
  ["Equestrian", "Hípica", "Reitsport"], ["Triathlon", "Triatlón", "Triathlon"], ["Diving", "Saltos", "Wasserspringen"],
  ["Water polo", "Waterpolo", "Wasserball"], ["Taekwondo", "Taekwondo", "Taekwondo"], ["Shooting", "Tiro olímpico", "Sportschießen"],
  ["Surfing", "Surf", "Surfen"], ["Skateboarding", "Skateboarding", "Skateboarding"], ["Sport climbing", "Escalada deportiva", "Sportklettern"],
  ["Tennis", "Tenis", "Tennis"], ["Golf", "Golf", "Golf"], ["Rugby sevens", "Rugby 7", "7er-Rugby"], ["Field hockey", "Hockey sobre hierba", "Feldhockey"],
  ["Beach volleyball", "Vóley playa", "Beachvolleyball"], ["Football", "Fútbol", "Fußball"],
];

// ── athletes → country ──
/** [name, country id, difficulty e/m/h, country ids never offered as wrong answers (roots, other passports…)] */
export const ATHLETE_NATION: [string, string, "e" | "m" | "h", string[]?][] = [
  ["Usain Bolt", "jamaica", "e"], ["Michael Phelps", "usa", "e"], ["Lionel Messi", "argentina", "e"], ["Cristiano Ronaldo", "portugal", "e"],
  ["Pelé", "brazil", "e"], ["Diego Maradona", "argentina", "e"], ["Zinedine Zidane", "france", "e", ["algeria"]], ["Johan Cruyff", "netherlands", "m"],
  ["Franz Beckenbauer", "germany", "e"], ["Mohamed Salah", "egypt", "e"], ["Rafael Nadal", "spain", "e"], ["Novak Djokovic", "serbia", "e", ["croatia"]],
  ["Steffi Graf", "germany", "m", ["usa"]], ["Michael Jordan", "usa", "e"], ["Dirk Nowitzki", "germany", "m"], ["Tiger Woods", "usa", "e", ["thailand"]],
  ["Seve Ballesteros", "spain", "m"], ["Muhammad Ali", "usa", "e"], ["Manny Pacquiao", "philippines", "m"], ["Eliud Kipchoge", "kenya", "m"],
  ["Lewis Hamilton", "uk", "e"], ["Michael Schumacher", "germany", "e"], ["Ayrton Senna", "brazil", "e"], ["Max Verstappen", "netherlands", "m", ["belgium"]],
  ["Fernando Alonso", "spain", "e"], ["Wayne Gretzky", "canada", "m", ["usa"]], ["Sidney Crosby", "canada", "m", ["usa"]],
  ["Nadia Comăneci", "romania", "m", ["usa"]], ["Simone Biles", "usa", "e"], ["Eddy Merckx", "belgium", "m"], ["Tadej Pogačar", "slovenia", "m"],
  ["Magnus Carlsen", "norway", "m"], ["Judit Polgár", "hungary", "h"], ["Haile Gebrselassie", "ethiopia", "m", ["kenya"]],
  ["Luka Modrić", "croatia", "m"], ["Andrés Iniesta", "spain", "m"], ["Robert Lewandowski", "poland", "m", ["germany"]],
  ["Zlatan Ibrahimović", "sweden", "m", ["croatia", "serbia"]], ["Andy Murray", "uk", "m"], ["Iga Świątek", "poland", "m"],
  ["Jannik Sinner", "italy", "m", ["austria", "germany"]], ["Boris Becker", "germany", "m"], ["Björn Borg", "sweden", "m"], ["Pau Gasol", "spain", "m", ["usa"]],
  ["Giannis Antetokounmpo", "greece", "m", ["nigeria"]], ["Nikola Jokić", "serbia", "m"], ["Ian Thorpe", "australia", "m"], ["Federica Pellegrini", "italy", "h"],
  ["Niki Lauda", "austria", "m", ["germany"]], ["Juan Manuel Fangio", "argentina", "m"], ["Sebastian Vettel", "germany", "m"], ["Alain Prost", "france", "m"],
  ["Alexander Ovechkin", "russia", "m"], ["Ichiro Suzuki", "japan", "m"], ["Shohei Ohtani", "japan", "m"], ["Miguel Induráin", "spain", "m"],
  ["Jonas Vingegaard", "denmark", "h"], ["Hermann Maier", "austria", "m", ["germany"]], ["Ingemar Stenmark", "sweden", "h", ["norway"]],
  ["Mikaela Shiffrin", "usa", "m"], ["Sachin Tendulkar", "india", "m"], ["Virat Kohli", "india", "m"], ["Jonah Lomu", "new_zealand", "m"],
  ["Lin Dan", "china", "m"], ["Teddy Riner", "france", "h"], ["Yuzuru Hanyu", "japan", "m"], ["Yao Ming", "china", "e"], ["Luka Dončić", "slovenia", "m", ["croatia", "serbia"]],
  ["Neymar", "brazil", "e"], ["Kaká", "brazil", "m"], ["Luís Figo", "portugal", "m"], ["Gianluigi Buffon", "italy", "m"], ["Paolo Maldini", "italy", "m"],
  ["Francesco Totti", "italy", "m"], ["Roberto Baggio", "italy", "m"], ["Son Heung-min", "south_korea", "m", ["north_korea"]], ["Park Ji-sung", "south_korea", "h", ["north_korea"]],
  ["Hidetoshi Nakata", "japan", "h"], ["Marta Vieira da Silva", "brazil", "h"], ["Alexia Putellas", "spain", "m"], ["Mia Hamm", "usa", "h"],
  ["Kim Clijsters", "belgium", "h"], ["Justine Henin", "belgium", "h", ["france"]], ["Maria Sharapova", "russia", "m", ["usa"]], ["Gustavo Kuerten", "brazil", "h"],
  ["Gabriela Sabatini", "argentina", "h"], ["Juan Martín del Potro", "argentina", "h"], ["Arantxa Sánchez Vicario", "spain", "h"], ["Li Na", "china", "h"],
  ["Valentino Rossi", "italy", "m"], ["Marc Márquez", "spain", "m"], ["Sébastien Loeb", "france", "h"], ["Kimi Räikkönen", "finland", "m"],
  ["Mika Häkkinen", "finland", "m"], ["Nelson Piquet", "brazil", "h"], ["Emerson Fittipaldi", "brazil", "h"], ["Jackie Stewart", "uk", "h"],
  ["Fausto Coppi", "italy", "h"], ["Bernard Hinault", "france", "h"], ["Greg LeMond", "usa", "h", ["france"]], ["Marco Pantani", "italy", "h"],
  ["Jan Ullrich", "germany", "h"], ["Alberto Contador", "spain", "m"], ["Peter Sagan", "slovakia", "h", ["czechia"]], ["Primož Roglič", "slovenia", "h"],
  ["Viswanathan Anand", "india", "h"], ["Anatoly Karpov", "russia", "h", ["ukraine", "belarus"]], ["Don Bradman", "australia", "h"], ["Shane Warne", "australia", "h"],
  ["Imran Khan", "pakistan", "m", ["india"]], ["Wasim Akram", "pakistan", "h", ["india"]], ["Dan Carter", "new_zealand", "h"], ["Richie McCaw", "new_zealand", "h"],
  ["Brian O'Driscoll", "ireland", "h", ["uk"]], ["Chris Hoy", "uk", "h"], ["Steve Redgrave", "uk", "h"], ["Kenenisa Bekele", "ethiopia", "h", ["kenya"]],
  ["Abebe Bikila", "ethiopia", "h", ["kenya"]], ["David Rudisha", "kenya", "h", ["ethiopia"]], ["Hicham El Guerrouj", "morocco", "h", ["algeria"]],
  ["Wayde van Niekerk", "south_africa", "h"], ["Yelena Isinbayeva", "russia", "m", ["ukraine", "spain"]], ["Javier Sotomayor", "cuba", "h"],
  ["Teófilo Stevenson", "cuba", "h"], ["Oleksandr Usyk", "ukraine", "m", ["russia"]], ["Canelo Álvarez", "mexico", "m"], ["Julio César Chávez", "mexico", "h"],
  ["Hugo Sánchez", "mexico", "m"], ["Carlos Valderrama", "colombia", "m"], ["James Rodríguez", "colombia", "m"], ["Luis Suárez", "uruguay", "m"],
  ["Diego Forlán", "uruguay", "h"], ["Alexis Sánchez", "chile", "m"], ["Iván Zamorano", "chile", "h"], ["Sadio Mané", "senegal", "m"],
  ["Samuel Eto'o", "cameroon", "m"], ["Roger Milla", "cameroon", "h"], ["Jay-Jay Okocha", "nigeria", "h"], ["Michael Essien", "ghana", "h"],
  ["Kevin De Bruyne", "belgium", "m"], ["Eden Hazard", "belgium", "m", ["france"]], ["Arjen Robben", "netherlands", "m"], ["Marco van Basten", "netherlands", "m"],
  ["Virgil van Dijk", "netherlands", "m"], ["Lothar Matthäus", "germany", "m"], ["Thomas Müller", "germany", "m"], ["Manuel Neuer", "germany", "m"],
  ["Oliver Kahn", "germany", "m"], ["Toni Kroos", "germany", "m"], ["Xavi Hernández", "spain", "m"], ["Iker Casillas", "spain", "m"], ["Sergio Ramos", "spain", "m"],
  ["Antoine Griezmann", "france", "m", ["portugal"]], ["Michel Platini", "france", "m", ["italy"]], ["Hristo Stoichkov", "bulgaria", "h"], ["Gheorghe Hagi", "romania", "h"],
  ["Davor Šuker", "croatia", "h", ["serbia"]], ["Andriy Shevchenko", "ukraine", "m", ["russia"]], ["Pavel Nedvěd", "czechia", "h", ["slovakia"]],
  ["Petr Čech", "czechia", "h", ["slovakia"]], ["Peter Schmeichel", "denmark", "h"], ["Michael Laudrup", "denmark", "h"], ["Martin Ødegaard", "norway", "m"],
  ["Jari Litmanen", "finland", "h"], ["Tim Cahill", "australia", "h"], ["Landon Donovan", "usa", "h"], ["Serena Williams", "usa", "e"], ["Carlos Alcaraz", "spain", "e"],
];

// ── stadiums and venues ──
export const CITY: Record<string, L> = {
  barcelona: ["Barcelona", "Barcelona", "Barcelona"], madrid: ["Madrid", "Madrid", "Madrid"], rio: ["Rio de Janeiro", "Río de Janeiro", "Rio de Janeiro"],
  london: ["London", "Londres", "London"], milan: ["Milan", "Milán", "Mailand"], munich: ["Munich", "Múnich", "München"], dortmund: ["Dortmund", "Dortmund", "Dortmund"],
  manchester: ["Manchester", "Mánchester", "Manchester"], liverpool: ["Liverpool", "Liverpool", "Liverpool"], buenosaires: ["Buenos Aires", "Buenos Aires", "Buenos Aires"],
  mexicocity: ["Mexico City", "Ciudad de México", "Mexiko-Stadt"], paris: ["Paris", "París", "Paris"], marseille: ["Marseille", "Marsella", "Marseille"],
  naples: ["Naples", "Nápoles", "Neapel"], amsterdam: ["Amsterdam", "Ámsterdam", "Amsterdam"], rotterdam: ["Rotterdam", "Róterdam", "Rotterdam"],
  eindhoven: ["Eindhoven", "Eindhoven", "Eindhoven"], lisbon: ["Lisbon", "Lisboa", "Lissabon"], porto: ["Porto", "Oporto", "Porto"], glasgow: ["Glasgow", "Glasgow", "Glasgow"],
  edinburgh: ["Edinburgh", "Edimburgo", "Edinburgh"], dublin: ["Dublin", "Dublín", "Dublin"], cardiff: ["Cardiff", "Cardiff", "Cardiff"], kolkata: ["Kolkata", "Calcuta", "Kalkutta"],
  newyork: ["New York", "Nueva York", "New York"], boston: ["Boston", "Boston", "Boston"], chicago: ["Chicago", "Chicago", "Chicago"], greenbay: ["Green Bay", "Green Bay", "Green Bay"],
  valencia: ["Valencia", "Valencia", "Valencia"], seville: ["Seville", "Sevilla", "Sevilla"], bilbao: ["Bilbao", "Bilbao", "Bilbao"], gelsenkirchen: ["Gelsenkirchen", "Gelsenkirchen", "Gelsenkirchen"],
  hamburg: ["Hamburg", "Hamburgo", "Hamburg"], moscow: ["Moscow", "Moscú", "Moskau"], montevideo: ["Montevideo", "Montevideo", "Montevideo"],
  johannesburg: ["Johannesburg", "Johannesburgo", "Johannesburg"], newcastle: ["Newcastle", "Newcastle", "Newcastle"], birmingham: ["Birmingham", "Birmingham", "Birmingham"],
  vienna: ["Vienna", "Viena", "Wien"], budapest: ["Budapest", "Budapest", "Budapest"], istanbul: ["Istanbul", "Estambul", "Istanbul"],
  // wrong answers only
  rome: ["Rome", "Roma", "Rom"], berlin: ["Berlin", "Berlín", "Berlin"], lyon: ["Lyon", "Lyon", "Lyon"], athens: ["Athens", "Atenas", "Athen"],
  saopaulo: ["São Paulo", "São Paulo", "São Paulo"], cologne: ["Cologne", "Colonia", "Köln"], leeds: ["Leeds", "Leeds", "Leeds"], losangeles: ["Los Angeles", "Los Ángeles", "Los Angeles"],
};
/** [venue en, es, de, city key, home football club en/es/de or null (shared or not a club ground)] */
export const STADIUMS: [string, string, string, string, L | null][] = [
  ["Camp Nou", "Camp Nou", "Camp Nou", "barcelona", ["FC Barcelona", "FC Barcelona", "FC Barcelona"]],
  ["Santiago Bernabéu", "Santiago Bernabéu", "Santiago Bernabéu", "madrid", ["Real Madrid", "Real Madrid", "Real Madrid"]],
  ["Estadio Metropolitano", "Estadio Metropolitano", "Estadio Metropolitano", "madrid", ["Atlético Madrid", "Atlético de Madrid", "Atlético Madrid"]],
  ["Maracanã", "Maracaná", "Maracanã", "rio", null],
  ["Wembley Stadium", "Estadio de Wembley", "Wembley-Stadion", "london", null],
  ["San Siro", "San Siro", "San Siro", "milan", null],
  ["Allianz Arena", "Allianz Arena", "Allianz Arena", "munich", ["Bayern Munich", "Bayern de Múnich", "FC Bayern München"]],
  ["Signal Iduna Park (Westfalenstadion)", "Signal Iduna Park (Westfalenstadion)", "Signal Iduna Park (Westfalenstadion)", "dortmund", ["Borussia Dortmund", "Borussia Dortmund", "Borussia Dortmund"]],
  ["Old Trafford", "Old Trafford", "Old Trafford", "manchester", ["Manchester United", "Manchester United", "Manchester United"]],
  ["Etihad Stadium", "Etihad Stadium", "Etihad Stadium", "manchester", ["Manchester City", "Manchester City", "Manchester City"]],
  ["Anfield", "Anfield", "Anfield", "liverpool", ["Liverpool FC", "Liverpool FC", "FC Liverpool"]],
  ["Emirates Stadium", "Emirates Stadium", "Emirates Stadium", "london", ["Arsenal", "Arsenal", "FC Arsenal"]],
  ["Stamford Bridge", "Stamford Bridge", "Stamford Bridge", "london", ["Chelsea", "Chelsea", "FC Chelsea"]],
  ["La Bombonera", "La Bombonera", "La Bombonera", "buenosaires", ["Boca Juniors", "Boca Juniors", "Boca Juniors"]],
  ["Estadio Azteca", "Estadio Azteca", "Aztekenstadion", "mexicocity", null],
  ["Parc des Princes", "Parque de los Príncipes", "Prinzenpark", "paris", ["Paris Saint-Germain", "París Saint-Germain", "Paris Saint-Germain"]],
  ["Stade Vélodrome", "Estadio Vélodrome", "Stade Vélodrome", "marseille", ["Olympique de Marseille", "Olympique de Marsella", "Olympique Marseille"]],
  ["Stadio Diego Armando Maradona", "Estadio Diego Armando Maradona", "Stadio Diego Armando Maradona", "naples", ["SSC Napoli", "SSC Nápoles", "SSC Neapel"]],
  ["Johan Cruyff Arena", "Johan Cruyff Arena", "Johan Cruyff Arena", "amsterdam", ["Ajax", "Ajax", "Ajax Amsterdam"]],
  ["De Kuip", "De Kuip", "De Kuip", "rotterdam", ["Feyenoord", "Feyenoord", "Feyenoord Rotterdam"]],
  ["Philips Stadion", "Philips Stadion", "Philips Stadion", "eindhoven", ["PSV Eindhoven", "PSV Eindhoven", "PSV Eindhoven"]],
  ["Estádio da Luz", "Estádio da Luz", "Estádio da Luz", "lisbon", ["Benfica", "Benfica", "Benfica Lissabon"]],
  ["Estádio do Dragão", "Estádio do Dragão", "Estádio do Dragão", "porto", ["FC Porto", "FC Oporto", "FC Porto"]],
  ["Celtic Park", "Celtic Park", "Celtic Park", "glasgow", null],
  ["Ibrox Stadium", "Ibrox Stadium", "Ibrox Stadium", "glasgow", ["Rangers", "Rangers", "Glasgow Rangers"]],
  ["Murrayfield", "Murrayfield", "Murrayfield", "edinburgh", null],
  ["Twickenham Stadium", "Estadio de Twickenham", "Twickenham Stadium", "london", null],
  ["Croke Park", "Croke Park", "Croke Park", "dublin", null],
  ["Millennium Stadium (Principality Stadium)", "Millennium Stadium (Principality Stadium)", "Millennium Stadium (Principality Stadium)", "cardiff", null],
  ["Eden Gardens", "Eden Gardens", "Eden Gardens", "kolkata", null],
  ["Madison Square Garden", "Madison Square Garden", "Madison Square Garden", "newyork", null],
  ["Fenway Park", "Fenway Park", "Fenway Park", "boston", null],
  ["Wrigley Field", "Wrigley Field", "Wrigley Field", "chicago", null],
  ["Lambeau Field", "Lambeau Field", "Lambeau Field", "greenbay", null],
  ["Mestalla", "Mestalla", "Mestalla", "valencia", ["Valencia CF", "Valencia CF", "FC Valencia"]],
  ["Ramón Sánchez-Pizjuán", "Ramón Sánchez-Pizjuán", "Ramón Sánchez-Pizjuán", "seville", ["Sevilla FC", "Sevilla FC", "FC Sevilla"]],
  ["San Mamés", "San Mamés", "San Mamés", "bilbao", ["Athletic Bilbao", "Athletic Club", "Athletic Bilbao"]],
  ["Veltins-Arena", "Veltins-Arena", "Veltins-Arena", "gelsenkirchen", ["Schalke 04", "Schalke 04", "FC Schalke 04"]],
  ["Volksparkstadion", "Volksparkstadion", "Volksparkstadion", "hamburg", ["Hamburger SV", "Hamburgo SV", "Hamburger SV"]],
  ["Luzhniki Stadium", "Estadio Luzhniki", "Luschniki-Stadion", "moscow", null],
  ["Estadio Centenario", "Estadio Centenario", "Estadio Centenario", "montevideo", null],
  ["Soccer City (FNB Stadium)", "Soccer City (FNB Stadium)", "Soccer City (FNB Stadium)", "johannesburg", null],
  ["St James' Park", "St James' Park", "St James' Park", "newcastle", ["Newcastle United", "Newcastle United", "Newcastle United"]],
  ["Villa Park", "Villa Park", "Villa Park", "birmingham", ["Aston Villa", "Aston Villa", "Aston Villa"]],
  ["Ernst-Happel-Stadion", "Estadio Ernst Happel", "Ernst-Happel-Stadion", "vienna", null],
  ["Puskás Aréna", "Puskás Aréna", "Puskás Aréna", "budapest", null],
  ["Atatürk Olympic Stadium", "Estadio Olímpico Atatürk", "Atatürk-Olympiastadion", "istanbul", null],
];

/** [venue en, es, de, sport key (SP), sport keys never offered as wrong] */
export const VENUES: [string, string, string, string, string[]?][] = [
  ["Lord's (London)", "Lord's (Londres)", "Lord's (London)", "cricket"], ["The Oval (London)", "The Oval (Londres)", "The Oval (London)", "cricket"],
  ["Eden Gardens (Kolkata)", "Eden Gardens (Calcuta)", "Eden Gardens (Kalkutta)", "cricket"],
  ["Twickenham (London)", "Twickenham (Londres)", "Twickenham (London)", "rugby"], ["Murrayfield (Edinburgh)", "Murrayfield (Edimburgo)", "Murrayfield (Edinburgh)", "rugby"],
  ["Fenway Park (Boston)", "Fenway Park (Boston)", "Fenway Park (Boston)", "baseball"], ["Wrigley Field (Chicago)", "Wrigley Field (Chicago)", "Wrigley Field (Chicago)", "baseball"],
  ["Lambeau Field (Green Bay)", "Lambeau Field (Green Bay)", "Lambeau Field (Green Bay)", "amfootball"],
  ["St Andrews (Old Course)", "St Andrews (Old Course)", "St Andrews (Old Course)", "golf"], ["Pebble Beach (California)", "Pebble Beach (California)", "Pebble Beach (Kalifornien)", "golf"],
  ["Carnoustie (Scotland)", "Carnoustie (Escocia)", "Carnoustie (Schottland)", "golf"],
  ["Ascot (England)", "Ascot (Inglaterra)", "Ascot (England)", "horse"], ["Epsom Downs (England)", "Epsom Downs (Inglaterra)", "Epsom Downs (England)", "horse"],
  ["Longchamp (Paris)", "Longchamp (París)", "Longchamp (Paris)", "horse"],
  ["Daytona International Speedway", "Daytona International Speedway", "Daytona International Speedway", "nascar", ["f1", "motogp"]],
  ["TT Circuit Assen (Netherlands)", "TT Circuit Assen (Países Bajos)", "TT Circuit Assen (Niederlande)", "motogp", ["f1", "nascar"]],
  ["Flushing Meadows (New York)", "Flushing Meadows (Nueva York)", "Flushing Meadows (New York)", "tennis"],
  ["Melbourne Park", "Melbourne Park", "Melbourne Park", "tennis"],
  ["The Crucible Theatre (Sheffield)", "The Crucible Theatre (Sheffield)", "Crucible Theatre (Sheffield)", "snooker"],
  ["Alexandra Palace (London)", "Alexandra Palace (Londres)", "Alexandra Palace (London)", "darts"],
  ["Cowes (Isle of Wight)", "Cowes (isla de Wight)", "Cowes (Isle of Wight)", "sailing"],
  ["Hayward Field (Eugene, Oregon)", "Hayward Field (Eugene, Oregón)", "Hayward Field (Eugene, Oregon)", "athletics"],
];

// ── national team nicknames ──
/** Teams: key → [en, es, de, en "the X national team" prefix, es "de X", de "von X"] */
export const TEAMS: Record<string, [string, string, string, string, string, string]> = {
  spain: ["Spain", "España", "Spanien", "Spain", "de España", "von Spanien"],
  france: ["France", "Francia", "Frankreich", "France", "de Francia", "von Frankreich"],
  italy: ["Italy", "Italia", "Italien", "Italy", "de Italia", "von Italien"],
  netherlands: ["Netherlands", "Países Bajos", "Niederlande", "Netherlands", "de los Países Bajos", "der Niederlande"],
  brazil: ["Brazil", "Brasil", "Brasilien", "Brazil", "de Brasil", "von Brasilien"],
  argentina: ["Argentina", "Argentina", "Argentinien", "Argentina", "de Argentina", "von Argentinien"],
  germany: ["Germany", "Alemania", "Deutschland", "Germany", "de Alemania", "von Deutschland"],
  england: ["England", "Inglaterra", "England", "England", "de Inglaterra", "von England"],
  uruguay: ["Uruguay", "Uruguay", "Uruguay", "Uruguay", "de Uruguay", "von Uruguay"],
  australia: ["Australia", "Australia", "Australien", "Australia", "de Australia", "von Australien"],
  nigeria: ["Nigeria", "Nigeria", "Nigeria", "Nigeria", "de Nigeria", "von Nigeria"],
  ghana: ["Ghana", "Ghana", "Ghana", "Ghana", "de Ghana", "von Ghana"],
  morocco: ["Morocco", "Marruecos", "Marokko", "Morocco", "de Marruecos", "von Marokko"],
  cameroon: ["Cameroon", "Camerún", "Kamerun", "Cameroon", "de Camerún", "von Kamerun"],
  egypt: ["Egypt", "Egipto", "Ägypten", "Egypt", "de Egipto", "von Ägypten"],
  japan: ["Japan", "Japón", "Japan", "Japan", "de Japón", "von Japan"],
  south_korea: ["South Korea", "Corea del Sur", "Südkorea", "South Korea", "de Corea del Sur", "von Südkorea"],
  mexico: ["Mexico", "México", "Mexiko", "Mexico", "de México", "von Mexiko"],
  belgium: ["Belgium", "Bélgica", "Belgien", "Belgium", "de Bélgica", "von Belgien"],
  croatia: ["Croatia", "Croacia", "Kroatien", "Croatia", "de Croacia", "von Kroatien"],
  denmark: ["Denmark", "Dinamarca", "Dänemark", "Denmark", "de Dinamarca", "von Dänemark"],
  senegal: ["Senegal", "Senegal", "Senegal", "Senegal", "de Senegal", "von Senegal"],
  colombia: ["Colombia", "Colombia", "Kolumbien", "Colombia", "de Colombia", "von Kolumbien"],
  south_africa: ["South Africa", "Sudáfrica", "Südafrika", "South Africa", "de Sudáfrica", "von Südafrika"],
  ivory_coast: ["Ivory Coast", "Costa de Marfil", "Elfenbeinküste", "Ivory Coast", "de Costa de Marfil", "der Elfenbeinküste"],
  chile: ["Chile", "Chile", "Chile", "Chile", "de Chile", "von Chile"],
  portugal: ["Portugal", "Portugal", "Portugal", "Portugal", "de Portugal", "von Portugal"],
  new_zealand: ["New Zealand", "Nueva Zelanda", "Neuseeland", "New Zealand", "de Nueva Zelanda", "von Neuseeland"],
  fiji: ["Fiji", "Fiyi", "Fidschi", "Fiji", "de Fiyi", "von Fidschi"],
  ireland: ["Ireland", "Irlanda", "Irland", "Ireland", "de Irlanda", "von Irland"],
  wales: ["Wales", "Gales", "Wales", "Wales", "de Gales", "von Wales"],
  scotland: ["Scotland", "Escocia", "Schottland", "Scotland", "de Escocia", "von Schottland"],
};
/** [nickname en, es, de, team key, team keys never offered as wrong (they share the nickname)] */
export const FOOTBALL_NICKNAMES: [string, string, string, string, string[]?][] = [
  ["La Roja", "La Roja", "La Roja", "spain", ["chile"]], ["Les Bleus", "Les Bleus", "Les Bleus", "france"], ["Azzurri", "Azzurri", "Azzurri", "italy"],
  ["Oranje", "Oranje", "Oranje", "netherlands"], ["Seleção", "Seleção", "Seleção", "brazil", ["portugal"]], ["Albiceleste", "Albiceleste", "Albiceleste", "argentina"],
  ["Die Mannschaft", "Die Mannschaft", "Die Mannschaft", "germany"], ["Three Lions", "Three Lions (los Tres Leones)", "Three Lions", "england"],
  ["La Celeste", "La Celeste", "La Celeste", "uruguay"], ["Socceroos", "Socceroos", "Socceroos", "australia"], ["Super Eagles", "Super Eagles (Súper Águilas)", "Super Eagles", "nigeria"],
  ["Black Stars", "Black Stars (Estrellas Negras)", "Black Stars", "ghana"], ["Atlas Lions", "Leones del Atlas", "Atlas-Löwen", "morocco"],
  ["Indomitable Lions", "Leones Indomables", "Unbezähmbare Löwen", "cameroon"], ["The Pharaohs", "Los Faraones", "Die Pharaonen", "egypt"],
  ["Samurai Blue", "Samurai Blue", "Samurai Blue", "japan"], ["Taegeuk Warriors", "Guerreros Taegeuk", "Taegeuk-Krieger", "south_korea"],
  ["El Tri", "El Tri", "El Tri", "mexico"], ["Red Devils", "Diablos Rojos", "Rote Teufel", "belgium", ["south_korea"]], ["Vatreni", "Vatreni", "Vatreni", "croatia"],
  ["Danish Dynamite", "Dinamita Danesa", "Danish Dynamite", "denmark"], ["Lions of Teranga", "Leones de la Teranga", "Löwen von Teranga", "senegal"],
  ["Los Cafeteros", "Los Cafeteros", "Los Cafeteros", "colombia"], ["Bafana Bafana", "Bafana Bafana", "Bafana Bafana", "south_africa"],
  ["The Elephants", "Los Elefantes", "Die Elefanten", "ivory_coast"],
];
export const RUGBY_NICKNAMES: [string, string, string, string][] = [
  ["All Blacks", "All Blacks", "All Blacks", "new_zealand"], ["Springboks", "Springboks", "Springboks", "south_africa"],
  ["Wallabies", "Wallabies", "Wallabies", "australia"], ["Los Pumas", "Los Pumas", "Los Pumas", "argentina"],
  ["Brave Blossoms", "Brave Blossoms", "Brave Blossoms", "japan"], ["Flying Fijians", "Flying Fijians", "Flying Fijians", "fiji"],
];
export const RUGBY_NATIONS = ["new_zealand", "south_africa", "australia", "argentina", "japan", "fiji", "england", "france", "ireland", "wales", "scotland", "italy"];

// ── martial arts & where sports were born ──
/** [martial art en, es, de, country id, country ids never offered as wrong] */
export const MARTIAL_ARTS: [string, string, string, string, string[]?][] = [
  ["Karate", "Kárate", "Karate", "japan", ["china"]], ["Judo", "Judo", "Judo", "japan"], ["Taekwondo", "Taekwondo", "Taekwondo", "south_korea", ["north_korea"]],
  ["Kung fu", "Kung-fu", "Kung-Fu", "china"], ["Capoeira", "Capoeira", "Capoeira", "brazil", ["angola"]], ["Muay Thai", "Muay thai", "Muay Thai", "thailand"],
  ["Sumo", "Sumo", "Sumo", "japan"], ["Aikido", "Aikido", "Aikido", "japan"], ["Kendo", "Kendo", "Kendo", "japan"], ["Tai chi", "Taichí", "Tai-Chi", "china"],
  ["Wing Chun", "Wing Chun", "Wing Chun", "china"], ["Jujutsu (Japanese jiu-jitsu)", "Jiu-jitsu japonés", "Jiu-Jitsu (japanisch)", "japan", ["brazil"]],
  ["Hapkido", "Hapkido", "Hapkido", "south_korea", ["japan", "north_korea"]], ["Sambo", "Sambo", "Sambo", "russia", ["ukraine", "belarus", "kazakhstan"]],
  ["Savate (French boxing)", "Savate (boxeo francés)", "Savate (französisches Boxen)", "france"], ["Kalaripayattu", "Kalaripayattu", "Kalaripayattu", "india"],
  ["Arnis (Eskrima)", "Arnis (Eskrima)", "Arnis (Eskrima)", "philippines"],
];
export const MARTIAL_POOL = ["japan", "china", "south_korea", "thailand", "brazil", "russia", "france", "india", "philippines", "vietnam", "indonesia", "mexico", "usa", "uk", "greece", "mongolia", "germany", "italy"];

export const ORIGIN: Record<string, L> = {
  england: ["England", "Inglaterra", "England"], scotland: ["Scotland", "Escocia", "Schottland"], usa: ["United States", "Estados Unidos", "Vereinigte Staaten"],
  canada: ["Canada", "Canadá", "Kanada"], ireland: ["Ireland", "Irlanda", "Irland"], netherlands: ["Netherlands", "Países Bajos", "Niederlande"],
  india: ["India", "India", "Indien"], france: ["France", "Francia", "Frankreich"], mexico: ["Mexico", "México", "Mexiko"], uruguay: ["Uruguay", "Uruguay", "Uruguay"],
  japan: ["Japan", "Japón", "Japan"], china: ["China", "China", "China"], italy: ["Italy", "Italia", "Italien"], spain: ["Spain", "España", "Spanien"],
  argentina: ["Argentina", "Argentina", "Argentinien"], brazil: ["Brazil", "Brasil", "Brasilien"], germany: ["Germany", "Alemania", "Deutschland"],
  australia: ["Australia", "Australia", "Australien"],
};
/** [sport en, es, de, origin key, origin keys never offered as wrong (competing claims)] */
export const SPORT_ORIGINS: [string, string, string, string, string[]?][] = [
  ["Modern football (soccer)", "Fútbol moderno", "Moderner Fußball", "england", ["china", "italy", "scotland"]],
  ["Rugby", "Rugby", "Rugby", "england", ["scotland", "ireland"]], ["Cricket", "Críquet", "Cricket", "england", ["scotland"]],
  ["Golf", "Golf", "Golf", "scotland", ["netherlands", "china", "england"]], ["Curling", "Curling", "Curling", "scotland", ["netherlands", "canada"]],
  ["Squash", "Squash", "Squash", "england"], ["Table tennis", "Tenis de mesa", "Tischtennis", "england"], ["Netball", "Netball", "Netball", "england", ["usa"]],
  ["Basketball", "Baloncesto", "Basketball", "usa", ["canada"]], ["Volleyball", "Voleibol", "Volleyball", "usa"],
  ["Modern ice hockey", "Hockey sobre hielo moderno", "Modernes Eishockey", "canada", ["england", "scotland", "usa"]],
  ["Hurling", "Hurling", "Hurling", "ireland", ["scotland"]], ["Gaelic football", "Fútbol gaélico", "Gaelic Football", "ireland", ["scotland"]],
  ["Korfball", "Korfbal", "Korbball (Korfball)", "netherlands"], ["Kabaddi", "Kabaddi", "Kabaddi", "india"],
  ["Pétanque", "Petanca", "Pétanque (Boule)", "france", ["italy", "spain"]], ["Padel", "Pádel", "Padel", "mexico"],
  ["Futsal", "Fútbol sala", "Futsal", "uruguay", ["brazil"]], ["Softball", "Sóftbol", "Softball", "usa", ["canada"]],
  ["Ultimate frisbee", "Ultimate (frisbee)", "Ultimate Frisbee", "usa", ["canada"]],
];

// ── trophies ──
/** [trophy en, es, de, sport key (SP)] */
export const TROPHIES: [string, string, string, string][] = [
  ["the Webb Ellis Cup", "la Copa Webb Ellis", "Webb Ellis Cup", "rugby"], ["the Calcutta Cup", "la Copa Calcuta", "Calcutta Cup", "rugby"],
  ["the Bledisloe Cup", "la Copa Bledisloe", "Bledisloe Cup", "rugby"], ["the Vince Lombardi Trophy", "el Trofeo Vince Lombardi", "Vince Lombardi Trophy", "amfootball"],
  ["the Heisman Trophy", "el Trofeo Heisman", "Heisman Trophy", "amfootball"], ["the Larry O'Brien Trophy", "el Trofeo Larry O'Brien", "Larry O'Brien Trophy", "basketball"],
  ["the Claret Jug", "la Claret Jug", "Claret Jug", "golf"], ["the Wanamaker Trophy", "el Trofeo Wanamaker", "Wanamaker Trophy", "golf"],
  ["the Solheim Cup", "la Copa Solheim", "Solheim Cup", "golf"], ["the Jules Rimet Trophy", "el Trofeo Jules Rimet", "Jules-Rimet-Pokal", "football"],
  ["the Henri Delaunay Trophy", "el Trofeo Henri Delaunay", "Henri-Delaunay-Pokal", "football"], ["the Cy Young Award", "el Premio Cy Young", "Cy Young Award", "baseball"],
  ["the Conn Smythe Trophy", "el Trofeo Conn Smythe", "Conn Smythe Trophy", "icehockey"], ["the Hart Memorial Trophy", "el Trofeo Hart", "Hart Memorial Trophy", "icehockey"],
  ["the Venus Rosewater Dish", "el Venus Rosewater Dish", "Venus Rosewater Dish", "tennis"], ["the Coupe des Mousquetaires", "la Copa de los Mosqueteros", "Coupe des Mousquetaires", "tennis"],
  ["the Billie Jean King Cup", "la Copa Billie Jean King", "Billie Jean King Cup", "tennis"], ["the Uber Cup", "la Copa Uber", "Uber Cup", "badminton"],
  ["the Sudirman Cup", "la Copa Sudirman", "Sudirman Cup", "badminton"], ["the Swaythling Cup", "la Copa Swaythling", "Swaythling Cup", "tabletennis"],
  ["the Lonsdale Belt", "el cinturón Lonsdale", "Lonsdale-Gürtel", "boxing"],
];

// ── motor racing circuits ──
/** [circuit, country id] */
export const CIRCUITS: [string, string][] = [
  ["Silverstone", "uk"], ["Brands Hatch", "uk"], ["Monza", "italy"], ["Imola", "italy"], ["Mugello", "italy"], ["Suzuka", "japan"], ["Fuji Speedway", "japan"],
  ["Interlagos", "brazil"], ["Spa-Francorchamps", "belgium"], ["Zolder", "belgium"], ["Hockenheimring", "germany"], ["Nürburgring", "germany"],
  ["Circuit Gilles Villeneuve", "canada"], ["Zandvoort", "netherlands"], ["Red Bull Ring (Spielberg)", "austria"], ["Albert Park", "australia"],
  ["Marina Bay", "singapore"], ["Yas Marina", "uae"], ["Circuit of the Americas", "usa"], ["Indianapolis Motor Speedway", "usa"],
  ["Autódromo Hermanos Rodríguez", "mexico"], ["Estoril", "portugal"], ["Jerez", "spain"], ["Kyalami", "south_africa"], ["Sepang", "malaysia"],
  ["Magny-Cours", "france"], ["Paul Ricard (Le Castellet)", "france"], ["Le Mans (Circuit de la Sarthe)", "france"],
];

// ── winners lists (fixed history) ──
/** Men's Ballon d'Or: [year, winner] (2020 not awarded) */
export const BALLON_DOR: [number, string][] = [
  [1983, "Michel Platini"], [1984, "Michel Platini"], [1985, "Michel Platini"], [1986, "Igor Belanov"], [1987, "Ruud Gullit"], [1988, "Marco van Basten"],
  [1989, "Marco van Basten"], [1990, "Lothar Matthäus"], [1991, "Jean-Pierre Papin"], [1992, "Marco van Basten"], [1993, "Roberto Baggio"],
  [1994, "Hristo Stoichkov"], [1995, "George Weah"], [1996, "Matthias Sammer"], [1997, "Ronaldo (Nazário)"], [1998, "Zinedine Zidane"], [1999, "Rivaldo"],
  [2000, "Luís Figo"], [2001, "Michael Owen"], [2002, "Ronaldo (Nazário)"], [2003, "Pavel Nedvěd"], [2004, "Andriy Shevchenko"], [2005, "Ronaldinho"],
  [2006, "Fabio Cannavaro"], [2007, "Kaká"], [2008, "Cristiano Ronaldo"], [2009, "Lionel Messi"], [2010, "Lionel Messi"], [2011, "Lionel Messi"],
  [2012, "Lionel Messi"], [2013, "Cristiano Ronaldo"], [2014, "Cristiano Ronaldo"], [2015, "Lionel Messi"], [2016, "Cristiano Ronaldo"],
  [2017, "Cristiano Ronaldo"], [2018, "Luka Modrić"], [2019, "Lionel Messi"], [2021, "Lionel Messi"], [2022, "Karim Benzema"], [2023, "Lionel Messi"],
  [2024, "Rodri"], [2025, "Ousmane Dembélé"],
];
/** Earlier winners — only used as "has won" answers. */
export const BALLON_DOR_EARLY = ["Johan Cruyff", "Franz Beckenbauer", "Gerd Müller", "Eusébio", "George Best", "Kevin Keegan", "Karl-Heinz Rummenigge", "Paolo Rossi"];
/** Retired stars who never won the Ballon d'Or (no honorary awards). */
export const NO_BALLON_DOR = [
  "Thierry Henry", "Xavi Hernández", "Andrés Iniesta", "Paolo Maldini", "Gianluigi Buffon", "Raúl González", "Francesco Totti", "Andrea Pirlo",
  "Didier Drogba", "Wayne Rooney", "Steven Gerrard", "Frank Lampard", "Philipp Lahm", "Iker Casillas", "Gabriel Batistuta", "Arjen Robben",
  "Zlatan Ibrahimović", "Roberto Carlos", "Carles Puyol", "Dennis Bergkamp", "Alan Shearer", "Eric Cantona", "Alessandro Del Piero", "Bastian Schweinsteiger", "Eden Hazard",
];
/** World Cup top scorers (only tournaments with a single clear top scorer). [year, player] */
export const WC_TOP_SCORERS: [number, string][] = [
  [1954, "Sándor Kocsis"], [1958, "Just Fontaine"], [1966, "Eusébio"], [1970, "Gerd Müller"], [1974, "Grzegorz Lato"], [1978, "Mario Kempes"],
  [1982, "Paolo Rossi"], [1986, "Gary Lineker"], [1990, "Salvatore Schillaci"], [1998, "Davor Šuker"], [2002, "Ronaldo (Nazário)"],
  [2006, "Miroslav Klose"], [2014, "James Rodríguez"], [2018, "Harry Kane"], [2022, "Kylian Mbappé"],
];
export const TOUR_WINNERS = [
  "Eddy Merckx", "Bernard Hinault", "Miguel Induráin", "Jacques Anquetil", "Fausto Coppi", "Gino Bartali", "Greg LeMond", "Laurent Fignon", "Marco Pantani",
  "Jan Ullrich", "Alberto Contador", "Cadel Evans", "Bradley Wiggins", "Chris Froome", "Vincenzo Nibali", "Geraint Thomas", "Egan Bernal", "Carlos Sastre",
  "Stephen Roche", "Pedro Delgado", "Louison Bobet", "Federico Bahamontes", "Lucien Van Impe", "Joop Zoetemelk", "Bernard Thévenet", "Jonas Vingegaard", "Tadej Pogačar",
];
export const TOUR_NON_WINNERS = [
  "Raymond Poulidor", "Peter Sagan", "Mark Cavendish", "Erik Zabel", "Mario Cipollini", "Tom Boonen", "Alejandro Valverde", "Joaquim Rodríguez", "Richard Virenque",
  "Jens Voigt", "Thor Hushovd", "André Greipel", "Philippe Gilbert", "Paolo Bettini", "Sean Kelly", "Chris Boardman", "Óscar Freire", "Robbie McEwen",
  "Johan Museeuw", "Laurent Jalabert", "Ivan Basso", "Damiano Cunego", "Joseba Beloki", "Alexander Vinokourov",
];
export const WIMBLEDON_WINNERS = [
  "Björn Borg", "John McEnroe", "Jimmy Connors", "Boris Becker", "Stefan Edberg", "Michael Stich", "Pete Sampras", "Andre Agassi", "Richard Krajicek",
  "Goran Ivanišević", "Lleyton Hewitt", "Rafael Nadal", "Novak Djokovic", "Andy Murray", "Carlos Alcaraz", "Jannik Sinner", "Arthur Ashe", "Rod Laver", "Pat Cash",
  "Martina Navratilova", "Steffi Graf", "Chris Evert", "Serena Williams", "Venus Williams", "Maria Sharapova", "Amélie Mauresmo", "Petra Kvitová",
  "Marion Bartoli", "Garbiñe Muguruza", "Simona Halep", "Ashleigh Barty", "Elena Rybakina", "Markéta Vondroušová", "Barbora Krejčíková", "Iga Świątek",
  "Lindsay Davenport", "Jana Novotná", "Conchita Martínez", "Billie Jean King",
];
export const WIMBLEDON_NON_WINNERS = [
  "Ivan Lendl", "Ken Rosewall", "Guillermo Vilas", "Marcelo Ríos", "Gustavo Kuerten", "Thomas Muster", "Sergi Bruguera", "Carlos Moyà", "Juan Carlos Ferrero",
  "Marat Safin", "Andy Roddick", "David Ferrer", "Juan Martín del Potro", "Dominic Thiem", "Jim Courier", "Michael Chang", "Yevgeny Kafelnikov", "Patrick Rafter",
  "Tim Henman", "Monica Seles", "Justine Henin", "Kim Clijsters", "Arantxa Sánchez Vicario", "Gabriela Sabatini", "Li Na", "Ana Ivanović", "Mary Pierce",
  "Jennifer Capriati", "Francesca Schiavone",
];
export const F1_CHAMPIONS = [
  "Juan Manuel Fangio", "Alberto Ascari", "Jim Clark", "Jackie Stewart", "Niki Lauda", "James Hunt", "Emerson Fittipaldi", "Nelson Piquet", "Alain Prost",
  "Ayrton Senna", "Nigel Mansell", "Damon Hill", "Jacques Villeneuve", "Mika Häkkinen", "Michael Schumacher", "Fernando Alonso", "Kimi Räikkönen",
  "Lewis Hamilton", "Jenson Button", "Sebastian Vettel", "Nico Rosberg", "Max Verstappen", "Mario Andretti", "Keke Rosberg", "Jody Scheckter", "Alan Jones",
  "Jochen Rindt", "Graham Hill",
];
export const F1_NON_CHAMPIONS = [
  "Stirling Moss", "Gilles Villeneuve", "David Coulthard", "Rubens Barrichello", "Mark Webber", "Juan Pablo Montoya", "Ralf Schumacher", "Gerhard Berger",
  "Riccardo Patrese", "Jean Alesi", "Eddie Irvine", "Heinz-Harald Frentzen", "Ronnie Peterson", "Jacky Ickx", "Carlos Reutemann", "Daniel Ricciardo",
];

/** Career Olympic gold medals of retired athletes: [name, name, name, golds] */
export const OLYMPIC_GOLDS: [string, string, string, number][] = ([
  ["Michael Phelps", 23], ["Larisa Latynina", 9], ["Paavo Nurmi", 9], ["Mark Spitz", 9], ["Carl Lewis", 9], ["Usain Bolt", 8], ["Bjørn Dæhlie", 8],
  ["Ole Einar Bjørndalen", 8], ["Marit Bjørgen", 8], ["Birgit Fischer", 8], ["Matt Biondi", 8], ["Jenny Thompson", 8], ["Věra Čáslavská", 7],
  ["Nikolai Andrianov", 7], ["Jason Kenny", 7], ["Allyson Felix", 7], ["Chris Hoy", 6], ["Ryan Lochte", 6], ["Kristin Otto", 6], ["Ian Thorpe", 5],
  ["Nadia Comăneci", 5], ["Steve Redgrave", 5], ["Eric Heiden", 5], ["Jesse Owens", 4], ["Michael Johnson", 4], ["Mo Farah", 4], ["Alexander Popov", 4],
  ["Emil Zátopek", 4], ["Kenenisa Bekele", 3], ["Florence Griffith Joyner", 3], ["Shaun White", 3], ["Sebastian Coe", 2], ["Haile Gebrselassie", 2],
  ["Daley Thompson", 2], ["Hermann Maier", 2], ["Katarina Witt", 2], ["Edwin Moses", 2], ["Sergey Bubka", 1], ["Steffi Graf", 1], ["Andre Agassi", 1],
] as [string, number][]).map(([n, g]) => [n, n, n, g]);

/** Famous moments: [question en, es, de, answer, wrong-answer pool key] */
export const MOMENTS: [string, string, string, string, string][] = [
  ["Who was the first person to run a mile in under four minutes, in 1954?", "¿Quién fue la primera persona en correr una milla en menos de cuatro minutos, en 1954?", "Wer lief 1954 als erster Mensch eine Meile in unter vier Minuten?", "Roger Bannister", "run"],
  ["Which gymnast scored the first perfect 10 in Olympic history, in 1976?", "¿Qué gimnasta logró el primer 10 perfecto de la historia olímpica, en 1976?", "Welche Turnerin erhielt 1976 die erste perfekte 10 der Olympiageschichte?", "Nadia Comăneci", "gym"],
  ["Who scored the “Hand of God” goal at the 1986 World Cup?", "¿Quién marcó el gol de la «mano de Dios» en el Mundial de 1986?", "Wer erzielte bei der WM 1986 das Tor mit der „Hand Gottes“?", "Diego Maradona", "fb80"],
  ["Who won four gold medals at the 1936 Olympics in Berlin?", "¿Quién ganó cuatro medallas de oro en los Juegos Olímpicos de Berlín 1936?", "Wer gewann bei den Olympischen Spielen 1936 in Berlin vier Goldmedaillen?", "Jesse Owens", "run"],
  ["Who ran the first marathon distance in under two hours (Vienna, 2019, unofficial)?", "¿Quién corrió por primera vez la distancia de maratón en menos de dos horas (Viena, 2019, no oficial)?", "Wer lief 2019 in Wien als Erster die Marathondistanz unter zwei Stunden (inoffiziell)?", "Eliud Kipchoge", "long"],
  ["Who head-butted Marco Materazzi in the 2006 World Cup final?", "¿Quién dio un cabezazo a Marco Materazzi en la final del Mundial de 2006?", "Wer verpasste Marco Materazzi im WM-Finale 2006 einen Kopfstoß?", "Zinedine Zidane", "fb00"],
  ["Who beat George Foreman in the “Rumble in the Jungle” in 1974?", "¿Quién venció a George Foreman en «The Rumble in the Jungle» en 1974?", "Wer besiegte George Foreman 1974 beim „Rumble in the Jungle“?", "Muhammad Ali", "box"],
  ["Which boxer bit Evander Holyfield's ear in 1997?", "¿Qué boxeador mordió la oreja de Evander Holyfield en 1997?", "Welcher Boxer biss Evander Holyfield 1997 ins Ohr?", "Mike Tyson", "box"],
  ["Who scored 100 points in a single NBA game in 1962?", "¿Quién anotó 100 puntos en un solo partido de la NBA en 1962?", "Wer erzielte 1962 in einem einzigen NBA-Spiel 100 Punkte?", "Wilt Chamberlain", "nba"],
  ["Which swimmer won eight gold medals at the 2008 Olympics in Beijing?", "¿Qué nadador ganó ocho medallas de oro en los Juegos Olímpicos de Pekín 2008?", "Welcher Schwimmer gewann bei den Olympischen Spielen 2008 in Peking acht Goldmedaillen?", "Michael Phelps", "swim"],
  ["Which swimmer won seven gold medals at the 1972 Olympics in Munich?", "¿Qué nadador ganó siete medallas de oro en los Juegos Olímpicos de Múnich 1972?", "Welcher Schwimmer gewann bei den Olympischen Spielen 1972 in München sieben Goldmedaillen?", "Mark Spitz", "swim"],
  ["Who ran the 100 m world record of 9.58 seconds in Berlin in 2009?", "¿Quién corrió los 100 m en 9,58 segundos, récord mundial, en Berlín en 2009?", "Wer lief 2009 in Berlin den 100-m-Weltrekord von 9,58 Sekunden?", "Usain Bolt", "sprint"],
  ["Who won the “Golden Slam” in 1988 – all four Grand Slam titles plus Olympic gold?", "¿Quién ganó el «Golden Slam» en 1988: los cuatro Grand Slams y el oro olímpico?", "Wer gewann 1988 den „Golden Slam“ – alle vier Grand-Slam-Turniere und Olympiagold?", "Steffi Graf", "tennisW"],
  ["Who scored the winning goal in the 2010 World Cup final?", "¿Quién marcó el gol de la victoria en la final del Mundial de 2010?", "Wer schoss im WM-Finale 2010 das Siegtor?", "Andrés Iniesta", "fb10"],
  ["Who scored the winning goal in the 2014 World Cup final?", "¿Quién marcó el gol de la victoria en la final del Mundial de 2014?", "Wer schoss im WM-Finale 2014 das Siegtor?", "Mario Götze", "fb14"],
  ["Who scored a hat-trick in the 1966 World Cup final?", "¿Quién marcó un triplete en la final del Mundial de 1966?", "Wer erzielte im WM-Finale 1966 einen Hattrick?", "Geoff Hurst", "fb66"],
  ["Who scored a hat-trick in the 2022 World Cup final?", "¿Quién marcó un triplete en la final del Mundial de 2022?", "Wer erzielte im WM-Finale 2022 einen Hattrick?", "Kylian Mbappé", "fb22"],
  ["Who became world chess champion in 1985 by beating Anatoly Karpov?", "¿Quién se proclamó campeón mundial de ajedrez en 1985 al vencer a Anatoli Kárpov?", "Wer wurde 1985 durch einen Sieg über Anatoli Karpow Schachweltmeister?", "Garry Kasparov", "chess"],
  ["Who beat Boris Spassky in the 1972 “Match of the Century” in Reykjavík?", "¿Quién venció a Borís Spaski en el «Match del Siglo» de 1972 en Reikiavik?", "Wer besiegte Boris Spasski 1972 im „Match des Jahrhunderts“ in Reykjavík?", "Bobby Fischer", "chess"],
  ["Who won the 1973 “Battle of the Sexes” tennis match against Bobby Riggs?", "¿Quién ganó en 1973 la «Batalla de los Sexos» de tenis contra Bobby Riggs?", "Wer gewann 1973 das Tennismatch „Battle of the Sexes“ gegen Bobby Riggs?", "Billie Jean King", "tennisW"],
  ["Who won five Wimbledon singles titles in a row from 1976 to 1980?", "¿Quién ganó cinco títulos individuales seguidos de Wimbledon entre 1976 y 1980?", "Wer gewann von 1976 bis 1980 fünfmal in Folge das Einzel in Wimbledon?", "Björn Borg", "tennisM"],
  ["Which high jumper gave his name to the “flop” technique at the 1968 Olympics?", "¿Qué saltador de altura dio nombre a la técnica del «flop» en los Juegos de 1968?", "Welcher Hochspringer gab 1968 bei Olympia dem „Flop“ seinen Namen?", "Dick Fosbury", "jump"],
  ["Who made the famous 8.90 m long jump at the 1968 Olympics in Mexico City?", "¿Quién logró el famoso salto de longitud de 8,90 m en los Juegos de México 1968?", "Wem gelang bei den Olympischen Spielen 1968 in Mexiko-Stadt der berühmte Weitsprung auf 8,90 m?", "Bob Beamon", "jump"],
  ["Who won the very first Formula 1 World Championship, in 1950?", "¿Quién ganó el primer Campeonato Mundial de Fórmula 1, en 1950?", "Wer gewann 1950 die allererste Formel-1-Weltmeisterschaft?", "Giuseppe Farina", "f1old"],
  ["Who was the first pole vaulter to clear 6 metres, in 1985?", "¿Quién fue el primer saltador con pértiga en superar los 6 metros, en 1985?", "Wer übersprang 1985 als erster Stabhochspringer 6 Meter?", "Sergey Bubka", "jump"],
];
export const MOMENT_POOLS: Record<string, string[]> = {
  run: ["Sebastian Coe", "Steve Ovett", "Hicham El Guerrouj", "Paavo Nurmi", "Emil Zátopek", "Carl Lewis", "Jesse Owens", "Roger Bannister", "Michael Johnson", "Abebe Bikila"],
  gym: ["Olga Korbut", "Simone Biles", "Věra Čáslavská", "Larisa Latynina", "Mary Lou Retton", "Nadia Comăneci"],
  fb80: ["Pelé", "Michel Platini", "Gary Lineker", "Zico", "Karl-Heinz Rummenigge", "Paolo Rossi", "Lothar Matthäus", "Diego Maradona"],
  long: ["Haile Gebrselassie", "Kenenisa Bekele", "Mo Farah", "Abebe Bikila", "Paul Tergat", "Eliud Kipchoge"],
  fb00: ["Thierry Henry", "Franck Ribéry", "Patrick Vieira", "Fabio Cannavaro", "Francesco Totti", "Zinedine Zidane", "Andrea Pirlo"],
  box: ["Muhammad Ali", "Joe Frazier", "Mike Tyson", "Sugar Ray Leonard", "Lennox Lewis", "Rocky Marciano", "Floyd Mayweather Jr."],
  nba: ["Michael Jordan", "Kareem Abdul-Jabbar", "Kobe Bryant", "Larry Bird", "Magic Johnson", "Bill Russell", "Wilt Chamberlain"],
  swim: ["Mark Spitz", "Ian Thorpe", "Ryan Lochte", "Matt Biondi", "Alexander Popov", "Michael Phelps", "Johnny Weissmuller"],
  sprint: ["Carl Lewis", "Tyson Gay", "Asafa Powell", "Yohan Blake", "Maurice Greene", "Justin Gatlin", "Usain Bolt"],
  tennisW: ["Martina Navratilova", "Chris Evert", "Monica Seles", "Gabriela Sabatini", "Serena Williams", "Steffi Graf", "Billie Jean King", "Evonne Goolagong"],
  fb10: ["Xavi Hernández", "David Villa", "Fernando Torres", "Carles Puyol", "Wesley Sneijder", "Arjen Robben", "Andrés Iniesta"],
  fb14: ["Thomas Müller", "Miroslav Klose", "Toni Kroos", "Lionel Messi", "André Schürrle", "Mario Götze"],
  fb66: ["Bobby Charlton", "Bobby Moore", "Gordon Banks", "Jimmy Greaves", "Eusébio", "Geoff Hurst"],
  fb22: ["Lionel Messi", "Olivier Giroud", "Ángel Di María", "Julián Álvarez", "Antoine Griezmann", "Kylian Mbappé"],
  chess: ["Bobby Fischer", "Magnus Carlsen", "Viswanathan Anand", "Vladimir Kramnik", "Mikhail Tal", "Garry Kasparov", "Anatoly Karpov"],
  tennisM: ["John McEnroe", "Jimmy Connors", "Ivan Lendl", "Boris Becker", "Pete Sampras", "Björn Borg", "Rod Laver"],
  jump: ["Javier Sotomayor", "Sergey Bubka", "Carl Lewis", "Bob Beamon", "Dick Fosbury", "Mike Powell", "Armand Duplantis"],
  f1old: ["Juan Manuel Fangio", "Alberto Ascari", "Stirling Moss", "Jack Brabham", "Jim Clark", "Giuseppe Farina"],
};

/** Nicknames: [nickname en, es, de, athlete] */
export const ATHLETE_NICKNAMES: [string, string, string, string][] = [
  ["“The Cannibal” (Le Cannibale)", "«El Caníbal» (Le Cannibale)", "„Der Kannibale“ (Le Cannibale)", "Eddy Merckx"],
  ["“The Badger” (Le Blaireau)", "«El Tejón» (Le Blaireau)", "„Der Dachs“ (Le Blaireau)", "Bernard Hinault"],
  ["“The Greatest”", "«The Greatest» (el más grande)", "„The Greatest“ (der Größte)", "Muhammad Ali"],
  ["“Iron Mike”", "«Iron Mike»", "„Iron Mike“", "Mike Tyson"],
  ["“His Airness”", "«His Airness»", "„His Airness“", "Michael Jordan"],
  ["“The Great One”", "«The Great One» (el Grande)", "„The Great One“", "Wayne Gretzky"],
  ["“Der Kaiser” (The Emperor)", "«Der Kaiser» (el Káiser)", "„Der Kaiser“", "Franz Beckenbauer"],
  ["“Der Bomber” (The Bomber)", "«Der Bomber» (el Bombardero)", "„Der Bomber“", "Gerd Müller"],
  ["“The King of Clay”", "«El Rey de la Tierra Batida»", "„Der Sandplatzkönig“", "Rafael Nadal"],
  ["“O Fenômeno” (The Phenomenon)", "«O Fenômeno» (el Fenómeno)", "„O Fenômeno“ (das Phänomen)", "Ronaldo (Nazário)"],
  ["“La Pulga” (The Flea)", "«La Pulga»", "„La Pulga“ (der Floh)", "Lionel Messi"],
  ["“El Pibe de Oro” (The Golden Boy)", "«El Pibe de Oro»", "„El Pibe de Oro“ (der Goldjunge)", "Diego Maradona"],
  ["“O Rei” (The King)", "«O Rei» (el Rey)", "„O Rei“ (der König)", "Pelé"],
  ["“The Baltimore Bullet”", "«La Bala de Baltimore»", "„The Baltimore Bullet“", "Michael Phelps"],
  ["“The Thorpedo”", "«The Thorpedo»", "„The Thorpedo“", "Ian Thorpe"],
  ["“Il Pirata” (The Pirate)", "«Il Pirata» (el Pirata)", "„Il Pirata“ (der Pirat)", "Marco Pantani"],
  ["“The Black Mamba”", "«La Mamba Negra»", "„Black Mamba“", "Kobe Bryant"],
  ["“The Professor”", "«El Profesor»", "„Der Professor“", "Alain Prost"],
  ["“The Iceman”", "«The Iceman» (el Hombre de Hielo)", "„Iceman“", "Kimi Räikkönen"],
  ["“The Golden Bear”", "«El Oso Dorado»", "„Der Goldene Bär“", "Jack Nicklaus"],
  ["“The Divine Ponytail” (Il Divin Codino)", "«Il Divin Codino» (la Divina Coleta)", "„Il Divin Codino“ (der göttliche Zopf)", "Roberto Baggio"],
  ["“El Niño” (The Kid)", "«El Niño»", "„El Niño“ (das Kind)", "Fernando Torres"],
  ["“The Rocket” (snooker)", "«The Rocket» (snooker)", "„The Rocket“ (Snooker)", "Ronnie O'Sullivan"],
  ["“The Brown Bomber”", "«El Bombardero de Detroit»", "„Brown Bomber“", "Joe Louis"],
  ["“The Bambino”", "«The Bambino»", "„The Bambino“", "Babe Ruth"],
  ["“Pistol Pete” (tennis)", "«Pistol Pete» (tenis)", "„Pistol Pete“ (Tennis)", "Pete Sampras"],
  ["“The Flying Dutchman” (football)", "«El Holandés Volador» (fútbol)", "„Der fliegende Holländer“ (Fußball)", "Johan Cruyff"],
];
/** Extra wrong answers for nickname questions (athletes without a clashing nickname above). */
export const NICKNAME_EXTRAS = ["Usain Bolt", "Lewis Hamilton", "Serena Williams", "Zinedine Zidane", "Carl Lewis", "Novak Djokovic", "Steffi Graf", "Miguel Induráin", "Tiger Woods", "Magic Johnson"];

// ── equipment & playing areas ──
/** [equipment en (with article), es, de (accusative), sport key, sport keys never offered as wrong] */
export const EQUIPMENT: [string, string, string, string, string[]?][] = [
  ["a putter", "un putter", "einen Putter", "golf"], ["stones and brooms", "piedras y escobas", "Steine und Besen", "curling"],
  ["a bow and arrows", "un arco y flechas", "Pfeil und Bogen", "archery"], ["oars", "remos", "Ruder (Riemen)", "rowing", ["sailing"]],
  ["stumps and bails", "stumps y bails (palos y travesaños)", "Stumps und Bails", "cricket"], ["a dartboard", "una diana", "eine Dartscheibe", "darts"],
  ["a cue", "un taco", "ein Queue", "snooker"], ["a barbell", "una barra con discos", "eine Langhantel", "weightlifting"],
  ["a relay baton", "un testigo de relevos", "einen Staffelstab", "athletics"], ["a catcher's mitt", "un guante de receptor (catcher)", "einen Catcher-Handschuh", "baseball"],
  ["a hurley and a sliotar", "un hurley y un sliotar", "einen Hurley und einen Sliotar", "hurling", ["fieldhockey"]],
  ["a chalk bag and carabiners", "magnesio y mosquetones", "Chalkbag und Karabiner", "climbing"],
  ["a ball with three finger holes", "una bola con tres agujeros para los dedos", "eine Kugel mit drei Fingerlöchern", "bowling"],
  ["skis and a rifle", "esquís y un rifle", "Ski und ein Gewehr", "biathlon"], ["a mallet and hoops", "un mazo y aros", "einen Schläger und Tore (Hoops)", "croquet", ["polo"]],
  ["a horse and a long-handled mallet", "un caballo y un mazo de mango largo", "ein Pferd und einen langstieligen Schläger", "polo", ["horse"]],
  ["a discus", "un disco", "einen Diskus", "athletics"], ["a javelin", "una jabalina", "einen Speer", "athletics"],
  ["a board and a wetsuit", "una tabla y un traje de neopreno", "ein Brett und einen Neoprenanzug", "surfing", ["sailing"]],
];
export const EQUIP_POOL = ["golf", "curling", "archery", "rowing", "cricket", "darts", "snooker", "weightlifting", "athletics", "baseball", "hurling", "climbing",
  "bowling", "biathlon", "croquet", "polo", "surfing", "tennis", "football", "swimming", "fencing", "cycling", "boxing", "icehockey", "basketball", "volleyball",
  "handball", "rugby", "sailing", "judo", "tabletennis", "badminton"];

/** [area en, es, de, sport key, whole area?, sport keys never offered as wrong] */
export const AREAS: [string, string, string, string, boolean, string[]?][] = [
  ["ring", "cuadrilátero (ring)", "Ring", "boxing", true, ["wrestling", "sumo", "mma"]], ["dohyō", "dohyō", "Dohyō", "sumo", true],
  ["Octagon", "octágono", "Octagon", "mma", true], ["diamond", "diamante", "Diamond", "baseball", true], ["gridiron", "gridiron", "Gridiron", "amfootball", true],
  ["green", "green", "Grün", "golf", false, ["croquet"]], ["fairway", "calle (fairway)", "Fairway", "golf", false], ["oche", "oche", "Oche", "darts", false],
  ["house", "casa (house)", "Haus", "curling", false], ["hog line", "línea hog", "Hogline", "curling", false],
  ["end zone", "end zone (zona de anotación)", "Endzone", "amfootball", false, ["rugby"]], ["mound", "montículo", "Mound (Wurfhügel)", "baseball", false],
  ["home plate", "home plate (base de meta)", "Home Plate", "baseball", false], ["gutter", "canal", "Rinne", "bowling", false],
];
export const AREA_POOL = ["boxing", "sumo", "mma", "baseball", "amfootball", "golf", "darts", "curling", "bowling", "tennis", "football", "basketball", "icehockey",
  "cricket", "volleyball", "handball", "swimming", "athletics", "fencing", "judo", "snooker", "tabletennis", "badminton", "cycling"];
