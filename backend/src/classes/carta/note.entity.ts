import { ObjectId } from "mongodb";

export class Note{
    constructor(
        public desc: string,
        public position: number,
        public idSession ?: string,
        public idItem ?: string,
        public _id ?: ObjectId
    )
    {}
}