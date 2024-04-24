import {
  AuthController,
  ConfigModule,
  Module,
  ProfileModule,
  TypeOrmModule,
  getPasswordServiceToken,
  getRootUserServiceToken,
  getTokenServiceToken,
  getUserServiceToken,
  providePasswordService,
  provideRootUserService,
  provideTokenService,
  provideUserService,
} from '@webpackages/core';
import {
  Permission,
  Role,
  RoleView,
  Scope,
  User,
  UserRoleView,
  UserScopeView,
  UserView,
} from './models';
import {
  PasswordService,
  RootUserService,
  TokenService,
  UserService,
} from './services';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    JwtModule,
    TypeOrmModule.forFeature([
      Permission,
      Role,
      RoleView,
      Scope,
      User,
      UserView,
      UserRoleView,
      UserScopeView,
    ]),
    ProfileModule,
  ],
  providers: [
    providePasswordService(PasswordService),
    provideTokenService(TokenService),
    provideUserService(UserService),
    provideRootUserService(RootUserService),
  ],
  exports: [
    getPasswordServiceToken(),
    getTokenServiceToken(),
    getUserServiceToken(),
    getRootUserServiceToken(),
  ],
})
export class AuthModule {}
