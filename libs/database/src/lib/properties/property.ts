import { ApiProperty } from '@nestjs/swagger';
import { PropertyType } from './property-type';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsStrongPassword,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { applyDecorators } from '@nestjs/common';

export type CommonPropertyOptions = {
  required?: boolean;
  fromQuery?: boolean;
  isArray?: boolean;
};

export type PropertyOptions = {
  type: PropertyType;
} & CommonPropertyOptions;

function __isRequiredProperty(required?: boolean) {
  return required === true ? true : false;
}

function __RequiredOrOptional(
  required: boolean | undefined,
  each: boolean | undefined
) {
  return __isRequiredProperty(required)
    ? IsNotEmpty({ each })
    : IsOptional({ each });
}

export function NameProperty(
  options?: CommonPropertyOptions
): PropertyDecorator {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'string',
      required: __isRequiredProperty(options?.required),
      example: 'Some name',
      isArray: each,
      minLength: 3,
      maxLength: 50,
    }),
    MinLength(3),
    MaxLength(50),
    __RequiredOrOptional(options?.required, each)
  );
}

export function PhoneProperty(
  options?: CommonPropertyOptions
): PropertyDecorator {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'string',
      required: __isRequiredProperty(options?.required),
      example: '1231231212',
      format: 'phone',
      isArray: each,
    }),
    MinLength(10),
    MaxLength(13),
    __RequiredOrOptional(options?.required, each)
  );
}

export function TextProperty(
  options?: CommonPropertyOptions
): PropertyDecorator {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'string',
      required: __isRequiredProperty(options?.required),
      example: 'Some description',
      isArray: each,
      minLength: 3,
      maxLength: 400,
    }),
    MinLength(3),
    MaxLength(400),
    __RequiredOrOptional(options?.required, each)
  );
}

export function LongTextProperty(
  options?: CommonPropertyOptions
): PropertyDecorator {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'string',
      required: __isRequiredProperty(options?.required),
      example: 'Long text',
      isArray: each,
      minLength: 3,
      maxLength: 1000,
    }),
    MinLength(3),
    MaxLength(1000),
    __RequiredOrOptional(options?.required, each)
  );
}

export function URLProperty(
  options?: CommonPropertyOptions
): PropertyDecorator {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'string',
      required: __isRequiredProperty(options?.required),
      example: 'https://domain.com/images/image.png',
      isArray: each,
      format: 'url',
    }),
    IsUrl({}, { each }),
    __RequiredOrOptional(options?.required, each)
  );
}

export function UsernameProperty(
  options?: CommonPropertyOptions
): PropertyDecorator {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'string',
      required: __isRequiredProperty(options?.required),
      format: 'email',
      example: 'root@root.com',
      isArray: each,
    }),
    IsEmail({}, { each }),
    __RequiredOrOptional(options?.required, each)
  );
}

export function PasswordProperty(options?: CommonPropertyOptions) {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'string',
      required: __isRequiredProperty(options?.required),
      format: 'password',
      example: 'Pass123!',
      isArray: each,
    }),
    __RequiredOrOptional(options?.required, each),
    IsStrongPassword({}, { each })
  );
}

export function NumberProperty(options?: CommonPropertyOptions) {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'number',
      required: __isRequiredProperty(options?.required),
      isArray: each,
      example: '1234.1234',
    }),
    IsNumber({}, { each }),
    __RequiredOrOptional(options?.required, each)
  );
}

export function PositiveNumberProperty(options?: CommonPropertyOptions) {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'number',
      required: __isRequiredProperty(options?.required),
      isArray: each,
      example: '1234',
      minimum: 0,
    }),
    IsNumber({}, { each }),
    Min(0),
    __RequiredOrOptional(options?.required, each)
  );
}

export function IntergerProperty(options?: CommonPropertyOptions) {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'integer',
      required: __isRequiredProperty(options?.required),
      isArray: each,
      example: '1234',
    }),
    IsInt({ each }),
    __RequiredOrOptional(options?.required, each)
  );
}

export function PositiveIntegerProperty(options?: CommonPropertyOptions) {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'integer',
      required: __isRequiredProperty(options?.required),
      isArray: each,
      example: '1234',
      minimum: 0,
    }),
    IsInt({ each }),
    Min(0),
    __RequiredOrOptional(options?.required, each)
  );
}

@Exclude()
export class ObjectId {
  @PositiveIntegerProperty({ required: true }) id!: number;
}

export function ObjectIdProperty(options?: CommonPropertyOptions) {
  const each = !!options?.isArray;
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'object',
      required: __isRequiredProperty(options?.required),
      isArray: each,
      examples: ['{ id:1 }', '[{id:1}, {id:2}]'],
    }),
    ValidateNested({ each }),
    Type(() => ObjectId),
    __RequiredOrOptional(options?.required, each)
  );
}
