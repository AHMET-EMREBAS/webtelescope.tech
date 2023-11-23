/* eslint-disable @nx/enforce-module-boundaries */
import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role, User } from '../entities';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SecurityCodeService } from './security-code.service';
export type AuthModuleOptions = {
  secret: string;
};

@Module({})
export class AuthModule {
  static configure(options: AuthModuleOptions): DynamicModule {
    const { secret } = options;
    return {
      module: AuthModule,
      imports: [
        EventEmitterModule,
        TypeOrmModule.forFeature([User, Role, Permission]),
        JwtModule.register({
          secret: secret,
          signOptions: {
            expiresIn: '30d',
          },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, SecurityCodeService],
    };
  }
}
