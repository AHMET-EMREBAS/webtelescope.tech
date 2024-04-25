import { printDtoPropertyDecorator, printEntityColumnDecorator } from './decorator.printer';
describe('Print Decorators', () => {
  it('should print the dto property decorator', () => {
    const expected = `@Property({ type: 'string', required: true })`;
    const result = printDtoPropertyDecorator({
      type: 'string',
      required: true,
    });

    expect(result).toBe(expected);
  });
  it('should print the entity column decorator', () => {
    const expected = `@Column({ type: 'string', unique: true })`;
    const result = printEntityColumnDecorator({
      type: 'string',
      unique: true,
    });

    expect(result).toBe(expected);
  });
});
