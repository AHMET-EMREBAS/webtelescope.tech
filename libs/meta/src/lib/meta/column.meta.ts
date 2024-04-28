import { PropertyType } from './property.meta';

export type ColumnOptions<P extends PropertyType = PropertyType> = {
  type: P;
  required?: boolean;
  unique?: boolean;
  isArray?: boolean;
  description?: string;
  objectType?: string;
};
