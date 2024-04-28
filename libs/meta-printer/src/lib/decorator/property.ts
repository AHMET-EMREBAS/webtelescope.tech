import { DecoratorPrinter as __DecoratorPrinter } from '../__printer';
import { ClassType, DecoratorName, IPicker } from '../common';

/**
 * Implements the common decorator printer operation
 */
export class PropertyDecoratorPrinter<O = unknown> extends __DecoratorPrinter {
  constructor(
    protected readonly classType: ClassType,
    protected readonly decoratorName: DecoratorName,
    protected readonly propertyOptions?: O,
    protected readonly decoratorOptionsPrinter?: IPicker
  ) {
    super({
      name: decoratorName,
      options: decoratorOptionsPrinter
        ?.pick(classType, propertyOptions)
        .print(),
    });
  }
}
