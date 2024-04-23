import { createMetadata } from './meta';
describe('Get and set metadata', () => {
  it('should get and set metadata', () => {
    const [get, set, token] = createMetadata('prefix');
    expect(get).toBeTruthy();
    expect(set).toBeTruthy();
    expect(token).toBeTruthy();
    expect(token()).toContain('prefix');
  });
});
