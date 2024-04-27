import { Model } from '../__meta';
import {
  ClassPrinter as __ClassPrinter,
  ClsasPrinterOptions as __ClsasPrinterOptions,
} from '../__printer';

export type InterfacePrinterOptions = __ClsasPrinterOptions<
  Pick<Model, 'modelName'>
>;
/**
 * Implements the common interface printer operations
 */
export class InterfacePrinter extends __ClassPrinter {
  constructor(protected readonly options: InterfacePrinterOptions) {
    super(options);
  }
}
