/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApiProperty as SwaggerApiProperty,
  ApiPropertyOptions,
} from '@nestjs/swagger';
import { ClassConstructor, Exclude, Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
  ValidationOptions,
} from 'class-validator';
import {
  BooleanTransformer,
  NumberTransformer,
  ObjectTransformer,
} from '../transformer';
import { InputType } from './input-type';
import { applyDecorators } from '@nestjs/common';

export type PropertyOptions = {
  type: InputType;
  inQuery?: boolean;
  target?: ClassConstructor<any>;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  format?: string;
  isArray?: boolean;
  required?: boolean;
  example?: any;
  description?: string;
  transformer?: PropertyDecorator;
};

export function Dto() {
  return Exclude();
}
/**
 * Api schema property decorator.
 * @param options
 */
export function Property(options: PropertyOptions) {
  const apiOptions: ApiPropertyOptions = {
    ...options,
    minimum: options.min,
    maximum: options.max,
    required: options.required === true ? true : false,
    nullable: options.required === true ? false : true,
  };
  const decorators: PropertyDecorator[] = [
    Expose(),
    SwaggerApiProperty(apiOptions),
  ];
  const {
    type,
    minLength,
    maxLength,
    min,
    max,
    required,
    isArray,
    target,
    inQuery,
    transformer,
  } = options;

  const vo: ValidationOptions = { each: isArray };

  if (required === true) {
    decorators.push(IsNotEmpty(vo));
  } else {
    decorators.push(IsOptional(vo));
  }

  if (transformer) decorators.push(transformer);

  if (type === 'string') {
    decorators.push(IsString(vo));

    if (minLength !== undefined) decorators.push(MinLength(minLength, vo));
    if (maxLength !== undefined) decorators.push(MaxLength(maxLength, vo));
  } else if (type === 'boolean') {
    decorators.push(IsBoolean(vo));
    if (inQuery) decorators.push(BooleanTransformer());
  } else if (type === 'date') {
    decorators.push(IsDate(vo));
  } else if (type === 'number') {
    decorators.push(IsNumber(undefined, vo));
    if (min !== undefined) decorators.push(Min(min, vo));
    if (max !== undefined) decorators.push(Max(max, vo));

    if (inQuery) {
      decorators.push(NumberTransformer());
    }
  } else if (type === 'object') {
    decorators.push(ValidateNested(vo));
    if (target) {
      decorators.push(Type(() => target));
    }
    if (inQuery) {
      decorators.push(ObjectTransformer());
    }
  }

  return applyDecorators(...decorators);
}
