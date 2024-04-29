import { IPrint, ImportPrinter } from '@webpackages/printer';
import {
  ClassNameBuilder,
  EmptyPrinter,
  FileNameBuilder,
  INamedBuilder,
  IPackageNames,
} from '../common';
import { ModelManager } from '@webpackages/meta';
import { names } from '@webpackages/utils';
import { FileImportBuilder } from './file-import-builder';

export class ImportBuilder implements INamedBuilder<IPrint> {
  constructor(
    protected readonly modelManager: ModelManager,
    protected readonly packageName: IPackageNames
  ) {}

  core() {
    return new ImportPrinter({
      source: this.packageName.core(),
      items: [
        'Dto',
        'IDDto',
        'Entity',
        'BaseEntity',
        'Column',
        'ViewColumn',
        'ViewEntity',
        'PartialType',
        'PickType',
      ],
    }).print();
  }

  common() {
    return new ImportPrinter({
      source: this.packageName.core(),
      items: ['IID'],
    }).print();
  }

  ___relationsImport() {
    return this.modelManager
      .uniqueRelationNames()
      .map(names)
      .map((e) => e.fileName)
      .map((e) => {
        return new FileImportBuilder(
          new FileNameBuilder(e),
          new ClassNameBuilder(e),
          '../'
        ).Entity();
      })
      .map((e) => e.print())
      .join('\n');
  }

  Entity(): IPrint {
    const relations = this.___relationsImport();
    const core = this.core();
    return {
      print() {
        return [core, relations].join('\n');
      },
    };
  }

  View(): IPrint {
    const core = this.core();
    return {
      print() {
        return core;
      },
    };
  }

  Create(): IPrint {
    const core = this.core();
    return {
      print() {
        return core;
      },
    };
  }
  Update(): IPrint {
    const core = this.core();
    return {
      print() {
        return core;
      },
    };
  }
  Query(): IPrint {
    const core = this.core();
    return {
      print() {
        return core;
      },
    };
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
