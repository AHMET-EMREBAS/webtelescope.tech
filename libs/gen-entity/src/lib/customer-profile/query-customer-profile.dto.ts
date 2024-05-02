import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryCustomerProfileDto } from '@webpackages/gen-model';
@Dto()
export class QueryCustomerProfileDto implements IQueryCustomerProfileDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  firstName?: string;
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  lastName?: string;
}
