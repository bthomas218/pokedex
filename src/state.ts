import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

/**
 * Represents the state of the repl
 */
export type State = {
  commandsRegistry: Record<string, CLICommand>;
  rl: Interface;
};

/**
 * Type defintion for a CLI command
 */
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export function initState(): State {
  // Initialize Readline
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex> ",
  });
  // Initialize commandRegistry
  const availableCommands = {
    exit: {
      name: "exit",
      description: "Exits the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
  };

  return {
    rl: rl,
    commandsRegistry: availableCommands,
  };
}
