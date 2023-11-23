/* eslint-disable @nx/enforce-module-boundaries */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4 } from 'uuid';
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
  SignupEventOptions,
} from './auth.events';
import {
  ForgotPasswordDto,
  LoginDto,
  LoginWithCodeDto,
  ResetPasswordDto,
  SignupDto,
} from './dto';
import { compare } from '../bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
    private readonly jwt: JwtService
  ) {}

  findByUsername(username: string) {
    return this.userRepo.findOneBy({ username });
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Found user by username
    const found = await this.findByUsername(username);

    // If user found
    if (found) {
      const hashedPassword = found?.password;

      // If password match
      if (compare(password, hashedPassword)) {
        const { roles, id } = found;

        // Then create token
        const token = this.jwt.sign({ sub: id, roles });

        // Then emit AuthEvents.LOGIN event
        this.eventEmitter.emit(
          AuthEvents.LOGIN,
          new LoginEventOptions(loginDto.username)
        );
        // Then return accessToken
        return { accessToken: token };
      }
      // else throw UnauthorizedException
      throw new UnauthorizedException('Password is wrong');
    }
    // else throw UnauthorizedException
    throw new UnauthorizedException('User not found!');
  }

  logout() {
    return;
  }

  async signup(signupDto: SignupDto) {
    const { username, password } = signupDto;

    // Find user
    const found = await this.findByUsername(username);

    // If user exist, then throw error
    if (found) {
      throw new UnprocessableEntityException('User already exist!');
    }

    // Else if user does not exist
    try {
      // Try to save the new user
      await this.userRepo.save({ username, password });
      // Emit signup event
      this.eventEmitter.emit(
        AuthEvents.SIGNUP,
        new SignupEventOptions(signupDto.username)
      );
      return { message: `Welcome, ${username}` };
    } catch (err) {
      // If could not save the user, then throw error
      throw new UnprocessableEntityException(
        'Something went wrong. Try again!'
      );
    }
  }


  /**
   * Only authenticated user can call this method
   * @param resetPasswordDto 
   * @returns 
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { username, password } = resetPasswordDto;
    const found = await this.findByUsername(username);

    if (found) {
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

    throw new NotFoundException('User not found');
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { username } = forgotPasswordDto;
    const securityCode = v4().substring(0, 4);

    const found = await this.findByUsername(username);

    if (found) {
      this.eventEmitter.emit(
        AuthEvents.FORGOT_PASSWORD,
        new ForgotPasswordEventOptions(username, securityCode)
      );
    }

    throw new NotFoundException('User not found');
  }

  loginWithCode(loginWithCodeDto: LoginWithCodeDto) {
    const { username, code } = loginWithCodeDto;
    console.log(code);
    this.eventEmitter.emit(AuthEvents.LOGIN, new LoginEventOptions(username));
  }
}
