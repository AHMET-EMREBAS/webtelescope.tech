import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Session, Subscription, User } from '@webpackages/entity';
import { Repository } from 'typeorm';
import { LoginDto, SignupDto } from './dto';

import { Auth, BasicAuth } from './guards';
import {
  AccessToken,
  Public,
  RequiredPermission,
  RequiredRole,
  SessionId,
} from './decorators';

@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
    @InjectRepository(Subscription)
    private readonly subRepo: Repository<Subscription>
  ) {}

  @BasicAuth()
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@AccessToken() token: string) {
    return { accessToken: token };
  }

  @Auth()
  @Post('logout')
  async logout(@SessionId() sessionId: number) {
    return await this.sessionRepo.delete(sessionId);
  }

  @Public()
  @Post('signup')
  async signup(@Body(ValidationPipe) sub: SignupDto) {
    await this.subRepo.save(sub);
    await this.userRepo.save(sub);
    return { message: 'Wellcome' };
  }

  @Post('reset-password')
  resetPassword() {}

  @Post('forgot-password')
  forgotPassword() {}

  @Post('test-permission')
  @RequiredPermission('test-permission')
  testPermission() {
    return 'You got the permission';
  }

  @Post('test-role')
  @RequiredRole('test-role')
  testRole() {
    return 'You got the role!';
  }
}
