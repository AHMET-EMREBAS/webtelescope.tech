/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IsEAN,
  IsEmail,
  IsIP,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
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
  IsDate,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptions as ___ApiPropertyOptions,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { IDDto } from '../dtos';
import { ClassConstructor, Exclude, Expose, Type } from 'class-transformer';

type PropertyOptions = {
  required?: boolean;
};

export function __commonDecorators(options?: ___ApiPropertyOptions) {
  const vo: ValidationOptions = { each: !options?.isArray };
  return applyDecorators(
    ApiProperty({
      ...options,
      required: options?.required === true,
      nullable: options?.required !== true,
      isArray: !!options?.isArray,
    }),
    Expose(),
    options?.required === true ? IsNotEmpty(vo) : IsOptional(vo)
  );
}

export function Dto() {
  return applyDecorators(Exclude());
}

export function EmailProperty(options?: PropertyOptions) {
  return applyDecorators(
    __commonDecorators({
      type: 'string',
      format: 'email',
      required: options?.required === true,
    }),
    IsEmail()
  );
}

export function PasswordProperty(options?: PropertyOptions) {
  return applyDecorators(
    __commonDecorators({
      type: 'string',
      format: 'password',
      required: options?.required === true,
    }),
    IsStrongPassword()
  );
}

export function PhoneProperty(options: PropertyOptions) {
  return applyDecorators(
    __commonDecorators({
      type: 'string',
      format: 'phone',
      required: options?.required === true,
    }),
    IsPhoneNumber()
  );
}
export function TextProperty(options: PropertyOptions = {}) {
  return applyDecorators(
    __commonDecorators({
      type: 'string',
      required: options?.required === true,
    })
  );
}

export function NumberProperty(options: PropertyOptions = {}) {
  return applyDecorators(
    __commonDecorators({
      type: 'number',
      required: options?.required === true,
    })
  );
}

export function DateProperty(options: PropertyOptions = {}) {
  return applyDecorators(
    __commonDecorators({
      type: 'date',
      required: options?.required === true,
    })
  );
}

export function BooleanProperty() {
  return applyDecorators(
    __commonDecorators({
      type: 'date',
      required: false,
    })
  );
}

export function RecordProperty(options: PropertyOptions = {}) {
  return applyDecorators(
    __commonDecorators({
      type: 'object',
      required: options?.required === true,
    }),
    IsObject()
  );
}

export function OwnerProperty() {
  return applyDecorators(
    ValidateNested(),
    Type(() => IDDto),
    IsNotEmpty()
  );
}

export function OneProperty() {
  return applyDecorators(
    ValidateNested(),
    Type(() => IDDto),
    IsOptional()
  );
}

export function ManyProperty() {
  return applyDecorators(
    ValidateNested({ each: true }),
    Type(() => IDDto),
    IsNotEmpty({ each: true }),
    IsOptional()
  );
}

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
};

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

  if (options.isArray) {
    decorators.push(ValidateNested(vo));
  }
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
