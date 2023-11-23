/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export enum AuthEvents {
  SIGNUP = 'auth.signup',
  LOGIN = 'auth.login',
  FORGOT_PASSWORD = 'auth.forgot-password',
  RESET_PASSWORD = 'auth.reset-password',
}

export class SignupEventOptions {
  /**
   *
   * @param email User email address
   */
  constructor(public readonly email: string) {}
}

export class LoginEventOptions {
  /**
   *
   * @param email User email address
   */
  constructor(public readonly email: string) {}
}

export class ForgotPasswordEventOptions {
  /**
   *
   * @param email User email address
   * @param code Temporary security code
   */
  constructor(public readonly email: string, public readonly code: string) {}
}

export class ResetPasswordEventOptions {
  /**
   *
   * @param email User email address
   */
  constructor(public readonly email: string) {}
}

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
