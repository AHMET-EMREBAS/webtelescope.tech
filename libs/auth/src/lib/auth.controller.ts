import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { TransformAndValidatePipe } from '@webpackages/core';
import {
  LoginDto,
  SignupDto,
  SetPublic,
  AUTH_BEARER_NAME,
  UpdatePasswordDto,
  ForgotPasswordDto,
  UpdatePasswordByCodeDto,
} from './auth';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  /**
   * Public login resource
   * @param loginDto
   * @param res
   * @returns
   */
  @ApiOperation({ summary: 'Login with username and password' })
  @SetPublic()
  @Post('login')
  async login(
    @Body(TransformAndValidatePipe) loginDto: LoginDto,
    @Res() res: Response
  ) {
    const token = await this.authService.login(loginDto);

    res.status(HttpStatus.OK);
    res.setHeader(AUTH_BEARER_NAME, token);
    res.end();
    return;
  }

  /**
   * Public resource to signup the service
   * @param signupDto
   * @param res
   */
  @ApiOperation({ summary: 'Signup with username and password' })
  @SetPublic()
  @Post('signup')
  async signup(
    @Body(TransformAndValidatePipe) signupDto: SignupDto,
    @Res() res: Response
  ) {
    const token = await this.authService.signup(signupDto);
    res.status(HttpStatus.OK);
    res.setHeader(AUTH_BEARER_NAME, token);
    res.end();
  }

  /**
   * Public resource to update password by username and password
   * @param body
   * @returns
   */
  @ApiOperation({ summary: 'Update password by username and current password' })
  @SetPublic()
  @Post('update-password')
  async updatePassword(
    @Body(TransformAndValidatePipe) body: UpdatePasswordDto
  ) {
    return await this.authService.updatePassword(body);
  }

  /**
   * Request forgot password
   * @param body
   * @returns
   */
  @ApiOperation({ summary: 'Send one time security code by email' })
  @SetPublic()
  @Post('forgot-password')
  async forgotPassword(
    @Body(TransformAndValidatePipe) body: ForgotPasswordDto
  ) {
    return await this.authService.forgotPassword(body);
  }

  @ApiOperation({ summary: 'Update password by username and security code' })
  @SetPublic()
  @Post('update-password-by-code')
  async updatePasswordByCode(
    @Body(TransformAndValidatePipe) body: UpdatePasswordByCodeDto
  ) {
    return await this.authService.updatePasswordByCode(body);
  }
}
