import { IPrint } from '../__printer';

/**
 * Print empty string
 */
export class EmptyPrinter implements IPrint {
  print(): string {
    return '';
  }
}
