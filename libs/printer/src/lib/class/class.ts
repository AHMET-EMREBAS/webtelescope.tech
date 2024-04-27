import { ClassPrinterOptions, IPrint, NotExtended } from '../common';

/**
 * Print class class defination
 */
export class ClassPrinter<T = NotExtended> implements IPrint {
  constructor(protected readonly __options: ClassPrinterOptions<T>) {}

  /**
   * Defines the `*.join(<join>)` delimeter. Default value is `' '`
   */
  protected __joinBy() {
    return ' ';
  }

  /**
   * Default value is `'export'`
   */
  protected __exportKeyword() {
    return 'export';
  }
  /**
   * Check the class exporting or not (public or private class) and return the `export` keyword or empty string.
   */
  private __exportOrNot() {
    return this.__options.notExport == true ? '' : this.__exportKeyword();
  }

  /**
   * Class name
   */
  protected __name() {
    return this.__options.name;
  }

  /**
   * If the class has generics, this method will concat the class name with generics.
   */
  private __nameWithGenerics() {
    return this.__name() + this.__generics();
  }

  /**
   * Class type
   */
  protected __type() {
    return this.__options.type;
  }

  /**
   * Defines how the class content (properties) start with such us `{`, `:`. Default value is `'{'`
   */
  protected __contentPrefix() {
    return '{';
  }

  /**
   * Defines how the class content (properties) ends with such us `{`, `;`. Default value is `'}'`
   */
  protected __contentSuffix() {
    return '}';
  }

  /**
   * Class generics decleration
   */
  protected __generics() {
    return this.__options.generics?.print() ?? '';
  }

  /**
   * Extending classes, interfaces
   */
  protected __extendings() {
    return this.__options.extending?.print() ?? '';
  }

  /**
   * Implementing classes, interfaces.
   */
  protected __implements() {
    return this.__options.impementing?.print() ?? '';
  }

  /**
   * Documentation/Comments
   */
  protected __docs() {
    return this.__options.docs?.print() ?? '';
  }

  /**
   * Class content (properties)
   * @returns
   */
  protected __content() {
    return this.__options.content?.print() ?? '';
  }

  /**
   * Importing packages, classes, interfaces
   */
  protected __importings() {
    return this.__options.importings?.print() ?? '';
  }

  /**
   * Class decorators
   */
  protected __decorators() {
    return this.__options.decorating?.print() ?? '';
  }

  /**
   * This method wraps the the export, type, and nameWithGenerics method.
   * Some programming languages implements decleration in different order.
   * @returns
   */
  protected __decleration() {
    return [
      this.__exportOrNot(),
      this.__type(),
      this.__nameWithGenerics(),
    ].join(' ');
  }

  print(): string {
    return [
      // Class imports
      this.__importings(),

      // Class documents
      this.__docs(),

      // Class decorators
      this.__decorators(),

      // Class Decleration
      this.__decleration(),

      // Extend implement
      this.__extendings(),
      this.__implements(),

      // Content Start
      this.__contentPrefix(),
      this.__content(),
      this.__contentSuffix(),
      // Content End
    ]
      .filter((e) => e != '' && e != undefined)
      .join(this.__joinBy());
  }
}
