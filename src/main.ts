import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const intialState = initState();
  startREPL(intialState);
}
main();
