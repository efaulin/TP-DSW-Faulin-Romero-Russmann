import { Repository } from "../../shared/repository.js";
import { Note} from "./carta.entity.js";
import { db } from "../../shared/db/conn.js";
import { ObjectId } from "mongodb";

const notes = db.collection<Note>('notas')

export class NoteRepository implements Repository<Note>{
    public async findAll(): Promise<Note[] | undefined> {
        return await notes.find().toArray()
    }

    public async findOne(item: { id: string; }): Promise<Note | undefined> {
        const _id = new ObjectId(item.id);
        return (await notes.findOne({_id})) || undefined
    }

    public async add(item: Note): Promise<Note | undefined> {
        item._id=(await notes.insertOne(item)).insertedId
        return item
    }

    public async update(item: Note): Promise<Note | undefined> {
        const {idItem, ... sanitizeCardInput} = item
        const _id = new ObjectId(idItem)
        return await notes.findOneAndUpdate({_id}, {$set: sanitizeCardInput}, {returnDocument: 'after'}) || undefined
    }

    public async delete(item: { id: string; }): Promise<Note | undefined> {
        const _id = new ObjectId(item.id)
        return (await notes.findOneAndDelete({_id})) || undefined
    }
}