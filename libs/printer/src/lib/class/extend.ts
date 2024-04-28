import { IPrint } from '../common';


/**
 * ExtendPrinter options
 */
export type ExtendPrinterOptions = {

  /**
   * Extending items
   */
  items?: string[];

  /**
   * Extending item.
   */
  item?: string;
};

/**
 * Print extending classes
 */
export class ExtendPrinter implements IPrint {
  constructor(protected readonly extendsPrinterOptions: ExtendPrinterOptions) {}

  /**
   * Default value is ' '. Used to seperate parts of the extend statement.
   */
  protected __joinBy(): string {
    return ' ';
  }
  /**
   * Defines the delimeter between extending classes. Default is ','
   */
  protected __delimeter(): string {
    return ', ';
  }
  /**
   * Defines the keyword used for extends. Default value is 'extends'
   * @returns `'extends'`
   */
  protected __keyword(): string {
    return 'extends';
  }

  /**
   * Print the extending classes
   * @returns
   */
  protected __items(): string {
    return this.extendsPrinterOptions.items?.join(this.__delimeter()) ?? '';
  }
  /**
   * Print the extending class
   * @returns
   */
  protected __item(): string {
    return this.extendsPrinterOptions.item ?? '';
  }

  /**
   * Print the extending classes.
   */
  print(): string {
    return [this.__keyword(), this.__items(), this.__item()].join(
      this.__joinBy()
    );
  }
}
