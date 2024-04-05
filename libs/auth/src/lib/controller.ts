import { Controller, Get, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import {
  AccessTokenDto,
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
} from '@webpackages/core';

@ApiTags('Auth')
@BearerAccess()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login with username and password' })
  @ApiOkResponse({ type: AccessTokenDto })
  @ApiUnauthorizedResponse()
  @CredentialAccess()
  @Post('login')
  login(
    @Body() __: LoginDto,
    @AuthHeaderParam() accessToken: string
  ): AccessTokenDto {
    return { accessToken };
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
  @ApiOkResponse({ type: 'boolean' })
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
  @ApiUnprocessableEntityResponse()
  @Post('signup')
  signup(@Body() signup: CreateSubDto) {
    return this.authService.signup(signup);
  }
}
