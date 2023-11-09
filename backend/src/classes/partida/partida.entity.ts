import { ObjectId } from "mongodb";

export class Partida{
    constructor(
        public idSession: string,
        public sessionDate: string,
        public _id ?: ObjectId
    )
    {}
}