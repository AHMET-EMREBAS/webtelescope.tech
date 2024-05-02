import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryDepartmentDto } from '@webpackages/gen-model';
@Dto()
export class QueryDepartmentDto implements IQueryDepartmentDto {
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
