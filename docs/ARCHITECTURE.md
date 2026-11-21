# Trivia Quest — Architecture

A realtime, multiplayer board-game trivia app with a circular board, little player characters and team crests. Players join a room with a 6-character code, roll a die, move pawns along a snaking board, and answer category questions. The game ends when someone reaches the finish or collects every category trophy, and the side with the most points wins (ending it earns a +500 bonus). The UI, game messages and the whole question bank are available in **English, Spanish and German**. Each player picks their own language, so the same room can mix languages.

---

## 1. System architecture & folder structure

```
 Browser (Next.js App Router, React 19, Tailwind 4, Framer Motion)
 ┌──────────────────────────────────────────────────────────────┐
 │ Home ── Lobby (teams/settings) ── Game (SVG board, 3D dice,  │
 │                                   trivia card, scoreboard)   │
 │ zustand store  ◀── ROOM_STATE snapshots + animation cues     │
 └───────────────▲───────────────────────────┬──────────────────┘
                 │ socket.io (WebSocket)      │ acked requests
 ┌───────────────┴───────────────────────────▼──────────────────┐
 │ Node server (server/index.ts) — one port serves Next + io    │
 │  registerHandlers: rate-limit → zod-validate → authorise     │
 │  RoomManager: rooms, socket↔seat binding, reconnection, GC   │
 │  Room: lobby (players, teams, settings, host)                │
 │  GameEngine: authoritative turn loop, dice, tiles, answers   │
 └───────────────┬──────────────────────────────────────────────┘
                 │ async, fire-and-forget (never blocks a turn)
 ┌───────────────▼──────────────────────────────────────────────┐
 │ PostgreSQL via Prisma 7 (optional) — users/stats, rooms,     │
 │ teams/results, question bank (+translations), answer log     │
 │ No DATABASE_URL → in-memory question bank, no persistence    │
 └──────────────────────────────────────────────────────────────┘
```

**Why this shape**
- **The server owns the game state.** The client never decides a die value, a move or whether an answer was right. Live state stays in memory for low latency. The database only keeps durable records, and its writes are queued per room so a database hiccup can't stall a turn.
- **Snapshots + cues.** After every change the server broadcasts a full public `ROOM_STATE` (versioned and coalesced per tick). One-shot cues (`DICE_ROLLED`, `MOVE_PAWN`, `SPECIAL_TILE`) only drive the animations. A client that joins late or reconnects just renders the latest snapshot.
- **Shared timing.** `src/shared/constants.ts → TIMING` sets both the server's turn-loop pauses and the client's animation lengths, so the two never drift apart.
- **One process, one port.** The simplest way to deploy. Set `SERVE_NEXT=false` to run the socket server on its own (for example Next on Vercel, sockets on Fly) and point `NEXT_PUBLIC_SOCKET_URL` at it.

```
trivia-quest/
├── server/                      Realtime backend (Node + socket.io, run with tsx)
│   ├── index.ts                 HTTP server: Next.js handler + socket.io + /healthz
│   ├── realtime.ts              attachRealtime(), picks Prisma vs in-memory data layer
│   ├── socket/registerHandlers.ts  every C2S event: rate-limit → zod → room/engine → ack
│   ├── rooms/RoomManager.ts     room registry, socket↔seat binding, session takeover, GC
│   ├── rooms/Room.ts            lobby: players, host, teams, settings, start/return
│   ├── game/GameEngine.ts       ★ turn state machine, dice, movement, tiles, trivia
│   ├── game/board.ts            board generator (HQ trophy tiles, specials)
│   ├── questions/QuestionBank.ts   interface + InMemory / Prisma implementations
│   ├── questions/seedQuestions.ts  85 hand-written questions × EN/ES/DE
│   ├── questions/gen/              ~22,600 generated questions (fact tables → EN/ES/DE templates)
│   ├── persistence/GamePersistence.ts  Noop + Prisma (serialised per room)
│   └── lib/                     ids & tokens, token-bucket rate limiter, prisma loader
├── src/
│   ├── shared/                  imported by BOTH server and client
│   │   ├── types.ts             public state shapes (no secrets)
│   │   ├── events.ts            ★ socket event names + payload types
│   │   ├── schemas.ts           zod validators for every client payload
│   │   ├── constants.ts         timings, points, category/special metadata
│   │   └── i18n.ts              EN/ES/DE dictionaries + translate()
│   ├── app/                     Next.js App Router
│   │   ├── page.tsx             create / join (code entered as board tiles)
│   │   └── room/[code]/page.tsx join-by-link, auto-rejoin, lobby ↔ game switch
│   ├── components/
│   │   ├── lobby/               LobbyScreen, PlayersPanel (FFA + teams), SettingsPanel
│   │   ├── game/                GameScreen, GameBoard (SVG), Dice (CSS 3D),
│   │   │                        TriviaModal (countdown), GameOverModal
│   │   └── ui/                  Button, CodeTiles, Segmented, Pawn, LanguageSwitcher
│   └── lib/                     socket singleton, zustand store, i18n hooks, session
├── prisma/                      schema.prisma, seed.ts
├── tests/                       engine unit tests, socket e2e test, i18n tests
├── render.yaml · Dockerfile · docker-compose.yml (local Postgres)
└── docs/ARCHITECTURE.md
```

