import { applyDecorators } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidationOptions,
} from 'class-validator';

export function Dto() {
  return applyDecorators(Exclude());
}

export type PropertyOptions = Omit<
  ApiPropertyOptions & {
    enum?: (string | number)[];
  },
  'nullable'
>;

export function Property(options: PropertyOptions = {}) {
  const decorators: PropertyDecorator[] = [];

  const {
    isArray,
    required,
    minLength,
    maxLength,
    minimum,
    maximum,
    enum: enm,
  } = options;

  const vo: ValidationOptions = { each: !!isArray };

  if (required == true) {
    decorators.push(IsNotEmpty(vo));
  } else {
    decorators.push(IsOptional(vo));
  }

  if (minimum != undefined) decorators.push(Min(minimum, vo));
  if (maximum != undefined) decorators.push(Max(maximum, vo));
  if (minLength != undefined) decorators.push(MinLength(minLength, vo));
  if (maxLength != undefined) decorators.push(MaxLength(maxLength, vo));
  if (enm != undefined && enm.length > 0) decorators.push(IsIn(enm, vo));

  return applyDecorators(
    Expose(),
    ApiProperty({
      ...options,
      nullable: !required,
      required: !!required,
    }),
    ...decorators
  );
}
