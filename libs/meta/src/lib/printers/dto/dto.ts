import { PrintableModelMeta } from '../../meta';
import { AbstractClassPrinter, toImports, toPrintable } from '../imp';
import { DtoImports } from './dto-imports';
import { DtoClassDecorator } from './dto-decorator';
import { DtoPropertyPrinter, DtoRelationPrinter } from './dto-property';

export class DtoPrinter extends AbstractClassPrinter {
  constructor(
    public readonly dtoType: 'Create' | 'Update',
    model: PrintableModelMeta
  ) {
    const { name, properties, relations } = model;
    const __properties = Object.values(properties || {}).map((value) =>
      toPrintable(value, DtoPropertyPrinter)
    );
    const __relations = Object.values(relations || {}).map((value) =>
      toPrintable(value, DtoRelationPrinter)
    );

    const ___imports = toImports(Object.values(relations || {}), DtoImports);

    super('class', {
      name,
      properties: [...__properties, ...__relations],
      decorators: [new DtoClassDecorator()],
      importings: ___imports,
    });
  }

  override printImports(): string {
    return [
      `import { Exclude } from 'class-transformer'`,
      `import { Property, ID } from '@webpackages/core'`,
      super.printImports(),
    ].join('\n');
  }

  override printClassName(): string {
    return `${this.dtoType}${super.printClassName()}Dto`;
  }
}
