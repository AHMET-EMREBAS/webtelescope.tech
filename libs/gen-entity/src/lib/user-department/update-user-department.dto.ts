import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateUserDepartmentDto } from '@webpackages/gen-model';
@Dto()
export class UpdateUserDepartmentDto implements IUpdateUserDepartmentDto {
  @Property({
    type: 'string',
    unique: true,
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name?: string;
}
