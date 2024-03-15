import { Controller, Get, Module } from '@nestjs/common';

import { AuthModule } from '@webpackages/auth';

@Controller()
class AppController {
  @Get('hello')
  get() {
    return 'Hello there';
  }
}
@Module({
  imports: [AuthModule],
  controllers: [AppController],
})
export class AppModule {}
