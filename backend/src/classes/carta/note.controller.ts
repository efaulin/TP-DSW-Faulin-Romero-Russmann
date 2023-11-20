import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Note } from "./note.entity.js"

const em = orm.em

function sanitizeNoteInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        tablero: req.body.tablero,
        desc: req.body.desc,
        position: req.body.position
    }

    next()
}

async function findAll(_: Request, res: Response){
    try{
        const notas = await em.find(Note, {}, {populate: ['tablero']})
        res.status(200).json(notas)
    } catch (error: any){
        res.status(500).json({message: 'Error!'})
    }
}

async function findOne(req: Request, res: Response){
    try{
        const id: any = req.params.id
    const nota = await em.findOneOrFail(Note, { id: id }, {populate: ['tablero']})
    res.status(200).json(nota)
    } catch (error: any){
        res.status(404).send({message:'Nota Not Found'})
    }
}

async function add(req: Request, res: Response){
    try{
        const nota = em.create(Note, req.body.sanitizeNoteInput)
        await em.flush()
        res.status(201).send({message:'Nota creada Exitosamente'})
    } catch (error: any){
        res.status(500).json(error.message)
    }
}

async function update(req: Request, res: Response){
    try{
        const id: any = req.params.id
        const nota = em.getReference(Note, id)
        em.assign(nota, req.body)
        em.flush()
        return res.status(200).send({message: "Datos de la nota actualizados correctamente"})
    } catch(error: any) {
        return res.status(404).send({message: "Nota no Encontrada"})
    }
}

async function remove(req: Request, res: Response){
    try{
        const id: any = req.params.id
        const nota = em.getReference(Note, id)
        await em.removeAndFlush(nota)
        res.status(200).send({message: "Nota borrada correctamente"})
    } catch(error: any){
        res.status(404).send({message: "Nota no Encontrada"})
    }
}

async function findBySession(req: Request, res: Response){ //implementar desde el tablero
    try{
        const notas = await em.find(Note, {})
        res.status(200).json(notas)
    } catch (error: any){
        res.status(500).json({message: 'Error!'})
    }
}

export {sanitizeNoteInput, findAll, findOne, add, update, remove, findBySession}