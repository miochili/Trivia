import { secureInt } from "../lib/ids";
import { BONUS_MOVE_STEPS, FINISH_BONUS, LAP_BONUS, POINTS, STREAK_BONUS, STREAK_HOT, TIMING, TROPHY_BONUS } from "../../src/shared/constants";
import { S2C, type EngineEvent, type GameOverEvent, type MoveReason } from "../../src/shared/events";
import type {
  ActiveQuestionView,
  AnswerReveal,
  DifficultyChoiceView,
  CategoryId,
  Difficulty,
  GamePhase,
  GameSettings,
  LogEntry,
  PublicGameState,
  PublicSide,
  Tile,
  WinReason,
} from "../../src/shared/types";
import type { GamePersistence } from "../persistence/GamePersistence";
import type { StoredQuestion } from "../questions/QuestionBank";
import { generateBoard, shuffle } from "./board";
import { translate, type MessageKey, type Params } from "../../src/shared/i18n";

/** Domain error carrying an i18n code; `.message` is the English text (logs/tests). */
export class GameError extends Error {
  constructor(
    readonly code: MessageKey,
    readonly params: Params = {},
  ) {
    super(translate("en", code, params));
  }
}

export interface EngineSideInit {
  id: string;
  name: string;
  color: string;
  emblem: string;
  memberIds: string[];
}

export interface GameEngineDeps {
  roomCode: string;
  settings: GameSettings;
  sides: EngineSideInit[];
  pool: StoredQuestion[];
  isConnected: (playerId: string) => boolean;
  clientIdOf: (playerId: string) => string | null;
  nameOf: (playerId: string) => string;
  emit: (e: EngineEvent) => void;
  onChange: () => void;
  persistence: GamePersistence;
  /** Injected for tests. Default: cryptographically secure 1–6. */
  rollDie?: () => number;
  /** Non-security randomness (board layout, question pick, option shuffle). */
  rng?: () => number;
  board?: Tile[];
  /** Keep the given side order instead of shuffling (tests). */
  fixedOrder?: boolean;
}

interface SideState extends PublicSide {
  /** Which teammate rolls/answers next (rotates each completed turn). */
  rotation: number;
}

interface ActiveQuestion {
  stored: StoredQuestion;
  correctShuffledIndex: number;
  view: ActiveQuestionView;
  askedAt: number;
  tile: Tile;
}

/**
 * Authoritative, transport-agnostic game loop for one room.
 *
 * Turn state machine:
 *   awaiting_roll ──roll──▶ moving ──land──▶ question ──answer/timeout──▶ resolving ──▶ next turn
 *                                    └──────▶ resolving (special tile)  ─────────────▶ next turn / roll again
 *
 * The engine owns exactly one pending timer at a time (idle auto-roll, animation
 * wait, question deadline, reveal pause), which makes the flow easy to reason
 * about and impossible to double-advance.
 */
export class GameEngine {
  readonly board: Tile[];
  private readonly sides: SideState[];
  private readonly settings: GameSettings;
  private readonly rng: () => number;
  private readonly rollDie: () => number;
  private readonly loopMode: boolean;

  private currentIdx = 0;
  private activePlayerId: string | null = null;
  private phase: GamePhase = "awaiting_roll";
  private turnNumber = 0;
  private lastRoll: number | null = null;
  private activeQuestion: ActiveQuestion | null = null;
  private lastReveal: AnswerReveal | null = null;
  private winnerSideId: string | null = null;
  private winReason: WinReason | null = null;
  private endedBySideId: string | null = null;
  private autoActionAt: number | null = null;
  private log: LogEntry[] = [];
  private logSeq = 0;
  private rollSeq = 0;
  private askSeq = 0;
  private usedQuestionIds = new Set<string>();
  private pendingWrong: { chosenIndex: number | null; timedOut: boolean } | null = null;
  private choice: { tile: Tile; view: DifficultyChoiceView } | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private disposed = false;

  constructor(private readonly deps: GameEngineDeps) {
    if (deps.sides.length < 2) throw new GameError("err.needSides");
    this.settings = deps.settings;
    this.rng = deps.rng ?? Math.random;
    this.rollDie = deps.rollDie ?? (() => secureInt(6) + 1);
    this.loopMode = deps.settings.winCondition === "trophies";
    this.board = deps.board ?? generateBoard(deps.settings.boardLength + 1, deps.settings.categories, this.rng) // tiles 0…N, Finish = N;
    const ordered = deps.fixedOrder ? deps.sides : shuffle(deps.sides, this.rng);
    this.sides = ordered.map((s) => ({
      id: s.id,
      name: s.name,
      color: s.color,
      emblem: s.emblem,
      memberIds: [...s.memberIds],
      position: 0,
      score: 0,
      trophies: [],
      skipNextTurn: false,
      doublePoints: false,
      correct: 0,
      answered: 0,
      streak: 0,
      rotation: 0,
    }));
  }

