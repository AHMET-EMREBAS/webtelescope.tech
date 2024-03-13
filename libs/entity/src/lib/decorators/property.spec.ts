/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropertyOptions as PO } from '@webpackages/common';
import { Dto, Property } from './property';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

function validateObject(options: PO, value: { value: any }) {
  @Dto()
  class Sample {
    @Property(options)
    value: any;
  }

  const instance = plainToInstance(Sample, value);

  const errors = validateSync(instance);

  return errors;
}

describe('Property', () => {
  it.each`
    type         | options                                                 | value                | error
    ${'string'}  | ${{ type: 'string', required: true } as PO}             | ${undefined}         | ${'isNotEmpty'}
    ${'string'}  | ${{ type: 'string', minLength: 3, maxLength: 5 } as PO} | ${'hello'}           | ${undefined}
    ${'string'}  | ${{ type: 'string', minLength: 3, maxLength: 5 } as PO} | ${1}                 | ${'isString'}
    ${'string'}  | ${{ type: 'string', minLength: 3, maxLength: 5 } as PO} | ${'hello there'}     | ${'maxLength'}
    ${'string'}  | ${{ type: 'string', minLength: 3, maxLength: 5 } as PO} | ${'he'}              | ${'minLength'}
    ${'number'}  | ${{ type: 'number', required: true } as PO}             | ${undefined}         | ${'isNotEmpty'}
    ${'number'}  | ${{ type: 'number', minimum: 0 } as PO}                 | ${undefined}         | ${undefined}
    ${'number'}  | ${{ type: 'number', minimum: 0 } as PO}                 | ${-1}                | ${'min'}
    ${'number'}  | ${{ type: 'number', maximum: 10 } as PO}                | ${11}                | ${'max'}
    ${'number'}  | ${{ type: 'number', minimum: 0 } as PO}                 | ${'some'}            | ${'isNumber'}
    ${'date'}    | ${{ type: 'date', required: true } as PO}               | ${undefined}         | ${'isNotEmpty'}
    ${'date'}    | ${{ type: 'date' } as PO}                               | ${undefined}         | ${undefined}
    ${'date'}    | ${{ type: 'date' } as PO}                               | ${'some'}            | ${'isDate'}
    ${'object'}  | ${{ type: 'object', required: true } as PO}             | ${undefined}         | ${'isNotEmpty'}
    ${'object'}  | ${{ type: 'object' } as PO}                             | ${undefined}         | ${undefined}
    ${'object'}  | ${{ type: 'object' } as PO}                             | ${'some'}            | ${'isObject'}
    ${'object'}  | ${{ type: 'object' } as PO}                             | ${{ value: 'some' }} | ${undefined}
    ${'boolean'} | ${{ type: 'boolean', required: true } as PO}            | ${undefined}         | ${'isNotEmpty'}
    ${'boolean'} | ${{ type: 'boolean' } as PO}                            | ${undefined}         | ${undefined}
    ${'boolean'} | ${{ type: 'boolean' } as PO}                            | ${1}                 | ${'isBoolean'}
  `(
    'shoud throw $error for $options and $value',
    ({ options, value, error }) => {
      const errors = validateObject(options, { value });

      if (error) {
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints![error]).toBeDefined();
      } else {
        expect(errors.length).toBe(0);
      }
    }
  );
});
