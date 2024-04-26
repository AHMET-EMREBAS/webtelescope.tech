import { IPrint } from '../__printer';
import { stringify } from '../utils';

export class DefaultDecoratorOptionsPrinter<Options> implements IPrint {
  constructor(protected readonly options?: Options) {}
  print(): string {
    if (this.options == undefined) return '';
    return stringify(this.options);
  }
}
