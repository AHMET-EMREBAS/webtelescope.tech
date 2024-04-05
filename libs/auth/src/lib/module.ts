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
} from '@webpackages/entity';
import { AuthService } from './service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthGuard, LocalGuard, SessionGuard } from './guards';

export const AUTH_MODULE_ENTITIES = [
  User,
  Role,
  Permission,
  Session,
  SecurityCode,
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
