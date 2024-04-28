import { ClassType } from '../common';
import { FileNameFactory } from './file-name.factory';

describe('FileName', () => {
  it('should print filenames correctly', () => {
    const r = new FileNameFactory('some');

    expect(r.Create).toBe('create-some.dto');
    expect(r.pick(ClassType.ICreate)).toBe('create-some');

    expect(r.Update).toBe('update-some.dto');
    expect(r.IUpdate).toBe('update-some');

    expect(r.Query).toBe('query-some.dto');
    expect(r.IQuery).toBe('query-some');

    expect(r.Entity).toBe('some.entity');
    expect(r.IEntity).toBe('some');

    expect(r.View).toBe('some.view');
    expect(r.IView).toBe('some-view');
  });
});
