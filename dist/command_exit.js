/**
 * Exits the Pokedex application
 * @param state Only here to fit with callback structure defined in state
 */
export async function commandExit(state) {
    console.log("Closing the Pokedex... Goodbye!");
    state.rl.close();
    process.exit(0);
}
