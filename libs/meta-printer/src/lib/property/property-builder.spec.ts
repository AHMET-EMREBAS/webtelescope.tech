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
    ${'EntityProperty'}     | ${"@Column({ type: 'string', required: true }) cat!: string;"}    | ${b.Entity().print()}
    ${'ViewProperty'}       | ${'@ViewColumn() cat!: string;'}                                 | ${b.View().print()}
    ${'CreateDtoProperty'}  | ${"@Property({ type: 'string', required: true }) cat!: string;"} | ${b.Create().print()}
    ${'UpdateDtoProperty'}  | ${"@Property({ type: 'string' }) cat?: string;"}                 | ${b.Update().print()}
    ${'QueryDtoProperty'}   | ${"@Property({ type: 'string' }) cat?: string;"}                 | ${b.Query().print()}
    ${'IQueryDtoProperty'}  | ${'cat?: string;'}                                               | ${b.IQuery().print()}
    ${'IEntityProperty'}    | ${'cat: string;'}                                                | ${b.IEntity().print()}
    ${'ICreateDtoProperty'} | ${'cat: string;'}                                                | ${b.ICreate().print()}
    ${'IUpdateDtoProperty'} | ${'cat?: string;'}                                               | ${b.IUpdate().print()}
  `('$name | should print the $expected result', ({ expected, actual }) => {
    expect(actual).toBe(expected);
  });
});
