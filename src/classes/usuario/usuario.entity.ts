export class Usuario{
    constructor(
        public idUser: string,
        public nick: string,
        public nomUser: string,
        public passwd: string,
        public EXP: number,
        public userType: number,
        public Mazo: [],
    )
    {}
}