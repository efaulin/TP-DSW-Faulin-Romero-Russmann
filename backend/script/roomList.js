const user = sessionStorage.getItem("user");
var socket = io({
    extraHeaders: {
        "user": user
    }
});

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
        });
    }
})
function newLobby() {
    socket.emit("joinMatch", user, 0)
}