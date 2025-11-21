import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    #pokeCache;
    constructor() {
        this.#pokeCache = new Cache(10_000);
    }
    /**
     * Gets an array of locations-area from the pokeAPI
     * @param pageURL Speficic page to fetch data from
     * @returns locations from the page
     */
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        //Check the cache
        const cachedData = this.#pokeCache.get(url);
        if (cachedData) {
            return cachedData;
        }
        const data = await fetch(url);
        const locations = (await data.json());
        this.#pokeCache.add(url, locations);
        return locations;
    }
    /**
     * Gets information about a location area from pokeAPI
     * @param name Name of location to fetch data from
     * @returns information about the location
     */
    async fetchLocationArea(name) {
        const url = `${PokeAPI.baseURL}/location-area/${name}`;
        //Check the cache
        const cachedData = this.#pokeCache.get(url);
        if (cachedData) {
            return cachedData;
        }
        const data = await fetch(url);
        const locationArea = (await data.json());
        this.#pokeCache.add(url, locationArea);
        return locationArea;
    }
    /**
     * Gets a location from the pokeAPI
     * @param locationName The location to fetch data from
     * @returns data about that location
     */
    async fetchLocation(locationName) {
        const data = await fetch(`${PokeAPI.baseURL}/location/${locationName}`);
        return (await data.json());
    }
}
