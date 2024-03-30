/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateSync } from 'class-validator';
import { IsRequired } from './required';
import { plainToInstance } from 'class-transformer';

function tav(required: boolean, value: any) {
  class TestSample {
    @IsRequired(required)
    val: any;
  }

  return validateSync(plainToInstance(TestSample, value));
}

describe('Required Property Decorator', () => {
  it.each`
    required | value                 | errors
    ${false} | ${{}}                 | ${undefined}
    ${true}  | ${{ val: '' }}        | ${['isNotEmpty']}
    ${true}  | ${{ val: 1 }}         | ${undefined}
    ${true}  | ${{ val: -1 }}        | ${undefined}
    ${true}  | ${{ val: false }}     | ${undefined}
    ${true}  | ${{ val: undefined }} | ${['isNotEmpty']}
    ${true}  | ${{}}                 | ${['isNotEmpty']}
  `('required:$required | $value | $errors', ({ required, value, errors }) => {
    const vErrors = tav(required, value);

    const errorList = vErrors
      .map((e) => Object.keys(e.constraints || {}))
      .filter((e) => e)
      .flat();

    if (errors) {
      for (const e of errors) {
        expect(errorList.includes(e)).toBe(true);
      }
    } else {
      expect(errorList.length).toBe(0);
    }
  });
});
