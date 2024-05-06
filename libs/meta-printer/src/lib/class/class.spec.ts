import { Model, ModelManager } from '@webpackages/meta';
import { ClassBuilder } from './class';
import {
  ClassNameBuilder,
  DecoratorListProvider,
  DecoratorNameProvider,
  FileNameBuilder,
  PackageNameProvider,
} from '../common-imp';
import { ClassDecoratorBuilder } from '../decorator';
import { ClassImportBuilder } from '../imports';
import { ExtendingBuilder } from './extending';
import { ImplementingBuilder } from './implementing';
import { GenericsBuilder } from './generics-builder';
const model: Model = {
  modelName: 'Sample',
  properties: {
    name: { type: 'string' },
  },
  relations: {
    category: {
      relationType: 'Many',
      model: {
        modelName: 'Category',
        properties: {
          name: { type: 'string' },
        },
      },
    },
  },
};
const manager = new ModelManager(model);

describe('ClassBuilder', () => {
  it('should build the class', () => {
    const classNameBuilder = new ClassNameBuilder('Sample');
    const fileNameBuilder = new FileNameBuilder('Sample');
    const genericBuilder = new GenericsBuilder(manager);

    const builder = new ClassBuilder(
      manager,
      classNameBuilder,
      new ClassDecoratorBuilder(manager),
      new ClassImportBuilder(
        manager,
        new PackageNameProvider(),
        classNameBuilder,
        fileNameBuilder,
        new DecoratorListProvider(new DecoratorNameProvider())
      ),
      new ExtendingBuilder(manager),
      new ImplementingBuilder(manager, classNameBuilder, genericBuilder),
      genericBuilder
    );

    console.log('Entity: ', builder.Entity().print());
    console.log('View: ', builder.View().print());
    console.log('CreateDto: ', builder.Create().print());
    console.log('UpdateDto: ', builder.Update().print());
    console.log('-------------------------------------');
    console.log('QueryDto: ', builder.Query().print());
    console.log('ICreate: ', builder.ICreate().print());
    console.log('IUpdate: ', builder.IUpdate().print());
    console.log('IQuery: ', builder.IQuery().print());
  });
});
