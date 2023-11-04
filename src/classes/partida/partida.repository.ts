import { Repository } from "../../shared/repository.js";
import { Partida } from "./partida.entity.js";
import { db } from "../../shared/db/conn.js";
import { ObjectId } from "mongodb";

const sessions = db.collection<Partida>('sessions')

export class SessionRepository implements Repository<Partida>{
    public async findAll(): Promise<Partida[] | undefined> {
        return await sessions.find().toArray()
    }

    public async findOne(item: { id: string; }): Promise<Partida | undefined> {
        const _id = new ObjectId(item.id);
        return (await sessions.findOne({_id})) || undefined
    }

    public async add(item: Partida): Promise<Partida | undefined> {
        item._id=(await sessions.insertOne(item)).insertedId
        return item
    }

    public async update(item: Partida): Promise<Partida | undefined> {
        const {idSession, ... sanitizeSessionInput} = item
        const _id = new ObjectId(idSession)
        return await sessions.findOneAndUpdate({_id}, {$set: sanitizeSessionInput}, {returnDocument: 'after'}) || undefined
    }

    public async delete(item: { id: string; }): Promise<Partida | undefined> {
        const _id = new ObjectId(item.id)
        return (await sessions.findOneAndDelete({_id})) || undefined
    
    }
}