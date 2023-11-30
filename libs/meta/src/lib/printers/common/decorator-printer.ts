import { IPrinter } from './printer';
import { CommonPropertyOptions } from './common-property-options';

export interface IDecoratorPrinter<DecoratorOptions extends CommonPropertyOptions>
  extends IPrinter {
  options: DecoratorOptions;
}
