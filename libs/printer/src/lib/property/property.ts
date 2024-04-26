import { IPrint } from '../common';

export type PropertyPrinterOptions = {
  name: string;
  type: string;
  required?: boolean;
};

export abstract class PropertyPrinter implements IPrint {
  constructor(protected readonly propertyPrinterOptions: PropertyPrinterOptions) {}

  /**
   * Delimeter between property name and type
   * @defaultValue `: `
   * @returns string
   */
  protected delimeter() {
    return ': ';
  }

  /**
   *
   * @returns
   */
  protected isRequired(): '!' | '?' | '' {
    return this.propertyPrinterOptions.required ? '!' : '?';
  }

  /**
   * Property name
   * @returns
   */
  name() {
    return this.propertyPrinterOptions.name;
  }

  /**
   * Property type
   * @returns
   */
  type() {
    return this.propertyPrinterOptions.type;
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
    return this.propertyPrinterOptions.required ? '' : '?';
  }
}
