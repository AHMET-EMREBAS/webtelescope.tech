import { genMeta } from './gen-meta';

describe('genMeta', () => {
  it('should work', () => {
    expect(genMeta()).toEqual('gen-meta');
  });
});
