import { Transform } from 'class-transformer';
import { CreateParserTransformer } from './create-parser';

/**
 * Parse float number string to integer value
 * @param defaultValue
 * @returns {PropertyDecorator}
 */
export function ParseFloatTransformer(defaultValue?: number): PropertyDecorator {
  return CreateParserTransformer(parseFloat, defaultValue);
}
