import node from "node-cron";
import exec from "child_process";
import { readFile, appendFile, rm } from "fs/promises";

// ┌────────────── segundo (opcional)
// │ ┌──────────── minuto
// │ │ ┌────────── hora
// │ │ │ ┌──────── dia del mes
// │ │ │ │ ┌────── mes
// │ │ │ │ │ ┌──── dia de la semana
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *

//////////////////
//Notificaciones//
//////////////////

//Cada 2 minutos
node.schedule(
  "*/2 * * * *",
  () => {
    console.log("Cambiar los discos del servidor x");
  },
  { scheduled: false }
);

//Cada 30 segundos

node.schedule(
  "*/30 * * * * *",
  () => {
    console.log("Revisar la temperatura de la sala de máquinas");
  },
  {
    scheduled: false,
  }
);

//Todos los días a las 19:50

node.schedule("50 19 * * *", () => {
  console.log("Apagar un determinado servidor");
});

//Todos los domingos a las 20:45

node.schedule(
  "45 20 * * 0",
  () => {
    console.log("Reinicar el servidor y");
  },
  { timezone: "America/Buenos_Aires" }
);

//Todos los días 30 de enero y junio a las 8:00

node.schedule(
  "0 8 30 1,6 *",
  () => {
    console.log("Mantenimiento de los servidores");
  },
  { timezone: "America/Buenos_Aires" }
);

///////////////////////////
//Backup en base de datos//
///////////////////////////

//Todos los viernes a las 3:00

node.schedule(
  "0 3 * * 5",
  () => {
    console.log("Mantenimiento de los servidores");
  },
  { timezone: "America/Buenos_Aires" }
);

///////////////////////////////////////
//Comprobar si un servidor está caído//
///////////////////////////////////////

//Cada minuto

node.schedule(
  "* * * * *",
  () => {
    exec.exec("ping google.com", (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stdout) {
        console.log(stdout);
        return;
      }
      console.log(stderr);
    });
  },
  { timezone: "America/Buenos_Aires" },
  { scheduled: false }
);

//Cada 5 segundos

node.schedule(
  "*/5 * * * * *",
  async () => {
    try {
      const data = await readFile("bd.txt", { encoding: "utf8" });
      await rm("backup.txt");
      appendFile("backup.txt", data);
      console.log("Back-Up Realizado");
    } catch (err) {
      console.log(err);
    }
  },
  { timezone: "America/Buenos_Aires" }
);
