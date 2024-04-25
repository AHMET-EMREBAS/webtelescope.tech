import { PropertyOptions } from '../meta';
import { toPropertyName } from '../utils';
import { ClassTypes, IName, IRequried } from './__common';

export class CommonPrintImp implements IRequried, IName {
  constructor(
    protected readonly propertyName: string,
    protected readonly classType: ClassTypes,
    protected readonly __options: Pick<PropertyOptions, 'required'>
  ) {}

  name(): string {
    return this.propertyName;
  }

  viewName(modelName: string): string {
    return toPropertyName(modelName, this.propertyName);
  }
  
  isRequried(): string {
    switch (this.classType) {
      case ClassTypes.CreateDto:
      case ClassTypes.Entity:
        return this.__options.required ? '!' : '?';

      case ClassTypes.IEntity:
      case ClassTypes.ICreateDto:
        return this.__options.required ? '' : '?';

      case ClassTypes.IUpdateDto:
      case ClassTypes.IQueryDto:
      case ClassTypes.UpdateDto:
      case ClassTypes.QueryDto:
        return '?';

      case ClassTypes.View:
        return '!';

      case ClassTypes.IView:
        return '';

      default:
        return '?';
    }
  }
}
