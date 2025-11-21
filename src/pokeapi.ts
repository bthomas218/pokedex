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
