/** Fact tables for the second Video Games / Cinema & TV / Pop Culture pack (media2.ts). L = [en, es, de]. */
import type { F, L } from "./media-data";

// ═══ VIDEO GAMES ═══════════════════════════════════════════════════
/** Game series → characters (only series not covered elsewhere). */
export const SERIES_CHARS: Record<string, L[]> = {
  "Final Fantasy": [["Cloud Strife", "Cloud Strife", "Cloud Strife"], ["Sephiroth", "Sephiroth", "Sephiroth"], ["Tifa Lockhart", "Tifa Lockhart", "Tifa Lockhart"], ["Aerith Gainsborough", "Aerith Gainsborough", "Aerith Gainsborough"], ["Squall Leonhart", "Squall Leonhart", "Squall Leonhart"]],
  "Resident Evil": [["Leon S. Kennedy", "Leon S. Kennedy", "Leon S. Kennedy"], ["Jill Valentine", "Jill Valentine", "Jill Valentine"], ["Chris Redfield", "Chris Redfield", "Chris Redfield"], ["Albert Wesker", "Albert Wesker", "Albert Wesker"], ["Claire Redfield", "Claire Redfield", "Claire Redfield"]],
  "Metal Gear": [["Solid Snake", "Solid Snake", "Solid Snake"], ["Revolver Ocelot", "Revolver Ocelot", "Revolver Ocelot"], ["Otacon", "Otacon", "Otacon"], ["Big Boss", "Big Boss", "Big Boss"]],
  "Mortal Kombat": [["Scorpion", "Scorpion", "Scorpion"], ["Sub-Zero", "Sub-Zero", "Sub-Zero"], ["Raiden", "Raiden", "Raiden"], ["Liu Kang", "Liu Kang", "Liu Kang"], ["Sonya Blade", "Sonya Blade", "Sonya Blade"]],
  "Tekken": [["Heihachi Mishima", "Heihachi Mishima", "Heihachi Mishima"], ["Jin Kazama", "Jin Kazama", "Jin Kazama"], ["Nina Williams", "Nina Williams", "Nina Williams"], ["Paul Phoenix", "Paul Phoenix", "Paul Phoenix"]],
  "Kingdom Hearts": [["Sora", "Sora", "Sora"], ["Riku", "Riku", "Riku"], ["Kairi", "Kairi", "Kairi"], ["Xemnas", "Xemnas", "Xemnas"]],
  "Overwatch": [["Tracer", "Tracer", "Tracer"], ["Mercy", "Mercy", "Mercy"], ["Reinhardt", "Reinhardt", "Reinhardt"], ["D.Va", "D.Va", "D.Va"], ["Genji", "Genji", "Genji"]],
  "League of Legends": [["Teemo", "Teemo", "Teemo"], ["Ahri", "Ahri", "Ahri"], ["Jinx", "Jinx", "Jinx"], ["Yasuo", "Yasuo", "Yasuo"], ["Lux", "Lux", "Lux"]],
  "Animal Crossing": [["Tom Nook", "Tom Nook", "Tom Nook"], ["Isabelle", "Canela", "Melinda"], ["K.K. Slider", "Totakeke", "K.K. Slider"], ["Blathers", "Sócrates", "Eugen"]],
  "Kirby": [["King Dedede", "Rey Dedede", "König Dedede"], ["Meta Knight", "Meta Knight", "Meta Knight"], ["Waddle Dee", "Waddle Dee", "Waddle Dee"]],
  "Donkey Kong": [["Diddy Kong", "Diddy Kong", "Diddy Kong"], ["King K. Rool", "King K. Rool", "King K. Rool"], ["Cranky Kong", "Cranky Kong", "Cranky Kong"], ["Dixie Kong", "Dixie Kong", "Dixie Kong"]],
  "Star Fox": [["Fox McCloud", "Fox McCloud", "Fox McCloud"], ["Falco Lombardi", "Falco Lombardi", "Falco Lombardi"], ["Slippy Toad", "Slippy Toad", "Slippy Toad"], ["Peppy Hare", "Peppy Hare", "Peppy Hare"]],
  "Metroid": [["Samus Aran", "Samus Aran", "Samus Aran"], ["Ridley", "Ridley", "Ridley"], ["Mother Brain", "Cerebro Madre", "Mother Brain"]],
  "Assassin's Creed": [["Ezio Auditore", "Ezio Auditore", "Ezio Auditore"], ["Altaïr Ibn-La'Ahad", "Altaïr Ibn-La'Ahad", "Altaïr Ibn-La'Ahad"], ["Kassandra", "Kassandra", "Kassandra"], ["Bayek", "Bayek", "Bayek"], ["Edward Kenway", "Edward Kenway", "Edward Kenway"]],
  "Mass Effect": [["Commander Shepard", "Comandante Shepard", "Commander Shepard"], ["Garrus Vakarian", "Garrus Vakarian", "Garrus Vakarian"], ["Liara T'Soni", "Liara T'Soni", "Liara T'Soni"], ["Urdnot Wrex", "Urdnot Wrex", "Urdnot Wrex"]],
  "Portal": [["GLaDOS", "GLaDOS", "GLaDOS"], ["Wheatley", "Wheatley", "Wheatley"], ["Chell", "Chell", "Chell"]],
  "Half-Life": [["Gordon Freeman", "Gordon Freeman", "Gordon Freeman"], ["Alyx Vance", "Alyx Vance", "Alyx Vance"], ["G-Man", "G-Man", "G-Man"]],
  "Crash Bandicoot": [["Dr. Neo Cortex", "Dr. Neo Cortex", "Dr. Neo Cortex"], ["Coco Bandicoot", "Coco Bandicoot", "Coco Bandicoot"], ["Aku Aku", "Aku Aku", "Aku Aku"]],
  "Uncharted": [["Nathan Drake", "Nathan Drake", "Nathan Drake"], ["Victor Sullivan", "Victor Sullivan", "Victor Sullivan"], ["Elena Fisher", "Elena Fisher", "Elena Fisher"], ["Chloe Frazer", "Chloe Frazer", "Chloe Frazer"]],
  "Red Dead Redemption": [["Arthur Morgan", "Arthur Morgan", "Arthur Morgan"], ["John Marston", "John Marston", "John Marston"], ["Dutch van der Linde", "Dutch van der Linde", "Dutch van der Linde"], ["Sadie Adler", "Sadie Adler", "Sadie Adler"]],
  "Grand Theft Auto": [["Trevor Philips", "Trevor Philips", "Trevor Philips"], ["Franklin Clinton", "Franklin Clinton", "Franklin Clinton"], ["Niko Bellic", "Niko Bellic", "Niko Bellic"], ["Tommy Vercetti", "Tommy Vercetti", "Tommy Vercetti"], ["CJ (Carl Johnson)", "CJ (Carl Johnson)", "CJ (Carl Johnson)"]],
  "BioShock": [["Andrew Ryan", "Andrew Ryan", "Andrew Ryan"], ["Big Daddy", "Big Daddy", "Big Daddy"], ["Elizabeth", "Elizabeth", "Elizabeth"]],
  "Pac-Man": [["Blinky", "Blinky", "Blinky"], ["Inky", "Inky", "Inky"], ["Clyde", "Clyde", "Clyde"]],
  "Ratchet & Clank": [["Ratchet", "Ratchet", "Ratchet"], ["Clank", "Clank", "Clank"], ["Captain Qwark", "Capitán Qwark", "Captain Qwark"]],
  "Fortnite": [["Jonesy", "Jonesy", "Jonesy"], ["Peely", "Peely", "Peely"], ["Fishstick", "Fishstick", "Fishstick"]],
};

/** [game, platform-holder key the game was first exclusive to, fame] */
export const PLATFORMS: Record<string, L> = {
  nintendo: ["Nintendo", "Nintendo", "Nintendo"], sony: ["Sony (PlayStation)", "Sony (PlayStation)", "Sony (PlayStation)"],
  microsoft: ["Microsoft (Xbox)", "Microsoft (Xbox)", "Microsoft (Xbox)"], sega: ["Sega", "Sega", "Sega"],
};
export const EXCLUSIVES: [string, string, F][] = [
  ["The Legend of Zelda: Breath of the Wild", "nintendo", "e"], ["Mario Kart 8", "nintendo", "e"], ["Animal Crossing: New Horizons", "nintendo", "e"],
  ["Splatoon", "nintendo", "m"], ["Super Smash Bros. Ultimate", "nintendo", "e"], ["Metroid Prime", "nintendo", "m"], ["Pikmin", "nintendo", "m"],
  ["Kirby and the Forgotten Land", "nintendo", "m"], ["Super Mario Odyssey", "nintendo", "e"], ["Xenoblade Chronicles", "nintendo", "h"], ["Fire Emblem: Three Houses", "nintendo", "m"],
  ["Uncharted 4", "sony", "m"], ["The Last of Us", "sony", "e"], ["God of War (2018)", "sony", "e"], ["Ghost of Tsushima", "sony", "m"], ["Horizon Zero Dawn", "sony", "m"],
  ["Gran Turismo 7", "sony", "m"], ["Ratchet & Clank: Rift Apart", "sony", "m"], ["Bloodborne", "sony", "h"], ["Marvel's Spider-Man (2018)", "sony", "e"], ["Astro Bot", "sony", "m"],
  ["Demon's Souls", "sony", "h"], ["Halo: Combat Evolved", "microsoft", "e"], ["Gears of War", "microsoft", "e"], ["Forza Motorsport", "microsoft", "m"], ["Fable", "microsoft", "m"],
  ["Halo Infinite", "microsoft", "m"], ["Starfield", "microsoft", "m"], ["Alan Wake", "microsoft", "h"], ["Banjo-Kazooie: Nuts & Bolts", "microsoft", "h"],
  ["Sonic the Hedgehog (1991)", "sega", "e"], ["Shenmue", "sega", "h"], ["Jet Set Radio", "sega", "h"], ["Streets of Rage", "sega", "m"], ["Phantasy Star", "sega", "h"],
];

