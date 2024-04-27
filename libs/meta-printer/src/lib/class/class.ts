import { Model } from '../__meta';
import {
  ClassPrinter as __ClassPrinter,
  ClassPrinterOptions as __ClassPrinterOptions,
} from '../__printer';

export type ClassPrinterOptions = __ClassPrinterOptions<
  Pick<Model, 'modelName'>
>;

/**
 * Implements common class printer operations
 */
export class ClassPrinter extends __ClassPrinter {
  // constructor(protected model: Model) {
  //   super();
  // }
}
