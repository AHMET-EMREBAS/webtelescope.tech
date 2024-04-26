import { IPrint, DecoratorPrinter } from '@webpackages/printer';
import { ClassType } from '../common';

/**
 * Implements the common decorator printer operation
 */
export class BaseDecoratorPrinter<DecoratorOptions>
  extends DecoratorPrinter
  implements IPrint
{
  constructor(
    protected readonly classType: ClassType,
    protected readonly decoratorName: string,
    protected readonly decoratorPrinterOptions: DecoratorOptions
  ) {
    super({ name: decoratorName, options: '' });
  }
  print(): string {
    return '';
  }
}
