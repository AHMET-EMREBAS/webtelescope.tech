import { ClassName } from '../../../common';
import { RequiredConverter, RequiredConverterOptions } from '../../../core/relation';

export const requiredConverter: RequiredConverter = (
  options: RequiredConverterOptions
) => {
  const { classType, required } = options;
  switch (classType) {
    case ClassName.Create:
    case ClassName.ICreate:
    case ClassName.Entity:
    case ClassName.IEntity:
      return required == true ? true : false;
    case ClassName.IQuery:
    case ClassName.IUpdate:
    case ClassName.Query:
    case ClassName.Update:
      return false;
    case ClassName.View:
    case ClassName.IView:
      return true;
  }
};
