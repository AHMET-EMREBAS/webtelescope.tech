# class-generator

Generate typescript classes from class defination.

```typescript
import { ClassPrinter } from '@webpackages/class-generator';

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

printer.print();
```

Print method will output the following code

```typescript
import { Entity, Column } from 'typeorm';
import { Validation } from '@webpackges/validation';

@Entity()
export class Abc {
  @Validation({ minLength: 10 }) name?: string;
}
```
