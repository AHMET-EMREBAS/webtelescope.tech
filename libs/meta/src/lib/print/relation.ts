import { PropertyOptions, RelationOptions } from '../meta';
import { toPropertyName } from '../utils';
import {
  ClassTypes,
  IDecorate,
  IImport,
  IName,
  IRequried,
  IType,
} from './__common';
import { CommonPrintImp } from './common';

export class RelationPrinter
  extends CommonPrintImp
  implements IType, IName, IRequried, IDecorate, IImport
{
  constructor(
    propertyName: string,
    classType: ClassTypes,
    protected readonly options: RelationOptions,
    protected readonly cpn = '@webpackages/common'
  ) {
    super(propertyName, classType, { required: options.requried });
  }

  decorators(): string {
    const { target, type } = this.options;

    switch (this.classType) {
      case ClassTypes.Entity:
        return `@${this.options.type}(${this.options.target})`;

      case ClassTypes.CreateDto:
      case ClassTypes.UpdateDto:
        return `@Property({ type:'object', objectType:IDDto, requried:${this.options.requried} })`;

      case ClassTypes.QueryDto:
        return `@Property({type: '${this.options.type}' })`;
      case ClassTypes.View:
        return '@ViewColumn()';

      case ClassTypes.IEntity:
      case ClassTypes.ICreateDto:
      case ClassTypes.IUpdateDto:
      case ClassTypes.IQueryDto:
      case ClassTypes.IView:
        return '';
      default:
        return '';
    }

    return `@${type}(${target})`;
  }

  importing(): string {
    throw new Error('Method not implemented.');
  }

  type(): string {
    throw new Error('Method not implemented.');
  }
}
