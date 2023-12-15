import { Entity, Property} from "@mikro-orm/core";
import { BaseEntity } from "../../shared/db/baseEntity.entity.js";


@Entity()
export class Usuario extends BaseEntity{
    @Property({nullable: false})
    name!: string
    @Property({nullable: false})  
    passwd!: string
    @Property({nullable: false})
    mail?: string
}