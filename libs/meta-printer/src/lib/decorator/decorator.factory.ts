import { IPrint } from '../__printer';
import { DecoratorName } from '../common';
import { DecoratorPrinter } from './decorator';

/**
 * Factory builder class for {@link DecoratorPrinter}
 */
export class DecoratorPrinterFactory {
  private constructor() {}

  protected static create(name: DecoratorName, optionsPrinter?: IPrint) {
    return new DecoratorPrinter(name, optionsPrinter);
  }

  /**
   * ENTITY decorator printer
   * @param optionsPrinter {@link IPrint}
   * @returns printer {@link DecoratorPrinterFactory}
   */
  static ENTITY(optionsPrinter?: IPrint) {
    return this.create(DecoratorName.ENTITY, optionsPrinter);
  }

  /**
   * VIEW_ENTITY decorator printer
   * @param optionsPrinter {@link IPrint}
   * @returns printer {@link DecoratorPrinterFactory}
   */
  static VIEW_ENTITY(optionsPrinter?: IPrint) {
    return this.create(DecoratorName.VIEW_ENTITY, optionsPrinter);
  }

  /**
   * COLUMN decorator printer
   * @param optionsPrinter {@link IPrint}
   * @returns printer {@link DecoratorPrinterFactory}
   */
  static COLUMN(optionsPrinter: IPrint) {
    return this.create(DecoratorName.COLUMN, optionsPrinter);
  }

  /**
   * PROPERTY decorator printer
   * @param optionsPrinter {@link IPrint}
   * @returns printer {@link DecoratorPrinterFactory}
   */
  static PROPERTY(optionsPrinter?: IPrint) {
    return this.create(DecoratorName.PROPERTY, optionsPrinter);
  }

  /**
   * VIEW_COLUMN decorator printer
   * @param optionsPrinter {@link IPrint}
   * @returns printer {@link DecoratorPrinterFactory}
   */
  static VIEW_COLUMN(optionsPrinter?: IPrint) {
    return this.create(DecoratorName.VIEW_COLUMN, optionsPrinter);
  }

  /**
   * DTO decorator printer
   * @param optionsPrinter {@link IPrint}
   * @returns printer {@link DecoratorPrinterFactory}
   */
  static DTO(optionsPrinter?: IPrint) {
    return this.create(DecoratorName.DTO, optionsPrinter);
  }

  /**
   * MANY (entity relation) decorator printer
   * @param optionsPrinter {@link IPrint}
   * @returns printer {@link DecoratorPrinterFactory}
   */
  static MANY(optionsPrinter?: IPrint) {
    return this.create(DecoratorName.MANY, optionsPrinter);
  }

  /**
   * ONE (entity relation) decorator printer
   * @param optionsPrinter {@link IPrint}
   * @returns printer {@link DecoratorPrinterFactory}
   */
  static ONE(optionsPrinter?: IPrint) {
    return this.create(DecoratorName.ONE, optionsPrinter);
  }

  /**
   * OWNER (entity relation) decorator printer
   * @param optionsPrinter {@link IPrint}
   * @returns printer {@link DecoratorPrinterFactory}
   */
  static OWNER(optionsPrinter?: IPrint) {
    return this.create(DecoratorName.OWNER, optionsPrinter);
  }
}
