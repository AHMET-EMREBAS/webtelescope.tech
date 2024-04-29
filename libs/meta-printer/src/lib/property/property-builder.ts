/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ClassType,
  DocPritner,
  IPrint,
  PropertyPrinter,
  PropertyPrinterOptions,
} from '@webpackages/printer';
import { PropertyDecoratorBuilder } from '../decorator';
import { PropertyManager } from '@webpackages/meta';
import { EmptyPrinter, INamedBuilder } from '../common';

export class PropertyBuilder implements INamedBuilder<IPrint> {
  constructor(
    protected readonly modelName: string,
    protected readonly propertyName: string,
    protected readonly optionsManager: PropertyManager,
    protected readonly decoratorBuilder: PropertyDecoratorBuilder
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
      ...overrideOptions,
    });
  }

  Create(): IPrint {
    return this.__build();
  }

  Update(): IPrint {
    if (this.optionsManager.canUpdate()) {
      return this.__build({
        required: undefined,
        decoratorsPrinter: this.decoratorBuilder.Update(),
      });
    }
    return EmptyPrinter;
  }

  Query(): IPrint {
    if (this.optionsManager.canSearch()) {
      return this.__build({
        decoratorsPrinter: this.decoratorBuilder.Query(),
        required: undefined,
      });
    }
    return EmptyPrinter;
  }

  Entity(): IPrint {
    return this.__build({
      decoratorsPrinter: this.decoratorBuilder.Entity(),
    });
  }

  View(): IPrint {
    return this.__build({
      decoratorsPrinter: this.decoratorBuilder.View(),
    });
  }

  IEntity(): IPrint {
    return this.__build({
      classType: ClassType.INTERFACE,
      decoratorsPrinter: undefined,
    });
  }

  ICreate(): IPrint {
    return this.__build({
      classType: ClassType.INTERFACE,
      decoratorsPrinter: undefined,
    });
  }

  IUpdate(): IPrint {
    return this.__build({
      classType: ClassType.INTERFACE,
      required: undefined,
      decoratorsPrinter: undefined,
    });
  }

  IQuery(): IPrint {
    return this.__build({
      classType: ClassType.INTERFACE,
      required: undefined,
      decoratorsPrinter: undefined,
    });
  }

  IView(): IPrint {
    return this.__build({
      classType: ClassType.INTERFACE,
      decoratorsPrinter: undefined,
    });
  }
}
