/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthService,
  AuthGuard,
  LocalGuard,
  SessionGuard,
  OAuthGuard,
} from '@webpackages/core';
import { AuthResourceControllers } from './resource-controllers';
import { AuthEntities } from './entities';

export type AuthModuleOptions = {
  secret: string;
};

@Module({})
export class AuthModule {
  static configure(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        TypeOrmModule.forFeature(AuthEntities),
        JwtModule.register({
          global: true,
          secret: options.secret,
          signOptions: {
            expiresIn: '30d',
          },
        }),
      ],
      controllers: [AuthController, ...AuthResourceControllers],
      providers: [AuthService, AuthGuard, LocalGuard, SessionGuard, OAuthGuard],
      exports: [
        JwtModule,
        AuthService,
        AuthGuard,
        LocalGuard,
        SessionGuard,
        OAuthGuard,
        TypeOrmModule.forFeature(AuthEntities),
      ],
    };
  }
}
