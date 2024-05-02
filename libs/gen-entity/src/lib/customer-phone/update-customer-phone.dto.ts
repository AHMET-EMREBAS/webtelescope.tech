import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateCustomerPhoneDto } from '@webpackages/gen-model';
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
