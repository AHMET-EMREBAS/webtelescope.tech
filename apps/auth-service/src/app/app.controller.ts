import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Find user by username and password and send the sesion information
   * @returns
   */
  @Post()
  login(@Body() loginDto: any) {
    return this.appService.getData();
  }

  signout() {}

  signup() {}
}
