import { ImplementPrinter, IPrint } from '@webpackages/printer';
import { ICoverAllClassTypes } from '../common';
import { ModelManager } from '@webpackages/meta';
import { ClassNameBuilder, EmptyPrinter } from '../common-imp';

export class ImplementingBuilder implements ICoverAllClassTypes<IPrint> {
  constructor(
    protected readonly modelManager: ModelManager,
    protected readonly classNameBuilder: ClassNameBuilder
  ) {}

  Entity(): IPrint {
    return new ImplementPrinter({
      item: this.classNameBuilder.IEntity(),
    });
  }

  View(): IPrint {
    return new ImplementPrinter({
      item: this.classNameBuilder.IView(),
    });
  }

  Create(): IPrint {
    return new ImplementPrinter({
      item: this.classNameBuilder.ICreate(),
    });
  }

  Update(): IPrint {
    return new ImplementPrinter({
      item: this.classNameBuilder.IUpdate(),
    });
  }

  Query(): IPrint {
    return new ImplementPrinter({
      item: this.classNameBuilder.IQuery(),
    });
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
