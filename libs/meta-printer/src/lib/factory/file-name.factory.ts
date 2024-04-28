import { ClassType, INameFactory, IPicker } from '../common';

/**
 * Provides a convinient way to create file names by {@link ClassType}
 */
export class FileNameFactory
  implements INameFactory, IPicker<ClassType, string>
{
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

  /**
   * Pick file name by {@link ClassType}
   */
  pick(classType: ClassType): string {
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
   * @param fileName the raw file name such us product, user, category without any extentions or variants.
   */
  constructor(protected readonly fileName: string) {}
}
