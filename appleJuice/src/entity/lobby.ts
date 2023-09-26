import { BckPlayer, BckPlayerArray } from "./player.js";

export class Lobby{
    public player = [] as unknown as BckPlayerArray;
    constructor(
        public name:string,
    ) {};
};