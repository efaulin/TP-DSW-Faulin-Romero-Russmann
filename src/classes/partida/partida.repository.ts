import { Repository } from "../../shared/repository.js";
import { Partida } from "./partida.entity.js";

const partidas =[
    new Partida(
        '00',
        '2023-09-14',
        'Finished',
        15000,
        'Kyoto Realms'
    )
]

export class SessionRepository implements Repository<Partida>{
    public findAll(): Partida[] | undefined {
        return partidas
    }

    public findOne(item: { id: string; }): Partida | undefined {
        return partidas.find((partida) => partida.idSession === item.id)
    }

    public add(item: Partida): Partida | undefined {
        partidas.push(item)
        return item
    }

    public update(item: Partida): Partida | undefined {
        const partidaId = partidas.findIndex((partida) => partida.idSession === item.idSession)

        if(partidaId !== -1){
            partidas.splice(partidaId, 1, item)
        }
        
        return partidas[partidaId]
    }

    public delete(item: { id: string; }): Partida | undefined {
        const partidaId = partidas.findIndex((partida) => partida.idSession === item.id)
        if(partidaId !== -1){
            const borrado = partidas[partidaId]
            partidas.splice(partidaId, 1)
            return borrado
        }
    }
}