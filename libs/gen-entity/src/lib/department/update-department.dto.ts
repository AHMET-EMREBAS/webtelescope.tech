import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateDepartmentDto } from '@webpackages/gen-model';
@Dto()
export class UpdateDepartmentDto implements IUpdateDepartmentDto {
  /**
   * Required unique short text
   */
  @Property({
    type: 'string',
    unique: true,
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name?: string;
}
