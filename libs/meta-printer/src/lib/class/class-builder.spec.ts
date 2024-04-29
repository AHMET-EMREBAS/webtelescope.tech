import { Model, ModelManager, RelationType } from '@webpackages/meta';
import { ClassBuilder } from './class-builder';
import { ClassNameBuilder, PackageNames } from '../common';
import { ClassDecoratorBuilder } from '../decorator';
import { ImportBuilder } from '../imports';
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
        category: { type: RelationType.Many, model: categoryModel },
        department: { type: RelationType.One, model: departmentModel },
      },
    };

    const manager = new ModelManager(model);

    const importBuilder = new ImportBuilder(manager, new PackageNames());
    const classNameBuilder = new ClassNameBuilder('Model');
    const decoratorBuilder = new ClassDecoratorBuilder(manager);
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
