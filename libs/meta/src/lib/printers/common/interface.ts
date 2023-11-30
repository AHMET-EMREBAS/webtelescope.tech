import { Printable } from './printer';

export interface InterfacePrinterOptions {
  name: string;
  extendings?: string[];
  properties?: Printable[];
  importings?: Printable[];
}
export interface IInterfacePrinter extends Printable {
  options: InterfacePrinterOptions;
  printClassName(): string;
  printImports(): string;
  printExtends(): string;
  printProperties(): string;
}
