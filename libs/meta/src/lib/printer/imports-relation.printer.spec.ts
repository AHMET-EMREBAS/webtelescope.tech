import { TestModel } from '../builders';
import { clearSpace } from '../utils';
import { printRelationImports } from './imports-relation.printer';
describe('Print imports relation', () => {
  it('should print the imports from relations', () => {
    const model = TestModel('Test');

    const __expected = `
    import { Category } from '../category';
    `;
    const __result = printRelationImports(model);

    const expected = clearSpace(__expected);
    const result = clearSpace(__result);

    expect(result).toBe(expected);
  });
});
