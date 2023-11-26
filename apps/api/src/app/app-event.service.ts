import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthEvents } from '@webpackages/auth';

@Injectable()
export class AppEventService {
  @OnEvent(AuthEvents.FORGOT_PASSWORD)
  onForgotPassword(options: { username: string; code: string }) {
    console.log(options);
  }
}
