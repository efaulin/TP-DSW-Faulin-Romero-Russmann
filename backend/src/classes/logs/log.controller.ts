import { Request, Response, NextFunction } from "express"
import { LogRepository } from "./log.repository.js"
import { Log } from "./log.entity.js"

const logs = new LogRepository()

function sanitizeCardInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        idLog: req.body.idLog,
        idUser: req.body.idUser,
        idSession: req.body.idSession,
        desc: req.body.desc
    }

    next()
}

async function findAll(_: Request, res: Response){
    res.json(await logs.findAll())
}

async function findOne(req: Request, res: Response){
    const id = req.params.id
    const log = await logs.findOne({id})
    if(!log){
        return res.status(404).send({message:'note Not Found'})
    }
    res.json(log)
}

async function add(req: Request, res: Response){
    const {idItem, idUser, idSession, desc} = req.body.data
    const log = new Log (idItem, idUser, idSession, desc)
    return res.status(201).send({message:'Registro creado Exitosamente'})
}

export {sanitizeCardInput, findAll, findOne, add}