---

## 2. Data schemas

### 2a. PostgreSQL (Prisma) — `prisma/schema.prisma`

| Model | Purpose | Key fields |
|---|---|---|
| `User` | Guest profile and lifetime stats | `guestKey` (unique, a per-browser id), `displayName`, `gamesPlayed`, `gamesWon`, `correctAnswers`, `totalAnswers`, `trophiesWon` |
| `Room` | One lobby/match record | `code` (unique), `status` LOBBY/PLAYING/FINISHED/ABANDONED, `mode` FFA/TEAMS, `settings` (JSON), `hostId`, `winnerTeamId`, `winReason`, `turnCount`, timestamps |
| `Team` | A pawn on the board ("side"). In FFA every player gets a one-person team, so results have one shape | `name`, `color`, `position`, `score`, `trophies[]`, `placement` |
| `RoomPlayer` | A user's seat in a room | `displayName`, `isHost`, `teamId`, **`sessionTokenHash`** (only the SHA-256 is stored), `leftAt` |
| `Category` | Slug, name, color, icon | `id` = `history`, `science`, … |
| `Question` | The question bank | `categoryId`, `difficulty` EASY/MEDIUM/HARD, `text`, `options[]`, **`correctIndex`** (server-only), **`translations` JSON** `{ es: {text, options}, de: {...} }` with options in the same order, `timesAsked`, `timesCorrect` |
| `AnswerLog` | Every resolved answer, timeouts included | `questionId`, `userId`, `correct`, `timedOut`, `responseMs`. Used for stats, difficulty tuning and cheat review |

### 2b. In-memory live state (authoritative)

```ts
Room        { code, hostId, status, settings, players: Map<id, PlayerRecord>, teams[], engine? }
PlayerRecord{ id, clientId, name, tokenHash, socketId, connected, ready, teamId, color }
GameEngine  { board: Tile[], sides: Side[], currentIdx, activePlayerId, phase,
              activeQuestion { stored(with correctIndex), correctShuffledIndex, view },
              usedQuestionIds, log[], one pending timer }
```

Public projections (`PublicRoomState`, `PublicGameState`) live in `src/shared/types.ts`. They **never** contain `correctIndex`, `clientId` or tokens; a test checks this.

---

## 3. Realtime socket event protocol — `src/shared/events.ts`

Every client→server event takes an **ack callback** and gets back `{ ok: true, ...data }` or `{ ok: false, error, code, params }`. `code` is an i18n key (for example `err.notYourTurn`), so each player sees the error in their own language.

### Client → Server

