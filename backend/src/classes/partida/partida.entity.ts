import { Cascade, Collection, Entity, OneToMany, Property, Filter} from "@mikro-orm/core"; 
import { Note } from "../carta/note.entity.js";
import { BaseEntity} from "../../shared/db/baseEntity.entity.js";

@Entity()
export class Tablero extends BaseEntity{
    @Property({nullable: false})
    name!: string
    @OneToMany(() => Note, (note) => note.board, {cascade: [Cascade.ALL]})
    notes = new Collection<Note>(this)
}