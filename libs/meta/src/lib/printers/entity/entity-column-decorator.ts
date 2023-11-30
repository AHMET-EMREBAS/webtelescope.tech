import { PrintablePropertyMeta } from '../../meta';
import { AbstractDecoratorPrinter } from '../imp';

export class EntityColumnDecoratorPrinter extends AbstractDecoratorPrinter {
  constructor(options: PrintablePropertyMeta) {
    const { type, required, unique } = options;
    super('Column', { type, required, unique });
  }
}
