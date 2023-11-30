import {
  Printable,
  CommonPropertyOptions,
  IClassPropertyPrinter,
  IInterfacePropertyPrinter,
} from '../common';

export abstract class AbstractInterfacePropertyPrinter<
  PropertyOptions extends CommonPropertyOptions
> implements IInterfacePropertyPrinter<PropertyOptions>
{
  constructor(public readonly options: PropertyOptions) {}

  printIsRequired(): string {
    return this.options.required === true ? '' : '!';
  }

  printType(): string {
    let type: string = this.options.type;
    if (type === 'date') type = 'Date';
    else if (type === 'object') {
      if (this.options.target) {
        type = this.options.target.name;
      }
      throw new Error('Target must be provided when the type is set object!');
    }
    if (this.options.isArray === true) {
      return `${type}[]`;
    }
    return type;
  }

  print(): string {
    return `${this.options.name}${this.printIsRequired()}:${this.printType()};`;
  }
}

export abstract class AbstractClassPropertyPrinter<
    PropertyOptions extends CommonPropertyOptions
  >
  extends AbstractInterfacePropertyPrinter<PropertyOptions>
  implements IClassPropertyPrinter<PropertyOptions>
{
  constructor(
    options: PropertyOptions,
    public readonly decorators?: Printable[]
  ) {
    super(options);
  }

  override printIsRequired(): string {
    return this.options.required === true ? '!' : '?';
  }

  printDecorators(): string {
    if (this.decorators && this.decorators.length > 0) {
      return this.decorators.map((e) => e.print()).join('\n') + '\n';
    }
    return '';
  }

  override print(): string {
    return `${this.printDecorators()}${super.print()}`;
  }
}
