import { IPrint, ImportPrinterOptions } from '../common';

export class ImportPrinter implements IPrint {
  constructor(
    protected readonly __importPrinterOptions: ImportPrinterOptions
  ) {}

  /**
   * Import keyword. By default, returns 'import'.
   */
  protected __importKeyWord(): string {
    return 'import';
  }
  /**
   * From keyword. By default, returns 'from'.
   */
  protected __fromKeyWord(): string {
    return 'from ';
  }

  /**
   * Import content prefix. By default, returns '{'
   */
  protected __contentPrefix(): string {
    return ' { ';
  }

  /**
   * Import content suffix. By default, returns '}'
   */
  protected __contentSuffix(): string {
    return ' } ';
  }

  /**
   * Print the list of items to be imported as a coma seperated string.
   */
  protected __content(): string {
    return this.__importPrinterOptions.items.join(', ');
  }

  /**
   * Source pacakge or directory name.
   */
  protected __source(): string {
    return `'${this.__importPrinterOptions.source}'`;
  }

  /**
   * End of the import line. By default, returns ';'.
   */
  protected __endOfLine(): string {
    return ';';
  }

  /**
   * Print the import statement.
   */
  print(): string {
    return [
      this.__importKeyWord(),
      this.__contentPrefix(),
      this.__content(),
      this.__contentSuffix(),
      this.__fromKeyWord(),
      this.__source(),
      this.__endOfLine(),
    ].join('');
  }
}
