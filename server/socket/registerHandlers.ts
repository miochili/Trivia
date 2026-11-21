import type { Server, Socket } from "socket.io";
import type { RoomManager } from "../rooms/RoomManager";
import { createDispatcher } from "./dispatch";

/** socket.io adapter: each socket becomes a Conn; every event goes to dispatch(). */
export function registerSocketHandlers(io: Server, manager: RoomManager) {
  const dispatch = createDispatcher(manager);
  io.on("connection", (socket: Socket) => {
    const conn = { id: socket.id, send: (event: string, payload?: unknown) => socket.emit(event, payload) };
    manager.addConn(conn);
    socket.onAny((event: string, ...args: unknown[]) => {
      const ack = args.find((a) => typeof a === "function") as ((r: unknown) => void) | undefined;
      const payload = typeof args[0] === "function" ? {} : args[0];
      void dispatch(conn, event, payload).then((res) => ack?.(res));
    });
    socket.on("disconnect", () => manager.removeConn(socket.id));
  });
}
