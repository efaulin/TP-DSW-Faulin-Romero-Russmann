import { Repository } from "../../shared/repository.js";
import { Partida } from "./partida.entity.js";
import { db } from "../../shared/db/conn.js";


const partidasArray =[
    new Partida(
        '00',
        '2023-09-14'
    )
]

const sessions = db.collection<Partida>('sessions')

export class SessionRepository implements Repository<Partida>{
    public async findAll(): Promise<Partida[] | undefined> {
        return partidasArray
    }

    public async findOne(item: { id: string; }): Promise<Partida | undefined> {
        return partidasArray.find((partida) => partida.idSession === item.id)
    }

    public async add(item: Partida): Promise<Partida | undefined> {
        partidasArray.push(item)
        return item
    }

    public async update(item: Partida): Promise<Partida | undefined> {
        const partidaId = partidasArray.findIndex((partida) => partida.idSession === item.idSession)

        if(partidaId !== -1){
            partidasArray.splice(partidaId, 1, item)
        }
        
        return partidasArray[partidaId]
    }

    public async delete(item: { id: string; }): Promise<Partida | undefined> {
        const partidaId = partidasArray.findIndex((partida) => partida.idSession === item.id)
        if(partidaId !== -1){
            const borrado = partidasArray[partidaId]
            partidasArray.splice(partidaId, 1)
            return borrado
        }
    }
}