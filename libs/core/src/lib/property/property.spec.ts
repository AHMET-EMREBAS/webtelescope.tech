/* eslint-disable @typescript-eslint/no-explicit-any */
import { Exclude, Expose, Type, plainToInstance } from 'class-transformer';
import { Dto, Property, PropertyOptions as PO } from './property';
import {
  IsNotEmpty,
  MinLength,
  ValidateNested,
  validateSync,
} from 'class-validator';

@Dto()
class SubDto {
  @Property({ type: 'string', required: true, minLength: 3 })
  name?: any;
}

function createAndValidate(options: PO, value: any) {
  @Dto()
  class DtoTestClass {
    @Property(options)
    value?: any;
  }

  return validateSync(plainToInstance(DtoTestClass, value));
}

describe('Property', () => {
  describe('String Property ', () => {
    it.each`
      options                                     | value                    | errorCount
      ${{ type: 'string' } as PO}                 | ${{ value: 1 }}          | ${1}
      ${{ type: 'string' } as PO}                 | ${{ value: true }}       | ${1}
      ${{ type: 'string' } as PO}                 | ${{ value: new Date() }} | ${1}
      ${{ type: 'string' } as PO}                 | ${{ value: {} }}         | ${1}
      ${{ type: 'string', required: true } as PO} | ${{ value: undefined }}  | ${1}
      ${{ type: 'string', minLength: 3 } as PO}   | ${{ value: undefined }}  | ${0}
      ${{ type: 'string', minLength: 3 } as PO}   | ${{ value: '' }}         | ${1}
      ${{ type: 'string', minLength: 3 } as PO}   | ${{ value: 'fff' }}      | ${0}
      ${{ type: 'string', maxLength: 3 } as PO}   | ${{ value: 'fff' }}      | ${0}
      ${{ type: 'string', maxLength: 3 } as PO}   | ${{ value: 'fffff' }}    | ${1}
    `('should validate string', ({ options, value, errorCount }) => {
      const errors = createAndValidate(options, value);
      expect(errors.length).toBe(errorCount);
    });
  });

  describe('Number Property ', () => {
    it.each`
      options                                     | value                    | errorCount
      ${{ type: 'number' } as PO}                 | ${{ value: '' }}         | ${1}
      ${{ type: 'number' } as PO}                 | ${{ value: true }}       | ${1}
      ${{ type: 'number' } as PO}                 | ${{ value: new Date() }} | ${1}
      ${{ type: 'number' } as PO}                 | ${{ value: {} }}         | ${1}
      ${{ type: 'number', required: true } as PO} | ${{ value: undefined }}  | ${1}
      ${{ type: 'number', min: 3 } as PO}         | ${{ value: undefined }}  | ${0}
      ${{ type: 'number', min: 3 } as PO}         | ${{ value: 2 }}          | ${1}
      ${{ type: 'number', min: 3 } as PO}         | ${{ value: 3 }}          | ${0}
      ${{ type: 'number', max: 3 } as PO}         | ${{ value: 3 }}          | ${0}
      ${{ type: 'number', max: 3 } as PO}         | ${{ value: 5 }}          | ${1}
    `(
      'should validate number $options $value',
      ({ options, value, errorCount }) => {
        const errors = createAndValidate(options, value);
        expect(errors.length).toBe(errorCount);
      }
    );
  });

  describe('Boolean Property ', () => {
    it.each`
      options                                      | value                    | errorCount
      ${{ type: 'boolean' } as PO}                 | ${{ value: '' }}         | ${1}
      ${{ type: 'boolean' } as PO}                 | ${{ value: 1 }}          | ${1}
      ${{ type: 'boolean' } as PO}                 | ${{ value: new Date() }} | ${1}
      ${{ type: 'boolean' } as PO}                 | ${{ value: {} }}         | ${1}
      ${{ type: 'boolean', required: true } as PO} | ${{ value: undefined }}  | ${1}
      ${{ type: 'boolean', required: true } as PO} | ${{ value: true }}       | ${0}
      ${{ type: 'boolean', required: true } as PO} | ${{ value: false }}      | ${0}
      ${{ type: 'boolean' } as PO}                 | ${{ value: true }}       | ${0}
      ${{ type: 'boolean' } as PO}                 | ${{ value: false }}      | ${0}
    `(
      'should validate number $options $value',
      ({ options, value, errorCount }) => {
        const errors = createAndValidate(options, value);
        expect(errors.length).toBe(errorCount);
      }
    );
  });

  describe('Object Property ', () => {
    it.each`
      options                                                     | value                           | errorCount
      ${{ type: 'object', target: SubDto } as PO}                 | ${{ value: '' }}                | ${1}
      ${{ type: 'object', target: SubDto } as PO}                 | ${{ value: 1 }}                 | ${1}
      ${{ type: 'object', target: SubDto } as PO}                 | ${{ value: {} }}                | ${1}
      ${{ type: 'object', target: SubDto, required: true } as PO} | ${{ value: { name: 'a' } }}     | ${1}
      ${{ type: 'object', target: SubDto, required: true } as PO} | ${{ value: { name: 'aasdf' } }} | ${0}
      ${{ type: 'object', target: SubDto, required: true } as PO} | ${{ value: { name: 1 } }}       | ${1}
      ${{ type: 'object', target: SubDto, required: true } as PO} | ${{ value: { name: true } }}    | ${1}
    `(
      'should validate object $options $value',
      ({ options, value, errorCount }) => {
        const errors = createAndValidate(options, value);
        console.log(errors);
        expect(errors.length).toBe(errorCount);
      }
    );
  });
});
