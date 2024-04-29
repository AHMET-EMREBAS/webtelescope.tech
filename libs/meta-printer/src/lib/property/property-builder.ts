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

export class PropertyBuilder {
  constructor(
    protected readonly modelName: string,
    protected readonly propertyName: string,
    protected readonly optionsManager: PropertyManager,
    protected readonly decoratorBuilder: PropertyDecoratorBuilder
  ) {}

  protected __build(overrideOptions?: Partial<PropertyPrinterOptions>): IPrint {
    const options = this.optionsManager.toProperty();
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
    return this.__build({
      required: false,
      decoratorsPrinter: this.decoratorBuilder.UpdateProperty(),
    });
  }

  QueryDtoProperty(): IPrint {
    return this.__build({
      required: false,
      decoratorsPrinter: this.decoratorBuilder.QueryProperty(),
    });
  }

  ICreateDtoProperty(): IPrint {
    return this.__build({ decoratorsPrinter: undefined });
  }

  IUpdateDtoProperty(): IPrint {
    return this.__build({ required: false, decoratorsPrinter: undefined });
  }

  IQueryDtoProperty(): IPrint {
    return this.__build({ required: false, decoratorsPrinter: undefined });
  }

  EntityProperty(): IPrint {
    return this.__build({
      decoratorsPrinter: this.decoratorBuilder.Column(),
    });
  }

  IEntityProperty(): IPrint {
    return this.__build({ decoratorsPrinter: undefined });
  }

  ViewProperty(): IPrint {
    return this.__build({
      decoratorsPrinter: this.decoratorBuilder.ViewColumn(),
    });
  }

  IViewProperty(): IPrint {
    return this.__build({ decoratorsPrinter: undefined });
  }
}
