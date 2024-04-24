import {
  AuthController,
  Module,
  TypeOrmModule,
  JwtModule,
  getPasswordServiceToken,
  getRootUserServiceToken,
  getTokenServiceToken,
  getUserServiceToken,
  providePasswordService,
  provideRootUserService,
  provideTokenService,
  provideUserService,
} from '@webpackages/core';
import { ConfigModule } from '@webpackages/config';
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
    ConfigModule,
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
