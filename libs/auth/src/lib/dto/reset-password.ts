import { Dto, Property, User } from '@webpackages/entity';

@Dto()
export class ResetPasswordDto implements Pick<User, 'username' | 'password'> {
  @Property({ type: 'string' }) username!: string;
  @Property({ type: 'string', format: 'password' }) password!: string;
}
