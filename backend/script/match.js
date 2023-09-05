//const urlParams = new URLSearchParams(window.location.search);
//const user = urlParams.get('user');
const user = sessionStorage.getItem("user")
const players = {}

addEventListener("load", (event) => {
    const form = document.getElementById("form");
    form.addEventListener("submit", sendMsg);
});

var socket = io({
    extraHeaders: {
        "user": user
    }
});

socket.on('updatePlayers', (backendPlayers) => {
    for (const id in backendPlayers) {
        const bkdPly = backendPlayers[id]

        if (!players[id]) {
            players[id] = new Player({
                user: bkdPly.user,
                x: bkdPly.x,
                y: bkdPly.y,
                label: document.createElement("label"),
                salto: document.createElement("br")
            });

            var lista = document.getElementById("lobby");
            lista.appendChild(players[id].label);
            lista.appendChild(players[id].salto);
        }
    }

    for (const id in players) {
        if (!backendPlayers[id]) {
            players[id].label.remove()
            players[id].salto.remove()
            delete players[id]
        }
    }

    console.log(players)
});

socket.on('newMsg', (msg) => {
    var li = document.createElement("li");
    li.textContent = `[${msg.user}]: ${msg.msg}`;
    var chat = document.getElementById("chat");
    chat.appendChild(li);
})

function sendMsg(event) {
    var text = document.getElementById("text");
    console.log(text.value)
    socket.emit("sendMsg", text.value);
    text.value = "";
    event.preventDefault();
}