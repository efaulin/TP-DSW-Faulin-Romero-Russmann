import { Router } from "express";
import { sanitizeNoteInput, findAll, findOne, add, update, remove, findBySession } from "./note.controller.js";

export const NoteRouter = Router()

NoteRouter.get('/', findAll)
NoteRouter.get('/:id', findOne)
NoteRouter.get('/buscar/:id', findBySession)
NoteRouter.post('/', sanitizeNoteInput, add)
NoteRouter.put('/:id', sanitizeNoteInput, update)
NoteRouter.delete('/:id', remove)