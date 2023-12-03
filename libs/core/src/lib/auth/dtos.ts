import { Exclude } from 'class-transformer';
import {
  PasswordProperty,
  TextProperty,
  UsernameProperty,
} from '../properties';

@Exclude()
export class LoginDto {
  @UsernameProperty({ required: true }) username!: string;
  @PasswordProperty({ required: true }) password!: string;
}

@Exclude()
export class SignupDto {
  @UsernameProperty({ required: true }) username!: string;
  @PasswordProperty({ required: true }) password!: string;
}

@Exclude()
export class ResetPasswordDto {
  @UsernameProperty({ required: true }) username!: string;
  @PasswordProperty({ required: true }) currentPassword!: string;
  @PasswordProperty({ required: true }) newPassword!: string;
}

@Exclude()
export class ResetPasswordByCodeDto {
  @UsernameProperty({ required: true }) username!: string;
  @TextProperty({ required: true }) securityCode!: string;
  @PasswordProperty({ required: true }) newPassword!: string;
}

@Exclude()
export class ForgotPasswordDto {
  @UsernameProperty({ required: true }) username!: string;
}
