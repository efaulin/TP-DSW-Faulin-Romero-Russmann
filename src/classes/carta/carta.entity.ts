import { ObjectId } from "mongodb";

export class Note{
    constructor(
        public idItem: string,
        public desc: string,
        public _id ?: ObjectId
    )
    {}
}