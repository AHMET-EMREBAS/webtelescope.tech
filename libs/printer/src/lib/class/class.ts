import { ClassPrinterOptions, IPrint, NotExtended } from '../common';

/**
 * @description Print class class defination
 * @returns string
 */
export class ClassPrinter<T = NotExtended> implements IPrint {
  constructor(protected readonly __options: ClassPrinterOptions<T>) {}

  /**
   * @description Prefix name
   * @returns string
   */
  protected __namePrefix(): string {
    return this.__options.namePrefix ?? '';
  }

  /**
   * @description Suffix name
   * @returns string
   */
  protected __nameSuffix(): string {
    return this.__options.nameSuffix ?? '';
  }

  /**
   * @description Defines the `*.join(<join>)` delimeter. Default value is `' '`
   * @returns string
   */
  protected __joinBy(): string {
    return ' ';
  }

  /**
   * @description Default value is `'export'`
   * @returns string
   */
  protected __exportKeyword(): string {
    return 'export';
  }
  /**
   * @description Check the class exporting or not (public or private class) and return the `export` keyword or empty string.
   * @returns string
   */
  private __exportOrNot(): string {
    return this.__options.notExport == true ? '' : this.__exportKeyword();
  }

  /**
   * @description Class name
   * @returns string
   */
  protected __name(): string {
    return [this.__namePrefix(), this.__options.name, this.__nameSuffix()].join(
      ''
    );
  }

  /**
   * @description If the class has generics, this method will concat the class name with generics.
   * @returns string
   */
  private __nameWithGenerics(): string {
    return this.__name() + this.__generics();
  }

  /**
   * @description Class type
   * @returns string
   */
  protected __type(): string {
    return this.__options.type;
  }

  /**
   * @description Defines how the class content (properties) start with such us `{`, `:`. Default value is `'{'`
   * @returns string
   */
  protected __contentPrefix(): string {
    return '{';
  }

  /**
   * @description Defines how the class content (properties) ends with such us `{`, `;`. Default value is `'}'`
   * @returns string
   */
  protected __contentSuffix(): string {
    return '}';
  }

  /**
   * @description Class generics decleration
   * @returns string
   */
  protected __generics(): string {
    return this.__options.generics?.print() ?? '';
  }

  /**
   * @description Extending classes, interfaces
   * @returns string
   */
  protected __extendings(): string {
    return this.__options.extending?.print() ?? '';
  }

  /**
   * @description Implementing classes, interfaces.
   * @returns string
   */
  protected __implements(): string {
    return this.__options.implementing?.print() ?? '';
  }

  /**
   * @description Documentation/Comments
   * @returns string
   */
  protected __docs(): string {
    return this.__options.docs?.print() ?? '';
  }

  /**
   * @description Class content (properties)
   * @returns string
   */
  protected __content(): string {
    return this.__options.content?.print() ?? '';
  }

  /**
   * @description  Importing packages, classes, interfaces
   * @returns string
   */
  protected __importings(): string {
    return this.__options.importings?.print() ?? '';
  }

  /**
   * @description Class decorators
   * @returns string
   */
  protected __decorators(): string {
    return this.__options.decorating?.print() ?? '';
  }

  /**
   * @description This method wraps the the export, type, and nameWithGenerics method. Some programming languages implements decleration in different order.
   * @returns string
   */
  protected __decleration(): string {
    return [
      this.__exportOrNot(),
      this.__type(),
      this.__nameWithGenerics(),
    ].join(' ');
  }

  /**
   * @description print the class
   * @returns string
   */
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
