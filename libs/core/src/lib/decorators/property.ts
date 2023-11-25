/* eslint-disable @typescript-eslint/no-explicit-any */
import { combinePropertyDecorators } from '@webpackages/util';
import {
  MinLength,
  MaxLength,
  Min,
  Max,
  Length,
  IsEmail,
  IsStrongPassword,
  IsPhoneNumber,
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsNumber,
  ValidateNested,
  IsObject,
  IsBoolean,
  IsDate,
  IsIn,
} from 'class-validator';
import {
  ClassConstructor,
  Exclude,
  Expose,
  Transform,
  Type,
} from 'class-transformer';

export type PropertyType =
  | 'string'
  | 'number'
  | 'integer'
  | 'date'
  | 'boolean'
  | 'object';

export type StringFormat =
  | 'email'
  | 'password'
  | 'uuid'
  | 'barcode'
  | 'phone'
  | 'sku'
  | 'name'
  | 'description'
  | 'long-text';

type CommonPropertyOptions = {
  type: PropertyType;
  required?: true;
  isArray?: true;
  exclude?: true;
  inQuery?: true;
  default?: any;
  enum?: any[];
};

type StringPropertyOptions = {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  format?: StringFormat;
};

type DatePropertyOptions = {
  type: 'date';
};

type ObjectPropertyOptions = {
  type: 'object';
  target: ClassConstructor<any>;
};

type NumberPropertyOptions = {
  type: 'number';
  minimum?: number;
  maximum?: number;
};

type IntegerPropertyOptions = {
  type: 'integer';
  minimum: number;
  maximum: number;
};

type BooleanPropertyOptions = {
  type: 'boolean';
};

type PropertyOptions = (
  | StringPropertyOptions
  | NumberPropertyOptions
  | IntegerPropertyOptions
  | DatePropertyOptions
  | BooleanPropertyOptions
  | ObjectPropertyOptions
) &
  CommonPropertyOptions;

export function Property(options: PropertyOptions) {
  const {
    type,
    isArray: each,
    required,
    exclude,
    inQuery,
    default: defaultValue,
    enum: enumValues,
  } = options;

  const decorators: PropertyDecorator[] = [];

  // Is exposed or excluded?
  if (exclude == true) decorators.push(Exclude());
  else decorators.push(Expose());

  // Is required?
  if (required === true) decorators.push(IsNotEmpty({ each }));
  else decorators.push(IsOptional({ each }));

  if (defaultValue != undefined) {
    decorators.push(
      Transform(({ value }) => {
        if (value != undefined) {
          return value;
        }
        return defaultValue;
      })
    );
  }

  if (enumValues != undefined) {
    decorators.push(IsIn(enumValues, { each }));
  }

  // String Property Validation
  if (type === 'string') {
    const { format, maxLength, minLength } = options;

    decorators.push(IsString({ each }));

    if (minLength != undefined) decorators.push(MinLength(minLength, { each }));
    if (maxLength != undefined) decorators.push(MaxLength(maxLength, { each }));

    if (format != undefined) {
      if (format === 'barcode') decorators.push(Length(11, 14, { each }));
      else if (format === 'description')
        decorators.push(MaxLength(400, { each }));
      else if (format === 'long-text')
        decorators.push(MaxLength(1000, { each }));
      else if (format === 'name') decorators.push(Length(3, 50, { each }));
      else if (format === 'email') decorators.push(IsEmail({}, { each }));
      else if (format === 'password')
        decorators.push(IsStrongPassword({}, { each }));
      else if (format === 'phone')
        decorators.push(IsPhoneNumber(undefined, { each }));
      else if (format === 'sku') decorators.push(Length(6, 15, { each }));
      else if (format === 'uuid') decorators.push(IsUUID('4', { each }));
    }

    // Number and Integer Property Validation
  } else if (type === 'number' || type === 'integer') {
    const { maximum, minimum } = options;

    if (type === 'integer') decorators.push(IsInt({ each }));
    else decorators.push(IsNumber({}, { each }));

    if (maximum != undefined) decorators.push(Max(maximum, { each }));
    if (minimum != undefined) decorators.push(Min(minimum, { each }));

    if (inQuery) {
      decorators.push(
        Transform(({ value }) => {
          if (value != undefined) {
            if (type === 'integer') {
              return parseInt(value);
            } else {
              return parseFloat(value);
            }
          }
          return value;
        })
      );
    }
  } else if (type === 'object') {
    const { target } = options;
    decorators.push(IsObject({ each }));
    decorators.push(ValidateNested({ each }));
    decorators.push(Type(() => target));
  } else if (type === 'boolean') {
    decorators.push(IsBoolean({ each }));

    if (inQuery) {
      decorators.push(
        Transform(({ value }) => {
          if (value != undefined) {
            return value === 'true' ? true : false;
          }
          return value;
        })
      );
    }
  } else if (type === 'date') {
    decorators.push(IsDate({ each }));

    if (inQuery) {
      decorators.push(
        Transform(({ value }) => {
          if (value != undefined) {
            return new Date(value);
          }
          return value;
        })
      );
    }
  }

  return combinePropertyDecorators(...decorators);
}
