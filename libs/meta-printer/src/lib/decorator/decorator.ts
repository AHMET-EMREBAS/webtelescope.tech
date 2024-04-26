import { IPrint, DecoratorPrinter } from '@webpackages/printer';
import { ClassType } from '../common';

/**
 * Implements the common decorator printer operation
 */
export class BaseDecoratorPrinter extends DecoratorPrinter implements IPrint {
  constructor(
    protected readonly classType: ClassType,
    protected readonly decoratorName: string,
    protected readonly decoratorOptionsPrinter: IPrint
  ) {
    super({ name: decoratorName, options: decoratorOptionsPrinter.print() });
  }
}
