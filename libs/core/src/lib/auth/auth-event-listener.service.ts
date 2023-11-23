import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  AuthEvents,
  ForgotPasswordEventOptions,
  LoginEventOptions,
  SignupEventOptions,
} from './auth.events';

/**
 * Implement this class based on your requirement.
 */
@Injectable()
export class AuthEventListener {
  @OnEvent(AuthEvents.SIGNUP)
  onSignup(options: SignupEventOptions) {
    console.log(options);
  }

  @OnEvent(AuthEvents.LOGIN)
  onLogin(options: LoginEventOptions) {
    console.log(options);
  }

  @OnEvent(AuthEvents.FORGOT_PASSWORD)
  onForgotPassword(options: ForgotPasswordEventOptions) {
    console.log(options);
  }
}
