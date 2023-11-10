import { Router } from "express";
import { sanitizeCardInput, findAll, findOne, add, update, remove } from "./note.controller.js";

export const NoteRouter = Router()

NoteRouter.get('/', findAll)
NoteRouter.get('/:id', findOne)
NoteRouter.post('/', sanitizeCardInput, add)
NoteRouter.put('/:id', sanitizeCardInput, update)
NoteRouter.delete('/:id', remove)