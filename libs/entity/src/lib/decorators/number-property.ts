import { NumberPropertyOptions } from '@webpackages/common';
import { parseValidationOptions } from './common-property';
import { applyDecorators } from '@nestjs/common';
import { IsInt, Max, Min } from 'class-validator';

export function NumberProperty(
  options: NumberPropertyOptions = { type: 'number', required: false }
) {
  const decorators: PropertyDecorator[] = [];

  const { minimum, maximum, isInt } = options;
  const vo = parseValidationOptions(options);

  minimum !== undefined && decorators.push(Min(minimum, vo));
  maximum !== undefined && decorators.push(Max(maximum, vo));
  isInt === true && decorators.push(IsInt(vo));

  return applyDecorators(...decorators);
}
