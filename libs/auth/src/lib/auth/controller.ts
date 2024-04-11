import { Controller, Get, Logger, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import {
  LoginResponse,
  Body,
  DeleteResult,
  ForgotPasswordDto,
  LoginDto,
  LoginWithCodeDto,
  Query,
  CreateSubDto,
  UpdatePasswordDto,
  UpdateResult,
} from '@webpackages/dto';
import {
  BearerAccess,
  CredentialAccess,
  SecurityCodeAccess,
  SessionAccess,
  UsernameAccess,
} from '../__guards';

import { DatabaseFactory } from '../database';
import { ISession, IUser, MessageResponse } from '@webpackages/model';
import { summaryObject } from '@webpackages/utils';
import { AuthService } from '../auth.service';
import { PublicAccess, Scope } from '@webpackages/core';
import { AuthHeaderParam, SessionParam, UserParam } from '../common';

@ApiTags('Auth')
@Scope('AUTH')
@BearerAccess()
@Controller('auth')
export class AuthController {
  logger!: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @ApiOperation({ summary: 'Login with username and password' })
  @ApiOkResponse({ type: LoginResponse })
  @ApiUnauthorizedResponse()
  @CredentialAccess()
  @Post('login')
  async login(
    @Body() _loginDto: LoginDto,
    @AuthHeaderParam() accessToken: string,
    @SessionParam() session: ISession
  ): Promise<LoginResponse> {
    const { id, deviceId, orgId, orgname, userId } = session;
    const result: LoginResponse = { accessToken, deviceId };

    this.logger.debug(
      `Created session ${summaryObject({
        id,
        userId,
        orgId,
        orgname,
        deviceId,
      })}`
    );
    this.logger.debug(`Returning ${summaryObject(result)}`);
    return result;
  }

  @ApiOperation({ summary: 'Logout from the current session' })
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: DeleteResult })
  @Get('logout')
  async logout(@SessionParam() session: ISession): Promise<MessageResponse> {
    await this.authService.deleteSession(session.id);
    return { message: 'Current session is deleted.' };
  }

  @ApiOperation({ summary: 'Logout from the current session' })
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: DeleteResult, isArray: true })
  @Get('logout-all-devices')
  async logoutAllDevices(
    @SessionParam() session: ISession
  ): Promise<MessageResponse> {
    await this.authService.deleteAllSessionsByUserId(session.userId);
    return { message: 'All sessions are deleted.' };
  }

  @ApiOperation({ summary: 'Has active session' })
  @ApiUnauthorizedResponse()
  @SessionAccess()
  @Get('has-session')
  async hasSession(): Promise<MessageResponse> {
    return { message: 'You have a session!' };
  }

  @ApiOperation({ summary: 'Update password' })
  @ApiOkResponse({ type: UpdateResult })
  @ApiUnauthorizedResponse()
  @Post('update-password')
  async updatePassword(
    @SessionParam() session: ISession,
    @Body() passwordDto: UpdatePasswordDto
  ) {
    await this.authService.updatePassword(session.userId, passwordDto);
  }

  @ApiOperation({ summary: 'Forgot password' })
  @UsernameAccess()
  @ApiOkResponse({ type: UpdateResult })
  @ApiUnauthorizedResponse()
  @Post('forgot-password')
  async forgotPassword(
    @Body() __: ForgotPasswordDto,
    @UserParam() user: IUser
  ) {
    const { securityCode } = await this.authService.createSecurityCodeOrThrow(
      user
    );
    this.authService.sendEmail({
      to: user.username,
      subject: 'Security Code',
      message: `Here is your one-time security code ${securityCode}`,
    });
    return;
  }

  @ApiOperation({ summary: 'Forgot password' })
  @SecurityCodeAccess()
  @ApiOkResponse({ type: UpdateResult })
  @ApiUnprocessableEntityResponse()
  @ApiUnauthorizedResponse()
  @Get('login-with-code')
  loginWithCode(
    @Query() __: LoginWithCodeDto,
    @AuthHeaderParam() accessToken: string
  ) {
    return { accessToken };
  }

  @ApiOperation({ summary: 'Signup' })
  @PublicAccess()
  @ApiUnprocessableEntityResponse()
  @Post('signup')
  async signup(@Body() signupDto: CreateSubDto) {
    await this.authService.signup(signupDto);
    const { orgname, username, password } = signupDto;

    await DatabaseFactory.createDatabaseIFNotExist(orgname);

    await DatabaseFactory.updateTemplateDatabaseForUser(
      orgname,
      username,
      password
    );

    return { message: 'Welcome' };
  }
}
