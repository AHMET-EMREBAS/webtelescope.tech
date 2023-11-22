import { Type } from '@nestjs/common';
import { ApiPropertyOptions } from '@nestjs/swagger';
export type PropertyType =
  | 'string'
  | 'number'
  | 'int'
  | 'boolean'
  | 'date'
  | 'object';

export type StringType = 'email' | 'password' | 'uuid' | 'alpha';

export type PropertyOptions<PT extends PropertyType = PropertyType> = {
  /**
   * one of 'string' | 'number' | 'int' | 'boolean' | 'date' | 'object'
   */
  type: PT;

  /**
   * one of 'email' | 'password' | 'uuid' | 'alpha'
   */
  format?: StringType;

  /**
   * If type is set object, then objectType should be provided!
   */
  objectType?: Type<any>;

  parseInt?: boolean;
  parseBoolean?: boolean;
  parseDate?: boolean;
} & Omit<ApiPropertyOptions, 'type'>;
