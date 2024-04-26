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
import { CommonPrinter } from './common';

/**
 * Print relation property
 */
export class RelationPrinter
  extends CommonPrinter
  implements IPrint, IName, IRequried, IDecorate, IImport, IArray, IType
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

  type(): string {
    switch (this.classType) {
      case ClassType.CreateDto:
      case ClassType.UpdateDto:
        return CommonObjectTypes.IDDto + this.isArray();
      case ClassType.IUpdateDto:
      case ClassType.ICreateDto:
        return CommonObjectTypes.IID + this.isArray();

      case ClassType.Entity:
        return this.modelName + this.isArray();
      case ClassType.IEntity:
        return (
          CommonObjectTypes.GENERIC_PREFIX + this.modelName + this.isArray()
        );
      default:
        return '';
    }
  }

  relationDecorator() {
    return `@${this.relationType}(${this.modelName})`;
  }

  propertyDecorator() {
    return `@Property({ type:'object', objectType:IDDto, required:${this.required} })`;
  }

  decorators(): string {
    switch (this.classType) {
      case ClassType.Entity:
        return this.relationDecorator();

      case ClassType.CreateDto:
      case ClassType.UpdateDto:
        return this.propertyDecorator();

      case ClassType.View:
        return '@ViewColumn()';

      case ClassType.QueryDto:
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
        return this.importFromPackage(
          this.baseClassesPackageName(),
          CommonObjectTypes.IDDto
        );

      case ClassType.ICreateDto:
      case ClassType.IUpdateDto:
        return this.importFromPackage(
          this.baseInterfacesPackageName(),
          CommonObjectTypes.IID
        );
      case ClassType.Entity:
      case ClassType.View:
        return this.importFromSiblingDir(
          this.toFileName(this.modelName),
          this.modelName
        );

      case ClassType.IEntity:
      case ClassType.IQueryDto:
      case ClassType.IView:
      case ClassType.QueryDto:
        return '';
      default:
        return '';
    }
  }

  print(): string {
    // No printing for view and queries becuase we do not know the properties of this relation.
    switch (this.classType) {
      case ClassType.View:
      case ClassType.IView:
      case ClassType.QueryDto:
      case ClassType.IQueryDto:
        return '';
    }

    const spaceAfter = (value?: string) => (value ? value + ' ' : '');
    return [
      spaceAfter(this.decorators()),
      this.name(),
      this.isRequried(),
      spaceAfter(':'),
      this.type(),
      ';',
    ].join('');
  }
}
