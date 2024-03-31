import { IsDate, ValidationOptions, isDateString } from 'class-validator';
import { CommonPropertyOptions } from './common-options';
import { ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { IsRequired } from './required';
import { Expose, Transform } from 'class-transformer';

export type DatePropertyOptions = CommonPropertyOptions;

export function DateProperty(
  options: DatePropertyOptions = { required: true }
) {
  const { isArray, required, defaultValue, example, description } = options;
  const vo: ValidationOptions = { each: isArray };

  const des: PropertyDecorator[] = [
    ApiProperty({
      type: 'string',
      format: 'date',
      required,
      nullable: !required,
      isArray,
      default: defaultValue,
      example,
      description,
    }),
    IsRequired(required, vo),
    IsDate(),
    Transform(({ value }) => {
      if (value == undefined) {
        if (defaultValue != undefined) {
          return defaultValue;
        }
      }

      if (isDateString(value)) {
        return new Date(value);
      }

      return value;
    }),
    Expose(),
  ];

  return applyDecorators(...des);
}
