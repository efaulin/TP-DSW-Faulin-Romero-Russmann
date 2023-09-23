import { Repository } from "../../shared/repository.js";
import { Usuario } from "./usuario.entity.js";

const usuarios = [
    new Usuario(
        '01',
        'pedro.lolas',
        'carlosperez',
        'pepito043',
        300,
        1,
        []
    )
]

export class UserRepository implements Repository<Usuario>{
    public findAll(): Usuario[] | undefined {
        return usuarios
    }

    public findOne(item: { id: string; }): Usuario | undefined {
        return usuarios.find((usuario) => usuario.idUser === item.id)
    }

    public add(item: Usuario): Usuario | undefined {
        usuarios.push(item)
        return item
    }

    public update(item: Usuario): Usuario | undefined {
        const usuarioId = usuarios.findIndex((usuario) => usuario.idUser === item.idUser)

        if(usuarioId !== -1){
            usuarios.splice(usuarioId, 1, item)
        }
        
        return usuarios[usuarioId]
    }

    public delete(item: { id: string; }): Usuario | undefined {
        const usuarioId = usuarios.findIndex((usuario) => usuario.idUser === item.id)
        if(usuarioId !== -1){
            const borrado = usuarios[usuarioId]
            usuarios.splice(usuarioId, 1)
            return borrado
        }
    }
}