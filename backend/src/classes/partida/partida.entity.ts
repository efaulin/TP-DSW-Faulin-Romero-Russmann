import { ObjectId } from "mongodb";

export class Tablero{
    constructor(
        public sessionName: string,
        public sessionId ?: string,
        public sessionDate ?: string,
        public _id ?: ObjectId
    )
    {}
}