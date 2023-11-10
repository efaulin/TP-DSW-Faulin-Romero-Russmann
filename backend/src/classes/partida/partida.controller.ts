import { Request, Response, NextFunction } from "express"
import { SessionRepository } from "./partida.repository.js"
import { Tablero } from "./partida.entity.js"

const tableros = new SessionRepository()

function sanitizeSessionInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        sessionId: req.body.sessionId,
        sessionDate: req.body.sessionDate,
        sessionName: req.body.sessionName
    }

    next()
}

async function findAll(req: Request, res: Response){
    res.json(await tableros.findAll())
}

async function findOne(req: Request, res: Response){
    const id = req.params.id
    const partida = await tableros.findOne({id})
    if(!partida){
        return res.status(404).send({message:'Tablero Not Found'})
    }
    res.json(partida)
}

async function add(req: Request, res: Response){
    const {sessionName} = req.body.data
    const partida = new Tablero (sessionName)
    const nuevo = await tableros.add(partida)
    return res.status(201).send({message:'Tablero creado Exitosamente'})
}

async function update(req: Request, res: Response){
    req.body.data.sessionId = req.params.id
    const actualizado = await tableros.update(req.body.data)

    if(!actualizado){
        return res.status(404).send({message: "Tablero no Encontrado"})
    }else{
        return res.status(200).send({message: "Datos del Tablero actualizados correctamente"})
    }
}

async function remove(req: Request, res: Response){
    const id = req.params.id
    const borrado = await tableros.delete({id})

    if(!borrado){
        return res.status(404).send({message: "Tablero no Encontrado"})
    }else{
        return res.status(200).send({message: "Tablero borrado correctamente"})
    }
}

async function findByDesc(req: Request, res: Response){
    const desc = req.params.desc
    res.json(await tableros.findByDesc({desc}))
}

export {sanitizeSessionInput, findAll, findOne, add, update, remove, findByDesc}