import { session } from './session';

describe('session', () => {
  it('should work', () => {
    expect(session()).toEqual('session');
  });
});
