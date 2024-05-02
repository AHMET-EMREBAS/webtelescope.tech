import { GenericPrinter, IPrint } from '@webpackages/printer';
import { ICoverAllClassTypes } from '../common';
import { ModelManager } from '@webpackages/meta';
import { EmptyPrinter } from '../common-imp';

export class GenericsBuilder implements ICoverAllClassTypes<IPrint> {
  constructor(protected readonly modelManager: ModelManager) {}
  Entity(): IPrint {
    return EmptyPrinter;
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
    return new GenericPrinter({
      items: this.modelManager.uniqueRelationNames().map((e) => `T${e} = IID`),
    });
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
