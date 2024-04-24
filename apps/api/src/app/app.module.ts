import { Module, OnModuleInit } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  IProfileConfigService,
  InjectProfileConfigService,
  Profile,
  TestRootUserService,
  TestUserService,
  provideUserService,
  provideRootUserService,
  ProfileModule,
  AuthModule,
} from '@webpackages/core';

const AuthModuleTest = AuthModule.configure({
  providers: [
    provideUserService(TestUserService),
    provideRootUserService(TestRootUserService),
  ],
});

@Module({
  imports: [ConfigModule.forRoot(), ProfileModule, AuthModuleTest],
  controllers: [AppController],
  providers: [
    AppService,
    provideUserService(TestUserService),
    provideRootUserService(TestRootUserService),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectProfileConfigService()
    private readonly config: IProfileConfigService
  ) {}

  onModuleInit() {
    this.config.set(Profile.LOCALE, 'EN');
    const enMessages = {
      HELLO: 'Hello: there!',
      [Profile.MAINTANANCE]: 'Under Construction',
      [Profile.TEST]: 'Sytem is under production test',
      [Profile.SLOW]:
        'Profile is set to slow-mode for possible security risks.',
    };

    this.config.setMessages(enMessages);

    this.config.set(Profile.LOCALE, 'TR');
    const trMessages = {
      HELLO: 'Merhaba',
      [Profile.MAINTANANCE]: 'Yapim asamasinda',
      [Profile.TEST]: 'Urun test ediliyor',
      [Profile.SLOW]: 'Yavas profile active edildi.',
    };
    this.config.setMessages(trMessages);
  }
}
