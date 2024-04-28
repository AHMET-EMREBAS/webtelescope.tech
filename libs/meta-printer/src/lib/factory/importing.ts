import { Model, PropertyOptions, RelationOptions } from '../__meta';
import { IPrint } from '../__printer';
import { EmptyPrinter, IPrinterPickerFactory } from '../common';

export class ImportingFactory implements IPrinterPickerFactory {
  constructor(protected readonly model: Model) {}

  protected __props<T>(object?: Record<string, T>): T[] | undefined {
    if (object) return Object.values(object);

    return undefined;
  }

  protected __properties(): PropertyOptions[] | undefined {
    return this.__props(this.model.properties);
  }

  protected __relations(): RelationOptions[] | undefined {
    return this.__props(this.model.relations);
  }

  protected __relationNames(): string[] | undefined {
    return this.__relations()?.map((e) => e.model.modelName);
  }

  Entity(): IPrint {
    return new EmptyPrinter();
  }
  Update(): IPrint {
    return new EmptyPrinter();
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
