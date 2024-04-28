import { Model } from '../__meta';
import { DecoratorPrinter as __DecoratorPrinter } from '../__printer';
import { ClassType, DecoratorName, IPicker } from '../common';

/**
 * Implements the common decorator printer operation
 */
export class ClassDecoratorPrinter extends __DecoratorPrinter {
  constructor(
    protected readonly classType: ClassType,
    protected readonly decoratorName: DecoratorName,
    protected readonly model?: Model,
    protected readonly decoratorOptionsPrinter?: IPicker
  ) {
    super({
      name: decoratorName,
      options: decoratorOptionsPrinter?.pick(classType, model).print(),
    });
  }
}
