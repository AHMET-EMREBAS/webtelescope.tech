import { Injectable } from '@nestjs/common';
import { EmailService, InjectEmailService } from '@webpackages/core';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
