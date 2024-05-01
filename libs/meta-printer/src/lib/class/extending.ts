import { ExtendPrinter, IPrint } from '@webpackages/printer';
import { ICoverAllClassTypes } from '../common';
import { BuiltinClassNames, ModelManager } from '@webpackages/meta';
import { EmptyPrinter } from '../common-imp';

export class ExtendingBuilder implements ICoverAllClassTypes<IPrint> {
  constructor(protected readonly modelManager: ModelManager) {}

  Entity(): IPrint {
    return new ExtendPrinter({
      item: BuiltinClassNames.BaseEntity,
    });
  }
  View(): IPrint {
    return EmptyPrinter;
  }
  Create(): IPrint {
    return EmptyPrinter;
  }
  Update(): IPrint {
    return EmptyPrinter;
  }
  Query(): IPrint {
    return EmptyPrinter;
  }
  IEntity(): IPrint {
    return EmptyPrinter;
  }
  IView(): IPrint {
    return EmptyPrinter;
  }
  ICreate(): IPrint {
    return EmptyPrinter;
  }
  IUpdate(): IPrint {
    return EmptyPrinter;
  }
  IQuery(): IPrint {
    return EmptyPrinter;
  }
}
