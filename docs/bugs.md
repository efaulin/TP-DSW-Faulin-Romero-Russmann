# TP DSW Romero Russmann
## Bugs & Issues
### Backend
- 28/09/23: La funcion findAll no devuelve elementos al realizar la consulta mediante la API Rest. Resulta que la llamada a la funcion findAll del repositorio, realizada desde el controlador, carecia de los parentesis, por lo cual era interpretada como un metodo y no como una funcion.
- 19/11/23: Las notas no llegan a crearse. Se estaba realizando mal la llamada a la funcion que sanitiza la entrada de datos desde el frontend.
- 02/12/23: Las operaciones de actualizacion y borrado de notas no devuelve error cuando se le proporciona un id inexistente y finaliza como si la operacion se hubiera realizado correctamente sobre el id proporcionado. Dado que las funciones de actualizacion y borrado solo hacian referencia al objeto con la id suministrada, este podia no existir y ejecutar la operacion a la base de datos con total normalidad, en su lugar ahora las operaciones realizan una consulta a la base de datos para obtener el objeto solicitado, en caso de no encontrarlo, la operacion no puede continuar y devuelve el error.

### Frontend
- 29/09/23: El frontend no realiza correctamente la request al backend cuando se consulta la lista de notas pertenecientes a una tabla, devolviendo un arreglo vacio, con elementos repetidos, etc.
- 09/12/23: Al reiniciar la pagina mientras se visualizaba un tablero este no volvia a cargarse, obteniendo una pagina en blanco


## Issues
- 05/11/23: No era posible la conexion entre el componente que contiene los tableros con el componente que contiene las notas.

## Features
### Backend
- 14/09/23: Se agregaron las ABM de las clases Usuario, Partida, Mazo y Carta.
- 23/09/23: Se sanitizo las inputs y se agrega manejo de errores basico.
- 4/11/23: Se implementa el CRUD sobre la base de datos
- 8/11/23: Se agrego la clase Registros (Aprobacion Directa)
- 10/11/23: Se introduce la busqueda de Notas por Tablero, se agrega el id autoincremental, sessionDate automatico, el add de notas ahora pide el id del tablero
- 19/11/23: Se implementa la ORM MikroORM sobre el backend.

### Frontend
- 26/10/23: Se agregaron componentes, se dio formato a home y login, se modifico home y login para que tengan una navegacion basica y ahora los elementos que se usan para la navegacion brillan (hover)
- 08/11/23: Se agregó el componente logged-home y el servicio rest
- 10/11/23: Se agregó joinboard y la clase board, se agregó de manera experimental el componente boardnotes y se implementó el servicio board-notes y se agrega la creacion y busqueda de tablas
