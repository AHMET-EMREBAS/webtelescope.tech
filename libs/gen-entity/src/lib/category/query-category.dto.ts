import { Dto, Property } from '@webpackages/core';
import { IQueryCategoryDto } from '@webpackages/gen-model';
@Dto()
export class QueryCategoryDto implements IQueryCategoryDto {
  @Property({ type: 'string', minLength: 3, maxLength: 30 }) name?: string;
}
