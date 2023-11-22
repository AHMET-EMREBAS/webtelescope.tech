/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export enum AuthEvents {
  SIGNUP = 'auth.signup',
  LOGIN = 'auth.login',
  FORGOT_PASSWORD = 'auth.forgot-password',
}

export type SignupEventOptions = {
  /**
   * User email address
   */
  email: string;
};

export type LoginEventOptions = {
  /**
   * User email address
   */
  email: string;
};

export type ForgotPasswordEventOptions = {
  /**
   * User email address
   */
  email: string;
  /**
   * Temporary security code to update password
   */
  securityCode: string;
};

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
