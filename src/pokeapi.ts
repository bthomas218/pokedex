export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  /**
   * Gets an array of locations-area from the pokeAPI
   * @param pageURL Speficic page to fetch data from
   * @returns locations from the page
   */
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;
    const data = await fetch(url);
    return (await data.json()) as ShallowLocations;
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
