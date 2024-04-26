import { ClassType } from './class-type';

/**
 * Function that returns required or optional mark based on the class type {@link ClassType}
 */
export type IsRequiredHandler = (
  classType: ClassType,
  required?: boolean
) => '!' | '?' | '';

/**
 * Mark the property by "!" | "?" | "" based on the required contraint and class-type {@link ClassType}.
 * @param classType {@link ClassType}
 * @param required boolean
 * @returns
 */
export const DefaultIsRequiredHandler: IsRequiredHandler = (
  classType: ClassType,
  required?: boolean
) => {
  switch (classType) {
    case ClassType.Create:
    case ClassType.Update:
    case ClassType.Entity:
    case ClassType.Query:
    case ClassType.View:
      return required ? '!' : '?';
    default:
      return required ? '' : '?';
  }
};
