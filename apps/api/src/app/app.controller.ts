import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { BearerAccess, PublicAccess, SessionAccess } from '@webpackages/core';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('App Workout')
@BearerAccess()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
