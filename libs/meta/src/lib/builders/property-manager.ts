import { toPropertyName } from '@webpackages/utils';
import { ColumnOptions, PropertyOptions } from '../meta';
import { orderPropertyOptions } from './order-objects';

/**
 * Build proprety options using this class so you can access property-to-column property-to-relation transformers.
 */
export class PropertyManager {
  constructor(protected readonly propertyOptions: PropertyOptions) {}

  protected __buildPropertyOptions(
    options?: Partial<PropertyOptions>
  ): PropertyOptions {
    return orderPropertyOptions({
      ...this.propertyOptions,
      ...options,
      type: this.propertyOptions.type,
    } as PropertyOptions);
  }

  isSearchable() {
    return this.propertyOptions.searchable;
  }

  toColumn(): ColumnOptions {
    return orderPropertyOptions(this.propertyOptions);
  }

  toCreate(): PropertyOptions {
    return this.__buildPropertyOptions();
  }

  toUpdate(): PropertyOptions {
    return this.__buildPropertyOptions({ required: undefined });
  }

  toQuery(modelName = ''): PropertyOptions {
    return this.__buildPropertyOptions({
      name: toPropertyName(modelName, this.propertyOptions.name),
      required: undefined,
    });
  }

  toView(modelName: string = '') {
    return this.__buildPropertyOptions({
      name: toPropertyName(modelName, this.propertyOptions.name),
    });
  }
}
