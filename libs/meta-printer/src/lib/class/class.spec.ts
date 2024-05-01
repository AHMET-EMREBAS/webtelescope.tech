import { Model, ModelManager } from '@webpackages/meta';
import { ClassBuilder } from './class';
import {
  ClassNameBuilder,
  DecoratorListProvider,
  DecoratorNameProvider,
  PackageNameProvider,
} from '../common-imp';
import { ClassDecoratorBuilder } from '../decorator';
import { ClassImportBuilder } from '../imports';

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
          name: { type: 'string',  },
        },
      },
    },
  },
};
const manager = new ModelManager(model);

describe('ClassBuilder', () => {
  it('should build the class', () => {
    const builder = new ClassBuilder(
      manager,
      new ClassNameBuilder('Sample'),
      new ClassDecoratorBuilder(manager),
      new ClassImportBuilder(
        new PackageNameProvider(),
        new DecoratorListProvider(new DecoratorNameProvider())
      )
    );

    console.log('Entity: ', builder.Entity().print());
    console.log('View: ', builder.View().print());
    console.log('CreateDto: ', builder.Create().print());
    console.log('UpdateDto: ', builder.Update().print());
    console.log('------------------------');
    console.log('QueryDto: ', builder.Query().print());
    console.log('ICreate: ', builder.ICreate().print());
    console.log('IUpdate: ', builder.IUpdate().print());
    console.log('IQuery: ', builder.IQuery().print());
  });
});
