import "colors";
import {
  createTasksSelectList,
  confirmAction,
  inquirerMenu,
  pause,
  readInput,
  createTasksCheckList,
} from "./helpers/inquirer.js";
import { readDB, saveDB } from "./helpers/database.js";
// import { Task } from "./models/task.js";
import { Tasks } from "./models/tasks.js";
console.clear();

const main = async () => {
  let opt = "";
  const tasks = new Tasks();
  const tasksDatabase = readDB();
  if (tasksDatabase) {
    tasks.loadTasksToList(tasksDatabase);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await readInput("Descripción:");
        tasks.createTask(desc);
        break;
      case "2":
        tasks.getFullList();
        break;
      case "3":
        tasks.getListByStatus(true);
        break;
      case "4":
        tasks.getListByStatus(false);
        break;
      case "5":
        const ids = await createTasksCheckList(tasks.listArr);
        tasks.toggleTasksStatus(ids);

        break;
      case "6":
        const id = await createTasksSelectList(tasks.listArr);
        const confirmDelete = await confirmAction(
          "Está seguro que desea eliminar la tarea?"
        );
        if (confirmDelete) tasks.deleteTask(id);
    }
    saveDB(tasks.listArr);
    await pause();
  } while (opt !== "0");
};

main();
