import { PropertyOptions } from '../meta';
import { toPropertyName } from '../utils';
import { ClassType, IName, IRequried } from './__common';

export class CommonPropertyPrinterImp implements IRequried, IName {
  constructor(
    protected readonly propertyName: string,
    protected readonly classType: ClassType,
    protected readonly __options: Pick<PropertyOptions, 'required'>
  ) {}

  name(): string {
    return this.propertyName;
  }

  viewName(modelName: string): string {
    return toPropertyName(modelName, this.propertyName);
  }

  /**
   * Mark the property required based on the provided class-type.
   * For example, in interfaces required mark is not allowed.
   * @returns
   */
  isRequried(): string {
    switch (this.classType) {
      case ClassType.CreateDto:
      case ClassType.Entity:
        return this.__options.required ? '!' : '?';

      case ClassType.IEntity:
      case ClassType.ICreateDto:
        return this.__options.required ? '' : '?';

      case ClassType.IUpdateDto:
      case ClassType.IQueryDto:
      case ClassType.UpdateDto:
      case ClassType.QueryDto:
        return '?';

      case ClassType.View:
        return '!';

      case ClassType.IView:
        return '';

      default:
        return '?';
    }
  }
}
