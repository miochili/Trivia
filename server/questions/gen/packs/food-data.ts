/**
 * Fact tables for the "food." question pack (see ./food.ts).
 * L = [en, es, de]. Difficulty: "e" easy, "m" medium, "h" hard.
 * Origin rows: [en, es, de, country id, difficulty, countries never offered as a wrong answer
 * because they share or claim the item].
 */
type L = [string, string, string];
export type D = "e" | "m" | "h";
export type Origin = [string, string, string, string, D, string[]?];

// ── breads ──────────────────────────────────────────────────────────
export const BREADS: Origin[] = [
  ["Baguette", "Baguette", "Baguette", "france", "e"],
  ["Brioche", "Brioche", "Brioche", "france", "m"],
  ["Fougasse", "Fougasse", "Fougasse", "france", "h", ["italy"]],
  ["Ciabatta", "Chapata", "Ciabatta", "italy", "e"],
  ["Focaccia", "Focaccia", "Focaccia", "italy", "e"],
  ["Grissini", "Grissini", "Grissini", "italy", "m"],
  ["Piadina", "Piadina", "Piadina", "italy", "m"],
  ["Pumpernickel", "Pumpernickel", "Pumpernickel", "germany", "m"],
  ["Pretzel", "Pretzel", "Brezel", "germany", "e", ["austria"]],
  ["Corn tortilla", "Tortilla de maíz", "Maistortilla", "mexico", "e", ["honduras", "nicaragua", "costa_rica"]],
  ["Soda bread", "Pan de soda", "Sodabrot", "ireland", "m", ["uk"]],
  ["Crumpet", "Crumpet", "Crumpet", "uk", "m", ["ireland"]],
  ["Knäckebröd (crispbread)", "Knäckebröd (pan crujiente)", "Knäckebrot", "sweden", "m", ["norway", "finland", "denmark"]],
  ["Baozi (steamed buns)", "Baozi", "Baozi", "china", "m"],
  ["Melonpan", "Melonpan", "Melonpan", "japan", "h"],
  ["Simit", "Simit", "Simit", "turkey", "h", ["greece", "bulgaria"]],
  ["Damper", "Damper", "Damper", "australia", "h", ["new_zealand"]],
  ["Kaiser roll", "Panecillo Kaiser", "Kaisersemmel", "austria", "m", ["germany", "czechia", "hungary"]],
  ["Borodinsky bread", "Pan Borodinsky", "Borodinski-Brot", "russia", "h", ["ukraine", "belarus"]],
  ["Lefse", "Lefse", "Lefse", "norway", "h", ["sweden", "denmark"]],
  ["Pandesal", "Pandesal", "Pandesal", "philippines", "h", ["spain"]],
];

// ── sweets & desserts (none of the ones already in data/food.ts) ─────
export const SWEETS: Origin[] = [
  ["Churros", "Churros", "Churros", "spain", "e", ["portugal", "mexico", "argentina", "colombia", "venezuela", "peru", "chile", "cuba", "uruguay"]],
  ["Crema catalana", "Crema catalana", "Crema catalana", "spain", "m", ["france"]],
  ["Turrón", "Turrón", "Turrón", "spain", "m", ["italy"]],
  ["Tarta de Santiago", "Tarta de Santiago", "Tarta de Santiago", "spain", "m"],
  ["Ensaïmada", "Ensaimada", "Ensaïmada", "spain", "m"],
  ["Polvorones", "Polvorones", "Polvorones", "spain", "m", ["mexico", "philippines"]],
  ["Macarons", "Macarons", "Macarons", "france", "e", ["italy"]],
  ["Crème brûlée", "Crème brûlée", "Crème brûlée", "france", "e", ["spain", "uk"]],
  ["Éclairs", "Éclairs", "Éclairs", "france", "m"],
  ["Tarte Tatin", "Tarta Tatin", "Tarte Tatin", "france", "m"],
  ["Madeleines", "Magdalenas francesas (madeleines)", "Madeleines", "france", "m", ["spain"]],
  ["Mille-feuille", "Milhojas (mille-feuille)", "Mille-feuille", "france", "m", ["italy"]],
  ["Panna cotta", "Panna cotta", "Panna cotta", "italy", "e"],
  ["Cannoli", "Cannoli", "Cannoli", "italy", "m"],
  ["Panettone", "Panettone", "Panettone", "italy", "e"],
  ["Cassata", "Cassata", "Cassata", "italy", "h"],
  ["Apple strudel", "Strudel de manzana", "Apfelstrudel", "austria", "m", ["germany", "hungary", "czechia", "slovakia", "slovenia"]],
  ["Kaiserschmarrn", "Kaiserschmarrn", "Kaiserschmarrn", "austria", "m", ["germany"]],
  ["Linzer torte", "Tarta Linzer", "Linzer Torte", "austria", "h"],
  ["Black Forest gateau", "Tarta Selva Negra", "Schwarzwälder Kirschtorte", "germany", "e"],
  ["Stollen", "Stollen", "Stollen", "germany", "m"],
  ["Brigadeiros", "Brigadeiros", "Brigadeiros", "brazil", "m"],
  ["Mochi", "Mochi", "Mochi", "japan", "m", ["china", "south_korea", "north_korea"]],
  ["Dorayaki", "Dorayaki", "Dorayaki", "japan", "h"],
  ["Gulab jamun", "Gulab jamun", "Gulab Jamun", "india", "m", ["pakistan", "bangladesh", "nepal", "sri_lanka"]],
  ["Kulfi", "Kulfi", "Kulfi", "india", "h", ["pakistan", "bangladesh", "nepal"]],
  ["Brownies", "Brownies", "Brownies", "usa", "e"],
  ["Pecan pie", "Tarta de nueces pecanas", "Pecan Pie", "usa", "m"],
  ["Key lime pie", "Key lime pie", "Key Lime Pie", "usa", "h"],
  ["Banoffee pie", "Banoffee pie", "Banoffee Pie", "uk", "m"],
  ["Sticky toffee pudding", "Sticky toffee pudding", "Sticky Toffee Pudding", "uk", "m"],
  ["Eton mess", "Eton mess", "Eton Mess", "uk", "h"],
  ["Kanelbullar (cinnamon buns)", "Kanelbullar (bollos de canela)", "Kanelbullar (Zimtschnecken)", "sweden", "m", ["finland", "denmark", "norway"]],
  ["Semla", "Semla", "Semla", "sweden", "h", ["finland", "denmark", "norway"]],
  ["Stroopwafels", "Stroopwafels", "Stroopwafels", "netherlands", "m", ["belgium"]],
  ["Poffertjes", "Poffertjes", "Poffertjes", "netherlands", "h", ["belgium"]],
  ["Pączki", "Pączki", "Pączki", "poland", "h", ["ukraine", "germany", "austria"]],
  ["Kürtőskalács (chimney cake)", "Kürtőskalács", "Kürtőskalács (Baumstriezel)", "hungary", "h", ["romania", "czechia", "slovakia"]],
  ["Dobos torte", "Tarta Dobos", "Dobostorte", "hungary", "h"],
  ["Loukoumades", "Loukoumades", "Loukoumades", "greece", "h", ["turkey"]],
  ["Bingsu", "Bingsu", "Bingsu", "south_korea", "h", ["north_korea", "japan"]],
  ["Mango sticky rice", "Arroz glutinoso con mango", "Mango Sticky Rice", "thailand", "m", ["laos", "cambodia", "myanmar", "vietnam"]],
  ["Halo-halo", "Halo-halo", "Halo-Halo", "philippines", "h"],
];

// ── sauces & condiments ─────────────────────────────────────────────
export const SAUCES: Origin[] = [
  ["Pesto", "Pesto", "Pesto", "italy", "e"],
  ["Bolognese sauce", "Salsa boloñesa", "Bolognese-Soße", "italy", "e"],
  ["Béchamel", "Bechamel", "Béchamelsoße", "france", "m", ["italy"]],
  ["Hollandaise sauce", "Salsa holandesa", "Sauce hollandaise", "france", "h", ["netherlands"]],
  ["Béarnaise sauce", "Salsa bearnesa", "Sauce béarnaise", "france", "m"],
  ["Romesco", "Romesco", "Romesco", "spain", "m"],
  ["Mojo picón", "Mojo picón", "Mojo picón", "spain", "h", ["cuba"]],
  ["Chimichurri", "Chimichurri", "Chimichurri", "argentina", "m", ["uruguay"]],
  ["Worcestershire sauce", "Salsa Worcestershire", "Worcestershiresauce", "uk", "m"],
  ["Tabasco", "Tabasco", "Tabasco", "usa", "m", ["mexico"]],
  ["Ranch dressing", "Salsa ranch", "Ranch-Dressing", "usa", "m"],
  ["Gochujang", "Gochujang", "Gochujang", "south_korea", "m", ["north_korea"]],
  ["Teriyaki sauce", "Salsa teriyaki", "Teriyakisoße", "japan", "e"],
  ["Ponzu", "Ponzu", "Ponzu", "japan", "h"],
  ["Hoisin sauce", "Salsa hoisin", "Hoisinsoße", "china", "m", ["vietnam"]],
  ["Nuoc cham", "Nuoc cham", "Nuoc Cham", "vietnam", "h", ["laos", "cambodia"]],
  ["Pebre", "Pebre", "Pebre", "chile", "h"],
  ["Pico de gallo", "Pico de gallo", "Pico de Gallo", "mexico", "m"],
  ["Sambal", "Sambal", "Sambal", "indonesia", "m", ["malaysia", "singapore"]],
  ["Raita", "Raita", "Raita", "india", "m", ["pakistan", "bangladesh", "nepal"]],
];

// ── sausages & cured meats ──────────────────────────────────────────
export const CURED: Origin[] = [
  ["Chorizo", "Chorizo", "Chorizo", "spain", "e", ["portugal", "mexico"]],
  ["Serrano ham", "Jamón serrano", "Serrano-Schinken", "spain", "e"],
  ["Sobrassada", "Sobrasada", "Sobrasada", "spain", "h"],
  ["Fuet", "Fuet", "Fuet", "spain", "h", ["france"]],
  ["Botifarra", "Butifarra", "Butifarra", "spain", "h", ["france", "argentina", "uruguay"]],
  ["Prosciutto di Parma", "Jamón de Parma", "Parmaschinken", "italy", "e"],
  ["Mortadella", "Mortadela", "Mortadella", "italy", "m"],
  ["Bresaola", "Bresaola", "Bresaola", "italy", "m"],
  ["'Nduja", "'Nduja", "'Nduja", "italy", "h"],
  ["Pancetta", "Panceta", "Pancetta", "italy", "m"],
  ["Bratwurst", "Bratwurst", "Bratwurst", "germany", "e"],
  ["Weisswurst", "Weisswurst", "Weißwurst", "germany", "m", ["austria"]],
  ["Frankfurter sausages", "Salchichas de Fráncfort", "Frankfurter Würstchen", "germany", "e", ["austria"]],
  ["Kiełbasa", "Kiełbasa", "Kiełbasa", "poland", "m", ["ukraine", "belarus"]],
  ["Kabanos", "Kabanos", "Kabanos", "poland", "h", ["ukraine", "belarus"]],
  ["Black pudding", "Black pudding", "Black Pudding", "uk", "m", ["ireland"]],
  ["Cumberland sausage", "Salchicha de Cumberland", "Cumberland-Wurst", "uk", "m"],
  ["Saucisson sec", "Saucisson sec", "Saucisson sec", "france", "m"],
  ["Bayonne ham", "Jamón de Bayona", "Bayonne-Schinken", "france", "m"],
  ["Boerewors", "Boerewors", "Boerewors", "south_africa", "h", ["namibia", "zimbabwe", "botswana"]],
  ["Lap cheong", "Lap cheong", "Lap Cheong", "china", "h"],
  ["Linguiça", "Linguiça", "Linguiça", "portugal", "h", ["brazil"]],
  ["Sucuk", "Sucuk", "Sucuk", "turkey", "h", ["bulgaria", "greece", "serbia", "albania"]],
];

