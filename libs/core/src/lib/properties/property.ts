import { ApiProperty } from '@nestjs/swagger';
import { PropertyType } from './property-type';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsIn,
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
  example?: any;
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

export function ParseIntTransformer() {
  return Transform(({ value }) => {
    return value && parseInt(value);
  });
}

export function ParseNumberTransformer() {
  return Transform(({ value }) => value && parseFloat(value));
}

export function ParseBooleanTransformer() {
  return Transform(({ value }) => (value == 'true' ? true : false));
}

export function ParseDateTransformer() {
  return Transform(({ value }) => value && new Date(value));
}

export function BooleanProperty(options?: CommonPropertyOptions) {
  const each = !!options?.isArray;
  const decorators: PropertyDecorator[] = [];
  if (options?.fromQuery) decorators.push(ParseBooleanTransformer());
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'boolean',
      required: __isRequiredProperty(options?.required),
      example: options?.example,
    }),
    IsBoolean({ each }),
    ...decorators
  );
}

export function EnumProperty(options: { required?: boolean; enum: string[] }) {
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'string',
      enum: options.enum,
      required: __isRequiredProperty(options.required),
    }),
    __RequiredOrOptional(options.required, false),
    IsIn(options.enum)
  );
}

export function DateProperty(options?: CommonPropertyOptions) {
  const each = !!options?.isArray;
  const decorators: PropertyDecorator[] = [];
  if (options?.fromQuery) decorators.push(ParseDateTransformer());

  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'date',
      required: __isRequiredProperty(options?.required),
      example: options?.example,
    }),
    IsDate({ each }),
    __RequiredOrOptional(options?.required, each),
    ...decorators
  );
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
      isArray: each,
      minLength: 3,
      maxLength: 50,
      example: options?.example,
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
      format: 'phone',
      isArray: each,
      example: '9991239999',
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
      example: options?.example,
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
      example: options?.example,
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

export function NumberProperty(
  options?: CommonPropertyOptions & { minimum?: number; maximum?: number }
) {
  const each = !!options?.isArray;
  const decorators: PropertyDecorator[] = [];
  if (options?.fromQuery) decorators.push(ParseNumberTransformer());

  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'number',
      required: __isRequiredProperty(options?.required),
      isArray: each,
      minimum: options?.minimum || Number.MIN_SAFE_INTEGER,
      maximum: options?.maximum || Number.MAX_SAFE_INTEGER,
      example: '0.01',
    }),
    IsNumber({}, { each }),
    __RequiredOrOptional(options?.required, each),
    ...decorators
  );
}

export function PositiveNumberProperty(
  options?: CommonPropertyOptions & { maximum?: number }
) {
  const each = !!options?.isArray;
  const decorators: PropertyDecorator[] = [];
  if (options?.fromQuery) decorators.push(ParseNumberTransformer());

  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'number',
      required: __isRequiredProperty(options?.required),
      isArray: each,
      example: options?.example,
      maximum: options?.maximum || Number.MAX_SAFE_INTEGER,
      minimum: 0,
    }),
    IsNumber({}, { each }),
    Min(0),
    __RequiredOrOptional(options?.required, each),
    ...decorators
  );
}

export function IntergerProperty(
  options?: CommonPropertyOptions & { maximum?: number; minimum?: number }
) {
  const each = !!options?.isArray;
  const decorators: PropertyDecorator[] = [];
  if (options?.fromQuery) decorators.push(ParseIntTransformer());
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'integer',
      required: __isRequiredProperty(options?.required),
      isArray: each,
      maximum: options?.maximum || Number.MAX_SAFE_INTEGER,
      minimum: options?.minimum || Number.MIN_SAFE_INTEGER,
      example: options?.example,
    }),
    IsInt({ each }),
    __RequiredOrOptional(options?.required, each),
    ...decorators
  );
}

export function PositiveIntegerProperty(
  options?: CommonPropertyOptions & { maximum?: number }
) {
  const each = !!options?.isArray;
  const decorators: PropertyDecorator[] = [];
  if (options?.fromQuery) decorators.push(ParseIntTransformer());
  return applyDecorators(
    Expose(),
    ApiProperty({
      type: 'integer',
      required: __isRequiredProperty(options?.required),
      isArray: each,

      example: options?.example,
      minimum: 0,
      maximum: options?.maximum || Number.MAX_SAFE_INTEGER,
    }),
    IsInt({ each }),
    Min(0),
    __RequiredOrOptional(options?.required, each),
    ...decorators
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
