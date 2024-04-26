import { IPrint } from '../__printer';
import { stringify } from '../utils';

export class BaseDecoratorOptionsPrinter<Options extends object>
  implements IPrint
{
  constructor(protected readonly options?: Options) {}
  print(): string {
    if (this.options) {
      return stringify(this.options);
    }
    return '';
  }
}
