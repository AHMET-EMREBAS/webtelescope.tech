import { PropertyOptions } from './property';

export type ColumnOptions = Pick<
  PropertyOptions,
  'type' | 'unique' | 'required'
>;
