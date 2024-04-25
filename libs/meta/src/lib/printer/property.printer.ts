import { PropertyOptions } from '../meta';
import { ClassType } from './class-type';
import { printPropertyType } from './property-type.printer';
import { printRequiredMark } from './required-mark.printer';

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
  const type = printPropertyType(classType, propertyName, { ...options });

  const required = printRequiredMark(classType, options.required);

  return `${propertyName}${required}:${type};`;
}
