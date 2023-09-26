import express, { Request, Response, NextFunction } from "express";
import http from "http";
import { generalRouter } from "./router/generalRouter.js";
import { Server } from "socket.io";
import { BckPlayer, Player, BckPlayerArray } from "./entity/player.js";
import { Lobby } from "./entity/lobby.js";
import path from 'path';
import {fileURLToPath} from 'url';

//#region Definiciones de eventos Socket.io
export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    updatePlayers: (f: BckPlayerArray) => void;
    lobbyList: (g: string[]) => void;
    updateMatchPlayers: (h: BckPlayerArray) => void;
    newMsg: (i: {user: string | undefined, msg: string}) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
    getLobbyList: () => void;
    joinMatch: (a: string, b: number) => void;
    sendMsg: (c: string) => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    user: string;
}
//#endregion

const app = express();
const port = 27015;
const server = http.createServer(app);
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/', generalRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname));
app.use(express.static("public"));
//app.use(logger(req, res, next));
function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Peticion de Acceso -> ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});

const player = [] as unknown as BckPlayerArray;
const lobby: Lobby[] = [];

//#region Eventos IO
io.of("lobby").on("connection", (socket) => {
    // works when broadcast to all
    var usr = socket.handshake.headers.user?.toString();
    console.log(`User [${usr}] new webSocket in -lobby namespace-`);

    player.push = new BckPlayer(usr);

    io.emit('updatePlayers', player);
    socket.emit("lobbyList", lobbyStr());
    console.log("Lobby players:");
    console.log(player);

    // works when broadcasting to a room
    io.to("room1").emit("basicEmit", 1, "2", Buffer.from([3]));

    // works when client send data to server
    socket.on('disconnect', (reason) => {
        console.log(`user [${player[socket.id].name}: ${socket.id}] disconnected for: ${reason}`);
        delete player[socket.id]
        io.emit('updatePlayers', player);
    });

    socket.on("getLobbyList", () => {
        socket.emit("lobbyList", lobbyStr());
    });

    socket.on("joinMatch", (cntUser, cntIdMatch) => {
        if (!lobby[cntIdMatch]) {
            lobby[cntIdMatch] = new Lobby("Test");
        }
        lobby[cntIdMatch].player[socket.id] = new BckPlayer(cntUser);
        socket.join("match-" + cntIdMatch);
        io.in("match-" + cntIdMatch).emit('updateMatchPlayers', lobby[cntIdMatch].player);

        console.log(`User [${cntUser}] joins to room:*${cntIdMatch}*`);
    });

    socket.on("sendMsg", (msg) => {
        io.emit("newMsg", { user: player[socket.id].name, msg: msg });
    });
});

//#region IO Chat global
io.on("connection", (socket) => {
    // works when broadcast to all
    var usr = socket.handshake.headers.user?.toString();
    console.log(`User [${usr}] new webSocket`);

    player.push = new BckPlayer(usr);

    io.emit('updatePlayers', player);
    console.log(player);

    // works when client send data to server
    socket.on('disconnect', (reason) => {
        console.log(`user [${player[socket.id].name}: ${socket.id}] disconnected for: ${reason}`);
        delete player[socket.id]
        io.emit('updatePlayers', player);
    });

    socket.on("sendMsg", (msg) => {
        io.emit("newMsg", { user: player[socket.id].name, msg: msg });
    });
});
//#endregion

function lobbyStr(){
    var lobbyStr: string[] = [];
    lobby.forEach((elem, index, array)=>{
        lobbyStr.push(elem.name);
    });
    return lobbyStr;
};

//#endregion

//#region Rejunte de comentarios
/*

*/
//#endregion