import { Router } from "express";
import { sanitizePersInput, findAll, findOne, add, update, remove} from "../personaje/personaje.controller.js";

export const PersRouter = Router()

PersRouter.get('/', findAll)
PersRouter.get('/:id', findOne)
PersRouter.post('/', sanitizePersInput, add)
PersRouter.put('/:id', sanitizePersInput, update)
PersRouter.delete('/:id', remove)
