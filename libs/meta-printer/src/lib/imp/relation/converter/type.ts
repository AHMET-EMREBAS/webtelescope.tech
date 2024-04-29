import { TypeConverter, TypeConverterOptions } from '../../../core/relation';
import { ClassName } from '../../../common';

export const typeConverter: TypeConverter = (
  options: TypeConverterOptions
): string => {
  const { classType, type } = options;
  switch (classType) {
    case ClassName.IEntity:
      return `T${type}`;
    case ClassName.Entity:
      return type;
    case ClassName.Create:
    case ClassName.Update:
      return 'IDDto';
    case ClassName.IUpdate:
    case ClassName.ICreate:
      return 'IID';
    case ClassName.IQuery:
    case ClassName.IView:
    case ClassName.Query:
    case ClassName.View:
      return 'any; // Something wrong with this line! Relation property should not be here!';
  }
};
