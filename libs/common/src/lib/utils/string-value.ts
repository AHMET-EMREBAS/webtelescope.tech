import { Some } from '../types';

/**
 * If the trimmed string is not empty, then return the trimmed string or undefined.
 */
export function stringValue(value?: unknown): Some<string> {
  if (typeof value == 'string') {
    const trimmedString = value.trim();
    if (trimmedString.length > 0) return trimmedString;
  }
  return undefined;
}
