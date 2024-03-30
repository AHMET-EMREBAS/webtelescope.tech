import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
  MinLength,
  ValidationOptions,
} from 'class-validator';
import { IsRequired } from './required';
import { CommonPropertyOptions } from './common-options';

export type StringPropertyOptions = {
  minLength?: number;
  maxLength?: number;
  format?: 'email' | 'password' | 'barcode';
} & CommonPropertyOptions<string>;

export function StringProperty(options: StringPropertyOptions) {
  const { format, maxLength, minLength, required, isArray, defaultValue } =
    options;
  const vo: ValidationOptions = { each: !!isArray };

  const des: PropertyDecorator[] = [
    ApiProperty({
      type: 'string',
      format,
      minLength,
      maxLength,
      isArray,
      required,
      nullable: !required,
      default: defaultValue,
    }),
    IsRequired(required, vo),
    IsString(vo),
    Transform(({ value }) => {
      if (defaultValue) {
        if (!value) {
          return defaultValue;
        }
      }
      return value;
    }),
    Expose(),
  ];

  // String format constraints
  if (format === 'email') {
    des.push(IsEmail(undefined, vo));
  } else if (format === 'barcode') {
    des.push(Length(3, 14));
  } else if (format === 'password') {
    des.push(IsStrongPassword(undefined, vo));
  } else if (format === 'phone') {
    des.push(IsPhoneNumber(undefined, vo));
  }

  // String specific contraints
  if (maxLength !== undefined) des.push(MaxLength(maxLength, vo));
  if (minLength !== undefined) des.push(MinLength(minLength, vo));

  return applyDecorators(...des);
}

/**
 * Required name property decorator
 * @returns
 */
export function NameProperty() {
  return StringProperty({ required: true, maxLength: 30, minLength: 3 });
}

/**
 * Short string property decorator
 * @returns
 */
export function ShortTextProperty() {
  return StringProperty({ maxLength: 400 });
}

/**
 * Long string property decorator
 * @returns
 */
export function LongTextProperty() {
  return StringProperty({ maxLength: 1000 });
}

/**
 * Requird email property decorator
 * @returns
 */
export function EmailProperty() {
  return StringProperty({ format: 'email', required: true });
}
/**
 * Requird password property decorator
 * @returns
 */
export function PasswordProperty() {
  return StringProperty({ format: 'email', required: true });
}
/**
 * Requird barcode property decorator
 * @returns
 */
export function BarcodeProperty() {
  return StringProperty({ format: 'barcode', required: true });
}
