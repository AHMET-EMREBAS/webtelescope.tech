import { Dto, Property } from '@webpackages/core';
import { IUpdateDepartmentDto } from '@webpackages/gen-model';
@Dto()
export class UpdateDepartmentDto implements IUpdateDepartmentDto {
  @Property({ type: 'string', unique: true, minLength: 3, maxLength: 30 })
  name?: string;
}
