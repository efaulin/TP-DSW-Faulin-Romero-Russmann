import { ObjectId } from "mongodb";

export class Note{
    constructor(
        public idItem: string,
        public idUser: string,
        public idSession: string,
        public desc: string,
        public position: number[],
        public _id ?: ObjectId
    )
    {}
}