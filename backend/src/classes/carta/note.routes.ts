import { Router } from "express";
import { sanitizeInput, findAll, findOne, add, update, remove, findBySession } from "./note.controller.js";

export const NoteRouter = Router()

NoteRouter.get('/', findAll)
NoteRouter.get('/:id', findOne)
NoteRouter.get('/buscar/:id', findBySession)
NoteRouter.post('/', sanitizeInput, add)
NoteRouter.put('/:id', sanitizeInput, update)
NoteRouter.delete('/:id', remove)