/** Handheld consoles vs home consoles (hybrids such as the Switch left out). */
export const HANDHELD: L[] = ["Game Boy", "Game Boy Advance", "Nintendo DS", "Nintendo 3DS", "PlayStation Portable (PSP)", "PlayStation Vita", "Sega Game Gear", "Steam Deck", "Atari Lynx", "Game Boy Color"].map((s) => [s, s, s] as L);
export const HOME_CONSOLES: L[] = ["NES", "Super Nintendo (SNES)", "Nintendo 64", "GameCube", "Wii", "Wii U", "PlayStation", "PlayStation 2", "PlayStation 5", "Xbox", "Xbox 360", "Xbox Series X", "Sega Mega Drive", "Sega Dreamcast", "Sega Saturn", "Atari 2600"].map((s) => [s, s, s] as L);

/** [game, country it is (mainly) set in, fame] */
export const GAME_SETTINGS: [string, string, F][] = [
  ["Ghost of Tsushima", "japan", "e"], ["Assassin's Creed II", "italy", "m"], ["Assassin's Creed Odyssey", "greece", "e"], ["Assassin's Creed Origins", "egypt", "e"],
  ["Assassin's Creed Unity", "france", "m"], ["Assassin's Creed Syndicate", "uk", "m"], ["Assassin's Creed Mirage", "iraq", "h"], ["Assassin's Creed Shadows", "japan", "m"],
  ["Assassin's Creed III", "usa", "m"], ["Assassin's Creed Valhalla", "uk", "h"], ["Kingdom Come: Deliverance", "czechia", "m"], ["Far Cry 5", "usa", "m"],
  ["Watch Dogs 2", "usa", "m"], ["Watch Dogs: Legion", "uk", "m"], ["Sleeping Dogs", "china", "h"], ["Yakuza 0", "japan", "m"], ["Metro 2033", "russia", "m"],
  ["S.T.A.L.K.E.R.: Shadow of Chernobyl", "ukraine", "m"], ["Ghost Recon Wildlands", "bolivia", "h"], ["Forza Horizon 5", "mexico", "e"], ["Forza Horizon 4", "uk", "m"],
  ["Forza Horizon 3", "australia", "m"], ["Sekiro: Shadows Die Twice", "japan", "m"], ["L.A. Noire", "usa", "m"], ["Red Dead Redemption 2", "usa", "e"],
  ["Mafia: The Old Country", "italy", "h"], ["Persona 5", "japan", "m"], ["Ghostwire: Tokyo", "japan", "e"], ["Marvel's Spider-Man (2018)", "usa", "e"], ["Shenmue", "japan", "h"],
];

/** Gaming terms: [term, meaning] */
export const GAME_TERMS: [L, L, F][] = [
  [["GG", "GG", "GG"], ["“Good game”, said at the end of a match", "«Good game» (buena partida), dicho al final", "„Good Game“ (gutes Spiel), am Ende einer Partie gesagt"], "e"],
  [["AFK", "AFK", "AFK"], ["Away from keyboard: not at the controls", "Lejos del teclado: no está jugando", "Nicht an der Tastatur: gerade nicht am Spielen"], "e"],
  [["DLC", "DLC", "DLC"], ["Extra content you download after the game is released", "Contenido extra que se descarga tras el lanzamiento", "Zusatzinhalte, die man nach dem Erscheinen herunterlädt"], "e"],
  [["Easter egg", "Huevo de Pascua", "Easter Egg"], ["A hidden secret or joke placed in a game", "Un secreto o chiste oculto en un juego", "Ein im Spiel verstecktes Geheimnis oder Witz"], "m"],
  [["Respawn", "Respawn (reaparecer)", "Respawn"], ["Coming back to life after being defeated", "Volver a aparecer tras ser derrotado", "Nach einer Niederlage wieder ins Spiel zurückkehren"], "e"],
  [["Noob", "Noob (novato)", "Noob"], ["A beginner or unskilled player", "Un jugador novato o poco hábil", "Ein Anfänger oder unerfahrener Spieler"], "e"],
  [["Boss fight", "Combate contra el jefe", "Bosskampf"], ["A battle against a strong enemy, often at the end of a level", "Una batalla contra un enemigo fuerte, a menudo al final de un nivel", "Kampf gegen einen starken Gegner, oft am Ende eines Levels"], "e"],
  [["Loot box", "Caja de botín", "Lootbox"], ["A virtual box with random rewards", "Una caja virtual con recompensas aleatorias", "Eine virtuelle Kiste mit zufälligen Belohnungen"], "m"],
  [["Open world", "Mundo abierto", "Open World"], ["A large world you can explore freely", "Un gran mundo que se puede explorar libremente", "Eine große Welt, die man frei erkunden kann"], "e"],
  [["Co-op", "Cooperativo", "Koop"], ["Players working together as a team", "Jugadores que cooperan en equipo", "Spieler, die als Team zusammenspielen"], "e"],
  [["PvP", "PvP", "PvP"], ["Player versus player: fighting other real players", "Jugador contra jugador: luchar contra otros jugadores reales", "Spieler gegen Spieler: Kampf gegen echte Mitspieler"], "m"],
  [["Lag", "Lag", "Lag"], ["A delay caused by a slow connection or computer", "Un retraso causado por una conexión u ordenador lentos", "Verzögerung durch eine langsame Verbindung oder einen langsamen Rechner"], "e"],
  [["Grinding", "Farmear (grinding)", "Grinden"], ["Repeating the same task again and again to earn rewards", "Repetir la misma tarea una y otra vez para ganar recompensas", "Dieselbe Aufgabe immer wieder wiederholen, um Belohnungen zu bekommen"], "m"],
  [["Nerf", "Nerf", "Nerf"], ["An update that makes something weaker", "Una actualización que debilita algo", "Ein Update, das etwas schwächer macht"], "m"],
  [["Buff", "Buff", "Buff"], ["An update or effect that makes something stronger", "Una actualización o efecto que hace algo más fuerte", "Ein Update oder Effekt, der etwas stärker macht"], "m"],
  [["Patch", "Parche", "Patch"], ["An update that fixes bugs or changes a game", "Una actualización que corrige errores o cambia un juego", "Ein Update, das Fehler behebt oder ein Spiel verändert"], "e"],
  [["Checkpoint", "Punto de control", "Checkpoint"], ["A point where your progress is saved during a level", "Un punto donde se guarda el progreso dentro de un nivel", "Ein Punkt, an dem der Fortschritt im Level gespeichert wird"], "e"],
  [["HUD", "HUD", "HUD"], ["The on-screen display of health, map, ammo and so on", "La información en pantalla: vida, mapa, munición, etc.", "Die Bildschirmanzeige für Leben, Karte, Munition usw."], "h"],
  [["Mod", "Mod", "Mod"], ["A change to a game made by fans", "Una modificación de un juego hecha por fans", "Eine von Fans gemachte Veränderung eines Spiels"], "m"],
  [["Skin", "Skin (aspecto)", "Skin"], ["A different look for a character or item", "Un aspecto distinto para un personaje u objeto", "Ein anderes Aussehen für eine Figur oder einen Gegenstand"], "e"],
  [["Battle pass", "Pase de batalla", "Battle Pass"], ["A season reward track you unlock by playing", "Un recorrido de recompensas de temporada que se desbloquea jugando", "Eine Belohnungsstufe pro Saison, die man durch Spielen freischaltet"], "m"],
  [["Roguelike", "Roguelike", "Roguelike"], ["A game with random levels where death sends you back to the start", "Un juego con niveles aleatorios en el que morir te devuelve al principio", "Spiel mit zufälligen Levels, in dem man nach dem Tod von vorn beginnt"], "h"],
  [["Metroidvania", "Metroidvania", "Metroidvania"], ["A game with one big map that opens up as you gain new abilities", "Un juego con un gran mapa que se abre al conseguir nuevas habilidades", "Spiel mit einer großen Karte, die sich mit neuen Fähigkeiten öffnet"], "h"],
  [["Permadeath", "Muerte permanente", "Permadeath"], ["When a character dies, it is gone for good", "Cuando un personaje muere, lo pierdes para siempre", "Stirbt eine Figur, ist sie endgültig verloren"], "h"],
  [["Cooldown", "Enfriamiento (cooldown)", "Cooldown"], ["The waiting time before you can use an ability again", "El tiempo de espera antes de volver a usar una habilidad", "Die Wartezeit, bis man eine Fähigkeit wieder einsetzen kann"], "m"],
  [["XP", "XP (experiencia)", "EP (Erfahrungspunkte)"], ["Experience points that make your character level up", "Puntos de experiencia que hacen subir de nivel al personaje", "Erfahrungspunkte, mit denen die Figur aufsteigt"], "e"],
  [["Tank (role)", "Tanque (rol)", "Tank (Rolle)"], ["A tough character who protects the team by taking damage", "Un personaje resistente que protege al equipo recibiendo daño", "Eine robuste Figur, die das Team schützt, indem sie Schaden einsteckt"], "m"],
  [["Speedrun", "Speedrun", "Speedrun"], ["Finishing a game as fast as possible", "Terminar un juego lo más rápido posible", "Ein Spiel so schnell wie möglich durchspielen"], "e"],
  [["Cheat code", "Truco (código)", "Cheatcode"], ["A secret input that unlocks advantages", "Una combinación secreta que da ventajas", "Eine geheime Eingabe, die Vorteile freischaltet"], "e"],
  [["Hitbox", "Hitbox", "Hitbox"], ["The invisible area that counts when something is hit", "La zona invisible que cuenta cuando algo recibe un golpe", "Der unsichtbare Bereich, der bei einem Treffer zählt"], "h"],
  [["Esports", "Esports", "E-Sport"], ["Video games played as an organised competitive sport", "Videojuegos jugados como deporte de competición organizado", "Videospiele als organisierter Wettkampfsport"], "e"],
  [["Indie game", "Juego indie", "Indie-Spiel"], ["A game made by a small independent studio", "Un juego hecho por un pequeño estudio independiente", "Ein Spiel von einem kleinen unabhängigen Studio"], "e"],
];

