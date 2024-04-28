import { Model } from '../__meta';
import { ClassPrinter } from '../class';
import { ClassType, EmptyPrinter } from '../common';
import {
  ClassNameFactory,
  ClassTypeFactory,
  DecoratorPrinterFactory,
  ExtendingFactory,
  ImplementingFactory,
} from '../factory';

export function create(classType: ClassType) {
  const model: Model = {
    modelName: 'User',
    properties: {
      username: { type: 'string', searchable: true },
      password: { type: 'string', required: true },
    },
    relations: {},
  };
  const result = new ClassPrinter(
    classType,
    model,
    new ClassNameFactory(model.modelName),
    new ClassTypeFactory(),
    new ExtendingFactory(new ClassNameFactory(model.modelName)),
    new ImplementingFactory(new ClassNameFactory(model.modelName)),
    {
      pick() {
        return {
          print() {
            return 'Content';
          },
        };
      },
    }
  ).print();

  return result;
}

describe('Description', () => {
  it('Test', () => {
    console.log(create(ClassType.Create));
    console.log(create(ClassType.Update));
    console.log(create(ClassType.IUpdate));
    console.log(create(ClassType.Entity));
    console.log(create(ClassType.Query));
  });
});
