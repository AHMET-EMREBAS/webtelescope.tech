import { NotExtended } from './not-extended';
import { IPrint } from './print';

/**
 * For property name prefix and suffix configuration
 */
export type NamePrefixOptions = {
  /**
   * Property name prefix  prefixPropertyName
   */
  namePrefix?: string;

  /**
   * Property name suffix  suffixPropertyName
   */
  nameSuffix?: string;
};

/**
 * For property type prefix and suffix configuration
 */
export type TypePrefixOptions = {
  /**
   * Property type prefix  PrefixPropertyType
   */
  typePrefix?: string;

  /**
   * Property type suffix PropertyTypeSuffix
   */
  typeSuffix?: string;
};

/**
 * For class level or property level documentation configuration
 */
export type DocOptions = {
  /**
   * Property documentation
   */
  doc?: IPrint;

  /**
   * Is documentation desired to place in class-level documentation?
   * By default documentation is written into property documentation.
   */
  isClassDoc?: boolean;

  /**
   * Multiple doc options to support both class level and property level documentation.
   */
  docs?: DocOptions[];
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

export type DelimeterOptions = {
  /**
   * Default is ":"
   */
  delimeter?: string;
};

export type ImportOptions = {
  imports?: IPrint;
};

export type PropertyPrinterOptions<E = NotExtended> =
  PropertyPrinterBasicOptions &
    NamePrefixOptions &
    TypePrefixOptions &
    ImportOptions &
    DocOptions &
    DelimeterOptions &
    E;

export type ImportBasicOptions = {
  /**
   * Source package or directory
   */
  source: string;

  /**
   * List of items to be imported
   */
  items: string[];
};

export type PackageNamePrefixOptions = {
  packageNamePrefix?: string;
  packagenameSuffix?: string;
};

export type ImportPrinterOptions<E = NotExtended> = ImportBasicOptions &
  NamePrefixOptions &
  PackageNamePrefixOptions &
  E;
