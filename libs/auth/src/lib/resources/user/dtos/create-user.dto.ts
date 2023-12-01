import { Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateUserDto {
  @Property({ type: 'string', required: true, format: 'email' })
  username!: string;
  @Property({ type: 'string', required: true, format: 'password' })
  password!: string;
}
