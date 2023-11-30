import {
  NumberValidationMeta,
  PropertyValidationMeta,
  StringValidationMeta,
} from './property.meta';
import { propertyDecorators } from '@webpackages/utils';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsStrongPassword as IsPassword,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export function StringProperty(
  options: StringValidationMeta
): PropertyDecorator {
  const decorators: PropertyDecorator[] = [];

  const { isArray: each, format, isIn, maxLength, minLength } = options;

  decorators.push(IsString({ each }));

  if (format) {
    if (format === 'barcode') decorators.push(Length(12, 13, { each }));
    else if (format === 'email') decorators.push(IsEmail({}, { each }));
    else if (format === 'password') decorators.push(IsPassword({}, { each }));
    else if (format === 'uuid') decorators.push(IsUUID('4', { each }));
  }

  if (isIn) decorators.push(IsIn(isIn, { each }));
  if (maxLength) decorators.push(MaxLength(maxLength, { each }));
  if (minLength) decorators.push(MaxLength(minLength, { each }));

  return propertyDecorators(...decorators);
}

export function NumberProperty(
  options: NumberValidationMeta
): PropertyDecorator {
  const decorators: PropertyDecorator[] = [];
  const { isArray: each, max, min, isInt } = options;

  decorators.push(IsNumber({}, { each }));

  if (isInt) decorators.push(IsInt({ each }));
  else decorators.push(IsNumber({}, { each }));
  if (max !== undefined) decorators.push(Max(max, { each }));
  if (min !== undefined) decorators.push(Min(min, { each }));

  return propertyDecorators(...decorators);
}

export function Property(options: PropertyValidationMeta): PropertyDecorator {
  const decorators: PropertyDecorator[] = [Expose()];

  const { type, isArray: each, required } = options;

  // Required valiation
  if (required === true) decorators.push(IsNotEmpty({ each }));
  else decorators.push(IsOptional({ each }));

  if (type === 'string') {
    decorators.push(StringProperty(options));
  } else if (type === 'boolean') {
    decorators.push(IsBoolean({ each }));
  } else if (type === 'number') {
    decorators.push(NumberProperty(options));
  } else if (type === 'date') {
    decorators.push(IsDate({ each }));
  } else if (type === 'object') {
    const { target } = options;
    decorators.push(IsObject({ each }));
    decorators.push(ValidateNested({ each }));
    decorators.push(Type(() => target));
  }

  return propertyDecorators(...decorators);
}
