import { names } from '@webpackages/utils';
import { IImportPrinter } from '../common';

export class ImportPrinter implements IImportPrinter {
  constructor(
    public readonly target: string,
    public readonly basePath: string
  ) {}

  print(): string {
    return `import { ${this.target} } from '${this.basePath}${
      names(this.target).fileName
    };'`;
  }
}
