import { names } from '@webpackages/utils';
import { ColumnOptions } from '../meta/column.meta';
import { PropertyOptions } from '../meta/property.meta';

/**
 * Build proprety options using this class so you can access property-to-column property-to-relation transformers.
 */
export class PropertyManager {
  constructor(protected readonly propertyOptions: PropertyOptions) {}

  protected toViewName(modelName?: string, name?: string) {
    if (modelName && name) {
      return names(modelName + names(name).className).propertyName;
    }
    return name;
  }

  protected __buildPropertyOptions(
    options?: Partial<PropertyOptions>
  ): PropertyOptions {
    return {
      ...this.propertyOptions,
      ...options,
      type: this.propertyOptions.type,
    } as PropertyOptions;
  }

  toColumn(): ColumnOptions {
    const { name, type, description, isArray, objectType, required, unique } =
      this.propertyOptions;
    return { name, type, description, isArray, objectType, required, unique };
  }

  toCreate(): PropertyOptions {
    return this.__buildPropertyOptions();
  }

  toUpdate(): PropertyOptions {
    return this.__buildPropertyOptions({ required: false });
  }

  toQuery(modelName = ''): PropertyOptions {
    if (this.propertyOptions.searchable) {
      return this.__buildPropertyOptions({
        name: this.toViewName(modelName, this.propertyOptions.name),
        required: undefined,
      });
    }

    throw new Error(`Property is not searchable!`);
  }

  toView(modelName: string = '') {
    return this.toQuery(modelName);
  }
}
