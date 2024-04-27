import { ClassPrinterOptions, IPrint, NotExtended } from '../common';

/**
 * Print class class defination
 */
export class ClassPrinter<T = NotExtended> implements IPrint {
  constructor(protected readonly __options: ClassPrinterOptions<T>) {}

  /**
   * @returns `' '`
   */
  protected __joinBy() {
    return ' ';
  }

  protected __exportKeyword() {
    return 'export';
  }
  /**
   * @returns `export` by default
   */
  private __exportOrNot() {
    return this.__options.notExport == true ? '' : this.__exportKeyword();
  }

  /**
   * Print name only.
   * Use nameWithGenerics function
   * @returns
   */
  protected __name() {
    return this.__options.name;
  }

  /**
   * Print name with generics
   * @returns class name
   */
  private __nameWithGenerics() {
    return this.__name() + this.__generics();
  }

  /**
   * @returns class type class, interface, struct.
   */
  protected __type() {
    return this.__options.type;
  }

  /**
   * Override this method if the content prefix in your programming syntax is different.
   * @returns `{` by default
   */
  protected __contentPrefix() {
    return '{';
  }

  /**
   * Override this method if the content suffix in your programming syntax is different.
   * @returns `}` by default
   */
  protected __contentSuffix() {
    return '}';
  }

  protected __generics() {
    return this.__options.generics?.print() ?? '';
  }

  protected __extendings() {
    return this.__options.extending?.print() ?? '';
  }

  protected __implements() {
    return this.__options.impementing?.print() ?? '';
  }

  protected __docs() {
    return this.__options.docs?.print() ?? '';
  }

  protected __content() {
    return this.__options.content?.print() ?? '';
  }

  protected __importings() {
    return this.__options.importings?.print() ?? '';
  }

  protected __decorators() {
    return this.__options.decorating?.print() ?? '';
  }

  private __join(...args: string[]) {
    return args.join('');
  }

  print(): string {
    return [
      this.__importings(),

      this.__docs(),

      this.__decorators(),

      this.__exportOrNot(),

      this.__type(),
      this.__nameWithGenerics(),

      this.__extendings(),
      this.__implements(),
      this.__contentPrefix(),
      this.__content(),
      this.__contentSuffix(),
    ]
      .filter((e) => e != '' && e != undefined)
      .join(this.__joinBy());
  }
}
