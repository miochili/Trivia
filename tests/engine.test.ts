import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FINISH_BONUS, POINTS, TIMING } from "../src/shared/constants";
import { S2C, type EngineEvent } from "../src/shared/events";
import { DEFAULT_SETTINGS, type CategoryId, type GameSettings, type Tile } from "../src/shared/types";
import { generateBoard } from "../server/game/board";
import { GameEngine, GameError } from "../server/game/GameEngine";
import { NoopPersistence } from "../server/persistence/GamePersistence";
import type { StoredQuestion } from "../server/questions/QuestionBank";

// ── helpers ──────────────────────────────────────────────────────────
const C = (index: number, category: CategoryId = "science", hq = false): Tile => ({ index, kind: "category", category, hq });
const S = (index: number, special: Tile["special"]): Tile => ({ index, kind: "special", special });

/** start, then the given middle tiles, then finish */
function board(middle: ((i: number) => Tile)[]): Tile[] {
  return [{ index: 0, kind: "start" }, ...middle.map((f, k) => f(k + 1)), { index: middle.length + 1, kind: "finish" }];
}

const pool: StoredQuestion[] = (["science", "history", "art"] as CategoryId[]).flatMap((cat) =>
  (["easy", "medium", "hard"] as const).flatMap((d) =>
    [0, 1, 2].map((n) => ({ id: `${cat}-${d}-${n}`, category: cat, difficulty: d, text: `${cat} ${d} ${n}?`, options: ["RIGHT", "w1", "w2", "w3"], correctIndex: 0 })),
  ),
);

