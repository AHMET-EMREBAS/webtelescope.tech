import { ClassPrinter } from '../../class';
import { ClassType, IPrint } from '../../common';
import { DecoratorPrinter } from '../../decorator';
import { ImportPrinter } from '../../import';
import { PropertyPrinter } from '../../property';

export const EntityImports = new ImportPrinter({
  source: 'typeorm',
  items: ['Entity', 'Column'],
});

export const EntityDecorator = new DecoratorPrinter({ name: 'Entity' });

export const ColumnDecorator = (optionsString: string) =>
  new DecoratorPrinter({
    name: 'Column',
    optionsString,
  });

export const EntityProperties: IPrint = {
  print() {
    return [
      new PropertyPrinter({
        classType: ClassType.CLASS,
        propertyName: 'id',
        type: 'number',
        required: true,
        decoratorsPrinter: ColumnDecorator('{ type: "number" }'),
      }),
      new PropertyPrinter({
        classType: ClassType.CLASS,
        propertyName: 'username',
        type: 'string',
        required: true,
        decoratorsPrinter: ColumnDecorator('{ type: "string" }'),
      }),
      new PropertyPrinter({
        classType: ClassType.CLASS,
        propertyName: 'password',
        type: 'string',
        required: true,
        decoratorsPrinter: ColumnDecorator('{ type: "string" }'),
      }),
    ]
      .map((e) => e.print())
      .join('\n');
  },
};

export const EntityPrinter = new ClassPrinter({
  name: 'User',
  type: ClassType.CLASS,
  content: EntityProperties,
  decorating: EntityDecorator,
  importings: EntityImports,
});
