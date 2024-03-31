import { Expose, Transform } from 'class-transformer';
import { CommonPropertyOptions } from './common-options';
import { IsRequired } from './required';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationOptions, isBooleanString } from 'class-validator';
import { applyDecorators } from '@nestjs/common';

export type BooleanPropertyOptions = CommonPropertyOptions;

export function BooleanProperty(options: BooleanPropertyOptions = {}) {
  const { isArray, required, defaultValue, example, description } = options;

  const vo: ValidationOptions = { each: isArray };

  const des: PropertyDecorator[] = [
    ApiProperty({
      type: 'boolean',
      isArray,
      required,
      nullable: !required,
      default: defaultValue,
      example,
      description,
    }),
    IsRequired(required, vo),
    Transform(({ value }) => {
      if (value === undefined) {
        if (defaultValue !== undefined) {
          return defaultValue;
        }
      }

      if (isBooleanString(value)) {
        return value === 'true' ? true : false;
      }

      return value;
    }),
    Expose(),
  ];

  return applyDecorators(...des);
}
