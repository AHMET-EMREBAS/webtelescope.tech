import { PropertyOptions } from '../__meta';
import { DecoratorPrinter, IPrint } from '../__printer';
import {
  ClassType,
  EmptyPrinter,
  IPrinterPickerByCLassTypeAndPropertyOptions,
} from '../common';

export class PropertyDecoratorFactory
  implements IPrinterPickerByCLassTypeAndPropertyOptions
{
  constructor(
    protected readonly optionsPrinter: IPrinterPickerByCLassTypeAndPropertyOptions
  ) {}
  pick(type: ClassType, options?: PropertyOptions | undefined): IPrint {
    switch (type) {
      case ClassType.Create:
      case ClassType.Update:
      case ClassType.Query:
        return new DecoratorPrinter({
          name: 'Property',
          options: this.optionsPrinter.pick(type, options).print(),
        });

      case ClassType.View:
        return new DecoratorPrinter({ name: 'ViewColumn' });

      case ClassType.Entity:
      case ClassType.ICreate:
      case ClassType.IEntity:
      case ClassType.IQuery:
      case ClassType.IUpdate:
      case ClassType.IView:
        return new EmptyPrinter();
    }
    return new EmptyPrinter();
  }
}
