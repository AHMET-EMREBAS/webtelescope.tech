import { ImportPrinter } from '../imp';

export class EntityImports extends ImportPrinter {
  constructor(target: string) {
    super(target, '../');
  }
}
