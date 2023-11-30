import { PropertyMeta } from '../../meta';
import { AbstractDecoratorPrinter } from '../imp';

export class DtoPropertyDecoratorPrinter extends AbstractDecoratorPrinter {
  constructor(options: PropertyMeta) {
    super('Property', options);
  }
}
