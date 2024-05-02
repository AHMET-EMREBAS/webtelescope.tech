import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryPermissionDto } from '@webpackages/gen-model';
@Dto()
export class QueryPermissionDto implements IQueryPermissionDto {
  /**
   * Required unique short text
   */
  @Property({
    type: 'string',
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name?: string;
}
