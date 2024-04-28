import { Model, PropertyOptions, RelationOptions } from '../__meta';
import { IPrint, ImportPrinter } from '../__printer';
import { names } from '../__utils';
import { EmptyPrinter, INameFactory, IPrinterPickerFactory } from '../common';

export class ImportingFactory implements IPrinterPickerFactory {
  constructor(
    protected readonly model: Model,
    protected readonly classNameFactory: INameFactory
  ) {}

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

  protected __relationImports() {
    return this.__relationNames()
      ?.map((e) => {
        const N = names(e);
        return new ImportPrinter({ items: [e], source: `../${N.fileName}` });
      })
      .map((e) => e.print())
      .join('\n');
  }

  private __propertyImports() {
    const objectList = this.__properties()
      ?.filter((e) => e.type === 'object' && e.objectType)
      .map((e) => {
        return e.objectType!;
      });
    if (objectList) {
      return new ImportPrinter({
        source: '../types',
        items: objectList,
      }).print();
    }
    return '';
  }

  /**
   * Import items for entity class
   */
  Entity(): IPrint {
    const imports = [this.__relationImports(), this.__propertyImports()].join(
      '\n'
    );
    return {
      print() {
        return imports;
      },
    };
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
