import { State } from "./state.js";

/**
 * Displays information about a pokemon the user has caught
 * @param state The current state of the repl
 * @param args Args passed to the function, the first one should be the pokemon's name
 */
export async function commandInspect(state: State, ...args: string[]) {
  const name = args[0];
  const pokemon = state.pokedex[name];
  if (pokemon) {
    console.log(`Name: ${name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log("Stats:");
    pokemon.stats.forEach((s) =>
      console.log(`  -${s.stat.name}: ${s.base_stat}`)
    );
    console.log("Types:");
    pokemon.types.forEach((t) => console.log(`  - ${t.type.name}`));
  } else {
    console.log("you have not caught that pokemon");
  }
}
