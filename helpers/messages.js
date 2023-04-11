import { createInterface } from "readline";

export const showMenu = () => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question("Seleccione una opción: ", (opt) => {
    console.log(opt);
    readline.close();
  });
};
