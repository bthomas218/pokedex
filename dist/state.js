import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
export function initState() {
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
            description: "Displays the names of the next 20 locations in the pokemon world",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the names of the previous 20 locations in the pokemon world",
            callback: commandMapb,
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
    };
}
