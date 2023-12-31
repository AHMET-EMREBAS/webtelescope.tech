import { PrintableModelMeta } from '../../meta';
import { AbstractClassPrinter, toImports, toPrintable } from '../imp';
import { EntityImports } from './entity-imports';
import { EntityClassDecorator } from './entity-decorator';
import { EntityColumnPrinter, EntityRelationPrinter } from './entity-column';

export class EntityPrinter extends AbstractClassPrinter {
  constructor(model: PrintableModelMeta) {
    const { name, properties, relations } = model;
    const __properties = Object.values(properties || {}).map((value) =>
      toPrintable(value, EntityColumnPrinter)
    );
    const __relations = Object.values(relations || {}).map((value) =>
      toPrintable(value, EntityRelationPrinter)
    );

    const ___imports = toImports(Object.values(relations || {}), EntityImports);

    super('class', {
      name,
      properties: [...__properties, ...__relations],
      decorators: [new EntityClassDecorator()],
      importings: ___imports,
    });
  }

  override printExtends(): string {
    return ` extends BaseEntity `;
  }

  override printImports(): string {
    return [
      `import { Relation, Column, Entity, BaseEntity } from '@webpackages/core'`,
      super.printImports(),
    ].join('\n');
  }
}
