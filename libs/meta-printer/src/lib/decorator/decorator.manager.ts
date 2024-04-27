import { DecoratorOptionsPrinterFactory } from './decorator-options.factory';
import { DecoratorPrinterFactory } from './decorator.factory';

export const DecoratorManager = new DecoratorPrinterFactory(
  new DecoratorOptionsPrinterFactory()
);
