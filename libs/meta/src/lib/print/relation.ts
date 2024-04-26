import { RelationOptions } from '../meta';

import {
  ClassType,
  CommonObjectTypes,
  IArray,
  IDecorate,
  IImport,
  IName,
  IPrint,
  IRequried,
  IType,
} from './__common';
import { CommonPropertyPrinterImp } from './common';

/**
 * Print relation property
 */
export class RelationPrinter
  extends CommonPropertyPrinterImp
  implements IPrint, IType, IName, IRequried, IDecorate, IImport, IArray
{
  constructor(
    override classType: ClassType,
    override propertyName: string,
    override options: RelationOptions
  ) {
    super(classType, options.model.modelName, propertyName, {
      required: options.required,
    });
  }

  isArray(): string {
    return this.options.type === 'Many' ? '[]' : '';
  }

  decorators(): string {
    const { model, type } = this.options;
    const { modelName } = model;

    switch (this.classType) {
      case ClassType.Entity:
        return `@${type}(${modelName})`;

      case ClassType.CreateDto:
      case ClassType.UpdateDto:
        return `@Property({ type:'object', objectType:IDDto, required:${this.options.required} })`;

      case ClassType.QueryDto:
        return `@Property({type:'${type}' })`;
      case ClassType.View:
        return '@ViewColumn()';

      case ClassType.IEntity:
      case ClassType.ICreateDto:
      case ClassType.IUpdateDto:
      case ClassType.IQueryDto:
      case ClassType.IView:
        return '';
      default:
        return '';
    }
  }

  importing(): string {
    const { modelName: target } = this.options.model;
    switch (this.classType) {
      case ClassType.CreateDto:
      case ClassType.UpdateDto:
      case ClassType.ICreateDto:
      case ClassType.IUpdateDto:
        return this.formatImport(CommonObjectTypes.IID, 'types');
      case ClassType.Entity:
      case ClassType.IQueryDto:
      case ClassType.IView:
    }
    return `import { ${target} } from '../${this.toPropertyName(target)}'`;
  }

  type(): string {
    const { modelName: target } = this.options.model;

    switch (this.classType) {
      case ClassType.CreateDto:
      case ClassType.UpdateDto:
        return CommonObjectTypes.IDDto + this.isArray();
      case ClassType.IUpdateDto:
      case ClassType.ICreateDto:
        return CommonObjectTypes.IID + this.isArray();

      case ClassType.Entity:
      case ClassType.IEntity:
        return target + this.isArray();
    }

    return '';
  }

  print(): string {
    return `${this.decorators()}${this.name()}${this.isRequried()}:${this.type()};`;
  }
}
