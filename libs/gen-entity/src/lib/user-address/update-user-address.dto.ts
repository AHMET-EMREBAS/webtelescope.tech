import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateUserAddressDto } from '@webpackages/gen-model';
@Dto()
export class UpdateUserAddressDto implements IUpdateUserAddressDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    icon: 'state',
    autocomplete: 'address-level1',
  })
  state?: string;
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    icon: 'city',
    autocomplete: 'address-level2',
  })
  city?: string;
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    icon: 'street',
    autocomplete: 'street-address',
  })
  street?: string;
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    icon: 'zip',
    autocomplete: 'postal-code',
  })
  zip?: string;
  @Property({ type: 'object', objectType: IDDto }) user?: IDDto;
}