import { Model } from '../__meta';
import {
  ImportPrinter as __ImportPrinter,
  ImportPrinterOptions as __ImportPrinterOptions,
} from '../__printer';

export type ImportPrinterOptions = __ImportPrinterOptions<
  Pick<Model, 'modelName' | 'properties' | 'relations'>
>;
/**
 * Implements the common import printer operations
 */
export class ImportPrinter extends __ImportPrinter {
  constructor(protected readonly options: ImportPrinterOptions) {
    super(options);
  }
}
