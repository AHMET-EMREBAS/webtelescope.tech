import { Constructor } from './constructor';
import { Printable } from './printer';

export interface InterfacePrinterOptions {
  name: string;
  extendings?: Constructor[];
  properties?: Printable[];
  importings?: Printable[];
}
export interface IInterfacePrinter extends Printable {
  options: InterfacePrinterOptions;
  printPropertyName(): string;
  printImports(): string;
  printExtends(): string;
  printProperties(): string;
}
