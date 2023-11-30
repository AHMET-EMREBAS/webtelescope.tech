import { ModelMeta } from '../../meta';
import { AbstractClassPrinter, toImports, toPrintable } from '../imp';
import { DtoImports } from './do-imports';
import { DtoClassDecorator } from './dto-decorator';
import { DtoPropertyPrinter, DtoRelationPrinter } from './dto-property';

export class DtoPrinter extends AbstractClassPrinter {
  constructor(public readonly dtoType: 'Create' | 'Update', model: ModelMeta) {
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

  override printPropertyName(): string {
    return `${this.dtoType}${super.printPropertyName()}Dto`;
  }
}
