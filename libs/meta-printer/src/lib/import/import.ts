import {
  ImportPrinter as __ImportPrinter,
  ImportPrinterOptions,
} from '../__printer';

/**
 * Implements the common import printer operations
 */
export class ImportPrinter extends __ImportPrinter {
  constructor(protected readonly options: ImportPrinterOptions) {
    super(options);
  }
}
