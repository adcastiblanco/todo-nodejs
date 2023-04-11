import { writeFileSync, readFileSync, existsSync } from "fs";

const path = "./db/data.json";

export const saveDB = (data) => {
  writeFileSync(path, JSON.stringify(data));
};

export const readDB = () => {
  if (!existsSync(path)) return null;
  const data = JSON.parse(readFileSync(path));
  return data;
};
