import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

/**
 * Represents the state of the repl
 */
export type State = {
  commandsRegistry: Record<string, CLICommand>;
  rl: Interface;
  pokeAPI: PokeAPI;
  nextLocationURL: string | null;
  prevLocationURL: string | null;
  pokedex: Record<string, Pokemon>;
};

/**
 * Type defintion for a CLI command
 */
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
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
    map: {
      name: "map",
      description:
        "Displays the names of the next 20 locations in the pokemon world",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description:
        "Displays the names of the previous 20 locations in the pokemon world",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Args: [area] | Displays pokemon in an area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Args: [pokemon name] | Try to catch the specified pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description:
        "Args: [pokemon name] | View detailed information of pokemon you've caught",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "View the names of the pokemon you've caught",
      callback: commandPokedex,
    },
  };

  // Initialize PokeAPI
  const pokeAPI = new PokeAPI();

  return {
    rl: rl,
    commandsRegistry: availableCommands,
    pokeAPI: pokeAPI,
    nextLocationURL: null,
    prevLocationURL: null,
    pokedex: {},
  };
}