function setup(opts: {
  tiles: Tile[];
  rolls: number[];
  settings?: Partial<GameSettings>;
  sides?: { id: string; members: string[] }[];
  offline?: string[];
}) {
  const events: EngineEvent[] = [];
  const offline = new Set(opts.offline ?? []);
  const rolls = [...opts.rolls];
  const sides = (opts.sides ?? [{ id: "A", members: ["a"] }, { id: "B", members: ["b"] }]).map((s) => ({
    id: s.id,
    name: `Side ${s.id}`,
    color: "#fff",
    emblem: "🦊",
    memberIds: s.members,
  }));
  const engine = new GameEngine({
    roomCode: "TEST01",
    settings: { ...DEFAULT_SETTINGS, categories: ["science", "history", "art"], steals: false, teamAnswer: "captain", ...opts.settings },
    sides,
    pool,
    board: opts.tiles,
    fixedOrder: true,
    rng: () => 0.1, // easy questions on normal tiles, "medium" on HQ
    rollDie: () => {
      const v = rolls.shift();
      if (v === undefined) throw new Error("test ran out of rolls");
      return v;
    },
    isConnected: (id) => !offline.has(id),
    clientIdOf: (id) => `client-${id}`,
    nameOf: (id) => id,
    emit: (e) => events.push(e),
    onChange: () => {},
    persistence: new NoopPersistence(),
  });
  const st = () => engine.getPublicState();
  const side = (id: string) => st().sides.find((s) => s.id === id)!;
  const rightIndex = () => st().activeQuestion!.question.options.indexOf("RIGHT");
  const wrongIndex = () => st().activeQuestion!.question.options.findIndex((o) => o !== "RIGHT");
  /** advance through dice + movement animation to landing */
  const settleMove = (steps: number) => vi.advanceTimersByTime(TIMING.DICE_ANIM_MS + steps * TIMING.STEP_MS + TIMING.LAND_PAUSE_MS + 1);
  return { engine, events, st, side, rightIndex, wrongIndex, settleMove, offline };
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

// ── tests ────────────────────────────────────────────────────────────
describe("board generation", () => {
  it("has start/finish, one HQ per category, and specials", () => {
    const cats: CategoryId[] = ["history", "science", "pop_culture", "sports", "art", "geography", "food", "nature"];
    for (const len of [30, 45, 60]) {
      const b = generateBoard(len, cats);
      expect(b).toHaveLength(len);
      expect(b[0].kind).toBe("start");
      expect(b[len - 1].kind).toBe("finish");
      const hqs = b.filter((t) => t.hq).map((t) => t.category);
      expect(new Set(hqs)).toEqual(new Set(cats));
      expect(b.filter((t) => t.kind === "special").length).toBeGreaterThan(2);
      expect(b.every((t, i) => t.index === i)).toBe(true);
      expect(b.filter((t) => t.kind === "category").every((t) => t.category)).toBe(true);
    }
  });
});

describe("turns & dice", () => {
  it("only the active player may roll; turns alternate", () => {
    const g = setup({ tiles: board([C, C, C, C, C, C, C, C]), rolls: [2, 3] });
    g.engine.start();
    expect(g.st().currentSideId).toBe("A");
    expect(() => g.engine.roll("b")).toThrow(GameError);
    expect(g.engine.roll("a")).toBe(2);
    expect(() => g.engine.roll("a")).toThrow(/can't roll/);
    g.settleMove(2);
    expect(g.st().phase).toBe("question");
    g.engine.submitAnswer("a", g.st().activeQuestion!.question.id, g.rightIndex());
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + 1);
    expect(g.st().currentSideId).toBe("B");
    expect(g.st().activePlayerId).toBe("b");
  });

  it("emits DICE_ROLLED then MOVE_PAWN with a step path", () => {
    const g = setup({ tiles: board([C, C, C, C, C, C]), rolls: [4] });
    g.engine.start();
    g.engine.roll("a");
    const dice = g.events.find((e) => e.type === S2C.DICE_ROLLED)!;
    const move = g.events.find((e) => e.type === S2C.MOVE_PAWN)!;
    expect(dice.payload).toMatchObject({ value: 4, sideId: "A" });
    expect(move.payload).toMatchObject({ path: [1, 2, 3, 4], reason: "roll" });
    expect(g.events.indexOf(dice)).toBeLessThan(g.events.indexOf(move));
  });

  it("auto-rolls for an idle active player", () => {
    const g = setup({ tiles: board([C, C, C, C]), rolls: [1] });
    g.engine.start();
    vi.advanceTimersByTime(TIMING.ROLL_IDLE_MS + 1);
    expect(g.side("A").position).toBe(1);
    expect(g.events.find((e) => e.type === S2C.DICE_ROLLED)!.payload).toMatchObject({ auto: true });
  });
});

describe("trivia resolution (server-side validation)", () => {
  it("correct answer scores and stays; wrong answer pushes back 1", () => {
    const g = setup({ tiles: board([C, C, C, C, C, C, C, C]), rolls: [3, 2] });
    g.engine.start();
    g.engine.roll("a");
    g.settleMove(3);
    const q = g.st().activeQuestion!;
    expect(q.question.options).toContain("RIGHT");
    expect(JSON.stringify(g.st())).not.toContain("correctIndex"); // secret never in public state
    g.engine.submitAnswer("a", q.question.id, g.rightIndex());
    expect(g.st().lastReveal).toMatchObject({ correct: true, points: POINTS.easy });
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + 1);
    expect(g.side("A")).toMatchObject({ position: 3, score: POINTS.easy });

    g.engine.roll("b");
    g.settleMove(2);
    g.engine.submitAnswer("b", g.st().activeQuestion!.question.id, g.wrongIndex());
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + 1);
    const push = g.events.filter((e) => e.type === S2C.MOVE_PAWN).at(-1)!;
    expect(push.payload).toMatchObject({ sideId: "B", path: [1], reason: "pushback" });
    expect(g.side("B")).toMatchObject({ position: 1, score: 0 });
  });

  it("rejects wrong answerer, stale question ids, double submits and late answers", () => {
    const g = setup({ tiles: board([C, C, C, C, C, C]), rolls: [1, 1], settings: { questionTimerSec: 15 } });
    g.engine.start();
    g.engine.roll("a");
    g.settleMove(1);
    const id = g.st().activeQuestion!.question.id;
    expect(() => g.engine.submitAnswer("b", id, 0)).toThrow(/active player/);
    expect(() => g.engine.submitAnswer("a", "q999_fake", 0)).toThrow(/no longer active/);
    expect(() => g.engine.submitAnswer("a", id, 7)).toThrow(/Invalid option/);
    g.engine.submitAnswer("a", id, g.rightIndex());
    expect(() => g.engine.submitAnswer("a", id, 0)).toThrow(/No question/);
  });

  it("timeout counts as wrong", () => {
    const g = setup({ tiles: board([C, C, C, C]), rolls: [2], settings: { questionTimerSec: 15 } });
    g.engine.start();
    g.engine.roll("a");
    g.settleMove(2);
    vi.advanceTimersByTime(15_000 + TIMING.ANSWER_GRACE_MS + 1);
    expect(g.st().lastReveal).toMatchObject({ correct: false, timedOut: true, chosenIndex: null });
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + TIMING.STEP_MS + TIMING.LAND_PAUSE_MS + 1);
    expect(g.side("A").position).toBe(1);
    expect(g.st().currentSideId).toBe("B");
  });

  it("roll_again rule gives the same player another roll after a correct answer", () => {
    const g = setup({ tiles: board([C, C, C, C, C, C, C]), rolls: [1, 1], settings: { correctAnswerRule: "roll_again" } });
    g.engine.start();
    g.engine.roll("a");
    g.settleMove(1);
    g.engine.submitAnswer("a", g.st().activeQuestion!.question.id, g.rightIndex());
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + 1);
    expect(g.st()).toMatchObject({ currentSideId: "A", activePlayerId: "a", phase: "awaiting_roll" });
  });

  it("bonus_move rule advances 2 extra tiles", () => {
    const g = setup({ tiles: board([C, C, C, C, C, C, C]), rolls: [1], settings: { correctAnswerRule: "bonus_move" } });
    g.engine.start();
    g.engine.roll("a");
    g.settleMove(1);
    g.engine.submitAnswer("a", g.st().activeQuestion!.question.id, g.rightIndex());
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + 2 * TIMING.STEP_MS + TIMING.LAND_PAUSE_MS + 2);
    expect(g.side("A").position).toBe(3);
    expect(g.st().currentSideId).toBe("B");
  });
});

