import { DynamicModule, Module } from '@nestjs/common';

import {
  CreatePermissionDto,
  CreateRoleDto,
  CreateUserDto,
  Permission,
  Role,
  UpdatePermissionDto,
  UpdateRoleDto,
  UpdateUserDto,
  User,
} from './user.entity';
import { ResourceModule } from '../resource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

export type AuthModuleOptions = {
  secret: string;
};

@Module({})
export class AuthModule {
  static register(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        JwtModule.register({
          global: true,
          secret: options.secret,
          signOptions: {
            expiresIn: '1m',
          },
        }),
        TypeOrmModule.forFeature([User, Role, Permission]),

        ResourceModule.register({
          createDto: CreateUserDto,
          updateDto: UpdateUserDto,
          entities: [User, Role, Permission],
          singularPath: 'user',
          pluralPath: 'users',
          searchFields: ['username'],
        }),
        ResourceModule.register({
          createDto: CreateRoleDto,
          updateDto: UpdateRoleDto,
          entities: [Role, Permission],
          singularPath: 'role',
          pluralPath: 'roles',
          searchFields: ['name'],
        }),
        ResourceModule.register({
          createDto: CreatePermissionDto,
          updateDto: UpdatePermissionDto,
          entities: [Permission],
          singularPath: 'permission',
          pluralPath: 'permissions',
          searchFields: ['name'],
        }),
      ],
      controllers: [AuthController],
    };
  }
}
