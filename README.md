# Trivia Quest 🎲

A multiplayer board-game trivia site with an old tavern feel: a parchment sea chart with a circular wooden track, wax seals, brass and a bone die. Create a room, share the short link (like `…/trivia-quest/KOBALI`), pick a little character, then roll the dice, travel around the board and answer questions. Play free-for-all or in teams, in **English, Español or Deutsch**. Every player picks their own language and sees the same question in it.

- **Circular board.** Tiles run around a ring, starting at the top, with Finish right beside Start. In "All trophies" mode you keep going round and earn a lap bonus.
- **Characters.** Type your name and tap one of 16 little characters (🧙 🧝 🤴 👸 🥷 🤠 🦊 🐻 🦉 🐸 …), or tap ✎ to **make your own** in skribbl.io/Kahoot style: 12 colours, 8 eyes, 8 mouths and 9 hats, plus a 🎲 random button. Your name and character are remembered for next time.
- **Made for phones.**
  - A close-up strip under the board shows the next tiles and where each roll (+1 to +6) would land.
  - The screen stays awake during a game, and your phone buzzes when it's your turn (Android).
  - The layout leaves room for the iPhone home bar.
  - **Add to Home Screen** opens it full-screen like an app.
- **Teams.** Each team has a banner and crest (Leo 🦁, Aquila 🦅, Lupus 🐺, Draco 🐉, Ursus 🐻, Vulpes 🦊), and teammates take turns rolling. The host picks how a team answers:
  - **Team vote** (default): everyone in the team taps an answer and the majority wins. A tie goes to the player whose turn it is.
  - **One player decides:** the player whose turn it is answers, and teammates can tap to suggest.
- **Steals ⚡.** After a wrong answer, every other team or player gets 10 seconds to tap the right one, worth half the points. Each team gets one try.
- **Hot streak 🔥.** From the 3rd correct answer in a row, each correct answer earns +100 bonus points.
- **Reactions.** 👏 😂 😱 🔥 🤔 🎉 float up over everyone's screen, even while a question is open.
- **Open games.** The start page lists games that are waiting for players, so you can tap **Join** without a code. The host can hide their game with **Open games list: Off**.
  - On GitHub Pages, hosts announce their game on a free public message relay (HiveMQ, with EMQX as backup). If the relay can't be reached, joining by code still works.
- **Choose your team.** In Team mode, tap **🤝 Team up** next to a friend to join their team. The host can move anyone to any team.
- **Easy room codes.** Codes are six letters that are easy to say out loud (KOBALI, MIRETO…), with no digits.
- **Reconnect-safe.** Reload or lose signal and you're put back in your seat.

Architecture, data model and the full event protocol are in **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

---

## Two ways to run it

### 1. GitHub Pages: free, no server (`.github/workflows/pages.yml`)

Every push to `main` builds a fully static version and publishes it to `https://<user>.github.io/<repo>/`.

In this version **the host's browser runs the game**. The other players connect directly to the host over WebRTC (PeerJS), so nothing runs on a server.

- The host should keep the game page open; closing it ends the room. A laptop or tablet makes the steadiest host.
- Guests can reload or drop out and come back to their seat.
- On some very strict mobile networks a direct connection isn't possible. If someone can't join, try them on Wi-Fi.

To set it up: in the repository, go to **Settings → Pages** and set **Source = GitHub Actions**.

### 2. Node server (Render, Docker, any VPS)

A real server holds the game, so the correct answers never leave it, and it works on every network.

```bash
npm install
npm run dev          # http://localhost:3000
```

- **Render:** New → Blueprint → pick the repo. It uses `render.yaml`, works on the free plan and supports WebSockets. You get `https://<service-name>.onrender.com`, so choose a nice service name.
- **Docker:** `docker build -t trivia . && docker run -p 3000:3000 trivia`
- **Optional PostgreSQL** (player stats, room history, editable question bank): `docker compose up -d`, then `cp .env.example .env`, then `npm run db:push && npm run db:seed`.

**Custom domain** (e.g. `triviaquest.ch`): buy it from any registrar (around 10–15 CHF a year). Then add it under GitHub **Settings → Pages → Custom domain** (or Render → Custom Domains) and follow the DNS steps shown there. HTTPS is free.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with the Socket.io backend |
| `npm run build` / `npm start` | Production server build / start |
| `npm run build:pages` | Static peer-to-peer build into `out/` (what GitHub Pages serves) |
| `npm test` | Engine unit tests, socket end-to-end test, translation tests |

## Adding questions or languages

- **Questions:** there are about **86,900 questions** in eight categories (History, Science, Pop Culture, Sports, Art, Geography, Food & Drink, Nature & Animals), all in EN/ES/DE.
  - 85 are hand-written in `server/questions/seedQuestions.ts`. Write each one once per language, with the **correct answer first** and the options **in the same order** in every language.
  - The rest are built by `server/questions/gen/generate.ts` from fact tables in `server/questions/gen/data/` (countries, cities, rivers, islands, borders, leaders, SI units, elements, animals, dishes, songs, games, clubs, books, films, artworks, athletes and more). Add a row to a table and you get several new questions in all three languages.
  - Each game rotates between 564 kinds of question and never asks about the same thing twice. `npm test` checks every question in every language.
- **Languages:** add the code to `LOCALES` in `src/shared/i18n.ts` and translate a copy of the `es` dictionary. TypeScript flags any missing key.

## How to play

- **Your turn:** roll the die, hop around the ring, and answer a question in the tile's category before the hourglass runs out.
- **Board length:** 30, 50, 70, 100 or 150 tiles (boards over 70 tiles are drawn as two rings).
- **Time to answer:** 15, 30, 45 or 60 seconds, or **∞ no limit** (handy with "Others read").
- **Pick the difficulty** (host setting, on by default): after you land on a category tile you see the category and choose easy, medium or hard. Trophy tiles only allow medium or hard. If nobody picks within 12 seconds, one is picked for you.
- **Others read** (host setting, off by default): the answering player or team only sees the four answers; the other players see the question and read it out loud.
- **Mixed languages:** each player picks their own language. The question card also shows the question in the other languages used in the room (e.g. a Spanish reader sees the German version to read to a German teammate).
- **Right answer:** easy 100, medium 200, hard 300 points. On a 🏆 tile you also win that category's trophy (+200 points).
- **Wrong answer or out of time:** you move back one tile.
- **Special tiles:** 🎲 Roll Again · 🔀 Swap places with the pawn ahead · ⛓️ Lose a Turn · 💰 Double Points on your next question.
- **To win:** have the **most points** when the game ends. The game ends when someone reaches 👑 Finish or collects every trophy (the host chooses which in the lobby); whoever ends it gets a +500 bonus, but a player far ahead on points still wins.
