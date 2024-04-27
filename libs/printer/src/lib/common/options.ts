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

export type BasicPropertyPrinterOptions = {
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
   * Documentation printer
   */
  docsPrinter?: IPrint;

  /**
   * Decorators printer
   */
  decoratorsPrinter?: IPrint;
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
  BasicPropertyPrinterOptions &
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

export type BasicImportPrinterOptions = {
  /**
   * Source package or directory
   */
  source: string;

  /**
   * List of items to be imported
   */
  items: string[];
};

export type ImportPrinterOptions<E = NotExtended> = BasicImportPrinterOptions &
  NamePefixOptions &
  PackageNamePrefixOptions &
  E;

export type BasicDecoratorPrinterOptions = {
  /**
   * Decorator name
   */
  name: string;

  /**
   * Decorator options
   */
  options?: string;
};

export type DecoratorPrinterOptions<E = NotExtended> = NamePefixOptions &
  BasicDecoratorPrinterOptions &
  E;

export type BasicClassPrinterOptions = {
  /**
   * Class name
   */
  name: string;

  /**
   * Class type  class, interface or any type in the programming sytax
   */
  type: string;

  /**
   * Represents properties of the class but properties have their own context.
   */
  content?: IPrint;

  /**
   * Extending classes
   */
  extending?: IPrint;

  /**
   * Implementing classes
   */
  implementing?: IPrint;

  /**
   * Importing packages, types, classes.
   */
  importings?: IPrint;

  /**
   * Generic types
   */
  generics?: IPrint;

  /**
   * Class decorator|anotation|macro
   */
  decorating?: IPrint;

  /**
   * Documentation
   */
  docs?: IPrint;

  /**
   * If set true, the class will not export to outside.
   */
  notExport?: boolean;
};

export type ClassPrinterOptions<T = NotExtended> = BasicClassPrinterOptions &
  NamePefixOptions &
  T;
