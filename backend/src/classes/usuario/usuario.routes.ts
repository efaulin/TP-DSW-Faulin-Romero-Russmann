import { Router } from "express";
import { sanitizeInput, findAll, findOne, add, update, remove} from "../usuario/usuario.controller.js";

export const UserRouter = Router()

UserRouter.get('/', findAll)
UserRouter.get('/:id', findOne)
UserRouter.post('/', sanitizeInput, add)
UserRouter.put('/:id', sanitizeInput, update)
UserRouter.delete('/:id', remove)