import { names, toPropertyName } from '../utils';
import {
  ClassType,
  IFormatImport,
  IName,
  IRequried,
  IToName,
} from './__common';

export class CommonPropertyPrinterImp
  implements IRequried, IName, IFormatImport, IToName
{
  constructor(
    protected readonly classType: ClassType,
    protected readonly modelName: string,
    protected readonly propertyName: string,
    protected readonly required?: boolean
  ) {}

  /**
   * Convert list of properties a single property name
   * @param args
   * @returns
   */
  toPropertyName(...args: string[]) {
    return toPropertyName(...args);
  }

  toFileName(name: string) {
    return names(name).fileName;
  }

  toClassName(name: string) {
    return names(name).className;
  }

  formatImport(from: string, ...items: string[]): string {
    return `import { ${items} } from '../${from}'`;
  }

  name(): string {
    switch (this.classType) {
      case ClassType.View:
      case ClassType.IView:
      case ClassType.IQueryDto:
      case ClassType.QueryDto:
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
        return this.required ? '!' : '?';

      case ClassType.IEntity:
      case ClassType.ICreateDto:
        return this.required ? '' : '?';

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
