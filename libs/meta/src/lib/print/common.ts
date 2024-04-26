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
   * Convert list of string into property name
   * @example toPropertyName(some, some , other) // Output: someSomeOther
   * @param args
   * @returns
   */
  toPropertyName(...args: string[]) {
    return toPropertyName(...args);
  }

  /**
   * Convert string into file name
   * @example  Some -> some, SomeFile -> some-file
   * @param name
   * @returns
   */
  toFileName(name: string) {
    return names(name).fileName;
  }
  /**
   * Convert string into class name
   * @example  someName -> SomeName, product -> Product
   * @param name
   * @returns
   */
  toClassName(name: string) {
    return names(name).className;
  }

  /**
   * Import items from the given package
   * You do not have to hard code the `packageName`
   * There are 2 methods  {@link baseClassesPackageName} and {@link baseInterfacesPackageName}
   * You can override these two methods to provide your pacakge names.
   * @param packageName
   * @param items
   * @returns
   */
  importFromPackage(packageName: string, ...items: string[]): string {
    return `import { ${items} } from '${packageName}';`;
  }

  /**
   * Import items from the provided sibling directory (../model-name). You just need to provide the model names.
   * @param from
   * @param modelNames
   * @returns
   */
  importFromSiblingDir(from: string, ...modelNames: string[]): string {
    return `import { ${modelNames} } from '../${from}';`;
  }

  /**
   * Import items from the provided sibling file (./model-name). You ust need to provide the model name.
   * @param from
   * @param items
   * @returns
   */
  importFromSiblingFile(from: string, ...items: string[]): string {
    return `import { ${items} } from '../${from}';`;
  }

  /**
   * Base class files' location
   * @returns '@webpackages/core';
   */
  baseClassesPackageName() {
    return '@webpackages/core';
  }

  /**
   * Base interface files' location.
   * @returns '@webpackages/common';
   */
  baseInterfacesPackageName() {
    return '@webpackages/common';
  }

  /**
   * Print the name of the property based on the provided classType in the printer
   * @example name() returns  `propertyName` in `entity class`, `classNamePropertyName` in `view class`
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

  /**
   * Convert property name of the model into view name by prefixing the property name with model name.
   * @param modelName
   * @param propertyName
   * @returns
   */
  viewName(modelName: string, propertyName: string): string {
    return toPropertyName(modelName, propertyName);
  }

  /**
   * Mark the property required based on the provided class-type.
   * @example  in interfaces required mark is not allowed.
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
