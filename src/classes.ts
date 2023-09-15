//TO DO: realizar pasaje a tabla del DER y realizar las modificaciones correspondientes

export class Personaje{
    constructor(
        public idPers:string,
        public nomPers:string,
        public desc:string,
        public HP:number,
        public ATK:number,
        public EVD:number,
        public DEF:number,
        public VD:number,
        public REC:number)
        {}
}

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

export class Carta{
    constructor(
        public idCarta: string,
        public titulo: string,
        public desc: string,        
        public idTipo: string,
        public descTipo: string
    )
    {}
}

export class Partida{
    constructor(
        public idSession: string,
        public sessionDate: string,
        public sessionStatus: string,
        public duration: number,
        public scenario: string
    )
    {}
}