import { Repository } from "../../shared/repository.js";
import { Tablero } from "./partida.entity.js";
import { db } from "../../shared/db/conn.js";
import { ObjectId } from "mongodb";

const sessions = db.collection<Tablero>('sessions')

export class SessionRepository implements Repository<Tablero>{
    public async findAll(): Promise<Tablero[] | undefined> {
        return await sessions.find().toArray()
    }

    public async findOne(item: { id: string; }): Promise<Tablero | undefined> {
        //const _id = new ObjectId(item.id); consultar con el profe
        return (await sessions.findOne({sessionId: item.id})) || undefined
    }

    public async add(item: Tablero): Promise<Tablero | undefined> {
        item.sessionId = (await (await sessions.find().toArray()).length.toString())
        item.sessionDate = new Date(Date.now()).toDateString()
        item._id=(await sessions.insertOne(item)).insertedId
        return item
    }

    public async update(item: Tablero): Promise<Tablero | undefined> {
        const {sessionId, ... sanitizeSessionInput} = item

        //const _id = new ObjectId(sessionId) preguntar al profe

        return await sessions.findOneAndUpdate({sessionId}, {$set: sanitizeSessionInput}, {returnDocument: 'after'}) || undefined
    }

    public async delete(item: { id: string; }): Promise<Tablero | undefined> {
        //const _id = new ObjectId(item.id)
        return (await sessions.findOneAndDelete({sessionId: item.id})) || undefined
    
    }

    public async findByDesc(item: {desc: string}): Promise<Tablero[] | undefined> {
        return await sessions.find( { sessionName: new RegExp(item.desc, 'i') }).toArray()
    }
}