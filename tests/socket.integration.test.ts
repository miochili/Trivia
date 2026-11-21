import { createServer, type Server as HttpServer } from "node:http";
import type { AddressInfo } from "node:net";
import { io as ioc, type Socket } from "socket.io-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { C2S, S2C, type ClientToServerEvents, type ServerToClientEvents } from "../src/shared/events";
import type { PublicRoomState } from "../src/shared/types";
import { attachRealtime } from "../server/realtime";
import { NoopPersistence } from "../server/persistence/GamePersistence";
import { InMemoryQuestionBank } from "../server/questions/QuestionBank";

type Client = Socket<ServerToClientEvents, ClientToServerEvents>;
let http: HttpServer;
let url: string;
let rt: ReturnType<typeof attachRealtime>;
const clients: Client[] = [];

function connect(): Promise<Client> {
  return new Promise((resolve) => {
    const c: Client = ioc(url, { transports: ["websocket"], forceNew: true, reconnection: false });
    clients.push(c);
    c.on("connect", () => resolve(c));
  });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const call = <T = any>(c: Client, ev: string, payload: object = {}): Promise<T> =>
  new Promise((res) => (c as any).emit(ev, payload, res));
const latest = (c: Client) => {
  let s: PublicRoomState | null = null;
  c.on(S2C.ROOM_STATE, (st) => (s = !s || st.version >= s.version ? st : s));
  return () => s!;
};
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function until(fn: () => boolean, ms = 8000) {
  const t = Date.now();
  while (!fn()) {
    if (Date.now() - t > ms) throw new Error("timeout waiting for condition");
    await wait(20);
  }
}

beforeAll(async () => {
  http = createServer();
  rt = attachRealtime(http, { questionBank: new InMemoryQuestionBank(), persistence: new NoopPersistence() });
  await new Promise<void>((r) => http.listen(0, r));
  url = `http://localhost:${(http.address() as AddressInfo).port}`;
});
afterAll(() => {
  clients.forEach((c) => c.close());
  rt.manager.shutdown();
  rt.io.close();
  http.close();
});

describe("socket protocol end-to-end", () => {
  it("create → join → ready → start → roll → answer → reconnect", async () => {
    const host = await connect();
    const guest = await connect();
    const hostState = latest(host);
    const guestState = latest(guest);

    const bad = await call(host, C2S.CREATE_ROOM, { name: "", clientId: "client-host-0001" });
    expect(bad).toMatchObject({ ok: false });

    const created = await call(host, C2S.CREATE_ROOM, { name: "Host", clientId: "client-host-0001", avatar: "🦊", settings: { questionTimerSec: 15 } });
    expect(created.ok).toBe(true);
    const code: string = created.roomCode;
    expect(code).toMatch(/^([BDFGKLMNPRSTVZ][AEIOU]){3}$/); // pronounceable, no digits
    expect(created.state.players[0].avatar).toBe("🦊");

    expect(await call(guest, C2S.JOIN_ROOM, { roomCode: "ZZZZZZ", name: "Guest", clientId: "client-guest-001" })).toMatchObject({ ok: false });
    // asks for the same character → gets a free one instead
    const joined = await call(guest, C2S.JOIN_ROOM, { roomCode: code.toLowerCase(), name: "Guest", clientId: "client-guest-001", avatar: "🦊" });
    expect(joined.ok).toBe(true);
    expect(joined.state.players.find((p: { id: string }) => p.id === joined.playerId).avatar).not.toBe("🦊");
    expect(await call(guest, C2S.SET_AVATAR, { avatar: "🦊" })).toMatchObject({ ok: false, code: "err.avatarTaken" });
    expect(await call(guest, C2S.SET_AVATAR, { avatar: "🐸" })).toMatchObject({ ok: true });
    await until(() => hostState()?.players.length === 2);

    // guest is not host, cannot start or change settings
    expect(await call(guest, C2S.START_GAME)).toMatchObject({ ok: false, error: /host/ });
    expect(await call(guest, C2S.UPDATE_SETTINGS, { boardLength: 30 })).toMatchObject({ ok: false });
    expect(await call(host, C2S.START_GAME)).toMatchObject({ ok: false, error: /ready/ });
    expect(await call(guest, C2S.SET_READY, { ready: true })).toMatchObject({ ok: true });

    // capture a QUESTION payload to verify answers are never leaked
    const questions: unknown[] = [];
    guest.on(S2C.QUESTION, (q) => questions.push(q));
    host.on(S2C.QUESTION, (q) => questions.push(q));

    expect(await call(host, C2S.START_GAME)).toMatchObject({ ok: true });
    await until(() => hostState()?.status === "playing" && guestState()?.status === "playing");
    const g = hostState().game!;
    expect(g.board.length).toBe(51); // Finish is tile 50
    const activeId = g.activePlayerId!;
    const active = activeId === created.playerId ? host : guest;
    const idle = active === host ? guest : host;

    expect(await call(idle, C2S.ROLL_DICE)).toMatchObject({ ok: false, error: /not your turn/ });
    const roll = await call(active, C2S.ROLL_DICE);
    expect(roll.ok).toBe(true);
    expect(roll.value).toBeGreaterThanOrEqual(1);
    expect(roll.value).toBeLessThanOrEqual(6);

    // wait for landing; tile could be a category (question) or a special tile
    await until(() => ["question", "resolving", "awaiting_roll"].includes(hostState().game!.phase) && hostState().game!.lastRoll !== null);
    const st = hostState().game!;
    if (st.phase === "question") {
      const q = st.activeQuestion!;
      expect(JSON.stringify(questions)).not.toMatch(/correct/i);
      expect(await call(idle, C2S.SUBMIT_ANSWER, { questionId: q.question.id, optionIndex: 0 })).toMatchObject({ ok: false });
      expect(await call(active, C2S.SUBMIT_ANSWER, { questionId: q.question.id, optionIndex: 0 })).toMatchObject({ ok: true });
      await until(() => hostState().game!.lastReveal !== null || hostState().game!.phase === "steal");
      if (hostState().game!.phase === "steal") {
        // wrong answer → steal window; the right answer must still be secret
        expect(hostState().game!.lastReveal).toBeNull();
        expect(JSON.stringify(hostState().game!.activeQuestion)).not.toMatch(/correct/i);
      } else {
        expect(hostState().game!.lastReveal!.correctIndex).toBeTypeOf("number");
      }
    }

    // ── reconnection: guest drops and rejoins with its session token ──
    const token: string = joined.sessionToken;
    guest.disconnect();
    await until(() => hostState().players.find((p) => p.id === joined.playerId)?.connected === false);
    expect(hostState().status).toBe("playing");

    const guest2 = await connect();
    const g2State = latest(guest2);
    expect(await call(guest2, C2S.REJOIN_ROOM, { roomCode: code, sessionToken: "x".repeat(32) })).toMatchObject({ ok: false });
    const re = await call(guest2, C2S.REJOIN_ROOM, { roomCode: code, sessionToken: token });
    expect(re).toMatchObject({ ok: true, playerId: joined.playerId });
    expect(re.state.status).toBe("playing");
    await until(() => g2State()?.players.find((p) => p.id === joined.playerId)?.connected === true);
    // board & positions preserved
    expect(re.state.game.board).toEqual(g.board);

    // new players can't join a running game
    const late = await connect();
    expect(await call(late, C2S.JOIN_ROOM, { roomCode: code, name: "Late", clientId: "client-late-0001" })).toMatchObject({
      ok: false,
      error: /already started/,
    });
  });

  it("team mode: teams, auto-balance and start", async () => {
    const [a, b, c, d] = await Promise.all([connect(), connect(), connect(), connect()]);
    const s = latest(a);
    const created = await call(a, C2S.CREATE_ROOM, { name: "A", clientId: "team-client-a1" });
    const code = created.roomCode;
    for (const [sock, n] of [[b, "B"], [c, "C"], [d, "D"]] as const) {
      expect(await call(sock, C2S.JOIN_ROOM, { roomCode: code, name: n, clientId: `team-client-${n}1` })).toMatchObject({ ok: true });
    }
    expect(await call(a, C2S.CREATE_TEAM, { name: "Nope" })).toMatchObject({ ok: false, error: /Team mode/ });
    expect(await call(a, C2S.UPDATE_SETTINGS, { mode: "teams" })).toMatchObject({ ok: true });
    await until(() => s()?.teams.length === 2);
    expect(s().teams.map((t) => t.memberIds.length).sort()).toEqual([2, 2]);

    // uneven teams: C creates a 3rd team
    const t3 = await call(c, C2S.CREATE_TEAM, { name: "Solo Squad" });
    expect(t3.ok).toBe(true);
    await until(() => s()?.teams.length === 3);
    expect(await call(a, C2S.AUTO_BALANCE_TEAMS, { teamCount: 2 })).toMatchObject({ ok: true });
    await until(() => s()?.teams.length === 2);

    // choose who's with who: host moves D next to B; others can't move people
    const bTeam = s().players.find((p) => p.name === "B")!.teamId;
    const dId = s().players.find((p) => p.name === "D")!.id;
    expect(await call(c, C2S.MOVE_PLAYER, { playerId: dId, teamId: bTeam })).toMatchObject({ ok: false, code: "err.hostOnly" });
    expect(await call(a, C2S.MOVE_PLAYER, { playerId: dId, teamId: bTeam })).toMatchObject({ ok: true });
    await until(() => s()?.players.find((p) => p.id === dId)!.teamId === bTeam);

    // open games list: visible while waiting, hidden when private
    const listed = async () => ((await call(d, C2S.LIST_LOBBIES)).lobbies as { code: string }[]).some((l) => l.code === code);
    expect(await listed()).toBe(true);
    await call(a, C2S.UPDATE_SETTINGS, { isPublic: false });
    expect(await listed()).toBe(false);
    await call(a, C2S.UPDATE_SETTINGS, { isPublic: true });
    // re-balance so both teams have two players again
    await call(a, C2S.AUTO_BALANCE_TEAMS, { teamCount: 2 });

    for (const sock of [b, c, d]) await call(sock, C2S.SET_READY, { ready: true });
    expect(await call(a, C2S.START_GAME)).toMatchObject({ ok: true });
    expect(await listed()).toBe(false); // started games are not listed
    await until(() => s()?.status === "playing");
    expect(s().game!.sides).toHaveLength(2);
    expect(s().game!.sides.every((side) => side.memberIds.length === 2)).toBe(true);
  });
});
