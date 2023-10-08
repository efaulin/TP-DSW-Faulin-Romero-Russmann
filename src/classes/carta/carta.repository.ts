import { Repository } from "../../shared/repository.js";
import { Note} from "./carta.entity.js";
import { db } from "../../shared/db/conn.js";


const notesArray = [
    new Note(
        '01',
        'Oh, que veo aqui colega, si no es mas que el mismisimo Shadex quien te ofrece sus esmeraldas en señal de amistad, aunque todavia sois enemigos: +1 ATK -2 EVD',
    )
]

const notes = db.collection<Note>('notas')

export class NoteRepository implements Repository<Note>{
    public async findAll(): Promise<Note[] | undefined> {
        return await notes.find().toArray()
    }

    public async findOne(item: { id: string; }): Promise<Note | undefined> {
        return await notesArray.find((carta) => carta.idItem === item.id)
    }

    public async add(item: Note): Promise<Note | undefined> {
        await notesArray.push(item)
        return item
    }

    public async update(item: Note): Promise<Note | undefined> {
        const noteId = await notesArray.findIndex((carta) => carta.idItem === item.idItem)

        if(noteId !== -1){
            notesArray.splice(noteId, 1, item)
        }
        
        return notesArray[noteId]
    }

    public async delete(item: { id: string; }): Promise<Note | undefined> {
        const cartaId = await notesArray.findIndex((carta) => carta.idItem === item.id)
        if(cartaId !== -1){
            const borrado = notesArray[cartaId]
            notesArray.splice(cartaId, 1)
            return borrado
        }
    }
}