import { ColumnOptions } from '../meta/column.meta';
import { PropertyOptions } from '../meta/property.meta';

export class PropertyOptionsBuilder {
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
