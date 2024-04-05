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
  Signup,
  Subscription,
  Organization,
} from '@webpackages/entity';
import { AuthService } from './service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthGuard, LocalGuard, SessionGuard } from './guards';
import {
  CreateOrganizationDto,
  CreatePermissionDto,
  CreateRoleDto,
  CreateSecurityCodeDto,
  CreateSessionDto,
  CreateUserDto,
  UpdateOrganizationDto,
  UpdateRoleDto,
  UpdateSecurityCodeDto,
  UpdateSessionDto,
  UpdateUserDto,
} from '@webpackages/dto';
import { CreateController } from '@webpackages/rest';

export const AUTH_MODULE_ENTITIES = [
  User,
  Role,
  Permission,
  Session,
  SecurityCode,
  Signup,
  Subscription,
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
      controllers: [
        AuthController,
        CreateController({
          entity: User,
          createDto: CreateUserDto,
          updateDto: UpdateUserDto,
        }),
        CreateController({
          entity: Organization,
          createDto: CreateOrganizationDto,
          updateDto: UpdateOrganizationDto,
        }),
        CreateController({
          entity: Session,
          createDto: CreateSessionDto,
          updateDto: UpdateSessionDto,
        }),
        CreateController({
          entity: Role,
          createDto: CreateRoleDto,
          updateDto: UpdateRoleDto,
        }),
        CreateController({
          entity: Permission,
          createDto: CreatePermissionDto,
          updateDto: UpdateSessionDto,
        }),
        CreateController({
          entity: SecurityCode,
          createDto: CreateSecurityCodeDto,
          updateDto: UpdateSecurityCodeDto,
        }),
      ],
      providers: [AuthService, AuthGuard, LocalGuard, SessionGuard],
      exports: [JwtModule, AuthService, AuthGuard, LocalGuard, SessionGuard],
    };
  }
}
