import { ObjectId } from "mongodb";

export class Usuario{
    constructor(
        public nick: string,
        public nomUser: string,
        public passwd: string,
        public mail: string,
        public _id ?: ObjectId
    )
    {}
}