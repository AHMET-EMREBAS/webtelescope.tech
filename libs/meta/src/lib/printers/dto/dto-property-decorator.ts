import { PrintablePropertyMeta } from '../../meta';
import { AbstractDecoratorPrinter } from '../imp';

export class DtoPropertyDecoratorPrinter extends AbstractDecoratorPrinter {
  constructor(options: PrintablePropertyMeta) {
    super('Property', options);
  }
}
