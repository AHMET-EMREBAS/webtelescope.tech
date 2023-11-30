import { AbstractDecoratorPrinter } from '../imp';

export class DtoClassDecorator extends AbstractDecoratorPrinter {
  constructor() {
    super('Exclude');
  }
}
