import { ClassPrinterOptions, IPrint, NotExtended } from '../common';

/**
 * Print class class defination
 */
export class ClassPrinter<T = NotExtended> implements IPrint {
  constructor(protected readonly __options: ClassPrinterOptions<T>) {}

  /**
   * Prefix name
   */
  protected __namePrefix(): string {
    return this.__options.namePrefix ?? '';
  }

  /**
   * Suffix name
   */
  protected __nameSuffix(): string {
    return this.__options.nameSuffix ?? '';
  }

  /**
   * Defines the `*.join(<join>)` delimeter. Default value is `' '`
   */
  protected __joinBy(): string {
    return ' ';
  }

  /**
   * Default value is `'export'`
   */
  protected __exportKeyword(): string {
    return 'export';
  }
  /**
   * Check the class exporting or not (public or private class) and return the `export` keyword or empty string.
   */
  private __exportOrNot(): string {
    return this.__options.notExport == true ? '' : this.__exportKeyword();
  }

  /**
   * Class name
   */
  protected __name(): string {
    return [this.__namePrefix(), this.__options.name, this.__nameSuffix()].join(
      ''
    );
  }

  /**
   * If the class has generics, this method will concat the class name with generics.
   */
  private __nameWithGenerics(): string {
    return this.__name() + this.__generics();
  }

  /**
   * Class type
   */
  protected __type(): string {
    return this.__options.type;
  }

  /**
   * Defines how the class content (properties) start with such us `{`, `:`. Default value is `'{'`
   */
  protected __contentPrefix(): string {
    return '{';
  }

  /**
   * Defines how the class content (properties) ends with such us `{`, `;`. Default value is `'}'`
   */
  protected __contentSuffix(): string {
    return '}';
  }

  /**
   * Class generics decleration
   */
  protected __generics(): string {
    return (
      this.__options.generics?.print() ?? this.__options.genericsString ?? ''
    );
  }

  /**
   * Extending classes, interfaces
   */
  protected __extendings(): string {
    return (
      this.__options.extending?.print() ?? this.__options.extendingString ?? ''
    );
  }

  /**
   * Implementing classes, interfaces.
   */
  protected __implements(): string {
    return (
      this.__options.implementing?.print() ??
      this.__options.implementingString ??
      ''
    );
  }

  /**
   * Documentation/Comments
   */
  protected __docs(): string {
    return this.__options.docs?.print() ?? this.__options.docsString ?? '';
  }

  /**
   * Class content (properties)
   */
  protected __content(): string {
    return (
      this.__options.content?.print() ?? this.__options.contentString ?? ''
    );
  }

  /**
   *  Importing packages, classes, interfaces
   */
  protected __importings(): string {
    return (
      this.__options.importings?.print() ??
      this.__options.importingsString ??
      ''
    );
  }

  /**
   * Class decorators
   */
  protected __decorators(): string {
    return (
      this.__options.decorating?.print() ??
      this.__options.decoratingString ??
      ''
    );
  }

  /**
   * This method wraps the the export, type, and nameWithGenerics method. Some programming languages implements decleration in different order.
   */
  protected __decleration(): string {
    return [
      this.__exportOrNot(),
      this.__type(),
      this.__nameWithGenerics(),
    ].join(' ');
  }

  /**
   * Print the class
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
