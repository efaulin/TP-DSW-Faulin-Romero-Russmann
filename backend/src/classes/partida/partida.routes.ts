import { Router } from "express";
import { sanitizeSessionInput, findAll, findOne, add, update, remove, findByDesc } from "./partida.controller.js";

export const SessionRouter = Router()

SessionRouter.get('/', findAll)
SessionRouter.get('/:id', findOne)
SessionRouter.get('/buscar/:desc', findByDesc)
SessionRouter.post('/', sanitizeSessionInput, add)
SessionRouter.put('/:id', sanitizeSessionInput, update)
SessionRouter.delete('/:id', remove)
