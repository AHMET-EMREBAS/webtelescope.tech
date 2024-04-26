import { IPrint, DecoratorPrinter } from '../__printer';

/**
 * Implements the common decorator printer operation
 */
export class BaseDecoratorPrinter extends DecoratorPrinter implements IPrint {
  constructor(
    protected readonly name: string,
    protected readonly optionsPrinter: IPrint
  ) {
    super({ name: name, options: optionsPrinter.print() });
  }
}
