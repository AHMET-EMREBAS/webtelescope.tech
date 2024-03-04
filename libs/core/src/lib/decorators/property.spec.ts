import { validateSync } from 'class-validator';
import { Property } from './property';
describe('Property', () => {
  describe('String Property', () => {
    it.each`
      value                 | format     | constraint
      ${'abcd'}             | ${'email'} | ${'isEmail'}
      ${'abcdefg@'}         | ${'email'} | ${'isEmail'}
      ${'abc@gmail.com'}    | ${'email'} | ${undefined}
      ${'888 113 23 23'}    | ${'phone'} | ${'isPhoneNumber'}
      ${'+1 888 113 23 23'} | ${'phone'} | ${'isPhoneNumber'}
      ${'1 888 113 23 23'}  | ${'phone'} | ${'isPhoneNumber'}
      ${'+18881132323'}     | ${'phone'} | ${'isPhoneNumber'}
      ${'18881132323'}      | ${'phone'} | ${'isPhoneNumber'}
      ${'+18323334455'}     | ${'phone'} | ${undefined}
      ${'+488323334455'}    | ${'phone'} | ${undefined}
      ${'+908323334455'}    | ${'phone'} | ${undefined}
      ${'+208323334455'}    | ${'phone'} | ${undefined}
    `(
      'With the format $format and value $value, errors should contain $constraint errors',
      ({ value, format, constraint }) => {
        class Abc {
          @Property({ type: 'string', format })
          value!: string;
          constructor(obj: Partial<Abc>) {
            Object.assign(this, obj);
          }
        }
        const instance = new Abc({ value: value });
        const errors = validateSync(instance);

        expect(Object.keys(errors[0]?.constraints || {})[0]).toBe(constraint);
      }
    );
    it.each`
      value        | minLength | maxLength | constraint
      ${'a'}       | ${3}      | ${5}      | ${'minLength'}
      ${'abcdefg'} | ${3}      | ${5}      | ${'maxLength'}
      ${'abc'}     | ${3}      | ${5}      | ${undefined}
    `(
      'With the minLength $minLength, maxLength $maxLength, and value $value, errors should contain $constraint ',
      ({ value, minLength, maxLength, constraint }) => {
        class Abc {
          @Property({ type: 'string', minLength, maxLength })
          value!: string;
          constructor(obj: Partial<Abc>) {
            Object.assign(this, obj);
          }
        }
        const instance = new Abc({ value: value });
        const errors = validateSync(instance);

        expect(Object.keys(errors[0]?.constraints || {})[0]).toBe(constraint);
      }
    );
  });
});
