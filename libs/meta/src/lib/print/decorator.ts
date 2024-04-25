import { PropertyOptions } from '../meta';
import { stringify } from '../utils';
import { IName, IPrint } from './__common';

export class DecoratorPrinter<T extends object>
  implements IPrint, Pick<IName, 'name'>
{
  constructor(
    protected readonly decoratorName: string,
    protected readonly itemOptions: T
  ) {}

  options() {
    return stringify(this.itemOptions);
  }
  name(): string {
    return this.decoratorName;
  }

  print(): string {
    return `@${this.name()}(${this.options()})`;
  }
}
