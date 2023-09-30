import express, { Request, Response, NextFunction } from "express";
import http from "http";
import { appleJuiceDir, generalRouter } from "./router/generalRouter.js";
import { Server, Socket } from "socket.io";
import { BckPlayer, Player, BckPlayerArray } from "./entity/player.js";
import { Lobby } from "./entity/lobby.js";
import path from 'path';
import {fileURLToPath} from 'url';
import { entityRouter } from "./router/entityRouter.js";
import { scriptRouter } from "./router/scriptRouter.js";

//#region Definiciones de eventos Socket.io
export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    updatePlayers: (f: BckPlayer[]) => void;
    lobbyList: (g: string[]) => void;
    updateMatchPlayers: (h: BckPlayer[]) => void;
    newMsg: (i: {user: string | undefined, msg: string}) => void;
    hi: () => void;
}

export interface ClientToServerEvents {
    hello: () => void;
    getLobbyList: () => void;
    joinMatch: (a: string, b: number) => void;
    sendMsg: (c: string) => void;
    newMatch: (d: string) => void;
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
>().listen(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app.use('/entity', entityRouter);
//app.use('/script', scriptRouter);
app.use('/', generalRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '/../')));

app.post('/chat', (req, res) => {
    console.log(`LogIn: ` + req.query.user);
    res.sendFile('match.html', { root: __dirname + '/../src/html/' });
});

//app.use(logger(req, res, next));
function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Peticion de Acceso -> ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});

const player: BckPlayerArray = new BckPlayerArray;
const lobby: Lobby[] = [];

//#region Eventos IO
io.of("/lobby").on("connection", async (socket) => {
    // works when broadcast to all
    var usr = await socket.handshake.headers.user?.toString();
    console.log(`User [${usr}] new webSocket in -lobby namespace-`);

    socket.emit("lobbyList", lobbyStr());

    // works when broadcasting to a room
    //io.to("room1").emit("basicEmit", 1, "2", Buffer.from([3]));

    // works when client send data to server
    socket.on('disconnect', (reason) => {
        console.log(`user [${socket.id}] disconnected for: ${reason}`);
    });

    socket.on("getLobbyList", () => {
        socket.emit("lobbyList", lobbyStr());
    });

    socket.on("newMatch", (user) => {
        const nroMatch = lobby.push(new Lobby("Test")) - 1;
        joinMatch(socket, user, nroMatch);
    });

    socket.on("joinMatch", (cntUser, cntIdMatch) => {
        joinMatch(socket, cntUser, cntIdMatch)
    });

    socket.on("sendMsg", (msg) => {
        io.emit("newMsg", { user: player.getOne(socket.id)!.name, msg: msg });
    });
});

//#region IO Chat global
io.on("connection", (socket) => {
    // works when broadcast to all
    var usr = socket.handshake.headers.user?.toString();
    console.log(`User [${usr}] new webSocket`);

    player.create(new BckPlayer(socket.id, usr));

    io.emit('updatePlayers', player.getAll());
    console.log(player);

    // works when client send data to server
    socket.on('disconnect', (reason) => {
        console.log(`user [${player.getOne(socket.id)!.name}: ${socket.id}] disconnected for: ${reason}`);
        player.delete(socket.id);
        io.emit('updatePlayers', player.getAll());
    });

    socket.on("sendMsg", (msg) => {
        io.emit("newMsg", { user: player.getOne(socket.id)!.name, msg: msg });
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

function updateMatchPlayers(cntIdMatch:number){
    console.log(`room:${cntIdMatch} -> updateMatchPlayers`);
    const match = "match:" + cntIdMatch;
    io.to(match).emit('updateMatchPlayers', lobby[cntIdMatch].player.getAll());
    io.to(match).emit("hi");
}

function joinMatch(socket:Socket, cntUser:string, cntIdMatch:number){
    if (!!lobby[cntIdMatch]) {
        lobby[cntIdMatch].player.create(new BckPlayer(socket.id, cntUser));
        const match = "match:" + cntIdMatch;
        socket.join(match);

        console.log(`User [${cntUser}] joins to room:*${cntIdMatch}*`);

        // works when broadcasting to a room
        updateMatchPlayers(cntIdMatch);
    }
}

//#endregion

//#region Rejunte de comentarios
/*

*/
//#endregion