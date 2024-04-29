import { Model, RelationManager, RelationType } from '@webpackages/meta';
import { RelationBuilder } from './relation-builder';
import { RelationDecoratorBuilder } from '../decorator';
describe('RelationBuilder', () => {
  it('should build realtions', () => {
    const categoryModel: Model = {
      modelName: 'Category',
      properties: {
        name: { type: 'string', unique: true, required: true },
      },
    };
    const manager = new RelationManager({
      type: RelationType.Many,
      model: categoryModel,
    });
    const decoratorBuilder = new RelationDecoratorBuilder(manager);
    const builder = new RelationBuilder(
      'Category',
      'category',
      manager,
      decoratorBuilder
    );

    let result = builder.CreateDtoProperty().print();
    result = builder.CreateDtoProperty().print();
    result = builder.EntityProperty().print();

    console.log(result);
  });
});
