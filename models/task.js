import { v4 as uuidV4 } from "uuid";

export class Task {
  id = "";
  desc = "";
  completedAt = null;

  constructor(desc) {
    this.id = uuidV4();
    this.desc = desc;
  }
}
