import { Dto, Property } from '@webpackages/core';
import { IQueryCustomerEmailDto } from '@webpackages/common';
@Dto()
export class QueryCustomerEmailDto implements IQueryCustomerEmailDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
    icon: 'email',
  })
  email?: string;
  @Property({ type: 'string' }) customerUsername?: string;
  @Property({ type: 'string' }) customerPassword?: string;
}
