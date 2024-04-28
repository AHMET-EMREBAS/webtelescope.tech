import { ColumnOptions, Model, PropertyOptions } from '../__meta';
import { IPrint } from '../__printer';
import { DecoratorOptionsPrinter } from '../decorator';
import { ViewEntityDecoratorOptionsPrinter } from '../decorator';

export class DecoratorOptionsPrinterFactory {
  protected __build<O>(options?: O) {
    return new DecoratorOptionsPrinter<O>(options);
  }

  /**
   * PROPERTY decorator-options printer
   * @param options
   * @returns printer {@link DecoratorOptionsPrinter}
   */
  PROPERTY(options: PropertyOptions): IPrint {
    return this.__build(options);
  }

  /**
   * COLUMN decorator-options printer
   * @param options
   * @returns printer {@link DecoratorOptionsPrinter}
   */
  COLUMN(options: ColumnOptions): IPrint {
    return this.__build(options);
  }

  /**
   * ENTITY decorator-options printer
   * @param options
   * @returns printer {@link DecoratorOptionsPrinter}
   */
  ENTITY(): IPrint {
    return this.__build();
  }

  /**
   * VIEW decorator-options printer
   * @param options
   * @returns printer {@link DecoratorOptionsPrinter}
   */
  VIEW(): IPrint {
    return this.__build();
  }

  /**
   * DTO decorator-options printer
   */
  DTO(): IPrint {
    return this.__build();
  }

  /**
   * MANY decorator-options printer
   */
  MANY(relationTarget: string): IPrint {
    return this.__build(relationTarget);
  }

  /**
   * ONE decorator-options printer
   */
  ONE(relationTarget: string): IPrint {
    return this.__build(relationTarget);
  }

  /**
   * OWNER decorator-options printer
   */
  OWNER(relationTarget: string): IPrint {
    return this.__build(relationTarget);
  }

  /**
   * VIEW_COLUMN decorator-options printer
   */
  VIEW_COLUMN(): IPrint {
    return this.__build();
  }

  /**
   * VIEW_ENTITY decorator-options printer
   */
  VIEW_ENTITY(model: Model): IPrint {
    return new ViewEntityDecoratorOptionsPrinter(model);
  }
}
