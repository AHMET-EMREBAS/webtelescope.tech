import { PropertyOptions } from '../meta';
import { stringify } from '../utils';
import {
  ClassType,
  IArray,
  IDecorate,
  IImport,
  IName,
  IPrint,
  IRequried,
  IType,
} from './__common';
import { CommonPropertyPrinterImp } from './common';

export class PropertyPrinter
  extends CommonPropertyPrinterImp
  implements IPrint, IType, IName, IRequried, IDecorate, IImport, IArray
{
  constructor(
    classType: ClassType,
    modelName: string,
    propertyName: string,
    protected readonly options: PropertyOptions
  ) {
    super(classType, modelName, propertyName, options.required);
  }

  isArray(): string {
    return this.options.isArray ? '[]' : '';
  }

  __type() {
    switch (this.options.type) {
      case 'boolean':
      case 'number':
      case 'string':
        return this.options.type;
      case 'date':
        return 'Date';
      case 'object':
        return this.options.objectType ?? 'any';

      default:
        return '';
    }
  }
  
  type(): string {
    return this.__type() + this.isArray();
  }

  /**
   * import requried types for the property
   * For example, SomeEnum, SomeType
   * @returns
   */
  importing(): string {
    const objectType = this.options.objectType;
    const enumName = this.options.enums
      ? this.toClassName(this.propertyName)
      : undefined;

    return enumName ?? objectType ?? '';
  }

  propertyDecorator() {
    return `@Property(${stringify(this.options)})`;
  }

  columnDecorator() {
    return `@Column(${stringify({
      type: this.options.type,
      unique: this.options.unique,
    })})`;
  }

  viewDecorator() {
    return '@ViewColumn()';
  }

  decorators(): string {
    switch (this.classType) {
      case ClassType.CreateDto:
      case ClassType.UpdateDto:
      case ClassType.QueryDto:
        return this.propertyDecorator();
      case ClassType.Entity:
        return this.columnDecorator();
      case ClassType.View:
        return this.viewDecorator();

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

  print(): string {
    return `${this.decorators()} ${this.name()}${this.isRequried()}: ${this.type()};`;
  }
}
