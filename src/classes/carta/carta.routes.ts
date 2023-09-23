import { Router } from "express";
import { sanitizeCardInput, findAll, findOne, add } from "./carta.controller.js";

export const CardRouter = Router()

CardRouter.get('/', findAll)
CardRouter.get('/:id', findOne)
CardRouter.post('/', sanitizeCardInput, add)