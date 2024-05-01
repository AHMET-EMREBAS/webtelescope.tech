import { PropertyOptions } from './property';

export type ColumnOptions = Pick<
  PropertyOptions,
  | 'name'
  | 'type'
  | 'isArray'
  | 'required'
  | 'objectType'
  | 'unique'
  | 'description'
>;