describe("special tiles", () => {
  it("Roll Again keeps the turn", () => {
    const g = setup({ tiles: board([(i) => S(i, "roll_again"), C, C, C]), rolls: [1] });
    g.engine.start();
    g.engine.roll("a");
    g.settleMove(1);
    expect(g.events.some((e) => e.type === S2C.SPECIAL_TILE)).toBe(true);
    vi.advanceTimersByTime(TIMING.SPECIAL_REVEAL_MS + 1);
    expect(g.st()).toMatchObject({ currentSideId: "A", phase: "awaiting_roll" });
  });

  it("Lose a Turn skips the side's next turn", () => {
    const g = setup({ tiles: board([(i) => S(i, "lose_turn"), C, C, C, C, C]), rolls: [1, 1] });
    g.engine.start();
    g.engine.roll("a");
    g.settleMove(1);
    vi.advanceTimersByTime(TIMING.SPECIAL_REVEAL_MS + 1);
    g.engine.roll("b"); // B → tile 1 (lose turn too, fine) — we only care A is skipped next
    g.settleMove(1);
    vi.advanceTimersByTime(TIMING.SPECIAL_REVEAL_MS + 1);
    // A's turn comes up but is skipped
    expect(g.events.some((e) => e.type === S2C.TURN_SKIPPED && e.payload.sideId === "A")).toBe(true);
  });

  it("Double Points doubles the next correct answer", () => {
    const g = setup({ tiles: board([(i) => S(i, "double_points"), C, C, C, C, C, C, C]), rolls: [1, 6, 1] });
    g.engine.start();
    g.engine.roll("a");
    g.settleMove(1);
    vi.advanceTimersByTime(TIMING.SPECIAL_REVEAL_MS + 1);
    expect(g.side("A").doublePoints).toBe(true);
    g.engine.roll("b");
    g.settleMove(6);
    g.engine.submitAnswer("b", g.st().activeQuestion!.question.id, g.rightIndex());
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + 1);
    g.engine.roll("a");
    g.settleMove(1);
    expect(g.st().activeQuestion!.doublePoints).toBe(true);
    g.engine.submitAnswer("a", g.st().activeQuestion!.question.id, g.rightIndex());
    expect(g.side("A").score).toBe(POINTS.easy * 2);
    expect(g.side("A").doublePoints).toBe(false);
  });

  it("Swap trades places with the nearest pawn ahead", () => {
    const g = setup({ tiles: board([C, C, C, C, (i) => S(i, "swap"), C, C, C]), rolls: [6, 5] });
    g.engine.start();
    g.engine.roll("a"); // A → 6
    g.settleMove(6);
    g.engine.submitAnswer("a", g.st().activeQuestion!.question.id, g.rightIndex());
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + 1);
    g.engine.roll("b"); // B → 5 (swap)
    g.settleMove(5);
    expect(g.side("A").position).toBe(5);
    expect(g.side("B").position).toBe(6);
  });
});