/** Esports & competitions: [question, right, wrong×3] */
export const GAME_FACTS2: [F, L, L, L, L, L][] = [
  ["m", ["Which game is played at the esports tournament “The International”?", "¿A qué juego se juega en el torneo de esports «The International»?", "Welches Spiel wird beim E-Sport-Turnier „The International“ gespielt?"], ["Dota 2", "Dota 2", "Dota 2"], ["League of Legends", "League of Legends", "League of Legends"], ["Counter-Strike 2", "Counter-Strike 2", "Counter-Strike 2"], ["Fortnite", "Fortnite", "Fortnite"]],
  ["m", ["What is the famous “Konami Code” in its classic form?", "¿Cuál es el famoso «código Konami» en su forma clásica?", "Wie lautet der berühmte „Konami-Code“ in der klassischen Form?"], ["↑↑↓↓←→←→ B A", "↑↑↓↓←→←→ B A", "↑↑↓↓←→←→ B A"], ["←←→→↑↓↑↓ A B", "←←→→↑↓↑↓ A B", "←←→→↑↓↑↓ A B"], ["↑↓↑↓←←→→ A B", "↑↓↑↓←←→→ A B", "↑↓↑↓←←→→ A B"], ["A B A B ↑↓←→", "A B A B ↑↓←→", "A B A B ↑↓←→"]],
  ["e", ["What is the name of Valve's big PC game store?", "¿Cómo se llama la gran tienda de juegos para PC de Valve?", "Wie heißt Valves großer PC-Spieleshop?"], ["Steam", "Steam", "Steam"], ["Origin", "Origin", "Origin"], ["Uplay", "Uplay", "Uplay"], ["GOG", "GOG", "GOG"]],
  ["e", ["Which streaming platform is best known for live video game streams?", "¿Qué plataforma es la más conocida por las retransmisiones en directo de videojuegos?", "Welche Plattform ist am bekanntesten für Live-Streams von Videospielen?"], ["Twitch", "Twitch", "Twitch"], ["Netflix", "Netflix", "Netflix"], ["Spotify", "Spotify", "Spotify"], ["Pinterest", "Pinterest", "Pinterest"]],
  ["m", ["Which company owns Twitch?", "¿Qué empresa es dueña de Twitch?", "Welcher Firma gehört Twitch?"], ["Amazon", "Amazon", "Amazon"], ["Google", "Google", "Google"], ["Microsoft", "Microsoft", "Microsoft"], ["Sony", "Sony", "Sony"]],
  ["m", ["Which company bought Minecraft in 2014?", "¿Qué empresa compró Minecraft en 2014?", "Welche Firma kaufte Minecraft im Jahr 2014?"], ["Microsoft", "Microsoft", "Microsoft"], ["Sony", "Sony", "Sony"], ["Nintendo", "Nintendo", "Nintendo"], ["Electronic Arts", "Electronic Arts", "Electronic Arts"]],
  ["m", ["What was Nintendo before it made video games?", "¿Qué era Nintendo antes de hacer videojuegos?", "Was war Nintendo, bevor es Videospiele machte?"], ["A playing-card maker", "Un fabricante de naipes", "Ein Spielkartenhersteller"], ["A car maker", "Un fabricante de coches", "Ein Autohersteller"], ["A bank", "Un banco", "Eine Bank"], ["A TV channel", "Un canal de televisión", "Ein Fernsehsender"]],
  ["h", ["In which year was Nintendo founded?", "¿En qué año se fundó Nintendo?", "In welchem Jahr wurde Nintendo gegründet?"], ["1889", "1889", "1889"], ["1949", "1949", "1949"], ["1972", "1972", "1972"], ["1983", "1983", "1983"]],
  ["m", ["What does “Wii” rhyme with, as Nintendo explained the name?", "Según Nintendo, ¿con qué palabra inglesa suena igual «Wii»?", "Wie Nintendo den Namen erklärte: Wie klingt „Wii“ auf Englisch?"], ["“We”", "«We» (nosotros)", "„We“ (wir)"], ["“Why”", "«Why» (por qué)", "„Why“ (warum)"], ["“Win”", "«Win» (ganar)", "„Win“ (gewinnen)"], ["“Wheel”", "«Wheel» (rueda)", "„Wheel“ (Rad)"]],
  ["m", ["What is the name of Mario's twin brother?", "¿Cómo se llama el hermano gemelo de Mario?", "Wie heißt Marios Zwillingsbruder?"], ["Luigi", "Luigi", "Luigi"], ["Wario", "Wario", "Wario"], ["Waluigi", "Waluigi", "Waluigi"], ["Toad", "Toad", "Toad"]],
  ["m", ["What was Mario originally called in the 1981 arcade game Donkey Kong?", "¿Cómo se llamaba Mario en el arcade Donkey Kong de 1981?", "Wie hieß Mario ursprünglich im Arcade-Spiel Donkey Kong von 1981?"], ["Jumpman", "Jumpman", "Jumpman"], ["Plumberman", "Plumberman", "Plumberman"], ["Mr. Video", "Mr. Video", "Mr. Video"], ["Hammerman", "Hammerman", "Hammerman"]],
  ["e", ["What job does Mario have?", "¿Qué oficio tiene Mario?", "Welchen Beruf hat Mario?"], ["Plumber", "Fontanero", "Klempner"], ["Carpenter", "Carpintero", "Zimmermann"], ["Chef", "Cocinero", "Koch"], ["Electrician", "Electricista", "Elektriker"]],
  ["m", ["Which item makes Mario grow bigger?", "¿Qué objeto hace que Mario se haga más grande?", "Welcher Gegenstand lässt Mario wachsen?"], ["Super Mushroom", "Superchampiñón", "Superpilz"], ["Fire Flower", "Flor de fuego", "Feuerblume"], ["Super Star", "Superestrella", "Superstern"], ["Super Leaf", "Superhoja", "Superblatt"]],
  ["e", ["In Minecraft, which dimension is reached through an obsidian portal?", "En Minecraft, ¿a qué dimensión se llega por un portal de obsidiana?", "Welche Dimension erreicht man in Minecraft durch ein Obsidianportal?"], ["The Nether", "El Nether", "Der Nether"], ["The End", "El End", "Das Ende"], ["The Overworld", "El Mundo Normal", "Die Oberwelt"], ["The Aether", "El Aether", "Der Aether"]],
  ["m", ["In Minecraft, which boss lives in The End?", "En Minecraft, ¿qué jefe vive en el End?", "Welcher Boss lebt in Minecraft im Ende?"], ["The Ender Dragon", "El Dragón del End", "Der Enderdrache"], ["The Wither", "El Wither", "Der Wither"], ["The Warden", "El Warden", "Der Wärter"], ["The Elder Guardian", "El Guardián anciano", "Der Großwächter"]],
  ["m", ["Which Pokémon evolves from Charmander?", "¿Qué Pokémon evoluciona de Charmander?", "In welches Pokémon entwickelt sich Glumanda?"], ["Charmeleon", "Charmeleon", "Glutexo"], ["Charizard", "Charizard", "Glurak"], ["Wartortle", "Wartortle", "Schillok"], ["Ivysaur", "Ivysaur", "Bisaknosp"]],
  ["m", ["Which item do you use to evolve Pikachu into Raichu?", "¿Qué objeto se usa para evolucionar a Pikachu en Raichu?", "Mit welchem Gegenstand entwickelt sich Pikachu zu Raichu?"], ["Thunder Stone", "Piedra trueno", "Donnerstein"], ["Fire Stone", "Piedra fuego", "Feuerstein"], ["Moon Stone", "Piedra lunar", "Mondstein"], ["Water Stone", "Piedra agua", "Wasserstein"]],
  ["h", ["Who is the leader of Team Rocket in the Pokémon games?", "¿Quién es el líder del Team Rocket en los juegos de Pokémon?", "Wer ist der Anführer von Team Rocket in den Pokémon-Spielen?"], ["Giovanni", "Giovanni", "Giovanni"], ["Professor Oak", "Profesor Oak", "Professor Eich"], ["Brock", "Brock", "Rocko"], ["Lance", "Lance", "Siegfried"]],
  ["e", ["In Pokémon games, who usually gives you your first Pokémon?", "En los juegos de Pokémon, ¿quién te suele dar tu primer Pokémon?", "Wer gibt einem in den Pokémon-Spielen meist das erste Pokémon?"], ["A Pokémon professor", "Un profesor Pokémon", "Ein Pokémon-Professor"], ["Your mother", "Tu madre", "Deine Mutter"], ["A gym leader", "Un líder de gimnasio", "Ein Arenaleiter"], ["Nurse Joy", "La enfermera Joy", "Schwester Joy"]],
  ["m", ["How many gym badges do you usually need to challenge the Pokémon League?", "¿Cuántas medallas de gimnasio suelen hacer falta para retar a la Liga Pokémon?", "Wie viele Orden braucht man meist, um die Pokémon-Liga herauszufordern?"], ["8", "8", "8"], ["5", "5", "5"], ["10", "10", "10"], ["12", "12", "12"]],
  ["m", ["In Tetris, what is clearing four lines at once called?", "En Tetris, ¿cómo se llama eliminar cuatro líneas a la vez?", "Wie heißt es in Tetris, vier Reihen auf einmal abzuräumen?"], ["A Tetris", "Un Tetris", "Ein Tetris"], ["A Combo", "Un combo", "Ein Combo"], ["A Quad", "Un Quad", "Ein Quad"], ["A Perfect", "Un Perfect", "Ein Perfect"]],
  ["h", ["Which Russian folk song is the famous Tetris theme (“Type A”)?", "¿Qué melodía popular rusa es el famoso tema de Tetris («Type A»)?", "Welches russische Volkslied ist die berühmte Tetris-Melodie („Type A“)?"], ["Korobeiniki", "Korobéiniki", "Korobeiniki"], ["Kalinka", "Kalinka", "Kalinka"], ["Katyusha", "Katiusha", "Katjuscha"], ["Troika", "Troika", "Troika"]],
  ["e", ["What colour is Pac-Man?", "¿De qué color es Pac-Man?", "Welche Farbe hat Pac-Man?"], ["Yellow", "Amarillo", "Gelb"], ["Red", "Rojo", "Rot"], ["Green", "Verde", "Grün"], ["Blue", "Azul", "Blau"]],
  ["m", ["Which company made the first PlayStation?", "¿Qué empresa hizo la primera PlayStation?", "Welche Firma baute die erste PlayStation?"], ["Sony", "Sony", "Sony"], ["Nintendo", "Nintendo", "Nintendo"], ["Sega", "Sega", "Sega"], ["Panasonic", "Panasonic", "Panasonic"]],
  ["m", ["Which console was Sega's last home console?", "¿Cuál fue la última consola de sobremesa de Sega?", "Was war Segas letzte Heimkonsole?"], ["Dreamcast", "Dreamcast", "Dreamcast"], ["Saturn", "Saturn", "Saturn"], ["Mega Drive", "Mega Drive", "Mega Drive"], ["Master System", "Master System", "Master System"]],
];

