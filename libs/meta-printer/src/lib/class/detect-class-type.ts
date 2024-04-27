import { ClassType as __ClassType } from '../__printer';
import { ClassType } from '../common';

export function detectClassType(classType: ClassType): __ClassType {
  switch (classType) {
    case ClassType.Create:
    case ClassType.Entity:
    case ClassType.Query:
    case ClassType.View:
    case ClassType.Update:
      return __ClassType.CLASS;
    case ClassType.ICreate:
    case ClassType.IEntity:
    case ClassType.IQuery:
    case ClassType.IUpdate:
    case ClassType.IView:
      return __ClassType.INTERFACE;
  }
}