describe("winning", () => {
  it("reaching the finish wins (rolls past the end clamp to finish)", () => {
    const g = setup({ tiles: board([C, C, C]), rolls: [6] });
    g.engine.start();
    g.engine.roll("a");
    const move = g.events.find((e) => e.type === S2C.MOVE_PAWN)!;
    expect(move.payload).toMatchObject({ path: [1, 2, 3, 4] });
    g.settleMove(4);
    expect(g.st()).toMatchObject({ phase: "game_over", winnerSideId: "A", winReason: "finish", endedBySideId: "A" });
    expect(g.side("A").score).toBe(FINISH_BONUS);
    expect(g.events.at(-1)!.type).toBe(S2C.GAME_OVER);
  });

  it("most points wins — even when someone else reached the finish", () => {
    const g = setup({ tiles: board(Array(12).fill(C)), rolls: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 6, 1, 6] });
    g.engine.start();
    const turn = (pid: string, ok: boolean) => {
      g.engine.roll(pid);
      const steps = (g.events.filter((e) => e.type === S2C.MOVE_PAWN).at(-1)!.payload as { path: number[] }).path.length;
      g.settleMove(steps);
      if (g.st().phase === "game_over") return;
      g.engine.submitAnswer(pid, g.st().activeQuestion!.question.id, ok ? g.rightIndex() : g.wrongIndex());
      vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + TIMING.STEP_MS + TIMING.LAND_PAUSE_MS + 2);
    };
    for (let i = 0; i < 6; i++) {
      turn("a", false); // A keeps getting it wrong
      turn("b", true); // B racks up points (+ streak bonus)
    }
    turn("a", false); // A → 6, wrong → 5
    turn("b", false);
    turn("a", false); // A → 11, wrong → 10
    turn("b", false);
    turn("a", false); // A → finish (13): game ends, +500
    expect(g.st()).toMatchObject({ phase: "game_over", endedBySideId: "A", winReason: "finish" });
    expect(g.side("A").score).toBe(FINISH_BONUS);
    expect(g.side("B").score).toBeGreaterThan(FINISH_BONUS);
    expect(g.st().winnerSideId).toBe("B");
    const over = g.events.at(-1)!.payload as { standings: { sideId: string }[] };
    expect(over.standings.map((x) => x.sideId)).toEqual(["B", "A"]);
  });

  it("collecting every HQ trophy wins in trophies mode (board loops)", () => {
    const g = setup({
      tiles: board([(i) => C(i, "science", true), (i) => C(i, "history", true), C, C]),
      rolls: [1, 3, 1],
      settings: { winCondition: "trophies", categories: ["science", "history"] },
    });
    g.engine.start();
    g.engine.roll("a");
    g.settleMove(1);
    g.engine.submitAnswer("a", g.st().activeQuestion!.question.id, g.rightIndex());
    expect(g.st().lastReveal!.trophy).toBe("science");
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + 1);
    g.engine.roll("b");
    g.settleMove(3);
    g.engine.submitAnswer("b", g.st().activeQuestion!.question.id, g.wrongIndex());
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + TIMING.STEP_MS + TIMING.LAND_PAUSE_MS + 2);
    g.engine.roll("a");
    g.settleMove(1);
    g.engine.submitAnswer("a", g.st().activeQuestion!.question.id, g.rightIndex());
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + 1);
    expect(g.st()).toMatchObject({ phase: "game_over", winnerSideId: "A", winReason: "trophies" });
  });
});

