/*
generalRouter.route('/')
    .get((req, res) => {
        -> obtener recurso
    })
    .post((req, res) => {
        -> crear recurso
    })
    .delete((req, res) => {
        -> borrar recurso
    })
    .put|patch((req, res) => {
        -> modificar recurso
    });
*/

import { Router, Response, Request } from "express";
import * as fs from "node:fs";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename) + "/../";
const appleJuiceDir = path.resolve(__filename) + "/../../../";
export const generalRouter = Router();

generalRouter.route('/').get((req, res) => {
    res.sendFile('inicio.html', { root: appleJuiceDir + '/src/html/' })
});

generalRouter.route('/chat').post((req, res) => {
    console.log(`LogIn: ` + req.query.user);
    res.sendFile('match.html', { root: appleJuiceDir + '/src/html/' });
});

generalRouter.post('/lobbys', (req, res) => {
    console.log(`LogIn: ` + req.body.user);
    res.sendFile('roomList.html', { root: appleJuiceDir + '/src/html/' });
});

generalRouter.route('/match')
    .get((req, res) => {
        //Unirse a una sala
        console.log(`User [${req.query.user}] wants to join to [${req.query.idMatch}]`);
        res.sendFile('match.html', { root: appleJuiceDir + '/src/html/' });
    })
    .post((req, res) => {
        //Crear una sala
        console.log(`User [${req.body.user}] wants to create a lobby`);
        //Probar salas con chat privados
    })

//Routing para envio de archivos .js
function filePass(path: fs.PathLike, req: Request, res: Response){
    console.log("GET -> " + path.toString());
    try {
        if (fs.existsSync(path)) {
            res.status(200);
            res.sendFile(path.toString());
        }
        else {
            res.status(404);
            res.type('txt').send('Not found ¯\_(ツ)_/¯');
        }
    }
    catch (err) {
        console.error(err);
        res.status(500);
        res.send(err);
        return;
    }
}

generalRouter.get('/entity/:file', (req, res) => {
    var tmpPath = path.resolve(__dirname + '/entity/' + req.params.file + '.js');
    filePass(tmpPath, req, res);
});

generalRouter.get('/script/:file', (req, res) => {
    var tmpPath = path.resolve(__dirname + '/script/' + req.params.file + '.js');
    filePass(tmpPath, req, res);
});

generalRouter.get('/socket.io/socket.io.js', (req, res) => {
    var tmpPath = path.resolve(appleJuiceDir + "/node_modules/socket.io-client/dist/socket.io.js");
    filePass(tmpPath, req, res);
});

generalRouter.get('/socket.io/socket.io.js.map', (req, res) => {
    var tmpPath = path.resolve(appleJuiceDir + "/node_modules/socket.io-client/dist/socket.io.js.map");
    filePass(tmpPath, req, res);
});

generalRouter.get('/bundle', (req, res) => {
    var tmpPath = path.resolve(appleJuiceDir + "/public/bundle.js");
    filePass(tmpPath, req, res);
});