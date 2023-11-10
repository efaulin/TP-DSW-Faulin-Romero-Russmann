import { ObjectId } from "mongodb";

export class Tablero{
    constructor(
        public sessionId: string,
        public sessionDate: string,
        public sessionName: string,
        public _id ?: ObjectId
    )
    {}
}