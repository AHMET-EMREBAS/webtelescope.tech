import { Type as TypeDefination, applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsObject,
  ValidateNested,
  ValidationOptions,
  isJSON,
  isObject,
} from 'class-validator';
import { IsRequired } from './required';
import { CommonPropertyOptions } from './common-options';

export type ObjectPropertyOptions = {
  objectType: TypeDefination;
} & CommonPropertyOptions;

export class DefaultObjectType {}

export function ObjectProperty(
  options: ObjectPropertyOptions = {
    required: true,
    objectType: DefaultObjectType,
  }
) {
  const { isArray, required, objectType, defaultValue, example, description } =
    options;

  const vo: ValidationOptions = { each: isArray };

  const des: PropertyDecorator[] = [
    ApiProperty({
      type: 'object',
      required,
      nullable: !required,
      default: defaultValue,
      isArray,
      example,
      description,
    }),
    Transform(({ value }) => {
      if (isObject(value)) {
        return value;
      }

      if (isJSON(value)) {
        return JSON.parse(value);
      }

      if (defaultValue) {
        return defaultValue;
      }
      return value;
    }),
    IsObject(vo),
    IsRequired(required, vo),
    ValidateNested(vo),
    Type(() => objectType),
    Expose(),
  ];

  return applyDecorators(...des);
}
