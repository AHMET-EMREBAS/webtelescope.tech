import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { IDDto } from '../dtos';
import { Exclude, Expose, Type } from 'class-transformer';

type PropertyOptions = {
  required?: boolean;
};

export function __commonDecorators(options?: ApiPropertyOptions) {
  return applyDecorators(
    ApiProperty({
      ...options,
      required: options?.required === true,
      nullable: options?.required !== true,
    }),
    Expose(),
    options?.required === true ? IsNotEmpty() : IsOptional()
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
