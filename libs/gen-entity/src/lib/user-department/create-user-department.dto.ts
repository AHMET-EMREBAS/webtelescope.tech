import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateUserDepartmentDto } from '@webpackages/gen-model';
@Dto()
export class CreateUserDepartmentDto implements ICreateUserDepartmentDto {
  @Property({
    type: 'string',
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name!: string;
}
