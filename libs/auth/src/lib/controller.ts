import { Controller, Get, Post } from '@nestjs/common';
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
import { Organization, Role, Session, User } from '@webpackages/entity';
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
} from '@webpackages/core';
import { initializeDataSource, seedNewDatabase } from './database';
import { DatabaseService } from '@webpackages/database';
@ApiTags('Auth')
@Scope('auth')
@BearerAccess()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService
  ) {}

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
    return { accessToken, deviceId: session.deviceId };
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
    this.authService.updatePassword(session.userId, passwordDto);
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
  @Scope('subscription')
  @ApiUnprocessableEntityResponse()
  @Post('signup')
  async signup(@Body() signup: CreateSubDto) {
    const { organizationName } = await this.authService.signup(signup);

    await this.databaseService.createDatabase(organizationName);

    // const ds = await this.databaseService.initialize()
    const ds = await initializeDataSource(organizationName);

    await seedNewDatabase(ds);

    const { username, password } = signup;

    const adminRole = await ds.getRepository(Role).findOneBy({ role: 'ADMIN' });

    await ds.getRepository(Organization).save({
      organizationName: signup.organizationName,
    });

    const ownData = await ds.getRepository(User).save({
      username,
      password,
      roles: [{ id: adminRole?.id || 1 }],
      organization: { id: 1 },
      active: true,
    });

    return ownData;
  }
}
