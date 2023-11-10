import { Router } from "express";
import { sanitizeCardInput, findAll, findOne, add, update, remove, findBySession } from "./note.controller.js";

export const NoteRouter = Router()

NoteRouter.get('/', findAll)
NoteRouter.get('/:id', findOne)
NoteRouter.get('/buscar/:id', findBySession)
NoteRouter.post('/:id', sanitizeCardInput, add)
NoteRouter.put('/:id', sanitizeCardInput, update)
NoteRouter.delete('/:id', remove)