import 'reflect-metadata'
import express from 'express'
import { UserRouter } from './classes/usuario/usuario.routes.js'
import { SessionRouter } from './classes/partida/partida.routes.js'
import { NoteRouter } from './classes/carta/note.routes.js'
import { LogRouter } from './classes/logs/log.routes.js'
import cors from 'cors'
import { orm } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'

const app = express()
app.use(express.json())
// luego de los middlewares express

app.use((req, res, next) => {
    RequestContext.create(orm.em, next)
})

// antes de los del proyecto
app.use(cors())
app.use('/api/usuarios', UserRouter)
app.use('/api/tablas', SessionRouter)
app.use('/api/notas', NoteRouter)
app.use('/api/registros', LogRouter)


app.use((_, res) =>{
    return res.status(404).send({message:"Recurso no Encontrado"})
})

//await syncSchema() // solo en desarrollo

 const server = app.listen(3000, ()=> {
    console.log('Server up and running')
})


