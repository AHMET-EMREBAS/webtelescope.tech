import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateUserDto } from '@webpackages/gen-model';
@Dto()
export class CreateUserDto implements ICreateUserDto {
  @Property({
    type: 'string',
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'email',
  })
  username!: string;
  @Property({
    type: 'string',
    required: true,
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
    format: 'password',
  })
  password!: string;
  @Property({ type: 'object', objectType: IDDto, isArray: true })
  role?: IDDto[];
  @Property({ type: 'object', objectType: IDDto, isArray: true })
  department?: IDDto[];
}