// ── wine regions ────────────────────────────────────────────────────
export const WINE_REGIONS: Origin[] = [
  ["Rioja", "Rioja", "Rioja", "spain", "e"],
  ["Ribera del Duero", "Ribera del Duero", "Ribera del Duero", "spain", "m"],
  ["Priorat", "Priorat", "Priorat", "spain", "h"],
  ["Penedès", "Penedés", "Penedès", "spain", "h"],
  ["Rías Baixas", "Rías Baixas", "Rías Baixas", "spain", "h"],
  ["Bordeaux", "Burdeos", "Bordeaux", "france", "e"],
  ["Burgundy", "Borgoña", "Burgund", "france", "e"],
  ["Alsace", "Alsacia", "Elsass", "france", "m", ["germany"]],
  ["Loire Valley", "Valle del Loira", "Loiretal", "france", "m"],
  ["Beaujolais", "Beaujolais", "Beaujolais", "france", "m"],
  ["Chablis", "Chablis", "Chablis", "france", "m"],
  ["Châteauneuf-du-Pape", "Châteauneuf-du-Pape", "Châteauneuf-du-Pape", "france", "m"],
  ["Chianti", "Chianti", "Chianti", "italy", "e"],
  ["Barolo", "Barolo", "Barolo", "italy", "m"],
  ["Valpolicella", "Valpolicella", "Valpolicella", "italy", "m"],
  ["Montalcino", "Montalcino", "Montalcino", "italy", "h"],
  ["Mosel", "Mosela", "Mosel", "germany", "m", ["france"]],
  ["Rheingau", "Rheingau", "Rheingau", "germany", "m"],
  ["Pfalz (Palatinate)", "Palatinado", "Pfalz", "germany", "h"],
  ["Douro", "Douro", "Douro", "portugal", "m", ["spain"]],
  ["Vinho Verde", "Vinho Verde", "Vinho Verde", "portugal", "m"],
  ["Napa Valley", "Valle de Napa", "Napa Valley", "usa", "e"],
  ["Sonoma", "Sonoma", "Sonoma", "usa", "m"],
  ["Mendoza", "Mendoza", "Mendoza", "argentina", "m"],
  ["Barossa Valley", "Valle de Barossa", "Barossa Valley", "australia", "m"],
  ["Hunter Valley", "Valle del Hunter", "Hunter Valley", "australia", "h"],
  ["Marlborough", "Marlborough", "Marlborough", "new_zealand", "h", ["uk"]],
  ["Stellenbosch", "Stellenbosch", "Stellenbosch", "south_africa", "m"],
  ["Wachau", "Wachau", "Wachau", "austria", "h", ["germany"]],
  ["Colchagua Valley", "Valle de Colchagua", "Colchagua-Tal", "chile", "h"],
  ["Maipo Valley", "Valle del Maipo", "Maipo-Tal", "chile", "h"],
  ["Santorini", "Santorini", "Santorin", "greece", "m"],
];
/** Countries offered as wrong answers for wine regions. */
export const WINE_COUNTRIES = ["france", "italy", "spain", "portugal", "germany", "austria", "hungary", "greece", "usa", "argentina", "chile", "australia", "new_zealand", "south_africa", "canada", "romania"];

// ── food & drink brands (country where the brand was founded) ───────
export const BRANDS: Origin[] = [
  ["Nutella", "Nutella", "Nutella", "italy", "e"],
  ["Ferrero Rocher", "Ferrero Rocher", "Ferrero Rocher", "italy", "m"],
  ["Barilla", "Barilla", "Barilla", "italy", "m"],
  ["Lavazza", "Lavazza", "Lavazza", "italy", "m"],
  ["San Pellegrino", "San Pellegrino", "San Pellegrino", "italy", "m"],
  ["Campari", "Campari", "Campari", "italy", "m"],
  ["Aperol", "Aperol", "Aperol", "italy", "m"],
  ["Peroni", "Peroni", "Peroni", "italy", "m"],
  ["Haribo", "Haribo", "Haribo", "germany", "e"],
  ["Dr. Oetker", "Dr. Oetker", "Dr. Oetker", "germany", "m"],
  ["Ritter Sport", "Ritter Sport", "Ritter Sport", "germany", "m"],
  ["Jägermeister", "Jägermeister", "Jägermeister", "germany", "e"],
  ["Capri-Sun", "Capri-Sun", "Capri-Sun", "germany", "h", ["italy"]],
  ["Fanta", "Fanta", "Fanta", "germany", "h", ["usa"]],
  ["Knorr", "Knorr", "Knorr", "germany", "h"],
  ["Coca-Cola", "Coca-Cola", "Coca-Cola", "usa", "e"],
  ["Heinz", "Heinz", "Heinz", "usa", "m"],
  ["Kellogg's", "Kellogg's", "Kellogg's", "usa", "m"],
  ["Hershey's", "Hershey's", "Hershey's", "usa", "m"],
  ["Oreo", "Oreo", "Oreo", "usa", "m"],
  ["Jack Daniel's", "Jack Daniel's", "Jack Daniel's", "usa", "m"],
  ["Ben & Jerry's", "Ben & Jerry's", "Ben & Jerry's", "usa", "m"],
  ["Philadelphia cream cheese", "Queso Philadelphia", "Philadelphia-Frischkäse", "usa", "m"],
  ["Heineken", "Heineken", "Heineken", "netherlands", "e"],
  ["Grolsch", "Grolsch", "Grolsch", "netherlands", "m"],
  ["Amstel", "Amstel", "Amstel", "netherlands", "m"],
  ["Carlsberg", "Carlsberg", "Carlsberg", "denmark", "m"],
  ["Lurpak", "Lurpak", "Lurpak", "denmark", "h"],
  ["Jameson", "Jameson", "Jameson", "ireland", "m"],
  ["Baileys", "Baileys", "Baileys", "ireland", "m"],
  ["Kerrygold", "Kerrygold", "Kerrygold", "ireland", "m"],
  ["Corona beer", "Cerveza Corona", "Corona-Bier", "mexico", "e"],
  ["Bimbo", "Bimbo", "Bimbo", "mexico", "h"],
  ["Kikkoman", "Kikkoman", "Kikkoman", "japan", "m"],
  ["Yakult", "Yakult", "Yakult", "japan", "m"],
  ["Pocky", "Pocky", "Pocky", "japan", "m"],
  ["Asahi", "Asahi", "Asahi", "japan", "m"],
  ["Tsingtao", "Tsingtao", "Tsingtao", "china", "m", ["germany", "uk"]],
  ["Danone", "Danone", "Danone", "france", "m", ["spain"]],
  ["Évian", "Évian", "Évian", "france", "m"],
  ["Perrier", "Perrier", "Perrier", "france", "m"],
  ["Moët & Chandon", "Moët & Chandon", "Moët & Chandon", "france", "e"],
  ["Bonne Maman", "Bonne Maman", "Bonne Maman", "france", "m"],
  ["Chupa Chups", "Chupa Chups", "Chupa Chups", "spain", "m"],
  ["Estrella Damm", "Estrella Damm", "Estrella Damm", "spain", "m"],
  ["Mahou", "Mahou", "Mahou", "spain", "m"],
  ["Cola Cao", "Cola Cao", "Cola Cao", "spain", "m"],
  ["Freixenet", "Freixenet", "Freixenet", "spain", "m"],
  ["Cadbury", "Cadbury", "Cadbury", "uk", "m"],
  ["Twinings", "Twinings", "Twinings", "uk", "m"],
  ["Marmite", "Marmite", "Marmite", "uk", "m"],
  ["Johnnie Walker", "Johnnie Walker", "Johnnie Walker", "uk", "m", ["usa"]],
  ["Bombay Sapphire", "Bombay Sapphire", "Bombay Sapphire", "uk", "h", ["india"]],
  ["Absolut Vodka", "Vodka Absolut", "Absolut Wodka", "sweden", "m", ["russia", "poland"]],
  ["Fazer", "Fazer", "Fazer", "finland", "h"],
  ["Stella Artois", "Stella Artois", "Stella Artois", "belgium", "m"],
  ["Lotus Biscoff", "Lotus Biscoff", "Lotus Biscoff", "belgium", "h"],
  ["Côte d'Or", "Côte d'Or", "Côte d'Or", "belgium", "h", ["france"]],
  ["Super Bock", "Super Bock", "Super Bock", "portugal", "h"],
  ["Red Bull", "Red Bull", "Red Bull", "austria", "m", ["thailand"]],
  ["Manner", "Manner", "Manner", "austria", "h"],
  ["Tim Tam", "Tim Tam", "Tim Tam", "australia", "h"],
  ["Vegemite", "Vegemite", "Vegemite", "australia", "m"],
  ["Inca Kola", "Inca Kola", "Inca Kola", "peru", "h"],
  ["Guaraná Antarctica", "Guaraná Antarctica", "Guaraná Antarctica", "brazil", "h"],
  ["Tiger Beer", "Cerveza Tiger", "Tiger Bier", "singapore", "h"],
  ["Quilmes", "Quilmes", "Quilmes", "argentina", "h"],
  ["Shin Ramyun", "Shin Ramyun", "Shin Ramyun", "south_korea", "h"],
  ["Amul", "Amul", "Amul", "india", "h"],
];

// ── restaurant & café chains (country where the chain was founded) ───
export const CHAINS: Origin[] = [
  ["McDonald's", "McDonald's", "McDonald's", "usa", "e"],
  ["Burger King", "Burger King", "Burger King", "usa", "e"],
  ["KFC", "KFC", "KFC", "usa", "e"],
  ["Subway", "Subway", "Subway", "usa", "e"],
  ["Starbucks", "Starbucks", "Starbucks", "usa", "e"],
  ["Domino's", "Domino's", "Domino's", "usa", "m"],
  ["Pizza Hut", "Pizza Hut", "Pizza Hut", "usa", "m"],
  ["Taco Bell", "Taco Bell", "Taco Bell", "usa", "m", ["mexico"]],
  ["Five Guys", "Five Guys", "Five Guys", "usa", "m"],
  ["Dunkin'", "Dunkin'", "Dunkin'", "usa", "m"],
  ["Krispy Kreme", "Krispy Kreme", "Krispy Kreme", "usa", "m"],
  ["Tim Hortons", "Tim Hortons", "Tim Hortons", "canada", "m", ["usa"]],
  ["Telepizza", "Telepizza", "Telepizza", "spain", "m"],
  ["100 Montaditos", "100 Montaditos", "100 Montaditos", "spain", "m"],
  ["Foster's Hollywood", "Foster's Hollywood", "Foster's Hollywood", "spain", "h", ["usa"]],
  ["Goiko", "Goiko", "Goiko", "spain", "h"],
  ["Pret A Manger", "Pret A Manger", "Pret A Manger", "uk", "m", ["france"]],
  ["Costa Coffee", "Costa Coffee", "Costa Coffee", "uk", "m", ["italy"]],
  ["Greggs", "Greggs", "Greggs", "uk", "h"],
  ["Wagamama", "Wagamama", "Wagamama", "uk", "h", ["japan"]],
  ["Hard Rock Cafe", "Hard Rock Cafe", "Hard Rock Cafe", "uk", "h", ["usa"]],
  ["Nando's", "Nando's", "Nando's", "south_africa", "h", ["portugal", "mozambique"]],
  ["Vapiano", "Vapiano", "Vapiano", "germany", "m", ["italy"]],
  ["Nordsee", "Nordsee", "Nordsee", "germany", "m"],
  ["Hans im Glück", "Hans im Glück", "Hans im Glück", "germany", "h"],
  ["Max Burgers", "Max Burgers", "Max Burgers", "sweden", "h"],
  ["Hesburger", "Hesburger", "Hesburger", "finland", "h"],
  ["MOS Burger", "MOS Burger", "MOS Burger", "japan", "h"],
  ["Yoshinoya", "Yoshinoya", "Yoshinoya", "japan", "h"],
  ["Jollibee", "Jollibee", "Jollibee", "philippines", "m"],
  ["Paris Baguette", "Paris Baguette", "Paris Baguette", "south_korea", "h", ["france"]],
  ["Haidilao", "Haidilao", "Haidilao", "china", "h"],
  ["Paul (bakery chain)", "Paul (cadena de panaderías)", "Paul (Bäckereikette)", "france", "m"],
  ["Quick (burger chain)", "Quick (cadena de hamburguesas)", "Quick (Burgerkette)", "belgium", "h", ["france"]],
  ["Guzman y Gomez", "Guzman y Gomez", "Guzman y Gomez", "australia", "h", ["mexico", "spain"]],
];

