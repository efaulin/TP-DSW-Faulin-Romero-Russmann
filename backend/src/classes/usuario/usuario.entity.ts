import { ObjectId } from "mongodb";

export class Usuario{
    constructor(
        public idUser: string,
        public nick: string,
        public nomUser: string,
        public passwd: string,
        public mail: string,
        public _id ?: ObjectId
    )
    {}
}