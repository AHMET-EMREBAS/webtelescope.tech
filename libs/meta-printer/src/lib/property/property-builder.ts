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
import { EmptyPrinter } from '../common';

export class PropertyBuilder {
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
      decoratorsPrinter: this.decoratorBuilder.CreateProperty(),
      docsPrinter: new DocPritner({ content: description ?? '' }),
      ...overrideOptions,
    });
  }

  CreateDtoProperty(): IPrint {
    return this.__build();
  }

  UpdateDtoProperty(): IPrint {
    if (this.optionsManager.canUpdate()) {
      return this.__build({
        required: undefined,
        decoratorsPrinter: this.decoratorBuilder.UpdateProperty(),
      });
    }
    return EmptyPrinter;
  }

  QueryDtoProperty(): IPrint {
    if (this.optionsManager.canSearch()) {
      return this.__build({
        decoratorsPrinter: this.decoratorBuilder.QueryProperty(),
        required: undefined,
      });
    }
    return EmptyPrinter;
  }

  EntityProperty(): IPrint {
    return this.__build({
      decoratorsPrinter: this.decoratorBuilder.Column(),
    });
  }

  ViewProperty(): IPrint {
    return this.__build({
      decoratorsPrinter: this.decoratorBuilder.ViewColumn(),
    });
  }

  IEntityProperty(): IPrint {
    return this.__build({
      classType: ClassType.INTERFACE,
      decoratorsPrinter: undefined,
    });
  }

  ICreateDtoProperty(): IPrint {
    return this.__build({
      classType: ClassType.INTERFACE,
      decoratorsPrinter: undefined,
    });
  }

  IUpdateDtoProperty(): IPrint {
    return this.__build({
      classType: ClassType.INTERFACE,
      required: undefined,
      decoratorsPrinter: undefined,
    });
  }

  IQueryDtoProperty(): IPrint {
    return this.__build({
      classType: ClassType.INTERFACE,
      required: undefined,
      decoratorsPrinter: undefined,
    });
  }

  IViewProperty(): IPrint {
    return this.__build({
      classType: ClassType.INTERFACE,
      decoratorsPrinter: undefined,
    });
  }
}
