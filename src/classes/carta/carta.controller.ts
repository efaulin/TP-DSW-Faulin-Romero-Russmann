import { Request, Response, NextFunction } from "express"
import { CartaRepository } from "./carta.repository.js"
import { Carta } from "./carta.entity.js"

const cartas = new CartaRepository()

function sanitizeCardInput(req: Request, res: Response, next: NextFunction){
    req.body.data={
        idCarta: req.body.idCarta,
        titulo: req.body.titulo,
        desc: req.body.desc,
        idTipo: req.body.idTipo,
        descTipo: req.body.descTipo
    }

    next()
}

function findAll(_: Request, res: Response){
    res.json(cartas.findAll())
}

function findOne(req: Request, res: Response){
    const id = req.params.id
    const carta = cartas.findOne({id})
    if(!carta){
        return res.status(404).send({message:'carta Not Found'})
    }
    res.json(carta)
}

function add(req: Request, res: Response){
    const {idCarta, titulo, desc, idTipo, descTipo} = req.body.data
    const carta = new Carta (idCarta, titulo, desc, idTipo, descTipo)
    const nuevo = cartas.add(carta)
    return res.status(201).send({message:'Carta creada Exitosamente'})
}

export {sanitizeCardInput, findAll, findOne, add}