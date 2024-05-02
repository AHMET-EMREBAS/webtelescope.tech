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
import { ICoverAllClassTypes } from '../common';
import { EmptyPrinter } from '../common-imp';

/**
 * Provides all properties
 */
export class PropertyBuilder implements ICoverAllClassTypes<IPrint> {
  constructor(
    protected readonly modelName: string,
    protected readonly propertyName: string,
    protected readonly optionsManager: PropertyManager,
    protected readonly decoratorBuilder: PropertyDecoratorBuilder
  ) {}

  protected __canSearch() {
    return this.optionsManager.toCreate().searchable != false;
  }

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
    } as PropertyPrinterOptions);
  }

  Create(): IPrint {
    return this.__build();
  }

  Update(): IPrint {
    return this.__build({
      required: undefined,
      decoratorsPrinter: this.decoratorBuilder.Update(),
    });
  }

  Query(): IPrint {
    if (this.__canSearch()) {
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
    if (this.__canSearch()) {
      return this.__build({
        decoratorsPrinter: this.decoratorBuilder.View(),
        required: true,
      });
    }

    return EmptyPrinter;
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
    if (this.__canSearch()) {
      return this.__build({
        classType: ClassType.INTERFACE,
        required: undefined,
        decoratorsPrinter: undefined,
      });
    }

    return EmptyPrinter;
  }

  IView(): IPrint {
    if (this.__canSearch()) {
      return this.__build({
        classType: ClassType.INTERFACE,
        decoratorsPrinter: undefined,
        required: true,
      });
    }
    return EmptyPrinter;
  }
}
