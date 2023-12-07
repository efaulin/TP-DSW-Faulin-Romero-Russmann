import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Note } from "./note.entity.js"
import { Tablero } from "../partida/partida.entity.js"

const em = orm.em

function sanitizeInput( req: Request, res: Response, next: NextFunction) {
    req.body.data={
        board: req.body.board,
        desc: req.body.desc,
        position: req.body.position
    }
    //more checks here
  
    Object.keys(req.body.data).forEach((key) => {
      if (req.body.data[key] === undefined) {
        delete req.body.data[key]
      }
    })
    next()
  }

async function findAll(_: Request, res: Response){
    try{
        const notas = await em.find(Note, {})
        res.status(200).json(notas)
    } catch (error: any){
        res.status(500).json({message: 'Error!'})
    }
}

async function findOne(req: Request, res: Response){
    try{
        const id: any = req.params.id
    const nota = await em.findOneOrFail(Note, { id: id })
    res.status(200).json(nota)
    } catch (error: any){
        res.status(404).send({message:'Nota Not Found'})
    }
}

async function add(req: Request, res: Response){
    try{
        const tablero = await em.findOneOrFail(Tablero, { id: req.body.board})
        const nota = em.create(Note, req.body.data)
        await em.flush()
        res.status(201).send({message:'Nota creada Exitosamente'})
    } catch (error: any){
        res.status(500).json({message: 'Error!'})
    }
}

async function update(req: Request, res: Response){
    try{
        const id: any = req.params.id
        const nota = await em.findOneOrFail(Note, { id })
        em.assign(nota, req.body)
        em.flush()
        return res.status(200).send({message: "Datos de la nota actualizados correctamente"})
    } catch(error: any) {
        return res.status(500).send({message: "Error al Actualizar"})
    }
}

async function remove(req: Request, res: Response){
    try{
        const id: any = req.params.id
        const nota = await em.findOneOrFail(Note, { id })
        await em.removeAndFlush(nota)
        res.status(200).send({message: "Nota borrada correctamente"})
    } catch(error: any){
        res.status(500).send({message: "Error al Borrar"})
    }
}

async function findBySession(req: Request, res: Response){ //implementar desde el tablero
    try{
        const notas = await em.find(Note, {board: req.params.id})
        res.status(200).json(notas)
    } catch (error: any){
        res.status(500).json({message: 'Error!'})
    }
}

export {sanitizeInput, findAll, findOne, add, update, remove, findBySession}