  // ───────────────────────────── public API ─────────────────────────────

  start() {
    this.pushLog("log.gameOn", { names: this.sides.map((s) => s.name).join(", ") }, "info");
    this.beginTurn();
  }

  get currentSide(): SideState {
    return this.sides[this.currentIdx];
  }

  get isOver() {
    return this.phase === "game_over";
  }

  /** Active player requests a roll. Returns the die value. */
  roll(playerId: string): number {
    if (this.phase !== "awaiting_roll") throw new GameError("err.cantRoll");
    if (playerId !== this.activePlayerId) throw new GameError("err.notYourTurn");
    return this.doRoll(playerId, false);
  }

  /**
   * Answer the open question. `askId` must match the currently open card.
   *  - solo/captain: the answerer's pick resolves the question
   *  - vote: each teammate's pick is a vote; resolves when everyone online voted
   *  - steal phase: a player from another side tries to steal it
   */
  submitAnswer(playerId: string, askId: string, optionIndex: number) {
    const aq = this.activeQuestion;
    if (this.phase === "steal" && aq) return this.trySteal(playerId, askId, optionIndex);
    if (this.phase !== "question" || !aq) throw new GameError("err.noQuestionOpen");
    if (aq.view.question.id !== askId) throw new GameError("err.staleQuestion");
    if (Date.now() > aq.view.endsAt + TIMING.ANSWER_GRACE_MS) throw new GameError("err.timeUp");
    if (optionIndex < 0 || optionIndex >= aq.view.question.options.length) throw new GameError("err.badOption");
    if (aq.view.answerMode === "vote") {
      if (!this.currentSide.memberIds.includes(playerId)) throw new GameError("err.notTeammate");
      aq.view.suggestions[playerId] = optionIndex;
      if (this.everyoneVoted()) return this.resolveVote();
      this.changed();
      return;
    }
    if (playerId !== aq.view.answererId) throw new GameError("err.notAnswerer");
    this.resolveAnswer(optionIndex, false);
  }

  /**
   * After landing on a category tile (with "pick difficulty" on), any online player of the
   * side on turn picks easy / medium / hard. Trophy tiles only allow medium or hard.
   */
  chooseDifficulty(playerId: string, difficulty: Difficulty) {
    const c = this.choice;
    if (this.phase !== "choosing" || !c) throw new GameError("err.noChoiceOpen");
    if (!this.currentSide.memberIds.includes(playerId)) throw new GameError("err.notYourTurn");
    if (c.view.hq && difficulty === "easy") throw new GameError("err.trophyNotEasy");
    this.clearTimer();
    this.pushLog("log.chose", { who: this.deps.nameOf(playerId), level: difficulty }, "info", this.currentSide.id);
    this.choice = null;
    this.askQuestion(c.tile, difficulty);
  }

  private beginChoice(tile: Tile) {
    const side = this.currentSide;
    if (!this.activePlayerId || !this.deps.isConnected(this.activePlayerId)) this.activePlayerId = this.pickActiveMember(side);
    const view: DifficultyChoiceView = { category: tile.category!, hq: !!tile.hq, endsAt: Date.now() + TIMING.CHOOSE_MS };
    this.choice = { tile, view };
    this.phase = "choosing";
    this.changed();
    this.schedule(TIMING.CHOOSE_MS + TIMING.ANSWER_GRACE_MS, () => {
      if (this.phase !== "choosing" || !this.choice) return;
      const t = this.choice.tile;
      this.choice = null;
      this.askQuestion(t, this.pickDifficulty(!!t.hq));
    });
  }

  private everyoneVoted() {
    const online = this.currentSide.memberIds.filter((m) => this.deps.isConnected(m));
    const votes = this.activeQuestion?.view.suggestions ?? {};
    return online.length > 0 && online.every((m) => m in votes);
  }

  /** Majority wins; a tie goes to the player whose turn it is (if they voted for one of the tied options). */
  private resolveVote() {
    const aq = this.activeQuestion!;
    const votes = Object.entries(aq.view.suggestions);
    if (!votes.length) return this.resolveAnswer(null, true);
    const counts = new Map<number, number>();
    for (const [, i] of votes) counts.set(i, (counts.get(i) ?? 0) + 1);
    const top = Math.max(...counts.values());
    const tied = [...counts.entries()].filter(([, c]) => c === top).map(([i]) => i);
    const captainPick = aq.view.answererId ? aq.view.suggestions[aq.view.answererId] : undefined;
    const choice = captainPick !== undefined && tied.includes(captainPick) ? captainPick : tied[0];
    this.resolveAnswer(choice, false);
  }

