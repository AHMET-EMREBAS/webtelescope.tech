import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateUserEmailDto } from '@webpackages/gen-model';
@Dto()
export class UpdateUserEmailDto implements IUpdateUserEmailDto {
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
    icon: 'email',
  })
  email?: string;
  @Property({ type: 'object', objectType: IDDto }) user?: IDDto;
}