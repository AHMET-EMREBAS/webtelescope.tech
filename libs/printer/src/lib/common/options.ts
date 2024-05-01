/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassType } from './class-types';
import { IPrint } from './interfaces';

export type NotExtended = {
  /**
   * Indicate that this type does not extend any other types
   */
  __notExtended?: 'Type is not extended';
};

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

/**
 * Documentation printer options
 */
export type DocPrinterOptions = {
  /**
   * Document content
   */
  content: string;
  /**
   * Is inline document
   */
  inline?: boolean;
};

/**
 * Common/Basic property pritner options
 */
export type BasicPropertyPrinterOptions = {
  name: string;
  type: string;
  classType: ClassType;
  isArray?: boolean;
  required?: boolean;
  docsPrinter?: IPrint;
  decoratorsPrinter?: IPrint;
};

/**
 * Defines the delimeter between property type and name
 */
export type DelimeterOptions = {
  /**
   * Default is ":"
   */
  delimeter?: string;
};

/**
 * Provides the import printer to the classes.
 */
export type ImportOptions = {
  /**
   * Import printer
   */
  imports?: IPrint;
};

export type PropertyPrinterOptions<E = NotExtended> =
  BasicPropertyPrinterOptions &
    NamePefixOptions &
    TypePrefixOptions &
    DelimeterOptions &
    E;

/**
 * Package name prefix configuration
 */
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

/**
 * Common import printer options
 */
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

/**
 * Common decorator printer options
 */
export type BasicDecoratorPrinterOptions = {
  /**
   * Decorator name
   */
  name: string;

  /**
   * Decorator options
   */
  options?: Record<string, any>;
  /**
   * Pass options as string
   */
  optionsString?: string;

  /**
   * If set true, options will be printed as it is
   */
  printRaw?: boolean;
};

export type DecoratorPrinterOptions<E = NotExtended> = NamePefixOptions &
  BasicDecoratorPrinterOptions &
  E;

/**
 * Common class printer options
 */
export type BasicClassPrinterOptions = {
  /**
   * Class name
   */
  className: string;

  /**
   * Class type  class, interface or any type in the programming sytax
   */
  classType: string;

  /**
   * Represents properties of the class but properties have their own context.
   */
  content?: IPrint;

  /**
   * Pass content as string
   */
  contentString?: string;

  /**
   * Extending classes
   */
  extending?: IPrint;

  /**
   * Pass extendings as string
   */
  extendingString?: string;

  /**
   * Implementing classes
   */
  implementing?: IPrint;

  /**
   * Pass implementing as string
   */
  implementingString?: string;

  /**
   * Importing packages, types, classes.
   */
  importings?: IPrint;

  /**
   * Pass imports as string
   */
  importingsString?: string;

  /**
   * Generic types
   */
  generics?: IPrint;

  /**
   * Pass generics as string
   */
  genericsString?: string;

  /**
   * Class decorator|anotation|macro
   */
  decorating?: IPrint;

  /**
   * Pass decorating as string
   */
  decoratingString?: string;

  /**
   * Documentation
   */
  docs?: IPrint;

  /**
   * Pass docs as string
   */
  docsString?: string;

  /**
   * If set true, the class will not export to outside.
   */
  notExport?: boolean;
};

/**
 * Class printer options
 */
export type ClassPrinterOptions<T = NotExtended> = BasicClassPrinterOptions &
  NamePefixOptions &
  T;
