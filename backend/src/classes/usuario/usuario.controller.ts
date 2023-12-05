import { Request, Response, NextFunction } from "express"
import { Usuario } from "./usuario.entity.js"


function sanitizeUserInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        idUser: req.body.idUser,
        nick: req.body.nick,
        nomUser: req.body.nomUser,
        passwd: req.body.passwd,
        mail: req.body.mail
    }

    next()
}

async function findAll(_: Request, res: Response) {
    res.status(500).json({message: 'No implementado'})
}

async function findOne(req: Request, res: Response){
    res.status(500).json({message: 'No implementado'})
        //return res.status(404).send({message:'Personaje Not Found'})
}

async function add(req: Request, res: Response){
    res.status(500).json({message: 'No implementado'})
    //return res.status(201).send({message:'Personaje creado Exitosamente'})
}

async function update(req: Request, res: Response){
    res.status(500).json({message: 'No implementado'})
        //return res.status(404).send({message: "Personaje no Encontrado"})

        //return res.status(200).send({message: "Datos del personaje actualizados correctamente"})
 
}

 async function remove(req: Request, res: Response){
    res.status(500).json({message: 'No implementado'})
        //return res.status(404).send({message: "Personaje no Encontrado"})

        //return res.status(200).send({message: "Datos del personaje borrados correctamente"})
}

export {sanitizeUserInput, findAll, findOne, add, update, remove}