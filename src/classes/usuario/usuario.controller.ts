import { Request, Response, NextFunction } from "express"
import { UserRepository } from "./usuario.repository.js"
import { Usuario } from "./usuario.entity.js"

const usuarios = new UserRepository()

function sanitizeUserInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        idUser: req.body.idUser,
        nick: req.body.nick,
        nomUser: req.body.nomUser,
        passwd: req.body.passwd,
        EXP: req.body.EXP,
        userType: req.body.userType,
        Mazo: req.body.Mazo
    }

    next()
}

function findAll(_: Request, res: Response) {
    res.json(usuarios.findAll())
}

function findOne(req: Request, res: Response){
    const id = req.params.id
    const personaje = usuarios.findOne({id})
    if(!personaje){
        return res.status(404).send({message:'Personaje Not Found'})
    }
    res.json(personaje)
}

function add(req: Request, res: Response){
    const {idUser, nick, nomUser, passwd, EXP, userType, Mazo} = req.body.data
    const usuario = new Usuario (idUser, nick, nomUser, passwd, EXP, userType, Mazo)
    const nuevo = usuarios.add(usuario)
    return res.status(201).send({message:'Personaje creado Exitosamente'})
}

function update(req: Request, res: Response){
    req.body.data.id = req.params.id
    const actualizado = usuarios.update(req.body.data)

    if(!actualizado){
        return res.status(404).send({message: "Personaje no Encontrado"})
    }else{
        return res.status(200).send({message: "Datos del personaje actualizados correctamente"})
    }
}

 function remove(req: Request, res: Response){
    const id = req.params.id
    const borrado = usuarios.delete({id})

    if(!borrado){
        return res.status(404).send({message: "Personaje no Encontrado"})
    }else{
        return res.status(200).send({message: "Datos del personaje borrados correctamente"})
    }
}

export {sanitizeUserInput, findAll, findOne, add, update, remove}