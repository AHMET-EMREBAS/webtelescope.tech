import { ImportPrinter } from './import-printer';

describe('Import Printer', () => {
  it('should print imports', () => {
    const result = new ImportPrinter({
      items: ['A', 'B'],
      packageName: 'some',
    }).print();
    expect(result).toBe(`import {A, B} from 'some';`);
  });
});