describe("teams & connectivity", () => {
  it("rotates the rolling/answering member each team turn", () => {
    const g = setup({
      tiles: board(Array(12).fill(C)),
      rolls: [1, 1, 1, 1],
      sides: [
        { id: "RED", members: ["r1", "r2"] },
        { id: "BLUE", members: ["b1"] },
      ],
    });
    g.engine.start();
    const playTurn = (pid: string) => {
      expect(g.st().activePlayerId).toBe(pid);
      g.engine.roll(pid);
      g.settleMove(1);
      g.engine.submitAnswer(pid, g.st().activeQuestion!.question.id, g.rightIndex());
      vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + 1);
    };
    playTurn("r1");
    playTurn("b1");
    playTurn("r2");
    playTurn("b1");
  });

  it("team huddle: teammates suggest, only the answerer decides", () => {
    const g = setup({
      tiles: board(Array(8).fill(C)),
      rolls: [1],
      sides: [
        { id: "RED", members: ["r1", "r2", "r3"] },
        { id: "BLUE", members: ["b1"] },
      ],
    });
    g.engine.start();
    g.engine.roll("r1");
    g.settleMove(1);
    const id = g.st().activeQuestion!.question.id;
    expect(() => g.engine.suggest("b1", id, 0)).toThrow(/teammates/); // opponents can't
    expect(() => g.engine.suggest("r1", id, 0)).toThrow(/teammates/); // answerer just answers
    g.engine.suggest("r2", id, 2);
    g.engine.suggest("r3", id, 2);
    expect(g.st().activeQuestion!.suggestions).toEqual({ r2: 2, r3: 2 });
    g.engine.suggest("r3", id, 2); // tap again = withdraw
    expect(g.st().activeQuestion!.suggestions).toEqual({ r2: 2 });
    expect(() => g.engine.submitAnswer("r2", id, 2)).toThrow(/active player/);
    g.engine.submitAnswer("r1", id, g.rightIndex());
    expect(g.st().lastReveal!.correct).toBe(true);
  });

  it("hands the turn to a connected teammate when the active one drops", () => {
    const g = setup({
      tiles: board(Array(8).fill(C)),
      rolls: [1],
      sides: [
        { id: "RED", members: ["r1", "r2"] },
        { id: "BLUE", members: ["b1"] },
      ],
    });
    g.engine.start();
    expect(g.st().activePlayerId).toBe("r1");
    g.offline.add("r1");
    g.engine.handleConnectivityChange();
    expect(g.st().activePlayerId).toBe("r2");
    expect(() => g.engine.roll("r1")).toThrow();
    g.engine.roll("r2");
  });

  it("skips a side with nobody connected, and pauses if everyone is offline", () => {
    const g = setup({ tiles: board(Array(8).fill(C)), rolls: [1], offline: ["a"] });
    g.engine.start();
    expect(g.st().activePlayerId).toBeNull();
    vi.advanceTimersByTime(TIMING.DISCONNECTED_AUTOROLL_MS + TIMING.SKIP_TURN_MS + 2);
    expect(g.st().currentSideId).toBe("B");
    g.offline.add("b");
    g.engine.handleConnectivityChange();
    vi.advanceTimersByTime(TIMING.ROLL_IDLE_MS * 3);
    expect(g.st()).toMatchObject({ currentSideId: "B", phase: "awaiting_roll", activePlayerId: null, autoActionAt: null });
  });
});

