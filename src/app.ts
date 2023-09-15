import express from 'express'
import { Personaje, Usuario, Carta, Partida } from './classes.js'


const app = express()
app.use(express.json())

const personajes= [
    new Personaje(
        '01',
        'Spike Spinetta',
        'Estrella de rock del espacio espacial',
        100,
        13,
        8,
        4,
        5,
        6),
    new Personaje(
        '02',
        'Carlos Castañeda',
        'Protagonista de las abenturas de Don Juan, pero tambien es el bastardo que mato a mi hermano',
        150,
        19,
        5,
        8,
        5,
        4),
    ]

const usuarios = [
    new Usuario(
        '01',
        'pedro.lolas',
        'carlosperez',
        'pepito043',
        300,
        1,
        []
    )
]

const cartas = [
    new Carta(
        '01',
        'Toma, los tengo yo',
        'Oh, que veo aqui colega, si no es mas que el mismisimo Shadex quien te ofrece sus esmeraldas en señal de amistad, aunque todavia sois enemigos: +1 ATK -2 EVD',
        '1',
        'Buff'
    )
]

const partidas =[
    new Partida(
        '00',
        '2023-09-14',
        'Finished',
        15000,
        'Kyoto Realms'
    )
]

app.get('/api/personajes', (req, res) => {
    res.json(personajes)
})

app.get('/api/personajes/:id', (req, res) => {
    const personaje = personajes.find((personaje) => personaje.idPers === req.params.id)
    if(!personaje){
        res.status(404).send({message:'Personaje Not Found'})
    }
    res.json(personaje)
})

app.post('/api/personajes', (req, res) => {
    const {idPers, nomPers, desc, HP, ATK, EVD, DEF, VD, REC} = req.body
    const personaje = new Personaje (idPers, nomPers, desc, HP, ATK, EVD, DEF, VD, REC)
    personajes.push(personaje)
    res.status(201).send({message:'Personaje creado Exitosamente'})
})

app.put('/api/personajes/:id', (req, res) => {
    const personajeId = personajes.findIndex((personaje) => personaje.idPers === req.params.id)

    if(personajeId === -1){
        res.status(404).send({message: "Personaje no Encontrado"})
    }else{
        const input ={
            idPers: req.body.idPers,
            nomPers: req.body.nomPers,
            desc: req.body.desc,
            HP: req.body.HP,
            ATK: req.body.ATK,
            DEF: req.body.DEF,
            EVD: req.body.EVD,
            VD: req.body.VD,
            REC: req.body.REC
        }
        personajes.splice(personajeId, 1, input)

       res.status(200).send({message: "Datos del personaje actualizados correctamente"})
    }
})

app.delete('/api/personajes/:id', (req, res) => {
    const personajeId = personajes.findIndex((personaje) => personaje.idPers === req.params.id)
     if(personajeId === -1){
        res.status(404).send({message:"Personaje no Encontrado"})
     }

     personajes.splice(personajeId, 1)
     res.status(200).send({message: "Personaje borrado Correctamente"})
})

app.get('/api/user/:id', (req, res) => {
    const usuario = usuarios.find((usuario) => usuario.idUser === req.params.id)
    if(!usuario){
        res.status(404).send({message:'Usuario Not Found'})
    }
    res.json(usuario)
})

app.post('/api/user', (req, res) => {
    const {idUser, nick, nomUser, passwd, EXP, userType, Mazo} = req.body
    const usuario = new Usuario (idUser, nick, nomUser, passwd, EXP, userType, Mazo)
    usuarios.push(usuario)
    res.status(201).send({message:'Usuario creado Exitosamente'})
})

app.put('/api/user/:id', (req, res) => {
    const usuarioId = usuarios.findIndex((usuario) => usuario.idUser === req.params.id)

    if(usuarioId === -1){
        res.status(404).send({message: "usuario no Encontrado"})
    }else{
        const input ={
            idUser: req.body.idUser,
            nick: req.body.nick,
            nomUser: req.body.nomUser,
            passwd: req.body.passwd,
            EXP: req.body.EXP,
            userType: req.body.userType,
            Mazo: req.body.Mazo
        }
        usuarios.splice(usuarioId, 1, input)

       res.status(200).send({message: "Datos del usuario actualizados correctamente"})
    }
})

app.delete('/api/user/:id', (req, res) => {
    const usuarioId = usuarios.findIndex((usuario) => usuario.idUser === req.params.id)
     if(usuarioId === -1){
        res.status(404).send({message:"usuario no Encontrado"})
     }

     usuarios.splice(usuarioId, 1)
     res.status(200).send({message: "usuario borrado Correctamente"})
})

app.get('/api/cartas', (req, res) => {
    res.json(cartas)
})

app.get('/api/cartas/:id', (req, res) => {
    const carta = cartas.find((carta) => carta.idCarta === req.params.id)
    if(!carta){
        res.status(404).send({message:'carta Not Found'})
    }
    res.json(carta)
})

app.post('/api/cartas', (req, res) => {
    const {idCarta, titulo, desc, idTipo, descTipo} = req.body
    const carta = new Carta (idCarta, titulo, desc, idTipo, descTipo)
    cartas.push(carta)
    res.status(201).send({message:'Carta creada Exitosamente'})
})

app.get('/api/partidas', (req, res) => {
    res.json(partidas)
})

app.get('/api/partidas/:id', (req, res) => {
    const partida = partidas.find((partida) => partida.idSession === req.params.id)
    if(!partida){
        res.status(404).send({message:'Partida Not Found'})
    }
    res.json(partida)
})

app.post('/api/partidas', (req, res) => {
    const {idSession, sessionDate, sessionStatus, duration, scenario} = req.body
    const partida = new Partida (idSession, sessionDate, sessionStatus, duration, scenario)
    partidas.push(partida)
    res.status(201).send({message:'Partida creada Exitosamente'})
})

app.put('/api/partidas/:id', (req, res) => {
    const partidaId = partidas.findIndex((partida) => partida.idSession === req.params.id)

    if(partidaId === -1){
        res.status(404).send({message: "Partida no Encontrada"})
    }else{
        const input ={
            idSession: req.body.idSession,
            sessionDate: req.body.sessionDate,
            sessionStatus: req.body.sessionStatus,
            duration: req.body.duration,
            scenario: req.body.scenario,
        }
        partidas.splice(partidaId, 1, input)

       res.status(200).send({message: "Datos de la partida actualizados correctamente"})
    }
})

app.listen(3000, ()=> {
    console.log('Server up and running')
})