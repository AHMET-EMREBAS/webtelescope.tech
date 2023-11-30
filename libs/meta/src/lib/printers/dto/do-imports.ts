import { ImportPrinter } from '../imp';

export class DtoImports extends ImportPrinter {
  constructor(target: string) {
    super(target, '../');
  }
}
