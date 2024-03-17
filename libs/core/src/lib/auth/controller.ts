import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Validate } from '../pipe';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { AccessToken, Policy, UserSession } from './decorators';
import { Session } from './user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Exclude()
export class LoginDto {
  @ApiProperty({ type: 'string', example: 'root@webtelescope.tech' })
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  username!: string;

  @ApiProperty({ type: 'string', example: '!Password1' })
  @IsStrongPassword()
  @IsNotEmpty()
  @Expose()
  password!: string;
}

@ApiTags('Auth')
@Policy.Auth()
@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(Session) private readonly sessionRepo: Repository<Session>
  ) {}

  @ApiOperation({ summary: 'Login with username and password' })
  @Policy.Local()
  @Post('login')
  login(
    @Body(Validate()) loginDto: LoginDto,
    @AccessToken() accessToken: string
  ) {
    return { accessToken };
  }

  @ApiOperation({ summary: 'Logout from the current session' })
  @Post('logout')
  async logout(@UserSession() session: Session) {
    return await this.sessionRepo.delete(session.id);
  }

  @ApiOperation({ summary: 'Logout from the current session' })
  @Post('logout-all-devices')
  async logoutAllDevices(@UserSession() session: Session) {
    return await this.sessionRepo.delete({ userId: session.userId });
  }

  @ApiOperation({ summary: 'Has active session' })
  @Policy.SessionChecker()
  @Post('has-active-session')
  hasSession() {
    return { hasSession: true };
  }

  forgotPassword() {}

  resetPassword() {}
}
