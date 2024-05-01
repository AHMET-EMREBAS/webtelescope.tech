import { Model, ModelManager, RelationType } from '@webpackages/meta';
import { ClassBuilder } from './class-builder';
import {
  ClassNameBuilder,
  DecoratorListProvider,
  DecoratorNameProvider,
  PackageNameProvider,
} from '../common-imp';
import { ClassDecoratorBuilder } from '../decorator';
import { ClassImportBuilder } from '../imports';

describe('ClassBuilder', () => {
  it('should build the class', () => {
    const categoryModel: Model = {
      modelName: 'Category',
      properties: {
        name: {
          searchable: true,
          type: 'string',
          unique: true,
          required: true,
          minLength: 3,
        },
      },
    };

    const departmentModel: Model = {
      modelName: 'Department',
      properties: {
        name: {
          searchable: true,
          type: 'string',
          unique: true,
          required: true,
          minLength: 3,
        },
      },
    };

    const model: Model = {
      modelName: 'Model',
      properties: {
        name: {
          searchable: true,
          type: 'string',
          required: true,
          unique: true,
        },
        age: { type: 'number', update: false },
      },
      relations: {
        category: { relationType: RelationType.Many, model: categoryModel },
        department: { relationType: RelationType.One, model: departmentModel },
      },
    };

    const manager = new ModelManager(model);
    const decoratorBuilder = new ClassDecoratorBuilder(manager);
    const decoratorListProvider = new DecoratorListProvider(
      new DecoratorNameProvider()
    );
    const importBuilder = new ClassImportBuilder(
      new PackageNameProvider(),
      decoratorListProvider
    );

    const classNameBuilder = new ClassNameBuilder('Model');
    const builder = new ClassBuilder(
      manager,
      classNameBuilder,
      decoratorBuilder,
      importBuilder
    );

    console.log('Entity: ', builder.Entity().print());
    console.log('View: ', builder.View().print());
    console.log('CreateDto: ', builder.Create().print());
    console.log('CreateDto: ', builder.Update().print());
    console.log('CreateDto: ', builder.Query().print());
  });
});
