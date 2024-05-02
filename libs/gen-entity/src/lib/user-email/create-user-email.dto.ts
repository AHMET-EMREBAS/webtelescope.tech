import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateUserEmailDto } from '@webpackages/gen-model';
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
