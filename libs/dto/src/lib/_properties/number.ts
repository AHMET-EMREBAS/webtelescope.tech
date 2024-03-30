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

export function NumberProperty(
  options: NumberPropertyOptions = { required: true }
) {
  const { isArray, isInt, maximum, minimum, required, defaultValue } = options;

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

export function PositiveNumberProperty(
  options: PositiveNumberPropertyOptions = { required: true }
) {
  return NumberProperty({
    ...options,
    minimum: 0,
  });
}

export function PositiveIntegerProperty(
  options: Pick<
    NumberPropertyOptions,
    'required' | 'isArray' | 'defaultValue'
  > = {
    required: true,
  }
) {
  return NumberProperty({
    ...options,
    minimum: 1,
    isInt: true,
  });
}
