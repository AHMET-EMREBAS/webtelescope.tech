import { DynamicModule, Module } from '@nestjs/common';
import { User, UserController } from './user';
import { Role, RoleController } from './role';
import { Permission, PermissionController } from './permission';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SecurityCodeService } from './security-code.service';
import { TypeOrmModule } from '@nestjs/typeorm';

export type AuthModuleOptions = {
  secret: string;
};

@Module({})
export class AuthModule {
  static register(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        TypeOrmModule.forFeature([User, Role, Permission]),
        EventEmitterModule,
        JwtModule.register({
          secret: options.secret,
          signOptions: { expiresIn: '30d' },
        }),
      ],
      providers: [SecurityCodeService],
      controllers: [
        AuthController,
        UserController,
        RoleController,
        PermissionController,
      ],
    };
  }
}
