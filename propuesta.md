# Propuesta de TP DSW

## Grupo

### Integrantes

- 49500 Faulin, Eugenio Pandu
- 49741 Romero, Alan Matias
- 49639 Russmann, Octavio Thomas

### Repositorio

- https://github.com/pandugat/TP-DSW-Faulin-Romero-Russmann

## Tema

### Descripcion

Juego de mesa por turnos, en el cual los jugadores se van moviendo por las casillas
consiguiendo monedas, y victorias por medio de batallas. El objetivo de los jugadores es
cumplir misiones para alcanzar el nivel máximo, el primero que lo logre gana la partida. En
el comienzo, todos los jugadores tienen la misión de conseguir X cantidad de monedas,
estas se pueden usar para activar cartas. Al cumplir la misión, el jugador deberá caer en
una casilla de hogar para cumplirla, subiendo de nivel y consiguiendo otra misión
eligiendo entre conseguir X cantidad de victorias o X cantidad de monedas.

### Modelo

    ![Diagrama Entidad-Relacion](Imagen/TP-DER.png)

## Alcance Funcional

### Alcance Minimo

- Regularidad:

| Req                | Detalle                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD Simple        | 1. CRUD Tipo Carta <br> 2. CRUD Personaje <br> 3. CRUD Usuario                                                                                                                |
| CRUD Dependiente   | 1. CRUD Carta ==\> CRUD Tipo Carta <br> 2. CRUD Mazo ==\> CRUD Carta <br> 3. CRUD Jugador ==\> (CRUD Mazo/CRUD Personaje/CRUD Usuario) <br> 4. CRUD Partida ==\> CRUD Jugador |
| Listado \+ detalle | 1. Listado de cartas dado un determinado tipo de cartas <br> 2. Listado de Partidas por usuarios, estado de la partida, fecha de creacion                                     |
| CUU/Epic           | 1. Crear Usuario <br> 2. Unirse a Partida <br> 3. Selecionar Personaje                                                                                                        |

- Aprobacion Directa

| Req      | Detalle                                                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD     | 1. CRUD Tipo Carta <br> 2. CRUD Personaje <br> 3. CRUD Usuario <br> 4. CRUD Carta <br> 5. CRUD Mazo <br> 6. CRUD Jugador <br> 7. CRUD Partida |
| CUU/Epic | 1. Crear Usuario <br> 2. Unirse a Partida <br> 3. Selecionar Personaje <br> 4. Crear Mazo <br> 5. Crear Partida <br> 6. Modificar Usuario     |
