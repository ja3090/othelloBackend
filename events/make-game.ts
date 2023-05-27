import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export const makeGame = (socket: Socket) => {
  return socket.on("make-game", async () => {
    const roomId = uuidv4();

    await socket.join(roomId);

    socket.emit("join-successful", { roomId });
  });
};
