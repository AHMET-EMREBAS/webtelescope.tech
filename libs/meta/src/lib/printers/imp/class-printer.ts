import {
  IClassPrinter,
  Constructor,
  IInterfacePrinter,
  IPrinter,
} from '../common';

export abstract class AbstractClassPrinter
  implements IInterfacePrinter, IClassPrinter
{
  constructor(
    public readonly name: string,
    public readonly classType: 'interface' | 'class',
    public readonly extendings?: Constructor[],
    public readonly properties?: IPrinter[],
    public readonly importings?: IPrinter[],
    public readonly implementings?: Constructor[],
    public readonly decorators?: IPrinter[]
  ) {}

  printImplements(): string {
    if (this.implementings && this.implementings.length > 0) {
      const list = this.implementings.map((e) => e.name).join(',');
      return `implements ${list}`;
    }
    return '';
  }
  printDecorators(): string {
    if (this.decorators && this.decorators.length > 0) {
      return this.decorators.map((e) => e.print()).join('\n') + '\n';
    }
    return '';
  }

  printExtends(): string {
    if (this.extendings && this.extendings.length > 0) {
      return 'extends ' + this.extendings.map((e) => e.name).join(',');
    }

    return '';
  }

  printImports(): string {
    if (this.importings && this.importings.length > 0) {
      return this.importings.map((e) => e.print()).join('\n') + '\n';
    }
    return '';
  }

  printProperties(): string {
    if (this.properties && this.properties.length > 0) {
      return this.properties.map((e) => e.print()).join('\n') + '\n';
    }
    return '';
  }

  print(): string {
    return `${this.printImports()}${this.printDecorators()}export ${
      this.classType
    } ${
      this.name
    } ${this.printImplements()} ${this.printExtends()} { ${this.printProperties()}} `;
  }
}
