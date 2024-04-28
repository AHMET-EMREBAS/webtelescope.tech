import {
  ArrayMark,
  ClassType,
  IPrint,
  PropertyPrinterOptions,
  RequiredMark,
} from '../common';

/**
 * Print class and interface properties
 */
export class PropertyPrinter implements IPrint {
  constructor(
    protected readonly __propertyPrinterOptions: PropertyPrinterOptions
  ) {}

  /**
   * Print documentation for the property
   */
  protected __docs() {
    return this.__propertyPrinterOptions.docsPrinter?.print() ?? '';
  }

  /**
   * Delimeter between property name and type, default value is ': '
   */
  protected __delimeter(): string {
    return this.__propertyPrinterOptions.delimeter ?? ': ';
  }

  protected __decorators(): string {
    const dec = this.__propertyPrinterOptions.decoratorsPrinter?.print();

    return dec ? dec + ' ' : '';
  }

  /**
   * Prefixes the property name
   */
  protected __prefix() {
    return this.__propertyPrinterOptions.namePrefix ?? '';
  }

  /**
   * Suffixes the property name
   */
  protected __suffix() {
    return this.__propertyPrinterOptions.nameSuffix ?? '';
  }

  /**
   * Prefixes the property type name
   */
  protected __typePrefix() {
    return this.__propertyPrinterOptions.typePrefix ?? '';
  }

  /**
   * Suffixes the property type name
   */
  protected __typeSuffix() {
    return this.__propertyPrinterOptions.typeSuffix ?? '';
  }

  /**
   * If the property is required, then return '!' else '?'
   */
  protected __isRequired(): RequiredMark {
    if (this.__propertyPrinterOptions.classType === ClassType.INTERFACE) {
      return this.__propertyPrinterOptions.required ? '' : '?';
    }
    return this.__propertyPrinterOptions.required ? '!' : '?';
  }

  /**
   * Property name
   */
  protected __name() {
    return this.__propertyPrinterOptions.name;
  }

  /**
   * Property type
   */
  protected __type() {
    return this.__propertyPrinterOptions.type;
  }

  /**
   * If the property is array then return '[]' else ''
   */
  protected __isArray(): ArrayMark {
    return this.__propertyPrinterOptions.isArray ? '[]' : '';
  }

  /**
   * What is the closing line mark
   * @defaultValue ` ; `
   */
  protected __endOfLine() {
    return ';';
  }

  /**
   * Print property
   */
  print(): string {
    return [
      this.__docs(),
      this.__decorators(),
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
  protected override __isRequired(): '' | '?' {
    return this.__propertyPrinterOptions.required ? '' : '?';
  }
}
