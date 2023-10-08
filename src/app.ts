import express, { Request, Response, NextFunction } from 'express'
import { UserRouter } from './classes/usuario/usuario.routes.js'
import { SessionRouter } from './classes/partida/partida.routes.js'
import { CardRouter } from './classes/carta/carta.routes.js'

const app = express()
app.use(express.json())

app.use('/api/usuarios', UserRouter)
app.use('/api/partidas', SessionRouter)
app.use('/api/cartas', CardRouter)

app.use((_, res) =>{
    return res.status(404).send({message:"Recurso no Encontrado"})
})

app.listen(3000, ()=> {
    console.log('Server up and running')
})