import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import {
  BearerAccess,
  PublicAccess,
  SessionAccess,
  isPublicAccess,
} from '@webpackages/core';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

export class BodyClass {
  @ApiProperty({ type: 'date' })
  value: Date;
}
@ApiTags('App Workout')
@BearerAccess()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @PublicAccess()
  @Post('date')
  getDate(@Body() body: BodyClass) {
    console.log(body.value);

    return {};
  }

  @PublicAccess()
  @ApiOperation({ summary: 'Public resource' })
  @Get('public')
  getData() {
    return this.appService.getData();
  }

  @ApiOperation({ summary: 'Secured by bearer token' })
  @Get('bearer')
  secure() {
    return 'Secure access';
  }

  @ApiOperation({ summary: 'Any body with a valid session.' })
  @SessionAccess()
  @Get('sesion')
  sessionAccess() {
    return 'Required role';
  }
}
