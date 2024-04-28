import { ClassType } from './class-type';
import { INameFactory, IStringPickerByClassType } from './factory';

export class BaseStringPicker
  implements INameFactory, IStringPickerByClassType
{
  readonly Entity: string = '';
  readonly View: string = '';
  readonly Create: string = '';
  readonly Update: string = '';
  readonly Query: string = '';
  readonly IEntity: string = '';
  readonly IView: string = '';
  readonly ICreate: string = '';
  readonly IUpdate: string = '';
  readonly IQuery: string = '';

  pick(type: ClassType): string {
    switch (type) {
      case ClassType.Entity:
        return this.Entity;
      case ClassType.View:
        return this.View;
      case ClassType.Create:
        return this.Create;
      case ClassType.Update:
        return this.Update;
      case ClassType.Query:
        return this.Query;
      case ClassType.IEntity:
        return this.IEntity;
      case ClassType.IView:
        return this.IView;
      case ClassType.ICreate:
        return this.ICreate;
      case ClassType.IUpdate:
        return this.IUpdate;
      case ClassType.IQuery:
        return this.IQuery;
    }
  }
}
