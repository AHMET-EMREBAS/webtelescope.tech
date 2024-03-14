import { Property, Dto } from '@webpackages/entity';

@Dto()
export class LoginDto {
  @Property({ type: 'string', format: 'email', required: true })
  username!: string;

  @Property({ type: 'string', format: 'password', required: true })
  password!: string;
}
