import { Dto, Property } from '@webpackages/core';
import { ICreateDepartmentDto } from '@webpackages/gen-model';
@Dto()
export class CreateDepartmentDto implements ICreateDepartmentDto {
  @Property({
    type: 'string',
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
  })
  name!: string;
}
