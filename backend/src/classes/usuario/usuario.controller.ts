import { Request, Response, NextFunction } from "express"
import { orm } from "../../shared/db/orm.js"
import { Usuario } from "./usuario.entity.js"

const em = orm.em

function sanitizeInput( req: Request, res: Response, next: NextFunction) {
    req.body.data = {
      name: req.body.name,
      passwd: req.body.passwd,
      mail: req.body.mail
    }
    //more checks here
  
    Object.keys(req.body.data).forEach((key) => {
      if (req.body.data[key] === undefined) {
        delete req.body.data[key]
      }
    })
    next()
  }

async function findAll(_: Request, res: Response) {
    try{
        const usuarios = await em.find(Usuario, {})
        res.status(200).json(usuarios)
    } catch (error: any){
        res.status(500).json({message: 'Error!'})
    }
}

async function findOne(req: Request, res: Response){
    try{
        const id: any = req.params.id
    const usuario = await em.findOneOrFail(Usuario, { name: id })
    res.status(200).json(usuario)
    } catch (error: any){
        res.status(404).send({message:'Usuario Not Found'})
    }
}

async function add(req: Request, res: Response){
    try{
        const usuario = em.create(Usuario, req.body.data)
        await em.flush()
        res.status(201).send({message:'Usuario creado Exitosamente'})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res: Response){
    try{
        const id: any = req.params.id
        const usuario = await em.findOneOrFail(Usuario, { id })
        em.assign(usuario, req.body)
        em.flush()
        return res.status(200).send({message: "Datos del Usuario actualizados correctamente"})
    } catch(error: any) {
        return res.status(500).send({message: "Error al Actualizar"})
    }
 
}

 async function remove(req: Request, res: Response){
    try{
        const id: any = req.params.id
        const usuario = await em.findOneOrFail(Usuario, { id })
        await em.removeAndFlush(usuario)
        res.status(200).send({message: "Usuario borrado correctamente"})
    } catch(error: any){
        res.status(500).send({message: "Error al Borrar"})
    }
}

async function validateUser(req: Request, res: Response){
    try{
        const usr: any = req.params.usr
        const pwd: any = req.params.pwd
    const usuario = await em.findOneOrFail(Usuario, { name: usr , passwd: pwd})
    res.status(200).json(usuario)
    } catch (error: any){
        res.status(404).send({message:'Usuario Not Found'})
    }
}

export {sanitizeInput, findAll, findOne, add, update, remove, validateUser}