describe("team fun: votes, steals, streaks", () => {
  const twoTeams = [
    { id: "RED", members: ["r1", "r2", "r3"] },
    { id: "BLUE", members: ["b1", "b2"] },
  ];

  it("team vote: majority decides, resolves once everyone online has voted", () => {
    const g = setup({ tiles: board(Array(8).fill(C)), rolls: [1], sides: twoTeams, settings: { teamAnswer: "vote" } });
    g.engine.start();
    g.engine.roll("r1");
    g.settleMove(1);
    const q = g.st().activeQuestion!;
    expect(q.answerMode).toBe("vote");
    const right = g.rightIndex();
    const wrong = g.wrongIndex();
    g.engine.submitAnswer("r1", q.question.id, wrong); // captain wrong…
    g.engine.submitAnswer("r2", q.question.id, right);
    expect(g.st().phase).toBe("question"); // still waiting on r3
    expect(() => g.engine.submitAnswer("b1", q.question.id, right)).toThrow(/teammates/);
    g.engine.submitAnswer("r3", q.question.id, right); // …but outvoted 2–1
    expect(g.st().lastReveal).toMatchObject({ correct: true, chosenIndex: right });
  });

  it("team vote: a tie goes to the player on turn; timeout uses the votes cast", () => {
    const g = setup({ tiles: board(Array(8).fill(C)), rolls: [1], sides: [{ id: "RED", members: ["r1", "r2"] }, { id: "BLUE", members: ["b1"] }], settings: { teamAnswer: "vote", questionTimerSec: 15, steals: false } });
    g.engine.start();
    g.engine.roll("r1");
    g.settleMove(1);
    const id = g.st().activeQuestion!.question.id;
    g.engine.submitAnswer("r2", id, g.wrongIndex());
    vi.advanceTimersByTime(15_000 + TIMING.ANSWER_GRACE_MS + 1); // r1 never votes
    expect(g.st().lastReveal).toMatchObject({ correct: false, timedOut: false });
  });

  it("steal: a wrong answer opens a steal window; first correct steal takes half points", () => {
    const g = setup({ tiles: board(Array(8).fill(C)), rolls: [1], sides: twoTeams, settings: { teamAnswer: "captain", steals: true } });
    g.engine.start();
    g.engine.roll("r1");
    g.settleMove(1);
    const id = g.st().activeQuestion!.question.id;
    const wrong = g.wrongIndex();
    const right = g.rightIndex();
    g.engine.submitAnswer("r1", id, wrong);
    expect(g.st().phase).toBe("steal");
    expect(g.st().lastReveal).toBeNull(); // the answer is still secret
    expect(g.st().activeQuestion!.steal).toMatchObject({ wrongIndex: wrong });
    expect(() => g.engine.submitAnswer("r2", id, right)).toThrow(/own team/);
    expect(() => g.engine.submitAnswer("b1", id, wrong)).toThrow(/Invalid option/);
    g.engine.submitAnswer("b2", id, right);
    expect(g.st().lastReveal).toMatchObject({ correct: false, stolenBy: { sideId: "BLUE", playerId: "b2", points: POINTS.easy / 2 } });
    expect(g.side("BLUE").score).toBe(POINTS.easy / 2);
    vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + TIMING.STEP_MS + TIMING.LAND_PAUSE_MS + 2);
    expect(g.side("RED").position).toBe(0); // still pushed back
    expect(g.st().currentSideId).toBe("BLUE");
  });

  it("steal: one try per side; ends early when every side missed", () => {
    const g = setup({ tiles: board(Array(8).fill(C)), rolls: [1], sides: twoTeams, settings: { teamAnswer: "captain", steals: true } });
    g.engine.start();
    g.engine.roll("r1");
    g.settleMove(1);
    const id = g.st().activeQuestion!.question.id;
    const opts = g.st().activeQuestion!.question.options;
    const wrongs = opts.map((o, i) => (o === "RIGHT" ? -1 : i)).filter((i) => i >= 0);
    g.engine.submitAnswer("r1", id, wrongs[0]);
    g.engine.submitAnswer("b1", id, wrongs[1]);
    expect(g.st().lastReveal).toMatchObject({ stolenBy: null }); // BLUE was the only other side
    expect(g.side("BLUE").score).toBe(0);
  });

  it("streak: third correct answer in a row earns the bonus, a miss resets it", () => {
    const g = setup({ tiles: board(Array(14).fill(C)), rolls: [1, 1, 1, 1, 1, 1, 1, 1], settings: { correctAnswerRule: "stay" } });
    g.engine.start();
    const bonuses: number[] = [];
    const turn = (pid: string, ok: boolean) => {
      g.engine.roll(pid);
      g.settleMove(1);
      g.engine.submitAnswer(pid, g.st().activeQuestion!.question.id, ok ? g.rightIndex() : g.wrongIndex());
      if (ok) bonuses.push(g.st().lastReveal!.streakBonus);
      if (g.st().phase === "steal") vi.advanceTimersByTime(TIMING.STEAL_MS + TIMING.ANSWER_GRACE_MS + 1);
      vi.advanceTimersByTime(TIMING.ANSWER_REVEAL_MS + TIMING.STEP_MS + TIMING.LAND_PAUSE_MS + 2);
    };
    turn("a", true);
    turn("b", false);
    turn("a", true);
    turn("b", false);
    turn("a", true); // 3rd in a row
    expect(g.side("A").streak).toBe(3);
    expect(bonuses).toEqual([0, 0, 100]);
    turn("b", false);
    turn("a", false);
    expect(g.side("A").streak).toBe(0);
  });
});

