import { Dto, Property } from '@webpackages/core';
import { IUpdateProjectDto } from '@webpackages/common';
@Dto()
export class UpdateProjectDto implements IUpdateProjectDto {
  /**
   * Required unique short text
   */ @Property({
    type: 'string',
    unique: true,
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name?: string;
  @Property({
    type: 'string',
    maxLength: 1000,
    inputType: 'textarea',
    icon: 'description',
  })
  description?: string;
}
