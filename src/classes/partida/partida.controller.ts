import { Request, Response, NextFunction } from "express"
import { SessionRepository } from "./partida.repository.js"
import { Partida } from "./partida.entity.js"

const partidas = new SessionRepository

function sanitizeSessionInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        idSession: req.body.idSession,
        sessionDate: req.body.sessionDate,
        sessionStatus: req.body.sessionStatus,
        duration: req.body.duration,
        scenario: req.body.scenario,
    }

    next()
}

function findAll(req: Request, res: Response){
    res.json(partidas)
}

function findOne(req: Request, res: Response){
    const id = req.params.id
    const partida = partidas.findOne({id})
    if(!partida){
        return res.status(404).send({message:'Partida Not Found'})
    }
    res.json(partida)
}

function add(req: Request, res: Response){
    const {idSession, sessionDate, sessionStatus, duration, scenario} = req.body.data
    const partida = new Partida (idSession, sessionDate, sessionStatus, duration, scenario)
    const nuevo = partidas.add(partida)
    return res.status(201).send({message:'Partida creada Exitosamente'})
}

function update(req: Request, res: Response){
    req.body.data.id = req.params.id
    const actualizado = partidas.update(req.body.data)

    if(!actualizado){
        return res.status(404).send({message: "Partida no Encontrada"})
    }else{
        return res.status(200).send({message: "Datos de la partida actualizados correctamente"})
    }
}

export {sanitizeSessionInput, findAll, findOne, add, update}