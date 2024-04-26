import { names, toPropertyName } from '../utils';
import {
  ClassType,
  IFormatImport,
  IName,
  IRequried,
  IToName,
} from './__common';

export class CommonPrinter implements IRequried, IName, IFormatImport, IToName {
  constructor(
    protected readonly classType: ClassType,
    protected readonly modelName: string,
    protected readonly propertyName: string,
    protected readonly required?: boolean
  ) {}

  /**
   * Utility converts list of properties a single property name
   * @param args
   * @returns
   */
  toPropertyName(...args: string[]) {
    return toPropertyName(...args);
  }

  /**
   * Utility function
   * @param name
   * @returns
   */
  toFileName(name: string) {
    return names(name).fileName;
  }
  /**
   * Utility function
   * @param name
   * @returns
   */
  toClassName(name: string) {
    return names(name).className;
  }

  importFromPackage(from: string, ...items: string[]): string {
    return `import { ${items} } from '${from}';`;
  }

  importFromSiblingDir(from: string, ...items: string[]): string {
    return `import { ${items} } from '../${from}';`;
  }

  importFromSiblingFile(from: string, ...items: string[]): string {
    return `import { ${items} } from '../${from}';`;
  }

  /**
   * @returns '@webpackages/core';
   */
  baseClassesPackageName() {
    return '@webpackages/core';
  }

  /**
   * @returns '@webpackages/common';
   */
  baseInterfacesPackageName() {
    return '@webpackages/common';
  }

  /**
   * Property name
   * @returns
   */
  name(): string {
    switch (this.classType) {
      case ClassType.View:
      case ClassType.IView:
      case ClassType.IQueryDto:
      case ClassType.QueryDto:
        return this.viewName(this.modelName, this.propertyName);
    }
    return this.propertyName;
  }

  viewName(modelName: string, propertyName: string): string {
    return toPropertyName(modelName, propertyName);
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
