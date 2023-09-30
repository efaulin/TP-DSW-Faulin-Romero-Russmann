import { io, Socket } from "socket.io-client";
import { BckPlayer, BckPlayerArray, Player, PlayerArray } from "../entity/player";
import { ServerToClientEvents, ClientToServerEvents } from "../app.js";

const user = sessionStorage.getItem("user");
const urlParams = new URLSearchParams(window.location.search);
const idMatch = urlParams.get('idMatch');
const player = new PlayerArray();

var socket : Socket<ServerToClientEvents, ClientToServerEvents> = io("/", { extraHeaders: { "user": ""+user } });

addEventListener("load", (event) => {
    var form = document.getElementById("form")!;
    form.addEventListener("submit", sendMsg);
});

socket.on('updatePlayers', (backendPlayers) => {
    for (const id in backendPlayers) {
        const bkdPly : BckPlayer = backendPlayers[id]

        if (!player.array[id]) {
            player.create(new Player(bkdPly.socket, bkdPly.name, document.createElement("label"), document.createElement("br")));

            var lista = document.getElementById("lobby")!;
            const tmpPly : Player = player.array[id];
            lista.appendChild(tmpPly.label);
            lista.appendChild(tmpPly.br);
        }
    }

    for (const id in player.array) {
        const ply : Player = player.array[id];

        if (backendPlayers.find((obj, index, array) => { return obj.socket == ply.socket }) == undefined) {
            ply.label.remove()
            ply.br.remove()
            player.delete(ply.socket);
        }
    }

    console.log(player)
});

socket.on('newMsg', (msg) => {
    var li = document.createElement("li")!;
    li.textContent = `[${msg.user}]: ${msg.msg}`;
    var chat = document.getElementById("chat")!;
    chat.appendChild(li);
})

function sendMsg(event: Event) {
    var text = document.getElementById("text")! as HTMLInputElement;
    console.log(text.value)
    socket.emit("sendMsg", "" + text.value);
    text.value = "";
    event.preventDefault();
}