// ═══ CINEMA & TV ═══════════════════════════════════════════════════
/** Best Actor / Actress Oscars: [winner, film, female?, year of ceremony] */
export const OSCAR_ACTING: [string, L, boolean, number][] = [
  ["Leonardo DiCaprio", ["The Revenant", "El renacido", "The Revenant – Der Rückkehrer"], false, 2016],
  ["Joaquin Phoenix", ["Joker", "Joker", "Joker"], false, 2020],
  ["Matthew McConaughey", ["Dallas Buyers Club", "Dallas Buyers Club", "Dallas Buyers Club"], false, 2014],
  ["Eddie Redmayne", ["The Theory of Everything", "La teoría del todo", "Die Entdeckung der Unendlichkeit"], false, 2015],
  ["Gary Oldman", ["Darkest Hour", "El instante más oscuro", "Die dunkelste Stunde"], false, 2018],
  ["Rami Malek", ["Bohemian Rhapsody", "Bohemian Rhapsody", "Bohemian Rhapsody"], false, 2019],
  ["Anthony Hopkins", ["The Father", "El padre", "The Father"], false, 2021],
  ["Will Smith", ["King Richard", "El método Williams", "King Richard"], false, 2022],
  ["Brendan Fraser", ["The Whale", "La ballena", "The Whale"], false, 2023],
  ["Cillian Murphy", ["Oppenheimer", "Oppenheimer", "Oppenheimer"], false, 2024],
  ["Adrien Brody", ["The Brutalist", "The Brutalist", "Der Brutalist"], false, 2025],
  ["Daniel Day-Lewis", ["Lincoln", "Lincoln", "Lincoln"], false, 2013],
  ["Jean Dujardin", ["The Artist", "The Artist", "The Artist"], false, 2012],
  ["Colin Firth", ["The King's Speech", "El discurso del rey", "The King's Speech – Die Rede des Königs"], false, 2011],
  ["Forest Whitaker", ["The Last King of Scotland", "El último rey de Escocia", "Der letzte König von Schottland"], false, 2007],
  ["Jamie Foxx", ["Ray", "Ray", "Ray"], false, 2005],
  ["Denzel Washington", ["Training Day", "Training Day", "Training Day"], false, 2002],
  ["Russell Crowe", ["Gladiator", "Gladiator", "Gladiator"], false, 2001],
  ["Roberto Benigni", ["Life Is Beautiful", "La vida es bella", "Das Leben ist schön"], false, 1999],
  ["Tom Hanks", ["Forrest Gump", "Forrest Gump", "Forrest Gump"], false, 1995],
  ["Tom Hanks", ["Philadelphia", "Philadelphia", "Philadelphia"], false, 1994],
  ["Emma Stone", ["La La Land", "La La Land", "La La Land"], true, 2017],
  ["Emma Stone", ["Poor Things", "Pobres criaturas", "Poor Things"], true, 2024],
  ["Mikey Madison", ["Anora", "Anora", "Anora"], true, 2025],
  ["Michelle Yeoh", ["Everything Everywhere All at Once", "Todo a la vez en todas partes", "Everything Everywhere All at Once"], true, 2023],
  ["Frances McDormand", ["Nomadland", "Nomadland", "Nomadland"], true, 2021],
  ["Renée Zellweger", ["Judy", "Judy", "Judy"], true, 2020],
  ["Olivia Colman", ["The Favourite", "La favorita", "The Favourite – Intrigen und Irrsinn"], true, 2019],
  ["Brie Larson", ["Room", "La habitación", "Raum"], true, 2016],
  ["Julianne Moore", ["Still Alice", "Siempre Alice", "Still Alice – Mein Leben ohne Gestern"], true, 2015],
  ["Cate Blanchett", ["Blue Jasmine", "Blue Jasmine", "Blue Jasmine"], true, 2014],
  ["Jennifer Lawrence", ["Silver Linings Playbook", "El lado bueno de las cosas", "Silver Linings"], true, 2013],
  ["Meryl Streep", ["The Iron Lady", "La dama de hierro", "Die Eiserne Lady"], true, 2012],
  ["Natalie Portman", ["Black Swan", "Cisne negro", "Black Swan"], true, 2011],
  ["Sandra Bullock", ["The Blind Side", "Un sueño posible", "Blind Side – Die große Chance"], true, 2010],
  ["Kate Winslet", ["The Reader", "El lector", "Der Vorleser"], true, 2009],
  ["Marion Cotillard", ["La Vie en Rose", "La vida en rosa", "La vie en rose"], true, 2008],
  ["Helen Mirren", ["The Queen", "The Queen", "Die Queen"], true, 2007],
  ["Reese Witherspoon", ["Walk the Line", "En la cuerda floja", "Walk the Line"], true, 2006],
  ["Hilary Swank", ["Million Dollar Baby", "Million Dollar Baby", "Million Dollar Baby"], true, 2005],
  ["Charlize Theron", ["Monster", "Monster", "Monster"], true, 2004],
  ["Nicole Kidman", ["The Hours", "Las horas", "The Hours – Von Ewigkeit zu Ewigkeit"], true, 2003],
  ["Halle Berry", ["Monster's Ball", "Monster's Ball", "Monster's Ball"], true, 2002],
  ["Julia Roberts", ["Erin Brockovich", "Erin Brockovich", "Erin Brockovich"], true, 2001],
  ["Gwyneth Paltrow", ["Shakespeare in Love", "Shakespeare enamorado", "Shakespeare in Love"], true, 1999],
];

