import { State } from "./state";

/**
 * Displays the names of all pokemon the user has caught
 * @param state The current state of the REPL
 */
export async function commandPokedex(state: State) {
  console.log("Your pokedex:");
  Object.keys(state.pokedex).forEach((name) => console.log(`  - ${name}`));
}
