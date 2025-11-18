import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
/**
 * Registry of available CLI commands
 * @returns An object mapping command names to their corresponding CLICommand definitions
 */
export function getCommands() {
    return {
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
}
