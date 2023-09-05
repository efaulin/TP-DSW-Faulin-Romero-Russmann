//#region Servidor Node.js
/* const http = require('http');

const server = http.createServer((req, res) => {
  res.status = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Word');
});

server.listen(3000, () => {
  console.log('Server on port 3000');
}); */
//#endregion

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const fs = require('fs');

const app = express();
const port = 27015;
const server = http.createServer(app);
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(logger);

function logger(req, res, next) {
    console.log(`Peticion de Acceso -> ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

//#region Pruebas
app.get('/', (req, res) => {
  res.sendFile('inicio.html', {
    root: __dirname
  })
})

/*app.all('/user', (req, res) => {
  console.log(`Acceso de usuario`);
  next();
})*/

app.get('/apple', (req, res) => {
  res.send('Juegazo')
})

app.get('/orange', (req, res) => {
  res.send('eh?')
})

app.get('/user', (req, res) => {
  res.json({
    username: 'pandugat',
    pasword: 'dou'
  })
})

app.post('/play/:idMatch', (req, res) => {
  console.log(req.params)
  res.send(`Post Recibido\npartidaId: ${req.params.idMatch}`)
})

app.post('/user', (req, res) => {
  console.log(req.body)
  res.send('Recibido ;D')
})
//#endregion

const player = {};

app.get('/test', (req, res) => {
    console.log(`LogIn: ` + req.body.user);
    res.sendFile('frontend.html', { root: __dirname });
});

app.post('/play', (req, res) => {
    console.log(`LogIn: ` + req.body.user);
    res.sendFile('match.html', { root: __dirname + '/../frontend/' });
});

app.get('/entity/:file', (req, res) => {
    var path = __dirname + '/entity/' + req.params.file + '.js';
    try {
        if (fs.existsSync(path)) {
            res.status(200);
            res.sendFile(path);
        }
        else {
            res.status(404);
            res.type('txt').send('Not found');
        }
    }
    catch (err)
    {
        console.error(err);
        res.status(500);
        res.send(err);
        return;
    }
});

app.get('/script/:file', (req, res) => {
    var path = __dirname + '/script/' + req.params.file + '.js';
    try {
        if (fs.existsSync(path)) {
            res.status(200);
            res.sendFile(path);
        }
        else {
            res.status(404);
            res.type('txt').send('Not found');
        }
    }
    catch (err) {
        console.error(err);
        res.status(500);
        res.send(err);
        return;
    }
});

io.on('connection', (socket) => {
    var usr = socket.handshake.headers.user;
    console.log(`user -${usr}- connected`);

    player[socket.id] = {
        user: usr,
        x: 0,
        y: 0,
    };

    socket.on('disconnect', (reason) => {
        console.log(`user [${player[socket.id].user}: ${socket.id}] disconnected for: ${reason}`);
        delete player[socket.id]
        io.emit('updatePlayers', player);
    });

    socket.on("sendMsg", (msg) => {
        io.emit("newMsg", { user: player[socket.id].user, msg: msg });
    });
    
    io.emit('updatePlayers', player);
    console.log(player);
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});