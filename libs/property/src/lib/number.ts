import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  Max,
  Min,
  ValidationOptions,
  isNumberString,
} from 'class-validator';
import { IsRequired } from './required';
import { applyDecorators } from '@nestjs/common';
import { CommonPropertyOptions } from './common-options';

export type NumberPropertyOptions = {
  minimum?: number;
  maximum?: number;
  isInt?: boolean;
} & CommonPropertyOptions<number>;

/**
 * Number Property Decorator
 * @param options {@link NumberPropertyOptions} ```` { required: true } ```` as default
 * @returns
 */
export function NumberProperty(
  options: NumberPropertyOptions = { required: true }
) {
  const {
    isArray,
    isInt,
    maximum,
    minimum,
    required,
    defaultValue,
    example,
    description,
  } = options;

  const vo: ValidationOptions = { each: isArray };

  const des: PropertyDecorator[] = [
    ApiProperty({
      type: isInt ? 'integer' : 'number',
      minimum,
      maximum,
      isArray,
      required,
      nullable: !required,
      default: defaultValue,
      example,
      description,
    }),
    IsRequired(required, vo),
    Transform(({ value }) => {
      if (defaultValue) {
        if (isNumberString(value)) {
          return parseFloat(value);
        }
        return defaultValue;
      }
      return value;
    }),
    isInt ? IsInt(vo) : IsNumber(undefined, vo),
    Expose(),
  ];

  // Number specific constraints
  if (minimum !== undefined) des.push(Min(minimum, vo));
  if (maximum !== undefined) des.push(Max(maximum, vo));

  return applyDecorators(...des);
}

export type PositiveNumberPropertyOptions = Pick<
  NumberPropertyOptions,
  'required' | 'isArray' | 'defaultValue'
>;

/**
 * Positive Number Property Decorator
 * @param options {@link PositiveNumberPropertyOptions} ````{ required: true }```` as default
 * @returns
 */
export function PositiveNumberProperty(
  options: PositiveNumberPropertyOptions = { required: true }
) {
  return NumberProperty({
    ...options,
    minimum: 0,
  });
}

export type PositiveIntegerPropertyOptions = Pick<
  NumberPropertyOptions,
  'required' | 'isArray' | 'defaultValue'
>;

/**
 * Positive integer property decorator
 * @param options {@link NumberPropertyOptions} ````{ required: true }```` by default
 * @returns
 */
export function PositiveIntegerProperty(
  options: PositiveIntegerPropertyOptions = { required: true }
) {
  return NumberProperty({
    ...options,
    minimum: 1,
    isInt: true,
  });
}
