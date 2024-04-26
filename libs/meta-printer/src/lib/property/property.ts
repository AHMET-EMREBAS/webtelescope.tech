import { ClassType, IsRequiredHandler } from '../common';
import { IPrint, PropertyPrinter } from '../__printer';

export type BasePropertyPrinterOptions = {
  classType: ClassType;
  name: string;
  type: string;
  isRequiredHandler: IsRequiredHandler;
  isArray?: boolean;
  required?: boolean;
};

/**
 * Implements common property printer operations
 */
export class BasePropertyPrinter extends PropertyPrinter implements IPrint {
  constructor(
    protected readonly __basePropertyPrinterOptions: BasePropertyPrinterOptions
  ) {
    const { name, type, isArray, required } = __basePropertyPrinterOptions;
    super({ name, type, isArray, required });
  }

  protected override __isRequired(): '' | '!' | '?' {
    const { isRequiredHandler, classType, required } =
      this.__basePropertyPrinterOptions;
    return isRequiredHandler(classType, required);
  }
}
