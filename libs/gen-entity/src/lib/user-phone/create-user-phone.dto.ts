import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateUserPhoneDto } from '@webpackages/gen-model';
@Dto()
export class CreateUserPhoneDto implements ICreateUserPhoneDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'phone',
    autocomplete: 'tel',
  })
  phone?: string;
  @Property({ type: 'object', objectType: IDDto, required: true }) user!: IDDto;
}
