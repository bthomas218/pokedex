import type { State } from "./state.js";
/**
 * Displays a help message listing all available commands
 * @param state The current state of the application which contains the command registry
 */
export function commandHelp(state: State): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n\n");
  for (const cmd of Object.values(state.commandsRegistry)) {
    console.log(`${cmd.name}: ${cmd.description}`);
  }
}
