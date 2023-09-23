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