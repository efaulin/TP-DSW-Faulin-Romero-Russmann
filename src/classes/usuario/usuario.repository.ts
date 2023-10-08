import { Repository } from "../../shared/repository.js";
import { Usuario } from "./usuario.entity.js";
import { db } from "../../shared/db/conn.js";

const usuariosArray = [
    new Usuario(
        '01',
        'pedro.lolas',
        'carlosperez',
        'pepito043',
        'carl@os'
    )
]

const usuarios = db.collection<Usuario>('usuarios')

export class UserRepository implements Repository<Usuario>{
    public async findAll(): Promise<Usuario[] | undefined> {
        return await usuarios.find().toArray()
    }

    public async findOne(item: { id: string; }): Promise<Usuario | undefined> {
        return await usuariosArray.find((usuario) => usuario.idUser === item.id)
    }

    public async add(item: Usuario): Promise<Usuario | undefined> {
        await usuariosArray.push(item)
        return item
    }

    public async update(item: Usuario): Promise<Usuario | undefined> {
        const usuarioId =await usuariosArray.findIndex((usuario) => usuario.idUser === item.idUser)

        if(usuarioId !== -1){
            usuariosArray.splice(usuarioId, 1, item)
        }
        
        return usuariosArray[usuarioId]
    }

    public async delete(item: { id: string; }): Promise<Usuario | undefined> {
        const usuarioId =await usuariosArray.findIndex((usuario) => usuario.idUser === item.id)
        if(usuarioId !== -1){
            const borrado = usuariosArray[usuarioId]
            usuariosArray.splice(usuarioId, 1)
            return borrado
        }
    }
}