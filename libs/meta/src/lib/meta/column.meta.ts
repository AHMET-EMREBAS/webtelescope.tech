import { PropertyType } from './property.meta';

export type ColumnOptions = {
  type: PropertyType;
  required?: boolean;
  unique?: boolean;
  isArray?: boolean;
  description?: string;
  objectType?: string;
};
