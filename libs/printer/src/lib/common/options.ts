import { IPrint } from './interfaces';

export type NotExtended = { __notExtended?: 'Type is not extended' };

/**
 * For property name prefix and suffix configuration
 */
export type NamePefixOptions = {
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

export type DocPrinterOptions = {
  content: string;
  inline?: boolean;
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
    NamePefixOptions &
    TypePrefixOptions &
    DelimeterOptions &
    E;

export type PackageNamePrefixOptions = {
  /**
   * Add prefix to the package name
   */
  packageNamePrefix?: string;

  /**
   * Add suffix to the package name
   */
  packagenameSuffix?: string;
};

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

export type ImportPrinterOptions<E = NotExtended> = ImportBasicOptions &
  NamePefixOptions &
  PackageNamePrefixOptions &
  E;

export type DecoratorBasicOptions = {
  name: string;
  options: string;
};

export type DecoratorPrinterOptions<E = NotExtended> = NamePefixOptions &
  DecoratorBasicOptions &
  E;

export type BasicClassPrinterOptions = {
  name: string;
  type: string;
  content?: IPrint;
  notExport?: boolean;
};
export type ClassPrinterOptions<T = NotExtended> = BasicClassPrinterOptions &
  NamePefixOptions &
  T;
