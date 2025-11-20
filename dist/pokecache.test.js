import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";
test.concurrent.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500, // 1/2 second
    },
    {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 1000, // 1 second
    },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);
    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);
    await new Promise((resolve) => setTimeout(resolve, interval * 2 + 50));
    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);
    cache.stopReapLoop();
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
test("reaps old entries but keeps new ones", async () => {
    const interval = 200;
    const cache = new Cache(interval);
    cache.add("a", 1);
    // wait long enough for the reap loop to run and remove "a"
    await sleep(interval + 50);
    // add a new value after the first reap
    cache.add("b", 2);
    expect(cache.get("a")).toBe(undefined);
    expect(cache.get("b")).toBe(2);
    cache.stopReapLoop();
});
test("stopReapLoop prevents future reaping", async () => {
    const interval = 100;
    const cache = new Cache(interval);
    cache.add("x", "keepme");
    // stop reaping immediately
    cache.stopReapLoop();
    await sleep(interval + 50);
    expect(cache.get("x")).toBe("keepme");
});
test("get returns undefined for missing keys", () => {
    const cache = new Cache(1000);
    expect(cache.get("nope")).toBe(undefined);
    cache.stopReapLoop();
});
