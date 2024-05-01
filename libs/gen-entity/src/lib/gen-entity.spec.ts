import { genEntity } from './gen-entity';

describe('genEntity', () => {
  it('should work', () => {
    expect(genEntity()).toEqual('gen-entity');
  });
});