  private onQuestionTimeout() {
    if (this.activeQuestion?.view.answerMode === "vote" && Object.keys(this.activeQuestion.view.suggestions).length) return this.resolveVote();
    this.resolveAnswer(null, true);
  }

  /**
   * Team huddle: a teammate of the answering side suggests an option. Purely
   * advisory — only the answerer's SUBMIT_ANSWER counts. Tapping the same
   * option again withdraws the suggestion.
   */
  suggest(playerId: string, askId: string, optionIndex: number) {
    const aq = this.activeQuestion;
    if (this.phase !== "question" || !aq) throw new GameError("err.noQuestionOpen");
    if (aq.view.question.id !== askId) throw new GameError("err.staleQuestion");
    if (aq.view.answerMode === "vote") return this.submitAnswer(playerId, askId, optionIndex);
    if (!this.currentSide.memberIds.includes(playerId) || playerId === aq.view.answererId) throw new GameError("err.notTeammate");
    if (optionIndex < 0 || optionIndex >= aq.view.question.options.length) throw new GameError("err.badOption");
    if (aq.view.suggestions[playerId] === optionIndex) delete aq.view.suggestions[playerId];
    else aq.view.suggestions[playerId] = optionIndex;
    this.changed();
  }

  /** Call whenever any member connects/disconnects; reassigns the active teammate. */
  handleConnectivityChange() {
    if (this.disposed || this.isOver) return;
    const side = this.currentSide;
    if (this.phase === "awaiting_roll") {
      const stillOk = this.activePlayerId && this.deps.isConnected(this.activePlayerId);
      const desired = stillOk ? this.activePlayerId : this.pickActiveMember(side);
      if (desired !== this.activePlayerId) {
        this.activePlayerId = desired;
        this.emitTurnChanged();
        this.armRollTimer();
        this.changed();
      } else if (desired === null) {
        this.armRollTimer(); // may switch between "paused" and "skip soon"
        this.changed();
      }
    } else if (this.phase === "choosing") {
      if (!this.activePlayerId || !this.deps.isConnected(this.activePlayerId)) {
        const alt = this.pickActiveMember(side);
        if (alt !== this.activePlayerId) {
          this.activePlayerId = alt;
          this.changed();
        }
      }
    } else if (this.phase === "steal") {
      if (!this.stealCandidates().length) this.finishSteal(null);
    } else if (this.phase === "question" && this.activeQuestion) {
      if (this.activeQuestion.view.answerMode === "vote" && this.everyoneVoted()) return this.resolveVote();
      const answerer = this.activeQuestion.view.answererId;
      if (!answerer || !this.deps.isConnected(answerer)) {
        const alt = this.pickActiveMember(side);
        if (alt && alt !== answerer) {
          this.activeQuestion.view.answererId = alt;
          this.activePlayerId = alt;
          this.pushLog("log.takesOver", { name: this.deps.nameOf(alt), side: side.name }, "info", side.id);
          this.changed();
        }
      }
    }
  }

  getPublicState(): PublicGameState {
    return {
      board: this.board,
      sides: this.sides.map(({ rotation: _r, ...pub }) => ({ ...pub, trophies: [...pub.trophies], memberIds: [...pub.memberIds] })),
      currentSideId: this.currentSide.id,
      activePlayerId: this.activePlayerId,
      phase: this.phase,
      turnNumber: this.turnNumber,
      lastRoll: this.lastRoll,
      activeQuestion: this.activeQuestion ? structuredClone(this.activeQuestion.view) : null,
      difficultyChoice: this.choice ? { ...this.choice.view } : null,
      lastReveal: this.lastReveal,
      winnerSideId: this.winnerSideId,
      winReason: this.winReason,
      endedBySideId: this.endedBySideId,
      autoActionAt: this.autoActionAt,
      log: this.log.slice(-40),
    };
  }

  dispose() {
    this.disposed = true;
    this.clearTimer();
  }

  // ───────────────────────────── turn flow ─────────────────────────────

  private beginTurn() {
    if (this.disposed || this.isOver) return;
    const side = this.currentSide;
    this.turnNumber++;
    this.activeQuestion = null;
    this.lastReveal = null;
    this.lastRoll = null;

    if (side.skipNextTurn) {
      side.skipNextTurn = false;
      this.activePlayerId = null;
      this.emitTurnChanged();
      this.skipTurn("lose_turn");
      return;
    }
    this.phase = "awaiting_roll";
    this.activePlayerId = this.pickActiveMember(side);
    this.emitTurnChanged();
    this.armRollTimer();
    this.changed();
  }

