import { PropertyOptions } from '../meta';
import { names, stringify } from '../utils';
import {
  ClassType,
  IDecorate,
  IImport,
  IName,
  IRequried,
  IType,
} from './__common';
import { CommonPropertyPrinterImp } from './common';

export class BasePropertyPrinter
  extends CommonPropertyPrinterImp
  implements IType, IName, IRequried, IDecorate, IImport
{
  constructor(
    cname: string,
    ctype: ClassType,
    protected readonly options: PropertyOptions,
    protected readonly cpn = '@webpackages/common'
  ) {
    super(cname, ctype, options);
  }

  /**
   * Property types cannot be entity types, they are global standalone types like Day, Week, Month etc.
   * So all of class variants will use the same type.
   * If the property is enum, then enum type, otherwise the object type or empty string
   * @returns
   */
  importing(): string {
    const objectType = this.options.objectType;
    const enumName = this.options.enums
      ? names(this.propertyName).className
      : undefined;

    return enumName ?? objectType ?? '';
  }

  decorators(): string {
    switch (this.classType) {
      case ClassType.CreateDto:
      case ClassType.UpdateDto:
      case ClassType.QueryDto:
        return `@Property(${stringify(this.options)})`;
      case ClassType.Entity:
        return `@Column(${stringify({
          type: this.options.type,
          unique: this.options.unique,
        })})`;
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

  private __primitiveType() {
    switch (this.options.type) {
      case 'boolean':
      case 'string':
      case 'number':
        return this.options.type;
      case 'date':
        return 'Date';
      case 'object':
        return this.options.objectType ?? 'any';
      default:
        return 'any';
    }
  }

  type(): string {
    const isArray = this.options.isArray ? '[]' : '';
    return this.__primitiveType() + isArray;
  }
}
