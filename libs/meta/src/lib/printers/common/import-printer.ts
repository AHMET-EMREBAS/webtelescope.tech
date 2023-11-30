import { CommonPropertyOptions } from './common-property-options';
import { IPrinter } from './printer';

export interface IImportPrinter extends IPrinter {
  options: CommonPropertyOptions;
}
