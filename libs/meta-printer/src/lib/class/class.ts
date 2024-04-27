import { Model } from '../__meta';
import {
  ClassPrinter as __ClassPrinter,
  ClassPrinterOptions as __ClassPrinterOptions,
  IPrint,
} from '../__printer';
import { names } from '../__utils';
import { ClassType } from '../common';
import { ClassFileNameFactory } from './class-name.factory';
import { detectClassType } from './detect-class-type';

export type ClassPrinterOptions = __ClassPrinterOptions<
  Pick<Model, 'modelName'>
>;

/**
 * Implements common class printer operations
 */
export class ClassPrinter extends __ClassPrinter {
  constructor(
    protected readonly classType: ClassType,
    protected readonly modelName: string,
    protected readonly contentPrinter?: IPrint
  ) {
    const name = new ClassFileNameFactory(names(modelName).className).pick(
      classType
    );

    super({
      name,
      type: detectClassType(classType),
      contentPrinter,
    });
  }
}
