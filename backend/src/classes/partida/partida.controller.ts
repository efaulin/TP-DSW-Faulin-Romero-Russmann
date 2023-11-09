import { Request, Response, NextFunction } from "express"
import { SessionRepository } from "./partida.repository.js"
import { Partida } from "./partida.entity.js"

const partidas = new SessionRepository()

function sanitizeSessionInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        idSession: req.body.idSession,
        sessionDate: req.body.sessionDate
    }

    next()
}

async function findAll(req: Request, res: Response){
    res.json(await partidas.findAll())
}

async function findOne(req: Request, res: Response){
    const id = req.params.id
    const partida = await partidas.findOne({id})
    if(!partida){
        return res.status(404).send({message:'Partida Not Found'})
    }
    res.json(partida)
}

async function add(req: Request, res: Response){
    const {idSession, sessionDate} = req.body.data
    const partida = new Partida (idSession, sessionDate)
    const nuevo = await partidas.add(partida)
    return res.status(201).send({message:'Partida creada Exitosamente'})
}

async function update(req: Request, res: Response){
    req.body.data.id = req.params.id
    const actualizado = await partidas.update(req.body.data)

    if(!actualizado){
        return res.status(404).send({message: "Partida no Encontrada"})
    }else{
        return res.status(200).send({message: "Datos de la partida actualizados correctamente"})
    }
}

export {sanitizeSessionInput, findAll, findOne, add, update}