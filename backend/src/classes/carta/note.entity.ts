import { Entity, ManyToOne, Property, Rel} from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";
import { Tablero } from "../partida/partida.entity.js";   

@Entity()
export class Note extends BaseEntity{
    @ManyToOne(() => Tablero , {nullable: false})
    tablero!: Rel<Tablero>
    @Property()    
    desc?: string
    @Property({nullable: false})
    position!: number
}