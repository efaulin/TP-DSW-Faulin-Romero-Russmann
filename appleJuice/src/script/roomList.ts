import { io, Socket } from "socket.io-client";
import { BckPlayer, BckPlayerArray, Player, PlayerArray } from "../entity/player";
import { ServerToClientEvents, ClientToServerEvents } from "../app.js";
import { Lobby } from "../entity/lobby.js";
import { Console } from "console";

const user = sessionStorage.getItem("user")!;
const urlParams = new URLSearchParams(window.location.search);
const idMatch = urlParams.get('idMatch');
const player = new PlayerArray();
var lstLobby : HTMLElement;
var form : HTMLElement;
var lobbyList : string[] = [];

var socket : Socket<ServerToClientEvents, ClientToServerEvents> = io("/lobby", { extraHeaders: { "user": ""+user } });

//const players = {};

addEventListener("load", (event) => {
    document.getElementById("txtUser")!.textContent = user;
    lstLobby = document.getElementById("lstLobby")!;
    form = document.getElementById("form")!;
    const btnNewLobby = document.getElementById("newLobby")!;
    const btnJoinLobby = document.getElementById("joinLobby")!;
    //form.addEventListener("submit", sendMsg);
    btnNewLobby.addEventListener("click", function (e:Event){ newLobby(e) });
    btnJoinLobby.addEventListener("click", function (e:Event){ joinLobby(e) });
});

socket.on('lobbyList', (lobbys) => {
    if (lobbys.length == 0) {
        const tmpSpan = document.createElement("span");
        tmpSpan.textContent = "No hay ninguna sala";
        lstLobby.appendChild(tmpSpan);
    }
    else {
        lobbyList = lobbys;
        for (const id in lobbys){
            const tmpInput = document.createElement("input");
            tmpInput.type = "radio";
            tmpInput.name = "idLobby";
            tmpInput.value = id;
            const tmpSpan = document.createElement("span");
            tmpSpan.textContent = lobbys[id];

            lstLobby.appendChild(tmpInput);
            lstLobby.appendChild(tmpSpan);
            lstLobby.appendChild(document.createElement("br"));
        }
        /*
        lobbys.forEach((lbb, index, array) => {
            tmpInput = document.createElement("input");
            tmpInput.type = "radio";
            tmpInput.name = "idLobby";
            tmpInput.value = index;
            tmpSpan = document.createElement("span");
            tmpSpan.textContent = lbb;

            lstLobby.appendChild(tmpInput);
            lstLobby.appendChild(tmpSpan);
            lstLobby.appendChild(document.createElement("br"));
        });*/
    }
});

socket.on('updateMatchPlayers', (backendPlayers) => {
    for (const id in backendPlayers) {
        const bkdPly : BckPlayer = backendPlayers[id]

        if (!player.array[id]) {
            player.create(new Player(bkdPly.socket, bkdPly.name, document.createElement("label"), document.createElement("br")));

            /*var lista = document.getElementById("lobby")!;
            const tmpPly : Player = player.array[id];
            lista.appendChild(tmpPly.label);
            lista.appendChild(tmpPly.br);*/
        }
    }

    for (const id in player.array) {
        const ply : Player = player.array[id];

        if (backendPlayers.find((obj, index, array) => { return obj.socket == ply.socket }) == undefined) {
            /*ply.label.remove()
            ply.br.remove()*/
            player.delete(ply.socket);
        }
    }

    console.log("updateMatchPlayers");
    console.log(player)
});

socket.on("hi", () => {
    console.log("Someone activated HI");
})

function newLobby(event : Event) {
    console.log("user: " + user +" -> newLobby!!");
    socket.emit("newMatch", user)
}

function joinLobby(event : Event) {
    console.log("user: " + user +" -> joinLobby!!");
    var ele = document.getElementsByName('idLobby')!;
    for (var i = 0; i < ele.length; i++) {
        const tmp = ele[i] as HTMLInputElement;
        if (tmp.checked) {
            console.log("   -> JOINED " + tmp.value);
            socket.emit("joinMatch", user, +tmp.value);
        };
    }
}