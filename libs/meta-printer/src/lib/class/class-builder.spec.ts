import { Model, ModelManager, RelationType } from '@webpackages/meta';
import { ClassBuilder } from './class-builder';
import { ClassNameBuilder } from '../common';
import { ClassDecoratorBuilder } from '../decorator';
describe('ClassBuilder', () => {
  it('should build the class', () => {
    const categoryModel: Model = {
      modelName: 'Category',
      properties: {
        name: { type: 'string', unique: true, required: true, minLength: 3 },
      },
    };

    const departmentModel: Model = {
      modelName: 'Department',
      properties: {
        name: { type: 'string', unique: true, required: true, minLength: 3 },
      },
    };

    const model: Model = {
      modelName: 'Model',
      properties: {
        name: { type: 'string', required: true, unique: true },
        age: { type: 'number', update: false },
      },
      relations: {
        category: { type: RelationType.Many, model: categoryModel },
        department: { type: RelationType.One, model: departmentModel },
      },
    };

    const manager = new ModelManager(model);

    const classNameBuilder = new ClassNameBuilder('Model');
    const decoratorBuilder = new ClassDecoratorBuilder(manager);
    const builder = new ClassBuilder(
      manager,
      classNameBuilder,
      decoratorBuilder
    );

    console.log('Entity: ', builder.Entity().print());
    console.log('View: ', builder.View().print());
    console.log('CreateDto: ', builder.CreateDto().print());
    console.log('CreateDto: ', builder.UpdateDto().print());
  });
});