// ── pasta ───────────────────────────────────────────────────────────
export const PASTA: L[] = [
  ["Penne", "Penne", "Penne"], ["Fusilli", "Fusilli", "Fusilli"], ["Farfalle", "Farfalle", "Farfalle"], ["Rigatoni", "Rigatoni", "Rigatoni"],
  ["Tagliatelle", "Tagliatelle", "Tagliatelle"], ["Orecchiette", "Orecchiette", "Orecchiette"], ["Linguine", "Linguine", "Linguine"],
  ["Conchiglie", "Conchiglie", "Conchiglie"], ["Pappardelle", "Pappardelle", "Pappardelle"], ["Tortellini", "Tortellini", "Tortellini"],
  ["Ravioli", "Raviolis", "Ravioli"], ["Spaghetti", "Espaguetis", "Spaghetti"], ["Fettuccine", "Fettuccine", "Fettuccine"],
  ["Cannelloni", "Canelones", "Cannelloni"], ["Bucatini", "Bucatini", "Bucatini"], ["Strozzapreti", "Strozzapreti", "Strozzapreti"],
  ["Gemelli", "Gemelli", "Gemelli"], ["Paccheri", "Paccheri", "Paccheri"], ["Ziti", "Ziti", "Ziti"],
];
/** Italian foods that are NOT pasta. */
export const NOT_PASTA: L[] = [
  ["Bruschetta", "Bruschetta", "Bruschetta"], ["Risotto", "Risotto", "Risotto"], ["Panna cotta", "Panna cotta", "Panna cotta"],
  ["Prosciutto", "Prosciutto", "Prosciutto"], ["Mortadella", "Mortadela", "Mortadella"], ["Polenta", "Polenta", "Polenta"],
  ["Focaccia", "Focaccia", "Focaccia"], ["Cannoli", "Cannoli", "Cannoli"], ["Arancini", "Arancini", "Arancini"],
  ["Burrata", "Burrata", "Burrata"], ["Ricotta", "Ricotta", "Ricotta"], ["Grissini", "Grissini", "Grissini"],
  ["Pancetta", "Panceta", "Pancetta"], ["Biscotti", "Biscotti", "Biscotti"], ["Mascarpone", "Mascarpone", "Mascarpone"],
  ["Ossobuco", "Ossobuco", "Ossobuco"], ["Carpaccio", "Carpaccio", "Carpaccio"], ["Calzone", "Calzone", "Calzone"],
  ["Saltimbocca", "Saltimbocca", "Saltimbocca"], ["Tiramisu", "Tiramisú", "Tiramisu"], ["Bresaola", "Bresaola", "Bresaola"],
  ["Frittata", "Frittata", "Frittata"], ["Caponata", "Caponata", "Caponata"], ["Crostini", "Crostini", "Crostini"],
];
/** [Italian pasta name, meaning L, difficulty] */
export const PASTA_MEANING: [string, L, D][] = [
  ["Farfalle", ["Butterflies", "Mariposas", "Schmetterlinge"], "e"],
  ["Penne", ["Quill pens", "Plumas de escribir", "Schreibfedern"], "m"],
  ["Orecchiette", ["Little ears", "Orejitas", "Öhrchen"], "m"],
  ["Linguine", ["Little tongues", "Lengüitas", "Zünglein"], "m"],
  ["Vermicelli", ["Little worms", "Gusanitos", "Würmchen"], "m"],
  ["Conchiglie", ["Shells", "Conchas", "Muscheln"], "m"],
  ["Spaghetti", ["Little strings", "Cordelitos", "Schnürchen"], "m"],
  ["Cappelletti", ["Little hats", "Sombreritos", "Hütchen"], "m"],
  ["Strozzapreti", ["Priest stranglers", "Estranguladores de curas", "Priesterwürger"], "h"],
  ["Radiatori", ["Radiators", "Radiadores", "Heizkörper"], "e"],
  ["Ruote", ["Wheels", "Ruedas", "Räder"], "m"],
  ["Stelline", ["Little stars", "Estrellitas", "Sternchen"], "m"],
  ["Gemelli", ["Twins", "Gemelos", "Zwillinge"], "m"],
  ["Capelli d'angelo", ["Angel hair", "Cabello de ángel", "Engelshaar"], "e"],
  ["Orzo", ["Barley", "Cebada", "Gerste"], "h"],
  ["Lumache", ["Snails", "Caracoles", "Schnecken"], "h"],
  ["Campanelle", ["Little bells", "Campanitas", "Glöckchen"], "h"],
  ["Ditalini", ["Little thimbles", "Dedalitos", "Fingerhütchen"], "h"],
  ["Creste di gallo", ["Rooster's combs", "Crestas de gallo", "Hahnenkämme"], "m"],
];

// ── coffee drinks ───────────────────────────────────────────────────
/** [en (in a sentence), es (after "un"), de (after "ein"), description L, difficulty, clash tags] */
export type Described = [string, string, string, L, D, string[]?];
export const COFFEES: Described[] = [
  ["affogato", "affogato", "Affogato", ["Espresso poured over a scoop of ice cream", "Espresso vertido sobre una bola de helado", "Espresso, über eine Kugel Eis gegossen"], "m"],
  ["Americano", "americano", "Americano", ["Espresso topped up with hot water", "Espresso alargado con agua caliente", "Mit heißem Wasser verlängerter Espresso"], "e"],
  ["Irish coffee", "café irlandés", "Irish Coffee", ["Hot coffee with whiskey, sugar and cream", "Café caliente con whisky, azúcar y nata", "Heißer Kaffee mit Whiskey, Zucker und Sahne"], "e", ["alcohol", "cream"]],
  ["caffè mocha", "café moca", "Caffè Mocha", ["Espresso with chocolate and steamed milk", "Espresso con chocolate y leche caliente", "Espresso mit Schokolade und heißer Milch"], "m", ["milk"]],
  ["cappuccino", "capuchino", "Cappuccino", ["Espresso with steamed milk and a thick layer of milk foam", "Espresso con leche caliente y una gruesa capa de espuma", "Espresso mit heißer Milch und dicker Milchschaumhaube"], "e", ["milk"]],
  ["latte macchiato", "latte macchiato", "Latte macchiato", ["A tall glass of hot milk with a shot of espresso poured in", "Un vaso alto de leche caliente al que se añade un espresso", "Ein hohes Glas heiße Milch, in das ein Espresso gegossen wird"], "m", ["milk"]],
  ["cortado", "cortado", "Cortado", ["Espresso \"cut\" with a small splash of warm milk", "Espresso con solo un chorrito de leche caliente", "Espresso mit nur einem kleinen Schuss warmer Milch"], "m", ["milk"]],
  ["ristretto", "ristretto", "Ristretto", ["An extra-short, extra-strong espresso", "Un espresso muy corto y concentrado", "Ein besonders kurzer, starker Espresso"], "m"],
  ["Turkish coffee", "café turco", "türkischer Kaffee", ["Very finely ground coffee boiled in a small pot and served unfiltered", "Café molido muy fino, hervido en un cazo pequeño y servido sin filtrar", "Sehr fein gemahlener Kaffee, im Kännchen aufgekocht und ungefiltert serviert"], "m"],
  ["dalgona coffee", "café dalgona", "Dalgona-Kaffee", ["Whipped instant-coffee foam on top of cold milk", "Espuma de café instantáneo batido sobre leche fría", "Aufgeschlagener Instantkaffee-Schaum auf kalter Milch"], "h", ["instant"]],
  ["cold brew", "cold brew", "Cold Brew", ["Coffee steeped in cold water for many hours", "Café infusionado en agua fría durante muchas horas", "Kaffee, der viele Stunden in kaltem Wasser zieht"], "m", ["iced"]],
  ["Greek frappé", "frappé griego", "griechischer Frappé", ["Instant coffee shaken with ice and water until foamy", "Café instantáneo agitado con hielo y agua hasta hacer espuma", "Mit Eis und Wasser schaumig geschüttelter Instantkaffee"], "h", ["instant", "iced"]],
  ["carajillo", "carajillo", "Carajillo", ["Coffee with a shot of brandy or rum", "Café con un chorrito de brandy o ron", "Kaffee mit einem Schuss Brandy oder Rum"], "m", ["alcohol"]],
  ["espresso con panna", "espresso con panna", "Espresso con Panna", ["Espresso topped with whipped cream", "Espresso cubierto de nata montada", "Espresso mit einer Haube Schlagsahne"], "h", ["cream"]],
  ["cà phê sữa đá", "cà phê sữa đá", "Cà phê sữa đá", ["Strong drip coffee with sweetened condensed milk over ice", "Café de goteo fuerte con leche condensada y hielo", "Starker Filterkaffee mit gezuckerter Kondensmilch auf Eis"], "h", ["iced"]],
];

// ── which part of the plant do we eat ───────────────────────────────
export const PARTS: Record<string, { label: L; obj: L }> = {
  root: { label: ["Root", "Raíz", "Wurzel"], obj: ["the root", "la raíz", "die Wurzel"] },
  leaf: { label: ["Leaves", "Hojas", "Blätter"], obj: ["the leaves", "las hojas", "die Blätter"] },
  stem: { label: ["Stem (shoots)", "Tallo (brotes)", "Stängel (Sprosse)"], obj: ["the stem", "el tallo", "den Stängel"] },
  flower: { label: ["Flowers (buds)", "Flores (capullos)", "Blüten (Knospen)"], obj: ["the flower buds", "las flores", "die Blüten"] },
  seed: { label: ["Seeds", "Semillas", "Samen"], obj: ["the seeds", "las semillas", "die Samen"] },
  fruit: { label: ["Fruit", "Fruto", "Frucht"], obj: ["the fruit", "el fruto", "die Frucht"] },
  tuber: { label: ["Tuber", "Tubérculo", "Knolle"], obj: ["the tuber", "el tubérculo", "die Knolle"] },
};
/** [en, es, de, part, difficulty, parts never offered as wrong / never asked with] */
export const PLANT_PARTS: [string, string, string, string, D, string[]?][] = [
  ["Carrot", "Zanahoria", "Karotte", "root", "e"],
  ["Beetroot", "Remolacha", "Rote Bete", "root", "e"],
  ["Radish", "Rábano", "Radieschen", "root", "e"],
  ["Parsnip", "Chirivía", "Pastinake", "root", "m"],
  ["Spinach", "Espinacas", "Spinat", "leaf", "e"],
  ["Lettuce", "Lechuga", "Kopfsalat", "leaf", "e"],
  ["Kale", "Col rizada", "Grünkohl", "leaf", "e"],
  ["Rocket", "Rúcula", "Rucola", "leaf", "e"],
  ["Asparagus", "Espárragos", "Spargel", "stem", "m"],
  ["Kohlrabi", "Colinabo", "Kohlrabi", "stem", "h", ["tuber", "root"]],
  ["Broccoli", "Brócoli", "Brokkoli", "flower", "m", ["stem"]],
  ["Cauliflower", "Coliflor", "Blumenkohl", "flower", "m"],
  ["Artichoke", "Alcachofa", "Artischocke", "flower", "h"],
  ["Capers", "Alcaparras", "Kapern", "flower", "h", ["fruit"]],
  ["Peas", "Guisantes", "Erbsen", "seed", "e", ["fruit"]],
  ["Lentils", "Lentejas", "Linsen", "seed", "e", ["fruit"]],
  ["Chickpeas", "Garbanzos", "Kichererbsen", "seed", "e", ["fruit"]],
  ["Broad beans", "Habas", "Dicke Bohnen", "seed", "m", ["fruit"]],
  ["Sweetcorn", "Maíz dulce", "Zuckermais", "seed", "m", ["fruit"]],
  ["Tomato", "Tomate", "Tomate", "fruit", "m"],
  ["Cucumber", "Pepino", "Gurke", "fruit", "m"],
  ["Aubergine", "Berenjena", "Aubergine", "fruit", "m"],
  ["Courgette", "Calabacín", "Zucchini", "fruit", "m"],
  ["Pumpkin", "Calabaza", "Kürbis", "fruit", "m"],
  ["Bell pepper", "Pimiento", "Paprika", "fruit", "m"],
  ["Potato", "Patata", "Kartoffel", "tuber", "m", ["stem"]],
];

