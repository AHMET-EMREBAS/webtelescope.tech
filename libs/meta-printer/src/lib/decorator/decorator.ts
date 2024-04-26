import { IPrint, DecoratorPrinter as __DecoratorPrinter } from '../__printer';
import { DecoratorName } from '../common';

/**
 * Implements the common decorator printer operation
 */
export class DecoratorPrinter extends __DecoratorPrinter {
  constructor(
    protected readonly decoratorName: DecoratorName,
    protected readonly decoratorOptionsPrinter?: IPrint
  ) {
    super({
      name: decoratorName,
      options: decoratorOptionsPrinter?.print() ?? '',
    });
  }
}
