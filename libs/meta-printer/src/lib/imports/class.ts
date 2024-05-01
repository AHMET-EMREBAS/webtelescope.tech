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
    protected readonly classNameBuilder: ICoverAllClassTypes<string>,
    protected readonly decoratorListProvider: ICoverAllClassTypes<string[]>
  ) {}

  /**
   * Entity, Column, and IEntity imports
   */
  Entity(): IPrint {
    const items = [...this.decoratorListProvider.Entity()];
    const source = this.packageNameProvider.core();
    const content = [
      new ImportPrinter({
        items,
        source,
      }),
      new ImportPrinter({
        items: [this.classNameBuilder.IEntity()],
        source: this.packageNameProvider.common(),
      }),
    ].join('\n');

    return {
      print() {
        return content;
      },
    };
  }

  /**
   * ViewEntity, ViewColumn, IView imports
   */
  View(): IPrint {
    const items = [...this.decoratorListProvider.View()];
    const source = this.packageNameProvider.core();
    const content = [
      new ImportPrinter({
        items,
        source,
      }).print(),
      new ImportPrinter({
        items: [this.classNameBuilder.IView()],
        source: this.packageNameProvider.common(),
      }),
    ].join('\n');

    return {
      print() {
        return content;
      },
    };
  }

  /**
   * Dto, Property import
   */
  Create(): IPrint {
    const items = [...this.decoratorListProvider.Create()];
    const source = this.packageNameProvider.core();
    const content = [
      new ImportPrinter({
        items,
        source,
      }).print(),
      new ImportPrinter({
        items: [this.classNameBuilder.ICreate()],
        source: this.packageNameProvider.common(),
      }),
    ].join('\n');

    return {
      print() {
        return content;
      },
    };
  }

  /**
   * Dto, Property, PartialType import
   */
  Update(): IPrint {
    const items = [...this.decoratorListProvider.Update()];
    const source = this.packageNameProvider.core();
    const content = [
      new ImportPrinter({
        items,
        source,
      }).print(),
      new ImportPrinter({
        items: [this.classNameBuilder.IUpdate()],
        source: this.packageNameProvider.common(),
      }),
    ].join('\n');

    return {
      print() {
        return content;
      },
    };
  }

  /**
   * Dto, Property import
   */
  Query(): IPrint {
    const items = [...this.decoratorListProvider.Query()];
    const source = this.packageNameProvider.core();
    const content = [
      new ImportPrinter({
        items,
        source,
      }).print(),
      new ImportPrinter({
        items: [this.classNameBuilder.IQuery()],
        source: this.packageNameProvider.common(),
      }),
    ].join('\n');

    return {
      print() {
        return content;
      },
    };
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
