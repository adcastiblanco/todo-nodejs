import inquire from "inquirer";
// import { createInterface } from "readline";
import "colors";
const questions = [
  {
    type: "list",
    name: "option",
    message: "Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

export const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".green);
  console.log("Seleccione una opción".green);
  console.log("==========================".green);
  const { option } = await inquire.prompt(questions);
  return option;
};

export const pause = async () => {
  console.log("\n");
  return await inquire.prompt([
    {
      type: "input",
      name: "continue",
      message: `Presione ${"Enter".green} para continuar`,
    },
  ]);

  //   return await inquire.prompt({
  //     type: "confirm",
  //     name: "continue",
  //     message: `Presione ${"Enter".green} para continuar`,
  //   });

  //   const readline = createInterface({
  //     input: process.stdin,
  //     output: process.stdout,
  //   });
  //   return new Promise((res) => {
  //     readline.question(`Presione ${"Enter".green} para continuar`, () => {
  //       res();
  //     });
  //   });
};

export const readInput = async (message) => {
  const { desc } = await inquire.prompt([
    {
      type: "input",
      name: "desc",
      message,
      validate: (value) => {
        if (value.length === 0) return "Por favor, escribe un valor";
        return true;
      },
    },
  ]);

  return desc;
};

export const createTasksSelectList = async (tasks) => {
  const choices = tasks.map((task, index) => ({
    value: task.id,
    name: `${(index + 1 + ".").green} ${task.desc}`,
  }));

  const questions = {
    name: "id",
    type: "list",
    message: "Borrar",
    choices,
  };

  const { id } = await inquire.prompt(questions);
  return id;
};

export const createTasksCheckList = async (tasks) => {
  const choices = tasks.map((task, index) => ({
    value: task.id,
    name: `${(index + 1 + ".").green} ${task.desc}`,
    checked: Boolean(task.completedAt),
  }));

  const questions = {
    name: "ids",
    type: "checkbox",
    message: "Selecciones",
    choices,
  };

  const { ids } = await inquire.prompt(questions);
  return ids;
};

export const confirmAction = async (message) => {
  const { ok } = await inquire.prompt({
    message,
    type: "confirm",
    name: "ok",
  });

  return ok;
};