/** Cities where films are (mainly) set */
export const CITIES: Record<string, L> = {
  paris: ["Paris", "París", "Paris"], rome: ["Rome", "Roma", "Rom"], london: ["London", "Londres", "London"], tokyo: ["Tokyo", "Tokio", "Tokio"],
  barcelona: ["Barcelona", "Barcelona", "Barcelona"], bruges: ["Bruges", "Brujas", "Brügge"], vienna: ["Vienna", "Viena", "Wien"], mumbai: ["Mumbai", "Bombay", "Mumbai"],
  rio: ["Rio de Janeiro", "Río de Janeiro", "Rio de Janeiro"], newyork: ["New York", "Nueva York", "New York"], philadelphia: ["Philadelphia", "Filadelfia", "Philadelphia"],
  la: ["Los Angeles", "Los Ángeles", "Los Angeles"], edinburgh: ["Edinburgh", "Edimburgo", "Edinburgh"], berlin: ["Berlin", "Berlín", "Berlin"],
  mexico: ["Mexico City", "Ciudad de México", "Mexiko-Stadt"], seoul: ["Seoul", "Seúl", "Seoul"], singapore: ["Singapore", "Singapur", "Singapur"],
  sf: ["San Francisco", "San Francisco", "San Francisco"], boston: ["Boston", "Boston", "Boston"], chicago: ["Chicago", "Chicago", "Chicago"],
  miami: ["Miami", "Miami", "Miami"], vegas: ["Las Vegas", "Las Vegas", "Las Vegas"], dublin: ["Dublin", "Dublín", "Dublin"], venice: ["Venice", "Venecia", "Venedig"],
  hongkong: ["Hong Kong", "Hong Kong", "Hongkong"],
};
export const FILM_CITY: [L, string, F][] = [
  [["Amélie", "Amélie", "Die fabelhafte Welt der Amélie"], "paris", "e"], [["Midnight in Paris", "Medianoche en París", "Midnight in Paris"], "paris", "e"],
  [["Ratatouille", "Ratatouille", "Ratatouille"], "paris", "e"], [["Roman Holiday", "Vacaciones en Roma", "Ein Herz und eine Krone"], "rome", "m"],
  [["La Dolce Vita", "La dolce vita", "Das süße Leben"], "rome", "m"], [["The Great Beauty", "La gran belleza", "La Grande Bellezza – Die große Schönheit"], "rome", "h"],
  [["Notting Hill", "Notting Hill", "Notting Hill"], "london", "e"], [["Love Actually", "Love Actually", "Tatsächlich… Liebe"], "london", "m"],
  [["Paddington", "Paddington", "Paddington"], "london", "e"], [["Lost in Translation", "Lost in Translation", "Lost in Translation"], "tokyo", "m"],
  [["Akira", "Akira", "Akira"], "tokyo", "h"], [["Vicky Cristina Barcelona", "Vicky Cristina Barcelona", "Vicky Cristina Barcelona"], "barcelona", "e"],
  [["All About My Mother", "Todo sobre mi madre", "Alles über meine Mutter"], "barcelona", "h"], [["In Bruges", "Escondidos en Brujas", "Brügge sehen… und sterben?"], "bruges", "m"],
  [["Before Sunrise", "Antes del amanecer", "Before Sunrise"], "vienna", "m"], [["The Third Man", "El tercer hombre", "Der dritte Mann"], "vienna", "h"],
  [["Slumdog Millionaire", "Slumdog Millionaire", "Slumdog Millionär"], "mumbai", "m"], [["City of God", "Ciudad de Dios", "City of God"], "rio", "m"],
  [["Rio (2011)", "Río (2011)", "Rio (2011)"], "rio", "e"], [["Taxi Driver", "Taxi Driver", "Taxi Driver"], "newyork", "m"],
  [["Ghostbusters", "Cazafantasmas", "Ghostbusters – Die Geisterjäger"], "newyork", "m"], [["Home Alone 2: Lost in New York", "Solo en casa 2: perdido en Nueva York", "Kevin – Allein in New York"], "newyork", "e"],
  [["Rocky", "Rocky", "Rocky"], "philadelphia", "m"], [["La La Land", "La La Land", "La La Land"], "la", "m"], [["Pretty Woman", "Pretty Woman", "Pretty Woman"], "la", "m"],
  [["Chinatown", "Chinatown", "Chinatown"], "la", "h"], [["Trainspotting", "Trainspotting", "Trainspotting"], "edinburgh", "m"],
  [["Run Lola Run", "Corre, Lola, corre", "Lola rennt"], "berlin", "m"], [["Good Bye, Lenin!", "Good Bye, Lenin!", "Good Bye, Lenin!"], "berlin", "m"],
  [["Wings of Desire", "Cielo sobre Berlín", "Der Himmel über Berlin"], "berlin", "h"], [["Roma (2018)", "Roma (2018)", "Roma (2018)"], "mexico", "m"],
  [["Parasite", "Parásitos", "Parasite"], "seoul", "m"], [["Crazy Rich Asians", "Locamente millonarios", "Crazy Rich"], "singapore", "m"],
  [["Vertigo", "Vértigo", "Vertigo – Aus dem Reich der Toten"], "sf", "h"], [["Mrs. Doubtfire", "Señora Doubtfire, papá de por vida", "Mrs. Doubtfire – Das stachelige Kindermädchen"], "sf", "m"],
  [["Inside Out", "Del revés", "Alles steht Kopf"], "sf", "h"], [["Good Will Hunting", "El indomable Will Hunting", "Good Will Hunting"], "boston", "m"],
  [["The Departed", "Infiltrados", "Departed – Unter Feinden"], "boston", "h"], [["Spotlight", "Spotlight", "Spotlight"], "boston", "h"],
  [["Ferris Bueller's Day Off", "Todo en un día", "Ferris macht blau"], "chicago", "h"], [["The Blues Brothers", "The Blues Brothers", "Blues Brothers"], "chicago", "m"],
  [["Scarface", "El precio del poder", "Scarface"], "miami", "m"], [["Moonlight", "Moonlight", "Moonlight"], "miami", "h"],
  [["The Hangover", "Resacón en Las Vegas", "Hangover"], "vegas", "e"], [["Ocean's Eleven", "Ocean's Eleven", "Ocean's Eleven"], "vegas", "e"],
  [["Once (2007)", "Once (2007)", "Once (2007)"], "dublin", "h"], [["Death in Venice", "Muerte en Venecia", "Der Tod in Venedig"], "venice", "m"],
  [["In the Mood for Love", "Deseando amar", "In the Mood for Love"], "hongkong", "h"], [["Chungking Express", "Chungking Express", "Chungking Express"], "hongkong", "h"],
];

/** Film directors → country: [name, country, fame] */
export const DIRECTORS: [string, string, F][] = [
  ["Steven Spielberg", "usa", "e"], ["Stanley Kubrick", "usa", "m"], ["Quentin Tarantino", "usa", "e"], ["Martin Scorsese", "usa", "e"], ["Francis Ford Coppola", "usa", "m"],
  ["Christopher Nolan", "uk", "e"], ["Alfred Hitchcock", "uk", "e"], ["Ridley Scott", "uk", "m"], ["Danny Boyle", "uk", "m"], ["Ken Loach", "uk", "h"], ["Sam Mendes", "uk", "m"], ["Guy Ritchie", "uk", "m"],
  ["Akira Kurosawa", "japan", "e"], ["Hayao Miyazaki", "japan", "e"], ["Yasujirō Ozu", "japan", "h"], ["Hirokazu Kore-eda", "japan", "h"], ["Makoto Shinkai", "japan", "m"],
  ["Pedro Almodóvar", "spain", "e"], ["Luis Buñuel", "spain", "m"], ["Guillermo del Toro", "mexico", "e"], ["Alfonso Cuarón", "mexico", "m"], ["Alejandro G. Iñárritu", "mexico", "m"],
  ["Bong Joon-ho", "south_korea", "m"], ["Park Chan-wook", "south_korea", "h"], ["Federico Fellini", "italy", "e"], ["Sergio Leone", "italy", "m"], ["Bernardo Bertolucci", "italy", "m"],
  ["Paolo Sorrentino", "italy", "h"], ["Roberto Benigni", "italy", "m"], ["François Truffaut", "france", "m"], ["Luc Besson", "france", "m"], ["Jean-Pierre Jeunet", "france", "m"],
  ["Ingmar Bergman", "sweden", "m"], ["Lars von Trier", "denmark", "m"], ["Thomas Vinterberg", "denmark", "h"], ["Wim Wenders", "germany", "m"], ["Werner Herzog", "germany", "m"],
  ["Tom Tykwer", "germany", "h"], ["Fatih Akin", "germany", "h"], ["Peter Jackson", "new_zealand", "e"], ["Jane Campion", "new_zealand", "h"], ["Taika Waititi", "new_zealand", "m"],
  ["Baz Luhrmann", "australia", "m"], ["George Miller", "australia", "h"], ["Satyajit Ray", "india", "m"], ["S. S. Rajamouli", "india", "h"], ["Abbas Kiarostami", "iran", "h"],
  ["Asghar Farhadi", "iran", "h"], ["Andrei Tarkovsky", "russia", "m"], ["Krzysztof Kieślowski", "poland", "h"], ["Andrzej Wajda", "poland", "h"], ["Zhang Yimou", "china", "m"],
  ["James Cameron", "canada", "m"], ["Denis Villeneuve", "canada", "m"], ["David Cronenberg", "canada", "h"], ["Fernando Meirelles", "brazil", "h"], ["Walter Salles", "brazil", "h"],
  ["Juan José Campanella", "argentina", "h"], ["Damián Szifron", "argentina", "h"], ["Ousmane Sembène", "senegal", "h"], ["Youssef Chahine", "egypt", "h"],
  ["Nuri Bilge Ceylan", "turkey", "h"], ["Yorgos Lanthimos", "greece", "m"], ["Theo Angelopoulos", "greece", "h"],
];

