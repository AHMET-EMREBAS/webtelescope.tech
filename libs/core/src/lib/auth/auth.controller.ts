import { Body, Post } from '@nestjs/common';
import { Controller, ValidationPipe } from '../decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { SignupDto } from './dto/signup';
import { ForgotPasswordDto, LoginWithCodeDto, ResetPasswordDto } from './dto';
import { PublicResource } from './meta';

@Controller({ tags: ['AuthController'], route: 'auth' })
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('reset-password')
  resetPassword(@Body(ValidationPipe) resetPasswordDto: ResetPasswordDto) {
    return this.service.resetPassword(resetPasswordDto);
  }

  @PublicResource()
  @Post('login')
  login(@Body(ValidationPipe) options: LoginDto) {
    return this.service.login(options);
  }

  @Post('logout')
  logout() {
    return;
  }

  @PublicResource()
  @Post('signup')
  signup(@Body(ValidationPipe) signupDto: SignupDto) {
    return this.service.signup(signupDto);
  }

  @PublicResource()
  @Post('forgot-password')
  forgotPassword(@Body(ValidationPipe) forgotPasswordDto: ForgotPasswordDto) {
    return this.service.forgotPassword(forgotPasswordDto);
  }

  @PublicResource()
  @Post('login-with-code')
  loginWithCode(@Body(ValidationPipe) loginWithCodeDto: LoginWithCodeDto) {
    return this.service.loginWithCode(loginWithCodeDto);
  }
}
