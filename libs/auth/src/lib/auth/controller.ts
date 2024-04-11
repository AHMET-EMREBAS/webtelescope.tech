import { Controller, Get, Logger, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import {
  LoginResult,
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
import { Session, User } from '@webpackages/entity';
import {
  AuthService,
  PublicAccess,
  BearerAccess,
  CredentialAccess,
  SecurityCodeAccess,
  SessionAccess,
  UsernameAccess,
  AuthHeaderParam,
  SessionParam,
  UserParam,
  Scope,
  AuthUserService,
} from '@webpackages/core';
import { DatabaseFactory } from '../database';

@ApiTags('Auth')
@Scope('AUTH')
@BearerAccess()
@Controller('auth')
export class AuthController {
  logger!: Logger;
  constructor(
    private readonly authService: AuthService,
    private readonly authUserService: AuthUserService
  ) {
    this.logger = new Logger(AuthController.name);
  }

  @ApiOperation({ summary: 'Login with username and password' })
  @ApiOkResponse({ type: LoginResult })
  @ApiUnauthorizedResponse()
  @CredentialAccess()
  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @AuthHeaderParam() accessToken: string,
    @SessionParam() session: Session
  ): LoginResult {
    const result = { accessToken, deviceId: session.deviceId };

    this.logger.debug(
      `User session is created  acccessToken:${accessToken} , deviceId: ${devicePixelRatio}`
    );
    return result;
  }

  @ApiOperation({ summary: 'Logout from the current session' })
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: DeleteResult })
  @Get('logout')
  async logout(@SessionParam() session: Session) {
    return this.authService.deleteSession(session.id);
  }

  @ApiOperation({ summary: 'Logout from the current session' })
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: DeleteResult, isArray: true })
  @Get('logout-all-devices')
  async logoutAllDevices(@SessionParam() session: Session) {
    return await this.authService.deleteAllSessionsByUserId(session.userId);
  }

  @ApiOperation({ summary: 'Has active session' })
  @ApiUnauthorizedResponse()
  @SessionAccess()
  @Get('has-session')
  hasSession() {
    return true;
  }

  @ApiOperation({ summary: 'Update password' })
  @ApiOkResponse({ type: UpdateResult })
  @ApiUnauthorizedResponse()
  @Post('update-password')
  async updatePassword(
    @SessionParam() session: Session,
    @Body() passwordDto: UpdatePasswordDto
  ) {
    await this.authUserService.updatePassword(session.userId, passwordDto);
  }

  @ApiOperation({ summary: 'Forgot password' })
  @UsernameAccess()
  @ApiOkResponse({ type: UpdateResult })
  @ApiUnauthorizedResponse()
  @Post('forgot-password')
  async forgotPassword(@Body() __: ForgotPasswordDto, @UserParam() user: User) {
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

    const { orgname: organizationName, username, password } = signupDto;

    await DatabaseFactory.createDatabaseIFNotExist(organizationName);

    await DatabaseFactory.updateTemplateDatabaseForUser(
      organizationName,
      username,
      password
    );

    return { message: 'Welcome' };
  }
}
