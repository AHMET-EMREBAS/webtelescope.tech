import { ClassPrinterOptions, IPrint, NotExtended } from '../common';

/**
 * Print class class defination
 */
export class ClassPrinter<T = NotExtended> implements IPrint {
  constructor(protected readonly __options: ClassPrinterOptions<T>) {}

  /**
   * @returns `export` by default
   */
  protected __exportDef() {
    return 'export';
  }

  /**
   * @returns class name
   */
  protected __name() {
    return this.__options.name;
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
    return this.__options.genericsPrinter?.print() ?? '';
  }

  protected __extendings() {
    return this.__options.extendsPrinter?.print() ?? '';
  }

  protected __implements() {
    return this.__options.implementsPrinter?.print() ?? '';
  }

  protected __docs() {
    return this.__options.docsPrinter?.print() ?? '';
  }

  protected __content() {
    return this.__options.contentPrinter?.print() ?? '';
  }

  __importings() {
    return this.__options.importsPrinter?.print() ?? '';
  }

  private __join(...args: string[]) {
    return args.join('');
  }
  private __joinWithSpace(...args: string[]) {
    return args.join(' ');
  }

  private __joinWithLine(...args: string[]) {
    return args.filter((e) => e).join('\n');
  }

  private __conditional(
    condition: boolean | undefined,
    trueValue: string,
    falseValue: string
  ) {
    return condition ? trueValue : falseValue;
  }

  print(): string {
    return [
      this.__importings(),

      this.__docs(),

      this.__conditional(this.__options.notExport, '', this.__exportDef()),

      this.__type(),

      this.__join(this.__name(), this.__generics()),
      this.__extendings(),
      this.__implements(),
      this.__contentPrefix(),
      this.__content(),
      this.__contentSuffix(),
    ]
      .filter((e) => e != '' && e != undefined)
      .join(' ');
  }
}
