import { PropertyOptions } from '../meta';
import { toPropertyName } from '../utils';
import {
  ClassType,
  IFormatImport,
  IName,
  IRequried,
  IToPropertyName,
} from './__common';

export class CommonPropertyPrinterImp
  implements IRequried, IName, IFormatImport, IToPropertyName
{
  constructor(
    protected readonly classType: ClassType,
    protected readonly modelName: string,
    protected readonly propertyName: string,
    protected readonly options: Pick<PropertyOptions, 'required'>
  ) {}

  /**
   * Convert list of properties a single property name
   * @param args
   * @returns
   */
  toPropertyName(...args: string[]) {
    return toPropertyName(...args);
  }

  formatImport(from: string, ...items: string[]): string {
    return `import { ${items} } from '../${from}'`;
  }

  name(): string {
    switch (this.classType) {
      case ClassType.View:
      case ClassType.IView:
        return this.toPropertyName(this.modelName, this.propertyName);
    }
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
        return this.options.required ? '!' : '?';

      case ClassType.IEntity:
      case ClassType.ICreateDto:
        return this.options.required ? '' : '?';

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
