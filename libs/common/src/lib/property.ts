/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ObjectLiteral {
  [key: string]: any;
}
export declare type ClassConstructor<T> = {
  new (...args: any[]): T;
};
/**
 * Used both property and colum type
 */
export type PropertyType = 'string' | 'number' | 'date' | 'boolean' | 'object';

/**
 * Available format validations
 */
export type StringFormat =
  | 'email'
  | 'password'
  | 'ip4'
  | 'ip6'
  | 'phone'
  | 'barcode'
  | 'alpha'
  | 'credit-card'
  | 'data-uri'
  | 'alphanumeric'
  | 'iban'
  | 'hsl'
  | 'hash'
  | 'isbn10'
  | 'isbn13'
  | 'hex-color'
  | 'rgb-color';

export type CommonPropertyOptions<T extends PropertyType> = {
  type: T;
  inQuery?: boolean;
  required?: boolean;
  unique?: boolean;
  isArray?: boolean;
  default?: any;
  examples?: any;
  defaultValue?: any;
};

export type PickKeysOf<T, K extends keyof T> = Partial<Pick<T, K>>;

export type StringPropertyOptions = CommonPropertyOptions<'string'> & {
  minLength?: number;
  maxLength?: number;
  enum?: string[];
  format?: StringFormat;
};

export type NumberPropertyOptions = CommonPropertyOptions<'number'> & {
  minimum?: number;
  maximum?: number;
  isInt?: boolean;
};

export type BooleanPropertyOptions = CommonPropertyOptions<'boolean'>;
export type DatePropertyOptions = CommonPropertyOptions<'date'>;
export type ObjectPropertyOptions = CommonPropertyOptions<'object'> & {
  target?: ClassConstructor<any>;
};

export type PropertyOptions =
  | StringPropertyOptions
  | NumberPropertyOptions
  | BooleanPropertyOptions
  | DatePropertyOptions
  | ObjectPropertyOptions;
