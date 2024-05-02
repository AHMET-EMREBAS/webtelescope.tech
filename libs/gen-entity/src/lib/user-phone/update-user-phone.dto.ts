import { Dto, Property } from '@webpackages/core';
import { IUpdateUserPhoneDto } from '@webpackages/common';
@Dto()
export class UpdateUserPhoneDto implements IUpdateUserPhoneDto {
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
