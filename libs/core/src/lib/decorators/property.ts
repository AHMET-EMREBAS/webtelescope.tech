import { AllValidationMeta } from '@webpackages/meta';
import { propertyDecorators } from '@webpackages/utils';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsStrongPassword,
  IsUUID,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export function Property(options: AllValidationMeta) {
  const decorators: PropertyDecorator[] = [ApiProperty(options)];

  const { required, type, isArray: each } = options;

  if (required === true) decorators.push(IsNotEmpty({ each }));
  else decorators.push(IsOptional({ each }));

  if (type === 'string') {
    const { minLength, maxLength, isIn, format } = options;

    if (minLength != undefined) decorators.push(MinLength(minLength, { each }));
    if (maxLength != undefined) decorators.push(MinLength(maxLength, { each }));
    if (isIn != undefined) decorators.push(IsIn(isIn, { each }));

    if (format === 'barcode') {
      decorators.push(Length(12, 13, { each }));
    } else if (format === 'email') {
      decorators.push(IsEmail({}, { each }));
    } else if (format === 'password') {
      decorators.push(IsStrongPassword({}, { each }));
    } else if (format === 'uuid') {
      decorators.push(IsUUID('4', { each }));
    }
  } else if (type === 'boolean') {
    decorators.push(IsBoolean({ each }));
  } else if (type === 'date') {
    decorators.push(IsDate({ each }));
  } else if (type === 'number') {
    decorators.push(IsNumber({}, { each }));
  } else if (type === 'object') {
    decorators.push(IsObject({ each }));
    decorators.push(ValidateNested({ each }));
    decorators.push(Type(() => options.target!));
  }

  return propertyDecorators(...decorators);
}
