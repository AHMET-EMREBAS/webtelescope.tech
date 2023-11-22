import { ApiPropertyOptions } from '@nestjs/swagger';
export type PropertyType =
  | 'string'
  | 'number'
  | 'int'
  | 'boolean'
  | 'date'
  | 'object';

export type StringType = 'email' | 'password' | 'uuid' | 'alpha';

export type PropertyOptions = {
  type: PropertyType;
  format?: StringType;
} & Omit<ApiPropertyOptions, 'type'>;