// ── spices: which part of the plant ─────────────────────────────────
export const SPICE_PARTS: Record<string, L> = {
  bark: ["Bark", "Corteza", "Rinde"],
  bud: ["Dried flower buds", "Capullos de flor secos", "Getrocknete Blütenknospen"],
  stigma: ["Stigmas of the flower (threads)", "Estigmas de la flor (hebras)", "Blütennarben (Fäden)"],
  berry: ["Dried berries", "Bayas secas", "Getrocknete Beeren"],
  seed: ["Seeds", "Semillas", "Samen"],
  pod: ["Seed pods", "Vainas", "Schoten"],
  rhizome: ["Rhizome (underground stem)", "Rizoma (tallo subterráneo)", "Wurzelstock (Rhizom)"],
  leaf: ["Leaves", "Hojas", "Blätter"],
};
export const SPICES: [string, string, string, string, D, string[]?][] = [
  ["Cinnamon", "Canela", "Zimt", "bark", "e"],
  ["Cloves", "Clavo", "Gewürznelken", "bud", "h"],
  ["Saffron", "Azafrán", "Safran", "stigma", "m"],
  ["Black pepper", "Pimienta negra", "Schwarzer Pfeffer", "berry", "m", ["seed", "pod"]],
  ["Allspice", "Pimienta de Jamaica", "Piment", "berry", "h", ["seed", "pod"]],
  ["Nutmeg", "Nuez moscada", "Muskatnuss", "seed", "m", ["berry", "pod"]],
  ["Cumin", "Comino", "Kreuzkümmel", "seed", "m", ["berry", "pod"]],
  ["Caraway", "Alcaravea", "Kümmel", "seed", "h", ["berry", "pod"]],
  ["Mustard", "Mostaza", "Senf", "seed", "m", ["pod", "berry"]],
  ["Vanilla", "Vainilla", "Vanille", "pod", "m", ["seed", "berry"]],
  ["Cardamom", "Cardamomo", "Kardamom", "pod", "h", ["seed", "berry"]],
  ["Ginger", "Jengibre", "Ingwer", "rhizome", "m"],
  ["Turmeric", "Cúrcuma", "Kurkuma", "rhizome", "m"],
  ["Galangal", "Galanga", "Galgant", "rhizome", "h"],
  ["Bay laurel", "Laurel", "Lorbeer", "leaf", "e"],
  ["Oregano", "Orégano", "Oregano", "leaf", "e"],
];

// ── cooking terms ───────────────────────────────────────────────────
/** [en, es, de, meaning L, difficulty, clash tags] */
export const COOK_TERMS: Described[] = [
  ["Al dente", "Al dente", "Al dente", ["Cooked so it is still firm when bitten", "Cocinado de modo que aún esté firme al morder", "So gegart, dass es beim Hineinbeißen noch Biss hat"], "e"],
  ["Julienne", "Juliana", "Julienne", ["Cut into thin matchstick strips", "Cortado en tiras finas como cerillas", "In feine, streichholzdünne Streifen geschnitten"], "m", ["cut"]],
  ["Brunoise", "Brunoise", "Brunoise", ["Cut into tiny, even cubes", "Cortado en daditos muy pequeños", "In winzige, gleichmäßige Würfel geschnitten"], "h", ["cut"]],
  ["Flambé", "Flambear", "Flambieren", ["Pouring alcohol over food and setting it alight", "Rociar un alimento con licor y prenderle fuego", "Speisen mit Alkohol übergießen und anzünden"], "e"],
  ["Blanch", "Escaldar", "Blanchieren", ["Boil briefly, then plunge into ice-cold water", "Hervir brevemente y pasar a agua helada", "Kurz in kochendes Wasser geben und dann in Eiswasser abschrecken"], "m"],
  ["Poach", "Escalfar", "Pochieren", ["Cook gently in liquid that is barely simmering", "Cocer suavemente en un líquido que apenas hierve", "Sanft in knapp siedender Flüssigkeit garen"], "m"],
  ["Braise", "Brasear", "Schmoren", ["Sear, then cook slowly in a little liquid in a covered pot", "Dorar y luego cocinar lentamente con poco líquido en una olla tapada", "Anbraten und dann zugedeckt mit wenig Flüssigkeit langsam garen"], "m"],
  ["Sauté", "Saltear", "Sautieren", ["Fry quickly in a little hot fat, tossing often", "Freír rápidamente en poca grasa caliente, removiendo a menudo", "Schnell in wenig heißem Fett braten und dabei schwenken"], "m"],
  ["Marinate", "Marinar", "Marinieren", ["Soak food in a seasoned liquid before cooking", "Dejar un alimento en un líquido aliñado antes de cocinarlo", "Lebensmittel vor dem Garen in eine gewürzte Flüssigkeit einlegen"], "e"],
  ["Knead", "Amasar", "Kneten", ["Work dough by pressing, folding and stretching it", "Trabajar una masa presionándola, doblándola y estirándola", "Teig durch Drücken, Falten und Dehnen bearbeiten"], "e"],
  ["Deglaze", "Desglasar", "Ablöschen", ["Loosen the browned bits in a pan with a liquid", "Despegar con un líquido los restos dorados de la sartén", "Den Bratensatz in der Pfanne mit Flüssigkeit lösen"], "h"],
  ["Bain-marie", "Baño maría", "Bain-Marie", ["A hot-water bath for gentle heating", "Un recipiente con agua caliente para calentar suavemente", "Ein heißes Wasserbad zum schonenden Erhitzen"], "m", ["water"]],
  ["Sous vide", "Sous vide", "Sous-vide", ["Cooking vacuum-sealed food in a precisely heated water bath", "Cocinar alimentos envasados al vacío en agua a temperatura exacta", "Vakuumierte Lebensmittel im exakt temperierten Wasserbad garen"], "m", ["water"]],
  ["Mise en place", "Mise en place", "Mise en Place", ["Preparing and laying out all ingredients before cooking", "Preparar y organizar todos los ingredientes antes de cocinar", "Alle Zutaten vor dem Kochen vorbereiten und bereitstellen"], "h"],
  ["Roux", "Roux", "Roux", ["A cooked mixture of flour and fat used to thicken sauces", "Una mezcla cocinada de harina y grasa para espesar salsas", "Eine angeschwitzte Mischung aus Mehl und Fett zum Binden von Soßen"], "h"],
  ["Reduce", "Reducir", "Reduzieren", ["Simmer a liquid so that it evaporates and thickens", "Cocer un líquido para que se evapore y espese", "Eine Flüssigkeit einkochen lassen, damit sie dicker wird"], "m"],
  ["Au gratin", "Gratinar", "Gratinieren", ["Topped with cheese or breadcrumbs and browned under the grill", "Dorar la superficie bajo el grill, a menudo con queso", "Die Oberfläche unter dem Grill bräunen, oft mit Käse"], "m"],
  ["Confit", "Confit", "Confit", ["Cooked slowly in fat and kept in it", "Cocinado lentamente en grasa y conservado en ella", "Langsam in Fett gegart und darin aufbewahrt"], "h"],
];

// ── kitchen tools ───────────────────────────────────────────────────
/** [en with article, en label, es, de, use L, difficulty, clash tags] */
export const TOOLS: [string, string, string, string, L, D, string[]?][] = [
  ["a colander", "Colander", "Escurridor", "Seiher (Durchschlag)", ["Draining pasta or vegetables", "Escurrir la pasta o las verduras", "Nudeln oder Gemüse abgießen"], "e"],
  ["a ladle", "Ladle", "Cucharón", "Schöpfkelle", ["Serving soup", "Servir sopa", "Suppe auf die Teller verteilen"], "e"],
  ["a whisk", "Whisk", "Varillas", "Schneebesen", ["Beating eggs or whipping cream", "Batir huevos o montar nata", "Eier verquirlen oder Sahne schlagen"], "e"],
  ["a mortar and pestle", "Mortar and pestle", "Mortero", "Mörser und Stößel", ["Grinding spices by hand", "Machacar especias a mano", "Gewürze von Hand zermahlen"], "e"],
  ["a rolling pin", "Rolling pin", "Rodillo", "Nudelholz", ["Flattening dough", "Estirar la masa", "Teig ausrollen"], "e"],
  ["a grater", "Grater", "Rallador", "Reibe", ["Shredding cheese or carrots into fine strips", "Convertir queso o zanahoria en tiras finas", "Käse oder Karotten fein raspeln"], "e", ["cut"]],
  ["a vegetable peeler", "Vegetable peeler", "Pelador", "Sparschäler", ["Removing the skin from potatoes or carrots", "Quitar la piel a patatas o zanahorias", "Die Haut von Kartoffeln oder Karotten entfernen"], "e"],
  ["a corkscrew", "Corkscrew", "Sacacorchos", "Korkenzieher", ["Opening wine bottles", "Abrir botellas de vino", "Weinflaschen öffnen"], "e"],
  ["kitchen tongs", "Kitchen tongs", "Pinzas de cocina", "Küchenzange", ["Gripping and turning hot food", "Agarrar y dar la vuelta a alimentos calientes", "Heißes Grillgut greifen und wenden"], "e"],
  ["a mandoline", "Mandoline", "Mandolina", "Gemüsehobel", ["Cutting vegetables into very thin, even slices", "Cortar verduras en láminas muy finas y uniformes", "Gemüse in hauchdünne, gleichmäßige Scheiben schneiden"], "m", ["cut"]],
  ["a pastry brush", "Pastry brush", "Pincel de cocina", "Backpinsel", ["Spreading beaten egg or glaze over pastry", "Untar la masa con huevo batido o almíbar", "Teig mit Ei oder Glasur bestreichen"], "m"],
  ["a wok", "Wok", "Wok", "Wok", ["Stir-frying over very high heat", "Saltear a fuego muy vivo", "Unter Rühren bei großer Hitze braten"], "e"],
  ["a piping bag", "Piping bag", "Manga pastelera", "Spritzbeutel", ["Decorating cakes with cream or icing", "Decorar tartas con nata o crema", "Torten mit Sahne oder Creme verzieren"], "m"],
  ["a funnel", "Funnel", "Embudo", "Trichter", ["Pouring liquids into narrow openings", "Pasar líquidos a recipientes de boca estrecha", "Flüssigkeiten in enge Öffnungen füllen"], "e"],
];

