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

    const model: Model = {
      modelName: 'Model',
      properties: {
        name: { type: 'string', required: true, unique: true },
      },
      relations: {
        category: { type: RelationType.Many, model: categoryModel },
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

    console.log(builder.Entity().print());
  });
});
