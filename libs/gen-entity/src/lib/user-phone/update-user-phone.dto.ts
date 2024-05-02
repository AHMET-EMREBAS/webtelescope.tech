import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateUserPhoneDto } from '@webpackages/gen-model';
@Dto()
export class UpdateUserPhoneDto implements IUpdateUserPhoneDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'phone',
    autocomplete: 'tel',
  })
  phone?: string;
  @Property({ type: 'object', objectType: IDDto }) user?: IDDto;
}
