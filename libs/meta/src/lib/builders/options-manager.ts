import { ColumnOptions } from '../meta/column.meta';
import { PropertyOptions } from '../meta/property.meta';

/**
 * Build proprety options using this class so you can access property-to-column property-to-relation transformers.
 */
export class PropertyOptionsManager {
  constructor(protected readonly options: PropertyOptions) {}

  toColumn(): ColumnOptions {
    return {
      type: this.options.type,
      description: this.options.description,
      isArray: this.options.isArray,
      objectType: this.options.objectType,
      required: this.options.required,
      unique: this.options.unique,
    };
  }

  toProperty(): PropertyOptions {
    return this.options;
  }

  toQuery(): PropertyOptions {
    return {
      ...this.options,
      searchable: false,
      required: false,
    };
  }

  toUpdate(): PropertyOptions {
    return {
      ...this.options,
      required: false,
    };
  }
}
