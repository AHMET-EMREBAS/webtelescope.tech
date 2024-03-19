import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Validate } from '../pipe';
import { Session, User } from './user';
import {
  BearerAccess,
  CredentialAccess,
  SecurityCodeAccess,
  SessionAccess,
  UsernameAccess,
} from './guards';
import { AuthHeaderParam, SessionParam, UserParam } from './params';
import { LoginDto, AccessTokenDto, UpdatePasswordDto } from './dto';
import { DeleteResult, UpdateResult } from '../dto';
import { BodyParam, QueryParam } from '../controller';
import { ForgotPasswordDto } from './dto/forgot-password';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PublicAccess } from './policy';
import { AuthEvents } from './auth-events';
import { LoginWithCodeDto } from './dto/login-with-code';
import { AuthService } from './service';

@ApiTags('Auth')
@BearerAccess()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @ApiOperation({ summary: 'Login with username and password' })
  @ApiOkResponse({ type: AccessTokenDto })
  @ApiUnauthorizedResponse()
  @CredentialAccess()
  @Post('login')
  login(
    @Body(Validate()) __: LoginDto,
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
    @BodyParam() passwordDto: UpdatePasswordDto
  ) {
    this.authService.updatePassword(session.userId, passwordDto);
  }

  @ApiOperation({ summary: 'Forgot password' })
  @UsernameAccess()
  @ApiOkResponse({ type: UpdateResult })
  @ApiUnauthorizedResponse()
  @Post('forgot-password')
  async forgotPassword(
    @BodyParam() __: ForgotPasswordDto,
    @UserParam() user: User
  ) {
    const { id, securityCode } =
      await this.authService.createSecurityCodeOrThrow(user);
    this.eventEmitter.emit(AuthEvents.FORGOT_PASSWORD_EVENT, {
      username: user.username,
      securityCode,
    });

    return;
  }

  @ApiOperation({ summary: 'Forgot password' })
  @SecurityCodeAccess()
  @ApiOkResponse({ type: UpdateResult })
  @ApiUnauthorizedResponse()
  @Get('login-with-code')
  loginWithCode(
    @QueryParam() __: LoginWithCodeDto,
    @AuthHeaderParam() accessToken: string
  ) {
    return { accessToken };
  }
}
