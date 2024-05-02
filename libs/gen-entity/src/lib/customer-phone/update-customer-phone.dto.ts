import { Dto, Property } from '@webpackages/core';
import { IUpdateCustomerPhoneDto } from '@webpackages/common';
@Dto()
export class UpdateCustomerPhoneDto implements IUpdateCustomerPhoneDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
    autocomplete: 'email',
  })
  email?: string;
  @Property({ type: 'object', objectType: IDDto }) ownwer?: IDDto;
}
