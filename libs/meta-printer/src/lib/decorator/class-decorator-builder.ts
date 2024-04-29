import { ModelManager } from '@webpackages/meta';
import { DecoratorPrinter, IPrint } from '@webpackages/printer';
import { DecoratorName, INamedBuilder } from '../common';

export class ClassDecoratorBuilder implements INamedBuilder<IPrint> {
  constructor(protected readonly modelManager: ModelManager) {}

  Entity(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.Entity });
  }
  View(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.ViewEntity });
  }
  Create(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.Dto });
  }
  Update(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.Dto });
  }
  Query(): IPrint {
    return new DecoratorPrinter({ name: DecoratorName.Dto });
  }

  IEntity(): IPrint {
    throw new Error('Method not implemented.');
  }
  IView(): IPrint {
    throw new Error('Method not implemented.');
  }
  ICreate(): IPrint {
    throw new Error('Method not implemented.');
  }
  IUpdate(): IPrint {
    throw new Error('Method not implemented.');
  }
  IQuery(): IPrint {
    throw new Error('Method not implemented.');
  }
}
