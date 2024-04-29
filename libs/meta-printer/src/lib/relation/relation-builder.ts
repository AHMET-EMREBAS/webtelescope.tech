import { BuiltinClassNames, RelationManager } from '@webpackages/meta';
import {
  ClassType,
  DocPritner,
  IPrint,
  PropertyPrinter,
  PropertyPrinterOptions,
} from '@webpackages/printer';

import { RelationDecoratorBuilder } from '../decorator/relation-decorator-builder';

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
      ...this.optionsManager.toRelationColumn(),
      decoratorsPrinter: this.decoratorBuilder.EntityRelation(),
    });
  }

  IEntityProperty(): IPrint {
    return this.__build({
      decoratorsPrinter: undefined,
      type: `T${this.modelName}`,
    });
  }

  // ViewProperty(): IPrint {
  //   return this.__build({ decoratorsPrinter: this.decoratorBuilder.View() });
  // }

  // IViewProperty(): IPrint {
  //   return this.__build({ decoratorsPrinter: undefined });
  // }

  CreateDtoProperty(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IDDto,
      decoratorsPrinter: this.decoratorBuilder.CreateProperty(),
    });
  }

  UpdateDtoProperty(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IDDto,
      required: false,
      decoratorsPrinter: this.decoratorBuilder.UpdateProperty(),
    });
  }

  ICreateDtoProperty(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IID,
      decoratorsPrinter: undefined,
    });
  }

  IUpdateDtoProperty(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IID,
      required: false,
      decoratorsPrinter: undefined,
    });
  }

  // IQueryDtoProperty(): IPrint {
  //   return this.__build({
  //     required: false,
  //     decoratorsPrinter: undefined,
  //   });
  // }
}
