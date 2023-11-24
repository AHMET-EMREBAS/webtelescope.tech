import { plainToInstance } from 'class-transformer';
import { Property } from './property';
import { validateSync } from 'class-validator';
describe('String Property Test', () => {
  it.each`
    type        | value              | minLength    | maxLength    | format       | minimum      | maximum      | errors
    ${'string'} | ${'test'}          | ${3}         | ${5}         | ${undefined} | ${undefined} | ${undefined} | ${0}
    ${'string'} | ${'abc'}           | ${3}         | ${5}         | ${undefined} | ${undefined} | ${undefined} | ${0}
    ${'string'} | ${'s'}             | ${3}         | ${5}         | ${undefined} | ${undefined} | ${undefined} | ${1}
    ${'string'} | ${'longtext'}      | ${3}         | ${5}         | ${undefined} | ${undefined} | ${undefined} | ${1}
    ${'string'} | ${1}               | ${3}         | ${5}         | ${undefined} | ${undefined} | ${undefined} | ${1}
    ${'string'} | ${1}               | ${3}         | ${5}         | ${undefined} | ${undefined} | ${undefined} | ${1}
    ${'string'} | ${'some@some.com'} | ${undefined} | ${undefined} | ${'email'}   | ${undefined} | ${undefined} | ${0}
    ${'string'} | ${'some@some'}     | ${undefined} | ${undefined} | ${'email'}   | ${undefined} | ${undefined} | ${1}
    ${'string'} | ${'some'}          | ${undefined} | ${undefined} | ${'email'}   | ${undefined} | ${undefined} | ${1}
    ${'string'} | ${'some'}          | ${undefined} | ${undefined} | ${'name'}    | ${undefined} | ${undefined} | ${0}
    ${'string'} | ${'d'}             | ${undefined} | ${undefined} | ${'name'}    | ${undefined} | ${undefined} | ${1}
  `(
    '[$type] $value should return $errors errors against minLength=$minLength maxLength=$maxLength format=$format ',
    ({
      type,
      minLength,
      maxLength,
      value,
      format,
      minimum,
      maximum,
      errors,
    }) => {
      class A {
        @Property({ type, minLength, maxLength, minimum, maximum, format })
        name?: string;
      }
      const instance = plainToInstance(A, { name: value });

      const errorList = validateSync(instance);

      expect(errorList.length).toEqual(errors);
    }
  );
});
