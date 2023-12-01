import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsDate,
  IsBoolean,
  IsObject,
  ValidateNested,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsEmail,
  IsStrongPassword,
  IsPhoneNumber,
} from 'class-validator';
import { ClassConstructor, Expose, Transform, Type } from 'class-transformer';

export type ExtendedApiPropertyOptions = ApiPropertyOptions & {
  target?: ClassConstructor<unknown>;
  inQuery?: boolean;
};

export const ParseIntTransformer = Transform(({ value }) => {
  return value && parseInt(value);
});

export const ParseNumberTransformer = Transform(({ value }) => {
  return value && parseFloat(value);
});

export const ParseBooleanTransformer = Transform(({ value }) => {
  return value && value === 'true' ? true : false;
});

export const ParseDateTransformer = Transform(({ value }) => {
  return value && new Date(value);
});

export function Property(options: ExtendedApiPropertyOptions) {
  const decorators: PropertyDecorator[] = [
    Expose(),
    ApiProperty({
      ...options,
      required: options.required === true ? true : false,
    }),
  ];

  const { isArray: each, type, required, target, inQuery } = options;

  if (required === true) decorators.push(IsNotEmpty({ each }));
  else decorators.push(IsOptional({ each }));

  if (type === 'string') decorators.push(IsString({ each }));
  if (type === 'number') {
    decorators.push(IsNumber({}, { each }));
    if (inQuery) decorators.push(ParseNumberTransformer);
  }
  if (type === 'integer') {
    decorators.push(IsInt({ each }));
    if (inQuery) decorators.push(ParseIntTransformer);
  }

  if (type === 'date') {
    decorators.push(IsDate({ each }));
    if (inQuery) decorators.push(ParseDateTransformer);
  }
  if (type === 'boolean') {
    decorators.push(IsBoolean({ each }));
    if (inQuery) decorators.push(ParseBooleanTransformer);
  }

  if (type === 'object') {
    decorators.push(IsObject({ each }));
    decorators.push(ValidateNested({ each }));
    if (target) {
      decorators.push(Type(() => target));
    }
  }

  const { minLength, maxLength, minimum, maximum, format } = options;

  if (minLength) decorators.push(MinLength(minLength, { each }));
  if (maxLength) decorators.push(MaxLength(maxLength, { each }));
  if (minimum) decorators.push(Min(minimum, { each }));
  if (maximum) decorators.push(Max(maximum, { each }));

  if (format) {
    if (format === 'email') decorators.push(IsEmail({}, { each }));
    if (format === 'password') decorators.push(IsStrongPassword({}, { each }));
    if (format === 'phone') decorators.push(IsPhoneNumber(undefined, { each }));
  }

  return applyDecorators(...decorators);
}
