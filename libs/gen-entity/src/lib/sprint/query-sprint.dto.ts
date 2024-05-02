import { Dto, Property } from '@webpackages/core';
import { IQuerySprintDto } from '@webpackages/common';
@Dto()
export class QuerySprintDto implements IQuerySprintDto {
  /**
   * Required unique short text
   */ @Property({
    type: 'string',
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name?: string;
}
