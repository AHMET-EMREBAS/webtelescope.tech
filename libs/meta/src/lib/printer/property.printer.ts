import { PropertyOptions } from '../meta';
import { uppercaseFirst } from '../utils';
import { ClassType } from './class-type';

/**
 * Print property string
 * @param classType {@link ClassType}
 * @param propertyName
 * @param options {@link PropertyOptions}
 * @returns
 */
export function printProperty(
  classType: ClassType,
  propertyName: string,
  options: PropertyOptions
) {
  const { type } = options;

  const pType = options.enums
    ? uppercaseFirst(propertyName)
    : type === 'date'
    ? 'Date'
    : type === 'object'
    ? options.objectType ?? 'any'
    : type;

  const isArray = options.isArray ? '[]' : '';

  const isRequried =
    classType === 'dto-query'
      ? '?'
      : options.required
      ? classType === 'interface'
        ? ''
        : '!'
      : '?';

  return `${propertyName}${isRequried}:${pType}${isArray};`;
}
