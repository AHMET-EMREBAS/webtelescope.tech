import { Logger } from '@nestjs/common';
import {
  Body,
  CreateSubDto,
  ForgotPasswordDto,
  LoginDto,
  LoginResponse,
  LoginWithCodeDto,
  Query,
  UpdatePasswordDto,
  UpdateResult,
} from '@webpackages/dto';
import {
  BearerAccess,
  CredentialAccess,
  LogoutAccess,
  LogoutAllAccess,
  SecurityCodeAccess,
  SessionAccess,
  UsernameAccess,
} from '../app.guard';
import {
  AuthorizationParam,
  OrgnameParam,
  SessionParam,
  UserParam,
} from '../common';
import { AuthResourceBuilder } from './auth-controller.builder';
import { AuthService } from '../auth.service';
import { IAuthController } from '@webpackages/common';
import { ISession, IUser, MessageResponse } from '@webpackages/model';
import { ByPassAuthGuard } from '@webpackages/core';
import { summaryObject } from '@webpackages/utils';

const R = new AuthResourceBuilder({
  Controller: { decorators: [BearerAccess()] },
  Login: { decorators: [CredentialAccess()] },
  LoginWithCode: { decorators: [SecurityCodeAccess()] },
  Logout: { decorators: [LogoutAccess()] },
  LogoutAll: { decorators: [LogoutAllAccess()] },
  HasSession: { decorators: [SessionAccess()] },
  ForgotPassword: { decorators: [UsernameAccess()] },
  SignUp: { decorators: [ByPassAuthGuard()] },
});

@R.Controller()
export class AuthController implements IAuthController {
  private readonly logger!: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @R.Login()
  async login(
    @Body() _loginDto: LoginDto,
    @AuthorizationParam() accessToken: string,
    @SessionParam() { deviceId }: ISession
  ): Promise<LoginResponse> {
    const result: LoginResponse = { accessToken, deviceId };
    this.logger.debug(`Returning ${summaryObject(result)}`);
    return result;
  }

  @R.LoginWithCode()
  async loginWithCode(
    @Query() __: LoginWithCodeDto,
    @AuthorizationParam() accessToken: string,
    @SessionParam() session: ISession
  ): Promise<LoginResponse> {
    return { accessToken, deviceId: session.deviceId };
  }

  @R.Logout()
  async logout(): Promise<MessageResponse> {
    return { message: 'Current session is deleted.' };
  }

  @R.LogoutAll()
  async logoutAll(): Promise<MessageResponse> {
    return { message: 'All sessions are deleted.' };
  }

  @R.HasSession()
  async hasSession(): Promise<MessageResponse> {
    return { message: 'You have a session!' };
  }

  @R.UpdatePassword()
  async updatePassword(
    @SessionParam() session: ISession,
    @Body() passwordDto: UpdatePasswordDto
  ): Promise<UpdateResult> {
    return await this.authService.updatePassword(session.userId, passwordDto);
  }

  @R.ForgotPassword()
  async forgotPassword(
    @Body() __: ForgotPasswordDto,
    @UserParam() user: IUser
  ): Promise<MessageResponse> {
    const { securityCode } = await this.authService.createSecurityCodeOrThrow(
      user
    );
    await this.authService.sendEmail({
      to: user.username,
      subject: 'Security Code',
      message: `Here is your one-time security code ${securityCode}`,
    });
    return { message: `Password reset link sent.` };
  }

  @R.SignUp()
  async signup(
    @OrgnameParam() orgname: string,
    @Body() signupDto: CreateSubDto
  ) {
    return await this.authService.signup(orgname, signupDto);
  }
}
