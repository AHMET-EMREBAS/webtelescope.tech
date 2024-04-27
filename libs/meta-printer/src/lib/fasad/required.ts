import { ClassType } from '../common';

/**
 * Mark the property by "!" | "?" | "" based on the required contraint and class-type {@link ClassType}.
 * @param classType {@link ClassType}
 * @param required boolean
 * @returns
 */
export const IsRequiredProperty = (
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
