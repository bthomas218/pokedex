import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #pokeCache: Cache;

  constructor() {
    this.#pokeCache = new Cache(10_000);
  }

  /**
   * Gets an array of locations-area from the pokeAPI
   * @param pageURL Speficic page to fetch data from
   * @returns locations from the page
   */
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    //Check the cache
    const cachedData = this.#pokeCache.get(url);
    if (cachedData) {
      return cachedData;
    }

    const data = await fetch(url);
    const locations = (await data.json()) as ShallowLocations;
    this.#pokeCache.add(url, locations);
    return locations;
  }

  /**
   * Gets information about a location area from pokeAPI
   * @param name Name of location to fetch data from
   * @returns information about the location
   */
  async fetchLocationArea(name: string): Promise<LocationArea> {
    const url = `${PokeAPI.baseURL}/location-area/${name}`;

    //Check the cache
    const cachedData = this.#pokeCache.get(url);
    if (cachedData) {
      return cachedData;
    }

    const data = await fetch(url);
    const locationArea = (await data.json()) as LocationArea;
    this.#pokeCache.add(url, locationArea);
    return locationArea;
  }

  /**
   * Gets information about a Pokemon from pokeAPI
   * @param name Name of Pokemon to fetch data about
   * @returns information about the Pokemon
   */
  async fetchPokemon(name: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${name}`;

    //Check the cache
    const cachedData = this.#pokeCache.get(url);
    if (cachedData) {
      return cachedData;
    }

    const data = await fetch(url);
    const pokemon = (await data.json()) as Pokemon;
    this.#pokeCache.add(url, pokemon);
    return pokemon;
  }

  /**
   * Gets a location from the pokeAPI
   * @param locationName The location to fetch data from
   * @returns data about that location
   */
  async fetchLocation(locationName: string): Promise<Location> {
    const data = await fetch(`${PokeAPI.baseURL}/location/${locationName}`);
    return (await data.json()) as Location;
  }
}

/**
 * Type of locations from the pokeAPI
 */
export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

/**
 * Type of location from the pokeAPI
 */
export type Location = {
  id: number;
  name: string;
  region: {
    name: string;
    url: string;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  game_indices: Array<{
    game_index: number;
    generation: {
      name: string;
      url: string;
    };
  }>;
  areas: Array<{
    name: string;
    url: string;
  }>;
};

/**
 * Type of location area from the
 */
export type LocationArea = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: Array<{
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  location: {
    name: string;
    url: string;
  };
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    version_details: Array<{
      version: {
        name: string;
        url: string;
      };
      max_chance: number;
      encounter_details: Array<{
        min_level: number;
        max_level: number;
        condition_values: Array<any>;
        chance: number;
        method: {
          name: string;
          url: string;
        };
      }>;
    }>;
  }>;
};

/**
 * Type of pokemon from PokeAPI
 */
export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  game_indices: Array<{
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }>;
  held_items: Array<{
    item: {
      name: string;
      url: string;
    };
    version_details: Array<{
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }>;
  }>;
  location_area_encounters: string;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      version_group: {
        name: string;
        url: string;
      };
      move_learn_method: {
        name: string;
        url: string;
      };
      order: number;
    }>;
  }>;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: any;
        back_shiny: string;
        back_shiny_female: any;
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string;
          back_gray: string;
          front_default: string;
          front_gray: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          front_default: string;
          front_gray: string;
        };
      };
      "generation-ii": {
        crystal: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iii": {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        "firered-leafgreen": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        "ruby-sapphire": {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      "generation-iv": {
        "diamond-pearl": {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        "heartgold-soulsilver": {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        platinum: {
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string;
            back_female: any;
            back_shiny: string;
            back_shiny_female: any;
            front_default: string;
            front_female: any;
            front_shiny: string;
            front_shiny_female: any;
          };
          back_default: string;
          back_female: any;
          back_shiny: string;
          back_shiny_female: any;
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
        "x-y": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-vii": {
        icons: {
          front_default: string;
          front_female: any;
        };
        "ultra-sun-ultra-moon": {
          front_default: string;
          front_female: any;
          front_shiny: string;
          front_shiny_female: any;
        };
      };
      "generation-viii": {
        icons: {
          front_default: string;
          front_female: any;
        };
      };
    };
  };
  cries: {
    latest: string;
    legacy: string;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  past_types: Array<{
    generation: {
      name: string;
      url: string;
    };
    types: Array<{
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }>;
  }>;
  past_abilities: Array<{
    generation: {
      name: string;
      url: string;
    };
    abilities: Array<{
      ability: any;
      is_hidden: boolean;
      slot: number;
    }>;
  }>;
};
