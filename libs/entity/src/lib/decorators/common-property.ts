import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyOptions } from '@webpackages/common';
import { Type } from 'class-transformer';
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
  const decorators: PropertyDecorator[] = [ApiProperty(options)];
  const required = options.required;
  const type = options.type;
  const vo: ValidationOptions = parseValidationOptions(options);

  if (required === true) decorators.push(IsNotEmpty(vo));
  else decorators.push(IsOptional(vo));

  if (type === 'string') decorators.push(IsString(vo));
  else if (type === 'number') decorators.push(IsNumber(undefined, vo));
  else if (type === 'boolean') decorators.push(IsBoolean(vo));
  else if (type === 'date') decorators.push(IsDate(vo));
  else if (type === 'object') {
    decorators.push(IsObject(vo));
    decorators.push(ValidateNested(vo));
    decorators.push(Type(() => options.target));
  }

  return applyDecorators(...decorators);
}
