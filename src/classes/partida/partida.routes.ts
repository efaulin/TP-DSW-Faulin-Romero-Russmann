import { Router } from "express";
import { sanitizeSessionInput, findAll, findOne, add, update } from "./partida.controller.js";

export const SessionRouter = Router()

SessionRouter.get('/', findAll)
SessionRouter.get('/:id', findOne)
SessionRouter.post('/', sanitizeSessionInput, add)
SessionRouter.put('/:id', sanitizeSessionInput, update)
