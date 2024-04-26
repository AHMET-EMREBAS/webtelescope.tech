import { ColumnOptions, Model, PropertyOptions } from '../__meta';
import { IPrint } from '../__printer';
import { DefaultDecoratorOptionsPrinter } from './decorator-options';
import { ViewEntityDecoratorOptionsPrinter } from './view-entity-options';

export class DecoratorOptionsPrinterFactory {
  protected defaultPrinter<O>(options?: O) {
    return new DefaultDecoratorOptionsPrinter<O>(options);
  }

  /**
   * PROPERTY decorator-options printer
   * @param options
   * @returns printer {@link DecoratorOptionsPrinter}
   */
  PROPERTY(options: PropertyOptions): IPrint {
    return this.defaultPrinter(options);
  }

  /**
   * COLUMN decorator-options printer
   * @param options
   * @returns printer {@link DecoratorOptionsPrinter}
   */
  COLUMN(options: ColumnOptions): IPrint {
    return this.defaultPrinter(options);
  }

  /**
   * ENTITY decorator-options printer
   * @param options
   * @returns printer {@link DecoratorOptionsPrinter}
   */
  ENTITY(): IPrint {
    return this.defaultPrinter();
  }

  /**
   * VIEW decorator-options printer
   * @param options
   * @returns printer {@link DecoratorOptionsPrinter}
   */
  VIEW(): IPrint {
    return this.defaultPrinter();
  }

  /**
   * DTO decorator-options printer
   */
  DTO(): IPrint {
    return this.defaultPrinter();
  }

  /**
   * MANY decorator-options printer
   */
  MANY(relationTarget: string): IPrint {
    return this.defaultPrinter(relationTarget);
  }

  /**
   * ONE decorator-options printer
   */
  ONE(relationTarget: string): IPrint {
    return this.defaultPrinter(relationTarget);
  }

  /**
   * OWNER decorator-options printer
   */
  OWNER(relationTarget: string): IPrint {
    return this.defaultPrinter(relationTarget);
  }

  /**
   * VIEW_COLUMN decorator-options printer
   */
  VIEW_COLUMN(): IPrint {
    return this.defaultPrinter();
  }

  /**
   * VIEW_ENTITY decorator-options printer
   */
  VIEW_ENTITY(model: Model): IPrint {
    return new ViewEntityDecoratorOptionsPrinter(model);
  }
}
