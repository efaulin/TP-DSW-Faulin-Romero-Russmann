import { Request, Response, NextFunction } from "express"
import { Log } from "./log.entity.js"


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
    res.status(500).json({message: 'No implementado'})
}

async function findOne(req: Request, res: Response){
    res.status(500).json({message: 'No implementado'})
        //return res.status(404).send({message:'Registro Not Found'})
}

async function add(req: Request, res: Response){
    res.status(500).json({message: 'No implementado'})
    //return res.status(201).send({message:'Registro creado Exitosamente'})
}

export {sanitizeCardInput, findAll, findOne, add}