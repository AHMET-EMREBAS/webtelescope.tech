import { CreateParserTransformer } from './create-parser';
import { parseBoolean } from '@webtelescopetech/utils';


/**
 * Parse float number string to integer value
 * @param defaultValue
 * @returns {PropertyDecorator}
 */
export function ParseBooleanTransformer(
  defaultValue?: boolean
): PropertyDecorator {
  return CreateParserTransformer(parseBoolean, defaultValue);
}
