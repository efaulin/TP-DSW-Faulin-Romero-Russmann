import { BckPlayer, BckPlayerArray } from "./player.js";

export class Lobby{
    public player = new BckPlayerArray();
    constructor(
        public name:string,
    ) {};
};