import { IPrint, ImplementPrinter } from '../__printer';
import {
  ClassType,
  EmptyPrinter,
  INameFactory,
  IPrinterPickerByClassTypeAndModel,
} from '../common';

export class ImplementingFactory implements IPrinterPickerByClassTypeAndModel {
  constructor(protected readonly nameFactory: INameFactory) {}

  pick(type: ClassType): IPrint {
    switch (type) {
      case ClassType.Update:
        return new ImplementPrinter({
          item: `${this.nameFactory.IUpdate})`,
        });
      case ClassType.Entity:
        return new ImplementPrinter({
          item: this.nameFactory.IEntity,
        });
    }

    return new EmptyPrinter();
  }
}
