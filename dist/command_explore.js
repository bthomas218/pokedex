/**
 * Lists pokemon names from a location area
 * @param state The current state of the repl
 * @param args Command arguments, only need the first which should be a location-area name
 */
export async function commandExplore(state, ...args) {
    const LocationArea = await state.pokeAPI.fetchLocationArea(args[0]);
    console.log("Found Pokemon: ");
    LocationArea.pokemon_encounters.forEach((p) => console.log(`- ${p.pokemon.name}`));
}
