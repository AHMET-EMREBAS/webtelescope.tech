import { RelationType } from '../meta';

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
    classType: ClassType,
    modelName: string,
    propertyName: string,
    protected readonly relationType: RelationType,
    protected readonly requried?: boolean
  ) {
    super(classType, modelName, propertyName, requried);
  }

  isArray(): string {
    return this.relationType === 'Many' ? '[]' : '';
  }

  decorators(): string {
    switch (this.classType) {
      case ClassType.Entity:
        return `@${this.relationType}(${this.modelName})`;

      case ClassType.CreateDto:
      case ClassType.UpdateDto:
        return `@Property({ type:'object', objectType:IDDto, required:${this.required} })`;

      case ClassType.QueryDto:
        return `@Property({type:'${this.relationType}' })`;
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
    return `import { ${this.modelName} } from '../${this.toPropertyName(
      this.modelName
    )}'`;
  }

  type(): string {
    switch (this.classType) {
      case ClassType.CreateDto:
      case ClassType.UpdateDto:
        return CommonObjectTypes.IDDto + this.isArray();
      case ClassType.IUpdateDto:
      case ClassType.ICreateDto:
        return CommonObjectTypes.IID + this.isArray();

      case ClassType.Entity:
      case ClassType.IEntity:
        return this.modelName + this.isArray();
    }

    return '';
  }

  print(): string {
    return `${this.decorators()}${this.name()}${this.isRequried()}:${this.type()};`;
  }
}
