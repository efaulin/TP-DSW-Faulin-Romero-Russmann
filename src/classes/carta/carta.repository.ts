import { Repository } from "../../shared/repository.js";
import { Carta} from "./carta.entity.js";

const cartas = [
    new Carta(
        '01',
        'Toma, los tengo yo',
        'Oh, que veo aqui colega, si no es mas que el mismisimo Shadex quien te ofrece sus esmeraldas en señal de amistad, aunque todavia sois enemigos: +1 ATK -2 EVD',
        '1',
        'Buff'
    )
]

export class CartaRepository implements Repository<Carta>{
    public findAll(): Carta[] | undefined {
        return cartas
    }

    public findOne(item: { id: string; }): Carta | undefined {
        return cartas.find((carta) => carta.idCarta === item.id)
    }

    public add(item: Carta): Carta | undefined {
        cartas.push(item)
        return item
    }

    public update(item: Carta): Carta | undefined {
        const cartaId = cartas.findIndex((carta) => carta.idCarta === item.idCarta)

        if(cartaId !== -1){
            cartas.splice(cartaId, 1, item)
        }
        
        return cartas[cartaId]
    }

    public delete(item: { id: string; }): Carta | undefined {
        const cartaId = cartas.findIndex((carta) => carta.idCarta === item.id)
        if(cartaId !== -1){
            const borrado = cartas[cartaId]
            cartas.splice(cartaId, 1)
            return borrado
        }
    }
}