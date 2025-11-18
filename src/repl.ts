/**
 * Splits user input into words based on whitespace
 * @param input The user input
 * @returns The user input as an array of lowercase words without leading and trailing whitespace
 */
export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}
