import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryDepartmentDto } from '@webpackages/gen-model';
@Dto()
export class QueryDepartmentDto implements IQueryDepartmentDto {
  /**
   * Required unique short text
   */
  @Property({ description: 'Required unique short text' }) name?: string;
}
