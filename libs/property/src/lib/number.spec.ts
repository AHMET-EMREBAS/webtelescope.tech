import { Exclude, plainToInstance } from 'class-transformer';
import { NumberPropertyOptions as NPO, NumberProperty } from './number';
import { validateSync } from 'class-validator';

interface ITS {
  val: number;
}

function tav(options: NPO, value: ITS) {
  @Exclude()
  class TestSample implements ITS {
    @NumberProperty(options)
    val!: number;
  }

  return validateSync(plainToInstance(TestSample, value));
}

describe('Number Property Decorator', () => {
  it.each`
    options                      | value                | errors
    ${{} as NPO}                 | ${{}}                | ${undefined}
    ${{ minimum: 1 } as NPO}     | ${{} as ITS}         | ${undefined}
    ${{ maximum: 1 } as NPO}     | ${{} as ITS}         | ${undefined}
    ${{ required: true } as NPO} | ${{ val: 'str' }}    | ${['isNumber']}
    ${{ required: true } as NPO} | ${{ val: {} }}       | ${['isNumber']}
    ${{ required: true } as NPO} | ${{ val: true }}     | ${['isNumber']}
    ${{ required: true } as NPO} | ${{}}                | ${['isNotEmpty']}
    ${{ required: true } as NPO} | ${{ val: 1 } as ITS} | ${undefined}
    ${{ required: true } as NPO} | ${{ val: '1' }}      | ${undefined}
    ${{ minimum: 1 } as NPO}     | ${{ val: 1 } as ITS} | ${undefined}
    ${{ maximum: 1 } as NPO}     | ${{ val: 1 } as ITS} | ${undefined}
    ${{ minimum: 1 } as NPO}     | ${{ val: 0 } as ITS} | ${['min']}
    ${{ maximum: 1 } as NPO}     | ${{ val: 2 } as ITS} | ${['max']}
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
