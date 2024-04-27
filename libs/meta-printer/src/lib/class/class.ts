import { Model } from '../__meta';
import {
  ClassType,
  ClassPrinter as __ClassPrinter,
  ClassPrinterOptions as __ClassPrinterOptions,
} from '../__printer';

export type ClassPrinterOptions = __ClassPrinterOptions<
  Pick<Model, 'modelName'>
>;

/**
 * Implements common class printer operations
 */
export abstract class ClassPrinter extends __ClassPrinter {
  constructor(protected readonly __options: ClassPrinterOptions) {
    super({
      ...__options,
      name: __options.modelName,
      type: ClassType.CLASS,
    });
  }
}

export class ViewClassPrinter extends ClassPrinter {
  constructor(protected options: ClassPrinterOptions) {
    super(options);
  }
}
