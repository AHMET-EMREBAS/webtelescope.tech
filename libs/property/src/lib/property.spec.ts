/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateSync } from 'class-validator';
import { ApiPropertyOptions as APO, Property } from './property';
import { plainToInstance } from 'class-transformer';

type Value = { value: any };
function transformAndValidate(options: APO, value: { value: any }) {
  class A {
    @Property(options)
    value: any;
  }

  return validateSync(plainToInstance(A, value));
}

describe('Property', () => {
  describe('String Property', () => {
    it.each`
      options                                                    | value                         | errors
      ${{ type: 'string' } as APO}                               | ${{} as Value}                | ${[]}
      ${{ type: 'string', required: true } as APO}               | ${{} as Value}                | ${['isNotEmpty', 'isString']}
      ${{ type: 'string', required: true, minLength: 3 } as APO} | ${{} as Value}                | ${['isNotEmpty', 'isString', 'minLength']}
      ${{ type: 'string', required: true, maxLength: 3 } as APO} | ${{} as Value}                | ${['isNotEmpty', 'isString', 'maxLength']}
      ${{ minLength: 3 } as APO}                                 | ${{ value: 'so' } as Value}   | ${['minLength']}
      ${{ maxLength: 3 } as APO}                                 | ${{ value: 'some' } as Value} | ${['maxLength']}
      ${{ specialFormat: 'email' } as APO}                       | ${{ value: 'some' } as Value} | ${['isEmail']}
      ${{ specialFormat: 'ean' } as APO}                         | ${{ value: 'some' } as Value} | ${['isEAN']}
      ${{ specialFormat: 'credit-card' } as APO}                 | ${{ value: 'some' } as Value} | ${['isCreditCard']}
      ${{ specialFormat: 'ip4' } as APO}                         | ${{ value: 'some' } as Value} | ${['isIp']}
      ${{ specialFormat: 'ip6' } as APO}                         | ${{ value: 'some' } as Value} | ${['isIp']}
      ${{ specialFormat: 'phone' } as APO}                       | ${{ value: 'some' } as Value} | ${['isPhoneNumber']}
      ${{ specialFormat: 'isin' } as APO}                        | ${{ value: 'some' } as Value} | ${['isIsin']}
      ${{ specialFormat: 'issn' } as APO}                        | ${{ value: 'some' } as Value} | ${['isISSN']}
      ${{ specialFormat: 'password' } as APO}                    | ${{ value: 'some' } as Value} | ${['isStrongPassword']}
    `('$options | $value | $errors', ({ options, value, errors }) => {
      const foundErrors = transformAndValidate(options, value);

      for (const ve of foundErrors) {
        const errorList = Object.keys(ve.constraints || {});

        for (const e of errorList) {
          expect(errors).toContain(e);
        }
      }
      for (const e of errors) {
        for (const ve of foundErrors) {
          const errorList = Object.keys(ve.constraints || {});
          expect(errorList).toContain(e);
        }
      }
    });
  });

  describe('Number Property', () => {
    it.each`
      options                                                  | value                      | errors
      ${{ type: 'number' } as APO}                             | ${{} as Value}             | ${[]}
      ${{ type: 'number', required: true } as APO}             | ${{} as Value}             | ${['isNotEmpty', 'isNumber']}
      ${{ type: 'number', required: true, maximum: 3 } as APO} | ${{} as Value}             | ${['isNotEmpty', 'isNumber', 'max']}
      ${{ type: 'number', required: true, minimum: 3 } as APO} | ${{} as Value}             | ${['isNotEmpty', 'isNumber', 'min']}
      ${{ type: 'number', maximum: 3 } as APO}                 | ${{ value: 3 } as Value}   | ${[]}
      ${{ type: 'number', maximum: 3 } as APO}                 | ${{ value: '5' } as Value} | ${['max']}
      ${{ type: 'number', minimum: 3 } as APO}                 | ${{ value: '1' } as Value} | ${['min']}
      ${{ type: 'number', minimum: 3 } as APO}                 | ${{ value: 4 } as Value}   | ${[]}
      ${{ type: 'number', maximum: 3 } as APO}                 | ${{ value: 4 } as Value}   | ${['max']}
    `('$options | $value | $errors', ({ options, value, errors }) => {
      const foundErrors = transformAndValidate(options, value);

      if (errors?.length > 0) {
        expect(foundErrors.length).toBeGreaterThan(0);
      }

      for (const ve of foundErrors) {
        const errorList = Object.keys(ve.constraints || {});
        for (const e of errorList) {
          expect(errors).toContain(e);
        }
      }

      for (const e of errors) {
        for (const ve of foundErrors) {
          const errorList = Object.keys(ve.constraints || {});
          expect(errorList).toContain(e);
        }
      }
    });
  });
});
