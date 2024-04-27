import { Model } from '../__meta';
import {
  IPrint,
  PropertyPrinter as __PropertyPrinter,
  PropertyPrinterOptions as __PropertyPrinterOptions,
} from '../__printer';
import { names } from '../__utils';

export type PropertyPrinterOptions = __PropertyPrinterOptions<
  Partial<Pick<Model, 'modelName'>>
>;

/**
 * Default property printer implementation following interface property syntax
 */
export class PropertyPrinter extends __PropertyPrinter implements IPrint {
  constructor(protected readonly options: PropertyPrinterOptions) {
    super(options);
  }
  protected override __isRequired(): '' | '!' | '?' {
    return this.options.required ? '' : '?';
  }
}

/**
 * Property printer for class syntax
 */
export class ClassPropertyPrinter extends PropertyPrinter {
  protected override __isRequired(): '' | '!' | '?' {
    return this.options.required ? '!' : '?';
  }
}

/**
 * Property printer for interface syntax
 */
export class InterfacePropertyPrinter extends PropertyPrinter {
  protected override __isRequired(): '' | '!' | '?' {
    return this.options.required ? '' : '?';
  }
}

export class ViewEntityPropertyPrinter extends PropertyPrinter {
  constructor(options: PropertyPrinterOptions) {
    super({
      ...options,
      decoratorsPrinter: {
        print() {
          return '';
        },
      },
    });
  }
  protected override __isRequired(): '' | '!' | '?' {
    return '!';
  }

  protected __modelName() {
    if (!this.options.modelName) {
      throw new Error(`modelName is requried to print view entity properties!`);
    }
    return this.options.modelName;
  }

  protected override __name(): string {
    return names(this.__modelName() + names(this.__name()).className)
      .propertyName;
  }
}

export class QueryPropertyPrinter extends ViewEntityPropertyPrinter {
  protected override __isRequired(): '' | '!' | '?' {
    return '?';
  }
}

/**
 * All properties are optional
 */
export class OptionalPropertyPrinter extends PropertyPrinter {
  protected override __isRequired(): '' | '!' | '?' {
    return '?';
  }
}

/**
 * All properties are required
 */
export class RequiredClassPropertyPrinter extends PropertyPrinter {
  protected override __isRequired(): '' | '!' | '?' {
    return '!';
  }
}

/**
 * All properties are required
 */
export class RequiredInterfacePropertyPrinter extends PropertyPrinter {
  protected override __isRequired(): '' | '!' | '?' {
    return '!';
  }
}
