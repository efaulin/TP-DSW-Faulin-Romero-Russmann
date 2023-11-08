import { ObjectId } from "mongodb";

export class Log{
    constructor(
        public idLog: string,
        public idUser: string,
        public idSession: string,
        public desc: string,
        public _id ?: ObjectId
    )
    {}
}