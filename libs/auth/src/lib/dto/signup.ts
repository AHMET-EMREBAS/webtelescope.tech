import { Dto, Property, Subscription } from '@webpackages/entity';

@Dto()
export class SignupDto
  implements Pick<Subscription, 'username' | 'password' | 'org'>
{
  @Property({ type: 'string', required: true, format: 'email' })
  username!: string;

  @Property({ type: 'string', required: true, format: 'password' })
  password!: string;

  @Property({ type: 'string', required: true, minLength: 3, maxLength: 100 })
  org!: string;
}
