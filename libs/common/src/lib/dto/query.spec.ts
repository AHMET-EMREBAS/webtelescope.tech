import {
  toWhereString,
  toOrderString,
  parseOrderOption,
  parseWhereOption,
  IOrder,
  IWhereOption,
} from './query';
describe('Query', () => {
  it('should toWhereString', () => {
    const result = toWhereString([
      { operator: 'equals', name: 'name', value: 'q' },
    ]);
    expect(result).toBe(`where=name:equals:q`);
  });

  it('should toOrderString', () => {
    const result = toOrderString({ name: 'ASC', id: 'DESC' });

    expect(result).toBe('order=name:ASC&order=id:DESC');
  });

  it('should parseOrderOption', () => {
    const result = parseOrderOption(['name:ASC', 'id:ASC']);
    expect(result).toStrictEqual({ name: 'ASC', id: 'ASC' } as IOrder<any>);
  });

  it('should parseWhereOption', () => {
    const result = parseWhereOption(['name:contains:value', 'id:equals:1']);

    expect(result).toStrictEqual([
      {
        name: 'name',
        operator: 'contains',
        value: 'value',
      } as IWhereOption<any>,
      {
        name: 'id',
        operator: 'equals',
        value: '1',
      } as IWhereOption<any>,
    ] as IWhereOption<any>[]);
  });
});
