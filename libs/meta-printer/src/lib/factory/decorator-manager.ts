import { DecoratorOptionsPrinterFactory } from './decorator-options';
import { DecoratorPrinterFactory } from './decorator';

export const DecoratorManager = new DecoratorPrinterFactory(
  new DecoratorOptionsPrinterFactory()
);
