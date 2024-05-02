import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserDepartmentDto } from '@webpackages/gen-model';
@Dto()
export class QueryUserDepartmentDto implements IQueryUserDepartmentDto {
  @Property({}) name?: string;
}
