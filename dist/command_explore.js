/**
 * Exits the Pokedex application
 */
export async function commandExplore(state, ...args) {
    const LocationArea = await state.pokeAPI.fetchLocationArea(args[0]);
    console.log("Found Pokemon: ");
    LocationArea.pokemon_encounters.forEach((p) => console.log(`- ${p.pokemon.name}`));
}