export const CINEMA_FACTS2: [F, L, L, L, L, L][] = [
  ["e", ["What is the name of the cowboy toy in Toy Story?", "¿Cómo se llama el vaquero de juguete de Toy Story?", "Wie heißt der Spielzeug-Cowboy in Toy Story?"], ["Woody", "Woody", "Woody"], ["Buzz", "Buzz", "Buzz"], ["Jessie", "Jessie", "Jessie"], ["Rex", "Rex", "Rex"]],
  ["m", ["Which film series is about a group of street racers led by Dominic Toretto?", "¿Qué saga trata de un grupo de pilotos callejeros liderados por Dominic Toretto?", "In welcher Filmreihe geht es um Straßenrennfahrer um Dominic Toretto?"], ["Fast & Furious", "Fast & Furious", "Fast & Furious"], ["Transformers", "Transformers", "Transformers"], ["Mission: Impossible", "Misión imposible", "Mission: Impossible"], ["Need for Speed", "Need for Speed", "Need for Speed"]],
  ["m", ["What is the name of the hobbits' home region in The Lord of the Rings?", "¿Cómo se llama la región de los hobbits en El Señor de los Anillos?", "Wie heißt die Heimat der Hobbits in Der Herr der Ringe?"], ["The Shire", "La Comarca", "Das Auenland"], ["Rohan", "Rohan", "Rohan"], ["Mordor", "Mordor", "Mordor"], ["Gondor", "Gondor", "Gondor"]],
  ["m", ["What is the name of Han Solo's ship in Star Wars?", "¿Cómo se llama la nave de Han Solo en Star Wars?", "Wie heißt Han Solos Raumschiff in Star Wars?"], ["Millennium Falcon", "Halcón Milenario", "Millennium Falke"], ["X-wing", "Ala-X", "X-Flügler"], ["Death Star", "Estrella de la Muerte", "Todesstern"], ["Enterprise", "Enterprise", "Enterprise"]],
  ["e", ["What colour is Darth Vader's lightsaber?", "¿De qué color es el sable de luz de Darth Vader?", "Welche Farbe hat Darth Vaders Lichtschwert?"], ["Red", "Rojo", "Rot"], ["Blue", "Azul", "Blau"], ["Green", "Verde", "Grün"], ["Purple", "Morado", "Lila"]],
  ["m", ["What is the name of the Starship captained by James T. Kirk?", "¿Cómo se llama la nave estelar que capitanea James T. Kirk?", "Wie heißt das Raumschiff von Captain James T. Kirk?"], ["USS Enterprise", "USS Enterprise", "USS Enterprise"], ["Millennium Falcon", "Halcón Milenario", "Millennium Falke"], ["Serenity", "Serenity", "Serenity"], ["Nostromo", "Nostromo", "Nostromo"]],
  ["m", ["In E.T., what does E.T. famously want to do?", "En E.T., ¿qué quiere hacer E.T., según su frase famosa?", "Was will E.T. in seinem berühmten Satz?"], ["Phone home", "Llamar a casa", "Nach Hause telefonieren"], ["Fly to the moon", "Volar a la luna", "Zum Mond fliegen"], ["Eat pizza", "Comer pizza", "Pizza essen"], ["Find his ship", "Encontrar su nave", "Sein Schiff finden"]],
  ["m", ["In Back to the Future, what speed must the DeLorean reach to time-travel?", "En Regreso al futuro, ¿qué velocidad debe alcanzar el DeLorean para viajar en el tiempo?", "Welche Geschwindigkeit muss der DeLorean in Zurück in die Zukunft erreichen?"], ["88 mph", "88 millas por hora", "88 Meilen pro Stunde"], ["100 mph", "100 millas por hora", "100 Meilen pro Stunde"], ["66 mph", "66 millas por hora", "66 Meilen pro Stunde"], ["121 mph", "121 millas por hora", "121 Meilen pro Stunde"]],
  ["h", ["In which year is the film Blade Runner (1982) set?", "¿En qué año transcurre la película Blade Runner (1982)?", "In welchem Jahr spielt der Film Blade Runner (1982)?"], ["2019", "2019", "2019"], ["2049", "2049", "2049"], ["2001", "2001", "2001"], ["2077", "2077", "2077"]],
  ["e", ["What kind of creature is Shrek?", "¿Qué clase de criatura es Shrek?", "Was für ein Wesen ist Shrek?"], ["An ogre", "Un ogro", "Ein Oger"], ["A troll", "Un trol", "Ein Troll"], ["A giant", "Un gigante", "Ein Riese"], ["A goblin", "Un duende", "Ein Kobold"]],
  ["e", ["In Frozen, what is the name of the snowman?", "En Frozen, ¿cómo se llama el muñeco de nieve?", "Wie heißt der Schneemann in Die Eiskönigin?"], ["Olaf", "Olaf", "Olaf"], ["Sven", "Sven", "Sven"], ["Kristoff", "Kristoff", "Kristoff"], ["Hans", "Hans", "Hans"]],
  ["e", ["In The Lion King, what is the name of Simba's father?", "En El rey león, ¿cómo se llama el padre de Simba?", "Wie heißt Simbas Vater in Der König der Löwen?"], ["Mufasa", "Mufasa", "Mufasa"], ["Scar", "Scar", "Scar"], ["Rafiki", "Rafiki", "Rafiki"], ["Pumbaa", "Pumba", "Pumbaa"]],
  ["m", ["Which animated film features the song “Let It Go”?", "¿Qué película de animación incluye la canción «Let It Go» («Libre soy»)?", "In welchem Animationsfilm kommt das Lied „Let It Go“ („Lass jetzt los“) vor?"], ["Frozen", "Frozen", "Die Eiskönigin"], ["Moana", "Vaiana", "Vaiana"], ["Tangled", "Enredados", "Rapunzel – Neu verföhnt"], ["Encanto", "Encanto", "Encanto"]],
  ["m", ["What does the word “anime” refer to?", "¿A qué se refiere la palabra «anime»?", "Was bezeichnet das Wort „Anime“?"], ["Animation from Japan", "Animación japonesa", "Zeichentrick aus Japan"], ["Comics from Korea", "Cómics coreanos", "Comics aus Korea"], ["Chinese puppet theatre", "Teatro de marionetas chino", "Chinesisches Puppentheater"], ["French cartoons", "Dibujos animados franceses", "Französische Cartoons"]],
  ["m", ["Which TV show features the coffee shop Central Perk?", "¿En qué serie aparece la cafetería Central Perk?", "In welcher Serie gibt es das Café Central Perk?"], ["Friends", "Friends", "Friends"], ["How I Met Your Mother", "Cómo conocí a vuestra madre", "How I Met Your Mother"], ["Seinfeld", "Seinfeld", "Seinfeld"], ["The Big Bang Theory", "The Big Bang Theory", "The Big Bang Theory"]],
  ["m", ["In which series do characters live in the “Upside Down”?", "¿En qué serie aparece el «Mundo del Revés»?", "In welcher Serie gibt es die „Upside Down“ (Schattenwelt)?"], ["Stranger Things", "Stranger Things", "Stranger Things"], ["Dark", "Dark", "Dark"], ["Wednesday", "Miércoles", "Wednesday"], ["Lost", "Perdidos", "Lost"]],
  ["m", ["Which family lives in the fictional town of Springfield?", "¿Qué familia vive en la ciudad ficticia de Springfield?", "Welche Familie lebt in der fiktiven Stadt Springfield?"], ["The Simpsons", "Los Simpson", "Die Simpsons"], ["The Griffins", "Los Griffin", "Die Griffins"], ["The Addams", "Los Addams", "Die Addams"], ["The Flintstones", "Los Picapiedra", "Die Feuersteins"]],
  ["m", ["What is the name of the bar in The Simpsons?", "¿Cómo se llama el bar de Los Simpson?", "Wie heißt die Bar in Die Simpsons?"], ["Moe's Tavern", "La taberna de Moe", "Moe's Taverne"], ["Cheers", "Cheers", "Cheers"], ["The Drunken Clam", "La Almeja Borracha", "Die Betrunkene Muschel"], ["Paddy's Pub", "Paddy's Pub", "Paddy's Pub"]],
  ["m", ["What is the name of the prison in Prison Break season 1?", "¿Cómo se llama la cárcel en la primera temporada de Prison Break?", "Wie heißt das Gefängnis in der ersten Staffel von Prison Break?"], ["Fox River", "Fox River", "Fox River"], ["Shawshank", "Shawshank", "Shawshank"], ["Alcatraz", "Alcatraz", "Alcatraz"], ["Litchfield", "Litchfield", "Litchfield"]],
  ["e", ["Which series is set in the fictional land of Westeros?", "¿Qué serie transcurre en el continente ficticio de Poniente?", "Welche Serie spielt im fiktiven Westeros?"], ["Game of Thrones", "Juego de tronos", "Game of Thrones"], ["The Witcher", "The Witcher", "The Witcher"], ["Vikings", "Vikingos", "Vikings"], ["The Rings of Power", "Los anillos de poder", "Die Ringe der Macht"]],
  ["m", ["In Money Heist, which artist's mask do the robbers wear?", "En La casa de papel, ¿la cara de qué pintor llevan las máscaras de los atracadores?", "Wessen Gesicht zeigen die Masken der Räuber in Haus des Geldes?"], ["Salvador Dalí", "Salvador Dalí", "Salvador Dalí"], ["Pablo Picasso", "Pablo Picasso", "Pablo Picasso"], ["Francisco de Goya", "Francisco de Goya", "Francisco de Goya"], ["Frida Kahlo", "Frida Kahlo", "Frida Kahlo"]],
  ["m", ["In Squid Game, which children's game is played first?", "En El juego del calamar, ¿qué juego infantil se juega primero?", "Welches Kinderspiel wird in Squid Game zuerst gespielt?"], ["Red Light, Green Light", "Luz roja, luz verde", "Rotes Licht, grünes Licht"], ["Tug of war", "Tira y afloja", "Tauziehen"], ["Marbles", "Canicas", "Murmeln"], ["Hide and seek", "Escondite", "Verstecken"]],
];

// ═══ POP CULTURE ═══════════════════════════════════════════════════
export const MUSIC_GENRES: Record<string, L> = {
  reggae: ["Reggae", "Reggae", "Reggae"], metal: ["Heavy metal", "Heavy metal", "Heavy Metal"], hiphop: ["Hip hop", "Hip hop", "Hip-Hop"], jazz: ["Jazz", "Jazz", "Jazz"],
  country: ["Country", "Country", "Country"], electronic: ["Electronic music", "Música electrónica", "Elektronische Musik"], kpop: ["K-pop", "K-pop", "K-Pop"],
  reggaeton: ["Reggaeton", "Reguetón", "Reggaeton"], salsa: ["Salsa", "Salsa", "Salsa"], flamenco: ["Flamenco", "Flamenco", "Flamenco"], grunge: ["Grunge", "Grunge", "Grunge"],
  punk: ["Punk rock", "Punk rock", "Punkrock"], classical: ["Classical music", "Música clásica", "Klassische Musik"], blues: ["Blues", "Blues", "Blues"],
  rocknroll: ["Rock and roll", "Rock and roll", "Rock ’n’ Roll"], soul: ["Soul", "Soul", "Soul"], tango: ["Tango", "Tango", "Tango"], bossa: ["Bossa nova", "Bossa nova", "Bossa Nova"],
  afro: ["Afrobeat(s)", "Afrobeat", "Afrobeat"], opera: ["Opera", "Ópera", "Oper"],
};
export const GENRE_CLASH2: [string, string][] = [["grunge", "punk"], ["soul", "blues"], ["jazz", "blues"], ["classical", "opera"], ["rocknroll", "blues"], ["reggaeton", "salsa"], ["bossa", "jazz"]];
export const ARTIST_GENRE: [string, string, F][] = [
  ["Bob Marley", "reggae", "e"], ["Jimmy Cliff", "reggae", "h"], ["Peter Tosh", "reggae", "h"], ["Metallica", "metal", "e"], ["Iron Maiden", "metal", "m"], ["Black Sabbath", "metal", "m"],
  ["Eminem", "hiphop", "e"], ["Tupac Shakur", "hiphop", "e"], ["Kendrick Lamar", "hiphop", "m"], ["Jay-Z", "hiphop", "m"], ["Snoop Dogg", "hiphop", "e"],
  ["Miles Davis", "jazz", "m"], ["Louis Armstrong", "jazz", "e"], ["Ella Fitzgerald", "jazz", "m"], ["Billie Holiday", "jazz", "m"], ["John Coltrane", "jazz", "h"],
  ["Johnny Cash", "country", "m"], ["Dolly Parton", "country", "e"], ["Willie Nelson", "country", "m"], ["Garth Brooks", "country", "m"],
  ["Daft Punk", "electronic", "e"], ["Kraftwerk", "electronic", "m"], ["Avicii", "electronic", "e"], ["David Guetta", "electronic", "e"], ["Skrillex", "electronic", "m"],
  ["BTS", "kpop", "e"], ["Blackpink", "kpop", "e"], ["Twice", "kpop", "m"], ["Stray Kids", "kpop", "m"],
  ["Daddy Yankee", "reggaeton", "e"], ["J Balvin", "reggaeton", "e"], ["Karol G", "reggaeton", "m"], ["Celia Cruz", "salsa", "e"], ["Héctor Lavoe", "salsa", "h"], ["Marc Anthony", "salsa", "m"], ["Rubén Blades", "salsa", "h"],
  ["Paco de Lucía", "flamenco", "m"], ["Camarón de la Isla", "flamenco", "m"], ["Nirvana", "grunge", "e"], ["Pearl Jam", "grunge", "m"], ["Soundgarden", "grunge", "h"],
  ["Ramones", "punk", "m"], ["Sex Pistols", "punk", "e"], ["Green Day", "punk", "m"], ["The Clash", "punk", "m"],
  ["Wolfgang Amadeus Mozart", "classical", "e"], ["Frédéric Chopin", "classical", "e"], ["Antonio Vivaldi", "classical", "e"], ["Johann Sebastian Bach", "classical", "e"],
  ["B.B. King", "blues", "m"], ["Muddy Waters", "blues", "m"], ["Robert Johnson", "blues", "h"], ["Elvis Presley", "rocknroll", "e"], ["Chuck Berry", "rocknroll", "m"], ["Little Richard", "rocknroll", "m"],
  ["Aretha Franklin", "soul", "e"], ["Marvin Gaye", "soul", "m"], ["Otis Redding", "soul", "m"], ["Carlos Gardel", "tango", "m"], ["Astor Piazzolla", "tango", "m"],
  ["João Gilberto", "bossa", "m"], ["Antônio Carlos Jobim", "bossa", "m"], ["Fela Kuti", "afro", "m"], ["Burna Boy", "afro", "e"], ["Wizkid", "afro", "m"],
  ["Luciano Pavarotti", "opera", "e"], ["Maria Callas", "opera", "m"], ["Plácido Domingo", "opera", "m"],
];

