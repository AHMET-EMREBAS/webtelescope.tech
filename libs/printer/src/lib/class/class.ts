import { ClsasPrinterOptions, IPrint } from '../common';

/**
 * Print class class defination
 */
export class ClassPrinter implements IPrint {
  constructor(protected readonly clsasPrinterOptions: ClsasPrinterOptions) {}

  /**
   * @returns `export` by default
   */
  protected __exportDef() {
    return 'export';
  }

  /**
   * @returns class name
   */
  protected __name() {
    return this.clsasPrinterOptions.name;
  }

  /**
   * @returns class type class, interface, struct.
   */
  protected __type() {
    return this.clsasPrinterOptions.type;
  }

  /**
   * Override this method if the content prefix in your programming syntax is different.
   * @returns `{` by default
   */
  protected __contentPrefix() {
    return '{';
  }

  /**
   * Override this method if the content suffix in your programming syntax is different.
   * @returns `}` by default
   */
  protected __contentSuffix() {
    return '}';
  }

  protected __content() {
    return this.clsasPrinterOptions.content ?? '';
  }

  print(): string {
    return [
      this.clsasPrinterOptions.notExport ? '' : this.__exportDef(),
      this.__type(),
      this.__name(),
      this.__contentPrefix(),
      this.__content(),
      this.__contentSuffix(),
    ]
      .filter((e) => e != '' && e != undefined)
      .join(' ');
  }
}