| Event | Payload | Who may call | Effect / ack data |
|---|---|---|---|
| `CREATE_ROOM` | `{ name, clientId, settings? }` | anyone | New room; caller becomes host → `{ roomCode, playerId, sessionToken, state }` |
| `JOIN_ROOM` | `{ roomCode, name, clientId }` | anyone (lobby only, unless the same `clientId` reclaims its seat) | Takes a seat → same as above |
| `REJOIN_ROOM` | `{ roomCode, sessionToken }` | holder of the token | Rebinds the seat to the new socket, any time (mid-game too) |
| `LEAVE_ROOM` | `{}` | member | Lobby: seat freed. In game: marked offline, pawn stays |
| `UPDATE_SETTINGS` | `Partial<GameSettings>` | host, lobby | Mode, board length 30/45/60, timer 15/30/45 s, categories (≥2), win condition, correct-answer rule |
| `CREATE_TEAM` | `{ name }` | member, team mode | Creates a team and joins it (max 6) → `{ teamId }` |
| `JOIN_TEAM` | `{ teamId \| null }` | member | Switch teams; uneven teams allowed |
| `MOVE_PLAYER` | `{ playerId, teamId \| null }` | host, team mode, lobby | Put anyone on any team |
| `LIST_LOBBIES` | `{}` | anyone | Server mode: the public rooms waiting for players → `{ lobbies: OpenLobby[] }` |
| `RENAME_TEAM` | `{ teamId, name }` | team member or host | |
| `AUTO_BALANCE_TEAMS` | `{ teamCount? }` | host | Shuffle everyone into N even teams |
| `SET_READY` | `{ ready }` | member | |
| `SET_AVATAR` | `{ avatar }` (one of 16 characters) | member, lobby | Rejected if another player already has that character. On join a free one is assigned |
| `KICK_PLAYER` | `{ playerId }` | host, lobby | Target gets `KICKED` |
| `START_GAME` | `{}` | host | Needs ≥2 sides and everyone ready; loads the question pool, builds the board |
| `ROLL_DICE` | `{}` | **active player only**, phase `awaiting_roll` | Server rolls (`crypto.randomInt`) → `{ value }` |
| `SUBMIT_ANSWER` | `{ questionId, optionIndex }` | **current answerer only**, phase `question`, before the deadline (+600 ms grace), once | Server checks the answer |
| `REACT` | `{ emoji }` (one of 6) | member | Broadcast as `REACTION` (throttled to one every 400 ms per player) |
| `SUGGEST_ANSWER` | `{ questionId, optionIndex }` | **teammates of the answering team** (not the answerer) | Team huddle: advisory only. It shows on the card as the teammate's character; tapping the same option again withdraws it |
| `RETURN_TO_LOBBY` | `{}` | host, after game over | Keeps players and teams |

**`SUBMIT_ANSWER` in the team modes.** In *vote* mode, every member of the answering team may submit; each submission is a vote and can be changed. The question resolves once everyone online has voted, or when time runs out (the votes cast so far count). Majority wins, and a tie goes to the player on turn. In the **steal** phase (`phase: "steal"`), any player from another side may submit once for their side. The first correct pick wins half the points. The correct answer stays secret until the steal ends.

### Server → Client

| Event | Payload | Purpose |
|---|---|---|
| `ROOM_STATE` | `PublicRoomState` (with `version`, `serverNow`) | The single source of truth. Rendered as-is; stale versions are dropped |
| `DICE_ROLLED` | `{ sideId, playerId, value, rollId, auto }` | Spins the 3D die |
| `MOVE_PAWN` | `{ sideId, path[], reason: roll\|bonus\|pushback\|swap, delayMs, stepMs }` | Hop-by-hop pawn animation |
| `TURN_CHANGED` | `{ sideId, activePlayerId, turnNumber }` | |
| `TURN_SKIPPED` | `{ sideId, reason: lose_turn\|no_connected_players }` | |
| `QUESTION` | `ActiveQuestionView + serverNow` — shuffled options in every language, **no answer** | Opens the trivia card |
| `ANSWER_RESULT` | `{ chosenIndex, correctIndex, correct, timedOut, points, trophy }` | The answer is revealed only now |
| `REACTION` | `{ id, playerId, emoji }` | Floating emoji |
| `SPECIAL_TILE` | `{ type, detailKey, params, swappedWithSideId? }` | Banner (translated on the client) |
| `GAME_OVER` | `{ winnerSideId, reason, standings[] }` | |
| `KICKED` / `SESSION_REPLACED` | | The seat was taken away, or opened in another tab |

### Turn state machine (`GameEngine`)

```
awaiting_roll ──ROLL_DICE / idle 30 s auto-roll──▶ moving ──land──┬─▶ question ──answer/timeout──▶ resolving ─┐
      ▲                                                            ├─▶ resolving (special tile) ──────────────┤
      │                                                            └─▶ game_over (finish)                     │
      └────────────── next side (or same side: Roll Again / "roll again" rule) ◀──────────────────────────────┘
```

- **Correct answer:** points (100/200/300 × 2 with Double Points). On a 🏆 HQ tile you also win that category's trophy. Then, by host setting, *stay*, *move 2 more* or *roll again*.
- **Wrong answer or timeout:** pushed back 1 tile, turn ends.
- **Special tiles:** Roll Again, Swap (with the nearest pawn ahead; the leader swaps with last place), Lose a Turn, Double Points.
- **Game end:** someone reaches Finish, or collects every selected category's trophy (in "All trophies" mode the board loops, with a lap bonus). The side that ends it gets +500.
- **Winner:** most points; ties go to board position, then trophies, then whoever ended the game.
- **Question picking:** pick a question family (capital, population comparison, event year, …) not used in the last 4 questions of that category, then a question with the wanted difficulty. A question's `stem` (what it is about) is never asked twice in one game.
- **Teams:** one shared pawn and score. The roller/answerer rotates through the team each turn. If the active teammate drops, a connected teammate takes over.

