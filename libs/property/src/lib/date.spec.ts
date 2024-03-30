import { Exclude, plainToInstance } from 'class-transformer';
import { DateProperty, DatePropertyOptions as Options } from './date';
import { validateSync } from 'class-validator';

interface ITS {
  val: Date;
}

function tav(options: Options, value: ITS) {
  @Exclude()
  class TestSample implements ITS {
    @DateProperty(options)
    val!: Date;
  }

  return validateSync(plainToInstance(TestSample, value));
}

const NO_ERROR = undefined;

describe('Date Property Decorator', () => {
  it.each`
    options                          | value                  | errors
    ${{} as Options}                 | ${{} as ITS}           | ${NO_ERROR}
    ${{ required: true } as Options} | ${{} as ITS}           | ${['isNotEmpty']}
    ${{ required: true } as Options} | ${{ val: new Date() }} | ${NO_ERROR}
    ${{ required: true } as Options} | ${{ val: '' }}         | ${['isDate']}
    ${{ required: true } as Options} | ${{ val: 1 }}          | ${['isDate']}
    ${{ required: true } as Options} | ${{ val: true }}       | ${['isDate']}
  `('$options | $value | $errors', ({ options, value, errors }) => {
    const vErrors = tav(options, value);

    const errorList = vErrors
      .map((k) => Object.keys(k.constraints || {}))
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
