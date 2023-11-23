/* eslint-disable @nx/enforce-module-boundaries */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AuthEvents,
  ForgotPasswordEventOptions,
  LoginEventOptions,
  ResetPasswordEventOptions,
} from './auth.events';
import {
  ForgotPasswordDto,
  LoginDto,
  LoginWithCodeDto,
  ResetPasswordDto,
} from './dto';
import { compare } from '../bcrypt';
import { SecurityCodeService } from './security-code.service';
import { UserPayload } from './dto/user-payload';
import { APP_PASSWORD, APP_USERNAME } from '@webtelescopetech/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
    private readonly jwt: JwtService,
    private readonly ssoService: SecurityCodeService
  ) {}

  private async findByUsernameOrThrow(username: string) {
    const found = await this.userRepo.findOneBy({ username });

    if (found) return found;

    throw new NotFoundException('User not found!');
  }

  private signToken(user: User) {
    const payload = new UserPayload(user);
    const accessToken = this.jwt.sign({ ...payload });
    return accessToken;
  }

  async rootLogin(options: LoginDto) {
    const username = process.env[APP_USERNAME];
    const password = process.env[APP_PASSWORD];

    if (!username) throw new Error('APP_USERNAME is not found in environment!');
    if (!password) throw new Error('APP_PASSWORD is not found in environment!');

    if (username === options.username && password === options.password) {
      return this.jwt.sign({ root: true });
    }

    throw new NotFoundException('User not found!');
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const found = await this.findByUsernameOrThrow(username);

    const { password: hashedPassword } = found;

    // If password match
    if (compare(password, hashedPassword)) {
      // Then create token
      const token = this.signToken(found);

      this.eventEmitter.emit(AuthEvents.LOGIN, new LoginEventOptions(username));
      return token;
    }
    throw new UnauthorizedException('Password is wrong');
  }

  /**
   * Only authenticated user can call this method
   * @param resetPasswordDto
   * @returns
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { username, password } = resetPasswordDto;
    const found = await this.findByUsernameOrThrow(username);

    try {
      await this.userRepo.update(found.id, { password });

      this.eventEmitter.emit(
        AuthEvents.RESET_PASSWORD,
        new ResetPasswordEventOptions(username)
      );

      return { message: 'Password is updated' };
    } catch (err) {
      throw new UnprocessableEntityException(
        'Something went wrong. Try again!'
      );
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { username } = forgotPasswordDto;

    await this.findByUsernameOrThrow(username);

    const code = this.ssoService.setCode(username);

    this.eventEmitter.emit(
      AuthEvents.FORGOT_PASSWORD,
      new ForgotPasswordEventOptions(username, code)
    );

    return { message: `Check your inbox of ${username}` };
  }

  async loginWithCode(loginWithCodeDto: LoginWithCodeDto) {
    const { username, code } = loginWithCodeDto;

    this.ssoService.verifyCodeOrThrow(username, code);

    const found = await this.findByUsernameOrThrow(username);

    this.eventEmitter.emit(AuthEvents.LOGIN, new LoginEventOptions(username));

    return this.signToken(found);
  }
}
