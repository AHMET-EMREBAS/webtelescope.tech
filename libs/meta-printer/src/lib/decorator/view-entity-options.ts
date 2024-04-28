import { Model } from '../__meta';
import { IPrint } from '../__printer';

export class ViewEntityDecoratorOptionsPrinter implements IPrint {
  constructor(protected readonly model: Model) {}

  print(): string {
    return `{ 
      expression(ds) {
        return ds
          .createQueryBuilder()
          .select('main.id', 'id')
          .from(${this.model.modelName}, 'main')
      },
    }`;
  }
}
