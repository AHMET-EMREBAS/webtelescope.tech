/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type as TypeType, applyDecorators } from '@nestjs/common';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
  ValidationOptions,
  isNumber,
} from 'class-validator';

export function Dto() {
  return applyDecorators(Exclude());
}

export type PropertyOptions = Omit<
  ApiPropertyOptions & {
    enum?: (string | number)[];
    unique?: boolean;
    objectType?: TypeType;
  },
  'nullable'
>;

export function createDescription(options: PropertyOptions) {
  const d = ['Property'];

  const { type, minLength, maxLength, minimum, maximum, required, isArray } =
    options;

  const pushIf = (condition: any, text: string) => (condition ? text : '');

  d.push('should be');
  pushIf(required, `required;`);
  pushIf(!required, `optional;`);

  pushIf(type && isArray, `list of ${type};`);
  pushIf(type && !isArray, `one of ${type};`);
  pushIf(minLength, `at least ${minLength} characters long;`);
  pushIf(maxLength, `at most ${maxLength} characters long;`);
  pushIf(minimum != undefined, `more than or equal to  ${minimum};`);
  pushIf(maximum != undefined, `less than  ${maximum};`);

  return d.join(' ');
}
/**
 * By default, each property is marked as optional. To make them requried, set required argument true.
 */
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
    objectType,
  } = options;

  const vo: ValidationOptions = { each: !!isArray };

  if (required == true) {
    decorators.push(IsNotEmpty(vo));
  } else {
    decorators.push(IsOptional(vo));
  }

  if (isNumber(minimum)) decorators.push(Min(minimum, vo));
  if (isNumber(maximum)) decorators.push(Max(maximum, vo));
  if (isNumber(minLength)) decorators.push(MinLength(minLength, vo));
  if (isNumber(maxLength)) decorators.push(MaxLength(maxLength, vo));
  if (enm && enm.length && enm.length > 0) decorators.push(IsIn(enm, vo));

  if (objectType) {
    decorators.push(Type(() => objectType));
    decorators.push(ValidateNested(vo));
  }

  return applyDecorators(
    Expose(),
    ApiProperty({
      description: createDescription(options),
      ...options,
      required: !!required,
      nullable: !required,
    }),
    ...decorators
  );
}
