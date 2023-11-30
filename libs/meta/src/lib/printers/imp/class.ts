import {
  IClassPrinter,
  IInterfacePrinter,
  ClassPrinterOptions,
} from '../common';

export abstract class AbstractClassPrinter
  implements IInterfacePrinter, IClassPrinter
{
  constructor(
    public readonly classType: 'class' | 'interface',
    public readonly options: ClassPrinterOptions
  ) {}

  printClassName(): string {
    return this.options.name;
  }

  printImplements(): string {
    if (this.classType === 'interface') {
      return '';
    }
    if (this.options.implementings && this.options.implementings.length > 0) {
      const list = this.options.implementings.map((e) => e).join(',');
      return `implements ${list}`;
    }
    return '';
  }

  printDecorators(): string {
    if (this.classType === 'interface') {
      return '';
    }
    if (this.options.decorators && this.options.decorators.length > 0) {
      return this.options.decorators.map((e) => e.print()).join('\n') + '\n';
    }
    return '';
  }

  printExtends(): string {
    if (this.options.extendings && this.options.extendings.length > 0) {
      return 'extends ' + this.options.extendings.map((e) => e).join(',');
    }
    return '';
  }

  printImports(): string {
    if (this.options.importings && this.options.importings.length > 0) {
      return this.options.importings.map((e) => e.print()).join('\n') + '\n';
    }
    return '';
  }

  printProperties(): string {
    if (this.options.properties && this.options.properties.length > 0) {
      return '\n'+ this.options.properties.map((e) => e.print()).join('\n') + '\n';
    }
    return '';
  }

  print(): string {
    return `${this.printImports()}${this.printDecorators()}export ${
      this.classType
    } ${this.printClassName()} ${this.printImplements()} ${this.printExtends()} { ${this.printProperties()}} `;
  }
}
