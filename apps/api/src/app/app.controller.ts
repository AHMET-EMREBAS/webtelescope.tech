import { Controller, Get, Headers } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiBasicAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(@Headers() headers: any) {
    return { ...headers };
  }
}
