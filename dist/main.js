import { startREPL } from "./repl.js";
import { initState } from "./state.js";
function main() {
    const initialState = initState();
    startREPL(initialState);
}
main();
