import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUrl,
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
  format?: 'email' | 'password' | 'barcode' | 'phone' | 'uri';
} & CommonPropertyOptions<string>;

export function StringProperty(options: StringPropertyOptions) {
  const {
    format,
    maxLength,
    minLength,
    required,
    isArray,
    defaultValue,
    example,
    description,
  } = options;
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
      example,
      description,
    }),
    IsRequired(required, vo),
    IsString(vo),
    Transform(({ value }) => {
      if (value == undefined) {
        if (defaultValue) {
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
  } else if (format === 'uri') {
    des.push(IsUrl({}, vo));
  }

  // String specific contraints
  if (maxLength !== undefined) des.push(MaxLength(maxLength, vo));
  if (minLength !== undefined) des.push(MinLength(minLength, vo));

  return applyDecorators(...des);
}

export type NamePropertyOptions = Pick<CommonPropertyOptions, 'isArray'>;
export type ShortTextPropertyOptions = NamePropertyOptions;
export type LongTextPropertyOptions = NamePropertyOptions;
export type EmailPropertyOptions = NamePropertyOptions;
export type PhonePropertyOptions = NamePropertyOptions;
export type BarcodePropertyOptions = NamePropertyOptions;
export type URLPropertyOptions = NamePropertyOptions;

/**
 * Required name property decorator
 */
export function NameProperty(options: NamePropertyOptions = {}) {
  return StringProperty({
    required: true,
    maxLength: 30,
    minLength: 3,
    description: 'Required name property',
    ...options,
  });
}

/**
 * Optional short string property decorator
 */
export function ShortTextProperty(options: ShortTextPropertyOptions = {}) {
  return StringProperty({
    maxLength: 400,
    description: 'Maximum 400 characters string property',
    ...options,
  });
}

/**
 * Optional text property
 */
export function OptionalTextProperty(options: ShortTextPropertyOptions = {}) {
  return StringProperty({
    maxLength: 1000,
    description: 'Optional text property',
    required: false,
    ...options,
  });
}

export function RequiredTextProperty() {
  return StringProperty({
    maxLength: 1000,
    description: 'Required text property',
    required: true,
    minLength: 1,
  });
}

/**
 * Long string property decorator
 */
export function LongTextProperty(options: LongTextPropertyOptions = {}) {
  return StringProperty({
    maxLength: 1000,
    description: 'Maximum 1000 characters string property',
    ...options,
  });
}

/**
 * Requird email property decorator
 */
export function EmailProperty(options: EmailPropertyOptions = {}) {
  return StringProperty({
    format: 'email',
    required: true,
    description: 'Email property',
    ...options,
  });
}

/**
 * Requird email property decorator
 */
export function PhoneProperty(options: PhonePropertyOptions = {}) {
  return StringProperty({
    format: 'phone',
    required: true,
    description: 'Phone property',
    ...options,
  });
}
/**
 * Requird password property decorator
 */
export function PasswordProperty() {
  return StringProperty({
    format: 'password',
    required: true,
    description: 'Password property',
  });
}
/**
 * Requird barcode property decorator
 */
export function BarcodeProperty(options: BarcodePropertyOptions = {}) {
  return StringProperty({
    format: 'barcode',
    required: true,
    description: 'Barcode property',
    ...options,
  });
}

export function URLProperty(options: URLPropertyOptions = {}) {
  return StringProperty({
    format: 'uri',
    required: true,
    description: 'URI value',
    ...options,
  });
}
