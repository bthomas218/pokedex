/**
 * Splits user input into words based on whitespace
 * @param input The user input
 * @returns The user input as an array of lowercase words without leading and trailing whitespace
 */
export function cleanInput(input) {
    return input.trim().toLowerCase().split(/\s+/);
}
/**
 * Starts a REPL (Read-Eval-Print Loop) for user interaction
 * @param state The initial state of the REPL
 */
export function startREPL(state) {
    const { rl, commandsRegistry } = state;
    rl.prompt();
    rl.on("line", async (line) => {
        const input = cleanInput(line);
        const [commandName, ...args] = input;
        const cmd = commandsRegistry[commandName];
        if (cmd) {
            try {
                await cmd.callback(state, ...args);
            }
            catch (error) {
                console.log(`Error executing command: ${error}`);
            }
        }
        else {
            console.log(`Unknown command`);
        }
        rl.prompt();
    });
}
