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
      propertyName: this.propertyName,
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

  IEntity(): IPrint {
    return this.__build({
      decoratorsPrinter: undefined,
      classType: ClassType.INTERFACE,
      type: `T${this.modelName}`,
    });
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

  View(): IPrint {
    const queries = this.optionsManager
      .toView()
      .map((e) => {
        return this.__build({
          decoratorsPrinter: this.decoratorBuilder.View(),
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

  Query(): IPrint {
    const queries = this.optionsManager
      .toQuery()
      .map((e) => {
        return this.__build({
          decoratorsPrinter: this.decoratorBuilder.Query(e.propertyName),
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

  IQuery(): IPrint {
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

  IView(): IPrint {
    const queries = this.optionsManager
      .toIQuery()
      .map((e) => {
        return this.__build({
          decoratorsPrinter: this.decoratorBuilder.View(),
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
}
