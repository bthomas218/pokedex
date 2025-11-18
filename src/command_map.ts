import type { State } from "./state.js";

/**
 * Prints the NEXT locations-areas from pokeAPI if it exists
 * @param state The current state of the REPL
 */
export async function commandMap(state: State) {
  const locations = await state.pokeAPI.fetchLocations(
    state.nextLocationURL ? state.nextLocationURL : undefined
  );
  const { next, previous } = locations;
  state.nextLocationURL = next;
  state.prevLocationURL = previous;
  locations.results.forEach((l) => console.log(l.name));
}
