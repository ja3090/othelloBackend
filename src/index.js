"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.NODE_ENV === "development" ? "http://localhost:5173" : "/",
    },
});
const join_game_1 = require("./events/join-game");
const make_game_1 = require("./events/make-game");
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === "production" ? "/" : "http://localhost:5173",
}));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "dist")));
io.on("connection", (socket) => {
    (0, make_game_1.makeGame)(socket);
    (0, join_game_1.joinGame)(socket, io);
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
