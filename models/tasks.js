import { Task } from "./task.js";

export class Tasks {
  _list = {};

  get listArr() {
    const listArray = [];

    Object.keys(this._list).forEach((key) => {
      listArray.push(this._list[key]);
    });

    return listArray;
  }

  constructor() {
    this._list = {};
  }

  loadTasksToList(taskArr = []) {
    taskArr.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  deleteTask(id) {
    delete this._list[id];
  }

  getFullList() {
    console.log("");
    Object.keys(this._list).forEach((key, index) => {
      const { completedAt, desc } = this._list[key];
      const statusText =
        completedAt !== null ? "Completada".green : "Pendiente".red;
      const indexNumber = (index + 1 + ".").green;

      console.log(`${indexNumber} ${desc} :: ${statusText}`);
    });
  }

  getListByStatus(completed = true) {
    console.log("");
    const tasks = this.listArr.filter(({ completedAt }) =>
      Boolean(completed ? completedAt : !completedAt)
    );
    tasks.forEach((task, index) =>
      console.log(`${(index + ".").green} ${task.desc}`)
    );
  }

  toggleTasksStatus(ids = []) {
    Object.keys(this._list).forEach((id) => {
      if (ids.includes(id)) {
        if (!Boolean(this._list[id].completedAt)) {
          this._list[id].completedAt = new Date().toISOString();
        }
        return;
      }
      this._list[id].completedAt = null;
    });
  }
}
