import { IPrint } from '../interfaces';

export type PropertyPrinterOptions = {
  name: string;
  type: string;
  required?: boolean;
};

export abstract class PropertyPrinter implements IPrint {
  constructor(protected readonly options: PropertyPrinterOptions) {}

  /**
   * Delimeter between property name and type
   * @defaultValue `:`
   * @returns string
   */
  protected delimeter() {
    return ':';
  }

  /**
   *
   * @returns
   */
  protected isRequired(): '!' | '?' | '' {
    return this.options.required ? '!' : '?';
  }

  /**
   * Property name
   * @returns
   */
  name() {
    return this.options.name;
  }

  /**
   * Property type
   * @returns
   */
  type() {
    return this.options.type;
  }

  /**
   * What is the closing line mark
   * @defaultValue ` ; `
   * @returns
   */
  protected endOfLine() {
    return ';';
  }

  print(): string {
    return [
      this.name(),
      this.isRequired(),
      this.delimeter(),
      this.type(),
      this.endOfLine(),
    ].join('');
  }
}

/**
 * Print class property
 */
export class ClassPropertyPrinter extends PropertyPrinter {}

/**
 * Print interface property
 */
export class InterfacePropertyPrinter extends PropertyPrinter {
  protected override isRequired() {
    return this.options.required ? '' : '?';
  }
}
