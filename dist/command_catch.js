const BASE_CATCH_RATE = 50;
/**
 * Tries to catch a pokemon
 * @param state The current state of the repl
 * @param args arguments passed to the callback, the first one should be a pokemon name
 */
export async function commandCatch(state, ...args) {
    const pokemon = await state.pokeAPI.fetchPokemon(args[0]);
    console.log(`Throwing a Pokeball at ${pokemon.name}...`);
    const catchChance = Math.floor(Math.random() * pokemon.base_experience);
    if (BASE_CATCH_RATE >= catchChance) {
        state.pokedex[pokemon.name] = pokemon;
        console.log(`${pokemon.name} was caught!\nYou may now inspect it with the inspect command.`);
    }
    else {
        console.log(`${pokemon.name} escaped!`);
    }
}
