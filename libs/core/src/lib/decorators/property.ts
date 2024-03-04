import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  ValidationOptions,
  ValidateNested,
  IsEmail,
  IsStrongPassword,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsBoolean,
  IsString,
  IsDate,
  IsObject,
  Min,
  Max,
  IsNumber,
  IsInt,
} from 'class-validator';
import { ClassConstructor, Type } from 'class-transformer';

export type CommonPropertyOptions = {
  nullable?: true;
  unique?: true;
  description?: string;
  isArray?: true;
};

export type StringFormat = 'email' | 'password' | 'phone';

export type StringPropertyOptions = {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  format?: StringFormat;
};

export type NumberPropertyOptions = {
  type: 'number';
  min?: number;
  max?: number;
};
export type IntegerPropertyOptions = {
  type: 'integer';
  min?: number;
  max?: number;
};

export type BooleanPropertyOptions = {
  type: 'boolean';
};

export type DatePropertyOptions = {
  type: 'date';
};

export type ObjectPropertyOptions = {
  type: 'object';
  objectType: ClassConstructor<unknown>;
};

export type PropertyOptions = CommonPropertyOptions &
  (
    | StringPropertyOptions
    | NumberPropertyOptions
    | IntegerPropertyOptions
    | BooleanPropertyOptions
    | DatePropertyOptions
    | ObjectPropertyOptions
  );

/**
 * Property decorator
 */
export function Property(options: PropertyOptions) {
  const { type, isArray, nullable } = options;
  const validationOptions: ValidationOptions = isArray ? { each: true } : {};

  const required = nullable == true ? false : true;

  const decorators: PropertyDecorator[] = [
    ApiProperty({ ...options, required, nullable: !!nullable }),
  ];

  if (nullable) {
    decorators.push(IsOptional(validationOptions));
  }

  if (required) {
    decorators.push(IsNotEmpty(validationOptions));
  }

  if (type === 'object') {
    decorators.push(IsObject(validationOptions));
    decorators.push(Type(() => options.objectType));

    decorators.push(ValidateNested(validationOptions));
  } else if (type == 'string') {
    const { format, minLength, maxLength } = options;

    decorators.push(IsString(validationOptions));

    if (format === 'email')
      decorators.push(IsEmail(undefined, validationOptions));

    if (format === 'password')
      decorators.push(IsStrongPassword(undefined, validationOptions));

    if (format === 'phone')
      decorators.push(IsPhoneNumber(undefined, validationOptions));

    if (minLength !== undefined)
      decorators.push(MinLength(minLength, validationOptions));

    if (maxLength !== undefined)
      decorators.push(MaxLength(maxLength, validationOptions));
  } else if (type === 'boolean') {
    decorators.push(IsBoolean(validationOptions));
  } else if (type === 'date') {
    decorators.push(IsDate(validationOptions));
  } else if (type === 'number' || type == 'integer') {
    const { min, max } = options;

    if (type === 'number') {
      decorators.push(IsNumber(undefined, validationOptions));
    } else {
      decorators.push(IsInt(validationOptions));
    }

    if (min != undefined) decorators.push(Min(min, validationOptions));
    if (max != undefined) decorators.push(Max(max, validationOptions));
  }

  return applyDecorators(...decorators);
}
