"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AVATARS, MAX_TEAMS } from "@/shared/constants";
import { C2S } from "@/shared/events";
import type { PublicPlayer, PublicTeam } from "@/shared/types";
import { useRoom } from "@/lib/useRoom";
import { saveAvatar } from "@/lib/session";
import { Button, Token } from "../ui/primitives";

export function PlayersPanel() {
  const { state, isHost, me, act, error, t } = useRoom();
  const teams = state.settings.mode === "teams";

  return (
    <section className="parchment p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-3xl">{teams ? t("lobby.teams") : t("lobby.players")}</h2>
        <span className="font-fell text-ink-soft">{t("lobby.seats", { n: state.players.length, max: state.settings.maxPlayers })}</span>
      </div>
      <div className="ink-rule mt-2" />

      {teams ? (
        <TeamsBoard />
      ) : (
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {state.players.map((p) => (
            <PlayerRow key={p.id} p={p} canKick={isHost && p.id !== me?.id} onKick={() => act(C2S.KICK_PLAYER, { playerId: p.id })} />
          ))}
        </ul>
      )}

      <CharacterChanger />
      {error && <p className="mt-3 text-[15px] text-rust">{error}</p>}
    </section>
  );
}

/** Change your own character in the lobby; taken ones are faded. */
function CharacterChanger() {
  const { state, me, act, t } = useRoom();
  if (!me) return null;
  const taken = new Set(state.players.filter((p) => p.id !== me.id).map((p) => p.avatar));
  return (
    <div className="mt-5">
      <p className="text-[15px] font-bold text-ink-soft">{t("lobby.yourCharacter")}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {AVATARS.map((a) => (
          <button
            key={a}
            disabled={taken.has(a)}
            aria-pressed={a === me.avatar}
            title={taken.has(a) ? t("lobby.taken") : undefined}
            onClick={() => {
              saveAvatar(a);
              void act(C2S.SET_AVATAR, { avatar: a });
            }}
            className="rounded-full transition enabled:hover:scale-105 disabled:cursor-not-allowed"
          >
            <Token emblem={a} size={30} active={a === me.avatar} dim={taken.has(a)} />
          </button>
        ))}
      </div>
    </div>
  );
}

function PlayerRow({ p, canKick, onKick }: { p: PublicPlayer; canKick: boolean; onKick: () => void }) {
  const { me, t } = useRoom();
  return (
    <motion.li layout className="flex items-center gap-3 rounded-lg border border-ink/15 bg-vellum/60 px-3 py-2">
      <Token emblem={p.avatar} color={p.color} size={38} />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-fell text-xl leading-tight">
          {p.name}
          {p.id === me?.id && <span className="text-base text-ink-soft"> {t("lobby.you")}</span>}
        </span>
        <span className="text-sm">
          {p.isHost && <span className="mr-2 font-bold text-brass-dark">♛ {t("lobby.host")}</span>}
          {!p.connected ? (
            <span className="text-ink-soft">{t("lobby.reconnecting")}</span>
          ) : p.ready ? (
            <span className="font-bold text-moss">✓ {t("lobby.ready")}</span>
          ) : (
            <span className="text-ink-soft">{t("lobby.notReady")}</span>
          )}
        </span>
      </span>
      {canKick && (
        <button onClick={onKick} className="rounded px-1.5 text-ink-soft hover:bg-rust/10 hover:text-rust" aria-label={t("lobby.remove", { name: p.name })}>
          ✕
        </button>
      )}
    </motion.li>
  );
}

