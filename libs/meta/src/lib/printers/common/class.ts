import { Constructor } from './constructor';
import { Printable } from './printer';

export interface ClassPrinterOptions {
  name: string;
  extendings?: Constructor[];
  implementings?: Constructor[];
  decorators?: Printable[];
  properties?: Printable[];
  importings?: Printable[];
}
export interface IClassPrinter extends Printable {
  options: ClassPrinterOptions;
  printPropertyName(): string;
  printImports(): string;
  printExtends(): string;
  printImplements(): string;
  printDecorators(): string;
  printProperties(): string;
}
