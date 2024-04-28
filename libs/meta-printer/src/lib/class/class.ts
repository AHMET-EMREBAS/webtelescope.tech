import { Model } from '../__meta';
import {
  ClassPrinter as __ClassPrinter,
  ClassPrinterOptions as __ClassPrinterOptions,
} from '../__printer';
import {
  ClassType,
  INamePickerByClassType,
  IPrinterPickerByClassType,
  IPrinterPickerByClassTypeAndModel,
} from '../common';

export type ClassPrinterOptions = __ClassPrinterOptions & {
  classType: ClassType;
  model: Model;
};

/**
 * Implements common class printer operations
 */
export class ClassPrinter extends __ClassPrinter {
  constructor(
    protected readonly options: ClassPrinterOptions,
    protected readonly name: INamePickerByClassType,
    protected readonly type: INamePickerByClassType,
    protected readonly extending: IPrinterPickerByClassTypeAndModel,
    protected readonly implementing: IPrinterPickerByClassTypeAndModel,
    protected readonly content?: IPrinterPickerByClassTypeAndModel,
    protected readonly decorators?: IPrinterPickerByClassType,
    protected readonly doc?: IPrinterPickerByClassTypeAndModel
  ) {
    super({
      name: name.pick(options.classType),
      type: type.pick(options.classType),
      extending: extending?.pick(options.classType),
      implementing: implementing.pick(options.classType, options.model),
      decorating: decorators?.pick(options.classType),
      content: content?.pick(options.classType, options.model),
      docs: doc?.pick(options.classType, options.model),
    });
  }
}
