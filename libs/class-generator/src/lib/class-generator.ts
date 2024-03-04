export class ImportDefination {
  packageName!: string;
  imports!: string[];
}

export class DecoratorDefination {
  decoratorName!: string;
  decoratorOptions?: Record<string, unknown>;
  imports?: ImportDefination[];
}

export class PropertyDefination {
  propertyName!: string;
  type!: 'string' | 'number' | 'boolean' | 'Date' | 'Object';
  target?: string;
  isArray?: boolean;
  required?: boolean;
  decorators?: DecoratorDefination[];
  imports?: ImportDefination[];
}

export class ClassDefination {
  className!: string;
  extending?: string;
  properties!: PropertyDefination[];
  decorators?: DecoratorDefination[];
  imports?: ImportDefination[];
}

export class ImportPrinter {
  private readonly importMap = new Map<string, Set<string>>();
  constructor(private readonly imports: ImportDefination[]) {}

  private mapImports() {
    this.imports.forEach((e) => {
      const nSet = this.importMap.get(e.packageName) || new Set();
      for (const i of e.imports) {
        nSet.add(i);
      }
      this.importMap.set(e.packageName, nSet);
    });
  }

  print() {
    this.mapImports();
    const __text = [...this.importMap.entries()]
      .map(([key, value]) => {
        return `import { ${[...value].join(', ')} } from '${key}';`;
      })
      .join(' ');
    return __text ? __text + ' ' : '';
  }
}

export class DecoratorPrinter {
  constructor(private readonly decoratorDefination: DecoratorDefination) {}

  print() {
    const dOptions = this.decoratorDefination.decoratorOptions;
    const options = dOptions ? JSON.stringify(dOptions) : '';
    return `@${this.decoratorDefination.decoratorName}(${options})`;
  }

  static print(decorators?: DecoratorDefination[]) {
    const __text = decorators
      ?.map((e) => new DecoratorPrinter(e).print())
      .join(' ');

    return __text ? __text + ' ' : '';
  }
}

export class PropertyPrinter {
  constructor(private readonly propertyDefination: PropertyDefination) {}

  private printType() {
    const arraySuffix = this.propertyDefination.isArray ? '[]' : '';
    const requiredFix = this.propertyDefination.required ? '!' : '?';

    if (this.propertyDefination.type === 'Object') {
      return `${requiredFix}:${this.propertyDefination.target}${arraySuffix}`;
    } else {
      return `${requiredFix}:${this.propertyDefination.type}${arraySuffix}`;
    }
  }

  print() {
    return `${DecoratorPrinter.print(this.propertyDefination.decorators)}${
      this.propertyDefination.propertyName
    }${this.printType()};`;
  }

  static print(properties?: PropertyDefination[]) {
    const __text = properties
      ?.map((e) => new PropertyPrinter(e).print())
      .join(' ');
    return __text ? ` ${__text} ` : '';
  }
}

export class ClassPrinter {
  constructor(private readonly classDefination: ClassDefination) {}

  private printExtends() {
    const { extending } = this.classDefination;
    return extending ? ` extends ${extending} ` : '';
  }

  private printImports() {
    const importList: ImportDefination[] = [];

    const pushImports = (imports?: ImportDefination[]) =>
      importList.push(...(imports || []));

    importList.push(...(this.classDefination.imports || []));
    for (const pi of this.classDefination.decorators || [])
      pushImports(pi.imports);

    for (const pi of this.classDefination.properties) {
      pushImports(pi.imports);
      for (const p of pi.decorators || []) {
        pushImports(p.imports);
      }
    }

    return new ImportPrinter(importList).print();
  }

  print() {
    const { className } = this.classDefination;
    return `${this.printImports()}${DecoratorPrinter.print(
      this.classDefination.decorators
    )}export class ${className}${this.printExtends()} {${PropertyPrinter.print(
      this.classDefination.properties
    )}}`;
  }
}
