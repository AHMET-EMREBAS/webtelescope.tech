import { DecoratorPrinter } from './decorator-printer';

describe('Decorator Printer', () => {
  it('should print decorator', () => {
    const decoratorText =  new DecoratorPrinter({ name: 'Validation', options: { minLength: 3, maxLength:10 } }).print()

    expect(decoratorText).toBe(`@Validation({"minLength":3,"maxLength":10})`)
  });
});
