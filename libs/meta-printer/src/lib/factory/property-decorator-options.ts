/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropertyOptions } from '../__meta';
import { IPrint } from '../__printer';
import {
  ClassType,
  EmptyPrinter,
  IPrinterPickerByCLassTypeAndPropertyOptions,
} from '../common';
import { DecoratorOptionsPrinter } from '../decorator';

export class PropertyDecoratorOptionsFactory
  implements IPrinterPickerByCLassTypeAndPropertyOptions
{
  pick(type: ClassType, options?: PropertyOptions | undefined): IPrint {
    switch (type) {
      case ClassType.Create:
        return new DecoratorOptionsPrinter(options);

      case ClassType.Update: {
        const { required, ...rest } = options!;
        return new DecoratorOptionsPrinter(rest);
      }
      case ClassType.Query: {
        const { required, ...rest } = options!;
        return new DecoratorOptionsPrinter(rest);
      }
      case ClassType.View:
      case ClassType.Entity:
      case ClassType.ICreate:
      case ClassType.IEntity:
      case ClassType.IQuery:
      case ClassType.IUpdate:
      case ClassType.IView:
        return new EmptyPrinter();
    }
  }
}