// ── groups for "which of these is a …?" ─────────────────────────────
export const FERMENTED: L[] = [
  ["Yogurt", "Yogur", "Joghurt"], ["Sauerkraut", "Chucrut", "Sauerkraut"], ["Kimchi", "Kimchi", "Kimchi"], ["Soy sauce", "Salsa de soja", "Sojasoße"],
  ["Miso", "Miso", "Miso"], ["Kefir", "Kéfir", "Kefir"], ["Kombucha", "Kombucha", "Kombucha"], ["Tempeh", "Tempeh", "Tempeh"],
  ["Sourdough bread", "Pan de masa madre", "Sauerteigbrot"], ["Wine", "Vino", "Wein"], ["Beer", "Cerveza", "Bier"], ["Cider", "Sidra", "Cidre"],
  ["Natto", "Natto", "Natto"], ["Vinegar", "Vinagre", "Essig"],
];
export const NOT_FERMENTED: L[] = [
  ["Tofu", "Tofu", "Tofu"], ["Honey", "Miel", "Honig"], ["Strawberry jam", "Mermelada de fresa", "Erdbeermarmelade"], ["Mayonnaise", "Mayonesa", "Mayonnaise"],
  ["Hummus", "Hummus", "Hummus"], ["Guacamole", "Guacamole", "Guacamole"], ["Popcorn", "Palomitas", "Popcorn"], ["Scrambled eggs", "Huevos revueltos", "Rührei"],
  ["Mashed potatoes", "Puré de patatas", "Kartoffelpüree"], ["Fresh orange juice", "Zumo de naranja natural", "Frisch gepresster Orangensaft"], ["Pesto", "Pesto", "Pesto"],
  ["Peanut butter", "Crema de cacahuete", "Erdnussbutter"], ["Ice cream", "Helado", "Speiseeis"], ["Custard", "Natillas", "Vanillepudding"], ["Apple sauce", "Compota de manzana", "Apfelmus"],
  ["Omelette", "Tortilla francesa", "Omelett"], ["Condensed milk", "Leche condensada", "Kondensmilch"],
];
export const SHELLFISH: L[] = [
  ["Mussels", "Mejillones", "Miesmuscheln"], ["Oysters", "Ostras", "Austern"], ["Clams", "Almejas", "Venusmuscheln"], ["Scallops", "Vieiras", "Jakobsmuscheln"],
  ["Prawns", "Gambas", "Garnelen"], ["Lobster", "Langosta", "Hummer"], ["Crab", "Buey de mar", "Taschenkrebs"], ["Langoustines", "Cigalas", "Kaisergranat"],
  ["Cockles", "Berberechos", "Herzmuscheln"], ["Razor clams", "Navajas", "Schwertmuscheln"],
];
export const FISH: L[] = [
  ["Salmon", "Salmón", "Lachs"], ["Tuna", "Atún", "Thunfisch"], ["Cod", "Bacalao", "Kabeljau"], ["Trout", "Trucha", "Forelle"],
  ["Sardines", "Sardinas", "Sardinen"], ["Mackerel", "Caballa", "Makrele"], ["Hake", "Merluza", "Seehecht"], ["Sea bass", "Lubina", "Wolfsbarsch"],
  ["Anchovies", "Anchoas", "Sardellen"], ["Herring", "Arenque", "Hering"], ["Sole", "Lenguado", "Seezunge"], ["Monkfish", "Rape", "Seeteufel"],
  ["Carp", "Carpa", "Karpfen"], ["Swordfish", "Pez espada", "Schwertfisch"],
];
export const MUSHROOMS: L[] = [
  ["Chanterelles", "Rebozuelos", "Pfifferlinge"], ["Morels", "Colmenillas", "Morcheln"], ["Black truffle", "Trufa negra", "Schwarzer Trüffel"],
  ["Shiitake", "Shiitake", "Shiitake"], ["Enoki", "Enoki", "Enoki"], ["Portobello", "Portobello", "Portobello"], ["Matsutake", "Matsutake", "Matsutake"],
];
export const NOT_MUSHROOMS: L[] = [
  ["Artichoke", "Alcachofa", "Artischocke"], ["Asparagus", "Espárrago", "Spargel"], ["Leek", "Puerro", "Lauch"], ["Fennel", "Hinojo", "Fenchel"],
  ["Kohlrabi", "Colinabo", "Kohlrabi"], ["Courgette", "Calabacín", "Zucchini"], ["Okra", "Quimbombó", "Okra"], ["Endive", "Endibia", "Chicorée"],
  ["Celeriac", "Apionabo", "Knollensellerie"], ["Parsnip", "Chirivía", "Pastinake"], ["Shallot", "Chalota", "Schalotte"], ["Romanesco", "Romanesco", "Romanesco"],
];
export const LEGUMES: L[] = [
  ["Lentils", "Lentejas", "Linsen"], ["Chickpeas", "Garbanzos", "Kichererbsen"], ["Peas", "Guisantes", "Erbsen"], ["Kidney beans", "Alubias rojas", "Kidneybohnen"],
  ["Soybeans", "Soja", "Sojabohnen"], ["Peanuts", "Cacahuetes", "Erdnüsse"], ["Broad beans", "Habas", "Dicke Bohnen"], ["Black beans", "Alubias negras", "Schwarze Bohnen"],
  ["Mung beans", "Judías mungo", "Mungbohnen"],
];
export const NUTS_GRAINS: L[] = [
  ["Almonds", "Almendras", "Mandeln"], ["Walnuts", "Nueces", "Walnüsse"], ["Hazelnuts", "Avellanas", "Haselnüsse"], ["Cashews", "Anacardos", "Cashewkerne"],
  ["Rice", "Arroz", "Reis"], ["Barley", "Cebada", "Gerste"], ["Oats", "Avena", "Hafer"], ["Sunflower seeds", "Pipas de girasol", "Sonnenblumenkerne"],
  ["Pumpkin seeds", "Pipas de calabaza", "Kürbiskerne"], ["Maize", "Maíz", "Mais"], ["Pine nuts", "Piñones", "Pinienkerne"], ["Sesame seeds", "Sésamo", "Sesam"],
  ["Pistachios", "Pistachos", "Pistazien"], ["Wheat", "Trigo", "Weizen"],
];
export const CEREALS: L[] = [
  ["Wheat", "Trigo", "Weizen"], ["Rice", "Arroz", "Reis"], ["Barley", "Cebada", "Gerste"], ["Oats", "Avena", "Hafer"], ["Rye", "Centeno", "Roggen"],
  ["Maize", "Maíz", "Mais"], ["Millet", "Mijo", "Hirse"], ["Sorghum", "Sorgo", "Sorghum"], ["Spelt", "Espelta", "Dinkel"],
];
export const NOT_CEREALS: L[] = [
  ["Lentils", "Lentejas", "Linsen"], ["Chickpeas", "Garbanzos", "Kichererbsen"], ["Potatoes", "Patatas", "Kartoffeln"], ["Cassava", "Yuca", "Maniok"],
  ["Peanuts", "Cacahuetes", "Erdnüsse"], ["Soybeans", "Soja", "Sojabohnen"], ["Sunflower seeds", "Pipas de girasol", "Sonnenblumenkerne"],
  ["Chestnuts", "Castañas", "Esskastanien"], ["Almonds", "Almendras", "Mandeln"], ["Peas", "Guisantes", "Erbsen"], ["Sesame seeds", "Sésamo", "Sesam"],
  ["Flaxseed", "Semillas de lino", "Leinsamen"],
];
export const CITRUS: L[] = [
  ["Lemon", "Limón", "Zitrone"], ["Lime", "Lima", "Limette"], ["Orange", "Naranja", "Orange"], ["Grapefruit", "Pomelo", "Grapefruit"],
  ["Mandarin", "Mandarina", "Mandarine"], ["Clementine", "Clementina", "Clementine"], ["Yuzu", "Yuzu", "Yuzu"], ["Bergamot orange", "Bergamota", "Bergamotte"],
];
export const NOT_CITRUS: L[] = [
  ["Apple", "Manzana", "Apfel"], ["Pear", "Pera", "Birne"], ["Mango", "Mango", "Mango"], ["Kiwi", "Kiwi", "Kiwi"], ["Banana", "Plátano", "Banane"],
  ["Pineapple", "Piña", "Ananas"], ["Peach", "Melocotón", "Pfirsich"], ["Plum", "Ciruela", "Pflaume"], ["Grape", "Uva", "Weintraube"],
  ["Pomegranate", "Granada", "Granatapfel"], ["Papaya", "Papaya", "Papaya"], ["Fig", "Higo", "Feige"], ["Cherry", "Cereza", "Kirsche"],
  ["Lychee", "Lichi", "Litschi"], ["Passion fruit", "Fruta de la pasión", "Passionsfrucht"], ["Guava", "Guayaba", "Guave"], ["Apricot", "Albaricoque", "Aprikose"],
  ["Melon", "Melón", "Melone"],
];
export const STONE_FRUIT: L[] = [
  ["Peach", "Melocotón", "Pfirsich"], ["Cherry", "Cereza", "Kirsche"], ["Plum", "Ciruela", "Pflaume"], ["Apricot", "Albaricoque", "Aprikose"],
  ["Mango", "Mango", "Mango"], ["Olive", "Aceituna", "Olive"], ["Nectarine", "Nectarina", "Nektarine"], ["Date", "Dátil", "Dattel"], ["Avocado", "Aguacate", "Avocado"],
];
export const NOT_STONE_FRUIT: L[] = [
  ["Apple", "Manzana", "Apfel"], ["Pear", "Pera", "Birne"], ["Orange", "Naranja", "Orange"], ["Banana", "Plátano", "Banane"], ["Kiwi", "Kiwi", "Kiwi"],
  ["Watermelon", "Sandía", "Wassermelone"], ["Strawberry", "Fresa", "Erdbeere"], ["Pomegranate", "Granada", "Granatapfel"], ["Papaya", "Papaya", "Papaya"],
  ["Fig", "Higo", "Feige"], ["Melon", "Melón", "Melone"], ["Passion fruit", "Fruta de la pasión", "Passionsfrucht"], ["Pineapple", "Piña", "Ananas"],
  ["Blueberry", "Arándano", "Heidelbeere"], ["Raspberry", "Frambuesa", "Himbeere"], ["Lemon", "Limón", "Zitrone"], ["Guava", "Guayaba", "Guave"],
];
export const BLUE_CHEESES: L[] = [
  ["Gorgonzola", "Gorgonzola", "Gorgonzola"], ["Roquefort", "Roquefort", "Roquefort"], ["Stilton", "Stilton", "Stilton"], ["Danish Blue", "Danish Blue", "Danablu"],
  ["Cabrales", "Cabrales", "Cabrales"], ["Bleu d'Auvergne", "Bleu d'Auvergne", "Bleu d'Auvergne"], ["Fourme d'Ambert", "Fourme d'Ambert", "Fourme d'Ambert"],
];
export const NOT_BLUE_CHEESES: L[] = [
  ["Brie", "Brie", "Brie"], ["Camembert", "Camembert", "Camembert"], ["Cheddar", "Cheddar", "Cheddar"], ["Gouda", "Gouda", "Gouda"],
  ["Manchego", "Manchego", "Manchego"], ["Parmesan", "Parmesano", "Parmesan"], ["Mozzarella", "Mozzarella", "Mozzarella"], ["Feta", "Feta", "Feta"],
  ["Edam", "Edam", "Edamer"], ["Halloumi", "Halloumi", "Halloumi"], ["Ricotta", "Ricotta", "Ricotta"], ["Mascarpone", "Mascarpone", "Mascarpone"],
  ["Pecorino", "Pecorino", "Pecorino"], ["Comté", "Comté", "Comté"], ["Burrata", "Burrata", "Burrata"], ["Taleggio", "Taleggio", "Taleggio"],
];
/** Crops and foods first domesticated in the Americas. */
export const FROM_AMERICAS: L[] = [
  ["Potato", "Patata", "Kartoffel"], ["Tomato", "Tomate", "Tomate"], ["Maize", "Maíz", "Mais"], ["Cocoa", "Cacao", "Kakao"],
  ["Vanilla", "Vainilla", "Vanille"], ["Chilli pepper", "Guindilla", "Chili"], ["Avocado", "Aguacate", "Avocado"], ["Pineapple", "Piña", "Ananas"],
  ["Peanut", "Cacahuete", "Erdnuss"], ["Quinoa", "Quinoa", "Quinoa"], ["Cassava", "Yuca", "Maniok"], ["Pumpkin", "Calabaza", "Kürbis"],
  ["Sweet potato", "Boniato", "Süßkartoffel"], ["Turkey", "Pavo", "Truthahn"], ["Papaya", "Papaya", "Papaya"], ["Cashew", "Anacardo", "Cashewkern"],
  ["Sunflower", "Girasol", "Sonnenblume"],
];
/** Crops first domesticated in Asia (Fertile-Crescent and banana borderline cases left out). */
export const FROM_ASIA: L[] = [
  ["Rice", "Arroz", "Reis"], ["Tea", "Té", "Tee"], ["Orange", "Naranja", "Orange"], ["Mango", "Mango", "Mango"], ["Peach", "Melocotón", "Pfirsich"],
  ["Soybean", "Soja", "Sojabohne"], ["Ginger", "Jengibre", "Ingwer"], ["Black pepper", "Pimienta negra", "Schwarzer Pfeffer"], ["Cinnamon", "Canela", "Zimt"],
  ["Aubergine", "Berenjena", "Aubergine"], ["Kiwi", "Kiwi", "Kiwi"], ["Lemon", "Limón", "Zitrone"], ["Cucumber", "Pepino", "Gurke"], ["Lychee", "Lichi", "Litschi"],
  ["Cloves", "Clavo", "Gewürznelken"], ["Nutmeg", "Nuez moscada", "Muskatnuss"],
];
/** Old-World crops from outside Asia and the Americas. */
export const FROM_AFRICA: L[] = [["Coffee", "Café", "Kaffee"], ["Watermelon", "Sandía", "Wassermelone"]];
/** Old-World crops whose origin is the Near East / Mediterranean (only used as "not from the Americas"). */
export const FROM_NEAR_EAST: L[] = [
  ["Wheat", "Trigo", "Weizen"], ["Barley", "Cebada", "Gerste"], ["Lentils", "Lentejas", "Linsen"], ["Olives", "Aceitunas", "Oliven"], ["Chickpeas", "Garbanzos", "Kichererbsen"],
];
export const CAFFEINE: L[] = [
  ["Coffee", "Café", "Kaffee"], ["Black tea", "Té negro", "Schwarzer Tee"], ["Green tea", "Té verde", "Grüner Tee"], ["Yerba mate", "Mate", "Mate-Tee"],
  ["Cola", "Refresco de cola", "Cola"], ["Energy drink", "Bebida energética", "Energydrink"], ["Matcha", "Matcha", "Matcha"], ["Oolong tea", "Té oolong", "Oolong-Tee"],
];
export const NO_CAFFEINE: L[] = [
  ["Rooibos tea", "Rooibos", "Rooibostee"], ["Chamomile tea", "Manzanilla", "Kamillentee"], ["Peppermint tea", "Infusión de menta", "Pfefferminztee"],
  ["Orange juice", "Zumo de naranja", "Orangensaft"], ["Milk", "Leche", "Milch"], ["Apple juice", "Zumo de manzana", "Apfelsaft"], ["Water", "Agua", "Wasser"],
  ["Coconut water", "Agua de coco", "Kokoswasser"], ["Tomato juice", "Zumo de tomate", "Tomatensaft"], ["Hibiscus tea", "Infusión de hibisco", "Hibiskustee"],
  ["Fennel tea", "Infusión de hinojo", "Fencheltee"],
];
export const RED_GRAPES: L[] = [
  "Cabernet Sauvignon", "Merlot", "Pinot Noir", "Syrah (Shiraz)", "Tempranillo", "Malbec", "Sangiovese", "Nebbiolo", "Carménère", "Gamay", "Touriga Nacional", "Mencía",
].map((s) => [s, s, s]);
export const WHITE_GRAPES: L[] = [
  "Chardonnay", "Sauvignon Blanc", "Riesling", "Chenin Blanc", "Albariño", "Verdejo", "Gewürztraminer", "Grüner Veltliner", "Viognier", "Sémillon", "Müller-Thurgau", "Silvaner", "Godello",
].map((s) => [s, s, s]);

