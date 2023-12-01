import { Exclude } from 'class-transformer';
import { Property } from '../validation';

@Exclude()
export class LoginDto {
  @Property({ type: 'string' })
  username!: string;

  @Property({ type: 'string' })
  password!: string;
}

@Exclude()
export class SignupDto {
  @Property({ type: 'string', format: 'email' })
  username!: string;

  @Property({ type: 'string', format: 'password' })
  password!: string;
}

@Exclude()
export class ForgotPassword {
  @Property({ type: 'string', format: 'email' })
  username!: string;
}

@Exclude()
export class ResetPassword {
  @Property({ type: 'string', format: 'email' })
  username!: string;

  @Property({ type: 'string' })
  password!: string;

  @Property({ type: 'string', format: 'password' })
  newPassword!: string;
}

@Exclude()
export class ResetPasswordWithCode {
  @Property({ type: 'string', format: 'email' })
  username!: string;

  @Property({ type: 'string' })
  securityCode!: string;

  @Property({ type: 'string', format: 'password' })
  newPassword!: string;
}
