import { IPrint, ImportPrinter } from '@webpackages/printer';
import { EmptyPrinter, IPackageNameProvider } from '../common-imp';
import { BuiltinClassNames } from '@webpackages/meta';
import { ICoverAllClassTypes } from '../common';

/**
 * Provides import for classes (Dto, Entity, Column, Property etc)
 */
export class ClassImportBuilder implements ICoverAllClassTypes<IPrint> {
  /**
   *
   * @param packageNameProvider package names, core and common
   * @param decoratorListProvider provides decorator list for each class type
   */
  constructor(
    protected readonly packageNameProvider: IPackageNameProvider,
    protected readonly decoratorListProvider: ICoverAllClassTypes<string[]>
  ) {}

  /**
   * Entity and Column imports
   */
  Entity(): IPrint {
    const items = [...this.decoratorListProvider.Entity()];
    const source = this.packageNameProvider.core();
    return new ImportPrinter({
      items,
      source,
    });
  }

  /**
   * ViewEntity and ViewColumn imports
   */
  View(): IPrint {
    const items = [...this.decoratorListProvider.View()];
    const source = this.packageNameProvider.core();
    return new ImportPrinter({
      items,
      source,
    });
  }

  /**
   * Dto, Property import
   */
  Create(): IPrint {
    const items = [...this.decoratorListProvider.Create()];
    const source = this.packageNameProvider.core();
    return new ImportPrinter({
      items,
      source,
    });
  }

  /**
   * Dto, Property, PartialType import
   */
  Update(): IPrint {
    const items = [...this.decoratorListProvider.Update()];
    const source = this.packageNameProvider.core();
    return new ImportPrinter({
      items,
      source,
    });
  }

  /**
   * Dto, Property import
   */
  Query(): IPrint {
    const items = [...this.decoratorListProvider.Query()];
    const source = this.packageNameProvider.core();
    return new ImportPrinter({
      items,
      source,
    });
  }

  /**
   * Interfaces only import IID for generic type
   */
  IEntity(): IPrint {
    return new ImportPrinter({
      items: [BuiltinClassNames.IID],
      source: this.packageNameProvider.common(),
    });
  }
  /**
   * Interfaces only import IID for generic type
   */
  IView(): IPrint {
    return EmptyPrinter;
  }
  /**
   * Interfaces only import IID for generic type
   */
  ICreate(): IPrint {
    return new ImportPrinter({
      items: [BuiltinClassNames.IID],
      source: this.packageNameProvider.common(),
    });
  }
  /**
   * Interfaces only import IID for generic type
   */
  IUpdate(): IPrint {
    return new ImportPrinter({
      items: [BuiltinClassNames.IID],
      source: this.packageNameProvider.common(),
    });
  }
  /**
   * IQuery does not import anything
   */
  IQuery(): IPrint {
    return EmptyPrinter;
  }
}
