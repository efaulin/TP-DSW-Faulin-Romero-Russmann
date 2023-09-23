import { Repository } from "../../shared/repository.js";
import { Personaje } from "./personaje.entity.js";

const personajes= [
    new Personaje(
        '01',
        'Spike Spinetta',
        'Estrella de rock del espacio espacial',
        100,
        13,
        8,
        4,
        5,
        6),
    new Personaje(
        '02',
        'Carlos Castañeda',
        'Protagonista de las abenturas de Don Juan, pero tambien es el bastardo que mato a mi hermano',
        150,
        19,
        5,
        8,
        5,
        4),
    ]

export class PersRepository implements Repository<Personaje>{
    public findAll(): Personaje[] | undefined {
        return personajes
    }

    public findOne(item: { id: string; }): Personaje | undefined {
        return personajes.find((personaje) => personaje.idPers === item.id)
    }

    public add(item: Personaje): Personaje | undefined {
        personajes.push(item)
        return item
    }

    public update(item: Personaje): Personaje | undefined {
        const personajeId = personajes.findIndex((personaje) => personaje.idPers === item.idPers)

        if(personajeId !== -1){
            personajes.splice(personajeId, 1, item)
        }
        
        return personajes[personajeId]
    }

    public delete(item: { id: string; }): Personaje | undefined {
        const personajeId = personajes.findIndex((personaje) => personaje.idPers === item.id)
        if(personajeId !== -1){
            const borrado = personajes[personajeId]
            personajes.splice(personajeId, 1)
            return borrado
        }
    }
}