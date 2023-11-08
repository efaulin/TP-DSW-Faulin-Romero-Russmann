import express, { Request, Response, NextFunction } from 'express'
import { UserRouter } from './classes/usuario/usuario.routes.js'
import { SessionRouter } from './classes/partida/partida.routes.js'
import { NoteRouter } from './classes/carta/note.routes.js'
import { LogRouter } from './classes/logs/log.routes.js'

const app = express()
app.use(express.json())

app.use('/api/usuarios', UserRouter)
app.use('/api/tablas', SessionRouter)
app.use('/api/notas', NoteRouter)
app.use('/api/registros', LogRouter)

app.use((_, res) =>{
    return res.status(404).send({message:"Recurso no Encontrado"})
})

app.listen(3000, ()=> {
    console.log('Server up and running')
})