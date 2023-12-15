# Propuesta de TP DSW

## Grupo

### Integrantes

- 49741 Romero, Alan Matias
- 49639 Russmann, Octavio Thomas

### Repositorio

- https://github.com/pandugat/TP-DSW-Faulin-Romero-Russmann

## Tema

### Descripcion
Take-A-Note es una pagina web donde los usuarios crean espacios de trabajo denominados tableros, por medio de los cuales estos pueden dejar asentadas anotaciones, denominadas notas, los usuarios tienen la posiblidad de crear, modificar y eliminar notas, asi como crear y eliminar tableros. Take-A-Note tambien permite a los usuarios trabajar de forma colaborativa pudiendo unirse a los tableros creados por otras personas y poder realizar las anotaciones en grupo. 


### Modelo

![Diagrama Entidad-Relacion](https://github.com/efaulin/TP-DSW-Faulin-Romero-Russmann/blob/fc08b0dc8d5f22b6bc8f08057062f13fb8882ebc/Imagen/TPDER.png)

## Alcance Funcional

### Alcance Minimo

- Regularidad:

| Req                | Detalle                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD Simple        | 1. CRUD Tablero <br> 2. CRUD Usuario                                                                                                                |
| CRUD Dependiente   | 1. CRUD Nota ==\> CRUD Tablero <br>  |
| Listado \+ detalle | 1. Busqueda de tableros por descripcion parcial <br> 2. Listado de notas referentes a un tablero                                     |
| CUU/Epic           | 1. Crear Tablero <br> 2. Crear Nota <br> 3. Crear Usuario                                                                                                    |

- Aprobacion Directa

| Req      | Detalle                                                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD     | 1. CRUD Tablero <br> 2. CRUD Nota <br> 3. CRUD Usuario <br> 4. CRUD Registro <br> |
| CUU/Epic | 1. Crear Usuario <br> 2. Unirse a Tablero <br> 3. Crear Nota <br> 4. Unirse a un Tablero <br> 5. Modificar Usuario     |