function TeamsBoard() {
  const { state, me, isHost, act, t } = useRoom();
  const [newTeam, setNewTeam] = useState("");
  const unassigned = state.players.filter((p) => !p.teamId);

  return (
    <div className="mt-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <AnimatePresence initial={false}>
          {state.teams.map((tm) => (
            <TeamBanner key={tm.id} team={tm} />
          ))}
        </AnimatePresence>
      </div>

      {unassigned.length > 0 && (
        <div className="mt-3 rounded-lg border border-dashed border-ink/30 p-3">
          <p className="font-fell italic text-ink-soft">{t("lobby.unassigned")}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {unassigned.map((p) => (
              <li key={p.id} className="flex items-center gap-1.5 font-fell text-lg">
                <Token emblem={p.avatar} color={p.color} size={26} /> {p.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {state.teams.length < MAX_TEAMS && (
          <form
            className="flex w-full gap-2"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!newTeam.trim()) return;
              const r = await act(C2S.CREATE_TEAM, { name: newTeam.trim() });
              if (r.ok) setNewTeam("");
            }}
          >
            <input
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
              maxLength={24}
              placeholder={t("lobby.newTeam")}
              aria-label={t("lobby.newTeam")}
              className="min-w-0 flex-1 border-b-2 border-ink/40 bg-transparent px-1 py-1.5 font-fell text-lg outline-none placeholder:text-ink/40 focus:border-ink"
            />
            <Button type="submit">{t("lobby.createJoin")}</Button>
          </form>
        )}
        {isHost && <Button onClick={() => act(C2S.AUTO_BALANCE_TEAMS, { teamCount: Math.max(2, state.teams.length) })}>{t("lobby.shuffle")}</Button>}
        {me?.teamId && (
          <Button variant="danger" onClick={() => act(C2S.JOIN_TEAM, { teamId: null })}>
            {t("lobby.leaveTeam")}
          </Button>
        )}
      </div>
    </div>
  );
}

/** A team as a hanging banner: crest, name, members. */
function TeamBanner({ team }: { team: PublicTeam }) {
  const { state, me, isHost, act, t } = useRoom();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(team.name);
  const members = state.players.filter((p) => p.teamId === team.id);
  const mine = me?.teamId === team.id;
  const canRename = mine || isHost;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className={`relative overflow-hidden rounded-lg border-2 bg-vellum/70 ${mine ? "border-brass" : "border-ink/20"}`}
    >
      <div className="flex items-center gap-3 px-3 py-2.5 text-vellum" style={{ background: `linear-gradient(180deg, ${team.color}, color-mix(in srgb, ${team.color} 70%, black))` }}>
        <Token emblem={team.emblem} size={40} />
        {editing ? (
          <form
            className="flex-1"
            onSubmit={async (e) => {
              e.preventDefault();
              const r = await act(C2S.RENAME_TEAM, { teamId: team.id, name });
              if (r.ok) setEditing(false);
            }}
          >
            <input
              autoFocus
              value={name}
              maxLength={24}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setEditing(false)}
              aria-label={t("lobby.teamName")}
              className="w-full rounded bg-vellum px-2 py-1 font-display text-xl text-ink"
            />
          </form>
        ) : (
          <button
            disabled={!canRename}
            onClick={() => {
              setName(team.name);
              setEditing(true);
            }}
            className="min-w-0 flex-1 truncate text-left font-display text-2xl drop-shadow-[0_1px_0_rgb(0_0_0/.4)] enabled:hover:underline"
            title={canRename ? t("lobby.renameTeam") : undefined}
          >
            {team.name}
          </button>
        )}
        <span className="font-display text-xl opacity-85">{members.length}</span>
      </div>
      <ul className="flex min-h-12 flex-col gap-1.5 px-3 py-2.5">
        {members.map((p) => (
          <li key={p.id} className="flex items-center gap-2">
            <Token emblem={p.avatar} size={26} dim={!p.connected} />
            <span className="truncate font-fell text-lg">{p.name}</span>
            {p.id === me?.id && <span className="text-ink-soft">{t("lobby.you")}</span>}
            {p.isHost && <span className="text-sm text-brass-dark">♛</span>}
            <span className={`ml-auto text-sm ${p.ready ? "text-moss" : "text-ink-soft"}`}>{p.ready ? "✓" : "…"}</span>
            {isHost && p.id !== me?.id && (
              <button onClick={() => act(C2S.KICK_PLAYER, { playerId: p.id })} className="text-ink-soft hover:text-rust" aria-label={t("lobby.remove", { name: p.name })}>
                ✕
              </button>
            )}
          </li>
        ))}
        {!members.length && <li className="font-fell italic text-ink-soft">{t("lobby.emptyTeam")}</li>}
      </ul>
      {!mine && (
        <div className="px-3 pb-3">
          <Button className="w-full py-1.5" onClick={() => act(C2S.JOIN_TEAM, { teamId: team.id })}>
            {t("lobby.joinTeam", { team: team.name })}
          </Button>
        </div>
      )}
    </motion.div>
  );
}
