import { ClassName } from '../../../common';
import { ClassTypeConverter } from '../../../core/column';
import { ClassType as ExtClassType } from '@webpackages/printer';
/**
 * Convert {@link ClassName} to {@link ExtClassType}
 * @param classType
 * @returns
 */
export const classTypeConverter: ClassTypeConverter = (
  classType: ClassName
): ExtClassType => {
  switch (classType) {
    case ClassName.Entity:
    case ClassName.View:
    case ClassName.Create:
    case ClassName.Update:
    case ClassName.Query:
      return ExtClassType.CLASS;
    case ClassName.IEntity:
    case ClassName.IView:
    case ClassName.ICreate:
    case ClassName.IUpdate:
    case ClassName.IQuery:
      return ExtClassType.INTERFACE;
  }
};
