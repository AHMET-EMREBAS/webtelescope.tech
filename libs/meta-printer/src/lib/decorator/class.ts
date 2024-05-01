import { ModelManager } from '@webpackages/meta';
import { DecoratorPrinter, IPrint } from '@webpackages/printer';
import { DecoratorName, EmptyPrinter } from '../common-imp';
import { ICoverAllClassTypes } from '../common';

/**
 * Provides class decorators
 */
export class ClassDecoratorBuilder implements ICoverAllClassTypes<IPrint> {
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

  /**
   * Interfaces does not have decorators
   */
  IEntity(): IPrint {
    return EmptyPrinter;
  }
  /**
   * Interfaces does not have decorators
   */
  IView(): IPrint {
    return EmptyPrinter;
  }
  /**
   * Interfaces does not have decorators
   */
  ICreate(): IPrint {
    return EmptyPrinter;
  }
  /**
   * Interfaces does not have decorators
   */
  IUpdate(): IPrint {
    return EmptyPrinter;
  }
  /**
   * Interfaces does not have decorators
   */
  IQuery(): IPrint {
    return EmptyPrinter;
  }
}
