import { Model } from '../__meta';
import { IPrint } from '../__printer';
import { EmptyPrinter, IPrinterPickerFactory } from '../common';
import { ClassNameFactory } from './class-name';

export class ExtendingFactory implements IPrinterPickerFactory {
  protected nameFactory!: ClassNameFactory;
  constructor(protected readonly model: Model) {
    this.nameFactory = new ClassNameFactory(model.modelName);
  }

  Entity(): IPrint {
    return new EmptyPrinter();
  }

  Update(): IPrint {
    const createDtoName = this.nameFactory.Create;
    return {
      print() {
        return `PartialType(${createDtoName})`;
      },
    };
  }

  IEntity(): IPrint {
    return new EmptyPrinter();
  }

  ICreate(): IPrint {
    return new EmptyPrinter();
  }

  IUpdate(): IPrint {
    return new EmptyPrinter();
  }

  Query(): IPrint {
    return new EmptyPrinter();
  }

  IQuery(): IPrint {
    return new EmptyPrinter();
  }

  IView(): IPrint {
    return new EmptyPrinter();
  }

  View(): IPrint {
    return new EmptyPrinter();
  }
}
