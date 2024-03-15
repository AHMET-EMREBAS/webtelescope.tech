import { Dto, Property, User } from '@webpackages/entity';

@Dto()
export class LoginDto implements Pick<User, 'username' | 'password'> {
  @Property({
    type: 'string',
    format: 'email',
    required: true,
    maxLength: 100,
    defaultValue: 'user@email.com',
  })
  username!: string;

  @Property({
    type: 'string',
    required: true,
    maxLength: 100,
    defaultValue: '!Password1',
  })
  password!: string;
}
