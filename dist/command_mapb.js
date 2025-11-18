/**
 * Prints the PREVIOUS locations-areas from pokeAPI if it exists
 * @param state The current state of the REPL
 */
export async function commandMapb(state) {
    const locations = await state.pokeAPI.fetchLocations(state.prevLocationURL ? state.prevLocationURL : undefined);
    const { next, previous } = locations;
    state.nextLocationURL = next;
    state.prevLocationURL = previous;
    locations.results.forEach((l) => console.log(l.name));
}
