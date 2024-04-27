import { IPrint, PropertyPrinterOptions } from '../common';

export abstract class PropertyPrinter implements IPrint {
  constructor(
    protected readonly __propertyPrinterOptions: PropertyPrinterOptions
  ) {}

  /**
   * Delimeter between property name and type
   * @defaultValue `: `
   * @returns string
   */
  protected __delimeter() {
    return this.__propertyPrinterOptions.delimeter ?? ': ';
  }

  protected __prefix() {
    return this.__propertyPrinterOptions.namePrefix ?? '';
  }
  protected __suffix() {
    return this.__propertyPrinterOptions.nameSuffix ?? '';
  }

  protected __typePrefix() {
    return this.__propertyPrinterOptions.typePrefix ?? '';
  }
  protected __typeSuffix() {
    return this.__propertyPrinterOptions.typeSuffix ?? '';
  }

  /**
   * @defaultImp  `requried  ? '!' : '?'`
   * @returns
   */
  protected __isRequired(): '!' | '?' | '' {
    return this.__propertyPrinterOptions.required ? '!' : '?';
  }

  /**
   * Property name
   * @returns
   */
  protected __name() {
    return this.__propertyPrinterOptions.name;
  }

  /**
   * Property type
   * @returns
   */
  protected __type() {
    return this.__propertyPrinterOptions.type;
  }

  /**
   * If the property is array then return '[]' else ''
   * @returns
   */
  protected __isArray() {
    return this.__propertyPrinterOptions.isArray ? '[]' : '';
  }

  /**
   * What is the closing line mark
   * @defaultValue ` ; `
   * @returns
   */
  protected __endOfLine() {
    return ';';
  }

  print(): string {
    return [
      this.__prefix(),
      this.__name(),
      this.__suffix(),
      this.__isRequired(),
      this.__delimeter(),
      this.__typePrefix(),
      this.__type(),
      this.__typeSuffix(),
      this.__endOfLine(),
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
  protected override __isRequired() {
    return this.__propertyPrinterOptions.required ? '' : '?';
  }
}
