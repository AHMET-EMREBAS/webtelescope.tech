import { Dto, Property } from '@webpackages/core';
import { IUpdateUserDto } from '@webpackages/common';
@Dto()
export class UpdateUserDto implements IUpdateUserDto {
  @Property({
    type: 'string',
    unique: true,
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
  })
  username?: string;
  @Property({
    type: 'string',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'password',
  })
  password?: string;
  @Property({ type: 'object', objectType: IDDto, isArray: true })
  roles?: IDDto[];
  @Property({ type: 'object', objectType: IDDto, isArray: true })
  department?: IDDto[];
}
