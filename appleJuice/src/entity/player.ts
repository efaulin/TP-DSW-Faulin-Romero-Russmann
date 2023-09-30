export class BckPlayer{
    constructor(
        public socket:string,
        public name:string | undefined
    ) {}
}

export class Player{
    constructor(
        public socket:string,
        public name:string | undefined,
        public label:HTMLLabelElement,
        public br:HTMLBRElement
    )
    {
        label.textContent = name!;
    }
}

export class BckPlayerArray {
    array: BckPlayer[] = [];
    
    getAll(){
        return this.array;
    };

    getOne(socket:string){
        return this.array.find((obj) => { return obj.socket == socket });
    };

    create(player:BckPlayer){
        return this.array.push(player);
    };

    delete(socket:string){
        var index:number = this.getAll().findIndex((obj) => { return obj.socket == socket });
        this.array.splice(index, 1);
    };
}

export class PlayerArray {
    array: Player[] = [];
    
    getAll(){
        return this.array;
    };

    getOne(socket:string){
        return this.array.find((obj) => { return obj.socket == socket });
    };

    create(player:Player){
        return this.array.push(player);
    };

    delete(socket:string){
        var index:number = this.getAll().findIndex((obj) => { return obj.socket == socket });
        this.array.splice(index, 1);
    };
}