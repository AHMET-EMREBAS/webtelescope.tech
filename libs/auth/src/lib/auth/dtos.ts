import { Property } from '@webpackages/core';
import { Exclude } from 'class-transformer';

@Exclude()
export class LoginDto {
  @Property({ type: 'string', default: 'root@root.com' })
  username!: string;

  @Property({ type: 'string', default: 'Pass123!' })
  password!: string;
}

@Exclude()
export class SignupDto {
  @Property({ type: 'string', format: 'email', default: 'root@root.com' })
  username!: string;

  @Property({ type: 'string', format: 'password', default: 'Pass123!' })
  password!: string;
}

@Exclude()
export class ForgotPasswordDto {
  @Property({ type: 'string', format: 'email', default: 'root@root.com' })
  username!: string;
}

@Exclude()
export class UpdatePasswordDto {
  @Property({ type: 'string', format: 'email', default: 'root@root.com' })
  username!: string;

  @Property({ type: 'string', default: 'Pass123!' })
  password!: string;

  @Property({ type: 'string', format: 'password' })
  newPassword!: string;
}

@Exclude()
export class UpdatePasswordByCodeDto {
  @Property({ type: 'string', format: 'email', default: 'root@root.com' })
  username!: string;

  @Property({ type: 'string' })
  securityCode!: string;

  @Property({ type: 'string', format: 'password', default: 'Pass123!' })
  newPassword!: string;
}
