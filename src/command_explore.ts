import { State } from "./state.js";
/**
 * Exits the Pokedex application
 */
export async function commandExplore(state: State, ...args: string[]) {
  const LocationArea = await state.pokeAPI.fetchLocationArea(args[0]);
  console.log("Found Pokemon: ");
  LocationArea.pokemon_encounters.forEach((p) =>
    console.log(`- ${p.pokemon.name}`)
  );
}
