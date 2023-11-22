/**
 * Parse exact "true" or "false" string to true or false, undefined otherwise
 * @param value
 * @returns
 */
export function parseBoolean(value: string): boolean | undefined {
  return value === 'true' ? true : value === 'false' ? false : undefined;
}
