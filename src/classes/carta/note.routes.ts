import { Router } from "express";
import { sanitizeCardInput, findAll, findOne, add } from "./note.controller.js";

export const NoteRouter = Router()

NoteRouter.get('/', findAll)
NoteRouter.get('/:id', findOne)
NoteRouter.post('/', sanitizeCardInput, add)