import { IPrint, ImportPrinter } from '@webpackages/printer';
import { Backward } from '../common-imp';
import { ICoverAllClassTypes, IDirName } from '../common';

export class RelationImportBuilder implements ICoverAllClassTypes<IPrint> {
  constructor(
    protected readonly fileNameBuilder: ICoverAllClassTypes<string> & IDirName,
    protected readonly classNameBuilder: ICoverAllClassTypes<string>,
    protected readonly backward: Backward
  ) {}

  protected __build(last: string) {
    return `${this.backward}${this.fileNameBuilder.DirName()}/${last}`;
  }

  Entity(): IPrint {
    return new ImportPrinter({
      source: this.__build(this.fileNameBuilder.Entity()),
      items: [this.classNameBuilder.Entity()],
    });
  }

  View(): IPrint {
    return new ImportPrinter({
      source: this.__build(this.fileNameBuilder.View()),
      items: [this.classNameBuilder.View()],
    });
  }

  Create(): IPrint {
    return new ImportPrinter({
      source: this.__build(this.fileNameBuilder.Create()),
      items: [this.classNameBuilder.Create()],
    });
  }
  Update(): IPrint {
    return new ImportPrinter({
      source: this.__build(this.fileNameBuilder.Update()),
      items: [this.classNameBuilder.Update()],
    });
  }
  Query(): IPrint {
    return new ImportPrinter({
      source: this.__build(this.fileNameBuilder.Query()),
      items: [this.classNameBuilder.Query()],
    });
  }
  IEntity(): IPrint {
    return new ImportPrinter({
      source: this.__build(this.fileNameBuilder.IEntity()),
      items: [this.classNameBuilder.IEntity()],
    });
  }
  IView(): IPrint {
    return new ImportPrinter({
      source: this.__build(this.fileNameBuilder.IView()),
      items: [this.classNameBuilder.IView()],
    });
  }
  ICreate(): IPrint {
    return new ImportPrinter({
      source: this.__build(this.fileNameBuilder.ICreate()),
      items: [this.classNameBuilder.ICreate()],
    });
  }
  IUpdate(): IPrint {
    return new ImportPrinter({
      source: this.__build(this.fileNameBuilder.IUpdate()),
      items: [this.classNameBuilder.IUpdate()],
    });
  }
  IQuery(): IPrint {
    return new ImportPrinter({
      source: this.__build(this.fileNameBuilder.IQuery()),
      items: [this.classNameBuilder.IQuery()],
    });
  }
}
