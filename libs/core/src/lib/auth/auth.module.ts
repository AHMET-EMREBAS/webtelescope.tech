import { Module } from '@nestjs/common';
import {
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
import { AuthController } from './auth.controller';

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
