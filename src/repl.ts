import { State } from "./state.js";
/**
 * Splits user input into words based on whitespace
 * @param input The user input
 * @returns The user input as an array of lowercase words without leading and trailing whitespace
 */
export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

/**
 * Starts a REPL (Read-Eval-Print Loop) for user interaction
 * @param state The initial state of the REPL
 */
export function startREPL(state: State) {
  const { rl, commandsRegistry } = state;
  rl.prompt();
  rl.on("line", (line) => {
    const input = cleanInput(line);
    const commandName = input[0];

    const cmd = commandsRegistry[commandName];

    if (cmd) {
      try {
        cmd.callback(state);
      } catch (error) {
        console.log(`Error executing command: ${error}`);
      }
    } else {
      console.log(`Unknown command`);
    }
    rl.prompt();
  });
}
