import {
  ClassPrinter,
  DecoratorPrinter,
  PropertyPrinter,
} from './class-generator';

describe('classGenerator', () => {
  describe('DecoratorPrinter', () => {
    it('should print decorator', () => {
      const p = new DecoratorPrinter({
        decoratorName: 'Some',
        decoratorOptions: { some: 'some', num: 12 },
      });

      const result = p.print();

      expect(result).toBe(`@Some({"some":"some","num":12})`);
    });
  });

  describe('PropertyPrinter', () => {
    it('should print basic property', () => {
      const result = new PropertyPrinter({
        propertyName: 'name',
        type: 'string',
      });

      expect(result.print()).toBe(`name?:string;`);
    });

    it('should print  property with decorator', () => {
      const result = new PropertyPrinter({
        propertyName: 'name',
        type: 'string',
        required: true,
        decorators: [
          { decoratorName: 'Validation', decoratorOptions: { minLength: 3 } },
        ],
      });

      expect(result.print()).toBe(
        `@Validation({"minLength":3})\nname!:string;`
      );
    });
  });

  describe('ClassPrinter', () => {
    it('should print class', () => {
      const printer = new ClassPrinter({
        className: 'Abc',
        imports: [{ imports: ['Entity', 'Column'], packageName: 'typeorm' }],
        decorators: [{ decoratorName: 'Entity' }],
        properties: [
          {
            propertyName: 'name',
            type: 'string',
            decorators: [
              {
                decoratorName: 'Validation',
                decoratorOptions: { minLength: 10 },
                imports: [
                  {
                    imports: ['Validation'],
                    packageName: '@webpackages/validation',
                  },
                ],
              },
            ],
          },
        ],
      });

      expect(printer.print()).toBe(
        `import { Entity, Column } from 'typeorm'; import { Validation } from '@webpackages/validation'; @Entity() export class Abc { @Validation({"minLength":10}) name?:string; }`
      );
    });
  });
});
