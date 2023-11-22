/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AuthEvents,
  ForgotPasswordEventOptions,
  LoginEventOptions,
  SignupEventOptions,
} from './auth.events';
import {
  ForgotPasswordDto,
  LoginDto,
  LoginWithCodeDto,
  SignupDto,
} from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
    private readonly jwt: JwtService
  ) {}

  login(loginDto: LoginDto) {
    
    this.eventEmitter.emit(
      AuthEvents.LOGIN,
      new LoginEventOptions(loginDto.username)
    );
  }

  logout() {
    console.log('Remove user session');
  }

  signup(signupDto: SignupDto) {
    this.eventEmitter.emit(
      AuthEvents.SIGNUP,
      new SignupEventOptions(signupDto.username)
    );
  }

  forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { username } = forgotPasswordDto;
    const securityCode = '';

    this.eventEmitter.emit(
      AuthEvents.FORGOT_PASSWORD,
      new ForgotPasswordEventOptions(username, securityCode)
    );
  }
  loginWithCode(loginWithCodeDto: LoginWithCodeDto) {
    const { username, code } = loginWithCodeDto;
    console.log(code);
    this.eventEmitter.emit(AuthEvents.LOGIN, new LoginEventOptions(username));
  }
}
