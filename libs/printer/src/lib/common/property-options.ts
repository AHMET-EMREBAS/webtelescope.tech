import { NotExtended } from './not-extended';
import { IPrint } from './print';

export type PropertyPrinterPrefixOptions = {
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
};

export type PropertyPrinterDocOptions = {
  /**
   * Property documentation
   */
  doc?: IPrint;
};

export type PropertyPrinterBasicOptions = {
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
};

export type PropertyPrinterDelimeterOptions = {
  /**
   * Default is ":"
   */
  delimeter?: string;
};

export type PropertyPrinterOptions<E = NotExtended> =
  PropertyPrinterBasicOptions &
    PropertyPrinterPrefixOptions &
    PropertyPrinterDocOptions &
    PropertyPrinterDelimeterOptions &
    E;
