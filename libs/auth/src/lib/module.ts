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
} from '@webpackages/entity';
import { AuthService } from './service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthGuard, LocalGuard, SessionGuard } from './guards';

const entities = [User, Role, Permission, Session, SecurityCode];

function secret() {
  const s = process.env['SECRET'];
  if (!s) throw new Error('SECRET is not provided!');
  return s;
}

@Module({})
export class AuthModule {
  static configure(): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        EventEmitterModule,
        TypeOrmModule.forRoot({
          type: 'better-sqlite3',
          database: './tmp/auth.sqlite',
          entities,
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature(entities),
        JwtModule.register({
          global: true,
          secret: secret(),
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
