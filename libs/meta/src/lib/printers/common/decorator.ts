import { Printable } from './printer';

export interface IDecoratorPrinter<DecoratorOptions> extends Printable {
  decoratorName: string;
  options?: DecoratorOptions;
}
