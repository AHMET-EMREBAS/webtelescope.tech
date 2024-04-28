import { Model } from '../__meta';
import { IPrint } from '../__printer';
import { ClassType } from '../common';

/**
 * Print class properties and relations from class type and model
 */
export class ClassContentPrinter implements IPrint {
  constructor(
    protected readonly classType: ClassType,
    protected readonly model: Model
  ) {}
  print(): string {
    return '';
  }
}
