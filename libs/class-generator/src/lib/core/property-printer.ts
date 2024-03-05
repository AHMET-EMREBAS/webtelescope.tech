import { CommonOptions } from './common-options';
import { Printer } from './printer';
import { runPrinters } from './run-printers';

export class PropertyOptions extends CommonOptions {
  type!: string;
  required?: boolean;
  isArray?: boolean;
  decorators?: Printer[];
}

export class PropertyPrinter implements Printer {
  constructor(protected readonly options: PropertyOptions) {}

  protected isRequired(): string {
    return this.options.required ? '!:' : '?:';
  }

  protected printDecorators() {
    return runPrinters(this.options.decorators);
  }

  print(): string {
    const isArray = this.options.isArray ? '[]' : '';
    const propertyName = this.options.name;
    const propertyType = this.options.type;

    return `${this.printDecorators()}${propertyName}${this.isRequired()}${propertyType}${isArray};`;
  }
}

export class InterfacePropertyPrinter extends PropertyPrinter {
  protected override isRequired(): string {
    return this.options.required ? ':' : '?:';
  }

  protected override printDecorators(): string {
    return '';
  }
}
