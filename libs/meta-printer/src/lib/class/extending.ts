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
    return new ExtendPrinter({
      item: 'BaseView',
    });
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
    return new ExtendPrinter({
      item: 'IID',
    });
  }
  IView(): IPrint {
    return new ExtendPrinter({
      item: 'IID',
    });
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
