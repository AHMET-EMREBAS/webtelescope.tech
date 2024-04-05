/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Permission,
  Role,
  Session,
  SecurityCode,
  User,
  Mail,
  Sub,
  SubType,
  Organization,
} from '@webpackages/entity';

import { EventEmitterModule } from '@nestjs/event-emitter';

import {
  AuthService,
  AuthGuard,
  LocalGuard,
  SessionGuard,
} from '@webpackages/core';

export const AUTH_MODULE_ENTITIES = [
  User,
  Role,
  Permission,
  Session,
  SecurityCode,
  Sub,
  SubType,
  Organization,
  Mail,
];

export type AuthModuleOptions = {
  secret: string;
};

@Module({})
export class AuthModule {
  static configure(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        EventEmitterModule,
        TypeOrmModule.forFeature(AUTH_MODULE_ENTITIES),
        JwtModule.register({
          global: true,
          secret: options.secret,
          signOptions: {
            expiresIn: '30d',
          },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, AuthGuard, LocalGuard, SessionGuard],
      exports: [JwtModule, AuthService, AuthGuard, LocalGuard, SessionGuard],
    };
  }
}
