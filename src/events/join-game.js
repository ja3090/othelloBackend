"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinGame = void 0;
const joinGame = (socket, io) => {
    return socket.on("join-game", ({ roomId }) => __awaiter(void 0, void 0, void 0, function* () {
        const socketsInRoom = io.sockets.adapter.rooms.get(roomId);
        if (!(socketsInRoom === null || socketsInRoom === void 0 ? void 0 : socketsInRoom.size)) {
            return socket.emit("join-game-error", { error: "No game found!" });
        }
        if (socketsInRoom.size > 1) {
            return socket.emit("join-game-error", { error: "Game is full!" });
        }
        yield socket.join(roomId);
        socket.emit("start-game", { yourTurn: true, colour: "black" });
        socket.to(roomId).emit("start-game", { yourTurn: false, colour: "white" });
    }));
};
exports.joinGame = joinGame;
