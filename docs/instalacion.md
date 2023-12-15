# Instalacion y Ejecucion del Proyecto

## Requisitos Previos
Para el proceso de instalacion se asumira que se cuenta con el sig. software instalado en el equipo:
- NodeJS

## Instalacion de Dependencias
Una vez clonado el repositorio, desde la linea de comandos dirigirse al directorio backend, ubicado en el directorio raiz, y ejecutar los siguientes comandos:
>npm install -g pnpm

>npm install

Esto instalara todos los modulos referentes al backend. 

Una vez terminado el proceso volver al directorio raiz y entrar en la carpeta Take-A-Note y desde alli ejecutar los siguientes comandos:
>npm install -g @angular/cli@latest

>npm install

Esto realizara el mismo procedimiento pero referido al frontend.

## Ejecucion del proyecto
Desde el directorio raiz dirigirse a la carpeta backend y ejecutar el sig comando para iniciar el servicio de backend:
>pnpm start:dev

Luego dirigirse a la carpeta Take-A-Note del directorio raiz y ejecutar este comando:
>ng serve -o

Esto iniciara el servidor de Frontend, una vez terminado el proceso de compilado se abrira una ventana del navegador con la pagina de inicio del proyecto.
