import { BuiltinClassNames, RelationManager } from '@webpackages/meta';
import {
  ClassType,
  DocPritner,
  IPrint,
  PropertyPrinter,
  PropertyPrinterOptions,
} from '@webpackages/printer';

import { RelationDecoratorBuilder } from '../decorator';

export class RelationBuilder {
  constructor(
    protected readonly modelName: string,
    protected readonly propertyName: string,
    protected readonly optionsManager: RelationManager,
    protected readonly decoratorBuilder: RelationDecoratorBuilder
  ) {}

  protected __build(overrideOptions?: Partial<PropertyPrinterOptions>): IPrint {
    const options = this.optionsManager.toCreate();
    const { description } = options;
    return new PropertyPrinter({
      ...options,
      name: this.propertyName,
      classType: ClassType.CLASS,
      decoratorsPrinter: this.decoratorBuilder.CreateProperty(),
      docsPrinter: new DocPritner({ content: description ?? '' }),
      type: this.modelName,
      ...overrideOptions,
    });
  }

  EntityProperty(): IPrint {
    return this.__build({
      decoratorsPrinter: this.decoratorBuilder.EntityRelation(),
    });
  }

  IEntityProperty(): IPrint {
    return this.__build({
      decoratorsPrinter: undefined,
      classType: ClassType.INTERFACE,
      type: `T${this.modelName}`,
    });
  }

  CreateDtoProperty(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IDDto,
      decoratorsPrinter: this.decoratorBuilder.CreateProperty(),
    });
  }

  UpdateDtoProperty(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IDDto,
      required: undefined,
      decoratorsPrinter: this.decoratorBuilder.UpdateProperty(),
    });
  }

  ICreateDtoProperty(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IID,
      classType: ClassType.INTERFACE,
      decoratorsPrinter: undefined,
    });
  }

  IUpdateDtoProperty(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IID,
      classType: ClassType.INTERFACE,
      required: undefined,
      decoratorsPrinter: undefined,
    });
  }

  ViewProperties(): IPrint {
    const queries = this.optionsManager
      .toView()
      .map((e) => {
        return this.__build({
          decoratorsPrinter: this.decoratorBuilder.ViewColumn(),
          required: undefined,
          isArray: undefined,
          ...e,
        });
      })
      .map((e) => e.print())
      .join('\n');
    return {
      print() {
        return queries;
      },
    };
  }

  QueryDtoProperties(): IPrint {
    const queries = this.optionsManager
      .toQuery()
      .map((e) => {
        return this.__build({
          decoratorsPrinter: this.decoratorBuilder.QueryProperty(),
          required: undefined,
          isArray: undefined,
          ...e,
        });
      })
      .map((e) => e.print())
      .join('\n');
    return {
      print() {
        return queries;
      },
    };
  }

  IQueryDtoProperties(): IPrint {
    const queries = this.optionsManager
      .toIQuery()
      .map((e) => {
        return this.__build({
          decoratorsPrinter: undefined,
          required: undefined,
          isArray: undefined,
          classType: ClassType.INTERFACE,
          ...e,
        });
      })
      .map((e) => e.print())
      .join('\n');
    return {
      print() {
        return queries;
      },
    };
  }
}
