import { Transform } from 'class-transformer';
import { CreateParserTransformer } from './create-parser';

/**
 * Parse number string to integer value
 * @param defaultValue
 * @returns {PropertyDecorator}
 */
export function ParseIntTransformer(defaultValue?: number): PropertyDecorator {
  return CreateParserTransformer(parseInt, defaultValue);
}
