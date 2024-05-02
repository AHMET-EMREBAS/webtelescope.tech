import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryUserDepartmentDto } from '@webpackages/gen-model';
@Dto()
export class QueryUserDepartmentDto implements IQueryUserDepartmentDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  name?: string;
}
