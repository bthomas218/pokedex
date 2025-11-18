export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    /**
     * Gets an array of locations-area from the pokeAPI
     * @param pageURL Speficic page to fetch data from
     * @returns locations from the page
     */
    async fetchLocations(pageURL) {
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;
        const data = await fetch(url);
        return (await data.json());
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
