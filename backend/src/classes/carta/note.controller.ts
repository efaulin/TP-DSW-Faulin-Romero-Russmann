import { Request, Response, NextFunction } from "express"
import { NoteRepository } from "./note.repository.js"
import { Note } from "./note.entity.js"

const notes = new NoteRepository()

function sanitizeCardInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        idItem: req.body.idItem,
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
        return res.status(404).send({message:'Nota no Encontrada'})
    }
    res.json(note)
}

async function add(req: Request, res: Response){
    const {idItem, idSession, desc, position} = req.body.data
    const note = new Note (idItem, idSession, desc, position)
    const nuevo = await notes.add(note)
    return res.status(201).send({message:'Nota creada Exitosamente'})
}

async function update(req: Request, res: Response){
    req.body.data.idItem = req.params.id
    const actualizado = await notes.update(req.body.data)

    if(!actualizado){
        return res.status(404).send({message: "Nota no Encontrada"})
    }else{
        return res.status(200).send({message: "Datos de la nota actualizados correctamente"})
    }
}

async function remove(req: Request, res: Response){
    const id = req.params.id
    const borrado = await notes.delete({id})

    if(!borrado){
        return res.status(404).send({message: "Nota no Encontrada"})
    }else{
        return res.status(200).send({message: "Nota borrada correctamente"})
    }
}

export {sanitizeCardInput, findAll, findOne, add, update, remove}