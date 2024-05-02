import { Dto, Property } from '@webpackages/core';
import { ICreateSprintDto } from '@webpackages/common';
@Dto()
export class CreateSprintDto implements ICreateSprintDto {
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
