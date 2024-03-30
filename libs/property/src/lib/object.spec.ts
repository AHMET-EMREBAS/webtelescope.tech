/* eslint-disable @typescript-eslint/no-explicit-any */
import { Exclude, plainToInstance } from 'class-transformer';
import { ObjectProperty, ObjectPropertyOptions as OPO } from './object';
import { validateSync } from 'class-validator';
import { StringProperty } from './string';

interface ITS {
  val: any;
}

function tav(options: OPO, value: ITS) {
  @Exclude()
  class B {
    @StringProperty({ required: true, minLength: 3, maxLength: 5 })
    val!: string;
  }

  @Exclude()
  class TS implements ITS {
    @ObjectProperty({ ...options, objectType: B })
    val!: B;
  }

  return validateSync(plainToInstance(TS, value));
}

describe('Object Property Decorator', () => {
  it.each`
    options                      | value                          | errors
    ${{} as OPO}                 | ${{} as ITS}                   | ${undefined}
    ${{ required: true } as OPO} | ${{} as ITS}                   | ${['isNotEmpty']}
    ${{ required: true } as OPO} | ${{ val: { val: '' } } as ITS} | ${['minLength']}
    ${{ required: true } as OPO} | ${{ val: '' } as ITS}          | ${['isObject']}
    ${{ required: true } as OPO} | ${{ val: 1 } as ITS}           | ${['isObject']}
    ${{ required: true } as OPO} | ${{ val: true } as ITS}        | ${['isObject']}
    ${{ required: true } as OPO} | ${{ val: {} } as ITS}          | ${['isNotEmpty']}
  `('$options | $value | $errors', ({ options, value, errors }) => {
    const vError = tav(options, value);

    const errorList = vError
      .map((e) => {
        const rootKeys = Object.keys(e.constraints || {});

        const childKeys =
          e.children
            ?.map((c) => Object.keys(c.constraints || {}))
            .filter((k) => k)
            .flat() || [];

        return [...rootKeys, ...childKeys];
      })
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
