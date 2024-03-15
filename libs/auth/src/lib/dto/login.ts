import { Dto, Property, User } from '@webpackages/entity';

@Dto()
export class LoginDto implements Pick<User, 'username' | 'password'> {
  @Property({ type: 'string', required: true, maxLength: 100 })
  username!: string;

  @Property({ type: 'string', required: true, maxLength: 100 })
  password!: string;
}
