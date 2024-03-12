/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyDecorators } from '@nestjs/common';
import { PropertyOptions } from '@webpackages/common';
import { CommonPropertyDecorators } from './common-property';
import { TextProperty } from './text-property';
import { NumberProperty } from './number-property';

export function Property(
  options: PropertyOptions = { type: 'string', required: false }
) {
  const decorators: PropertyDecorator[] = [CommonPropertyDecorators(options)];

  const { type } = options;

  if (type === 'string') {
    decorators.push(TextProperty(options));
  } else if (type === 'number') {
    decorators.push(NumberProperty(options));
  } else if (type === 'boolean') {
    // boolean does not need any validator
  } else if (type === 'date') {
    // date does not need any validator
  } else if (type === 'object') {
    // object does not need any validator
  }

  return applyDecorators(...decorators);
}
