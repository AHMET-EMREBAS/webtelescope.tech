/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller';
import {
  AuthService,
  AuthGuard,
  LocalGuard,
  SessionGuard,
  OAuthGuard,
} from '@webpackages/core';
import { ResourceControllers } from '../controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JtwOptionsFactory } from './jwt-options';
import { AuthDatabaseModule } from '../database';

const providers = [
  AuthService,
  AuthGuard,
  LocalGuard,
  SessionGuard,
  OAuthGuard,
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
