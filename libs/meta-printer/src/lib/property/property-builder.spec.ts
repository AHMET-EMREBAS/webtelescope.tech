import { PropertyManager } from '@webpackages/meta';
import { PropertyBuilder } from './property-builder';
import { PropertyDecoratorBuilder } from '../decorator';


const manager = new PropertyManager({
  type: 'string',
  required: true,
  searchable: true,
});
const decoratorBuilder = new PropertyDecoratorBuilder(manager);
const b = new PropertyBuilder('Cat', 'cat', manager, decoratorBuilder);

describe('PropertyBuilder', () => {
  it.each`
    name                    | expected                                                         | actual
    ${'EntityProperty'}     | ${"@Column({ type: 'string', required: true }) cat!: string;"}    | ${b.EntityProperty().print()}
    ${'ViewProperty'}       | ${'@ViewColumn() cat!: string;'}                                 | ${b.ViewProperty().print()}
    ${'CreateDtoProperty'}  | ${"@Property({ type: 'string', required: true }) cat!: string;"} | ${b.CreateDtoProperty().print()}
    ${'UpdateDtoProperty'}  | ${"@Property({ type: 'string' }) cat?: string;"}                 | ${b.UpdateDtoProperty().print()}
    ${'QueryDtoProperty'}   | ${"@Property({ type: 'string' }) cat?: string;"}                 | ${b.QueryDtoProperty().print()}
    ${'IQueryDtoProperty'}  | ${'cat?: string;'}                                               | ${b.IQueryDtoProperty().print()}
    ${'IEntityProperty'}    | ${'cat: string;'}                                                | ${b.IEntityProperty().print()}
    ${'ICreateDtoProperty'} | ${'cat: string;'}                                                | ${b.ICreateDtoProperty().print()}
    ${'IUpdateDtoProperty'} | ${'cat?: string;'}                                               | ${b.IUpdateDtoProperty().print()}
  `('$name | should print the $expected result', ({ expected, actual }) => {
    expect(actual).toBe(expected);
  });
});
