import { ModelManager } from '@webpackages/meta';
import { DecoratorPrinter, IPrint } from '@webpackages/printer';
import { DecoratorName } from '../common';

export class ClassDecoratorBuilder {
  constructor(protected readonly modelManager: ModelManager) {}

  Dto(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.Dto });
  }

  Entity(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.Entity });
  }

  ViewEntity(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.ViewEntity });
  }
}
