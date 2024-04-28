import { ClassType as __ClassType } from '../__printer';
import { ClassType, INamePickerByClassType } from '../common';

/**
 * Produce the type of class interface or class {@link __ClassType}
 */
export class ClassTypeFactory implements INamePickerByClassType {
  pick(classType: ClassType) {
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
}
