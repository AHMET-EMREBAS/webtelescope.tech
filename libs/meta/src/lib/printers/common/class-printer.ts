import { Constructor } from './constructor';
import { IPrinter } from './printer';

export interface IClassPrinter extends IPrinter {
  name: string;
  extendings?: Constructor[];
  implementings?: Constructor[];
  decorators?: IPrinter[];
  properties?: IPrinter[];
  importings?: IPrinter[];

  printImports(): string;
  printExtends(): string;
  printImplements(): string;
  printDecorators(): string;
  printProperties(): string;
}
