
import { Printable } from './printer';

export interface ClassPrinterOptions {
  name: string;
  extendings?: string[];
  implementings?: string[];
  decorators?: Printable[];
  properties?: Printable[];
  importings?: Printable[];
}

export interface IClassPrinter extends Printable {
  options: ClassPrinterOptions;
  printClassName(): string;
  printImports(): string;
  printExtends(): string;
  printImplements(): string;
  printDecorators(): string;
  printProperties(): string;
}
