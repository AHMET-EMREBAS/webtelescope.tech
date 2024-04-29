import { ClassName } from '../../../common';
import { NameConverter, NameConverterOptions } from '../../../core/property';
import { toPropertyName } from '../../../utils';

export const nameConverter: NameConverter = (
  options: NameConverterOptions
) => {
  const { classType, modelName, propertyName } = options;
  switch (classType) {
    case ClassName.IEntity:
    case ClassName.Entity:
    case ClassName.Create:
    case ClassName.Update:
    case ClassName.ICreate:
    case ClassName.IUpdate:
      return propertyName;
    case ClassName.View:
    case ClassName.IView:
    case ClassName.Query:
    case ClassName.IQuery:
      return toPropertyName(modelName, propertyName);
  }
};
