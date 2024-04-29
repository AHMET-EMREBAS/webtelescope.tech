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
    ${"@Relation({ type: 'Many', required: true }) cat!: Cat[];"}                                         | ${b.EntityProperty().print()}
    ${'@ViewColumn() catName!: string;'}                                                                  | ${b.ViewProperties().print()}
    ${"@Property({ type: 'object', objectType: 'IDDto', required: true, isArray: true }) cat!: IDDto[];"} | ${b.CreateDtoProperty().print()}
    ${"@Property({ type: 'object', objectType: 'IDDto', isArray: true }) cat?: IDDto[];"}                 | ${b.UpdateDtoProperty().print()}
    ${"@Property({ type: 'string' }) catName?: string;"}                                                  | ${b.QueryDtoProperties().print()}
    ${'catName?: string;'}                                                                                | ${b.IQueryDtoProperties().print()}
    ${'cat: TCat[];'}                                                                                     | ${b.IEntityProperty().print()}
    ${'cat: IID[];'}                                                                                      | ${b.ICreateDtoProperty().print()}
    ${'cat?: IID[];'}                                                                                     | ${b.IUpdateDtoProperty().print()}
  `('should print the $expected result', ({ expected, actual }) => {
    expect(actual).toBe(expected);
  });
});
