import { ClassType, __PickPrinter } from '../common';

export const PickDecoratorPrinter: __PickPrinter = <T>(classType: ClassType) => {
  switch (classType) {
    case ClassType.Create:
    case ClassType.Entity:
    case ClassType.Query:
    case ClassType.Update:
    case ClassType.View:
      return '';

    case ClassType.IEntity:
    case ClassType.ICreate:
    case ClassType.IQuery:
    case ClassType.IUpdate:
    case ClassType.IView:
      return '';
  }

  console.log(options);
  return '';
};
