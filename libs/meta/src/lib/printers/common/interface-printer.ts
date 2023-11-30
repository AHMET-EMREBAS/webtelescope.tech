import { Constructor } from './constructor';
import { IPrinter } from './printer';

export interface IInterfacePrinter extends IPrinter {
  name: string;
  extendings?: Constructor[];
  properties?: IPrinter[];
  importings?: IPrinter[];

  printImports(): string;
  printExtends(): string;
  printProperties(): string;
}
