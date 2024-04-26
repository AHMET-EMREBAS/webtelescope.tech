import { IPrint, PropertyPrinter as __PropertyPrinter } from '../__printer';
import { toPropertyName } from '../utils';

export type PropertyPrinterOptions = {
  name: string;
  type: string;
  isArray?: boolean;
  required?: boolean;
  modelName?: string;
};

/**
 * Default property printer implementation following interface property syntax
 */
export class PropertyPrinter extends __PropertyPrinter implements IPrint {
  constructor(protected readonly options: PropertyPrinterOptions) {
    const { name, type, isArray, required } = options;
    super({ name, type, isArray, required });
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
    super(options);
  }
  protected override __isRequired(): '' | '!' | '?' {
    return '';
  }

  protected __modelName() {
    if (!this.options.modelName) {
      throw new Error(`modelName is requried to print view entity properties!`);
    }
    return this.options.modelName;
  }

  protected override __name(): string {
    return toPropertyName(this.__modelName(), super.__name());
  }
}
export class QueryPropertyPrinter extends ViewEntityPropertyPrinter {
  protected override __isRequired(): '' | '!' | '?' {
    return '?';
  }
}

export class OptionalPropertyPrinter extends PropertyPrinter {
  protected override __isRequired(): '' | '!' | '?' {
    return '?';
  }
}

export class RequiredClassPropertyPrinter extends PropertyPrinter {
  protected override __isRequired(): '' | '!' | '?' {
    return '!';
  }
}

export class RequiredInterfacePropertyPrinter extends PropertyPrinter {
  protected override __isRequired(): '' | '!' | '?' {
    return '!';
  }
}
