import { Dto, Property } from '@webpackages/core';
import { IQueryDepartmentDto } from '@webpackages/gen-model';
@Dto()
export class QueryDepartmentDto implements IQueryDepartmentDto {
  @Property({ type: 'string', minLength: 3, maxLength: 30 }) name?: string;
}
