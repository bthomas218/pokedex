/**
 * A class to act as a cache
 */
export class Cache {
    #cache = new Map();
    #reapIntervalID = undefined;
    #interval;
    /**
     * Constructs the cache
     * @param interval The time between reaping the cache
     */
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    /**
     * Adds an entry to cache
     * @param key The key of the entry
     * @param val The value of the entry
     */
    add(key, val) {
        this.#cache.set(key, { createdAt: Date.now(), val: val });
    }
    /**
     * Gets an entry from the cache
     * @param key The key of the object to get
     * @returns An object with a type of CacheEntry or undefined if its not there
     */
    get(key) {
        return this.#cache.get(key)?.val;
    }
    /**
     * Deletes entries older than the reap interval
     */
    #reap = () => {
        for (const [key, val] of this.#cache.entries()) {
            if (val.createdAt < Date.now() - this.#interval) {
                this.#cache.delete(key);
            }
        }
    };
    /**
     * Calls the reap function afer a delay of the interval
     */
    #startReapLoop = () => {
        this.#reapIntervalID = setInterval(this.#reap, this.#interval);
    };
    /**
     * Stops reaping the cache
     */
    stopReapLoop() {
        clearInterval(this.#reapIntervalID);
        this.#reapIntervalID = undefined;
    }
}