// ── where does the meat come from / which milk is the cheese made of ─
export const ANIMALS: Record<string, L> = {
  pig: ["Pig", "Cerdo", "Schwein"],
  cow: ["Cow (cattle)", "Vaca (vacuno)", "Rind"],
  sheep: ["Sheep", "Oveja", "Schaf"],
  goat: ["Goat", "Cabra", "Ziege"],
  chicken: ["Chicken", "Pollo", "Huhn"],
  duck: ["Duck", "Pato", "Ente"],
  rabbit: ["Rabbit", "Conejo", "Kaninchen"],
};
export const MEATS: [string, string, string, string, D][] = [
  ["Prosciutto", "Prosciutto", "Prosciutto", "pig", "e"],
  ["Jamón ibérico", "Jamón ibérico", "Jamón ibérico", "pig", "e"],
  ["Pancetta", "Panceta", "Pancetta", "pig", "m"],
  ["Chorizo", "Chorizo", "Chorizo", "pig", "e"],
  ["Mortadella", "Mortadela", "Mortadella", "pig", "m"],
  ["Lardo", "Lardo", "Lardo", "pig", "h"],
  ["Carnitas", "Carnitas", "Carnitas", "pig", "m"],
  ["Bresaola", "Bresaola", "Bresaola", "cow", "h"],
  ["Wagyu", "Wagyu", "Wagyu", "cow", "m"],
  ["Ossobuco", "Ossobuco", "Ossobuco", "cow", "h"],
  ["Tafelspitz", "Tafelspitz", "Tafelspitz", "cow", "h"],
  ["Chateaubriand", "Chateaubriand", "Chateaubriand", "cow", "m"],
  ["Haggis", "Haggis", "Haggis", "sheep", "m"],
  ["Coq au vin", "Coq au vin", "Coq au Vin", "chicken", "m"],
  ["Magret", "Magret", "Magret", "duck", "h"],
];
export const MILKS: Record<string, L> = {
  cow: ["Cow's milk", "Leche de vaca", "Kuhmilch"],
  sheep: ["Sheep's milk", "Leche de oveja", "Schafsmilch"],
  goat: ["Goat's milk", "Leche de cabra", "Ziegenmilch"],
  buffalo: ["Water buffalo milk", "Leche de búfala", "Büffelmilch"],
};
export const CHEESE_MILK: [string, string, string, string, D][] = [
  ["Pecorino Romano", "Pecorino romano", "Pecorino Romano", "sheep", "m"],
  ["Manchego", "Manchego", "Manchego", "sheep", "m"],
  ["Roquefort", "Roquefort", "Roquefort", "sheep", "m"],
  ["Idiazabal", "Idiazábal", "Idiazábal", "sheep", "h"],
  ["Torta del Casar", "Torta del Casar", "Torta del Casar", "sheep", "h"],
  ["Mozzarella di bufala", "Mozzarella di bufala", "Mozzarella di Bufala", "buffalo", "e"],
  ["Parmigiano Reggiano", "Parmigiano Reggiano", "Parmigiano Reggiano", "cow", "m"],
  ["Gouda", "Gouda", "Gouda", "cow", "m"],
  ["Cheddar", "Cheddar", "Cheddar", "cow", "m"],
  ["Brie", "Brie", "Brie", "cow", "m"],
  ["Camembert", "Camembert", "Camembert", "cow", "m"],
  ["Gorgonzola", "Gorgonzola", "Gorgonzola", "cow", "m"],
  ["Stilton", "Stilton", "Stilton", "cow", "h"],
  ["Comté", "Comté", "Comté", "cow", "h"],
  ["Mascarpone", "Mascarpone", "Mascarpone", "cow", "m"],
  ["Crottin de Chavignol", "Crottin de Chavignol", "Crottin de Chavignol", "goat", "h"],
  ["Sainte-Maure de Touraine", "Sainte-Maure de Touraine", "Sainte-Maure de Touraine", "goat", "h"],
  ["Chèvre", "Chèvre", "Chèvre", "goat", "e"],
];

// ── Japanese food words ─────────────────────────────────────────────
/** [name, name, name, meaning L, difficulty, clash tags] */
export const JAPANESE: Described[] = [
  ["Wasabi", "Wasabi", "Wasabi", ["A hot green paste from a plant related to horseradish", "Una pasta verde picante de una planta parecida al rábano picante", "Eine scharfe grüne Paste aus einer meerrettichähnlichen Pflanze"], "e"],
  ["Nori", "Nori", "Nori", ["Dried seaweed sheets", "Láminas de alga seca", "Getrocknete Algenblätter"], "m"],
  ["Sashimi", "Sashimi", "Sashimi", ["Thin slices of raw fish served without rice", "Lonchas finas de pescado crudo servidas sin arroz", "Dünne Scheiben rohen Fisches, ohne Reis serviert"], "m"],
  ["Nigiri", "Nigiri", "Nigiri", ["A hand-pressed block of rice topped with fish", "Un bloque de arroz prensado a mano con pescado encima", "Von Hand geformter Reis mit Fisch obendrauf"], "m", ["rice"]],
  ["Maki", "Maki", "Maki", ["Sushi rolled up in a sheet of seaweed", "Sushi enrollado en una lámina de alga", "In ein Algenblatt eingerolltes Sushi"], "m", ["rice"]],
  ["Onigiri", "Onigiri", "Onigiri", ["A rice ball, often wrapped in seaweed", "Una bola de arroz, a menudo envuelta en alga", "Ein Reisbällchen, oft in Alge gewickelt"], "m", ["rice"]],
  ["Tempura", "Tempura", "Tempura", ["Seafood or vegetables fried in a light batter", "Marisco o verduras fritos en un rebozado ligero", "In leichtem Teig frittiertes Gemüse oder Meeresfrüchte"], "e", ["fried"]],
  ["Katsu", "Katsu", "Katsu", ["A breaded, deep-fried cutlet", "Un filete empanado y frito", "Ein paniertes, frittiertes Schnitzel"], "m", ["fried"]],
  ["Miso", "Miso", "Miso", ["A fermented soybean paste", "Una pasta de soja fermentada", "Eine fermentierte Sojabohnenpaste"], "m", ["soy"]],
  ["Natto", "Natto", "Natto", ["Sticky fermented whole soybeans", "Granos de soja fermentados y pegajosos", "Klebrige, fermentierte ganze Sojabohnen"], "h", ["soy"]],
  ["Edamame", "Edamame", "Edamame", ["Young green soybeans in their pods", "Vainas de soja verde tierna", "Junge grüne Sojabohnen in der Schote"], "m"],
  ["Gari", "Gari", "Gari", ["Thinly sliced pickled ginger", "Jengibre encurtido en láminas finas", "Dünn geschnittener eingelegter Ingwer"], "h"],
  ["Mochi", "Mochi", "Mochi", ["A chewy cake made from pounded sticky rice", "Un pastelito elástico de arroz glutinoso machacado", "Ein zäher Kuchen aus gestampftem Klebreis"], "m"],
  ["Udon", "Udon", "Udon", ["Thick wheat noodles", "Fideos gruesos de trigo", "Dicke Weizennudeln"], "m"],
  ["Soba", "Soba", "Soba", ["Noodles made from buckwheat", "Fideos de trigo sarraceno", "Nudeln aus Buchweizen"], "h"],
  ["Dashi", "Dashi", "Dashi", ["A stock made from kelp and dried bonito flakes", "Un caldo de alga kombu y copos de bonito seco", "Eine Brühe aus Kombu-Alge und Bonitoflocken"], "h"],
  ["Panko", "Panko", "Panko", ["Light, flaky breadcrumbs", "Pan rallado ligero y crujiente", "Leichtes, grobes Paniermehl"], "m"],
  ["Yakitori", "Yakitori", "Yakitori", ["Grilled chicken skewers", "Brochetas de pollo a la parrilla", "Gegrillte Hähnchenspieße"], "m"],
  ["Gyoza", "Gyoza", "Gyoza", ["Pan-fried dumplings", "Empanadillas a la plancha", "In der Pfanne gebratene Teigtaschen"], "m"],
  ["Umami", "Umami", "Umami", ["The savoury \"fifth taste\"", "El «quinto sabor», sabroso", "Der herzhafte „fünfte Geschmack“"], "m"],
  ["Bento", "Bento", "Bento", ["A single-portion meal packed in a box", "Una comida individual servida en una caja", "Eine Mahlzeit für eine Person in einer Box"], "e"],
];

// ── cocktails ───────────────────────────────────────────────────────
export const SPIRITS: Record<string, { label: L; with: L }> = {
  rum: { label: ["Rum", "Ron", "Rum"], with: ["rum", "ron", "Rum"] },
  tequila: { label: ["Tequila", "Tequila", "Tequila"], with: ["tequila", "tequila", "Tequila"] },
  vodka: { label: ["Vodka", "Vodka", "Wodka"], with: ["vodka", "vodka", "Wodka"] },
  gin: { label: ["Gin", "Ginebra", "Gin"], with: ["gin", "ginebra", "Gin"] },
  whiskey: { label: ["Whiskey", "Whisky", "Whiskey"], with: ["whiskey", "whisky", "Whiskey"] },
  cachaca: { label: ["Cachaça", "Cachaça", "Cachaça"], with: ["cachaça", "cachaça", "Cachaça"] },
  pisco: { label: ["Pisco", "Pisco", "Pisco"], with: ["pisco", "pisco", "Pisco"] },
  brandy: { label: ["Brandy (cognac)", "Brandy (coñac)", "Weinbrand (Cognac)"], with: ["brandy", "brandy", "Weinbrand"] },
};
/** [en, es, de, spirit, difficulty, spirits never offered as wrong answers] */
export const COCKTAILS: [string, string, string, string, D, string[]?][] = [
  ["Mojito", "Mojito", "Mojito", "rum", "e", ["cachaca"]],
  ["Daiquiri", "Daiquiri", "Daiquiri", "rum", "m", ["cachaca"]],
  ["Piña colada", "Piña colada", "Piña Colada", "rum", "e", ["cachaca"]],
  ["Cuba libre", "Cuba libre", "Cuba Libre", "rum", "e", ["cachaca"]],
  ["Mai Tai", "Mai Tai", "Mai Tai", "rum", "h", ["cachaca"]],
  ["Dark 'n' Stormy", "Dark 'n' Stormy", "Dark 'n' Stormy", "rum", "h", ["cachaca"]],
  ["Margarita", "Margarita", "Margarita", "tequila", "e"],
  ["Paloma", "Paloma", "Paloma", "tequila", "h"],
  ["Caipirinha", "Caipiriña", "Caipirinha", "cachaca", "m", ["rum"]],
  ["Dry Martini", "Dry Martini", "Dry Martini", "gin", "m", ["vodka"]],
  ["Negroni", "Negroni", "Negroni", "gin", "m"],
  ["Tom Collins", "Tom Collins", "Tom Collins", "gin", "h"],
  ["Cosmopolitan", "Cosmopolitan", "Cosmopolitan", "vodka", "m"],
  ["Moscow Mule", "Moscow Mule", "Moscow Mule", "vodka", "m"],
  ["Bloody Mary", "Bloody Mary", "Bloody Mary", "vodka", "e"],
  ["White Russian", "White Russian", "White Russian", "vodka", "m"],
  ["Screwdriver", "Destornillador", "Screwdriver", "vodka", "m"],
  ["Espresso martini", "Espresso martini", "Espresso Martini", "vodka", "m", ["gin"]],
  ["Old Fashioned", "Old Fashioned", "Old Fashioned", "whiskey", "m"],
  ["Manhattan", "Manhattan", "Manhattan", "whiskey", "m"],
  ["Mint julep", "Mint julep", "Mint Julep", "whiskey", "h"],
  ["Pisco sour", "Pisco sour", "Pisco Sour", "pisco", "e", ["brandy"]],
  ["Sidecar", "Sidecar", "Sidecar", "brandy", "h", ["pisco"]],
];

