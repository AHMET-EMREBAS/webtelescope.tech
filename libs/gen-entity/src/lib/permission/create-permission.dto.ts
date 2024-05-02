import { Dto, Property } from '@webpackages/core';
import { ICreatePermissionDto } from '@webpackages/common';
@Dto()
export class CreatePermissionDto implements ICreatePermissionDto {
  /**
   * Required unique short text
   */ @Property({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name!: string;
}
