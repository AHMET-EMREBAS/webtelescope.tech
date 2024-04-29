import { IPrint, ImportPrinter } from '@webpackages/printer';
import { Backward, ClassNameBuilder, INamedBuilder } from '../common';

export class FileImportBuilder implements INamedBuilder<IPrint> {
  constructor(
    protected readonly fileNameBuilder: INamedBuilder<string>,
    protected readonly classNameBuilder: ClassNameBuilder,
    protected readonly backward: Backward
  ) {}

  Entity(): IPrint {
    return new ImportPrinter({
      source: `${this.backward}${this.fileNameBuilder.Entity()}`,
      items: [this.classNameBuilder.Entity()],
    });
  }

  View(): IPrint {
    return new ImportPrinter({
      source: `${this.backward}/${this.fileNameBuilder.View()}`,
      items: [this.classNameBuilder.View()],
    });
  }

  Create(): IPrint {
    return new ImportPrinter({
      source: `${this.backward}/${this.fileNameBuilder.Create()}`,
      items: [this.classNameBuilder.Create()],
    });
  }
  Update(): IPrint {
    return new ImportPrinter({
      source: `${this.backward}/${this.fileNameBuilder.Update()}`,
      items: [this.classNameBuilder.Update()],
    });
  }
  Query(): IPrint {
    return new ImportPrinter({
      source: `${this.backward}/${this.fileNameBuilder.Query()}`,
      items: [this.classNameBuilder.Query()],
    });
  }
  IEntity(): IPrint {
    return new ImportPrinter({
      source: `${this.backward}/${this.fileNameBuilder.IEntity()}`,
      items: [this.classNameBuilder.IEntity()],
    });
  }
  IView(): IPrint {
    return new ImportPrinter({
      source: `${this.backward}/${this.fileNameBuilder.IView()}`,
      items: [this.classNameBuilder.IView()],
    });
  }
  ICreate(): IPrint {
    return new ImportPrinter({
      source: `${this.backward}/${this.fileNameBuilder.ICreate()}`,
      items: [this.classNameBuilder.ICreate()],
    });
  }
  IUpdate(): IPrint {
    return new ImportPrinter({
      source: `${this.backward}/${this.fileNameBuilder.IUpdate()}`,
      items: [this.classNameBuilder.IUpdate()],
    });
  }
  IQuery(): IPrint {
    return new ImportPrinter({
      source: `${this.backward}/${this.fileNameBuilder.IQuery()}`,
      items: [this.classNameBuilder.IQuery()],
    });
  }
}
