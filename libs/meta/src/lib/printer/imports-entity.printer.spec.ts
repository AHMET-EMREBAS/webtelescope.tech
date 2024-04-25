import { TestModel } from '../builders';
import { clearSpace } from '../utils';
import { printEntityImports } from './imports-entity.printer';
describe('Entity class imports', () => {
  it('should import types and models into the entity class', () => {
    const model = TestModel('Test');

    const __expected = `
    import { Category } from '../category';
    import { EnumValue } from '../types';
    `;
    const __result = printEntityImports(model);

    const expected = clearSpace(__expected);
    const result = clearSpace(__result);

    expect(result).toBe(expected);
  });
});
