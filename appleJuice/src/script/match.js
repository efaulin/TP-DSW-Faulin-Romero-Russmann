import { Player } from "../entity/player";

const user = sessionStorage.getItem("user");
const urlParams = new URLSearchParams(window.location.search);
const idMatch = urlParams.get('idMatch');
const player = [];

var socket = io( "/", { extraHeaders: { "user": user } });

addEventListener("load", (event) => {
    var form = document.getElementById("form");
    form.addEventListener("submit", sendMsg);
});

socket.on('updatePlayers', (backendPlayers) => {
    for (const id in backendPlayers) {
        const bkdPly = backendPlayers[id]

        if (!player[id]) {
            player[id] = new Player( bkdPly.name, document.createElement("label"), document.createElement("br") );

            var lista = document.getElementById("lobby");
            lista.appendChild(player[id].label);
            lista.appendChild(player[id].br);
        }
    }

    for (const id in player) {
        if (!backendPlayers[id]) {
            player[id].label.remove()
            player[id].br.remove()
            delete player[id]
        }
    }

    console.log(player)
});

socket.on('newMsg', (msg) => {
    var li = document.createElement("li");
    li.textContent = `[${msg.user}]: ${msg.msg}`;
    var chat = document.getElementById("chat");
    chat.appendChild(li);
})

function sendMsg(event) {
    var text = document.getElementById("text");
    console.log(text.textContent)
    socket.emit("sendMsg", "" + text.textContent);
    text.textContent = "";
    event.preventDefault();
}