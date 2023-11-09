import { Request, Response, NextFunction } from "express"
import { NoteRepository } from "./note.repository.js"
import { Note } from "./note.entity.js"

const notes = new NoteRepository()

function sanitizeCardInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        idItem: req.body.idItem,
        idUser: req.body.idUser,
        idSession: req.body.idSession,
        desc: req.body.desc,
        position: req.body.position
    }

    next()
}

async function findAll(_: Request, res: Response){
    res.json(await notes.findAll())
}

async function findOne(req: Request, res: Response){
    const id = req.params.id
    const note = await notes.findOne({id})
    if(!note){
        return res.status(404).send({message:'note Not Found'})
    }
    res.json(note)
}

async function add(req: Request, res: Response){
    const {idItem, idUser, idSession, desc, position} = req.body.data
    const note = new Note (idItem, idUser, idSession, desc, position)
    const nuevo = await notes.add(note)
    return res.status(201).send({message:'Nota creada Exitosamente'})
}

export {sanitizeCardInput, findAll, findOne, add}