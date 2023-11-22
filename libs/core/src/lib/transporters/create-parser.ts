import { Transform } from 'class-transformer';

/**
 * Create parse transformer
 * @param parseValue 
 * @param defaultValue 
 * @returns 
 */
export function CreateParserTransformer<T>(
  parseValue: (value: string) => T,
  defaultValue?: T
) {
  return Transform(({ value }) => {
    if (value != undefined) {
      return parseValue(value);
    }

    if (defaultValue != undefined) {
      return defaultValue;
    }

    return value;
  });
}
