import { ClassType, INameFactory } from '../common';

export class FileNameFactory implements INameFactory {
  readonly Entity = this.replace('#.entity');
  readonly IEntity = this.replace('#');

  readonly View = this.replace('#.view');
  readonly IView = this.replace('#-view');

  readonly Create = this.replace('create-#.dto');
  readonly ICreate = this.replace('create-#');

  readonly Update = this.replace('update-#.dto');
  readonly IUpdate = this.replace('update-#');

  readonly Query = this.replace('query-#.dto');
  readonly IQuery = this.replace('query-#');

  private replace(ext: string) {
    return ext.replace('#', this.fileName);
  }

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

  /**
   *
   * @param fileName without any extention such as product, category, some
   */
  constructor(protected readonly fileName: string) {}
}
