/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import {
  AuthUserService,
  AuthExtractService,
  AuthJwtService,
  AuthMetaService,
  AuthSessionService,
} from '../services';
import { AuthService } from '../auth.service';
import {
  AuthGuard,
  LocalGuard,
  SessionGuard,
  NotDeleteGuard,
  SecurityCodeGuard,
  UsernameGuard,
  LogoutGuard,
  LogoutAllGuard,
} from '../guards';
import { ResourceControllers } from '../app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JtwOptionsFactory } from './jwt-options.factory';
import { AuthDatabaseModule } from '../database';

const providers = [
  AuthService,
  AuthUserService,
  AuthSessionService,
  AuthExtractService,
  AuthJwtService,
  AuthMetaService,
  AuthGuard,
  LocalGuard,
  SessionGuard,
  NotDeleteGuard,
  SecurityCodeGuard,
  UsernameGuard,
  LogoutGuard,
  LogoutAllGuard,
];

@Module({
  imports: [
    ConfigModule.forFeature(() => ({})),
    AuthDatabaseModule,
    JwtModule.registerAsync({
      extraProviders: [ConfigService, JtwOptionsFactory],
      useClass: JtwOptionsFactory,
    }),
  ],
  controllers: [AuthController, ...ResourceControllers],
  providers: [...providers],
  exports: [...providers],
})
export class AuthModule {}
