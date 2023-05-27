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
exports.makeGame = void 0;
const uuid_1 = require("uuid");
const makeGame = (socket) => {
    return socket.on("make-game", () => __awaiter(void 0, void 0, void 0, function* () {
        const roomId = (0, uuid_1.v4)();
        yield socket.join(roomId);
        socket.emit("join-successful", { roomId });
    }));
};
exports.makeGame = makeGame;
