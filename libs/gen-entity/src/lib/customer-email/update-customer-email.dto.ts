import { Dto, Property } from '@webpackages/core';
import { IUpdateCustomerEmailDto } from '@webpackages/common';
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
