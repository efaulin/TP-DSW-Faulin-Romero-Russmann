import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Tablero } from "./partida.entity.js"

const em = orm.em

function sanitizeInput( req: Request, res: Response, next: NextFunction) {
    req.body.data = {
      name: req.body.name,
      desc: req.body.desc,
      notes: req.body.notes
    }
    //more checks here
  
    Object.keys(req.body.data).forEach((key) => {
      if (req.body.data[key] === undefined) {
        delete req.body.data[key]
      }
    })
    next()
  }

async function findAll(req: Request, res: Response){
    try{
        const tablas = await em.find(Tablero, {})
        res.status(200).json(tablas)
    } catch (error: any){
        res.status(500).json({message: 'Error!'})
    }
}

async function findOne(req: Request, res: Response){
    try{
        const id: any = req.params.id
    const tablero = await em.findOneOrFail(Tablero, { id: id })
    res.status(200).json(tablero)
    } catch (error: any){
        res.status(404).send({message:'Tablero Not Found'})
    }
}

async function add(req: Request, res: Response){
    try{
        const tablero = em.create(Tablero, req.body.data)
        await em.flush()
        res.status(201).send({message:'Tablero creado Exitosamente'})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res: Response){
    try{
        const id: any = req.params.id
        const tablero = await em.findOneOrFail(Tablero, { id })
        em.assign(tablero, req.body)
        em.flush()
        return res.status(200).send({message: "Datos del Tablero actualizados correctamente"})
    } catch(error: any) {
        return res.status(500).send({message: "Error al Actualizar"})
    }
}

async function remove(req: Request, res: Response){
    try{
        const id: any = req.params.id
        const tablero = await em.findOneOrFail(Tablero, { id })
        await em.removeAndFlush(tablero)
        res.status(200).send({message: "Tablero borrado correctamente"})
    } catch(error: any){
        res.status(500).send({message: "Error al Borrar"})
    }
}

async function findByDesc(req: Request, res: Response){
    try{
        const tablas = await em.find(Tablero, {name: new RegExp(req.params.desc, 'i')})
        res.status(200).json(tablas)
    } catch (error: any){
        res.status(500).json({message: 'Error!'})
    }
}

export {sanitizeInput, findAll, findOne, add, update, remove, findByDesc}