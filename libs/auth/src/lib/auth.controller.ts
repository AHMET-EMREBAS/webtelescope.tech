import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription, User } from '@webpackages/entity';
import { Repository } from 'typeorm';
import { LoginDto, SignupDto } from './dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from './session.service';
import {
  Auth,
  Public,
  RequiredPermission,
  RequiredRole,
  SessionId,
  UserData,
} from './guards';

@Auth()
@ApiTags(AuthController.name)
@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Subscription)
    private readonly subRepo: Repository<Subscription>,
    private readonly sessionService: SessionService,
    private readonly jwt: JwtService
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;

    const found = await this.userRepo.findOneBy({ username });

    if (found) {
      const match = await compare(password, found.password);
      if (match) {
        const session = await this.sessionService.createSession(found);

        const token = await this.jwt.signAsync({ sub: session.id });

        return { accessToken: token };
      }
    }
    throw new UnauthorizedException();
  }

  @Post('logout')
  async logout(@SessionId() sessionId: number, @UserData() userPolicy: User) {
    console.log(sessionId);
    console.log(userPolicy);
    return await this.sessionService.deleteSession(sessionId);
  }

  @Public()
  @Post('signup')
  async signup(@Body() sub: SignupDto) {
    const savedSub = await this.subRepo.save(sub);
    const savedUser = await this.userRepo.save(sub);

    return await this.login(sub);
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
