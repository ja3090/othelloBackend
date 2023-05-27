import express from "express";
import cors from "cors";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
import path from "path";
const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "development" ? "http://localhost:5173" : "/",
  },
});

import type { Socket } from "socket.io";
import { joinGame } from "./events/join-game";
import { makeGame } from "./events/make-game";

export type IO = typeof io;

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? "/" : "http://localhost:5173",
  })
);
app.use("/static", express.static(path.join(__dirname, "dist")));

io.on("connection", (socket: Socket) => {
  makeGame(socket);

  joinGame(socket, io);

  socket.on("update-board", ({ updateBoard, currentGame }) => {
    socket.to(currentGame).emit("update-board", { updateBoard });
  });

  socket.on("game-over", ({ currentGame, winner }) => {
    socket.to(currentGame).emit("game-over", { winner });
  });
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
