import { Entity, ManyToOne, Property, Rel} from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { Tablero } from "../partida/partida.entity.js";   

@Entity()
export class Note extends BaseEntity{
    @ManyToOne(() => Tablero , {nullable: false})
    board!: Rel<Tablero>
    @Property({nullable: true})    
    desc?: string
    @Property({nullable: false})
    position!: number
}