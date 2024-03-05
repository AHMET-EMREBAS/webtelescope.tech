import { CommonOptions } from './common-options';
import { Printer } from './printer';
import { runPrinters } from './run-printers';

export class ClassOptions extends CommonOptions {
  decorators?: Printer[];
  imports?: Printer[];
  extendings?: Printer[];
  properties?: Printer[];
}

export class CLassPrinter implements Printer {
  constructor(protected options: ClassOptions) {}

  protected printDecorators() {
    return runPrinters(this.options.decorators, ' ', '');
  }

  protected printProperties() {
    return runPrinters(this.options.properties, ' ', '');
  }

  protected printExtends() {
    const text = runPrinters(this.options.extendings, ', ', '');
    return text ? ` extends ${text}` : '';
  }

  protected printImports() {
    return runPrinters(this.options.imports, ' ', '');
  }

  protected classType() {
    return ' class ';
  }

  print(): string {
    return `${this.printImports()}${this.printDecorators()}export${this.classType()}${
      this.options.name
    }${this.printExtends()}{${this.printProperties()}}`;
  }
}

export class InterfacePrinter extends CLassPrinter {
  protected override classType(): string {
    return ' interface ';
  }
}
