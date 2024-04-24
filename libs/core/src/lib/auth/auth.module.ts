import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  PasswordService,
  JwtTokenService,
  providePasswordService,
  provideTokenService,
  TestPasswordService,
  TestTokenService,
  getPasswordServiceToken,
  getTokenServiceToken,
  provideUserService,
  TestUserService,
  provideRootUserService,
  TestRootUserService,
  getUserServiceToken,
  getRootUserServiceToken,
} from './services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import {
  ProfileConfigService,
  ProfileService,
  provideProfileConfigService,
  provideProfileService,
} from '../profile';

@Module({
  imports: [ConfigModule, JwtModule],
  controllers: [AuthController],
  providers: [
    providePasswordService(PasswordService),
    provideTokenService(JwtTokenService),
    provideProfileConfigService(ProfileConfigService),
    provideProfileService(ProfileService),
  ],
  exports: [getPasswordServiceToken(), getTokenServiceToken()],
})
export class AuthModule {
  static configure(options: { providers: Provider[] }): DynamicModule {
    return {
      module: AuthModule,
      providers: options.providers,
    };
  }
}

@Module({
  controllers: [AuthController],
  providers: [
    providePasswordService(TestPasswordService),
    provideTokenService(TestTokenService),
    provideUserService(TestUserService),
    provideRootUserService(TestRootUserService),
  ],
  exports: [
    getPasswordServiceToken(),
    getTokenServiceToken(),
    getUserServiceToken(),
    getRootUserServiceToken(),
  ],
})
export class TestAuthModule {}
