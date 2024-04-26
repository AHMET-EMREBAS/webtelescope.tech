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

  __propertyOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { excludeFromView, searchable, ...options } = this.options;
    return options;
  }
  propertyDecorator() {
    const prop = (options: PropertyOptions) =>
      `@Property(${stringify(options)})`;

    switch (this.classType) {
      case ClassType.QueryDto:
      case ClassType.UpdateDto:
        return prop({ ...this.__propertyOptions(), required: undefined });
      default:
        return prop(this.__propertyOptions());
    }
  }

  columnDecorator() {
    return `@Column(${stringify({
      type: this.options.type,
      required: this.required,
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
