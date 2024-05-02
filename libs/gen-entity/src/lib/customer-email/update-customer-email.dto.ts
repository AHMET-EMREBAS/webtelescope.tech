import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateCustomerEmailDto } from '@webpackages/gen-model';
@Dto()
export class UpdateCustomerEmailDto implements IUpdateCustomerEmailDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
    icon: 'email',
  })
  email?: string;
  @Property({ type: 'object', objectType: IDDto }) ownwer?: IDDto;
}
