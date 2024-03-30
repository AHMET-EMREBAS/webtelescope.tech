import { StringProperty, StringPropertyOptions as SPO } from './string';
import { Exclude, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

interface ITS {
  val: string;
}

function tav(options: SPO, value: ITS) {
  @Exclude()
  class TestSample {
    @StringProperty(options)
    val!: string;
  }
  return validateSync(plainToInstance(TestSample, value));
}

describe('String Property Decorator', () => {
  it.each`
    options                                          | value                         | errors
    ${{} as SPO}                                     | ${{} as ITS}                  | ${undefined}
    ${{ required: true } as SPO}                     | ${{} as ITS}                  | ${['isNotEmpty']}
    ${{ minLength: 3 } as SPO}                       | ${{} as ITS}                  | ${undefined}
    ${{ maxLength: 3 } as SPO}                       | ${{} as ITS}                  | ${undefined}
    ${{ format: 'email' } as SPO}                    | ${{} as ITS}                  | ${undefined}
    ${{ format: 'barcode' } as SPO}                  | ${{} as ITS}                  | ${undefined}
    ${{ format: 'password' } as SPO}                 | ${{} as ITS}                  | ${undefined}
    ${{ minLength: 3 } as SPO}                       | ${{ val: 'abcd' } as ITS}     | ${undefined}
    ${{ minLength: 3, defaultValue: 'abcd' } as SPO} | ${{} as ITS}                  | ${undefined}
    ${{ maxLength: 3, defaultValue: 'ab' } as SPO}   | ${{} as ITS}                  | ${undefined}
    ${{ minLength: 3 } as SPO}                       | ${{ val: '' } as ITS}         | ${['minLength']}
    ${{ maxLength: 3 } as SPO}                       | ${{ val: 'asdfasdf' } as ITS} | ${['maxLength']}
    ${{ maxLength: 3 } as SPO}                       | ${{ val: 'as' } as ITS}       | ${undefined}
  `(`$options | $value | $errors `, ({ options, value, errors }) => {
    const vErrors = tav(options, value);

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
