import { Body, Post, Res } from '@nestjs/common';
import { Controller, ValidationPipe } from '../decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { ForgotPasswordDto, LoginWithCodeDto, ResetPasswordDto } from './dto';
import { PublicResource } from './meta';
import { Response } from 'express';
import { AUTH_TOKEN_NAME } from '@webtelescopetech/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller({ tags: ['AuthController'], route: 'auth' })
export class AuthController {
  constructor(private readonly service: AuthService) {}

  /**
   * Only Authenticated user can update password
   * @param resetPasswordDto
   * @returns
   */
  @ApiBearerAuth(AUTH_TOKEN_NAME)
  @Post('reset-password')
  resetPassword(@Body(ValidationPipe) resetPasswordDto: ResetPasswordDto) {
    return this.service.resetPassword(resetPasswordDto);
  }

  @ApiBearerAuth(AUTH_TOKEN_NAME)
  @Post('logout')
  logout(@Res() res: Response) {
    res.cookie(AUTH_TOKEN_NAME, '');
    res.send({ message: 'You are out!' });
  }

  @PublicResource()
  @Post('login')
  async login(@Body(ValidationPipe) options: LoginDto, @Res() res: Response) {
    const authToken = await this.service.login(options);
    res.cookie(AUTH_TOKEN_NAME, authToken);
    res.send({ [AUTH_TOKEN_NAME]: authToken });
  }

  @PublicResource()
  @Post('forgot-password')
  forgotPassword(@Body(ValidationPipe) forgotPasswordDto: ForgotPasswordDto) {
    return this.service.forgotPassword(forgotPasswordDto);
  }

  @PublicResource()
  @Post('login-with-code')
  async loginWithCode(
    @Body(ValidationPipe) loginWithCodeDto: LoginWithCodeDto,
    @Res() res: Response
  ) {
    const authToken = await this.service.loginWithCode(loginWithCodeDto);
    res.cookie(AUTH_TOKEN_NAME, authToken);
    res.send({ [AUTH_TOKEN_NAME]: authToken });
  }
}
