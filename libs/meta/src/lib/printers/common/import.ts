import { Printable } from './printer';

export interface IImportPrinter extends Printable {
  target: string;
  basePath: string;
}
