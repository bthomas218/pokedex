// For unit tests
import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

// Unit tests for cleanInput function
describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "Charmander Bulbasaur PIKACHU",
    expected: ["charmander", "bulbasaur", "pikachu"],
  },
  {
    input: "    Running   BIKING  hotpot        ",
    expected: ["running", "biking", "hotpot"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
