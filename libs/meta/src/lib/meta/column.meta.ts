import { PropertyType } from './property.meta';

export type ColumnOptions = {
  name?: string;
  type: PropertyType;
  required?: boolean;
  unique?: boolean;
  isArray?: boolean;
  description?: string;
  objectType?: string;
};
