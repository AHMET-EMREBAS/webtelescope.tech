import { Controller, Get, Headers, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@webpackages/core';

@ApiBearerAuth()
@ApiBasicAuth()
@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(@Headers() headers: any) {
    return { ...headers };
  }

  @Get('users')
  getUSers() {
    return [];
  }
}
