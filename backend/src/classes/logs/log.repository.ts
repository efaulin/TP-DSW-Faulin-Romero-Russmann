import { Repository } from "../../shared/repository.js";
import { Log } from "./log.entity.js";
import { db } from "../../shared/db/conn.js";
import { ObjectId } from "mongodb";

const logs = db.collection<Log>('registros')

export class LogRepository implements Repository<Log>{
    public async findAll(): Promise<Log[] | undefined> {
        return await logs.find().toArray()
    }

    public async findOne(item: { id: string; }): Promise<Log | undefined> {
        const _id = new ObjectId(item.id);
        return (await logs.findOne({_id})) || undefined
    }

    public async add(item: Log): Promise<Log | undefined> {
        item._id=(await logs.insertOne(item)).insertedId
        return item
    }

    public async update(item: Log): Promise<Log | undefined> {
        const {idLog, ... sanitizeCardInput} = item
        const _id = new ObjectId(idLog)
        return await logs.findOneAndUpdate({_id}, {$set: sanitizeCardInput}, {returnDocument: 'after'}) || undefined
    }

    public async delete(item: { id: string; }): Promise<Log | undefined> {
        const _id = new ObjectId(item.id)
        return (await logs.findOneAndDelete({_id})) || undefined
    }
}