describe("question variety", () => {
  it("never asks about the same thing twice in a game and rotates question kinds", async () => {
    const { InMemoryQuestionBank } = await import("../server/questions/QuestionBank");
    const full = await new InMemoryQuestionBank().loadPool(["geography", "science"]);
    let seed = 42;
    const engine = new GameEngine({
      roomCode: "TEST02",
      settings: { ...DEFAULT_SETTINGS, categories: ["geography", "science"] },
      sides: ["A", "B"].map((id) => ({ id, name: id, color: "#fff", emblem: "🦊", memberIds: [id.toLowerCase()] })),
      pool: full,
      board: [],
      fixedOrder: true,
      rng: () => ((seed = (seed * 16807) % 2147483647) / 2147483647),
      rollDie: () => 1,
      isConnected: () => true,
      clientIdOf: (id) => id,
      nameOf: (id) => id,
      emit: () => {},
      onChange: () => {},
      persistence: new NoopPersistence(),
    });
    const pick = (c: CategoryId) => (engine as unknown as { pickQuestion: (c: CategoryId, d: "easy" | "medium" | "hard") => StoredQuestion }).pickQuestion(c, "medium");
    const asked = Array.from({ length: 120 }, (_, i) => pick(i % 2 ? "geography" : "science"));
    expect(new Set(asked.map((q) => q.stem)).size).toBe(asked.length);
    const geo = asked.filter((q) => q.category === "geography");
    for (let i = 1; i < geo.length; i++) expect(geo[i].family).not.toBe(geo[i - 1].family);
    expect(new Set(geo.map((q) => q.family)).size).toBeGreaterThan(8);
  });
});