export const INSTRUMENTS: Record<string, L> = {
  guitar: ["Guitar", "Guitarra", "Gitarre"], drums: ["Drums", "Batería", "Schlagzeug"], cello: ["Cello", "Violonchelo", "Cello"], piano: ["Piano", "Piano", "Klavier"],
  trumpet: ["Trumpet", "Trompeta", "Trompete"], sax: ["Saxophone", "Saxofón", "Saxofon"], violin: ["Violin", "Violín", "Geige"], sitar: ["Sitar", "Sitar", "Sitar"],
  bass: ["Bass guitar", "Bajo", "Bassgitarre"], trombone: ["Trombone", "Trombón", "Posaune"], clarinet: ["Clarinet", "Clarinete", "Klarinette"], tabla: ["Tabla", "Tabla", "Tabla"],
};
export const PLAYERS: [string, string, F][] = [
  ["Jimi Hendrix", "guitar", "e"], ["Eric Clapton", "guitar", "m"], ["Carlos Santana", "guitar", "m"], ["Paco de Lucía", "guitar", "m"], ["Andrés Segovia", "guitar", "h"],
  ["Ringo Starr", "drums", "e"], ["Keith Moon", "drums", "m"], ["Neil Peart", "drums", "h"], ["Buddy Rich", "drums", "h"],
  ["Yo-Yo Ma", "cello", "m"], ["Pablo Casals", "cello", "h"], ["Jacqueline du Pré", "cello", "h"],
  ["Lang Lang", "piano", "m"], ["Elton John", "piano", "e"], ["Alicia Keys", "piano", "m"], ["Martha Argerich", "piano", "h"], ["Ray Charles", "piano", "m"],
  ["Louis Armstrong", "trumpet", "e"], ["Miles Davis", "trumpet", "m"], ["Dizzy Gillespie", "trumpet", "m"], ["Wynton Marsalis", "trumpet", "h"],
  ["John Coltrane", "sax", "m"], ["Charlie Parker", "sax", "m"], ["Kenny G", "sax", "e"], ["Itzhak Perlman", "violin", "m"], ["André Rieu", "violin", "e"],
  ["Niccolò Paganini", "violin", "m"], ["Vanessa-Mae", "violin", "m"], ["Hilary Hahn", "violin", "h"], ["Ravi Shankar", "sitar", "m"],
  ["Flea", "bass", "m"], ["Jaco Pastorius", "bass", "h"], ["Glenn Miller", "trombone", "h"], ["Benny Goodman", "clarinet", "m"], ["Zakir Hussain", "tabla", "h"],
];

export const OWNERS: Record<string, L> = {
  meta: ["Meta", "Meta", "Meta"], google: ["Google (Alphabet)", "Google (Alphabet)", "Google (Alphabet)"], microsoft: ["Microsoft", "Microsoft", "Microsoft"],
  amazon: ["Amazon", "Amazon", "Amazon"], apple: ["Apple", "Apple", "Apple"], bytedance: ["ByteDance", "ByteDance", "ByteDance"], disney: ["Disney", "Disney", "Disney"],
};
export const OWNED: [string, string, F][] = [
  ["Instagram", "meta", "e"], ["WhatsApp", "meta", "e"], ["Messenger", "meta", "m"], ["Threads", "meta", "m"], ["Oculus / Meta Quest", "meta", "m"],
  ["YouTube", "google", "e"], ["Android", "google", "e"], ["Gmail", "google", "e"], ["Waze", "google", "h"], ["Fitbit", "google", "h"], ["Nest", "google", "h"],
  ["LinkedIn", "microsoft", "m"], ["GitHub", "microsoft", "h"], ["Minecraft", "microsoft", "m"], ["Xbox", "microsoft", "e"], ["Bing", "microsoft", "m"],
  ["Twitch", "amazon", "m"], ["Audible", "amazon", "h"], ["IMDb", "amazon", "h"], ["Kindle", "amazon", "e"], ["Alexa", "amazon", "e"], ["Ring (doorbells)", "amazon", "h"],
  ["Siri", "apple", "e"], ["Shazam", "apple", "h"], ["Beats", "apple", "m"], ["TikTok", "bytedance", "m"], ["CapCut", "bytedance", "h"],
  ["Pixar", "disney", "m"], ["Marvel Studios", "disney", "m"], ["Lucasfilm (Star Wars)", "disney", "m"], ["ESPN", "disney", "h"], ["Hulu", "disney", "h"],
];

/** Music festivals → country */
export const FESTIVALS: [string, string, F][] = [
  ["Glastonbury", "uk", "e"], ["Reading Festival", "uk", "m"], ["Isle of Wight Festival", "uk", "m"], ["Download Festival", "uk", "h"],
  ["Roskilde", "denmark", "m"], ["Tomorrowland", "belgium", "e"], ["Rock Werchter", "belgium", "h"], ["Pukkelpop", "belgium", "h"],
  ["Sziget", "hungary", "m"], ["Rock in Rio", "brazil", "e"], ["Fuji Rock", "japan", "m"], ["Summer Sonic", "japan", "h"],
  ["Primavera Sound", "spain", "m"], ["Sónar", "spain", "m"], ["Mad Cool", "spain", "m"], ["Benicàssim (FIB)", "spain", "m"],
  ["Exit Festival", "serbia", "m"], ["Coachella", "usa", "e"], ["Burning Man", "usa", "e"], ["Ultra Music Festival", "usa", "m"], ["Woodstock", "usa", "e"],
  ["Wacken Open Air", "germany", "m"], ["Rock am Ring", "germany", "m"], ["Lowlands", "netherlands", "h"], ["Øya Festival", "norway", "h"],
  ["Way Out West", "sweden", "h"], ["Open'er", "poland", "h"], ["Splendour in the Grass", "australia", "h"], ["Vive Latino", "mexico", "m"],
  ["Estéreo Picnic", "colombia", "h"], ["Flow Festival", "finland", "h"],
];

