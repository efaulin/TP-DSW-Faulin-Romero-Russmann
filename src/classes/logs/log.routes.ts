import { Router } from "express";
import { sanitizeCardInput, findAll, findOne, add } from "./log.controller.js";

export const LogRouter = Router()

LogRouter.get('/', findAll)
LogRouter.get('/:id', findOne)
LogRouter.post('/', sanitizeCardInput, add)