  /** Same side & player roll again (Roll Again tile / correct-answer rule). */
  private continueWithRoll() {
    if (this.disposed || this.isOver) return;
    this.activeQuestion = null;
    this.phase = "awaiting_roll";
    const keep = this.activePlayerId && this.deps.isConnected(this.activePlayerId);
    this.activePlayerId = keep ? this.activePlayerId : this.pickActiveMember(this.currentSide);
    this.emitTurnChanged();
    this.armRollTimer();
    this.changed();
  }

  private skipTurn(reason: "lose_turn" | "no_connected_players") {
    const side = this.currentSide;
    this.clearTimer();
    this.phase = "resolving";
    this.autoActionAt = null;
    this.deps.emit({ type: S2C.TURN_SKIPPED, payload: { sideId: side.id, reason } });
    this.pushLog(reason === "lose_turn" ? "log.skipLoseTurn" : "log.skipOffline", { side: side.name }, "bad", side.id);
    this.changed();
    this.schedule(TIMING.SKIP_TURN_MS, () => this.endTurn());
  }

  private endTurn() {
    if (this.disposed || this.isOver) return;
    this.currentSide.rotation++;
    this.currentIdx = (this.currentIdx + 1) % this.sides.length;
    this.beginTurn();
  }

  private armRollTimer() {
    if (this.activePlayerId) {
      const pid = this.activePlayerId;
      this.autoActionAt = Date.now() + TIMING.ROLL_IDLE_MS;
      this.schedule(TIMING.ROLL_IDLE_MS, () => this.doRoll(pid, true));
    } else if (this.anyoneConnected()) {
      this.autoActionAt = Date.now() + TIMING.DISCONNECTED_AUTOROLL_MS;
      this.schedule(TIMING.DISCONNECTED_AUTOROLL_MS, () => this.skipTurn("no_connected_players"));
    } else {
      // Everyone is offline: pause until someone reconnects.
      this.clearTimer();
      this.autoActionAt = null;
    }
  }

  private doRoll(playerId: string | null, auto: boolean): number {
    this.clearTimer();
    this.autoActionAt = null;
    const side = this.currentSide;
    const value = this.rollDie();
    if (!Number.isInteger(value) || value < 1 || value > 6) throw new Error("Die produced invalid value");
    this.lastRoll = value;
    this.phase = "moving";
    this.deps.emit({ type: S2C.DICE_ROLLED, payload: { sideId: side.id, playerId, value, rollId: ++this.rollSeq, auto } });

    const { path, lapped } = this.forwardPath(side.position, value);
    side.position = path[path.length - 1];
    this.emitMove(side.id, path, "roll", TIMING.DICE_ANIM_MS);
    this.pushLog(auto ? "log.rolledAuto" : "log.rolled", { side: side.name, n: value }, "info", side.id);
    this.changed();
    this.schedule(TIMING.DICE_ANIM_MS + path.length * TIMING.STEP_MS + TIMING.LAND_PAUSE_MS, () => this.land(lapped));
    return value;
  }

  private land(lapped: boolean) {
    const side = this.currentSide;
    if (lapped) {
      side.score += LAP_BONUS;
      this.pushLog("log.lap", { side: side.name, n: LAP_BONUS }, "good", side.id);
    }
    const tile = this.board[side.position];
    if (tile.kind === "finish" && !this.loopMode) return this.finishGame(side, "finish");
    if (tile.kind === "category" && tile.category) return this.settings.chooseDifficulty ? this.beginChoice(tile) : this.askQuestion(tile, this.pickDifficulty(!!tile.hq));
    if (tile.kind === "special" && tile.special) return this.applySpecial(tile);
    this.endTurn();
  }

  // ───────────────────────────── trivia ─────────────────────────────

