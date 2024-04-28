import { ClassType, INameFactory, IStringPickerByClassType } from '../common';

/**
 * Produce the class name based on the provided class-type {@link ClassType}
 */
export class ClassNameFactory implements INameFactory, IStringPickerByClassType {
  readonly Entity = ClassType.Entity.replace('#', this.className);
  readonly View = ClassType.View.replace('#', this.className);
  readonly Create = ClassType.Create.replace('#', this.className);
  readonly Update = ClassType.Update.replace('#', this.className);
  readonly Query = ClassType.Query.replace('#', this.className);
  readonly IEntity = ClassType.IEntity.replace('#', this.className);
  readonly IView = ClassType.IView.replace('#', this.className);
  readonly ICreate = ClassType.ICreate.replace('#', this.className);
  readonly IUpdate = ClassType.IUpdate.replace('#', this.className);
  readonly IQuery = ClassType.IQuery.replace('#', this.className);

  pick(classType: ClassType) {
    switch (classType) {
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
  constructor(protected readonly className: string) {}
}
