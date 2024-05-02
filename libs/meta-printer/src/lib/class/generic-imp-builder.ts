import { GenericPrinter, IPrint } from '@webpackages/printer';
import { ICoverAllClassTypes } from '../common';
import { ModelManager } from '@webpackages/meta';
import { EmptyPrinter } from '../common-imp';

export class GenericsImpBuilder implements ICoverAllClassTypes<IPrint> {
  constructor(protected readonly modelManager: ModelManager) {}
  Entity(): IPrint {
    return new GenericPrinter({
      items: this.modelManager.uniqueRelationNames().map((e) => `${e}`),
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
