import { Dto, Property, User } from '@webpackages/entity';

@Dto()
export class ForgotPasswordDto implements Pick<User, 'username'> {
  @Property({ type: 'string' }) username!: string;
}
