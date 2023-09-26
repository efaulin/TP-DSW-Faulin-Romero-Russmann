export class BckPlayer{
    constructor(
        public name:string | undefined
    ) {}
}

export class Player{
    constructor(
        public name:string | undefined,
        public label:HTMLLabelElement,
        public br:HTMLBRElement
    ) {}
}

export interface BckPlayerArray {
    [index: string]: BckPlayer;
}

export interface PlayerArray {
    [index: string]: Player;
}