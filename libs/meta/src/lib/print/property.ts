import { PropertyOptions } from '../meta';
import { names, stringify, toPropertyName } from '../utils';
import {
  ClassTypes,
  IDecorate,
  IImport,
  IName,
  IRequried,
  IType,
} from './__common';

export class PropertyPrinter
  implements IType, IName, IRequried, IDecorate, IImport
{
  constructor(
    protected readonly ctype: ClassTypes,
    protected readonly pname: string,
    protected readonly options: PropertyOptions,
    protected readonly cpn = '@webpackages/common'
  ) {}

  /**
   * Property types cannot be entity types, they are global standalone types like Day, Week, Month etc.
   * So all of class variants will use the same type.
   * If the property is enum, then enum type, otherwise the object type or empty string
   * @returns
   */
  importing(): string {
    const objectType = this.options.objectType;
    const enumName = this.options.enums
      ? names(this.pname).className
      : undefined;

    return enumName ?? objectType ?? '';
  }

  name(): string {
    return this.pname;
  }

  viewName(modelName: string): string {
    return toPropertyName(modelName, this.pname);
  }

  isRequried(): string {
    switch (this.ctype) {
      case ClassTypes.CreateDto:
      case ClassTypes.Entity:
        return this.options.required ? '!' : '?';

      case ClassTypes.IEntity:
      case ClassTypes.ICreateDto:
        return this.options.required ? '' : '?';

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

  decorators(): string {
    switch (this.ctype) {
      case ClassTypes.CreateDto:
      case ClassTypes.UpdateDto:
      case ClassTypes.QueryDto:
        return `@Property(${stringify(this.options)})`;
      case ClassTypes.Entity:
        return `@Column(${stringify({
          type: this.options.type,
          unique: this.options.unique,
        })})`;
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
