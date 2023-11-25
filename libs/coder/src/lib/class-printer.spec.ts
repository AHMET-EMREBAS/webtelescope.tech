import { ClassPrinter } from './class-printer';
import { ClassPropertyPrinter } from './property-printer';
describe('ClassPrinter', () => {
  it('should print class', () => {
    const result = new ClassPrinter(
      {
        name: 'A',
        extend: ['B'],
        implements: ['C'],
      },
      [
        new ClassPropertyPrinter({
          name: 'some',
          type: 'number',
          isArray: true,
        }),
        new ClassPropertyPrinter({
          name: 'other',
          type: 'number',
          isArray: true,
        }),
      ],
      []
    ).print();

    expect(result).toBe(
      `export class A extends B implements C {\nsome?:number[];\nother?:number[];\n}`
    );
  });
});