---

## 4. Two deploy modes, one game core

The game core (`Room`, `GameEngine`, `RoomManager`, `server/socket/dispatch.ts`) is **isomorphic and transport-agnostic**:

- It uses Web Crypto and `@noble/hashes` rather than `node:crypto`.
- It talks to clients through a minimal `Conn { id, send(event, payload) }` interface.

| | Server mode (`npm start`, Render, Docker) | P2P mode (`npm run build:pages`, GitHub Pages) |
|---|---|---|
| Game core runs on | Node process | The **host player's browser tab** |
| Transport | socket.io → `registerHandlers` → `dispatch` | PeerJS WebRTC data channels → `dispatch` (`src/lib/transport.ts`) |
| Host's own player | normal socket | in-tab loopback `Conn` |
| Room ↔ peer | room code | peer id `trivia-quest-<code>` on the PeerJS broker |
| Liveness | socket.io ping | 2.5 s heartbeat; a connection is dropped after 9 s of silence |
| Answer secrecy | server-only | kept in the host's tab (a host with dev tools could peek; fine among friends) |
| Persistence | Prisma/Postgres optional | none (the room lives as long as the host tab) |

- **Open games (P2P).** A host publishes `{ code, host, hostAvatar, players, max, mode, ts }` as a *retained* MQTT message on `trivia-quest-miochili/v1/lobbies/<CODE>`, sent through a public relay over secure WebSockets (`NEXT_PUBLIC_LOBBY_BROKERS`, default HiveMQ, then EMQX). The host repeats it every 15 s while the game is public and waiting. It is cleared when the game starts, goes private or is left, and an MQTT *last will* clears it if the tab dies. The start page subscribes to `…/lobbies/+`, validates every entry and drops anything older than 75 s.
- **Short links.** `<site>/KOBALI` reaches the same app shell either way: on the Node server an unknown path renders `not-found.tsx`, and on GitHub Pages `404.html` does. The shell reads the code from the path. Navigation uses `history.pushState`, which keeps the static export working.
- **Circular board.** `src/lib/boardLayout.ts` lays the tiles out as ring sectors (start at 12 o'clock, clockwise). Pawns spring tile to tile, and several pawns on one tile spread across the ring's depth. The dice, the turn status and the roll button sit in the middle of the chart.

## 5. Key implementation details

**Anti-cheat**
- The correct answer stays on the server. Options are shuffled per ask, and the client submits an option *index* for a one-time `questionId`.
- Every handler is validated with zod and authorised by role and phase. Each socket has a token-bucket rate limit (20 burst, 8/s), and payloads are capped at 16 KB.

**Reconnection**
- Joining returns a random `sessionToken`; the client keeps it in `localStorage` and the server stores only its hash.
- On every socket (re)connect, or P2P data-channel reconnect, the client sends `REJOIN_ROOM`. The server rebinds the seat, evicts any older socket holding it (`SESSION_REPLACED`), and the client renders the full snapshot, including an open question with its remaining time.
- Lobby seats are released after 45 s offline. In-game seats are kept. A side with nobody online is skipped after 4 s, and if everyone is offline the game pauses.
- Rooms with nobody connected are cleaned up after 10 min.

**Timers**
- The server is the clock. The client computes `clockOffset = serverNow − Date.now()` from each snapshot and counts down to the server's `endsAt`.

**Internationalisation**
- `src/shared/i18n.ts` holds the EN/ES/DE dictionaries; TypeScript enforces that every language has every key.
- The server never sends prose. Log lines, banners and errors travel as `{ key, params }`, and `cat` params are translated as category names.
- Questions carry `i18n.{es,de}` with options in the same shuffled order, so the answer index matches in every language (covered by a test).
- The language is detected from the browser and can be changed any time with the EN/ES/DE switcher.

**Scaling beyond one process**
- Add `@socket.io/redis-adapter` and sticky sessions, then move `Room` state into Redis (or pin each room to a node by room-code hash).
- The engine is transport-agnostic, so it ports cleanly.