  private askQuestion(tile: Tile, difficulty: Difficulty) {
    const side = this.currentSide;
    const category = tile.category!;
    const stored = this.pickQuestion(category, difficulty);
    if (!stored) {
      this.pushLog("log.noQuestions", { cat: category }, "info");
      return this.endTurn();
    }
    const order = shuffle(
      stored.options.map((_, i) => i),
      this.rng,
    );
    const now = Date.now();
    const answererId = this.activePlayerId && this.deps.isConnected(this.activePlayerId) ? this.activePlayerId : this.pickActiveMember(side);
    this.activePlayerId = answererId;
    const view: ActiveQuestionView = {
      question: {
        id: `q${++this.askSeq}_${stored.id}`,
        category,
        difficulty: stored.difficulty,
        text: stored.text,
        options: order.map((i) => stored.options[i]),
        i18n: Object.fromEntries(
          Object.entries(stored.translations ?? {})
            .filter(([, tr]) => tr && tr.options.length === stored.options.length)
            .map(([loc, tr]) => [loc, { text: tr!.text, options: order.map((i) => tr!.options[i]) }]),
        ),
      },
      sideId: side.id,
      answererId,
      endsAt: now + this.settings.questionTimerSec * 1000,
      hq: !!tile.hq,
      doublePoints: side.doublePoints,
      answerMode: side.memberIds.length < 2 ? "solo" : this.settings.teamAnswer === "captain" ? "captain" : "vote",
      suggestions: {},
      steal: null,
    };
    this.activeQuestion = { stored, correctShuffledIndex: order.indexOf(stored.correctIndex), view, askedAt: now, tile };
    this.phase = "question";
    this.deps.emit({ type: S2C.QUESTION, payload: { ...structuredClone(view), serverNow: now } });
    this.changed();
    this.schedule(this.settings.questionTimerSec * 1000 + TIMING.ANSWER_GRACE_MS, () => this.onQuestionTimeout());
  }

  private resolveAnswer(chosenIndex: number | null, timedOut: boolean) {
    const aq = this.activeQuestion;
    if (!aq || this.phase !== "question") return;
    this.clearTimer();
    const side = this.currentSide;
    const correct = chosenIndex !== null && chosenIndex === aq.correctShuffledIndex;
    const multiplier = aq.view.doublePoints ? 2 : 1;
    side.doublePoints = false; // consumed by this question either way
    side.answered++;

    let points = 0;
    let streakBonus = 0;
    let trophy: CategoryId | null = null;
    if (correct) {
      side.correct++;
      side.streak++;
      streakBonus = side.streak >= STREAK_HOT ? STREAK_BONUS : 0;
      points = POINTS[aq.stored.difficulty] * multiplier + streakBonus;
      side.score += points;
      if (aq.tile.hq && !side.trophies.includes(aq.view.question.category)) {
        trophy = aq.view.question.category;
        side.trophies.push(trophy);
        points += TROPHY_BONUS;
        side.score += TROPHY_BONUS;
      }
    } else {
      side.streak = 0;
    }

    void this.deps.persistence.answerRecorded({
      code: this.deps.roomCode,
      questionId: aq.stored.id,
      clientId: aq.view.answererId ? this.deps.clientIdOf(aq.view.answererId) : null,
      correct,
      timedOut,
      responseMs: Date.now() - aq.askedAt,
    });

    // Wrong → the other sides get a quick chance to steal it.
    if (!correct && this.settings.steals && this.stealCandidates().length) {
      const who = aq.view.answererId && aq.view.answerMode !== "vote" ? this.deps.nameOf(aq.view.answererId) : side.name;
      this.pushLog(timedOut ? "log.timeout" : "log.wrong", { who }, "bad", side.id);
      this.pushLog("log.stealChance", { side: side.name }, "special", side.id);
      this.phase = "steal";
      this.pendingWrong = { chosenIndex, timedOut };
      aq.view.steal = { endsAt: Date.now() + TIMING.STEAL_MS, wrongIndex: chosenIndex, attempts: {} };
      this.changed();
      this.schedule(TIMING.STEAL_MS + TIMING.ANSWER_GRACE_MS, () => this.finishSteal(null));
      return;
    }

    this.lastReveal = {
      questionId: aq.view.question.id,
      sideId: side.id,
      answererId: aq.view.answererId,
      chosenIndex,
      correctIndex: aq.correctShuffledIndex,
      correct,
      timedOut,
      points,
      trophy,
      streakBonus,
      stolenBy: null,
    };
    this.phase = "resolving";
    this.deps.emit({ type: S2C.ANSWER_RESULT, payload: this.lastReveal });

    const who = aq.view.answererId && aq.view.answerMode !== "vote" ? this.deps.nameOf(aq.view.answererId) : side.name;
    if (correct) {
      this.pushLog(trophy ? "log.correctTrophy" : "log.correct", { who, n: points, ...(trophy ? { cat: trophy } : {}) }, "good", side.id);
      if (streakBonus) this.pushLog("log.onFire", { side: side.name, n: streakBonus }, "special", side.id);
    } else {
      this.pushLog(timedOut ? "log.timeout" : "log.wrong", { who }, "bad", side.id);
    }
    this.changed();

    if (trophy && this.settings.winCondition !== "finish" && side.trophies.length >= this.settings.categories.length) {
      this.schedule(TIMING.ANSWER_REVEAL_MS, () => this.finishGame(side, "trophies"));
      return;
    }
    this.schedule(TIMING.ANSWER_REVEAL_MS, () => this.afterAnswer(correct));
  }

