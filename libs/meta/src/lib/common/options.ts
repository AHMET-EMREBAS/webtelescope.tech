/* eslint-disable @typescript-eslint/no-explicit-any */
export type __PrimitiveType = string | number | boolean | object;

export type __PropertyOptions<T extends __PrimitiveType> = {
  name?: string;
  type?: string;
  objectType?: string;
  required?: boolean;
  isArray?: boolean;
  unique?: boolean;
  modelName?: string;
  relationType?: string;
  format?: string;
  description?: string;
  defaultValue?: T;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  enums?: any[];
  update?: boolean;
  strict?: boolean;
  before?: string;
  after?: string;
  inweek?: boolean;
  weekend?: boolean;
  between?: [string, string];
  days?: number[];
  day?: number;
  monthdays?: number[];
  inputType?: string;
  autocomplete?: HTMLInputElement['autocomplete'];
  icon?: string;
  label?: string;
  searchable?: boolean;
};
