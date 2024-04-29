import { Model, RelationManager, RelationType } from '@webpackages/meta';
import { RelationBuilder } from './relation-builder';
import { RelationDecoratorBuilder } from '../decorator';

const categoryModel: Model = {
  modelName: 'Cat',
  properties: {
    name: { type: 'string', unique: true, required: true, searchable: true },
  },
};
const manager = new RelationManager({
  type: RelationType.Many,
  required: true,
  model: categoryModel,
});
const decoratorBuilder = new RelationDecoratorBuilder(manager);
const b = new RelationBuilder('Cat', 'cat', manager, decoratorBuilder);

describe('RelationBuilder', () => {
  it.each`
    expected                                                                                              | actual
    ${"@Property({ type: 'object', objectType: 'IDDto', required: true, isArray: true }) cat!: IDDto[];"} | ${b.CreateDtoProperty().print()}
    ${"@Property({ type: 'object', objectType: 'IDDto', isArray: true }) cat?: IDDto[];"}                 | ${b.UpdateDtoProperty().print()}
    ${"@Relation({ type: 'Many', required: true }) cat!: Cat[];"}                                         | ${b.EntityProperty().print()}
    ${"@Property({ type: 'string' }) catName?: string;"}                                                  | ${b.QueryDtoProperties().print()}
  `('should print the $expected result', ({ expected, actual }) => {
    expect(actual).toBe(expected);
  });
});
