import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  TestPasswordService,
  TestTokenService,
  TestUserService,
  provideAuthUserService,
  providePasswordService,
  provideTokenService,
} from '@webpackages/core';

@Module({
  imports: [
    JwtModule.register({
      secret: '',
      signOptions: { expiresIn: '30d' },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    provideAuthUserService(TestUserService),
    provideTokenService(TestTokenService),
    providePasswordService(TestPasswordService),
  ],
})
export class AppModule {}
