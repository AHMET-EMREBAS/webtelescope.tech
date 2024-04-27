import { Model } from '../__meta';
import {
  ClassType as __ClassType,
  ClassPrinter as __ClassPrinter,
  NamePefixOptions,
} from '../__printer';
import { ClassType } from '../common';

export type InterfacePrinterOptions = {
  classType: ClassType;
  options?: NamePefixOptions;
} & Pick<Model, 'modelName'>;
/**
 * Implements the common interface printer operations
 */
export class InterfacePrinter extends __ClassPrinter {
  constructor(protected readonly options: InterfacePrinterOptions) {
    super({
      name: options.modelName,
      type: __ClassType.INTERFACE,
      ...options.options,
    });
  }
}
