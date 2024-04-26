import { IPrint, NotExtended } from '../common';

export type PropertyPrinterOptions<E = NotExtended> = {
  /**
   * Name of the property
   */
  name: string;

  /**
   * Property type
   */
  type: string;

  /**
   * Is property array
   */
  isArray?: boolean;

  /**
   * Is property required
   */
  required?: boolean;

  /**
   * Property documentation
   */
  doc?: IPrint;

  /**
   * Property type prefix  PrefixPropertyType
   */
  typePrefix?: string;

  /**
   * Property type suffix PropertyTypeSuffix
   */
  typeSuffix?: string;

  /**
   * Property name prefix  prefixPropertyName
   */
  namePrefix?: string;

  /**
   * Property name suffix  suffixPropertyName
   */
  nameSuffix?: string;
} & E;

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
    return ': ';
  }
  protected __prefix() {
    return this.__propertyPrinterOptions.namePrefix ?? '';
  }
  protected __suffix() {
    return this.__propertyPrinterOptions.nameSuffix ?? '';
  }
  protected __doc() {
    return this.__propertyPrinterOptions.doc?.print() + '\n' ?? '';
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
      this.__doc(),
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