  /** Sides (other than the one on turn) with someone online who haven't tried yet. */
  private stealCandidates(): SideState[] {
    const tried = this.activeQuestion?.view.steal?.attempts ?? {};
    return this.sides.filter((s) => s.id !== this.currentSide.id && !(s.id in tried) && s.memberIds.some((m) => this.deps.isConnected(m)));
  }

  private trySteal(playerId: string, askId: string, optionIndex: number) {
    const aq = this.activeQuestion!;
    const steal = aq.view.steal!;
    if (aq.view.question.id !== askId) throw new GameError("err.staleQuestion");
    if (Date.now() > steal.endsAt + TIMING.ANSWER_GRACE_MS) throw new GameError("err.timeUp");
    const side = this.sides.find((s) => s.memberIds.includes(playerId));
    if (!side || side.id === this.currentSide.id) throw new GameError("err.cantSteal");
    if (side.id in steal.attempts) throw new GameError("err.alreadyTried");
    if (optionIndex < 0 || optionIndex >= aq.view.question.options.length || optionIndex === steal.wrongIndex) throw new GameError("err.badOption");
    steal.attempts[side.id] = { playerId, index: optionIndex };
    if (optionIndex === aq.correctShuffledIndex) return this.finishSteal({ side, playerId });
    this.pushLog("log.stealMiss", { who: this.deps.nameOf(playerId) }, "bad", side.id);
    if (!this.stealCandidates().length) return this.finishSteal(null);
    this.changed();
  }

  private finishSteal(winner: { side: SideState; playerId: string } | null) {
    const aq = this.activeQuestion;
    if (!aq || this.phase !== "steal") return;
    this.clearTimer();
    const side = this.currentSide;
    const pending = this.pendingWrong ?? { chosenIndex: null, timedOut: true };
    const stolenPoints = Math.round(POINTS[aq.stored.difficulty] / 2);
    if (winner) {
      winner.side.score += stolenPoints;
      this.pushLog("log.stolen", { who: this.deps.nameOf(winner.playerId), side: winner.side.name, n: stolenPoints }, "good", winner.side.id);
    } else {
      this.pushLog("log.noSteal", {}, "info");
    }
    this.lastReveal = {
      questionId: aq.view.question.id,
      sideId: side.id,
      answererId: aq.view.answererId,
      chosenIndex: pending.chosenIndex,
      correctIndex: aq.correctShuffledIndex,
      correct: false,
      timedOut: pending.timedOut,
      points: 0,
      trophy: null,
      streakBonus: 0,
      stolenBy: winner ? { sideId: winner.side.id, playerId: winner.playerId, points: stolenPoints } : null,
    };
    this.pendingWrong = null;
    this.phase = "resolving";
    this.deps.emit({ type: S2C.ANSWER_RESULT, payload: this.lastReveal });
    this.changed();
    this.schedule(TIMING.ANSWER_REVEAL_MS, () => this.afterAnswer(false));
  }

  private afterAnswer(correct: boolean) {
    const side = this.currentSide;
    this.activeQuestion = null;

    if (correct) {
      if (this.settings.correctAnswerRule === "roll_again") {
        this.pushLog("log.rollsAgain", { side: side.name }, "good", side.id);
        return this.continueWithRoll();
      }
      if (this.settings.correctAnswerRule === "bonus_move") {
        const { path, lapped } = this.forwardPath(side.position, BONUS_MOVE_STEPS);
        side.position = path[path.length - 1];
        this.phase = "moving";
        this.emitMove(side.id, path, "bonus", 0);
        this.changed();
        this.schedule(path.length * TIMING.STEP_MS + TIMING.LAND_PAUSE_MS, () => {
          if (lapped) side.score += LAP_BONUS;
          if (this.board[side.position].kind === "finish" && !this.loopMode) return this.finishGame(side, "finish");
          this.endTurn();
        });
        return;
      }
      return this.endTurn();
    }

    // Wrong / timed out → pushed back one space (no tile effect on the push).
    if (side.position > 0) {
      side.position -= 1;
      this.phase = "moving";
      this.emitMove(side.id, [side.position], "pushback", 0);
      this.changed();
      this.schedule(TIMING.STEP_MS + TIMING.LAND_PAUSE_MS, () => this.endTurn());
      return;
    }
    this.endTurn();
  }

  private pickDifficulty(hq: boolean): Difficulty {
    const r = this.rng();
    if (hq) return r < 0.5 ? "medium" : "hard";
    return r < 0.45 ? "easy" : r < 0.85 ? "medium" : "hard";
  }

  /** category → family → questions (built once per game). */
  private families: Map<CategoryId, Map<string, StoredQuestion[]>> | null = null;
  private usedStems = new Set<string>();
  private recentFamilies: string[] = [];

