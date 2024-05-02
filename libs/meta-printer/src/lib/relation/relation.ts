import { BuiltinClassNames, RelationManager } from '@webpackages/meta';
import {
  ClassType,
  DocPritner,
  IPrint,
  PropertyPrinter,
  PropertyPrinterOptions,
} from '@webpackages/printer';

import { RelationDecoratorBuilder } from '../decorator';
import { ICoverAllClassTypes } from '../common';

/**
 * Provides all relation properties
 */
export class RelationBuilder implements ICoverAllClassTypes<IPrint> {
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
      decoratorsPrinter: this.decoratorBuilder.Create(),
      docsPrinter: new DocPritner({ content: description ?? '' }),
      type: this.modelName,
      ...overrideOptions,
    });
  }

  Entity(): IPrint {
    return this.__build({
      decoratorsPrinter: this.decoratorBuilder.Entity(),
    });
  }

  View(): IPrint {
    const queries = this.optionsManager
      .toView()
      .filter((e) => e.searchable != false)
      .map((e) => {
        return this.__build({
          decoratorsPrinter: this.decoratorBuilder.View(),
          isArray: undefined,
          ...e,
          required: true,
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

  Create(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IDDto,
      decoratorsPrinter: this.decoratorBuilder.Create(),
    });
  }

  Update(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IDDto,
      required: undefined,
      decoratorsPrinter: this.decoratorBuilder.Update(),
    });
  }

  Query(): IPrint {
    const queries = this.optionsManager
      .toQuery()
      .filter((e) => e.searchable != false)
      .map((e) => {
        return this.__build({
          decoratorsPrinter: this.decoratorBuilder.Query(e.name),
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

  IEntity(): IPrint {
    return this.__build({
      decoratorsPrinter: undefined,
      classType: ClassType.INTERFACE,
      type: `T${this.modelName}`,
    });
  }

  ICreate(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IID,
      classType: ClassType.INTERFACE,
      decoratorsPrinter: undefined,
    });
  }

  IUpdate(): IPrint {
    return this.__build({
      type: BuiltinClassNames.IID,
      classType: ClassType.INTERFACE,
      required: undefined,
      decoratorsPrinter: undefined,
    });
  }

  IQuery(): IPrint {
    const queries = this.optionsManager
      .toIQuery()
      .filter((e) => e.searchable != false)
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

  IView(): IPrint {
    const queries = this.optionsManager
      .toIQuery()
      .filter((e) => e.searchable != false)
      .map((e) => {
        return this.__build({
          classType: ClassType.INTERFACE,
          decoratorsPrinter: this.decoratorBuilder.IView(),
          isArray: undefined,
          ...e,
          required: true,
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
