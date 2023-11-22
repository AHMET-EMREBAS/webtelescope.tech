import { Transform } from 'class-transformer';

/**
 * Transform delimeted string list into array list. Eliminate empty strings
 * @param delimeter
 * @returns Property Transform Decorator
 */
export function __StringArrayTransformer(delimeter: string) {
  return Transform(({ value }) => {
    return (
      value &&
      (value as string)
        .split(delimeter)
        .map((e) => e && e.trim())
        .filter((e) => e)
    );
  });
}