  /**
   * Picks a question so a game feels varied:
   *  1. choose a family (kind of question) at random, skipping the last few used
   *  2. never repeat a question — or another question about the same thing — in one game
   *  3. prefer the wanted difficulty within that family
   */
  private pickQuestion(category: CategoryId, difficulty: Difficulty): StoredQuestion | null {
    if (!this.families) {
      this.families = new Map();
      for (const q of this.deps.pool) {
        const byFam = this.families.get(q.category) ?? new Map<string, StoredQuestion[]>();
        const fam = q.family ?? "classic";
        byFam.set(fam, [...(byFam.get(fam) ?? []), q]);
        this.families.set(q.category, byFam);
      }
    }
    const byFam = this.families.get(category);
    if (!byFam?.size) return null;
    const fresh = (q: StoredQuestion) => !this.usedQuestionIds.has(q.id) && !this.usedStems.has(q.stem ?? q.id);

    let famNames = [...byFam.keys()].filter((f) => byFam.get(f)!.some(fresh));
    if (!famNames.length) {
      // Everything in this category was asked — allow repeats again.
      for (const qs of byFam.values()) for (const q of qs) {
        this.usedQuestionIds.delete(q.id);
        this.usedStems.delete(q.stem ?? q.id);
      }
      famNames = [...byFam.keys()];
    }
    // Prefer kinds of question that still have one at the wanted difficulty (it decides the points).
    const withLevel = famNames.filter((f) => byFam.get(f)!.some((q) => q.difficulty === difficulty && fresh(q)));
    if (withLevel.length) famNames = withLevel;
    const notRecent = famNames.filter((f) => !this.recentFamilies.includes(f));
    const fam = (notRecent.length ? notRecent : famNames)[Math.floor(this.rng() * (notRecent.length || famNames.length))];
    const qs = byFam.get(fam)!.filter(fresh);
    const pool = qs.length ? qs : byFam.get(fam)!;
    const wanted = pool.filter((q) => q.difficulty === difficulty);
    const from = wanted.length ? wanted : pool;
    const pick = from[Math.floor(this.rng() * from.length)];

    this.usedQuestionIds.add(pick.id);
    this.usedStems.add(pick.stem ?? pick.id);
    this.recentFamilies = [fam, ...this.recentFamilies].slice(0, 4);
    return pick;
  }

  // ───────────────────────────── special tiles ─────────────────────────────

  private applySpecial(tile: Tile) {
    const side = this.currentSide;
    const type = tile.special!;
    this.phase = "resolving";

    switch (type) {
      case "roll_again": {
        this.deps.emit({ type: S2C.SPECIAL_TILE, payload: { sideId: side.id, type, detailKey: "banner.roll_again", params: { side: side.name } } });
        this.pushLog("log.specialRollAgain", { side: side.name }, "special", side.id);
        this.changed();
        this.schedule(TIMING.SPECIAL_REVEAL_MS, () => this.continueWithRoll());
        return;
      }
      case "lose_turn": {
        side.skipNextTurn = true;
        this.deps.emit({ type: S2C.SPECIAL_TILE, payload: { sideId: side.id, type, detailKey: "banner.lose_turn", params: { side: side.name } } });
        this.pushLog("log.specialLoseTurn", { side: side.name }, "bad", side.id);
        break;
      }
      case "double_points": {
        side.doublePoints = true;
        this.deps.emit({ type: S2C.SPECIAL_TILE, payload: { sideId: side.id, type, detailKey: "banner.double_points", params: { side: side.name } } });
        this.pushLog("log.specialDouble", { side: side.name }, "special", side.id);
        break;
      }
      case "swap": {
        const target = this.findSwapTarget(side);
        if (!target) {
          this.deps.emit({ type: S2C.SPECIAL_TILE, payload: { sideId: side.id, type, detailKey: "banner.noSwap", params: {} } });
          this.pushLog("log.specialNoSwap", { side: side.name }, "special", side.id);
          break;
        }
        const [a, b] = [side.position, target.position];
        side.position = b;
        target.position = a;
        this.deps.emit({
          type: S2C.SPECIAL_TILE,
          payload: { sideId: side.id, type, detailKey: "banner.swap", params: { side: side.name, other: target.name }, swappedWithSideId: target.id },
        });
        this.emitMove(side.id, [b], "swap", 500);
        this.emitMove(target.id, [a], "swap", 500);
        this.pushLog("log.specialSwap", { side: side.name, other: target.name }, "special", side.id);
        break;
      }
    }
    this.changed();
    this.schedule(TIMING.SPECIAL_REVEAL_MS, () => this.endTurn());
  }

