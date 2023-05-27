import type { Socket } from "socket.io";
import type { IO } from "..";

export const joinGame = (socket: Socket, io: IO) => {
  return socket.on("join-game", async ({ roomId }) => {
    const socketsInRoom = io.sockets.adapter.rooms.get(roomId);

    if (!socketsInRoom?.size) {
      return socket.emit("join-game-error", { error: "No game found!" });
    }

    if (socketsInRoom.size > 1) {
      return socket.emit("join-game-error", { error: "Game is full!" });
    }

    await socket.join(roomId);

    socket.emit("start-game", { yourTurn: true, colour: "black" });

    socket.to(roomId).emit("start-game", { yourTurn: false, colour: "white" });
  });
};
