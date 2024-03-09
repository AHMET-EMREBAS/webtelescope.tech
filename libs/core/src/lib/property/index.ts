/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IsEAN,
  IsEmail,
  IsIP,
  IsIn,
  IsNumber,
  IsDateString,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUrl,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
  ValidationOptions,
  IsBoolean,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptions as ___ApiPropertyOptions,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ClassConstructor, Exclude, Expose, Type } from 'class-transformer';

export type StringFormat =
  | 'email'
  | 'password'
  | 'phone'
  | 'shortText'
  | 'longText'
  | 'ip4'
  | 'ip6'
  | 'url'
  | 'barcode';

export type ApiPropertyOptions = ___ApiPropertyOptions & {
  type: 'string' | 'number' | 'date' | 'boolean' | 'object';
  format?: StringFormat;
  target?: ClassConstructor<any>;
  required?: boolean;
};

export function Dto() {
  return applyDecorators(Exclude());
}

export function Property(
  options: ApiPropertyOptions = {
    type: 'string',
    nullable: true,
    required: false,
  }
): PropertyDecorator {
  const decorators = [Expose(), ApiProperty(options)];

  const vo: ValidationOptions = { each: !!options?.isArray };

  const push = (d: PropertyDecorator) => decorators.push(d);

  if (options.isArray) decorators.push(ValidateNested(vo));

  if (options.required)
    if (options) {
      const { type } = options;

      if (type === 'string') {
        push(IsString(vo));
        const { minLength, maxLength, format } = options;

        minLength && push(MinLength(minLength, vo));
        maxLength && push(MaxLength(maxLength, vo));
        options.enum && push(IsIn(options.enum as string[], vo));

        if (format === 'email') push(IsEmail({}, vo));
        else if (format === 'barcode') push(IsEAN(vo));
        else if (format === 'ip4') push(IsIP('4', vo));
        else if (format === 'ip6') push(IsIP('6', vo));
        else if (format === 'url') push(IsUrl({}, vo));
        else if (format === 'longText') push(Length(0, 400, vo));
        else if (format === 'shortText') push(Length(0, 30, vo));
        else if (format === 'password') push(IsStrongPassword({}, vo));
        else if (format === 'phone') push(IsPhoneNumber(undefined, vo));
      } else if (type === 'number') {
        push(IsNumber({}, vo));

        const { minimum, maximum } = options;

        if (typeof minimum === 'number') push(Min(minimum, vo));
        if (typeof maximum === 'number') push(Max(maximum, vo));
      } else if (type === 'boolean') {
        push(IsBoolean(vo));
      } else if (type === 'date') {
        push(IsDateString(undefined, vo));
      } else if (type === 'object') {
        push(ValidateNested(vo));
        if (options.target) {
          push(Type(() => options.target!));
        } else {
          throw new Error(
            'Object property should have a dto type set by target property'
          );
        }
      }
    }
  return applyDecorators(...decorators);
}

export function TextProperty(options?: Omit<ApiPropertyOptions, 'type'>) {
  return Property({
    ...options,
    type: 'string',
  });
}

export function NumberProperty(options?: Omit<ApiPropertyOptions, 'type'>) {
  return Property({
    type: 'number',
    ...options,
  });
}

export function DateProperty(options?: Omit<ApiPropertyOptions, 'type'>) {
  return Property({
    type: 'date',
    ...options,
  });
}

export function BooleanProperty(options?: Omit<ApiPropertyOptions, 'type'>) {
  return Property({
    type: 'boolean',
    ...options,
  });
}

export function ObjectProperty(options?: Omit<ApiPropertyOptions, 'type'>) {
  return Property({
    type: 'object',
    ...options,
  });
}
