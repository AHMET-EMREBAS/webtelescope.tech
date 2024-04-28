import { Model } from '../__meta';
import { ExtendPrinter, IPrint } from '../__printer';
import {
  ClassType,
  EmptyPrinter,
  INameFactory,
  IPrinterPickerByClassTypeAndModel,
} from '../common';

export class ExtendingFactory implements IPrinterPickerByClassTypeAndModel {
  constructor(protected readonly nameFactory: INameFactory) {}

  pick(type: ClassType, ): IPrint {
    switch (type) {
      case ClassType.Update:
        return new ExtendPrinter({
          item: `PartialType(${this.nameFactory.Create})`,
        });
      case ClassType.Entity:
        return new ExtendPrinter({
          item: 'BaseEntity',
        });
      case ClassType.IUpdate:
        return new ExtendPrinter({
          item: `Partial<${this.nameFactory.ICreate}>`,
        });
    }

    return new EmptyPrinter();
  }
}
