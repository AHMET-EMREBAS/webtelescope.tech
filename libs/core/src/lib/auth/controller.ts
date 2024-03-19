import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Validate } from '../pipe';

import { Session, User } from './user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BearerAccess, CredentialAccess, SessionAccess } from './guards';
import { AuthHeaderParam, SessionParam } from './params';
import { LoginDto, AccessTokenDto, UpdatePasswordDto } from './dto';
import { DeleteResult, UpdateResult } from '../dto';
import { BodyParam } from '../controller';

@ApiTags('Auth')
@BearerAccess()
@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
    @InjectRepository(User) private readonly userRepo: Repository<User>
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
  @Post('logout')
  async logout(@SessionParam() session: Session) {
    return await this.sessionRepo.delete(session.id);
  }

  @ApiOperation({ summary: 'Logout from the current session' })
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: DeleteResult, isArray: true })
  @Post('logout-all-devices')
  async logoutAllDevices(@SessionParam() session: Session) {
    return await this.sessionRepo.delete({ userId: session.userId });
  }

  @ApiOperation({ summary: 'Has active session' })
  @ApiOkResponse({ type: 'boolean' })
  @ApiUnauthorizedResponse()
  @SessionAccess()
  @Post('has-session')
  hasSession() {
    return true;
  }

  @ApiOperation({ summary: 'Update password' })
  @ApiOkResponse({ type: UpdateResult })
  @ApiUnauthorizedResponse()
  @Post('update-password')
  updatePassword(
    @SessionParam() session: Session,
    @BodyParam() passwordDto: UpdatePasswordDto
  ) {
    console.log(session);
    return this.userRepo.update(session.userId, passwordDto);
  }
}