// ── what kind of dish is it ─────────────────────────────────────────
export const DISH_WHAT: Described[] = [
  ["Gazpacho", "Gazpacho", "Gazpacho", ["A cold tomato soup", "Una sopa fría de tomate", "Eine kalte Tomatensuppe"], "e", ["cold"]],
  ["Vichyssoise", "Vichyssoise", "Vichyssoise", ["A cold leek and potato soup", "Una crema fría de puerro y patata", "Eine kalte Lauch-Kartoffel-Suppe"], "h", ["cold"]],
  ["Borscht", "Borsch", "Borschtsch", ["A beetroot soup", "Una sopa de remolacha", "Eine Rote-Bete-Suppe"], "m"],
  ["Minestrone", "Minestrone", "Minestrone", ["A thick vegetable soup, often with pasta or beans", "Una sopa espesa de verduras, a menudo con pasta o alubias", "Eine dicke Gemüsesuppe, oft mit Nudeln oder Bohnen"], "m"],
  ["Carpaccio", "Carpaccio", "Carpaccio", ["Paper-thin slices of raw beef", "Láminas finísimas de carne de ternera cruda", "Hauchdünne Scheiben von rohem Rindfleisch"], "m", ["rawbeef"]],
  ["Steak tartare", "Steak tartar", "Tatar", ["Finely chopped raw beef, often with an egg yolk", "Carne de ternera cruda picada, a menudo con yema de huevo", "Fein gehacktes rohes Rindfleisch, oft mit Eigelb"], "m", ["rawbeef"]],
  ["Ceviche", "Ceviche", "Ceviche", ["Raw fish \"cooked\" in lime juice", "Pescado crudo marinado en zumo de lima", "In Limettensaft gegarter roher Fisch"], "m"],
  ["Bruschetta", "Bruschetta", "Bruschetta", ["Toasted bread rubbed with garlic and topped with tomato", "Pan tostado frotado con ajo y cubierto de tomate", "Geröstetes Brot mit Knoblauch und Tomaten"], "e"],
  ["Risotto", "Risotto", "Risotto", ["Creamy rice slowly cooked in broth", "Arroz cremoso cocido lentamente en caldo", "Cremiger, langsam in Brühe gegarter Reis"], "e", ["rice"]],
  ["Gnocchi", "Ñoquis", "Gnocchi", ["Small dumplings usually made from potato", "Bolitas de masa, normalmente de patata", "Kleine Klößchen, meist aus Kartoffeln"], "e", ["dumpling"]],
  ["Pierogi", "Pierogi", "Piroggen", ["Half-moon dumplings filled with potato, cheese or meat", "Empanadillas cocidas rellenas de patata, queso o carne", "Halbmondförmige Teigtaschen mit Kartoffel-, Käse- oder Fleischfüllung"], "m", ["dumpling"]],
  ["Crème brûlée", "Crème brûlée", "Crème brûlée", ["A custard with a crust of caramelised sugar", "Una crema con una capa de azúcar caramelizado", "Eine Creme mit einer Kruste aus karamellisiertem Zucker"], "e"],
  ["Quiche", "Quiche", "Quiche", ["A savoury tart with an egg and cream filling", "Una tarta salada rellena de huevo y nata", "Ein herzhafter Kuchen mit Eier-Sahne-Füllung"], "e"],
  ["Soufflé", "Suflé", "Soufflé", ["A baked egg dish that puffs up in the oven", "Un plato de huevo que sube en el horno", "Ein Eiergericht, das im Ofen hoch aufgeht"], "m"],
  ["Profiteroles", "Profiteroles", "Profiteroles", ["Choux pastry balls filled with cream", "Bolitas de masa choux rellenas de nata", "Brandteigbällchen mit Sahnefüllung"], "m"],
  ["Falafel", "Falafel", "Falafel", ["Deep-fried balls of ground chickpeas or beans", "Bolitas fritas de garbanzos o habas molidos", "Frittierte Bällchen aus Kichererbsen oder Bohnen"], "e"],
  ["Moussaka", "Musaca", "Moussaka", ["Layers of aubergine and minced meat baked with béchamel", "Capas de berenjena y carne picada gratinadas con bechamel", "Auberginen und Hackfleisch in Schichten, mit Béchamel überbacken"], "m", ["aubergine"]],
  ["Ratatouille", "Ratatouille", "Ratatouille", ["Stewed vegetables such as aubergine, courgette and peppers", "Un guiso de verduras como berenjena, calabacín y pimiento", "Geschmortes Gemüse wie Aubergine, Zucchini und Paprika"], "m", ["aubergine"]],
  ["Goulash", "Gulash", "Gulasch", ["A meat stew spiced with paprika", "Un guiso de carne con pimentón", "Ein mit Paprika gewürzter Fleischeintopf"], "e"],
  ["Wiener Schnitzel", "Escalope vienés", "Wiener Schnitzel", ["A thin, breaded and fried veal cutlet", "Un filete fino de ternera empanado y frito", "Ein dünnes, paniertes und ausgebackenes Kalbsschnitzel"], "e"],
  ["Tapenade", "Tapenade", "Tapenade", ["A paste of olives, capers and anchovies", "Una pasta de aceitunas, alcaparras y anchoas", "Eine Paste aus Oliven, Kapern und Sardellen"], "h"],
  ["Shakshuka", "Shakshuka", "Shakshuka", ["Eggs poached in a spicy tomato sauce", "Huevos escalfados en salsa de tomate picante", "In würziger Tomatensoße pochierte Eier"], "m"],
  ["Eggs Benedict", "Huevos Benedict", "Eggs Benedict", ["Poached eggs and ham on a muffin with hollandaise sauce", "Huevos escalfados y jamón sobre un muffin con salsa holandesa", "Pochierte Eier und Schinken auf einem Muffin mit Sauce hollandaise"], "m"],
  ["Insalata caprese", "Ensalada caprese", "Insalata Caprese", ["A salad of tomato, mozzarella and basil", "Una ensalada de tomate, mozzarella y albahaca", "Ein Salat aus Tomate, Mozzarella und Basilikum"], "e"],
  ["Tabbouleh", "Tabulé", "Taboulé", ["A salad of bulgur wheat, parsley and tomato", "Una ensalada de bulgur, perejil y tomate", "Ein Salat aus Bulgur, Petersilie und Tomaten"], "m"],
  ["Croque monsieur", "Croque monsieur", "Croque Monsieur", ["A toasted ham and cheese sandwich", "Un sándwich caliente de jamón y queso", "Ein überbackenes Schinken-Käse-Sandwich"], "m"],
  ["Ossobuco", "Ossobuco", "Ossobuco", ["Braised veal shanks", "Jarrete de ternera estofado", "Geschmorte Kalbshaxe in Scheiben"], "h"],
  ["Pavlova", "Pavlova", "Pavlova", ["A meringue cake topped with cream and fruit", "Una tarta de merengue con nata y fruta", "Eine Baisertorte mit Sahne und Früchten"], "m"],
  ["Tiramisu", "Tiramisú", "Tiramisu", ["A coffee-soaked dessert with mascarpone cream", "Un postre empapado en café con crema de mascarpone", "Ein in Kaffee getränktes Dessert mit Mascarponecreme"], "e"],
];

// ── festive foods ───────────────────────────────────────────────────
export const OCCASIONS: Record<string, { label: L; at: L }> = {
  christmas: { label: ["Christmas", "Navidad", "Weihnachten"], at: ["at Christmas", "en Navidad", "an Weihnachten"] },
  easter: { label: ["Easter", "Semana Santa (Pascua)", "Ostern"], at: ["at Easter", "en Semana Santa", "an Ostern"] },
  nye: { label: ["New Year's Eve", "Nochevieja", "Silvester"], at: ["on New Year's Eve", "en Nochevieja", "an Silvester"] },
  thanksgiving: { label: ["Thanksgiving", "Acción de Gracias", "Thanksgiving"], at: ["at Thanksgiving", "en Acción de Gracias", "an Thanksgiving"] },
  dead: { label: ["Day of the Dead", "Día de Muertos", "Tag der Toten"], at: ["on the Day of the Dead", "el Día de Muertos", "am Tag der Toten"] },
  epiphany: { label: ["Epiphany (Three Kings' Day)", "Día de Reyes", "Dreikönigstag"], at: ["at Epiphany (Three Kings' Day)", "el Día de Reyes", "am Dreikönigstag"] },
  midautumn: { label: ["Mid-Autumn Festival", "Festival del Medio Otoño", "Mondfest"], at: ["at the Mid-Autumn Festival", "en el Festival del Medio Otoño", "zum Mondfest"] },
  hanukkah: { label: ["Hanukkah", "Janucá", "Chanukka"], at: ["at Hanukkah", "en Janucá", "an Chanukka"] },
  burns: { label: ["Burns Night", "Noche de Burns", "Burns Night"], at: ["on Burns Night", "en la Noche de Burns", "zur Burns Night"] },
  lunar: { label: ["Lunar New Year", "Año Nuevo lunar", "Mondneujahr"], at: ["at Lunar New Year", "en el Año Nuevo lunar", "zum Mondneujahr"] },
  dragon: { label: ["Dragon Boat Festival", "Festival del Bote del Dragón", "Drachenbootfest"], at: ["at the Dragon Boat Festival", "en el Festival del Bote del Dragón", "zum Drachenbootfest"] },
};
/** [en, es, de, occasion, difficulty, occasions it is also linked to (never offered as wrong)] */
export const FESTIVE: [string, string, string, string, D, string[]?][] = [
  ["The twelve grapes (Spain)", "Las doce uvas", "Die zwölf Trauben (Spanien)", "nye", "e"],
  ["Oliebollen (Netherlands)", "Oliebollen (Países Bajos)", "Oliebollen (Niederlande)", "nye", "h", ["christmas"]],
  ["Cotechino with lentils (Italy)", "Cotechino con lentejas (Italia)", "Cotechino mit Linsen (Italien)", "nye", "h", ["christmas"]],
  ["Toshikoshi soba (Japan)", "Toshikoshi soba (Japón)", "Toshikoshi Soba (Japan)", "nye", "h", ["lunar"]],
  ["Roscón de Reyes", "Roscón de Reyes", "Roscón de Reyes", "epiphany", "e", ["christmas", "nye"]],
  ["Galette des rois", "Galette des rois", "Galette des Rois", "epiphany", "m", ["christmas", "nye"]],
  ["Mooncakes", "Pasteles de luna", "Mondkuchen", "midautumn", "m"],
  ["Latkes", "Latkes", "Latkes", "hanukkah", "m"],
  ["Sufganiyot", "Sufganiyot", "Sufganiyot", "hanukkah", "h"],
  ["Pan de muerto", "Pan de muerto", "Pan de Muerto", "dead", "e"],
  ["Pumpkin pie (USA)", "Tarta de calabaza (EE. UU.)", "Kürbiskuchen (USA)", "thanksgiving", "m", ["christmas"]],
  ["Roast turkey (USA)", "Pavo asado (EE. UU.)", "Truthahnbraten (USA)", "thanksgiving", "e", ["christmas"]],
  ["Mince pies (UK)", "Mince pies (Reino Unido)", "Mince Pies (Großbritannien)", "christmas", "m"],
  ["Stollen", "Stollen", "Christstollen", "christmas", "e"],
  ["Panettone", "Panettone", "Panettone", "christmas", "e", ["nye", "epiphany"]],
  ["Turrón", "Turrón", "Turrón", "christmas", "e", ["nye", "epiphany"]],
  ["Lebkuchen", "Lebkuchen", "Lebkuchen", "christmas", "m"],
  ["Bûche de Noël", "Bûche de Noël", "Bûche de Noël", "christmas", "m"],
  ["Eggnog (USA)", "Ponche de huevo (EE. UU.)", "Eggnog (USA)", "christmas", "m", ["thanksgiving", "nye"]],
  ["Hot cross buns", "Hot cross buns", "Hot Cross Buns", "easter", "m"],
  ["Colomba (Italy)", "Colomba (Italia)", "Colomba (Italien)", "easter", "m"],
  ["Simnel cake (UK)", "Simnel cake (Reino Unido)", "Simnel Cake (Großbritannien)", "easter", "h"],
  ["Torrijas (Spain)", "Torrijas", "Torrijas (Spanien)", "easter", "m"],
  ["Haggis", "Haggis", "Haggis", "burns", "m", ["nye"]],
  ["Tteokguk (Korea)", "Tteokguk (Corea)", "Tteokguk (Korea)", "lunar", "h", ["nye"]],
  ["Jiaozi dumplings (China)", "Jiaozi (China)", "Jiaozi (China)", "lunar", "m", ["nye"]],
  ["Zongzi (China)", "Zongzi (China)", "Zongzi (China)", "dragon", "h"],
];