  /** Nearest pawn strictly ahead; if you're leading, the pawn in last place. */
  private findSwapTarget(side: SideState): SideState | null {
    const others = this.sides.filter((s) => s.id !== side.id);
    const ahead = others.filter((s) => s.position > side.position).sort((x, y) => x.position - y.position);
    if (ahead.length) return ahead[0];
    const behind = others.filter((s) => s.position < side.position).sort((x, y) => x.position - y.position);
    return behind[0] ?? null;
  }

  // ───────────────────────────── end of game ─────────────────────────────

  /**
   * Reaching Finish (or collecting every trophy) ENDS the game and earns a
   * bonus — but the winner is whoever has the most points. Ties: further on
   * the board, then more trophies, then whoever ended the game.
   */
  private finishGame(endedBy: SideState, reason: WinReason) {
    this.clearTimer();
    this.phase = "game_over";
    this.activePlayerId = null;
    this.autoActionAt = null;
    endedBy.score += FINISH_BONUS;
    this.endedBySideId = endedBy.id;
    this.winReason = reason;
    this.pushLog(reason === "finish" ? "log.endFinish" : "log.endTrophies", { side: endedBy.name, n: FINISH_BONUS }, "special", endedBy.id);
    const ranked = [...this.sides].sort(
      (a, b) =>
        b.score - a.score ||
        b.position - a.position ||
        b.trophies.length - a.trophies.length ||
        Number(b.id === endedBy.id) - Number(a.id === endedBy.id),
    );
    const winner = ranked[0];
    this.winnerSideId = winner.id;
    const standings: GameOverEvent["standings"] = ranked.map((s) => ({
      sideId: s.id,
      name: s.name,
      score: s.score,
      position: s.position,
      trophies: [...s.trophies],
    }));
    this.pushLog("log.winPoints", { side: winner.name, n: winner.score }, "good", winner.id);
    this.deps.emit({ type: S2C.GAME_OVER, payload: { winnerSideId: winner.id, reason, endedBySideId: endedBy.id, endBonus: FINISH_BONUS, standings } });
    void this.deps.persistence.gameEnded({
      code: this.deps.roomCode,
      winnerSideId: winner.id,
      reason,
      turnCount: this.turnNumber,
      sides: standings.map((st, i) => {
        const s = this.sides.find((x) => x.id === st.sideId)!;
        return {
          sideId: s.id,
          name: s.name,
          color: s.color,
          position: s.position,
          score: s.score,
          trophies: [...s.trophies],
          placement: i + 1,
          memberClientIds: s.memberIds.map((m) => this.deps.clientIdOf(m)).filter(Boolean) as string[],
        };
      }),
    });
    this.changed();
  }

  // ───────────────────────────── helpers ─────────────────────────────

  private forwardPath(from: number, steps: number): { path: number[]; lapped: boolean } {
    const last = this.board.length - 1;
    const path: number[] = [];
    let pos = from;
    let lapped = false;
    for (let i = 0; i < steps; i++) {
      if (this.loopMode) {
        pos = (pos + 1) % this.board.length;
        if (pos === 0) lapped = true;
      } else {
        if (pos >= last) break;
        pos++;
      }
      path.push(pos);
    }
    if (!path.length) path.push(from);
    return { path, lapped };
  }

  private pickActiveMember(side: SideState): string | null {
    const n = side.memberIds.length;
    for (let k = 0; k < n; k++) {
      const id = side.memberIds[(side.rotation + k) % n];
      if (this.deps.isConnected(id)) return id;
    }
    return null;
  }

  private anyoneConnected() {
    return this.sides.some((s) => s.memberIds.some((m) => this.deps.isConnected(m)));
  }

  private emitTurnChanged() {
    this.deps.emit({
      type: S2C.TURN_CHANGED,
      payload: { sideId: this.currentSide.id, activePlayerId: this.activePlayerId, turnNumber: this.turnNumber },
    });
  }

  private emitMove(sideId: string, path: number[], reason: MoveReason, delayMs: number) {
    this.deps.emit({ type: S2C.MOVE_PAWN, payload: { sideId, path, reason, delayMs, stepMs: TIMING.STEP_MS } });
  }

  private pushLog(key: MessageKey, params: Params, tone: LogEntry["tone"], sideId?: string) {
    this.log.push({ id: ++this.logSeq, at: Date.now(), key, params, tone, sideId });
    if (this.log.length > 80) this.log.splice(0, this.log.length - 80);
  }

  private changed() {
    if (!this.disposed) this.deps.onChange();
  }

  private schedule(ms: number, fn: () => void) {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.timer = null;
      if (!this.disposed) fn();
    }, ms);
  }

  private clearTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }
}
