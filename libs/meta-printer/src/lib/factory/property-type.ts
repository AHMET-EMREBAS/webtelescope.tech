import { PropertyType } from '../__meta';
import { ClassType, IPicker } from '../common';

export class PropertyTypePicker
  implements IPicker<ClassType, string, PropertyType>
{
  pick(type: ClassType, options?: PropertyType | undefined): string {
    switch (type) {
      case ClassType.Create:
      case ClassType.Update:
      case ClassType.Entity:
        return type;
      case ClassType.ICreate:
      case ClassType.IEntity:
      case ClassType.IQuery:
      case ClassType.IUpdate:
      case ClassType.IView:
      case ClassType.Query:
      case ClassType.View:
    }

    return '';
  }
}
