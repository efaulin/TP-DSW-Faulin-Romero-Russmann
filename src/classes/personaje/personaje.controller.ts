import { Request, Response, NextFunction } from "express"
import { PersRepository} from "./personaje.repository.js"
import { Personaje } from "./personaje.entity.js"

const personajes = new PersRepository

function sanitizePersInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        idPers: req.body.idPers,
        nomPers: req.body.nomPers,
        desc: req.body.desc,
        HP: req.body.HP,
        ATK: req.body.ATK,
        DEF: req.body.DEF,
        EVD: req.body.EVD,
        VD: req.body.VD,
        REC: req.body.REC
    }

    next()
}

function findAll(_: Request, res: Response) {
    res.json(personajes.findAll)
}

function findOne(req: Request, res: Response){
    const id = req.params.id
    const personaje = personajes.findOne({id})
    if(!personaje){
        return res.status(404).send({message:'Personaje Not Found'})
    }
    res.json(personaje)
}

function add(req: Request, res: Response){
    const {idPers, nomPers, desc, HP, ATK, EVD, DEF, VD, REC} = req.body.data
    const personaje = new Personaje (idPers, nomPers, desc, HP, ATK, EVD, DEF, VD, REC)
    const nuevo = personajes.add(personaje)
    return res.status(201).send({message:'Personaje creado Exitosamente'})
}

function update(req: Request, res: Response){
    req.body.data.id = req.params.id
    const actualizado = personajes.update(req.body.data)

    if(!actualizado){
        return res.status(404).send({message: "Personaje no Encontrado"})
    }else{
        return res.status(200).send({message: "Datos del personaje actualizados correctamente"})
    }
}

 function remove(req: Request, res: Response){
    const id = req.params.id
    const borrado = personajes.delete({id})

    if(!borrado){
        return res.status(404).send({message: "Personaje no Encontrado"})
    }else{
        return res.status(200).send({message: "Datos del personaje borrados correctamente"})
    }
}

export {sanitizePersInput, findAll, findOne, add, update, remove}