import { Router } from "express";
import { sanitizeInput, findAll, findOne, add, update, remove, findByDesc } from "./partida.controller.js";

export const SessionRouter = Router()

SessionRouter.get('/', findAll)
SessionRouter.get('/:id', findOne)
SessionRouter.get('/buscar/:desc', findByDesc)
SessionRouter.post('/', sanitizeInput, add)
SessionRouter.put('/:id', sanitizeInput, update)
SessionRouter.delete('/:id', remove)
