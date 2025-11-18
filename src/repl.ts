import * as readline from "readline";
import { getCommands } from "./commands.js";
import { get } from "http";
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
 */
export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex> ",
  });
  rl.prompt();
  rl.on("line", (line) => {
    const input = cleanInput(line);
    const commandName = input[0];

    const availableCommands = getCommands();
    const cmd = availableCommands[commandName];

    if (cmd) {
      try {
        cmd.callback(availableCommands);
      } catch (error) {
        console.log(`Error executing command: ${error}`);
      }
    } else {
      console.log(`Unknown command`);
    }
    rl.prompt();
  });
}