export const POP_FACTS: [F, L, L, L, L, L][] = [
  ["e", ["Which band released the album “Abbey Road”?", "¿Qué banda publicó el álbum «Abbey Road»?", "Welche Band veröffentlichte das Album „Abbey Road“?"], ["The Beatles", "The Beatles", "The Beatles"], ["The Rolling Stones", "The Rolling Stones", "The Rolling Stones"], ["Queen", "Queen", "Queen"], ["Pink Floyd", "Pink Floyd", "Pink Floyd"]],
  ["m", ["Which band released the album “The Dark Side of the Moon”?", "¿Qué banda publicó el álbum «The Dark Side of the Moon»?", "Welche Band veröffentlichte das Album „The Dark Side of the Moon“?"], ["Pink Floyd", "Pink Floyd", "Pink Floyd"], ["Led Zeppelin", "Led Zeppelin", "Led Zeppelin"], ["The Beatles", "The Beatles", "The Beatles"], ["The Doors", "The Doors", "The Doors"]],
  ["e", ["What is Michael Jackson's best-selling album?", "¿Cuál es el álbum más vendido de Michael Jackson?", "Was ist Michael Jacksons meistverkauftes Album?"], ["Thriller", "Thriller", "Thriller"], ["Bad", "Bad", "Bad"], ["Off the Wall", "Off the Wall", "Off the Wall"], ["Dangerous", "Dangerous", "Dangerous"]],
  ["m", ["Which dance move did Michael Jackson make famous?", "¿Qué paso de baile hizo famoso Michael Jackson?", "Welchen Tanzschritt machte Michael Jackson berühmt?"], ["The moonwalk", "El moonwalk", "Den Moonwalk"], ["The twist", "El twist", "Den Twist"], ["The floss", "El floss", "Den Floss"], ["The macarena", "La macarena", "Die Macarena"]],
  ["m", ["Which Spanish duo had the 1990s hit “Macarena”?", "¿Qué dúo español tuvo el éxito de los 90 «Macarena»?", "Welches spanische Duo hatte in den 1990ern den Hit „Macarena“?"], ["Los del Río", "Los del Río", "Los del Río"], ["Gipsy Kings", "Gipsy Kings", "Gipsy Kings"], ["Las Ketchup", "Las Ketchup", "Las Ketchup"], ["Mecano", "Mecano", "Mecano"]],
  ["m", ["Which song by PSY became the first YouTube video to reach one billion views?", "¿Qué canción de PSY fue el primer vídeo de YouTube en llegar a mil millones de visitas?", "Welches Lied von PSY war das erste YouTube-Video mit einer Milliarde Aufrufen?"], ["Gangnam Style", "Gangnam Style", "Gangnam Style"], ["Gentleman", "Gentleman", "Gentleman"], ["Daddy", "Daddy", "Daddy"], ["Dynamite", "Dynamite", "Dynamite"]],
  ["m", ["Which Luis Fonsi song with Daddy Yankee became a worldwide hit in 2017?", "¿Qué canción de Luis Fonsi con Daddy Yankee fue un éxito mundial en 2017?", "Welcher Song von Luis Fonsi mit Daddy Yankee wurde 2017 ein Welthit?"], ["Despacito", "Despacito", "Despacito"], ["Gasolina", "Gasolina", "Gasolina"], ["Bailando", "Bailando", "Bailando"], ["Mi Gente", "Mi Gente", "Mi Gente"]],
  ["e", ["What does “DJ” stand for?", "¿Qué significa «DJ»?", "Wofür steht „DJ“?"], ["Disc jockey", "Disc jockey (pinchadiscos)", "Discjockey"], ["Dance judge", "Juez de baile", "Tanzrichter"], ["Digital jukebox", "Máquina de discos digital", "Digitale Jukebox"], ["Double jam", "Doble sesión", "Doppelsession"]],
  ["m", ["How many strings does a standard guitar have?", "¿Cuántas cuerdas tiene una guitarra normal?", "Wie viele Saiten hat eine normale Gitarre?"], ["6", "6", "6"], ["4", "4", "4"], ["5", "5", "5"], ["8", "8", "8"]],
  ["m", ["How many keys does a standard piano have?", "¿Cuántas teclas tiene un piano normal?", "Wie viele Tasten hat ein normales Klavier?"], ["88", "88", "88"], ["76", "76", "76"], ["64", "64", "64"], ["100", "100", "100"]],
  ["m", ["Which streaming service comes from Sweden?", "¿Qué servicio de streaming es sueco?", "Welcher Streamingdienst stammt aus Schweden?"], ["Spotify", "Spotify", "Spotify"], ["Deezer", "Deezer", "Deezer"], ["Tidal", "Tidal", "Tidal"], ["SoundCloud", "SoundCloud", "SoundCloud"]],
  ["m", ["Which streaming service comes from France?", "¿Qué servicio de streaming de música es francés?", "Welcher Musik-Streamingdienst stammt aus Frankreich?"], ["Deezer", "Deezer", "Deezer"], ["Spotify", "Spotify", "Spotify"], ["Tidal", "Tidal", "Tidal"], ["Pandora", "Pandora", "Pandora"]],
  ["e", ["What is the name of the little blue bird that was Twitter's logo?", "¿Cómo se llamaba el pajarito azul del logotipo de Twitter?", "Wie hieß der kleine blaue Vogel im Twitter-Logo?"], ["Larry", "Larry", "Larry"], ["Tweety", "Piolín", "Tweety"], ["Blue", "Blue", "Blue"], ["Jay", "Jay", "Jay"]],
  ["m", ["What is Twitter called since 2023?", "¿Cómo se llama Twitter desde 2023?", "Wie heißt Twitter seit 2023?"], ["X", "X", "X"], ["Threads", "Threads", "Threads"], ["Bluesky", "Bluesky", "Bluesky"], ["Tweeter", "Tweeter", "Tweeter"]],
  ["e", ["What is a “selfie”?", "¿Qué es un «selfie»?", "Was ist ein „Selfie“?"], ["A photo you take of yourself", "Una foto que te haces a ti mismo", "Ein Foto, das man von sich selbst macht"], ["A short video dance", "Un breve vídeo bailando", "Ein kurzes Tanzvideo"], ["A voice message", "Un mensaje de voz", "Eine Sprachnachricht"], ["A photo filter", "Un filtro de fotos", "Ein Fotofilter"]],
  ["m", ["What does a “hashtag” start with?", "¿Con qué símbolo empieza un «hashtag»?", "Mit welchem Zeichen beginnt ein „Hashtag“?"], ["#", "#", "#"], ["@", "@", "@"], ["&", "&", "&"], ["*", "*", "*"]],
  ["m", ["What is an “emoji” originally from?", "¿De dónde proceden originalmente los «emojis»?", "Woher stammen „Emojis“ ursprünglich?"], ["Japan", "Japón", "Japan"], ["USA", "Estados Unidos", "USA"], ["South Korea", "Corea del Sur", "Südkorea"], ["Finland", "Finlandia", "Finnland"]],
  ["m", ["Which toy company makes Barbie?", "¿Qué empresa de juguetes fabrica Barbie?", "Welche Spielzeugfirma stellt Barbie her?"], ["Mattel", "Mattel", "Mattel"], ["Hasbro", "Hasbro", "Hasbro"], ["LEGO", "LEGO", "LEGO"], ["Playmobil", "Playmobil", "Playmobil"]],
  ["m", ["Which toy company makes Monopoly today?", "¿Qué empresa de juguetes fabrica hoy el Monopoly?", "Welche Spielzeugfirma stellt heute Monopoly her?"], ["Hasbro", "Hasbro", "Hasbro"], ["Mattel", "Mattel", "Mattel"], ["Ravensburger", "Ravensburger", "Ravensburger"], ["LEGO", "LEGO", "LEGO"]],
  ["m", ["What does the name LEGO come from?", "¿De dónde viene el nombre LEGO?", "Woher kommt der Name LEGO?"], ["Danish “leg godt” (play well)", "Del danés «leg godt» (juega bien)", "Vom dänischen „leg godt“ (spiel gut)"], ["Latin “lego” (I build)", "Del latín «lego» (construyo)", "Vom lateinischen „lego“ (ich baue)"], ["The founder's name", "Del nombre del fundador", "Vom Namen des Gründers"], ["Greek “logos” (word)", "Del griego «logos» (palabra)", "Vom griechischen „logos“ (Wort)"]],
  ["e", ["What are the yellow creatures in Despicable Me called?", "¿Cómo se llaman las criaturas amarillas de Gru, mi villano favorito?", "Wie heißen die gelben Wesen in Ich – Einfach unverbesserlich?"], ["Minions", "Minions", "Minions"], ["Smurfs", "Pitufos", "Schlümpfe"], ["Oompa-Loompas", "Oompa-Loompas", "Umpa-Lumpas"], ["Gremlins", "Gremlins", "Gremlins"]],
  ["e", ["What colour are the Smurfs?", "¿De qué color son los Pitufos?", "Welche Farbe haben die Schlümpfe?"], ["Blue", "Azules", "Blau"], ["Green", "Verdes", "Grün"], ["Yellow", "Amarillos", "Gelb"], ["Purple", "Morados", "Lila"]],
  ["m", ["Which country do the Smurfs come from?", "¿De qué país son los Pitufos?", "Aus welchem Land stammen die Schlümpfe?"], ["Belgium", "Bélgica", "Belgien"], ["France", "Francia", "Frankreich"], ["Netherlands", "Países Bajos", "Niederlande"], ["Denmark", "Dinamarca", "Dänemark"]],
  ["m", ["Which country does Hello Kitty come from?", "¿De qué país es Hello Kitty?", "Aus welchem Land stammt Hello Kitty?"], ["Japan", "Japón", "Japan"], ["South Korea", "Corea del Sur", "Südkorea"], ["China", "China", "China"], ["USA", "Estados Unidos", "USA"]],
  ["m", ["Which country does the comic hero Tintin come from?", "¿De qué país es Tintín?", "Aus welchem Land stammt die Comicfigur Tim (Tintin)?"], ["Belgium", "Bélgica", "Belgien"], ["France", "Francia", "Frankreich"], ["Switzerland", "Suiza", "Schweiz"], ["Netherlands", "Países Bajos", "Niederlande"]],
  ["m", ["Which country does the cartoon character Mafalda come from?", "¿De qué país es Mafalda?", "Aus welchem Land stammt die Comicfigur Mafalda?"], ["Argentina", "Argentina", "Argentinien"], ["Spain", "España", "Spanien"], ["Mexico", "México", "Mexiko"], ["Chile", "Chile", "Chile"]],
  ["m", ["Which Japanese manga is about a boy who wants to become King of the Pirates?", "¿Qué manga japonés trata de un chico que quiere ser el Rey de los Piratas?", "In welchem Manga will ein Junge König der Piraten werden?"], ["One Piece", "One Piece", "One Piece"], ["Naruto", "Naruto", "Naruto"], ["Dragon Ball", "Dragon Ball", "Dragon Ball"], ["Bleach", "Bleach", "Bleach"]],
  ["m", ["Which manga is about a ninja who dreams of becoming Hokage?", "¿Qué manga trata de un ninja que sueña con ser Hokage?", "In welchem Manga träumt ein Ninja davon, Hokage zu werden?"], ["Naruto", "Naruto", "Naruto"], ["One Piece", "One Piece", "One Piece"], ["Demon Slayer", "Guardianes de la noche (Kimetsu no Yaiba)", "Demon Slayer"], ["Attack on Titan", "Ataque a los titanes", "Attack on Titan"]],
  ["m", ["In Dragon Ball, how many Dragon Balls must be gathered?", "En Dragon Ball, ¿cuántas bolas de dragón hay que reunir?", "Wie viele Dragon Balls muss man in Dragon Ball sammeln?"], ["7", "7", "7"], ["5", "5", "5"], ["9", "9", "9"], ["12", "12", "12"]],
];
