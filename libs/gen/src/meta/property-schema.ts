export type PropertyType<ClassName extends string = 'Class'> =
  | 'string'
  | 'number'
  | 'boolean'
  | 'Date'
  | ClassName;

export interface BasePropertySchema<T> {
  type: T;
  isArray?: true;
}

export type StringFormat = 'email' | 'phone' | 'password' | 'uuid';

export interface StringPropertySchema extends BasePropertySchema<'string'> {
  minLength?: number;
  maxLength?: number;
  isIn?: string[];
  format?: StringFormat;
}

export interface NumberPropertySchema extends BasePropertySchema<'number'> {
  min?: number;
  max?: number;
  isInt?: true;
}

export interface BooleanPropertySchema extends BasePropertySchema<'boolean'> {}

export interface DatePropertySchema extends BasePropertySchema<'Date'> {
  beforeDate?: Date;
  afterDate?: Date;
}

export interface ClassPropertySchema<ClassName extends string = string>
  extends BasePropertySchema<ClassName> {}

export type PropertySchema<ClassName extends string> =
  | StringPropertySchema
  | NumberPropertySchema
  | BooleanPropertySchema
  | DatePropertySchema
  | ClassPropertySchema<ClassName>;