// ── food science & kitchen facts (hand-written, wrong answers sampled) ─
export const SCIENCE: [D, L, L, L[]][] = [
  ["e", ["What is added to bread dough to make it rise?", "¿Qué se añade a la masa del pan para que suba?", "Was gibt man in Brotteig, damit er aufgeht?"], ["Yeast", "Levadura", "Hefe"],
    [["Salt", "Sal", "Salz"], ["Vinegar", "Vinagre", "Essig"], ["Olive oil", "Aceite de oliva", "Olivenöl"], ["Cornflour", "Maicena", "Speisestärke"], ["Lemon juice", "Zumo de limón", "Zitronensaft"]]],
  ["m", ["Which gas makes bread dough rise?", "¿Qué gas hace que suba la masa del pan?", "Welches Gas lässt Brotteig aufgehen?"], ["Carbon dioxide", "Dióxido de carbono", "Kohlendioxid"],
    [["Oxygen", "Oxígeno", "Sauerstoff"], ["Nitrogen", "Nitrógeno", "Stickstoff"], ["Hydrogen", "Hidrógeno", "Wasserstoff"], ["Helium", "Helio", "Helium"]]],
  ["e", ["Which gas puts the bubbles in fizzy drinks?", "¿Qué gas forma las burbujas de los refrescos con gas?", "Welches Gas sorgt für die Bläschen in Sprudelgetränken?"], ["Carbon dioxide", "Dióxido de carbono", "Kohlendioxid"],
    [["Oxygen", "Oxígeno", "Sauerstoff"], ["Nitrogen", "Nitrógeno", "Stickstoff"], ["Hydrogen", "Hidrógeno", "Wasserstoff"], ["Helium", "Helio", "Helium"]]],
  ["m", ["Which substance makes chilli peppers hot?", "¿Qué sustancia hace que los chiles piquen?", "Welcher Stoff macht Chilis scharf?"], ["Capsaicin", "Capsaicina", "Capsaicin"],
    [["Caffeine", "Cafeína", "Koffein"], ["Menthol", "Mentol", "Menthol"], ["Tannin", "Tanino", "Tannin"], ["Lycopene", "Licopeno", "Lycopin"], ["Glucose", "Glucosa", "Glukose"]]],
  ["m", ["Which sugar is naturally found in milk?", "¿Qué azúcar contiene la leche de forma natural?", "Welcher Zucker kommt von Natur aus in Milch vor?"], ["Lactose", "Lactosa", "Laktose"],
    [["Fructose", "Fructosa", "Fruktose"], ["Sucrose", "Sacarosa", "Saccharose"], ["Maltose", "Maltosa", "Maltose"]]],
  ["m", ["Which sugar is also known as \"fruit sugar\"?", "¿Qué azúcar se conoce también como «azúcar de la fruta»?", "Welcher Zucker wird auch „Fruchtzucker“ genannt?"], ["Fructose", "Fructosa", "Fruktose"],
    [["Lactose", "Lactosa", "Laktose"], ["Sucrose", "Sacarosa", "Saccharose"], ["Maltose", "Maltosa", "Maltose"]]],
  ["e", ["Which acid gives vinegar its sour taste?", "¿Qué ácido da al vinagre su sabor agrio?", "Welche Säure gibt Essig seinen sauren Geschmack?"], ["Acetic acid", "Ácido acético", "Essigsäure"],
    [["Citric acid", "Ácido cítrico", "Zitronensäure"], ["Lactic acid", "Ácido láctico", "Milchsäure"], ["Hydrochloric acid", "Ácido clorhídrico", "Salzsäure"], ["Sulphuric acid", "Ácido sulfúrico", "Schwefelsäure"]]],
  ["e", ["Which acid is found in large amounts in lemons?", "¿Qué ácido abunda en los limones?", "Welche Säure steckt reichlich in Zitronen?"], ["Citric acid", "Ácido cítrico", "Zitronensäure"],
    [["Acetic acid", "Ácido acético", "Essigsäure"], ["Lactic acid", "Ácido láctico", "Milchsäure"], ["Hydrochloric acid", "Ácido clorhídrico", "Salzsäure"], ["Formic acid", "Ácido fórmico", "Ameisensäure"]]],
  ["m", ["Gluten is a protein found mainly in which of these grains?", "¿En cuál de estos cereales está presente sobre todo el gluten?", "In welchem dieser Getreide steckt vor allem Gluten?"], ["Wheat", "Trigo", "Weizen"],
    [["Rice", "Arroz", "Reis"], ["Maize", "Maíz", "Mais"], ["Millet", "Mijo", "Hirse"], ["Sorghum", "Sorgo", "Sorghum"]]],
  ["m", ["What is heating milk to kill germs called?", "¿Cómo se llama el proceso de calentar la leche para eliminar gérmenes?", "Wie heißt das Erhitzen von Milch, um Keime abzutöten?"], ["Pasteurisation", "Pasteurización", "Pasteurisierung"],
    [["Fermentation", "Fermentación", "Fermentation"], ["Homogenisation", "Homogeneización", "Homogenisierung"], ["Distillation", "Destilación", "Destillation"], ["Carbonation", "Carbonatación", "Karbonisierung"]]],
  ["e", ["Pasteurisation is named after which scientist?", "¿A qué científico debe su nombre la pasteurización?", "Nach welchem Wissenschaftler ist die Pasteurisierung benannt?"], ["Louis Pasteur", "Louis Pasteur", "Louis Pasteur"],
    [["Marie Curie", "Marie Curie", "Marie Curie"], ["Robert Koch", "Robert Koch", "Robert Koch"], ["Alexander Fleming", "Alexander Fleming", "Alexander Fleming"], ["Isaac Newton", "Isaac Newton", "Isaac Newton"]]],
  ["m", ["Besides sweet, sour, salty and bitter, what is the fifth basic taste?", "Además de dulce, ácido, salado y amargo, ¿cuál es el quinto sabor básico?", "Welcher ist neben süß, sauer, salzig und bitter der fünfte Grundgeschmack?"], ["Umami", "Umami", "Umami"],
    [["Spicy", "Picante", "Scharf"], ["Smoky", "Ahumado", "Rauchig"], ["Fruity", "Afrutado", "Fruchtig"], ["Earthy", "Terroso", "Erdig"]]],
  ["h", ["What is traditionally used to curdle milk when making cheese?", "¿Qué se usa tradicionalmente para cuajar la leche al hacer queso?", "Womit bringt man Milch bei der traditionellen Käseherstellung zum Gerinnen?"], ["Rennet", "Cuajo", "Lab"],
    [["Yeast", "Levadura", "Hefe"], ["Baking soda", "Bicarbonato", "Natron"], ["Gelatine", "Gelatina", "Gelatine"], ["Salt", "Sal", "Salz"]]],
  ["e", ["At sea level, at what temperature does water boil?", "Al nivel del mar, ¿a qué temperatura hierve el agua?", "Bei welcher Temperatur kocht Wasser auf Meereshöhe?"], ["100 °C", "100 °C", "100 °C"],
    [["90 °C", "90 °C", "90 °C"], ["80 °C", "80 °C", "80 °C"], ["110 °C", "110 °C", "110 °C"], ["120 °C", "120 °C", "120 °C"]]],
  ["h", ["Which pigment makes tomatoes red?", "¿Qué pigmento da a los tomates su color rojo?", "Welcher Farbstoff macht Tomaten rot?"], ["Lycopene", "Licopeno", "Lycopin"],
    [["Chlorophyll", "Clorofila", "Chlorophyll"], ["Capsaicin", "Capsaicina", "Capsaicin"], ["Caffeine", "Cafeína", "Koffein"], ["Melanin", "Melanina", "Melanin"]]],
  ["m", ["What gives green vegetables their colour?", "¿Qué da su color a las verduras verdes?", "Was gibt grünem Gemüse seine Farbe?"], ["Chlorophyll", "Clorofila", "Chlorophyll"],
    [["Lycopene", "Licopeno", "Lycopin"], ["Melanin", "Melanina", "Melanin"], ["Haemoglobin", "Hemoglobina", "Hämoglobin"], ["Caffeine", "Cafeína", "Koffein"]]],
  ["m", ["Why does popcorn pop?", "¿Por qué revientan las palomitas de maíz?", "Warum springt Popcorn auf?"], ["Water inside the kernel turns to steam", "El agua del interior del grano se convierte en vapor", "Wasser im Korn wird zu Dampf"],
    [["Oil inside the kernel catches fire", "El aceite del grano se inflama", "Öl im Korn entzündet sich"], ["The sugar inside caramelises", "Su azúcar se carameliza", "Der Zucker darin karamellisiert"],
      ["Gas is pumped in at the factory", "Se le inyecta gas en la fábrica", "In der Fabrik wird Gas hineingepresst"], ["The husk shrinks in the heat", "La cáscara se encoge con el calor", "Die Schale schrumpft in der Hitze"]]],
  ["m", ["Which drink is made by fermenting sweetened tea?", "¿Qué bebida se obtiene fermentando té endulzado?", "Welches Getränk entsteht durch Fermentieren von gesüßtem Tee?"], ["Kombucha", "Kombucha", "Kombucha"],
    [["Kefir", "Kéfir", "Kefir"], ["Kvass", "Kvas", "Kwass"], ["Lassi", "Lassi", "Lassi"], ["Horchata", "Horchata", "Horchata"], ["Ayran", "Ayran", "Ayran"]]],
  ["h", ["When you sear meat, what is the browning reaction between sugars and proteins called?", "Al dorar la carne, ¿cómo se llama la reacción de pardeamiento entre azúcares y proteínas?", "Wie heißt die Bräunungsreaktion zwischen Zucker und Eiweiß beim scharfen Anbraten?"], ["Maillard reaction", "Reacción de Maillard", "Maillard-Reaktion"],
    [["Fermentation", "Fermentación", "Fermentation"], ["Osmosis", "Ósmosis", "Osmose"], ["Photosynthesis", "Fotosíntesis", "Fotosynthese"], ["Pasteurisation", "Pasteurización", "Pasteurisierung"]]],
  ["m", ["What is table salt mostly made of?", "¿De qué está compuesta principalmente la sal de mesa?", "Woraus besteht Speisesalz hauptsächlich?"], ["Sodium chloride", "Cloruro de sodio", "Natriumchlorid"],
    [["Calcium carbonate", "Carbonato de calcio", "Calciumcarbonat"], ["Sodium bicarbonate", "Bicarbonato de sodio", "Natriumhydrogencarbonat"], ["Potassium nitrate", "Nitrato de potasio", "Kaliumnitrat"], ["Magnesium sulphate", "Sulfato de magnesio", "Magnesiumsulfat"]]],
  ["e", ["Which mineral is milk especially well known for?", "¿Por qué mineral es especialmente conocida la leche?", "Für welchen Mineralstoff ist Milch besonders bekannt?"], ["Calcium", "Calcio", "Calcium"],
    [["Iron", "Hierro", "Eisen"], ["Zinc", "Zinc", "Zink"], ["Copper", "Cobre", "Kupfer"]]],
];
