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
    name                     | expected                                                                                              | actual
    ${'EntityProperty'}      | ${"@Relation({ type: 'Many', required: true }) cat!: Cat[];"}                                         | ${b.EntityProperty().print()}
    ${'ViewProperties'}      | ${'@ViewColumn() catName!: string;'}                                                                  | ${b.ViewProperties().print()}
    ${'CreateDtoProperty'}   | ${"@Property({ type: 'object', objectType: 'IDDto', isArray: true, required: true }) cat!: IDDto[];"} | ${b.CreateDtoProperty().print()}
    ${'UpdateDtoProperty'}   | ${"@Property({ type: 'object', objectType: 'IDDto', isArray: true }) cat?: IDDto[];"}                 | ${b.UpdateDtoProperty().print()}
    ${'QueryDtoProperties'}  | ${"@Property({ type: 'string' }) catName?: string;"}                                                  | ${b.QueryDtoProperties().print()}
    ${'IQueryDtoProperties'} | ${'catName?: string;'}                                                                                | ${b.IQueryDtoProperties().print()}
    ${'IEntityProperty'}     | ${'cat: TCat[];'}                                                                                     | ${b.IEntityProperty().print()}
    ${'ICreateDtoProperty'}  | ${'cat: IID[];'}                                                                                      | ${b.ICreateDtoProperty().print()}
    ${'IUpdateDtoProperty'}  | ${'cat?: IID[];'}                                                                                     | ${b.IUpdateDtoProperty().print()}
  `('$name | should print the $expected result', ({ expected, actual }) => {
    expect(actual).toBe(expected);
  });
});
