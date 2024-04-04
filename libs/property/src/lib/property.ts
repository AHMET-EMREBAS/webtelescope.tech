/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type as TypeDef, applyDecorators } from '@nestjs/common';
import { ApiPropertyOptions as APO, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsCreditCard,
  IsDate,
  IsEmail,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
  ValidationOptions,
  isBooleanString,
  isDateString,
  isJSON,
  isNumberString,
  IsEAN,
  IsISIN,
  IsISSN,
  MaxLength,
  Max,
  Min,
  ValidateNested,
  IsIn,
  IsJWT,
  IsUUID,
  IsUrl,
} from 'class-validator';

export type ApiPropertyType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'object';

export type SpecialStringFormat =
  | 'jwt'
  | 'email'
  | 'password'
  | 'phone'
  | 'credit-card'
  | 'ip4'
  | 'ip6'
  | 'ean'
  | 'isin'
  | 'issn'
  | 'uuid'
  | 'url';

export type ApiPropertyOptions = APO & {
  type: ApiPropertyType;
  objectType?: TypeDef;
  exclude?: boolean;
  specialFormat?: SpecialStringFormat;
  enum?: any[];
};

export function __commonProperty(options: ApiPropertyOptions) {
  const { required, type, isArray, default: defaultValue, exclude } = options;

  const vo: ValidationOptions = { each: !!isArray };

  const des: PropertyDecorator[] = [
    exclude === true ? Exclude() : Expose(),
    required == false ? IsOptional(vo) : IsNotEmpty(vo),
    ApiProperty({
      ...options,
      required: options.required === false ? false : true,
      nullable: options.required === false ? true : false,
    }),
  ];

  des.push(
    Transform(({ value }) => {
      if (value != undefined) {
        if (defaultValue) {
          return defaultValue;
        }
      }
      return value;
    })
  );

  des.push(
    Transform(({ value }) => {
      if (isJSON(value)) {
        return JSON.parse(value);
      }
      return value;
    })
  );

  if (type === 'string') {
    des.push(
      Transform(({ value }) => {
        return value;
      })
    );
    des.push(IsString(vo));
  } else if (type === 'boolean') {
    des.push(
      Transform(({ value }) => {
        if (isBooleanString(value)) {
          return value === 'true'
            ? true
            : value === 'false'
            ? false
            : undefined;
        }

        return value;
      })
    );
    des.push(IsBoolean(vo));
  } else if (type === 'date') {
    des.push(
      Transform(({ value }) => {
        if (isDateString(value)) {
          return new Date(value);
        }
        return value;
      })
    );
    des.push(IsDate(vo));
  } else if (type === 'number') {
    des.push(
      Transform(({ value }) => {
        if (isNumberString(value)) {
          return parseFloat(value);
        }
        return value;
      })
    );
    des.push(IsNumber({}, vo));
  } else if (type === 'object') {
    des.push(
      Transform(({ value }) => {
        if (isJSON(value)) {
          return JSON.parse(value);
        }

        return value;
      })
    );
    des.push(IsObject(vo));
    des.push(ValidateNested(vo));
    if (options.objectType) {
      des.push(Type(() => options.objectType!));
    }
  }

  return applyDecorators(...des);
}

export function __commonStringProperty(options: ApiPropertyOptions) {
  const des: PropertyDecorator[] = [];

  const { isArray, minLength, maxLength } = options;
  const vo: ValidationOptions = { each: isArray };

  if (minLength != undefined) des.push(MinLength(minLength, vo));
  if (maxLength != undefined) des.push(MaxLength(maxLength, vo));
  return applyDecorators(...des);
}

export function __commonFormatProperty(options: ApiPropertyOptions) {
  const des: PropertyDecorator[] = [];

  const { isArray, specialFormat } = options;
  const vo: ValidationOptions = { each: isArray };

  if (specialFormat) {
    if (specialFormat === 'email') des.push(IsEmail({}, vo));
    else if (specialFormat === 'password') des.push(IsStrongPassword({}, vo));
    else if (specialFormat === 'phone') des.push(IsPhoneNumber(undefined, vo));
    else if (specialFormat === 'credit-card') des.push(IsCreditCard(vo));
    else if (specialFormat === 'ip4') des.push(IsIP('4', vo));
    else if (specialFormat === 'ip6') des.push(IsIP('6', vo));
    else if (specialFormat === 'ean') des.push(IsEAN(vo));
    else if (specialFormat === 'isin') des.push(IsISIN(vo));
    else if (specialFormat === 'issn') des.push(IsISSN(undefined, vo));
    else if (specialFormat === 'jwt') des.push(IsJWT(vo));
    else if (specialFormat === 'uuid') des.push(IsUUID('4', vo));
    else if (specialFormat === 'url') des.push(IsUrl(undefined, vo));
  }

  if (options.enum) des.push(IsIn(options.enum, vo));

  return applyDecorators(...des);
}

export function __commonNumberProperty(options: ApiPropertyOptions) {
  const des: PropertyDecorator[] = [];

  const { isArray, minimum, maximum } = options;
  const vo: ValidationOptions = { each: isArray };

  if (minimum != undefined) des.push(Min(minimum, vo));
  if (maximum != undefined) des.push(Max(maximum, vo));

  return applyDecorators(...des);
}

export function Property(options: ApiPropertyOptions) {
  const des: PropertyDecorator[] = [
    __commonProperty(options),
    __commonStringProperty(options),
    __commonFormatProperty(options),
    __commonNumberProperty(options),
  ];

  return applyDecorators(...des);
}
