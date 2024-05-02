import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryCustomerPhoneDto } from '@webpackages/gen-model';
@Dto()
export class QueryCustomerPhoneDto implements IQueryCustomerPhoneDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
    autocomplete: 'email',
  })
  email?: string;
  @Property({ type: 'string' }) customerUsername?: string;
  @Property({ type: 'string' }) customerPassword?: string;
}
