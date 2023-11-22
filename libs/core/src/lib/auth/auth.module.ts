/* eslint-disable @nx/enforce-module-boundaries */
import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role, User } from '../entities';
import { EventEmitterModule } from '@nestjs/event-emitter';
export type AuthModuleOptions = {
  secret: string;
};

@Module({})
export class AuthModule {
  static configure(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      controllers: [],
      imports: [
        EventEmitterModule,
        TypeOrmModule.forFeature([User, Role, Permission]),
        JwtModule.register({
          secret: options.secret,
          signOptions: {
            expiresIn: '30d',
          },
        }),
      ],
    };
  }
}
