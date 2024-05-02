import { Dto, Property } from '@webpackages/core';
import { ICreateUserEmailDto } from '@webpackages/common';
@Dto()
export class CreateUserEmailDto implements ICreateUserEmailDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
    icon: 'email',
  })
  email?: string;
  @Property({ type: 'object', objectType: IDDto, required: true })
  ownwer!: IDDto;
}
