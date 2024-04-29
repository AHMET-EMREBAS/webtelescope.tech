import { FileNameBuilder } from './file-name-builder';
describe('FileName', () => {
  it('should print the file names', () => {
    const builder = new FileNameBuilder('User');

    expect(builder.Entity()).toBe('user.entity');
    expect(builder.View()).toBe('user.view');
    expect(builder.Create()).toBe('create-user.dto');
    expect(builder.Update()).toBe('update-user.dto');
    expect(builder.Query()).toBe('query-user.dto');
    expect(builder.IQuery()).toBe('query-user');
    expect(builder.ICreate()).toBe('create-user');
    expect(builder.IUpdate()).toBe('update-user');
  });
});
