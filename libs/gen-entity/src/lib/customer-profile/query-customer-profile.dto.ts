import { Dto, Property } from '@webpackages/core';
import { IQueryCustomerProfileDto } from '@webpackages/common';
@Dto()
export class QueryCustomerProfileDto implements IQueryCustomerProfileDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  firstName?: string;
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  lastName?: string;
}
