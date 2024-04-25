import { PropertyOptions } from '../meta';
import { uppercaseFirst } from '../utils';
import { ClassType } from './class-type';

export function printPropertyType(
  classType: ClassType,
  propertyName: string,
  options: PropertyOptions
) {
  const { type, enums, objectType, isArray } = options;

  const __isArray = isArray ? '[]' : '';

  const __type = enums
    ? uppercaseFirst(propertyName)
    : type === 'date'
    ? 'Date'
    : type === 'object'
    ? objectType ?? 'any'
    : type;

  return `${__type}${__isArray}`;
}
