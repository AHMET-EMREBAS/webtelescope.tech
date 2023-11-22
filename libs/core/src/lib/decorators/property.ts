import { Expose, Type } from 'class-transformer';
import { CombinePropertyDecorators } from './combine';
import { PropertyOptions } from './property-options';
import {
  IsString,
  IsNumber,
  IsAlpha,
  IsBoolean,
  IsStrongPassword,
  IsEmail,
  IsObject,
  IsDate,
  IsInt,
  IsUUID,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export function Property(options: PropertyOptions): PropertyDecorator {
  const { type, isArray, format, objectType, required,  } = options;

  const decorators: PropertyDecorator[] = [Expose(), ApiProperty(options)];

  const each = !!isArray;

  if (each) {
    decorators.push(IsArray());
  }

  // Required or nullable property
  if (required === true) {
    decorators.push(IsNotEmpty({ each }));
  } else {
    decorators.push(IsOptional({ each }));
  }

  // Type Validation
  if (type === 'string') {
    decorators.push(IsString({ each }));
  } else if (type === 'boolean') {
    decorators.push(IsBoolean({ each }));
  } else if (type === 'number') {
    decorators.push(IsNumber(undefined, { each }));
  } else if (type === 'int') {
    decorators.push(IsInt({ each }));
  } else if (type === 'date') {
    decorators.push(IsDate({ each }));
  } else if (type === 'object') {
    decorators.push(IsObject({ each }));
    decorators.push(ValidateNested({ each }));

    if (!objectType) {
      throw new Error(
        'Property type is set object but objectType is not provided!'
      );
    } else {
      decorators.push(Type(() => objectType));
    }
  }

  // String Format Validation
  if (format === 'email') {
    decorators.push(IsEmail(undefined, { each }));
  } else if (format === 'alpha') {
    decorators.push(IsAlpha(undefined, { each }));
  } else if (format === 'password') {
    decorators.push(IsStrongPassword({ minLength: 6 }, { each }));
  } else if (format === 'uuid') {
    decorators.push(IsUUID('4'));
  }

  // String Length Validation
  const { minLength, maxLength } = options;

  if (minLength != undefined) decorators.push(MinLength(minLength));
  if (maxLength != undefined) decorators.push(MaxLength(maxLength));

  //   Number Validation
  const { minimum, maximum } = options;

  if (minimum != undefined) decorators.push(Min(minimum));
  if (maximum != undefined) decorators.push(Max(maximum));

  return CombinePropertyDecorators(...decorators);
}
