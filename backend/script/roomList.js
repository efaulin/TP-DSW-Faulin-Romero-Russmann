const user = sessionStorage.getItem("user");
var socket = io({
    extraHeaders: {
        "user": user
    }
});

class Player {
    constructor({user}){
        this.user = user
    }
};

const players = {};

addEventListener("load", (event) => {
    document.getElementById("txtUser").textContent = user;
    const lstLobby = document.getElementById("lstLobby");
    const form = document.getElementById("form");
    //form.addEventListener("submit", sendMsg);
});

socket.on('lobbyList', (lobbys) => {
    if (lobbys.lenght == 0) {
        tmpSpan = document.createElement("span");
        tmpSpan.textContent = "No hay ninguna sala";
        lstLobby.appendChild(tmpSpan);
    }
    else {
        for (const id in lobbys){
            tmpInput = document.createElement("input");
            tmpInput.type = "radio";
            tmpInput.name = "idLobby";
            tmpInput.value = id;
            tmpSpan = document.createElement("span");
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
        const bkdPly = backendPlayers[id]
        if (!players[id]) {
            players[id] = new Player({
                user: bkdPly.user
            });
        }
    }
    console.log(players);
});

function newLobby() {
    socket.emit("joinMatch", user, 0)
}

function joinLobby() {
    var ele = document.getElementsByName('idLobby');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) socket.emit("joinMatch", user, ele[i].value);
    }
}