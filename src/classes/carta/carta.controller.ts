import { Request, Response, NextFunction } from "express"
import { NoteRepository } from "./carta.repository.js"
import { Note } from "./carta.entity.js"

const notes = new NoteRepository()

function sanitizeCardInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        idItem: req.body.idItem,
        desc: req.body.desc
    }

    next()
}

async function findAll(_: Request, res: Response){
    res.json(await notes.findAll())
}

async function findOne(req: Request, res: Response){
    const id = req.params.id
    const carta = await notes.findOne({id})
    if(!carta){
        return res.status(404).send({message:'note Not Found'})
    }
    res.json(carta)
}

async function add(req: Request, res: Response){
    const {idItem, desc} = req.body.data
    const carta = new Note (idItem, desc)
    const nuevo = await notes.add(carta)
    return res.status(201).send({message:'Nota creada Exitosamente'})
}

export {sanitizeCardInput, findAll, findOne, add}