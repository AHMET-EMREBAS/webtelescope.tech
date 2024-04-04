import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiPropertyOptions } from './property';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
  isArray,
  isString,
} from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
/**
 * Parse url-string query into object
 * @param options
 * @returns
 */
export function URLQueryProperty(
  options: Omit<ApiPropertyOptions, 'type'> = {}
) {
  const { exclude, required, objectType } = options;

  const des: PropertyDecorator[] = [
    ApiProperty({
      type: 'string',
      description: 'String object property.',
      example: `?some=a:12&some=b:14&some=c:hello`,
      required: required === false ? false : true,
      nullable: required === false ? true : false,
      ...options,
    }),
    exclude === true ? Exclude() : Expose(),
    required === false ? IsOptional() : IsNotEmpty(),
    ValidateNested(),
    IsObject(),
    Transform(({ value }) => {
      if (isArray(value)) {
        return value
          .map((e) => {
            const [k, v] = e.split(':');
            return { [k]: v };
          })
          .reduce((p, c) => ({ ...p, ...c }));
      } else if (isString(value)) {
        const [key, v] = value!.split(':');
        return { [key]: v };
      }

      return value;
    }),
  ];

  if (objectType) des.push(Type(() => objectType));

  return applyDecorators(...des);
}
