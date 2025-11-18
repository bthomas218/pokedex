import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
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
    };
    return {
        rl: rl,
        commandsRegistry: availableCommands,
    };
}
