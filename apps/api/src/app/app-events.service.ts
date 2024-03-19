import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  AuthEvents,
  EmailService,
  ForgotPasswordEventPayload,
  InjectEmailService,
} from '@webpackages/core';

@Injectable()
export class AppEventService {
  constructor(
    @InjectEmailService('forgot-password') private readonly email: EmailService
  ) {}

  @OnEvent(AuthEvents.FORGOT_PASSWORD_EVENT)
  async sendEmail({ username, securityCode }: ForgotPasswordEventPayload) {
    await this.email.send({
      subject: 'Reset Password',
      to: 'aemrebas.dev@gmail.com',
      data: {
        title: 'Reset Password',
        message: 'Use the one-time security code to login.',
        securityCode,
        href: `http://localhost:3000/api/auth/login-with-code/?securityCode=${securityCode}`,
        label: 'Login With Code',
      },
      text: '',
    });
    console.log('Auth Events');
  }
}
