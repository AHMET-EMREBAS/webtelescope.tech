import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyOptions } from '@webpackages/common';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';
import { DefaultValueTransformer } from './property-transformers';

/**
 * Create validation options based on the isArray property
 * @param options
 * @returns
 */
export function parseValidationOptions(
  options: Pick<PropertyOptions, 'isArray'>
): ValidationOptions {
  return {
    each: !!options.isArray,
  };
}

export function CommonPropertyDecorators(
  options: PropertyOptions
): PropertyDecorator {
  const nullable = options.required !== undefined ? !options.required : true;

  const decorators: PropertyDecorator[] = [
    Expose(),
    ApiProperty({ ...options, nullable, required: !nullable }),
  ];
  const required = options.required;
  const type = options.type;

  const vo: ValidationOptions = parseValidationOptions(options);

  if (required === true) decorators.push(IsNotEmpty(vo));
  else decorators.push(IsOptional(vo));

  if (options.default !== undefined) {
    decorators.push(DefaultValueTransformer(options.default));
  }

  if (type === 'string') {
    decorators.push(IsString(vo));
  } else if (type === 'number') {
    decorators.push(IsNumber(undefined, vo));
  } else if (type === 'boolean') {
    decorators.push(IsBoolean(vo));
  } else if (type === 'date') {
    decorators.push(IsDate(vo));
  } else if (type === 'object') {
    decorators.push(IsObject(vo));
    decorators.push(ValidateNested(vo));
    if (options.target) {
      decorators.push(Type(() => options.target!));
    }
  }

  return applyDecorators(...decorators);
}
